import React, { Component, Fragment } from 'react';
import Geocode from "react-geocode";

import { Paper, withStyles } from '@material-ui/core';
import { TextField, Divider, Toolbar, Typography } from '@material-ui/core';
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

import CustomerLineTable from "./CustomerLine"

Geocode.setApiKey("AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA");

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
const address_headers = [
	{
		id: 'billing',
		numeric: false,
		disablePadding: false,
		label: 'Type'
	},
	{
		id: 'service',
		numeric: false,
		disablePadding: false,
		label: 'Address'
	},
	{
		id: 'description',
		numeric: false,
		disablePadding: false,
		label: 'City'
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: 'State'
	},
	{
		id: 'amount',
		numeric: true,
		disablePadding: false,
		label: 'Zip / Postal'
	}
];

const billing_headers = [
	{
		id: 'billing',
		numeric: false,
		disablePadding: false,
		label: 'First'
	},
	{
		id: 'service',
		numeric: false,
		disablePadding: false,
		label: 'Last'
	},
	{
		id: 'description',
		numeric: false,
		disablePadding: false,
		label: 'Title'
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: 'Office Phone'
	},
	{
		id: 'amount',
		numeric: true,
		disablePadding: false,
		label: 'Mobile Phone'
	},
	{
		id: 'email',
		numeric: true,
		disablePadding: false,
		label: 'Email'
	}
];

const WAIT_INTERVAL = 1000
const ENTER_KEY = 13

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

		Location: this.props.locationFilterValue.id,
		NearbyRadius: this.props.locationFilterValue.miles,
		AddressZipcodeRadius: this.props.locationFilterValue.miles,
	};


	componentDidMount() {
	}

	componentWillMount() {
		// this.setState({
		// 	checkedPaid: this.props.transactionStatus.checkedPaid,
		// 	checkedPP: this.props.transactionStatus.checkedPP,
		// 	checkedComplete: this.props.transactionStatus.checkedComplete
		// });
	}
	componentWillReceiveProps(nextProps) {
		// if (nextProps.locationFilterValue !== this.props.locationFilterValue) {
		// 	this.setState({
		// 		Location: nextProps.locationFilterValue.id,
		// 		NearbyRadius: nextProps.locationFilterValue.miles,
		// 		AddressZipcodeRadius: nextProps.locationFilterValue.miles,
		// 		SpecificAddress: nextProps.locationFilterValue.addrZipcode === undefined ? "" : nextProps.locationFilterValue.addrZipcode.addr,
		// 	})
		// this.onLocationFilter("Location", nextProps.locationFilterValue.id)
		// }
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
		if (name === "customerStatusList0") {
			this.props.customerStatusList.Data.map((x, index) => {
				this.setState({
					["customerStatusList" + index + 1]: event.target.checked
				})
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

		let val = event.target.value
		let onLocationFilter = this.onLocationFilter
		if (name === "SpecificAddress") {
			clearTimeout(this.timer)
			this.timer = setTimeout(
				function () {
					onLocationFilter(name, val);
				},
				WAIT_INTERVAL)
		}
		else if (
			name === "Location"
			|| name === "NearbyRadius"
			|| name === "AddressZipcodeRadius"
		) {
			this.onLocationFilter(name, val)
		}
	};

	onLocationFilter = (name, value) => {

		let payload = {
			...this.props.locationFilterValue,
			id: this.state.Location,
			miles: this.state.Location === "locationNearBy" ?
				this.state.NearbyRadius :
				(this.state.Location === "locationNearSpecificAddress" ?
					this.state.AddressZipcodeRadius :
					this.props.locationFilterValue.miles),
			addrZipcode:
				this.state.Location === "locationNearSpecificAddress" ?
					this.state.SpecificAddress : undefined
		}
		switch (name) {
			case "Location":
				payload = {
					...payload,
					id: value,
					miles: value === "locationNearBy" ?
						this.props.locationFilterValue.miles :
						(value === "locationNearSpecificAddress" ?
							this.state.AddressZipcodeRadius :
							this.props.locationFilterValue.miles),
				}
				if (value != "locationNearSpecificAddress") {

				} else {
					Geocode.fromAddress(this.state.SpecificAddress).then(
						response => {
							const { lat, lng } = response.results[0].geometry.location;
							// console.log(lat, lng);

							payload = {
								...payload,
								addrZipcode: {
									lat,
									lng,
									addr: this.state.SpecificAddress
								}
							}
							this.props.selectLocationFilter(payload)
							return
						},
						error => {
							// console.error(error);
							payload = {
								...payload,
								addrZipcode: undefined
							}
							this.props.selectLocationFilter(payload)
							return
						}
					);
					return
				}

				break;
			case "NearbyRadius":
				payload = {
					...payload,
					miles: value
				}
				break;
			case "SpecificAddress":

				Geocode.fromAddress(value).then(
					response => {
						const { lat, lng } = response.results[0].geometry.location;
						// console.log(lat, lng);

						payload = {
							...payload,
							addrZipcode: {
								lat,
								lng,
								addr: value
							}
						}
						this.props.selectLocationFilter(payload)
						return
					},
					error => {
						// console.error(error);
						payload = {
							...payload,
							addrZipcode: undefined
						}
						this.props.selectLocationFilter(payload)
						return
					}
				);

				return;
			case "AddressZipcodeRadius":
				Geocode.fromAddress(this.state.SpecificAddress).then(
					response => {
						const { lat, lng } = response.results[0].geometry.location;
						// console.log(lat, lng);

						payload = {
							...payload,
							miles: value,
							addrZipcode: {
								lat,
								lng,
								addr: value
							}
						}
						this.props.selectLocationFilter(payload)
						return
					},
					error => {
						// console.error(error);
						payload = {
							...payload,
							miles: value,
							addrZipcode: undefined
						}
						this.props.selectLocationFilter(payload)
						return
					}
				);

				return;
		}
		console.log(payload)
		this.props.selectLocationFilter(payload)
	}

	handleChange1 = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { classes, customerForm, customers } = this.props;

		let regionCustomers = [];

		// if (customers) { // to avoid error
		// 	customers.Data.Regions.filter(x => {
		// 		return this.props.regionId === 0 || x.Id === this.props.regionId;
		// 	}).forEach(x => {
		// 		regionCustomers = [...regionCustomers, ...x.CustomerList];
		// 	});
		// }

		// let accountTypes = [...new Set(regionCustomers.map(x => x.AccountTypeListName))].sort();
		// let accountStatuses = [...new Set(regionCustomers.map(x => x.StatusName))].sort();

		// return (<MenuItem key={index} value={index}>{x.Title}</MenuItem>)

		let customerStatusListTexts = []
		if (this.props.customerStatusList !== null && this.props.customerStatusList.Data !== undefined) {
			customerStatusListTexts = this.props.customerStatusList.Data.filter(x => {
				if (x.Text === null) return false
				return true
			}).map(x => {
				return x.Text
			}).sort();
		}


		let accountTypeTexts = []
		if (this.props.accountTypeList !== null && this.props.accountTypeList.Data !== undefined) {
			accountTypeTexts = this.props.accountTypeList.Data.filter(x => {
				if (x.Text === null) return false
				return true
			}).map(x => {
				return x.Text
			}).sort();
		}

		let execTitles = []
		if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
			execTitles = this.props.accountExecutiveList.Data.filter(x => {
				if (x.Title === null) return false
				return true
			}).map(x => {
				return x.FirstName + " " + x.LastName
			}).sort();
		}

		let accountTypesGroups = []
		if (this.props.accountTypesGroups !== null && this.props.accountTypesGroups.Data !== undefined) {
			accountTypesGroups = this.props.accountTypesGroups.Data.filter(x => {
				if (x.Name === null) return false
				return true
			}).map(x => {
				return x.Name
			}).sort();
		}


		return (
			<div className={classNames(classes.root, "flex flex-col")}>
				{/* <div className={classNames("flex flex-col")}> */}

				<Paper className="flex flex-1 flex-col min-h-px p-20">
					{customerForm && customerForm.props.open
						? (
							<div>
								<GridContainer style={{ alignItems: 'center', width: 500 }} className={classNames(classes.formControl)}>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<h3 className="mt-24">Customer Information</h3>
									</GridItem>
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
											className={classNames(classes.textField, 'mr-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('City')}
											margin="normal"
											variant="outlined"
											style={{ width: '40%' }}
										/>


										<TextField
											id="outlined-name"
											label="State *"
											select
											className={classNames(classes.textField, 'mr-6 ml-6')}
											value={this.state.State === undefined ? "" : this.state.State}
											onChange={this.handleChange('State')}
											margin="normal"
											variant="outlined"
											style={{ width: '25%' }}
										>
											{stateNames.map(option => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</TextField>

										<TextField
											id="outlined-name"
											label="Zip *"
											className={classNames(classes.textField, 'ml-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Zip')}
											margin="normal"
											variant="outlined"
											style={{ width: '35%' }}
										/>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Phone *"
											className={classNames(classes.textField, 'mr-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Phone')}
											margin="normal"
											variant="outlined"
											style={{ width: '100%' }}
										/>

										<TextField
											id="outlined-name"
											label="Fax"
											className={classNames(classes.textField, 'ml-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Fax')}
											margin="normal"
											variant="outlined"

											style={{ width: '100%' }}
										/>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Email"
											type="email"
											className={classNames(classes.textField, 'mr-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Email')}
											margin="normal"
											variant="outlined"
											style={{ width: '100%' }}
										/>

										<TextField
											id="outlined-name"
											label="Website"
											className={classNames(classes.textField, 'ml-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Website')}
											margin="normal"
											variant="outlined"
											style={{ width: '100%' }}
										/>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="AccountTypeGroup"
											label="Account Type Group"
											select
											className={classNames(classes.textField, 'mr-6')}
											value={this.state.AccountTypeGroup === undefined ? 0 : this.state.AccountTypeGroup}
											onChange={this.handleChange('AccountTypeGroup')}
											margin="normal"
											variant="outlined"
											fullWidth
										// style={{ minWidth: "100px", width: "30%" }}
										>
											{
												accountTypesGroups.map((x, index) => (
													<MenuItem key={index} value={index}>{x}</MenuItem>
												))
											}

										</TextField>

										<TextField
											id="AccountType"
											label="Account Type *"
											select
											className={classNames(classes.textField, 'ml-6')}
											value={this.state.AccountType === undefined ? 0 : this.state.AccountType}
											onChange={this.handleChange('AccountType')}
											margin="normal"
											variant="outlined"
											fullWidth
										// style={{ minWidth: "100px", width: "30%" }}
										>
											{
												accountTypeTexts.map((x, index) => (
													<MenuItem key={index} value={index}>{x}</MenuItem>
												))
											}

										</TextField>
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-col">
										<RadioGroup
											aria-label="nativeChildAccount"
											name="nativeChildAccount"
											className={classNames(classes.group, "flex flex-row")}
											style={{justifyContent: "space-between"}}
											value={this.state.nativeChildAccount}
											onChange={this.handleChange('nativeChildAccount')}
										>
											<FormControlLabel value="nativeAccount" control={<Radio />} label="Native Account" />
											<FormControlLabel value="childAccount" control={<Radio />} label="Child Account" />
										</RadioGroup>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-col">
										<h3 className="mt-24">Addresses</h3>
										<CustomerLineTable tableType="ADDRESS" headers={address_headers} />

										<h3 className="mt-24">Contacts</h3>
										<CustomerLineTable tableType="BILLING_SETTING" headers={billing_headers} />
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

								{/* <RadioGroup */}
								<div style={{
									marginTop: 30, display: 'flex', flexDirection: 'column',
									alignItems: "stretch"
								}}>
									<h3>Location</h3>
									<RadioGroup
										aria-label="Location"
										name="Location"
										className={classes.group}
										value={this.props.locationFilterValue.id}
										onChange={this.handleChange('Location')}
									>

										<FormControlLabel value="locationAll" control={<Radio />} label="All" />
										<FormControlLabel value="locationNearBy" control={<Radio />} label="NearBy" />
										<FormControlLabel value="locationNearSpecificAddress" control={<Radio />} label="Near Specific Address" />
									</RadioGroup>


								</div>

								<div style={{ marginTop: 0, display: 'flex', flexDirection: 'column' }}>

									<TextField
										select

										id="NearbyRadius"
										label="Radius"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.props.locationFilterValue.miles}
										onChange={this.handleChange('NearbyRadius')}
										margin="normal"
										variant="outlined"
										style={{
											width: "100%",
											// maxWidth: 200,
											display: this.state.Location === "locationNearBy" ? 'block' : 'none'
										}}
									// fullWidth
									>
										{
											Array.from({ length: 15 })
												.map((val, index) => (
													<MenuItem key={index} value={(index + 1) * 5}>
														{(index + 1) * 5} Miles
													</MenuItem>
												))
										}
									</TextField>

									<TextField
										id="SpecificAddress"
										label="Address"
										className={classes.textField}
										onChange={this.handleChange('SpecificAddress')}
										margin="normal"
										variant="outlined"
										style={{
											width: 180,
											maxWidth: 180,
											display: this.state.Location === "locationNearSpecificAddress" ? 'block' : 'none'
										}}
									// fullWidth
									/>
									<TextField
										select

										id="AddressZipcodeRadius"
										label="Radius"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.props.locationFilterValue.miles}
										onChange={this.handleChange('AddressZipcodeRadius')}
										margin="normal"
										variant="outlined"
										style={{
											width: 180,
											maxWidth: 180,
											display: this.state.Location === "locationNearSpecificAddress" ? 'block' : 'none'
										}}
									// fullWidth
									>
										{
											Array.from({ length: 15 })
												.map((val, index) => (
													<MenuItem key={index} value={(index + 1) * 5}>
														{(index + 1) * 5} Miles
													</MenuItem>
												))
										}
									</TextField>
									<Divider variant="middle" style={{ marginTop: 24, marginBottom: 24 }} />

									<TextField
										select

										id="AccountTypes"
										label="Account Types"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.AccountType === undefined ? 0 : this.state.AccountType}
										onChange={this.handleChange('AccountType')}
										margin="normal"
										variant="outlined"
										style={{ width: 180 }}>


										{/* <MenuItem value={-2}><em>All</em></MenuItem>
										<MenuItem value={-1}><em>None</em></MenuItem>
										{
											accountTypes.map((x, index) => {
												if (x !== null)
													return (<MenuItem key={x} value={index}>{x}</MenuItem>)
												else
													return null
											})
										} */}
										{
											accountTypeTexts.map((x, index) => (
												<MenuItem key={index} value={index}>{x}</MenuItem>
											))
										}


									</TextField>

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
										style={{ width: 180 }}>
										{/* {[{
											value: 0, label: "All"
										}, {
											value: 1, label: "None"
										}].map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))} */}
										{
											execTitles.map((x, index) => {
												return (<MenuItem key={index} value={index}>{x}</MenuItem>)
											})
										}

									</TextField>

								</div>

								<div style={{ marginTop: 30, display: 'flex', flexDirection: 'column' }}>
									<h3>Customer Status</h3>
									<FormControlLabel
										control={
											<Switch checked={this.state['customerStatusList0']}
												onChange={this.handleChangeChecked('customerStatusList0')} />
										}
										label="All"
									/>
									{
										customerStatusListTexts.map((x, index) => (
											<FormControlLabel key={index}
												control={
													<Switch checked={this.state['customerStatusList' + (index + 1)]}
														onChange={this.handleChangeChecked('customerStatusList' + index + 1)} />
												}
												label={x}
											/>
										))
									}

									{/* <FormControlLabel
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
									/> */}
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
		toggleStatus: Actions.toggleStatus,
		selectLocationFilter: Actions.selectLocationFilter
	}, dispatch);
}

function mapStateToProps({ customers, auth }) {
	return {
		filterState: customers.bOpenedFilterPanel,
		transactionStatus: customers.transactionStatus,
		customers: customers.customersDB,
		customerForm: customers.customerForm,
		regionId: auth.login.defaultRegionId,
		locationFilterValue: customers.locationFilterValue,

		accountTypeList: customers.accountTypeList,
		accountExecutiveList: customers.accountExecutiveList,
		customerStatusList: customers.customerStatusList,
		accountTypesGroups: customers.accountTypesGroups,
	}
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
