import React, { Component, Fragment } from 'react';
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



import { SelectionPanel } from "./CustomizedDxGridSelectionPanel";


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

const stateNames = [
    { Value: "AL", Text: "Alabama" },
    { Value: "AK", Text: "Alaska" },
    { Value: "AZ", Text: "Arizona" },
    { Value: "AR", Text: "Arkansas" },
    { Value: "CA", Text: "California" },
    { Value: "CO", Text: "Colorado" },
    { Value: "CT", Text: "Connecticut" },
    { Value: "DE", Text: "Delaware" },
    { Value: "FL", Text: "Florida" },
    { Value: "GA", Text: "Georgia" },
    { Value: "HI", Text: "Hawaii" },
    { Value: "ID", Text: "Idaho" },
    { Value: "IL", Text: "Illinois" },
    { Value: "IN", Text: "Indiana" },
    { Value: "IA", Text: "Iowa" },
    { Value: "KS", Text: "Kansas" },
    { Value: "KY", Text: "Kentucky" },
    { Value: "LA", Text: "Louisiana" },
    { Value: "ME", Text: "Maine" },
    { Value: "MD", Text: "Maryland" },
    { Value: "MA", Text: "Massachusetts" },
    { Value: "MI", Text: "Michigan" },
    { Value: "MN", Text: "Minnesota" },
    { Value: "MS", Text: "Mississippi" },
    { Value: "MO", Text: "Missouri" },
    { Value: "MT", Text: "Montana" },
    { Value: "NE", Text: "Nebraska" },
    { Value: "NV", Text: "Nevada" },
    { Value: "NH", Text: "New Hampshire" },
    { Value: "NJ", Text: "New Jersey" },
    { Value: "NM", Text: "New Mexico" },
    { Value: "NY", Text: "New York" },
    { Value: "NC", Text: "North Carolina" },
    { Value: "ND", Text: "North Dakota" },
    { Value: "OH", Text: "Ohio" },
    { Value: "OK", Text: "Oklahoma" },
    { Value: "OR", Text: "Oregon" },
    { Value: "PA", Text: "Pennsylvania" },
    { Value: "RI", Text: "Rhode Island" },
    { Value: "SC", Text: "South Carolina" },
    { Value: "SD", Text: "South Dakota" },
    { Value: "TN", Text: "Tennessee" },
    { Value: "TX", Text: "Texas" },
    { Value: "UT", Text: "Utah" },
    { Value: "VT", Text: "Vermont" },
    { Value: "VA", Text: "Virginia" },
    { Value: "WA", Text: "Washington" },
    { Value: "DC", Text: "Washington D.C." },
    { Value: "WV", Text: "West Virginia" },
    { Value: "WI", Text: "Wisconsin" },
    { Value: "WY", Text: "Wyoming" }
];



class FilterPanel extends Component {

    state = {
        checkedInvoices: true,
        checkedCustomers: true,
        checkedPayments: false,
        checkedFranchisee: true,
        checkedTransactions: false,
        checkedTransfers: false
    }

    constructor(props) {
        super(props)
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
