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

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
})
function Transition(props) {
	return <Slide direction="up" {...props} />;
}

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
				{
					title: "C.Name",
					name: "CustomerName",
					columnName: "CustomerName",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},

				{
					title: "C.Number",
					name: "CustomerNo",
					columnName: "CustomerNo",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Check No",
					name: "CheckNo",
					columnName: 'CheckNo',
					width: 180,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice No",
					name: "InvoiceNo",
					columnName: "InvoiceNo",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice Amount",
					name: "InvoiceAmount",
					columnName: "InvoiceAmount",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice Balance",
					name: "InvoiceBalance",
					columnName: "InvoiceBalance",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "InvoiceBalance OR",
					name: "InvoiceBalanceOR",
					columnName: 'InvoiceBalanceOR',
					width: 150,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Payment Amount",
					name: "PaymentAmount",
					columnName: 'PaymentAmount',
					width: 140,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,

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
				{
					title: "Check Amount",
					name: "CheckAmount",
					columnName: 'CheckAmount',
					width: 140,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,

				}]
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			bOpenPaymentDialog: nextProps.bOpenPaymentDialog
		})
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

	render() {
		const { classes } = this.props;
		const { columns } = this.state;
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
											<div className="flex" style={{ flex: 2 }}>
												<Icon fontSize={"small"} className="mr-4">person_outline</Icon>
												<Typography variant="subtitle1" color="inherit"><strong>Customer Name</strong></Typography>
											</div>
											<div className="flex" style={{ flex: 1 }}>
												<Icon fontSize={"small"} className="mr-4">apps</Icon>
												<Typography variant="subtitle1" color="inherit">1234567890</Typography>
											</div>
										</div>
									</div>
									
									<TextField type="number" autoFocus margin="dense" id="ReferenceNo" label="Reference No." variant="outlined" sm={3} />
								</div>
								<div className={classNames("flex")} sm={12}>
									<TextField type="number" InputLabelProps={{shrink: true}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} margin="dense" variant="outlined" fullWidth className={classNames("pr-6")} id="Amount" label="Amount" sm={3} />
									<TextField type="number" InputLabelProps={{shrink: true}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} margin="dense" variant="outlined" fullWidth className={classNames("pr-6")} id="CustomerCreditBalance" label="Customer Credit Balance" sm={3} />
									<TextField type="number" InputLabelProps={{shrink: true}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} margin="dense" variant="outlined" fullWidth className={classNames("pr-6")} id="Credit" label="Credit" sm={3} />
									<TextField type="number" InputLabelProps={{shrink: true}} InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} margin="dense" variant="outlined" fullWidth className={classNames("")} id="Balance" label="Balance" sm={3} />
								</div>

								<TextField margin="dense" variant="outlined" fullWidth id="Notes" label="Notes" multiline rows="2" rowsMax="2" />

							</div>
							<div className={classNames("flex flex-col flex-1")}>
								<Paper>
									<Grid rows={this.props.activePaymentRows} columns={columns}>
										<Table />
										<TableHeaderRow />
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

