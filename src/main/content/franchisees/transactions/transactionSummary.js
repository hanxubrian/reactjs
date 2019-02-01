import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// Material-UI core components
import {Typography, CircularProgress }  from '@material-ui/core';

// for store
import * as Actions from 'store/actions';
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";

// Third Party
import PropTypes from 'prop-types';
import moment from "moment";
import classNames from 'classnames';

import CustomerTransactions from './components/customerTransactions'


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


class TransactionsSummary extends Component {

    state ={
        value: 0,
        year: 2017,
        month: 1
    };

    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    render() {
        const {classes, franchiseeReport} = this.props;
        return (
            <div className={classNames(classes.root,'p-48 flex flex-col flex-1 items-center h-full')}>
                <CustomerTransactions />
                {franchiseeReport===null  && (
                    <CircularProgress className={classes.progress} color="secondary"  />
                )}
            </div>
        );
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getReports: Actions.getReports,
    }, dispatch);
}

function mapStateToProps({franchiseeReports, auth}) {
    return {
        franchiseeReports: franchiseeReports.franchiseeReports,
        bLoadedFranchiseeReports: franchiseeReports.bLoadedFranchiseeReports,
        regionId: auth.login.defaultRegionId,
        franchiseeReport: franchiseeReports.franchiseeReport,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsSummary)));
