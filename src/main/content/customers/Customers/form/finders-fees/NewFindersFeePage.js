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
        };
    }

    componentWillMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }

    componentDidMount() {
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
    };

    handleGotoDistibutionPage = () => {
        this.props.updateCustomersParameter('activeStep', 1);
    };

    handleSaveFindersFee = () => {
        console.log('saved');
    };

    getFindersFeesForm() {
        const { classes } = this.props;
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
                    <div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button variant="contained" onClick={this.handleGotoDistibutionPage} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon>keyboard_arrow_left</Icon>Prev</Button>
                        <Button variant="contained" onClick={this.handleSaveFindersFee} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Save</Button>
                    </div>

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
        updateCustomersParameter: Actions.updateCustomersParameter,
    }, dispatch);
}

function mapStateToProps({ customers}) {
    return {
        activeStep: customers.activeStep,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFindersFeePage)));
