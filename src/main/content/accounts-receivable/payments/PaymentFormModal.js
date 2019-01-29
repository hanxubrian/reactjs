import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Tooltip, Slide, RadioGroup, Radio, FormControlLabel, Paper, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

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
			background: '#272727',
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

class PaymentFormModal extends React.Component {

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
					title: "Payment Amount",
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
				{ key: "PaymentAmount", name: "Payment Amount", editable: true, formatter: CurrencyFormatter }
			],
			rows: [],
			currencyColumns: [
				'InvoiceAmount', 'InvoiceBalance', 'PaymentAmount'
			],
			customerName: "",
			customerNumber: "",

			PaymentType: "",
			ReferenceNo: "",
			PaymentDate: new Date().toISOString().substr(0, 10),
			PaymentNote: "",
			PaymentAmount: 0,
			overpayment: 0,
			errorMsg: "",
		}
		// this.commitChanges = this.commitChanges.bind(this);
	}

	componentWillMount() {
		console.log("componentWillMount")
		this.setRowData(this.props.payments)
	}
	componentDidMount() {
		this.checkValidations('', '')
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.payments !== this.props.payments) {
			console.log("componentWillReceiveProps payments")
			this.setRowData(nextProps.payments)
		}
		if (JSON.stringify(nextProps.activePaymentRows) !== JSON.stringify(this.props.activePaymentRows)) {
			console.log("componentWillReceiveProps activePaymentRows", nextProps.activePaymentRows, this.props.activePaymentRows)
			this.setRowData(this.props.payments, nextProps.activePaymentRows)
		}
	}

	handleClose = () => {
		this.props.openPaymentDialog(false);
	};

	handleCreatePayment = () => {

		let PayItems = this.state.rows.map(x => {
			return {
				InvoiceNo: x.InvoiceNo,
				Amount: x.PaymentAmount
			}
		})

		if (!this.state.PaymentType) {
			this.setState({ errorMsg: "Payment type not selected" })
		} else if (this.state.ReferenceNo <= 0) {
			this.setState({ errorMsg: "Refernce number is invalid" })
		} else if (!this.state.PaymentDate) {
			this.setState({ errorMsg: "Payment date not selected" })
		} else if (this.state.PaymentAmount <= 0) {
			this.setState({ errorMsg: "Amount is invalid" })
		} else if (!this.isNonEmptyPayment(this.state.rows)) {
			this.setState({ errorMsg: "Neither of payments amount is settled" })
		} else {

			const params = {
				RegionId: this.props.regionId,
				PaymentType: this.state.PaymentType,
				ReferenceNo: this.state.ReferenceNo,
				PaymentDate: this.state.PaymentDate,
				Note: this.state.PaymentNote,
				PayItems: PayItems,
				overpayment: this.state.overpayment,
			}
			console.log("handleCreatePayment", params);

			this.handleClose();
			this.props.createAccountReceivablePayment(
				this.props.regionId,
				this.state.PaymentType,
				this.state.ReferenceNo,
				this.state.PaymentDate,
				this.state.PaymentNote,
				PayItems,
				this.state.overpayment,

				this.props.getPaymentsParam.fromDate,
				this.props.getPaymentsParam.toDate,
				"",
				this.props.status
			)
		}
	}

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });

		this.checkValidations(name, event.target.value)


		if (name === "PaymentAmount") {
			let totalPaymentAmount = 0
			let floatPaymentAmount = parseFloat(`0${event.target.value}`)
			this.state.rows.forEach(x => {
				totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
			})

			this.setState({
				overpayment: totalPaymentAmount - floatPaymentAmount
			})
		}
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
			let totalPaymentAmount = 0, floatPaymentAmount = 0
			rows.forEach(x => {
				totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
			})
			floatPaymentAmount = parseFloat(`0${this.state.PaymentAmount}`)

			return {
				rows,
				overpayment: totalPaymentAmount - floatPaymentAmount,
				errorMsg: this.isNonEmptyPayment(rows) ? "" : "Neither of payments amount is settled"
			};
		});
	};

	autoDistribute = () => {
		this.setState(state => {
			const { PaymentAmount } = this.state
			let floatPaymentAmount = parseFloat(`0${PaymentAmount}`)

			const rows = state.rows.slice();
			for (let i = 0; i < rows.length; i++) {
				let invAmount = parseFloat(`0${rows[i].InvoiceAmount}`)

				if (invAmount <= floatPaymentAmount) {
					rows[i] = { ...rows[i], PaymentAmount: invAmount };
					floatPaymentAmount = floatPaymentAmount - invAmount
				} else {
					rows[i] = { ...rows[i], PaymentAmount: floatPaymentAmount };
					floatPaymentAmount = 0
				}
			}

			return {
				rows: rows,
				overpayment: floatPaymentAmount,
				errorMsg: this.isNonEmptyPayment(rows) ? (this.state.errorMsg === "Neither of payments amount is settled" ? "" : this.state.errorMsg) : "Neither of payments amount is settled"
			}
		})
	}

	clearDistribute = () => {
		this.setState(state => {
			const rows = state.rows.slice();
			for (let i = 0; i < rows.length; i++) {
				rows[i] = { ...rows[i], PaymentAmount: 0 };
			}

			return {
				rows: rows,
				overpayment: 0,
				errorMsg: this.isNonEmptyPayment(rows) ? "" : "Neither of payments amount is settled"
			}
		})
	}
	isNonEmptyPayment(rows) {
		//
		// check row for payment amount
		//
		let isNonEmptyPayment = false
		rows.forEach(x => {
			isNonEmptyPayment = isNonEmptyPayment || x.PaymentAmount > 0
		})
		return isNonEmptyPayment;
	}

	checkValidations(name, value) {
		if (name === "PaymentType" && !value || name !== "PaymentType" && !this.state.PaymentType) {
			this.setState({ errorMsg: "Payment type not selected" })
		} else if (name === "ReferenceNo" && value <= 0 || name !== "ReferenceNo" && this.state.ReferenceNo <= 0) {
			this.setState({ errorMsg: "Refernce number is invalid" })
		} else if (name === "PaymentDate" && !value || name !== "PaymentDate" && !this.state.PaymentDate) {
			this.setState({ errorMsg: "Payment date not selected" })
		} else if (name === "PaymentAmount" && value <= 0 || name !== "PaymentAmount" && this.state.PaymentAmount <= 0) {
			this.setState({ errorMsg: "Amount is invalid" })
		} else if (!this.isNonEmptyPayment(this.state.rows)) {
			this.setState({ errorMsg: "Neither of payments amount is settled" })
		} else {
			this.setState({ errorMsg: "" })
		}
	}

	render() {
		const { classes } = this.props;
		const { rows, columns, customerName, customerNumber, currencyColumns, columnsForReactDataGrid } = this.state;
		console.log("activeRows", rows)
		return (
			<div>
				<Dialog
					open={this.props.bOpenPaymentDialog}
					fullWidth={true}
					maxWidth="lg"

					onClose={this.handleClose}
					scroll="paper"
					// TransitionComponent={Transition}
					aria-labelledby="form-dialog-title"
				>
					<BlueDialogTitle id="form-dialog-title" onClose={this.handleClose}>
						<h2 style={{ display: "flex", alignItems: "center", color: "white" }}>
							<Icon>attach_money</Icon>
							Payment
                            </h2>
					</BlueDialogTitle>
					<DialogContent>
						{/* <DialogContentText>Payment Description</DialogContentText> */}
						<div className={classNames("flex flex-col")}>
							<div className={classNames("flex flex-col")}>
								<div className={classNames("flex")} sm={12} >
									{/* <div sm={3} className="flex flex-col w-full pr-6">
										<div className="flex" style={{ flex: 2, alignItems: 'center' }}>
											<Icon fontSize={"small"} className="mr-4">person_outline</Icon>
											<Typography variant="subtitle1" color="inherit"><strong>{customerName}</strong></Typography>
										</div>
										<div className="flex" style={{ flex: 1, alignItems: 'center' }}>
											<Icon fontSize={"small"} className="mr-4">apps</Icon>
											<Typography variant="subtitle1" color="inherit">{customerNumber}</Typography>
										</div>
									</div> */}

									<TextField sm={3} type="text" value={customerName} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">person_outline</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerName" label="CustomerName" />
									<TextField sm={3} type="text" value={customerNumber} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">apps</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerNumber" label="CustomerNumber" />

									{/* <TextField sm={2} type="number" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">$</InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerCreditBalance" label="Customer Credit Balance" />
									<TextField sm={2} type="number" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">$</InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="Credit" label="Credit" />
									<TextField sm={2} type="number" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">$</InputAdornment> }} margin="dense" fullWidth className={classNames("")} id="Balance" label="Balance" /> */}
								</div>

								<div className={classNames("flex")} sm={12}>

									<TextField sm={3} select margin="dense" id="PaymentType" label="Payment Type" variant="outlined"
										// style={{ width: "30%" }}
										autoFocus
										className={classNames(classes.textField, "pr-6")}
										value={this.state.PaymentType}
										onChange={this.handleChange('PaymentType')}
										fullWidth
									>
										<MenuItem value={"Check"}>Check</MenuItem>
										<MenuItem value={"CreditCard"}>Credit Card</MenuItem>
										<MenuItem value={"EFT"}>EFT</MenuItem>
										<MenuItem value={"Lockbox"}>Lockbox</MenuItem>
										<MenuItem value={"CreditFromOverpayment"}>Credit from Overpayment</MenuItem>
										<MenuItem value={"ManualCreditCard"}>Manual Credit Card</MenuItem>

									</TextField>

									<TextField sm={3} type="number" margin="dense" id="ReferenceNo" label="Reference No." variant="outlined"
										onChange={this.handleChange('ReferenceNo')}
										value={this.state.ReferenceNo}
										className={classNames(classes.textField, "pr-6")}
										fullWidth
									/>

									<TextField sm={1}
										type="date"
										id="PaymentDate"
										label="Payment Date"
										className={classNames(classes.textField, "pr-6")}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.PaymentDate}
										onChange={this.handleChange('PaymentDate')}
										margin="dense"
										variant="outlined"
										fullWidth
									// style={{ width: "20%", minWidth: "180px" }}
									/>

									<TextField
										type="number"
										InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
										margin="dense"
										variant="outlined"
										fullWidth
										className={classNames(classes.textField, "pr-6")}
										id="PaymentAmount"
										value={this.state.PaymentAmount}
										onChange={this.handleChange('PaymentAmount')}
										label="Amount To Apply" sm={2}
									/>
									<Tooltip title="Auto Distribution">
										<IconButton
											className={classNames(classes.button, "m-6")}
											onClick={this.autoDistribute}
										>
											<Icon>equalizer</Icon>
										</IconButton>
									</Tooltip>
									<Tooltip title="Clear Distribution">
										<IconButton
											className={classNames(classes.button, "m-6")}
											onClick={this.clearDistribute}
										>
											<Icon>clear</Icon>
										</IconButton>
									</Tooltip>


								</div>

								<TextField margin="dense" variant="outlined" fullWidth id="PaymentNote" label="Notes" multiline rows="2" rowsMax="2"
									value={this.state.PaymentNote}
									onChange={this.handleChange('PaymentNote')}
								/>

							</div>
							<div className={classNames(classes.root, "flex flex-col flex-1 mt-12")}>
								<Paper>
									{/* <Grid rows={rows} columns={columns} getRowId={getRowId}>
										<EditingState
											onCommitChanges={this.commitChanges}
											defaultEditingRowIds={rows.map(x => x.id)}
											columnExtensions={columns}
										/>
										<CurrencyTypeProvider
											for={currencyColumns}
										/>
										<VirtualTable height="auto" />
										<TableColumnResizing defaultColumnWidths={columns} />
										<TableHeaderRow cellComponent={tableHeaderCellComponent} />

										<TableEditRow />
										<TableEditColumn
											width={50}
											cellComponent={EditingCellComponentBase}
											headerCellComponent={EditingHeaderCellComponent}
											showEditCommand
											commandComponent={Command}
										/>
										<Getter
											name="tableColumns"
											computed={({ tableColumns }) => {
												const result = [
													...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
													{ key: 'editCommand', type: TableEditColumn.COLUMN_TYPE }
												];
												return result;
											}
											}
										/>
									</Grid> */}

									<ReactDataGrid
										columns={columnsForReactDataGrid}
										rowGetter={i => rows[i]}
										rowsCount={rows.length}
										onGridRowsUpdated={this.onGridRowsUpdated}
										enableCellSelect={true}
									/>

								</Paper>
								{this.state.overpayment > 0 &&
									<span className="p-12" style={{ background: '#efad49', color: 'black', textAlign: 'right' }}><Icon fontSize={"small"} className="mr-4" style={{ verticalAlign: 'text-bottom' }}>error_outline</Icon><strong>Over Payment: $ {this.state.overpayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></span>
								}
								{this.state.errorMsg &&
									<span className="p-12" style={{ background: 'red', color: 'white', textAlign: 'right' }}><Icon fontSize={"small"} className="mr-4" style={{ verticalAlign: 'text-bottom' }}>warning</Icon><strong>Error: {this.state.errorMsg}</strong></span>
								}
							</div>
						</div>
					</DialogContent>

					<DialogActions>
						<Button disabled={this.state.errorMsg !== ''} variant="contained" onClick={this.handleCreatePayment} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-24")}>Save</Button>
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
	}, dispatch);
}

function mapStateToProps({ accountReceivablePayments, auth }) {
	return {
		regionId: auth.login.defaultRegionId,
		bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		activePaymentRows: accountReceivablePayments.activePaymentRows,

		payments: accountReceivablePayments.ACC_payments,

		getPaymentsParam: accountReceivablePayments.getPaymentsParam,
		status: accountReceivablePayments.status,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentFormModal)));

