import React, {Component} from 'react';
import {Paper, TextField, withStyles, MenuItem, Select, OutlinedInput} from '@material-ui/core';

import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

import moment from "moment";
import MomentUtils from "@date-io/moment";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";

const styles = theme => ({
    root : {
    },
});



class FilterPanel extends Component {

    state = {
        checkDate: this.props.filters.checkdate,
        labelWidth: 0,
        period: moment().format('MM/YYYY'),
        periods: null,
    };


    componentDidMount() {
        if (this.props.all_regions !== null && this.props.all_regions.length) {
            let all_regions = this.props.all_regions;
            let region = all_regions.filter(r => r.regionid === this.props.regionId);

            if (region.length) {
                let periods = region[0].OpenPeriods;

                let all_periods = [];
                all_periods.push('01/2017');
                this.setState({period: '01/2017'});

                let period = periods.current.month.toString() + '/' + periods.current.year.toString();
                if (periods.current.month < 10)
                    period = '0' + period;
                if (periods.current.status === 'Open')
                    all_periods.push(period);
                // this.setState({period: period});


                period = periods.next.month.toString() + '/' + periods.next.year.toString();
                if (periods.next.month < 10)
                    period = '0' + period;
                if (periods.next.status === 'Open')
                    all_periods.push(period);
                period = periods.previous.month.toString() + '/' + periods.previous.year.toString();
                if (periods.previous.month < 10)
                    period = '0' + period;
                if (periods.previous.status === 'Open')
                    all_periods.push(period);

                this.setState({periods: all_periods});
            }
        }
    }

    componentWillMount(){
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
    }

    componentWillUnmount()
    {
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    handleChangePeriod = (event) => {
        this.setState({period: event.target.value});
        this.props.updateFilterParams({name: 'period', value: event.target.value});
        let period = event.target.value.split('/');
        this.props.updateFilterParams({name: 'month', value: parseInt(period[0])});
        this.props.updateFilterParams({name: 'year', value: parseInt(period[1])});
    };

    handleCheckDateChange = (name, date)=> {
        this.setState({[name]: date});
        this.props.updateFilterParams({name: name, value: moment(date).format('MM/DD/YYYY')});
    };


    render()
    {
        const {classes} = this.props;
        const { checktypeId, h} = this.props.filters;
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")} style={{}}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20 w-full">
                        <div className="flex flex-col">
                            {this.state.periods!==null && (
                                <TextField
                                    name="period"
                                    label="Period"
                                    variant="outlined"
                                    select
                                    value={this.state.period}
                                    onChange={this.handleChangePeriod}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="period"
                                            id="period"
                                        />
                                    }
                                    fullWidth
                                >
                                    {this.state.periods.map((p, index)=>{
                                        return (<MenuItem key={index} value={p}>{p}</MenuItem>)
                                    })}
                                </TextField>
                            )}
                            <br/>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    margin="none"
                                    label="Check Date"
                                    name="checkDate"
                                    variant="outlined"
                                    format="MM/DD/YYYY"
                                    value={this.state.checkDate}
                                    onChange={(d)=>this.handleCheckDateChange('checkDate', d)}
                                    fullWidth
                                    required
                                    color="secondary"
                                />
                                <br/>
                                <DatePicker
                                    margin="none"
                                    label="Payment Date"
                                    name="paymentDate"
                                    variant="outlined"
                                    format="MM/DD/YYYY"
                                    value={this.state.paymentDate}
                                    onChange={(d)=>this.handleCheckDateChange('paymentDate', d)}
                                    fullWidth
                                    required
                                    color="secondary"
                                />
                            </MuiPickersUtilsProvider>
                            <br/>
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
        updateLogDate: Actions.updateLogDate,
        updateFilterParams: Actions.updateFilterParams,
    }, dispatch);
}

function mapStateToProps({auth, printChecks})
{
    return {
        regionId: auth.login.defaultRegionId,
        logDate: auth.login.logDate,
        filters: printChecks.filters,
        all_regions: auth.login.all_regions,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
