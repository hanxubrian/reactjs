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


import {withStyles} from "@material-ui/core";
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
    layoutTable: {
        '& table th:first-child span': {
            paddingLeft: '8px!important'
        }
    },
    tableTheadRow: {
        '& tr': {
            height: 32
        },
        '& tr th':{
            borderBottom: `2px solid ${theme.palette.text.primary}`,
            borderTop: `2px solid ${theme.palette.text.primary}`,
        },
        '& tr th:nth-child(3)': {
            width: '100%'
        },
        // '& tr th:nth-child(2) span': {
        //     display: 'none'
        // },
    },
    imageIcon: {
        width: 24
    },
    tableStriped: {
        marginBottom: '0!important',
        '& tbody tr:nth-of-type(odd)': {
        },
        '& tbody tr td': {
            fontSize: 12,
            paddingLeft: 4,
            paddingRight: 4
        },
        '& tbody tr td:nth-child(3)': {
            width: '100%',
        },
        '& tbody tr:last-child td': {
            borderBottom: `2px solid ${theme.palette.text.primary}`,
        }
    },
    tableFootRow: {
        '& td': {
            borderBottom: `1px solid ${theme.palette.text.primary}`,
        },
        '& td:nth-child(2)': {
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

const TableHeadComponentBase = ({ classes, ...restProps }) => {
    console.log('head', restProps);
    return (
    <Table.TableHead
        {...restProps}
        className={classes.tableTheadRow}
    />
)};

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

class CustomerAccountTotals extends Component {
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
        if(franchiseeReport===null || franchiseeReport!==null && franchiseeReport.Data.PERIODS[0].FRANCHISEE[0].CUST_ACCT_TOTALS===null)
            return (<div/>);

        let data = [];

        franchiseeReport.Data.PERIODS[0].FRANCHISEE[0].CUST_ACCT_TOTALS.forEach(type=>{
            let billing = this.props.billingLists.filter(b=>b._id===type.Billing);
            let line = {};
            line.type = billing[0].Name;
            line.CUS_NO = '';
            line.CUS_NAME = '';
            line.CUS_TAX = '';
            data.push(line);
            if(type.Customers !==null && type.Customers.length){
                type.Customers.forEach(c=>{
                    let line_c = {};
                    line_c.type = '';
                    line_c.CUS_NO = c.CUST_NO;
                    line_c.CUS_NAME = c.CUS_NAME;
                    line_c.CUS_TAX = c.TRX_AMT;

                    data.push(line_c);
                })
            }
            let line_sub = {};
            line_sub.type = 'Sub Total';
            line_sub.CUS_NO = '';
            line_sub.CUS_NAME = '';
            line_sub.CUS_TAX = type.Amount;
            data.push(line_sub);
        });

        console.log('data= ', data);

        const columns = [
            {name: "type", title: "Customer Transactions",},
            {name: "CUS_NO", title: "Customer"},
            {name: "CUS_NAME", title: " "},
            {name: "CUS_TAX", title: "TOTAL Without Tax"},
        ];

        let  tableColumnExtensions = [
            { columnName: 'type', width: 160, },
            { columnName: 'CUS_NO', width: 120, },
            { columnName: 'CUS_NAME', width: -1, },
            { columnName: 'CUS_TAX', width: 160, align: 'right', wordWrapEnabled: true},
        ];

        let totalSummaryItems = [
            // { columnName: 'CUR_MONTH', type: 'sum'},
        ];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col mt-4 mb-24")}>
                <h2>Total Revenue by Customer</h2>
                <Grid rows={data} columns={columns}>
                    <PagingState
                        currentPage={this.state.currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={this.state.pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    <CurrencyTypeProvider
                        for={['CUS_TAX']}
                    />

                    <IntegratedPaging/>
                    {data.length>0 && (
                        <SummaryState totalItems={totalSummaryItems} />
                    )}
                    {data.length>0 && (<IntegratedSummary /> )}

                    <VirtualTable height="auto"
                                  tableComponent={TableComponent}
                                  headComponent = {TableHeadComponent}
                                  columnExtensions={tableColumnExtensions}
                    />
                    <TableHeaderRow />
                    {data.length>0 && (
                        <TableSummaryRow  totalRowComponent={TableSummaryComponent}/>
                    )}
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeTransaction: Actions.removeTransaction,
        openEditTransactionForm: Actions.openEditTransactionForm,
        getReport: Actions.getReport,
    }, dispatch);
}

function mapStateToProps({transactions, auth, franchiseeReports,invoices}) {
    return {
        regionId: auth.login.defaultRegionId,
        transactions: transactions.transactionsDB,
        transactionTypeList: transactions.transactionTypeList,
        franchiseeReport: franchiseeReports.franchiseeReport1,
        transactionDetail: transactions.transactionDetail,
        billingLists: invoices.billingLists,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerAccountTotals)));

