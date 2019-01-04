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

		isAllLeaseStatus: true,
		isActiveLeaseStatus: true,
		isCompleteLeaseStatus: true,
		isStoppedLeaseStatus: true,
		isTransferredLeaseStatus: true,

		AccountTypes: -2,
		AccountExecutive: 0,
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
		if (name === "isAllLeaseStatus") {
			this.setState({
				isAllLeaseStatus: event.target.checked,
				isActiveLeaseStatus: event.target.checked,
				isCompleteLeaseStatus: event.target.checked,
				isStoppedLeaseStatus: event.target.checked,
				isTransferredLeaseStatus: event.target.checked
			})
		} else {
			this.setState({ [name]: event.target.checked });
		}

		this.props.toggleStatus(name, event.target.checked)
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
		const { classes, leaseForm } = this.props;

		let regionLeases = [];

		// leases.Data.Regions.filter(x => {
		// 	return this.props.regionId === 0 || x.Id === this.props.regionId;
		// }).forEach(x => {
		// 	regionLeases = [...regionLeases, ...x.Leases];
		// });

		let accountTypes = [...new Set(regionLeases.map(x => x.AccountTypeListName))].sort();
		// let accountStatuses = [...new Set(regionLeases.map(x => x.StatusName))].sort();

		return (
			<div className={classNames(classes.root, "flex flex-col")}>
				{/* <div className={classNames("flex flex-col")}> */}

				<Paper className="flex flex-1 flex-col min-h-px p-20">
					{leaseForm && leaseForm.props.open
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

								<div style={{ marginTop: 50, display: 'flex', flexDirection: 'column' }}>
									<h3>Lease Status</h3>
									<FormControlLabel
										control={<Switch checked={this.state.isAllLeaseStatus} onChange={this.handleChangeChecked('isAllLeaseStatus')} value="isAllLeaseStatus"  />}
										label="Select All"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isActiveLeaseStatus} onChange={this.handleChangeChecked('isActiveLeaseStatus')} value="isActiveStatus" />}
										label="Active"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isCompleteLeaseStatus} onChange={this.handleChangeChecked('isCompleteLeaseStatus')} value="isCompleteStatus" />}
										label="Complete"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isStoppedLeaseStatus} onChange={this.handleChangeChecked('isStoppedLeaseStatus')} value="isStoppedLeaseStatus" />}
										label="Stopped"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.isTransferredLeaseStatus} onChange={this.handleChangeChecked('isTransferredLeaseStatus')} value="isTransferredLeaseStatus" />}
										label="Transferred"
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

function mapStateToProps({ leases, auth }) {
	return {
		filterState: leases.bOpenedFilterPanel,
		transactionStatus: leases.transactionStatus,
		leases: leases.leasesDB,
		leaseForm: leases.leaseForm,
		regionId: auth.login.defaultRegionId,
	}
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));