import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
// core components
import {
    TextField, Button, Typography, Divider, FormControlLabel, IconButton, Icon
} from '@material-ui/core';
// theme components
import { FuseAnimate} from '@fuse';
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FranchiseesOwnerTable from './ownerTable'
import Radio from '@material-ui/core/Radio';
import 'date-fns';
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider,  DatePicker } from 'material-ui-pickers';
import moment from "moment";
import FranchiseesMaintenanceTable from "./maintenanceTableLine";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FranchiseesDocumentUploadTable from "./documentUploadTable";
import InputAdornment from '@material-ui/core/InputAdornment';



const styles = theme => ({

    root: {
        width: '90%'
    },
    completed: {
        display: 'inline-block'
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    button: {
        '& span': {
            textTransform: 'none'
        },
        margin: theme.spacing.unit
    },
    formControl: {
        marginBottom: 12,
        minWidth: 200,
    },
    textField: {
        width: '100%'
    }
});


function getSteps() {
    return ["Company Information", "Franchisee Agreement", "Upload Required Document"];
}

function getStepContent(franchiseeForm, step) {
    const { classes} = franchiseeForm.props;

    const Owner_headers = [
        {
                id: 'firstName',
                numeric: false,
                disablePadding: false,
                label: 'First Name'
        },
        {
                id: 'lastName',
                numeric: false,
                disablePadding: false,
                label: 'Last Name'
        },
        {
                id: 'phone',
                numeric: false,
                disablePadding: false,
                label: 'Phone'
        },
        {
                id: 'title',
                numeric: false,
                disablePadding: false,
                label: 'Title'
        }
	];
	

    switch (step) {
        case 0:
            return (
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Financial</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <FormControlLabel
                                    value="ein"
                                    checked={franchiseeForm.state.LegalId === 'ein'}
                                    onChange={franchiseeForm.handleTextChange("LegalId")}
                                    control={<Radio color="primary" />}
                                    label="EIN"
                                    labelPlacement="end"
                                    margin="dense"
                                />
                                <FormControlLabel
                                    checked={franchiseeForm.state.LegalId === 'ssn'}
                                    value="ssn"
                                    onChange={franchiseeForm.handleTextChange("LegalId")}
                                    control={<Radio color="primary" />}
                                    label="SSN"
                                    labelPlacement="end"
                                    margin="dense"
                                />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeEinSsn"
                                label="EIN/SSN"
                                type="number"
                                variant="outlined"
                                className={classes.textField}
                                value={franchiseeForm.state.LegalIdNum}
                                onChange={franchiseeForm.handleTextChange("LegalIdNum")}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                required
                            />
                            <TextField
                                id="financeName"
                                label="Name"
                                onChange={franchiseeForm.handleAddressFormChange("Name")}
                                value={franchiseeForm.state.Name}
                                variant="outlined"
                                inputProps={{
                                    maxLength:60
                                }}
                                className={classes.textField}
                                style={{marginLeft:'1%'}}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeAddress1"
                                label="Address 1"
                                onChange={franchiseeForm.handleAddressFormChange('AddressLine1')}
                                variant="outlined"
                                inputProps={{
                                    maxLength:100
                                }}
                                value={franchiseeForm.state.AddressLine1}
                                className={classes.textField}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                required
                            />
                            <TextField
                                id="financeAddress2"
                                label="Address 2"
                                inputProps={{
                                    maxLength:100
                                }}
                                onChange={franchiseeForm.handleAddressFormChange('AddressLine2')}
                                variant="outlined"
                                value={franchiseeForm.state.AddressLine2}
                                className={classes.textField}
                                style={{marginLeft:'1%'}}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-city"
                                label="City"
                                onChange={franchiseeForm.handleAddressFormChange('City')}
                                inputProps={{
                                    maxLength:100
                                }}
                                variant="outlined"
                                value={franchiseeForm.state.City}
                                className={classes.textField}
                                margin="dense"
                                style={{marginRight:'1%'}}
                                required
                            />
                            <TextField
                                id="state"
                                label="State"
                                select
                                className={classes.textField}
                                value={franchiseeForm.state.State}
                                onChange={franchiseeForm.handleAddressFormChange('State')}
                                variant="outlined"
                                margin="dense"
                                style={{marginRight:'1%',marginLeft:'1%'}}
                                required
                            >
                                {franchiseeForm.props.stateList.map(option => (
                                    <MenuItem key={option.Value} value={option.Value}>
                                        {option.Text}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-zip"
                                label="Zip"
                                variant="outlined"
                                onChange={franchiseeForm.handleAddressFormChange('Zip')}
                                inputProps={{
                                    maxLength:20
                                }}
                                value={franchiseeForm.state.Zip}
                                className={classes.textField}
                                margin="dense"
                                style={{marginLeft:'1%'}}
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeCounty"
                                label="County"
                                onChange={franchiseeForm.handleAddressFormChange('County')}
                                inputProps={{
                                    maxLength:100
                                }}
                                variant="outlined"
                                className={classes.textField}
                                value={franchiseeForm.state.County}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                required
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.print1099} />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('print1099')}
                                className={classes.textField}
                                value={franchiseeForm.state.print1099 === true ? "N" : "Y" }
                                label="Print 1099"
                                margin="dense"
                                style={{marginLeft:'1%',marginRight: '1%'}}
                            />
                            <TextField
                                id="outlined-phone"
                                variant="outlined"
                                label="1099 Name"
                                value={franchiseeForm.state.NameOn1099}
                                onChange={franchiseeForm.handleAddressFormChange('NameOn1099')}
                                inputProps={{
                                    maxLength:60
                                }}
                                className={classes.textField}
                                margin="dense"
                                style={{marginLeft:'1%'}}
                            />
                        </GridItem>
                    </GridContainer>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Owner</h3>
                    <div className="flex">
                        <FranchiseesOwnerTable tableType="OWNER" headers={Owner_headers} />
                    </div>
                </Fragment>
            );
        case 1:
            return (
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Contract</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>

                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="selectPlanType"
                                select
                                label="Plan Type"
                                margin="dense"
                                variant="outlined"
                                className={classes.textField}
                                value={franchiseeForm.state.defaultPlanType}
                                onChange={franchiseeForm.handleStateChange('defaultPlanType')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                            >
                                {franchiseeForm.props.planType &&(
                                    franchiseeForm.props.planType.Data.map(option => (
                                        <MenuItem key={option.FranchiseeContractTypeListId} value={option.FranchiseeContractTypeListId}>
                                            {option.Name}
                                        </MenuItem>
                                    ))
                                )}
                            </TextField>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="planAmount"
                                label="Plan Amount"
                                value={franchiseeForm.state.planAmount}
                                type={"number"}
                                onChange={franchiseeForm.handleTextChange('PlanAmount')}
                                className={classes.textField}
                                variant="outlined"
                                inputProps={{
                                    maxLength:60,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                margin="dense"
                                style={{ marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="termYrs"
                                label="Term(Yrs)"
                                type="number"
                                margin="dense"
                                variant="outlined"
                                inputProps={{
                                    maxLength:60
                                }}
                                onChange={franchiseeForm.handleFormChange('AgreementTerm')}
                                className={classes.textField}
                                required
                                style={{marginLeft: '1%'}}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="ibAmount"
                                label="IB Amount"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('BusinessAmount')}
                                margin="dense"
                                value={franchiseeForm.state.ibAmount}
                                inputProps={{
                                    readOnly: true,
                                    maxLength:60,
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="daysToFullFill"
                                label="Days To Fullfill"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('DaysToFulfill')}
                                value={franchiseeForm.state.daysToFullfill}
                                variant="outlined"
                                inputProps={{
                                    readOnly: true,
                                    maxLength: 60
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginLeft: '1%'}}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="downPayment"
                                label="Down Payment"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('DownPayment')}
                                value={franchiseeForm.state.downPayment}
                                inputProps={{
                                    readOnly: true,
                                    maxLength: 60,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                margin="dense"
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="interest"
                                label="Interest"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('Interest')}
                                variant="outlined"
                                value={franchiseeForm.state.interest}
                                inputProps={{
                                    readOnly: true,
                                    maxLength: 60,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                margin="dense"
                                required
                            />

                            <TextField
                                id="paymentAmount"
                                label="Payment Amount"
                                className={classNames(classes.textField)}
                                onChange={franchiseeForm.handleTextChange('BusinessAmount')}
                                value={franchiseeForm.state.paymentAmount}
                                variant="outlined"
                                margin="dense"
                                inputProps={{
                                    readOnly: true,
                                    maxLength: 60,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="noOfPayments"
                                label="No Of Payments"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('NoOfPayments')}
                                value={franchiseeForm.state.noOfPayments}
                                variant="outlined"
                                margin="dense"
                                inputProps={{
                                    readOnly: true,
                                    maxLength: 60,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginLeft: '1%'}}
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    label="Date Sign"
                                    value={franchiseeForm.state.selectedSignDate}
                                    onChange={franchiseeForm.handleSignDateChange}
                                    format="MM/DD/YYYY"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    style={{marginRight: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    label="Latest Renew Date"
                                    value={franchiseeForm.state.selectedRenewDate}
                                    onChange={franchiseeForm.handleRenewDateChange}
                                    className={classes.textField}
                                    format="MM/DD/YYYY"
                                    variant="outlined"
                                    margin="dense"
                                    style={{marginLeft: '1%', marginRight: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    label="EXP. Date"
                                    value={franchiseeForm.state.selectedExpDate}
                                    onChange={franchiseeForm.handleExpDateChange}
                                    format="MM/DD/YYYY"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    style={{marginLeft: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                        </GridItem>
                    </GridContainer>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Billing Settings</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.AllowChargeBack}  />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('AllowChargeBack')}
                                value={franchiseeForm.state.AllowChargeBack===true ? "N" : "Y"}
                                label="ChargeBack"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.AllowBppAdminFee} />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('AllowBppAdminFee')}
                                value={franchiseeForm.state.AllowBppAdminFee === true ? "N" : "Y"}
                                label="BBP Administration Fee"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.AllowAccountRebate}/>
                                }
                                onChange={franchiseeForm.handleCheckboxChange('AllowAccountRebate')}
                                value={franchiseeForm.state.AllowAccountRebate === true ? "N" : "Y"}
                                label="Account Rebate"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.AllowGenerateReport} />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('AllowGenerateReport')}
                                value={franchiseeForm.state.AllowGenerateReport === true ? "N" : "Y"}
                                label="Generate Report"
                            />
                        </GridItem>
                    </GridContainer>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Fees</h3>
                    <FranchiseesMaintenanceTable/>
                </Fragment>
            );
        case 2:
            return(
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <div className="flex">
                        <FranchiseesDocumentUploadTable/>
                    </div>
                </Fragment>
            )
        default:
            return 'Unknown step';
    }
}


class FranchiseesCreateForm extends Component {
    state = {
        labelWidth: 0,
        selectedWork: "",
        activeStep: 0,
        completed: new Set(),
        termsYrs: '',
        skipped: new Set(),
        print1099: true,
        chargeBack: false,
        bbpAdministration: false,
        accountRebate: false,
        generateReport: false,
        StateValue: '',
        defaultPlanType: 1,
        selectedSignDate: new Date(),
        selectedRenewDate: new Date(),
        selectedExpDate: new Date(),
        planAmount: 0,
        ibAmount: 0,
        downPayment: 0,
        interest: 0,
        noOfPayments: 0,
        daysToFullfill: 0,
        paymentAmount: 0,
        documentsList: [],
        franchiseeFees: [],
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        State: "",
        Zip: "",
        County: "",
        LegalIdNum: 0,
        LegalId: "ein",
        NameOn1099: "",
        AllowBppAdminFee: true,
        AllowChargeBack: true,
        AllowAccountRebate: true,
        AllowGenerateReport: true,
    };

    constructor (props){
        super(props);
        props.getFranchiseeFormPlanType(props.regionId);
        props.getFranchiseeStateList(props.regionId);
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };
    closeComposeForm = () => {
        this.type === 'create' ? this.props.closeEditFranchisees() : this.props.closeCreateFranchisees();
    };
    componentWillMount(){
        this.setState({
            planType: this.props.planType
        });
        this.setState({
            documentsList: this.props.getFranchiseeDocumentsList(this.props.regionId)
        });
        this.props.getFranchiseeFeeMaintenance(this.props.regionId);
        this.props.getFranchiseeStateList(this.props.regionId);
        if(this.props.planType.Data != null){
            this.setState({
               planAmount: this.props.planType.Data[0].Price,
               daysToFullfill: this.props.planType.Data[0].DaysToFulfill,
               noOfPayments: this.props.planType.Data[0].NoOfPayments,
               interest: this.props.planType.Data[0].Interest,
               downPayment: this.props.planType.Data[0].DownPayment,
               ibAmount: this.props.planType.Data[0].BusinessAmount,
               planTypeId: this.props.planType.Data[0].FranchiseeContractTypeListId,
            });
            this.handleInitialUpdate("AgreementPlanAmount",this.props.planType.Data[0].Price);
            this.handleInitialUpdate("AgreementDaysToFullfill",this.props.planType.Data[0].DaysToFulfill);
            this.handleInitialUpdate("AgreementTotalPayments",this.props.planType.Data[0].NoOfPayments);
            this.handleInitialUpdate("AgreementInterestrate",this.props.planType.Data[0].Interest);
            this.handleInitialUpdate("AgreementPlanTypeid",this.props.planType.Data[0].FranchiseeContractTypeListId);
            this.handleInitialUpdate("AgreementDownPayment",this.props.planType.Data[0].DownPayment);
            this.handleInitialUpdate("AgreementInitialBusinessAmount",this.props.planType.Data[0].BusinessAmount);
            this.handleInitialUpdate("AgreementPlanType",this.props.planType.Data[0].Name);
            this.handleInitialUpdate("AgreementMonthlyPayment",this.props.planType.Data[0].PaymentAmount);
        }
    }

    handleFormChange = (name) => event => {

        if(name === 'State'){
            this.setState({
                [name]: event.target.value,
            });
        }
        const iStatus = this.props.insertPayload;
        console.log('insertPayload = ',iStatus);
        iStatus[name] = event.target.value;
        this.props.franchiseeUpdateInsertPayload(iStatus)
    };

    handleInitialUpdate (name , value){
        const iStatus = this.props.insertPayload;
        console.log('insertPayload = ',iStatus);
        iStatus[name] = value;
        this.props.franchiseeUpdateInsertPayload(iStatus)
    }

    componentDidMount() {
        if (this.InputLabelRef) {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
            });
        }
    }

    handleSignDateChange = date => {
        this.setState({ selectedSignDate: date });
        this.handleInitialUpdate("AgreementDateSigned" ,moment(date).format("MM/DD/YYYY"));
    };

    handleRenewDateChange = date => {
        this.setState({ selectedRenewDate: date });
        this.handleInitialUpdate("AgreementLatestRenewDate" ,moment(date).format("MM/DD/YYYY"));
    };

    handleExpDateChange = date => {
        this.setState({ selectedExpDate: date });
        this.handleInitialUpdate("AgreementExpirationDate" ,moment(date).format("MM/DD/YYYY"));
    };

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
        this.handleInitialUpdate([name],event.target.value);
    };

    canBeSubmitted() {
        return true;
    }

    handleStateChange = name => event => {
        let val = event.target.value;
        if(name === 'defaultPlanType'){
            this.props.planType.Data.map( (x,index)=> {
                    if (val === x.FranchiseeContractTypeListId) {
                        this.setState({
                            planAmount: x.Price,
                            daysToFullfill: x.DaysToFulfill,
                            noOfPayments: x.NoOfPayments,
                            interest: x.Interest,
                            downPayment: x.DownPayment,
                            ibAmount: x.BusinessAmount
                        });
                        this.handleInitialUpdate("AgreementPlanAmount",x.Price);
                        this.handleInitialUpdate("AgreementDaysToFullfill",x.DaysToFulfill);
                        this.handleInitialUpdate("AgreementTotalPayments",x.NoOfPayments);
                        this.handleInitialUpdate("AgreementInterestrate",x.Interest);
                        this.handleInitialUpdate("AgreementPlanTypeid",x.FranchiseeContractTypeListId);
                        this.handleInitialUpdate("AgreementDownPayment",x.DownPayment);
                        this.handleInitialUpdate("AgreementInitialBusinessAmount",x.BusinessAmount);
                        this.handleInitialUpdate("AgreementPlanType",x.Name);
                        this.handleInitialUpdate("AgreementMonthlyPayment",x.PaymentAmount);
                    }
                }
            )
        }
        this.setState({
            [name]: val,
        });
    };

    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        this.handleInitialUpdate([name],event.target.value);
    };

    handleAddressFormChange = (name) => event => {

       this.setState({
           [name]: event.target.value,
       });

        const originStatus = this.props.insertPayload;
        const AddressStatus = originStatus.Addresses[1];
        console.log('insertPayload = ',AddressStatus);
        AddressStatus[name] = event.target.value;
        originStatus.Addresses[1] = AddressStatus;
        this.props.franchiseeUpdateInsertPayload(originStatus)
    };

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

    //////////////////////

    render() {
        const { classes} = this.props;

        const steps = getSteps();
        const { activeStep} = this.state;
        const today = new Date();

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
                        <Tab label="Franchisee Agreement" />
                        <Tab label="Upload Required Document" />
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
                    <Divider variant="middle" style={{ marginTop: 12, marginBottom: 12, height: 1 }} />

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
                <div className="flex flex-1 flex-row justify-between items-center">
                    <div className="flex flex-row justify-start pl-24">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                        </FuseAnimate>
                    </div>
                    <div className="flex flex-row flex-1 justify-end pr-24">
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
        closeEditFranchisees: Actions.showCreteFranchisees,
        updateDate: Actions.updateDate,
        getFranchiseeFormPlanType: Actions.getFranchiseeFormPlanType,
        getFranchiseeDocumentsList: Actions.getFranchiseeDocumentsList,
        getFranchiseeFeeMaintenance: Actions.getFranchiseeFeeMaintenance,
        getFranchiseeStateList: Actions.getFranchiseeStateList,
        franchiseeUpdateInsertPayload: Actions.franchiseeUpdateInsertPayload,
    }, dispatch);
}

function mapStateToProps({ franchisees, auth }) {
    return {
        franchiseesForm: franchisees.createFranchisees,
        regionId: auth.login.defaultRegionId,
        planType: franchisees.planType,
        user: auth.login,
        documentsList: franchisees.documentsList,
        franchiseeFees: franchisees.franchiseeFees,
        stateList: franchisees.StateList,
        selectedSignDate: franchisees.selectedSignDate,
        selectedExpDate: franchisees.selectedExpDate,
        selectedRenewDate: franchisees.selectedRenewDate,
        insertPayload: franchisees.insertPayload
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesCreateForm)));

