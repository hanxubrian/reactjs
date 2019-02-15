import React, { Fragment } from 'react';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NumberFormatCustomNoPrefix, NumberFormatCustom2} from '../../../../../../services/utils'

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
import { CustomizedDxGridSelectionPanel } from "./../../../../common/CustomizedDxGridSelectionPanel";

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
	}
})
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
	<IconButton onClick={onExecute} title="Edit Payment Amount">
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
	// add: AddButton,
	edit: EditButton,
	// delete: DeleteButton,
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
		background: "#989898",
		color: "white",
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
		{React.Children.toArray(props.children)
			.filter((child) => {
				if (child.props.id === 'delete') {
					// if (props.tableRow.row.id < 2) {
					// return true;
					// }
					return false;
				}
				return true;
			})}
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

class IncreaseDecreaseContractPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			// bOpenPaymentDialog: props.bOpenPaymentDialog,
			columns: [
				{
					title: "No.",
					name: "Number",
					columnName: "Number",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Franchisees Name",
					name: "Name",
					columnName: "Name",
					width: 220,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Signed",
					name: "Signed",
					columnName: "Signed",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Plan",
					name: "Plan",
					columnName: "Plan",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Accounts",
					name: "Accounts",
					columnName: "Accounts",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Billing",
					name: "Billing",
					columnName: "Billing",
					width: 130,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Cont Eval",
					name: "ContEval",
					columnName: "ContEval",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Group1 Total",
					name: "Group1Total",
					columnName: "Group1Total",
					width: 120,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Compliant",
					name: "Compliant",
					columnName: "Compliant",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Fail Insp",
					name: "FailInsp",
					columnName: "FailInsp",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Cancel",
					name: "Cancel",
					columnName: "Cancel",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Pend Cancel",
					name: "PendCancel",
					columnName: "PendCancel",
					width: 110,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Last Offered",
					name: "LastOffered",
					columnName: "LastOffered",
					width: 110,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Oblg",
					name: "Oblg",
					columnName: "Oblg",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
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
			selection: [],
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
			SA_Amount: '',

		}
		// this.commitChanges = this.commitChanges.bind(this);
		if (!props.bLoadedFranchisees) {
			props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		}

		this.props.getLogCallCustomerServiceTypes()

		this.props.getFranchiseeServiceTypes(this.props.regionId)
		this.props.getFranchiseeBillingTypes(this.props.regionId)
	}

	componentWillMount() {
		console.log("componentWillMount")
		this.props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		this.getFranchiseesFromStatus();

		this.setRowData(this.props.payments)

		this.setState({
			customerServiceTypes: this.props.lists.customerServiceTypes,
			franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
			franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
		})

	}
	componentDidMount() {
		this.initCustomerInfo()

		this.setState({
			paymentDlgPayloads: this.props.paymentDlgPayloads,
			PaymentAmount: this.props.paymentDlgPayloads.paymentAmount,
			PaymentType: this.props.paymentDlgPayloads.paymentType
		})

		// if (this.props.bOpenPaymentDialog === true) {
		// 	this.checkValidations()
		// }
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.payments !== this.props.payments) {
			console.log("componentWillReceiveProps payments")
			this.setRowData(nextProps.payments)
		}
		if (!_.isEqual(nextProps.activePaymentRows, this.props.activePaymentRows)) {
			console.log("componentWillReceiveProps activePaymentRows", nextProps.activePaymentRows, this.props.activePaymentRows)
			this.setRowData(this.props.payments, nextProps.activePaymentRows)
		}
		if (!_.isEqual(nextProps.paymentDlgPayloads, this.props.paymentDlgPayloads)) {
			this.setState({
				paymentDlgPayloads: nextProps.paymentDlgPayloads,
				PaymentAmount: nextProps.paymentDlgPayloads.paymentAmount,
				PaymentType: nextProps.paymentDlgPayloads.paymentType
			})

			// if (nextProps.bOpenPaymentDialog === true) {
			// 	this.checkValidations()
			// }
		}
		if (nextProps.regionId !== this.props.regionId) {
			this.props.getFranchiseeServiceTypes(nextProps.regionId)
			this.props.getFranchiseeBillingTypes(nextProps.regionId)
		}
		if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
			this.initCustomerInfo(nextProps.activeCustomer.Data)
		}
		if (!_.isEqual(this.props.franchisees, nextProps.franchisees)) {
			this.getFranchiseesFromStatus(nextProps.franchisees);
		}
	}
	initCustomerInfo = (activeCustomerInfo = this.props.activeCustomer.Data) => {
		this.setState({
			SA_Amount: activeCustomerInfo.cont_bill,
			franchieesesToOffer: activeCustomerInfo.AssignedFranchisees,
		})
	}

	handleClose = () => {
		// this.setState({
		// 	PaymentType: "Check",
		// 	ReferenceNo: "",
		// 	PaymentDate: new Date().toISOString().substr(0, 10),
		// 	PaymentNote: "",
		// 	PaymentAmount: 0,
		// 	overpayment: 0,
		// 	errorMsg: "",
		// })

		// this.clearDistribute()

		// this.props.openPaymentDialog({
		// 	open: false,
		// 	paymentType: "Check",
		// 	paymentAmount: 0,
		// })

		this.props.showIncreaseDecreaseContractModalForm(false)

	};

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
			errorMsg: ""
		});

		if (name === "PaymentAmount") {
			// this.setState({
			// 	overpayment: this.getOverpaymentAmount(this.state.rows, event.target.value)
			// })
		}
		// this.checkValidations(name, event.target.value)
	};

	commitChanges = ({ added, changed, deleted }) => {
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

	setRowData(payments, activePaymentRows = this.props.activePaymentRows) {
		console.log("----------------------------------------", activePaymentRows, payments)
		// const temp_rows = [
		// 	{ id: 0, InvoiceNo: 1, InvoiceAmount: 1351.51, InvoiceBalance: 216.36, PaymentAmount: 0 },
		// 	{ id: 1, InvoiceNo: 2, InvoiceAmount: 56.30, InvoiceBalance: 548.24, PaymentAmount: 0 },
		// 	{ id: 2, InvoiceNo: 3, InvoiceAmount: 215.28, InvoiceBalance: 1654.36, PaymentAmount: 0 },

		// ];
		// this.setState({ rows: temp_rows })

		if (!payments || payments.Regions === undefined || payments.Regions.length < 1)
			return [];
		let res = [...payments.Regions[0].Payments]

		res.forEach((x, index) => {
			x.CustomerNameNo = `${x.CustomerName} - ${x.CustomerNo}`;
			x.id = index
		})
		res = res.filter(x => {
			return activePaymentRows.indexOf(x.id) > -1
		})
		console.log("setRowData", res);
		if (res.length > 0) {
			this.setState({
				customerName: res[0].CustomerName,
				customerNumber: res[0].CustomerNo,
			})
		}
		this.setState({ rows: res })
	}

	onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		this.setState(state => {
			const rows = state.rows.slice();
			for (let i = fromRow; i <= toRow; i++) {
				rows[i] = { ...rows[i], ...updated };
			}
			//
			// overpayment
			//
			// let totalPaymentAmount = 0, floatPaymentAmount = 0
			// rows.forEach(x => {
			// 	totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
			// })
			// floatPaymentAmount = parseFloat(`0${this.state.PaymentAmount}`)
			// this.checkValidations('', '', rows)

			// this.setState({
			// 	overpayment: this.getOverpaymentAmount(rows)
			// })

			return {
				rows,
				// overpayment: floatPaymentAmount - totalPaymentAmount,
				// errorMsg: this.isNonEmptyPayment(rows) ? (this.state.errorMsg === "Neither of payments amount is settled" ? "" : this.state.errorMsg) : "Neither of payments amount is settled"
			};
		});
	};

	autoDistribute = () => {
		this.setState(state => {
			const { PaymentAmount } = this.state
			let floatPaymentAmount = parseFloat(`0${PaymentAmount}`)

			const rows = state.rows.slice();
			for (let i = 0; i < rows.length; i++) {
				let invBalance = parseFloat(`0${rows[i].InvoiceBalance}`)

				if (invBalance <= floatPaymentAmount) {
					rows[i] = { ...rows[i], PaymentAmount: invBalance };
					floatPaymentAmount = floatPaymentAmount - invBalance
				} else {
					rows[i] = { ...rows[i], PaymentAmount: floatPaymentAmount };
					floatPaymentAmount = 0
				}
			}
			// this.checkValidations('', '', rows)

			return {
				rows: rows,
				overpayment: this.getOverpaymentAmount(rows),
				// overpayment: floatPaymentAmount,
				// errorMsg: this.isNonEmptyPayment(rows) ? (this.state.errorMsg === "Neither of payments amount is settled" ? "" : this.state.errorMsg) : "Neither of payments amount is settled"
			}
		})
	}

	clearDistribute = () => {
		this.setState(state => {
			const rows = state.rows.slice();
			for (let i = 0; i < rows.length; i++) {
				rows[i] = { ...rows[i], PaymentAmount: 0 };
			}
			// this.checkValidations('', '', rows)

			return {
				rows: rows,
				overpayment: 0,
				// overpayment: 0,
				// errorMsg: this.isNonEmptyPayment(rows) ? (this.state.errorMsg === "Neither of payments amount is settled" ? "" : this.state.errorMsg) : "Neither of payments amount is settled"
			}
		})
	}
	isNonEmptyPayment(rows) {
		//
		// check row for payment amount
		//
		let existPositivePayment = false
		let existPaymentsGreaterThanBalance = false

		rows.forEach(x => {
			existPositivePayment = existPositivePayment || 0 < x.PaymentAmount
			existPaymentsGreaterThanBalance = existPaymentsGreaterThanBalance || x.InvoiceBalance < x.PaymentAmount
		})
		if (!existPositivePayment) {
			return "Neither of payments amount is settled"
		}
		if (existPaymentsGreaterThanBalance) {
			return "One or more Payment Amounts is greater than Invoice Balance"
		}
		return ""
	}

	checkLiveValidations(name = "", value = "", rows = this.state.rows, ) {

		if (name === "PaymentType" && !value || name !== "PaymentType" && !this.state.PaymentType) {
			this.setState({ errorMsg: "Payment type not selected" })
		} else if (name === "ReferenceNo" && value <= 0 || name !== "ReferenceNo" && this.state.ReferenceNo <= 0) {
			this.setState({ errorMsg: "ReferenceNo is invalid" })
		} else if (name === "PaymentDate" && !value || name !== "PaymentDate" && !this.state.PaymentDate) {
			this.setState({ errorMsg: "Payment date not selected" })
		} else if (name === "PaymentAmount" && value <= 0) {
			this.setState({ errorMsg: "Amount is invalid" })
		} else {

			let totalPaymentAmount = 0
			let floatPaymentAmount = parseFloat(`0${name === "PaymentAmount" ? value : this.state.PaymentAmount}`)

			this.state.rows.forEach(x => {
				totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
			})
			console.log("floatPaymentAmount", "totalPaymentAmount", floatPaymentAmount, totalPaymentAmount)
			if (floatPaymentAmount < totalPaymentAmount) {
				this.setState({
					errorMsg: "Total payment is greater than payment to apply",
					overpayment: 0,
				})
			} else {
				this.setState({
					overpayment: floatPaymentAmount - totalPaymentAmount
				})
			}

			const isNonEmptyPayment = this.isNonEmptyPayment(rows)
			console.log("isNonEmptyPayment", isNonEmptyPayment)
			if (isNonEmptyPayment) {
				this.setState({ errorMsg: isNonEmptyPayment })
			}
			else {
				this.setState({ errorMsg: "" })
				return true
			}

		}
		return false
	}

	getOverpaymentAmount(rows = this.state.rows, paymentAmount = this.state.PaymentAmount) {
		let totalPaymentAmount = 0
		paymentAmount = parseFloat(`0${paymentAmount}`)
		rows.forEach(x => {
			totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
		})
		return paymentAmount - totalPaymentAmount
	}

	checkValidations(rows = this.state.rows, paymentAmount = this.state.paymentAmount) {
		if (!this.state.PaymentType) {
			this.setState({
				errorMsg: "Payment type not selected",
				overpayment: this.getOverpaymentAmount(rows, paymentAmount),
			})
		} else if (!this.state.ReferenceNo || !this.state.ReferenceNo.toString().trim()) {
			this.setState({
				errorMsg: "ReferenceNo is invalid",
				overpayment: this.getOverpaymentAmount(rows, paymentAmount),
			})
		} else if (!this.state.PaymentDate) {
			this.setState({
				errorMsg: "Payment date not selected",
				overpayment: this.getOverpaymentAmount(rows, paymentAmount),
			})
		} else if (this.state.PaymentAmount <= 0) {
			this.setState({
				errorMsg: "Amount is invalid",
				overpayment: this.getOverpaymentAmount(rows, paymentAmount),
			})

		} else if (!this.checkIfAllZeroPaymentsValidation(rows)) {
			this.setState({ errorMsg: "Neither of payments amount is settled" })
		} else if (!this.checkIfAPaymentGreaterThanBalanceValidation(rows)) {
			this.setState({ errorMsg: "One or more Payment Amounts is greater than Invoice Balance" })
		} else if (!this.checkIfAllPaymentsGreaterThanAmountValidation(rows, paymentAmount)) {
			this.setState({ errorMsg: "Sum of payments is greater than applied one." })
		} else {
			return true
		}
		return false
	}

	checkIfAllZeroPaymentsValidation(rows) {
		let existPositivePayment = false
		rows.forEach(x => {
			existPositivePayment = existPositivePayment || 0 < x.PaymentAmount
		})
		return existPositivePayment
	}

	checkIfAPaymentGreaterThanBalanceValidation(rows) {
		let existPaymentsGreaterThanBalance = false
		rows.forEach(x => {
			existPaymentsGreaterThanBalance = existPaymentsGreaterThanBalance || x.InvoiceBalance < x.PaymentAmount
		})
		return !existPaymentsGreaterThanBalance
	}

	checkIfAllPaymentsGreaterThanAmountValidation(rows, paymentAmount = this.state.PaymentAmount) {
		let totalPaymentAmount = 0
		paymentAmount = parseFloat(`0${paymentAmount}`)
		rows.forEach(x => {
			totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
		})
		return totalPaymentAmount <= paymentAmount
	}


	handleChangeEmailNotesTo = (event, value) => {
		this.setState({ EmailNotesTo: value });
	};

	getFranchiseesFromStatus = (rawData = this.props.franchisees) => {
		let rows = [];

		if (!rawData || !rawData.Data || !rawData.Data.Region) return;

		rawData.Data.Region.forEach((x, index) => {
			rows = [...rows, ...x.Franchisees]
		})
		this.setState({ rows })


		// this.setState({ temp: data });
		// this.setState({ data: data });
	};

	ToolbarRootBase = ({ children, classes, className, ...restProps }) => (
		<Toolbar.Root
			className={classNames(className, classes.franchiseeGridToolbar)}
			style={{ flexDirection: "row-reverse" }}
			{...restProps}

		>
			<Button variant="contained" onClick={this.addFranchiseeToCustomer} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon>add</Icon>Add</Button>

			{children}
		</Toolbar.Root>
	);
	ToolbarRoot = withStyles(styles)(this.ToolbarRootBase);

	addFranchiseeToCustomer = () => {
		const { selection, rows } = this.state
		/*
			AssignedDate: "05/31/2012"
			CreatedById: 0
			FranchiseeNumber: "701011"
			MonthlyBilling: Array(1)
			0:
			BillingFrequency: "R"
			BillingTypeId: "5c41e517d2963319d486a19b"
			BillingTypeServiceId: "5c537995d723510cd898f3e0"
			Description: "MONTHLY CLEANING SERVICE"
			EscrowBilling: true
			MonthlyBilling: 28671.77
			Status: "Active"
			__proto__: Object
			length: 1
			__proto__: Array(0)
			Status: "Active"
		*/
		let selectedFranchisees = selection.map(x => rows[x])
		selectedFranchisees.forEach(x => {

			x.AssignedDate = "05/31/2012"
			x.CreatedById = 0
			x.FranchiseeNumber = x.Number
			x.MonthlyBilling = [{
				BillingFrequency: "R",
				BillingTypeId: "",
				BillingTypeServiceId: "",
				Description: "",
				EscrowBilling: true,
				MonthlyBilling: 0,
				Status: "Active",
			}]
			x.Status = "Active"
		})

		this.setState({
			franchieesesToOffer: [
				...this.state.franchieesesToOffer,
				...selectedFranchisees
			]
		})

	}

	changeSelection = selection => {
		this.setState({ selection });
	}
	handleStep = (step) => {
		this.setState({
			step
		})
	}
	handleStepNewAmountForm = () => {
		this.handleStep(0)
	}

	handleStepFranchiseeDistribution = () => {
		this.handleStep(1)
	}

	handleStepFindersFeesForm = () => {
		this.handleStep(2)
	}

	getNewAmountInputForm() {
		const { classes } = this.props;
		const {
			franchiseeBillingTypes,
			franchiseeServiceTypes
		} = this.state

		const franHeaders = [
			{ width: 12, title: 'Number', field: 'Number' },
			{ width: 22, title: 'Name', field: 'Name' },
			{ width: 15, title: 'Billing', field: '' },
			{ width: 15, title: 'Service', field: '' },
			{ width: 25, title: 'Description', field: '' },
			{ width: 10, title: 'Amount', field: '' },
		]

		return (
			<>
				<div className={classNames("flex mt-12 justify-between")}>

					<TextField margin="dense" id="SA_Amount" label="Current Contract Amount" value={this.state.SA_Amount}
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						style={{ minWidth: 200 }}
						InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                            inputComponent: NumberFormatCustomNoPrefix}}
					/>

					<div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						<Button variant="contained" onClick={this.handleStepFranchiseeDistribution} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Franchisee Distribution<Icon>keyboard_arrow_right</Icon></Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Cancel</Button>
					</div>

				</div>

				<div className={classNames("flex mt-12 justify-start")}>
					<TextField margin="dense" id="NewAmount" label="New Amount"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ readOnly: false,
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                            inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("NewAmount")}
						autoFocus
					/>

					<TextField margin="dense" id="Reason" label="Reason"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pl-6 flex-1")}
						InputProps={{ readOnly: false }}
					/>
                    <TextField
                        type="date"
                        id="EffectiveDate"
                        value={this.state.EffectiveDate}
                        label="Effective Date"
                        className={classNames(classes.textField, 'ml-24')}
                        InputLabelProps={{ shrink: true }}
                        value={this.state.EffectiveDate}
                        onChange={this.handleChange('EffectiveDate')}
                        margin="dense"
                    />
				</div>
			</>
		)
	}

	getFranchiseeAssignmentForm() {
		const { classes } = this.props;

		const {
			franchiseeBillingTypes,
			franchiseeServiceTypes,

			franchieesesToOffer,
			step,
		} = this.state



		const franHeaders = [
			{ width: 7, title: 'Number', field: 'Number' },
			{ width: 16, title: 'Name', field: 'Name' },
			{ width: 5, title: 'Escrow', field: '' },
			{ width: 12, title: 'Billing Frequency', field: '' },
			{ width: 12, title: 'Billing', field: '' },
			{ width: 12, title: 'Service', field: '' },
			{ width: 24, title: 'Description', field: '' },
			{ width: 11, title: 'Amount', field: '' },
		]

		return (
			<>
				<div className={classNames("flex mt-12 justify-between")}>
					<TextField margin="dense" id="Monthly Billing Amount" label="Monthly Billing Amount"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ readOnly: true,
                            startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                            inputComponent: NumberFormatCustomNoPrefix }}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("NewAmount")}
					/>

					<div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						{step === 1 && <Button variant="contained" onClick={this.handleStepNewAmountForm} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon>keyboard_arrow_left</Icon>Prev</Button>}
						<Button variant="contained" color="primary" onClick={this.handleStepFindersFeesForm} className={classNames("pl-24 pr-24 mr-12")}>Finders Fees<Icon>keyboard_arrow_right</Icon></Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Cancel</Button>
					</div>
				</div>

				<Typography className="mb-12 mt-12" variant="subtitle1"><strong>Assigned Franchisees</strong></Typography>
				<div className={classNames("flex flex-col w-full")}>
					<div className={classNames("flex w-full")}>
						{franHeaders.map((f, findex) => (
							<Typography key={findex} style={{ width: f.width + '%' }} variant="caption">{f.title}</Typography>
						))}
					</div>

					<Divider variant="middle" style={{ marginTop: 10, width: '100%', alignSelf: 'center' }} />

					{franchieesesToOffer.map((x, index) => (
						<React.Fragment key={index}>
							{
								x.MonthlyBilling.map((m, mIndex) => (
									<div key={mIndex} className={classNames("flex w-full")} style={{ alignItems: 'bottom' }}>

										<Typography style={{ width: franHeaders[0].width + '%', alignSelf: 'center' }} variant="caption">{x.FranchiseeNumber}</Typography>
										<Typography style={{ width: franHeaders[1].width + '%', alignSelf: 'center' }} variant="caption">{x.Name}</Typography>


										<Checkbox style={{ width: franHeaders[2].width + '%', alignSelf: 'center' }}
											checked={m.EscrowBilling}
										/>

										<TextField style={{ width: franHeaders[3].width + '%' }}
											margin="dense"
											className="pl-6"
											value={m.BillingFrequency}
											select
											InputProps={{
												readOnly: false,
												classes: {
													input: classes.descriptionText,
												},
											}}
										>
											{[
												{ label: 'Variable', value: 'V' },
												{ label: 'Regular', value: 'R' },
											].map((x, index) => (<MenuItem key={index} value={x.value}>{x.label}</MenuItem>))}
										</TextField>

										<TextField style={{ width: franHeaders[4].width + '%' }}
											margin="dense"
											className="pl-6"
											value="Regular Billing"
											select
											InputProps={{
												readOnly: true,
												classes: {
													input: classes.descriptionText,
												},
											}}
										>
											{franchiseeBillingTypes.map((x, index) => (<MenuItem key={index} value={x.Name}>{x.Name}</MenuItem>))}
										</TextField>

										<TextField style={{ width: franHeaders[5].width + '%' }}
											margin="dense"
											className="pl-6"
											value={this.state[`ServiceTypeStates${index}-${mIndex}`] || ''}
											select
											InputProps={{
												readOnly: false,
												classes: {
													input: classes.descriptionText,
												},
											}}
											onChange={this.handleChange(`ServiceTypeStates${index}-${mIndex}`)}
										>
											{franchiseeServiceTypes.map((x, index) => (<MenuItem key={index} value={x.Name}>{x.Name}</MenuItem>))}
										</TextField>

										<TextField style={{ width: franHeaders[6].width + '%' }}
											margin="dense"
											className="pl-6"
											value={m.Description}
											InputProps={{
												classes: {
													input: classes.descriptionText,
												},
											}}
										/>
										{/* <TextField style={{ width: franHeaders[7].width + '%' }}
								type='number'
								InputProps={{ endAdornment: <InputAdornment position="start" className="ml-4">%</InputAdornment> }}
								margin="dense"
								className="pl-6"
							/> */}
										<TextField style={{ width: franHeaders[7].width + '%' }}
											// type='number'
											InputProps={{
												readOnly: false,
												classes: {
													input: classes.descriptionText,
												},
                                                startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                                inputComponent: NumberFormatCustomNoPrefix
											}}
											margin="dense"
											className="pl-6"
											value={this.state[`MonthlyBilling${index}-${mIndex}`] || m.MonthlyBilling}
											onChange={this.handleChange(`MonthlyBilling${index}-${mIndex}`)}
										/>

									</div>
								))
							}
						</React.Fragment>

					))}
				</div>
			</>
		)
	}

	getFranchiseesList() {
		const { classes } = this.props;
		const {
			searchValue,
			pageSizes,
			sorting,
			selection,
			step,

			pins,
			pins2,
			gmapVisible,
			showMapView,
			rows,
			columns,
		} = this.state;
		return (
			<Paper className={classNames("flex flex-col h-full p-6 w-full")} style={{ height: "auto", overflowX: "scroll" }}>
				<div className="w-full h-full">
					{/* grid area */}
					<Grid rows={rows} columns={columns}>
						<SearchState value={searchValue} onValueChange={this.changeSearchValue} />
						<IntegratedFiltering />
						<SelectionState selection={selection} onSelectionChange={this.changeSelection} />
						<PagingState defaultCurrentPage={0} defaultPageSize={10} />
						<PagingPanel pageSizes={pageSizes} />
						<IntegratedSelection />
						<SortingState sorting={sorting} onSortingChange={this.changeSorting} columnExtensions={columns} />
						<IntegratedSorting />
						<IntegratedPaging />
						<EditingState
							// columnExtensions={editingColumnExtensions}
							onCommitChanges={this.commitChanges} />
						<Table />
						{/* <VirtualTable height="auto" /> */}

						<TableColumnResizing defaultColumnWidths={columns} />

						<TableSelection showSelectAll selectByRowClick highlightRow />
						<TableHeaderRow showSortingControls />
						{/* <TableEditRow /> */}

						{/* <TableEditColumn width={60} cellComponent={this.EditingCellComponent} headerCellComponent={EditingHeaderCellComponent}
							// showAddCommand
							// showEditCommand
							// showDeleteCommand
							// commandComponent={Command}
							/> */}

						<Toolbar rootComponent={this.ToolbarRoot} />
						<SearchPanel />
						<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />
					</Grid>

				</div>
			</Paper>

		)
	}

	getFindersFeesForm() {
		const { classes } = this.props
		return (
			<>
				<div className={classNames("flex mt-12 justify-between")}>

					<TextField select margin="dense" id="CalculationMethod" label="Calculation Method"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField)}
						value={this.state.CalculationMethod || ''}
						onChange={this.handleChange('CalculationMethod')}
						style={{ minWidth: 250 }}
						InputProps={{ readOnly: false }}
					>
						{[
							"---",
							"***",
							"+++",
						].map((x, index) => (
							<MenuItem key={index} value={x}>{x}</MenuItem>
						))}
					</TextField>

					<TextField margin="dense" id="CalculationMethodNameDescription" label="Name / Description"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "ml-12")}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("NewAmount")}
						fullWidth
					/>

					<div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						<Button variant="contained" onClick={this.handleStepFranchiseeDistribution} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon>keyboard_arrow_left</Icon>Prev</Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Done</Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Cancel</Button>
					</div>

				</div>

				<div className={classNames("flex mt-12")}>
					<TextField margin="dense" id="MonthlyBillingAmount" label="Monthly Billing Amount"
						InputLabelProps={{ shrink: true }}
						sm={4}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment> }}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("MonthlyBillingAmount")}
					/>
				</div>
				<div className={classNames("flex mt-12")}>
					<TextField margin="dense" id="FindersFeeCreditAmount" label="Finders Fee Credit Amount"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment> }}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("FindersFeeCreditAmount")}
						sm={4}
					/>
				</div>
				<div className={classNames("flex mt-12")}>
					<TextField margin="dense" id="InitialBusinessCredit" label="Initial Business Credit"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment> }}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("InitialBusinessCredit")}
						sm={4}
					/>
				</div>

				<div className={classNames("flex mt-12 justify-between items-center")}>
					<TextField margin="dense" id="MonthlyPayment" label="Monthly Payment"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment> }}
						value={this.state.MonthlyPayment || ''}
						onChange={this.handleChange("MonthlyPayment")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>x</strong></Typography>

					<TextField margin="dense" id="NumberOfPayments" label="# Of Payments"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						value={this.state.NumberOfPayments || ''}
						onChange={this.handleChange("NumberOfPayments")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

					<TextField margin="dense" id="AmountFinanced" label="Amount Financed"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment> }}
						value={this.state.AmountFinanced || ''}
						onChange={this.handleChange("AmountFinanced")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>+</strong></Typography>

					<TextField margin="dense" id="DownPayment" label="DownPayment"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment> }}
						value={this.state.DownPayment || ''}
						onChange={this.handleChange("DownPayment")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

					<TextField margin="dense" id="ResultAmountFinanced" label="Amount Financed"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment> }}
						value={this.state.ResultAmountFinanced || ''}
						onChange={this.handleChange("ResultAmountFinanced")}
						sm={2}
					/>
				</div>

				<div className={classNames("flex mt-12")}>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.DownPaymentPaid}
								onChange={this.handleChange('DownPaymentPaid')}
								value="DownPaymentPaid"
							/>
						}
						label="Down Payment Paid?"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.IncludeDpWith1stPayment}
								onChange={this.handleChange('IncludeDpWith1stPayment')}
								value="IncludeDpWith1stPayment"
							/>
						}
						label="Include DP With 1st Payment?"
					/>
				</div>

				<div className={classNames("flex mt-12 flex-end")}>
					{/* <Button variant="contained" color="primary" className={classNames("pl-24 pr-24 mr-12")}>Multi-Tenant 100% Occuaoncy Input</Button> */}

					<TextField margin="dense" id="MultiTenant100OccuaoncyInput" label="Multi-Tenant 100% Occuaoncy Input"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						value={this.state.MultiTenant100OccuaoncyInput || ''}
						onChange={this.handleChange("MultiTenant100OccuaoncyInput")}
						fullWidth
						style={{ maxWidth: 300 }}
					/>

				</div>
			</>
		)
	}

	render() {
		const { classes } = this.props;
		const { customerServiceTypes, step } = this.state;

		return (
			<>
				{/* {step === 0 && <h2 style={{ display: "flex", alignItems: "center", color: "white" }}><Icon>account_balance</Icon>&nbsp;&nbsp;Increase / Decrease Contract Amount</h2>} */}
				{/* {step === 1 && <h2 style={{ display: "flex", alignItems: "center", color: "white" }}><Icon>account_balance</Icon>&nbsp;&nbsp;Increase / Decrease Contract Amount</h2>} */}

				{/* <Divider variant="middle" style={{ marginTop: 10, marginBottom: 10, width: '50%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto' }} /> */}

				<div className={classNames("flex flex-col")}>
					{step === 0 && this.getNewAmountInputForm()}
					{step === 1 && this.getFranchiseeAssignmentForm()}
					{step === 2 && this.getFindersFeesForm()}
				</div>

				{/* <div className="flex w-full justify-between mb-12">
					<div className="flex w-full" style={{ alignItems: 'center' }}>
						<TextField
							type="date"
							id="EffectiveDate"
							value={this.state.EffectiveDate}
							label="Effective Date"
							className={classNames(classes.textField, 'ml-24')}
							InputLabelProps={{ shrink: true }}
							value={this.state.EffectiveDate}
							onChange={this.handleChange('EffectiveDate')}
							margin="dense"
						/>
					</div>
				</div> */}

				{step === 1 &&
					<div className={classNames("flex flex-col")}>
						<Divider variant="middle" style={{ marginTop: 10, marginBottom: 10, width: '50%', alignSelf: 'center' }} />
						{this.getFranchiseesList()}
					</div>
				}
			</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openPaymentDialog: Actions.openPaymentDialog,
		createAccountReceivablePayment: Actions.createAccountReceivablePayment,

		showIncreaseDecreaseContractModalForm: Actions.showIncreaseDecreaseContractModalForm,

		getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
		getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
		getFranchisees: Actions.getFranchisees,
	}, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth, franchisees }) {
	return {
		regionId: auth.login.defaultRegionId,

		statusId: franchisees.statusId,
		Longitude: franchisees.Longitude,
		Latitude: franchisees.Latitude,
		Location: franchisees.Location,
		SearchText: franchisees.SearchText,
		bLoadedFranchisees: franchisees.bLoadedFranchisees,

		bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		activePaymentRows: accountReceivablePayments.activePaymentRows,

		payments: accountReceivablePayments.ACC_payments,

		filterParam: accountReceivablePayments.filterParam,
		searchText: accountReceivablePayments.searchText,

		paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

		increaseDecreaseContractModalForm: customers.increaseDecreaseContractModalForm,
		lists: customers.lists,
		franchieesesToOffer: customers.franchieesesToOffer,
		activeCustomer: customers.activeCustomer,

		franchisees: franchisees.franchiseesDB,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(IncreaseDecreaseContractPage)));
