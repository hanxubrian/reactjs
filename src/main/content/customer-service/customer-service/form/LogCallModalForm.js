import React from 'react';
import moment from "moment"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Slide, Typography, MenuItem, Divider, ListItem, List, ListItemText } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import classNames from 'classnames';

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

class LogCallModalForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			// bOpenPaymentDialog: props.bOpenPaymentDialog,
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
		}
		// this.commitChanges = this.commitChanges.bind(this);
		this.props.getLogCallCustomerServiceTypes()
	}

	componentWillMount() {
		console.log("componentWillMount")
		// this.setRowData(this.props.payments)

		this.setState({
			customerServiceTypes: this.props.lists.customerServiceTypes
		})
	}
	componentDidMount() {
		// this.setState({
		// 	paymentDlgPayloads: this.props.paymentDlgPayloads,
		// 	PaymentAmount: this.props.paymentDlgPayloads.paymentAmount,
		// 	PaymentType: this.props.paymentDlgPayloads.paymentType
		// })

		// if (this.props.bOpenPaymentDialog === true) {
		// 	this.checkValidations()
		// }
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		// if (nextProps.payments !== this.props.payments) {
		// 	console.log("componentWillReceiveProps payments")
		// 	this.setRowData(nextProps.payments)
		// }
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

		this.props.showLogCallModalForm(false)

	};

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
			errorMsg: ""
		});
	};

	handleChangeEmailNotesTo = (event, value) => {
		this.setState({ EmailNotesTo: value });
	};

	handleCreateCustomerCollection = () => {
		const { activeCustomer } = this.props
		const { SpokeWith, Comments, CallBack, ActionValue, StatusBy } = this.state
		const data = {
			"cust_name": activeCustomer.Data.cus_name,
			"call_com": Comments,
			"sys_cust": 0,
			"cust_no": activeCustomer.Data.cust_no,
			"call_date": moment().format("MM/DD/YYYY"),
			"call_time": moment().format("HH:mm:ss"),
			"call_stat": 0,
			"stat_otr": StatusBy,
			"spoke_with": SpokeWith,
			"call_back": CallBack,
			"call_btime": moment().format("HH:mm:ss"),
			"action": 0,
			"action_otr": ActionValue
		}
		this.props.customerCollectionCreate(this.props.regionId, data)
	}

	render() {
		const { classes } = this.props;
		const { customerServiceTypes } = this.state;
		return (
			<div>
				<Dialog
					open={this.props.logCallModalForm.open === true}
					fullWidth={true}
					maxWidth="md"

					onClose={this.handleClose}
					scroll="paper"
					// TransitionComponent={Transition}
					aria-labelledby="form-dialog-title"
				>
					<BlueDialogTitle id="form-dialog-title" onClose={this.handleClose}>
						<h2 style={{ display: "flex", alignItems: "center", color: "white" }}>
							<Icon>settings_phone</Icon>&nbsp;&nbsp;Log Call</h2>
					</BlueDialogTitle>
					<DialogContent>
						{/* <DialogContentText>Payment Description</DialogContentText> */}
						<div className={classNames("flex flex-col")}>
							<div className={classNames("flex flex-col")}>
								{/* <div className={classNames("flex")} sm={12} >
									<TextField sm={3} type="text" value={customerName} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">person_outline</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerName" label="CustomerName" />
									<TextField sm={3} type="text" value={customerNumber} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">apps</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerNumber" label="CustomerNumber" />
								</div> */}

								<div className={classNames("flex mt-12")} sm={12}>

									<TextField sm={3} select margin="dense" id="InitiatedBy" label="Initiated By"
										InputLabelProps={{ shrink: true }}
										className={classNames(classes.textField, "pr-6")}
										value={this.state.InitiatedBy || ''}
										onChange={this.handleChange('InitiatedBy')}
										fullWidth
										InputProps={{ readOnly: false }}
									>
										{[
											"JK",
											"Customer",
											"Franchiees",
										].map((x, index) => (
											<MenuItem key={index} value={x}>{x}</MenuItem>
										))}
									</TextField>

									<TextField sm={3} select margin="dense" id="Type" label="Type"
										InputLabelProps={{ shrink: true }}
										className={classNames(classes.textField, "pl-6 pr-6")}
										value={this.state.Type || ''}
										onChange={this.handleChange('Type')}
										fullWidth
										InputProps={{ readOnly: false }}
									>
										{customerServiceTypes.map((x, index) => (
											<MenuItem key={index} value={x.ReasonNumber}>{x.name}</MenuItem>
										))}


									</TextField>

									<TextField sm={3} select margin="dense" id="StatusBy" label="Status By"
										InputLabelProps={{ shrink: true }}
										className={classNames(classes.textField, "pl-6")}
										value={this.state.StatusBy || ''}
										onChange={this.handleChange('StatusBy')}
										fullWidth
										InputProps={{ readOnly: false }}
									>
										<MenuItem value={"Contactd"}>Contactd</MenuItem>
									</TextField>

									{/* 
									<TextField sm={3} margin="dense" id="ReferenceNo" label="Reference No." variant="outlined"
										autoFocus
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
									/>

									<TextField
										type="number"
										InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
										margin="dense"
										variant="outlined"
										fullWidth
										required
										className={classNames(classes.textField, "pr-6")}
										id="PaymentAmount"
										value={this.state.PaymentAmount}
										InputProps={{
											readOnly: this.props.paymentDlgPayloads.paymentAmount !== 0,
										}}
										inputProps={{ min: 0 }}
										onChange={this.handleChange('PaymentAmount')}
										label="Payment Amount" sm={2}
									/> */}

								</div>

								<Divider variant="middle" style={{ margin: 10, width: '50%', alignSelf: 'center' }} />

								<div className="flex">
									<div className="flex flex-col w-full pr-6">
										<TextField margin="dense" fullWidth id="SpokeWith" label="Spoke With"
											InputLabelProps={{ shrink: true }}
											value={this.state.SpokeWith || ''}
											onChange={this.handleChange('SpokeWith')}
										/>

										<TextField margin="dense" fullWidth id="ActionValue" label="Action"
											InputLabelProps={{ shrink: true }}
											value={this.state.ActionValue || ''}
											onChange={this.handleChange('ActionValue')}
										/>

										<TextField margin="dense" fullWidth id="Area" label="Area"
											select
											InputLabelProps={{ shrink: true }}
											value={this.state.Area || ''}
											onChange={this.handleChange('Area')}>
											<MenuItem value={""}></MenuItem>
										</TextField>

										<TextField margin="dense" fullWidth id="CallBack" label="Call Back"
											type="date"
											InputLabelProps={{ shrink: true }}
											value={this.state.CallBack || ''}
											onChange={this.handleChange('CallBack')}
										/>

										<TextField margin="dense" fullWidth id="FollowUpBy" label="Follow Up By"
											select
											InputLabelProps={{ shrink: true }}
											value={this.state.FollowUpBy || ''}
											onChange={this.handleChange('FollowUpBy')}>
											<MenuItem value={"Claudia Ulloa"}>Claudia Ulloa</MenuItem>
										</TextField>
									</div>
									<div className="flex flex-col w-full pr-6 pl-6">
										<TextField margin="dense" variant="outlined" fullWidth id="Comments" label="Comments" multiline rows="13" rowsMax="13"
											InputLabelProps={{ shrink: true }}
											value={this.state.Comments || ''}
											onChange={this.handleChange('Comments')}
										/>
									</div>
									<div className="flex flex-col w-full pl-6" >
										<Typography variant="caption">Notify Email Call Notes To:</Typography>
										<List component="nav" style={{ height: 280, overflow: 'auto' }}>
											{[
												"Frank Lopez",
												"Mark Hodges",
												"Robert Griffin (RD)",
												"Samuel Stanley",
												"Stacey Jarvis",
												"Frank Lopez",
												"Mark Hodges",
												"Robert Griffin (RD)",
												"Samuel Stanley",
												"Stacey Jarvis",
											].map((x, index) =>
												(
													<ListItem
														key={index}
														button
														selected={this.state.EmailNotesTo === x}
														onClick={event => this.handleChangeEmailNotesTo(event, x)}
													>
														<ListItemText primary={x} />
													</ListItem>
												)
											)}
										</List>

									</div>
								</div>
								<Divider variant="middle" style={{ marginTop: 10, width: '100%', alignSelf: 'center' }} />

							</div>
						</div>
					</DialogContent>

					<DialogActions>
						<Button variant="contained" onClick={this.handleCreateCustomerCollection} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-12")}>Save</Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-24")}>Close</Button>

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

		showLogCallModalForm: Actions.showLogCallModalForm,

		getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		customerCollectionCreate: Actions.customerCollectionCreate,
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

		logCallModalForm: customers.logCallModalForm,
		lists: customers.lists,
		// customerServiceForm: customers.customerServiceForm,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LogCallModalForm)));