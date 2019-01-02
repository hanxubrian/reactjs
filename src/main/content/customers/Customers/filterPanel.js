import React, { Component } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import keycode from 'keycode';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


import * as Actions from 'store/actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
		invoiceDate: ''
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

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
		this.props.toggleStatus(name, event.target.checked)
	};

	handleChange1 = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { classes, customerForm } = this.props;

		return (
			<div className={classNames(classes.root)}>
				<div className={classNames("flex flex-col")}>

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
												// variant="outlined"
												style={{ width: '100%' }}
											/>

										</GridItem>
										<GridItem xs={12} sm={12} md={12} className="flex flex-row">
											<TextField
												id="outlined-name"
												label="Address *"
												className={classes.textField}
												// value={customerForm.state.name}
												onChange={this.handleChange('Address')}
												margin="normal"
												// variant="outlined"
												style={{ width: '100%' }}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={12} className="flex flex-row">
											<TextField
												id="outlined-name"
												label="City *"
												className={classes.textField}
												// value={customerForm.state.name}
												onChange={this.handleChange('City')}
												margin="normal"
												// variant="outlined"
												style={{ width: '100%', marginRight: '2%' }}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={12} className="flex flex-row">
											<TextField
												id="outlined-name"
												label="State *"
												select
												className={classes.textField}
												value={''}
												onChange={this.handleChange('State')}
												margin="normal"
												// variant="outlined"
												style={{ width: '100%', marginRight: '2%', marginLeft: '2%' }}
											>
												{stateNames.map(option => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
										</GridItem>
										<GridItem xs={12} sm={12} md={12} className="flex flex-row">
											<TextField
												id="outlined-name"
												label="Zip *"
												className={classes.textField}
												// value={customerForm.state.name}
												onChange={this.handleChange('Zip')}
												margin="normal"
												// variant="outlined"
												style={{ width: '100%', marginLeft: '2%' }}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={12} className="flex flex-row">
											<TextField
												id="outlined-name"
												label="Phone *"
												className={classes.textField}
												// value={customerForm.state.name}
												onChange={this.handleChange('Phone')}
												margin="normal"
												// variant="outlined"
												style={{ width: '100%', marginRight: '2%' }}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={12} className="flex flex-row">
											<TextField
												id="outlined-name"
												label="Fax"
												className={classes.textField}
												// value={customerForm.state.name}
												onChange={this.handleChange('Fax')}
												margin="normal"
												// variant="outlined"
												style={{ width: '100%', marginLeft: '2%' }}
											/>
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
												// variant="outlined"
												style={{ width: '100%', marginRight: '2%' }}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={12} className="flex flex-row">
											<TextField
												id="outlined-name"
												label="Website"
												className={classes.textField}
												// value={customerForm.state.name}
												onChange={this.handleChange('Website')}
												margin="normal"
												// variant="outlined"
												style={{ width: '100%', marginLeft: '2%' }}
											/>
										</GridItem>
									</GridContainer>
								</div>
							) :
							(
								<div>
									<div>
										<h3 className="mb-20">Filter by Date</h3>
										<FormControl className={classes.formControl} style={{ width: 200 }}>
											{/*<InputLabel htmlFor="age-simple">Invoice Date</InputLabel>*/}
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
									<div style={{ marginTop: 50, display: 'flex', flexDirection: 'column' }}>
										<h3>Transaction Statuses</h3>
										<FormControlLabel
											control={
												<Switch
													checked={this.state.checkedPaid}
													onChange={this.handleChange('checkedPaid')}
													value="checkedPaid"
												/>
											}
											label="Paid"
										/>
										<FormControlLabel
											control={
												<Switch
													checked={this.state.checkedPP}
													onChange={this.handleChange('checkedPP')}
													value="checkedPP"
												/>
											}
											label="Paid Partial"
										/>
										<FormControlLabel
											control={
												<Switch
													checked={this.state.checkedComplete}
													onChange={this.handleChange('checkedComplete')}
													value="checkedComplete"
												/>
											}
											label="Completed"
										/>
										<FormControlLabel
											control={
												<Switch
													checked={this.state.checkedOpen}
													onChange={this.handleChange('checkedOpen')}
													value="checkedOpen"
												/>
											}
											label="Open"
										/>
									</div>
								</div>
							)
						}
					</Paper>
				</div >
			</div >
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleStatus: Actions.toggleStatus
	}, dispatch);
}

function mapStateToProps({ customers }) {
	return {
		filterState: customers.bOpenedFilterPanel,
		transactionStatus: customers.transactionStatus,
		customers: customers.customersDB,
		customerForm: customers.customerForm
	}
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
