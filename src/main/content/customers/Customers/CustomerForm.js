import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
	Paper, TextField, Button, Typography,
	MenuItem, FormControl, InputLabel, Select, OutlinedInput,
	Card, CardHeader, CardContent, Divider, Radio, RadioGroup, FormControlLabel, GridList
} from '@material-ui/core';


// theme components
import { FusePageCustom, FuseAnimate, FuseSearch } from '@fuse';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import CustomerLineTable from "./CustomerLine"

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";



import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({

	root: {
		width: '90%'
	},
	button: {
		marginRight: theme.spacing.unit
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
});

const newCustomerState = {
	"MasterTrxTypeListId": "",
	"RegionId": "",
	"RegionName": "",
	"CustomerId": "",
	"CustomerNo": "",
	"CustomerDate": "",
	"DueDate": "",
	"CustomerId": "",
	"CustomerNo": "",
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
	return ['Customer Information', 'Contract', 'Service Settings'];
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
	const { classes, CustomerForm, addCustomer, updateCustomer, removeCustomer } = customerForm.props;
	const { value, suggestions } = customerForm.state;

	const autosuggestProps = {
		renderInputComponent,
		suggestions: suggestions,
		onSuggestionsFetchRequested: customerForm.onSuggestionsFetchRequested,
		onSuggestionsClearRequested: customerForm.onSuggestionsClearRequested,
		getSuggestionValue: customerForm.getSuggestionValue,
		renderSuggestion,
	};

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
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Name"
								label="Name *"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Name')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>

						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="Address *"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Address')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="City *"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('City')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="outlined-name"
								label="State *"
								select
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('State')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Zip')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="Phone *"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Phone')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="outlined-name"
								label="Fax"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Fax')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="Email"
								type="email"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Email')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="outlined-name"
								label="Website"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Website')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>
					</GridContainer>

					<Divider variant="middle" />
					<div style={{ marginTop: '30px' }}></div>
					<h3>Addresses</h3>
					<div className="flex">
						<CustomerLineTable tableType="ADDRESS" headers={address_headers} />
					</div>

					<Divider variant="middle" />
					<div style={{ marginTop: '30px' }}></div>
					<h3>Contacts</h3>
					<div className="flex">
						<CustomerLineTable tableType="BILLING_SETTING" headers={billing_headers} />
					</div>

					<div style={{ marginTop: '30px' }}></div>
					<h3>Billing Settings</h3>

					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="date"
								id="outlined-name"
								label="Effective Date"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('EffectiveDate')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="Invoice Date"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('InvoiceDate')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="Term"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Term')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="ARStatus"
								label="AR Status"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('ARStatus')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Notes"
								label="Notes"
								multiline
								rowsMax="4"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Notes')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
					</GridContainer>

				</Fragment>
			);
		case 1:
			// return 'Step 2: What is an ad group anyways?';
			return (
				<Fragment>
					<FormLabel component="legend">Service Location</FormLabel>
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>

						<GridItem xs={12} sm={8} md={8} className="flex flex-row">
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('gilad')} />
								}
								label="Same as Main Address"
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Address"
								label="Address *"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Address')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="Address2"
								label="Address2"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Address2')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="outlined-name"
								label="City *"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('City')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginRight: '2%' }}
							/>
							<TextField
								id="outlined-name"
								label="State *"
								select
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('State')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Zip')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginLeft: '2%' }}
							/>
						</GridItem>



						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="AccountType"
								label="Account Type *"
								select
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('AccountType')}
								margin="normal"
								// variant="outlined"
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
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('ContractType')}
								margin="normal"
								// variant="outlined"
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
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('AgreementType')}
								margin="normal"
								// variant="outlined"
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
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('AcctExec')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('PONumer')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('SignDate')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('StartDate')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%', marginLeft: "2%" }}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="number"
								id="TermMonths"
								label="Term Months *"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('TermMonths')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('ExpiratinDate')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Amount')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Description')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>

					</GridContainer>


				</Fragment>
			);
		case 2:
			// return 'Step 3: This is the bit I really care about!';
			return (
				<Fragment>
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="ServiceType"
								label="Service Type *"
								select
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('ServiceType')}
								margin="normal"
								// variant="outlined"
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
								id="BillingFrequency"
								label="Billing Frequency"
								select
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('BillingFrequency')}
								margin="normal"
								// variant="outlined"
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
							<TextField
								id="SquareFootage"
								label="Square Footage"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('SquareFootage')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('StartTime')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('EndTime')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Amount')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('CleanTimes')}
								margin="normal"
								// variant="outlined"
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
								value={customerForm.state.name}
								onChange={customerForm.handleChange('CleanFrequency')}
								margin="normal"
								// variant="outlined"
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
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Mon"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Tue"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Wed"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Thu"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Fri"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Sat"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Sun"
								fullWidth
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="CPI Increase"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
							<FormControlLabel
								control={
									<Checkbox onChange={customerForm.handleChange('weekdays')} />
								}
								label="Separate Invoice"
								style={{ marginRight: "30px" }}
								fullWidth
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Description"
								label="Description"
								multiline
								rowsMax="4"
								className={classes.textField}
								value={customerForm.state.name}
								onChange={customerForm.handleChange('Description')}
								margin="normal"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
						</GridItem>
					</GridContainer>

				</Fragment>
			);
		default:
			return 'Unknown step';
	}
}


class CustomerForm extends Component {
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
		this.setState({ selectedCustomer: suggestion });
		return suggestion.CustomerName;
	};

	getSuggestions = (value) => {
		const escapedValue = escapeRegexCharacters(value.trim());
		const regex = new RegExp(escapedValue, 'i');

		return this.props.customers.filter(customer => regex.test(customer.CustomerName));
	};

	closeComposeForm = () => {
		this.props.customerForm.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
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
	//////////////////////
	render() {
		const { classes, CustomerForm, addCustomer, updateCustomer, removeCustomer } = this.props;
		const { value, suggestions } = this.state;

		const autosuggestProps = {
			renderInputComponent,
			suggestions: suggestions,
			onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.onSuggestionsClearRequested,
			getSuggestionValue: this.getSuggestionValue,
			renderSuggestion,
		};
		console.log('customers', this.props.customers);

		// const {classes} = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;


		return (
			// <div className={classNames(classes.layoutTable, "h-full")}></div>
			// <FuseAnimate animation="transition.slideRightIn" delay={300} className={classNames(classes.layoutTable, "h-full")}>
			// <div className="p-24 h-full">
			<Fragment>
				<Stepper nonLinear activeStep={activeStep}>
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
				</Stepper>

				<div
					className={classNames(classes.layoutTable, "p-24")}
					style={{
						overflowY: 'scroll',
						width: '100%',
						height: 'calc(100% - 140px)'
						// flex: '1 1 auto'
					}}>


					<h2>{getSteps()[activeStep]}</h2>
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


				<div>
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
									</div>

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
		openEditCustomerForm: Actions.openEditCustomerForm,
		closeEditCustomerForm: Actions.closeEditCustomerForm,
	}, dispatch);
}

function mapStateToProps({ customers, }) {
	return {
		CustomerForm: customers.CustomerForm
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerForm)));

