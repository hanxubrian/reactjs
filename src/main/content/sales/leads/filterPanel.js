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

		isAllLeadStatus: true,
		isActiveLeadStatus: true,
		isCancelledLeadStatus: true,
		isSuspendedLeadStatus: true,
		isPendingLeadStatus: true,
		isInactiveLeadStatus: true,
		isTransferredLeadStatus: true,
		isUnknownLeadStatus: true,
		isRejectedLeadStatus: true,
		isRegionOperationLeadStatus: true,
		isRegionAccountingLeadStatus: true,
		isVariableLeadStatus: true,
		AccountTypes: -2,
		AccountExecutive: 0,
		Location: "locationAll"
	};

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
		if (name === "isAllLeadStatus") {
			this.setState({
				isAllLeadStatus: event.target.checked,
				isActiveLeadStatus: event.target.checked,
				isCancelledLeadStatus: event.target.checked,
				isSuspendedLeadStatus: event.target.checked,
				isPendingLeadStatus: event.target.checked,
				isInactiveLeadStatus: event.target.checked,
				isTransferredLeadStatus: event.target.checked,
				isUnknownLeadStatus: event.target.checked,
				isRejectedLeadStatus: event.target.checked,
				isRegionOperationLeadStatus: event.target.checked,
				isRegionAccountingLeadStatus: event.target.checked,
				isVariableLeadStatus: event.target.checked,
			})
		} else {
			this.setState({ [name]: event.target.checked });
		}

	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		const { classes, leadForm } = this.props;

		let regionLeads = [];


		let accountTypes = [...new Set(regionLeads.map(x => x.AccountTypeListName))].sort();


		return (
			<div className={classNames(classes.root, "flex flex-col")}>

				<Paper className="flex flex-1 flex-col min-h-px p-20">
					{leadForm && leadForm.props.open
						? (
							<div>
								<GridContainer style={{ alignItems: 'center', width: 300 }} className={classNames(classes.formControl)}>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="Name"
											label="Name *"
											className={classes.textField}
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
											onChange={this.handleChange('Phone')}
											margin="normal"
											variant="outlined"
											style={{ marginRight: '2px' }} />

										<TextField
											id="outlined-name"
											label="Fax"
											className={classes.textField}
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
											onChange={this.handleChange('Email')}
											margin="normal"
											variant="outlined"
											style={{ marginRight: '2px' }} />

										<TextField
											id="outlined-name"
											label="Website"
											className={classes.textField}
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
                                        style={{
                                            width: '100%',
                                            maxWidth: '100%',
                                            display: this.state.Location === "locationNearSpecificAddress" ? 'block' : 'none'
                                        }} />
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
									<h3>Lead Status</h3>

									<FormControlLabel
										control={<Switch checked={this.state.isAllLeadStatus} onChange={this.handleChangeChecked('isAllLeadStatus')} />}
										label="All"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isActiveLeadStatus} onChange={this.handleChangeChecked('isActiveLeadStatus')} />}
										label="Active"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isCancelledLeadStatus} onChange={this.handleChangeChecked('isCancelledLeadStatus')} />}
										label="Cancelled"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isSuspendedLeadStatus} onChange={this.handleChangeChecked('isSuspendedLeadStatus')} />}
										label="Suspended"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isPendingLeadStatus} onChange={this.handleChangeChecked('isPendingLeadStatus')} />}
										label="Pending"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isInactiveLeadStatus} onChange={this.handleChangeChecked('isInactiveLeadStatus')} />}
										label="Inactive"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isTransferredLeadStatus} onChange={this.handleChangeChecked('isTransferredLeadStatus')} />}
										label="Transferred"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isUnknownLeadStatus} onChange={this.handleChangeChecked('isUnknownLeadStatus')} />}
										label="Unknown"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isRejectedLeadStatus} onChange={this.handleChangeChecked('isRejectedLeadStatus')} />}
										label="Rejected"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isRegionOperationLeadStatus} onChange={this.handleChangeChecked('isRegionOperationLeadStatus')} />}
										label="Region Operation"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isRegionAccountingLeadStatus} onChange={this.handleChangeChecked('isRegionAccountingLeadStatus')} />}
										label="Region Accounting"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isVariableLeadStatus} onChange={this.handleChangeChecked('isVariableLeadStatus')} />}
										label="Variable"
									/>
								</div>
							</div>
						)
					}
				</Paper>
			</div >
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleStatus: Actions.toggleStatus
	}, dispatch);
}

function mapStateToProps({ leads, auth }) {
	return {
		filterState: leads.bOpenedFilterPanel,
		transactionStatus: leads.transactionStatus,
		leads: leads.leadsDB,
		leadForm: leads.leadForm,
		regionId: auth.login.defaultRegionId,
	}
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
