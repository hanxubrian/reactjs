import React from 'react';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

import { Icon, IconButton, Tooltip, Slide, Paper, InputAdornment, MenuItem } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import classNames from 'classnames';

import {
	TableHeaderRow,
	TableEditColumn
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
			background: '#7b7b7b',
		}
	},
	button: {
		margin: theme.spacing.unit,
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit * 2,
	},
	resetContainer: {
		padding: theme.spacing.unit * 3,
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
	edit: EditButton,
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
	}
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


function getSteps() {
	return ['', 'Second Step'];
}


class PaymentFormModalCredit extends React.Component {

	constructor(props) {
		super(props)
		const invoiceId = "5c53876ca0ccb01f4caa9596";
		this.state = {
			columns: [
				{
					title: "Franchisee Name",
					name: "Name",
					columnName: "Name",
					width: '100%',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Franchisee Number",
					name: "FranchiseeNumber",
					columnName: "FranchiseeNumber",
					width: '100%',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Amount",
					name: "Amount",
					columnName: "Amount",
					width: '100%',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				}
			],
			columnsForReactDataGrid: [
				{ key: "Name", name: "Franchisee Name", editable: false },
				{ key: "FranchiseeNumber", name: "Franchisee Number", editable: false },
				{ key: "Amount", name: "Amount", editable: true, formatter: CurrencyFormatter },
			],
			rows: [],
			currencyColumns: [
				'Amount'
			],
			customerName: "",
			customerNumber: "",
			CreditDate: new Date().toISOString().substr(0, 10),
			CreditAmount: 0,
			CreditReason: "",
			PaymentType: "",
			ReferenceNo: "",
			CreditNote: "",
			overpayment: 0,
			errorMsg: "",
			activeStep: 0,

			paymentDlgPayloads: {
				open: false,
				paymentType: "Check",
				paymentAmount: 0
			},
		}
		// this.props.getPaymentsDialogInvoiceList(props.regionId, invoiceId);
	}

	handleStepNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1,
		}));
	};

	handleStepBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1,
		}));
	};

	handleStepReset = () => {
		this.setState({
			activeStep: 0,
		});
	};


	componentWillMount() {
		// if (this.props.creditInvoiceList && this.props.creditInvoiceList.Data && this.props.creditInvoiceList.Data.Items) {
		// 	console.log("------------------ creditInvoiceList ---------------------", this.props.creditInvoiceList.Data.Items);
		// 	this.setState({ rows: this.props.creditInvoiceList.Data.Items[0].Distribution });
		// }

		this.setState({
			paymentDlgPayloads: this.props.paymentDlgPayloads,
			PaymentAmount: this.props.paymentDlgPayloads.paymentAmount,
			PaymentType: this.props.paymentDlgPayloads.paymentType
		})

		this.setRowData(this.props.payments)
	}
	componentDidMount() {

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
		}
	}
	setRowData(payments, activePaymentRows = this.props.activePaymentRows) {
		console.log("payment modal credit----------------------------------------", activePaymentRows, payments)
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
	handleClose = () => {
		// this.props.openPaymentDialog(false);
		this.props.openPaymentDialog({
			open: false,
			paymentType: "Credit",
			paymentAmount: 0,
		})
	};

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleCreatePayment = () => {
		if (this.checkValidations()) {

			let PayItems = []

			this.props.createAccountReceivablePayment(
				this.props.regionId,
				this.state.customerNumber,

				"Credit",
				this.state.ReferenceNo,
				this.state.PaymentDate,
				this.state.PaymentNote,
				0, //overpayment
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

	render() {
		const { classes } = this.props;
		const { rows, activeStep, columnsForReactDataGrid, customerName, customerNumber } = this.state;
		const steps = getSteps();
		return (
			<div>
				<Dialog
					open={this.state.paymentDlgPayloads.open === "Credit"}
					fullWidth={true}
					maxWidth="lg"

					onClose={this.handleClose}
					scroll="paper"
					aria-labelledby="form-dialog-title"
				>

					<BlueDialogTitle id="form-dialog-title" onClose={this.handleClose}>
						<h2 style={{ display: "flex", alignItems: "center", color: "white" }}>
							<Icon>add_box</Icon>
							Add Credit
                        </h2>
					</BlueDialogTitle>
					<DialogContent>
						<div className={classNames("flex flex-col")}>
							<div className={classNames("flex flex-col")}>
								<div className={classNames("flex")} sm={12} >
									<TextField sm={3} type="text" value={customerName} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">person_outline</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerName" label="CustomerName" />
									<TextField sm={3} type="text" value={customerNumber} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">apps</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerNumber" label="CustomerNumber" />
								</div>
							</div>

							<div className={classNames("flex")} sm={12}>
								<TextField
									type="date"
									id="PaymentDate"
									label="Date"
									className={classNames(classes.textField, "pr-6")}
									InputLabelProps={{ shrink: true }}
									value={this.state.PaymentDate}
									onChange={this.handleChange('PaymentDate')}
									margin="dense"
									variant="outlined"
									// fullWidth
									sm={3}
									style={{ width: '20%' }}
								/>
								<TextField
									type="number"
									InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
									margin="dense"
									variant="outlined"
									// fullWidth
									className={classNames(classes.textField, "pr-6")}
									id="PaymentAmount"
									value={this.state.PaymentAmount}
									onChange={this.handleChange('PaymentAmount')}
									label="Amount"
									sm={3}
									style={{ width: '20%' }}
								/>
								<TextField
									InputLabelProps={{ shrink: true }}
									margin="dense"
									variant="outlined"
									// fullWidth
									className={classNames(classes.textField, "pr-6")}
									id="PaymentNote"
									value={this.state.PaymentNote}
									onChange={this.handleChange('PaymentNote')}
									label="Reason"
									sm={6}
									style={{ width: '60%' }}
								/>
							</div>

							{/* <div className={classNames("flex flex-col")}>
								<Stepper activeStep={activeStep} orientation="vertical">
									<Step>
										<StepLabel></StepLabel>
										<StepContent>
											<div>
												<div className={classNames("flex")} sm={12}>

													<TextField sm={1}
														type="date"
														id="CreditDate"
														label="Date"
														className={classNames(classes.textField, "pr-6")}
														InputLabelProps={{
															shrink: true
														}}
														value={this.state.CreditDate}
														onChange={this.handleChange('CreditDate')}
														margin="dense"
														variant="outlined"
														fullWidth
													/>
													<TextField
														type="number"
														InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
														margin="dense"
														variant="outlined"
														fullWidth
														className={classNames(classes.textField, "pr-6")}
														id="CreditAmount"
														value={this.state.CreditAmount}
														onChange={this.handleChange('CreditAmount')}
														label="Amount" sm={2}
													/>
													<TextField
														InputLabelProps={{ shrink: true }}
														margin="dense"
														variant="outlined"
														fullWidth
														className={classNames(classes.textField, "pr-6")}
														id="CreditReason"
														value={this.state.CreditReason}
														onChange={this.handleChange('CreditReason')}
														label="Reason" sm={2}
													/>
												</div>

												<TextField margin="dense" variant="outlined" fullWidth id="PaymentNote" label="Notes" multiline rows="3" rowsMax="3"
													value={this.state.PaymentNote}
													onChange={this.handleChange('PaymentNote')}
												/>
											</div>
											<div className={classes.actionsContainer}>
												<div className="flex justify-end">
													<Button
														onClick={this.handleStepNext}
														className={classes.button}
													>
														Next
                                                        </Button>
												</div>
											</div>
										</StepContent>
									</Step>
									<Step>
										<StepLabel></StepLabel>
										<StepContent>
											<div>
												<div className={classNames(classes.root, "flex flex-col flex-1 mt-12")}>
													<Paper>
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
											<div className={classes.actionsContainer}>
												<div className="flex justify-end">
													<Button
														onClick={this.handleStepBack}
														className={classes.button}
													>
														Back
                                                    </Button>
												</div>
											</div>
										</StepContent>
									</Step>
								</Stepper>
							</div> */}
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
		getPaymentsDialogInvoiceList: Actions.getPaymentsDialogInvoiceList,
		openPaymentDialog: Actions.openPaymentDialog
	}, dispatch);
}

function mapStateToProps({ territories, auth, accountReceivablePayments }) {
	return {
		creditInvoiceList: territories.creditInvoiceList,
		regionId: auth.login.defaultRegionId,

		paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,
		payments: accountReceivablePayments.ACC_payments,
		activePaymentRows: accountReceivablePayments.activePaymentRows,
		filterParam: accountReceivablePayments.filterParam,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentFormModalCredit)));

