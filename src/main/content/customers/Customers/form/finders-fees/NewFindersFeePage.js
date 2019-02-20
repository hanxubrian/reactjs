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

// 3rd parth
import axios from "axios";

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
            FindersFeeCreditAmount: 0,
            MonthlyPaymentAmount: '',
            CalculationMethodCode: 'S',
            InitialBusinessCredit: 0,
            description: '',
            MultiTenantOccupancy: '',
            AmountPayableOn: '',
            AmountFinanced: '',
            DownPaymentAmount: '',
            FinderFeeTotal: '',
            NumberOfPayments:'',
            IncludeDpWith1stPayment: false,
            DownPaymentPaid: false,
            findersFeeType: false,
            FinderFeePayableOn: '',
        };
    }

    componentWillMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.CalculationMethodCode!==prevState.CalculationMethodCode ||
          // this.props.findersFeeParams.MonthlyPaymentPercent!==prevProps.findersFeeParams.MonthlyPaymentPercent ||
          this.state.DownPaymentPercent!==prevState.DownPaymentPercent
        ){
            axios.post('https://apifmsplusplus_mongo.jkdev.com/v1/FinderFee/GetComputedFinderFee', this.props.findersFeeParams)
                .then(res=> {
                    if(res.data.IsSuccess){
                        console.log('result=',res.data.Data);
                        this.setState({...res.data.Data});
                    }
                })
                .catch(error=> {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        axios.post('https://apifmsplusplus_mongo.jkdev.com/v1/FinderFee/GetComputedFinderFee', this.props.findersFeeParams)
            .then(res=> {
                if(res.data.IsSuccess){
                    console.log('result1=',res.data.Data);
                    this.setState({...res.data.Data});
                    this.setState({FinderFeePayableOn: res.data.Data.AmountPayableOn-this.state.FindersFeeCreditAmount-this.state.InitialBusinessCredit})
                }
            })
            .catch(error=> {
                console.log(error);
            });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    }


    handleChange = name => event => {
        this.setState({
            [name]: parseFloat(event.target.value),
        });
        if(name==="CalculationMethodCode" || name==='DownPaymentPercent') {
            this.props.updateFindersFeeParams({[name]: event.target.value})
        }
    };

    handleBlurPayable = (name) =>event=> {
        if(name==='FindersFeeCreditAmount' || name==='InitialBusinessCredit') {
            let value = parseFloat(this.state.FindersFeeCreditAmount)+parseFloat(this.state.InitialBusinessCredit);
            this.setState({FinderFeePayableOn: this.state.AmountPayableOn - value})
        }
    };

    handleChangeChecked = name => event => {
        this.setState({
            [name]: event.target.checked,
        });
    };

    handleChangeParamsOnBlur =  name => event => {
        this.props.updateFindersFeeParams({[name]: event.target.value});
        if(name==='MonthlyPaymentPercent' || name==='DownPaymentPercent')
            this.setState({[name]: event.target.value})
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
                               className={classNames(classes.textField,'mr-12')}
                               value={this.state.CalculationMethodCode || ''}
                               onChange={this.handleChange('CalculationMethodCode')}
                               style={{ minWidth: 250 }}
                               InputProps={{ readOnly: false }}
                    >
                        {this.props.findersFeeTypes!==null &&
                        this.props.findersFeeTypes.map((x) => {
                            return (<MenuItem key={x.code} value={x.code}>{x.name}</MenuItem>)
                        })
                        }
                    </TextField>

                    <div className="flex w-full" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button variant="contained" onClick={()=>this.handleGotoDistibutionPage()} color="primary" className={classNames("pl-24 pr-24 mr-12")}><Icon>keyboard_arrow_left</Icon>Prev</Button>
                        <Button variant="contained" onClick={()=>this.handleSaveFindersFee()} color="primary" className={classNames("pl-24 pr-24 mr-12")}>Save</Button>
                    </div>

                </div>
                <div className={classNames("flex mt-12 items-center")}>
                    <TextField margin="dense" id="AmountPayableOn" label="Monthly Billing Amount"
                               InputLabelProps={{ shrink: true }}
                               style={{ minWidth: 250 }}
                               className={classNames(classes.textField, "pr-6 mr-6")}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true,
                                   classes: {
                                       // input: classNames('text-right')
                                   }
                               }}
                               value={this.state.AmountPayableOn}
                    />
                    <Typography className="ml-6 mr-12" variant="subtitle1"><strong>-</strong></Typography>
                    <TextField margin="dense" id="FindersFeeCreditAmount" label="Finders Fee Credit Amount"
                               InputLabelProps={{ shrink: true }}
                               style={{ minWidth: 220 }}
                               className={classNames(classes.textField, "pr-6 mr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.FindersFeeCreditAmount}
                               onChange={this.handleChange("FindersFeeCreditAmount")}
                               onBlur={this.handleBlurPayable("FindersFeeCreditAmount")}
                    />
                    <Typography className="mr-12 ml-6" variant="subtitle1"><strong>-</strong></Typography>
                    <TextField margin="dense" id="InitialBusinessCredit" label="Initial Business Credit"
                               InputLabelProps={{ shrink: true }}
                               style={{ minWidth: 220 }}
                               className={classNames(classes.textField, "pr-6 mr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix }}
                               value={this.state.InitialBusinessCredit}
                               onChange={this.handleChange("InitialBusinessCredit")}
                               onBlur={this.handleBlurPayable("InitialBusinessCredit")}
                    />
                    <Typography className="mr-12 ml-6" variant="subtitle1"><strong>=</strong></Typography>
                    <TextField margin="dense" id="FinderFeePayableOn" label="Finder Fee Payable On"
                               InputLabelProps={{ shrink: true }}
                               style={{ minWidth: 220 }}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,readOnly: true}}
                               className={classNames(classes.textField, "ml-12")}
                               value={this.state.FinderFeePayableOn}
                    />
                </div>
                <div className={classNames("flex mt-12")}>
                    <TextField margin="dense" id="DownPaymentPercent" label="Down Payment Percent"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6 mr-12")}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start" className="mr-4">%</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                               }}
                               value={this.state.DownPaymentPercent || ''}
                               // onChange={this.handleChange("DownPaymentPercent")}
                               onBlur={this.handleChangeParamsOnBlur('DownPaymentPercent')}
                    />
                    <TextField margin="dense" id="MonthlyPaymentPercent" label="Monthly Payment Percent"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6 mr-12")}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start" className="mr-4">%</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                               }}
                               value={this.state.MonthlyPaymentPercent}
                               // onChange={this.handleChange("MonthlyPaymentPercent")}
                               onBlur={this.handleChangeParamsOnBlur('MonthlyPaymentPercent')}
                    />

                </div>

                <div className={classNames("flex mt-12 justify-between items-center")}>
                    <TextField margin="dense" id="MonthlyPaymentAmount" label="Monthly Payment"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true }}
                               value={this.state.MonthlyPaymentAmount}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>x</strong></Typography>

                    <TextField margin="dense" id="NumberOfPayments" label="# Of Payments"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               value={this.state.NumberOfPayments}
                               InputProps={{readOnly: true }}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

                    <TextField margin="dense" id="AmountFinanced" label="Amount Financed"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true}}
                               value={this.state.AmountFinanced}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>+</strong></Typography>

                    <TextField margin="dense" id="DownPaymentAmount" label="Down Payment Amount"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true }}
                               value={this.state.DownPaymentAmount}
                    />

                    <Typography className="mr-6 ml-6" variant="subtitle1"><strong>=</strong></Typography>

                    <TextField margin="dense" id="FinderFeeTotal" label="Finder Fee Total"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               InputProps={{ startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   readOnly: true }}
                               value={this.state.FinderFeeTotal}
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

                    <TextField margin="dense" id="MultiTenantOccupancy" label="Multi-Tenant 100% Occuaoncy Input"
                               InputLabelProps={{ shrink: true }}
                               className={classNames(classes.textField, "pr-6")}
                               value={this.state.MultiTenantOccupancy}
                               onChange={this.handleChange("MultiTenantOccupancy")}
                               onBlur={this.handleChangeParamsOnBlur('MultiTenantOccupancy')}
                               InputProps={{startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
                                   inputComponent: NumberFormatCustomNoPrefix,
                                   }}
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
        findersFeeParams: customers.findersFeeParams,
        findersFeeTypes: customers.findersFeeTypes,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFindersFeePage)));
