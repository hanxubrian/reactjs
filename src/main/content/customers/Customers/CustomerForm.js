import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
	TextField, Button, MenuItem, Divider, FormControlLabel,
	AppBar, Checkbox, Tabs, Tab, Switch, InputAdornment } from '@material-ui/core';

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
import _ from 'lodash';
import classNames from 'classnames';

import CustomersDocumentUploadTable from "./documentUploadTable";

import AccountOfferingPage from './form/account-offering/AccountOfferingPage';
import FinderFeePage from './form/finders-fees/NewFindersFeePage'
import ServiceAgreementPage from './form/service-agreement/ServiceAgreementPage'
import FranchiseeDistributionPage from './form/service-agreement/FranchiseeDistributionPage'

const hexToRgb = (hex) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const styles = theme => ({

	root: {
		width: '90%',
		'& .ReactTable .rt-noData': {
			top: '250px',
			border: '1px solid coral'
		},
		'& .ReactTable .rt-thead.-headerGroups': {
			paddingLeft: '0!important',
			paddingRight: '0!important',
			minWidth: 'inherit!important'
		},
		'& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
			background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
			color: 'white!important'
		},
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
		marginRight: theme.spacing.unit,
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
	tableTheadRow: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
	},

});

const newCustomerState = {
	"MasterTrxTypeListId": "",
	"RegionId": "",
	"RegionName": "",
	"CustomerId": "",
	"CustomerNo": "",
	"CustomerDate": "",
	"DueDate": "",
	// "CustomerId": "",
	// "CustomerNo": "",
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

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSteps() {
	return ['Service Agreement', 'Franchisee Distribution', 'Billing', 'Cleaning Schedule', "Walk-Thru", "Account Offering", "Documents", "Marketing", "Account History", "Finders Fees"];
}

const Upload_Document_headers = [
	{
		id: 'documentName',
		numeric: false,
		disablePadding: false,
		label: 'Document Name'
	},
	{
		id: 'uploadDateTime',
		numeric: false,
		disablePadding: false,
		label: 'Upload Date Time'
	},
	{
		id: 'browse',
		numeric: false,
		disablePadding: false,
		label: 'Browse'
	},
];

// const GridRootComponent = props => <Grid.Root {...props} style={{ height: '100%' }} />;
class CustomerForm extends Component {
	state = {
		temp: [],
		data: [],
		docs: [],
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


		pageSizes: [5, 10, 20, 30, 50, 100],
		pageSize: 20,
		searchValue: '',
		selection: [],
		sorting: [
			{ columnName: 'Number', direction: 'asc' }
		],

		account_offering_step: 0,

	};

	//
	// to edit table cell
	//
	commitChanges = ({ added, changed, deleted }) => {
		console.log("commitChanges");
		let { rows } = this.state;
		if (added) {
			const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
			rows = [
				...rows,
				...added.map((row, index) => ({
					id: startingAddedId + index,
					...row,
				})),
			];
		}
		if (changed) {
			rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
		}
		if (deleted) {
			const deletedSet = new Set(deleted);
			rows = rows.filter(row => !deletedSet.has(row.id));
		}
		this.setState({ rows });
	}

	getStepContent(step) {
		const { classes} = this.props;

		let execTitles = []
		if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
			execTitles = this.props.accountExecutiveList.Data.filter(x => {
				if (x.Title === null) return false
				return true
			}).map(x => {
				return x.FirstName + " " + x.LastName
			}).sort();
		}

		switch (step + 1) {
			case 1:
				return (
					<ServiceAgreementPage />
				);
				case 2:
				return (
					<FranchiseeDistributionPage />
				);
			case 3:
				return (
					<Fragment>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row justify-between">
								<div className="flex flex-col">
									<TextField
										type="date"
										id="EffectiveDate"
										label="Effective Date"
										className={classNames(classes.textField)}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.EffectiveDate}
										onChange={this.handleChange('EffectiveDate')}
										margin="dense"
										variant="outlined"
										style={{ width: "20%", minWidth: "180px" }}

									/>

									<TextField
										id="PONumer"
										type="number"
										label="PO Numer"
										className={classes.textField}
										value={this.state.PONumer}
										onChange={this.handleChange('PONumer')}
										margin="dense"
										variant="outlined"
										style={{ width: "20%", minWidth: "180px" }}
									/>
								</div>
								<div className="flex flex-col justify-between">
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChange('weekdays')} />
										}
										label="Print Past Due"
										className="mr-36"

									/>
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChange('weekdays')} />
										}
										label="Tax Exempt"
										className="mr-36"

									/>
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChange('weekdays')} />
										}
										label="Consolidated Invoice"
										className=""

									/>
								</div>

							</GridItem>



							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="InvoiceDate"
									label="Invoice Date"
									className={classNames(classes.textField, "mr-6")}
									select
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.InvoiceDate === undefined ? "" : this.state.InvoiceDate}
									onChange={this.handleChange('InvoiceDate')}
									margin="dense"
									variant="outlined"
									style={{ width: "100%" }}
								>
									{[{ value: 0, label: "BOM" },
									{ value: 1, label: "EOM" }].map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									id="BillingFrequency"
									label="Billing Frequency"
									select
									InputLabelProps={{
										shrink: true
									}}
									className={classNames(classes.textField, "ml-6")}
									value={this.state.BillingFrequency === undefined ? "" : this.state.BillingFrequency}
									onChange={this.handleChange('BillingFrequency')}
									margin="dense"
									variant="outlined"
									style={{ width: "100%" }}
								>
									{[{ value: 0, label: "Monthly" }].map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

							</GridItem>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<div style={{ display: 'flex', flexDirection: 'row', minWidth: "100px", width: "50%" }}>
									<FormControlLabel
										control={
											<Switch
												checked={this.state.checkedA}
												onChange={this.handleChange('checkedA')}
												value={this.state.checkedA}
											/>
										}
										label="E-Billing"
									// style={{ width: '40%' }}
									/>

									<TextField
										type="email"
										id="Email"
										label="Email"
										className={classes.textField}
										value={this.state.Email}
										onChange={this.handleChange('Email')}
										margin="dense"
										variant="outlined"
										style={{ width: '60%' }}
									/>
								</div>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="Term"
									label="Term"
									select
									InputLabelProps={{
										shrink: true
									}}
									className={classNames(classes.textField, "mr-6")}
									value={this.state.Term === undefined ? "" : this.state.Term}
									onChange={this.handleChange('Term')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								>
									{[{ value: 0, label: "Due Upon Receipt" },
									{ value: 1, label: "EOM" },
									{ value: 2, label: "Net 30" },
									{ value: 3, label: "Net 40" },
									{ value: 4, label: "Net 45" },
									{ value: 5, label: "Net 60" },].map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									id="ARStatus"
									label="AR Status"
									select
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.ARStatus === undefined ? "" : this.state.ARStatus}
									onChange={this.handleChange('ARStatus')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								>
									{[{ value: 0, label: "Select" },
									{ value: 1, label: "Bankruptcy" },
									{ value: 2, label: "In Litigation" },
									{ value: 3, label: "Normal" },
									{ value: 4, label: "Referred to Collections" },
									{ value: 5, label: "Slow Pay" },
									{ value: 6, label: "Uncollectable" },
									{ value: 7, label: "National Accoints" },
									{ value: 8, label: "AutoPay" },
									{ value: 9, label: "TEST" },].map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="Notes"
									label="Notes"
									multiline
									rows="2"
									rowsMax="2"
									className={classes.textField}
									value={this.state.Notes}
									onChange={this.handleChange('Notes')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
						</GridContainer>
					</Fragment>
				);
			case 4:
				// return 'Step 3: This is the bit I really care about!';
				return (
					<Fragment>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="ServiceType"
									label="Service Type *"
									select
									InputLabelProps={{
										shrink: true
									}}
									className={classes.textField}
									value={this.state.ServiceType === undefined ? "" : this.state.ServiceType}
									onChange={this.handleChange('ServiceType')}
									margin="dense"
									variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								>
									{[{ value: 0, label: "Select" }].map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="number"
									inputProps={{ min: "0", max: "999999", step: "1" }}
									id="SquareFootage"
									label="Square Footage"
									className={classes.textField}
									value={this.state.SquareFootage}
									onChange={this.handleChange('SquareFootage')}
									margin="dense"
									variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								/>

							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="time"
									id="StartTime"
									label="Start Time *"
									className={classNames(classes.textField, "mr-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.StartTime}
									onChange={this.handleChange('StartTime')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									type="time"
									id="EndTime"
									label="End Time *"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.EndTime}
									onChange={this.handleChange('EndTime')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="number"
									id="Amount"
									label="Amount *"
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.Amount}
									onChange={this.handleChange('Amount')}
									margin="dense"
									variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>
									}}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="number"
									id="CleanTimes"
									label="Clean Times *"
									className={classNames(classes.textField, "mr-6")}
									value={this.state.CleanTimes}
									onChange={this.handleChange('CleanTimes')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>

								<TextField
									select

									id="CleanFrequency"
									label="Clean Frequency *"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.CleanFrequency === undefined ? "" : this.state.CleanFrequency}
									onChange={this.handleChange('CleanFrequency')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								>
									{[{ value: 0, label: "Monthly" }].map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row justify-start">
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Mon"
									className="mr-36"

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Tue"
									className="mr-36"

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Wed"
									className="mr-36"

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Thu"
									className="mr-36"

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Fri"
									className="mr-36"

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Sat"
									className="mr-36"

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Sun"
									className="mr-36"
								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Weekends"

								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="CPI Increase"
									style={{ marginRight: "30px" }}

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Separate Invoice"
									style={{ marginRight: "30px" }}

								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="Description"
									label="Description"
									multiline
									rows="2"
									rowsMax="2"
									className={classes.textField}
									value={this.state.Description}
									onChange={this.handleChange('Description')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
						</GridContainer>

					</Fragment>
				);
			case 5:
				return (
					<Fragment>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="date"
									id="Date"
									label="Date"
									className={classNames(classes.textField, "mr-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.Date}
									onChange={this.handleChange('Date')}
									margin="dense"
									variant="outlined"
									fullWidth
									style={{ width: "20%", minWidth: "180px" }}
								/>
								<TextField
									type="date"
									id="WalkThroughDate"
									label="Walk Through Date"
									className={classNames(classes.textField, "mr-6 ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.WalkThroughDate}
									onChange={this.handleChange('WalkThroughDate')}
									margin="dense"
									variant="outlined"
									fullWidth
									style={{ width: "20%", minWidth: "180px" }}
								/>
								<TextField
									type="date"
									id="StartDate"
									label="Start Date"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.StartDate}
									onChange={this.handleChange('StartDate')}
									margin="dense"
									variant="outlined"
									fullWidth
									style={{ width: "20%", minWidth: "180px" }}
								/>

							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="FranchiseName"
									label="Franchise Name"
									className={classes.textField}
									value={this.state.FranchiseName}
									onChange={this.handleChange('FranchiseName')}
									margin="dense"
									variant="outlined"
									style={{ minWidth: '100px', width: '30%' }}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<h3 style={{ marginTop: 20 }}>Location Checklist</h3>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.LightSwitches} onChange={this.handleChange('LightSwitches')} value={this.state.LightSwitches} />}
									label="Light Switches?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.BreakersPanel} onChange={this.handleChange('BreakersPanel')} value={this.state.BreakersPanel} />}
									label="Breaker's Panel?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.ContactsOffice} onChange={this.handleChange('ContactsOffice')} value={this.state.ContactsOffice} />}
									label="Contact's Office?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.StorageAreas} onChange={this.handleChange('StorageAreas')} value={this.state.StorageAreas} />}
									label="Storage Areas?"
									style={{ width: '100%' }}
								/>

							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.WaterSource} onChange={this.handleChange('WaterSource')} value={this.state.WaterSource} />}
									label="Water Source?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.TrashDisposal} onChange={this.handleChange('TrashDisposal')} value={this.state.TrashDisposal} />}
									label="Trash Disposal?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.Recycling} onChange={this.handleChange('Recycling')} value={this.state.Recycling} />}
									label="Recycling?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.AccountSupplies} onChange={this.handleChange('AccountSupplies')} value={this.state.AccountSupplies} />}
									label="Account Supplies?"
									style={{ width: '100%' }}
								/>

							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<h3 style={{ marginTop: 20 }}>Security Checklist</h3>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.KeyEntry} onChange={this.handleChange('KeyEntry')} value={this.state.KeyEntry} />}
									label="Key? Entry:"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.AlarmSystem} onChange={this.handleChange('AlarmSystem')} value={this.state.AlarmSystem} />}
									label="Alarm System"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.RestroomPaperDispensers} onChange={this.handleChange('RestroomPaperDispensers')} value={this.state.RestroomPaperDispensers} />}
									label="Restroom Paper Dispensers?"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="SecurityProcedures"
									label="Security Procedures?"
									className={classes.textField}
									value={this.state.SecurityProcedures}
									onChange={this.handleChange('SecurityProcedures')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="EmergencyNamesAndTelephoneNumbers1"
									label="Emergency Names And Telephone Numbers 1"
									className={classes.textField}
									value={this.state.EmergencyNamesAndTelephoneNumbers1}
									onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers1')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="EmergencyNamesAndTelephoneNumbers2"
									label="Emergency Names And Telephone Numbers 2"
									className={classes.textField}
									value={this.state.EmergencyNamesAndTelephoneNumbers2}
									onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers2')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="ProblemConnernsAreasNeedingImprovment"
									label="Problem, connerns, areas needing improvment and general comments?"
									multiline
									rows="2"
									rowsMax="2"
									className={classes.textField}
									value={this.state.ProblemConnernsAreasNeedingImprovment}
									onChange={this.handleChange('ProblemConnernsAreasNeedingImprovment')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<h3 style={{ marginTop: 20, width: '100%' }}>Paperwork Checklist</h3>
								<h3 style={{ marginTop: 20, width: '100%' }}>Signatures</h3>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<GridItem xs={12} sm={12} md={12} className="flex flex-col" style={{ justifyContent: 'space-evenly' }}>
									<FormControlLabel
										control={<Switch checked={this.state.SignedMaintenaceAgreement} onChange={this.handleChange('SignedMaintenaceAgreement')} value={this.state.SignedMaintenaceAgreement} />}
										label="1. Signed Maintenace Agreement?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.SignedPricePage} onChange={this.handleChange('SignedPricePage')} value={this.state.SignedPricePage} />}
										label="2. Signed Price Page?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.SignedCleaningSchedule} onChange={this.handleChange('SignedCleaningSchedule')} value={this.state.SignedCleaningSchedule} />}
										label="3. Signed Cleaning Schedule?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.AnalysisOfAccount} onChange={this.handleChange('AnalysisOfAccount')} value={this.state.AnalysisOfAccount} />}
										label="4. Analysis Of Account?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.AccountBidSheet} onChange={this.handleChange('AccountBidSheet')} value={this.state.AccountBidSheet} />}
										label="5. Account Bid Sheet?"
										style={{ width: '100%' }}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12} className="flex flex-col" style={{ justifyContent: 'space-evenly' }}>
									<TextField
										id="SignatureAE"
										label="A.E."
										className={classes.textField}
										value={this.state.SignatureAE}
										onChange={this.handleChange('SignatureAE')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureOPS"
										label="OPS"
										className={classes.textField}
										value={this.state.SignatureOPS}
										onChange={this.handleChange('SignatureOPS')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureRD"
										label="R.D."
										className={classes.textField}
										value={this.state.SignatureRD}
										onChange={this.handleChange('SignatureRD')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureFO"
										label="F.O."
										className={classes.textField}
										value={this.state.SignatureFO}
										onChange={this.handleChange('SignatureFO')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
								</GridItem>
							</GridItem>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.UploadedDocuments} onChange={this.handleChange('UploadedDocuments')} value={this.state.UploadedDocuments} />}
									label="Uploaded Documents?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.EmailedToCustomerService} onChange={this.handleChange('EmailedToCustomerService')} value={this.state.EmailedToCustomerService} />}
									label="Emailed to Customer Service?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.BussinessCardAttached} onChange={this.handleChange('BussinessCardAttached')} value={this.state.BussinessCardAttached} />}
									label="Bussiness Card Attached?"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.TransactionCompletedAndSentToFranchiseAccounting} onChange={this.handleChange('TransactionCompletedAndSentToFranchiseAccounting')} value={this.state.TransactionCompletedAndSentToFranchiseAccounting} />}
									label="Transaction A Completed and Sent to Franchise Accounting?"
									style={{ width: '100%' }}
								/>
							</GridItem>
						</GridContainer>

					</Fragment>
				);
			case 6:
				const { account_offering_step } = this.state

				return (<AccountOfferingPage step={account_offering_step} />)
			case 7:
				return (
					<Fragment>
						<div style={{ marginTop: '30px' }}></div>
						<div className="flex">
							<CustomersDocumentUploadTable tableType="DOCUMENT_UPLOADING" documents={this.props.documents} headers={Upload_Document_headers} />
						</div>
					</Fragment>
				)
			case 8:
				return (<Fragment></Fragment>)
			case 9:
				return (<Fragment></Fragment>)
			case 10:
				return (<FinderFeePage />)
			default:
				return 'Unknown step';
		}
	}

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
		this.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
	};

	constructor(props) {
		super(props);
		if (!props.documents) {
			props.getDocuments();
		}
		this.changeSelection = selection => this.setState({ selection });
		this.changeSorting = sorting => this.setState({ sorting });
		this.changeSearchValue = value => this.setState({ searchValue: value });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.activeStep!==prevProps.activeStep)
			this.setState({activeStep: this.props.activeStep});
	}

	componentWillMount() {
		this.initCustomerInfo()
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
			this.initCustomerInfo(nextProps.activeCustomer.Data)
		}
	}

	initCustomerInfo = (activeCustomerInfo = this.props.activeCustomer.Data) => {
		this.setState({
			SA_Amount: activeCustomerInfo ? activeCustomerInfo.cont_bill : "",
		})
	};

	componentDidMount() {
		// this.getDocuments()
		if (this.InputLabelRef) {
			this.setState({
				labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
			});
		}
	}

	getDocuments = (rawData = this.props.documents) => {
		let all_docs = [];
		if (rawData === null || rawData === undefined) return;
		let documents = rawData.Data.filter(x => x);

		all_docs = [...all_docs, ...rawData.Data]
		this.setState({
			docs: all_docs
		});
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	canBeSubmitted() {
		return true;
	}

	//////////////////////
	totalSteps = () => {
		return getSteps().length;
	};

	handleNext = () => {
		let activeStep;

		if (this.isLastStep() && !this.allStepsCompleted()) {
			// It's the last step, but not all steps have been completed
			// find the first step that has been completed
			const steps = getSteps();
			activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
		}
		else {
			activeStep = this.state.activeStep + 1;
		}
		this.setState({
			activeStep
		});
	};

	handleReset = () => {
		this.setState({
			activeStep: 0,
			completed: new Set(),
			skipped: new Set()
		});
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

	isLastStep() {
		return this.state.activeStep === this.totalSteps() - 1;
	}

	handleTab = (event, activeStep) => {
		this.setState({ activeStep });
		this.props.updateCustomersParameter('activeStep', activeStep);
	};
	//////////////////////
	render() {
		const { classes} = this.props;
		const steps = getSteps();
		const { activeStep} = this.state;



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
						{steps.map((x) =>
							(<Tab key={x} label={x} />)
						)}
					</Tabs>
				</AppBar>


				<div
					className={classNames(classes.layoutTable, "p-24 w-full h-full")}
					style={{
						overflowY: 'scroll',
						width: '100%',
						// height: 'calc(100% - 110px)'
						height: 'calc(100% - 50px)'
						// flex: '1 1 auto'
					}}
				>

					<h2>{activeStep===1 ? 'Franchisee Revenue Distribution' : steps[activeStep]}</h2>

					<Divider variant="middle" style={{ marginTop: 12, marginBottom: 12 }} />

					{this.getStepContent(activeStep)}
				</div>

			</Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getFranchisees: Actions.getFranchisees,
		openNewCustomerForm: Actions.openNewCustomerForm,
		closeNewCustomerForm: Actions.closeNewCustomerForm,
		openEditCustomerForm: Actions.openEditCustomerForm,
		closeEditCustomerForm: Actions.closeEditCustomerForm,
		getDocuments: Actions.getDocuments,
        updateCustomersParameter: Actions.updateCustomersParameter,
	}, dispatch);
}

function mapStateToProps({ customers, franchisees, auth }) {
	return {
		customers: customers.customersDB,
		bLoadedFranchisees: franchisees.bLoadedFranchisees,
		regionId: auth.login.defaultRegionId,
		customerForm: customers.customerForm,
		documents: customers.customersDocuments,

		statusId: franchisees.statusId,
		Longitude: franchisees.Longitude,
		Latitude: franchisees.Latitude,
		Location: franchisees.Location,
		SearchText: franchisees.SearchText,

		accountExecutiveList: customers.accountExecutiveList,
		activeCustomer: customers.activeCustomer,
        activeStep: customers.activeStep,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerForm)));

