import React, {Component} from 'react';

// Material-UI core components
import {
    Icon, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';

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

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const styles = theme => ({
    tableTheadRow: {
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
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
            // backgroundColor: fade(theme.palette.primary.main, 0.15),
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


    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentDidMount() {
        //'/franchisees/reports/:regionid/:year/:month/:franchiseenumber',
        if( this.props.transactionDetail!==null) {
            let trxDetail = this.props.transactionDetail.Data;
            this.props.getReport({
                regionId: this.props.regionId,
                year: '2017',
                month: '1',
                franchiseenumber: trxDetail.FranchiseeNo
            });
        }
    }

    componentWillMount() {
    }

    componentWillUnmount() {

    }


    changeSorting = sorting => this.setState({ sorting });

    render() {
        const {classes, franchiseeReport} = this.props;
        if(franchiseeReport===null || franchiseeReport!==null && franchiseeReport.Data.CUST_ACCT_TOTALS===null)
            return (<div/>);

        let data = franchiseeReport.Data.CUST_ACCT_TOTALS.map(d=>{
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
            { columnName: 'CONT_BILL', width: 120, align: 'center', wordWrapEnabled: true},
            { columnName: 'CUR_MONTH', width: 120, align: 'center', wordWrapEnabled: true},
            { columnName: 'ADTL_B_FRN', width: 120,  align: 'center', wordWrapEnabled: true},
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
        franchiseeReport: franchiseeReports.franchiseeReport,
        transactionDetail: transactions.transactionDetail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerAccountTotals)));

