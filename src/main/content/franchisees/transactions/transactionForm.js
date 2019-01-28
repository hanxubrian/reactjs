import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// core components
import {
    Paper, TextField, Typography, MenuItem, Card, CardHeader, CardContent, Divider, Button, Snackbar, SnackbarContent,Select, Checkbox,
    IconButton, Icon, Grid, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog, OutlinedInput, FormControl, NoSsr,
    FormControlLabel
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
import {escapeRegexCharacters, NumberFormatCustom1, NumberFormatCustom2} from "../../../../services/utils";


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
    }
});


const newTransactionState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "TransactionDate": new Date(),
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
        ...newTransactionState,
        value: '',
        suggestions: [],
        fSuggestions: [],
        selectedFranchisee: null,
        labelWidth: 0,
        selectedWork: "",
        TransactionNo: "",
        snackMessage: "",
        openSnack: false,
        PO_number: '',
        period: moment(),
        taxExempt: false,
        bAlertNewTransaction: false,
        buttonOption: 0, //0-save and add more, 1- save & close 2- submit for approval,
        transactionType: {label: 'Advance Fee', value:82},
        transactionFrequency: "single",
        reSell: false,
        quantity: 1,
        unitPrice: 0,
        subTotal: 0,
        total: 0.0,
        tax: 0,
        payments: 1,
        paymentsDate: new Date(),
        billedPayments: 0,
        grossTotal: 0,
        startDate: moment()
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
                    readOnly: this.props.transactionForm.type === 'edit'
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
            return this.props.franchisees.filter(f => regex.test(f.Name) || regex.test(f.Number)|| regex.test(f.StatusName));
    };

    getTotal = () => {
        let subTotal = 0.0;
        let tax = 0.0;

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
        if(nextProps.newTransaction!==null && nextProps.newTransaction!==this.props.newTransaction){
            this.setState({bAlertNewTransaction: false});
            if(this.state.buttonOption===0){
                this.props.resetTransactionForm();
                this.setState({transactionDescription: ''});
                this.setState({selectedFranchisee: null});
                this.setState({value: ''});
                this.setState({franchiseeNo: ''});
            }
            else if(this.state.buttonOption===1) {
                this.closeComposeForm();
            }
        }
    }

    componentDidMount(){
        if(this.props.transactionForm.type === 'new')
            this.setState({TransactionNo: "PENDING"});

        if(this.props.transactionForm.type === 'edit') {
            let trxRow = this.props.trxRowInfo;
            console.log('result=',trxRow);
            let franchisee = _.filter(this.props.franchisees, franchisee=>trxRow.FranchiseeNo===franchisee.Number && trxRow.FranchiseeName===franchisee.Name);
            console.log('result=',franchisee);
            if(franchisee.length>0) {
                this.setState({selectedFranchisee: franchisee[0]});
                this.setState({value: trxRow.FranchiseeName});
                this.setState({TransactionNo: trxRow.Number});
                this.setState({subTotal: parseFloat(trxRow.ExtendedPrice)});
                this.setState({tax: parseFloat(trxRow.Tax)});
                this.setState({total: parseFloat(trxRow.TotalTrxAmount)});
                this.setState({TransactionDate: moment(trxRow.TrxDate)});
            }
        }

        if(this.input) {
            setTimeout(() => {this.input.focus()}, 500);
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
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
        let payments = this.state.payments;

        if(quantity>0 && unitPrice>0) {
            let tax = quantity * unitPrice*0.085;
            let line_total = parseFloat(quantity * unitPrice+tax);
            this.setState({subTotal: parseFloat(quantity * unitPrice)});
            this.setState({tax: parseFloat(tax)});
            this.setState({total: parseFloat(quantity * unitPrice+tax)});

            if(this.state.transactionFrequency==='recurring' && payments>0) {
                this.setState({billedPayments: line_total});
                this.setState({grossTotal: parseFloat(payments * line_total)});
            }
        }

    };

    addNewTransaction = () => {
        let trx_no = 'pending';
        let vendor = {};
        console.log('vendor=', this.props.vendor);

        let result = {
            Trx_no: trx_no,
            RegionId: this.props.regionId,
            FranchiseeNo: this.state.selectedFranchisee.Number,
            FranchiseeName: this.state.selectedFranchisee.Name,
            CreatedBy: this.props.user.UserId,
            Company_no: '',

            TrxType: this.state.transactionType.value,
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

            VendorValue: this.props.vendor!==null ? this.props.vendor.vendor.value: '', //vendor, vendor_no, vendorDate
            VendorLabel: this.props.vendor!==null ? this.props.vendor.vendor.label: '', //vendor, vendor_no, vendorDate
            VendorNo: this.props.vendor!==null ? this.props.vendor.vendor_no : '',
            VendorDate: this.props.vendor!==null ? moment(this.props.vendor.vendorDate) : moment(),
            NumberOfPayments: this.state.payments,
            StartDate: this.state.startDate,
            BilledPayment: this.state.billedPayments,
            GrossTotal: this.state.grossTotal,
        };
        this.props.createNewTransaction(this.props.regionId, result);
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
    };


    closeComposeForm = () => {
        this.props.transactionForm.type === 'edit' ? this.props.closeEditTransactionForm() : this.props.closeNewTransactionForm();
    };

    handleDueDateChange = date => {
        this.setState({ Date: date});
    };
    handleStartDateChange = date => {
        this.setState({ startDate: date});
    };
    handleTransactionDateChange = date => {
        this.setState({ TransactionDate: date });
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    handleCloseNewTransaction = ()=>{
        this.setState({bAlertNewTransaction: false})
    };


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };

    handleTransactionTypeChange = (newValue)=> {
        this.setState({transactionType: newValue});

        console.log('type=', newValue);

        if(newValue.value===18)
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

        let aTypes = [
            {value: 82, label:'Advance Fee'},            {value: 81, label: 'Advance Interest'},
            {value: 20, label: 'Advance to Franchisee'}, {value: 78, label: 'Child support'},
            {value: 5, label: 'Equipment Rental'},       {value: 6, label: 'Franchisee Note'},
            {value: 18, label: 'Franchisee Supplies'},   {value: 79, label: 'Garnishment'},
            {value: 80, label: 'Levy'},                  {value: 14, label: 'Misc. R. O.'},
            {value: 7, label: 'Negative Due Roll-Due'},  {value: 51, label: 'Negative Dues'},
            {value: 90, label: 'Purchase from Office'},  {value: 72, label: 'Tax Credit'}
        ];

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
                    <div className="flex flex-col p-24 pt-12 pb-0" style={{flex: "1"}}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid container className={classNames(classes.formControl)}>
                                <Grid item xs={12} sm={6} md={6} className="flex flex-row pr-16">
                                    <Autosuggest
                                        {...autosuggestProps}
                                        inputProps={{
                                            classes,
                                            placeholder: 'Search Franchisee Name or Number',
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
                                                input: classes.input2,
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
                        </GridContainer>
                        <Grid container className={classNames(classes.formControl, "mb-0")} >
                            <Grid item xs={12} sm={6} md={6} className="flex flex-1 flex-row pt-16 w-full items-center">
                                <div>Frequency: </div>
                                <FormControl variant="outlined" className={classNames(classes.formControl, "ml-24 w-full")}>
                                    <Select
                                        classes={{
                                            outlined: classNames(classes.outlined,classes.services),
                                            selectMenu: classNames(classes.inputMenu)
                                        }}
                                        name="transactionFrequency"
                                        value={this.state.transactionFrequency}
                                        onChange={this.handleChange}
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
                                        <MenuItem value="-1">
                                            <em>Select</em>
                                        </MenuItem>
                                        <MenuItem value="single">Single</MenuItem>
                                        <MenuItem value="recurring">Recurring</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} className="flex flex-row  items-center pl-24 pt-16 mr-12 pr-0">
                                <div>Type: </div>
                                <FormControl variant="outlined" className={classNames(classes.selectRoot, classes.formControl, "ml-24 w-full mr-24")}>
                                    <div className={classes.root1}>
                                        <NoSsr>
                                            <Select1
                                                classes={classes}
                                                styles={selectStyles}
                                                value={this.state.transactionType}
                                                components={components}
                                                onChange={(v)=>this.handleTransactionTypeChange(v)}
                                                options={aTypes}
                                                placeholder="Select a type"
                                            />
                                        </NoSsr>
                                    </div>
                                </FormControl>
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
                                    label="Number of Payments"
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
                                className={classes.textField}
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
                            <TextField
                                id="subTotal"
                                name="subTotal"
                                label="Sub-Total"
                                className={classes.textField}
                                value={this.state.subTotal}
                                // onChange={this.handleChange1('subTotal')}
                                margin="dense"
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
                            <TextField
                                id="tax"
                                name="tax"
                                label="Tax"
                                className={classes.textField}
                                value={this.state.tax}
                                // onChange={this.handleChange1('tax')}
                                margin="dense"
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
                            <TextField
                                id="total"
                                name="total"
                                label="Total"
                                className={classes.textField}
                                value={this.state.total}
                                // onChange={this.handleChange1('total')}
                                margin="dense"
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
                        {this.state.transactionType.value===18 && this.props.transactionForm.vendor!==null && ( // Franchisee Supplies
                            <div className="flex flex-row w-full mt-4 items-center">
                                <TextField
                                    label="Vendor"
                                    className={classNames(classes.textField, 'mr-24')}
                                    style={{minWidth: 300}}
                                    value={this.props.vendor.vendor.label}
                                    margin="normal"
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
                                    label="Vendor Invoice No"
                                    className={classNames(classes.textField, 'mr-24')}
                                    value={this.props.vendor.vendor_no}
                                    margin="normal"
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
                                    className={classNames(classes.textField, 'mr-24')}
                                    value={moment(this.props.vendor.vendorDate).format("MM/DD/YYYY")}
                                    margin="normal"
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
                                        Edit Vendor
                                    </Button>
                                </FuseAnimate>
                            </div>
                        )}

                        {this.state.transactionFrequency==='recurring' && (
                            <div className="flex flex-row mt-4 justify-start items-center">
                                <Grid container className={classNames(classes.formControl)}>
                                    <Grid item xs={12} sm={2} className={classNames("pt-12 pr-24")}>
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <DatePicker
                                                margin="dense"
                                                label="Start Date"
                                                format="MM/DD/YYYY"
                                                name="startDate"
                                                variant="outlined"
                                                value={this.state.startDate}
                                                onChange={this.handleStartDateChange}
                                                required
                                                fullWidth
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
                                    </Grid>
                                    <Grid item xs={12} sm={2} className={classNames("p-12")}>
                                        <TextField
                                            id="billedPayments"
                                            name="billedPayments"
                                            label="Payments Billed"
                                            className={classNames(classes.textField)}
                                            value={this.state.billedPayments}
                                            onChange={this.handleChange1('billedPayments')}
                                            margin="dense"
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
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} className={classNames("p-12")}>
                                        <TextField
                                            id="GrossTotal"
                                            name="GrossTotal"
                                            label="Gross Total"
                                            className={classes.textField}
                                            value={this.state.grossTotal}
                                            margin="dense"
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
                                    </Grid>
                                </Grid>
                            </div>
                        )}

                    </div>
                    <div className="flex flex-shrink flex-col w-full pl-24 pr-24 pt-0 pb-12">
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={3} md={3} className="flex flex-col xs:flex-col xs:mb-24">
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
                    <Dialog
                        open={this.state.bAlertNewTransaction}
                        onClose={()=>this.handleCloseNewTransaction()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Create New Transaction"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Proceed to create new transaction?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.handleCloseNewTransaction()} color="primary">
                                Close
                            </Button>
                            <Button onClick={()=>this.addNewTransaction()} color="primary" autoFocus>
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <VendorDialogBox />
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
        createNewTransaction: Actions.createNewTransaction,
        resetTransactionForm: Actions.resetTransactionForm,

    }, dispatch);
}

function mapStateToProps({transactions, auth})
{
    return {
        transactionForm: transactions.transactionForm,
        vendor: transactions.transactionForm.vendor,
        newTransaction: transactions.newTransaction,
        user: auth.login,
        regionId: auth.login.defaultRegionId,
        trxRowInfo: transactions.transactionForm.trxRowInfo,
        transactionDetail: transactions.transactionDetail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionForm)));
