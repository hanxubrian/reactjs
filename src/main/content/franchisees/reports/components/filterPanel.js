import React, {Component} from 'react';

//Material UI core
import {MenuItem, OutlinedInput, Paper, Select, withStyles} from '@material-ui/core';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//Store
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'store/actions';

//Third party
import classNames from 'classnames';
import moment from "moment";
import _ from "lodash";

const styles = theme => ({
    root : {
    },
    panel: {
        position                      : 'absolute',
        width                         : 300,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        left                         :  -300,
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
            transform: 'translateX(300px)'
        }
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
        width: 150
    },
});

class FilterPanel extends Component {

    state = {
        reportDate: moment().format('MM/YYYY'),
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
    }

    componentWillMount(){
        this.setState({
            reportDate: this.props.reportDate
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.reportDate!==this.state.reportDate) {
            this.props.updateReportDate(this.state.reportDate);
        }
    }

    componentWillUnmount()
    {

    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        this.setState({ reportDate: event.target.value });
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">
                        <div style={{marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                            <h3>Choose a date</h3>
                            {this.state.periods!==null && (
                                <Select
                                    classes={{
                                        selectMenu: classNames(classes.inputMenu1),
                                    }}
                                    name="period"
                                    value={this.state.period}
                                    onChange={this.handleChange}
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
        updateReportDate: Actions.updateReportDate,

    }, dispatch);
}

function mapStateToProps({franchiseeReports, auth})
{
    return {
        filterState: franchiseeReports.bOpenedFilterPanelFranchiseeReports,
        reportDate: franchiseeReports.reportDate,
        all_regions: auth.login.all_regions,
        regionId: auth.login.defaultRegionId,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
