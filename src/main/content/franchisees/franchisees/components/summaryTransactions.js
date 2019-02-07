import React, {Component} from 'react';

//DevExtreme React-Grid
import {
    PagingState,
    IntegratedPaging,
    DataTypeProvider,
    SummaryState,
    IntegratedSummary,
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableSummaryRow
} from '@devexpress/dx-react-grid-material-ui';


import {Typography, withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

//Theme Utilities
import FuseUtils from '@fuse/FuseUtils';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

const styles = theme => ({
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

const CurrencyTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
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
        if(franchiseeReport===null || franchiseeReport!==null && franchiseeReport.Data.PERIODS[0].FRANCHISEE[0].SUMMARY_PAGE[0]===null)
            return (<div/>);

        const {SUMMARY_PAGE }  = franchiseeReport.Data.PERIODS[0].FRANCHISEE[0];
        // const aBillings = [SUMMARY_PAGE[0]['ACTUAL BILLING'][0],SUMMARY_PAGE[0].ADTL_BILL_FRAN[0],
        //     SUMMARY_PAGE[0].CLIENT_SUPPLIES[0],SUMMARY_PAGE[0].ADDTL_BILL_OFFICE[0]];
        // const aBillings1 =[SUMMARY_PAGE[0].SUBTOTAL[0], SUMMARY_PAGE[0].CLIENT_SALES_TAX[0]];
        const aBillings2 =[SUMMARY_PAGE[0].TOTAL_MON_REV[0]];
        const aBillings3 = [SUMMARY_PAGE[0].CLIENT_SALES_TAX_BOT[0]];
        const aDeductions0= [SUMMARY_PAGE[0].ROYALTY[0], SUMMARY_PAGE[0].ACCT_FEE[0],SUMMARY_PAGE[0].TECH_FEE[0],SUMMARY_PAGE[0].ADDTL_BILL_OFFICE_COMM[0],SUMMARY_PAGE[0].FRAN_NOTE_PYMT[0]];
        const aDeductions1 = [ "FINDERS_FEES", "FRANCHISE SUPPLIES"];
        const aDeductions2 =["FRANCHISE NOTE PAYMENT2", "ACCT_FEE_REB_CUR", "ACCT_FEE_REB_BAL"];
        const aDeductions3 =["SUBTOTAL_REG_DEDS"];
        const aDeductions4 =["ADVERTISING_FEE", "TOTAL_LEASES", "BUSINESS_PROT", "BPP_ADMIN", "CLIENT_SALES_TAX_BOT", "CHARGEBACKS", "PAGERS",
            "PAGERS2", "REGULAR MISCELLANEOUS", "SPECIAL_MISC","DUE_TO_FRAN"];
        const aDeductions5 =["SUBTOTAL_SPEC_DEDS"];
        const aDeductions6 =["TOTAL_DEDS"];


        return (
            <div className={classNames(classes.layoutTable, "flex flex-col mt-4 mb-24")}>
                <h2 style ={{color:'white'}}>FRANCHISEE REVENUES:</h2>

                <table style={{width:'63%'}}>
                    <tbody>

                                <tr >
                                    <td width="350">
                                        <Typography variant="subtitle1">Regular Billing</Typography>
                                    </td>
                                    <td width ="" className="text-right">
                                        $0.00
                                    </td>
                                </tr>

                    {/* { aBillings2.map((b, index)=>{
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
                    )} */}

                    </tbody>
                </table>

                <table style={{width:'90%'}}>
                    <tbody>

                    { aBillings2.map((b, index)=>{
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

                    </tbody>
                </table>

                <table style={{width:'63%'}}>
                    <tbody>

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

                <h2 className="pt-16" style ={{color:'white'}}>FRANCHISEE DEDUCTIONS:</h2>

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
                    {/*{ aDeductions2 !=null && (aDeductions2.map((b, index)=>{*/}
                    {/*return (*/}
                    {/*<tr key={index}>*/}
                    {/*<td>*/}
                    {/*<Typography variant="subtitle1">{b}</Typography>*/}
                    {/*</td>*/}
                    {/*<td className="text-right">*/}
                    {/*${SUMMARY_PAGE[0][b]!=null &&(parseFloat(SUMMARY_PAGE[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}*/}
                    {/*{SUMMARY_PAGE[0][b] ==null &&(parseFloat(0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}*/}

                    {/*/!*${ SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }*!/*/}
                    {/*</td>*/}
                    {/*</tr>*/}
                    {/*)*/}
                    {/*}*/}
                    {/*))}*/}

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
                            return (
                                <tr key={index}>
                                    <td>
                                        <Typography variant="subtitle1">
                                            {SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( SUMMARY_PAGE[0][b][0].LABEL) }
                                        </Typography>
                                    </td>
                                    <td className="text-right">
                                    ${ SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                        {/*${ SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }*/}
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
                                        {/*${parseFloat(SUMMARY_PAGE[0][b]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}*/}
                                        ${ SUMMARY_PAGE[0][b] !=null && SUMMARY_PAGE[0][b][0] !=null && ( parseFloat(SUMMARY_PAGE[0][b][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) }
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
                <table style={{width:'90%'}}>
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

                <table>
                    <tbody>
                        <tr>
                            <td><h2 className="pt-16" style ={{color:'white'}}>DUE TO FRANCHISEE BEFORE CHARGEBACK:</h2></td>
                            <td style={{width:'14%'}}> $0.00 </td>
                        </tr>
                    </tbody>
                </table>

                <table style={{width:'63%'}}>
                    <tbody>
                        <tr >
                            <td width="350">
                            <Typography variant="subtitle1">Chargeback</Typography>
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
                            <td><h2 className="pt-16" style ={{color:'white'}}>DUE TO FRANCHISEE:</h2></td>
                            <td style={{width:'14%'}}> $0.00 </td>
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
        franchiseeReport: franchiseeReports.franchiseeReport1,
        transactionDetail: transactions.transactionDetail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryTransactons)));

