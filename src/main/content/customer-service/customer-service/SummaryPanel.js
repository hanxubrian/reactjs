import React, { Component, Fragment } from 'react';
import { Paper, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FuseAnimate } from '@fuse';


//Material UI core
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {Card, CardContent, TextField, InputAdornment, MenuItem} from '@material-ui/core';
// import * as Actions from 'store/actions';
import Widget8 from './widget8';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};


const styles = theme => ({
	root: {
		width: 50,
		maxWidth: 50,
		minWidth: 50,
		[theme.breakpoints.down('md')]: {
			width: 0,
			maxWidth: 0,
			minWidth: 0
		},
		color: green[600],
		'&$checked': {
			color: green[500]
		}
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
		right: 40,
		margin: 0,
		zIndex: 1000,
		transform: 'translate3d(290px,0,0)',
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
		'&.opened': {
			transform: 'translateX(40px)'
		}
	},
	card: {
		minWidth: 260,
		maxWidth: 260,
		backgroundColor: '#3C4252',
		marginTop: 30
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	checked: {}
});

class SummaryPanel extends Component {
	state = {
		value: 0,
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};
	
	render() {
		const { classes, customerForm } = this.props;
		// const { classes, toggleFilterPanel, toggleSummaryPanel, filterState, summaryState, deleteCustomersAction, openNewCustomerForm, customerForm } = this.props;
		let widgets_data = {
			widget8: {
				datasets: [
					[
						{
							label: '1Day',
							data: [72, 65, 70, 78, 85, 82, 88],
							fill: false,
							borderColor: '#5c84f1'
						}
					],
					[
						{
							label: '1Week',
							data: [540, 539, 527, 548, 540, 552, 566],
							fill: false,
							borderColor: '#5c84f1'
						}
					],
					[
						{
							label: '1Month',
							data: [1520, 1529, 1567, 1588, 1590, 1652, 1622],
							fill: false,
							borderColor: '#5c84f1'
						}
					]
				],
				labels: ['1', '2', '3', '4', '5', '6', '7'],
				options: {
					spanGaps: true,
					legend: {
						display: false
					},
					maintainAspectRatio: true,
					elements: {
						point: {
							radius: 2,
							borderWidth: 1,
							hoverRadius: 2,
							hoverBorderWidth: 1
						},
						line: {
							tension: 0
						}
					},
					layout: {
						padding: {
							top: 24,
							left: 16,
							right: 16,
							bottom: 16
						}
					},
					scales: {
						xAxes: [
							{
								display: false
							}
						],
						yAxes: [
							{
								display: true,
								ticks: {
									// min: 100,
									// max: 500
								}
							}
						]
					}
				},
				today: '12,540',
				change: {
					value: 321,
					percentage: 2.05
				}
			},
		};

		return (
			<div>
				<div className={classNames("flex flex-col p-16")}>
					{this.props.customers && (
						<Fragment className="flex flex-1 flex-col min-h-px shadow-none" style={{ alignItems: 'center', flexDirection: 'column' }}>

							{customerForm && customerForm.props.open
								? (
									<div style={{ marginTop: 50, display: 'flex', flexDirection: 'column' }}>

										<Paper className="flex flex-col p-12">
											<h3>Service Agreement</h3>

											<Fragment>
												<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
													<GridItem xs={12} sm={12} md={12} className="flex flex-row">
														<TextField
															type="number"
															id="Amount"
															label="Amount *"
															className={classes.textField}
															InputLabelProps={{
																shrink: true
															}}
															value={this.state.Amount || ""}
															// onChange={this.handleChange('Amount')}
															margin="dense"
															variant="outlined"
															style={{ minWidth: "100px", width: "30%" }}
															InputProps={{
																startAdornment: <InputAdornment position="start">$</InputAdornment>
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={12} className="flex flex-row">
														<TextField
															id="Description"
															label="Description"
															multiline
															rows="2"
															rowsMax="2"
															className={classes.textField}
															value={this.state.Description}
															// onChange={this.handleChange('Description')}
															margin="dense"
															variant="outlined"
															style={{ width: '100%' }}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={12} className="flex flex-row">
														<TextField
															id="ContractType"
															label="Contract Type *"
															select
															InputLabelProps={{
																shrink: true
															}}
															className={classNames(classes.textField, "mr-6")}
															value={this.state.ContractType === undefined ? 0 : this.state.ContractType}
															// onChange={this.handleChange('ContractType')}
															margin="dense"
															variant="outlined"
															style={{ minWidth: "100px", width: "30%" }}
														>
															{[{ value: 0, label: "Recurring" }
																, { value: 1, label: "One-Time" }
																, { value: 2, label: "Variable" }].map(option => (
																	<MenuItem key={option.value} value={option.value}>
																		{option.label}
																	</MenuItem>
																))}
														</TextField>

														<TextField
															type="number"
															inputProps={{ min: "0", max: "99", step: "1" }}
															id="TermMonths"
															label="Term Months *"
															InputLabelProps={{
																shrink: true
															}}
															className={classNames(classes.textField, "ml-6")}
															value={this.state.TermMonths}
															// onChange={this.handleChange('TermMonths')}
															margin="dense"
															variant="outlined"
															style={{ width: '10%', minWidth: '110px' }}
														/>
													</GridItem>

													<GridItem xs={12} sm={12} md={12} className="flex flex-row">
														<TextField
															id="AgreementType"
															label="Agreement Type *"
															select
															InputLabelProps={{
																shrink: true
															}}
															className={classNames(classes.textField, "mr-6")}
															value={this.state.AgreementType === undefined ? 1 : this.state.AgreementType}
															// onChange={this.handleChange('AgreementType')}
															margin="dense"
															variant="outlined"
															fullWidth
														>
															{[{ value: 0, label: "Customer" }
																, { value: 1, label: "Jani-King" }
																, { value: 2, label: "General" }
															].map(option => (
																<MenuItem key={option.value} value={option.value}>
																	{option.label}
																</MenuItem>
															))}
														</TextField>

														<TextField
															id="AcctExec"
															label="Acct Exec"
															select
															InputLabelProps={{
																shrink: true
															}}
															className={classNames(classes.textField, "ml-6")}
															value={this.state.AcctExec === undefined ? 0 : this.state.AcctExec}
															// onChange={this.handleChange('AcctExec')}
															margin="dense"
															variant="outlined"
															fullWidth
														>
															
														</TextField>
													</GridItem>




													<GridItem xs={12} sm={12} md={12} className="flex flex-row">
														<TextField
															type="date"
															id="SignDate"
															label="Sign Date *"
															className={classNames(classes.textField, "mr-6")}
															InputLabelProps={{
																shrink: true
															}}
															value={this.state.SignDate}
															// onChange={this.handleChange('SignDate')}
															margin="dense"
															variant="outlined"
															style={{ width: "20%", minWidth: "180px" }}
														/>
														<TextField
															type="date"
															id="StartDate"
															label="Start Date *"
															className={classNames(classes.textField, "mr-6 ml-6")}
															InputLabelProps={{
																shrink: true
															}}
															value={this.state.StartDate}
															// onChange={this.handleChange('StartDate')}
															margin="dense"
															variant="outlined"
															style={{ width: "20%", minWidth: "180px" }}
														/>

														<TextField
															type="date"
															id="ExpirationDate"
															label="Expiration Date *"
															className={classNames(classes.textField, "ml-6")}
															InputLabelProps={{
																shrink: true
															}}
															value={this.state.ExpirationDate}
															// onChange={this.handleChange('ExpirationDate')}
															margin="dense"
															variant="outlined"
															style={{ width: "20%", minWidth: "180px" }}
														/>
													</GridItem>
												</GridContainer>
											</Fragment>

										</Paper>

										<Paper className="flex flex-col p-12">
											<h3>Cleaning Schedule</h3>

										</Paper>
									</div>)
								: (<div>
									<Card className={classes.card} >
										<CardContent style={{ color: 'white' }}>
											<h2>Sales</h2>
											<Typography className={classes.pos} style={{ color: 'white' }}>
												Lifetime sum of your sale
                                    </Typography>
											<Typography variant="h5" component="h2" style={{ color: 'white' }}>
												{/* {this.props.customers.headerData.totalInvoice} */}
											</Typography>

										</CardContent>
									</Card>
									<Card className={classes.card} >
										<div className="mb-32 w-full sm:w-1/2 md:w-full pt-24">

											<FuseAnimate delay={600}>
												<div className="px-16 pb-8 text-18 font-300" >
													<h2 style={{ color: 'white' }}>How are your sales?</h2>
												</div>
											</FuseAnimate>

											<div className="widget w-full p-16">
												<Widget8 data={widgets_data.widget8} />
											</div>
										</div>
									</Card>
								</div>
								)}
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
	}, dispatch);
}

function mapStateToProps({ customers }) {
	return {
		customers: customers.customersDB,
		customerForm: customers.customerForm
	}
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SummaryPanel)));
