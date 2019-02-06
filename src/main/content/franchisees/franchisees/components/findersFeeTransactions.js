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
    TableSummaryRow, PagingPanel
} from '@devexpress/dx-react-grid-material-ui';


import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

//Theme Utilities
import FuseUtils from '@fuse/FuseUtils';

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
        '& tr th': {
            padding: '0 8px',
            borderBottom: '2px solid black',
            borderTop: '2px solid black',
        },
        '& tr th:nth-child(3)': {
            width: '100%'
        },
        '& tr th:nth-child(2) span': {
            display: 'none'
        },
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
            borderBottom: '2px solid black',
        }
    },
    tableFootRow: {
        height: 32,
        '& td:nth-child(3)': {
            width: '100%',
        },
        '& td:nth-child(5)>div': {
            display: 'flex',
            justifyContent: 'flex-end'
        }
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

const messages = {
    sum: 'Sum',
};

class FindersFeeTransactions extends Component {
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


    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    componentWillUnmount() {

    }


    changeSorting = sorting => this.setState({ sorting });

    render() {
        const {classes, franchiseeReport} = this.props;
        if(franchiseeReport===null || franchiseeReport!==null && franchiseeReport.Data.PERIODS[0].FRANCHISEE[0].FINDER_FEES.length===0)
            return (<div/>);

        let data = franchiseeReport.Data.PERIODS[0].FRANCHISEE[0].FINDER_FEES.map(d=>{
            d.DESCRIPTION = FuseUtils.capital_letter(d.DESCRIPTION);
            d.PYMNT_TOT = parseFloat(d.PYMNT_TOT);
            return d;
        });

        const columns = [
            {name: "CUST_NO", title: "Customer",},
            {name: "CUS_NAME", title: "Cus. Name"},
            {name: "DESCRIPTION", title: "Description"},
            {name: "PYMNT_NUM", title: "Payment #"},
            {name: "PYMNT_TOT", title: "Payment Total"},
        ];

        let  tableColumnExtensions = [
            { columnName: 'CUST_NO', width: 120, },
            { columnName: 'CUS_NAME', width: 150, },
            { columnName: 'DESCRIPTION', width: -1, },
            { columnName: 'PYMNT_NUM', width: 100},
            { columnName: 'PYMNT_TOT', width: 140,  align: 'right'},
        ];

        let totalSummaryItems = [
            { columnName: 'PYMNT_TOT', type: 'sum'},
        ];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col mt-4 mb-24")}>
                <h2>Finder Fees</h2>
                <Grid rows={data} columns={columns}>
                    <CurrencyTypeProvider
                        for={['PYMNT_TOT']}
                    />

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
                        <TableSummaryRow
                            totalRowComponent={TableSummaryComponent}
                            messages={messages}
                        />
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
        createReport: Actions.createReport,
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

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FindersFeeTransactions)));

