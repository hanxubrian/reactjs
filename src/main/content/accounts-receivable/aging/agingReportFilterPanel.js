import React, {Component} from 'react';
import {MenuItem, Paper, TextField, withStyles} from '@material-ui/core';

import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

import 'date-fns'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

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



class FilterPanel extends Component {

    state = {
        labelWidth: 0,
        agingParams: this.props.agingParams
    };


    componentDidMount()
    {
    }

    componentWillMount(){
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevState.logDate!==this.state.logDate) {
            this.props.updateLogDate(this.state.logDate);
        }
    }

    componentWillUnmount()
    {
    }

    handleAgingDateChange = date =>{
        let params = this.state.agingParams;
        params.AgingDate = moment(date).format("MM/DD/YYYY");
        this.setState({agingParams: params});
        // this.props.updateLogDate(logDate);
    };
    handlePaymentDateChange = date =>{
        let params = this.state.agingParams;
        params.PaymentDate = moment(date).format("MM/DD/YYYY");
        this.setState({agingParams: params});
        // this.props.updateLogDate(logDate);
    };


    handleChange = prop => event => {
        let params = this.state.agingParams;
        params[prop] = event.target.value;
        this.setState({agingParams: params});
    };

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20 w-full">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <div className="flex flex-col">
                                    <DatePicker
                                        margin="none"
                                        label="Aging Date"
                                        name="agingDate"
                                        variant="outlined"
                                        format="MM/DD/YYYY"
                                        value={this.state.agingParams.AgingDate}
                                        onChange={this.handleAgingDateChange}
                                        fullWidth
                                        required
                                        color="secondary"
                                    />
                                </div>
                                <br/>
                                <div className="flex flex-col">
                                    <DatePicker
                                        margin="none"
                                        label="Payment Date"
                                        name="paymentDate"
                                        variant="outlined"
                                        format="MM/DD/YYYY"
                                        value={this.state.agingParams.PaymentDate}
                                        onChange={this.handlePaymentDateChange}
                                        fullWidth
                                        required
                                        color="secondary"
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
                            <br/>
                            <TextField
                                select
                                margin="none"
                                label="Include Month"
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    },
                                }}
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                name="includeMonth"
                                variant="outlined"
                                value={this.state.agingParams.IncludeMonth}
                                onChange={this.handleChange('IncludeMonth')}
                                required
                                fullWidth
                                style={{paddingRight: 4}}
                            >
                                {[1,2,6,12,24].map((p, index)=>{
                                    return (<MenuItem key={index} value={p}>{p}</MenuItem>)
                                })}
                            </TextField>
                            <br/>
                            <TextField
                                select
                                margin="none"
                                label="Calculation Method"
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    },
                                }}
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                name="CalculationMethod"
                                variant="outlined"
                                value={this.state.agingParams.CalculateMethod}
                                onChange={this.handleChange('CalculateMethod')}
                                required
                                fullWidth
                                style={{paddingRight: 4}}
                            >
                                {['Bill Month','30 Day Blocks'].map((p, index)=>{
                                    return (<MenuItem key={index} value={p}>{p}</MenuItem>)
                                })}
                            </TextField>
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

function mapStateToProps({franchisees, auth, agings})
{
    return {
        regionId: auth.login.defaultRegionId,
        agingParams: agings.agingParams,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
