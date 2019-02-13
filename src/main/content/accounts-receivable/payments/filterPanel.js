import React, { Component } from 'react';
import _ from "lodash";
import { Grid, Paper, withStyles } from '@material-ui/core';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MenuItem, FormControl, Select, RadioGroup, Radio, Divider } from '@material-ui/core';
import { FuseThemes } from '@fuse';

import 'date-fns'
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//Store
import * as Actions from 'store/actions';
import { FILTER_PAYMENT_START_DATE, FILTER_PAYMENT_END_DATE } from 'store/actions/account_receivable.payments.actions.js';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

//third party
import moment from "moment"
import { filter } from 'rsvp';

const styles = theme => ({
	root: {
		'& white': {
			color: 'white!important'
		}
	},
	panel: {
		position: 'absolute',
		width: 250,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[3],
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		left: -250,
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
			transform: 'translateX(250px)'
		}
	}
});

const THIS_WEEK = 1;
const THIS_WEEK_TO_DATE = 2;
const THIS_MONTH = 3;
const THIS_MONTH_TO_DATE = 4;
const THIS_QUARTER = 5;
const THIS_QUARTER_TO_DATE = 6;
const THIS_YEAR = 7;
const THIS_YEAR_TO_DATE = 8;
const TODAY = 9;
const YESTERDAY = 10;
const LAST_QUARTER = 11;
const LAST_YEAR = 12;
const CUSTOM_DATE = 13;
const PERIOD = 14;

const PAYMENT_STATUS_LIST = ["Open", "Paid"]
const PAYMENT_HISTORY_TYPE_LIST = [
	"Check",
	"CreditCard",
	"EFT",
	"Lockbox",
	"CreditFromOverpayment",
	"ManualCreditCard",
]
const WAIT_INTERVAL = 1000
class FilterPanel extends Component {

	constructor(props) {
		super(props)

		this.state = {
			checkedEbill: true,
			checkedPrint: true,
			invoiceStatus: [],
			FromDate: undefined,
			ToDate: undefined,
			invoiceDateOption: THIS_MONTH,
			invoiceDatePeriod: moment(),

			isCustomerNameNoGrouping: true,

			filterParam: {
				paymentStatus: [],
				paymentHistoryTypes: [],
				searchText: "",
				fromDate: "",
				toDate: "",
			}
		}
	}
	componentDidMount() {
		this.setState({
			isCustomerNameNoGrouping: this.props.isCustomerNameNoGrouping
		})
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.isCustomerNameNoGrouping !== this.props.isCustomerNameNoGrouping) {
			this.setState({
				isCustomerNameNoGrouping: nextProps.isCustomerNameNoGrouping
			})
		}
		if (!_.isEqual(nextProps.filterParam, this.props.filterParam)) {
			this.setState({
				filterParam: { ...nextProps.filterParam }
			})
		}

		// if (nextProps.filterParam.paymentHistoryTypes !== this.props.filterParam.paymentHistoryTypes) {
		// 	console.log("nextProps.filter.paymentHistoryTypes", nextProps.filterParam.paymentHistoryTypes, this.props.filterParam.paymentHistoryTypes)
		// 	this.setState({
		// 		paymentHistoryFilterPaymentTypes: nextProps.filterParam.paymentHistoryTypes
		// 	})
		// }
	}

	componentWillMount() {
		this.setState({
			checkedEbill: this.props.transactionStatus.checkedEbill,
			checkedPrint: this.props.transactionStatus.checkedPrint
		});

		this.setState({ invoiceStatus: this.props.invoiceStatus });
		this.setState({ FromDate: this.props.filterParam.fromDate });
		this.setState({ ToDate: this.props.filterParam.toDate });
		this.setState({ invoiceDateOption: this.props.invoiceDateOption });

		console.log("this.props.filterParam", this.props.filterParam)
		this.setState({
			filterParam: { ...this.props.filterParam },
		})


	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.invoiceStatus !== this.props.invoiceStatus) {
			this.setState({ invoiceStatus: this.props.invoiceStatus })
		}
		if (prevProps.filterParam.fromDate !== this.props.filterParam.fromDate) {
			this.setState({ FromDate: this.props.filterParam.fromDate })
		}
		if (prevProps.filterParam.toDate !== this.props.filterParam.toDate) {
			this.setState({ ToDate: this.props.filterParam.toDate })
		}

		if (prevProps.invoiceDateOption !== this.props.invoiceDateOption) {
			this.setState({ invoiceDateOption: this.props.invoiceDateOption })
		}
	}

	handleChangeChecked = name => event => {
		const value = event.target.checked
		this.setState({ [name]: value });
		switch (name) {
			case "isCustomerNameNoGrouping":
				this.props.setCustomerNameNoGrouping(value)
				break
		}
	};

	handleChange = (index, name) => event => {
		const iStatus = this.state.invoiceStatus;
		iStatus[index]['checked' + name] = event.target.checked;

		this.setState({ invoiceStatus: iStatus });
		this.props.updateInvoiceStatus(iStatus)
	};

	paymentTypeFilterTimer = null
	paymentStatusilterTimer = null

	handleChange = name => event => {
		const value = event.target.value
		const checked = event.target.checked
		if (name === "viewMode") {

			// if (event.target.value === "PaymentHistory") {
			// 	this.props.showErrorDialog({
			// 		show: true,
			// 		title: "Coming Soon...",
			// 		message: "Currently Working on this, Feature will be available later."
			// 	})
			// } else {
			// 	this.props.setViewMode(event.target.value)
			// }
			this.props.setViewMode(event.target.value)
		} else if (name === "filterParam.paymentHistoryTypes") {
			let newPaymentHistoryTypes = [...this.state.filterParam.paymentHistoryTypes]
			if (checked) {
				if (value === "All") {
					newPaymentHistoryTypes = PAYMENT_HISTORY_TYPE_LIST
				} else {
					newPaymentHistoryTypes = [...new Set([...newPaymentHistoryTypes, value])]
				}
			} else {
				if (value === "All") {
					newPaymentHistoryTypes = []
				} else {
					newPaymentHistoryTypes.splice(newPaymentHistoryTypes.indexOf(value), 1)
				}
			}
			this.setState({
				filterParam: {
					...this.state.filterParam,
					paymentHistoryTypes: newPaymentHistoryTypes
				}
			})

			clearTimeout(this.paymentTypeFilterTimer)
			this.paymentTypeFilterTimer = setTimeout(
				this.props.setPaymentHistoryFilterPaymentTypes,
				WAIT_INTERVAL,
				newPaymentHistoryTypes)

			// this.props.setPaymentHistoryFilterPaymentTypes(newPaymentHistoryTypes)

			return
		} else if (name === "filterParam.paymentStatus") {
			let newPaymentStatuses = [...this.state.filterParam.paymentStatus]
			if (checked) {
				if (value === "All") {
					newPaymentStatuses = PAYMENT_STATUS_LIST
				} else {
					newPaymentStatuses = [...new Set([...newPaymentStatuses, value])]
				}
			} else {
				if (value === "All") {
					newPaymentStatuses = []
				} else {
					newPaymentStatuses.splice(newPaymentStatuses.indexOf(value), 1)
					// if (newPaymentStatuses.length === 0) {
					// 	newPaymentStatuses = ["-"]
					// }
				}
			}
			this.setState({
				filterParam: {
					...this.state.filterParam,
					paymentStatus: newPaymentStatuses
				}
			})

			clearTimeout(this.paymentStatusilterTimer)
			this.paymentStatusilterTimer = setTimeout(
				this.props.setPaymentStatusFitler,
				WAIT_INTERVAL,
				newPaymentStatuses)

			// this.props.setPaymentStatusFitler(newPaymentStatuses)

			console.log("newPaymentStatuses", newPaymentStatuses)
			return
		}
		this.setState({ [name]: value });
	}

	handleChangeDateSelection = event => {
		this.setState({ [event.target.name]: event.target.value });
		let startDate, endDate, quarter, year;
		this.props.updateInvoiceDateOption(event.target.value);

		switch (event.target.value) {
			case THIS_WEEK:
				startDate = moment().day(0);
				endDate = moment().day(6);
				break;
			case THIS_WEEK_TO_DATE:
				startDate = moment().day(0);
				endDate = moment();
				break;
			case THIS_MONTH:
				startDate = moment().date(1);
				endDate = moment(moment().date(1)).endOf('month');
				break;
			case THIS_MONTH_TO_DATE:
				startDate = moment().date(1);
				endDate = moment();
				break;
			case THIS_QUARTER:
				quarter = moment().quarter();
				startDate = moment().quarter(quarter).startOf('quarter');
				endDate = moment().quarter(quarter).endOf('quarter');
				break;
			case THIS_QUARTER_TO_DATE:
				quarter = moment().quarter();
				startDate = moment().quarter(quarter).startOf('quarter');
				endDate = moment();
				break;
			case THIS_YEAR:
				year = moment().year();
				startDate = moment().startOf('year');
				endDate = moment().endOf('year');
				break;
			case THIS_YEAR_TO_DATE:
				year = moment().year();
				startDate = moment().startOf('year');
				endDate = moment();
				break;
			case TODAY:
				startDate = moment();
				endDate = startDate;
				break;
			case YESTERDAY:
				startDate = moment().subtract(1, 'days');
				endDate = startDate;
				break;
			case LAST_QUARTER:
				quarter = moment().quarter();
				if (quarter === 1)
					startDate = moment().subtract(1, 'years').quarter(4).startOf('quarter');
				else
					startDate = moment().quarter(quarter - 1).startOf('quarter');

				if (quarter === 1)
					endDate = moment().quarter(quarter).startOf('quarter').subtract(1, 'days');
				else
					endDate = moment().quarter(quarter - 1).endOf('quarter');
				break;
			case LAST_YEAR:
				year = moment().year();
				startDate = moment().subtract(1, 'years').startOf('year');
				endDate = moment().subtract(1, 'years').startOf('year').add(1, 'years').subtract(1, 'days');
				break;
			case PERIOD:
				year = moment(this.state.invoiceDatePeriod).year();
				let month = moment(this.state.invoiceDatePeriod).month();
				startDate = moment().year(year).month(month).startOf('month');
				endDate = moment().year(year).month(month).endOf('month');
		}
		if (event.target.value !== CUSTOM_DATE) {
			this.props.updateFilterDate(FILTER_PAYMENT_START_DATE, startDate.format("MM/DD/YYYY"));
			this.props.updateFilterDate(FILTER_PAYMENT_END_DATE, endDate.format("MM/DD/YYYY"));
		}
	};

	handleInvoiceFromDateChange = date => {
		this.setState({ FromDate: date });
		this.props.updateFilterDate(FILTER_PAYMENT_START_DATE, moment(date).format("MM/DD/YYYY"));
	};

	handleInvoiceToDateChange = date => {
		this.setState({ ToDate: date });
		this.props.updateFilterDate(FILTER_PAYMENT_END_DATE, moment(date).format("MM/DD/YYYY"));
	};

	handlePeriodChange = date => {
		this.setState({ invoiceDatePeriod: date });
		let year = moment(date).year();
		let month = moment(date).month();
		let startDate = moment().year(year).month(month).startOf('month').format("MM/DD/YYYY");
		let endDate = moment().year(year).month(month).endOf('month').format("MM/DD/YYYY");

		this.props.updateFilterDate(FILTER_PAYMENT_START_DATE, startDate);
		this.props.updateFilterDate(FILTER_PAYMENT_END_DATE, endDate);
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classNames(classes.root, "flex flex-col p-24")}>
				{/* <div className={classNames()}> */}
				{/* <Paper className="flex flex-1 flex-col min-h-px p-20"> */}
				<FormControl className={classes.formControl} style={{ width: 200 }}>
					<h3 className="mb-20">Payments Date</h3>
					<Select
						value={this.state.invoiceDateOption}
						onChange={this.handleChangeDateSelection}
						inputProps={{
							name: 'invoiceDateOption',
							id: 'invoiceDateOption'
						}}
					>
						<MenuItem value={THIS_WEEK}>This Week</MenuItem>
						<MenuItem value={THIS_WEEK_TO_DATE}>This Week-to-date</MenuItem>
						<MenuItem value={THIS_MONTH}>This Month</MenuItem>
						<MenuItem value={THIS_MONTH_TO_DATE}>This Month-to-date</MenuItem>
						<MenuItem value={THIS_QUARTER}>This Quarter</MenuItem>
						<MenuItem value={THIS_QUARTER_TO_DATE}>This Quarter-to-Date</MenuItem>
						<MenuItem value={THIS_YEAR}>This Year</MenuItem>
						<MenuItem value={THIS_YEAR_TO_DATE}>This Year-to-date</MenuItem>
						<MenuItem value={TODAY}>Today</MenuItem>
						<MenuItem value={YESTERDAY}>Yesterday</MenuItem>
						<MenuItem value={LAST_QUARTER}>Last Quarter</MenuItem>
						<MenuItem value={LAST_YEAR}>Last Year</MenuItem>
						<MenuItem value={CUSTOM_DATE}>Custom Date</MenuItem>
						<MenuItem value={PERIOD}>Period</MenuItem>
					</Select>
				</FormControl>
				<br></br>

				{this.state.invoiceDateOption === CUSTOM_DATE && (
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<div className="flex flex-col mt-20" style={{ width: 200 }}>
							{/* <h3 className="mb-20">Custom Date</h3> */}
							<DatePicker
								margin="none"
								label="From Date"
								name="FromDate"
								variant="outlined"
								format="MM/DD/YYYY"
								value={this.state.FromDate}
								onChange={this.handleInvoiceFromDateChange}
								// fullWidth
								required
								color="secondary"
							/>
							<br></br>
							<DatePicker
								margin="none"
								label="To Date"
								name="ToDate"
								variant="outlined"
								format="MM/DD/YYYY"
								value={this.state.ToDate}
								onChange={this.handleInvoiceToDateChange}
								// fullWidth
								required
								color="secondary"
								style={{ marginTop: '30px!important' }}
							/>
						</div>
					</MuiPickersUtilsProvider>
				)}
				{this.state.invoiceDateOption === PERIOD && (
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<div className="flex flex-col mt-20" style={{ width: 200 }}>
							{/* <h3 className="mb-20">Choose a Period</h3> */}
							<DatePicker
								margin="none"
								label="Period"
								name="invoiceDatePeriod"
								variant="outlined"
								format="MM/YYYY"
								value={this.state.invoiceDatePeriod}
								onChange={this.handlePeriodChange}
								fullWidth
								InputProps={{
									classes: {
										input: classes.input,
									},
								}}
								InputLabelProps={{
									shrink: true,
									classes: { outlined: classes.label }
								}}
								openToYearSelection={true}
							/>
						</div>
					</MuiPickersUtilsProvider>
				)}
				<Divider variant="middle" className="mt-12 mb-6" />
				<div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
					<h3>View Mode</h3>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.isCustomerNameNoGrouping}
								onChange={this.handleChangeChecked('isCustomerNameNoGrouping')}
							/>
						}
						label="Grouping"
					/>

					<RadioGroup
						aria-label="Location"
						name="Location"
						className={classes.group}
						value={this.props.viewMode}
					>
						<FormControlLabel value="Invoice" control={<Radio onChange={this.handleChange('viewMode')} />} label="Invoice" />
						<FormControlLabel value="PaymentHistory" control={<Radio onChange={this.handleChange('viewMode')} />} label="Payment History" />
					</RadioGroup>
				</div>

				{this.props.viewMode === "PaymentHistory" && <Divider variant="middle" className="mt-12 mb-6" />}

				{this.props.viewMode === "PaymentHistory" && <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
					<h3>Payment Type</h3>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.filterParam.paymentHistoryTypes.length >= PAYMENT_HISTORY_TYPE_LIST.length}
								onChange={this.handleChange("filterParam.paymentHistoryTypes")}
								value="All"
							/>
						}
						label="All"
					/>
					{
						PAYMENT_HISTORY_TYPE_LIST.map((x, index) => {
							return (
								<FormControlLabel
									key={index}
									control={
										<Switch
											checked={this.state.filterParam.paymentHistoryTypes.indexOf(x) > -1}
											onChange={this.handleChange("filterParam.paymentHistoryTypes")}
											value={x}
										/>
									}
									label={x}
								/>
							)
						})
					}
				</div>
				}

				{this.props.viewMode === "Invoice" &&
					<div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
						<Divider variant="middle" className="mt-12 mb-6" />
						<h3>Payment Status</h3>
						<FormControlLabel
							control={
								<Switch
									checked={this.state.filterParam.paymentStatus.length >= PAYMENT_STATUS_LIST.length}
									onChange={this.handleChange('filterParam.paymentStatus')}
									value="All"
								/>
							}
							label="All"
						/>
						{
							PAYMENT_STATUS_LIST.map((x, index) => (
								<FormControlLabel key={index}
									control={
										<Switch
											checked={this.state.filterParam.paymentStatus.indexOf(x) > -1}
											onChange={this.handleChange('filterParam.paymentStatus')}
											value={x}

										/>
									}
									label={x}
								/>
							))
						}
					</div>
				}
				{/* </Paper> */}
				{/* </div> */}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleStatus: Actions.toggleStatus,

		updateFilterDate: Actions.updateFilterDate,

		updateInvoiceStatus: Actions.updateInvoiceStatus,
		updateInvoiceDateOption: Actions.updateInvoiceDateOption,
		updatePeriodOption: Actions.updatePeriodOption,

		setPaymentStatusFitler: Actions.setPaymentStatusFitler,
		setViewMode: Actions.setViewMode,

		setCustomerNameNoGrouping: Actions.setCustomerNameNoGrouping,
		showErrorDialog: Actions.showErrorDialog,

		setPaymentHistoryFilterPaymentTypes: Actions.setPaymentHistoryFilterPaymentTypes,

	}, dispatch);
}

function mapStateToProps({ auth, invoices, fuse, accountReceivablePayments }) {
	return {
		filterState: invoices.bOpenedFilterPanel,
		transactionStatus: invoices.transactionStatus,
		invoiceStatus: invoices.invoiceStatus,
		FromDate: invoices.FromDate,
		ToDate: invoices.ToDate,
		settings: fuse.settings.current,
		invoiceDateOption: invoices.invoiceDateOption,

		invoiceDateOption: invoices.invoiceDateOption,

		viewMode: accountReceivablePayments.viewMode,
		isCustomerNameNoGrouping: accountReceivablePayments.isCustomerNameNoGrouping,
		filterParam: accountReceivablePayments.filterParam,

		regionId: auth.login.defaultRegionId,
	}
}

export default (withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
