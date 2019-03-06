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
        if(franchiseeReport===null || (franchiseeReport!==null && franchiseeReport.Data.SUMMARY_PAGE[0].length===0))
            return (<div/>);

        const {SUMMARY_PAGE }  = franchiseeReport.Data;

        const aBillings = [
            SUMMARY_PAGE[0]['ACTUAL BILLING'],
            SUMMARY_PAGE[0].ADTL_BILL_FRAN,
            SUMMARY_PAGE[0].CLIENT_SUPPLIES,
            SUMMARY_PAGE[0].ADDTL_BILL_OFFICE
        ];

        let aBillings3 = [];
        let summaryROYALTY = null;
        let summarytech = [];
        let summaryAcct = [];
        let summaryAddtl= [];
        let summaryFranNote = [];

        if(SUMMARY_PAGE[0].TOTAL_MON_REV!== null && SUMMARY_PAGE[0].TOTAL_MON_REV.length>0){
            aBillings3.push(SUMMARY_PAGE[0].TOTAL_MON_REV[0]);
        }

        if(SUMMARY_PAGE[0].CLIENT_SALES_TAX_BOT!== null && SUMMARY_PAGE[0].CLIENT_SALES_TAX_BOT.length>0){
            aBillings3.push(SUMMARY_PAGE[0].CLIENT_SALES_TAX_BOT[0]);
        }

        if(SUMMARY_PAGE[0].ROYALTY!== null && SUMMARY_PAGE[0].ROYALTY.length>0){
            summaryROYALTY = SUMMARY_PAGE[0].ROYALTY[0];
        }

        if(SUMMARY_PAGE[0].ACCT_FEE!== null && SUMMARY_PAGE[0].ACCT_FEE.length>0){
            summaryAcct = SUMMARY_PAGE[0].ACCT_FEE[0];
        }

        if(SUMMARY_PAGE[0].TECH_FEE!== null && SUMMARY_PAGE[0].TECH_FEE.length>0){
            summarytech = SUMMARY_PAGE[0].TECH_FEE[0];
        }

        if(SUMMARY_PAGE[0].ADDTL_BILL_OFFICE_COMM!== null && SUMMARY_PAGE[0].ADDTL_BILL_OFFICE_COMM.length>0){
            summaryAddtl = SUMMARY_PAGE[0].ADDTL_BILL_OFFICE_COMM[0];
        }

        if(SUMMARY_PAGE[0].FRAN_NOTE_PYMT!== null && SUMMARY_PAGE[0].FRAN_NOTE_PYMT.length>0){
            summaryFranNote = SUMMARY_PAGE[0].FRAN_NOTE_PYMT[0];
        }

        const aDeductions0 = [summaryROYALTY,summaryAcct,summarytech,summaryAddtl,summaryFranNote];
        const aDeductions1 = [ "FINDERS_FEES"];
        const aDeductions2 =["FRAN_NOTE_PYMT2"];
        const aDeductions3 =["SUBTOTAL_REG_DEDS"];
        const aDeductions4 =["ADVERTISING_FEE", "TOTAL_LEASES", "BUSINESS_PROT", "BPP_ADMIN", "CLIENT_SALES_TAX_BOT",
            "REGULAR MISCELLANEOUS", "SPECIAL_MISC"];
        const aDeductions5 =["SUBTOTAL_SPEC_DEDS"];
        const aDeductions6 =["TOTAL_DEDS"];
        const aDeductions7 =["CHARGEBACKS"];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col mt-4 mb-12 w-full")}>
                <h2 >FRANCHISEE REVENUE:</h2>

                <table style={{width:'63%'}}>
                    <tbody>
                    { aBillings.map((b, index)=> {
                            if (b !== null && b.length > 0)
                                return (
                                    <tr key={index}>
                                        <td width="350">
                                            <Typography variant="subtitle1">{b[0].LABEL}</Typography>
                                        </td>
                                        <td width="" className="text-right">
                                            ${parseFloat(b[0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
                                        <Typography variant="subtitle1">{b.LABEL}</Typography>
                                    </td>
                                    <td width ="" className="text-right">
                                        ${parseFloat(b.AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                    </td>
                                </tr>
                            )
                        }
                    )}

                    <tr >
                        <td width="350">
                            <Typography variant="subtitle1">Total Customer Invoice</Typography>
                        </td>
                        <td width ="" className="text-right">
                            $0.00
                        </td>
                    </tr>


                    </tbody>
                </table>

                <h2 className="pt-16" >FRANCHISEE DEDUCTIONS:</h2>
                {summaryROYALTY && summaryROYALTY.BaseROYALTYAMOUNT>0 && summaryROYALTY.MinROYALTYAMOUNT (
                    <table className="" style={{width:'63.5%'}}>
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
                            <td> <Typography variant="subtitle1">{summaryROYALTY.BaseROYALTYLabel}</Typography></td>
                            <td className="text-right">${parseFloat(summaryROYALTY.BaseROYALTYAMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                            <td/>
                            <td/>
                        </tr>
                        <tr>
                            <td> <Typography variant="subtitle1">{summaryROYALTY.MinROYALTYLabel}</Typography></td>
                            <td className="text-right">${parseFloat(summaryROYALTY.MinROYALTYAMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                            <td/>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                )}

                <table className="" style={{width:'63.5%'}}>
                    <thead>
                    <tr>
                        <th width="250"/>
                        <th width="350">
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
                    </tbody>
                </table>
                <table style={{width:'80%'}}>
                    <tbody>
                    { aDeductions3.map((b, index)=>{
                            if(SUMMARY_PAGE[0][b]===null || (SUMMARY_PAGE[0][b]!==null && SUMMARY_PAGE[0][b].length===0) )
                                return false;
                            else
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
                    </tbody>
                </table>
                <table style={{width:'63.5%'}}>
                    <tbody>
                    { aDeductions2 !=null && (aDeductions2.map((b, index)=>{
                        if (SUMMARY_PAGE[0][b])
                            return (
                                <tr key={index}>
                                    <td>
                                        <Typography variant="subtitle1">
                                            {SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( SUMMARY_PAGE[0][b][0].LABEL) }
                                        </Typography>
                                    </td>
                                    <td className="text-right">
                                        ${ SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
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
                            if(SUMMARY_PAGE[0][b]===null || (SUMMARY_PAGE[0][b]!==null && SUMMARY_PAGE[0][b].length===0) )
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {(SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b].length) && SUMMARY_PAGE[0][b][0] !=null && ( SUMMARY_PAGE[0][b][0].LABEL) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            { SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( CurrencyFormatter({value: SUMMARY_PAGE[0][b][0].AMOUNT})) }
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
                            if(SUMMARY_PAGE[0][b]===null)
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( SUMMARY_PAGE[0][b][0].LABEL) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            { SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( CurrencyFormatter({value: SUMMARY_PAGE[0][b][0].AMOUNT})) }
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
                            if(SUMMARY_PAGE[0][b]===null)
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( SUMMARY_PAGE[0][b][0].LABEL) }
                                            </Typography>
                                        </td>
                                        <td style={{width:'15.4%'}}>
                                            { SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( CurrencyFormatter({value: SUMMARY_PAGE[0][b][0].AMOUNT}))}
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
                        <td className="pt-16" style={{width:'16%'}}> { SUMMARY_PAGE[0]['DUE_TO_FRAN_BEFORE_CHARGEBACK'] !=null && SUMMARY_PAGE[0]['DUE_TO_FRAN_BEFORE_CHARGEBACK'][0] !=null && ( CurrencyFormatter({value: SUMMARY_PAGE[0]['DUE_TO_FRAN_BEFORE_CHARGEBACK'][0].AMOUNT}))} </td>
                    </tr>
                    </tbody>
                </table>

                <table style={{width:'63.5%'}}>
                    <tbody>
                    { aDeductions7.map((b, index)=>{
                            if(SUMMARY_PAGE[0][b]===null)
                                return false;
                            else
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Typography variant="subtitle1">
                                                {SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && SUMMARY_PAGE[0][b][0].AMOUNT !== "0" && ( SUMMARY_PAGE[0][b][0].LABEL) }
                                            </Typography>
                                        </td>
                                        <td className="text-right">
                                            { SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && SUMMARY_PAGE[0][b][0].AMOUNT !== "0" && ( '$' + parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                        </td>
                                    </tr>
                                )
                        }
                    )}
                    </tbody>
                </table>
                <table style={{width:'63.5%'}}>
                    <tbody>
                    <tr >
                        <td width="350">
                            <Typography variant="subtitle1">Tax Levy</Typography>
                        </td>
                        <td width ="" className="text-right">
                            $0.00
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table style={{width:'63.5%'}}>
                    <tbody>
                    <tr >
                        <td width="350">
                            <Typography variant="subtitle1">Garnishment</Typography>
                        </td>
                        <td width ="" className="text-right">
                            $0.00
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table>
                    <tbody>
                    <tr>
                        <td><h2 className="pt-16" >DUE TO FRANCHISEE:</h2></td>
                        <td className="pt-16" style={{width:'16%'}}> { SUMMARY_PAGE[0]['DUE_TO_FRAN'] !=null && SUMMARY_PAGE[0]['DUE_TO_FRAN'][0] !=null && ( CurrencyFormatter({value: SUMMARY_PAGE[0]['DUE_TO_FRAN'][0].AMOUNT}))} </td>
                    </tr>
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
        franchiseeReport: franchiseeReports.franchiseeReport,
        transactionDetail: transactions.transactionDetail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryTransactons)));

