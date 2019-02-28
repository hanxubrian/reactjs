import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// Material-UI core components
import {
    Paper, TextField, Typography, MenuItem, Card, CardHeader, CardContent, Button, Snackbar, SnackbarContent,Select, Checkbox,
    IconButton, Icon, Grid, OutlinedInput, FormControl, FormControlLabel, NoSsr, Radio,RadioGroup, FormLabel, Divider,
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
import Select1 from 'react-select';
import VendorDialogBox from "./vendorDialogBox";

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from '../../../../store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import moment from 'moment'
import PropTypes from 'prop-types';

//Utility
import { Control, Menu, NoOptionsMessage, Option, Placeholder, SingleValue, ValueContainer} from "../../accounts-receivable/Invoice/selectUtils";
import {emphasize} from "@material-ui/core/styles/colorManipulator";
import {
    escapeRegexCharacters,
    NumberFormatCustom1,
    NumberFormatCustom2,
} from "../../../../services/utils";


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
        '& .no-padding': {
            padding: '0!important'
        }
    },
    formControl1: {
        marginBottom: 12,
        width: 120,
        '& .no-padding': {
            padding: '0!important'
        }
    },
    formControlNomb: {
        marginBottom: 0,
    },
    textField: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },
    textField1: {
        marginLeft: 0,
        marginRight: 0,
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
    inputp: {
        padding: '12px 6px'
    },
    inputReadonly:{
        padding: '12px 14px',
        // backgroundColor: '#eee'
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
    root1: {
        flexGrow: 1,
    },
    input2: {
        display: 'flex',
        padding: '12px 12px'
    },
    input1: {
        display: 'flex',
        padding: '0px 12px'
    },

    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 14,
    },
    placeholder: {
        position: 'absolute',
        left: 6,
        fontSize: 14,
    },
    paper: {
        position: 'absolute',
        zIndex: '9999!important',
        marginTop: theme.spacing.unit,
        fontSize: 14,
        left: 0,
        right: 0
    },
    inputMenu: {
        padding: '10px 16px'
    },
    inputMenu1: {
        padding: '10px 16px',
        maxWidth: 125
    },
    inputMenu2: {
        padding: '10px 16px',
        maxWidth: '100%'
    },

    group: {
        flexDirection: 'row',
        '& label': {
            minWidth: 150
        }
    },
    frequencyMenu:{
        maxWidth: 120
    },
    TrxClass: {
        maxWidth: 150
    },
    hidden: {
        display: 'none'
    }
});


const newTransactionState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "TransactionPeriod": moment().format('MM/YYYY'),
    "TransactionDate": moment(),
    "Date": new Date(),
    "franchiseeNo": "",
    "transactionDescription": "",
    "CPI": "",
    "TransactionStatusListId": "",
    "TransactionStatus": "",
    "EBillText": "",
    "IsOpen": "",
    "Service":"",
    "notes": ""
};

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.Name + ' - ' + suggestion.Number + ' - ' + suggestion.StatusName, query);
    const parts = parse(suggestion.Name + ' - ' + suggestion.Number+ ' - ' + suggestion.StatusName, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <span>{suggestion.Name} - {suggestion.Number} - <strong>{suggestion.StatusName}</strong></span>
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
    singleValue:{
        fontSize: 13
    }

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


class TransactionEditForm extends Component {
    state = {
        ...newTransactionState,
        value: '',
        suggestions: [],
        fSuggestions: [],
        selectedFranchisee: null,
        labelWidth: 0,
        selectedWork: "",
        TransactionNo: "PENDING",
        snackMessage: "",
        openSnack: false,
        period: moment(),
        taxExempt: false,
        buttonOption: 0, //0-save and add more, 1- save & close 2- submit for approval,
        TrxType: {label: 'Advance Fee', value:'5c5320066846d776488590f1'},
        transactionFrequency: "single",
        reSell: false,
        quantity: 1,
        unitPrice: 0,
        subTotal: 0,
        total: 0.0,
        tax: 0,
        payments: 1,
        paymentsDate: new Date(),
        grossTotal: 0,
        startDate: moment(),
        TrxChargeType: 'D',
        deductionReason: '',
        trxClassAmount: 0.00,
        periods: null,
        vendorList: null,
        year: moment().year(),
        month: moment().month(),
    };

    constructor(props){
        super(props);
    }

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
                    readOnly: this.props.transactionForm.type === 'edit' && this.props.transactionForm.franchisee!==null
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
        return suggestion.Name;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');
        let franchisees = this.props.franchisees.Data.Region[0].Franchisees;

        if(franchisees!==null)
            return franchisees.filter(f => regex.test(f.Name) || regex.test(f.Number)|| regex.test(f.StatusName));
    };

    getTotal = () => {
        let quantity =  this.state.quantity;
        let unitPrice = this.state.unitPrice;
        let payments = this.state.payments;

        if(quantity>0 && unitPrice>0 && this.props.transactionForm.franchisee!==null) {
            if(this.props.transactionTax!==null) {
                let tax = this.props.transactionTax.TotalTaxAmount;
                if (this.state.TrxType.value !== '5c5320066846d77648859107') tax = 0.0;
                if (this.state.reSell) tax = 0.0;

                let line_total = parseFloat(quantity * unitPrice + tax);
                this.setState({subTotal: parseFloat(quantity * unitPrice)});
                this.setState({tax: parseFloat(tax)});
                this.setState({total: parseFloat(quantity * unitPrice + tax)});

                if (this.state.transactionFrequency === 'recurring' && payments > 0) {
                    this.setState({grossTotal: parseFloat(payments * line_total)});
                }
            }
        }

    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.transactionForm!== prevProps.transactionForm) {
            // this.getTotal();
        }
        if(this.state.selectedFranchisee!== null && JSON.stringify(this.state.selectedFranchisee)!== JSON.stringify(this.props.transactionForm.franchisee)) {
            this.props.selectFranchisee(this.state.selectedFranchisee);
        }

        if(prevState.reSell!==this.state.reSell) {
            this.getTotal();
        }

        if( this.props.transactionForm.franchisee!==null && (prevProps.transactionForm.franchisee!==this.props.transactionForm.franchisee)) {
            let period = this.state.TransactionPeriod.split('/');
            this.props.createReport({
                regionId: this.props.regionId,
                year: parseInt(period[1]),
                month: parseInt(period[0]),
                franchiseenumber: this.props.transactionForm.franchisee.Number
            });
        }
        if( this.props.transactionForm.franchisee!==null && (this.state.TransactionPeriod!==prevState.TransactionPeriod)) {
            this.props.nullifyFranchiseeReport();
            let period = this.state.TransactionPeriod.split('/');
            this.props.createReport({
                regionId: this.props.regionId,
                year: parseInt(period[1]),
                month: parseInt(period[0]),
                franchiseenumber: this.props.transactionForm.franchisee.Number
            });
        }

        if(this.props.transactionTax !==prevProps.transactionTax && this.props.transactionTax!==null){
            this.getTotal();
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newTransaction!==null && nextProps.newTransaction!==this.props.newTransaction){
            if(this.state.buttonOption===0){
                this.props.resetTransactionForm();
                this.setState({transactionDescription: ''});
                this.setState({selectedFranchisee: null});
                this.setState({value: ''});
                this.setState({franchiseeNo: ''});
                this.setState({TrxType: {label: 'Advance Fee', value:'5c5320066846d776488590f1'}});
                this.setState({transactionFrequency: "single"});
                this.setState({reSell: false});
                this.setState({quantity: 1});
                this.setState({unitPrice: 0});
                this.setState({subTotal: 0});
                this.setState({total: 0.0});
                this.setState({tax: 0.0});
                this.setState({payments: 1});
                this.setState({paymentsDate: new Date()});
                this.setState({grossTotal: 0});
                this.setState({startDate: moment()});
                this.props.updateVendor({vendor: {value:'', label: ''}, vendor_no: '', vendorDate: moment().format('YYYY-MM-DD')});
                if(this.input) {
                    setTimeout(() => {this.input.focus()}, 500);
                }
            }
            else if(this.state.buttonOption===1) {
                this.closeComposeForm();
            }
        }
    }

    componentDidMount = () =>{

        fetch(`https://apifmsplusplus_mongo.jkdev.com/v1/vendors/getvendorlist?regionId=${this.props.regionId}`)
            .then(response => response.json())
            .then(data => this.setState({ vendorList: data }));


        if(this.props.transactionForm.type === 'new') {
            this.setState({TransactionNo: "PENDING"});

            if(this.props.all_regions) {
                let all_regions = this.props.all_regions;
                let region = all_regions.filter(r => r.regionid === this.props.regionId);

                let period = region[0].OpenPeriods.current;
                let month = period.month - 1;
                let year = period.year;

                this.setState({month: month, year: year});

                let periods = region[0].OpenPeriods;

                let all_periods = [];

                period = periods.current.month.toString() + '/' + periods.current.year.toString();
                if (periods.current.month < 10)
                    period = '0' + period;
                if(periods.current.status==='Open')
                    all_periods.push(period);

                this.setState({TransactionPeriod: period});

                let transactionDate = moment().year(year).month(month);
                this.setState({TransactionDate: transactionDate});

                period = periods.next.month.toString() + '/' + periods.next.year.toString();
                if (periods.next.month < 10)
                    period = '0' + period;
                if(periods.next.status==='Open')
                    all_periods.push(period);
                period = periods.previous.month.toString() + '/' + periods.previous.year.toString();
                if (periods.previous.month < 10)
                    period = '0' + period;
                if(periods.previous.status==='Open')
                    all_periods.push(period);

                this.setState({periods: all_periods});
            }
        }

        if(this.props.transactionForm.type === 'edit' && this.props.transactionDetail!==null) {
            let trxDetail = this.props.transactionDetail.Data;
            if(this.props.franchisees!==null && trxDetail!==null) {
                let franchisees = this.props.franchisees.Data.Region[0].Franchisees;

                let franchisee = _.filter(franchisees, franchisee=>trxDetail.dlr_code===franchisee.Number || trxDetail.FranchiseeName===franchisee.Name);
                if(franchisee.length>0) {
                    this.setState({selectedFranchisee: franchisee[0]});
                    this.setState({value: franchisee[0].Name});
                    this.setState({subTotal: parseFloat(trxDetail.TrxExtendedPrice)});
                    this.setState({unitPrice: parseFloat(trxDetail.TrxItemAmount)});
                    this.setState({TrxChargeType: trxDetail.TrxChargeType});

                    let tax = parseFloat(trxDetail.TrxTax);
                    if(trxDetail.Trxtype!=='5c5320066846d77648859107') tax = 0.00;

                    this.setState({tax: tax});
                    this.setState({quantity: parseInt(trxDetail.quantity)});
                    this.setState({total: parseFloat(trxDetail.TrxExtendedPrice)+ tax});
                    this.setState({TransactionDate: trxDetail.TrxDate!==null ? moment(trxDetail.TrxDate): moment()});

                    if(trxDetail.bill_mon!==0 && trxDetail.bill_year!==0) {
                        let period = trxDetail.bill_mon.toString() + '/' + trxDetail.bill_year.toString();
                        if (trxDetail.bill_mon < 10)
                            period = '0' + period;
                        this.setState({TransactionPeriod: period});
                    }


                    let trxType = this.props.transactionTypeList.filter(f=>f._id === trxDetail.Trxtype);

                    if(trxType.length)
                        this.setState({TrxType: {value: trxType[0]._id, label: trxType[0].Name}});

                    if(trxDetail.TrxFrequency!==null)
                        this.setState({transactionFrequency: trxDetail.TrxFrequency});

                    this.setState({payments: parseInt(trxDetail.NumberOfPayments)});
                    this.setState({TransactionNo: trxDetail.Trx_no!==null? trxDetail.Trx_no : 'PENDING'});
                    this.setState({reSell: trxDetail.TrxResell});
                    this.setState({transactionDescription: trxDetail.Description});

                    // for recurring
                    this.setState({grossTotal: trxDetail.GrossTotal});
                    this.setState({startDate: moment(trxDetail.startDate)});

                    // for Vendor
                    if(trxDetail.VendorLabel!==null && trxDetail.VendorValue!==null) {
                        let vendor = {label: trxDetail.VendorLabel, value: trxDetail.VendorValue};
                        let vendor_no = trxDetail.VendorNo;
                        let vendorDate = trxDetail.VendorDate;
                        this.setState({vendor: {vendor, vendor_no, vendorDate}});
                        this.props.updateVendor({vendor, vendor_no, vendorDate});
                    }
                }
            }
        }

        if(this.input) {
            setTimeout(() => {this.input.focus()}, 500);
        }
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        if(event.target.name==='TransactionPeriod') {
            let period = event.target.value.split('/');
            let year = parseInt(period[1]);
            let month = parseInt(period[0])-1;
            let transactionDate = moment().year(year).month(month);
            this.setState({TransactionDate: transactionDate.format('MM/DD/YYYY')});
        }
    };

    handleChange1 = name =>(event) => {
        if(name==='quantity')
            this.setState({[name]: parseInt(event.target.value)});
        else if(name==='payments')
            this.setState({[name]: parseInt(event.target.value)});
        else if(name==='unitPrice')
            this.setState({[name]: parseFloat(event.target.value)});
        else
            this.setState({[name]: event.target.value});
    };

    handleBlurTransaction = name =>(event) => {
        let quantity =  this.state.quantity;
        let unitPrice = this.state.unitPrice;
        this.props.getFranchiseeTransactionTaxAmount(this.props.regionId, this.props.transactionForm.franchisee.Id, unitPrice, quantity);
    };

    addNewTransaction = () => {
        let tTypeTaxValue = '5c5320066846d77648859107';
        let period = this.state.TransactionPeriod.split('/');

        let result = {
            Trx_no: this.state.TransactionNo,
            RegionId: this.props.regionId,
            FranchiseeNo: this.state.selectedFranchisee.Number,
            dlr_code: this.state.selectedFranchisee.Number,
            FranchiseeName: this.state.selectedFranchisee.Name,
            CreatedBy: this.props.user.UserId,
            Company_no: '',

            TrxType: this.state.TrxType.value,
            TrxTypeLabel: this.state.TrxType.label,

            TrxClass: 'I',

            TrxChargeType: this.state.TrxChargeType,

            TrxFrequency: this.state.transactionFrequency,
            TrxResell: this.state.reSell, //Boolean

            TrxItemAmount: this.state.unitPrice,//decimal
            TrxExtendedPrice: this.state.subTotal, //decimal
            TrxTax: this.state.tax,//decimal
            TotalTrxAmount: this.state.total,//decimal
            Quantity: this.state.quantity,//integer
            Fees: 0.00,

            Description: this.state.transactionDescription,
            TrxDate: this.state.TransactionDate,
            bill_mon: parseInt(period[0]),
            bill_year: parseInt(period[1]),
            VendorValue: this.state.TrxType.value===tTypeTaxValue && this.props.vendor!==null ? this.props.vendor.vendor.value: '', //vendor, vendor_no, vendorDate
            VendorLabel: this.state.TrxType.value===tTypeTaxValue && this.props.vendor!==null ? this.props.vendor.vendor.label: '', //vendor, vendor_no, vendorDate
            VendorNo: this.state.TrxType.value===tTypeTaxValue && this.props.vendor!==null ? this.props.vendor.vendor_no : '',
            VendorDate: this.state.TrxType.value===tTypeTaxValue && this.props.vendor!==null ? moment(this.props.vendor.vendorDate) : moment(),
            NumberOfPayments: this.state.payments,
            StartDate: this.state.startDate,
            GrossTotal: this.state.grossTotal,
        };
        if(this.props.transactionForm.type==='new') {
            this.props.createNewTransaction(this.props.regionId, result);
        }
        else {
            result.Trx_no = this.props.transactionDetail.Data.Trx_no;
            this.props.updateFranchiseeTransaction(this.props.transactionDetail.Data._id, this.props.regionId, result);
        }
        console.log('result', JSON.stringify(result));
    };

    validateNewTransaction = () => {
        if(this.state.selectedFranchisee===null){
            this.setState({snackMessage: 'Please choose a franchisee from Franchisee suggestion'});
            this.setState({openSnack: true});
            return false;
        }

        if(this.state.transactionDescription===''){
            this.setState({snackMessage: 'Please fill description'});
            this.setState({openSnack: true});
            return false;
        }
        if(this.state.quantity==='' || this.state.quantity<=0){
            this.setState({snackMessage: 'Please enter quantity correctly'});
            this.setState({openSnack: true});
            return false;
        }
        if(this.state.unitPrice==='' || this.state.unitPrice<=0){
            this.setState({snackMessage: 'Please enter item amount correctly'});
            this.setState({openSnack: true});
            return false;
        }
        if(this.state.transactionFrequency===null){
            this.setState({snackMessage: 'Please choose a frequency'});
            this.setState({openSnack: true});
            return false;
        }
        if(this.state.TrxChargeType===null){
            this.setState({snackMessage: 'Please choose a Trx. Class'});
            this.setState({openSnack: true});
            return false;
        }

        return true;
    };

    onSaveTransaction = (buttonOption) => {
        if(this.validateNewTransaction()){
            this.setState({buttonOption: buttonOption});
            this.addNewTransaction();
        }
    };

    onSaveAndAddMore=()=>{
        this.onSaveTransaction(0);
    };

    onSaveAndClose = () => {
        this.onSaveTransaction(1);
    };


    closeComposeForm = () => {
        this.props.transactionForm.type === 'edit' ? this.props.closeEditTransactionForm() : this.props.closeNewTransactionForm();
    };

    handleStartDateChange = date => {
        this.setState({ startDate: date});
    };

    handleTransactionDateChange = date => {
        let period = this.state.TransactionPeriod.split('/');
        let month = parseInt(period[0])-1;
        let year = parseInt(period[1]);

        let transactionDate = moment(date).year(year).month(month);
        this.setState({TransactionDate: transactionDate});
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };

    handleTrxTypeChange = (newValue)=> {
        this.setState({TrxType: newValue});

        if(newValue.value==='5c5320066846d77648859107')
            this.props.showVendorDialogBox();
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

        var aTypes0 = this.props.transactionTypeList.map(t=>{
            return {value: t._id, label: t.Name}
        });

        const components = {
            Control,
            Menu,
            NoOptionsMessage,
            Option,
            Placeholder,
            SingleValue,
            ValueContainer,
        };

        const selectStyles = {
            input: base => ({
                ...base,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="h-full flex flex-col relative">
                    <div className="flex flex-col p-12 pb-0" style={{flex: "1"}}>
                        <Grid container className={classNames(classes.formControl)}>
                            <Grid item xs={12} sm={12} md={12} className="flex flex-row">
                                <Autosuggest
                                    {...autosuggestProps}
                                    inputProps={{
                                        classes,
                                        placeholder: 'Choose a franchisee and complete the transaction form before trying to save.',
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
                        </Grid>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid container className={classNames(classes.formControl)}>
                                <Grid item xs={12} sm={4} md={4} className="flex flex-row xs:flex-col xs:mb-24 pr-8" style={{padding: '0 6px!important'}}>
                                    <FormControl variant="outlined" className={classNames(classes.formControl1, "ml-4 w-full")}>
                                        {this.state.periods!==null && (
                                            <TextField
                                                select
                                                label="Period"
                                                name="TransactionPeriod"
                                                value={this.state.TransactionPeriod}
                                                onChange={this.handleChange}
                                                variant={"outlined"}
                                                className={classes.textField}
                                                InputProps={{
                                                    readOnly: this.props.transactionForm.type==='edit',
                                                    classes: {
                                                        input: classes.inputp,
                                                    },
                                                }}
                                                fullWidth
                                                required
                                            >
                                                {this.state.periods.map((p, index)=>{
                                                    return (<MenuItem key={index} value={p}>{p}</MenuItem>)
                                                })}
                                            </TextField>
                                        )}

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} className="flex flex-row xs:flex-col xs:mb-24 pr-8" style={{padding: '0 6px!important'}}>
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
                                                input: classes.input2,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} className="flex flex-row xs:flex-col pl-4" >
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
                                        inputProps={{tabIndex:-1}}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        name="TransactionNo"
                                        variant="outlined"
                                        value={this.state.TransactionNo}
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
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col">
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

                                        <div className="flex flex-row justify-between mb-4">
                                            <div className="flex flex-row items-center">
                                                <Icon fontSize={"small"} className="mr-4">place</Icon>
                                                {this.state.selectedFranchisee && (
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {this.state.selectedFranchisee.Address}
                                                    </Typography>
                                                )}
                                            </div>
                                            {this.state.selectedFranchisee && (
                                                <Typography variant="subtitle1" color="inherit">
                                                    <strong>Franchisee Status: {this.state.selectedFranchisee.StatusName}</strong>
                                                </Typography>
                                            )}
                                        </div>
                                        <div className="flex flex-row justify-between mb-4">
                                            <div className="flex flex-row items-center">
                                                <Icon fontSize={"small"} className="mr-4">smartphone</Icon>
                                                {this.state.selectedFranchisee && (
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {this.state.selectedFranchisee.Phone}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </GridItem>
                        </GridContainer>
                        <Grid container className={classNames(classes.formControl, "mb-8")} >
                            <Grid item xs={12} sm={12} md={12} className="flex flex-row  justify-between items-center pt-16 pr-0">
                                <FormControl component="fieldset" className={classes.formControlNomb}>
                                    <FormLabel component="legend">Transaction Class</FormLabel>
                                    <RadioGroup
                                        aria-label="Charge Type"
                                        name="TrxChargeType"
                                        className={classes.group}
                                        classes={{
                                            root: classes.group
                                        }}
                                        value={this.state.TrxChargeType}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel value="D" control={<Radio />} label="Deduction" />
                                        <FormControlLabel value="C" control={<Radio />} label="Credit" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container className={classNames(classes.formControl, "mb-0 mt-16")} >
                            <Grid item xs={12} sm={5} md={5} className="flex flex-1 flex-row pt-0 w-full items-center">
                                <div>Freq.: </div>
                                <FormControl variant="outlined" className={classNames(classes.formControl1, "ml-4")}>
                                    <Select
                                        classes={{
                                            root: classNames(classes.frequencyMenu),
                                            outlined: classNames(classes.frequencyMenu,classes.services),
                                            selectMenu: classNames(classes.inputMenu1),
                                            select: classNames(classes.frequencyMenu),
                                        }}
                                        name="transactionFrequency"
                                        value={this.state.transactionFrequency}
                                        onChange={this.handleChange}
                                        autoWidth={true}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="frequency"
                                                id="frequency"
                                            />
                                        }
                                        MenuProps = {{
                                            classes:{paper: classes.dropdownMenu},
                                        }}
                                    >
                                        <MenuItem value="single">Single</MenuItem>
                                        <MenuItem value="recurring">Recurring</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={7} md={7} className="flex flex-row items-center pt-0">
                                <div>Type: </div>
                                <FormControl variant="outlined" className={classNames(classes.selectRoot, classes.formControl, "ml-4 w-full mr-12")}>
                                    <div className={classes.root1}>
                                        <NoSsr>
                                            <Select1
                                                classes={classes}
                                                styles={selectStyles}
                                                value={this.state.TrxType}
                                                components={components}
                                                onChange={(v)=>this.handleTrxTypeChange(v)}
                                                options={aTypes0}
                                                placeholder="Select a type"
                                            />
                                        </NoSsr>
                                    </div>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div className="w-full mt-4">
                            <TextField
                                id="transactionDescription"
                                name="transactionDescription"
                                label="Description"
                                className={classes.textField}
                                value={this.state.transactionDescription}
                                onChange={this.handleChange}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.input
                                    },
                                }}
                            />
                        </div>
                        <div className="flex flex-row w-full mt-4 justify-between">
                            {this.state.transactionFrequency==="recurring" && (
                                <TextField
                                    id="payments"
                                    name="payments"
                                    label="# of Payments"
                                    className={classes.textField}
                                    value={this.state.payments}
                                    onChange={this.handleChange1('payments')}
                                    onBlur={this.handleBlurTransaction('payments')}
                                    margin="dense"
                                    variant="outlined"
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input
                                        },
                                    }}
                                    required
                                />
                            )}

                            <TextField
                                id="quantity"
                                name="quantity"
                                label="Quantity"
                                className={classes.textField}
                                value={this.state.quantity}
                                onChange={this.handleChange1('quantity')}
                                onBlur={this.handleBlurTransaction('quantity')}
                                margin="dense"
                                variant="outlined"
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                InputProps={{
                                    inputComponent: NumberFormatCustom1,
                                    classes: {
                                        input: classes.input
                                    },
                                }}
                                required
                            />
                            <TextField
                                id="unitPrice"
                                name="unitPrice"
                                label="Item Amount"
                                className={classNames(classes.textField, 'mr-12')}
                                value={this.state.unitPrice}
                                onChange={this.handleChange1('unitPrice')}
                                onBlur={this.handleBlurTransaction('unitPrice')}
                                margin="dense"
                                variant="outlined"
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                InputProps={{
                                    inputComponent: NumberFormatCustom2,
                                    classes: {
                                        input: classNames(classes.input, "text-right")
                                    },
                                }}
                                required
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.reSell}
                                        onChange={this.handleChange}
                                        value="resell"
                                        color="primary"
                                        name="reSell"
                                    />
                                }
                                label="ReSell"
                            />
                        </div>
                        {this.state.TrxType.value==='5c5320066846d77648859107' && this.props.transactionForm.vendor!==null && ( // Franchisee Supplies
                            <Grid container className={classNames(classes.formControl, "mb-0 p-0")} >
                                <Grid item xs={12} sm={12} md={12} className="flex flex-row pt-16 w-full items-center no-padding">
                                    <TextField
                                        label="Vendor"
                                        className={classNames(classes.textField)}
                                        style={{minWidth: 300}}
                                        value={this.props.vendor.vendor.label}
                                        margin="normal"
                                        variant="outlined"
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                            classes: {
                                                input: classes.inputReadonly
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className="flex flex-row pt-16 w-full items-center no-padding" >
                                    <TextField
                                        label="Vendor Invoice No"
                                        className={classNames(classes.textField, 'mr-12')}
                                        value={this.props.vendor.vendor_no}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        InputProps={{
                                            readOnly: true,
                                            classes: {
                                                input: classes.inputReadonly
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Vendor Invoice Date"
                                        className={classNames(classes.textField, 'mr-12')}
                                        value={moment(this.props.vendor.vendorDate).format("MM/DD/YYYY")}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        InputProps={{
                                            readOnly: true,
                                            classes: {
                                                input: classes.inputReadonly
                                            },
                                        }}
                                    />
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={() => {
                                                this.props.showVendorDialogBox();
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </FuseAnimate>
                                </Grid>
                            </Grid>
                        )}

                        {this.state.transactionFrequency==='recurring' && (
                            <div className="flex flex-row mt-4 justify-between items-center">
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker
                                        margin="normal"
                                        label="Start Date"
                                        format="MM/DD/YYYY"
                                        name="startDate"
                                        variant="outlined"
                                        className={classNames(classes.textField, 'ml-0 mr-4')}
                                        value={this.state.startDate}
                                        onChange={this.handleStartDateChange}
                                        required
                                        InputProps={{
                                            classes: {
                                                input: classes.input2,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <TextField
                                    id="GrossTotal"
                                    name="GrossTotal"
                                    label="Gross Total"
                                    className={classNames(classes.textField, 'ml-4 mr-0')}
                                    value={this.state.grossTotal}
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom2,
                                        readOnly: true,
                                        classes: {
                                            input: classNames(classes.inputReadonly, "text-right")
                                        },
                                    }}
                                />
                            </div>
                        )}

                    </div>
                    <div className="flex flex-shrink flex-col w-full p-12 pt-0">
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-col xs:flex-col xs:mb-24 justify-end w-full">
                                <div className="w-full p-12 flex justify-end pb-0">
                                    <span className={classes.summary}><strong>Subtotal: </strong>${this.state.subTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end pt-6 pb-6">
                                    <span className={classes.summary}><strong>Tax: </strong>${this.state.tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end  pt-6 pb-6">
                                    <span className={classes.summary}><strong>Grand Total: </strong>${this.state.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className="flex flex-1 flex-col justify-between items-center">
                            <div className="flex flex-row justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                                </FuseAnimate>
                            </div>
                            <div className="flex flex-1 flex-row justify-end mb-8 mt-20">
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
                                        className={classes.button}
                                        onClick={() => {
                                            this.props.hideVendorDialogBox();
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
                    <VendorDialogBox vendorList={this.state.vendorList}/>
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
        resetInvoiceForm: Actions.resetInvoiceForm,
        selectFranchisee: Actions.selectFranchisee,
        showVendorDialogBox: Actions.showVendorDialogBox,
        hideVendorDialogBox: Actions.hideVendorDialogBox,
        updateVendor: Actions.updateVendor,
        createNewTransaction: Actions.createNewTransaction,
        resetTransactionForm: Actions.resetTransactionForm,
        updateFranchiseeTransaction: Actions.updateFranchiseeTransaction,
        getTransactionDetail: Actions.getTransactionDetail,
        createReport: Actions.createReport,
        nullifyFranchiseeReport: Actions.nullifyFranchiseeReport,
        getFranchiseeTransactionTaxAmount: Actions.getFranchiseeTransactionTaxAmount,
    }, dispatch);
}

function mapStateToProps({transactions, auth, franchisees})
{
    return {
        transactionForm: transactions.transactionForm,
        vendor: transactions.transactionForm.vendor,
        newTransaction: transactions.newTransaction,
        user: auth.login,
        regionId: auth.login.defaultRegionId,
        trxRowInfo: transactions.transactionForm.trxRowInfo,
        transactionDetail: transactions.transactionDetail,
        transactionTypeList: transactions.transactionTypeList,
        franchisees: franchisees.franchiseesDB,
        all_regions: auth.login.all_regions,
        transactionTax: transactions.transactionTax,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionEditForm)));
