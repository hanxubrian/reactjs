import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Tooltip, Slide, RadioGroup, Radio, FormControlLabel, Paper, Typography, InputAdornment } from '@material-ui/core';

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

const EditingCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
	EditingCellComponentBase
);
const getRowId = row => row.id;

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
			rows: [...this.props.activePaymentRows].map((x, index)=>{x.id = index; return x}),

		}

		this.commitChanges = this.commitChanges.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			bOpenPaymentDialog: nextProps.bOpenPaymentDialog
		})
		if (nextProps.activePaymentRows !== this.props.activePaymentRows) {
			this.setState({ rows: [...nextProps.activePaymentRows].map((x, index)=>{x.id = index; return x}) })
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
	commitChanges({ added, changed, deleted }) {
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

	render() {
		const { classes } = this.props;
		const { rows, columns } = this.state;
		return (
			<div>
				<Dialog
					open={this.state.bOpenPaymentDialog}
					fullWidth={true}
					maxWidth="lg"

					onClose={this.handleClose}
					scroll="paper"
					TransitionComponent={Transition}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Payment</DialogTitle>
					<DialogContent>
						{/* <DialogContentText>Payment Description</DialogContentText> */}
						<div className={classNames("flex flex-col")}>
							<div className={classNames("flex flex-col")}>
								<div sm={12} className={classNames("flex justify-between")}>
									<div className={classNames("flex flex-col")}>
										<div className="flex flex-col mb-4">
											<div className="flex" style={{ flex: 2, alignItems: 'center' }}>
												<Icon fontSize={"small"} className="mr-4">person_outline</Icon>
												<Typography variant="subtitle1" color="inherit"><strong>Customer Name</strong></Typography>
											</div>
											<div className="flex" style={{ flex: 1, alignItems: 'center' }}>
												<Icon fontSize={"small"} className="mr-4">apps</Icon>
												<Typography variant="subtitle1" color="inherit">1234567890</Typography>
											</div>
										</div>
									</div>

									<TextField type="number" autoFocus margin="dense" id="ReferenceNo" label="Reference No." variant="outlined" sm={3} />
								</div>
								<div className={classNames("flex")} sm={12}>
									<TextField type="number" InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} margin="dense" variant="outlined" fullWidth className={classNames("pr-6")} id="Amount" label="Amount" sm={3} />
									<TextField type="number" InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} margin="dense" variant="outlined" fullWidth className={classNames("pr-6")} id="CustomerCreditBalance" label="Customer Credit Balance" sm={3} />
									<TextField type="number" InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} margin="dense" variant="outlined" fullWidth className={classNames("pr-6")} id="Credit" label="Credit" sm={3} />
									<TextField type="number" InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} margin="dense" variant="outlined" fullWidth className={classNames("")} id="Balance" label="Balance" sm={3} />
								</div>

								<TextField margin="dense" variant="outlined" fullWidth id="Notes" label="Notes" multiline rows="2" rowsMax="2" />

							</div>
							<div className={classNames("flex flex-col flex-1")}>
								<Paper>
									<Grid rows={rows} columns={columns} getRowId={getRowId}>
										<EditingState
											onCommitChanges={this.commitChanges}
											columnExtensions={columns}
										/>


										<Table />
										<TableColumnResizing defaultColumnWidths={columns} />
										<TableHeaderRow />

										<TableEditRow />
										<TableEditColumn
											width={50}
											cellComponent={EditingCellComponentBase}
											headerCellComponent={EditingHeaderCellComponent}
											showEditCommand
											showDeleteCommand
											commandComponent={Command}
										/>
										<Getter
											name="tableColumns"
											computed={({ tableColumns }) => {
												// debugger
												const result = [
													...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
													{ key: 'editCommand', type: TableEditColumn.COLUMN_TYPE, width: 50 }
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
						<Button variant="contained" onClick={this.handleClose} color="primary"> Send&nbsp;&nbsp;&nbsp;<Icon className={classes.rightIcon}>send</Icon> </Button>
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
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentFormModal)));

