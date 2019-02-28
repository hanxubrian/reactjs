import React, { Fragment } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'
import FuseUtils from '@fuse/FuseUtils';
import {
	Icon, Tooltip, Button, TextField, FormControlLabel, Paper, Typography, InputAdornment, MenuItem, Divider,
	ListItemLink, Checkbox, Switch, Fab, Snackbar, SnackbarContent, IconButton, FormControl, Select,
} from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

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


// third party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from "lodash";
import moment from 'moment';

import { CustomizedDxGridSelectionPanel } from "./../../../../common/CustomizedDxGridSelectionPanel";

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import NewFindersFeePage from '../finders-fees/NewFindersFeePage'
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
	},
	menu: {

	},
	ffBtn: {
		height: 24,
		width: 24,
		minHeight: 24,
		'& .material-icons': {
			fontSize: 16
		}
	},
	lineCancelButton: {
		width: 24,
		height: 24,
		minHeight: 24,
		backgroundColor: '#ff4850',
		color: 'white',
		'&:hover': {
			backgroundColor: '#ff2a32',
		},
		[theme.breakpoints.down('sm')]: {
			width: 24,
			height: 24,
			minHeight: 24,
			padding: 0
		},
		'& .material-icons': {
			fontSize: 16
		}
	},
});

const CurrencyFormatter = ({ value }) => (<span>$ {parseFloat(`0${value}`).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$2/$3/$1');

//Snackbar
const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const stylesSnackbar = theme => ({
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

const MySnackbarContentWrapper = withStyles(stylesSnackbar)(MySnackbarContent);


class FranchiseeDistributionPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// bOpenPaymentDialog: props.bOpenPaymentDialog,
			columns: [
				{
					title: "No.",
					name: "Number",
					columnName: "Number",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Franchisees Name",
					name: "Name",
					columnName: "Name",
					width: 220,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Signed",
					name: "Signed",
					columnName: "Signed",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Plan",
					name: "Plan",
					columnName: "Plan",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Accounts",
					name: "Accounts",
					columnName: "Accounts",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Billing",
					name: "Billing",
					columnName: "Billing",
					width: 130,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Cont Eval",
					name: "ContEval",
					columnName: "ContEval",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Group1 Total",
					name: "Group1Total",
					columnName: "Group1Total",
					width: 120,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Compliant",
					name: "Compliant",
					columnName: "Compliant",
					width: 100,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Fail Insp",
					name: "FailInsp",
					columnName: "FailInsp",
					width: 90,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Cancel",
					name: "Cancel",
					columnName: "Cancel",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Pend Cancel",
					name: "PendCancel",
					columnName: "PendCancel",
					width: 110,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Last Offered",
					name: "LastOffered",
					columnName: "LastOffered",
					width: 110,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Oblg",
					name: "Oblg",
					columnName: "Oblg",
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

			EffectiveDate: new Date().toISOString().substr(0, 10),
			SA_Amount: '',
			notes: '',
			increaseReasons: null,
			decreaseReasons: null,
			bReasonForHigh: false,
			reason: '',
			NewAmount: this.props.NewAmount,
			openSnack: false,
			snackMessage: 'Updated Franchisee Revenue Distributions',

			franchieesesToOffer: [],
		};
		// this.commitChanges = this.commitChanges.bind(this);
		if (!props.bLoadedFranchisees) {
			props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		}

		this.props.getLogCallCustomerServiceTypes()

		this.props.getFranchiseeServiceTypes(this.props.regionId)
		this.props.getFranchiseeBillingTypes(this.props.regionId)
	}

	componentWillMount() {
		this.props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		// this.getFranchiseesFromStatus();

		// this.setRowData(this.props.payments)

		this.initCustomerInfo();
		this.updateFranchiseesToOffer();

		this.setState({
			customerServiceTypes: this.props.lists.customerServiceTypes,
			franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes.sort(FuseUtils.dynamicSortBy("Name")),
			franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
		})

	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.NewAmount !== this.props.NewAmount)
			this.setState({ NewAmount: this.props.NewAmount });
	}
	componentDidMount() {
		// this.initCustomerInfo();

		// fetch(`https://apifmsplusplus_mongo.jkdev.com/v1/Lists/reasons?type=increase`)
		// 	.then(response => response.json())
		// 	.then(data => this.setState({ increaseReasons: data.Data }));

		// fetch(`https://apifmsplusplus_mongo.jkdev.com/v1/Lists/reasons?type=decrease`)
		// 	.then(response => response.json())
		// 	.then(data => this.setState({ decreaseReasons: data.Data }));

		// this.setState({
		// 	paymentDlgPayloads: this.props.paymentDlgPayloads,
		// 	PaymentAmount: this.props.paymentDlgPayloads.paymentAmount,
		// 	PaymentType: this.props.paymentDlgPayloads.paymentType
		// })
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// if (nextProps.payments !== this.props.payments) {
		// 	this.setRowData(nextProps.payments)
		// }
		// if (!_.isEqual(nextProps.activePaymentRows, this.props.activePaymentRows)) {
		// 	this.setRowData(this.props.payments, nextProps.activePaymentRows)
		// }
		// if (!_.isEqual(nextProps.paymentDlgPayloads, this.props.paymentDlgPayloads)) {
		// 	this.setState({
		// 		paymentDlgPayloads: nextProps.paymentDlgPayloads,
		// 		PaymentAmount: nextProps.paymentDlgPayloads.paymentAmount,
		// 		PaymentType: nextProps.paymentDlgPayloads.paymentType
		// 	})
		// }

		// if (nextProps.regionId !== this.props.regionId) {
		// 	this.props.getFranchiseeServiceTypes(nextProps.regionId)
		// 	this.props.getFranchiseeBillingTypes(nextProps.regionId)
		// }
		// if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
		// 	this.initCustomerInfo(nextProps.activeCustomer)
		// }
		// if (!_.isEqual(nextProps.franchieesesToOffer, this.props.franchieesesToOffer)) {
		// 	this.updateFranchiseesToOffer(nextProps.franchieesesToOffer)
		// }
		// if (!_.isEqual(this.props.franchisees, nextProps.franchisees)) {
		// 	this.getFranchiseesFromStatus(nextProps.franchisees);
		// }
	}

	updateFranchiseesToOffer(gridFrans = this.props.franchieesesToOffer) {
		let newFrans = []
		if (Array.isArray(gridFrans)) {
			newFrans = [...newFrans, ...gridFrans]
		}
		if (Array.isArray(this.props.activeCustomer.Data.AssignedFranchisees)) {
			newFrans = [...newFrans, ...this.props.activeCustomer.Data.AssignedFranchisees]
		}
		newFrans = _.cloneDeep(newFrans)
		this.setState({
			franchieesesToOffer: newFrans,
		});
		this.props.updateNewCustomerParam('AssignedFranchisees', newFrans)
		//
		//init selected grid
		//
		this.props.setFranchieesesToOffer([])

		// this.props.activeCustomer.Data.AssignedFranchisees && this.props.activeCustomer.Data.AssignedFranchisees.forEach((x, index) => {
		// 	if (x.FinderFeeId) {
		// 		this.props.getFinderFee(this.props.regionId, x.FinderFeeId)
		// 	}
		// })
	}

	initCustomerInfo = (activeCustomer = this.props.activeCustomer) => {
		this.setState({
			SA_Amount: activeCustomer.Data.cont_bill,
		});
	};

	handleClose = () => {
		this.props.showIncreaseDecreaseContractModalForm(false)
	};

	handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ openSnack: false });
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

	// setRowData(payments, activePaymentRows = this.props.activePaymentRows) {
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
			return {
				rows,
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
	};

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

	// getFranchiseesFromStatus = (rawData = this.props.franchisees) => {
	// 	let rows = [];

	// 	if (!rawData || !rawData.Data || !rawData.Data.Region) return;

	// 	rawData.Data.Region.forEach((x, index) => {
	// 		rows = [...rows, ...x.Franchisees]
	// 	})
	// 	this.setState({ rows })
	// };

	// ToolbarRootBase = ({ children, classes, className, ...restProps }) => (
	// 	<Toolbar.Root
	// 		className={classNames(className, classes.franchiseeGridToolbar)}
	// 		style={{ flexDirection: "row-reverse" }}
	// 		{...restProps}

	// 	>
	// 		<Button variant="contained" onClick={this.addFranchiseeToCustomer} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">add</Icon>Add</Button>

	// 		{children}
	// 	</Toolbar.Root>
	// );
	// ToolbarRoot = withStyles(styles)(this.ToolbarRootBase);

	// addFranchiseeToCustomer = () => {
	// 	const { selection, rows } = this.state;
	// 	let selectedFranchisees = selection.map(x => rows[x])
	// 	let newFranchisees = selectedFranchisees.map(x => {
	// 		let temp = {};
	// 		temp.AssignedDate = moment().format('MM/DD/YYYY');
	// 		temp.CreatedById = this.props.userId;
	// 		temp.FranchiseeNumber = x.Number;
	// 		temp.FranchiseeName = x.Name;
	// 		temp.Id = x.Id;
	// 		temp.MonthlyBilling = [{
	// 			BillingFrequency: "R",
	// 			BillingTypeId: "",
	// 			BillingTypeServiceId: "",
	// 			Description: "",
	// 			EscrowBilling: false,
	// 			MonthlyBilling: 0,
	// 			Status: "Active",
	// 		}];
	// 		temp.Status = "Active";
	// 		return temp;
	// 	});

	// 	const franchieesesToOffer = [...this.state.franchieesesToOffer, ...newFranchisees]
	// 	// if (this.props.activeCustomer) {
	// 	this.setState({ franchieesesToOffer });

	// 	//
	// 	this.props.updateActiveCustomerAssignedFranchisees(franchieesesToOffer)
	// 	// } else {
	// 	// 	if (this.state.franchieesesToOffer) {
	// 	// 		this.setState({
	// 	// 			franchieesesToOffer: [
	// 	// 				...this.state.franchieesesToOffer,
	// 	// 				...newFranchisees
	// 	// 			]
	// 	// 		});
	// 	// 	}
	// 	// 	else {
	// 	// 		this.setState({
	// 	// 			franchieesesToOffer: [
	// 	// 				...newFranchisees
	// 	// 			]
	// 	// 		});
	// 	// 	}
	// 	// }
	// };

	changeSelection = selection => {
		this.setState({ selection });
	};

	handleStep = (step) => {
		this.setState({
			step
		})
	}
	// saveAssignedFranchiseeDistributions = () => {
	// 	const { activeCustomer } = this.props

	// 	this.props.updateAssignedFranchisee(this.props.regionId, activeCustomer.Data.cust_no, this.state.franchieesesToOffer)
	// 	this.setState({ openSnack: true });

	// };

	handleStepFranchiseeDistribution = () => {
		this.handleStep(1)
	};

	handleStepFindersFeesForm = () => {
		this.handleStep(2)
	};

	renderReasons = () => {
		const { classes } = this.props;
		let items = this.state.decreaseReasons;
		if (this.state.bReasonForHigh)
			items = this.state.increaseReasons;

		return (
			<TextField margin="dense" id="Reason" label="Reason" name="reason"
				select
				InputLabelProps={{ shrink: true }}
				value={this.state.reason}
				onChange={this.handleChange1}
				className={classNames(classes.textField, "pl-6 flex-1")}
				InputProps={{ readOnly: false }}
				SelectProps={{
					MenuProps: {
						className: classes.menu,
					},
				}}
			>
				{items.map(item => (
					<MenuItem key={item.ReasonNumber} value={item.ReasonNumber}>
						{item.name}
					</MenuItem>
				)
				)}
			</TextField>
		)
	};

	handleMonthlyBilling = (fId, mId, name) => event => {
		let value;
		switch (name) {
			case "EscrowBilling":
				value = event.target.checked
				break;
			case "MonthlyBilling":
				value = parseFloat('0' + event.target.value)
				break;
			default:
				value = event.target.value
				break;
		}
		let newFranchieesesToOffer = _.cloneDeep(this.state.franchieesesToOffer)
		newFranchieesesToOffer[fId].MonthlyBilling[mId][name] = value
		console.log('handleMonthlyBilling', fId, mId, value, newFranchieesesToOffer)
		this.setState({
			franchieesesToOffer: newFranchieesesToOffer
		})
		this.props.updateNewCustomerParam('AssignedFranchisees', newFranchieesesToOffer)
	};

	// handleUpdateAssignedFranchisees = () => {
	// 	this.props.updateActiveCustomerAssignedFranchisees(this.state.franchieesesToOffer);
	// };

	gotoFindersFee = async (Franchisee, AmountPayableOn) => {
		await this.props.updateFindersFeeParams({
			FranchiseeNum: Franchisee.Number || Franchisee.FranchiseeNumber,
			AmountPayableOn: parseFloat(AmountPayableOn)
		});
		this.props.setActiveFranchisee(Franchisee)
		// this.props.updateCustomersParameter('activeStep', this.props.customerForm.type === "edit" ? 7 : 3);
		this.handleStep(1)
	};

	removeFranchiseeMonthly = async (fId, mId) => {
		let newFranchieesesToOffer = _.clone(this.state.franchieesesToOffer)
		newFranchieesesToOffer[fId].MonthlyBilling.splice(mId, 1)
		//
		// if monthly count is ZERO, remove the franchisee
		//
		// if (newFranchieesesToOffer[fId].MonthlyBilling.length === 0) {
		// 	newFranchieesesToOffer.splice(fId, 1)
		// }

		this.setState({
			franchieesesToOffer: newFranchieesesToOffer
		})

		this.props.updateNewCustomerParam('AssignedFranchisees', newFranchieesesToOffer)
	};
	removeFranchisee = (fId) => {
		let newFranchieesesToOffer = _.clone(this.state.franchieesesToOffer)
		newFranchieesesToOffer.splice(fId, 1)
		this.setState({
			franchieesesToOffer: newFranchieesesToOffer
		})
		this.props.updateNewCustomerParam('AssignedFranchisees', newFranchieesesToOffer)
	}
	backToFranchiseeList = () => {
		this.props.setStep(1)
	}
	addMonthlyBilling = (fIndex) => {
		const { franchieesesToOffer } = this.state
		let newMonthlyBilling = {
			"EscrowBilling": false,
			"Status": "Status",
			"BillingFrequency": "R",
			"BillingTypeServiceId": "0",
			"BillingTypeId": "0",
			"Description": "Description",
			"MonthlyBilling": 0
		}

		let newFranchieesesToOffer = [...franchieesesToOffer]
		let oldMonthlyBilling = newFranchieesesToOffer[fIndex].MonthlyBilling
		if (oldMonthlyBilling && oldMonthlyBilling.length > 0) {
			newFranchieesesToOffer[fIndex].MonthlyBilling = [...oldMonthlyBilling, newMonthlyBilling]
		} else {
			newFranchieesesToOffer[fIndex].MonthlyBilling = [newMonthlyBilling]
		}

		this.setState({
			franchieesesToOffer: newFranchieesesToOffer
		})

		this.props.updateNewCustomerParam('AssignedFranchisees', newFranchieesesToOffer)

	}
	getMonthlyBillingTotal(franchisee) {
		return franchisee.MonthlyBilling && franchisee.MonthlyBilling.length > 0 && franchisee.MonthlyBilling.map(x => x.MonthlyBilling).reduce((sum, a) => sum + a) || 0
	}
	getFranchiseeAssignmentForm() {
		const { classes } = this.props;

		const {
			franchiseeBillingTypes,
			franchiseeServiceTypes,

			franchieesesToOffer,
			step,
		} = this.state;

		franchieesesToOffer.forEach((x, index) => {
			if (!x.MonthlyBilling || x.MonthlyBilling.length === 0) {
				this.addMonthlyBilling(index)
			}
		})

		const franHeaders = [
			{ width: 7, title: 'Number', align: '', field: 'Number' },
			{ width: 18, title: 'Name', align: '', field: 'Name' },
			{ width: 5, title: 'Escrow', align: '', field: '' },
			{ width: 12, title: 'Billing Frequency', align: '', field: '' },
			{ width: 0, title: 'Billing', align: '', field: '' },
			{ width: 15, title: 'Service', align: '', field: '' },
			{ width: 24, title: 'Description', align: '', field: '' },
			{ width: 11, title: 'Amount', align: 'right', field: '' },
			{ width: 9, title: 'Action', align: 'center', field: '' },
		];

		return (
			<>
				<div className={classNames("flex mt-12 justify-between")}>
					<Typography variant="h6">Franchisee Distribution</Typography>

					<div className="flex" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						{this.props.activeStep === 1 && <Button variant="contained" onClick={this.backToFranchiseeList} className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">keyboard_arrow_left</Icon>Prev</Button>}
						{/* <Button variant="contained" color="primary" onClick={this.saveAssignedFranchiseeDistributions} className={classNames("pl-24 pr-24 mr-12")}>{this.props.customerForm.type === 'edit' ? 'Update' : 'Save'}</Button> */}
					</div>
				</div>

				<div className={classNames("flex mt-12 justify-between ")}>
					<TextField margin="dense" id="Monthly Billing Amount" label="New Monthly Billing Amount"
						InputLabelProps={{ shrink: true }}
						style={{ minWidth: 220 }}
						className={classNames(classes.textField, "pr-6 mb-24")}
						InputProps={{
							readOnly: true,
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix,
							classes: {
								input: classNames('text-right')
							}
						}}
						// value={this.props.activeCustomer && this.props.activeCustomer.Data ? this.props.activeCustomer.Data.cont_bill : ""}
						// onChange={this.handleChange("NewAmount")}
						value={this.props.activeCustomer.Data.cont_bill}
					/>

					{/* <div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						{this.props.customerForm.type === "edit" && <Button variant="contained" onClick={() => this.saveAssignedFranchiseeDistributions()} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Update</Button>}
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Cancel</Button>
					</div> */}
				</div>

				<Typography className="mb-12 mt-12 hidden" variant="subtitle1"><strong>Franchisee Revenue Distributions</strong></Typography>
				<div className={classNames("flex flex-col w-full")}>
					<div className={classNames("flex w-full")}>
						{franHeaders.map((f, findex) => {
							if (findex === 4) return false;
							return (
								<Typography key={findex} style={{ width: f.width + '%', textAlign: f.align }}
									variant="subtitle2">{f.title}</Typography>
							)
						})}
					</div>

					<Divider variant="middle" className='mb-12 w-full' style={{ alignSelf: 'center' }} />

					{franchieesesToOffer && franchieesesToOffer.map((x, index) => (
						<div key={index} className={classNames("flex flex-col w-full")} style={{ alignItems: 'bottom' }}>
							<div className={classNames("flex w-full items-center")} style={{ alignItems: 'bottom' }}>
								<Typography style={{ width: franHeaders[0].width + '%', alignSelf: 'center' }} variant="caption">{x.Number || x.FranchiseeNumber}</Typography>
								<Typography style={{ width: franHeaders[1].width + '%', alignSelf: 'center' }} variant="caption">{x.Name || x.FranchiseeName}</Typography>

								<div style={{ width: franHeaders[2].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[3].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[4].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[5].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[6].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[7].width + '%', alignSelf: 'center' }} />

								<div className=" text-center" style={{ width: franHeaders[8].width + '%' }}>
									<Tooltip title="Add monthly billing" aria-label="Add monthly billing">
										<Fab aria-label="add"
											color="primary" className={classNames(classes.ffBtn, "mr-6")}
											onClick={() => this.addMonthlyBilling(index)} >
											<Icon>add</Icon>
										</Fab>
									</Tooltip>

									<Tooltip title="Remove this franchisee" aria-label="Remove Franchisee">
										<Fab aria-label="remove"
											onClick={() => this.removeFranchisee(index)}
											color="primary" className={classNames(classes.ffBtn, classes.lineCancelButton)}>
											<Icon>close</Icon>
										</Fab>
									</Tooltip>
								</div>
							</div>
							{
								x.MonthlyBilling && x.MonthlyBilling.map((m, mIndex) => (
									<div key={mIndex} className={classNames("flex w-full items-center")} style={{ alignItems: 'bottom' }}>

										<Typography style={{ width: franHeaders[0].width + '%', alignSelf: 'center' }} variant="caption">-</Typography>
										<Typography style={{ width: franHeaders[1].width + '%', alignSelf: 'center' }} variant="caption">-</Typography>

										<Checkbox style={{ width: franHeaders[2].width + '%', alignSelf: 'center' }}
											name="EscrowBilling"
											checked={m.EscrowBilling}
											onChange={this.handleMonthlyBilling(index, mIndex, 'EscrowBilling')}
										// onBlur={() => this.handleUpdateAssignedFranchisees()}
										/>

										<FormControl className={classNames(classes.formControl, 'pl-6')} style={{ width: franHeaders[3].width + '%', marginTop: 2 }}>
											{/* <InputLabel shrink htmlFor="BillingFrequency">Billing Type</InputLabel> */}
											<Select
												native
												value={this.state.BillingFrequency || ''}
												onChange={this.handleMonthlyBilling(index, mIndex, 'BillingFrequency')}
												inputProps={{
													name: 'BillingFrequency',
													id: 'BillingFrequency',
												}}
											>
												{[
													{ label: 'Variable', value: 'V' },
													{ label: 'Regular', value: 'R' },
												].map((x, index) => (<option key={index} value={x.value}>{x.label}</option>))}
											</Select>
										</FormControl>

										{/* <FormControl className={classNames(classes.formControl, 'pl-6')} style={{ width: franHeaders[4].width + '%', marginTop: 2 }}>
											<Select
												native
												value={this.state.BillingTypeId || ''}
												onChange={this.handleMonthlyBilling(index, mIndex, 'BillingTypeId')}
												inputProps={{
													name: 'BillingTypeId',
													id: 'BillingTypeId',
												}}
											>
												{franchiseeBillingTypes.map((x, index) => (<option key={index} value={x._id}>{x.Name}</option>))}
											</Select>
										</FormControl> */}

										<FormControl className={classNames(classes.formControl, 'pl-6')} style={{ width: franHeaders[5].width + '%', marginTop: 2 }}>
											{/* <InputLabel shrink htmlFor="BillingTypeServiceId">Service Type</InputLabel> */}
											<Select
												native
												value={this.state.BillingTypeServiceId || ''}
												onChange={this.handleMonthlyBilling(index, mIndex, 'BillingTypeServiceId')}
												inputProps={{
													name: 'BillingTypeServiceId',
													id: 'BillingTypeServiceId',
												}}
											>
												{franchiseeServiceTypes.map((x, index) => (<option key={index} value={x._id}>{x.Name}</option>))}
											</Select>
										</FormControl>

										<TextField style={{ width: franHeaders[6].width + '%' }}
											margin="dense"
											className="pl-6"
											value={m.Description}
											onChange={this.handleMonthlyBilling(index, mIndex, 'Description')}
											InputProps={{
												classes: {
													input: classes.descriptionText,
												},
											}}
										/>
										<TextField style={{ width: franHeaders[7].width + '%' }}
											// type='number'
											InputProps={{
												readOnly: false,
												classes: {
													input: classNames(classes.descriptionText, 'text-right')
												},
												startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
												inputComponent: NumberFormatCustomNoPrefix
											}}
											margin="dense"
											className="pl-6"
											value={m.MonthlyBilling}
											onChange={this.handleMonthlyBilling(index, mIndex, 'MonthlyBilling')}
										/>

										<div className="text-center" style={{ width: franHeaders[8].width + '%' }}>
											{/* <Tooltip title="Remove this franchisee" aria-label="Remove Franchisee"> */}
											<Fab aria-label="remove"
												onClick={() => this.removeFranchiseeMonthly(index, mIndex)} color="primary" className={classNames(classes.ffBtn, classes.lineCancelButton)}>
												<Icon>remove</Icon>
											</Fab>
											{/* </Tooltip> */}
										</div>
									</div>
								))
							}

							< div className='flex mt-12 items-center' >
								<Typography variant='body2' style={{ width: '15%' }}><strong>Finders Fee:</strong></Typography>
								<div style={{ width: (100 - 15 - franHeaders[8].width - franHeaders[7].width) + '%' }}>
									{
										x.FinderFee && <>
											<span className='pr-12'>Fact: {x.FinderFee.calc_fact}</span>
											<span className='pr-12'>Desc: {x.FinderFee.ff_desc}</span>
											<span className='pr-12'>PayBill: {x.FinderFee.ff_pybill}</span>
											<span className='pr-12'>Total: {x.FinderFee.ff_tot}</span>
											<span className='pr-12'>Balance: {x.FinderFee.ff_balance}</span>
										</>
									}
								</div>
								<TextField style={{ width: franHeaders[7].width + '%' }}
									// type='number'
									InputProps={{
										readOnly: true,
										classes: {
											input: classNames(classes.descriptionText, 'text-right')
										},
										startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
										inputComponent: NumberFormatCustomNoPrefix
									}}
									margin="dense"
									className="pl-6"
									value={this.getMonthlyBillingTotal(x)}
								/>
								<div className="text-center" style={{ width: franHeaders[8].width + '%' }}>
									<Button variant="contained" onClick={() => this.gotoFindersFee(x, this.getMonthlyBillingTotal(x))}
										color="primary" className={classNames('')}>
										<Icon fontSize="small">queue</Icon>
									</Button>
								</div>

							</div>
							<Divider variant="middle" className='mt-12 mb-12 w-full' style={{ alignSelf: 'center' }} />
						</div>

					))}
				</div>
			</>
		)
	}

	handleSaveFindersFee = () => {
		const { activeFranchisee } = this.props
		const { franchieesesToOffer } = this.state

		let newFranchieesesToOffer = [...franchieesesToOffer]
		newFranchieesesToOffer[franchieesesToOffer.indexOf(activeFranchisee)] = activeFranchisee
		activeFranchisee.FinderFee = {
			...activeFranchisee.FinderFee,
			...this.props.findersFeeParams,
			calc_fact: this.props.findersFeeParams.CalculationMethodCode,
			ff_desc: '',
			ff_pybill: '',
			ff_tot: this.props.findersFeeParams.FinderFeeTotal,
			ff_balance: this.props.findersFeeParams.Balance,
		}


		this.setState({ franchieesesToOffer: newFranchieesesToOffer })
		this.props.updateNewCustomerParam('AssignedFranchisees', newFranchieesesToOffer)

		this.handleStep(0)
	};

	getFindersFeesForm() {
		return (
			<>
				<div className={classNames("flex mt-12 justify-between")}>
					<Typography variant="h6">Finders Fees</Typography>

					<div className="flex" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						<Button variant="contained" onClick={() => this.handleStep(0)} className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">keyboard_arrow_left</Icon>Prev</Button>
						<Button variant="contained" onClick={() => this.handleSaveFindersFee()} color="primary" className={classNames("pl-24 pr-24 mr-12")}>{this.props.customerForm.type === 'edit' ? 'Update' : 'Select This Plan'}</Button>
					</div>
				</div>

				<NewFindersFeePage />

			</>
		)
	}

	render() {
		const { classes } = this.props;
		const { customerServiceTypes, step } = this.state;

		return <>
			{step === 0 &&
				<>
					<div className={classNames("flex flex-col")}>
						{this.getFranchiseeAssignmentForm()}
					</div>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						open={this.state.openSnack}
						autoHideDuration={3000}
						onClose={this.handleCloseSnackBar}
					>
						<MySnackbarContentWrapper
							onClose={this.handleCloseSnackBar}
							variant="success"
							message={this.state.snackMessage}
						/>
					</Snackbar>
				</>
			}
			{step === 1 && this.getFindersFeesForm()}
		</>

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openPaymentDialog: Actions.openPaymentDialog,
		createAccountReceivablePayment: Actions.createAccountReceivablePayment,

		showIncreaseDecreaseContractModalForm: Actions.showIncreaseDecreaseContractModalForm,

		getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
		getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
		getFranchisees: Actions.getFranchisees,
		updateCustomersParameter: Actions.updateCustomersParameter,
		updateFindersFeeParams: Actions.updateFindersFeeParams,
		updateAssignedFranchisee: Actions.updateAssignedFranchisee,
		updateActiveCustomerAssignedFranchisees: Actions.updateActiveCustomerAssignedFranchisees,

		getComputedFinderFee: Actions.getComputedFinderFee,
		getFinderFee: Actions.getFinderFee,

		setActiveFranchisee: Actions.setActiveFranchisee,
		updateNewCustomerParam: Actions.updateNewCustomerParam,
		setFranchieesesToOffer: Actions.setFranchieesesToOffer,

	}, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth, franchisees }) {
	return {
		regionId: auth.login.defaultRegionId,
		userId: auth.login.UserId,

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

		increaseDecreaseContractModalForm: customers.increaseDecreaseContractModalForm,
		lists: customers.lists,
		franchieesesToOffer: customers.franchieesesToOffer,
		activeCustomer: customers.activeCustomer,
		customerForm: customers.customerForm,

		franchisees: franchisees.franchiseesDB,
		NewAmount: customers.NewAmount,
		assignedFranchisees: customers.assignedFranchisees,
		computedFinderFee: customers.computedFinderFee,
		finderFee: customers.finderFee,
		activeStep: customers.activeStep,

		activeFranchisee: customers.activeFranchisee,
		findersFeeParams: customers.findersFeeParams,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseeDistributionPage)));
