import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
	Paper,
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
	IconButton,
	Icon
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
import CustomerLineTable from "./CustomerLine"

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

import ReactTable from "react-table";
import JanikingPagination from 'Commons/JanikingPagination';

import CustomersDocumentUploadTable from "./documentUploadTable";

import {
	SelectionState,
	PagingState,
	IntegratedPaging,
	IntegratedSelection,
	SortingState,
	IntegratedSorting,
	EditingState,
	GroupingState,
	IntegratedGrouping,
	DataTypeProvider,
	FilteringState,
	IntegratedFiltering,
	SearchState,
} from '@devexpress/dx-react-grid';

import {
	Grid,
	Table,
	TableHeaderRow,
	TableSelection,
	PagingPanel,
	TableEditRow,
	TableEditColumn,
	GroupingPanel,
	Toolbar,
	TableGroupRow,
	TableFilterRow,
	SearchPanel,
	DragDropProvider,
	TableColumnReordering,
	TableColumnResizing,
	ColumnChooser,
	TableColumnVisibility,
	TableFixedColumns,
	VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

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
	return ['Service Agreement', 'Billing', 'Service Settings', "Walk-Thru", "Account Offering", "Documents", "Marketing", "Account History"];
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

const Upload_Document_headers = [
	// {
	// 	id: 'doc_type',
	// 	numeric: false,
	// 	disablePadding: false,
	// 	label: 'Doc Type'
	// },
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
	// {
	// 	id: 'fileSize',
	// 	numeric: false,
	// 	disablePadding: false,
	// 	label: 'File Size'
	// },
	// {
	// 	id: 'view',
	// 	numeric: false,
	// 	disablePadding: false,
	// 	label: 'View'
	// }
];

const account_offering_columns = [
	{
		title: "No.",
		name: "Number",
		columnName: "Number",
	},
	{
		title: "Franchisees Name",
		name: "Name",
		columnName: "Name",
	},
	{
		title: "Address",
		name: "Address",
		columnName: "Address",
	},
	{
		title: "Phone",
		name: "Phone",
		columnName: "Phone",
	},
	{
		title: "Status",
		name: "StatusName",
		columnName: "StatusName",
	},
];


//
// table row edit command buttons
//
const AddButton = ({ onExecute }) => (
	<div style={{ textAlign: 'center' }}>
		<Button
			color="primary"
			onClick={onExecute}
			title="Create new row"
		>
			New
	  </Button>
	</div>
);

const EditButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Edit row">
		<EditIcon />
	</IconButton>
);

const DeleteButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Delete row">
		<DeleteIcon />
	</IconButton>
);

const CommitButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Save changes">
		<SaveIcon />
	</IconButton>
);

const CancelButton = ({ onExecute }) => (
	<IconButton color="secondary" onClick={onExecute} title="Cancel changes">
		<CancelIcon />
	</IconButton>
);

const commandComponents = {
	add: AddButton,
	edit: EditButton,
	delete: DeleteButton,
	commit: CommitButton,
	cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
	const CommandButton = commandComponents[id];
	return (
		<CommandButton
			onExecute={onExecute}
		/>
	);
};
const GridRootComponent = props => <Grid.Root {...props} style={{ height: '100%' }} />;
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
		const { classes,
			// CustomerForm,
			// addCustomer,
			// updateCustomer,
			// removeCustomer
		} = this.props;
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

		let execTitles = []
		if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
			execTitles = this.props.accountExecutiveList.Data.filter(x => {
				if (x.Title === null) return false
				return true
			}).map(x => {
				return x.FirstName + " " + x.LastName
			}).sort();
		}

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

		switch (step + 1) {
			case 1:
				// return 'Step 2: What is an ad group anyways?';
				return (
					<Fragment>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
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
									value={this.state.Description}
									onChange={this.handleChange('Description')}
									margin="normal"
									variant="outlined"
									style={{ width: '100%' }}
								/>
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
									value={this.state.ContractType === undefined ? 0 : this.state.ContractType}
									onChange={this.handleChange('ContractType')}
									margin="normal"
									variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								>
									{[{ value: 0, label: "Recurring" }
										, { value: 1, label: "One-Time" }
										, { value: 2, label: "Variable" }].map(option => (
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
									value={this.state.AgreementType === undefined ? 1 : this.state.AgreementType}
									onChange={this.handleChange('AgreementType')}
									margin="normal"
									variant="outlined"
									// style={{ minWidth: "100px", width: "30%" }}
									style={{ marginRight: "2%" }}
									fullWidth
								>
									{[{ value: 0, label: "Customer" }
										, { value: 1, label: "Jani-King" }
										, { value: 2, label: "General" }
									].map(option => (
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
									value={this.state.AcctExec === undefined ? 0 : this.state.AcctExec}
									onChange={this.handleChange('AcctExec')}
									margin="normal"
									variant="outlined"
									style={{ marginLeft: "2%" }}
									fullWidth
								>
									{
										execTitles.map((x, index) => {
											return (<MenuItem key={index} value={index}>{x}</MenuItem>)
										})
									}
								</TextField>
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
									value={this.state.SignDate}
									onChange={this.handleChange('SignDate')}
									margin="normal"
									variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								/>

							</GridItem>




							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="date"
									id="StartDate"
									label="Start Date *"
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.StartDate}
									onChange={this.handleChange('StartDate')}
									margin="normal"
									variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								/>

								<TextField
									type="number"
									id="TermMonths"
									label="Term Months *"
									className={classNames(classes.textField,"ml-12")}
									value={this.state.TermMonths}
									onChange={this.handleChange('TermMonths')}
									margin="normal"
									variant="outlined"
									style={{ width: '70%'}}
								/>


							</GridItem>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">


								<TextField
									type="date"
									id="ExpirationDate"
									label="Expiration Date *"
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.ExpirationDate}
									onChange={this.handleChange('ExpirationDate')}
									margin="normal"
									variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								/>
							</GridItem>



						</GridContainer>


					</Fragment>
				);
			case 2:
				return (
					<Fragment>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
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
									margin="normal"
									variant="outlined"
									style={{ minWidth: 100, width: "30%" }}

								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="PONumer"
									type="number"
									label="PO Numer"
									className={classes.textField}
									value={this.state.PONumer}
									onChange={this.handleChange('PONumer')}
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
									className={classNames(classes.textField, "mr-12")}
									select
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.InvoiceDate === undefined ? "" : this.state.InvoiceDate}
									onChange={this.handleChange('InvoiceDate')}
									margin="normal"
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
									className={classNames(classes.textField, "ml-12")}
									value={this.state.BillingFrequency === undefined ? "" : this.state.BillingFrequency}
									onChange={this.handleChange('BillingFrequency')}
									margin="normal"
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
									className={classNames(classes.textField, "mr-12")}
									value={this.state.Term === undefined ? "" : this.state.Term}
									onChange={this.handleChange('Term')}
									margin="normal"
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
									className={classNames(classes.textField, "ml-12")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.ARStatus === undefined ? "" : this.state.ARStatus}
									onChange={this.handleChange('ARStatus')}
									margin="normal"
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
									rowsMax="4"
									className={classes.textField}
									value={this.state.Notes}
									onChange={this.handleChange('Notes')}
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
									value={this.state.ServiceType === undefined ? "" : this.state.ServiceType}
									onChange={this.handleChange('ServiceType')}
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
									value={this.state.SquareFootage}
									onChange={this.handleChange('SquareFootage')}
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
									value={this.state.StartTime}
									onChange={this.handleChange('StartTime')}
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
									value={this.state.EndTime}
									onChange={this.handleChange('EndTime')}
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
									value={this.state.Amount}
									onChange={this.handleChange('Amount')}
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
									value={this.state.CleanTimes}
									onChange={this.handleChange('CleanTimes')}
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
									value={this.state.CleanFrequency === undefined ? "" : this.state.CleanFrequency}
									onChange={this.handleChange('CleanFrequency')}
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
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Mon"
									style={{ marginRight: "30px" }}

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Tue"
									style={{ marginRight: "30px" }}

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Wed"
									style={{ marginRight: "30px" }}

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Thu"
									style={{ marginRight: "30px" }}

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Fri"
									style={{ marginRight: "30px" }}

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Sat"
									style={{ marginRight: "30px" }}

								/>
								<FormControlLabel
									control={
										<Checkbox onChange={this.handleChange('weekdays')} />
									}
									label="Sun"

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
									rowsMax="4"
									className={classes.textField}
									value={this.state.Description}
									onChange={this.handleChange('Description')}
									margin="normal"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
						</GridContainer>

					</Fragment>
				);
			case 4:
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
									value={this.state.Date}
									onChange={this.handleChange('Date')}
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
									value={this.state.WalkThroughDate}
									onChange={this.handleChange('WalkThroughDate')}
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
									value={this.state.StartDate}
									onChange={this.handleChange('StartDate')}
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
									value={this.state.FranchiseName}
									onChange={this.handleChange('FranchiseName')}
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
									value={this.state.EmergencyNamesAndTelephoneNumbers1}
									onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers1')}
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
									value={this.state.EmergencyNamesAndTelephoneNumbers2}
									onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers2')}
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
									value={this.state.ProblemConnernsAreasNeedingImprovment}
									onChange={this.handleChange('ProblemConnernsAreasNeedingImprovment')}
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
										margin="normal"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureOPS"
										label="OPS"
										className={classes.textField}
										value={this.state.SignatureOPS}
										onChange={this.handleChange('SignatureOPS')}
										margin="normal"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureRD"
										label="R.D."
										className={classes.textField}
										value={this.state.SignatureRD}
										onChange={this.handleChange('SignatureRD')}
										margin="normal"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureFO"
										label="F.O."
										className={classes.textField}
										value={this.state.SignatureFO}
										onChange={this.handleChange('SignatureFO')}
										margin="normal"
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
							{/* <GridItem>
								<img className="mr-12" alt="" src="assets/images/customers/walk-through.jpg" style={{ width: '100%', height: 'auto' }} />
							</GridItem> */}



						</GridContainer>

					</Fragment>
				);
			case 5:
				const {
					searchValue,
					pageSizes,
					sorting,
					selection,
				} = this.state;

				let rows = this.props.franchisees.Data.Region.filter(x => x.Id == this.props.regionId)[0].FranchiseeList
				console.log("this.props.franchisees.Data", rows, account_offering_columns)
				// account offering
				return (
					<Paper
						className={classNames(classes.layoutTable, "flex flex-col h-full")}
					>
						<Grid
							rows={rows}
							columns={account_offering_columns}
							rootComponent={GridRootComponent}
						>
							<SelectionState
								selection={selection}
								onSelectionChange={this.changeSelection}
							/>
							<PagingState
								defaultCurrentPage={0}
								defaultPageSize={10}
							/>
							<PagingPanel pageSizes={pageSizes} />
							<SelectionState
								selection={selection}
								onSelectionChange={this.changeSelection}
							/>
							<IntegratedSelection />

							<IntegratedPaging />
							<Table />
							{/* <VirtualTable
								height="auto"
							/> */}
							<SortingState
								sorting={sorting}
								onSortingChange={this.changeSorting}
								columnExtensions={account_offering_columns}
							/>
							<IntegratedSorting />

							<SearchState
								value={searchValue}
								onValueChange={this.changeSearchValue}
							/>

							<TableHeaderRow showSortingControls />
							<TableSelection showSelectAll selectByRowClick highlightRow />

							<Toolbar />
							<SearchPanel />
							{/* 
								


								
								<EditingState
									columnExtensions={[]}
									onCommitChanges={this.commitChanges}
								/>
								<TableColumnResizing defaultColumnWidths={account_offering_columns} />
								<TableHeaderRow showSortingControls />
								
								<TableEditRow />
								<TableEditColumn
									showAddCommand
									showEditCommand
									showDeleteCommand
									commandComponent={Command}
								/> */}
						</Grid>
						<div
							className={classNames(classes.layoutTable, "flex flex-row")}
							style={{ justifyContent: "space-between" }}
						>
							<span className={"p-6"}>
								Rows Selected: <strong>{selection.length}</strong>
							</span>

							<span className={"p-6"}>
								Total Rows: <strong>{rows.length}</strong>
							</span>
						</div>
					</Paper>
				)
			case 6:
				return (
					<Fragment>
						<div style={{ marginTop: '30px' }}></div>
						<div className="flex">
							<CustomersDocumentUploadTable tableType="DOCUMENT_UPLOADING" documents={this.props.documents} headers={Upload_Document_headers} />
						</div>
					</Fragment>
				)
			case 7:
				return (<Fragment></Fragment>)
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
		//this.props.this.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
		this.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
	};
	sendOffer = () => {

	}
	// constructor(props) {
	// 	super(props);
	// }
	constructor(props) {
		super(props);

		if (!props.bLoadedFranchisees) {
			props.getFranchisees();
		}
		if (!props.documents) {
			props.getDocuments();
		}
		this.fetchData = this.fetchData.bind(this);
		this.escFunction = this.escFunction.bind(this);

		if (!props.bLoadedFranchisees) {
			props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		}

		this.changeSelection = selection => this.setState({ selection });
		this.changeSorting = sorting => this.setState({ sorting });
		this.changeSearchValue = value => this.setState({ searchValue: value });
	}
	fetchData(state, instance) {
		this.setState({
			pageSize: state.pageSize,
			page: state.page,
		});
	}
	escFunction(event) {
		if (event.keyCode === 27) {
			this.setState({ s: '' });
			this.getFranchiseesFromStatus();
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
	}

	componentWillMount() {
		this.getFranchiseesFromStatus();
	}

	componentWillReceiveProps(nextProps) {
		console.log("this.props.franchisees")
		console.log(this.props.franchisees)
		if (this.props.franchisees === null && nextProps.franchisees !== null)
			this.getFranchiseesFromStatus(nextProps.franchisees);
		if (this.props.franchisees !== nextProps.franchisees)
			this.getFranchiseesFromStatus(nextProps.franchisees);
	}


	getFranchiseesFromStatus = (rawData = this.props.franchisees) => {
		let data = [];
		let tempData = [];
		if (rawData === null) return;

		if (rawData.Data.Region.length === 0) {
			data = [];
			this.setState({ temp: data });
			this.setState({ data: data });
			return;
		} else {
			for (let i = 0; i < rawData.Data.Region.length; i++) {
				tempData = rawData.Data.Region[i].FranchiseeList;
				data = data.concat(tempData);
			}
		}
		this.setState({ temp: data });
		this.setState({ data: data });
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
		console.log("DOCUMENTS" + "" + rawData)
		let all_docs = [];
		if (rawData === null || rawData === undefined) return;
		let documents = rawData.Data.filter(x => x);

		all_docs = [...all_docs, ...rawData.Data]
		this.setState({
			docs: all_docs
		});
	};

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
		console.log(this.props)
		const { classes,
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
		console.log('customers', this.props.customers);
		console.log("this.props.franchisees", this.props.franchisees);
		console.log("this.props.documents", this.props.documents);

		// const {classes} = this.props;
		const steps = getSteps();
		const { activeStep,
		} = this.state;



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
					className={classNames(classes.layoutTable, "p-24")}
					style={{
						overflowY: 'scroll',
						width: '100%',
						// height: 'calc(100% - 190px)'
						height: 'calc(100% - 110px)'
						// flex: '1 1 auto'
					}}
				>

					{activeStep === 4 ?
						(<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h2>{steps[activeStep]}</h2>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								onClick={() => {
									this.sendOffer();
								}}
							> Send Offer </Button>
						</div>) :
						(<h2>{steps[activeStep]}</h2>)}


					<Divider variant="middle" style={{ marginTop: 24, marginBottom: 24 }} />

					<div>
						{this.getStepContent(activeStep)}
					</div>
				</div>


				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					{activeStep === 4 ? (<div></div>) : (<div style={{ display: 'flex' }}>
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
					</div>)}

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
		getDocuments: Actions.getDocuments
	}, dispatch);
}

function mapStateToProps({ customers, franchisees, auth }) {
	return {
		bLoadedFranchisees: franchisees.bLoadedFranchisees,
		regionId: auth.login.defaultRegionId,
		CustomerForm: customers.CustomerForm,
		documents: customers.customersDocuments,

		statusId: franchisees.statusId,
		Longitude: franchisees.Longitude,
		Latitude: franchisees.Latitude,
		Location: franchisees.Location,
		SearchText: franchisees.SearchText,

		accountExecutiveList: customers.accountExecutiveList,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerForm)));

