import React, {Component} from 'react';
import {Paper, TextField, withStyles, MenuItem} from '@material-ui/core';

import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});



class FilterPanel extends Component {

    state = {
        logDate: moment().format('MM/DD/YYYY'),
        labelWidth: 0,
        period: 'USD'
    };


    componentDidMount()
    {
        this.setState({logDate:this.props.logDate});
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

    handleChangePeriod = (event) => {
        this.setState({period: event.target.value});
    };

    render()
    {

        const {classes} = this.props;
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")} style={{}}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20 w-full">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
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
        nullifyFranchiseeNewReport: Actions.nullifyFranchiseeNewReport,
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        regionId: auth.login.defaultRegionId,
        logDate: auth.login.logDate,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
