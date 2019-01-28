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

const styles = theme => ({
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

const CurrencyFormatter = ({ value }) => (<span>$ {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const CurrencyTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={CurrencyFormatter}
		{...props}
	/>
);

class PaymentFormModal extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			bOpenPaymentDialog: props.bOpenPaymentDialog,
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
			rows: [],
			currencyColumns: [
				'InvoiceAmount', 'InvoiceBalance', 'PaymentAmount'
			],
			customerName: "",
			customerNumber: "",
		}

		// this.commitChanges = this.commitChanges.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			bOpenPaymentDialog: nextProps.bOpenPaymentDialog
		})
		if (nextProps.activePaymentRows !== this.props.activePaymentRows) {
			// this.setState({ rows: [...nextProps.activePaymentRows].map((x, index) => { x.id = index; return x }) })
			this.setRowData(this.props.payments, nextProps.activePaymentRows)
		}
	}

	handleClose = () => {
		this.props.openPaymentDialog(false);
	};

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.payments !== this.props.payments) {
			this.setRowData(nextProps.payments)
		}
	}

	render() {
		const { classes } = this.props;
		const { rows, columns, customerName, customerNumber, currencyColumns } = this.state;
		return (
			<div>
				<Dialog
					open={this.state.bOpenPaymentDialog}
					fullWidth={true}
					maxWidth="lg"

					onClose={this.handleClose}
					scroll="paper"
					// TransitionComponent={Transition}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Payment</DialogTitle>
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
										value={this.state.PaymentType || ""}
										onChange={this.handleChange('PaymentType')}
										fullWidth>
										<MenuItem value={"Check"}>Check</MenuItem>
										<MenuItem value={"CreditCard"}>Credit Card</MenuItem>
										<MenuItem value={"EFT"}>EFT</MenuItem>
										<MenuItem value={"Lockbox"}>Lockbox</MenuItem>
										<MenuItem value={"CreditFromOverpayment"}>Credit from Overpayment</MenuItem>
										<MenuItem value={"ManualCreditCard"}>Manual Credit Card</MenuItem>

									</TextField>

									<TextField sm={3} type="number" margin="dense" id="ReferenceNo" label="Reference No." variant="outlined"
										className={classNames(classes.textField, "pr-6")}
										fullWidth />

									<TextField sm={3}
										type="date"
										id="PaymentDate"
										label="Payment Date"
										className={classNames(classes.textField, "pr-6")}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.SignDate}
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
										className={classNames("")}
										id="Amount"
										label="Amount" sm={3}
									/>
								</div>

								<TextField margin="dense" variant="outlined" fullWidth id="Notes" label="Notes" multiline rows="2" rowsMax="2" />

							</div>
							<div className={classNames("flex flex-col flex-1 mt-12")}>
								<Paper>
									<Grid rows={rows} columns={columns} getRowId={getRowId}>
										<EditingState
											onCommitChanges={this.commitChanges}
											// defaultEditingRowIds={rows.map((x,index)=>index)}
											defaultEditingRowIds={rows.map(x => x.id)}
											columnExtensions={columns}
										/>
										<CurrencyTypeProvider
											for={currencyColumns}
										/>
										<Table />
										{/* <VirtualTable height="auto" /> */}
										<TableColumnResizing defaultColumnWidths={columns} />
										<TableHeaderRow cellComponent={tableHeaderCellComponent} />
										{/* <TableHeaderRow/> */}

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
												// debugger
												const result = [
													...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
													{ key: 'editCommand', type: TableEditColumn.COLUMN_TYPE }
												];
												return result;
											}
											}
										/>
									</Grid>
								</Paper>
							</div>
						</div>
					</DialogContent>

					<DialogActions>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24")}>Save</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openPaymentDialog: Actions.openPaymentDialog,
	}, dispatch);
}

function mapStateToProps({ accountReceivablePayments }) {
	return {
		bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		activePaymentRows: accountReceivablePayments.activePaymentRows,

		payments: accountReceivablePayments.ACC_payments,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentFormModal)));

