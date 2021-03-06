import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Slide, Divider } from '@material-ui/core';

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

class PhoneCallModalForm extends React.Component {

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
	}

	componentWillMount() {
		console.log("componentWillMount")
		// this.setRowData(this.props.payments)
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

		this.props.showSendPhoneCallModalForm(false)

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

	// setRowData(payments, activePaymentRows = this.props.activePaymentRows) {
	// 	console.log("----------------------------------------", activePaymentRows, payments)
	// 	// const temp_rows = [
	// 	// 	{ id: 0, InvoiceNo: 1, InvoiceAmount: 1351.51, InvoiceBalance: 216.36, PaymentAmount: 0 },
	// 	// 	{ id: 1, InvoiceNo: 2, InvoiceAmount: 56.30, InvoiceBalance: 548.24, PaymentAmount: 0 },
	// 	// 	{ id: 2, InvoiceNo: 3, InvoiceAmount: 215.28, InvoiceBalance: 1654.36, PaymentAmount: 0 },

	// 	// ];
	// 	// this.setState({ rows: temp_rows })

	// 	if (!payments || payments.Regions === undefined || payments.Regions.length < 1)
	// 		return [];
	// 	let res = [...payments.Regions[0].Payments]

	// 	res.forEach((x, index) => {
	// 		x.CustomerNameNo = `${x.CustomerName} - ${x.CustomerNo}`;
	// 		x.id = index
	// 	})
	// 	res = res.filter(x => {
	// 		return activePaymentRows.indexOf(x.id) > -1
	// 	})
	// 	console.log("setRowData", res);
	// 	if (res.length > 0) {
	// 		this.setState({
	// 			customerName: res[0].CustomerName,
	// 			customerNumber: res[0].CustomerNo,
	// 		})
	// 	}
	// 	this.setState({ rows: res })
	// }

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

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					open={this.props.contactForms.phoneCallModalForm.open === true}
					fullWidth={true}
					maxWidth="md"

					onClose={this.handleClose}
					scroll="paper"
					// TransitionComponent={Transition}
					aria-labelledby="form-dialog-title"
				>
					<BlueDialogTitle id="form-dialog-title" onClose={this.handleClose}>
						<h2 style={{ display: "flex", alignItems: "center", color: "white" }}>
							<Icon>email_outline</Icon>&nbsp;&nbsp;Phone Call</h2>
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
									<TextField type="email" sm={3} id="EmailTo" label="To" value={this.state.EmailTo || ''} 
										variant="outlined" margin="dense"  
										InputLabelProps={{ shrink: true }}
										className={classNames(classes.textField)}
										onChange={this.handleChange('EmailTo')}
										fullWidth
									/>
								</div>

								<div className={classNames("flex")} sm={12}>
									<TextField sm={3} id="EmailMessage" label="Message" value={this.state.EmailMessage || ''} 
										variant="outlined" margin="dense" multiline rows='5' rowsMax='5'
										InputLabelProps={{ shrink: true }}
										className={classNames(classes.textField)}
										onChange={this.handleChange('EmailMessage')}
										fullWidth
									/>
								</div>

								<Divider variant="middle" style={{ margin: 10, width: '50%', alignSelf: 'center' }} />

							</div>
						</div>
					</DialogContent>

					<DialogActions>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-12")}>Send</Button>
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

		showSendPhoneCallModalForm: Actions.showSendPhoneCallModalForm,
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


		contactForms: customers.contactForms,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PhoneCallModalForm)));