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
                <td className="text-center" width='200' align="left">
                    <Typography color="inherit">
                        <img src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png" alt=""/>
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
        const aDeductions1 = [ "FINDERS_FEES", "FRANCHISE SUPPLIES", "REGULAR MISCELLANEOUS", "SUBTOTAL_REG_DEDS",
            "ADVERTISING_FEE", "TOTAL_LEASES", "BUSINESS_PROT", "BPP_ADMIN", "CLIENT_SALES_TAX_BOT", "CHARGEBACKS", "PAGERS",
            "PAGERS2", "SPECIAL_MISC", "SUBTOTAL_SPEC_DEDS", "TOTAL_DEDS", "DUE_TO_FRAN"];
        const aDeductions2 =["FRANCHISE NOTE PAYMENT2", "ACCT_FEE_REB_CUR", "ACCT_FEE_REB_BAL"];

        let ct_amount = 0.0, ct_tax = 0.0, ct_total = 0.0;
        let cb_amount = 0.0, cb_tax = 0.0, cb_total = 0.0;
        let lp_amount = 0.0, lp_tax = 0.0, lp_total = 0.0;
        let sm_amount = 0.0, sm_tax = 0.0, sm_total = 0.0;
        let st_extended = 0.0, st_tax = 0.0, st_total = 0.0;
        let cat_billing = 0.0, cat_month = 0.0, cat_addtl = 0.0, cat_cs = 0.0, cat_ofc = 0.0, cat_fee = 0.0;

        if(CUS_TRXS!==null){
            CUS_TRXS.forEach(ct=>{
                ct_amount += parseFloat(ct.TRX_AMT);
                ct_tax += parseFloat(ct.TRX_TAX);
                ct_total += parseFloat(ct.TRX_TOT);
            });
        }
        if(LEASE_PAYMENTS !==null){
            LEASE_PAYMENTS.forEach(lp=>{
                lp_amount += parseFloat(lp.PYMNT_AMT);
                lp_tax += parseFloat(lp.PYMNT_TAX);
                lp_total += parseFloat(lp.PYMNT_TOT);
            });
        }


        if(CHARGEBACKS!==null) {
            CHARGEBACKS.forEach(st => {
                cb_amount += parseFloat(st.TRX_AMT);
                cb_tax += parseFloat(st.TRX_TAX);
                cb_total += parseFloat(st.TRX_TOT);
            });
        }

        if(REG_MISC!==null ) {
            REG_MISC.forEach(sm => {
                sm_amount += parseFloat(sm.TRX_AMT);
                sm_tax += parseFloat(sm.TRX_TAX);
                sm_total += parseFloat(sm.TRX_TOT);
            });
        }
        if(SUPPLY_TRXS!==null){
            SUPPLY_TRXS.forEach(st=>{
                st_extended += parseFloat(st.EXTENDED);
                st_tax += parseFloat(st.TRX_TAX);
                st_total += parseFloat(st.TRX_TOT);
            });
        }
        if(CUST_ACCT_TOTALS!==null){
            CUST_ACCT_TOTALS.forEach(cat=>{
                cat_billing += parseFloat(cat.CONT_BILL);
                cat_month += parseFloat(cat.CUR_MONTH);
                cat_addtl += parseFloat(cat.ADTL_B_FRN);
                cat_cs += parseFloat(cat.CLIENT_SUP);
                cat_ofc += parseFloat(cat.ADTL_B_OFC);
                cat_fee += parseFloat(cat.FF_PYMNT);
            });

        }

        return (
            <div className={classNames(classes.root, "p-0 sm:p-64  print:p-0")}>
                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>

                        <div>
                            <table align="">
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
                                            <Typography color="inherit">Franchisee Code:</Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography color="inherit">Name</Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="inherit">{DLR_CODE}</Typography>
                                            <Typography color="inherit"><br/></Typography>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
                                            <Typography color="inherit"><br/></Typography>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="text-left">
                                            <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_NAME}</Typography>
                                            <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_ADDRESS}</Typography>
                                            <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_CITY} {SUMMARY_PAGE[0].FRAN_STATE},{SUMMARY_PAGE[0].FRAN_ZIP}</Typography>
                                        </td>
                                        <td className="text-left" width='200'>
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

                            <div className="mt-16">
                                <h2 style ={{color:'blue'}}>FRANCHISEE REVENUE:</h2>
                                <div style ={divline}></div>
                                <table className="">
                                    <thead>
                                    <tr>
                                        <th width="250">
                                            {/*<h2 style ={{color:'blue'}}>FRANCHISEE REVENUES:</h2>*/}
                                        </th>
                                        <th width="350">
                                        </th>
                                        <th className="text-right">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
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
                                <h2 className="pt-16" style ={{color:'blue'}}>FRANCHISEE DEDUCTIONS:</h2>
                                <div style ={divline}></div>
                                <table className="">
                                    <thead>
                                    <tr>
                                        <th width="250"></th>
                                        <th width="350">
                                        </th>
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
                                                        <Typography variant="subtitle1">
                                                            {SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( SUMMARY_PAGE[0][b][0].LABEL) }
                                                        </Typography>
                                                    </td>
                                                    <td className="text-right">
                                                        {/*${parseFloat(SUMMARY_PAGE[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}*/}
                                                        ${ SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )}
                                    { aDeductions2 !=null && (aDeductions2.map((b, index)=>{
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Typography variant="subtitle1">{b}</Typography>
                                                    </td>
                                                    <td className="text-right">
                                                        ${SUMMARY_PAGE[0][b]!=null &&(parseFloat(SUMMARY_PAGE[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}
                                                        {SUMMARY_PAGE[0][b] ==null &&(parseFloat(0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}

                                                        {/*${ SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }*/}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    ))}

                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td width="700"> <h2 style ={{color:'blue'}}>DUE TO FRANCHISEE:</h2></td>
                                        <td>97,794.90</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style ={divline}></div>

                                <table className="">
                                    <thead>
                                    <tr>
                                        <th>

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
                            <table align="">
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
                                            <Typography color="inherit">Franchisee Code:
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="inherit">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
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
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th width="300" align="left">
                                                <h2 >Customer Transactions</h2>
                                            </th>
                                            <th width="100">Invoice</th>
                                            <th width="250">Description</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>


                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}>
                                <table style={{width:'100%'}}>
                                    <tbody>
                                    <tr >
                                        <td width="65"><Typography >Customer</Typography></td>
                                        <td width ="227"></td>
                                        <td width ="25">I/C</td>
                                        <td width ="74">Invoice</td>
                                        <td className="text-left" width="345">Description</td>
                                        <td className="text-right" width ="73">Inv Amt</td>
                                        <td className="text-right" width ="60">Inv Tax</td>
                                        <td className="text-right">Total</td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}>
                                <table className="" style={{width:'100%'}}>
                                    <tbody>
                                    <tr >
                                        <td width="65"><Typography ></Typography></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-left"></td>
                                        <td className="text-right"></td>
                                        <td className="text-right"></td>
                                        <td className="text-right"></td>
                                    </tr>

                                    {CUS_TRXS!=null && ( CUS_TRXS.map((ct, index)=>{
                                        return (
                                            <tr key={index}>
                                            <td>
                                                <Typography >{ct.CUST_NO}</Typography>
                                            </td>
                                                <td width ="227">
                                                    <Typography >{FuseUtils.capital_letter(ct.CUS_NAME)}</Typography>
                                                </td>
                                                <td width ="25">{ct.TRX_TYPE}</td>
                                                <td width ="74"><Typography >{ct.CUST_NO}</Typography></td>

                                            <td className="text-left" width ="345">{FuseUtils.capital_letter(ct.DESCR)}</td>
                                            <td className="text-right" width ="73">${parseFloat(ct.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right" width ="60">${parseFloat(ct.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right">${parseFloat(ct.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        </tr>
                                        )
                                    }))}

                                    </tbody>
                                </table>
                                </div>
                                <table  style={{width:'100%'}}>
                                    <tbody>
                                    <tr >
                                        <td width="736">
                                            <Typography >Totals for this Franchise</Typography>
                                        </td>


                                        <td className="text-right" width ="73">${ct_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td className="text-right" width ="60">${ct_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
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
                            <table align="">
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
                                            <Typography color="inherit">Franchisee Code:
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="inherit">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
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

                            <div className="" >
                                <h2>Customer Account Totals</h2>
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}>
                                    <table style={{width:'100%'}}>
                                        <tbody>
                                        <tr>
                                            <td width="65">
                                                <Typography >Customer</Typography>
                                            </td>
                                            <td width="253">

                                            </td>
                                            <td className="text-right" width="70">
                                                <Typography >Contract</Typography>
                                                <Typography >Billing</Typography>
                                            </td>
                                            <td className="text-right" width="70">
                                                <Typography >Current</Typography>
                                                <Typography >Month</Typography>
                                            </td>
                                            <td className="text-right" width="70">
                                                <Typography >Addtl Bill</Typography>
                                                <Typography >Franchisee</Typography>
                                            </td>
                                            <td className="text-right" width="70">
                                                Client Supplies
                                            </td>
                                            <td className="text-right" width="70">
                                                Additional Bill Office
                                            </td>
                                            <td className="text-right" width="70">
                                                <Typography >Finders</Typography>
                                                <Typography >Fee Nbr</Typography>
                                            </td>
                                            <td className="text-right" width="70">
                                                <Typography >Finders</Typography>
                                                <Typography >Fee</Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <table className="" style={{width:'100%'}}>
                                    <tbody>
                                    {CUST_ACCT_TOTALS !=null && (CUST_ACCT_TOTALS.map((ct, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td width="65">
                                                    <Typography >{ct.CUST_NO}</Typography>
                                                </td>
                                                <td width="250">
                                                    <Typography >{FuseUtils.capital_letter(ct.CUS_NAME)}</Typography>
                                                </td>
                                                <td className="text-right" width="70">${parseFloat(ct.CONT_BILL).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">${parseFloat(ct.CUR_MONTH).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">${parseFloat(ct.ADTL_B_FRN).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">${parseFloat(ct.CLIENT_SUP).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">${parseFloat(ct.ADTL_B_OFC).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">{ct.FF_NBR}</td>
                                                <td className="text-right" width="70">${parseFloat(ct.FF_PYMNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            </tr>
                                        )
                                    }))}
                                    </tbody>
                                </table>
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                <div style ={{ width:'100%'}}>
                                    <table style={{width:'100%'}}>
                                        <tbody>
                                        <tr>
                                            <td width ="325"><Typography >Franchisee Actual Amount</Typography></td>
                                            <td className="text-right" width="70">${cat_billing.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right" width="70">${cat_month.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right" width="70">${cat_addtl.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right" width="70">${cat_cs.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right" width="70">${cat_ofc.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td className="text-right" width="70"></td>
                                            <td className="text-right" width="70">${cat_fee.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto mt-64")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="">
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
                                            <Typography color="inherit">Franchisee Code:
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="inherit">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
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

                            <div className="">
                                <h2>Supply Transactions</h2>
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                <div style ={{width:'100%'}}>
                                    <table style ={{width:'100%'}}>
                                        <tbody>
                                        <tr>
                                            <td className="text-left" width="350">
                                                Description
                                            </td>
                                            <td className="text-right" width="70">
                                                Quantity
                                            </td>
                                            <td className="text-right" width="70">
                                                Unit Cost
                                            </td>
                                            <td className="text-right" width="70">
                                                Extended
                                            </td>
                                            <td className="text-right" width="70">
                                                Tax
                                            </td>
                                            <td className="text-right" width="70">
                                                Total Amt
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {SUPPLY_TRXS != null && (
                                    <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                )}
                                <table className="" style={{width:'100%',}}>
                                    <tbody>
                                    { SUPPLY_TRXS != null && (SUPPLY_TRXS.map((st, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td width="350">
                                                    <Typography >{FuseUtils.capital_letter(st.DESCR)}</Typography>
                                                </td>
                                                <td className="text-right" width="70">{st.QUANTITY}</td>
                                                <td className="text-right" width="70">${parseFloat(st["UNIT COST"]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">${parseFloat(st.EXTENDED).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">${parseFloat(st.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td className="text-right" width="70">${parseFloat(st.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            </tr>
                                        )
                                    }))}
                                    </tbody>
                                </table>
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                <div style={{width:'100%'}}>
                                    <table style={{width:'100%'}}>
                                        <tbody>
                                        <tr >
                                            <td width="350"><Typography >Total Supplies</Typography></td>
                                            <td width="70" className="text-right"></td>
                                            <td width="70"  className="text-right"></td>
                                            <td width="70"  className="text-right">${st_extended.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td  width="70" className="text-right">${st_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td  width="70" className="text-right">${st_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {CHARGEBACKS!==null && (
                    <Card className={classNames(classes.card, "mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table align="">
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
                                                <Typography color="inherit">Franchisee Code:
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography color="inherit">
                                                    Name
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="pr-16">
                                                <Typography color="inherit">
                                                    {DLR_CODE}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
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


                                        { CHARGEBACKS != null && (CHARGEBACKS.map((cb, index)=>{
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
                                        })) }
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
                )}

                <Card className={classNames(classes.card, "mx-auto mt-64")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="">
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

                                                <Typography color="inherit">Franchisee Code:
                                                </Typography>

                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="inherit">
                                                {DLR_CODE}
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='100'>
                                            <Typography color="inherit"><br/></Typography>
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
                            <h2>Leases</h2>
                            <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                            <table style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}>
                                <tbody>
                                <tr>
                                    <td width="100" className="text-left">Lease Date</td>
                                    <td width="100" className="text-right">Lease No</td>
                                    <td width="300" className="text-right">Description & Serial Number</td>
                                    <td width="100" className="text-right">Payment#</td>
                                    <td width="100" className="text-right">Amount</td>
                                    <td width="100" className="text-right">Tax</td>
                                    <td width="100" className="text-right">Total</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="">
                                <table className="" style={{width:'100%'}}>
                                    <tbody>
                                    {LEASE_PAYMENTS != null && (LEASE_PAYMENTS.map((lp, index)=> {
                                        return (
                                            <tr key={index}>
                                                <td width="100" className="text-left">
                                                    <Typography>{lp.LEASE_DATE}</Typography>
                                                </td>
                                                <td width="100" className="text-right">{lp.LEASE_NO}</td>
                                                <td width="300" className="text-right">{FuseUtils.capital_letter(lp.DESCR)}</td>
                                                <td width="100" className="text-right">{lp.PYMNT_NUM}</td>
                                                <td width="100" className="text-right">${parseFloat(lp.PYMNT_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td width="100" className="text-right">${parseFloat(lp.PYMNT_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                <td width="100" className="text-right">${parseFloat(lp.PYMNT_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            </tr>
                                        )
                                    }))
                                    }

                                    </tbody>
                                </table>
                                {LEASE_PAYMENTS !=null && (
                                    <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>

                                )}
                                <table style={{width:'100%'}}>
                                    <tbody>
                                    <tr>
                                        <td width="100" className="text-left">
                                            <Typography >Lease Totals</Typography>
                                        </td>
                                        <td width="100" className="text-right"></td>
                                        <td width="300" className="text-right"></td>
                                        <td width="100" className="text-right"></td>
                                        <td width="100" className="text-right">${lp_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td width="100" className="text-right">${lp_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        <td width="100" className="text-right">${lp_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
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
                                <table align="">
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
                                                <Typography color="inherit">Franchisee Code:
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography color="inherit">
                                                    Name
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="pr-16">
                                                <Typography color="inherit">
                                                    {DLR_CODE}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
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

                                <div className="">
                                    <h2>Regular Misc</h2>
                                    <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                    <table style={{width:'100%'}}>
                                        <tbody>
                                        <tr>
                                            <td width="100" className="text-left">
                                                <Typography >Type</Typography>
                                            </td>
                                            <td  width="400" className="text-left">
                                                Description
                                            </td>
                                            <td  width="100" className="text-right">
                                                Tax Amt
                                            </td>
                                            <td  width="100" className="text-right">
                                                Tax
                                            </td>
                                            <td  width="100" className="text-right">
                                                Total Amt
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    {REG_MISC!==null &&(
                                        <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                    )}
                                    <table className="" style={{width:'100%'}}>
                                        <tbody>

                                        {REG_MISC!==null && REG_MISC.map((sm, index)=>{
                                            return (
                                                <tr key={index} >
                                                    <td width="100" className="text-left">{sm.TYPE}</td>
                                                    <td width="400" className="text-left">
                                                        <Typography >{FuseUtils.capital_letter(sm.DESCR)}</Typography>
                                                    </td>
                                                    <td width="100" className="text-right">{parseFloat(sm.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                    <td width="100" className="text-right">{parseFloat(sm.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                    <td width="100" className="text-right">{parseFloat(sm.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                </tr>
                                            )
                                        })}

                                        </tbody>
                                    </table>
                                    <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                    <table style={{width:'100%'}}>
                                        <tbody>
                                        <tr>
                                            <td width="100" className="text-left"><Typography >Total Regular</Typography></td>
                                            <td width="400" className="text-right"></td>
                                            <td width="100" className="text-right">{sm_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td width="100" className="text-right">{sm_tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                            <td width="100" className="text-right">{sm_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
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
const divline ={
    width:'65%',
    borderBottom:'2px solid #25058a',
};

export default  withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Report)));
