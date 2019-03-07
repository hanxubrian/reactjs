import React, { Component, Fragment } from 'react';
import _ from "lodash";
import { withStyles } from '@material-ui/core/styles/index';
import { withRouter } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import { CustomFusePageCustomSidebarScroll } from '@fuse';
// import { FusePageCustomSidebarScroll } from '@fuse';

import { Icon, IconButton, Typography, CircularProgress, Menu, MenuItem, Tooltip, Button, ListItemIcon } from '@material-ui/core';
import classNames from 'classnames';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


import { bindActionCreators } from "redux";

// for store
import * as Actions from 'store/actions';

// third party
// import moment from 'moment'
// import checkboxHOC from "react-table/lib/hoc/selectTable";
// import Chance from "chance";
// import ReactTable from "react-table";
import "react-table/react-table.css";
// import _ from 'lodash';



//table pagination
// import JanikingPagination from './../../../../Commons/JanikingPagination';

import FilterPanel from './FilterPanel';
import CustomerForm from './CustomerForm';
import CustomerListContent from './CustomerListContent';
import DialogEmailToCustomer from './DialogEmailToCustomer';

// import FuseUtils from '@fuse/FuseUtils';
import IconEmail from '@material-ui/icons/Email';
import IconSms from '@material-ui/icons/Sms';
import IconPhone from '@material-ui/icons/Phone';
import IconChat from '@material-ui/icons/ChatBubbleOutline';

import CustomerSearchBar from './CustomerSearchBar';
import LogCallModalForm from './form/LogCallModalForm';

import EmailModalForm from './contact-forms/EmailModalForm';
import ChatModalForm from './contact-forms/ChatModalForm';
import PhoneCallModalForm from './contact-forms/PhoneCallModalForm';
import SmsModalForm from './contact-forms/SmsModalForm';

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
});

class CustomerServices extends Component {

	constructor(props) {
		super(props);

		this.fetchData = this.fetchData.bind(this);

		this.state = {
			s: '',
			temp: [],
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

			showRightSidePanel: true,
		};
		console.log("constructor, Customer.js")

		if (!props.bLoadedCustomers) {
			console.log("getCustomers")
			// this.setState({ loading: true });
			// this.getCustomersFromStatus();
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
	}

	closeComposeForm = () => {
		// switch (this.props.customerForm.type) {
		// 	case "new":
		// 		this.props.closeNewCustomerForm()
		// 		break;
		// 	case "edit":
		// 		this.props.closeEditCustomerForm()
		// 		break;
		// }
		this.props.closeCustomerServiceForm()
	};

	trySubmitForApproval = () => {
		this.setState({
			isSubmittingForApproval: true
		})

	}

	submitForApproval = () => {
		this.setState({
			isSubmittingForApproval: false
		})
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
			// this.props.getCustomers(this.props.regionId, this.props.statusId, this.props.location, this.props.latitude, this.props.longitude, this.props.searchText);
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
		if (!_.isEqual(nextProps.filters, this.props.filters) ||
			nextProps.regionId !== this.props.regionId ||
			nextProps.location !== this.props.location
		) {
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
	}

	componentDidMount() {
	}

	componentWillUnmount() {

	}

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
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

	showSendEmailModalForm = () => {
		this.props.showSendEmailModalForm()
		this.closeContactMenu()
	}
	showSendSmsModalForm = () => {
		this.props.showSendSmsModalForm()
		this.closeContactMenu()
	}
	showSendPhoneCallModalForm = () => {
		this.props.showSendPhoneCallModalForm()
		this.closeContactMenu()
	}
	showSendChatModalForm = () => {
		this.props.showSendChatModalForm()
		this.closeContactMenu()
	}

	onClickEmailToCustomer = () => {
		this.setState({
			anchorContactMenu: null,
		});

		this.props.openEmailToCustomerDialog(true);
	}
	handleCloseConfirmDialog = () => {
		this.setState({
			isSubmittingForApproval: false
		})
	}
	toggleRightSidePanel = () => {
		this.setState({
			showRightSidePanel: !this.state.showRightSidePanel
		})
	}


	onClickLogCall = () => {
		this.props.showLogCallModalForm(true)
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

	toggleExpandCollapseGrouping = () => {
		this.props.expandCollapseGrouping(!this.props.isExpandedGrouping)
	}

	render() {
		const { classes, customerServiceForm } = this.props;
		const { anchorContactMenu } = this.state;

		console.log('props=', this.props);
		return (
			<React.Fragment >
				<CustomFusePageCustomSidebarScroll
					classes={{
						root: classNames(classes.layoutRoot, 'test123'),
						// rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': !customerServiceForm.open && customerServiceForm.isOpenSummaryPanel || customerServiceForm.open && this.state.showRightSidePanel }),
						// leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': customerServiceForm.isOpenFilterPanel }),
						rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': this.props.bRightSidebarCustomerService }),
						leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': customerServiceForm.open ? true : this.props.bLeftSidebarCustomerService }),
						sidebarHeader: classes.layoutSidebarHeader,
						header: classes.layoutHeader,
						content: classes.content
					}}
					header={
						<div className="flex w-full items-center">
							{(this.state.temp && !customerServiceForm.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												{/* <FuseAnimate animation="transition.expandIn" delay={300}> */}
												<Icon className="text-32 mr-12">account_box</Icon>
												{/* </FuseAnimate> */}
												{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}> */}
												<Typography variant="h6" className="hidden sm:flex">Customer Service | Customers</Typography>
												{/* </FuseAnimate> */}
											</div>
										</div>
										<div className="flex flex-shrink items-center">
											<Tooltip title="Refresh">
												<IconButton variant="contained" onClick={this.forceFetch}>
													<Icon>refresh</Icon>
												</IconButton>
											</Tooltip>

											{/* <Button
												variant="contained"
												color="primary"
												className={classNames(classes.button, "pr-24 pl-24 mb-6")}
												onClick={this.onClickLogCall}
											>
												Log Call
												<Icon className={classes.rightIcon}>settings_phone</Icon>
											</Button> */}

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

											{/* <Fab
												color="secondary"
												aria-label="add"
												className={classNames(classes.sideButton, "mr-12")}
												onClick={openNewCustomerForm}>
												<Icon>add</Icon>
											</Fab>
											<Fab color="secondary" aria-label="add"
												className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
												<Icon>mail_outline</Icon>
											</Fab>
											<Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
												<Icon>print</Icon>
											</Fab> */}
										</div>
									</div>

								</div>
							)}
							{(this.state.temp && customerServiceForm.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										{/* <div className="flex flex-shrink items-center">
											<div className="flex items-center">
												
											</div>
										</div> */}
										{/* <div className="flex flex-shrink" style={{ justifyContent: "space-between" }}> */}
										<div className="flex">
											<Tooltip title="">
												<IconButton
													className={classNames(classes.button)}
													aria-label="Add an alarm"
													aria-owns={anchorContactMenu ? 'title-bar-contact-menu' : undefined}
													aria-haspopup="true"
													onClick={this.showContactMenu}
												>
													<Icon>menu</Icon>
												</IconButton>
											</Tooltip>

											<Menu
												id="title-bar-contact-menu"
												anchorEl={anchorContactMenu}
												open={Boolean(anchorContactMenu)}
												onClose={this.closeContactMenu}
											>
												<MenuItem onClick={this.showSendEmailModalForm}>
													<ListItemIcon><IconEmail /></ListItemIcon>
													<Typography variant="inherit">Send Email</Typography>
												</MenuItem>

												<MenuItem onClick={this.showSendSmsModalForm}>
													<ListItemIcon><IconSms /></ListItemIcon>
													<Typography variant="inherit">Send SMS</Typography>
												</MenuItem>

												<MenuItem onClick={this.showSendPhoneCallModalForm}>
													<ListItemIcon><IconPhone /></ListItemIcon>
													<Typography variant="inherit">Phone Call</Typography>
												</MenuItem>

												<MenuItem onClick={this.showSendChatModalForm}>
													<ListItemIcon><IconChat /></ListItemIcon>
													<Typography variant="inherit">Send Chat</Typography>
												</MenuItem>

											</Menu>
										</div>

										<div className="flex">
											<Tooltip title="First Customer">
												<IconButton className={classes.button} aria-label="add">
													<Icon>first_page</Icon>
												</IconButton>
											</Tooltip>
											<Tooltip title="Previous Customer">
												<IconButton className={classes.button} aria-label="add">
													<Icon>navigate_before</Icon>
												</IconButton>
											</Tooltip>
											<Tooltip title="Next Customer">
												<IconButton className={classes.button} aria-label="add">
													<Icon>navigate_next</Icon>
												</IconButton>
											</Tooltip>

											<Tooltip title="Last Customer">
												<IconButton className={classes.button} aria-label="add">
													<Icon>last_page</Icon>
												</IconButton>
											</Tooltip>
										</div>

										<div className="flex">
											<Tooltip title="Expand/Collapse" onClick={this.toggleExpandCollapseGrouping}>
												<IconButton variant="contained">
													<Icon>format_line_spacing</Icon>
												</IconButton>
											</Tooltip>
											<Tooltip title="Left Side Panel">
												<IconButton className={classes.button} aria-label="Add an alarm" onClick={this.toggleRightSidePanel}>
													<Icon>event_note</Icon>
												</IconButton>
											</Tooltip>
											<Tooltip title="Close">
												<IconButton className={classes.button} aria-label="Add an alarm" onClick={this.closeComposeForm}>
													<Icon>close</Icon>
												</IconButton>
											</Tooltip>
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

								{/* Confirm Dialog for submitting */}
								<Dialog
									open={this.state.isSubmittingForApproval}
									onClose={this.handleCloseConfirmDialog}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">{"You are submitting customer data for approval."}</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">There are still some incompleted items. Are you sure to sumit anyway?</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={this.handleCloseConfirmDialog} color="primary">No</Button>
										<Button onClick={this.submitForApproval} color="primary" autoFocus>Yes</Button>
									</DialogActions>
								</Dialog>

								{customerServiceForm.open && <CustomerForm />}
								{!customerServiceForm.open && <CustomerSearchBar />}
								{!customerServiceForm.open && <CustomerListContent />}
								<LogCallModalForm />

								<EmailModalForm />
								<ChatModalForm />
								<PhoneCallModalForm />
								<SmsModalForm />

							</div>
						</div>
					}
					leftSidebarHeader={
						<Fragment>
							<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
								<h2 style={{ marginBlockStart: '1em' }}>{
									customerServiceForm.open ? (customerServiceForm.activeCustomer && customerServiceForm.activeCustomer.Data ? customerServiceForm.activeCustomer.Data.cus_name : "") : "Filters"}</h2>
							</div>
						</Fragment>
					}
					leftSidebarContent={
						<FilterPanel />
					}
				// rightSidebarHeader={
				// 	<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
				// 		<h2 style={{ marginBlockStart: '1em' }}>{customerForm.props.open ? "Agreement & Cleaning Schedule" : "Summary"}</h2>
				// 	</div>
				// }
				// rightSidebarContent={
				// 	<Fragment>
				// 		{/* {!customerForm.props.open && summaryState && (<SummaryPanel />)} */}
				// 		{/* {customerForm.props.open && this.state.showRightSidePanel && (<SummaryPanel />)} */}
				// 		<SummaryPanel />
				// 	</Fragment>
				// }
				// onRef={instance => {
				// 	this.pageLayout = instance;
				// }}
				>
				</CustomFusePageCustomSidebarScroll>
				{(this.props.bCustomerFetchStart) && (
					<div className={classNames(classes.overlay, "flex-col")}>
						<CircularProgress className={classes.progress} color="secondary" />
						<Typography variant="body2" color="primary">Fetching all customers...</Typography>
					</div>
				)}
				{(this.props.bCreateCustomerStart) && (
					<div className={classNames(classes.overlay, "flex-col")}>
						<CircularProgress className={classes.progress} color="secondary" />
						<Typography variant="body2" color="primary">Submitting customer data...</Typography>
					</div>
				)}
				{(this.props.bGetCustomerStart) && (
					<div className={classNames(classes.overlay, "flex-col")}>
						<CircularProgress className={classes.progress} color="secondary" />
						<Typography variant="body2" color="primary">Fetching the customer data...</Typography>
					</div>
				)}
			</React.Fragment >
		);
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCustomers: Actions.getCustomers,
		// deleteCustomersAction: Actions.deleteCustomers,
		// removeCustomerAction: Actions.removeCustomer,
		// openNewCustomerForm: Actions.openNewCustomerForm,
		// closeEditCustomerForm: Actions.closeEditCustomerForm,
		// closeNewCustomerForm: Actions.closeNewCustomerForm,
		closeCustomerServiceForm: Actions.closeCustomerServiceForm,

		getAccountTypeList: Actions.getAccountTypeList,
		getAccountExecutiveList: Actions.getAccountExecutiveList,
		getCustomerStatusList: Actions.getCustomerStatusList,
		getAccountTypesGroups: Actions.getAccountTypesGroups,

		openEmailToCustomerDialog: Actions.openEmailToCustomerDialog,

		createCustomer: Actions.createCustomer,
		showLogCallModalForm: Actions.showLogCallModalForm,

		showSendEmailModalForm: Actions.showSendEmailModalForm,
		showSendSmsModalForm: Actions.showSendSmsModalForm,
		showSendPhoneCallModalForm: Actions.showSendPhoneCallModalForm,
		showSendChatModalForm: Actions.showSendChatModalForm,

		expandCollapseGrouping: Actions.expandCollapseGrouping,


	}, dispatch);
}

function mapStateToProps({ customers, auth, franchisees }) {
	return {
		franchisees: franchisees.franchiseesDB,
		customers: customers.customersDB,
		bLoadedCustomers: customers.bLoadedCustomers,
		transactionStatus: customers.transactionStatus,
		filterState: customers.bOpenedFilterPanel,
		summaryState: customers.bOpenedSummaryPanel,
		mapViewState: customers.bOpenedMapView,
		regionId: auth.login.defaultRegionId,
		// customerForm: customers.customerForm,
		customerServiceForm: customers.customerServiceForm,

		statusId: customers.statusId,
		longitude: customers.longitude,
		latitude: customers.latitude,
		location: customers.location,
		searchText: customers.searchText,
		bCustomerFetchStart: customers.bCustomerFetchStart,

		// accountTypeList: customers.accountTypeList,
		// accountExecutiveList: customers.accountExecutiveList,
		// customerStatusList: customers.customerStatusList,

		bCreateCustomerStart: customers.bCreateCustomerStart,
		createCustomerResponse: customers.createCustomerResponse,
		bCreateCustomerStart: customers.bCreateCustomerStart,

		bGetCustomerStart: customers.bGetCustomerStart,
		filters: customers.filters,

		contactForms: customers.contactForms,
		isExpandedGrouping: customers.isExpandedGrouping,

		bLeftSidebarCustomerService: customers.bLeftSidebarCustomerService,
		bRightSidebarCustomerService: customers.bRightSidebarCustomerService,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerServices)));
