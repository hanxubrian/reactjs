import React, { Fragment } from 'react';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'

import { Icon, FormControlLabel, Paper, Typography, InputAdornment, MenuItem, Divider,
    ListItemLink, Checkbox, Switch } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import classNames from 'classnames';

const styles = theme => ({
    root: {
    },
    button: {
        margin: theme.spacing.unit,
    },
    descriptionText: {
        fontSize: 13
    },
    menu: {

    },
    ffBtn: {
        height: 32,
        minHeight: 32
    }
});


class NewFindersFeePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerName: "",
            customerNumber: "",

            PaymentType: "Check",
            ReferenceNo: "",
            PaymentDate: new Date().toISOString().substr(0, 10),
            PaymentNote: "",
            PaymentAmount: 0,
            overpayment: 0,
            errorMsg: "",

            paymentDlgPayloads: {
                open: false,
                paymentType: "Check",
                paymentAmount: 0
            },

        };
    }

    componentWillMount() {
        this.setState({
            customerServiceTypes: this.props.lists.customerServiceTypes,
            franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
            franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }

    componentDidMount() {

        this.setState({
            paymentDlgPayloads: this.props.paymentDlgPayloads,
            PaymentAmount: this.props.paymentDlgPayloads.paymentAmount,
            PaymentType: this.props.paymentDlgPayloads.paymentType
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    }


    handleChangeChecked = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            errorMsg: ""
        });

        if (name === "PaymentAmount") {
        }
    };

    getFindersFeesForm() {
        const { classes } = this.props
        return (
            <>
                <div className={classNames("flex mt-12 justify-between")}>

                    <TextField select margin="dense" id="CalculationMethod" label="Calculation Method"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField)}
                               value={this.state.CalculationMethod || ''}
                               onChange={this.handleChange('CalculationMethod')}
                               style={{ minWidth: 250 }}
                               InputProps={{ readOnly: false }}
                    >
                        {[
                            "---",
                            "***",
                            "+++",
                        ].map((x, index) => (
                            <MenuItem key={index} value={x}>{x}</MenuItem>
                        ))}
                    </TextField>

                    <TextField margin="dense" id="CalculationMethodNameDescription" label="Name / Description"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "ml-12")}
                               value={this.state.NewAmount || ''}
                               onChange={this.handleChange("NewAmount")}
                               fullWidth
                    />

                </div>

                <div className={classNames("flex mt-12")}>
                    <TextField margin="dense" id="MonthlyBillingAmount" label="Monthly Billing Amount"
                               InputLabelProps={{ shrink: true }}
                               sm={4}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.NewAmount || ''}
                               onChange={this.handleChange("MonthlyBillingAmount")}
                    />
                </div>
                <div className={classNames("flex mt-12")}>
                    <TextField margin="dense" id="FindersFeeCreditAmount" label="Finders Fee Credit Amount"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.NewAmount || ''}
                               onChange={this.handleChange("FindersFeeCreditAmount")}
                               sm={4}
                    />
                </div>
                <div className={classNames("flex mt-12")}>
                    <TextField margin="dense" id="InitialBusinessCredit" label="Initial Business Credit"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.NewAmount || ''}
                               onChange={this.handleChange("InitialBusinessCredit")}
                               sm={4}
                    />
                </div>

                <div className={classNames("flex mt-12 justify-between items-center")}>
                    <TextField margin="dense" id="MonthlyPayment" label="Monthly Payment"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.MonthlyPayment || ''}
                               onChange={this.handleChange("MonthlyPayment")}
                               sm={2}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>x</strong></Typography>

                    <TextField margin="dense" id="NumberOfPayments" label="# Of Payments"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               value={this.state.NumberOfPayments || ''}
                               onChange={this.handleChange("NumberOfPayments")}
                               sm={2}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

                    <TextField margin="dense" id="AmountFinanced" label="Amount Financed"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix}}
                               value={this.state.AmountFinanced || ''}
                               onChange={this.handleChange("AmountFinanced")}
                               sm={2}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>+</strong></Typography>

                    <TextField margin="dense" id="DownPayment" label="DownPayment"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.DownPayment || ''}
                               onChange={this.handleChange("DownPayment")}
                               sm={2}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

                    <TextField margin="dense" id="ResultAmountFinanced" label="Amount Financed"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.ResultAmountFinanced || ''}
                               onChange={this.handleChange("ResultAmountFinanced")}
                               sm={2}
                    />
                </div>

                <div className={classNames("flex mt-12")}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.DownPaymentPaid}
                                onChange={this.handleChange('DownPaymentPaid')}
                                value="DownPaymentPaid"
                            />
                        }
                        label="Down Payment Paid?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.IncludeDpWith1stPayment}
                                onChange={this.handleChange('IncludeDpWith1stPayment')}
                                value="IncludeDpWith1stPayment"
                            />
                        }
                        label="Include DP With 1st Payment?"
                    />
                </div>

                <div className={classNames("flex mt-12 flex-end")}>
                    {/* <Button variant="contained" color="primary" className={classNames("pl-24 pr-24 mr-12")}>Multi-Tenant 100% Occuaoncy Input</Button> */}

                    <TextField margin="dense" id="MultiTenant100OccuaoncyInput" label="Multi-Tenant 100% Occuaoncy Input"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               value={this.state.MultiTenant100OccuaoncyInput || ''}
                               onChange={this.handleChange("MultiTenant100OccuaoncyInput")}
                               fullWidth
                               style={{ maxWidth: 300 }}
                    />

                </div>
            </>
        )
    }

    render() {
        return (
                <div className={classNames("flex flex-col")}>
                    {this.getFindersFeesForm()}
                </div>
         );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openPaymentDialog: Actions.openPaymentDialog,
        createAccountReceivablePayment: Actions.createAccountReceivablePayment,

        showIncreaseDecreaseContractModalForm: Actions.showIncreaseDecreaseContractModalForm,

        getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

        getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
        getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
        getFranchisees: Actions.getFranchisees,
        updateCustomersParameter: Actions.updateCustomersParameter,
    }, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth, franchisees }) {
    return {
        regionId: auth.login.defaultRegionId,

        statusId: franchisees.statusId,
        Longitude: franchisees.Longitude,
        Latitude: franchisees.Latitude,
        Location: franchisees.Location,
        SearchText: franchisees.SearchText,
        bLoadedFranchisees: franchisees.bLoadedFranchisees,

        bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
        activePaymentRows: accountReceivablePayments.activePaymentRows,

        payments: accountReceivablePayments.ACC_payments,

        filterParam: accountReceivablePayments.filterParam,
        searchText: accountReceivablePayments.searchText,

        paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

        increaseDecreaseContractModalForm: customers.increaseDecreaseContractModalForm,
        lists: customers.lists,
        franchieesesToOffer: customers.franchieesesToOffer,
        activeCustomer: customers.activeCustomer,

        franchisees: franchisees.franchiseesDB,
        NewAmount: customers.NewAmount
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFindersFeePage)));
