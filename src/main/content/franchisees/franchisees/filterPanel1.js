import React, {Component} from 'react';
import {OutlinedInput, Paper, Select,  withStyles} from '@material-ui/core';

import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import moment from "moment";
import _ from "lodash";


const styles = theme => ({
    root : {
    },
    dropdownMenu: {
        '& li': {
            fontSize: 12,
            height: 12,
        }
    },
    inputMenu: {
        padding: '10px 16px'
    },
    inputMenu1: {
        padding: '10px 16px',
        width: 200
    },
});



class FilterPanel1 extends Component {

    state = {
        reportPeriod: moment().format('MM/YYYY'),
        period: moment().format('MM/YYYY'),
        periods: null,
        labelWidth: 0,
    };


    componentDidMount()
    {
        if(this.props.all_regions!==null && this.props.all_regions.length){
            let all_regions = this.props.all_regions;
            let region = all_regions.filter(r=>r.regionid===this.props.regionId);
            if(region.length){
                let periods = region[0].OpenPeriods;

                let all_periods = [];
                all_periods.push('01/2017');
                this.setState({period: '01/2017'});

                let period = periods.current.month.toString() + '/' + periods.current.year.toString();
                if (periods.current.month < 10)
                    period = '0' + period;
                if(periods.current.status==='Open')
                    all_periods.push(period);
                // this.setState({period: period});


                period = periods.next.month.toString() + '/' + periods.next.year.toString();
                if (periods.next.month < 10)
                    period = '0' + period;
                if(periods.next.status==='Open')
                    all_periods.push(period);
                period = periods.previous.month.toString() + '/' + periods.previous.year.toString();
                if (periods.previous.month < 10)
                    period = '0' + period;
                if(periods.previous.status==='Open')
                    all_periods.push(period);

                this.setState({periods: all_periods});
            }
        }

        this.setState({period: this.props.reportPeriod});
    }

    componentWillMount(){
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevState.reportPeriod!==this.state.reportPeriod) {
            this.props.updateReportPeriod(this.state.reportPeriod);
            this.props.nullifyFranchiseeNewReport();

            let period = this.state.reportPeriod.split('/');

            this.props.createReport({
                regionId: this.props.regionId,
                year: parseInt(period[1]),
                month: parseInt(period[0]),
                franchiseenumber: this.props.franchiNo
            });
        }

    }

    componentWillUnmount()
    {
    }

    handleChangePeriod = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        this.setState({ reportPeriod: event.target.value });
    };

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20 w-full">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h3>Periods </h3>
                            {this.state.periods!==null && (
                                <Select
                                    classes={{
                                        selectMenu: classNames(classes.inputMenu1),
                                    }}
                                    name="period"
                                    value={this.state.period}
                                    onChange={this.handleChangePeriod}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="period"
                                            id="period"
                                        />
                                    }
                                    className={classes.textField}
                                    MenuProps = {{
                                        classes:{paper: classes.dropdownMenu},
                                    }}
                                >
                                    {this.state.periods.map((p, index)=>{
                                        return (<MenuItem key={index} value={p}>{p}</MenuItem>)
                                    })}
                                </Select>
                            )}
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
        createReport: Actions.createReport,
        updateReportPeriod: Actions.updateReportPeriod,
        nullifyFranchiseeNewReport: Actions.nullifyFranchiseeNewReport,
    }, dispatch);
}

function mapStateToProps({franchisees, auth})
{
    return {
        regionId: auth.login.defaultRegionId,
        reportPeriod: franchisees.reportPeriod,
        all_regions: auth.login.all_regions,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel1)));
