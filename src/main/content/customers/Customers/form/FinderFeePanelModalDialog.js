import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Tooltip, Slide, RadioGroup, Radio, FormControlLabel, Paper, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem, Divider } from '@material-ui/core';

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

class FinderFeePanelModalDialog extends React.Component {

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

			customerFormFindersFeesDialogPayload: {},
			findersFeesCalculationMethod: {
				title: "",
				name: "",
				value: "",
			}
		}
		// this.commitChanges = this.commitChanges.bind(this);
	}

	componentWillMount() {
		console.log("componentWillMount")
		this.setRowData(this.props.payments)
		this.setState({
			customerFormFindersFeesDialogPayload: this.props.customerFormFindersFeesDialogPayload,
			findersFeesCalculationMethod: this.props.findersFeesCalculationMethod,
		})
	}
	componentDidMount() {
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (!_.isEqual(nextProps.customerFormFindersFeesDialogPayload, this.props.customerFormFindersFeesDialogPayload)) {
			this.setState({
				customerFormFindersFeesDialogPayload: nextProps.customerFormFindersFeesDialogPayload
			})
		}
		if (!_.isEqual(nextProps.findersFeesCalculationMethod, this.props.findersFeesCalculationMethod)) {
			this.setState({
				findersFeesCalculationMethod: nextProps.findersFeesCalculationMethod
			})
		}
	}

	handleClose = () => {
		this.setState({
			PaymentType: "Check",
			ReferenceNo: "",
			PaymentDate: new Date().toISOString().substr(0, 10),
			PaymentNote: "",
			PaymentAmount: 0,
			overpayment: 0,
			errorMsg: "",
		})

		this.clearDistribute()

		this.props.setCustomerFormFindersFeesDialogPayload({
			open: false,
		})

	};

	handleCreatePayment = () => {
		if (this.checkValidations()) {

			let PayItems = this.state.rows.map(x => {
				return {
					InvoiceNo: x.InvoiceNo,
					Amount: x.PaymentAmount
				}
			})

			this.props.createAccountReceivablePayment(
				this.props.regionId,
				this.state.customerNumber,

				this.state.PaymentType,
				this.state.ReferenceNo,
				this.state.PaymentDate,
				this.state.PaymentNote,
				this.getOverpaymentAmount(this.state.rows),
				this.state.PaymentAmount,

				PayItems,

				this.props.filterParam.fromDate,
				this.props.filterParam.toDate,
				this.props.searchText,
				this.props.filterParam.paymentStatus
			)

			this.handleClose();
		}
	}

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleChange = name => event => {
		const value = event.target.value
		if (name === "findersFeesCalculationMethod") {
			const findersFeesCalculationMethod = {
				...this.state.findersFeesCalculationMethod,
				title: value,
			}
			this.setState({ findersFeesCalculationMethod })
			this.props.setFindersFeesCalculationMethod(findersFeesCalculationMethod)
			//
			// config value parsing
			//
			console.log(this.props.customerForm)






			return
		}
		this.setState({
			[name]: event.target.value,
		});
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

	render() {
		const { classes } = this.props;
		const { rows, columns, customerName, customerNumber, currencyColumns, columnsForReactDataGrid } = this.state;
		console.log("activeRows", rows)
		return (
			<div>
				<Dialog
					open={this.state.customerFormFindersFeesDialogPayload.open === true}
					fullWidth={true}
					maxWidth="lg"

					onClose={this.handleClose}
					scroll="paper"
					// TransitionComponent={Transition}
					aria-labelledby="form-dialog-title"
				>
					<BlueDialogTitle id="form-dialog-title" onClose={this.handleClose}>
						<h2 style={{ display: "flex", alignItems: "center", color: "white" }}>
							<Icon>apps</Icon> Finder Fee Calculation Information </h2>
					</BlueDialogTitle>
					<DialogContent>
						{/* <DialogContentText>Payment Description</DialogContentText> */}
						<div className={classNames("flex flex-col")}>
							<div className={classNames("flex flex-col")}>
								<div className={classNames("flex mt-12")} sm={12} md={12} >
									<TextField sm={1}
										type="date"
										id="StartDate"
										label="Start Date"
										className={classNames(classes.textField, "pr-6")}
										InputLabelProps={{ shrink: true }}
										value={this.state.StartDate}
										onChange={this.handleChange('StartDate')}
										margin="dense"
										variant="outlined"
										style={{ width: "20%" }}
									/>
									<TextField
										margin="dense" variant="outlined" fullWidth id="Description" label="Description"
										value={this.state.Description}
										onChange={this.handleChange('Description')}
										style={{ width: "80%" }}
									/>
								</div>

								<Divider variant="middle" style={{ marginTop: 24, marginBottom: 24, width: "50%" }} />

								<div className={classNames("flex flex-col")} sm={12}>
									<div className={classNames("flex")}>
										<TextField sm={3} select margin="dense" id="CalculationMethod" label="CalculationMethod" variant="outlined"
											InputLabelProps={{ shrink: true }}
											className={classNames(classes.textField, "pr-6")}
											value={this.state.findersFeesCalculationMethod.title || ""}
											onChange={this.handleChange('findersFeesCalculationMethod')}
											fullWidth
										>
											{
												[
													"Single Ten.",
													"Variable 5.00%",
													"Seasonal",
													"Apartment",
													"Public Event",
													"Variable 2.5%",
													"National Account",
												].map((x, index) =>
													<MenuItem key={index} value={x}>{x}</MenuItem>
												)
											}
										</TextField>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="TotalAdjustments"
											value={this.state.TotalAdjustments || 0}
											onChange={this.handleChange('TotalAdjustments')}
											label="Total Adjustments"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="MonthlyBilling"
											value={this.state.MonthlyBilling || 0}
											onChange={this.handleChange('MonthlyBilling')}
											label="Monthly Billing"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="MultiTenant100Occupancy"
											value={this.state.MultiTenant100Occupancy || 0}
											onChange={this.handleChange('MultiTenant100Occupancy')}
											label="Multi-Tenant 100% Occupancy"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="PayableOn"
											value={this.state.PayableOn || 0}
											onChange={this.handleChange('PayableOn')}
											label="Payable On"
										/>

									</div>
									<div className={classNames("flex")}>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="DownPaymentPercent"
											value={this.state.DownPaymentPercent || 0}
											onChange={this.handleChange('DownPaymentPercent')}
											label="DownPayment Percent"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="DownPaymentAmount"
											value={this.state.DownPaymentAmount || 0}
											onChange={this.handleChange('DownPaymentAmount')}
											label="DownPayment Amount"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="MonthlyPaymentPercentage"
											value={this.state.MonthlyPaymentPercentage || 0}
											onChange={this.handleChange('MonthlyPaymentPercentage')}
											label="Monthly Payment Percentage"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="MonthlyPaymentAmount"
											value={this.state.MonthlyPaymentAmount || 0}
											onChange={this.handleChange('MonthlyPaymentAmount')}
											label="Monthly Payment Amount"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="NumberOfPayments"
											value={this.state.NumberOfPayments || 0}
											onChange={this.handleChange('NumberOfPayments')}
											label="Number Of Payments"
										/>
									</div>
									<div className={classNames("flex")}>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="AmountFinanced"
											value={this.state.AmountFinanced || 0}
											onChange={this.handleChange('AmountFinanced')}
											label="Amount Financed"
										/>
										<TextField
											type="number"
											InputLabelProps={{ shrink: true }}
											inputProps={{ min: 0 }}
											margin="dense"
											variant="outlined"
											fullWidth
											className={classNames(classes.textField, "pr-6")}
											id="TotalFF"
											value={this.state.TotalFF || 0}
											onChange={this.handleChange('TotalFF')}
											label="Total FF"
										/>
									</div>
									<div className={classNames("flex")}>
										<TextField margin="dense" variant="outlined" fullWidth id="Note" label="Note" multiline rows="2" rowsMax="2"
											value={this.state.Note}
											onChange={this.handleChange('Note')}
										/>
									</div>
								</div>
							</div>

						</div>
					</DialogContent>

					<DialogActions>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-24")}>Save</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		// openPaymentDialog: Actions.openPaymentDialog,
		// createAccountReceivablePayment: Actions.createAccountReceivablePayment,

		setCustomerFormFindersFeesDialogPayload: Actions.setCustomerFormFindersFeesDialogPayload,
		setFindersFeesCalculationMethod : Actions.setFindersFeesCalculationMethod,
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

		customerForm: customers.customerForm,

		customerFormFindersFeesDialogPayload: customers.customerFormFindersFeesDialogPayload,
		findersFeesCalculationMethod: customers.findersFeesCalculationMethod,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FinderFeePanelModalDialog)));