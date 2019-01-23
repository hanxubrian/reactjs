import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { withRouter } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";

import { FusePageCustomSidebarScroll, FuseAnimate } from '@fuse';
import { Icon, IconButton, Fab, Typography, Toolbar, CircularProgress, Menu, MenuItem, Checkbox, FormControlLabel, Tooltip, Button } from '@material-ui/core';
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

import SummaryPanel from './SummaryPanel';
import FilterPanel from './FilterPanel';
// import CustomerForm from './CustomerForm';
import CustomerListContent from './CustomerListContent';
// import DialogEmailToCustomer from './DialogEmailToCustomer';

// import FuseUtils from '@fuse/FuseUtils';


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
		opacity: 0.5
	},
	validationMenu: {
		color: "#07DF07!important",//green[600],
		'&$checked': {
			color: "#07DF07!important", //green[500] 00C73F 33FF33 66CC66 07DF07
		}
	},
	invalidationMenu: {
		color: "#FF557F!important",//green[600],
		'&$checked': {
			color: "#FF557F!important", //green[500] FF557F
		}
	},
	validationMenuChecked: {

	}
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
		};
		console.log("constructor, Customer.js")

		if (!props.bLoadedCustomers) {
			console.log("getCustomers")
			// this.setState({ loading: true });
			// this.getCustomersFromStatus();
			this.props.getCustomers(this.props.regionId, this.props.statusId, this.props.location, this.props.latitude, this.props.longitude, this.props.searchText);
		}

		this.props.getAccountTypeList();
		this.props.getAccountExecutiveList();
		this.props.getCustomerStatusList();
		this.props.getAccountTypesGroups();
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
			this.props.getCustomers(this.props.regionId, this.props.statusId, this.props.location, this.props.latitude, this.props.longitude, this.props.searchText);
			bChanged = true;
		}
	}

	componentWillMount() {
		if (this.props.customers === null) {
			this.props.getCustomers(this.props.regionId, this.props.statusId, this.props.location, this.props.latitude, this.props.longitude, this.props.searchText);
		}
		if (this.props.accountTypeList === null) {
			this.props.getAccountTypeList();
		}
		if (this.props.accountExecutiveList === null) {
			this.props.getAccountExecutiveList();
		}
		if (this.props.customerStatusList === null) {
			this.props.getCustomerStatusList();
		}
		if (this.props.getAccountTypesGroups === null) {
			this.props.getAccountTypesGroups();
		}
	}

	componentWillReceiveProps(nextProps) {
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




	render() {
		const { classes, toggleFilterPanel, toggleSummaryPanel, filterState, summaryState, openNewCustomerForm, customerForm, mapViewState, toggleMapView } = this.props;

		console.log('props=', this.props);
		return (
			<React.Fragment >
				<FusePageCustomSidebarScroll
					classes={{
						root: classNames(classes.layoutRoot, 'test123'),
						rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': summaryState }),
						leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': filterState }),
						sidebarHeader: classes.layoutSidebarHeader,
						header: classes.layoutHeader,
						content: classes.content
					}}
					header={
						<div className="flex w-full items-center">
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
						</div>
					}
					content={
						<div className="flex-1 flex-col absolute w-full h-full">
							<CustomerListContent />

						</div>
					}
					leftSidebarHeader={
						<Fragment>

							<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
								<h2 style={{ marginBlockStart: '1em' }}>Filters</h2>
							</div>
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
		customerForm: customers.customerForm,

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
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerServices)));
