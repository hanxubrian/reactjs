import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// core components
import { Divider, AppBar, Tabs, Tab, SnackbarContent } from '@material-ui/core';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';

import CustomersDocumentUploadTable from "./documentUploadTable";

import AccountOfferingPage from './form/account-offering/AccountOfferingPage';
import FinderFeePage from './form/finders-fees/NewFindersFeePage'
import ServiceAgreementPage from './form/service-agreement/ServiceAgreementPage'
import FranchiseeDistributionPage from './form/franchisee-distribution/FranchiseeDistributionPage'
import WalkThruPage from './form/walk-thru/WalkThruPage'
import TransactionsPage from './form/transactions/TransactionsPage'

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';

const hexToRgb = (hex) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const styles = theme => ({

	root: {
		width: '90%',
		'& .ReactTable .rt-noData': {
			top: '250px',
			border: '1px solid coral'
		},
		'& .ReactTable .rt-thead.-headerGroups': {
			paddingLeft: '0!important',
			paddingRight: '0!important',
			minWidth: 'inherit!important'
		},
		'& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
			background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
			color: 'white!important'
		},
	},
	backButton: {
		marginRight: theme.spacing.unit
	},
	completed: {
		display: 'inline-block'
	},
	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	//////////////////
	layoutForm: {
		flexDirection: 'row',
	},
	button: {
		marginRight: theme.spacing.unit,
		'& span': {
			textTransform: 'none'
		},
		margin: theme.spacing.unit
	},
	card: {
		width: '100%',
	},
	container: {
		position: 'relative',
		width: '100%'
	},
	formControl: {
		marginBottom: 24,
		minWidth: 200,
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 10,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
		maxHeight: 200,
		overflowY: 'scroll'
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	divider: {
		height: theme.spacing.unit * 2,
	},
	cardHeader: {
		backgroundColor: theme.palette.secondary.main,
		padding: '10px 24px',
		'& span': {
			color: 'white'
		}
	},
	tableTheadRow: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
	},

});

const newCustomerState = {
	"MasterTrxTypeListId": "",
	"RegionId": "",
	"RegionName": "",
	"CustomerId": "",
	"CustomerNo": "",
	"CustomerDate": "",
	"DueDate": "",
	// "CustomerId": "",
	// "CustomerNo": "",
	"CustomerName": "",
	"EBill": "",
	"PrintCustomer": "",
	"CustomerDescription": "",
	"CustomerAmount": "",
	"CustomerTax": "",
	"CustomerTotal": "",
	"CPI": "",
	"TransactionStatusListId": "",
	"TransactionStatus": "",
	"CustomerBalanceAmount": "",
	"CustomerBalanceTax": "",
	"CustomerBalanceTotal": "",
	"EBillText": "",
	"PrintCustomerText": "",
	"IsOpen": "",
	"ConsolidatedCustomer": "",
	"ConsolidatedCustomerId": "",
	"ConsolidatedCustomerNo": "",
	"CreditId": "",
	"Service": ""
};

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const Upload_Document_headers = [
	{
		id: 'documentName',
		numeric: false,
		disablePadding: false,
		label: 'Document Name'
	},
	{
		id: 'uploadDateTime',
		numeric: false,
		disablePadding: false,
		label: 'Upload Date Time'
	},
	{
		id: 'browse',
		numeric: false,
		disablePadding: false,
		label: 'Browse'
	},
];

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
	const { classes, className, message, message1, message2, message3, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={classNames(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classNames(classes.message)}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					<div className='flex flex-col flex-1'>
						<div id="client-snackbar" className={classNames(classes.message)}>
							<span><strong>{message}</strong></span>&nbsp;&nbsp;&nbsp;
							<span><small>{message1}</small></span>
						</div>
						{message2 && <div id="client-snackbar" className={classes.message}>
							{message2}
						</div>}
						{message3 && <div id="client-snackbar" className={classes.message}>
							<small>{message3}</small>
						</div>}
					</div>
				</span>
			}
			action={[
				// <IconButton
				// 	key="close"
				// 	aria-label="Close"
				// 	color="inherit"
				// 	className={classes.close}
				// 	onClick={onClose}
				// >
				// 	<CloseIcon className={classes.icon} />
				// </IconButton>,
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

// const GridRootComponent = props => <Grid.Root {...props} style={{ height: '100%' }} />;
class CustomerForm extends Component {
	state = {
		temp: [],
		data: [],
		docs: [],
		customers: [],
		...newCustomerState,
		value: '',
		suggestions: [],
		selectedCustomer: null,
		labelWidth: 0,
		selectedWork: "",

		activeStep: 0,
		completed: new Set(),
		skipped: new Set(),


		pageSizes: [5, 10, 20, 30, 50, 100],
		pageSize: 20,
		searchValue: '',
		selection: [],
		sorting: [
			{ columnName: 'Number', direction: 'asc' }
		],

		account_offering_step: 0,

	};
	getSteps() {
		// return ['Service Agreement', 'Franchisee Distribution', 'Billing', 'Cleaning Schedule', "Walk-Thru", "Account Offering", "Documents", "Marketing", "Account History", "Finders Fees"];
		if (this.props.customerForm.type === "new") {
			return ['Service Agreement', 'Account Offering'];
		}
		return ['Service Agreement', "Account Offering", 'Franchisee Distribution', "Walk-Thru", "Account History", "Transactions"];
	}

	//
	// to edit table cell
	//
	commitChanges = ({ added, changed, deleted }) => {
		console.log("commitChanges");
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

	getStepContent(step) {
		const { classes } = this.props;
		const steps = this.getSteps();
		let execTitles = []
		if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
			execTitles = this.props.accountExecutiveList.Data.filter(x => {
				if (x.Title === null) return false
				return true
			}).map(x => {
				return x.FirstName + " " + x.LastName
			}).sort();
		}

		switch (steps[step]) {
			case 'Service Agreement':
				return (
					<ServiceAgreementPage />
				);
			case 'Franchisee Distribution':
				return (
					<FranchiseeDistributionPage />
				);
			case 'Walk-Thru':
				return (
					<WalkThruPage />
				);
			case 'Account Offering':
				const { account_offering_step } = this.state

				return (<AccountOfferingPage step={account_offering_step} />)
			case 'Documents':
				return (
					<Fragment>
						<div style={{ marginTop: '30px' }}></div>
						<div className="flex">
							<CustomersDocumentUploadTable tableType="DOCUMENT_UPLOADING" documents={this.props.documents} headers={Upload_Document_headers} />
						</div>
					</Fragment>
				)
			case 'Marketing':
				return (<Fragment></Fragment>)
			case 'Account History':
				return (<Fragment></Fragment>)
			case 'Finders Fees':
				return (<FinderFeePage />)
			case 'Transactions':
				return <TransactionsPage />
			default:
				return 'Unknown step';
		}
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue.toString()
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		if (value.length < 2) return;

		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	getSuggestionValue = (suggestion) => {
		this.setState({ selectedCustomer: suggestion });
		return suggestion.CustomerName;
	};

	getSuggestions = (value) => {
		const escapedValue = escapeRegexCharacters(value.trim());
		const regex = new RegExp(escapedValue, 'i');

		return this.props.customers.filter(customer => regex.test(customer.CustomerName));
	};

	closeComposeForm = () => {
		this.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
	};

	constructor(props) {
		super(props);
		if (!props.documents) {
			// props.getDocuments();
		}
		this.changeSelection = selection => this.setState({ selection });
		this.changeSorting = sorting => this.setState({ sorting });
		this.changeSearchValue = value => this.setState({ searchValue: value });
		if (props.findersFeeTypes === null)
			props.getFinderFeeTypes();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.activeStep !== prevProps.activeStep)
			this.setState({ activeStep: this.props.activeStep });
	}

	componentWillMount() {
		this.initCustomerInfo()
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
			this.initCustomerInfo(nextProps.activeCustomer)
		}
	}

	initCustomerInfo = (activeCustomerInfo = this.props.activeCustomer) => {
		if (activeCustomerInfo && activeCustomerInfo.Data) {
			this.setState({
				SA_Amount: activeCustomerInfo.Data.cont_bill,
			})
		}
	};

	componentDidMount() {
		// this.getDocuments()
		if (this.InputLabelRef) {
			this.setState({
				labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
			});
		}
	}

	getDocuments = (rawData = this.props.documents) => {
		let all_docs = [];
		if (rawData === null || rawData === undefined) return;
		let documents = rawData.Data.filter(x => x);

		all_docs = [...all_docs, ...rawData.Data]
		this.setState({
			docs: all_docs
		});
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	canBeSubmitted() {
		return true;
	}

	//////////////////////
	totalSteps = () => {
		return this.getSteps().length;
	};

	handleNext = () => {
		let activeStep;

		if (this.isLastStep() && !this.allStepsCompleted()) {
			// It's the last step, but not all steps have been completed
			// find the first step that has been completed
			const steps = this.getSteps();
			activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
		}
		else {
			activeStep = this.state.activeStep + 1;
		}
		this.setState({
			activeStep
		});
	};

	handleReset = () => {
		this.setState({
			activeStep: 0,
			completed: new Set(),
			skipped: new Set()
		});
	};

	skippedSteps() {
		return this.state.skipped.size;
	}

	completedSteps() {
		return this.state.completed.size;
	}

	allStepsCompleted() {
		return this.completedSteps() === this.totalSteps() - this.skippedSteps();
	}

	isLastStep() {
		return this.state.activeStep === this.totalSteps() - 1;
	}

	handleTab = (event, activeStep) => {
		this.setState({ activeStep });
		this.props.updateCustomersParameter('activeStep', activeStep);
	};
	//////////////////////
	render() {
		const { classes } = this.props;
		const steps = this.getSteps();
		const { activeStep } = this.state;

		let customerStatusMsg = "", customerStatus = "", customerStatusMsg1 = '', customerStatusMsg2 = '', customerStatusMsg3 = ''


		if (this.props.activeCustomer && this.props.activeCustomer.Data) {
			switch (this.props.activeCustomer.Data.flag) {
				case "A":
					customerStatus = "success"
					customerStatusMsg = "Active Customer"
					break
				case "S":
					customerStatus = "warning"
					customerStatusMsg = `Suspended: `
					customerStatusMsg1 = this.props.activeCustomer.Data.susp_date

					const suspend_id = this.props.activeCustomer.Data.susp_reason_id
					const suspend_reason = this.props.suspendReasons.Data.find(x => x.ReasonNumber === parseInt('0' + suspend_id))
					customerStatusMsg2 = suspend_reason ? suspend_reason.name : `UNKNOWN (${suspend_id})`
					break
				case "C":
					customerStatus = "error"
					customerStatusMsg = `Canceled: `
					customerStatusMsg1 = this.props.activeCustomer.Data.canc_date

					const cancel_id = this.props.activeCustomer.Data.canreason
					const cancel_reason = this.props.cancelReasons.Data.find(x => x.ReasonNumber === parseInt('0' + cancel_id))
					customerStatusMsg2 = cancel_reason ? cancel_reason.name : `UNKNOWN (${cancel_id})`

					customerStatusMsg3 = `${this.props.activeCustomer.Data.candescr}`
					break
				default:
					customerStatus = "info"
					customerStatusMsg = `${this.props.activeCustomer.Data.flag} - Unknown Status`
					break
			}
		}

		return (
			<Fragment>
				<AppBar position="static" color="default">
					<Tabs
						value={activeStep}
						onChange={this.handleTab}
						indicatorColor="primary"
						textColor="primary"
						scrollable
						scrollButtons="auto"
					>
						{steps.map((x) =>
							(<Tab key={x} label={x} />)
						)}
					</Tabs>
				</AppBar>


				<div className={classNames(classes.layoutTable, "flex flex-col p-24 w-full h-full")} style={{ overflowY: 'scroll' }}>
					<div className="flex w-full justify-between align-items">
						<h2 style={{ alignSelf: 'center' }} >{activeStep === 1 ? 'Franchisee Revenue Distribution' : steps[activeStep]}</h2>
						<div className="flex align-items">

							{this.props.customerForm.type === 'edit' && (this.props.activeCustomer && this.props.activeCustomer.Data) &&
								<MySnackbarContentWrapper
									variant={customerStatus}
									className={classes.margin}
									message={customerStatusMsg}
									message1={customerStatusMsg1}
									message2={customerStatusMsg2}
									message3={customerStatusMsg3}
								/>
							}
						</div>
					</div>

					<Divider variant="middle" style={{ marginTop: 12, marginBottom: 12 }} />

					{this.getStepContent(activeStep)}
				</div>
			</Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getFranchisees: Actions.getFranchisees,
		openNewCustomerForm: Actions.openNewCustomerForm,
		closeNewCustomerForm: Actions.closeNewCustomerForm,
		openEditCustomerForm: Actions.openEditCustomerForm,
		closeEditCustomerForm: Actions.closeEditCustomerForm,
		getDocuments: Actions.getDocuments,
		updateCustomersParameter: Actions.updateCustomersParameter,
		getFinderFeeTypes: Actions.getFinderFeeTypes,
	}, dispatch);
}

function mapStateToProps({ customers, franchisees, auth }) {
	return {
		customers: customers.customersDB,
		bLoadedFranchisees: franchisees.bLoadedFranchisees,
		regionId: auth.login.defaultRegionId,
		customerForm: customers.customerForm,
		documents: customers.customersDocuments,

		statusId: franchisees.statusId,
		Longitude: franchisees.Longitude,
		Latitude: franchisees.Latitude,
		Location: franchisees.Location,
		SearchText: franchisees.SearchText,

		accountExecutiveList: customers.accountExecutiveList,
		activeCustomer: customers.activeCustomer,
		activeStep: customers.activeStep,
		findersFeeTypes: customers.findersFeeTypes,

		cancelReasons: customers.cancelReasons,
		suspendReasons: customers.suspendReasons,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerForm)));

