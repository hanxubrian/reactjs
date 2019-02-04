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
import classNames from 'classnames';

//Child Components
import CustomerTransactions from './components/customerTransactions'
import CustomerAccountTotals from './components/customerAccountTotal'
import SupplyTransactons from './components/supplyTransactions'
import RegularMiscTransactons from './components/regularMiscTransactions'
import FindersFeeTransactions from './components/findersFeeTransactions'
import SummaryTransactons from './components/summaryTransactions'


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .9)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        opacity: 0.5
    },
    progress: {
        margin: theme.spacing.unit * 2,
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
            <div className={classNames(classes.root,'p-16 flex flex-col flex-1 items-center')}>
                <SummaryTransactons />
                <CustomerTransactions />
                <CustomerAccountTotals />
                <SupplyTransactons />
                <RegularMiscTransactons />
                <FindersFeeTransactions />
                {(franchiseeReport===null && this.props.transactionForm.franchisee!==null)  && (
                    <div className={classNames(classes.overlay)}>
                        <CircularProgress className={classes.progress} color="secondary"  />
                        <h4 style={{color: 'white'}}>Loading Transaction Summary Detail...</h4>
                    </div>
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

function mapStateToProps({franchiseeReports, transactions, auth}) {
    return {
        transactionForm: transactions.transactionForm,
        bLoadedFranchiseeReports: franchiseeReports.bLoadedFranchiseeReports,
        regionId: auth.login.defaultRegionId,
        franchiseeReport: franchiseeReports.franchiseeReport1,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsSummary)));
