import React, {Component} from 'react';
import {Paper, withStyles} from '@material-ui/core';
import keycode from 'keycode';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import {FuseThemes} from '@fuse';

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//Store
import * as Actions from 'store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

//third party
import moment from "moment"
import _ from "lodash"

import {UPDATE_FROM_DATE_INVOICE, UPDATE_TO_DATE_INVOICE} from "../../../../store/actions";


const styles = theme => ({
    root : {
        '& input, & label': {
            // color: 'white'
        },
        '& fieldset': {
            // borderColor: 'white!important'
        },
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
        chargebackStatus: [],
        FromDate: undefined,
        ToDate: undefined,
        chargebackDateOption: THIS_MONTH,
        chargebackDatePeriodMonth: moment().month(),
        chargebackDatePeriodYear: moment().year(),
    };

    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
            checkedEbill: this.props.transactionStatus.checkedEbill,
            checkedPrint: this.props.transactionStatus.checkedPrint});

        this.setState({chargebackStatus: this.props.chargebackStatus});
        this.setState({FromDate: this.props.FromDate});
        this.setState({ToDate: this.props.ToDate});
        this.setState({chargebackDateOption: this.props.chargebackDateOption});
        this.setState({chargebackDatePeriodMonth: this.props.chargebackDatePeriodMonth});
        this.setState({chargebackDatePeriodYear: this.props.chargebackDatePeriodYear});
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.chargebackStatus!==this.props.chargebackStatus){
            this.setState({chargebackStatus: this.props.chargebackStatus})
        }
        if(prevProps.FromDate!==this.props.FromDate){
            this.setState({FromDate: this.props.FromDate})
        }
        if(prevProps.ToDate!==this.props.ToDate){
            this.setState({ToDate: this.props.ToDate})
        }

        if(prevProps.chargebackDateOption!==this.props.chargebackDateOption){
            this.setState({chargebackDateOption: this.props.chargebackDateOption})
        }

        if(prevState.chargebackDatePeriodYear !== this.state.chargebackDatePeriodYear ||
            prevState.chargebackDatePeriodMonth !== this.state.chargebackDatePeriodMonth) {
            let startDate, endDate;
            startDate = moment().year(this.state.chargebackDatePeriodYear).month(this.state.chargebackDatePeriodMonth).startOf('month').format("MM/DD/YYYY");
            endDate = moment().year(this.state.chargebackDatePeriodYear).month(this.state.chargebackDatePeriodMonth).endOf('month').format("MM/DD/YYYY");
            this.props.updateDate(UPDATE_FROM_DATE_INVOICE, startDate);
            this.props.updateDate(UPDATE_TO_DATE_INVOICE, endDate);
        }

        if ( this.props.state !== prevProps.state )
        {
            if ( this.props.state )
            {
                document.addEventListener("keydown", this.handleDocumentKeyDown);
            }
            else
            {
                document.removeEventListener('keydown', this.handleDocumentKeyDown);
            }
        }
    }

    componentWillUnmount()
    {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    handleDocumentKeyDown = event => {
        if ( keycode(event) === 'esc' )
        {
            this.props.closeFilterPanel();
        }
    };

    handleChange = (index, name) => event => {
		const iStatus = this.state.chargebackStatus;
		debugger
        iStatus[index]['checked'+name] = event.target.checked;

        this.setState({chargebackStatus: iStatus });
        this.props.updatedChargebackStatus(iStatus)
    };

    handleChange1 = event => {
        this.setState({[event.target.name]: event.target.value});
        let startDate, endDate, quarter, year;
        this.props.updatedChargebackDateOption(event.target.value);

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
                startDate = moment().year(this.state.chargebackDatePeriodYear).month(this.state.chargebackDatePeriodMonth).startOf('month');
                endDate = moment().year(this.state.chargebackDatePeriodYear).month(this.state.chargebackDatePeriodMonth).endOf('month');
        }
        if(event.target.value!==CUSTOM_DATE){
            this.props.updateDate(UPDATE_FROM_DATE_INVOICE, startDate.format("MM/DD/YYYY"));
            this.props.updateDate(UPDATE_TO_DATE_INVOICE, endDate.format("MM/DD/YYYY"));
        }
    };

    handleChangePeriod = event =>{
        this.setState({[event.target.name]: event.target.value});
        this.props.updatePeriodOption(event.target.name, event.target.value);
    };

    handledChargebackFromDateChange = date => {
        this.setState({FromDate: date});
        this.props.updateDate(UPDATE_FROM_DATE_INVOICE, moment(date).format("MM/DD/YYYY"));
    };

    handledChargebackToDateChange = date => {
        this.setState({ ToDate: date });
        this.props.updateDate(UPDATE_TO_DATE_INVOICE, moment(date).format("MM/DD/YYYY"));
    };

    render()
    {
        const {classes} = this.props;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const years = _.range(moment().year(), 2000,-1);
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">
                        <FormControl className={classes.formControl} style={{width: 200}}>
                            <h3 className="mb-20">Chargeback Date</h3>
                            {/* <Select
                                value={this.state.chargebackDateOption}
                                onChange={this.handleChange1}
                                inputProps={{
                                    name: 'chargebackDateOption',
                                    id  : 'chargebackDateOption'
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
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
                            </Select> */}
                        </FormControl>
                        <br></br>

                        { this.state.chargebackDateOption===CUSTOM_DATE && (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <div className="flex flex-col mt-20">
                                    <h3 className="mb-20">Custom Date</h3>
                                    <DatePicker
                                        margin="none"
                                        label="From Date"
                                        name="FromDate"
                                        variant="outlined"
                                        format="MM/dd/yyyy"
                                        value={this.state.FromDate}
                                        onChange={this.handledChargebackFromDateChange}
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
                                        format="MM/dd/yyyy"
                                        value={this.state.ToDate}
                                        onChange={this.handledChargebackToDateChange}
                                        fullWidth
                                        required
                                        color="secondary"
                                        style={{marginTop: '30px!important'}}
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
                        )}
                        { this.state.chargebackDateOption===PERIOD && (
                            <div className="flex flex-col mt-20">
                                <h3 className="mb-20">Choose a Period</h3>
                                <Select
                                    value={this.state.chargebackDatePeriodYear}
                                    onChange={this.handleChangePeriod}
                                    inputProps={{
                                        name: 'chargebackDatePeriodYear',
                                        id  : 'chargebackDatePeriodYear'
                                    }}
                                >
                                    {
                                        years.map((y, index)=> {
                                            return <MenuItem key={index} value={y}>{y}</MenuItem>
                                        })
                                    }
                                </Select>
                                <br></br>
                                <Select
                                    value={this.state.chargebackDatePeriodMonth}
                                    onChange={this.handleChangePeriod}
                                    inputProps={{
                                        name: 'chargebackDatePeriodMonth',
                                        id  : 'chargebackDatePeriodMonth'
                                    }}
                                >
                                    {
                                        months.map((m, index)=> {
                                            return <MenuItem key={index} value={index}>{m}</MenuItem>
                                        })
                                    }
                                </Select>
                            </div>
                        )}

                        <div style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                            <h3>Chargeback Status</h3>
                            {/* {this.state.chargebackStatus.length>0 && this.state.chargebackStatus.map((iv, index)=> {
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
                            })} */}
                            <br></br>
                            {/* <h3>Delivery Method</h3> */}
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.selectAll}
                                        onChange={this.handleChange('selectAll')}
                                        value="selectAll"
                                    />
                                }
                                label="Select All"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedActive}
                                        onChange={this.handleChange('checkedActive')}
                                        value="checkedActive"
                                    />
                                }
                                label="Active"
                            />
							<FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedComplete}
                                        onChange={this.handleChange('checkedComplete')}
                                        value="checkedComplete"
                                    />
                                }
                                label="Complete"
                            />
							<FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedStopped}
                                        onChange={this.handleChange('checkedStopped')}
                                        value="checkedStopped"
                                    />
                                }
                                label="Stopped"
                            />
							<FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedTransferred}
                                        onChange={this.handleChange('checkedTransferred')}
                                        value="checkedTransferred"
                                    />
                                }
                                label="Transferred"
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
        // updatedChargebackStatus: Actions.updatedChargebackStatus,
        // updatedChargebackDateOption: Actions.updatedChargebackDateOption,
        // updatePeriodOption: Actions.updatePeriodOption
    }, dispatch);
}

function mapStateToProps({chargebacks, fuse})
{
    return {
        filterState: chargebacks.bOpenedFilterPanel,
        transactionStatus: chargebacks.transactionStatus,
        chargebackStatus: chargebacks.chargebackStatus,
        FromDate: chargebacks.FromDate,
        ToDate: chargebacks.ToDate,
        settings       : fuse.settings.current,
        // chargebackDateOption: chargebacks.chargebackDateOption,
        // chargebackDatePeriodMonth: chargebacks.chargebackDatePeriodMonth,
        // chargebackDatePeriodYear: chargebacks.chargebackDatePeriodYear,
    }
}

export default (withStyles(styles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
