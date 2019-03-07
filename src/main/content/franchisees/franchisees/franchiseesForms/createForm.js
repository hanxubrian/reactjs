import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// Material-UI core components
import {
	TextField, Button, Typography, Divider, FormControlLabel, Checkbox, AppBar, Tabs, Tab, Radio, MenuItem, InputAdornment,
	IconButton, Icon, Fab
} from '@material-ui/core';
// theme components

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
import FranchiseesOwnerTable from './ownerTable'
import 'date-fns';
import MomentUtils from '@date-io/moment';
import _ from "lodash";
import moment from "moment";

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import FranchiseesMaintenanceTable from "./maintenanceTableLine";
import FranchiseesDocumentUploadTable from "./documentUploadTable";
import FranchiseeReportTable from "./franchiseeReportTable";
import CustomersTable from "./customersTable";
import FindersFeesTable from "./findersFeesTable";


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
	iconButton: {

	},
	formControl: {
		marginBottom: 12,
		minWidth: 200,
	},
	textField: {
		width: '100%'
	},
	input1: {
		padding: '12px 6px',
		width: 160
	},
	fab: {
		margin: theme.spacing.unit,
		marginTop: 0,
		width: 42,
		height: 42
	},
});


function getSteps() {
	return ["Company Information", "Plan", "Documents", "Customers", "Finders Fees", "Franchisee Reports"];
}

function getStepContent(franchiseeForm, step) {
	const { classes } = franchiseeForm.props;

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
					<div style={{ marginTop: '30px' }} />
					<h3>Financial</h3>
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="financeName"
								label="Name"
								onChange={franchiseeForm.handleTextChange("LegalName")}
								value={franchiseeForm.state.LegalName}
								inputProps={{
									maxLength: 60
								}}
								InputLabelProps={{
									shrink: true,
								}}
								className={classes.textField}
								margin="dense"
								required
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="financeAddress1"
								label="Address 1"
								onChange={franchiseeForm.handleTextChange('LegalAddressLine1')}
								inputProps={{
									maxLength: 100
								}}
								InputLabelProps={{
									shrink: true,
								}}
								value={franchiseeForm.state.LegalAddressLine1}
								className={classes.textField}
								style={{ marginRight: '1%' }}
								margin="dense"
								required
							/>
							<TextField
								id="financeAddress2"
								label="Address 2"
								inputProps={{
									maxLength: 100
								}}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={franchiseeForm.handleTextChange('LegalAddressLine2')}
								value={franchiseeForm.state.LegalAddressLine2}
								className={classes.textField}
								style={{ marginLeft: '1%' }}
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
									maxLength: 100
								}}
								InputLabelProps={{
									shrink: true,
								}}
								value={franchiseeForm.state.LegalCity}
								className={classes.textField}
								margin="dense"
								style={{ marginRight: '1%' }}
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
								margin="dense"
								style={{ marginRight: '1%', marginLeft: '1%' }}
								InputLabelProps={{
									shrink: true,
								}}
								required
							>
								{franchiseeForm.props.stateList.map(option => (
									<MenuItem key={option.abbreviation} value={option.abbreviation}>
										{option.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-zip"
								label="Zip"
								onChange={franchiseeForm.handleTextChange('LegalZip')}
								inputProps={{
									maxLength: 20
								}}
								InputLabelProps={{
									shrink: true,
								}}
								value={franchiseeForm.state.LegalZip}
								className={classes.textField}
								margin="dense"
								style={{ marginLeft: '1%' }}
								required
							/>
							<TextField
								id="financeCounty"
								label="County"
								onChange={franchiseeForm.handleTextChange('LegalCounty')}
								inputProps={{
									maxLength: 100
								}}
								InputLabelProps={{
									shrink: true,
								}}
								className={classes.textField}
								value={franchiseeForm.state.LegalCounty}
								style={{ marginLeft: '1%' }}
								margin="dense"
								required
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-phone"
								label="1099 Name"
								value={franchiseeForm.state.NameOn1099}
								onChange={franchiseeForm.handleTextChange('NameOn1099')}
								inputProps={{
									maxLength: 60
								}}
								InputLabelProps={{
									shrink: true,
								}}
								className={classes.textField}
								margin="dense"
								style={{ marginRight: '1%' }}
							/>
							<FormControlLabel
								control={
									<Checkbox checked={franchiseeForm.state.Print1099} />
								}
								onChange={franchiseeForm.handleCheckboxChange('Print1099')}
								className={classes.textField}
								value={franchiseeForm.state.Print1099 === true ? "N" : "Y"}
								label="Print 1099"
								margin="dense"
								style={{ marginLeft: '1%' }}
							/>
						</GridItem>
					</GridContainer>
					<div style={{ marginTop: '30px' }} />
					<h3>Company Type</h3>
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							{/*<FormControlLabel*/}
							{/*value="ein"*/}
							{/*checked={franchiseeForm.state.LegalId === 'ein'}*/}
							{/*onChange={franchiseeForm.handleTextChange("LegalId")}*/}
							{/*control={<Radio color="primary" />}*/}
							{/*label="EIN"*/}
							{/*labelPlacement="end"*/}
							{/*margin="dense"*/}
							{/*/>*/}
							{/*<FormControlLabel*/}
							{/*checked={franchiseeForm.state.LegalId === 'ssn'}*/}
							{/*value="ssn"*/}
							{/*onChange={franchiseeForm.handleTextChange("LegalId")}*/}
							{/*control={<Radio color="primary" />}*/}
							{/*label="SSN"*/}
							{/*labelPlacement="end"*/}
							{/*margin="dense"*/}
							{/*/>*/}
							<FormControlLabel
								value="llc_ein"
								checked={franchiseeForm.state.LegalId === 'llc_ein'}
								onChange={franchiseeForm.handleTextChange("LegalId")}
								control={<Radio color="primary" />}
								label="LLC"
								labelPlacement="end"
								margin="dense"
							/>
							<FormControlLabel
								checked={franchiseeForm.state.LegalId === 'corporation_ein'}
								value="corporation_ein"
								onChange={franchiseeForm.handleTextChange("LegalId")}
								control={<Radio color="primary" />}
								label="Corporation"
								labelPlacement="end"
								margin="dense"
							/>
							<FormControlLabel
								value="partnership_ein"
								checked={franchiseeForm.state.LegalId === 'partnership_ein'}
								onChange={franchiseeForm.handleTextChange("LegalId")}
								control={<Radio color="primary" />}
								label="Partnership"
								labelPlacement="end"
								margin="dense"
							/>
							<FormControlLabel
								checked={franchiseeForm.state.LegalId === 'sole_provider_ssn'}
								value="sole_provider_ssn"
								onChange={franchiseeForm.handleTextChange("LegalId")}
								control={<Radio color="primary" />}
								label="Sole-Provider"
								style={{ whiteSpace: 'nowrap' }}
								labelPlacement="end"
								margin="dense"
							/>
						</GridItem>
						<GridItem xs={12} sm={6} md={6} className="flex flex-row">
							<TextField
								id="financeEinSsn"
								label={franchiseeForm.state.LegalLabel}
								type="number"
								className={classes.textField}
								value={franchiseeForm.state.LegalIdNum}
								onChange={franchiseeForm.handleTextChange("LegalIdNum")}
								InputLabelProps={{
									shrink: true,
								}}
								margin="dense"
								required
							/>
						</GridItem>
					</GridContainer>
					<div style={{ marginTop: '30px' }} />
					<h3>Owner</h3>
					<div className="flex">
						{franchiseeForm.props.insertPayload.Owners !== null && (
							<FranchiseesOwnerTable tableType="OWNER" headers={Owner_headers} />
						)}
						{franchiseeForm.props.insertPayload.Owners === null && (
							<p style={{ marginTop: 20, marginLeft: 10 }}>Owners Empty!</p>
						)}
					</div>
				</Fragment>
			);
		case 1:
			return (
				<Fragment>
					<div style={{ marginTop: '30px' }} />

					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="selectPlanType"
								select
								label="Plan Type"
								margin="dense"
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
								{franchiseeForm.props.planType && (
									franchiseeForm.props.planType.Data.map(option => (
										<MenuItem key={option.plantype} value={option.plantype}>
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
								inputProps={{
									maxLength: 60,
									readOnly: true
								}}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>
								}}
								margin="dense"
								style={{ marginRight: '1%' }}
								required
							/>

							<TextField
								id="termYrs"
								label="Term(Yrs)"
								type="number"
								margin="dense"
								inputProps={{
									maxLength: 60
								}}
								InputLabelProps={{
									shrink: true,
								}}
								value={franchiseeForm.state.AgreementTerm}
								onChange={franchiseeForm.handleFormChange('AgreementTerm')}
								className={classes.textField}
								required
								style={{ marginLeft: '1%' }}
							/>

						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">

							<TextField
								id="ibAmount"
								label="IB Amount"
								className={classes.textField}
								margin="dense"
								inputProps={{
									readOnly: true,
									type: "number",
									value: (isNaN(franchiseeForm.state.ibAmount) || franchiseeForm.state.ibAmount === null) ? 0 : franchiseeForm.state.ibAmount
								}}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>
								}}
								style={{ marginRight: '1%' }}
							/>


							<TextField
								id="daysToFullFill"
								label="Days To Fullfill"
								className={classes.textField}
								value={franchiseeForm.state.daysToFullfill}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									maxLength: 60,
									readOnly: true,
								}}
								style={{ marginLeft: '1%' }}
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
								margin="dense"
								style={{ marginRight: '1%' }}
								required
							/>

							<TextField
								id="interest"
								label="Interest"
								className={classes.textField}
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
								style={{ marginLeft: '1%', marginRight: '1%' }}
								margin="dense"
								required
							/>

							<TextField
								id="paymentAmount"
								label="Payment Amount"
								className={classNames(classes.textField)}
								value={franchiseeForm.state.paymentAmount}
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
								style={{ marginLeft: '1%', marginRight: '1%' }}
								required
							/>

							<TextField
								id="noOfPayments"
								label="No Of Payments"
								className={classes.textField}
								margin="dense"
								inputProps={{
									readOnly: true,
									value: franchiseeForm.state.noOfPayments === null ? "" : franchiseeForm.state.noOfPayments
								}}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>
								}}
								InputLabelProps={{
									shrink: true
								}}
								style={{ marginLeft: '1%' }}
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
									style={{ marginRight: '1%' }}
								/>
							</MuiPickersUtilsProvider>
							<MuiPickersUtilsProvider utils={MomentUtils}>
								<DatePicker
									label="Latest Renew Date"
									value={franchiseeForm.state.selectedRenewDate}
									onChange={franchiseeForm.handleRenewDateChange}
									className={classes.textField}
									format="MM/DD/YYYY"
									margin="dense"
									style={{ marginLeft: '1%', marginRight: '1%' }}
								/>
							</MuiPickersUtilsProvider>
							<MuiPickersUtilsProvider utils={MomentUtils}>
								<DatePicker
									label="EXP. Date"
									value={franchiseeForm.state.selectedExpDate}
									onChange={franchiseeForm.handleExpDateChange}
									format="MM/DD/YYYY"
									className={classes.textField}
									margin="dense"
									style={{ marginLeft: '1%' }}
								/>
							</MuiPickersUtilsProvider>
						</GridItem>
					</GridContainer>
					<div style={{ marginTop: '30px' }} />
					<h3>Billing Settings</h3>
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={
									<Checkbox checked={franchiseeForm.state.AllowChargeBack} />
								}
								onChange={franchiseeForm.handleCheckboxChange('AllowChargeBack')}
								value={franchiseeForm.state.AllowChargeBack === true ? "N" : "Y"}
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
									<Checkbox checked={franchiseeForm.state.AllowAccountRebate} />
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
					<div style={{ marginTop: '30px' }} />
					<h3>Fees</h3>
					<Fragment>
						{franchiseeForm.props.insertPayload.Fees !== null && (
							<FranchiseesMaintenanceTable />
						)}
						{franchiseeForm.props.insertPayload.Fees === null && (
							<p style={{ marginTop: 20, marginLeft: 10 }}>Fees Empty!</p>
						)}
					</Fragment>
				</Fragment>
			);
		case 2:
			return (
				<Fragment>
					<div style={{ marginTop: '30px' }} />
					<div className="flex">
						{franchiseeForm.props.insertPayload.Documents !== null && (
							<FranchiseesDocumentUploadTable />
						)}
						{franchiseeForm.props.insertPayload.Documents === null && (
							<p style={{ marginTop: 20, marginLeft: 10 }}>Documents Empty!</p>
						)}
					</div>
				</Fragment>
			);
		case 3:
			return (
				<Fragment>
					<CustomersTable />
				</Fragment>
			);
		case 4:
			return (
				<Fragment>
					<FindersFeesTable />
				</Fragment>
			);
		case 5:
			return (
				<Fragment>
					<FranchiseeReportTable />
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
		LegalName: "",
		LegalAddressLine1: "",
		LegalAddressLine2: "",
		LegalCity: "",
		LegalState: "",
		LegalZip: "",
		LegalCounty: "",
		LegalIdNum: 0,
		LegalId: "llc_ein",
		NameOn1099: "",
		AllowBppAdminFee: true,
		AllowChargeBack: true,
		AllowAccountRebate: true,
		AllowGenerateReport: true,
		AgreementTerm: 0,
		LegalLabel: "LLC",
		month: this.props.periodForReport.month,
		year: this.props.periodForReport.year,
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
			LegalName: "",
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
			AgreementTerm: 0,
			LegalLabel: "LLC"
		});
	};

	constructor(props) {
		super(props);
		props.getFranchiseeFormPlanType(props.regionId);
		if (props.franchiseesForm.type === 'edit') {
			props.getFinderfeesByFranchiseeNo(props.regionId, props.insertPayload.dlr_code);
			props.getFranchiseeReportByFranchiseeNum(props.regionId, props.insertPayload.dlr_code);
		}
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

	createFranchiseeForm = async () => {
		if (this.props.franchiseesForm.type === "new") {
			await this.props.createFranchisee(this.props.regionId, this.props.insertPayload);
			await this.props.getFranchisees(this.props.regionId);
			await this.initCloseState();
		}
		if (this.props.franchiseesForm.type === "edit") {
			await this.props.updateFranchisees(this.props.insertPayload._id, this.props.regionId, this.props.insertPayload);
			await this.props.getFranchisees(this.props.regionId);
			await this.initCloseState();
		}
	};

	componentWillMount() {

		this.setState({
			documentsList: this.props.getFranchiseeDocumentsList(this.props.regionId),
			LegalId: this.props.insertPayload.LegalId,
			LegalName: this.props.insertPayload.LegalName === null ? '' : this.props.insertPayload.LegalName,
			LegalAddressLine1: this.props.insertPayload.LegalAddressLine1 === null ? '' : this.props.insertPayload.LegalAddressLine1,
			LegalAddressLine2: this.props.insertPayload.LegalAddressLine2 === null ? '' : this.props.insertPayload.LegalAddressLine2,
			LegalCity: this.props.insertPayload.LegalCity === null ? '' : this.props.insertPayload.LegalCity,
			LegalCounty: this.props.insertPayload.LegalCounty === null ? '' : this.props.insertPayload.LegalCounty,
			LegalState: this.props.insertPayload.LegalState === null ? '' : this.props.insertPayload.LegalState,
			LegalZip: this.props.insertPayload.LegalZip === null ? '' : this.props.insertPayload.LegalZip,
			LegalIdNum: this.props.insertPayload.LegalIdNum === null ? '' : this.props.insertPayload.LegalIdNum,
			NameOn1099: this.props.insertPayload.NameOn1099,
			defaultPlanType: ((typeof (this.props.insertPayload.AgreementPlanTypeId) !== "string" || this.props.insertPayload.AgreementPlanTypeId === "") ? "A" : this.props.insertPayload.AgreementPlanTypeId),
			planAmount: this.props.insertPayload.AgreementPlanAmount,
			daysToFullfill: this.props.insertPayload.AgreementDaysToFulfill,
			noOfPayments: this.props.insertPayload.AgreementTotalPayment,
			interest: this.props.insertPayload.AgreementInterestRate,
			downPayment: this.props.insertPayload.AgreementDownPayment,
			ibAmount: this.props.insertPayload.AgreementInitialBusinessAmount

		});
		if (this.props.insertPayload.LegalId === 'llc_ein') {
			this.setState({
				LegalLabel: "LLC"
			})
		}
		if (this.props.insertPayload.LegalId === 'corporation_ein') {
			this.setState({
				LegalLabel: "Corporation"
			})
		}
		if (this.props.insertPayload.LegalId === 'partnership_ein') {
			this.setState({
				LegalLabel: "Partnership"
			})
		}
		if (this.props.insertPayload.LegalId === 'sole_provider_ssn') {
			this.setState({
				LegalLabel: "Sole-Provider"
			})
		}

		if (this.props.insertPayload.Print1099 === "Y") {
			this.setState({ Print1099: true });
		} else {
			this.setState({ Print1099: false });
		}

		if (this.props.insertPayload.AllowChargeBack === "Y") {
			this.setState({ AllowChargeBack: true });
		} else {
			this.setState({ AllowChargeBack: false });
		}

		if (this.props.insertPayload.AllowAccountRebate === "Y") {
			this.setState({ AllowAccountRebate: true });
		} else {
			this.setState({ AllowAccountRebate: false });
		}

		if (this.props.insertPayload.AllowGenerateReport === "Y") {
			this.setState({ AllowGenerateReport: true });
		} else {
			this.setState({ AllowGenerateReport: false });
		}

		if (this.props.insertPayload.AllowBppAdminFee === "Y") {
			this.setState({ AllowBppAdminFee: true });
		} else {
			this.setState({ AllowBppAdminFee: false });
		}

		this.props.getFranchiseeFeeMaintenance(this.props.regionId);
		this.props.getFranchiseeStateList();
	}

	componentWillReceiveProps(nextProps) {
		if ((nextProps.findersFees !== this.props.findersFees) && nextProps.findersFees.length > 0) {
			this.setState({
				findersFees: nextProps.findersFees
			});
		}

	}

	handleFormChange = (name) => event => {
		if (name === 'State' || name === 'AgreementTerm') {
			this.setState({
				[name]: event.target.value,
			});
		}
		const iStatus = this.props.insertPayload;
		iStatus[name] = (name === "AgreementTerm") ? parseInt(event.target.value) : event.target.value;
		console.log("iStatus", iStatus);
		this.props.franchiseeUpdateInsertPayload(iStatus)
	};

	handleInitialUpdate(name, value) {
		const iStatus = this.props.insertPayload;
		iStatus[name] = value;
		this.props.franchiseeUpdateInsertPayload(iStatus)
	}

	componentDidMount() {
		if (this.InputLabelRef) {
			this.setState({
				labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
			});
		}
		let period = this.props.defaultPeriod.split('/');
		// let month = parseInt(period[0]) - 1;
		let month = -1;
		let year = parseInt(period[1]);
		this.setState({month, year});
		this.props.updatePeriodForFranchiseeReport({year, month});
	}

	handleSignDateChange = date => {
		this.setState({ selectedSignDate: date });
		this.handleInitialUpdate("AgreementDateSigned", moment(date).format("MM/DD/YYYY"));
	};

	handleRenewDateChange = date => {
		this.setState({ selectedRenewDate: date });
		this.handleInitialUpdate("AgreementLatestRenewDate", moment(date).format("MM/DD/YYYY"));
	};

	handleExpDateChange = date => {
		this.setState({ selectedExpDate: date });
		this.handleInitialUpdate("AgreementExpirationDate", moment(date).format("MM/DD/YYYY"));
	};

	handleCheckboxChange = name => event => {
		this.setState({ [name]: event.target.checked });
		this.handleInitialUpdate([name], event.target.value);
	};

	canBeSubmitted() {
		return true;
	}

	handleStateChange = name => event => {
		let val = event.target.value;
		this.setState({
			[name]: val,
		});
		if (name === 'defaultPlanType') {
			this.props.planType.Data.map((x) => {
				if (val === x.plantype) {
					this.setState({
						planAmount: x.fran_amt * 1,
						daysToFullfill: x.days2fill * 1,
						noOfPayments: x.pymnt_totl * 1,
						interest: x.interest * 1,
						downPayment: x.dwn_pymnt * 1,
						ibAmount: x.inittot * 1,
						defaultPlanType: x.plantype
					});
					this.handleInitialUpdate("AgreementPlanAmount", x.fran_amt * 1);
					this.handleInitialUpdate("AgreementDaysToFulfill", x.days2fill * 1);
					this.handleInitialUpdate("AgreementTotalPayment", x.pymnt_totl * 1);
					this.handleInitialUpdate("AgreementInterestRate", x.interest * 1);
					this.handleInitialUpdate("AgreementPlanTypeId", x.plantype);
					this.handleInitialUpdate("AgreementDownPayment", x.dwn_pymnt * 1);
					this.handleInitialUpdate("AgreementInitialBusinessAmount", x.BusinessAmount * 1);
					this.handleInitialUpdate("AgreementPlanType", x.plantype);
					this.handleInitialUpdate("AgreementMonthlyPayment", x.PaymentAmount * 1);
				}
			}
			)
		}
	};

	handleTextChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
		if (name === 'LegalId') {
			if (event.target.value === 'llc_ein') {
				this.setState({
					LegalLabel: "LLC"
				})
			}
			if (event.target.value === 'corporation_ein') {
				this.setState({
					LegalLabel: "Corporation"
				})
			}
			if (event.target.value === 'partnership_ein') {
				this.setState({
					LegalLabel: "Partnership"
				})
			}
			if (event.target.value === 'sole_provider_ssn') {
				this.setState({
					LegalLabel: "Sole-Provider"
				})
			}
		}
		this.handleInitialUpdate([name], event.target.value);
	};

	handleAddressFormChange = (name) => event => {

		this.setState({
			[name]: event.target.value,
		});

		const originStatus = this.props.insertPayload;
		const AddressStatus = originStatus.Addresses[1];
		console.log('insertPayload = ', AddressStatus);
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

	handlePeriodChange = (event) => {
		this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
		let year = event.target.name === 'year' ? event.target.value : this.state.year;
		let month = event.target.name === 'month' ? event.target.value : this.state.month;

		this.props.updatePeriodForFranchiseeReport({ year, month });
	};

	gotoFranchiseeReports = () => {
		this.props.nullifyFranchiseeReport();
	};

	//////////////////////

	render() {
		const { classes } = this.props;

		const steps = getSteps();
		const { activeStep } = this.state;

		const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		let years = _.range(1999, moment().year() + 1);

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
						<Tab label="Documents" />
						{this.props.franchiseesForm.type === "edit" && (
							<Tab label="Customers" />
						)}
						{this.props.franchiseesForm.type === "edit" && (
							<Tab label="Finders Fees" />
						)}
						{this.props.franchiseesForm.type === "edit" && (
							<Tab label="Franchisee Reports" />
						)}
					</Tabs>
				</AppBar>
				<div
					className={classNames(classes.layoutTable, "p-24")}
					style={{
						overflowY: 'scroll',
						width: '100%',
					}}>
					<div className="flex flex-row flex-1 justify-between items-center">
						<h2>{steps[activeStep]}</h2>
						{activeStep === 5 && (
							<div className="flex flex-row">
								{(this.props.franchiseeReport !== null || this.props.franchiseeLegacyReport !== null) && (
									<Fab color="primary" aria-label="view" className={classNames(classes.fab)}
										 onClick={() => this.gotoFranchiseeReports()}
									>
										<Icon>list</Icon>
									</Fab>
								)}
								<TextField
									margin={"none"}
									name="month"
									label="Billing Month"
									variant="outlined"
									select
									value={this.state.month}
									className="mr-24"
									onChange={this.handlePeriodChange}
									InputProps={{
										classes: {
											input: classes.input1,
										},
									}}
									// fullWidth
								>
									<MenuItem value={-1}>All</MenuItem>
									{mL.map((month, index) => {
										return (<MenuItem key={index} value={index}>{month}</MenuItem>)
									})}
								</TextField>
								<TextField
									margin={"none"}
									name="year"
									label="Billing Year"
									variant="outlined"
									select
									value={this.state.year}
									onChange={this.handlePeriodChange}
									InputProps={{
										classes: {
											input: classes.input1,
										},
									}}
									// fullWidth
								>
									{years.map((year, index) => {
										return (<MenuItem className="text-right" key={index} value={year}>{year}</MenuItem>)
									})}
								</TextField>
							</div>
						)}

					</div>
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
		createFranchisee: Actions.createFranchisees,
		updateFranchisees: Actions.updateFranchisees,
		getFinderfeesByFranchiseeNo: Actions.getFinderfeesByFranchiseeNo,
		getFranchiseeReportByFranchiseeNum: Actions.getFranchiseeReportByFranchiseeNum,
		updatePeriodForFranchiseeReport: Actions.updatePeriodForFranchiseeReport,
		nullifyFranchiseeReport: Actions.nullifyFranchiseeReport,
	}, dispatch);
}

function mapStateToProps({ franchisees, auth, franchiseeReports }) {
	return {
		franchiseesForm: franchisees.createFranchisees,
		regionId: auth.login.defaultRegionId,
		planType: franchisees.planType,
		user: auth.login,
		documentsList: franchisees.documentsList,
		franchiseeFees: franchisees.franchiseeFees,
		stateList: franchisees.stateList,
		selectedSignDate: franchisees.selectedSignDate,
		selectedExpDate: franchisees.selectedExpDate,
		selectedRenewDate: franchisees.selectedRenewDate,
		insertPayload: franchisees.insertPayload,
		findersFees: franchisees.findersFees,
		defaultPeriod: auth.login.defaultPeriod,
		franchiseeReport: franchiseeReports.franchiseeReport1,
		franchiseeLegacyReport: franchiseeReports.franchiseeReport,
		periodForReport: franchisees.periodForReport,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesCreateForm)));

