import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// core components
import {
    Paper, TextField, Typography, MenuItem, Card, CardHeader, CardContent, Divider, Button, Snackbar, SnackbarContent,
    IconButton, Icon, Grid, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog
} from '@material-ui/core';
import 'date-fns'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';


// theme components
import {FuseAnimate} from '@fuse';
import {withStyles} from "@material-ui/core";

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import TransactionTable from "./transactionLine"

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from '../../../../store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import Chance from 'chance'
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import moment from 'moment'
import PropTypes from 'prop-types';

//Utility
import {escapeRegexCharacters} from 'services/utils'

const styles = theme => ({
    layoutForm: {
        flexDirection: 'row',
    },
    button: {
        '& span': {
            textTransform: 'none'
        }
    },
    card: {
        width: '100%',
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 12,
        minWidth: 200,
    },
    textField: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },
    summary: {
        fontSize: 15,
        fontWeight: 700
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
    cardHeader: {
        backgroundColor: theme.palette.secondary.main,
        padding: '8px 24px',
        '& span': {
            color: 'white',
            fontSize: 16,
        }
    },
    cardContent: {
        paddingTop: 12,
        paddingBottom: '12px!important',
        '& h6': {
            lineHeight: 1.6,
            fontSize: 14
        }
    },
    input: {
        padding: '12px 14px'
    },
    input1: {
        padding: '12px 6px'
    },

    label: {
        transform: 'translate(14px, 14px) scale(1)'
    },
    inputOrange: {
        padding: '12px 14px',
        color: 'orange'
    },
    dropdownMenu: {
        '& li': {
            fontSize: 12,
            height: 12,
        }
    },
    picker: {
        padding: '0 6px'
    }
})

const chance = new Chance();

const newInvoiceState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "InvoiceId": "",
    "TransactionDate": new Date(),
    "Date": new Date(),
    "CustomerId": "",
    "franchiseeNo": "",
    "CustomerName": "",
    "EBill": "",
    "PrintInvoice": "",
    "FranchiseeDescription": "",
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
    "Service":"",
    "notes": ""
};

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.Name, query);
    const parts = parse(suggestion.Name, matches);

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

//Snackbar
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);


class TransactionForm extends Component {
    state = {
        franchisees: [],
        ...newInvoiceState,
        value: '',
        suggestions: [],
        fSuggestions: [],
        selectedFranchisee: null,
        labelWidth: 0,
        selectedWork: "",
        total: 0.0,
        subTotal: 0.0,
        tax: 0,
        markup: 0.0,
        InvoiceNo: "",
        snackMessage: "",
        openSnack: false,
        PO_number: '',
        period: moment(),
        taxExempt: false,
        bAlertNewTransaction: false,
        buttonOption: 0, //0-save and add more, 1- save & close 2- submit for approval
    };

    renderInputComponent = (inputProps ) => {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps ;

        return (
            <TextField
                fullWidth
                variant="outlined"
                label="Franchisee:"
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                InputLabelProps = {{
                    classes: {outlined: classes.label}
                }}
                required
                {...other}
                autoFocus={true}
            />
        );
    };

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
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
        this.setState({selectedFranchisee: suggestion});
        this.setState({PO_number: suggestion.franchiseeNo});
        return suggestion.Name;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');
        if(this.props.franchisees!==null)
            return this.props.franchisees.filter(f => regex.test(f.Name));
    };

    getTotal = () => {
        let subTotal = 0.0;
        let markup = 0.0;
        let tax = 0.0;

        if(this.props.transactionForm.data===null) return;

        const data = [...this.props.transactionForm.data.line];
        console.log('line=', this.props.transactionForm.data.line);
        data.forEach(n => {
            let mk = 0.;
            let qty = 0;
            if(n.quantity!=='') qty = n.quantity;
            if(n.markup!=='') mk = n.markup;
            subTotal += parseFloat(n.extended);
            tax += parseFloat(n.tax);
            markup += parseFloat(n.extended*qty*parseFloat(mk)/100);
        });

        console.log('aaaaa', subTotal, markup, tax, subTotal+tax+markup);

        this.setState({subTotal: subTotal});
        this.setState({markup: markup});
        this.setState({tax: tax});
        this.setState({total: subTotal+tax+markup});
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.transactionForm!== prevProps.transactionForm) {
            this.getTotal();
        }
        if(this.state.selectedFranchisee!== null && JSON.stringify(this.state.selectedFranchisee)!== JSON.stringify(this.props.transactionForm.franchisee)) {
            this.props.selectFranchisee(this.state.selectedFranchisee);
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
        // if(nextProps.invoiceForm.customer!==null){
        //     if(nextProps.invoiceForm.type==='edit')
        //         this.setState({InvoiceNo: nextProps.invoiceForm.customer.InvoiceNo});
        //     this.setState({value: nextProps.invoiceForm.customer.CustomerName});
        //     this.setState({franchiseeNo: nextProps.invoiceForm.customer.franchiseeNo});
        //     this.setState({InvoiceDate: moment(nextProps.invoiceForm.customer.InvoiceDate)});
        //     this.setState({Date: moment(nextProps.invoiceForm.customer.Date)});
        // }
        //
        // if(nextProps.newInvoice!==null && nextProps.newInvoice!==this.props.newInvoice){
        //     this.setState({bAlertNewTransaction: false});
        //     if(this.state.buttonOption===0){
        //         this.props.resetInvoiceForm();
        //         this.setState({FranchiseeDescription: ''});
        //         this.setState({note: ''});
        //         this.setState({selectedFranchisee: null});
        //         this.setState({value: ''});
        //         this.setState({franchiseeNo: ''});
        //     }
        //     else if(this.state.buttonOption===1) {
        //         this.closeComposeForm();
        //     }
        //     else if(this.state.buttonOption===2) {
        //         this.closeComposeForm();
        //     }
        // }
    }

    componentDidMount(){
        if(this.props.transactionForm.type === 'new')
            this.setState({InvoiceNo: "PENDING"});

        if(this.input) {
            setTimeout(() => {this.input.focus()}, 500);
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    addNewInvoice = () => {
        let inv_no = chance.guid()+'_pending';
        let items = [];
        let lines = this.props.transactionForm.data.line;
        //
        lines.forEach(line=>{
            let item = {
                Inv_No: inv_no,
                ServiceTypeListId: 0,
                Description: line.description,
                Type: line.type,
                Frequency: line.frequency,
                LineNo: 1,
                UnitPrice: parseFloat(line.amount),
                Quantity: parseInt(line.quantity),
                TaxRate: line.tax,
                ExtendedPrice: line.extended,
                Total: line.total,
                MarkUpTotal: line.markup,
                Commission: 0,
                CommissionTotal: 0,
                ExtraWork: 1,
            };

            items.push(item);
        });

        let result = {
            Inv_No: inv_no,
            Apply_to: 'Apply To',
            PeriodId: this.props.invoices.PeriodId[0],
            Description: this.state.FranchiseeDescription,
            Notes: this.state.note,
            RegionId: this.props.regionId,
            BillRunId: 999,
            InvoiceDate: this.state.InvoiceDate,
            Date: this.state.Date,
            CreatedById: this.props.user.UserId,
            CreatedDate: moment(),
            SubTotal: this.state.subTotal,
            MarkupAmountTotal :this.state.markup,
            TaxTotal: this.state.tax,
            GrandTotal: this.state.total,
            TransactionStatusListId: 2,
            Status: 2,
            SysCust: 2,
            Items: items
        };
        this.props.addInvoice(this.props.regionId, result);
        console.log('result', JSON.stringify(result));
    };

    validateNewTransaction = () => {
        if(this.state.selectedFranchisee===null){
            this.setState({snackMessage: 'Please choose a franchisee from Franchisee suggestion'});
            this.setState({openSnack: true});
            return false;
        }

        return true;
    };

    onSaveTransaction = (buttonOption) => {
        if(this.validateNewTransaction()){
            this.setState({bAlertNewTransaction: true});
            this.setState({buttonOption: buttonOption});
        }
    };

    onSaveAndAddMore=()=>{
        this.onSaveTransaction(0);
    };

    onSaveAndClose = () => {
        this.onSaveTransaction(1);
        this.closeComposeForm();
    };

    onSubmitForApproval=()=>{
        this.onSaveTransaction(2);
    };

    closeComposeForm = () => {
        this.props.transactionForm.type === 'edit' ? this.props.closeEditTransactionForm() : this.props.closeNewTransactionForm();
    };

    handleDueDateChange = date => {
        this.setState({ Date: date});
    };
    handleTransactionDateChange = date => {
        this.setState({ TransactionDate: date });
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    handleCloseNewInvoice = ()=>{
        this.setState({bAlertNewTransaction: false})
    };


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };


    render()
    {
        const { classes} = this.props;
        const { value, suggestions } = this.state;

        const today = new Date();

        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };

        let bReadonly = false;
        if(this.props.transactionForm.type === 'new') bReadonly = true;

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="h-full flex flex-col relative">
                    <div className="flex flex-col p-24 pt-12 pb-0" style={{flex: "1"}}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid container className={classNames(classes.formControl)}>
                                <Grid item xs={12} sm={6} md={6} className="flex flex-row pr-16">
                                    <Autosuggest
                                        {...autosuggestProps}
                                        inputProps={{
                                            classes,
                                            placeholder: 'Search Franchisee Name',
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
                                        ref={this.storeInputReference}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} className="flex flex-row xs:flex-col xs:mb-24 pr-8 pl-16" style={{padding: '0 6px!important'}}>
                                    <DatePicker
                                        margin="none"
                                        label="Transaction Date"
                                        name="TransactionDate"
                                        variant="outlined"
                                        format="MM/DD/YYYY"
                                        value={this.state.TransactionDate}
                                        onChange={this.handleTransactionDateChange}
                                        fullWidth
                                        required
                                        InputProps={{
                                            classes: {
                                                input: classes.input1,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} className="flex flex-row xs:flex-col pr-8 pl-8"
                                      style={{padding: '0 6px!important'}}>
                                    <DatePicker
                                        margin="none"
                                        label="Due Date"
                                        format="MM/DD/YYYY"
                                        name="Date"
                                        variant="outlined"
                                        value={this.state.Date}
                                        onChange={this.handleDueDateChange}
                                        required
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.input1,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} className="flex flex-row xs:flex-col pl-4" >
                                    <TextField
                                        margin="none"
                                        label="Transaction #"
                                        placeholder="Transaction #"
                                        InputProps={{
                                            readOnly: bReadonly,
                                            classes: {
                                                input: bReadonly? classes.inputOrange: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        name="InvoiceNo"
                                        variant="outlined"
                                        value={this.state.InvoiceNo}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        style = {{paddingLeft: 4,fontSize: this.props.transactionForm.type === 'new' ? '18px!important': 'inherit',
                                            fontWeight: this.props.transactionForm.type === 'new' ? 700: 'inherit'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <GridContainer className={classNames(classes.formControl, "mb-0")}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col">
                                <Card className={classes.card}>
                                    <CardHeader title="Franchisee Transaction" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>
                                        <div className="flex flex-row justify-between mb-4">
                                            <div className="flex flex-row">
                                                <Icon fontSize={"small"} className="mr-4">account_circle</Icon>
                                                <Typography variant="subtitle1" color="inherit">
                                                    <strong>{this.state.selectedFranchisee ? this.state.selectedFranchisee.Name: this.state.value}</strong>
                                                </Typography>
                                            </div>
                                            <Typography variant="subtitle1" color="inherit">
                                                <strong>Franchisee #: {this.state.selectedFranchisee? this.state.selectedFranchisee.Number: this.state.franchiseeNo}</strong>
                                            </Typography>
                                        </div>
                                        {this.state.selectedFranchisee && (
                                            <div className="flex flex-row justify-start mb-4">
                                                <div className="flex flex-row items-center">
                                                    <Icon fontSize={"small"} className="mr-4">place</Icon>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {this.state.selectedFranchisee.Address}
                                                    </Typography>
                                                </div>
                                            </div>
                                        )}
                                        {this.state.selectedFranchisee && (
                                            <div className="flex flex-row justify-between mb-4">
                                                <div className="flex flex-row items-center">
                                                    <Icon fontSize={"small"} className="mr-4">smartphone</Icon>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {this.state.selectedFranchisee.Phone}
                                                    </Typography>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} className= "flex flex-row justify-end xs:flex-col">
                                <Card className={classes.card}>
                                    <CardHeader title="Billing" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>

                                    </CardContent>
                                </Card>
                            </GridItem>
                        </GridContainer>
                        <div className="w-full mt-4">
                            <TextField
                                id="FranchiseeDescription"
                                name="FranchiseeDescription"
                                label="Description"
                                className={classes.textField}
                                value={this.state.FranchiseeDescription}
                                onChange={this.handleChange}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.input, multiline: classes.input
                                    },
                                }}
                            />
                        </div>
                        <Grid container className={classNames(classes.formControl)} style={{flex: "9999 1 0"}}>
                            <Grid item xs={12} sm={12} md={12} className="flex flex-row xs:flex-col xs:mb-24">
                                <TransactionTable />
                            </Grid>
                        </Grid>
                        <Divider variant="middle"/>
                    </div>
                    <div className="flex flex-shrink flex-col w-full pl-24 pr-24 pt-0 pb-12">
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={9} md={9} className="flex flex-col xs:flex-col xs:mb-24">
                                <div className="w-full">
                                    <TextField
                                        id="note"
                                        name="note"
                                        label="Note"
                                        className={classes.textField}
                                        value={this.state.note}
                                        onChange={this.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.input, multiline: classes.input
                                            },
                                        }}
                                        rows={3}
                                    />
                                </div>
                            </GridItem>
                            <GridItem xs={12} sm={3} md={3} className="flex flex-col xs:flex-col xs:mb-24">
                                <div className="w-full p-12 flex justify-end pb-0">
                                    <span className={classes.summary}><strong>Subtotal: </strong>${this.state.subTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end pb-0 pt-6 ">
                                    <span className={classes.summary}><strong>Markup Total: </strong>${this.state.markup.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end pt-6 pb-6">
                                    <span className={classes.summary}><strong>Tax: </strong>${this.state.tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end  pt-6 pb-6">
                                    <span className={classes.summary}><strong>Grand Total: </strong>${this.state.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className="flex flex-1 flex-row justify-between items-center">
                            <div className="flex flex-row justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                                </FuseAnimate>
                            </div>
                            <div className="flex flex-1 flex-row justify-end">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSaveAndAddMore();
                                        }}
                                    >
                                        Save & Add more
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSaveAndClose();
                                        }}
                                    >
                                        Save & Close
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSubmitForApproval();
                                        }}
                                    >
                                        Submit for Approval
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => {
                                            this.closeComposeForm();
                                        }}
                                    >
                                        Close
                                    </Button>
                                </FuseAnimate>
                            </div>
                        </div>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnack}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose}
                            variant="error"
                            message={this.state.snackMessage}
                        />
                    </Snackbar>
                    <Dialog
                        open={this.state.bAlertNewTransaction}
                        onClose={()=>this.handleCloseNewInvoice()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Create New Invoice"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you really want to insert the new invoice?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.handleCloseNewInvoice()} color="primary">
                                Close
                            </Button>
                            <Button onClick={()=>this.addNewInvoice()} color="primary" autoFocus>
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditTransactionForm: Actions.closeEditTransactionForm,
        closeNewTransactionForm : Actions.closeNewTransactionForm,
        selectCustomer: Actions.selectCustomer,
        resetInvoiceForm: Actions.resetInvoiceForm,
        addInvoice: Actions.addInvoice,
        selectFranchisee: Actions.selectFranchisee
    }, dispatch);
}

function mapStateToProps({transactions, auth})
{
    return {
        transactionForm: transactions.transactionForm,
        newTransaction: transactions.newTransaction,
        user: auth.login,
        regionId: auth.login.defaultRegionId,
        // bStartingSaveFormData: invoices.bStartingSaveFormData
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionForm)));
