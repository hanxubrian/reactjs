import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
	// Paper,
	TextField,
	Button,
	Typography,
	MenuItem,
	// FormControl,
	// InputLabel,
	// Select,
	// OutlinedInput,
	// Card,
	// CardHeader,
	// CardContent,
	Divider,
	// Radio,
	// RadioGroup,
	FormControlLabel,
	// GridList
} from '@material-ui/core';


// theme components
import {
	// FusePageCustom,
	FuseAnimate,
	// FuseSearch
} from '@fuse';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import FindersFeeLineTable from "./FindersFeeLine"

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
// import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
// import match from "autosuggest-highlight/match";
// import parse from "autosuggest-highlight/parse";



// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepButton from '@material-ui/core/StepButton';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Switch from '@material-ui/core/Switch';


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
});

const newFindersFeeState = {
	"MasterTrxTypeListId": "",
	"RegionId": "",
	"RegionName": "",
	"FindersFeeId": "",
	"FindersFeeNo": "",
	"FindersFeeDate": "",
	"DueDate": "",
	// "FindersFeeId": "",
	// "FindersFeeNo": "",
	"FindersFeeName": "",
	"EBill": "",
	"PrintFindersFee": "",
	"FindersFeeDescription": "",
	"FindersFeeAmount": "",
	"FindersFeeTax": "",
	"FindersFeeTotal": "",
	"CPI": "",
	"TransactionStatusListId": "",
	"TransactionStatus": "",
	"FindersFeeBalanceAmount": "",
	"FindersFeeBalanceTax": "",
	"FindersFeeBalanceTotal": "",
	"EBillText": "",
	"PrintFindersFeeText": "",
	"IsOpen": "",
	"ConsolidatedFindersFee": "",
	"ConsolidatedFindersFeeId": "",
	"ConsolidatedFindersFeeNo": "",
	"CreditId": "",
	"Service": ""
};

// function renderInputComponent(inputProps) {
// 	const { classes, inputRef = () => { }, ref, ...other } = inputProps;

// 	return (
// 		<TextField
// 			fullWidth
// 			variant="outlined"
// 			label="Customer For:"
// 			InputProps={{
// 				inputRef: node => {
// 					ref(node);
// 					inputRef(node);
// 				},
// 				classes: {
// 					input: classes.input,
// 				},
// 			}}
// 			{...other}
// 		/>
// 	);
// }

// function renderSuggestion(suggestion, { query, isHighlighted }) {
// 	const matches = match(suggestion.CustomerName, query);
// 	const parts = parse(suggestion.CustomerName, matches);

// 	return (
// 		<MenuItem selected={isHighlighted} component="div">
// 			<div>
// 				{parts.map((part, index) => {
// 					return part.highlight ? (
// 						<span key={String(index)} style={{ fontWeight: 700 }}>
// 							{part.text}
// 						</span>
// 					) : (
// 							<strong key={String(index)} style={{ fontWeight: 300 }}>
// 								{part.text}
// 							</strong>
// 						);
// 				})}
// 			</div>
// 		</MenuItem>
// 	);
// }

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



function getSteps() {
	return ['Contact', 'Billing', 'Service Agreement', 'Service Settings', "Walk-Thru", "Account Offering", "Documents"];
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

function getStepContent(findersFeesForm, step) {
	const { classes,
		// CustomerForm,
		// addCustomer,
		// updateCustomer,
		// removeCustomer
	} = findersFeesForm.props;
	// const {
	// 	value,
	// 	suggestions
	// } = customerForm.state;

	// const autosuggestProps = {
	// 	renderInputComponent,
	// 	suggestions: suggestions,
	// 	onSuggestionsFetchRequested: customerForm.onSuggestionsFetchRequested,
	// 	onSuggestionsClearRequested: customerForm.onSuggestionsClearRequested,
	// 	getSuggestionValue: customerForm.getSuggestionValue,
	// 	renderSuggestion,
	// };

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
			// return 'Step 1: Select campaign settings...';

			return (
				<Fragment>
					<h3>Addresses</h3>
					<div className="flex">
						<FindersFeeLineTable tableType="ADDRESS" headers={address_headers} />
					</div>

					<Divider variant="middle" />
					<div style={{ marginTop: '30px' }}></div>
					<h3>Contacts</h3>
					<div className="flex">
						<FindersFeeLineTable tableType="BILLING_SETTING" headers={billing_headers} />
					</div>

				</Fragment>
			);
		case 1:
			return (
				<Fragment>

					{/* <div style={{ marginTop: '30px' }}></div> */}
					{/* <h3>Billing Settings</h3> */}

					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
						<GridItem xs={12} sm={8} md={8} className="flex flex-row">
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('gilad')} />
								}
								label="Different than Main Address"
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Address"
								label="Address *"
								className={classes.textField}
								value={findersFeesForm.state.Address}
								onChange={findersFeesForm.handleChange('Address')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="Address2"
								label="Address2"
								className={classes.textField}
								value={findersFeesForm.state.Address2}
								onChange={findersFeesForm.handleChange('Address2')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="City *"
								className={classes.textField}
								value={findersFeesForm.state.City}
								onChange={findersFeesForm.handleChange('City')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="outlined-name"
								label="State *"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.State === undefined ? "" : findersFeesForm.state.State}
								onChange={findersFeesForm.handleChange('State')}
								margin="normal"
								variant="outlined"
								SelectProps={{
									MenuProps: {
										className: classes.menu
									}
								}}
								style={{ width: '100%', marginRight: '2%', marginLeft: '2%' }}
							>
								{stateNames.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-name"
								label="Zip *"
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('Zip')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="date"
								id="EffectiveDate"
								label="Effective Date"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.EffectiveDate}
								onChange={findersFeesForm.handleChange('EffectiveDate')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="date"
								id="InvoiceDate"
								label="Invoice Date"
								className={classes.textField}
								select
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.InvoiceDate === undefined ? "" : findersFeesForm.state.InvoiceDate}
								onChange={findersFeesForm.handleChange('InvoiceDate')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
							>
								{[{ value: 0, label: "BOM" },
								{ value: 1, label: "EOM" }].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="BillingFrequency"
								label="Billing Frequency"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.BillingFrequency === undefined ? "" : findersFeesForm.state.BillingFrequency}
								onChange={findersFeesForm.handleChange('BillingFrequency')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
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

								{/* <FormControlLabel
									control={
										<Checkbox onChange={findersFeesForm.handleChange('gilad')} />
									}
									label="E-Billing"
								/> */}

								<FormControlLabel
									control={
										<Switch
											checked={findersFeesForm.state.checkedA}
											onChange={findersFeesForm.handleChange('checkedA')}
											value={findersFeesForm.state.checkedA}
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
									value={findersFeesForm.state.Email}
									onChange={findersFeesForm.handleChange('Email')}
									margin="normal"
									variant="outlined"
									style={{ width: '60%' }}
								/>
							</div>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="Term"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.Term === undefined ? "" : findersFeesForm.state.Term}
								onChange={findersFeesForm.handleChange('Term')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: '5px' }}
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
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.ARStatus === undefined ? "" : findersFeesForm.state.ARStatus}
								onChange={findersFeesForm.handleChange('ARStatus')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: '5px' }}
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
								rowsMax="4"
								className={classes.textField}
								value={findersFeesForm.state.Notes}
								onChange={findersFeesForm.handleChange('Notes')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
					</GridContainer>

				</Fragment>
			);
		case 2:
			// return 'Step 2: What is an ad group anyways?';
			return (
				<Fragment>
					<FormLabel component="legend">Service Location</FormLabel>
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>

						<GridItem xs={12} sm={8} md={8} className="flex flex-row">
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('gilad')} />
								}
								label="Same as Main Address"
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Address"
								label="Address *"
								className={classes.textField}
								value={findersFeesForm.state.Address}
								onChange={findersFeesForm.handleChange('Address')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="Address2"
								label="Address2"
								className={classes.textField}
								value={findersFeesForm.state.Address2}
								onChange={findersFeesForm.handleChange('Address2')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="City *"
								className={classes.textField}
								value={findersFeesForm.state.City}
								onChange={findersFeesForm.handleChange('City')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="outlined-name"
								label="State *"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.State === undefined ? "" : findersFeesForm.state.State}
								onChange={findersFeesForm.handleChange('State')}
								margin="normal"
								variant="outlined"
								SelectProps={{
									MenuProps: {
										className: classes.menu
									}
								}}
								style={{ width: '100%', marginRight: '2%', marginLeft: '2%' }}
							>
								{stateNames.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								id="outlined-name"
								label="Zip *"
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('Zip')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>



						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="AccountType"
								label="Account Type *"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.AccountType === undefined ? "" : findersFeesForm.state.AccountType}
								onChange={findersFeesForm.handleChange('AccountType')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
							>
								{[{ value: 0, label: "Airline" }].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="ContractType"
								label="Contract Type *"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.ContractType === undefined ? "" : findersFeesForm.state.ContractType}
								onChange={findersFeesForm.handleChange('ContractType')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
							>
								{[{ value: 0, label: "Recurring" }].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="AgreementType"
								label="Agreement Type *"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.AgreementType === undefined ? "" : findersFeesForm.state.AgreementType}
								onChange={findersFeesForm.handleChange('AgreementType')}
								margin="normal"
								variant="outlined"
								// style={{ minWidth: "100px", width: "30%" }}
								style={{ marginRight: "2%" }}
								fullWidth
							>
								{[{ value: 0, label: "Jani-King" }].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								id="AcctExec"
								label="Acct Exec"
								select
								InputLabelProps={{
									shrink: true
								}}
								className={classes.textField}
								value={findersFeesForm.state.AcctExec === undefined ? "" : findersFeesForm.state.AcctExec}
								onChange={findersFeesForm.handleChange('AcctExec')}
								margin="normal"
								variant="outlined"
								style={{ marginLeft: "2%" }}
								fullWidth
							>
								{[{ value: 0, label: "Stacey Jarvis" }].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="PONumer"
								type="number"
								label="PO Numer"
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('PONumer')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
							/>

						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="date"
								id="SignDate"
								label="Sign Date *"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('SignDate')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: "2%" }}
							/>
							<TextField
								type="date"
								id="StartDate"
								label="Start Date *"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('StartDate')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: "2%" }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="number"
								id="TermMonths"
								label="Term Months *"
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('TermMonths')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: "2%" }}
							/>

							<TextField
								type="date"
								id="ExpiratinDate"
								label="Expiratin Date *"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('ExpiratinDate')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: "2%" }}
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
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('Amount')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>
								}}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Description"
								label="Description"
								multiline
								rowsMax="4"
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('Description')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>

					</GridContainer>


				</Fragment>
			);
		case 3:
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
								value={findersFeesForm.state.ServiceType === undefined ? "" : findersFeesForm.state.ServiceType}
								onChange={findersFeesForm.handleChange('ServiceType')}
								margin="normal"
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
								id="SquareFootage"
								label="Square Footage"
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('SquareFootage')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: "100px", width: "30%" }}
							/>

						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="time"
								id="StartTime"
								label="Start Time *"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('StartTime')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: "2%" }}
							/>
							<TextField
								type="time"
								id="EndTime"
								label="End Time *"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('EndTime')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: "2%" }}
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
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('Amount')}
								margin="normal"
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
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('CleanTimes')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginRight: "2%" }}
							/>

							<TextField
								select

								id="CleanFrequency"
								label="Clean Frequency *"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.CleanFrequency === undefined ? "" : findersFeesForm.state.CleanFrequency}
								onChange={findersFeesForm.handleChange('CleanFrequency')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%', marginLeft: "2%" }}>
								{[{ value: 0, label: "Monthly" }].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="Mon"
								style={{ marginRight: "30px" }}

							/>
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="Tue"
								style={{ marginRight: "30px" }}

							/>
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="Wed"
								style={{ marginRight: "30px" }}

							/>
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="Thu"
								style={{ marginRight: "30px" }}

							/>
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="Fri"
								style={{ marginRight: "30px" }}

							/>
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="Sat"
								style={{ marginRight: "30px" }}

							/>
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="Sun"

							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
								}
								label="CPI Increase"
								style={{ marginRight: "30px" }}

							/>
							<FormControlLabel
								control={
									<Checkbox onChange={findersFeesForm.handleChange('weekdays')} />
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
								rowsMax="4"
								className={classes.textField}
								value={findersFeesForm.state.name}
								onChange={findersFeesForm.handleChange('Description')}
								margin="normal"
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
								type="date"
								id="Date"
								label="Date"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.Date}
								onChange={findersFeesForm.handleChange('Date')}
								margin="normal"
								variant="outlined"
								fullWidth
								style={{ width: '100%', marginRight: '2%', marginLeft: '0%' }}
							/>
							<TextField
								type="date"
								id="WalkThroughDate"
								label="Walk Through Date"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.WalkThroughDate}
								onChange={findersFeesForm.handleChange('WalkThroughDate')}
								margin="normal"
								variant="outlined"
								fullWidth
								style={{ width: '100%', marginRight: '2%', marginLeft: '2%' }}
							/>
							<TextField
								type="date"
								id="StartDate"
								label="Start Date"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={findersFeesForm.state.StartDate}
								onChange={findersFeesForm.handleChange('StartDate')}
								margin="normal"
								variant="outlined"
								fullWidth
								style={{ width: '100%', marginRight: '0%', marginLeft: '2%' }}
							/>

						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="FranchiseName"
								label="Franchise Name"
								className={classes.textField}
								value={findersFeesForm.state.FranchiseName}
								onChange={findersFeesForm.handleChange('FranchiseName')}
								margin="normal"
								variant="outlined"
								style={{ minWidth: '100px', width: '30%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<h3 style={{ marginTop: 20 }}>Location Checklist</h3>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.LightSwitches} onChange={findersFeesForm.handleChange('LightSwitches')} value={findersFeesForm.state.LightSwitches} />}
								label="Light Switches?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.BreakersPanel} onChange={findersFeesForm.handleChange('BreakersPanel')} value={findersFeesForm.state.BreakersPanel} />}
								label="Breaker's Panel?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.ContactsOffice} onChange={findersFeesForm.handleChange('ContactsOffice')} value={findersFeesForm.state.ContactsOffice} />}
								label="Contact's Office?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.StorageAreas} onChange={findersFeesForm.handleChange('StorageAreas')} value={findersFeesForm.state.StorageAreas} />}
								label="Storage Areas?"
								style={{ width: '100%' }}
							/>

						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.WaterSource} onChange={findersFeesForm.handleChange('WaterSource')} value={findersFeesForm.state.WaterSource} />}
								label="Water Source?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.TrashDisposal} onChange={findersFeesForm.handleChange('TrashDisposal')} value={findersFeesForm.state.TrashDisposal} />}
								label="Trash Disposal?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.Recycling} onChange={findersFeesForm.handleChange('Recycling')} value={findersFeesForm.state.Recycling} />}
								label="Recycling?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.AccountSupplies} onChange={findersFeesForm.handleChange('AccountSupplies')} value={findersFeesForm.state.AccountSupplies} />}
								label="Account Supplies?"
								style={{ width: '100%' }}
							/>

						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<h3 style={{ marginTop: 20 }}>Security Checklist</h3>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.KeyEntry} onChange={findersFeesForm.handleChange('KeyEntry')} value={findersFeesForm.state.KeyEntry} />}
								label="Key? Entry:"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.AlarmSystem} onChange={findersFeesForm.handleChange('AlarmSystem')} value={findersFeesForm.state.AlarmSystem} />}
								label="Alarm System"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.RestroomPaperDispensers} onChange={findersFeesForm.handleChange('RestroomPaperDispensers')} value={findersFeesForm.state.RestroomPaperDispensers} />}
								label="Restroom Paper Dispensers?"
								style={{ width: '100%' }}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="SecurityProcedures"
								label="Security Procedures?"
								className={classes.textField}
								value={findersFeesForm.state.SecurityProcedures}
								onChange={findersFeesForm.handleChange('SecurityProcedures')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="EmergencyNamesAndTelephoneNumbers1"
								label="Emergency Names And Telephone Numbers 1"
								className={classes.textField}
								value={findersFeesForm.state.EmergencyNamesAndTelephoneNumbers1}
								onChange={findersFeesForm.handleChange('EmergencyNamesAndTelephoneNumbers1')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="EmergencyNamesAndTelephoneNumbers2"
								label="Emergency Names And Telephone Numbers 2"
								className={classes.textField}
								value={findersFeesForm.state.EmergencyNamesAndTelephoneNumbers2}
								onChange={findersFeesForm.handleChange('EmergencyNamesAndTelephoneNumbers2')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="ProblemConnernsAreasNeedingImprovment"
								label="Problem, connerns, areas needing improvment and general comments?"
								multiline
								rowsMax="4"
								className={classes.textField}
								value={findersFeesForm.state.ProblemConnernsAreasNeedingImprovment}
								onChange={findersFeesForm.handleChange('ProblemConnernsAreasNeedingImprovment')}
								margin="normal"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>


						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<h3 style={{ marginTop: 20, width: '100%' }}>Paperwork Checklist</h3>
							<h3 style={{ marginTop: 20, width: '100%' }}>Signatures</h3>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<GridItem xs={12} sm={12} md={12} className="flex flex-col" style={{justifyContent:'space-evenly'}}>
								<FormControlLabel
									control={<Switch checked={findersFeesForm.state.SignedMaintenaceAgreement} onChange={findersFeesForm.handleChange('SignedMaintenaceAgreement')} value={findersFeesForm.state.SignedMaintenaceAgreement} />}
									label="1. Signed Maintenace Agreement?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={findersFeesForm.state.SignedPricePage} onChange={findersFeesForm.handleChange('SignedPricePage')} value={findersFeesForm.state.SignedPricePage} />}
									label="2. Signed Price Page?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={findersFeesForm.state.SignedCleaningSchedule} onChange={findersFeesForm.handleChange('SignedCleaningSchedule')} value={findersFeesForm.state.SignedCleaningSchedule} />}
									label="3. Signed Cleaning Schedule?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={findersFeesForm.state.AnalysisOfAccount} onChange={findersFeesForm.handleChange('AnalysisOfAccount')} value={findersFeesForm.state.AnalysisOfAccount} />}
									label="4. Analysis Of Account?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={findersFeesForm.state.AccountBidSheet} onChange={findersFeesForm.handleChange('AccountBidSheet')} value={findersFeesForm.state.AccountBidSheet} />}
									label="5. Account Bid Sheet?"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-col" style={{justifyContent:'space-evenly'}}>
								<TextField
									id="SignatureAE"
									label="A.E."
									className={classes.textField}
									value={findersFeesForm.state.SignatureAE}
									onChange={findersFeesForm.handleChange('SignatureAE')}
									margin="normal"
									variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									id="SignatureOPS"
									label="OPS"
									className={classes.textField}
									value={findersFeesForm.state.SignatureOPS}
									onChange={findersFeesForm.handleChange('SignatureOPS')}
									margin="normal"
									variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									id="SignatureRD"
									label="R.D."
									className={classes.textField}
									value={findersFeesForm.state.SignatureRD}
									onChange={findersFeesForm.handleChange('SignatureRD')}
									margin="normal"
									variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									id="SignatureFO"
									label="F.O."
									className={classes.textField}
									value={findersFeesForm.state.SignatureFO}
									onChange={findersFeesForm.handleChange('SignatureFO')}
									margin="normal"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
						</GridItem>


						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.UploadedDocuments} onChange={findersFeesForm.handleChange('UploadedDocuments')} value={findersFeesForm.state.UploadedDocuments} />}
								label="Uploaded Documents?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.EmailedToFindersFeeService} onChange={findersFeesForm.handleChange('EmailedToFindersFeeService')} value={findersFeesForm.state.EmailedToFindersFeeService} />}
								label="Emailed to FindersFee Service?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.BussinessCardAttached} onChange={findersFeesForm.handleChange('BussinessCardAttached')} value={findersFeesForm.state.BussinessCardAttached} />}
								label="Bussiness Card Attached?"
								style={{ width: '100%' }}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={findersFeesForm.state.TransactionCompletedAndSentToFranchiseAccounting} onChange={findersFeesForm.handleChange('TransactionCompletedAndSentToFranchiseAccounting')} value={findersFeesForm.state.TransactionCompletedAndSentToFranchiseAccounting} />}
								label="Transaction A Completed and Sent to Franchise Accounting?"
								style={{ width: '100%' }}
							/>
						</GridItem>
						{/* <GridItem>
							<img className="mr-12" alt="" src="assets/images/customers/walk-through.jpg" style={{ width: '100%', height: 'auto' }} />
						</GridItem> */}



					</GridContainer>

				</Fragment>
			);
		default:
			return 'Unknown step';
	}
}


class FindersFeeForm extends Component {
	state = {
		findersFees: [],
		...newFindersFeeState,
		value: '',
		suggestions: [],
		selectedFindersFee: null,
		labelWidth: 0,
		selectedWork: "",

		activeStep: 0,
		completed: new Set(),
		skipped: new Set()
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
		this.setState({ selectedFindersFee: suggestion });
		return suggestion.FindersFeeName;
	};

	getSuggestions = (value) => {
		const escapedValue = escapeRegexCharacters(value.trim());
		const regex = new RegExp(escapedValue, 'i');

		return this.props.findersFees.filter(findersFees => regex.test(findersFees.FindersFeeName));
	};

	closeComposeForm = () => {
		//this.props.customerForm.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
		this.type === 'create' ? this.props.closeEditFindersFeeForm() : this.props.closeNewFindersFeeForm();
	};

	// constructor(props) {
	// 	super(props);
	// }

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
		// const { name } = this.state;
		// return (
		// 	name.length > 0
		// );
	}


	//////////////////////
	totalSteps = () => {
		return getSteps().length;
	};

	isStepOptional = step => {
		// return step === 1;
		return false;
	};

	handleSkip = () => {
		const { activeStep } = this.state;
		if (!this.isStepOptional(activeStep)) {
			// You probably want to guard against something like this
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		this.setState(state => {
			const skipped = new Set(state.skipped.values());
			skipped.add(activeStep);
			return {
				activeStep: state.activeStep + 1,
				skipped
			};
		});
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

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleStep = step => () => {
		this.setState({
			activeStep: step
		});
	};

	handleComplete = () => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const completed = new Set(this.state.completed);
		completed.add(this.state.activeStep);
		this.setState({
			completed
		});

		/**
		 * Sigh... it would be much nicer to replace the following if conditional with
		 * `if (!this.allStepsComplete())` however state is not set when we do this,
		 * thus we have to resort to not being very DRY.
		 */
		if (completed.size !== this.totalSteps() - this.skippedSteps()) {
			this.handleNext();
		}
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

	isStepSkipped(step) {
		return this.state.skipped.has(step);
	}

	isStepComplete(step) {
		return this.state.completed.has(step);
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
	};
	//////////////////////
	render() {
		const { classes,
			// CustomerForm,
			// addCustomer,
			// updateCustomer,
			// removeCustomer
		} = this.props;
		// const { value, suggestions } = this.state;

		// const autosuggestProps = {
		// 	renderInputComponent,
		// 	suggestions: suggestions,
		// 	onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
		// 	onSuggestionsClearRequested: this.onSuggestionsClearRequested,
		// 	getSuggestionValue: this.getSuggestionValue,
		// 	renderSuggestion,
		// };
		console.log('findersFees', this.props.findersFees);

		// const {classes} = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;


		return (
			// <div className={classNames(classes.layoutTable, "h-full")}></div>
			// <FuseAnimate animation="transition.slideRightIn" delay={300} className={classNames(classes.layoutTable, "h-full")}>
			// <div className="p-24 h-full">
			<Fragment>
				{/* <Stepper alternativeLabel nonLinear activeStep={activeStep}>
					{steps.map((label, index) => {
						const props = {};
						const buttonProps = {};
						if (this.isStepOptional(index)) {
							buttonProps.optional = <Typography variant="caption">Optional</Typography>;
						}
						if (this.isStepSkipped(index)) {
							props.completed = false;
						}
						return (
							<Step key={label} {...props}>
								<StepButton
									onClick={this.handleStep(index)}
									completed={this.isStepComplete(index)}
									{...buttonProps}
								>
									{label}
								</StepButton>
							</Step>
						);
					})}
				</Stepper> */}



				<AppBar position="static" color="default">
					<Tabs
						value={activeStep}
						onChange={this.handleTab}
						indicatorColor="primary"
						textColor="primary"
						scrollable
						scrollButtons="auto"
					>
						{
							getSteps().map(
								(x) => {
									return (<Tab key={x} label={x} />)
								}
							)
						}
						{/* <Tab label="Customer" />
						 <Tab label="Contract" />
						 <Tab label="Service Settings" />
						 <Tab label="Walk-Thru" />
						 <Tab label="Account Offering" />
						 <Tab label="Documents" disabled /> */}

					</Tabs>
				</AppBar>


				<div
					className={classNames(classes.layoutTable, "p-24")}
					style={{
						overflowY: 'scroll',
						width: '100%',
						// height: 'calc(100% - 190px)'
						height: 'calc(100% - 110px)'
						// flex: '1 1 auto'
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
									{/* <Typography className={classes.instructions}>{getStepContent(this, activeStep)}</Typography> */}
									{getStepContent(this, activeStep)}
									{/* <div>
										<Button
											disabled={activeStep === 0}
											onClick={this.handleBack}
											className={classes.button}
										>Back</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={this.handleNext}
											className={classes.button}
										>Next</Button>
										{this.isStepOptional(activeStep) &&
											!this.state.completed.has(this.state.activeStep) && (
												<Button
													variant="contained"
													color="primary"
													onClick={this.handleSkip}
													className={classes.button}
												>Skip</Button>
											)}
										{activeStep !== steps.length &&
											(this.state.completed.has(this.state.activeStep) ? (
												<Typography variant="caption" className={classes.completed}>
													Step {activeStep + 1} already completed
												</Typography>
											)
												:
												(
													<Button variant="contained" color="primary" onClick={this.handleComplete}>
														{this.completedSteps() === this.totalSteps() - 1 ? 'Done' : 'Save'}
													</Button>
												))}
									</div> */}
								</div>
							)}
					</div>
				</div>


				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex' }}>
						<FuseAnimate animation="transition.expandIn" delay={300} style={{ alignItems: 'justify-start' }}>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								onClick={() => {
									this.closeComposeForm();
								}}
								disabled={!this.canBeSubmitted()}
							> Submit for Approval </Button>
						</FuseAnimate>
					</div>
					<div style={{ display: 'flex' }}>
						<FuseAnimate animation="transition.expandIn" delay={300} style={{ alignItems: 'justify-end' }}>
							<Button
								variant="contained"
								color="primary"
								className={classNames(classes.button, "mr-12")}
								onClick={() => { this.closeComposeForm(); }}
								disabled={!this.canBeSubmitted()}
							> Discard </Button>
						</FuseAnimate>
						<FuseAnimate animation="transition.expandIn" delay={300} style={{ alignItems: 'justify-end' }}>
							<Button
								variant="contained"
								color="primary"
								className={classNames(classes.button, "mr-12")}
								onClick={() => { this.closeComposeForm(); }}
								disabled={!this.canBeSubmitted()}
							> Save </Button>
						</FuseAnimate>
						<FuseAnimate animation="transition.expandIn" delay={300} style={{ alignItems: 'justify-end' }}>
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
				{/* <div>
					<Button
						disabled={activeStep === 0}
						onClick={this.handleBack}
						className={classes.button}
					>Back</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={this.handleNext}
						className={classes.button}
					> Next </Button>
					{this.isStepOptional(activeStep) &&
						!this.state.completed.has(this.state.activeStep) && (
							<Button
								variant="contained"
								color="primary"
								onClick={this.handleSkip}
								className={classes.button}
							> Skip </Button>
						)}
					{activeStep !== steps.length &&
						(this.state.completed.has(this.state.activeStep) ? (
							<Typography variant="caption" className={classes.completed}>
								Step {activeStep + 1} already completed
												</Typography>
						)
							:
							(
								<Button variant="contained" color="primary" onClick={this.handleComplete}>
									{this.completedSteps() === this.totalSteps() - 1 ? ' Done ' : ' Save '}
								</Button>
							))}
				</div> */}

				{/* </FuseAnimate> */}


			</Fragment>
		);
	}
}

// CustomerForm.propTypes = {
// 	classes: PropTypes.object
// };

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openNewFindersFeeForm: Actions.openNewFindersFeeForm,
		closeNewFindersFeeForm: Actions.closeNewFindersFeeForm,
		openEditFindersFeeForm: Actions.openEditFindersFeeForm,
		closeEditFindersFeeForm: Actions.closeEditFindersFeeForm,
	}, dispatch);
}

function mapStateToProps({ findersFees, }) {
	return {
		FindersFeeForm: findersFees.FindersFeeForm
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FindersFeeForm)));

