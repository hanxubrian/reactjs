import React, {Component} from 'react';

//Material-UI
import {
    TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography,
    Toolbar, AppBar, Avatar, MenuItem, Paper, Card, CardContent, CardHeader, CardActionArea
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";

// store
import {bindActionCreators} from 'redux';
import * as Actions from './../../../../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

// third party
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 24
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 10,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        maxHeight: 200,
        overflowY: 'scroll'
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    cardHeader       : {
        backgroundColor: theme.palette.secondary.main,
        padding: '10px 24px',
        '& span': {
            color: 'white'
        }
    },
});

const newInvoiceState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "InvoiceId": "",
    "InvoiceNo": "",
    "InvoiceDate": "",
    "DueDate": "",
    "CustomerId": "",
    "CustomerNo": "",
    "CustomerName": "",
    "EBill": "",
    "PrintInvoice": "",
    "InvoiceDescription": "",
    "InvoiceAmount": "",
    "InvoiceTax": "",
    "InvoiceTotal": "",
    "CPI": "",
    "TransactionStatusListId": "",
    "TransactionStatus": "",
    "InvoiceBalanceAmount": "",
    "InvoiceBalanceTax": "",
    "InvoiceBalanceTotal": "",
    "EBillText": "",
    "PrintInvoiceText": "",
    "IsOpen": "",
    "ConsolidatedInvoice": "",
    "ConsolidatedInvoiceId": "",
    "ConsolidatedInvoiceNo": "",
    "CreditId": "",
};

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            variant="outlined"
            label="Invoice For:"
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.CustomerName, query);
    const parts = parse(suggestion.CustomerName, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class InvoiceDialog extends Component {
    state = {
        ...newInvoiceState,
        value: '',
        suggestions: [],
        selectedCustomer: null
    };

    constructor (props) {
        super(props);
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if(value.length<2) return;

        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue =  (suggestion) =>{
        this.setState({selectedCustomer: suggestion});
        return suggestion.CustomerName;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');

        return this.props.customers.filter(customer => regex.test(customer.CustomerName));
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.invoiceDialog.props.open && this.props.invoiceDialog.props.open )
        {
            /**
             * Dialog type: 'create'
             * Update State
             */
            if ( this.props.invoiceDialog.type === 'create' &&
                this.props.contactDialog.data &&
                !_.isEqual(this.props.invoiceDialog.data, prevState) )
            {
                this.setState({...this.props.invoiceDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.invoiceDialog.type === 'new' &&
                !_.isEqual(newInvoiceState, prevState) )
            {
                this.setState({...newInvoiceState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.invoiceDialog.type === 'create' ? this.props.closeEditInvoiceDialog() : this.props.closeNewInvoiceDialog();
    };

    canBeSubmitted()
    {
        return true;
        const {name} = this.state;
        return (
            name.length > 0
        );
    }

    render()
    {
        const {classes, invoiceDialog, addInvoice, updateInvoice, removeInvoice} = this.props;
        const { value, suggestions } = this.state;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };

        return (
            <Dialog
                classes={{
                    root : classes.root,
                    paper: "m-24"
                }}
                className={classes.root}
                {...invoiceDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="lg"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <img className="mr-12" src="assets/images/invoices/invoice-icon-white.png" style={{width: 32, height: 32}}/>
                        <Typography variant="subtitle1" color="inherit">
                            {invoiceDialog.type === 'new' ? 'New Invoice' : 'Edit Invoice'}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                                classes,
                                placeholder: 'Search Customer Name or Number',
                                value: value,
                                onChange: this.onChange,
                            }}
                            theme={{
                                container: classNames(classes.container, classes.formControl),
                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion,
                            }}
                            renderSuggestionsContainer={options => (
                                <Paper {...options.containerProps} square>
                                    {options.children}
                                </Paper>
                            )}
                        />
                    </div>
                    {this.state.selectedCustomer && (
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row">
                                <div className="min-w-48 pt-20">
                                </div>
                                <Card className={classes.card}>
                                    <CardHeader title="Customer" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent>
                                        <Typography variant="subtitle1" color="inherit">
                                            <strong>Customer Name: {this.state.selectedCustomer.CustomerName}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Customer No: {this.state.selectedCustomer.CustomerNo}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Address: {this.state.selectedCustomer.Address}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} className= "flex flex-row justify-end">
                                <div className="min-w-48 pt-20">
                                </div>
                                <Card className={classes.card}>
                                    <CardHeader title="Billing" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent>
                                        <Typography variant="subtitle1" color="inherit">
                                            <strong>Billing Name: {this.state.selectedCustomer.CustomerName}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Customer No: {this.state.selectedCustomer.CustomerNo}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Address: {this.state.selectedCustomer.Address}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </GridItem>

                        </GridContainer>
                    )}

                    <GridContainer className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={9} md={9} className="flex flex-row">
                            <div className="min-w-48 pt-20"><Icon color="action">description</Icon></div>
                            <TextField
                                className={classes.formControl}
                                label="Description"
                                id="description"
                                name="InvoiceDescription"
                                value={this.state.InvoiceDescription}
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth
                                multiline={true}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3} className="flex flex-row">
                            <div className="min-w-48 pt-20"><Icon color="action">calendar_today</Icon></div>
                            <TextField
                                className={classes.formControl}
                                id="InvoiceDate"
                                label="Invoice Date"
                                type="date"
                                name="InvoiceDate"
                                value={this.state.InvoiceDate}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </GridItem>
                    </GridContainer>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">star</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Nickname"
                            id="nickname"
                            name="nickname"
                            value={this.state.nickname}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">phone</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Phone"
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">email</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">domain</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Company"
                            id="company"
                            name="company"
                            value={this.state.company}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">work</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Job title"
                            id="jobTitle"
                            name="jobTitle"
                            value={this.state.jobTitle}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">cake</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            id="birthday"
                            label="Birthday"
                            type="date"
                            value={this.state.birthday}
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">home</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Address"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">note</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Notes"
                            id="notes"
                            name="notes"
                            value={this.state.notes}
                            onChange={this.handleChange}
                            variant="outlined"
                            multiline
                            rows={5}
                            fullWidth
                        />
                    </div>
                </DialogContent>

                {invoiceDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addInvoice(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateInvoice(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeInvoice(this.state.id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditInvoiceDialog: Actions.closeEditInvoiceDialog,
        closeNewInvoiceDialog : Actions.closeNewInvoiceDialog,
        addInvoice            : Actions.addInvoice,
        updateInvoice         : Actions.updateInvoice,
        removeInvoice         : Actions.removeInvoice,
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        invoiceDialog: invoices.invoiceDialog,
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(InvoiceDialog));
