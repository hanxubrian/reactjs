import React, { Fragment } from 'react';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'
import moment from 'moment';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import {
	Icon, IconButton, Slide, FormControlLabel, Paper, Typography, InputAdornment, MenuItem, Divider, Snackbar, SnackbarContent,
	ListItemLink, Checkbox, Switch
} from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import PropTypes from 'prop-types';
import classNames from 'classnames';


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
		width: '90%',
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
	},
	backButton: {
		marginRight: theme.spacing.unit
	},
	completed: {
		display: 'inline-block'
	},
	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	//////////////////
	layoutForm: {
		flexDirection: 'row',
	},
	button: {
		marginRight: theme.spacing.unit,
		'& span': {
			textTransform: 'none'
		},
		margin: theme.spacing.unit
	},
	card: {
		width: '100%',
	},
	container: {
		position: 'relative',
		width: '100%'
	},
	formControl: {
		marginBottom: 24,
		minWidth: 200,
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 10,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
		maxHeight: 200,
		overflowY: 'scroll'
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	divider: {
		height: theme.spacing.unit * 2,
	},
	cardHeader: {
		backgroundColor: theme.palette.secondary.main,
		padding: '10px 24px',
		'& span': {
			color: 'white'
		}
	},
	tableTheadRow: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
	},

});

class WalkThruPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="flex flex-col flex-1">
				<div className={classNames("flex flex-col")}>
					<div className={classNames('items-center')}>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								type="date"
								id="Date"
								label="Date"
								className={classNames(classes.textField, "mr-6")}
								InputLabelProps={{
									shrink: true
								}}
								value={this.state.Date}
								onChange={this.handleChange('Date')}
								margin="dense"
								variant="outlined"
								fullWidth
								style={{ width: "20%", minWidth: "180px" }}
							/>
							<TextField
								type="date"
								id="WalkThroughDate"
								label="Walk Through Date"
								className={classNames(classes.textField, "mr-6 ml-6")}
								InputLabelProps={{
									shrink: true
								}}
								value={this.state.WalkThroughDate}
								onChange={this.handleChange('WalkThroughDate')}
								margin="dense"
								variant="outlined"
								fullWidth
								style={{ width: "20%", minWidth: "180px" }}
							/>
							<TextField
								type="date"
								id="StartDate"
								label="Start Date"
								className={classNames(classes.textField, "ml-6")}
								InputLabelProps={{
									shrink: true
								}}
								value={this.state.StartDate}
								onChange={this.handleChange('StartDate')}
								margin="dense"
								variant="outlined"
								fullWidth
								style={{ width: "20%", minWidth: "180px" }}
							/>

						</div>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="FranchiseName"
								label="Franchise Name"
								className={classes.textField}
								value={this.state.FranchiseName}
								onChange={this.handleChange('FranchiseName')}
								margin="dense"
								variant="outlined"
								style={{ minWidth: '100px', width: '30%' }}
							/>
						</div>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<h3 style={{ marginTop: 20 }}>Location Checklist</h3>
						</div>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={this.state.LightSwitches} onChange={this.handleChange('LightSwitches')} value={this.state.LightSwitches} />}
								label="Light Switches?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.BreakersPanel} onChange={this.handleChange('BreakersPanel')} value={this.state.BreakersPanel} />}
								label="Breaker's Panel?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.ContactsOffice} onChange={this.handleChange('ContactsOffice')} value={this.state.ContactsOffice} />}
								label="Contact's Office?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.StorageAreas} onChange={this.handleChange('StorageAreas')} value={this.state.StorageAreas} />}
								label="Storage Areas?"
								style={{ width: '100%' }}
							/>

						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={this.state.WaterSource} onChange={this.handleChange('WaterSource')} value={this.state.WaterSource} />}
								label="Water Source?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.TrashDisposal} onChange={this.handleChange('TrashDisposal')} value={this.state.TrashDisposal} />}
								label="Trash Disposal?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.Recycling} onChange={this.handleChange('Recycling')} value={this.state.Recycling} />}
								label="Recycling?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.AccountSupplies} onChange={this.handleChange('AccountSupplies')} value={this.state.AccountSupplies} />}
								label="Account Supplies?"
								style={{ width: '100%' }}
							/>

						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<h3 style={{ marginTop: 20 }}>Security Checklist</h3>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={this.state.KeyEntry} onChange={this.handleChange('KeyEntry')} value={this.state.KeyEntry} />}
								label="Key? Entry:"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.AlarmSystem} onChange={this.handleChange('AlarmSystem')} value={this.state.AlarmSystem} />}
								label="Alarm System"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.RestroomPaperDispensers} onChange={this.handleChange('RestroomPaperDispensers')} value={this.state.RestroomPaperDispensers} />}
								label="Restroom Paper Dispensers?"
								style={{ width: '100%' }}
							/>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="SecurityProcedures"
								label="Security Procedures?"
								className={classes.textField}
								value={this.state.SecurityProcedures}
								onChange={this.handleChange('SecurityProcedures')}
								margin="dense"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</div>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="EmergencyNamesAndTelephoneNumbers1"
								label="Emergency Names And Telephone Numbers 1"
								className={classes.textField}
								value={this.state.EmergencyNamesAndTelephoneNumbers1}
								onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers1')}
								margin="dense"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</div>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="EmergencyNamesAndTelephoneNumbers2"
								label="Emergency Names And Telephone Numbers 2"
								className={classes.textField}
								value={this.state.EmergencyNamesAndTelephoneNumbers2}
								onChange={this.handleChange('EmergencyNamesAndTelephoneNumbers2')}
								margin="dense"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="ProblemConnernsAreasNeedingImprovment"
								label="Problem, connerns, areas needing improvment and general comments?"
								multiline
								rows="2"
								rowsMax="2"
								className={classes.textField}
								value={this.state.ProblemConnernsAreasNeedingImprovment}
								onChange={this.handleChange('ProblemConnernsAreasNeedingImprovment')}
								margin="dense"
								variant="outlined"
								style={{ width: '100%' }}
							/>
						</div>


						<div xs={12} sm={12} md={12} className="flex flex-row">
							<h3 style={{ marginTop: 20, width: '100%' }}>Paperwork Checklist</h3>
							<h3 style={{ marginTop: 20, width: '100%' }}>Signatures</h3>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<div xs={12} sm={12} md={12} className="flex flex-col" style={{ justifyContent: 'space-evenly' }}>
								<FormControlLabel
									control={<Switch checked={this.state.SignedMaintenaceAgreement} onChange={this.handleChange('SignedMaintenaceAgreement')} value={this.state.SignedMaintenaceAgreement} />}
									label="1. Signed Maintenace Agreement?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={this.state.SignedPricePage} onChange={this.handleChange('SignedPricePage')} value={this.state.SignedPricePage} />}
									label="2. Signed Price Page?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={this.state.SignedCleaningSchedule} onChange={this.handleChange('SignedCleaningSchedule')} value={this.state.SignedCleaningSchedule} />}
									label="3. Signed Cleaning Schedule?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={this.state.AnalysisOfAccount} onChange={this.handleChange('AnalysisOfAccount')} value={this.state.AnalysisOfAccount} />}
									label="4. Analysis Of Account?"
									style={{ width: '100%' }}
								/>
								<FormControlLabel
									control={<Switch checked={this.state.AccountBidSheet} onChange={this.handleChange('AccountBidSheet')} value={this.state.AccountBidSheet} />}
									label="5. Account Bid Sheet?"
									style={{ width: '100%' }}
								/>
							</div>

							<div xs={12} sm={12} md={12} className="flex flex-col" style={{ justifyContent: 'space-evenly' }}>
								<TextField
									id="SignatureAE"
									label="A.E."
									className={classes.textField}
									value={this.state.SignatureAE}
									onChange={this.handleChange('SignatureAE')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									id="SignatureOPS"
									label="OPS"
									className={classes.textField}
									value={this.state.SignatureOPS}
									onChange={this.handleChange('SignatureOPS')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									id="SignatureRD"
									label="R.D."
									className={classes.textField}
									value={this.state.SignatureRD}
									onChange={this.handleChange('SignatureRD')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
								<TextField
									id="SignatureFO"
									label="F.O."
									className={classes.textField}
									value={this.state.SignatureFO}
									onChange={this.handleChange('SignatureFO')}
									margin="dense"
									variant="outlined"
									style={{ width: '100%' }}
								/>
							</div>
						</div>


						<div xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={this.state.UploadedDocuments} onChange={this.handleChange('UploadedDocuments')} value={this.state.UploadedDocuments} />}
								label="Uploaded Documents?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.EmailedToCustomerService} onChange={this.handleChange('EmailedToCustomerService')} value={this.state.EmailedToCustomerService} />}
								label="Emailed to Customer Service?"
								style={{ width: '100%' }}
							/>

							<FormControlLabel
								control={<Switch checked={this.state.BussinessCardAttached} onChange={this.handleChange('BussinessCardAttached')} value={this.state.BussinessCardAttached} />}
								label="Bussiness Card Attached?"
								style={{ width: '100%' }}
							/>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<FormControlLabel
								control={<Switch checked={this.state.TransactionCompletedAndSentToFranchiseAccounting} onChange={this.handleChange('TransactionCompletedAndSentToFranchiseAccounting')} value={this.state.TransactionCompletedAndSentToFranchiseAccounting} />}
								label="Transaction A Completed and Sent to Franchise Accounting?"
								style={{ width: '100%' }}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

	}, dispatch);
}

function mapStateToProps({ customers, auth }) {
	return {

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalkThruPage)));
