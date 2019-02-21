import React, { Fragment } from 'react';
import _ from "lodash";
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Tooltip, Slide, RadioGroup, Radio, FormControlLabel, Paper, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem, Divider, ListItem, List, ListItemText, ListItemLink, Checkbox, Switch } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import classNames from 'classnames';

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
import { Getter } from '@devexpress/dx-react-core';
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

import NewIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import ReactDataGrid from "react-data-grid";
import IncreaseDecreaseContractModal from './IncreaseDecreaseContractModal'
import IncreaseDecreaseContractPage from './IncreaseDecreaseContractPage'

import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import CancelContractPage from './CancelContractPage';
import SuspendContractPage from './SuspendContractPage';


import Autosuggest from "react-autosuggest"
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import FuseUtils from '@fuse/FuseUtils';
import { NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'

const styles = theme => ({
	root: {
		'& .react-grid-Cell': {
			background: '#565656',
			color: 'white',
		},
		'& .react-grid-HeaderCell': {
			background: '#424242',
			color: 'white',
		},
		'& .react-grid-Row:hover .react-grid-Cell': {
			background: ' #3d6d8a',
		},
		'& .react-grid-Canvas, .react-grid-Grid': {
			background: '#7b7b7b',
		}
	},
	button: {
		margin: theme.spacing.unit,
	},
	descriptionText: {
		fontSize: 13
	},


	suggestionsContainerOpen: {
		// position: 'absolute',
		// zIndex: 10,
		// marginTop: theme.spacing.unit,
		// left: 0,
		// right: 0,
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
	container: {
		position: 'relative',
		width: '100%'
	},
	input: {
		padding: '12px 14px'
	},
	label: {
		transform: 'translate(14px, 14px) scale(1)'
	},
})
const stateNames = [
	{ Value: "AL", Text: "Alabama" },
	{ Value: "AK", Text: "Alaska" },
	{ Value: "AZ", Text: "Arizona" },
	{ Value: "AR", Text: "Arkansas" },
	{ Value: "CA", Text: "California" },
	{ Value: "CO", Text: "Colorado" },
	{ Value: "CT", Text: "Connecticut" },
	{ Value: "DE", Text: "Delaware" },
	{ Value: "FL", Text: "Florida" },
	{ Value: "GA", Text: "Georgia" },
	{ Value: "HI", Text: "Hawaii" },
	{ Value: "ID", Text: "Idaho" },
	{ Value: "IL", Text: "Illinois" },
	{ Value: "IN", Text: "Indiana" },
	{ Value: "IA", Text: "Iowa" },
	{ Value: "KS", Text: "Kansas" },
	{ Value: "KY", Text: "Kentucky" },
	{ Value: "LA", Text: "Louisiana" },
	{ Value: "ME", Text: "Maine" },
	{ Value: "MD", Text: "Maryland" },
	{ Value: "MA", Text: "Massachusetts" },
	{ Value: "MI", Text: "Michigan" },
	{ Value: "MN", Text: "Minnesota" },
	{ Value: "MS", Text: "Mississippi" },
	{ Value: "MO", Text: "Missouri" },
	{ Value: "MT", Text: "Montana" },
	{ Value: "NE", Text: "Nebraska" },
	{ Value: "NV", Text: "Nevada" },
	{ Value: "NH", Text: "New Hampshire" },
	{ Value: "NJ", Text: "New Jersey" },
	{ Value: "NM", Text: "New Mexico" },
	{ Value: "NY", Text: "New York" },
	{ Value: "NC", Text: "North Carolina" },
	{ Value: "ND", Text: "North Dakota" },
	{ Value: "OH", Text: "Ohio" },
	{ Value: "OK", Text: "Oklahoma" },
	{ Value: "OR", Text: "Oregon" },
	{ Value: "PA", Text: "Pennsylvania" },
	{ Value: "RI", Text: "Rhode Island" },
	{ Value: "SC", Text: "South Carolina" },
	{ Value: "SD", Text: "South Dakota" },
	{ Value: "TN", Text: "Tennessee" },
	{ Value: "TX", Text: "Texas" },
	{ Value: "UT", Text: "Utah" },
	{ Value: "VT", Text: "Vermont" },
	{ Value: "VA", Text: "Virginia" },
	{ Value: "WA", Text: "Washington" },
	{ Value: "DC", Text: "Washington D.C." },
	{ Value: "WV", Text: "West Virginia" },
	{ Value: "WI", Text: "Wisconsin" },
	{ Value: "WY", Text: "Wyoming" }
];
function Transition(props) {
	return <Slide direction="up" {...props} />;
}
//
// table row edit command buttons
//
const AddButton = ({ onExecute }) => (
	<div style={{ textAlign: 'center' }}>
		{/* <Button
			color="primary"
			onClick={onExecute}
			title="New Address"
		>
			New
	  </Button> */}
		<IconButton onClick={onExecute} title="Add New">
			<NewIcon />
		</IconButton>
	</div>
);

const EditButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Edit">
		<EditIcon />
	</IconButton>
);

const DeleteButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Delete">
		<DeleteIcon />
	</IconButton>
);

const CommitButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Save">
		<SaveIcon />
	</IconButton>
);

const CancelButton = ({ onExecute }) => (
	<IconButton color="secondary" onClick={onExecute} title="Cancel">
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
const editing_cell_styles = theme => ({
	cell: {
		// background: "#989898",
		// color: "white",
		padding: 0,
	}
});
const EditingHeaderCellComponentBase = props => {
	return (<TableEditColumn.Cell {...props}

	/>);
};

const EditingHeaderCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
	EditingHeaderCellComponentBase
);

const EditingCellComponentBase = props => {
	return (<TableEditColumn.Cell {...props}>
		{/* {React.Children.toArray(props.children)
			.filter((child) => {
				if (child.props.id === 'delete') {
					// if (props.tableRow.row.id < 2) {
					// return true;
					// }
					return false;
				}
				return true;
			})} */}
	</TableEditColumn.Cell>)
};

//
// header cell style
//
const header_cell_styles = theme => ({
	cell: {
		background: "#989898",
		color: "white",
	}
});
const tableHeaderCellComponentBase = props => {
	return (<TableHeaderRow.Cell {...props}

	/>);
};
const tableHeaderCellComponent = withStyles(header_cell_styles)(
	tableHeaderCellComponentBase
);


const EditingCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
	EditingCellComponentBase
);
const getRowId = row => row.id;

const CurrencyFormatter = ({ value }) => (<span>$ {parseFloat(`0${value}`).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$2/$3/$1');

const BlueDialogTitle = withStyles(theme => ({
	root: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		backgroundColor: "#3c93ec",
		margin: 0,
		padding: theme.spacing.unit * 2,
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing.unit,
		top: theme.spacing.unit,
		color: "white",
	},
}))(props => {
	const { children, classes, onClose } = props;
	return (
		<DialogTitle disableTypography className={classes.root}>
			{children}
			{onClose ? (
				<IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
					<Icon>close</Icon>
				</IconButton>
			) : null}
		</DialogTitle>
	);
});

class ServiceAgreementPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			// bOpenPaymentDialog: props.bOpenPaymentDialog,
			columns: [
				// {
				//     title: "Payment ID",
				//     name: "PaymentId",
				//     columnName: "PaymentId",
				//     width: 200,
				//     sortingEnabled: true,
				//     filteringEnabled: true,
				//     groupingEnabled: false,
				// },
				// {
				// 	title: "C.Name",
				// 	name: "CustomerNameNo",
				// 	columnName: "CustomerNameNo",
				// 	width: 150,
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },
				// {
				// 	title: "C.Name",
				// 	name: "CustomerName",
				// 	columnName: "CustomerName",
				// 	width: 120,
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },

				// {
				// 	title: "C.Number",
				// 	name: "CustomerNo",
				// 	columnName: "CustomerNo",
				// 	width: 120,
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },
				// {
				// 	title: "Check No",
				// 	name: "CheckNo",
				// 	columnName: 'CheckNo',
				// 	width: 180,
				// 	align: 'center',
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,
				// },
				{
					title: "Invoice No",
					name: "InvoiceNo",
					columnName: "InvoiceNo",
					width: 200,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Invoice Date",
					name: "InvoiceDate",
					columnName: "InvoiceDate",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Due Date",
					name: "DueDate",
					columnName: "DueDate",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Invoice Amount",
					name: "InvoiceAmount",
					columnName: "InvoiceAmount",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Invoice Balance",
					name: "InvoiceBalance",
					columnName: "InvoiceBalance",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				// {
				// 	title: "InvoiceBalance OR",
				// 	name: "InvoiceBalanceOR",
				// 	columnName: 'InvoiceBalanceOR',
				// 	width: 150,
				// 	align: 'center',
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,
				// },
				{
					title: "Amount to Apply",
					name: "PaymentAmount",
					columnName: 'PaymentAmount',
					width: 300,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: true,

				},
				// {
				//     title: "Region Name",
				//     name: "RegionName",
				//     columnName: 'RegionName',
				//     width: 120,
				//     align: 'right',
				//     wordWrapEnabled: true,
				//     sortingEnabled: true,
				//     filteringEnabled: true,
				//     groupingEnabled: false,

				// },
				// {
				// 	title: "Check Amount",
				// 	name: "CheckAmount",
				// 	columnName: 'CheckAmount',
				// 	width: 140,
				// 	align: 'right',
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,

				// }
			],
			columnsForReactDataGrid: [
				{ key: "InvoiceNo", name: "Invoice No", editable: false },
				{ key: "InvoiceDate", name: "Invoice Date", editable: false, formatter: DateFormatter },
				{ key: "DueDate", name: "Due Date", editable: false, formatter: DateFormatter },
				{ key: "DaysPastDue", name: "Days Past Due", editable: false, sortDescendingFirst: true },
				{ key: "InvoiceAmount", name: "Invoice Amount", editable: false, formatter: CurrencyFormatter },
				{ key: "InvoiceBalance", name: "Invoice Balance", editable: false, formatter: CurrencyFormatter },
				{ key: "PaymentAmount", name: "Payment to Apply", editable: true, formatter: CurrencyFormatter }
			],
			rows: [],
			currencyColumns: [
				'InvoiceAmount', 'InvoiceBalance', 'PaymentAmount'
			],
			customerName: "",
			customerNumber: "",

			PaymentType: "Check",
			ReferenceNo: "",
			PaymentDate: new Date().toISOString().substr(0, 10),
			PaymentNote: "",
			PaymentAmount: 0,
			overpayment: 0,
			errorMsg: "",

			paymentDlgPayloads: {
				open: false,
				paymentType: "Check",
				paymentAmount: 0
			},
			step: 0,
			franchiseeServiceTypes: [],
			franchiseeBillingTypes: [],

			EffectiveDate: new Date().toISOString().substr(0, 10),

			execTitles: [],
			note: '',
			SignDate: moment().format('YYYY-MM-DD'),
			StartDate: moment().format('YYYY-MM-DD'),
			ExpirationDate: moment().format('YYYY-MM-DD'),


			addressColumns: [
				{
					title: "Company Name",
					name: "CompanyName",
					columnName: "CompanyName",
					width: 50,
				},
				{
					title: "Address 1",
					name: "Address1",
					columnName: "Address1",
					width: 80,
				},
				{
					title: "Address 2",
					name: "Address2",
					columnName: "Address2",
					width: 80,
				},
				{
					title: "City",
					name: "City",
					columnName: "City",
					width: 80,
				},
				{
					title: "State",
					name: "State",
					columnName: "State",
					width: 50,
				},
				{
					title: "Zip / Postal",
					name: "ZipPostal",
					columnName: "ZipPostal",
					width: 80,
				},
			],
			addressRows: [{
				CompanyName: "",
				Address1: "",
				Address2: "",
				City: "",
				State: "",
				ZipPostal: "",
			}],

			contactsColumns: [
				{
					title: "First",
					name: "First",
					columnName: "First",
					width: 80,
				},
				{
					title: "Last",
					name: "Last",
					columnName: "Last",
					width: 80,
				},
				{
					title: "Office Phone",
					name: "OfficePhone",
					columnName: "OfficePhone",
					width: 80,
				},
				{
					title: "Mobile Phone",
					name: "MobilePhone",
					columnName: "MobilePhone",
					width: 80,
				},
				{
					title: "Email",
					name: "Email",
					columnName: "Email",
					width: 80,
				},
			],
			contactsRows: [{
				First: "Sample First",
				Last: "Sample Last",
				OfficePhone: "Sample OfficePhone",
				MobilePhone: "Sample MobilePhone",
				Email: "Sample Email",
			}],
			childCustomerName: "",
			suggestions: [],
		};
		// this.commitChanges = this.commitChanges.bind(this);
		this.props.getLogCallCustomerServiceTypes()

		this.props.getFranchiseeServiceTypes(this.props.regionId)
		this.props.getFranchiseeBillingTypes(this.props.regionId)
	}

	commitChangesAddresses = ({ added, changed, deleted }) => {
		let rows = this.state.addressRows;
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
		this.setState({ addressRows: rows });
	}
	commitChangesContacts = ({ added, changed, deleted }) => {
		let rows = this.state.contactsRows;
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
		this.setState({ contactsRows: rows });
	}
	componentWillMount() {
		console.log("componentWillMount")

		let execTitles = []
		if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
			execTitles = this.props.accountExecutiveList.Data.sort();
		}

		this.setState({
			customerServiceTypes: this.props.lists.customerServiceTypes,
			franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
			franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
			execTitles: execTitles,
			cont_bill: this.props.activeCustomer.Data.cont_bill,
		})

		this.initCustomerInfo()

	}
	componentDidMount() {
		// if (this.props.bOpenPaymentDialog === true) {
		// 	this.checkValidations()
		// }
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		// if (nextProps.payments !== this.props.payments) {
		// 	console.log("componentWillReceiveProps payments")
		// 	this.setRowData(nextProps.payments)
		// }
		if (nextProps.customers !== this.props.customers) {
			this.setState({
				customers: FuseUtils.getCustomerListFromDb(nextProps.customers),
			});
		}
		// if (!_.isEqual(nextProps.activePaymentRows, this.props.activePaymentRows)) {
		// 	console.log("componentWillReceiveProps activePaymentRows", nextProps.activePaymentRows, this.props.activePaymentRows)
		// 	this.setRowData(this.props.payments, nextProps.activePaymentRows)
		// }
		// if (!_.isEqual(nextProps.paymentDlgPayloads, this.props.paymentDlgPayloads)) {
		// 	this.setState({
		// 		paymentDlgPayloads: nextProps.paymentDlgPayloads,
		// 		PaymentAmount: nextProps.paymentDlgPayloads.paymentAmount,
		// 		PaymentType: nextProps.paymentDlgPayloads.paymentType
		// 	})

		// 	// if (nextProps.bOpenPaymentDialog === true) {
		// 	// 	this.checkValidations()
		// 	// }
		// }
		if (nextProps.regionId !== this.props.regionId) {
			this.props.getFranchiseeServiceTypes(nextProps.regionId)
			this.props.getFranchiseeBillingTypes(nextProps.regionId)
		}
		if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
			this.initCustomerInfo(nextProps.activeCustomer)
		}
	}
	initCustomerInfo = (activeCustomerInfo = this.props.activeCustomer) => {
		if (activeCustomerInfo && activeCustomerInfo.Data) {
			this.setState({
				SA_Amount: activeCustomerInfo.Data.cont_bill,
				franchieesesToOffer: activeCustomerInfo.Data.AssignedFranchisees,
			})
		}
	}

	handleStep = () => {
		this.setState({
			step: this.state.step === 0 ? 1 : 0
		})

	}
	IncreaseDecreaseContract = () => {
		this.props.showIncreaseDecreaseContractModalForm(true)
	}

	showCancelContractPage = () => {
		this.props.showCancelContractPage(true)
	}
	showSuspendContractPage = () => {
		this.props.showSuspendContractPage(true)
	}

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
			errorMsg: ""
		});
		if (name === 'length' && event.target.value === 1) {
			this.setState({ TermMonths: 0 });
		}
	};

	//
	// customer name suggestion
	//
	escapeRegexCharacters(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	getSuggestions(value) {
		const escapedValue = this.escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return [];
		}

		const regex = new RegExp('^' + escapedValue, 'i');
		const { customers } = this.state
		if (customers == undefined) return [];
		return customers.filter(x => regex.test(x.CustomerName));
	}

	getSuggestionValue(suggestion) {
		return suggestion.CustomerName;
	}
	renderSuggestion(suggestion, { query, isHighlighted }) {
		const matches = AutosuggestHighlightMatch(suggestion.CustomerName, query);
		const parts = AutosuggestHighlightParse(suggestion.CustomerName, matches);

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
	onChange = (event, { newValue, method }) => {
		this.setState({
			childCustomerName: newValue
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
	renderInputComponent = (inputProps) => {
		const { classes, inputRef = () => { }, ref, ...other } = inputProps;

		return (
			<TextField
				fullWidth
				// variant="outlined"
				label="Customer Name"
				InputProps={{
					inputRef: node => {
						ref(node);
						inputRef(node);
					},
					classes: {
						input: classes.input,
					},
				}}
				InputLabelProps={{
					classes: { outlined: classes.label }
				}}
				required
				{...other}
				autoFocus={true}
			/>
		);
	};
	handleChangeCustomerInfoProps = name => event => {
		const value = event.target.value
		this.setState({ [name]: value })
		this.props.updateNewCustomerParam(name, value)
	}
	handleChangeCustomerInfoPropsChecked = name => event => {
		const checked = event.target.checked
		this.setState({ [name]: checked })
		this.props.updateNewCustomerParam(name, checked)
	}
	render() {
		const { classes, customerForm } = this.props;
		const { execTitles,
			addressRows,
			addressColumns,
			contactsRows,
			contactsColumns,
		} = this.state;

		const { childCustomerName, suggestions } = this.state;
		const inputProps = {
			classes,
			placeholder: 'Type a customer name...',
			value: childCustomerName,
			onChange: this.onChange
		};

		return (
			<Fragment>
				{!this.props.increaseDecreaseContractModalForm.open && !this.props.cancelContractPage.open && !this.props.suspendContractPage.open &&
					<>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row justify-between items-center">
								<TextField
									type="number"
									id="cont_bill"
									label="Monthly Contract Amount"
									required
									className={classes.textField}
									InputLabelProps={{ shrink: true }}
									value={this.state.cont_bill || ''}
									onChange={this.handleChangeCustomerInfoProps('cont_bill')}
									margin="dense"
									// variant="outlined"
									style={{ width: 250 }}

									InputProps={{
										readOnly: false,
										startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
										// inputComponent: NumberFormatCustomNoPrefix,
										classes: {
											input: classNames('text-right')
										}
									}}
								/>
								{customerForm.props.open && customerForm.type === "edit" &&
									<div>
										<Button
											variant="contained"
											color="primary"
											className={classNames(classes.button, "pr-24 pl-24 mr-12")}
											onClick={this.IncreaseDecreaseContract}
										>Increase/Decrease<Icon>keyboard_arrow_right</Icon>
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={this.showCancelContractPage}
											className={classNames(classes.button, "pr-24 pl-24")}
										>Cancel Contract
                                </Button>
										<Button
											variant="contained"
											color="primary"
											onClick={this.showSuspendContractPage}
											className={classNames(classes.button, "pr-24 pl-24")}
										>Suspend Account
                                </Button>
									</div>}
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="Frequency"
									label="Frequency"
									required
									select
									InputLabelProps={{
										shrink: true
									}}
									className={classNames(classes.textField, "mr-6")}
									value={this.state.contract_lenght || ''}
									onChange={this.handleChangeCustomerInfoProps('contract_lenght')}
									margin="dense"
									// variant="outlined"
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

								<TextField
									type="number"
									inputProps={{ min: "0", max: "99", step: "1" }}
									id="TermMonths"
									label="Term Months"
									required
									InputLabelProps={{
										shrink: true
									}}
									className={classNames(classes.textField, "ml-6")}
									value={this.state.TermMonths}
									onChange={this.handleChange('TermMonths')}
									margin="dense"
									// variant="outlined"
									style={{ width: '10%', minWidth: '110px' }}
									disabled={this.state.length === 1}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								{/* <TextField
									id="AgreementType"
									label="Agreement Type *"
									select
									InputLabelProps={{
										shrink: true
									}}
									className={classNames(classes.textField, "mr-6")}
									value={this.state.AgreementType === undefined ? 1 : this.state.AgreementType}
									onChange={this.handleChange('AgreementType')}
									margin="dense"
									// variant="outlined"
									style={{ width: '30%', minWidth: 200 }}
								>
									{[{ value: 0, label: "Customer" }
										, { value: 1, label: "Jani-King" }
										, { value: 2, label: "General" }
									].map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField> */}

								<TextField
									id="AcctExec"
									label="Acct Exec"
									select
									InputLabelProps={{
										shrink: true
									}}
									className={classNames(classes.textField, "")}
									value={this.state.slsmn_no || ''}
									onChange={this.handleChangeCustomerInfoProps('slsmn_no')}
									margin="dense"
									// variant="outlined"
									style={{ width: '30%', minWidth: 200 }}
								>
									{
										execTitles.map((x, index) => {
											return (<MenuItem key={index} value={x.UserId}>{x.FullName}</MenuItem>)
										})
									}
								</TextField>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="date"
									id="SignDate"
									label="Sign Date *"
									className={classNames(classes.textField, "mr-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.date_sign || ''}
									onChange={this.handleChangeCustomerInfoProps('date_sign')}
									margin="dense"
									// variant="outlined"
									style={{ width: "20%", minWidth: "180px" }}
								/>
								<TextField
									type="date"
									id="StartDate"
									label="Start Date *"
									className={classNames(classes.textField, "mr-6 ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.date_start || ''}
									onChange={this.handleChangeCustomerInfoProps('date_start')}
									margin="dense"
									// variant="outlined"
									style={{ width: "20%", minWidth: "180px" }}
								/>

								<TextField
									type="date"
									id="ExpirationDate"
									label="Expiration Date *"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.exp_date || ''}
									onChange={this.handleChangeCustomerInfoProps('exp_date')}
									margin="dense"
									// variant="outlined"
									style={{ width: "20%", minWidth: "180px" }}
								/>
							</GridItem>
							{/* <GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="note"
									label="Note"
									multiline
									rows="2"
									rowsMax="2"
									className={classes.textField}
									value={this.state.note}
									onChange={this.handleChange('note')}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem> */}
						</GridContainer>

						<Typography variant="h6" className="mt-24 mb-12">Billing</Typography>

						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>

							<GridItem xs={12} sm={12} md={12} className="flex flex-col">
								<h3 className="mt-24 mb-12">Billing Address</h3>
								{/* <Paper>
									<Grid
										rows={addressRows}
										columns={addressColumns}
										getRowId={getRowId}
									>
										<EditingState
											onCommitChanges={this.commitChangesAddresses}
										/>
										<Table />
										<TableHeaderRow />
										<TableEditRow />
										<TableEditColumn
											width={110}
											cellComponent={EditingCellComponent}
											headerCellComponent={EditingHeaderCellComponent}
											showAddCommand
											showEditCommand
											showDeleteCommand
											commandComponent={Command}
										/>
									</Grid>
								</Paper> */}
								<div className='flex w-full'>
									<TextField
										id="bill_name"
										label="Name"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.bill_name || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_name')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="bill_addr"
										label="Address"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.bill_addr || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_addr')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="bill_addr2"
										label="Address2"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.bill_addr2 || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_addr2')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="bill_city"
										label="City"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.bill_city || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_city')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="bill_state"
										select
										label="State"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.bill_state || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_state')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '7%' }} >
										{stateNames.map((option, index) => (
											<MenuItem key={index} value={option.Value}>
												{option.Value}
											</MenuItem>
										))}
									</TextField>
									<TextField
										id="bill_zip"
										label="Zip/Postal"
										className={classes.textField}
										value={this.state.bill_zip || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_zip')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '13%' }} />
								</div>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row justify-between">
								<div className="flex flex-col">
									{/* <TextField
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
										// variant="outlined"
										style={{ width: "20%", minWidth: "180px" }}
									/> */}

									<TextField
										id="PONumer"
										type="number"
										label="PO Numer"
										className={classes.textField}
										value={this.state.po_1 || ''}
										onChange={this.handleChangeCustomerInfoProps('po_1')}
										InputLabelProps={{ shrink: true }}
										margin="dense"
										// variant="outlined"
										style={{ width: "20%", minWidth: "180px" }}
									/>
								</div>
								<div className="flex flex-col justify-between">
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('cpiadj')} checked={this.state.cpiadj || false} />
										}
										label="CPI Increase"
										style={{ marginRight: "30px" }}

									/>
								</div>
								<div className="flex flex-col justify-between">
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('crteinv')} checked={this.state.crteinv || false} />
										}
										label="Create Invoice"
										className="mr-36"
									/>
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('prntpd')} checked={this.state.prntpd || false} />
										}
										label="Print Past Due"
										className="mr-36"
									/>
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('tax_exempt')} checked={this.state.tax_exempt || false} />
										}
										label="Tax Exempt"
										className="mr-36"
									/>
									<RadioGroup
										aria-label="Location"
										name="Location"
										className={classes.group}
										value={this.state.InvoiceType}
									>
										<FormControlLabel
											control={
												<Radio onChange={this.handleChange('InvoiceType')} />
											}
											label="Consolidated Invoice"
											value="Consolidated Invoice"
										/>
										<FormControlLabel
											control={
												<Radio onChange={this.handleChange('InvoiceType')} />
											}
											label="Separate Invoice"
											value="Separate Invoice"
										/>
									</RadioGroup>
								</div>

							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="InvoiceDate"
									label="Invoice Date"
									className={classNames(classes.textField, "mr-6")}
									select
									InputLabelProps={{ shrink: true }}
									value={this.state.invoice_date_default || 'BOM'}
									onChange={this.handleChangeCustomerInfoProps('invoice_date_default')}
									margin="dense"
									// variant="outlined"
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
									// variant="outlined"
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
												checked={this.state.ebill || false}
												onChange={this.handleChangeCustomerInfoPropsChecked('ebill')}
												value="ebill"
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
										value={this.state.ebill_email || ''}
										onChange={this.handleChangeCustomerInfoProps('ebill_email')}
										InputLabelProps={{ shrink: true }}
										margin="dense"
										// variant="outlined"
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
									value={this.state.billing_term || ''}
									onChange={this.handleChangeCustomerInfoProps('billing_term')}
									margin="dense"
									// variant="outlined"
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

								{this.props.customerForm.type === "edit" &&
									<TextField
										id="ARStatus"
										label="AR Status"
										select
										className={classNames(classes.textField, "ml-6")}
										InputLabelProps={{ shrink: true }}
										value={this.state.ARStatus || 'Normal'}
										onChange={this.handleChange('ARStatus')}
										margin="dense"
										// variant="outlined"
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
									</TextField>}

							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="Notes"
									label="Notes"
									multiline
									rows="2"
									rowsMax="2"
									className={classes.textField}
									value={this.state.inv_msg || ''}
									onChange={this.handleChangeCustomerInfoProps('inv_msg')}
									InputLabelProps={{ shrink: true }}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-col">
								<div className="flex justify-around">
									<FormControlLabel
										control={
											<Checkbox
												checked={this.state.natacct || false}
												onChange={this.handleChangeCustomerInfoPropsChecked('natacct')}
												value="natacct"
											/>
										}
										label="National Account"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={this.state.parent || false}
												onChange={this.handleChangeCustomerInfoPropsChecked('parent')}
												value="parent"
											/>
										}
										label="Child Account"
									/>
								</div>

								{this.state.ChildAccount && (
									<div className="flex flex-col">
										<Autosuggest
											className={classNames(classes.textfield)}
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
											renderInputComponent={this.renderInputComponent}

											suggestions={suggestions}
											onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
											onSuggestionsClearRequested={this.onSuggestionsClearRequested}
											getSuggestionValue={this.getSuggestionValue}
											renderSuggestion={this.renderSuggestion}
											inputProps={inputProps}
											fullWidth
										/>

										<TextField
											id="StoreNumber"
											label="Store Number"
											className={classes.textField}
											onChange={this.handleChange('StoreNumber')}
											margin="dense"
											// variant="outlined"
											fullWidth />
									</div>
								)}


							</GridItem>

							{/* <GridItem xs={12} sm={12} md={12} className="flex flex-col">
								<h3 className="mt-24 mb-12">Contacts</h3> */}
							{/* <Paper>
									<Grid
										rows={contactsRows}
										columns={contactsColumns}
										getRowId={getRowId}
									>
										<EditingState
											onCommitChanges={this.commitChangesContacts}
										/>
										<Table />
										<TableHeaderRow />
										<TableEditRow />
										<TableEditColumn
											width={110}
											cellComponent={EditingCellComponent}
											headerCellComponent={EditingHeaderCellComponent}
											showAddCommand
											showEditCommand
											showDeleteCommand
											commandComponent={Command}
										/>
									</Grid>
								</Paper> */}

							{/* <div className='flex w-full'>
									<TextField
										id="First"
										label="First"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.First || ''}
										onChange={this.handleChangeCustomerInfoProps('First')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="Last"
										label="Last"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.Last || ''}
										onChange={this.handleChangeCustomerInfoProps('Last')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="OfficePhone"
										label="Office Phone"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.OfficePhone || ''}
										onChange={this.handleChangeCustomerInfoProps('OfficePhone')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="MobilePhone"
										label="Mobile Phone"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.MobilePhone || ''}
										onChange={this.handleChangeCustomerInfoProps('MobilePhone')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
									<TextField
										id="Email"
										label="Email"
										className={classes.textField}
										value={this.state.Email || ''}
										onChange={this.handleChangeCustomerInfoProps('Email')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />
								</div> */}

							{/* </GridItem> */}

						</GridContainer>

						<Typography variant="h6" className="mt-24 mb-12">Cleaning Schedule</Typography>

						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="ServiceType"
									label="Service Type *"
									select
									InputLabelProps={{ shrink: true }}
									className={classes.textField}
									value={this.state.ServiceType === undefined ? "" : this.state.ServiceType}
									onChange={this.handleChange('ServiceType')}
									margin="dense"
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
									type="number"
									inputProps={{ min: "0", max: "999999", step: "1" }}
									id="SquareFootage"
									label="Square Footage"
									className={classes.textField}
									value={this.state.sqr_ft || ''}
									onChange={this.handleChangeCustomerInfoProps('sqr_ft')}
									InputLabelProps={{ shrink: true }}
									margin="dense"
									// variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								/>

							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="time"
									id="StartTime"
									label="Start Time *"
									className={classNames(classes.textField, "mr-6")}
									InputLabelProps={{ shrink: true }}
									value={this.state.StartTime}
									onChange={this.handleChange('StartTime')}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									type="time"
									id="EndTime"
									label="End Time *"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{ shrink: true }}
									value={this.state.EndTime}
									onChange={this.handleChange('EndTime')}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>

							{/* <GridItem xs={12} sm={12} md={12} className="flex flex-row">
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
									// variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>
									}}
								/>
							</GridItem> */}

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="number"
									id="CleanTimes"
									label="Clean Times *"
									className={classNames(classes.textField, "mr-6")}
									value={this.state.cleantimes || ''}
									onChange={this.handleChangeCustomerInfoProps('cleantimes')}
									InputLabelProps={{ shrink: true }}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>

								<TextField
									select

									id="CleanFrequency"
									label="Clean Frequency *"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{ shrink: true }}
									value={this.state.cleanper || ''}
									onChange={this.handleChangeCustomerInfoProps('cleanper')}
									margin="dense"
									// variant="outlined"
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
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('mon')} checked={this.state.mon || false} />}
									label="Mon"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('tue')} checked={this.state.tue || false} />}
									label="Tue"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('wed')} checked={this.state.wed || false} />}
									label="Wed"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('thu')} checked={this.state.thu || false} />}
									label="Thu"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('fri')} checked={this.state.fri || false} />}
									label="Fri"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('sat')} checked={this.state.sat || false} />}
									label="Sat"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('sun')} checked={this.state.sun || false} />}
									label="Sun"
									className="mr-36"
								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('wknd')} checked={this.state.wknd || false} />}
									label="Weekends"
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="DetailedCleaningInstructions"
									label="Detailed Cleaning Instructions"
									multiline
									rows="3"
									rowsMax="3"
									className={classes.textField}
									value={this.state.DetailedCleaningInstructions}
									onChange={this.handleChange('DetailedCleaningInstructions')}
									InputLabelProps={{ shrink: true }}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
						</GridContainer>
					</>
				}
				{/* <IncreaseDecreaseContractModal /> */}
				{this.props.increaseDecreaseContractModalForm.open &&
					<IncreaseDecreaseContractPage />
				}
				{this.props.cancelContractPage.open &&
					<CancelContractPage />
				}
				{this.props.suspendContractPage.open &&
					<SuspendContractPage />
				}
			</Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openPaymentDialog: Actions.openPaymentDialog,
		createAccountReceivablePayment: Actions.createAccountReceivablePayment,

		getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
		getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
		showIncreaseDecreaseContractModalForm: Actions.showIncreaseDecreaseContractModalForm,
		showCancelContractPage: Actions.showCancelContractPage,
		showSuspendContractPage: Actions.showSuspendContractPage,

		updateNewCustomerParam: Actions.updateNewCustomerParam,
	}, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth }) {
	return {
		regionId: auth.login.defaultRegionId,
		// bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		// activePaymentRows: accountReceivablePayments.activePaymentRows,

		// payments: accountReceivablePayments.ACC_payments,

		// filterParam: accountReceivablePayments.filterParam,
		// searchText: accountReceivablePayments.searchText,

		// paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

		increaseDecreaseContractModalForm: customers.increaseDecreaseContractModalForm,
		cancelContractPage: customers.cancelContractPage,
		suspendContractPage: customers.suspendContractPage,

		lists: customers.lists,
		franchieesesToOffer: customers.franchieesesToOffer,
		activeCustomer: customers.activeCustomer,
		customerForm: customers.customerForm,
		accountExecutiveList: customers.accountExecutiveList,

		customers: customers.customersDB,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceAgreementPage)));
