import React, {Component} from 'react';
import {Paper, withStyles} from '@material-ui/core';

import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

import 'date-fns'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

import moment from "moment";


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



class FilterPanel extends Component {

    state = {
        logDate: moment().format('MM/DD/YYYY'),
        labelWidth: 0,
    };


    componentDidMount()
    {
        this.setState({logDate: this.props.logDate});
    }

    componentWillMount(){
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevState.logDate!==this.state.logDate) {
            this.props.updateLogDate(this.state.logDate);
            // this.props.nullifyFranchiseeNewReport();
            //
            // let period = this.state.reportPeriod.split('/');
            //
            // this.props.createReport({
            //     regionId: this.props.regionId,
            //     year: parseInt(period[1]),
            //     month: parseInt(period[0]),
            //     franchiseenumber: this.props.franchiNo
            // });
        }
    }

    componentWillUnmount()
    {
    }

    handleLogDateChange = date => {
        this.setState({logDate: date});
        let logDate = moment(date).format("MM/DD/YYYY");
        this.props.updateLogDate(logDate);
    };

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20 w-full">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h3 className="mb-24">Choose a date </h3>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <div className="flex flex-col">
                                    <DatePicker
                                        margin="none"
                                        label="Log Date"
                                        name="FromDate"
                                        variant="outlined"
                                        format="MM/DD/YYYY"
                                        value={this.state.logDate}
                                        onChange={this.handleLogDateChange}
                                        fullWidth
                                        required
                                        color="secondary"
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
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
        updateLogDate: Actions.updateLogDate,
        nullifyFranchiseeNewReport: Actions.nullifyFranchiseeNewReport,
    }, dispatch);
}

function mapStateToProps({franchisees, auth})
{
    return {
        regionId: auth.login.defaultRegionId,
        logDate: auth.login.logDate,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
