import React, { Component } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import keycode from 'keycode';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';

//Store
import * as Actions from 'store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Third Party
import classNames from 'classnames';

import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
const styles = theme => ({
	root: {

	},
	panel: {
		position: 'absolute',
		width: 300,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[3],
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		left: -300,
		margin: 0,
		zIndex: 1000,
		transform: 'translate3d(50px,0,0)',
		overflow: 'hidden',
		[theme.breakpoints.down('md')]: {
			transform: 'translate3d(360px,0,0)',
			boxShadow: 'none',
			'&.opened': {
				boxShadow: theme.shadows[5]
			}
		},
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.standard
		}),
		'&.opened1': {
			transform: 'translateX(300px)'
		}
	}
});

const stateNames = [
	{
		value: 2,
		label: "Buffalo"
	},
	{
		value: 7,
		label: "Detroit"
	},
	{
		value: 9,
		label: "Hartford"
	},
	{
		value: 13,
		label: "Las Vegas"
	},
	{
		value: 14,
		label: "Los Angeles/Colton"
	},
	{
		value: 16,
		label: "Miami"
	},
	{
		value: 18,
		label: "Minneapolis"
	},
	{
		value: 20,
		label: "New Jersey"
	},
	{
		value: 21,
		label: "New York"
	},
	{
		value: 22,
		label: "San Francisco/Oakland"
	},
	{
		value: 23,
		label: "Oklahoma City"
	},
	{
		value: 24,
		label: "Philadelphia"
	},
	{
		value: 25,
		label: "Sacramento"
	},
	{
		value: 26,
		label: "Washington DC"
	},
	{
		value: 28,
		label: "Jani-King Int'l, Inc."
	},
	{
		value: 29,
		label: "JANI-KING OF NEW MEXICO, INC"
	},
	{
		value: 31,
		label: "New Mexico"
	},
	{
		value: 46,
		label: "Houston"
	},
	{
		value: 55,
		label: "Pittsburgh"
	},
	{
		value: 64,
		label: "Tulsa"
	},
	{
		value: 82,
		label: "Reno"
	}
];

class FilterPanel extends Component {


	state = {
		checkedPaid: true,
		checkedPP: true,
		checkedComplete: true,
		checkedOpen: true,
		invoiceDate: '',

		isAllCustomerStatus: true,
		isActiveCustomerStatus: true,
		isCancelledCustomerStatus: true,
		isSuspendedCustomerStatus: true,
		isPendingCustomerStatus: true,
		isInactiveCustomerStatus: true,
		isTransferredCustomerStatus: true,
		isUnknownCustomerStatus: true,
		isRejectedCustomerStatus: true,
		isRegionOperationCustomerStatus: true,
		isRegionAccountingCustomerStatus: true,
		isVariableCustomerStatus: true,

		AccountTypes: -2,
		AccountExecutive: 0,

		Location: "locationAll"
	};


	componentDidMount() {
	}

	componentWillMount() {
		this.setState({
			checkedPaid: this.props.transactionStatus.checkedPaid,
			checkedPP: this.props.transactionStatus.checkedPP,
			checkedComplete: this.props.transactionStatus.checkedComplete
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.state !== prevProps.state) {
			if (this.props.state) {
				document.addEventListener("keydown", this.handleDocumentKeyDown);
			}
			else {
				document.removeEventListener('keydown', this.handleDocumentKeyDown);
			}
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleDocumentKeyDown);
	}

	handleDocumentKeyDown = event => {
		if (keycode(event) === 'esc') {
			this.props.closeFilterPanel();
		}
	};

	handleChangeChecked = name => event => {
		if (name === "isAllCustomerStatus") {
			this.setState({
				isAllCustomerStatus: event.target.checked,
				isActiveCustomerStatus: event.target.checked,
				isCancelledCustomerStatus: event.target.checked,
				isSuspendedCustomerStatus: event.target.checked,
				isPendingCustomerStatus: event.target.checked,
				isInactiveCustomerStatus: event.target.checked,
				isTransferredCustomerStatus: event.target.checked,
				isUnknownCustomerStatus: event.target.checked,
				isRejectedCustomerStatus: event.target.checked,
				isRegionOperationCustomerStatus: event.target.checked,
				isRegionAccountingCustomerStatus: event.target.checked,
				isVariableCustomerStatus: event.target.checked,
			})
		} else {
			this.setState({ [name]: event.target.checked });
		}

		// this.props.toggleStatus(name, event.target.checked)
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	handleChange1 = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { classes, customerForm, customers } = this.props;

		let regionCustomers = [];

		if (customers) { // to avoid error
			customers.Data.Regions.filter(x => {
				return this.props.regionId === 0 || x.Id === this.props.regionId;
			}).forEach(x => {
				regionCustomers = [...regionCustomers, ...x.CustomerList];
			});
		}
		let accountTypes = [...new Set(regionCustomers.map(x => x.AccountTypeListName))].sort();
		// let accountStatuses = [...new Set(regionCustomers.map(x => x.StatusName))].sort();

		return (
			<div className={classNames(classes.root, "flex flex-col")}>
				{/* <div className={classNames("flex flex-col")}> */}

				<Paper className="flex flex-1 flex-col min-h-px p-20">
					{customerForm && customerForm.props.open
						? (
							<div>
								{/* <h3 className="mb-20">Customer Information</h3> */}
								<GridContainer style={{ alignItems: 'center', width: 300 }} className={classNames(classes.formControl)}>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="Name"
											label="Name *"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Name')}
											margin="normal"
											variant="outlined"
											fullWidth />

									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Address *"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Address')}
											margin="normal"
											variant="outlined"
											fullWidth />
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Address2"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Address2')}
											margin="normal"
											variant="outlined"
											fullWidth />
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="City *"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('City')}
											margin="normal"
											variant="outlined"
											fullWidth />
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="State *"
											select
											className={classes.textField}
											value={this.state.State === undefined ? "" : this.state.State}
											onChange={this.handleChange('State')}
											margin="normal"
											variant="outlined"
											style={{ width: '40%', marginRight: '2px' }}>
											{stateNames.map(option => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</TextField>

										<TextField
											id="outlined-name"
											label="Zip *"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Zip')}
											margin="normal"
											variant="outlined"
											style={{ width: '60%', marginLeft: '2px' }} />
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Phone *"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Phone')}
											margin="normal"
											variant="outlined"
											style={{ marginRight: '2px' }} />

										<TextField
											id="outlined-name"
											label="Fax"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Fax')}
											margin="normal"
											variant="outlined"
											style={{ marginLeft: '2px' }} />
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Email"
											type="email"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Email')}
											margin="normal"
											variant="outlined"
											style={{ marginRight: '2px' }} />

										<TextField
											id="outlined-name"
											label="Website"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Website')}
											margin="normal"
											variant="outlined"
											style={{ marginLeft: '2px' }} />
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="AccountType"
											label="Account Type *"
											select
											className={classes.textField}
											value={this.state.AccountType === undefined ? "" : this.state.AccountType}
											onChange={this.handleChange('AccountType')}
											margin="normal"
											variant="outlined"
											fullWidth
										// style={{ minWidth: "100px", width: "30%" }}
										>
											{[{ value: 0, label: "Airline" }].map(option => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</TextField>
									</GridItem>

								</GridContainer>
							</div>
						) :
						(
							<div>
								{/*
									 <div>
										<h3 className="mb-20">Filter by Date</h3>
										<FormControl className={classes.formControl} style={{ width: 200 }}>
											<Select
												value={this.state.invoiceDate}
												onChange={this.handleChange1}
												inputProps={{
													name: 'invoiceDate',
													id: 'invoice_date'
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												<MenuItem value={1}>This Week</MenuItem>
												<MenuItem value={2}>This Week-to-date</MenuItem>
												<MenuItem value={3}>This Month</MenuItem>
												<MenuItem value={4}>This Month-to-date</MenuItem>
												<MenuItem value={5}>This Quarter</MenuItem>
												<MenuItem value={6}>This Quarter-to-Date</MenuItem>
												<MenuItem value={7}>This Fiscal Year</MenuItem>
												<MenuItem value={8}>This Fiscal Year-to-date</MenuItem>
												<MenuItem value={9}>Today</MenuItem>
												<MenuItem value={10}>Yesterday</MenuItem>
												<MenuItem value={11}>This Month</MenuItem>
												<MenuItem value={12}>Last Quarter</MenuItem>
												<MenuItem value={13}>Last Year</MenuItem>
												<MenuItem value={14}>Custom Date</MenuItem>
												<MenuItem value={15}>Period</MenuItem>
											</Select>
										</FormControl>
									</div>
									*/}
								<div style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>
									<h3>Location</h3>

									<RadioGroup
										aria-label="Location"
										name="Location"
										className={classes.group}
										value={this.state.Location}
										onChange={this.handleChange('Location')}
									>
										<FormControlLabel value="locationAll" control={<Radio />} label="All" />
										<FormControlLabel value="locationNearBy" control={<Radio />} label="Near By" />
										<FormControlLabel value="locationNearSpecificAddress" control={<Radio />} label="Near Specific Address" />

									</RadioGroup>
									<TextField
										id="outlined-name"
										label="Address or Zipcode"
										className={classes.textField}
										onChange={this.handleChange('SpecificAddress')}
										margin="normal"
										variant="outlined"
										style={{ width: '100%' }} />
									<TextField
										select

										id="Radius"
										label="Radius"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.Radius === undefined ? 0 : this.state.Radius}
										onChange={this.handleChange('Radius')}
										margin="normal"
										variant="outlined"
										style={{ width: '100%' }}>
										{
											// [
											// 	{ value: 0, label: "5 Miles" },
											// 	{ value: 1, label: "10 Miles" },
											// 	{ value: 2, label: "20 Miles" },
											// 	{ value: 2, label: "20 Miles" },
											// 	{ value: 2, label: "20 Miles" },
											// 	{ value: 2, label: "20 Miles" },
											// 	{ value: 2, label: "20 Miles" },
											// 	{ value: 2, label: "20 Miles" },
											// 	{ value: 3, label: "30 Miles" }
											// ]
											// (new Array(15))
											Array.apply(null, {length: 15}).map(Number.call, Number)
												.map((val, index) => (
													<MenuItem key={index} value={index}>
														{(index + 1 ) * 5} Miles
													</MenuItem>
												))}
									</TextField>
								</div>

								<div style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>



								</div>
								<div style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>
									<TextField
										select

										id="AccountTypes"
										label="Account Types"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.AccountTypes === undefined ? 0 : this.state.AccountTypes}
										onChange={this.handleChange('AccountTypes')}
										margin="normal"
										variant="outlined"
										style={{ width: '100%' }}>
										{/* {[{
											value: 0, label: "All"
										}, {
											value: 1, label: "None"
										}].map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))} */}

										<MenuItem value={-2}><em>All</em></MenuItem>
										<MenuItem value={-1}><em>None</em></MenuItem>
										{
											accountTypes.map((x, index) => {
												if (x !== null)
													return (<MenuItem key={x} value={index}>{x}</MenuItem>)
												else
													return null
											})
										}

									</TextField>
								</div>

								<div style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>

									<TextField
										select

										id="AccountExecutive"
										label="Account Executive"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.AccountExecutive === undefined ? 0 : this.state.AccountExecutive}
										onChange={this.handleChange('AccountExecutive')}
										margin="normal"
										variant="outlined"
										style={{ width: '100%' }}>
										{[{
											value: 0, label: "All"
										}, {
											value: 1, label: "None"
										}].map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>

								</div>

								<div style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>
									<h3>Customer Status</h3>

									<FormControlLabel
										control={<Switch checked={this.state.isAllCustomerStatus} onChange={this.handleChangeChecked('isAllCustomerStatus')} />}
										label="All"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isActiveCustomerStatus} onChange={this.handleChangeChecked('isActiveCustomerStatus')} />}
										label="Active"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isCancelledCustomerStatus} onChange={this.handleChangeChecked('isCancelledCustomerStatus')} />}
										label="Cancelled"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isSuspendedCustomerStatus} onChange={this.handleChangeChecked('isSuspendedCustomerStatus')} />}
										label="Suspended"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isPendingCustomerStatus} onChange={this.handleChangeChecked('isPendingCustomerStatus')} />}
										label="Pending"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isInactiveCustomerStatus} onChange={this.handleChangeChecked('isInactiveCustomerStatus')} />}
										label="Inactive"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isTransferredCustomerStatus} onChange={this.handleChangeChecked('isTransferredCustomerStatus')} />}
										label="Transferred"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isUnknownCustomerStatus} onChange={this.handleChangeChecked('isUnknownCustomerStatus')} />}
										label="Unknown"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isRejectedCustomerStatus} onChange={this.handleChangeChecked('isRejectedCustomerStatus')} />}
										label="Rejected"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isRegionOperationCustomerStatus} onChange={this.handleChangeChecked('isRegionOperationCustomerStatus')} />}
										label="Region Operation"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isRegionAccountingCustomerStatus} onChange={this.handleChangeChecked('isRegionAccountingCustomerStatus')} />}
										label="Region Accounting"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isVariableCustomerStatus} onChange={this.handleChangeChecked('isVariableCustomerStatus')} />}
										label="Variable"
									/>
								</div>
							</div>
						)
					}
				</Paper>
				{/* </div> */}
			</div >
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleStatus: Actions.toggleStatus
	}, dispatch);
}

function mapStateToProps({ customers, auth }) {
	return {
		filterState: customers.bOpenedFilterPanel,
		transactionStatus: customers.transactionStatus,
		customers: customers.customersDB,
		customerForm: customers.customerForm,
		regionId: auth.login.defaultRegionId,
	}
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
