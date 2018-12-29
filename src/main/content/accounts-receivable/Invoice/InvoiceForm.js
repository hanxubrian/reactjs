import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// core components
import {
    Paper, TextField, Button, Typography,
    MenuItem, FormControl, InputLabel, Select, OutlinedInput,
    Card, CardHeader, CardContent, Divider, Radio, RadioGroup, FormControlLabel
} from '@material-ui/core';


// theme components
import {FusePageCustom, FuseAnimate,FuseSearch} from '@fuse';

import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import InvoiceLineTable from "./InvoiceLine"

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const styles = theme => ({
    layoutForm: {
        flexDirection: 'row',
    },
    button: {
        '& span':{
            textTransform: 'none'
        }
    },
    card: {
        width   : '100%',
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 24,
        minWidth: 200,
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
    "Service":""
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

class InvoiceForm extends Component {
    state = {
        customers: [],
        ...newInvoiceState,
        value: '',
        suggestions: [],
        selectedCustomer: null,
        labelWidth: 0,
        selectedWork: ""
    };

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

    closeComposeDialog = () => {
        this.props.invoiceDialog.type === 'create' ? this.props.closeEditInvoiceDialog() : this.props.closeNewInvoiceDialog();
    };

    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
    }

    componentWillMount(){
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount(){
        if(this.InputLabelRef) {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
            });
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
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
        const { classes, InvoiceForm, addInvoice, updateInvoice, removeInvoice} = this.props;
        const { toggleSelection, toggleAll, isSelected, logSelection} = this;
        const { selectAll, selection, value, suggestions } = this.state;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="p-24">
                    <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={8} md={8} className="flex flex-row">
                            <Autosuggest
                                {...autosuggestProps}
                                inputProps={{
                                    classes,
                                    placeholder: 'Search Customer Name or Number',
                                    value: value,
                                    onChange: this.onChange,
                                }}
                                theme={{
                                    container: classNames(classes.container),
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
                        </GridItem>
                        <GridItem xs={12} sm={2} md={2} className="flex flex-row">
                            <TextField
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
                        <GridItem xs={12} sm={2} md={2} className="flex flex-row">
                            <TextField
                                id="DueDate"
                                label="Due Date"
                                type="date"
                                name="DueDate"
                                value={this.state.DueDate}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </GridItem>
                    </GridContainer>
                    {this.state.selectedCustomer && (
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row">
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

                    <GridContainer>
                        <GridItem xs={12} sm={9} md={9} className="flex flex-row">
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
                    </GridContainer>
                    <Divider variant="middle" className={classNames(classes.formControl)}/>
                    <div className="flex">
                        <FormControl variant="outlined" className={classes.formControl} style={{marginBottom: '0!important'}}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="Service"
                            >
                                Services
                            </InputLabel>
                            <Select
                                value={this.state.Service}
                                onChange={this.handleChange}
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="Service"
                                        id="Service"
                                    />
                                }
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={1}>Adjust - Balance</MenuItem>
                                <MenuItem value={2}>Adjust - Refund</MenuItem>
                                <MenuItem value={3}>Adjust - WriteOff</MenuItem>
                                <MenuItem value={4}>Buffing</MenuItem>
                                <MenuItem value={5}>Carpet Clean</MenuItem>
                                <MenuItem value={6}>Customer Suppliers</MenuItem>
                                <MenuItem value={7}>Emergency Clean</MenuItem>
                                <MenuItem value={8}>Event Center</MenuItem>
                                <MenuItem value={9}>Floor Services</MenuItem>
                                <MenuItem value={10}>Funiture Cleaning Service</MenuItem>
                                <MenuItem value={11}>High Dusting</MenuItem>
                                <MenuItem value={12}>Hotel</MenuItem>
                                <MenuItem value={13}>In-House Work</MenuItem>
                                <MenuItem value={14}>Initial and Deep Clean</MenuItem>
                                <MenuItem value={15}>Initial One-Time Clean</MenuItem>
                                <MenuItem value={16}>Make Ready</MenuItem>
                                <MenuItem value={17}>Miscellaneous - Special</MenuItem>
                                <MenuItem value={18}>Other</MenuItem>
                                <MenuItem value={19}>Porter Services</MenuItem>
                                <MenuItem value={20}>Power Washing</MenuItem>
                                <MenuItem value={21}>Regular Billing</MenuItem>
                                <MenuItem value={22}>Regular Cleaning - Day</MenuItem>
                                <MenuItem value={23}>Regular Cleaning - Night</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classNames("flex ml-24")}>
                            <RadioGroup
                                aria-label="Work"
                                name="selectedWork"
                                className={classes.group}
                                value={this.state.selectedWork}
                                onChange={this.handleChange}
                                className={classNames(classes.formControl, "flex flex-row ml-24")}
                            >
                                <FormControlLabel className="ml-36 mr-48" value="additional_billing_office" control={<Radio />} label="Additional Billing Office" />
                                <FormControlLabel value="extrawork" control={<Radio />} label="Extra Work" />
                                <FormControlLabel value="regularwork" control={<Radio />} label="Regular Billing" />
                                <FormControlLabel value="client_supplies" control={<Radio />} label="Client Supplies" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Divider variant="middle" className={classNames(classes.formControl,"w-full")}/>
                    <div className="flex">
                        <InvoiceLineTable />
                    </div>
                    {/*<div className="flex">*/}
                        {/*<Button*/}
                            {/*variant="contained"*/}
                            {/*color="primary"*/}
                            {/*onClick={() => {*/}
                                {/*this.closeComposeDialog();*/}
                            {/*}}*/}
                            {/*disabled={!this.canBeSubmitted()}*/}
                        {/*>*/}
                            {/*Save & Close*/}
                        {/*</Button>*/}
                    {/*</div>*/}
                </div>
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openEditInvoiceForm: Actions.openEditInvoiceForm,
        closeEditInvoiceForm: Actions.closeEditInvoiceForm,
    }, dispatch);
}

function mapStateToProps({invoices, })
{
    return {
        InvoiceForm: invoices.InvoiceForm
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceForm)));

