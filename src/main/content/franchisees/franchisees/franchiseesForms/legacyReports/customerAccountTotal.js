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


import {Icon, IconButton, withStyles} from "@material-ui/core";
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
    },
    tableTheadRow: {
        '& tr': {
            height: 32
        },
        '& tr th':{
            borderBottom: `2px solid ${theme.palette.text.primary}`,
            borderTop: `2px solid ${theme.palette.text.primary}`,
        },
        '& tr th:nth-child(2)': {
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
        '& tbody tr':{
            height: 36
        },
        '& tbody tr:nth-of-type(odd)': {
        },
        '& tbody tr td': {
            fontSize: 12,
            paddingLeft: 4,
            paddingRight: 4,
            borderBottom: `0px solid ${theme.palette.text.primary}`,
        },
        '& tbody tr td:nth-child(2)': {
            width: '100%',
        },
        '& tbody tr:last-child td': {
            borderBottom: `2px solid ${theme.palette.text.primary}`,
        },
        '& tr.subHeading td:nth-child(1)': {
            fontWeight: 700,
            fontSize: 14
        },
        '& tr.subTotal td:nth-child(4)':{
            display: 'flex',
            justifyContent: 'space-between',
            height: 36,
        }
    },
    tableFootRow: {
        height: 42,
        '& td': {
            borderBottom: `1px solid ${theme.palette.text.primary}`,
            '& div':{
                color: theme.palette.text.primary
            }
        },
        '& td:nth-child(2)': {
            width: '100%',
        },
        '& td:nth-child(4)': {
            paddingRight: 0,
        },
        '& td:nth-child(4)>div': {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        '& td:nth-child(5)': {
            width: 0,
        },
    },
    tableSummaryCell: {
    }
});

const CurrencyFormatter = ({value}) => (
    <NumberFormat value={value}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator
                  decimalScale={2}
                  prefix="$" renderText={value => <div className="sum-01">{value}</div>}/>
);

const CurrencyTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
);

const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
    />
);

const TableHeadComponentBase = ({ classes, ...restProps }) => {
    return (
        <Table.TableHead
            {...restProps}
            className={classes.tableTheadRow}
        />
    )};

const TableSummaryComponentBase = ({ classes, ...restProps }) =>{
    return     (
        <Table.Row
            {...restProps}
            className={classes.tableFootRow}
        />
    );
};


const TableSummaryCellComponentBase = ({ classes, ...restProps }) => {
    if(restProps.column.name==='type'){
        return (
            <Table.Cell
                {...restProps}
                colSpan={3}
                className={classes.tableSummaryCell}>
                <strong>Total Revenue for this Franchisee</strong>
            </Table.Cell>
        );
    }
    else if(restProps.column.name==='CUR_MONTH'){
        return (
            <Table.Cell
                {...restProps}
                colSpan={1}
                className={classes.tableSummaryCell}>
                {CurrencyFormatter({value: restProps.children.props.children[0].props.params.value/2})}
            </Table.Cell>
        );

    }
    else
        return (
            <Table.Cell
                {...restProps}
                className={classes.tableSummaryCell}
            />
        );
};

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
export const TableSummaryComponent = withStyles(styles, { name: 'TableSummaryComponent' })(TableSummaryComponentBase);
export const TableHeadComponent = withStyles(styles, { name: 'TableHeadComponent' })(TableHeadComponentBase);
export const TableSummaryCellComponent = withStyles(styles, { name: 'TableSummaryCellComponent' })(TableSummaryCellComponentBase);

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

    TableRow = ({ row, ...restProps }) => {
        let rowClass='';

        return (
            <Table.Row className = {classNames(rowClass)}
                       {...restProps}
            />
        )
    };

    TableCell = ({classes, ...restProps })=>{
        return (
            <Table.Cell
                {...restProps}
            />
        )
    };

    render() {
        const {classes, franchiseeReport} = this.props;
        if(franchiseeReport===null || franchiseeReport!==null && franchiseeReport.Data.CUST_ACCT_TOTALS===null)
            return (<div/>);

        let data = franchiseeReport.Data.CUST_ACCT_TOTALS.map(c=>{
            c.CUR_MONTH = parseFloat(c.CUR_MONTH);
            return c;
        });

        const columns = [
            {name: "CUST_NO", title: "Customer #"},
            {name: "CUS_NAME", title: "Customer Name "},
            {name: "CUR_MONTH", title: "Monthly Total"},
        ];

        let  tableColumnExtensions = [
            { columnName: 'CUST_NO', width: 120, },
            { columnName: 'CUS_NAME', width: -1, },
            { columnName: 'CUR_MONTH', width: 200, align: 'right', wordWrapEnabled: true},
        ];

        let totalSummaryItems = [
            { columnName: 'CUR_MONTH', type: 'sum'},
        ];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col mt-4 mb-12")}>
                <h2>Total Revenue by Customer</h2>
                <Grid rows={data} columns={columns}>
                    <PagingState
                        currentPage={this.state.currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={this.state.pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    <CurrencyTypeProvider
                        for={['CUR_MONTH']}
                    />

                    <IntegratedPaging/>
                    <SummaryState totalItems={totalSummaryItems} />
                    <IntegratedSummary />

                    <VirtualTable height="auto"
                                  tableComponent={TableComponent}
                                  headComponent = {TableHeadComponent}
                                  columnExtensions={tableColumnExtensions}
                                  rowComponent = {this.TableRow}
                                  cellComponent = {this.TableCell}
                    />
                    <TableHeaderRow />
                    <TableSummaryRow  totalRowComponent={TableSummaryComponent}
                                      totalCellComponent = {TableSummaryCellComponent}
                    />
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
        franchiseeReport: franchiseeReports.franchiseeReport,
        transactionDetail: transactions.transactionDetail,
        billingLists: invoices.billingLists,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerAccountTotals)));

