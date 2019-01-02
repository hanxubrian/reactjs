import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
    TextField, Button, Typography,
    MenuItem,  Divider, FormControlLabel
} from '@material-ui/core';


// theme components
import { FusePageCustom, FuseAnimate, FuseSearch } from '@fuse';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import FranchiseesLineTable from "./franchiseesLine"

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";


import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CustomerLineTable from "../../../customers/Customers/CustomerLine";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,  DatePicker } from 'material-ui-pickers';
const styles = theme => ({

    root: {
        width: '90%'
    },
    backButton: {
        marginRight: theme.spacing.unit
    },
    completed: {
        display: 'inline-block'
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    //////////////////
    layoutForm: {
        flexDirection: 'row',
    },
    button: {
        '& span': {
            textTransform: 'none'
        },
        margin: theme.spacing.unit
    },
    card: {
        width: '100%',
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
    cardHeader: {
        backgroundColor: theme.palette.secondary.main,
        padding: '10px 24px',
        '& span': {
            color: 'white'
        }
    },
    textField: {
        width: '100%'
    }
});

const newCustomerState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "CustomerNo": "",
    "CustomerDate": "",
    "DueDate": "",
    "CustomerId": "",
    "CustomerName": "",
    "EBill": "",
    "PrintCustomer": "",
    "CustomerDescription": "",
    "CustomerAmount": "",
    "CustomerTax": "",
    "CustomerTotal": "",
    "CPI": "",
    "TransactionStatusListId": "",
    "TransactionStatus": "",
    "CustomerBalanceAmount": "",
    "CustomerBalanceTax": "",
    "CustomerBalanceTotal": "",
    "EBillText": "",
    "PrintCustomerText": "",
    "IsOpen": "",
    "ConsolidatedCustomer": "",
    "ConsolidatedCustomerId": "",
    "ConsolidatedCustomerNo": "",
    "CreditId": "",
    "Service": ""
};

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            variant="outlined"
            label="Customer For:"
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



function getSteps() {
    return ["Company Information", "Owner", "Financial", "Billing Settings", "Contract", "Franchisees Fee Maintenance"];
}

const stateNames = [
    {
        value: 2,
        label: "Buffalo"
    },
    {
        value: 7,
        label: "Detroit"
    },
    {
        value: 9,
        label: "Hartford"
    },
    {
        value: 13,
        label: "Las Vegas"
    },
    {
        value: 14,
        label: "Los Angeles/Colton"
    },
    {
        value: 16,
        label: "Miami"
    },
    {
        value: 18,
        label: "Minneapolis"
    },
    {
        value: 20,
        label: "New Jersey"
    },
    {
        value: 21,
        label: "New York"
    },
    {
        value: 22,
        label: "San Francisco/Oakland"
    },
    {
        value: 23,
        label: "Oklahoma City"
    },
    {
        value: 24,
        label: "Philadelphia"
    },
    {
        value: 25,
        label: "Sacramento"
    },
    {
        value: 26,
        label: "Washington DC"
    },
    {
        value: 28,
        label: "Jani-King Int'l, Inc."
    },
    {
        value: 29,
        label: "JANI-KING OF NEW MEXICO, INC"
    },
    {
        value: 31,
        label: "New Mexico"
    },
    {
        value: 46,
        label: "Houston"
    },
    {
        value: 55,
        label: "Pittsburgh"
    },
    {
        value: 64,
        label: "Tulsa"
    },
    {
        value: 82,
        label: "Reno"
    }
];

function getStepContent(customerForm, step) {
    const { classes} = customerForm.props;

    const address_headers = [
        {
            id: 'billing',
            numeric: false,
            disablePadding: false,
            label: 'Type'
        },
        {
            id: 'service',
            numeric: false,
            disablePadding: false,
            label: 'Address'
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: false,
            label: 'City'
        },
        {
            id: 'quantity',
            numeric: true,
            disablePadding: false,
            label: 'State'
        },
        {
            id: 'amount',
            numeric: true,
            disablePadding: false,
            label: 'Zip / Postal'
        }
    ];

    const billing_headers = [
        {
            id: 'billing',
            numeric: false,
            disablePadding: false,
            label: 'First'
        },
        {
            id: 'service',
            numeric: false,
            disablePadding: false,
            label: 'Last'
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: false,
            label: 'Title'
        },
        {
            id: 'quantity',
            numeric: true,
            disablePadding: false,
            label: 'Office Phone'
        },
        {
            id: 'amount',
            numeric: true,
            disablePadding: false,
            label: 'Mobile Phone'
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: 'Email'
        }
    ];

    switch (step) {
        case 0:


            return (
                <Fragment>
                    <h3>Business Info</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-name"
                                label="Name"
                                className={classes.textField}
                                margin="normal"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-address1"
                                label="Address1"
                                className={classes.textField}
                                margin="normal"
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="outlined-address2"
                                label="Address2"
                                margin="normal"
                                style={{marginLeft: '1%'}}
                                className={classes.textField}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="outlined-city"
                                    label="City"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{marginRight: '1%'}}
                                    required
                                />
                                <TextField
                                    id="outlined-state"
                                    label="State"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{marginLeft: '1%',marginRight: '1%'}}
                                    required
                                />
                                <TextField
                                    id="outlined-zip"
                                    label="Zip"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{marginLeft: '1%'}}
                                    required
                                />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="outlined-phone"
                                    label="Phone"
                                    margin="normal"
                                    style={{marginRight: '1%'}}
                                    className={classes.textField}
                                />
                                <TextField
                                    id="outlined-email"
                                    label="E-mail"
                                    margin="normal"
                                    style={{marginLeft: '1%'}}
                                    className={classes.textField}
                                    required
                                />
                        </GridItem>
                    </GridContainer>

                    <Divider variant="middle" />
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Contacts</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-name"
                                label="Name"
                                className={classes.textField}
                                margin="normal"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-address1"
                                label="Address1"
                                className={classes.textField}
                                margin="normal"
                                style={{marginRight:'1%'}}
                                required
                            />
                            <TextField
                                id="outlined-address2"
                                label="Address2"
                                className={classes.textField}
                                style={{marginLeft: '1%'}}
                                margin="normal"
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-city"
                                label="City"
                                className={classes.textField}
                                margin="normal"
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="outlined-state"
                                label="State"
                                className={classes.textField}
                                margin="normal"
                                style={{marginRight: '1%',marginLeft: '1%'}}
                                required
                            />
                            <TextField
                                id="outlined-zip"
                                label="Zip"
                                className={classes.textField}
                                margin="normal"
                                style={{marginLeft: '1%'}}
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-phone"
                                label="Phone"
                                className={classes.textField}
                                style={{marginRight: '1%'}}
                                margin="normal"
                            />
                            <TextField
                                id="outlined-ext"
                                label="Ext"
                                className={classes.textField}
                                margin="normal"
                                style={{marginRight: '1%',marginLeft: '1%'}}
                            />
                            <TextField
                                id="outlined-cell"
                                label="Cell"
                                className={classes.textField}
                                style={{marginLeft: '1%'}}
                                margin="normal"
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-cell"
                                label="E-mail"
                                className={classes.textField}
                                margin="normal"
                                required
                            />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            );
        case 1:
            return (
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Owner</h3>
                    <div className="flex">
                        <CustomerLineTable tableType="BILLING_SETTING" headers={billing_headers} />
                    </div>
                </Fragment>
            );
        case 2:
            return (
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Financial Section</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <RadioGroup
                                aria-label="financialRadio"
                                name="financialRadio"
                                margin="normal"
                                row
                            >
                                <FormControlLabel
                                    value="ein"
                                    control={<Radio color="primary" />}
                                    label="EIN"
                                    labelPlacement="end"
                                    margin="normal"
                                />
                                <FormControlLabel
                                    value="ssn"
                                    control={<Radio color="primary" />}
                                    label="SSN"
                                    labelPlacement="end"
                                    margin="normal"
                                />
                            </RadioGroup>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeEinSsn"
                                label="EIN/SSN"
                                className={classes.textField}
                                margin="normal"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeName"
                                label="Name"
                                className={classes.textField}
                                margin="normal"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeAddress"
                                label="Address"
                                className={classes.textField}
                                margin="normal"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-city"
                                label="City"
                                className={classes.textField}
                                margin="normal"
                                style={{marginRight:'1%'}}
                                required
                            />
                            <TextField
                                id="outlined-state"
                                label="State"
                                className={classes.textField}
                                margin="normal"
                                style={{marginRight:'1%',marginLeft:'1%'}}
                                required
                            />
                            <TextField
                                id="outlined-zip"
                                label="Zip"
                                className={classes.textField}
                                margin="normal"
                                style={{marginLeft:'1%'}}
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-phone"
                                label="1099 Name"
                                className={classes.textField}
                                margin="normal"
                                style={{width:'50%'}}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} />
                                }
                                label="Print 1099"
                                margin="normal"
                            />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            );
        case 3:
            return (
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Billing Setting Section</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="chargeBack" />
                                }
                                label="ChargeBack"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="bbp" />
                                }
                                label="BBP Administration Fee"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="accountRebate" />
                                }
                                label="Account Rebate"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="generateReport" />
                                }
                                label="Generate Report"
                            />
                        </GridItem>
                    </GridContainer>
                </Fragment>
        );
        case 4:
            return (
               <Fragment>
                   <div style={{ marginTop: '30px' }}></div>
                   <h3>Contract</h3>
                   <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                       <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                   <DatePicker
                                       label="Date Sign"
                                       // value={selectedDateSign}
                                       // onChange={this.handleDateSignChange}
                                       className={classes.textField}
                                       margin="normal"
                                       style={{marginRight: '1%'}}
                                   />
                               </MuiPickersUtilsProvider>
                               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                   <DatePicker
                                       label="Latest Renew Date"
                                       // value={selectedRenewDate}
                                       // onChange={this.handleRenewDateChange}
                                       className={classes.textField}
                                       margin="normal"
                                       style={{marginLeft: '1%', marginRight: '1%'}}
                                   />
                               </MuiPickersUtilsProvider>
                               <TextField
                                   id="termYrs"
                                   label="Term(Yrs)"
                                   margin="normal"
                                   className={classes.textField}
                                   required
                                   style={{marginLeft: '1%'}}
                               />
                       </GridItem>
                       <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                   <DatePicker
                                       label="EXP. Date"
                                       // value={selectedExpDate}
                                       // onChange={this.handleExpDateChange}
                                       className={classes.textField}
                                       margin="normal"
                                       style={{marginRight: '1%'}}
                                   />
                               </MuiPickersUtilsProvider>
                               <TextField
                                   id="selectPlanType"
                                   select
                                   label="Select"
                                   margin="normal"
                                   className={classes.textField}
                                   style={{marginLeft: '1%', marginRight: '1%'}}
                                   // value={this.state.planType}
                                   // onChange={this.handlePlanTypeChange('planType')}
                                   SelectProps={{
                                       MenuProps: {
                                           className: classes.menu,
                                       },
                                   }}
                               >
                                   {/*{planType.map(option => (*/}
                                       {/*<MenuItem key={option.value} value={option.value}>*/}
                                           {/*{option.label}*/}
                                       {/*</MenuItem>*/}
                                   {/*))}*/}
                               </TextField>
                               <TextField
                                   id="planAmount"
                                   label="Plan Amount"
                                   className={classes.textField}
                                   margin="normal"
                                   style={{marginLeft: '1%'}}
                                   required
                               />
                       </GridItem>
                       <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                               <TextField
                                   id="ibAmount"
                                   label="IB Amount"
                                   className={classes.textField}
                                   margin="normal"
                                   style={{marginRight: '1%'}}
                                   required
                               />
                               <TextField
                                   id="downPayment"
                                   label="Down Payment"
                                   className={classes.textField}
                                   margin="normal"
                                   style={{marginLeft: '1%', marginRight: '1%'}}
                                   required
                               />
                               <TextField
                                   id="interest"
                                   label="Interest"
                                   className={classes.textField}
                                   style={{marginRight: '1%'}}
                                   margin="normal"
                                   required
                               />
                       </GridItem>
                       <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                               <TextField
                                   id="paymentAmount"
                                   label="Payment Amount"
                                   className={classes.textField}
                                   margin="normal"
                                   style={{marginRight: '1%'}}
                                   required
                               />
                               <TextField
                                   id="noOfPayments"
                                   label="No Of Payments"
                                   className={classes.textField}
                                   margin="normal"
                                   style={{marginLeft: '1%', marginRight: '1%'}}
                                   required
                               />
                               <TextField
                                   id="daysToFullFill"
                                   label="Days To Fullfill"
                                   className={classes.textField}
                                   style={{marginLeft: '1%'}}
                                   margin="normal"
                                   required
                               />
                       </GridItem>
                   </GridContainer>
               </Fragment>
            );

        case 5:
            return(
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Franchisees Fee Maintenance</h3>
                    <div className="flex">
                        <CustomerLineTable tableType="BILLING_SETTING" headers={billing_headers} />
                    </div>
                </Fragment>
            );
        default:
            return 'Unknown step';
    }
}


class FranchiseesCreateForm extends Component {
    state = {
        customers: [],
        ...newCustomerState,
        value: '',
        suggestions: [],
        selectedCustomer: null,
        labelWidth: 0,
        selectedWork: "",
        activeStep: 0,
        completed: new Set(),
        skipped: new Set(),
        print1099: false,
        radioValue: 'ein'
    };

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if (value.length < 2) return;

        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue = (suggestion) => {
        this.setState({ selectedCustomer: suggestion });
        return suggestion.CustomerName;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');

        return this.props.customers.filter(customer => regex.test(customer.CustomerName));
    };

    closeComposeForm = () => {
        this.type === 'create' ? this.props.closeEditFranchisees() : this.props.closeCreateFranchisees();
    };

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        if (this.InputLabelRef) {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
            });
        }
    }

    handleChange = (event) => {
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    canBeSubmitted() {
        return true;
        const { name } = this.state;
        return (
            name.length > 0
        );
    }


    //////////////////////
    totalSteps = () => {
        return getSteps().length;
    };

    skippedSteps() {
        return this.state.skipped.size;
    }


    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    handleTab = (event, activeStep) => {
        this.setState({ activeStep });
    };
    handlefinanceCheckedChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleRadioChange = event => {
        this.setState({ radioValue: event.target.value });
    };
    //////////////////////
    render() {
        const { classes} = this.props;

        console.log('customers', this.props.customers);

        const steps = getSteps();
        const { activeStep, print1099, radioValue} = this.state;


        return (
            <Fragment>
                <AppBar position="static" color="default">
                    <Tabs
                        value={activeStep}
                        onChange={this.handleTab}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="Company Information" />
                        <Tab label="Owner" />
                        <Tab label="Financial" />
                        <Tab label="Billing Settings" />
                        <Tab label="Contract" />
                        <Tab label="Franchisees Fee Maintenance" />
                    </Tabs>
                </AppBar>
                <div
                    className={classNames(classes.layoutTable, "p-24")}
                    style={{
                        overflowY: 'scroll',
                        width: '100%',
                        height: 'calc(100% - 110px)'
                    }}>


                    <h2>{steps[activeStep]}</h2>
                    <Divider variant="middle" style={{ marginTop: 24, marginBottom: 24 }} />

                    <div>
                        {this.allStepsCompleted() ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={this.handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <div>
                                {getStepContent(this, activeStep)}
                            </div>
                            )}
                    </div>
                </div>
                <div>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classNames(classes.button, "mr-12")}
                            onClick={() => {this.closeComposeForm();}}
                            disabled={!this.canBeSubmitted()}
                        > Discard </Button>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classNames(classes.button, "mr-12")}
                            onClick={() => {this.closeComposeForm();}}
                            disabled={!this.canBeSubmitted()}
                        > Save </Button>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                this.closeComposeForm();
                            }}
                            disabled={!this.canBeSubmitted()}
                        > Close </Button>
                    </FuseAnimate>
                </div>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showCreteFranchisees: Actions.showCreteFranchisees,
        closeCreateFranchisees: Actions.closeCreateFranchisees,
        showEditFranchisees: Actions.showCreteFranchisees,
        closeEditFranchisees: Actions.showCreteFranchisees
    }, dispatch);
}

function mapStateToProps({ franchisees }) {
    return {
        franchiseesForm: franchisees.createFranchisees
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesCreateForm)));

