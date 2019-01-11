import React, { Component, Fragment } from 'react';

// core components
import { Icon, IconButton, Fab, Typography, Toolbar, CircularProgress, Menu, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
// theme components
import { FusePageCustomSidebarScroll, FuseAnimate } from '@fuse';


import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import SummaryPanel from './SummaryPanel';
import FilterPanel from './filterPanel';

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
// const defaultProps = {
// 	trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
// };


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

	toggleSelection = (key, shift, row) => {
        /*
          https://react-table.js.org/#/story/select-table-hoc
          Implementation of how to manage the selection state is up to the developer.
          This implementation uses an array stored in the component state.
          Other implementations could use object keys, a Javascript Set, or Redux... etc.
        */
		// start off with the existing state
		let selection = [...this.state.selection];
		const keyIndex = selection.indexOf(key);
		// check to see if the key exists
		if (keyIndex >= 0) {
			// it does exist so we will remove it using destructing
			selection = [
				...selection.slice(0, keyIndex),
				...selection.slice(keyIndex + 1)
			];
		} else {
			// it does not exist so add it
			selection.push(key);
		}
		// update the state
		this.setState({ selection });
	};

	toggleAll = (instance) => {
        /*
          'toggleAll' is a tricky concept with any filterable table
          do you just select ALL the records that are in your data?
          OR
          do you only select ALL the records that are in the current filtered data?

          The latter makes more sense because 'selection' is a visual thing for the user.
          This is especially true if you are going to implement a set of external functions
          that act on the selected information (you would not want to DELETE the wrong thing!).

          So, to that end, access to the internals of ReactTable are required to get what is
          currently visible in the table (either on the current page or any other page).

          The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
          ReactTable and then get the internal state and the 'sortedData'.
          That can then be iterated to get all the currently visible records and set
          the selection state.
        */
		const selectAll = this.state.selectAll ? false : true;
		const selection = [];
		if (selectAll) {
			let currentRecords = instance.data;
			// we just push all the IDs onto the selection array
			let page = this.state.page;
			let pageSize = this.state.pageSize;
			let start_index = page * pageSize;
			let end_index = start_index + pageSize;
			currentRecords.forEach(item => {
				if (item._index >= start_index && item._index < end_index)
					selection.push(item._original.CustomerId);
			});
		}
		this.setState({ selectAll, selection });
	};

	isSelected = key => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
		return this.state.selection.includes(key);
	};

	logSelection = () => {
		console.log("selection:", this.state.selection);
	};

	closeComposeForm = () => {
		this.props.customerForm.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate", "Customer.js")
		let bChanged = false;
		// if (this.props.transactionStatus.checkedPaid !== prevProps.transactionStatus.checkedPaid) {
		// 	this.setState({ checkedPaid: !this.state.checkedPaid });
		// 	bChanged = true;
		// }

		// if (this.props.transactionStatus.checkedPP !== prevProps.transactionStatus.checkedPP) {
		// 	this.setState({ checkedPP: !this.state.checkedPP });
		// 	bChanged = true;
		// }

		// if (this.props.transactionStatus.checkedComplete !== prevProps.transactionStatus.checkedComplete) {
		// 	this.setState({ checkedComplete: !this.state.checkedComplete });
		// 	bChanged = true;
		// }

		// if (this.props.transactionStatus.checkedOpen !== prevProps.transactionStatus.checkedOpen) {
		// 	this.setState({ checkedOpen: !this.state.checkedOpen });
		// 	bChanged = true;
		// }

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



		// if (this.props.customers === null && prevProps.customers !== this.props.customers) {
		// 	bChanged = true;
		// }

		// if (bChanged)
		// 	this.getCustomersFromStatus();

		// if (this.props.documents === null && prevProps.documents !== this.props.documents) {
		// 	bChanged = true;
		// }



	}

	componentWillMount() {
		// this.setState({ checkedPaid: this.props.transactionStatus.checkedPaid });
		// this.setState({ checkedPP: this.props.transactionStatus.checkedPP });
		// this.setState({ checkedComplete: this.props.transactionStatus.checkedComplete });
		// this.setState({ checkedOpen: this.props.transactionStatus.checkedOpen });
		// this.getCustomersFromStatus()

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
		// if (this.props.customers === null && nextProps.customers !== null)
		// 	this.getCustomersFromStatus(nextProps.customers);
		// if (this.props.customers !== nextProps.customers) {
		// 	console.log("----------END FETCHING----------")
		// 	// this.setState({ loading: false });
		// 	this.getCustomersFromStatus(nextProps.customers);
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
		// document.addEventListener("keydown", this.escFunction, false);
	}

	componentWillUnmount() {
		// document.removeEventListener("keydown", this.escFunction, false);
	}

	// escFunction(event) {
	// 	if (event.keyCode === 27) {
	// 		this.setState({ s: '' });
	// 		this.getCustomersFromStatus();
	// 	}
	// }
	// search(val) {
	// 	if (val === '') {
	// 		this.getCustomersFromStatus();
	// 		return;
	// 	}
	// 	const temp = this.state.data.filter(d => {
	// 		return (d.CustomerNo && d.CustomerNo.toString().indexOf(val) !== -1) || !val ||
	// 			(d.CustomerName && d.CustomerName.toString().indexOf(val) !== -1) ||
	// 			(d.Address && d.Address.toString().indexOf(val) !== -1) ||
	// 			(d.Phone && d.Phone.toString().indexOf(val) !== -1) ||
	// 			(d.AccountTypeListName && d.AccountTypeListName.toString().indexOf(val) !== -1) ||
	// 			(d.CustomerDescription && d.CustomerDescription.toString().toLowerCase().indexOf(val) !== -1) ||
	// 			(d.Amount && d.Amount.toString().toLowerCase().indexOf(val) !== -1) ||
	// 			(d.StatusName && d.StatusName.toString().indexOf(val) !== -1)
	// 	});

	// 	this.setState({ temp: temp });
	// }

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });

		// if (prop === 's') {
		// 	// this.search(event.target.value.toLowerCase());
		// }
	};

	canBeSubmitted() {
		return true;
		// const { name } = this.state;
		// return (
		// 	name.length > 0
		// );
	}

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

	render() {
		console.log(this.props.documents)
		console.log(this.props)
		const { classes, toggleFilterPanel, toggleSummaryPanel, filterState, summaryState, openNewCustomerForm, customerForm, mapViewState, toggleMapView } = this.props;

		// const { toggleSelection, toggleAll, isSelected, logSelection } = this;

		const { selection, anchorEl } = this.state;

		console.log('render temp =', this.state.temp);
		console.log('customerForm.props.open =', customerForm.props.open);

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
							{(this.state.temp && !customerForm.props.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												{/* <FuseAnimate animation="transition.expandIn" delay={300}> */}
												<Icon className="text-32 mr-12">account_box</Icon>
												{/* </FuseAnimate> */}
												{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}> */}
												<Typography variant="h6" className="hidden sm:flex">Customers | Customers</Typography>
												{/* </FuseAnimate> */}
											</div>
										</div>
										<div className="flex flex-shrink items-center">
											<IconButton className={classes.button} aria-label="add" onClick={openNewCustomerForm}>
												<Icon>add</Icon>
											</IconButton>
											<IconButton className={classes.button} aria-label="mail" onClick={() => this.props.history.push('/apps/mail/inbox')}>
												<Icon>mail_outline</Icon>
											</IconButton>
											<IconButton className={classes.button} aria-label="print" onClick={() => alert('ok')}>
												<Icon>print</Icon>
											</IconButton>

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
							{(this.state.temp && customerForm.props.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												<Toolbar className="pl-12 pr-0">
													<img className="mr-12" alt="" src="assets/images/invoices/invoice-icon-white.png" style={{ width: 32, height: 32 }} />
												</Toolbar>
												<Typography variant="h6" className="hidden sm:flex">Customers | New Customers</Typography>
											</div>
										</div>
										<div className="flex flex-shrink items-center">

											<IconButton className={classes.button} aria-label="Add an alarm" onClick={toggleFilterPanel}>
												<Icon>person_outline</Icon>
											</IconButton>

											{/* <IconButton className={classes.button} aria-label="Add an alarm" onClick={toggleSummaryPanel}>
												<Icon>check_circle</Icon>
											</IconButton> */}
											
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
												<MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Company Information" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Billing Address" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Billing Settings" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Company Contacts" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Contract Details" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Contract Signed" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Service Location Info" /></MenuItem>
												<MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Verified &amp; Approved" /></MenuItem>
											</Menu>

											<IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => this.closeComposeForm()}>
												<Icon>close</Icon>
											</IconButton>
										</div>
									</div>

								</div>
							)}
						</div>
					}
					content={
						<div className="flex-1 flex-col absolute w-full h-full">

							{this.state.temp && (
								<Fragment>
									{customerForm.props.open ?
										(
											<CustomerForm
												customers={this.props.customers}
												franchisees={this.props.franchisees}
												selectedCustomer={this.state.selectedCustomer} />
										) :
										(
											<CustomerListContent
											// data={this.state.temp}
											// loading={this.state.loading}
											// pins={this.state.pins}
											/>
										)}
								</Fragment>
							)}
						</div>
					}
					leftSidebarHeader={
						<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
							{customerForm.props.open ? (
								<h2 style={{ marginBlockStart: '1em' }}>Customer Information</h2>
							) : (
									<h2 style={{ marginBlockStart: '1em' }}>Filters</h2>
								)}
						</div>
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
					<div className={classes.overlay}>
						<CircularProgress className={classes.progress} color="secondary" />
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

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers)));

