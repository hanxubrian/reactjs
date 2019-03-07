import React, { Component, Fragment } from 'react';
import _ from "lodash";
// core components
import { Icon, IconButton, Typography, Toolbar, CircularProgress, Menu, MenuItem, Checkbox, FormControlLabel, Tooltip, Button, Snackbar, SnackbarContent, } from '@material-ui/core';
// theme components
import { FusePageCustomSidebarScroll } from '@fuse';


import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import SummaryPanel from './SummaryPanel';
import FilterPanel from './FilterPanel';

// third party
// import moment from 'moment'
// import checkboxHOC from "react-table/lib/hoc/selectTable";
// import Chance from "chance";
// import ReactTable from "react-table";
import "react-table/react-table.css";
// import _ from 'lodash';


import classNames from 'classnames';

//table pagination
// import JanikingPagination from './../../../../Commons/JanikingPagination';

import CustomerForm from './CustomerForm';
import CustomerListContent from './CustomerListContent';
import DialogEmailToCustomer from './DialogEmailToCustomer';

import FuseUtils from '@fuse/FuseUtils';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomerSearchBar from './CustomerSearchBar';

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';

const headerHeight = 80;

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
		background: "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
		backgroundSize: 'cover',
	},
	layoutRoot: {
		flexDirection: 'row',
		'& .z-9999': {
			height: 64
		},
		'& .-pageSizeOptions': {
			display: 'none'
		},
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
		'& .openFilter': {
			width: 'inherit'
		},
		'& .openSummary': {
			width: 300
		},
		'& .ReactTable .rt-tbody': {
			overflowY: 'scroll',
			overflowX: 'hidden'
		},
		'& .ReactTable .rt-tr-group': {
			flex: '0 0 auto'
		},
		'& .ReactTable .rt-thead .rt-th:nth-child(1)': {
			justifyContent: 'center'
		},
		'& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
			width: 'inherit!important',
			minWidth: 'inherit!important',
		},
		'& .ReactTable .rt-thead .rt-th:last-child': {
			justifyContent: 'flex-end'
		},
		'& .p-12-impor': {
			paddingLeft: '1.2rem!important',
			paddingRight: '1.2rem!important',
		},
		'& .wordwrap': {
			whiteSpace: 'pre-line !important',
			wordWrap: 'break-word',
		}
	},
	card: {
		width: '100%',
		maxWidth: 384,
	},
	progress: {
		margin: theme.spacing.unit * 2,
	},
	layoutHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.secondary.main
	},
	layoutRightSidebar: {
		width: 0,
		[theme.breakpoints.down('sm')]: {
			width: 'inherit'
		}
	},
	layoutLeftSidebar: {
		width: 0,
		[theme.breakpoints.down('sm')]: {
			width: 'inherit'
		}
	},
	layoutSidebarHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		display: 'flex',
		alignItems: 'center',
		backgroundColor: theme.palette.secondary.main,
	},
	content: {
		position: 'relative'
	},
	addButton: {
		position: 'absolute',
		bottom: -28,
		left: 16,
		zIndex: 999,
		backgroundColor: theme.palette.primary.light,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	sideButton: {
		backgroundColor: theme.palette.primary.light,
		height: 46,
		width: 46,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	removeButton: {
		position: 'absolute',
		bottom: -28,
		right: 16,
		zIndex: 999,
		backgroundColor: theme.palette.secondary.light,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		}
	},
	imageIcon: {
		width: 24,
		height: 24
	},
	separator: {
		width: 1,
		height: '100%',
		backgroundColor: theme.palette.divider
	},
	search: {
		width: 360,
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
	},
	tableTheadRow: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
	},
	tableTdEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .1)'
	},
	filterPanelButton: {
		backgroundColor: theme.palette.secondary.main,
		minWidth: 42,
		padding: 8,
		justifyContent: 'center',
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	summaryPanelButton: {
		backgroundColor: theme.palette.secondary.main,
		minWidth: 42,
		padding: 8,
		color: 'white',
		justifyContent: 'center',
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100vh',
		backgroundColor: 'rgba(0,0,0, .9)',
		zIndex: 1000,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		opacity: 0.7
	},
	validationMenu: {
		color: "#07DF07",//green[600],
	},
	invalidationMenu: {
		color: "#FF557F",//green[600],
	},
});
// const defaultProps = {
// 	trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
// };
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

class Customers extends Component {
	// state = {
	// 	s: '',
	// 	temp: [],
	// 	data: [],
	// 	checkedPaid: true,
	// 	checkedPP: true,
	// 	checkedComplete: true,
	// 	checkedOpen: true,
	// 	selection: [],
	// 	selectAll: false,
	// 	regionId: 0,

	// 	current_lat:0,
	// 	current_long:0,
	// };

	constructor(props) {
		super(props);

		this.fetchData = this.fetchData.bind(this);

		this.state = {
			s: '',
			data: [],
			// checkedPaid: true,
			// checkedPP: true,
			// checkedComplete: true,
			// checkedOpen: true,
			selection: [],
			selectAll: false,


			current_lat: 0,
			current_long: 0,

			regionId: this.props.regionId,
			statusId: this.props.statusId,
			longitude: this.props.longitude,
			latitude: this.props.latitude,
			location: this.props.location,
			searchText: this.props.searchText,
			// loading: false,
			isSubmittingForApproval: false,

			tryingToCloseWithoutOffering: false,
			tryingToSubmitWithoutOffering: false,

			openSnack: false,
			snackIcon: 'success',
			snackMessage: 'Updated Franchisee Revenue Distributions',
		};
		console.log("constructor, Customer.js")

		if (!props.bLoadedCustomers) {
			this.props.getCustomers(
				this.props.regionId,
				this.props.statusId,
				this.props.filters.StatusNames,
				this.props.filters.AccountTypeListName,
				this.props.location,
				this.props.latitude,
				this.props.longitude,
				this.props.searchText);
		}

		this.props.getAccountTypeList();
		this.props.getAccountExecutiveList(this.props.regionId);
		this.props.getCustomerStatusList();
		this.props.getAccountTypesGroups();
	}

	closeComposeForm = () => {
		switch (this.props.customerForm.type) {
			case "new":
				this.props.closeNewCustomerForm()
				break;
			case "edit":
				this.props.closeEditCustomerForm()
				break;
		}
	};

	trySubmitForApproval = () => {

		if (!this.validation()) {
			this.setState({
				tryingToSubmitWithoutOffering: false,
			})
			return
		}
		if (this.props.activeCustomer.Data.contract_lenght === 1) {
			this.submitForApproval()
		} else {
			if (this.props.activeCustomer &&
				this.props.activeCustomer.Data &&
				this.props.activeCustomer.Data.AssignedFranchisees &&
				this.props.activeCustomer.Data.AssignedFranchisees.length > 0) {
				this.submitForApproval()
			} else {
				this.setState({
					tryingToSubmitWithoutOffering: true
				})
			}
		}
	}
	tryClose = () => {
		this.closeComposeForm()

		// if (this.props.activeCustomer && this.props.activeCustomer.Data && this.props.activeCustomer.Data.AccountOfferings && this.props.activeCustomer.Data.AccountOfferings.length > 0 ||
		// 	this.props.franchieesesToOffer && this.props.franchieesesToOffer.length > 0) {
		// 	this.closeComposeForm()
		// } else {
		// 	this.setState({
		// 		tryingToCloseWithoutOffering: true
		// 	})
		// }
	}

	validation() {
		let msg = ""
		if (!this.props.activeCustomer.Data.cus_name) {
			this.props.openSnackbar("Customer name is invalid")
			return false
		}

		if (!this.props.activeCustomer.Data.cus_addr ||
			!this.props.activeCustomer.Data.cus_city ||
			!this.props.activeCustomer.Data.cus_state ||
			!this.props.activeCustomer.Data.cus_zip) {
			this.props.openSnackbar("Customer address is invalid")
			return false
		}
		if (!this.props.activeCustomer.Data.cus_phone || this.props.activeCustomer.Data.cus_phone === "(∗∗∗) ∗∗∗-∗∗∗∗") {
			this.props.openSnackbar("Customer phone is invalid")
			return false
		}
		// if (!FuseUtils.validateEmail(this.props.activeCustomer.Data.email1)) {
		if (!this.props.activeCustomer.Data.email1) {
			this.props.openSnackbar("Email is invalid")
			return false
		}
		if (!this.props.activeCustomer.Data.cont_1) {
			this.props.openSnackbar("Contact(1) is invalid")
			return false
		}
		if (!this.props.activeCustomer.Data.bill_name) {
			this.props.openSnackbar("Billing name is invalid")
			return false
		}
		if (!this.props.activeCustomer.Data.bill_phone || this.props.activeCustomer.Data.bill_phone === "(∗∗∗) ∗∗∗-∗∗∗∗") {
			this.props.openSnackbar("Billing phone is invalid")
			return false
		}
		if ([0, 2].indexOf(this.props.activeCustomer.Data.contract_lenght) > -1 && this.props.activeCustomer.Data.cont_bill <= 0) {
			this.props.openSnackbar("Monthly contract amount is invalid")
			return false
		}

		return true
	}
	submitForApproval = () => {
		this.setState({
			isSubmittingForApproval: false
		})

		// if (!this.validation()) {
		// 	this.setState({
		// 		tryingToSubmitWithoutOffering: false,
		// 	})
		// 	return
		// }


		let param = {
			...this.props.activeCustomer.Data,
		}


		switch (this.props.customerForm.type) {
			case "new":
				this.props.createCustomer(this.props.regionId, param)
				this.closeComposeForm()
				break;
			case "edit":
				this.props.updateCustomer(this.props.regionId, param)
				break;
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate", "Customer.js")
		let bChanged = false;

		if (this.props.regionId !== prevProps.regionId ||
			this.props.statusId !== prevProps.statusId) {
			console.log("regionId", this.props.regionId, prevProps.regionId)
			this.setState({
				regionId: this.props.regionId,
				statusId: this.props.statusId
			});
			console.log("----------START FETCHING----------")
			// this.setState({ loading: true });
			this.props.getCustomers(
				this.props.regionId,
				this.props.statusId,
				this.props.filters.StatusNames,
				this.props.filters.AccountTypeListName,
				this.props.location,
				this.props.latitude,
				this.props.longitude,
				this.props.searchText);
			bChanged = true;
		}
	}

	componentWillMount() {
		if (this.props.customers === null) {
			this.props.getCustomers(
				this.props.regionId,
				this.props.statusId,
				this.props.filters.StatusNames,
				this.props.filters.AccountTypeListName,
				this.props.location,
				this.props.latitude,
				this.props.longitude,
				this.props.searchText);
		}
		if (this.props.accountTypeList === null) {
			this.props.getAccountTypeList();
		}
		if (this.props.accountExecutiveList === null) {
			this.props.getAccountExecutiveList(this.props.regionId);
		}
		if (this.props.customerStatusList === null) {
			this.props.getCustomerStatusList();
		}
		if (this.props.getAccountTypesGroups === null) {
			this.props.getAccountTypesGroups();
		}
	}

	componentWillReceiveProps(nextProps) {
		// if (this.props.customers === null && nextProps.customers !== null)
		// 	this.getCustomersFromStatus(nextProps.customers);
		// if (this.props.customers !== nextProps.customers) {
		// 	console.log("----------END FETCHING----------")
		// 	// this.setState({ loading: false });
		// 	this.getCustomersFromStatus(nextProps.customers);
		// }
		if (!_.isEqual(nextProps.filters, this.props.filters)) {
			this.props.getCustomers(
				nextProps.regionId,
				nextProps.statusId,
				nextProps.filters.StatusNames,
				nextProps.filters.AccountTypeListName,
				nextProps.location,
				nextProps.latitude,
				nextProps.longitude,
				nextProps.searchText);
		}

		// if (nextProps.bCreateCustomerStart !== this.props.bCreateCustomerStart && nextProps.bCreateCustomerStart === false ||
		// 	nextProps.bUpdateCustomerStart !== this.props.bUpdateCustomerStart && nextProps.bUpdateCustomerStart === false
		// ) {
		// 	this.props.getCustomers(
		// 		this.props.regionId,
		// 		this.props.statusId,
		// 		this.props.filters.StatusNames,
		// 		this.props.filters.AccountTypeListName,
		// 		this.props.location,
		// 		this.props.latitude,
		// 		this.props.longitude,
		// 		this.props.searchText);
		// 	this.props.getSuggestCustomersList(
		// 		this.props.regionId,
		// 		this.props.statusId,
		// 		this.props.location,
		// 		this.props.latitude,
		// 		this.props.longitude,
		// 		this.props.searchText);

		// }

		if (this.props.loading.bCreateCustomerStart === true && nextProps.loading.bCreateCustomerStart === false ||
			this.props.loading.bUpdateCustomerStart === true && nextProps.loading.bUpdateCustomerStart === false ||
			this.props.loading.bTransferAssignedFranchiseeStart === true && nextProps.loading.bTransferAssignedFranchiseeStart === false) {
			this.props.getSuggestCustomersList(
				this.props.regionId,
				this.props.statusId,
				this.props.location,
				this.props.latitude,
				this.props.longitude,
				this.props.searchText);
		}
		// if (nextProps.activeCustomer && nextProps.activeCustomer.Data &&
		// 	this.props.activeCustomer && this.props.activeCustomer.Data && this.props.activeCustomer.Data.flag &&
		// 	nextProps.activeCustomer.Data.flag !== this.props.activeCustomer.Data.flag) {
		// 	console.log('componentWillReceiveProps', nextProps.activeCustomer, this.props.activeCustomer.Data)
		// 	this.props.getCustomers(
		// 		nextProps.regionId,
		// 		nextProps.statusId,
		// 		nextProps.filters.StatusNames,
		// 		nextProps.filters.AccountTypeListName,
		// 		nextProps.location,
		// 		nextProps.latitude,
		// 		nextProps.longitude,
		// 		nextProps.searchText);
		// }
	}


	// getCustomersFromStatus = (rawData = this.props.customers) => {
	// 	console.log("getCustomersFromStatus", "Customer.js", this.props.regionId, this.props.statusId, rawData)
	// 	let all_temp = [];
	// 	if (rawData === null || rawData === undefined) return;

	// 	let regions = rawData.Data.Regions.filter(x => {
	// 		return this.props.regionId === 0 || x.Id === this.props.regionId;
	// 	});


	// 	console.log("regions", regions)

	// 	regions.forEach(x => {
	// 		all_temp = [...all_temp, ...x.CustomerList];
	// 	});

	// 	let _pins_temp = [];
	// 	regions.forEach(x => {
	// 		_pins_temp = [..._pins_temp, ...x.CustomerList.map(customer => {
	// 			return {
	// 				lat: customer.Latitude,
	// 				lng: customer.Longitude,
	// 				text: customer.CustomerName
	// 			}
	// 		})];

	// 	})

	// 	this.setState({
	// 		temp: all_temp,
	// 		data: all_temp,
	// 		pins: _pins_temp,
	// 	});

	// };

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	removeCustomers = () => {
		if (this.state.selection.length === 0) {
			alert("Please choose customer(s) to delete");
			return;
		}
		if (window.confirm("Do you really want to remove the selected customer(s)")) {
			this.props.deleteCustomersAction(this.state.selection, this.props.customers);
			this.setState({ selection: [], selectAll: false })
		}
	};

	fetchData(state, instance) {
		this.setState({
			pageSize: state.pageSize,
			page: state.page,
		});
	}

	showValidationMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	}
	closeValidationMenu = () => {
		this.setState({ anchorEl: null });
	}
	showContactMenu = event => {
		this.setState({ anchorContactMenu: event.currentTarget });
	}
	closeContactMenu = () => {
		this.setState({ anchorContactMenu: null });
	}
	onClickEmailToCustomer = () => {
		this.setState({
			anchorContactMenu: null,
		});

		this.props.openEmailToCustomerDialog(true);
	}
	handleCloseConfirmDialog = () => {
		this.setState({
			isSubmittingForApproval: false,
			tryingToSubmitWithoutOffering: false,
			tryingToCloseWithoutOffering: false,
		})
	}
	forceFetch = () => {
		this.props.getCustomers(
			this.props.regionId,
			this.props.statusId,
			this.props.filters.StatusNames,
			this.props.filters.AccountTypeListName,
			this.props.location,
			this.props.latitude,
			this.props.longitude,
			this.props.searchText);
	}
	handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ openSnack: false });
	};
	/////////// confirm submit & close /////////////
	handleStayForOffering = () => {
		this.handleCloseConfirmDialog()
		this.props.updateCustomersParameter('activeStep', 1);
	}
	processConfirming = () => {
		if (this.state.tryingToSubmitWithoutOffering === true) {
			this.setState({
				tryingToSubmitWithoutOffering: false,
			})
			this.submitForApproval()
		}
		if (this.state.tryingToCloseWithoutOffering === true) {
			this.setState({
				tryingToCloseWithoutOffering: false,
			})
			this.closeComposeForm()
		}
	}
	debug = () => {
		console.log("this.props.activeCustomer.Data = ", this.props.activeCustomer.Data)
	}
	render() {
		console.log(this.props.documents)
		console.log(this.props)
		const { classes, toggleFilterPanel, toggleSummaryPanel, filterState, summaryState, openNewCustomerForm, customerForm, mapViewState, toggleMapView } = this.props;

		const { selection, anchorEl, anchorContactMenu } = this.state;

		console.log('customerForm.props.open =', customerForm.props.open);

		let loadings = Object.keys(this.props.loading).filter(x => this.props.loading[x])
		if (loadings && loadings.length > 0) {
			loadings = loadings.map(x => {
				return this.props.loading[x]
			})
		}

		return (
			<React.Fragment >
				<FusePageCustomSidebarScroll
					classes={{
						root: classNames(classes.layoutRoot, 'test123'),
						rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': customerForm.props.open ? false : summaryState }),
						leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': customerForm.props.open ? true : filterState }),
						sidebarHeader: classes.layoutSidebarHeader,
						header: classes.layoutHeader,
						content: classes.content
					}}
					header={
						<div className="flex w-full items-center">
							{(!customerForm.props.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												{/* <FuseAnimate animation="transition.expandIn" delay={300}> */}
												<Icon className="text-32 mr-12">account_box</Icon>
												{/* </FuseAnimate> */}
												{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}> */}
												<Typography variant="h6" className="hidden sm:flex">Customers | Customer List</Typography>
												{/* </FuseAnimate> */}
											</div>
										</div>
										<div className="flex flex-shrink items-center">
											<Button variant="contained" color="primary" onClick={this.forceFetch}>
												Refresh
												<Icon className={classes.rightIcon}>refresh</Icon>
											</Button>

											<Button variant="contained" color="primary" onClick={openNewCustomerForm} className="ml-6">
												New
												<Icon className={classes.rightIcon}>add</Icon>
											</Button>

											{/* <Tooltip title="Add new customer">
												<IconButton className={classes.button} aria-label="add" onClick={openNewCustomerForm}>
													<Icon>add</Icon>
												</IconButton>
											</Tooltip>
											<IconButton className={classes.button} aria-label="mail" onClick={() => this.props.history.push('/apps/mail/inbox')}>
												<Icon>mail_outline</Icon>
											</IconButton>
											<IconButton className={classes.button} aria-label="print" onClick={() => alert('ok')}>
												<Icon>print</Icon>
											</IconButton> */}
										</div>
									</div>

								</div>
							)}
							{customerForm.props.open && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between items-center">
										{/* <div className="flex flex-shrink items-center">
											<div className="flex items-center">

											</div>
										</div> */}
										{/* <div className="flex flex-shrink" style={{ justifyContent: "space-between" }}> */}
										<div className="flex items-center">
											<IconButton
												// className={classNames(classes.button, classes.validationMenu)}
												className={classNames(classes.button, classes.invalidationMenu)}
												aria-label="Add an alarm"
												aria-owns={anchorEl ? 'validation-menu' : undefined}
												aria-haspopup="true"
												onClick={this.showValidationMenu}
											>
												{/* <Icon>check_circle</Icon> */}
												<Icon>error</Icon>
											</IconButton>
											<Menu
												id="validation-menu"
												anchorEl={anchorEl}
												open={Boolean(anchorEl)}
												onClose={this.closeValidationMenu}
											>
												<MenuItem><FormControlLabel control={<Checkbox checked={true} style={{ color: '#07df07' }} />} label="Company Information" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} style={{ color: '#07df07' }} />} label="Billing Address" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} style={{ color: '#07df07' }} />} label="Billing Settings" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} style={{ color: '#07df07' }} />} label="Company Contacts" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={true} style={{ color: '#07df07' }} />} label="Contract Details" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} style={{ color: '#07df07' }} />} label="Contract Signed" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={true} style={{ color: '#07df07' }} />} label="Service Location Info" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={true} style={{ color: '#07df07' }} />} label="Verified &amp; Approved" /></MenuItem>
											</Menu>
											{/* <Tooltip title="Save">
												<IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => this.closeComposeForm()}>
													<Icon>save</Icon>
												</IconButton>
											</Tooltip>
											<Tooltip title="Submit for Approval">
												<IconButton className={classes.button} aria-label="Add an alarm" onClick={this.trySubmitForApproval}>
													<Icon>cloud_upload</Icon>
												</IconButton>
											</Tooltip> */}
										</div>
										<div className="flex items-center">
											{customerForm.type === "edit" &&
												<Button variant="contained" color="primary"
													aria-label="Add an alarm"
													aria-owns={anchorContactMenu ? 'title-bar-contact-menu' : undefined}
													aria-haspopup="true"
													onClick={this.showContactMenu}
													className="mr-12"
												>
													Contact
												<Icon className={classNames(classes.rightIcon, 'ml-6')}>sms</Icon>
												</Button>
											}

											{/* <Tooltip title="Contact">
												<IconButton
													className={classNames(classes.button)}
													aria-label="Add an alarm"
													aria-owns={anchorContactMenu ? 'title-bar-contact-menu' : undefined}
													aria-haspopup="true"
													onClick={this.showContactMenu}
												>
													<Icon>sms</Icon>
												</IconButton>
											</Tooltip> */}
											<Menu
												id="title-bar-contact-menu"
												anchorEl={anchorContactMenu}
												open={Boolean(anchorContactMenu)}
												onClose={this.closeContactMenu}
											>
												<MenuItem onClick={this.closeContactMenu}>Chat with Account Executive</MenuItem>
												<MenuItem onClick={this.closeContactMenu}>Email to Account Executive</MenuItem>
												<MenuItem onClick={this.closeContactMenu}>SMS to Customer</MenuItem>
												<MenuItem onClick={this.onClickEmailToCustomer}>Email to Customer</MenuItem>
											</Menu>
											<Button variant="contained" color="primary" onClick={this.trySubmitForApproval} className="mr-12">
												{customerForm.type === "edit" ? 'Update' : 'Save'}
												<Icon className={classNames(classes.rightIcon, 'ml-6')}>save</Icon>
											</Button>
											<Button variant="contained" color="primary" onClick={this.tryClose} className="mr-12">
												Close
												<Icon className={classNames(classes.rightIcon, 'ml-6')}>close</Icon>
											</Button>

										</div>
									</div>
								</div>
							)}
						</div>
					}
					content={
						<div className="flex-1 flex-col absolute w-full h-full">
							<div className={classNames("flex flex-col h-full")}>
								<DialogEmailToCustomer />

								{/*
							Confirm Dialog for submitting
							 */}
								<Dialog
									open={(this.state.tryingToCloseWithoutOffering || this.state.tryingToSubmitWithoutOffering)}
									onClose={this.handleCloseConfirmDialog}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">Warning</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">There are no franchisees assigned to this customer.
If you save the customer now, you need to return and
assign at least one franchisee.</DialogContentText>
									</DialogContent>
									<DialogActions className='flex justify-between'>
										<Button onClick={this.handleStayForOffering} color="primary" autoFocus>Stay &amp; Assign a Franchisee</Button>
										<div className='flex'>
											<Button onClick={this.processConfirming} color="primary">Ignore</Button>
											<Button onClick={this.handleCloseConfirmDialog} color="primary">Cancel</Button>
										</div>
									</DialogActions>
								</Dialog>

								{customerForm.props.open && <CustomerForm />}
								{!customerForm.props.open &&
									<>
										<CustomerSearchBar />
										<CustomerListContent />
									</>
								}

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
										variant={this.state.snackIcon}
										message={this.state.snackMessage}
									/>
								</Snackbar>

								<Snackbar
									anchorOrigin={{
										vertical: this.props.snack.vertical,
										horizontal: this.props.snack.horizontal,
									}}
									open={this.props.snack.open}
									autoHideDuration={this.props.snack.duration}
									onClose={this.props.closeSnackbar}
								>
									<MySnackbarContentWrapper
										onClose={this.props.closeSnackbar}
										variant={this.props.snack.icon}
										message={this.props.snack.message}
									/>
								</Snackbar>

							</div>
						</div>
					}
					leftSidebarHeader={
						<Fragment>
							{customerForm.props.open ? (
								// <h2 style={{ marginBlockStart: '1em' }}>Customer Information</h2>
								<div className="flex flex-shrink items-center">
									<div className="flex items-center">
										<Toolbar className="pl-12 pr-0">
											<img className="mr-12" alt="" src="assets/images/invoices/invoice-icon-white.png" style={{ width: 32, height: 32 }} />
										</Toolbar>
										<Typography variant="h6" className="hidden sm:flex">Customers | {FuseUtils.capital_letter(customerForm.type)} Customer</Typography>
									</div>
								</div>
							) : (
									<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
										<h2 style={{ marginBlockStart: '1em' }}>Filters</h2>
									</div>
								)}
						</Fragment>
					}
					leftSidebarContent={
						<FilterPanel />
					}
					rightSidebarHeader={
						<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
							<h2 style={{ marginBlockStart: '1em' }}>Summary</h2>
						</div>
					}
					rightSidebarContent={
						<SummaryPanel />
					}

					onRef={instance => {
						this.pageLayout = instance;
					}}
				>
				</FusePageCustomSidebarScroll>

				{loadings && loadings.length > 0 &&
					<div className={classNames(classes.overlay, "flex-col")}>
						<CircularProgress className={classes.progress} color="secondary" />
						{loadings.map((x, index) =>
							<Typography key={index} variant="body2" color="primary">{x}</Typography>
						)}

					</div>
				}

			</React.Fragment >
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCustomers: Actions.getCustomers,
		toggleFilterPanel: Actions.toggleFilterPanel,
		toggleSummaryPanel: Actions.toggleSummaryPanel,
		toggleMapView: Actions.toggleMapView,
		deleteCustomersAction: Actions.deleteCustomers,
		removeCustomerAction: Actions.removeCustomer,
		openNewCustomerForm: Actions.openNewCustomerForm,
		openEditCustomerForm: Actions.openEditCustomerForm,
		closeEditCustomerForm: Actions.closeEditCustomerForm,
		closeNewCustomerForm: Actions.closeNewCustomerForm,

		getAccountTypeList: Actions.getAccountTypeList,
		getAccountExecutiveList: Actions.getAccountExecutiveList,
		getCustomerStatusList: Actions.getCustomerStatusList,
		getAccountTypesGroups: Actions.getAccountTypesGroups,

		openEmailToCustomerDialog: Actions.openEmailToCustomerDialog,

		createCustomer: Actions.createCustomer,
		updateCustomer: Actions.updateCustomer,
		updateCustomersParameter: Actions.updateCustomersParameter,

		openSnackbar: Actions.openSnackbar,
		closeSnackbar: Actions.closeSnackbar,

		getSuggestCustomersList: Actions.getSuggestCustomersList,
	}, dispatch);
}

function mapStateToProps({ customers, auth, franchisees, invoices }) {
	return {
		franchisees: franchisees.franchiseesDB,
		customers: customers.customersDB,
		bLoadedCustomers: customers.bLoadedCustomers,
		transactionStatus: customers.transactionStatus,
		filterState: customers.bOpenedFilterPanel,
		summaryState: customers.bOpenedSummaryPanel,
		mapViewState: customers.bOpenedMapView,
		regionId: auth.login.defaultRegionId,
		customerForm: customers.customerForm,

		statusId: customers.statusId,
		longitude: customers.longitude,
		latitude: customers.latitude,
		location: customers.location,
		searchText: customers.searchText,
		bCustomerFetchStart: customers.bCustomerFetchStart,
		createCustomerResponse: customers.createCustomerResponse,
		bCreateCustomerStart: customers.bCreateCustomerStart,
		bUpdateCustomerStart: customers.bUpdateCustomerStart,
		bGetCustomerStart: customers.bGetCustomerStart,
		filters: customers.filters,
		activeCustomer: customers.activeCustomer,
		bFindersFeesStart: customers.bFindersFeesStart,

		franchieesesToOffer: customers.franchieesesToOffer,

		snack: customers.snack,

		bSuggestCustomersFetchStart: invoices.bSuggestCustomersFetchStart,

		loading: customers.loading,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers)));

