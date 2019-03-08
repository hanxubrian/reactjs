import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

// core components
import {
    Paper, TextField, Typography, MenuItem, Card,  CardHeader, CardContent, Divider, Button,
    Snackbar, SnackbarContent, IconButton, Icon, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog, Fab,
    InputAdornment, Table
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
import LeaseLine from "./LeaseLine"

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

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
import LeaseTable from './leaseTable'

//Utility
import {escapeRegexCharacters} from 'services/utils'

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
        width   : '100%'
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
        paddingBottom: '70px!important',
        '& h6':{
            lineHeight: 1.6,
            fontSize: 16
        }
    },
    input: {
        padding: '12px 14px'
    },
    label: {
        transform: 'translate(14px, 14px) scale(1)'
    },
    inputOrange: {
        padding: '12px 14px',
        color: 'orange'
    }
});
const chance = new Chance();

const newLeaseState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "LeaseId": "",
    "DateSigned": moment().format('YYYY-MM-DD'),
    "PaymentStart": moment().format('YYYY-MM-DD'),
    "FranchiseeId": "",
    "FranchiseeNo": "",
    "FranchiseeName": "",
    "Make": "",
    "Model": "",
    "SerialNo": "",
    "LeaseAmount": "",
    "LeaseTerm": "",
    "TotalTax": "",
    "TotalLease": "",
    "Description": "",
    "PrintLease": "",
    "LeaseDescription": ""
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


class LeaseForm extends Component {
    state = {
        ...newLeaseState,
        franchisees: [],
        value: '',
        suggestions: [],
        PO_number: '',
        selectedLease: null,
        selectedFranchisee: null,
        fSuggestions: [],
        labelWidth: 0,
        selectedWork: "",
        total: 0.0,
        subTotal: 0.0,
        tax: 0,
        markup: 0.0,
        LeaseNo: "",
        snackMessage: "",
        openSnack: false,
        make: '',
        model: '',
        serialNo: '',
        leaseAmount: '',
        leaseTerm: '',
        totalTax: '',
        totalLease: '',
        buttonOption: 0,
        bFranchiseeNotFound: false,
        bAlertNewLease: false
    };

    renderInputComponent = (inputProps ) => {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps ;

        return (
            <TextField
                fullWidth
                variant="outlined"
                label="Lease For:"
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
        if(this.props.franchisees!==null) {
            let suggestions = this.props.franchisees.Data.Region[0].Franchisees.filter(f => regex.test(f.Name)|| regex.test(f.Number));
            if(this.state.bFranchiseeNotFound)
                return suggestions;

            if(!this.state.bFranchiseeNotFound && suggestions.length===0) {
                this.setState({bFranchiseeNotFound: true});
                this.setState({value: ''});
            }
            return suggestions;
        }
    };

    getTotal = () => {
        let subTotal = 0.0;
        let markup = 0.0;
        let tax = 0.0;

        if(this.props.leaseForm.data===null) return;

        const data = [...this.props.leaseForm.data.line];

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
        if(this.props.leaseForm!== prevProps.leaseForm) {
            console.log('pppppp');
            this.getTotal();
        }
        if(this.state.selectedFranchisee!== null && JSON.stringify(this.state.selectedFranchisee)!== JSON.stringify(this.props.leaseForm.franchisee)) {
            this.props.selectFranchisee(this.state.selectedFranchisee);
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps = async (nextProps) => {
        if(nextProps.leaseForm.franchisee!==null){
            if(nextProps.leaseForm.type==='edit') {
            this.setState({LeaseNo: nextProps.leases.leaseDetail.Data.lease_no});
            this.setState({value: nextProps.leases.leaseForm.franchisee.FranchiseeName});
            this.setState({FranchiseeNo: nextProps.leases.leaseForm.franchisee.FranchiseeNo});
            this.setState({DateSigned: moment(nextProps.leases.leaseDetail.Data.date_sign).format('MM/DD/YYYY')});
            this.setState({PaymentStart: moment(nextProps.leases.leaseDetail.Data.pymnt_begn).format('MM/DD/YYYY')});
            this.setState({make: nextProps.leases.leaseDetail.Data.make});
            this.setState({model: nextProps.leases.leaseDetail.Data.model});
            this.setState({taxRate: nextProps.leases.leaseDetail.Data.paymnt_tax});
            this.setState({advancePayments: nextProps.leases.leaseDetail.Data.pymnt_adv});
            this.setState({serialNo: nextProps.leases.leaseDetail.Data.serial});
            this.setState({month: nextProps.leases.leaseDetail.Data.month});
            this.setState({year: nextProps.leases.leaseDetail.Data.year});
            this.setState({originalCost: nextProps.leases.leaseDetail.Data.orig_cost});
            this.setState({LeaseDescription: nextProps.leases.leaseDetail.Data.description});
            this.setState({fromFran: nextProps.leases.leaseDetail.Data.fromfran});
            this.setState({toFran: nextProps.leases.leaseDetail.Data.tofran});
            this.setState({hold: nextProps.leases.leaseDetail.Data.stop});
            this.setState({paymentsBilled: nextProps.leases.leaseDetail.Data.NumberOfPaymentsMadeSummary});
            }
    }

        //in time of Saving
        if(nextProps.newLease!==null && nextProps.newLease!==this.props.newLease){
            this.setState({bAlertNewLease: false});
            if(this.state.buttonOption===0){
                this.props.updatedLeases();
                this.props.resetLeaseForm();
                this.setState({LeaseDescription: ''});
                this.setState({selectedFranchisee: null});
                this.setState({value: ''});
                this.setState({FranchiseeNo: ''});
                if(this.input) {
                    if(this.props.leaseForm.type === 'new')
                        setTimeout(() => {this.input.focus()}, 500);
                }
            }
            else if(this.state.buttonOption===1) {
                this.props.updatedLeases();
                this.closeComposeForm();
            }
            else if(this.state.buttonOption===2) {
                this.props.updatedLeases();
                this.closeComposeForm();
            }
        }
    }

    componentDidMount(){
        if(this.input) {
            if(this.props.leaseForm.type === 'new')
                this.setState({LeaseNo: "PENDING"});
                setTimeout(() => {this.input.focus()}, 500);
        }

        if(this.props.leases.leaseDetail){
            let leaseDetail = this.props.leases.leaseDetail.Data;
            let lease = this.props.leases.leasesDB.Data[0].LeaseList.filter(lease => lease.Id === leaseDetail._id);
            if(lease.length>0) {
                this.setState({selectedFranchisee: lease[0]});
            }
        }

    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    addNewLease = () => {
        let lease_no = 'PENDING';
        let items = [];

        let lines = this.props.leaseForm.data;

        // lines.forEach(line=>{
        //     let item = {
        //         Lease_no: lease_no,
        //         ServiceTypeListId: 0,
        //         Description: line.description,
        //         Billing: line.billing.value,
        //         Service: line.service.label,
        //         LineNo: 1,
        //         UnitPrice: parseFloat(line.amount),
        //         Quantity: parseInt(line.quantity),
        //         TaxRate: line.tax,
        //         ExtendedPrice: line.extended,
        //         Total: line.total,
        //         MarkUpTotal: line.markup,
        //         Commission: 0,
        //         CommissionTotal: 0,
        //         ExtraWork: 1,
        //         TaxExcempt: this.state.selectedFranchisee.TaxExempt,
        //         Distribution: [],
        //     };
            let item = {};
            let franchisees = [];

            if(lines) {
                lines.franchisees.forEach(f=>{
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
        ;

        if(this.props.leaseForm.type === 'edit') {

        }

        let result;

        if(this.props.leaseForm.type === 'new') {
            result = {
                "_id": "",
                "RegionId": 2,
                "CreatedBy": 0,
                "company_no": "BUF701",
                DateSigned: this.state.DateSigned,
                PaymentStart: this.state.PaymentStart,
                FranchiseeId: this.state.selectedFranchisee.Id,
                // FranchiseeNumber: this.state.PO_number,
                FranchiseeName: this.state.selectedFranchisee.Name,
                FranchiseeNo: this.state.selectedFranchisee.Number,
                "dlr_code": this.state.selectedFranchisee.Number,
                "lease_no": "70-7777",
                "description": this.state.LeaseDescription,
                "make": this.state.make,
                "model": this.state.model,
                "date_sign": moment(this.state.DateSigned),
                "orig_cost": 500.00,
                "paymnt_amt": 31.28,
                "paymnt_tax": 8.75,
                "pymnt_adv": 2,
                "pymnt_begn": "12/27/2018",
                "pymnt_bill": 2,
                "pymnt_totl": 16.00,
                "serial": this.state.serialNo,
                "year": 2019,
                "stop": "N",
                "stop_mon": 0,
                "stop_year": 0,
                "tofran": "",
                "fromfran": ""
            };
            this.props.addLease(result);
        }
        else {
            result = {
                ...this.props.leases.leaseDetail.Data,
                "_id": "",
                "RegionId": 2,
                "CreatedBy": 0,
                "company_no": "BUF701",
                DateSigned: this.state.DateSigned,
                PaymentStart: this.state.PaymentStart,
                FranchiseeId: this.state.selectedFranchisee.Id,
                // FranchiseeNumber: this.state.PO_number,
                FranchiseeName: this.state.selectedFranchisee.Name,
                FranchiseeNo: this.state.selectedFranchisee.Number,
                "dlr_code": this.state.selectedFranchisee.Number,
                "lease_no": "70-7777",
                "description": this.state.LeaseDescription,
                "make": this.state.make,
                "model": this.state.model,
                "date_sign": moment(this.state.DateSigned),
                "orig_cost": 500.00,
                "paymnt_amt": 31.28,
                "paymnt_tax": 8.75,
                "pymnt_adv": 2,
                "pymnt_begn": "12/27/2018",
                "pymnt_bill": 2,
                "pymnt_totl": 16.00,
                "serial": this.state.serialNo,
                "year": 2019,
                "stop": "N",
                "stop_mon": 0,
                "stop_year": 0,
                "tofran": "",
                "fromfran": ""
            };
            debugger
            this.props.updateLease(this.props.regionId, this.props.leases.leaseDetail.Data._id, result);
        }
        console.log(this.state.selectedFranchisee.FranchiseeId)
        console.log('result', JSON.stringify(result));
    };

    addNewFranchisee = () => {
        this.setState({bFranchiseeNotFound: false})
    };

    validateNewLease = () => {
        if(this.state.selectedFranchisee===null){
            this.setState({snackMessage: 'Please choose Franchisee from Lease suggestion'});
            this.setState({openSnack: true});
            return false;
        }

        return true;
    };

    onSaveLease = (buttonOption) => {
        if(this.validateNewLease()){
            this.setState({bAlertNewLease: true});
            this.setState({buttonOption: buttonOption});
        }
    };

    onSaveAndAddMore=()=>{
        this.onSaveLease(0);
        // this.props.resetLeaseForm();
        // this.setState({LeaseDescription: ''});
        // this.setState({note: ''});
        // this.setState({selectedFranchisee: null});
        // this.setState({value: ''});
        // this.setState({FranchiseeNo: ''});
    };

    onSubmitForApproval=()=>{
        this.onSaveLease(2);
    };

    onSaveAndClose = () => {
        this.onSaveLease(1);
        // this.closeComposeForm();
    };

    closeComposeForm = () => {
        this.props.leaseForm.type === 'edit' ? this.props.closeEditLeaseForm() : this.props.closeNewLeaseForm();
    };

    handleDueDateChange = date => {
        this.setState({ DueDate: date});
    };
    handleLeaseDateChange = date => {
        this.setState({ LeaseDate: date });
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    handleCloseNewLease = ()=>{
        this.setState({bAlertNewLease: false})
    };

    handleCloseNewFranchisee = ()=>{
        this.setState({bFranchiseeNotFound: false})
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };

    openNewFranchiseeDialog =() => {
        this.setState({bFranchiseeNotFound: true})
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

        const Lease_headers = [
            {
                    id: 'make',
                    numeric: false,
                    disablePadding: false,
                    label: 'Make'
            },
            {
                    id: 'model',
                    numeric: false,
                    disablePadding: false,
                    label: 'Model'
            },
            {
                    id: 'serialNo',
                    numeric: false,
                    disablePadding: false,
                    label: 'Serial No'
            },
            {
                    id: 'leaseAmount',
                    numeric: false,
                    disablePadding: false,
                    label: 'Lease Amount'
            },
            {
                    id: 'totalTax',
                    numeric: false,
                    disablePadding: false,
                    label: 'Total Tax'
            },
            {
                    id: 'leaseTerm',
                    numeric: false,
                    disablePadding: false,
                    label: 'Lease Term'
            },
            {
                    id: 'totalLease',
                    numeric: false,
                    disablePadding: false,
                    label: 'Total Lease'
            },
            {
                    id: 'paymentNumber',
                    numeric: false,
                    disablePadding: false,
                    label: '# of Payment'
            }
        ];



        let bReadonly = false;
        if(this.props.leaseForm.type === 'new') bReadonly = true;
        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="h-full flex flex-col relative">
                    <div className="flex flex-col p-24 pt-12 pb-0" style={{flex: "1"}}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <GridContainer className={classNames(classes.formControl)}>
                                <GridItem xs={4} sm={4} md={4} className="flex flex-row mb-4">
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
                                </GridItem>
                                <GridItem xs={2} sm={2} md={2} className="flex flex-row xs:flex-col mb-4">
                                    <TextField
                                        margin="none"
                                        label="Lease #"
                                        placeholder="Lease #"
                                        className={classes.textField}
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
                                        name="LeaseNo"
                                        variant="outlined"
                                        value= {this.state.LeaseNo}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                            fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6} className="flex flex-row">
                                    <Paper >
                                        {/* <Table>
                                            More Lease Info Here
                                        </Table> */}
                                    </Paper>
                                </GridItem>
                            </GridContainer>
                        </MuiPickersUtilsProvider>
                        <GridContainer className={classNames(classes.formControl, "mb-0")}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col mt-8">
                                <Card className={classes.card}>
                                    <CardHeader title="Franchisee" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>
                                        <div className="flex flex-row justify-between mb-4">
                                            <div className="flex flex-row">
                                                <Icon fontSize={"small"} className="mr-4">account_circle</Icon>
                                                <Typography variant="subtitle1" color="inherit">
                                                    <strong>{this.state.selectedFranchisee ? this.state.selectedFranchisee.Name || this.state.selectedFranchisee.FranchiseeName: this.state.value}</strong>
                                                </Typography>
                                            </div>
                                            <Typography variant="subtitle1" color="inherit">
                                                <strong>Franchisee #: {this.state.selectedFranchisee? this.state.selectedFranchisee.Number || this.state.selectedFranchisee.FranchiseeNo: this.state.franchiseeNo}</strong>
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
                                                        {this.state.selectedFranchisee.Phone || this.state.selectedFranchisee.FranchiseePhone}
                                                    </Typography>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </GridItem>
                            <div className="w-full mt-4">
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col">
                            <TextField
                                id="LeaseDescription"
                                name="LeaseDescription"
                                label="Description"
                                className={classes.textField}
                                value={this.state.LeaseDescription}
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
                            </GridItem>
                            </div>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                {/* <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                    <TextField
                                        margin="none"
                                        label="Lease #"
                                        placeholder="Lease #"
                                        className={classes.textField}
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
                                        name="LeaseNo"
                                        variant="outlined"
                                        value={this.state.LeaseNo}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                            fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                        }}
                                    />
                                </GridItem> */}
                                <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col xs:mb-24 mt-6">
                                    <TextField
                                        margin="none"
                                        label="Date Signed"
                                        name="DateSigned"
                                        type="date"
                                        variant="outlined"
                                        format="MM/DD/YYYY"
                                        value={this.state.DateSigned}
                                        onChange={this.handleChange}
                                        fullWidth
                                        required
                                        className={classes.textField}
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                    <TextField
                                        margin="none"
                                        label="Payment Starts"
                                        name="PaymentStart"
                                        type="date"
                                        variant="outlined"
                                        format="MM/DD/YYYY"
                                        value={this.state.PaymentStart}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        className={classes.textField}
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </GridItem>
                                <div className="w-full mt-4">
                                </div>
                                <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col mt-6">
                                    <TextField
                                        id="make"
                                        name="make"
                                        label="Make"
                                        placeholder="Make"
                                        className={classes.textField}
                                        value={this.state.make}
                                        onChange={this.handleChange}
                                        margin="none"
                                        variant="outlined"
                                        fullWidth
                                        style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                        fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                    <TextField
                                        id="model"
                                        name="model"
                                        label="Model"
                                        placeholder="Model"
                                        className={classes.textField}
                                        value={this.state.model}
                                        onChange={this.handleChange}
                                        margin="none"
                                        variant="outlined"
                                        fullWidth
                                        style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                        fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </GridItem>
                                <div className="w-full mt-4">
                                </div>
                            {/* </GridItem> */}
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="serialNo"
                                    name="serialNo"
                                    label="Serial No"
                                    // type="number"
                                    placeholder="Serial No"
                                    className={classes.textField}
                                    value={this.state.serialNo}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="leaseAmount"
                                    name="leaseAmount"
                                    label="Lease Amount"
                                    type="number"
                                    placeholder="Lease Amount"
                                    className={classes.textField}
                                    value={this.state.leaseAmount}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="leaseTerm"
                                    name="leaseTerm"
                                    label="Lease Term"
                                    type="number"
                                    placeholder="Lease Term"
                                    className={classes.textField}
                                    value={this.state.leaseTerm}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <div className="w-full mt-4">
                                </div>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="totalTax"
                                    name="totalTax"
                                    label="Total Tax"
                                    type="number"
                                    placeholder="Total Tax"
                                    className={classes.textField}
                                    value={this.state.totalTax}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="totalLease"
                                    name="totalLease"
                                    label="Total Lease"
                                    type="number"
                                    placeholder="Total Lease"
                                    className={classes.textField}
                                    value={this.state.totalLease}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="paymentsBilled"
                                    name="paymentsBilled"
                                    label="Payments Billed"
                                    type="number"
                                    placeholder="Payments Billed"
                                    className={classes.textField}
                                    value={this.state.paymentsBilled}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <div className="w-full mt-4">
                                </div>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="taxRate"
                                    name="taxRate"
                                    label="Tax Rate"
                                    type="number"
                                    placeholder="Tax Rate"
                                    className={classes.textField}
                                    value={this.state.taxRate}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="originalCost"
                                    name="originalCost"
                                    label="Original Cost"
                                    type="number"
                                    placeholder="Original Cost"
                                    className={classes.textField}
                                    value={this.state.originalCost}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="advancePayments"
                                    name="advancePayments"
                                    label="Advance Payments"
                                    type="number"
                                    placeholder="Advance Payments"
                                    className={classes.textField}
                                    value={this.state.advancePayments}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <div className="w-full mt-4">
                                </div>
                                <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="fromFran"
                                    name="fromFran"
                                    label="From Fran"
                                    type="number"
                                    placeholder="From Fran"
                                    className={classes.textField}
                                    value={this.state.fromFran}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                <TextField
                                    id="toFran"
                                    name="toFran"
                                    label="To Fran"
                                    type="number"
                                    placeholder="To Fran"
                                    className={classes.textField}
                                    value={this.state.toFran}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <div className="w-full mt-4">
                                </div>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="hold"
                                    name="hold"
                                    label="Hold"
                                    type="number"
                                    placeholder="Hold"
                                    className={classes.textField}
                                    value={this.state.hold}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="month"
                                    name="month"
                                    label="Month"
                                    type="number"
                                    placeholder="Month"
                                    className={classes.textField}
                                    value={this.state.month}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col mt-6">
                                <TextField
                                    id="year"
                                    name="year"
                                    label="Year"
                                    type="number"
                                    placeholder="Year"
                                    className={classes.textField}
                                    value={this.state.year}
                                    onChange={this.handleChange}
                                    margin="none"
                                    variant="outlined"
                                    fullWidth
                                    style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                    fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        },
                                        // startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                        classes: {outlined: classes.label}
                                    }}
                                />
                                </GridItem>
                                <div className="w-full mt-224">
                                </div>
                                <div className="flex flex-1 flex-row justify-between items-center">
                            <div className="flex flex-row justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                                </FuseAnimate>
                            </div>
                            <div className="flex flex-1 flex-row justify-start pl-300">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={()=>this.addNewLease()}
                                    >
                                        { this.props.leaseForm.type === 'new' && (
                                            <span>Save</span>
                                        )}
                                        { this.props.leaseForm.type === 'edit' && (
                                            <span>Update</span>
                                        )}
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12 hidden")}
                                        onClick={() => {
                                            this.onSaveAndClose();
                                        }}
                                    >
                                        { this.props.leaseForm.type === 'new' && (
                                            <span>Save & Close</span>
                                        )}
                                        { this.props.leaseForm.type !== 'new' && (
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
                                        onClick={() => {
                                            this.closeComposeForm();
                                        }}
                                    >
                                        Close
                                    </Button>
                                </FuseAnimate>
                            </div>
                        </div>
                        </MuiPickersUtilsProvider>
                        </GridContainer>
                        {/* <Divider variant="middle"/> */}
                    </div>
                    <div className="flex flex-shrink flex-col w-full pl-24 pt-0 pb-12">
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            {/* <GridItem xs={12} sm={9} md={9} className="flex flex-col xs:flex-col xs:mb-24">
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
                            </GridItem> */}
                            {/* <GridItem xs={12} sm={3} md={3} className="flex flex-col xs:flex-col xs:mb-24">
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
                            </GridItem> */}
                        </GridContainer>
                        {/* <div className="flex flex-1 flex-row justify-between items-center">
                            <div className="flex flex-row justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                                </FuseAnimate>
                            </div>
                            <div className="flex flex-1 flex-row justify-start pl-400">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSaveAndAddMore();
                                        }}
                                    >
                                        { this.props.leaseForm.type === 'new' && (
                                            <span>Save & Add more</span>
                                        )}
                                        { this.props.leaseForm.type === 'edit' && (
                                            <span>Update & Add more</span>
                                        )}
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12 hidden")}
                                        onClick={() => {
                                            this.onSaveAndClose();
                                        }}
                                    >
                                        { this.props.leaseForm.type === 'new' && (
                                            <span>Save & Close</span>
                                        )}
                                        { this.props.leaseForm.type !== 'new' && (
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
                                        onClick={() => {
                                            this.closeComposeForm();
                                        }}
                                    >
                                        Close
                                    </Button>
                                </FuseAnimate>
                            </div>
                        </div> */}
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
                    {/* <Dialog
                        open={this.state.bAlertNewLease}
                        onClose={()=>this.handleCloseNewLease()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    > */}
                        {/* <DialogTitle id="alert-dialog-title">
                            {this.props.leaseForm.type === 'new' && (
                                <span>Create New Lease</span>
                            )}
                            {this.props.leaseForm.type === 'edit' && (
                                <span>Update The Lease</span>
                            )}

                        </DialogTitle> */}
                        {/* <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.props.leaseForm.type === 'new' && (
                                    <span>Do you really want to insert the new lease?</span>
                                )}
                                {this.props.leaseForm.type !== 'new' && (
                                    <span>Do you really want to update the lease?</span>
                                )}
                            </DialogContentText>
                        </DialogContent> */}

                        {/* <DialogActions>
                            <Button onClick={()=>this.handleCloseNewLease()} color="primary">
                                Close
                            </Button>
                            <Button onClick={()=>this.addNewLease()} color="primary" autoFocus>
                                {this.props.leaseForm.type === 'new' && (<span>Create</span>)}
                                {this.props.leaseForm.type === 'edit' && (<span>Update</span>)}
                            </Button>
                        </DialogActions> */}
                    {/* </Dialog> */}
                    <Dialog
                        open={this.state.bFranchiseeNotFound}
                        onClose={()=>this.handleCloseNewFranchisee()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Franchisee Alert
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                The franchisee doesn't exist.<br/>
                                Do you want to create new franchisee?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.handleCloseNewFranchisee()} color="primary">
                                Close
                            </Button>
                            <Button component={Link} to="/leases/list"  color="secondary" autoFocus>
                                Create New Franchisee
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
        openEditLeaseForm: Actions.openEditLeaseForm,
        closeEditLeaseForm: Actions.closeEditLeaseForm,
        closeNewLeaseForm : Actions.closeNewLeaseForm,
        selectFranchisee: Actions.selectFranchisee,
        resetLeaseForm: Actions.resetLeaseForm,
        addLease: Actions.addLease,
        updateLease: Actions.updateLease,
        updatedLeases: Actions.updatedLeases,
    }, dispatch);
}

function mapStateToProps({leases, auth, franchisees})
{
    return {
        leaseForm: leases.leaseForm,
        leases: leases,
        newLease: leases.newLease,
        user: auth.login,
        regionId: auth.login.defaultRegionId,
        bStartingSaveFormData: leases.bStartingSaveFormData,
        franchisees: franchisees.franchiseesDB,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaseForm)));
