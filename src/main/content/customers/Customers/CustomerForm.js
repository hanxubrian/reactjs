import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
	TextField, Button, MenuItem, Divider, FormControlLabel,
	AppBar, Checkbox, Tabs, Tab, Switch, InputAdornment, SnackbarContent, Snackbar, IconButton, Icon
} from '@material-ui/core';

// theme components
import { FuseAnimate } from '@fuse';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";

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
import FranchiseeDistributionPage from './form/service-agreement/FranchiseeDistributionPage'

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
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
			return ['Service Agreement', 'Franchisee Distribution', "Account Offering"];
		}
		return ['Service Agreement', 'Franchisee Distribution', "Walk-Thru", "Account Offering", "Account History"];
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
					<Fragment>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="date"
									id="Date"
									label="Date"
									className={classNames(classes.textField, "mr-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.Date}
									onChange={this.handleChange('Date')}
									margin="dense"
									variant="outlined"
									fullWidth
									style={{ width: "20%", minWidth: "180px" }}
								/>
								<TextField
									type="date"
									id="WalkThroughDate"
									label="Walk Through Date"
									className={classNames(classes.textField, "mr-6 ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.WalkThroughDate}
									onChange={this.handleChange('WalkThroughDate')}
									margin="dense"
									variant="outlined"
									fullWidth
									style={{ width: "20%", minWidth: "180px" }}
								/>
								<TextField
									type="date"
									id="StartDate"
									label="Start Date"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.StartDate}
									onChange={this.handleChange('StartDate')}
									margin="dense"
									variant="outlined"
									fullWidth
									style={{ width: "20%", minWidth: "180px" }}
								/>

							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="FranchiseName"
									label="Franchise Name"
									className={classes.textField}
									value={this.state.FranchiseName}
									onChange={this.handleChange('FranchiseName')}
									margin="dense"
									variant="outlined"
									style={{ minWidth: '100px', width: '30%' }}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<h3 style={{ marginTop: 20 }}>Location Checklist</h3>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.LightSwitches} onChange={this.handleChange('LightSwitches')} value={this.state.LightSwitches} />}
									label="Light Switches?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.BreakersPanel} onChange={this.handleChange('BreakersPanel')} value={this.state.BreakersPanel} />}
									label="Breaker's Panel?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.ContactsOffice} onChange={this.handleChange('ContactsOffice')} value={this.state.ContactsOffice} />}
									label="Contact's Office?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.StorageAreas} onChange={this.handleChange('StorageAreas')} value={this.state.StorageAreas} />}
									label="Storage Areas?"
									style={{ width: '100%' }}
								/>

							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.WaterSource} onChange={this.handleChange('WaterSource')} value={this.state.WaterSource} />}
									label="Water Source?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.TrashDisposal} onChange={this.handleChange('TrashDisposal')} value={this.state.TrashDisposal} />}
									label="Trash Disposal?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.Recycling} onChange={this.handleChange('Recycling')} value={this.state.Recycling} />}
									label="Recycling?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.AccountSupplies} onChange={this.handleChange('AccountSupplies')} value={this.state.AccountSupplies} />}
									label="Account Supplies?"
									style={{ width: '100%' }}
								/>

							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<h3 style={{ marginTop: 20 }}>Security Checklist</h3>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.KeyEntry} onChange={this.handleChange('KeyEntry')} value={this.state.KeyEntry} />}
									label="Key? Entry:"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.AlarmSystem} onChange={this.handleChange('AlarmSystem')} value={this.state.AlarmSystem} />}
									label="Alarm System"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.RestroomPaperDispensers} onChange={this.handleChange('RestroomPaperDispensers')} value={this.state.RestroomPaperDispensers} />}
									label="Restroom Paper Dispensers?"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="SecurityProcedures"
									label="Security Procedures?"
									className={classes.textField}
									value={this.state.SecurityProcedures}
									onChange={this.handleChange('SecurityProcedures')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="EmergencyNamesAndTelephoneNumbers1"
									label="Emergency Names And Telephone Numbers 1"
									className={classes.textField}
									value={this.state.EmergencyNamesAndTelephoneNumbers1}
									onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers1')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="EmergencyNamesAndTelephoneNumbers2"
									label="Emergency Names And Telephone Numbers 2"
									className={classes.textField}
									value={this.state.EmergencyNamesAndTelephoneNumbers2}
									onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers2')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="ProblemConnernsAreasNeedingImprovment"
									label="Problem, connerns, areas needing improvment and general comments?"
									multiline
									rows="2"
									rowsMax="2"
									className={classes.textField}
									value={this.state.ProblemConnernsAreasNeedingImprovment}
									onChange={this.handleChange('ProblemConnernsAreasNeedingImprovment')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</GridItem>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<h3 style={{ marginTop: 20, width: '100%' }}>Paperwork Checklist</h3>
								<h3 style={{ marginTop: 20, width: '100%' }}>Signatures</h3>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<GridItem xs={12} sm={12} md={12} className="flex flex-col" style={{ justifyContent: 'space-evenly' }}>
									<FormControlLabel
										control={<Switch checked={this.state.SignedMaintenaceAgreement} onChange={this.handleChange('SignedMaintenaceAgreement')} value={this.state.SignedMaintenaceAgreement} />}
										label="1. Signed Maintenace Agreement?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.SignedPricePage} onChange={this.handleChange('SignedPricePage')} value={this.state.SignedPricePage} />}
										label="2. Signed Price Page?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.SignedCleaningSchedule} onChange={this.handleChange('SignedCleaningSchedule')} value={this.state.SignedCleaningSchedule} />}
										label="3. Signed Cleaning Schedule?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.AnalysisOfAccount} onChange={this.handleChange('AnalysisOfAccount')} value={this.state.AnalysisOfAccount} />}
										label="4. Analysis Of Account?"
										style={{ width: '100%' }}
									/>
									<FormControlLabel
										control={<Switch checked={this.state.AccountBidSheet} onChange={this.handleChange('AccountBidSheet')} value={this.state.AccountBidSheet} />}
										label="5. Account Bid Sheet?"
										style={{ width: '100%' }}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12} className="flex flex-col" style={{ justifyContent: 'space-evenly' }}>
									<TextField
										id="SignatureAE"
										label="A.E."
										className={classes.textField}
										value={this.state.SignatureAE}
										onChange={this.handleChange('SignatureAE')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureOPS"
										label="OPS"
										className={classes.textField}
										value={this.state.SignatureOPS}
										onChange={this.handleChange('SignatureOPS')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureRD"
										label="R.D."
										className={classes.textField}
										value={this.state.SignatureRD}
										onChange={this.handleChange('SignatureRD')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										id="SignatureFO"
										label="F.O."
										className={classes.textField}
										value={this.state.SignatureFO}
										onChange={this.handleChange('SignatureFO')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
								</GridItem>
							</GridItem>


							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.UploadedDocuments} onChange={this.handleChange('UploadedDocuments')} value={this.state.UploadedDocuments} />}
									label="Uploaded Documents?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.EmailedToCustomerService} onChange={this.handleChange('EmailedToCustomerService')} value={this.state.EmailedToCustomerService} />}
									label="Emailed to Customer Service?"
									style={{ width: '100%' }}
								/>

								<FormControlLabel
									control={<Switch checked={this.state.BussinessCardAttached} onChange={this.handleChange('BussinessCardAttached')} value={this.state.BussinessCardAttached} />}
									label="Bussiness Card Attached?"
									style={{ width: '100%' }}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={12} className="flex flex-row">
								<FormControlLabel
									control={<Switch checked={this.state.TransactionCompletedAndSentToFranchiseAccounting} onChange={this.handleChange('TransactionCompletedAndSentToFranchiseAccounting')} value={this.state.TransactionCompletedAndSentToFranchiseAccounting} />}
									label="Transaction A Completed and Sent to Franchise Accounting?"
									style={{ width: '100%' }}
								/>
							</GridItem>
						</GridContainer>

					</Fragment>
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
			props.getDocuments();
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

		let customerStatusMsg = "", customerStatus = ""
		switch (this.props.activeCustomer.Data.flag) {
			case "A":
				customerStatus = "success"
				customerStatusMsg = "Active Customer"
				break
			case "S":
				customerStatus = "warning"
				customerStatusMsg = "Suspended Customer"
				break
			case "C":
				customerStatus = "error"
				customerStatusMsg = "Canceled Customer"
				break
			default:
				customerStatus = "info"
				customerStatusMsg = `${this.props.activeCustomer.Data.flag} - Unknown Status`
				break
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


				<div
					className={classNames(classes.layoutTable, "p-24 w-full h-full")}
					style={{
						overflowY: 'scroll',
						width: '100%',
						height: 'calc(100% - 50px)'
					}}
				>
					<div className="flex w-full justify-between align-items">
						<h2 style={{ alignSelf: 'center' }} >{activeStep === 1 ? 'Franchisee Revenue Distribution' : steps[activeStep]}</h2>
						<div className="flex align-items">
							
							<MySnackbarContentWrapper
								variant={customerStatus}
								className={classes.margin}
								message={customerStatusMsg}
							/>
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

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerForm)));

