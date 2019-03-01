import React from 'react';
import moment from "moment"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import { IconButton, OutlinedInput, Slide, Select, ListItemLink } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import classNames from 'classnames';

import {
	TableHeaderRow,
	TableEditColumn,

} from '@devexpress/dx-react-grid-material-ui';

import NewIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import CancelIcon from '@material-ui/icons/Cancel';
import GridContainer from "../../../../Commons/Grid/GridContainer";
import GridItem from "../../../../Commons/Grid/GridItem";
import _ from "lodash";


const DialogTitle = withStyles(theme => ({
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
        <MuiDialogTitle disableTypography className={classes.root}>
            {children}
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

const styles = theme => ({
	root: {

	},
	button: {
		margin: theme.spacing.unit,
	},
	dropdownMenu: {
        '& li': {
            fontSize: 12,
            height: 12,
        }
    },
	inputMenu1: {
        padding: '10px 16px',
        width: 125
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    dialogH2: {
        display: "flex",
        alignItems: "center",
        color: "white"
    },
    iconSmall: {
        fontSize: 20
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


class ProcessModalForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			columns: [
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

				}
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
            period: moment().format('MM/YYYY'),
            periods: null,
			labelWidth: 0,
			Notes: "",
			chargeBackDate: undefined,

			paymentDlgPayloads: {
				open: false,
				paymentType: "Check",
				paymentAmount: 0
			},

		}
		this.props.getLogCallCustomerServiceTypes()
	}

	componentDidUpdate(prevProps, prevState, snapshot){

	}

	componentWillMount() {
		console.log("componentWillMount")
		this.setRowData(this.props.payments)

		this.setState({
			customerServiceTypes: this.props.lists.customerServiceTypes
		})
	}
	componentDidMount() {
		this.setState({
			paymentDlgPayloads: this.props.paymentDlgPayloads,
			PaymentAmount: this.props.paymentDlgPayloads.paymentAmount,
			PaymentType: this.props.paymentDlgPayloads.paymentType
		})
<<<<<<< HEAD
=======

		// if (this.props.bOpenPaymentDialog === true) {
		// 	this.checkValidations()
        // }

        let year = moment().year();
        let month = moment().month();
        // let invoiceDate = moment();
        // let dueDate = moment().year(year).month(month).endOf('month');
        // this.setState({InvoiceDate: invoiceDate.format('YYYY-MM-DD')});
        // this.setState({DueDate: dueDate.format('YYYY-MM-DD')});
        // this.setState({ bShowInvoiceCloseBox: false });
        if(this.props.all_regions!==null && this.props.all_regions.length){

            let all_regions = this.props.all_regions;
            let region = all_regions.filter(r=>r.regionid===this.props.regionId);

            if(region.length){
                let periods = region[0].OpenPeriods;

                let all_periods = [];

                let period = periods.current.month.toString() + '/' + periods.current.year.toString();
                if (periods.current.month < 10)
                    period = '0' + period;
                if(periods.current.status==='Open')
                    all_periods.push(period);
                this.setState({period: period});


                period = periods.next.month.toString() + '/' + periods.next.year.toString();
                if (periods.next.month < 10)
                    period = '0' + period;
                if(periods.next.status==='Open')
                    all_periods.push(period);
                period = periods.previous.month.toString() + '/' + periods.previous.year.toString();
                if (periods.previous.month < 10)
                    period = '0' + period;
                if(periods.previous.status==='Open')
                    all_periods.push(period);
                this.setState({periods: all_periods});
            }
        }
>>>>>>> f82e0e5c86862c3d4fa8a6dc93a1038a28f5fb90
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

	handleClose = () => {
		this.props.showProcessModalForm(false)
	};

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

<<<<<<< HEAD
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
			errorMsg: ""
		});
=======
	// handleChange= name => event => {
	// 	this.setState({
	// 		[name]: event.target.value,
	// 		errorMsg: ""
	// 	});

	// 	if (name === "PaymentAmount") {
	// 		// this.setState({
	// 		// 	overpayment: this.getOverpaymentAmount(this.state.rows, event.target.value)
	// 		// })
	// 	}
	// 	// this.checkValidations(name, event.target.value)
	// };

	handleChange = (event) => {
		this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
>>>>>>> f82e0e5c86862c3d4fa8a6dc93a1038a28f5fb90
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

	onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		this.setState(state => {
			const rows = state.rows.slice();
			for (let i = fromRow; i <= toRow; i++) {
				rows[i] = { ...rows[i], ...updated };
			}

			return {
				rows
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
			return {
				rows: rows,
				overpayment: this.getOverpaymentAmount(rows),
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
			<div className={classes.root}>
				<Dialog
                    open={this.props.processModalForm.open}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"md"}
                    fullWidth
				>
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose }>
                        <h2 className={classes.dialogH2}>
                            <SettingsBackupRestore  className={classNames(classes.leftIcon)} />
                            Process Chargebacks
                        </h2>
                    </DialogTitle>
					<DialogContent>
<<<<<<< HEAD
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl,"mt-24")}>
							<GridItem xs={12} sm={4} md={4} className="flex flex-row ">
								<Select
									classes={{
										selectMenu: classNames(classes.inputMenu1),
									}}
									label="Period"
									name="period"
									variant="outlined"
									value={this.state.period}
									onChange={this.handleChange}
                                    fullWidth
									input={
										<OutlinedInput
											labelWidth={this.state.labelWidth}
											name="period"
											id="period"
=======
						{/* <DialogContentText>Payment Description</DialogContentText> */}
						<div className={classNames("flex flex-col")}>
							<div className={classNames("flex flex-col")}>
								{/* <div className={classNames("flex")} sm={12} >
									<TextField sm={3} type="text" value={customerName} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">person_outline</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerName" label="CustomerName" />
									<TextField sm={3} type="text" value={customerNumber} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">apps</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerNumber" label="CustomerNumber" />
								</div> */}

								<div className={classNames("flex mt-12")} sm={12}>
								{this.state.periods!==null && (
										<Select
											classes={{
												selectMenu: classNames(classes.inputMenu1),
											}}
											label="Period"
											name="period"
											variant="outlined"
											value={this.state.period}
											onChange={this.handleChange}
											input={
												<OutlinedInput
													labelWidth={this.state.labelWidth}
													name="period"
													id="period"
												/>
											}
											className={classes.textField}
											MenuProps = {{
												classes:{paper: classes.dropdownMenu},
											}}
										>
											{this.state.periods.map((p, index)=>{
												return (<MenuItem key={index} value={p}>{p}</MenuItem>)
											})}
										</Select>
								)}
                                        <TextField
                                                margin="none"
                                                label="Chargeback date"
                                                name="ChargebackDate"
                                                type="date"
                                                variant="outlined"
                                                value={this.state.chargeBackDate}
                                                onChange={this.handleChange}
                                                fullWidth
                                                required
                                                className={classes.textField}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.input1,
                                                    },
                                                }}
                                                InputLabelProps = {{
                                                    shrink: true,
                                                    classes: {outlined: classes.label}
                                                }}
                                            />
                                            {/* <TextField
                                                margin="none"
                                                label="Year"
                                                name="Year"
                                                type="date"
                                                variant="outlined"
                                                value={this.state.Year}
                                                onChange={this.handleChange}
                                                fullWidth
                                                required
                                                InputProps={{
                                                    classes: {
                                                        input: classes.input1,
                                                    },
                                                }}
                                                InputLabelProps = {{
                                                    shrink: true,
                                                    classes: {outlined: classes.label}
                                                }}
                                            /> */}
									{/* <TextField sm={3} select margin="dense" id="InitiatedBy" label="Initiated By"
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
									</TextField> */}

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

								 <div className="flex flex-col w-full pr-6 pl-6">
										<TextField margin="dense" variant="outlined" fullWidth id="Notes" label="Notes" multiline rows="9" rowsMax="9"
											InputLabelProps={{ shrink: true }}
											value={this.state.Notes || ''}
											name= "Notes"
											onChange={this.handleChange}
										/>
									</div>
								{/*
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
>>>>>>> f82e0e5c86862c3d4fa8a6dc93a1038a28f5fb90
										/>
									}
									className={classes.textField}
									MenuProps = {{
										classes:{paper: classes.dropdownMenu},
									}}
								>
								</Select>
							</GridItem>
                            <GridItem xs={12} sm={4} md={4} className="flex flex-row ">
								<TextField
									margin="none"
									label="Month"
									name="Month"
									type="date"
									variant="outlined"
									value={this.state.Month}
									onChange={this.handleChange}
									fullWidth
									required
									className={classes.textField}
									InputProps={{
										classes: {
											input: classes.input1,
										},
									}}
									InputLabelProps = {{
										shrink: true,
										classes: {outlined: classes.label}
									}}
								/>
							</GridItem>
                            <GridItem xs={12} sm={4} md={4} className="flex flex-row ">
								<TextField
									margin="none"
									label="Year"
									name="Year"
									type="date"
									variant="outlined"
									value={this.state.Year}
									onChange={this.handleChange}
									fullWidth
									required
									InputProps={{
										classes: {
											input: classes.input1,
										},
									}}
									InputLabelProps = {{
										shrink: true,
										classes: {outlined: classes.label}
									}}
								/>
							</GridItem>
							<GridItem className="flex flex-col w-full pr-6 pl-6">
								<TextField margin="dense" variant="outlined" fullWidth id="Notes" label="Notes" multiline rows="9" rowsMax="9"
									InputLabelProps={{ shrink: true }}
									value={this.state.Notes || ''}
									onChange={this.handleChange('Notes')}
								/>
							</GridItem>
						</GridContainer>
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

		showProcessModalForm: Actions.showProcessModalForm,

		getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		customerCollectionCreate: Actions.customerCollectionCreate,
	}, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth, chargebacks }) {
	return {
		regionId: auth.login.defaultRegionId,
		bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		activePaymentRows: accountReceivablePayments.activePaymentRows,

		payments: accountReceivablePayments.ACC_payments,

		filterParam: accountReceivablePayments.filterParam,
		searchText: accountReceivablePayments.searchText,

		paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

        logCallModalForm: customers.logCallModalForm,
        processModalForm: chargebacks.processModalForm,
		lists: customers.lists,
        activeCustomer: customers.activeCustomer,
        all_regions: auth.login.all_regions,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessModalForm)));