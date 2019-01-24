import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

// core components
import {
    Paper, TextField, Typography, MenuItem, Card, CardHeader, CardContent, Divider, Button, Snackbar, SnackbarContent,
    IconButton, Icon, Grid, FormControlLabel, Checkbox, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog,Fab
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
import moment from 'moment'
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

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
        // padding: '0 0'
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
    },
    addCustomer: {

    }
});

const newInvoiceState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "InvoiceId": "",
    "InvoiceDate": moment().format('YYYY-MM-DD'),
    "DueDate": moment().format('YYYY-MM-DD'),
    // "InvoiceDate": new Date(),
    // "DueDate": new Date(),
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
    "Service":"",
    "notes": "",

};

const customerStatus = [
    {key: 'A', label: 'Active'}, {key: 'C', label: 'Cancelled'}, {key: 'I', label: 'InActive'},
    {key: 'S', label: 'Suspended'}, {key: 'O', label: 'One Time Clean Account'}, {key: 'T', label: 'Transferred'}
];

function renderSuggestion(suggestion, { query, isHighlighted }) {
    let statusName = '';
    if(suggestion!==null) {
        let status = suggestion.Status;
        let customerStatusObj = customerStatus.filter(c=>c.key===status);
        if(customerStatusObj.length>0) {
            statusName = customerStatusObj[0].label;
            console.log('status = ', statusName);
        }
    }

    const matches = match(suggestion.CustomerName+'-'+suggestion.CustomerNo, query);
    const parts = parse(suggestion.CustomerName+'-'+suggestion.CustomerNo, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            {/*<div>*/}
                {/*{parts.map((part, index) => {*/}
                    {/*return part.highlight ? (*/}
                        {/*<span key={String(index)} style={{ fontWeight: 700 }}>*/}
              {/*{part.text}*/}
            {/*</span>*/}
                    {/*) : (*/}
                        {/*<strong key={String(index)} style={{ fontWeight: 300 }}>*/}
                            {/*{part.text} - Status: {statusName}*/}
                        {/*</strong>*/}
                    {/*);*/}
                {/*})}*/}
            {/*</div>*/}
            <span>{suggestion.CustomerName} - {suggestion.CustomerNo} - <strong>{statusName}</strong></span>
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

class InvoiceForm extends Component {
    state = {
        ...newInvoiceState,
        value: '',
        suggestions: [],
        selectedCustomer: null,
        fSuggestions: [],
        selectedFranchisee: null,
        labelWidth: 0,
        selectedWork: "",
        total: 0.0,
        subTotal: 0.0,
        tax: 0,
        markup: 0.0,
        InvoiceNo: this.props.invoiceForm.type === 'new' ? "PENDING": '',
        snackMessage: "",
        openSnack: false,
        snackMessage1: "",
        openSnack1: false,
        PO_number: '',
        period: moment(),
        taxExempt: false,
        bAlertNewInvoice: false,
        bCustomerNotFound: false,
        buttonOption: 0, //0-save and add more, 1- save & close 2- submit for approval,
        franchiseeFromCustomer: null,
        bInvoiceFormClose: false,
        bSelectCustomerAgain: false,
        customerStatusLabel: ''
    };

    constructor(props) {
        super(props);
    }

    renderInputComponent = (inputProps ) => {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps ;

        return (
            <TextField
                fullWidth
                variant="outlined"
                label="Customer:"
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                    readOnly: this.props.invoiceForm.type !== 'new' ? true : false
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

    onSuggestionBlur = () =>{
        let statusName = '';

        if(this.state.selectedCustomer!==null) {
            let status = this.state.selectedCustomer.Status;
            let customerStatusObj = customerStatus.filter(c=>c.key===status);
            if(customerStatusObj.length>0) {
                statusName = customerStatusObj[0].label;
            }
        }

        this.setState({customerStatusLabel: statusName});

        if(this.state.selectedCustomer!==null) {
            let status = this.state.selectedCustomer.Status;

            if((status!=='A' || status!=='O') && this.props.invoiceForm.type === 'new')
                this.setState({bSelectCustomerAgain: true});
        }

    };

    onResetCustomerSelection =() =>{
        this.setState({selectedCustomer: null});
        this.setState({value: ''});
        this.setState({bSelectCustomerAgain: false});

        if(this.input) {
            // if(this.props.invoiceForm.type === 'new')
            //     setTimeout(() => {this.input.focus()}, 500);
        }
    };

    getSuggestionValue =  (suggestion) =>{
        this.setState({selectedCustomer: suggestion});
        this.setState({PO_number: suggestion.CustomerNo});
        this.setState({franchiseeFromCustomer: suggestion.Franchisees});

        let year = moment().year();
        let month = moment().month();
        let invoiceDate = moment();
        let dueDate = moment().year(year).month(month).endOf('month');

        this.setState({InvoiceDate: invoiceDate.format('YYYY-MM-DD')});
        this.setState({DueDate: dueDate.format('YYYY-MM-DD')});

        return suggestion.CustomerName + ' - ' + suggestion.CustomerNo;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');
        if(this.props.customers!==null) {
            let suggestions = this.props.customers.filter(customer => regex.test(customer.CustomerName) || regex.test(customer.CustomerNo));
            let suggestionsExcludedT = suggestions.filter(c=>c.Status!=='T');

            if(this.state.bCustomerNotFound)
                return suggestionsExcludedT;

            if(!this.state.bCustomerNotFound && suggestionsExcludedT.length===0) {
                // this.setState({bCustomerNotFound: true});
                // this.setState({value: ''});
            }

            return suggestionsExcludedT;
        }
    };

    getTotal = () => {
        if(this.state.selectedCustomer===null) return;

        let subTotal = 0.0;
        let markup = 0.0;
        let tax = 0.0;

        if(this.props.invoiceForm.data===null) return;

        const data = [...this.props.invoiceForm.data.line];

        data.forEach(n => {
            subTotal += parseFloat(n.extended);
            tax += parseFloat(n.tax);
            markup += parseFloat(n.markupAmount)
        });

        if(this.state.selectedCustomer.TaxExempt!=='N') tax = 0;

        this.setState({subTotal: subTotal});
        this.setState({markup: markup});
        this.setState({tax: tax});
        this.setState({total: subTotal+tax+markup});
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.invoiceForm.data!==null && this.props.invoiceForm.data!== prevProps.invoiceForm.data) {
            this.getTotal();
        }
        if(this.state.selectedCustomer!== null && JSON.stringify(this.state.selectedCustomer)!== JSON.stringify(this.props.invoiceForm.customer)) {
            this.props.selectCustomer(this.state.selectedCustomer);
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.invoiceForm.customer!==null){
            if(nextProps.invoiceForm.type==='edit') {
                this.setState({InvoiceNo: nextProps.invoices.invoiceDetail.Data.inv_no});
                this.setState({value: nextProps.invoiceForm.customer.CustomerName + ' - ' + nextProps.invoiceForm.customer.CustomerNo});
                this.setState({PO_number: nextProps.invoiceForm.customer.CustomerNo});
                this.setState({InvoiceDescription: nextProps.invoices.invoiceDetail.Data.Description});
                this.setState({notes: nextProps.invoices.invoiceDetail.Data.Notes});
                let year = moment().year();
                let month = moment().month();
                let invoiceDate = moment();
                let dueDate = moment().year(year).month(month).endOf('month');
                this.setState({InvoiceDate: invoiceDate.format('YYYY-MM-DD')});
                this.setState({DueDate: dueDate.format('YYYY-MM-DD')});

                // this.setState({InvoiceDate: moment(nextProps.invoices.invoiceDetail.Data.InvoiceDate).format('YYYY-MM-DD')});
                // this.setState({DueDate: moment(nextProps.invoices.invoiceDetail.Data.DueDate).format('YYYY-MM-DD')});
            }
        }

        //in time of Saving
        if(nextProps.newInvoice!==null && nextProps.newInvoice!==this.props.newInvoice){
            if(this.state.buttonOption===0){
                this.setState({snackMessage1: 'Saved!'});
                this.setState({openSnack1: true});

                this.props.updatedInvoices();
                this.props.resetInvoiceForm();
                this.setState({InvoiceDescription: ''});
                this.setState({notes: ''});
                this.setState({selectedCustomer: null});
                this.setState({value: ''});
                this.setState({CustomerNo: ''});
                this.setState({subTotal: 0});
                this.setState({markup: 0});
                this.setState({tax: 0});
                this.setState({total: 0});
                if(this.input) {
                    if(this.props.invoiceForm.type === 'new')
                        setTimeout(() => {this.input.focus()}, 500);
                }
            }
            else if(this.state.buttonOption===1) {
                this.props.updatedInvoices();
                this.setState({snackMessage1: 'Saved!'});
                this.setState({openSnack1: true});
                setTimeout(() => {this.closeComposeForm()}, 3000);
            }
        }
    }

    componentDidMount(){
        if(this.input) {
            if(this.props.invoiceForm.type === 'new')
                setTimeout(() => {this.input.focus()}, 500);
        }

        if(this.props.invoices.invoiceDetail){
            let invoiceDetail = this.props.invoices.invoiceDetail.Data;
            let customer = this.props.customers.filter(customer => customer.CustomerName===invoiceDetail.CustomerName && customer.CustomerNo===invoiceDetail.CustomerNo);
            if(customer.length>0) {
                this.setState({selectedCustomer: customer[0]});
            }
        }

        let year = moment().year();
        let month = moment().month();
        let invoiceDate = moment();
        let dueDate = moment().year(year).month(month).endOf('month');
        this.setState({InvoiceDate: invoiceDate.format('YYYY-MM-DD')});
        this.setState({DueDate: dueDate.format('YYYY-MM-DD')});
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    addNewInvoice = () => {
        let inv_no = 'PENDING';
        let items = [];
        let lines = this.props.invoiceForm.data.line;
        //
        lines.forEach(line=>{
            let item = {
                Inv_No: inv_no,
                ServiceTypeListId: 0,
                Description: line.description,
                Billing: line.billing.value,
                Service: line.service.label,
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
                TaxExcempt: this.state.selectedCustomer.TaxExempt,
                Distribution: [],
            };
            let franchisees = [];

            if(line.franchisees.length>0) {
                line.franchisees.forEach(f=>{
                    franchisees.push(
                        {
                            FranchiseeId: 12,
                            FranchiseeNumber: f.fnumber,
                            LineNo: 1,
                            Name: f.name,
                            Description: "Work done",
                            Amount: f.amount
                        }
                    )
                })
            }
            item.Distribution = franchisees;

            items.push(item);
        });

        if(this.props.invoiceForm.type === 'edit') {

        }

        let result;

        if(this.props.invoiceForm.type === 'new') {
            result = {
                Inv_No: inv_no,
                Apply_to: 'Apply To',
                CustomerId: this.state.selectedCustomer.CustomerId,
                CustomerNumber: this.state.PO_number,
                CustomerName: this.state.selectedCustomer.CustomerName,
                PeriodId: this.props.invoices.PeriodId[0],
                PeriodMonth: moment(this.state.period).month()+1,
                PeriodYear: moment(this.state.period).year(),
                Description: this.state.InvoiceDescription,
                Notes: this.state.notes,
                RegionId: this.props.regionId,
                BillRunId: 999,
                InvoiceDate: moment(this.state.InvoiceDate),
                DueDate: moment(this.state.DueDate),
                PONumber: this.state.PO_number,
                CreatedById: this.props.user.UserId,
                CreatedDate: this.props.invoiceForm.type === 'new' ? moment() : this.props.invoices.invoiceDetail.Data.CreatedDate,
                SubTotal: this.state.subTotal,
                MarkupAmountTotal :this.state.markup,
                CPIIncrease: 0.00,
                TaxTotal: this.state.tax,
                GrandTotal: this.state.total,
                TransactionStatusListId: 2,
                Status: 2,
                SysCust: this.state.selectedCustomer.SysCust,
                Fees: this.state.selectedCustomer.Fees,
                Items: items
            };
            this.props.addInvoice(this.props.regionId, result);
        }
        else {
            result = {
                ...this.props.invoices.invoiceDetail.Data,
                CustomerId: this.state.selectedCustomer.CustomerId,
                CustomerNumber: this.state.PO_number,
                CustomerName: this.state.selectedCustomer.CustomerName,
                PeriodId: this.props.invoices.PeriodId[0],
                PeriodMonth: moment(this.state.period).month()+1,
                PeriodYear: moment(this.state.period).year(),
                Description: this.state.InvoiceDescription,
                Notes: this.state.notes,
                RegionId: this.props.regionId,
                InvoiceDate: moment(this.state.InvoiceDate),
                DueDate: moment(this.state.DueDate),
                PONumber: this.state.PO_number,
                CreatedById: this.props.user.UserId,
                CreatedDate: this.props.invoiceForm.type === 'new' ? moment() : this.props.invoices.invoiceDetail.Data.CreatedDate,
                SubTotal: this.state.subTotal,
                MarkupAmountTotal :this.state.markup,
                TaxTotal: this.state.tax,
                GrandTotal: this.state.total,
                TransactionStatusListId: 2,
                Status: 2,
                Fees: this.state.selectedCustomer.Fees,
                Items: items
            };

            this.props.updateInvoice(this.props.invoices.invoiceDetail.Data._id, this.props.regionId, result);
        }

    };

    addNewCustomer = () => {
        this.setState({bCustomerNotFound: false})
    };

    isDisableButton = () => {
        let data = this.props.invoiceForm.data.line;
        if (data.length) {


        }

    };

    validateNewInvoice = () => {
        if(this.state.selectedCustomer===null){
            this.setState({snackMessage: 'Please choose customer from Invoice suggestion'});
            this.setState({openSnack: true});
            return false;
        }
        if(this.state.InvoiceDescription===''){
            this.setState({snackMessage: 'Please fill invoice description'});
            this.setState({openSnack: true});
            return false;
        }

        let data = this.props.invoiceForm.data.line;
        let bLineAmount = true;
        let bLineItemDescription = true;
        let bFrachiseeAmount = true;

        if(data.length) {
            _.forEach(data, line=>{
               if(line.amount==='' || parseFloat(line.amount)===0) {
                   bLineAmount = false;
                   return false
               }

                if(line.description==='') {
                    bLineItemDescription = false;
                    return false
                }

               let franchisees = line.franchisees;
               if(franchisees.length>0) {
                   _.forEach(franchisees, f=>{
                       if(f.amount===0) {
                           bFrachiseeAmount = false;
                           return false;
                       }
                   })
               }
               if(!bFrachiseeAmount) return false;
            });

            if(!bLineAmount) {
                this.setState({snackMessage: 'Please add item amount(s) to your invoice before saving!'});
                this.setState({openSnack: true});

                return false;
            }
            if(!bLineItemDescription) {
                this.setState({snackMessage: 'Please fill item description to your invoice before saving!'});
                this.setState({openSnack: true});

                return false;
            }
            if(!bFrachiseeAmount) {
                this.setState({snackMessage: 'Please add distribution amount(s) to your invoice before saving!'});
                this.setState({openSnack: true});

                return false;
            }
        }

        return true;
    };

    onSaveInvoice = (buttonOption) => {
        if(this.validateNewInvoice()){
            this.setState({buttonOption: buttonOption});
            this.addNewInvoice();
        }
    };

    onSaveAndAddMore=()=>{
        this.onSaveInvoice(0);
    };

    onSaveAndClose = () => {
        this.onSaveInvoice(1);
    };

    onSubmitForApproval=()=>{
        this.onSaveInvoice(2);
    };


    closeComposeForm = () => {
        this.props.invoiceForm.type === 'edit' ? this.props.closeEditInvoiceForm() : this.props.closeNewInvoiceForm();
    };

    handlePeriodChange = date => {
        this.setState({ period: date });
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    handleCloseNewInvoice = ()=>{
        this.setState({bAlertNewInvoice: false})
    };

    handleCloseNewCustomer = ()=>{
        this.setState({bCustomerNotFound: false})
    };


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };
    handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack1: false });
    };

    focusDescriptionInputField = input => {
        if ( input && this.props.invoiceForm.type === 'edit') {
            setTimeout(() => {input.focus()}, 500);
        }
    };

    openNewCustomerDialog =() => {
        this.setState({bCustomerNotFound: true})
    };


    handleInvoiceFormClose = () => {
        this.setState({ bInvoiceFormClose: false });
    };

    handleCustomerSelectDialogBoxClose = () => {
        this.setState({ bSelectCustomerAgain: false });
    };

    confirmCloseForm = () => {
        this.setState({ bInvoiceFormClose: true });
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
        if(this.props.invoiceForm.type === 'new') bReadonly = true;

        let statusName = '';

        if(this.state.selectedCustomer!==null) {
            let status = this.state.selectedCustomer.Status;
            let customerStatusObj = customerStatus.filter(c=>c.key===status);
            if(customerStatusObj.length>0) {
                statusName = customerStatusObj[0].label;
            }
        }

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="h-full flex flex-col relative">
                    <div className="flex flex-col p-24 pt-12 pb-0" style={{flex: "1"}}>
                        <Grid container className={classNames(classes.formControl)}>
                            <Grid item xs={12} sm={6} md={6} className="flex flex-row pr-16 items-center">
                                <Autosuggest
                                    {...autosuggestProps}
                                    inputProps={{
                                        classes,
                                        placeholder: 'Search Customer Name or Number',
                                        value: value,
                                        onChange: this.onChange,
                                        onBlur: this.onSuggestionBlur,
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
                                {this.props.invoiceForm.type === 'new' && (
                                    <Fab aria-label="remove" color="primary"
                                         onClick={this.openNewCustomerDialog}
                                         className={classNames(classes.addCustomer, "ml-12")} style={{width: 36, height: 36, minHeight: 36}}>
                                        <Icon>person_add</Icon>
                                    </Fab>
                                )}
                            </Grid>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <Grid item xs={12} sm={4} md={4} className="flex flex-row pl-16 pr-4">
                                    <DatePicker
                                        margin="none"
                                        label="Period"
                                        name="InvoicePeriod"
                                        variant="outlined"
                                        format="MM/YYYY"
                                        className={classes.textField}
                                        value={this.state.period}
                                        onChange={this.handlePeriodChange}
                                        fullWidth
                                        required
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        openToYearSelection={true}
                                    />
                                    <TextField
                                        margin="none"
                                        label="Invoice Date"
                                        name="InvoiceDate"
                                        type="date"
                                        variant="outlined"
                                        value={this.state.InvoiceDate}
                                        onChange={this.handleChange}
                                        fullWidth
                                        required
                                        className={classes.textField}
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
                                    <TextField
                                        margin="none"
                                        label="Due Date"
                                        name="DueDate"
                                        type="date"
                                        variant="outlined"
                                        value={this.state.DueDate}
                                        onChange={this.handleChange}
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
                                <Grid item xs={12} sm={1} md={1} className="flex flex-row xs:flex-col xs:mb-24 pr-4 pl-4" style={{display: 'none', padding: '0 6px!important'}}>
                                    {/*<DatePicker*/}
                                    {/*margin="none"*/}
                                    {/*label="Invoice Date"*/}
                                    {/*name="InvoiceDate"*/}
                                    {/*variant="outlined"*/}
                                    {/*format="MM/DD/YYYY"*/}
                                    {/*value={this.state.InvoiceDate}*/}
                                    {/*onChange={this.handleInvoiceDateChange}*/}
                                    {/*fullWidth*/}
                                    {/*required*/}
                                    {/*InputProps={{*/}
                                    {/*classes: {*/}
                                    {/*input: classes.input1,*/}
                                    {/*},*/}
                                    {/*}}*/}
                                    {/*InputLabelProps = {{*/}
                                    {/*shrink: true,*/}
                                    {/*classes: {outlined: classes.label}*/}
                                    {/*}}*/}
                                    {/*/>*/}

                                </Grid>
                                <Grid item xs={12} sm={1} md={1} className="flex flex-row xs:flex-col pr-4 pl-4"
                                      style={{padding: '0 6px!important', display: 'none'}}>
                                    {/*<DatePicker*/}
                                    {/*margin="none"*/}
                                    {/*label="Due Date"*/}
                                    {/*format="MM/DD/YYYY"*/}
                                    {/*name="DueDate"*/}
                                    {/*variant="outlined"*/}
                                    {/*value={this.state.DueDate}*/}
                                    {/*onChange={this.handleDueDateChange}*/}
                                    {/*required*/}
                                    {/*fullWidth*/}
                                    {/*InputProps={{*/}
                                    {/*classes: {*/}
                                    {/*input: classes.input1,*/}
                                    {/*},*/}
                                    {/*}}*/}
                                    {/*InputLabelProps = {{*/}
                                    {/*shrink: true,*/}
                                    {/*classes: {outlined: classes.label}*/}
                                    {/*}}*/}
                                    {/*/>*/}
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={12} sm={2} md={2} className="flex flex-row xs:flex-col pl-4" >
                                <TextField
                                    margin="none"
                                    label="P.O #"
                                    placeholder="P.O #"
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                    name="PO_number"
                                    variant="outlined"
                                    value={this.state.PO_number}
                                    onChange={this.handleChange}
                                    required
                                    fullWidth
                                    style={{paddingRight: 4}}
                                />
                                <TextField
                                    margin="none"
                                    label="Invoice #"
                                    placeholder="Invoice #"
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
                                    style = {{paddingLeft: 4,fontSize: this.props.invoiceForm.type === 'new' ? '18px!important': 'inherit',
                                        fontWeight: this.props.invoiceForm.type === 'new' ? 700: 'inherit'
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <GridContainer className={classNames(classes.formControl, "mb-0")}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col">
                                <Card className={classes.card}>
                                    <CardHeader title="Customer" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>
                                        <div className="flex flex-row justify-between mb-4">
                                            <div className="flex flex-row">
                                                <Icon fontSize={"small"} className="mr-4">account_circle</Icon>
                                                <Typography variant="subtitle1" color="inherit">
                                                    <strong>{this.state.selectedCustomer ? this.state.selectedCustomer.CustomerName: this.state.value}</strong>
                                                </Typography>
                                            </div>
                                            <Typography variant="subtitle1" color="inherit">
                                                <strong>Customer #: {this.state.selectedCustomer? this.state.selectedCustomer.CustomerNo: this.state.CustomerNo}</strong>
                                            </Typography>
                                        </div>
                                        {this.state.selectedCustomer && (
                                            <div className="flex flex-row justify-between mb-4">
                                                <div className="flex flex-row items-center">
                                                    <Icon fontSize={"small"} className="mr-4">place</Icon>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {this.state.selectedCustomer.Address}, {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                                    </Typography>
                                                </div>
                                                <Typography variant="subtitle1" color="inherit">
                                                    <strong>Customer Status: {statusName}</strong>
                                                </Typography>
                                            </div>
                                        )}
                                        {this.state.selectedCustomer && (
                                            <div className="flex flex-row justify-between mb-4">
                                                <div className="flex flex-row items-center">
                                                    <Icon fontSize={"small"} className="mr-4">smartphone</Icon>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        <NumberFormat value={this.state.selectedCustomer.Phone} displayType={'text'}  format="+1 (###) ###-####" mask="_" renderText={value => <div>{value}</div>} />
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
                                        <div className="flex flex-row justify-between mb-4">
                                            <div className="flex flex-row">
                                                <Icon fontSize={"small"} className="mr-4">account_circle</Icon>
                                                <Typography variant="subtitle1" color="inherit">
                                                    <strong>{this.state.selectedCustomer ? this.state.selectedCustomer.BillingCustomerName: this.state.value}</strong>
                                                </Typography>
                                            </div>
                                        </div>
                                        {this.state.selectedCustomer && (
                                            <div className="flex flex-row justify-start mb-4">
                                                <div className="flex flex-row items-center">
                                                    <Icon fontSize={"small"} className="mr-4">place</Icon>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {this.state.selectedCustomer.BillingAddress}, {this.state.selectedCustomer.BillingCity}, {this.state.selectedCustomer.BillingState} {this.state.selectedCustomer.BillingPostalCode}
                                                    </Typography>
                                                </div>
                                            </div>
                                        )}
                                        {this.state.selectedCustomer && (
                                            <div className="flex flex-row justify-between mb-4">
                                                <div className="flex flex-row items-center">
                                                    <Icon fontSize={"small"} className="mr-4">smartphone</Icon>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        <NumberFormat value={this.state.selectedCustomer.Phone} displayType={'text'}  format="+1 (###) ###-####" mask="_" renderText={value => <div>{value}</div>} />
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="taxExempt"
                                                                checked={this.state.selectedCustomer.TaxExempt==='Y' ? true : false}
                                                                onChange={this.handleChange}
                                                                value="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled
                                                            />
                                                        }
                                                        label="Tax Exempt"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </GridItem>
                        </GridContainer>
                        <div className="w-full mt-4">
                            <TextField
                                id="InvoiceDescription"
                                name="InvoiceDescription"
                                label="Description"
                                className={classes.textField}
                                value={this.state.InvoiceDescription}
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
                                inputRef={this.focusDescriptionInputField}
                            />
                        </div>
                        <Grid container className={classNames(classes.formControl)} style={{flex: "9999 1 0"}}>
                            <Grid item xs={12} sm={12} md={12} className="flex flex-row xs:flex-col xs:mb-24">
                                <InvoiceLineTable fn={this.state.franchiseeFromCustomer}/>
                            </Grid>
                        </Grid>
                        <Divider variant="middle"/>
                    </div>
                    <div className="flex flex-shrink flex-col w-full pl-24 pr-24 pt-0 pb-12">
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={9} md={9} className="flex flex-col xs:flex-col xs:mb-24">
                                <div className="w-full">
                                    <TextField
                                        id="notes"
                                        name="notes"
                                        label="Note"
                                        className={classes.textField}
                                        value={this.state.notes}
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
                                        { this.props.invoiceForm.type === 'new' && (
                                            <span>Save & Add more</span>
                                        )}
                                        { this.props.invoiceForm.type === 'edit' && (
                                            <span>Update & Add more</span>
                                        )}
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
                                        { this.props.invoiceForm.type === 'new' && (
                                            <span>Save & Close</span>
                                        )}
                                        { this.props.invoiceForm.type !== 'new' && (
                                            <span>Update & Close</span>
                                        )}
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12 hidden")}
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
                                        onClick={()=>this.confirmCloseForm()}
                                    >
                                        Close
                                    </Button>
                                </FuseAnimate>
                            </div>
                        </div>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
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
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.openSnack1}
                        autoHideDuration={3000}
                        onClose={this.handleClose1}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose1}
                            variant="success"
                            message={this.state.snackMessage1}
                        />
                    </Snackbar>
                    <Dialog
                        open={this.state.bCustomerNotFound}
                        onClose={()=>this.handleCloseNewCustomer()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Customer Alert
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                The customer doesn't exist.<br/>
                                Do you want to create new customer?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.handleCloseNewCustomer()} color="primary">
                                Close
                            </Button>
                            <Button component={Link} to="/customers/list"  color="secondary" autoFocus>
                                Create New Customer
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.bInvoiceFormClose}
                        onClose={this.handleInvoiceFormClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Invoice Form"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Proceed to close without saving?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.handleInvoiceFormClose()} color="primary" autoFocus>
                                No
                            </Button>
                            <Button onClick={()=>this.closeComposeForm()} color="primary" autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.bSelectCustomerAgain}
                        onClose={this.handleCustomerSelectDialogBoxClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Invoice Form"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Customer has a {this.state.customerStatusLabel} Status. Proceed to create new invoice?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.onResetCustomerSelection()} color="primary" autoFocus>
                                No
                            </Button>
                            <Button onClick={()=>this.handleCustomerSelectDialogBoxClose()} color="primary" autoFocus>
                                Yes
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
        openEditInvoiceForm: Actions.openEditInvoiceForm,
        closeEditInvoiceForm: Actions.closeEditInvoiceForm,
        closeNewInvoiceForm : Actions.closeNewInvoiceForm,
        selectCustomer: Actions.selectCustomer,
        resetInvoiceForm: Actions.resetInvoiceForm,
        addInvoice: Actions.addInvoice,
        updateInvoice: Actions.updateInvoice,
        updatedInvoices: Actions.updatedInvoices,
    }, dispatch);
}

function mapStateToProps({invoices, auth, franchisees})
{
    return {
        invoiceForm: invoices.invoiceForm,
        invoices: invoices,
        newInvoice: invoices.newInvoice,
        user: auth.login,
        regionId: auth.login.defaultRegionId,
        bStartingSaveFormData: invoices.bStartingSaveFormData,
        franchisees: franchisees.franchiseesDB,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceForm)));
