import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';

// core components
import {Card, CardContent, Typography, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';

//Theme component
import FuseUtils from '@fuse/FuseUtils';

//Store
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& table '    : {
            '& th:first-child, & td:first-child': {
                paddingLeft: 0 + '!important'
            },
            '& th:last-child, & td:last-child'  : {
                paddingRight: 0 + '!important'
            }
        }
    },
    paper: {
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card       : {
        width         : 1020,
        '@media print': {
            width    : '100%!important',
            boxShadow: 'none'
        }
    },
    cardContent: {},
    divider    : {
        width          : 1,
        backgroundColor: theme.palette.divider,
        height         : 144
    },
    seller     : {
        backgroundColor: theme.palette.primary.dark,
        color          : theme.palette.getContrastText(theme.palette.primary.dark),
        marginRight    : -88,
        paddingRight   : 66,
        width          : 480,
        '& .divider'   : {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
            opacity        : .5
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    longerTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 835
    }
});

class Report extends Component {
    componentDidMount()
    {
        /**
         * Get the Report Data
         */
        this.props.getReport(this.props.match.params);
    }

    renderHeader = ()=>{
        const { all_regions} = this.props;
        const {month, year, regionid} = this.props.match.params;

        const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

        let region_name = '';

        all_regions.forEach(r=>{
            if(r.RegionId===parseInt(regionid)) {
                region_name = r.Displayname;
                return false
            }
        });
        return (
            <tr>
                <td className="text-center" width='200'>
                    <Typography color="inherit">
                    </Typography>
                </td>
                <td className="text-center" width='500'>
                    <Typography color="inherit">FRANCHISEE REPORT</Typography>
                    <Typography color="inherit">
                        {region_name}
                    </Typography>
                    <Typography color="inherit">
                        BUSINESS FOR THE MONTH OF {months[parseInt(month)-1]} {year}
                    </Typography>

                </td>
                <td align="left">
                    <Typography color="inherit">Date: 11/30/2018 </Typography>
                    <Typography>Time: 11:58:57</Typography>
                    <Typography><br/></Typography>
                </td>
            </tr>
        )
    };
    render()
    {
        const { classes, franchiseeReport, all_regions} = this.props;
        console.log('ppp=', this.props.match.params);

        if(franchiseeReport===null || all_regions.length===0)
            return (<div/>);

        const {DLR_CODE, SUMMARY_PAGE, CUS_TRXS, CUST_ACCT_TOTALS, SUPPLY_TRXS, LEASE_PAYMENTS,REG_MISC, CHARGEBACKS }  = franchiseeReport.Data;

        const aBillings = [SUMMARY_PAGE[0]['ACTUAL BILLING'][0],SUMMARY_PAGE[0].ADTL_BILL_FRAN[0],
            SUMMARY_PAGE[0].CLIENT_SUPPLIES[0],SUMMARY_PAGE[0].ADDTL_BILL_OFFICE[0],SUMMARY_PAGE[0].SUBTOTAL[0],
            SUMMARY_PAGE[0].CLIENT_SALES_TAX[0],SUMMARY_PAGE[0].TOTAL_MON_REV[0]];

        const aDeductions0= [SUMMARY_PAGE[0].ROYALTY[0], SUMMARY_PAGE[0].ACCT_FEE[0],SUMMARY_PAGE[0].TECH_FEE[0],SUMMARY_PAGE[0].ADDTL_BILL_OFFICE_COMM[0],SUMMARY_PAGE[0].FRAN_NOTE_PYMT[0]];
        const aDeductions1 = [ "FRANCHISE NOTE PAYMENT2", "FINDERS_FEES", "FRANCHISE_SUPPLIES", "REGULAR_MISC", "SUBTOTAL_REG_DEDS",
            "ADVERTISING_FEE", "TOTAL_LEASES", "BUSINESS_PROT", "BPP_ADMIN", "CLIENT_SALES_TAX_BOT", "CHARGEBACKS", "PAGERS",
            "PAGERS2", "SPECIAL_MISC", "SUBTOTAL_SPEC_DEDS", "TOTAL_DEDS", "DUE_FRAN", "ACCT_FEE_REB_CUR", "ACCT_FEE_REB_BAL"];

        let ct_amount = 0.0, ct_tax = 0.0, ct_total = 0.0;
        let cb_amount = 0.0, cb_tax = 0.0, cb_total = 0.0;
        let lp_amount = 0.0, lp_tax = 0.0, lp_total = 0.0;
        let sm_amount = 0.0, sm_tax = 0.0, sm_total = 0.0;
        let st_extended = 0.0, st_tax = 0.0, st_total = 0.0;
        let cat_billing = 0.0, cat_month = 0.0, cat_addtl = 0.0, cat_cs = 0.0, cat_ofc = 0.0, cat_fee = 0.0;

        CUS_TRXS.forEach(ct=>{
            ct_amount += parseFloat(ct.TRX_AMT);
            ct_tax += parseFloat(ct.TRX_TAX);
            ct_total += parseFloat(ct.TRX_TOT);
        });
        LEASE_PAYMENTS.forEach(lp=>{
            lp_amount += parseFloat(lp.PYMNT_AMT);
            lp_tax += parseFloat(lp.PYMNT_TAX);
            lp_total += parseFloat(lp.PYMNT_TOT);
        });

        CHARGEBACKS.forEach(st=>{
            cb_amount += parseFloat(st.TRX_AMT);
            cb_tax += parseFloat(st.TRX_TAX);
            cb_total += parseFloat(st.TRX_TOT);
        });

        if(REG_MISC!==null ) {
            REG_MISC.forEach(sm => {
                sm_amount += parseFloat(sm.TRX_AMT);
                sm_tax += parseFloat(sm.TRX_TAX);
                sm_total += parseFloat(sm.TRX_TOT);
            });
        }

        SUPPLY_TRXS.forEach(st=>{
            st_extended += parseFloat(st.EXTENDED);
            st_tax += parseFloat(st.TRX_TAX);
            st_total += parseFloat(st.TRX_TOT);
        });

        CUST_ACCT_TOTALS.forEach(cat=>{
            cat_billing += parseFloat(cat.CONT_BILL);
            cat_month += parseFloat(cat.CUR_MONTH);
            cat_addtl += parseFloat(cat.ADTL_B_FRN);
            cat_cs += parseFloat(cat.CLIENT_SUP);
            cat_ofc += parseFloat(cat.ADTL_B_OFC);
            cat_fee += parseFloat(cat.FF_PYMNT);
        });

        return (
            <div className={classNames(classes.root, "p-0 sm:p-64  print:p-0")}>
                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>

                        <div>
                            <table align="center">
                                <tbody>
                                {this.renderHeader()}
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pb-4">
                                            <Typography color="inherit">Franchisee</Typography>
                                            <Typography color="inherit">Code</Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography color="inherit"><br/></Typography>
                                            <Typography color="inherit">Name</Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="inherit">{DLR_CODE}</Typography>
                                            <Typography color="inherit"><br/></Typography>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="text-left">
                                            <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_NAME}</Typography>
                                            <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_ADDRESS}</Typography>
                                            <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_CITY} {SUMMARY_PAGE[0].FRAN_STATE},{SUMMARY_PAGE[0].FRAN_ZIP}</Typography>
                                        </td>
                                        <td className="text-left" width='310'>
                                            <Typography color="inherit"><br/></Typography>
                                            <Typography color="inherit"><br/></Typography>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="text-left">
                                            <Typography color="inherit">Plan Type: {SUMMARY_PAGE[0].PLAN_TYPE}</Typography>
                                            <Typography color="inherit">Plan Type: {SUMMARY_PAGE[0].DATE_SIGN}</Typography>
                                            <Typography color="inherit">Plan Type: {SUMMARY_PAGE[0].CONTACT}</Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>{SUMMARY_PAGE[0].TOTAL_CONTRACT_BILLING[0].LABEL}:</h2>
                                        </th>
                                        <th className="text-right">
                                            ${parseFloat(SUMMARY_PAGE[0].TOTAL_CONTRACT_BILLING[0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { aBillings.map((b, index)=>{
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Typography variant="subtitle1">{b.LABEL}</Typography>
                                                    </td>
                                                    <td className="text-right">
                                                        ${parseFloat(b.AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )}
                                    </tbody>
                                </table>

                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th><h2>FRANCHISEE DEDUCTIONS:</h2></th>
                                        <th className="text-right">
                                            {/* UNIT */}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { aDeductions0.map((b, index)=>{
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Typography variant="subtitle1">{b.LABEL}</Typography>
                                                    </td>
                                                    <td className="text-right">
                                                        ${parseFloat(b.AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )}
                                    { aDeductions1.map((b, index)=>{
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Typography variant="subtitle1">{b}</Typography>
                                                    </td>
                                                    <td className="text-right">
                                                        ${parseFloat(SUMMARY_PAGE[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )}
                                    </tbody>
                                </table>
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>DUE TO FRANCHISEE:</h2>
                                        </th>
                                        <th>
                                            {/* UNIT */}
                                        </th>
                                        <th className="text-right">
                                            {/* UNIT PRICE */}
                                        </th>
                                        <th className="text-right">
                                            {/* QUANTITY */}
                                        </th>
                                        <th className="text-right">
                                            97,794.90
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField className={classes.textField}
                                               label="Date Paid">
                                    </TextField>
                                    <TextField className={classes.textField}
                                               label="Check #">
                                    </TextField>
                                    <TextField className={classes.textField}
                                               label="Date Paid">
                                    </TextField>
                                    <TextField className={classes.textField}
                                               label="Check #">
                                    </TextField>
                                    <TextField className={classes.longerTextField}
                                               label="Notes"
                                               multiline>
                                    </TextField>
                                </form>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto mt-64")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="center">
                                <tbody>
                                {this.renderHeader()}
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                {SUMMARY_PAGE[0].FRAN_NAME}
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Customer Transactions</h2>
                                        </th>
                                        <th>
                                            Invoice
                                        </th>
                                        <th className="text-left">
                                            Description
                                        </th>
                                        <th className="text-right">
                                            {/* QUANTITY */}
                                        </th>
                                        <th className="text-right">
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td><Typography >Customer</Typography></td>
                                        <td>I/C</td>
                                        <td className="text-right"></td>
                                        <td className="text-right">Inv Amt</td>
                                        <td className="text-right">Inv Tax</td>
                                        <td className="text-right">Total</td>
                                    </tr>

                                    {CUS_TRXS.map((ct, index)=>{
                                        return (
                                            <tr key={index}>
                                            <td>
                                                <Typography >{ct.CUST_NO} {FuseUtils.capital_letter(ct.CUS_NAME)}</Typography>
                                            </td>
                                            <td>{ct.INV_NO}</td>
                                            <td className="text-left">{FuseUtils.capital_letter(ct.DESCR)}</td>
                                            <td className="text-right">${parseFloat(ct.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right">${parseFloat(ct.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right">${parseFloat(ct.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        </tr>
                                        )
                                    })}
                                    <tr >
                                        <td>
                                            <Typography >Totals for this Franchise</Typography>
                                        </td>
                                        <td>
                                        </td>
                                        <td className="text-left">
                                        </td>
                                        <td className="text-right">${ct_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${ct_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${ct_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto mt-64")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="center">
                                <tbody>
                                {this.renderHeader()}
                                </tbody>
                            </table>
                        </div>
                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                {SUMMARY_PAGE[0].FRAN_NAME}
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Customer Account Totals</h2>
                                        </th>
                                        <th>
                                        </th>
                                        <th className="text-center">
                                        </th>
                                        <th className="text-right">
                                            {/* QUANTITY */}
                                        </th>
                                        <th className="text-right">
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Customer</Typography>
                                        </td>
                                        <td className="text-center">
                                            Contract Billing
                                        </td>
                                        <td className="text-center">
                                            Current Month
                                        </td>
                                        <td className="text-center">
                                            Addtl Bill Franchisee
                                        </td>
                                        <td className="text-center">
                                            Client Supplies
                                        </td>
                                        <td className="text-center">
                                            Additional Bill Office
                                        </td>
                                        <td className="text-center">
                                            Total
                                        </td>
                                        <td className="text-center">
                                            Finders Fee Nbr
                                        </td>
                                        <td className="text-center">
                                            Finders Fee
                                        </td>
                                    </tr>
                                    {CUST_ACCT_TOTALS.map((ct, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Typography >{ct.CUST_NO} {FuseUtils.capital_letter(ct.CUS_NAME)}</Typography>
                                                </td>
                                                <td className="text-right">${parseFloat(ct.CONT_BILL).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(ct.CUR_MONTH).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(ct.ADTL_B_FRN).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(ct.CLIENT_SUP).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(ct.ADTL_B_OFC).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td></td>
                                                <td className="text-right">{ct.FF_NBR}</td>
                                                <td className="text-right">${parseFloat(ct.FF_PYMNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr >
                                        <td>
                                            <Typography >Franchisee Actual Amount</Typography>
                                        </td>
                                        <td className="text-right">${cat_billing.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${cat_month.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${cat_addtl.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${cat_cs.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${cat_ofc.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right"></td>
                                        <td className="text-right"></td>
                                        <td className="text-right">${cat_fee.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto mt-64")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="center">
                                <tbody>
                                {this.renderHeader()}
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                {SUMMARY_PAGE[0].FRAN_NAME}
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Supply Transactions</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Description</Typography>
                                        </td>
                                        <td className="text-right">
                                            Quantity
                                        </td>
                                        <td className="text-right">
                                            Unit Cost
                                        </td>
                                        <td className="text-right">
                                            Extended
                                        </td>
                                        <td className="text-right">
                                            Tax
                                        </td>
                                        <td className="text-right">
                                            Total Amt
                                        </td>
                                    </tr>
                                    {SUPPLY_TRXS.map((st, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Typography >{FuseUtils.capital_letter(st.DESCR)}</Typography>
                                                </td>
                                                <td className="text-right">{st.QUANTITY}</td>
                                                <td className="text-right">${parseFloat(st["UNIT COST"]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(st.EXTENDED).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(st.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(st.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr >
                                        <td><Typography >Total Supplies</Typography></td>
                                        <td className="text-right"></td>
                                        <td className="text-right"></td>
                                        <td className="text-right">${st_extended.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${st_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${st_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto mt-64")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="center">
                                <tbody>
                                {this.renderHeader()}
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                {SUMMARY_PAGE[0].FRAN_NAME}
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Charge Backs</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Description</Typography>
                                        </td>
                                        <td className="text-center">
                                            Tax Amt
                                        </td>
                                        <td className="text-center">
                                            Tax
                                        </td>
                                        <td className="text-center">
                                            Total Amt
                                        </td>
                                    </tr>


                                    {CHARGEBACKS.map((cb, index)=>{
                                        return (
                                            <tr key={index} >
                                                <td>
                                                    <Typography >{FuseUtils.capital_letter(cb.DESCR)}</Typography>
                                                </td>
                                                <td className="text-right">${parseFloat(cb.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(cb.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(cb.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr >
                                        <td>
                                            <Typography >Total Charge Backs</Typography>
                                        </td>
                                        <td className="text-right">${cb_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${cb_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${cb_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto mt-64")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="center">
                                <tbody>
                                {this.renderHeader()}
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                {SUMMARY_PAGE[0].FRAN_NAME}
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Leases</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Lease Date</Typography>
                                        </td>
                                        <td className="text-center">
                                            Lease No
                                        </td>
                                        <td className="text-center">
                                            Description & Serial Number
                                        </td>
                                        <td className="text-center">
                                            Payment #
                                        </td>
                                        <td className="text-center">
                                            Amount
                                        </td>
                                        <td className="text-center">
                                            Tax
                                        </td>
                                        <td className="text-center">
                                            Total
                                        </td>
                                    </tr>
                                    {LEASE_PAYMENTS.map((lp, index)=> {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Typography>{lp.LEASE_DATE}</Typography>
                                                </td>
                                                <td className="text-left">{lp.LEASE_NO}</td>
                                                <td className="text-left">{FuseUtils.capital_letter(lp.DESCR)}</td>
                                                <td className="text-right">{lp.PYMNT_NUM}</td>
                                                <td className="text-right">${parseFloat(lp.PYMNT_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(lp.PYMNT_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right">${parseFloat(lp.PYMNT_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    <tr >
                                        <td>
                                            <Typography >Lease Totals</Typography>
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-right">${lp_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${lp_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right">${lp_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {REG_MISC!==null && (
                    <Card className={classNames(classes.card, "mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>

                            <div>
                                <table align="center">
                                    <tbody>
                                    {this.renderHeader()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="">
                                <div>
                                    <table className="mb-16">
                                        <tbody>
                                        <tr>
                                            <td className="pr-16 pb-4">
                                                <Typography className="font-light" variant="h6" color="textSecondary">
                                                    Franchisee Code
                                                </Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography className="font-light" variant="h6" color="inherit">
                                                    Name
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="pr-16">
                                                <Typography color="textSecondary">
                                                    {DLR_CODE}
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SUMMARY_PAGE[0].FRAN_NAME}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-64">
                                    <table className="simple invoice-table">
                                        <thead>
                                        <tr>
                                            <th>
                                                <h2>Regular Misc</h2>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr >
                                            <td>
                                                <Typography >Type</Typography>
                                            </td>
                                            <td className="text-center">
                                                Description
                                            </td>
                                            <td className="text-center">
                                                Tax Amt
                                            </td>
                                            <td className="text-center">
                                                Tax
                                            </td>
                                            <td className="text-center">
                                                Total Amt
                                            </td>
                                        </tr>
                                        {REG_MISC!==null && REG_MISC.map((sm, index)=>{
                                            return (
                                                <tr key={index} >
                                                    <td>{sm.TYPE}</td>
                                                    <td>
                                                        <Typography >{FuseUtils.capital_letter(sm.DESCR)}</Typography>
                                                    </td>
                                                    <td className="text-right">{parseFloat(sm.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                    <td className="text-right">{parseFloat(sm.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                    <td className="text-right">{parseFloat(sm.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr >
                                            <td><Typography >Total Special</Typography></td>
                                            <td className="text-center"></td>
                                            <td className="text-right">{sm_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right">{sm_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right">{sm_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

            </div>
        )
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getReport: Actions.getReport,
    }, dispatch);
}

function mapStateToProps({auth, franchiseeReports})
{
    return {
        franchiseeReport: franchiseeReports.franchiseeReport,
        all_regions: auth.login.all_regions
    }
}

export default  withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Report)));
