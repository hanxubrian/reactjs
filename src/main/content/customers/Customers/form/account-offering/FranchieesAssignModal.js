import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Tooltip, Slide, RadioGroup, Radio, FormControlLabel, Paper, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem, Divider, ListItem, List, ListItemText, ListItemLink, Checkbox } from '@material-ui/core';

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
import _ from "lodash";

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

class FranchieesAssignModal extends React.Component {

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

			franchieesesToOffer: [],

		}
		// this.commitChanges = this.commitChanges.bind(this);
		this.props.getLogCallCustomerServiceTypes()

		this.props.getFranchiseeServiceTypes(this.props.regionId)
		this.props.getFranchiseeBillingTypes(this.props.regionId)
	}

	componentWillMount() {
		console.log("componentWillMount")
		this.setRowData(this.props.payments)

		this.setState({
			customerServiceTypes: this.props.lists.customerServiceTypes,
			franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
			franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
			franchieesesToOffer: this.props.franchieesesToOffer,
		})



	}
	componentDidMount() {
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
		if (!_.isEqual(nextProps.franchieesesToOffer !== this.props.franchieesesToOffer)) {
			this.setState({ franchieesesToOffer: this.props.franchieesesToOffer, })
		}
	}

	handleStep = () => {
		this.setState({
			step: this.state.step === 0 ? 1 : 0
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

		this.props.showFranchieesAssignModalForm(false)

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

	getFranchiseeAssignmentForm() {
		const { classes } = this.props;
		const { franchieesesToOffer } = this.state;
		const {
			franchiseeBillingTypes,
			franchiseeServiceTypes
		} = this.state

		const franHeaders = [
			{ width: 7, title: 'Number', field: 'Number' },
			{ width: 16, title: 'Name', field: 'Name' },
			{ width: 5, title: 'Escrow', field: '' },
			{ width: 12, title: 'Billing Frequency', field: '' },
			{ width: 12, title: 'Billing', field: '' },
			{ width: 12, title: 'Service', field: '' },
			{ width: 24, title: 'Description', field: '' },
			{ width: 8, title: 'Amount', field: '' },
			{ width: 3, title: '', field: '' },
		]
		// { width: 7, title: 'Percent (%)', field: '' },
		return (
			<>
				<div className={classNames("flex pt-12 justify-end")} style={{ alignItems: 'center' }}>
					<Button variant="contained" color="primary" className={classNames("pl-24 pr-24 mr-12")}>Calculate Distribution</Button>

					<TextField margin="dense" id="Total Monthly Contract" label="Total Monthly Contract"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ readOnly: true, startAdornment: <InputAdornment position="end" className="mr-4">$</InputAdornment> }}
					/>
				</div>

				<Typography className="mb-12" variant="subtitle1">Franchisees</Typography>

				<div className={classNames("flex flex-col w-full")}>
					<div className={classNames("flex w-full")}>
						{franHeaders.map((f, findex) => (
							<Typography key={findex} style={{ width: f.width + '%' }} variant="caption">{f.title}</Typography>
						))}
					</div>

					<Divider variant="middle" style={{ marginTop: 10, width: '100%', alignSelf: 'center' }} />

					{franchieesesToOffer.map((x, index) => (
						<div key={index} className={classNames("flex w-full")} style={{ alignItems: 'bottom' }}>

							<Typography style={{ width: franHeaders[0].width + '%', alignSelf: 'center' }} variant="body2">{x.Number}</Typography>
							<Typography style={{ width: franHeaders[1].width + '%', alignSelf: 'center' }} variant="body2">{x.Name}</Typography>

							<Checkbox style={{ width: franHeaders[2].width + '%', alignSelf: 'center' }} />

							<TextField style={{ width: franHeaders[3].width + '%' }}
								margin="dense"
								className="pl-6"
								value="Regular"
								select
							// InputProps={{ readOnly: true }}
							>
								{['Variable', 'Regular'].map((x, index) => (<MenuItem key={index} value={x}>{x}</MenuItem>))}
							</TextField>

							<TextField style={{ width: franHeaders[4].width + '%' }}
								margin="dense"
								className="pl-6"
								value="Regular Billing"
								select
								InputProps={{ readOnly: true }}
							>
								{franchiseeBillingTypes.map((x, index) => (<MenuItem key={index} value={x.Name}>{x.Name}</MenuItem>))}
							</TextField>

							<TextField style={{ width: franHeaders[5].width + '%' }}
								margin="dense"
								className="pl-6"
								value=""
								select
							>
								{franchiseeServiceTypes.map((x, index) => (<MenuItem key={index} value={x.Name}>{x.Name}</MenuItem>))}
							</TextField>

							<TextField style={{ width: franHeaders[6].width + '%' }}
								margin="dense"
								className="pl-6"
							/>
							{/* <TextField style={{ width: franHeaders[7].width + '%' }}
								type='number'
								InputProps={{ endAdornment: <InputAdornment position="start" className="ml-4">%</InputAdornment> }}
								margin="dense"
								className="pl-6"
							/> */}
							<TextField style={{ width: franHeaders[7].width + '%' }}
								type='number'
								InputProps={{ startAdornment: <InputAdornment position="end" className="mr-4">$</InputAdornment> }}
								margin="dense"
								className="pl-6"
							/>
							<div style={{ width: franHeaders[8].width + '%' }}>
								<IconButton><Icon>filter_none</Icon></IconButton>
							</div>

						</div>
					))}
				</div>
			</>
		)
	}

	getFindersFeesForm() {
		const { classes } = this.props;
		return (
			<>
				<div className="flex">
					<Typography className="mb-12 pr-12" variant="title">Franchisees Number</Typography>
					<Typography className="mb-12" variant="title">Franchisees Name</Typography>
				</div>
				<div className={classNames("flex mt-12 justify-start")}>
					<TextField margin="dense" id="Monthly Billing Amount" label="Monthly Billing Amount"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">attach_money</Icon></InputAdornment> }}
					/>
				</div>
			</>
		)
	}
	render() {
		const { classes } = this.props;
		const { customerServiceTypes, step } = this.state;

		return (
			<div>
				<Dialog
					open={this.props.franchieesAssignModalForm.open === true}
					fullWidth={true}
					maxWidth="lg"

					onClose={this.handleClose}
					scroll="paper"
					// TransitionComponent={Transition}
					aria-labelledby="form-dialog-title"
				>
					<BlueDialogTitle id="form-dialog-title" onClose={this.handleClose}>
						{step === 0 && <h2 style={{ display: "flex", alignItems: "center", color: "white" }}><Icon>account_balance</Icon>&nbsp;&nbsp;Franchiee Assignment &amp; Distribution</h2>}
						{step === 1 && <h2 style={{ display: "flex", alignItems: "center", color: "white" }}><Icon>account_balance</Icon>&nbsp;&nbsp;Finders Fees</h2>}

					</BlueDialogTitle>
					<DialogContent>
						{/* <DialogContentText>Payment Description</DialogContentText> */}


						<div className={classNames("flex flex-col")}>
							{step === 0 && this.getFranchiseeAssignmentForm()}
							{step === 1 && this.getFindersFeesForm()}
							<Divider variant="middle" style={{ marginTop: 10, width: '100%', alignSelf: 'center' }} />
						</div>


					</DialogContent>

					<DialogActions>
						{step === 0 && <Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-12")}><Icon>save</Icon>&nbsp;&nbsp;Save</Button>}
						{step === 0 && <Button variant="contained" onClick={this.handleStep} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-12")}>Setup Finders Fees<Icon>keyboard_arrow_right</Icon></Button>}

						{step === 1 && <Button variant="contained" onClick={this.handleStep} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-12")}><Icon>keyboard_arrow_left</Icon>Finders Fees</Button>}
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-24")}>Cancel</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openPaymentDialog: Actions.openPaymentDialog,
		createAccountReceivablePayment: Actions.createAccountReceivablePayment,

		showFranchieesAssignModalForm: Actions.showFranchieesAssignModalForm,

		getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
		getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
	}, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth }) {
	return {
		regionId: auth.login.defaultRegionId,
		bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		activePaymentRows: accountReceivablePayments.activePaymentRows,

		payments: accountReceivablePayments.ACC_payments,

		filterParam: accountReceivablePayments.filterParam,
		searchText: accountReceivablePayments.searchText,

		paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

		franchieesAssignModalForm: customers.franchieesAssignModalForm,
		lists: customers.lists,
		franchieesesToOffer: customers.franchieesesToOffer,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchieesAssignModal)));