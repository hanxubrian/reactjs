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
    tableTheadRow: {
        backgroundColor: theme.palette.primary.main,
        '& tr': {
            height: 48
        },
        '& tr th': {
            color: 'white'
        },
        '& tr th:nth-child(2)': {
            width: '100%'
        }
    },
    imageIcon: {
        width: 24
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
        '& tbody tr td:nth-child(2)': {
            width: '100%',
        },

    },
    tableFootRow: {
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
        if(franchiseeReport===null || franchiseeReport!==null && franchiseeReport.Data.PERIODS[0].FRANCHISEE[0].CUST_ACCT_TOTALS.length===0)
            return (<div/>);

        let data = franchiseeReport.Data.PERIODS[0].FRANCHISEE[0].CUST_ACCT_TOTALS.map(d=>{
            d.CUS_NAME = FuseUtils.capital_letter(d.CUS_NAME);
            d.CONT_BILL = parseFloat(d.CONT_BILL);
            d.CUR_MONTH = parseFloat(d.CUR_MONTH);
            d.ADTL_B_FRN = parseFloat(d.ADTL_B_FRN);
            d.ADTL_B_OFC = parseFloat(d.ADTL_B_OFC);
            d.FF_PYMNT = parseFloat(d.FF_PYMNT);
            return d;
        });

        const columns = [
            {name: "CUST_NO", title: "Cus. #",},
            {name: "CUS_NAME", title: "Cus. Name"},
            {name: "CONT_BILL", title: "Contact Billing"},
            {name: "CUR_MONTH", title: "Current Month"},
            {name: "ADTL_B_FRN", title: "Additional Bill Franchisee"},
            {name: "ADTL_B_OFC", title: "Client Supplies"},
            {name: "FF_NBR", title: "Finders Fee Nbr"},
            {name: "FF_PYMNT", title: "Finders Fee"},
        ];

        let  tableColumnExtensions = [
            { columnName: 'CUST_NO', width: 80, },
            { columnName: 'CUS_NAME', width: -1, },
            { columnName: 'CONT_BILL', width: 120, align: 'right', wordWrapEnabled: true},
            { columnName: 'CUR_MONTH', width: 120, align: 'right', wordWrapEnabled: true},
            { columnName: 'ADTL_B_FRN', width: 120,  align: 'right', wordWrapEnabled: true},
            { columnName: 'ADTL_B_OFC', width: 120,  align: 'right', wordWrapEnabled: true},
            { columnName: 'FF_NBR', width: 120,  align: 'center', wordWrapEnabled: true},
            { columnName: 'FF_PYMNT', width: 120, align: 'right',wordWrapEnabled: true},
        ];

        let totalSummaryItems = [
            { columnName: 'CUR_MONTH', type: 'sum'},
            { columnName: 'CONT_BILL',  type: 'sum'},
            { columnName: 'FF_PYMNT',  type: 'sum'},
            { columnName: 'ADTL_B_FRN',  type: 'sum'},
        ];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col mt-4 mb-24")}>
                <h2>Customer Account Totals</h2>
                <Grid rows={data} columns={columns}>
                    <PagingState
                        currentPage={this.state.currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={this.state.pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    <CurrencyTypeProvider
                        for={['CUR_MONTH', 'CONT_BILL', 'ADTL_B_FRN', 'ADTL_B_OFC', 'FF_PYMNT']}
                    />

                    <IntegratedPaging/>
                    <SummaryState
                        totalItems={totalSummaryItems}
                    />
                    <IntegratedSummary />

                    <VirtualTable height="auto"
                                  tableComponent={TableComponent}
                                  headComponent = {TableHeadComponent}
                                  columnExtensions={tableColumnExtensions}
                    />
                    <TableHeaderRow />
                    <TableSummaryRow  totalRowComponent={TableSummaryComponent}/>
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

function mapStateToProps({transactions, auth, franchiseeReports}) {
    return {
        regionId: auth.login.defaultRegionId,
        transactions: transactions.transactionsDB,
        transactionTypeList: transactions.transactionTypeList,
        franchiseeReport: franchiseeReports.franchiseeReport1,
        transactionDetail: transactions.transactionDetail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerAccountTotals)));

