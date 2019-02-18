import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'

import { Icon, FormControlLabel, Typography, InputAdornment, MenuItem,
    ListItemLink, Switch } from '@material-ui/core';

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
            DownPaymentPercent: '',
            MonthlyPaymentPercent: '',
            FindersFeeCreditAmount: '',
            MonthlyPayment: '',
            CalculationMethod: 'Method 1',
            InitialBusinessCredit: '',
            description: '',
            MultiTenant100OccuaoncyInput: '',
            MonthlyBillingAmount: '',
            AmountFinanced: '',
            DownPayment: '',
            ResultAmountFinanced: '',
            IncludeDpWith1stPayment: false,
            DownPaymentPaid: false,
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
        });
    };
    handleChangeChecked = name => event => {
        this.setState({
            [name]: event.target.checked,
        });
    };

    handleChangeParamsOnBlur = name => event => {
        this.props.updateFindersFeeParams({[name]: event.target.value})
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
                            "Method 1",
                            "Method 2",
                            "Method 3",
                        ].map((x, index) => (
                            <MenuItem key={index} value={x}>{x}</MenuItem>
                        ))}
                    </TextField>

                    <TextField margin="dense" id="CalculationMethodNameDescription" label="Name / Description"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "ml-12")}
                               value={this.state.description || ''}
                               onChange={this.handleChange("description")}
                               fullWidth
                    />
                    <div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button variant="contained" onClick={()=>this.handleGotoDistibutionPage()} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon>keyboard_arrow_left</Icon>Prev</Button>
                        <Button variant="contained" onClick={()=>this.handleSaveFindersFee()} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Save</Button>
                    </div>

                </div>

                <div className={classNames("flex mt-12")}>
                    <TextField margin="dense" id="DownPaymentPercent" label="Down Payment Percent"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6 mr-12")}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start" className="mr-4">%</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true
                               }}
                               value={this.state.DownPaymentPercent || ''}
                               onChange={this.handleChange("DownPaymentPercent")}
                               onBlur={this.handleChangeParamsOnBlur('DownPaymentPercent')}
                    />
                    <TextField margin="dense" id="MonthlyPaymentPercent" label="Monthly Payment Percent"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6 mr-12")}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start" className="mr-4">%</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true
                               }}
                               value={this.state.MonthlyPaymentPercent || ''}
                               onChange={this.handleChange("MonthlyPaymentPercent")}
                               onBlur={this.handleChangeParamsOnBlur('MonthlyPaymentPercent')}
                    />
                    <TextField margin="dense" id="MonthlyBillingAmount" label="Monthly Billing Amount"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6 mr-12")}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true }}
                               value={this.state.MonthlyBillingAmount || ''}
                               onChange={this.handleChange("MonthlyBillingAmount")}
                               onBlur={this.handleChangeParamsOnBlur('MonthlyBillingAmount')}
                    />
                </div>
                <div className={classNames("flex mt-12")}>
                    <TextField margin="dense" id="FindersFeeCreditAmount" label="Finders Fee Credit Amount"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6 mr-12")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.FindersFeeCreditAmount || ''}
                               onChange={this.handleChange("FindersFeeCreditAmount")}
                    />
                    <TextField margin="dense" id="InitialBusinessCredit" label="Initial Business Credit"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.InitialBusinessCredit || ''}
                               onChange={this.handleChange("InitialBusinessCredit")}
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
                               onBlur={this.handleChangeParamsOnBlur('MonthlyPaymentAmount')}
                               sm={2}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>x</strong></Typography>

                    <TextField margin="dense" id="NumberOfPayments" label="# Of Payments"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               value={this.state.NumberOfPayments || ''}
                               onChange={this.handleChange("NumberOfPayments")}
                               onBlur={this.handleChangeParamsOnBlur('NumberOfPayments')}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

                    <TextField margin="dense" id="AmountFinanced" label="Amount Financed"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix}}
                               value={this.state.AmountFinanced || ''}
                               onChange={this.handleChange("AmountFinanced")}
                               onBlur={this.handleChangeParamsOnBlur('AmountFinanced')}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>+</strong></Typography>

                    <TextField margin="dense" id="DownPayment" label="DownPayment"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.DownPayment || ''}
                               onChange={this.handleChange("DownPayment")}
                               onBlur={this.handleChangeParamsOnBlur('DownPaymentAmount')}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

                    <TextField margin="dense" id="ResultAmountFinanced" label="Amount Financed"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.ResultAmountFinanced || ''}
                               onChange={this.handleChange("ResultAmountFinanced")}
                               onBlur={this.handleChangeParamsOnBlur('FinderFeeTotal')}
                               sm={2}
                    />
                </div>

                <div className={classNames("flex mt-12")}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.DownPaymentPaid}
                                onChange={this.handleChangeChecked('DownPaymentPaid')}
                                value="DownPaymentPaid"
                            />
                        }
                        label="Down Payment Paid?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.IncludeDpWith1stPayment}
                                onChange={this.handleChangeChecked('IncludeDpWith1stPayment')}
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
                               onBlur={this.handleChangeParamsOnBlur('MultiTenantOccupancy')}
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
        getComputedFinderFee: Actions.getComputedFinderFee,
        updateFindersFeeParams: Actions.updateFindersFeeParams,
    }, dispatch);
}

function mapStateToProps({ customers, auth}) {
    return {
        activeStep: customers.activeStep,
        regionId: auth.login.defaultRegionId,
        findersFeeParams: auth.login.findersFeeParams,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFindersFeePage)));
