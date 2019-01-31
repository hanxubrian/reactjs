import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// Material-UI core components
import {AppBar, Tabs, Tab, Typography }  from '@material-ui/core';

// for store
import * as Actions from 'store/actions';
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";

// Third Party
import PropTypes from 'prop-types';
import moment from "moment";
import classNames from 'classnames';

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

        let year = moment(this.props.reportDate).year();
        let month = moment(this.props.reportDate).month()+1;

        if(!props.bLoadedFranchiseeReports) {
            props.getReports(props.regionId, year, month);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let year = moment(this.props.reportDate).year();
        let month = moment(this.props.reportDate).month()+1;

        if(this.props.regionId !== prevProps.regionId) {
            this.props.getReports(this.props.regionId, year, month);
        }
        if(this.props.reportDate !== prevProps.reportDate) {
            this.props.getReports(this.props.regionId, year, month);
        }
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root,'p-48 flex flex-col flex-1 items-center')}>
                <h1>Franchisee Transaction Summary Under Development". Will be ready by 1:00PM release 1/31/2019</h1>
                {/*<AppBar position="static" color="default">*/}
                    {/*<Tabs value={this.state.value} onChange={this.handleChange}>*/}
                        {/*<Tab label="Customer Transactions" />*/}
                        {/*<Tab label="Customer Account Totals" />*/}
                        {/*<Tab label="Supply Transactions" />*/}
                        {/*<Tab label="Charge Backs" />*/}
                        {/*<Tab label="Leases" />*/}
                        {/*<Tab label="Regular Misc" />*/}
                    {/*</Tabs>*/}
                {/*</AppBar>*/}
                {/*{this.state.value === 0 && <TabContainer>Item One</TabContainer>}*/}
                {/*{this.state.value === 1 && <TabContainer>Item Two</TabContainer>}*/}
                {/*{this.state.value === 2 && <TabContainer>Item Three</TabContainer>}*/}
                {/*{this.state.value === 3 && <TabContainer>Item Four</TabContainer>}*/}
                {/*{this.state.value === 4 && <TabContainer>Item Five</TabContainer>}*/}
                {/*{this.state.value === 5 && <TabContainer>Item Six</TabContainer>}*/}
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
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsSummary)));
