import React, {Component} from 'react';

//DevExtreme React-Grid
import {
    DataTypeProvider,
} from '@devexpress/dx-react-grid';

import {
    Table,
} from '@devexpress/dx-react-grid-material-ui';


import {Typography, withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

const styles = theme => ({
    layoutTable:{
        '& h2':{
            fontSize: 18
        }
    },
    tableTheadRow: {
        backgroundColor: theme.palette.primary.main,
        '& tr': {
            height: 48
        },
        '& tr th': {
            color: 'white'
        },
        '& tr th:nth-child(3)': {
            width: '100%'
        }
    },
    tableStriped: {
        marginBottom: '0!important',
        '& tbody tr':{
            height: 36
        },
        '& tbody tr:nth-of-type(odd)': {
        },
        '& tbody tr td': {
            fontSize: 11,
            paddingLeft: 4,
            paddingRight: 4
        },
        '& tbody tr td:nth-child(3)': {
            width: '100%',
        },

    },
    tableFootRow: {
        height: 42,
        '& td': {
            borderBottom: `1px solid ${theme.palette.text.primary}`,
        },
        '& td:nth-child(3)': {
            width: '100%',
        },
    }
});

const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
    />
);

const TableHeadComponentBase = ({ classes, ...restProps }) => (
    <Table.TableHead
        {...restProps}
        className={classes.tableTheadRow}
    />
);

const TableSummaryComponentBase = ({ classes, ...restProps }) => (
    <Table.Row
        {...restProps}
        className={classes.tableFootRow}
    />
);

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
export const TableSummaryComponent = withStyles(styles, { name: 'TableSummaryComponent' })(TableSummaryComponentBase);
export const TableHeadComponent = withStyles(styles, { name: 'TableHeadComponent' })(TableHeadComponentBase);

const CurrencyFormatter = ({value}) => (
    <NumberFormat value={value}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator
                  decimalScale={2}
                  prefix="$" renderText={value => <div>{value}</div>}/>
);


class SummaryTransactons extends Component {
    state = {
        pageSizes: [5, 10, 25, 50, 100],
        currentPage: 0,
        pageSize: 100,
    };

    constructor(props) {
        super(props);

        this.changeCurrentPage = currentPage => this.setState({currentPage});
        this.changePageSize = pageSize => this.setState({pageSize});
    }

    onChange = (event, {newValue, method}) => {
        this.setState({
            value: newValue.toString()
        });
    };


    changeSorting = sorting => this.setState({ sorting });

    render() {
        const {classes, franchiseeReport} = this.props;
        if(franchiseeReport===null || (franchiseeReport!==null && franchiseeReport.Data.PERIODS[0].FRANCHISEES[0].SummaryPages[0].length===0))
            return (<div/>);

        const {SummaryPages }  = franchiseeReport.Data.PERIODS[0].FRANCHISEES[0];

        const aBillings = [
            SummaryPages[0].ActualBilling,
            SummaryPages[0].Adtl_Bill_Fran,
            SummaryPages[0].ClientSupplies,
            SummaryPages[0].Adtl_Bill_Office
        ];

        let aBillings3 = [];
        let summaryRoyalty = null;
        let summarytech = [];
        let summaryAcct = [];
        let summaryAddtl= [];
        let summaryFranNote = [];

        if(SummaryPages[0].TotalMonthRev!== null && SummaryPages[0].TotalMonthRev.length>0){
            aBillings3.push(SummaryPages[0].TotalMonthRev[0]);
        }

        if(SummaryPages[0].ClientSalesTaxBot!== null && SummaryPages[0].ClientSalesTaxBot.length>0){
            aBillings3.push(SummaryPages[0].ClientSalesTaxBot[0]);
        }

        if(SummaryPages[0].Royalty!== null && SummaryPages[0].Royalty.length>0){
            summaryRoyalty = SummaryPages[0].Royalty[0];
        }

        if(SummaryPages[0].AccountFee!== null && SummaryPages[0].AccountFee.length>0){
            summaryAcct = SummaryPages[0].AccountFee[0];
        }

        if(SummaryPages[0].TechFee!== null && SummaryPages[0].TechFee.length>0){
            summarytech = SummaryPages[0].TechFee[0];
        }

        if(SummaryPages[0].AddtlBillOfficeComm!== null && SummaryPages[0].AddtlBillOfficeComm.length>0){
            summaryAddtl = SummaryPages[0].AddtlBillOfficeComm[0];
        }

        if(SummaryPages[0].FranNotePymt!== null && SummaryPages[0].FranNotePymt.length>0){
            summaryFranNote = SummaryPages[0].FranNotePymt[0];
        }

        const aDeductions0 = [summaryRoyalty,summaryAcct,summarytech,summaryAddtl,summaryFranNote];
        const aDeductions1 = [ "FinderFee"];
        const aDeductions2 =["FRAN_NOTE_PYMT2", "AcctFeeRebCur", "AcctFeeRebBal"];
        const aDeductions3 =["SubtotalReg"];
        const aDeductions4 =["AdvertisingFee", "TotalLeases", "BusinessProt", "BppAdmin", "ClientSalesTaxBot",
            "RegularMisc", "SpecialMisc"];
        const aDeductions5 =["SubtotalSpec"];
        const aDeductions6 =["TotalDeds"];
        const aDeductions7 =["ChargeBacks", "ChildSupport"];
        const aDeductions8 =["AcctFeeRebBal"];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col mt-4 mb-12 w-full")}>
                <h2 >FRANCHISEE REVENUE:</h2>

                <table style={{width:'63%'}}>
                    <tbody>
                    { aBillings.map((b, index)=> {
                            if (b !== null && b.length > 0 && b[0].Amount)
                                return (
                                    <tr key={index}>
                                        <td width="350">
                                            <Typography variant="subtitle1">{b[0].Label}</Typography>
                                        </td>
                                        <td width="" className="text-right">
                                            ${parseFloat(b[0].Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                        </td>
                                    </tr>
                                )
                            else
                                return false
                        }
                    )}

                    { aBillings3.map((b, index)=>{
                            return (
                                <tr key={index}>
                                    <td width="350">
                                        <Typography variant="subtitle1">{b.Label}</Typography>
                                    </td>
                                    <td width ="" className="text-right">
                                        ${parseFloat(b.Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>

                <h2 className="pt-16" >FRANCHISEE DEDUCTIONS:</h2>
                {summaryRoyalty && summaryRoyalty.BaseRoyaltyAmount>0 && summaryRoyalty.MinRoyaltyAmount (
                    <table className="">
                        <thead>
                        <tr>
                            <th width="250"/>
                            <th width="200"/>
                            <th width="150"/>
                            <th className="text-right"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td> <Typography variant="subtitle1">{summaryRoyalty.BaseRoyaltyLabel}</Typography></td>
                            <td className="text-right">${parseFloat(summaryRoyalty.BaseRoyaltyAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                            <td/>
                            <td/>
                        </tr>
                        <tr>
                            <td> <Typography variant="subtitle1">{summaryRoyalty.MinRoyaltyLabel}</Typography></td>
                            <td className="text-right">${parseFloat(summaryRoyalty.MinRoyaltyAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                            <td/>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                )}

                <table className="">
                    <tbody>
                    { aDeductions0.map((b, index)=>{
                        if(parseFloat(b.Amount))
                            return (
                                <tr key={index}>
                                    <td>
                                        <Typography variant="subtitle1">{b.Label}</Typography>
                                    </td>
                                    <td className="text-right">
                                        ${parseFloat(b.Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
                                            {SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( SummaryPages[0][b][0].Label) }
                                        </Typography>
                                    </td>
                                    <td className="text-right">
                                        {/*${parseFloat(SummaryPages[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}*/}
                                        ${ SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( parseFloat(SummaryPages[0][b][0].Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
                <table style={{width:'80%'}}>
                    <tbody>
                    { aDeductions3.map((b, index)=>{
                            if(SummaryPages[0][b]===null || (SummaryPages[0][b]!==null && SummaryPages[0][b].length===0) )
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( SummaryPages[0][b][0].Label) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            {/*${parseFloat(SummaryPages[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}*/}
                                            ${ SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( parseFloat(SummaryPages[0][b][0].Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                        </td>
                                    </tr>
                                )
                        }
                    )}
                    </tbody>
                </table>
                <table style={{width:'63.5%'}}>
                    <tbody>
                    { aDeductions2 !=null && (aDeductions2.map((b, index)=>{
                        if (SummaryPages[0][b] && SummaryPages[0][b].Amount)
                            return (
                                <tr key={index}>
                                    <td>
                                        <Typography variant="subtitle1">
                                            {SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( SummaryPages[0][b][0].Label) }
                                        </Typography>
                                    </td>
                                    <td className="text-right">
                                        ${ SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( parseFloat(SummaryPages[0][b][0].Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                    </td>
                                </tr>
                            )
                        }
                    ))}
                    </tbody>
                </table>
                <table style={{width:'63.5%'}}>
                    <tbody>
                    { aDeductions4.map((b, index)=>{
                            if(SummaryPages[0][b]===null || (SummaryPages[0][b]!==null && SummaryPages[0][b].length===0) )
                                return false;
                            else if(SummaryPages[0][b][0].Amount)
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {(SummaryPages[0][b] !=null && SummaryPages[0][b].length) && SummaryPages[0][b][0] !=null && ( SummaryPages[0][b][0].Label) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            { SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( CurrencyFormatter({value: SummaryPages[0][b][0].Amount})) }
                                        </td>
                                    </tr>
                                )
                        }
                    )}
                    </tbody>
                </table>
                <table style={{width:'80%'}}>
                    <tbody>
                    { aDeductions5.map((b, index)=>{
                            if(SummaryPages[0][b]===null)
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( SummaryPages[0][b][0].Label) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            { SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( CurrencyFormatter({value: SummaryPages[0][b][0].Amount})) }
                                        </td>
                                    </tr>
                                )
                        }
                    )}
                    </tbody>
                </table>
                <table>
                    <tbody>
                    { aDeductions6.map((b, index)=>{
                            if(SummaryPages[0][b]===null)
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( SummaryPages[0][b][0].Label) }
                                            </Typography>
                                        </td>
                                        <td style={{width:'15.4%'}}>
                                            { SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && ( CurrencyFormatter({value: SummaryPages[0][b][0].Amount}))}
                                        </td>
                                    </tr>
                                )
                        }
                    )}
                    </tbody>
                </table>

                <table>
                    <tbody>
                    <tr>
                        <td><h2 className="pt-16" >DUE TO FRANCHISEE BEFORE CHARGEBACK:</h2></td>
                        <td className="pt-16" style={{width:'16%'}}> { SummaryPages[0]['DUE_TO_FRAN_BEFORE_CHARGEBACK'] !=null && SummaryPages[0]['DUE_TO_FRAN_BEFORE_CHARGEBACK'][0] !=null && ( CurrencyFormatter({value: SummaryPages[0]['DUE_TO_FRAN_BEFORE_CHARGEBACK'][0].Amount}))} </td>
                    </tr>
                    </tbody>
                </table>

                <table style={{width:'63%'}}>
                    <tbody>
                    { aDeductions7.map((b, index)=>{
                            if(SummaryPages[0][b]===null)
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && SummaryPages[0][b][0].Amount !== "0" && ( SummaryPages[0][b][0].Label) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            { SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && SummaryPages[0][b][0].Amount !== "0" && ( '$' + parseFloat(SummaryPages[0][b][0].Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                        </td>
                                    </tr>
                                )
                        }
                    )}
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <td><h2 className="pt-16" >DUE TO FRANCHISEE:</h2></td>
                        <td className="pt-16" style={{width:'16%'}}> { SummaryPages[0]['DUE_TO_FRAN'] !=null && SummaryPages[0]['DUE_TO_FRAN'][0] !=null && ( CurrencyFormatter({value: SummaryPages[0]['DUE_TO_FRAN'][0].Amount}))} </td>
                    </tr>
                    </tbody>
                </table>

                <table style={{width:'63%'}}>
                    <tbody>
                    { aDeductions8.map((b, index)=>{
                            if(SummaryPages[0][b]===null)
                                return false;
                            else if(SummaryPages[0][b][0].Amount)
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && SummaryPages[0][b][0].Amount !== "0" && ( SummaryPages[0][b][0].Label) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            {/*${parseFloat(SummaryPages[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}*/}
                                            { SummaryPages[0][b] !=null && SummaryPages[0][b][0] !=null && SummaryPages[0][b][0].Amount !== "0" && ( '$' + parseFloat(SummaryPages[0][b][0].Amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                        </td>
                                    </tr>
                                )
                        }
                    )}
                    </tbody>
                </table>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeTransaction: Actions.removeTransaction,
        openEditTransactionForm: Actions.openEditTransactionForm,
    }, dispatch);
}

function mapStateToProps({transactions, auth, franchiseeReports}) {
    return {
        regionId: auth.login.defaultRegionId,
        transactions: transactions.transactionsDB,
        transactionTypeList: transactions.transactionTypeList,
        franchiseeReport: franchiseeReports.franchiseeReport1,
        transactionDetail: transactions.transactionDetail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryTransactons)));

