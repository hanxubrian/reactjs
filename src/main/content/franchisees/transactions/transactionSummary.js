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
        value: 0
    };

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        <Tab label="Customer Transactions" />
                        <Tab label="Customer Account Totals" />
                        <Tab label="Supply Transactions" />
                        <Tab label="Charge Backs" />
                        <Tab label="Leases" />
                        <Tab label="Regular Misc" />
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && <TabContainer>Item One</TabContainer>}
                {this.state.value === 1 && <TabContainer>Item Two</TabContainer>}
                {this.state.value === 2 && <TabContainer>Item Three</TabContainer>}
                {this.state.value === 3 && <TabContainer>Item Four</TabContainer>}
                {this.state.value === 4 && <TabContainer>Item Five</TabContainer>}
                {this.state.value === 5 && <TabContainer>Item Six</TabContainer>}
            </div>
        );
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({transactions, auth}) {
    return {

    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsSummary)));
