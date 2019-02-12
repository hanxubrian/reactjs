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
    return ["Company Information", "Plan", "Document"];
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                required
                            />
                            <TextField
                                id="financeName"
                                label="Name"
                                onChange={franchiseeForm.handleTextChange("LegalName")}
                                value={franchiseeForm.state.LegalName}
                                variant="outlined"
                                inputProps={{
                                    maxLength:60
                                }}
                                InputLabelProps={{
                                    shrink: true,
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
                                onChange={franchiseeForm.handleTextChange('LegalAddressLine1')}
                                variant="outlined"
                                inputProps={{
                                    maxLength:100
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={franchiseeForm.state.LegalAddressLine1}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={franchiseeForm.handleTextChange('LegalAddressLine2')}
                                variant="outlined"
                                value={franchiseeForm.state.LegalAddressLine2}
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
                                onChange={franchiseeForm.handleTextChange('LegalCity')}
                                inputProps={{
                                    maxLength:100
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={franchiseeForm.state.LegalCity}
                                className={classes.textField}
                                margin="dense"
                                style={{marginRight:'1%'}}
                                required
                            />
                            <TextField
                                id="state"
                                label="State"
                                select
                                placeholder="Select State"
                                className={classes.textField}
                                value={franchiseeForm.state.LegalState}
                                onChange={franchiseeForm.handleTextChange('LegalState')}
                                variant="outlined"
                                margin="dense"
                                style={{marginRight:'1%',marginLeft:'1%'}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                onChange={franchiseeForm.handleTextChange('LegalZip')}
                                inputProps={{
                                    maxLength:20
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={franchiseeForm.state.LegalZip}
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
                                onChange={franchiseeForm.handleTextChange('LegalCounty')}
                                inputProps={{
                                    maxLength:100
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                className={classes.textField}
                                value={franchiseeForm.state.LegalCounty}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                required
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.Print1099} />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('Print1099')}
                                className={classes.textField}
                                value={franchiseeForm.state.Print1099 === true ? "N" : "Y" }
                                label="Print 1099"
                                margin="dense"
                                style={{marginLeft:'1%',marginRight: '1%'}}
                            />
                            <TextField
                                id="outlined-phone"
                                variant="outlined"
                                label="1099 Name"
                                value={franchiseeForm.state.NameOn1099}
                                onChange={franchiseeForm.handleTextChange('NameOn1099')}
                                inputProps={{
                                    maxLength:60
                                }}
                                InputLabelProps={{
                                    shrink: true,
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
                     {franchiseeForm.props.insertPayload.Owners !== null && (
                            <FranchiseesOwnerTable tableType="OWNER" headers={Owner_headers} />
                     ) }
                     {franchiseeForm.props.insertPayload.Owners === null && (
                            <p style={{marginTop:20,marginLeft:10}}>Owners Empty!</p>
                     )}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.plantype}
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
                                    className={classes.textField}
                                    variant="outlined"
                                    inputProps={{
                                        maxLength:60,
                                        readOnly: true
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
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
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={franchiseeForm.state.AgreementTerm }
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
                                margin="dense"
                                value={franchiseeForm.state.ibAmount}
                                inputProps={{
                                    maxLength:60,
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                style={{marginRight: '1%'}}
                                required
                            />
                        
                        
                            <TextField
                                id="daysToFullFill"
                                label="Days To Fullfill"
                                className={classes.textField}
                                value={franchiseeForm.state.daysToFullfill}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    maxLength: 60,
                                    readOnly: true,
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
                                value={franchiseeForm.state.downPayment}
                                inputProps={{
                                    maxLength: 60,
                                    readOnly: true,
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
                                variant="outlined"
                                value={franchiseeForm.state.interest}
                                inputProps={{
                                    maxLength: 60,
                                    readOnly: true,
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
                                value={franchiseeForm.state.paymentAmount}
                                variant="outlined"
                                margin="dense"
                                inputProps={{
                                    maxLength: 60,
                                    readOnly: true,
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
                                value={franchiseeForm.state.noOfPayments}
                                variant="outlined"
                                margin="dense"
                                inputProps={{
                                    maxLength: 60,
                                    readOnly: true,
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
                    <Fragment>
                        {franchiseeForm.props.insertPayload.Fees !== null && (
                            <FranchiseesMaintenanceTable/>
                        )}
                        {franchiseeForm.props.insertPayload.Fees === null && (
                            <p style={{marginTop:20,marginLeft:10}}>Fees Empty!</p>
                        )}                    
                    </Fragment>
                </Fragment>
            );
        case 2:
            return(
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <div className="flex">
                        {franchiseeForm.props.insertPayload.Documents !== null && (
                            <FranchiseesDocumentUploadTable/>
                        )}
                        {franchiseeForm.props.insertPayload.Documents === null && (
                            <p style={{marginTop:20,marginLeft:10}}>Documents Empty!</p>
                        )}
                    </div>
                </Fragment>
            );
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
        Print1099: true,
        chargeBack: false,
        bbpAdministration: false,
        accountRebate: false,
        generateReport: false,
        StateValue: '',
        defaultPlanType: "A",
        selectedSignDate: new Date(),
        selectedRenewDate: new Date(),
        selectedExpDate: new Date(),
        planAmount: 8600.00,
        ibAmount: 500.00,
        downPayment: 2000.00,
        interest: 0.00,
        noOfPayments: 48,
        daysToFullfill: 120,
        paymentAmount: 0,
        documentsList: [],
        franchiseeFees: [],
        LegalName : "",
        LegalAddressLine1: "",
        LegalAddressLine2: "",
        LegalCity: "",
        LegalState: "",
        LegalZip: "",
        LegalCounty: "",
        LegalIdNum: 0,
        LegalId: "ein",
        NameOn1099: "",
        AllowBppAdminFee: true,
        AllowChargeBack: true,
        AllowAccountRebate: true,
        AllowGenerateReport: true,
        AgreementTerm: 0
    };

    initCloseState = () => {
        this.setState({
            labelWidth: 0,
            selectedWork: "",
            activeStep: 0,
            completed: new Set(),
            termsYrs: '',
            skipped: new Set(),
            Print1099: true,
            chargeBack: false,
            bbpAdministration: false,
            accountRebate: false,
            generateReport: false,
            StateValue: '',
            defaultPlanType: 0,
            selectedSignDate: new Date(),
            selectedRenewDate: new Date(),
            selectedExpDate: new Date(),
            planAmount: 8600.00,
            ibAmount: 500.00,
            downPayment: 2000.00,
            interest: 0.00,
            noOfPayments: 48,
            daysToFullfill: 120,
            paymentAmount: 0,
            documentsList: [],
            franchiseeFees: [],
            LegalName : "",
            LegalAddressLine1: "",
            LegalAddressLine2: "",
            LegalCity: "",
            LegalState: "",
            LegalZip: "",
            LegalCounty: "",
            LegalIdNum: 0,
            LegalId: "ein",
            NameOn1099: "",
            AllowBppAdminFee: true,
            AllowChargeBack: true,
            AllowAccountRebate: true,
            AllowGenerateReport: true,
            AgreementTerm: 0
        });
    }

    constructor (props){
        super(props);
        props.getFranchiseeFormPlanType(props.regionId);        
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };
    closeComposeForm = () => {
        this.type === 'create' ? this.props.closeEditFranchisees() : this.props.closeCreateFranchisees();
        this.initCloseState();
    };

    createFranchiseeForm = async() => {
        if(this.props.franchiseesForm.type ==="new"){
            await this.props.createFranchisee(this.props.regionId,this.props.insertPayload);
            await this.props.getFranchisees(this.props.regionId);
            await this.initCloseState();
        }
        if(this.props.franchiseesForm.type ==="edit"){
            await this.props.updateFranchisees(this.props.insertPayload._id , this.props.regionId, this.props.insertPayload);
            await this.props.getFranchisees(this.props.regionId);
            await this.initCloseState();
        }
    };

    componentWillMount(){
        
        this.setState({
            documentsList: this.props.getFranchiseeDocumentsList(this.props.regionId),
            LegalId: this.props.insertPayload.LegalId,
            LegalName: this.props.insertPayload.LegalName,
            LegalAddressLine1: this.props.insertPayload.LegalAddressLine1,
            LegalAddressLine2: this.props.insertPayload.LegalAddressLine2,
            LegalCity: this.props.insertPayload.LegalCity,
            LegalCounty: this.props.insertPayload.LegalCounty,
            LegalState: this.props.insertPayload.LegalState,
            LegalZip: this.props.insertPayload.LegalZip,
            LegalIdNum: this.props.insertPayload.LegalIdNum, 
            NameOn1099: this.props.insertPayload.NameOn1099,
            defaultPlanType: this.props.insertPayload.AgreementPlanTypeId,
            planAmount: this.props.insertPayload.AgreementPlanAmount,
            daysToFullfill: this.props.insertPayload.AgreementDaysToFulfill,
            noOfPayments: this.props.insertPayload.AgreementTotalPayments,
            interest: this.props.insertPayload.AgreementInterestRate,
            downPayment: this.props.insertPayload.AgreementDownPayment,
            ibAmount: this.props.insertPayload.AgreementInitialBusinessAmount
        });
        
        if(this.props.insertPayload.Print1099 === "Y"){
            this.setState({ Print1099: true });
        }else{
            this.setState({Print1099: false });
        }

        if(this.props.insertPayload.AllowChargeBack === "Y"){
            this.setState({ AllowChargeBack: true });
        }else{
            this.setState({AllowChargeBack: false });
        }

        if(this.props.insertPayload.AllowAccountRebate === "Y"){
            this.setState({ AllowAccountRebate: true });
        }else{
            this.setState({AllowAccountRebate: false });
        }

        if(this.props.insertPayload.AllowGenerateReport === "Y"){
            this.setState({ AllowGenerateReport: true });
        }else{
            this.setState({AllowGenerateReport: false });
        }

        if(this.props.insertPayload.AllowBppAdminFee === "Y"){
            this.setState({ AllowBppAdminFee: true });
        }else{
            this.setState({AllowBppAdminFee: false });
        }

        this.props.getFranchiseeFeeMaintenance(this.props.regionId);
        this.props.getFranchiseeStateList(this.props.regionId);
    }

    componentWillReceiveProps(nextProps){
       
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
        this.setState({
            [name]: val,
        });
        if(name === 'defaultPlanType'){
            //console.log(this.props.planType.Data);
            this.props.planType.Data.map( (x)=> {
                    if (val === x._id) {
                        this.setState({
                            planAmount: x.fran_amt*1,
                            daysToFullfill: x.days2fill*1,
                            noOfPayments: x.pymnt_totl*1,
                            interest: x.interest*1,
                            downPayment: x.dwn_pymnt*1,
                            ibAmount: x.inittot*1,
                            defaultPlanType: x._id
                        });
                        this.handleInitialUpdate("AgreementPlanAmount",x.fran_amt*1);
                        this.handleInitialUpdate("AgreementDaysToFulfill",x.days2fill*1);
                        this.handleInitialUpdate("AgreementTotalPayments",x.pymnt_totl*1);
                        this.handleInitialUpdate("AgreementInterestRate",x.interest*1);
                        this.handleInitialUpdate("AgreementPlanTypeId",x._id);
                        this.handleInitialUpdate("AgreementDownPayment",x.dwn_pymnt*1);
                        this.handleInitialUpdate("AgreementInitialBusinessAmount",x.BusinessAmount*1);
                        this.handleInitialUpdate("AgreementPlanType",x.Name*1);
                        this.handleInitialUpdate("AgreementMonthlyPayment",x.PaymentAmount*1);
                    }
                }
            )
        }
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
                        <Tab label="Plan" />
                        <Tab label="Document" />
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

                    <Fragment>
                        {this.allStepsCompleted() ? (
                            <Fragment>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={this.handleReset}>Reset</Button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {getStepContent(this, activeStep)}
                            </Fragment>
                        )}
                    </Fragment>
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
                                onClick={() => {this.createFranchiseeForm();}}
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
        getFranchisees: Actions.getFranchisees,
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
        createFranchisee : Actions.createFranchisees,
        updateFranchisees: Actions.updateFranchisees,
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

