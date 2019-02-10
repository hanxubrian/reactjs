import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles} from '@material-ui/core';
//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Store
import * as Actions from 'store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Third Party
import classNames from 'classnames';

import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";



const styles = theme => ({
    root: {
      width: "250px",
      overflow: "hidden",
      padding: "5%"
    },
    filterContainer: {
        padding: "3%"
    }
});

class FilterPanel extends Component {

    state = {
        checkedInvoices: true,
        checkedCustomers: true,
        checkedPayments: false,
        checkedFranchisee: true,
        checkedTransactions: false,
        checkedTransfers: false
    }

    componentWillMount() {

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-col")}>
                    <GridContainer  className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.checkedInvoices}
                                    onChange={this.handleChange('checkedInvoices')}
                                    value="checkedInvoices"
                                    color="primary"
                                />
                            }
                             label="Invoices"
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer  className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedCustomers}
                                        onChange={this.handleChange('checkedCustomers')}
                                        value="checkedCustomers"
                                        color="primary"
                                    />
                                }
                                label="Customers"
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer  className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedFranchisee}
                                        onChange={this.handleChange('checkedFranchisee')}
                                        value="checkedFranchisee"
                                        color="primary"
                                    />
                                }
                                label="Franchisees"
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer  className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedTransactions}
                                        onChange={this.handleChange('checkedTransactions')}
                                        value="checkedTransactions"
                                        color="primary"
                                    />
                                }
                                label="Transactions"
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer  className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedTransfers}
                                        onChange={this.handleChange('checkedTransfers')}
                                        value="checkedTransfers"
                                        color="primary"
                                    />
                                }
                                label="Transfers"
                            />
                        </GridItem>
                    </GridContainer>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleStatus: Actions.toggleVerificationStatus
    }, dispatch);
}

function mapStateToProps({ verifications, auth }) {
    return {
        filterState: verifications.bOpenedFilterPanel,
        transactionStatus: verifications.transactionStatus,
        verifications: verifications.verificationsDB,
        verificationForm: verifications.verificationForm,
        regionId: auth.login.defaultRegionId,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
