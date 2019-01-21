import React, {Component} from 'react';
import {Grid, Paper, withStyles} from '@material-ui/core';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import {FuseThemes} from '@fuse';

import 'date-fns'
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//Store
import * as Actions from 'store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

//third party
import moment from "moment"

import {UPDATE_FROM_DATE_INVOICE, UPDATE_TO_DATE_INVOICE} from "../../../../store/actions";


const styles = theme => ({
    root : {
        '& white': {
            color: 'white!important'
        }
    },
    panel: {
        position                      : 'absolute',
        width                         : 250,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        left                         :  -250,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(50px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition  : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened1'                    : {
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

class FilterPanel extends Component {
    state = {
        checkedEbill: true,
        checkedPrint: true,
        invoiceStatus: [],
        FromDate: undefined,
        ToDate: undefined,
        invoiceDateOption: THIS_MONTH,
        invoiceDatePeriod: moment(),
    };

    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
            checkedEbill: this.props.transactionStatus.checkedEbill,
            checkedPrint: this.props.transactionStatus.checkedPrint});

        this.setState({invoiceStatus: this.props.invoiceStatus});
        this.setState({FromDate: this.props.FromDate});
        this.setState({ToDate: this.props.ToDate});
        this.setState({invoiceDateOption: this.props.invoiceDateOption});
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.invoiceStatus!==this.props.invoiceStatus){
            this.setState({invoiceStatus: this.props.invoiceStatus})
        }
        if(prevProps.FromDate!==this.props.FromDate){
            this.setState({FromDate: this.props.FromDate})
        }
        if(prevProps.ToDate!==this.props.ToDate){
            this.setState({ToDate: this.props.ToDate})
        }

        if(prevProps.invoiceDateOption!==this.props.invoiceDateOption){
            this.setState({invoiceDateOption: this.props.invoiceDateOption})
        }
    }


    handleChange = (index, name) => event => {
        const iStatus = this.state.invoiceStatus;
        iStatus[index]['checked'+name] = event.target.checked;

        this.setState({invoiceStatus: iStatus });
        this.props.updateInvoiceStatus(iStatus)
    };

    handleChange1 = event => {
        this.setState({[event.target.name]: event.target.value});
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
                if(quarter===1)
                    startDate = moment().subtract(1, 'years').quarter(4).startOf('quarter');
                else
                    startDate = moment().quarter(quarter-1).startOf('quarter');

                if(quarter===1)
                    endDate = moment().quarter(quarter).startOf('quarter').subtract(1, 'days');
                else
                    endDate = moment().quarter(quarter-1).endOf('quarter');
                break;
            case LAST_YEAR:
                year = moment().year();
                startDate = moment().subtract(1, 'years').startOf('year');
                endDate = moment().subtract(1, 'years').startOf('year').add(1,'years').subtract(1,'days');
                break;
            case PERIOD:
                year = moment(this.state.invoiceDatePeriod).year();
                let month = moment(this.state.invoiceDatePeriod).month();
                startDate = moment().year(year).month(month).startOf('month');
                endDate = moment().year(year).month(month).endOf('month');
        }
        if(event.target.value!==CUSTOM_DATE){
            this.props.updateDate(UPDATE_FROM_DATE_INVOICE, startDate.format("MM/DD/YYYY"));
            this.props.updateDate(UPDATE_TO_DATE_INVOICE, endDate.format("MM/DD/YYYY"));
        }
    };

    handleInvoiceFromDateChange = date => {
        this.setState({FromDate: date});
        this.props.updateDate(UPDATE_FROM_DATE_INVOICE, moment(date).format("MM/DD/YYYY"));
    };

    handleInvoiceToDateChange = date => {
        this.setState({ ToDate: date });
        this.props.updateDate(UPDATE_TO_DATE_INVOICE, moment(date).format("MM/DD/YYYY"));
    };

    handlePeriodChange = date => {
        this.setState({ invoiceDatePeriod: date });
        let year = moment(date).year();
        let month = moment(date).month();
        let startDate = moment().year(year).month(month).startOf('month').format("MM/DD/YYYY");
        let endDate = moment().year(year).month(month).endOf('month').format("MM/DD/YYYY");

        this.props.updateDate(UPDATE_FROM_DATE_INVOICE, startDate);
        this.props.updateDate(UPDATE_TO_DATE_INVOICE, endDate);
    };

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">
                        <FormControl className={classes.formControl} style={{width: 200}}>
                            <h3 className="mb-20">Payments Date</h3>
                            <Select
                                value={this.state.invoiceDateOption}
                                onChange={this.handleChange1}
                                inputProps={{
                                    name: 'invoiceDateOption',
                                    id  : 'invoiceDateOption'
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

                        { this.state.invoiceDateOption===CUSTOM_DATE && (
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <div className="flex flex-col mt-20">
                                    <h3 className="mb-20">Custom Date</h3>
                                    <DatePicker
                                        margin="none"
                                        label="From Date"
                                        name="FromDate"
                                        variant="outlined"
                                        format="MM/DD/YYYY"
                                        value={this.state.FromDate}
                                        onChange={this.handleInvoiceFromDateChange}
                                        fullWidth
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
                                        fullWidth
                                        required
                                        color="secondary"
                                        style={{marginTop: '30px!important'}}
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
                        )}
                        { this.state.invoiceDateOption===PERIOD && (
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <div className="flex flex-col mt-20">
                                    <h3 className="mb-20">Choose a Period</h3>
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
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        openToYearSelection={true}
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
                        )}

                        <div style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                            <h3>Payments Status</h3>
                            {this.state.invoiceStatus.length>0 && this.state.invoiceStatus.map((iv, index)=> {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Switch
                                                checked={iv['checked'+iv.TransactionStatusListId]}
                                                onChange={this.handleChange(index, iv.TransactionStatusListId)}
                                                value="checkedPaid"
                                            />
                                        }
                                        label={iv.Name}
                                    />
                                )
                            })}
                            <br></br>
                            <h3>Delivery Method</h3>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedEbill}
                                        onChange={this.handleChange('checkedEbill')}
                                        value="checkedEbill"
                                    />
                                }
                                label="Ebill (Email)"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedPrint}
                                        onChange={this.handleChange('checkedPrint')}
                                        value="checkedPrint"
                                    />
                                }
                                label="Print"
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleStatus: Actions.toggleStatus,
        updateDate: Actions.updateDate,
        updateInvoiceStatus: Actions.updateInvoiceStatus,
        updateInvoiceDateOption: Actions.updateInvoiceDateOption,
        updatePeriodOption: Actions.updatePeriodOption
    }, dispatch);
}

function mapStateToProps({invoices, fuse})
{
    return {
        filterState: invoices.bOpenedFilterPanel,
        transactionStatus: invoices.transactionStatus,
        invoiceStatus: invoices.invoiceStatus,
        FromDate: invoices.FromDate,
        ToDate: invoices.ToDate,
        settings       : fuse.settings.current,
        invoiceDateOption: invoices.invoiceDateOption,
    }
}

export default (withStyles(styles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
