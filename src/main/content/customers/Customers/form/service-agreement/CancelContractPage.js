import React, { Fragment } from 'react';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'
import moment from 'moment';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import {
	Icon, IconButton, Slide, FormControlLabel, Paper, Typography, InputAdornment, MenuItem, Divider, Snackbar, SnackbarContent,
	ListItemLink, Checkbox, Switch
} from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import PropTypes from 'prop-types';
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
import { CustomizedDxGridSelectionPanel } from "./../../../../common/CustomizedDxGridSelectionPanel";

//Snackbar
const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

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
	descriptionText: {
		fontSize: 13
	}
})

const styles1 = theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});


function MySnackbarContent(props) {
	const { classes, className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={classNames(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

MySnackbarContent.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

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
	<IconButton onClick={onExecute} title="Edit">
		<EditIcon />
	</IconButton>
);

const DeleteButton = ({ onExecute }) => (
	// <IconButton onClick={onExecute} title="Delete">
	<IconButton onClick={onExecute} title="Stop">
		<Icon>call_missed_outgoing</Icon>
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
		// background: "#989898",
		// color: "white",
		padding: 0,
	}
});
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
		// background: "#989898",
		// color: "white",
	}
});
const tableHeaderCellComponentBase = props => {
	return (<TableHeaderRow.Cell {...props}

	/>);
};

const EditingHeaderCellComponentBase = props => {
	return (<TableEditColumn.Cell {...props}

	/>);
};

const EditingHeaderCellComponent = withStyles(header_cell_styles, { name: "EditingCell" })(
	EditingHeaderCellComponentBase
);


const CurrencyFormatter = ({ value }) => (<span>$ {parseFloat(`0${value}`).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$2/$3/$1');
let cancelationbox = false;
class CancelContractPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// bOpenPaymentDialog: props.bOpenPaymentDialog,
			columns: [
				{
					title: "No.",
					name: "dlr_code",
					columnName: "dlr_code",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Franchisees Name",
					name: "company_no",
					columnName: "company_no",
					width: 220,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_amtfin",
					name: "ff_amtfin",
					columnName: "ff_amtfin",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_amtpaid",
					name: "ff_amtpaid",
					columnName: "ff_amtpaid",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_down",
					name: "ff_down",
					columnName: "ff_down",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_dwnamt",
					name: "ff_dwnamt",
					columnName: "ff_dwnamt",
					width: 130,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_factor",
					name: "ff_factor",
					columnName: "ff_factor",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_interes",
					name: "ff_interes",
					columnName: "ff_interes",
					width: 120,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_pyamt",
					name: "ff_pyamt",
					columnName: "ff_pyamt",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_pybill",
					name: "ff_pybill",
					columnName: "ff_pybill",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_pytotl",
					name: "ff_pytotl",
					columnName: "ff_pytotl",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_dwnpd",
					name: "ff_dwnpd",
					columnName: "ff_dwnpd",
					width: 50,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "dwn_take",
					name: "dwn_take",
					columnName: "dwn_take",
					width: 50,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "add_on",
					name: "add_on",
					columnName: "add_on",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "calc_fact",
					name: "calc_fact",
					columnName: "calc_fact",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_tot",
					name: "ff_tot",
					columnName: "ff_tot",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_adjtot",
					name: "ff_adjtot",
					columnName: "ff_adjtot",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ffcredit",
					name: "ffcredit",
					columnName: "ffcredit",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ffduetot",
					name: "ffduetot",
					columnName: "ffduetot",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ffcont",
					name: "ffcont",
					columnName: "ffcont",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_balance",
					name: "ff_balance",
					columnName: "ff_balance",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_hold",
					name: "ff_hold",
					columnName: "ff_hold",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "ff_desc",
					name: "ff_desc",
					columnName: "ff_desc",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
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
			selection: [],
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

			EffectiveDate: moment().format('YYYY-MM-DD'),
			SA_Amount: '',
			note: '',
			increaseReasons: null,
			decreaseReasons: null,
			// cancelationReasons: null,

			bReasonForHigh: false,
			reason: 0,
			NewAmount: this.props.NewAmount,
			snackMessage: "",
			openSnack: false,
		};
		// this._isMounted = false;
		// this.commitChanges = this.commitChanges.bind(this);
		// if (!props.bLoadedFranchisees) {
		// 	props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		// }

		// this.props.getLogCallCustomerServiceTypes()

		// this.props.getFranchiseeServiceTypes(this.props.regionId)
		// this.props.getFranchiseeBillingTypes(this.props.regionId)
	}

	componentWillMount() {
		console.log("componentWillMount")
		// this.props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		// this.getFranchiseesFromStatus();

		// this.setRowData(this.props.payments)

		// this.setState({
		// 	customerServiceTypes: this.props.lists.customerServiceTypes,
		// 	franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
		// 	franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
		// })
		this.initFindersFeesRow()

	}
	componentDidMount() {
		this.initCustomerInfo();
		// this._isMounted = true;
		// fetch(`https://apifmsplusplus_mongo.jkdev.com/v1/Lists/reasons?type=account_cancellation`)
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		this._isMounted && this.setState({ cancelationReasons: data.Data })
		// 	});

		// this.setState({
		// 	paymentDlgPayloads: this.props.paymentDlgPayloads,
		// 	PaymentAmount: this.props.paymentDlgPayloads.paymentAmount,
		// 	PaymentType: this.props.paymentDlgPayloads.paymentType
		// })

		// if (this.props.bOpenPaymentDialog === true) {
		// 	this.checkValidations()
		// }
	}
	componentWillUnmount() {
		// this._isMounted = false;
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
		// if (nextProps.regionId !== this.props.regionId) {
		// 	this.props.getFranchiseeServiceTypes(nextProps.regionId)
		// 	this.props.getFranchiseeBillingTypes(nextProps.regionId)
		// }
		// if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
		// 	this.initCustomerInfo(nextProps.activeCustomer)
		// }
		// if (!_.isEqual(this.props.franchisees, nextProps.franchisees)) {
		// 	this.getFranchiseesFromStatus(nextProps.franchisees);
		// }



	}

	initFindersFeesRow(raw = this.props.findersFees) {
		if (!raw || !raw.Data) return

		this.setState({
			rows: raw.Data
		})
	}

	initCustomerInfo = (activeCustomerInfo = this.props.activeCustomer) => {
		if (activeCustomerInfo && activeCustomerInfo.Data)
			this.setState({
				SA_Amount: activeCustomerInfo.Data.cont_bill,
				franchieesesToOffer: activeCustomerInfo.Data.AssignedFranchisees,
			})
	};

	validateCancellation = () => {
		if (true) {
			this.setState({
				snackMessage: 'Processed Cancellation',
				openSnack: true
			});
			return true;
		}

		return true;
	};

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

		this.props.showCancelContractPage(false)

	};

	handleChangeChecked = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
			errorMsg: ""
		});

		console.log(event.target.value);
		if (name === "PaymentAmount") {
			// this.setState({
			// 	overpayment: this.getOverpaymentAmount(this.state.rows, event.target.value)
			// })
		}
		// this.checkValidations(name, event.target.value)
	};

	handleUpdateParameter = (name) => {
		this.props.updateCustomersParameter(name, this.state[name]);
		if (this.state.NewAmount > this.state.SA_Amount)
			this.setState({ bReasonForHigh: true });
		else
			this.setState({ bReasonForHigh: false });

	};

	handleChange1 = (event) => {
		this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
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

	getFranchiseesFromStatus = (rawData = this.props.franchisees) => {
		let rows = [];

		if (!rawData || !rawData.Data || !rawData.Data.Region) return;

		rawData.Data.Region.forEach((x, index) => {
			rows = [...rows, ...x.Franchisees]
		})
		this.setState({ rows })


		// this.setState({ temp: data });
		// this.setState({ data: data });
	};

	ToolbarRootBase = ({ children, classes, className, ...restProps }) => (
		<Toolbar.Root
			className={classNames(className, classes.franchiseeGridToolbar)}
			style={{ flexDirection: "row-reverse" }}
			{...restProps}

		>
			{/* <Button variant="contained" onClick={this.addFranchiseeToCustomer} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon>add</Icon>Add</Button> */}

			{children}
		</Toolbar.Root>
	);
	ToolbarRoot = withStyles(styles)(this.ToolbarRootBase);

	addFranchiseeToCustomer = () => {
		const { selection, rows } = this.state;
        /*
            AssignedDate: "05/31/2012"
            CreatedById: 0
            FranchiseeNumber: "701011"
            MonthlyBilling: Array(1)
            0:
            BillingFrequency: "R"
            BillingTypeId: "5c41e517d2963319d486a19b"
            BillingTypeServiceId: "5c537995d723510cd898f3e0"
            Description: "MONTHLY CLEANING SERVICE"
            EscrowBilling: true
            MonthlyBilling: 28671.77
            Status: "Active"
            __proto__: Object
            length: 1
            __proto__: Array(0)
            Status: "Active"
        */
		let selectedFranchisees = selection.map(x => rows[x])
		selectedFranchisees.forEach(x => {

			x.AssignedDate = "05/31/2012";
			x.CreatedById = 0;
			x.FranchiseeNumber = x.Number;
			x.MonthlyBilling = [{
				BillingFrequency: "R",
				BillingTypeId: "",
				BillingTypeServiceId: "",
				Description: "",
				EscrowBilling: false,
				MonthlyBilling: 0,
				Status: "Active",
			}];
			x.Status = "Active"
		});

		this.setState({
			franchieesesToOffer: [
				...this.state.franchieesesToOffer,
				...selectedFranchisees
			]
		})

	};

	changeSelection = selection => {
		this.setState({ selection });
	};

	saveCancelContract = () => {
		let CustomerNo = this.props.activeCustomer.Data.cust_no;
		let customerId = this.props.activeCustomer.Data._id;

		const { reason, note, client_credit_amount, canc_fee, continue_findersfee } = this.state

		let EffectiveDate = moment(this.state.EffectiveDate).format('mm/dd/yyyy');
		let lastday_service = moment(this.state.lastday_service).format('mm/dd/yyyy');

		this.props.saveCancelContract(this.props.regionId, CustomerNo, EffectiveDate, reason, note, lastday_service, client_credit_amount, canc_fee, continue_findersfee, customerId);
		// regionId, cust_no, cancel_date, reason_id, reason_note, lastday_service, client_credit_amount, canc_fee, continue_findersfee

		// this.props.updateCustomersParameter('NewAmount', 0);
		// this.setState({ reason: '', notes: '', NewAmount: '', EffectiveDate: moment().format('YYYY-MM-DD') });
		// this.props.getCustomer(this.props.regionId, this.props.activeCustomer.Data._id);
		this.validateCancellation()

	};

	renderReasons() {
		const { classes } = this.props;
		let items = this.props.cancelReasons.Data;
		// if (this.state.bReasonForHigh)
		// 	items = this.state.increaseReasons;
		// console.log("cancelationReasons", items)
		return (
			<TextField margin="dense" id="Reason" label="Reason" name="reason"
				select
				InputLabelProps={{ shrink: true }}
				value={this.state.reason || 0}
				onChange={this.handleChange('reason')}
				className={classNames(classes.textField, "pl-6 flex-1")}
				InputProps={{ readOnly: false }}
				SelectProps={{
					MenuProps: {
						className: classes.menu,
					},
				}}
			>
				{items.map((x, index) => (
					<MenuItem key={index} value={x.ReasonNumber}>{x.name}</MenuItem>)
				)}
			</TextField>
		)
	};

	EditingCellComponentBase = ({ children, row, ...restProps }) => {
		return (<TableEditColumn.Cell row={row} {...restProps}>
			{children}
			<TableEditColumn.Command
				id="custom"
				text="Stop"
				onExecute={() => {
					this.stopFindersfees(row.cust_no);
				}} // action callback
			/>
		</TableEditColumn.Cell>);
	};

	EditingCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
		this.EditingCellComponentBase
	);

	stopFindersfees(row) {
		this.props.stopFindersfees(this.props.regionId, row._id)
	}

	getFindersFeesGrid() {
		const { classes } = this.props;
		const {
			searchValue,
			pageSizes,
			sorting,
			selection,
			rows,
			columns,
		} = this.state;
		return (
			<Paper className={classNames("flex flex-col h-full p-6 w-full")} style={{ height: "auto", overflowX: "scroll" }}>
				<div className="w-full h-full">
					{/* grid area */}
					<Grid rows={rows} columns={columns}>
						<SearchState value={searchValue} onValueChange={this.changeSearchValue} />
						<IntegratedFiltering />
						<SelectionState selection={selection} onSelectionChange={this.changeSelection} />
						<PagingState defaultCurrentPage={0} defaultPageSize={10} />
						<PagingPanel pageSizes={pageSizes} />
						<IntegratedSelection />
						<SortingState sorting={sorting} onSortingChange={this.changeSorting} columnExtensions={columns} />
						<IntegratedSorting />
						<IntegratedPaging />
						<EditingState
							// columnExtensions={editingColumnExtensions}
							onCommitChanges={this.commitChanges} />
						<Table />
						{/* <VirtualTable height="auto" /> */}

						<TableColumnResizing defaultColumnWidths={columns} />

						<TableSelection showSelectAll selectByRowClick highlightRow />
						<TableHeaderRow showSortingControls />
						<TableEditColumn width={60} cellComponent={this.EditingCellComponent} headerCellComponent={EditingHeaderCellComponent}></TableEditColumn>
						<Toolbar rootComponent={this.ToolbarRoot} />
						<SearchPanel />
						<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />
					</Grid>

				</div>
			</Paper>

		)
	}

	getNewAmountInputForm() {
		const { classes } = this.props;
		const {
			franchiseeBillingTypes,
			franchiseeServiceTypes
		} = this.state

		const franHeaders = [
			{ width: 12, title: 'Number', field: 'Number' },
			{ width: 22, title: 'Name', field: 'Name' },
			{ width: 15, title: 'Billing', field: '' },
			{ width: 15, title: 'Service', field: '' },
			{ width: 25, title: 'Description', field: '' },
			{ width: 10, title: 'Amount', field: '' },
		]

		return (
			<div className='flex flex-col w-full'>
				<div className={classNames("flex mt-12 justify-between")}>

					<Typography variant="h6">Cancellation</Typography>

					<div className="flex">
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">keyboard_arrow_left</Icon>Prev</Button>
						<Button variant="contained" onClick={this.saveCancelContract} color="primary" className={classNames("pl-24 pr-24 mr-12")} style={{ background: '#ec3c3c' }}>Proceed</Button>
					</div>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						open={this.state.openSnack}
						autoHideDuration={2000}
						onClose={this.handleClose}
					>
						<MySnackbarContentWrapper
							onClose={this.handleClose}
							variant="success"
							message={this.state.snackMessage}
						/>
					</Snackbar>

				</div>

				{/* <div className={classNames("flex mt-12")}>
                    <TextField margin="dense" id="SA_Amount" label="Current Contract Amount" value={this.state.SA_Amount}
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               style={{ minWidth: 200 }}
                               InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix}}
                    />
                </div> */}

				<div className={classNames("flex mt-12 justify-start")}>
					{/* <TextField margin="dense" id="NewAmount" label="New Amount"
                               InputLabelProps={{ shrink: true }}
                               required
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ readOnly: false,
                                   startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix
                               }}
                               value={this.state.NewAmount || ''}
                               onChange={this.handleChange("NewAmount")}
                               onBlur={()=>this.handleUpdateParameter('NewAmount')}
                               autoFocus
					/> */}

					<TextField
						type="date"
						id="EffectiveDate"
						label="Effective Date"
						className={classNames(classes.textField, 'ml-24')}
						InputLabelProps={{ shrink: true }}
						value={this.state.EffectiveDate || ''}
						onChange={this.handleChange('EffectiveDate')}
						margin="dense"
					/>

					{/* {this.state.cancelationReasons && this.renderReasons()} */}
					{this.renderReasons()}

				</div>
				<div className={classNames("flex mt-12 justify-start")}>
					<TextField
						type="date"
						id="lastday_service"
						label="Last Day of Service"
						className={classNames(classes.textField, 'ml-24')}
						value={this.state.lastday_service || ''}
						margin="dense"
						onChange={this.handleChange('lastday_service')}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						id="client_credit_amount"
						label="Client Credit"
						placeholder="Amount"
						type="number"
						multiline
						className={classNames(classes.textField, 'ml-24 mr-24')}
						margin="dense"
						value={this.state.client_credit_amount || ''}
						onChange={this.handleChange('client_credit_amount')}
						InputLabelProps={{ shrink: true }}
					/>

					<Checkbox
						checked={this.state.enabled_cancelation_fee || false}
						onChange={this.handleChangeChecked('enabled_cancelation_fee')}
						style={{ marginTop: 14 }}
					/>
					<TextField
						disabled={!this.state.enabled_cancelation_fee}
						id="canc_fee"
						label="Cancelation Fee"
						placeholder="Amount Fee"
						type="number"
						value={this.state.enabled_cancelation_fee ? (this.state.canc_fee || '') : ''}
						onChange={this.handleChange('canc_fee')}
						className={classNames(classes.textField, 'mr-24')}
						InputLabelProps={{ shrink: this.state.enabled_cancelation_fee }}
						margin="dense"
					/>
					<Checkbox
						checked={this.state.continue_findersfee || false}
						onChange={this.handleChangeChecked('continue_findersfee')}
						style={{ marginTop: 14 }} />
					<font
						style={{ alignSelf: 'center', marginTop: 14 }}>Stop Finders Fee
					</font>
					{/*<TextField*/}
					{/*id="cancelfindersfee"*/}
					{/*label="Stop Finders Fee"*/}
					{/*placeholder="Stop Finders Fee Amount"*/}
					{/*type="number"*/}
					{/*onChange={this.handleChange('cancelfindersfee')}*/}
					{/*className={classNames(classes.textField, 'mr-24')}*/}
					{/*margin="dense"*/}
					{/*/>*/}

				</div>
				<div className={classNames("flex mt-12 justify-start w-full")}>
					<TextField
						id="note"
						name="note"
						label="Note"
						className={classes.textField}
						value={this.state.note || ''}
						onChange={this.handleChange('note')}
						margin="dense"
						variant="outlined"
						fullWidth
						multiline
						InputLabelProps={{
							shrink: true,
							classes: { outlined: classes.label }
						}}
						InputProps={{
							classes: {
								input: classes.input, multiline: classes.input
							},
						}}
						rows={3}
					/>
				</div>

				<div className={classNames("flex flex-col")}>
					<Divider variant="middle" style={{ marginTop: 10, marginBottom: 10, width: '50%', alignSelf: 'center' }} />
					<Typography variant="subtitle1">Finders Fees</Typography>
					{this.getFindersFeesGrid()}
				</div>
			</div>
		)
	}

	render() {
		const { classes } = this.props;
		const { customerServiceTypes, step } = this.state;

		return (

			<div className={classNames("flex flex-col")}>
				{this.getNewAmountInputForm()}
			</div>

		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		// openPaymentDialog: Actions.openPaymentDialog,
		// createAccountReceivablePayment: Actions.createAccountReceivablePayment,

		showCancelContractPage: Actions.showCancelContractPage,

		// getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
		getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
		getFranchisees: Actions.getFranchisees,
		updateCustomersParameter: Actions.updateCustomersParameter,
		// getIncreaseDecrease: Actions.getIncreaseDecrease,
		getCustomer: Actions.getCustomer,

		saveCancelContract: Actions.saveCancelContract,
		stopFindersfees: Actions.stopFindersfees,

	}, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth, franchisees }) {
	return {
		regionId: auth.login.defaultRegionId,

		statusId: franchisees.statusId,
		Longitude: franchisees.Longitude,
		Latitude: franchisees.Latitude,
		Location: franchisees.Location,
		SearchText: franchisees.SearchText,
		bLoadedFranchisees: franchisees.bLoadedFranchisees,

		// bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		// activePaymentRows: accountReceivablePayments.activePaymentRows,

		// payments: accountReceivablePayments.ACC_payments,

		// filterParam: accountReceivablePayments.filterParam,
		// searchText: accountReceivablePayments.searchText,

		// paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

		lists: customers.lists,
		franchieesesToOffer: customers.franchieesesToOffer,
		activeCustomer: customers.activeCustomer,
		findersFees: customers.findersFees,
		cancelReasons: customers.cancelReasons,

		franchisees: franchisees.franchiseesDB,
		NewAmount: customers.NewAmount,
		// increase_decrease: customers.increase_decrease,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CancelContractPage)));
