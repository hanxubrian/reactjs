import React, { Fragment } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'

import {
	Icon, Tooltip, Button, TextField, FormControlLabel, Paper, Typography, InputAdornment, MenuItem, Divider,
	ListItemLink, Checkbox, Switch, Fab, Snackbar, SnackbarContent, IconButton,
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
		this.getFranchiseesFromStatus();

		this.setRowData(this.props.payments)
		this.initCustomerInfo();

		this.setState({
			customerServiceTypes: this.props.lists.customerServiceTypes,
			franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
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
		if (nextProps.regionId !== this.props.regionId) {
			this.props.getFranchiseeServiceTypes(nextProps.regionId)
			this.props.getFranchiseeBillingTypes(nextProps.regionId)
		}
		if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
			this.initCustomerInfo(nextProps.activeCustomer)
		}
		if (!_.isEqual(this.props.franchisees, nextProps.franchisees)) {
			this.getFranchiseesFromStatus(nextProps.franchisees);
		}
	}

	initCustomerInfo = (activeCustomer = this.props.activeCustomer) => {
		this.setState({
			SA_Amount: activeCustomer.Data.cont_bill,
			franchieesesToOffer: activeCustomer.Data.AssignedFranchisees,
		});
		this.props.updateFindersFeeParams({
			FranchiseeNum: activeCustomer.Data.AssignedFranchisees.length > 0 ? activeCustomer.Data.AssignedFranchisees[0].FranchiseeNumber : '',
			CustomerNum: activeCustomer.Data.cust_no, RegionId: this.props.regionId, CalculationMethodCode: 'S'
		});

		activeCustomer.Data.AssignedFranchisees.forEach((x, index) => {
			if (x.FinderFeeId) {
				this.props.getFinderFee(this.props.regionId, x.FinderFeeId)
			}
		})

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
			<Button variant="contained" onClick={this.addFranchiseeToCustomer} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">add</Icon>Add</Button>

			{children}
		</Toolbar.Root>
	);
	ToolbarRoot = withStyles(styles)(this.ToolbarRootBase);

	addFranchiseeToCustomer = () => {
		const { selection, rows } = this.state;
		let selectedFranchisees = selection.map(x => rows[x])
		let newFranchisees = selectedFranchisees.map(x => {
			let temp = {};
			temp.AssignedDate = moment().format('MM/DD/YYYY');
			temp.CreatedById = this.props.userId;
			temp.FranchiseeNumber = x.Number;
			temp.FranchiseeName = x.Name;
			temp.Id = x.Id;
			temp.MonthlyBilling = [{
				BillingFrequency: "R",
				BillingTypeId: "",
				BillingTypeServiceId: "",
				Description: "",
				EscrowBilling: false,
				MonthlyBilling: 0,
				Status: "Active",
			}];
			temp.Status = "Active";
			return temp;
		});

		const franchieesesToOffer = [...this.state.franchieesesToOffer, ...newFranchisees]
		// if (this.props.activeCustomer) {
		this.setState({ franchieesesToOffer });

		//
		this.props.updateActiveCustomerAssignedFranchisees(franchieesesToOffer)
		// } else {
		// 	if (this.state.franchieesesToOffer) {
		// 		this.setState({
		// 			franchieesesToOffer: [
		// 				...this.state.franchieesesToOffer,
		// 				...newFranchisees
		// 			]
		// 		});
		// 	}
		// 	else {
		// 		this.setState({
		// 			franchieesesToOffer: [
		// 				...newFranchisees
		// 			]
		// 		});
		// 	}
		// }
	};

	changeSelection = selection => {
		this.setState({ selection });
	};

	handleStep = (step) => {
		this.setState({
			step
		})
	}
	saveAssignedFranchiseeDistributions = () => {
		const { activeCustomer } = this.props

		this.props.updateAssignedFranchisee(this.props.regionId, activeCustomer.Data.cust_no, this.state.franchieesesToOffer)
		this.setState({ openSnack: true });

	};

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
		];

		return (
			<>
				<div className={classNames("flex mt-12 justify-between")}>

					<TextField margin="dense" id="SA_Amount" label="Current Contract Amount" value={this.state.SA_Amount}
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						style={{ minWidth: 200 }}
						InputProps={{
							readOnly: true, startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
					/>

					<div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						<Button variant="contained" onClick={this.handleStepFranchiseeDistribution}
							disabled={this.state.NewAmount === ''}
							color="primary" className={classNames("pl-24 pr-24 mr-12")}>Franchisee Revenue Distributions<Icon fontSize="small">keyboard_arrow_right</Icon></Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Cancel</Button>
					</div>

				</div>

				<div className={classNames("flex mt-12 justify-start")}>
					<TextField margin="dense" id="NewAmount" label="New Amount"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							readOnly: false,
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("NewAmount")}
						autoFocus
					/>
					{this.state.decreaseReasons !== null && this.state.increaseReasons !== null && (
						this.renderReasons())}

					<TextField
						type="date"
						id="EffectiveDate"
						label="Effective Date"
						className={classNames(classes.textField, 'ml-24')}
						InputLabelProps={{ shrink: true }}
						value={this.state.EffectiveDate}
						onChange={this.handleChange('EffectiveDate')}
						margin="dense"
					/>
				</div>
				<div className={classNames("flex mt-12 justify-start w-full")}>
					<TextField
						id="notes"
						name="notes"
						label="Note"
						className={classes.textField}
						value={this.state.notes}
						onChange={this.handleChange1}
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
			</>
		)
	}

	handleMonthlyBilling = (fId, mId, name) => event => {
		const value = name === 'EscrowBilling' ? event.target.checked : event.target.value

		let newFranchieesesToOffer = _.clone(this.state.franchieesesToOffer)
		newFranchieesesToOffer[fId].MonthlyBilling[mId][name] = value

		this.setState({
			franchieesesToOffer: newFranchieesesToOffer
		})
	};

	handleUpdateAssignedFranchisees = () => {
		this.props.updateActiveCustomerAssignedFranchisees(this.state.franchieesesToOffer);
	};

	gotoFindersFee = async (FranchiseeNum, AmountPayableOn) => {
		await this.props.updateFindersFeeParams({ FranchiseeNum, AmountPayableOn: parseFloat(AmountPayableOn) });
		// this.props.updateCustomersParameter('activeStep', this.props.customerForm.type === "edit" ? 7 : 3);
		this.handleStep(1)

	};

	removeFranchiseeMonthly = async (fId, mId) => {
		let newFranchieesesToOffer = _.clone(this.state.franchieesesToOffer)
		newFranchieesesToOffer[fId].MonthlyBilling.splice(mId, 1)
		//
		// if monthly count is ZERO, remove the franchisee
		//
		if (newFranchieesesToOffer[fId].MonthlyBilling.length === 0) {
			newFranchieesesToOffer.splice(fId, 1)
		}

		this.setState({
			franchieesesToOffer: newFranchieesesToOffer
		})
	};
	backToFranchiseeList = () => {
		this.props.setStep(1)
	}
	getFranchiseeAssignmentForm() {
		const { classes } = this.props;

		const {
			franchiseeBillingTypes,
			franchiseeServiceTypes,

			franchieesesToOffer,
			step,
		} = this.state;

		const franchieesesListToOffer = this.props.activeStep === 1 ? this.props.franchieesesToOffer : this.state.franchieesesToOffer
		console.log('franchieesesListToOffer', this.props.franchieesesToOffer, this.state.franchieesesToOffer, franchieesesListToOffer)
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
						<Button variant="contained" color="primary" className={classNames("pl-24 pr-24 mr-12")}>{this.props.customerForm.type === 'edit' ? 'Update' : 'Save'}</Button>
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

					<div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						{this.props.customerForm.type === "edit" && <Button variant="contained" onClick={() => this.saveAssignedFranchiseeDistributions()} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Update</Button>}
						{/*<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Cancel</Button>*/}
					</div>
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

					{franchieesesListToOffer && franchieesesListToOffer.map((x, index) => (
						// <React.Fragment key={index}>
						<div key={index} className={classNames("flex flex-col w-full")} style={{ alignItems: 'bottom' }}>
							<div className={classNames("flex w-full items-center")} style={{ alignItems: 'bottom' }}>
								<Typography style={{ width: franHeaders[0].width + '%', alignSelf: 'center' }} variant="caption">{x.Number}</Typography>
								<Typography style={{ width: franHeaders[1].width + '%', alignSelf: 'center' }} variant="caption">{x.Name}</Typography>

								<div style={{ width: franHeaders[2].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[3].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[4].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[5].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[6].width + '%', alignSelf: 'center' }} />
								<div style={{ width: franHeaders[7].width + '%', alignSelf: 'center' }} />

								<div className=" text-center" style={{ width: franHeaders[8].width + '%' }}>
									{
										// m.MonthlyBilling > 0 &&
										<Tooltip title="Go to Finders Fee" aria-label="Go to Finders Fee">
											<Fab aria-label="remove"
												onClick={() => this.gotoFindersFee(x.Number, 123)} color="primary" className={classNames(classes.ffBtn, "mr-12")}>
												<Icon>arrow_forward</Icon>
											</Fab>
										</Tooltip>
									}
									<Tooltip title="Remove this franchisee" aria-label="Remove Franchisee">
										<Fab aria-label="remove"
											color="primary" className={classNames(classes.ffBtn, classes.lineCancelButton)}>
											<Icon>close</Icon>
										</Fab>
									</Tooltip>
								</div>
							</div>
							{
								x.MonthlyBilling && x.MonthlyBilling.map((m, mIndex) => (
									<div key={mIndex} className={classNames("flex w-full items-center")} style={{ alignItems: 'bottom' }}>

										<Typography style={{ width: franHeaders[0].width + '%', alignSelf: 'center' }} variant="caption">{mIndex === 0 ? x.FranchiseeNumber : '---'}</Typography>
										<Typography style={{ width: franHeaders[1].width + '%', alignSelf: 'center' }} variant="caption">{mIndex === 0 ? x.FranchiseeName : '---'}</Typography>

										<Checkbox style={{ width: franHeaders[2].width + '%', alignSelf: 'center' }}
											name="EscrowBilling"
											checked={m.EscrowBilling}
											onChange={this.handleMonthlyBilling(index, mIndex, 'EscrowBilling')}
											onBlur={() => this.handleUpdateAssignedFranchisees()}
										/>

										<TextField style={{ width: franHeaders[3].width + '%' }}
											margin="dense"
											className="pl-6"
											value={m.BillingFrequency}
											name="BillingFrequency"
											select
											InputProps={{
												readOnly: false,
												classes: {
													input: classes.descriptionText,
												},
											}}
											onChange={this.handleMonthlyBilling(index, mIndex, 'BillingFrequency')}
										>
											{[
												{ label: 'Variable', value: 'V' },
												{ label: 'Regular', value: 'R' },
											].map((x, index) => (<MenuItem key={index} value={x.value}>{x.label}</MenuItem>))}
										</TextField>

										<TextField style={{ width: franHeaders[4].width + '%' }}
											margin="dense"
											name='BillingTypeId'
											className="pl-6 hidden"
											value={m.BillingTypeId}
											select
											onChange={this.handleMonthlyBilling(index, mIndex, 'BillingTypeId')}
											InputProps={{
												readOnly: true,
												classes: {
													input: classes.descriptionText,
												},
											}}
										>
											{franchiseeBillingTypes.map((x, index) => (<MenuItem key={index} value={x._id}>{x.Name}</MenuItem>))}
										</TextField>

										<TextField style={{ width: franHeaders[5].width + '%' }}
											margin="dense"
											className="pl-6"
											value={m.BillingTypeServiceId}
											select
											InputProps={{
												readOnly: false,
												classes: {
													input: classes.descriptionText,
												},
											}}
											onChange={this.handleMonthlyBilling(index, mIndex, 'BillingTypeServiceId')}
										>
											{franchiseeServiceTypes.map((x, index) => (<MenuItem key={index} value={x._id}>{x.Name}</MenuItem>))}
										</TextField>

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

										<div className=" text-center" style={{ width: franHeaders[8].width + '%' }}>
											{
												// m.MonthlyBilling > 0 &&
												<Tooltip title="Go to Finders Fee" aria-label="Go to Finders Fee">
													<Fab aria-label="remove"
														onClick={() => this.gotoFindersFee(x.FranchiseeNumber, m.MonthlyBilling)} color="primary" className={classNames(classes.ffBtn, "mr-12")}>
														<Icon>arrow_forward</Icon>
													</Fab>
												</Tooltip>
											}
											<Tooltip title="Remove this franchisee" aria-label="Remove Franchisee">
												<Fab aria-label="remove"
													onClick={() => this.removeFranchiseeMonthly(index, mIndex)} color="primary" className={classNames(classes.ffBtn, classes.lineCancelButton)}>
													<Icon>close</Icon>
												</Fab>
											</Tooltip>
										</div>
									</div>
								))
							}

							< div className='flex mt-12' >
								<Typography variant='body2'><strong>Finders Fee:</strong></Typography>
								{
									this.props.finderFee[x.FinderFeeId] && <>
										<span className='pr-12'>{this.props.finderFee[x.FinderFeeId].calc_fact}</span>
										<span className='pr-12'>{this.props.finderFee[x.FinderFeeId].ff_desc}</span>
										<span className='pr-12'>{this.props.finderFee[x.FinderFeeId].ff_pybill}</span>
										<span className='pr-12'>{this.props.finderFee[x.FinderFeeId].ff_tot}</span>
										<span className='pr-12'>{this.props.finderFee[x.FinderFeeId].ff_balance}</span>
									</>
								}
							</div>
							<Divider variant="middle" className='mt-12 mb-12 w-full' style={{ alignSelf: 'center' }} />
							{/* </React.Fragment> */}
						</div>

					))}
				</div>
			</>
		)
	}

	getFranchiseesList() {
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
				<Typography variant='subtitle1'><strong>Franchisees</strong></Typography>
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

						<Toolbar rootComponent={this.ToolbarRoot} />
						<SearchPanel />
						<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />
					</Grid>

				</div>
			</Paper>

		)
	}

	handleSaveFindersFee = () => {
		console.log('saved');
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
	getFindersFeesForm_old() {
		const { classes } = this.props
		return (
			<>
				<div className={classNames("flex mt-12 justify-between")}>

					<TextField select margin="dense" id="CalculationMethod" label="Calculation Method"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField)}
						value={this.state.CalculationMethod || ''}
						onChange={this.handleChange('CalculationMethod')}
						style={{ minWidth: 250 }}
						InputProps={{ readOnly: false }}
					>
						{[
							"---",
							"***",
							"+++",
						].map((x, index) => (
							<MenuItem key={index} value={x}>{x}</MenuItem>
						))}
					</TextField>

					<TextField margin="dense" id="CalculationMethodNameDescription" label="Name / Description"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "ml-12")}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("NewAmount")}
						fullWidth
					/>

					<div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
						<Button variant="contained" onClick={this.handleStepFranchiseeDistribution} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">keyboard_arrow_left</Icon>Prev</Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Done</Button>
						<Button variant="contained" onClick={this.handleClose} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Cancel</Button>
					</div>

				</div>

				<div className={classNames("flex mt-12")}>
					<TextField margin="dense" id="MonthlyBillingAmount" label="Monthly Billing Amount"
						InputLabelProps={{ shrink: true }}
						sm={4}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("MonthlyBillingAmount")}
					/>
				</div>
				<div className={classNames("flex mt-12")}>
					<TextField margin="dense" id="FindersFeeCreditAmount" label="Finders Fee Credit Amount"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("FindersFeeCreditAmount")}
						sm={4}
					/>
				</div>
				<div className={classNames("flex mt-12")}>
					<TextField margin="dense" id="InitialBusinessCredit" label="Initial Business Credit"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.NewAmount || ''}
						onChange={this.handleChange("InitialBusinessCredit")}
						sm={4}
					/>
				</div>

				<div className={classNames("flex mt-12 justify-between items-center")}>
					<TextField margin="dense" id="MonthlyPayment" label="Monthly Payment"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.MonthlyPayment || ''}
						onChange={this.handleChange("MonthlyPayment")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>x</strong></Typography>

					<TextField margin="dense" id="NumberOfPayments" label="# Of Payments"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						value={this.state.NumberOfPayments || ''}
						onChange={this.handleChange("NumberOfPayments")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

					<TextField margin="dense" id="AmountFinanced" label="Amount Financed"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.AmountFinanced || ''}
						onChange={this.handleChange("AmountFinanced")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>+</strong></Typography>

					<TextField margin="dense" id="DownPayment" label="DownPayment"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.DownPayment || ''}
						onChange={this.handleChange("DownPayment")}
						sm={2}
					/>

					<Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

					<TextField margin="dense" id="ResultAmountFinanced" label="Amount Financed"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						InputProps={{
							startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
							inputComponent: NumberFormatCustomNoPrefix
						}}
						value={this.state.ResultAmountFinanced || ''}
						onChange={this.handleChange("ResultAmountFinanced")}
						sm={2}
					/>
				</div>

				<div className={classNames("flex mt-12")}>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.DownPaymentPaid}
								onChange={this.handleChange('DownPaymentPaid')}
								value="DownPaymentPaid"
							/>
						}
						label="Down Payment Paid?"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.IncludeDpWith1stPayment}
								onChange={this.handleChange('IncludeDpWith1stPayment')}
								value="IncludeDpWith1stPayment"
							/>
						}
						label="Include DP With 1st Payment?"
					/>
				</div>

				<div className={classNames("flex mt-12 flex-end")}>
					{/* <Button variant="contained" color="primary" className={classNames("pl-24 pr-24 mr-12")}>Multi-Tenant 100% Occuaoncy Input</Button> */}

					<TextField margin="dense" id="MultiTenant100OccuaoncyInput" label="Multi-Tenant 100% Occuaoncy Input"
						InputLabelProps={{ shrink: true }}
						className={classNames(classes.textField, "pr-6")}
						value={this.state.MultiTenant100OccuaoncyInput || ''}
						onChange={this.handleChange("MultiTenant100OccuaoncyInput")}
						fullWidth
						style={{ maxWidth: 300 }}
					/>

				</div>
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
						{/*{step === 0 && this.getNewAmountInputForm()}*/}
						{this.getFranchiseeAssignmentForm()}
						{/*{step === 2 && this.getFindersFeesForm()}*/}
					</div>

					{/* <div className={classNames("flex flex-col")}>
						<Divider variant="middle" style={{ marginTop: 10, marginBottom: 10, width: '50%', alignSelf: 'center' }} />
						{this.getFranchiseesList()}
					</div> */}

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

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseeDistributionPage)));
