import React, {Component} from 'react';

// Material-UI core components
import {

} from '@material-ui/core';

//DevExtreme React-Grid
import {
    DataTypeProvider,
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
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
import moment from 'moment';

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const styles = theme => ({
    layoutTable: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
        },
        '& .deduction':{
            '& td': {
                fontWeight: 700
            }
        },
        '& .credit':{
            '& td': {
            }
        },
        '& table colgroup col':{
            width: '20%!important'
        },
        '& table colgroup col:last-child':{
            width: '0!important'
        },
        '& div>div':{
            maxHeight: 96,
        }
    },
    content: {
        position: 'relative'
    },
    tableTheadRow: {
        backgroundColor: theme.palette.primary.main,
        '& tr': {
            height: 28
        },
        '& tr th': {
            color: 'white',
            width: '20%!important'
        },
        '& tr th:last-child': {
            color: 'white',
            width: '0!important'
        }
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
    },
    tableTdEven: {
    },
    tableStriped: {
        marginBottom: '0!important',
        '& tr': {
            height: 28
        },
        '& tbody tr:nth-of-type(odd)': {
        },
    },
    TableContainer: {

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
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
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

class InvoiceFeesGrid extends Component {
    state = {
        temp: [],
        data: [],
    };

    constructor(props) {
        super(props);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.invoiceDetail!==prevProps.invoiceDetail){
            console.log('updated=', this.props.invoiceDetail)
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.processData();
    }

    componentWillUnmount() {
    }


    processData = () => {
       if(this.props.invoiceDetail!==null) {
           let items = this.props.invoiceDetail.Data.Items;
           if(items.length) {
               let fees = [];
               items.forEach(item=>{
                   if(item.Distribution!==null && item.Distribution.length &&
                       item.Distribution[0].Fees!==null && item.Distribution[0].Fees)
                       fees.push({FranchiseeNumber: item.Distribution[0].FranchiseeNumber, ...item.Distribution[0].Fees[0]});
               });
               if(fees.length){
                   this.setState({data: fees});
               }
           }
       }
    };

    TableRow = ({ row, ...restProps }) => {
        let rowClass='';
        return (
            <Table.Row className = {classNames(rowClass)}
                       {...restProps}
                       onClick={() => this.props.openEditTransactionForm(this.props.regionId, row)}
            />
        )
    };


    render() {
        const {classes} = this.props;

        const columns = [
            {name: "FranchiseeNumber", title: "Franchisee #"},
            {name: "Royalty", title: "Royalty"},
            {name: "Advertising", title: "Advertising Fee"},
            {name: "Accounting", title: "Administration Fee"},
            {name: "BusinessProtection", title: "Business Protection"},
        ];

        let  tableColumnExtensions = [
            { columnName: 'FranchiseeNumber', width: 100, },
            { columnName: 'Royalty', width: 100,  align: 'center' },
            { columnName: 'Advertising', width: 100,  align: 'center'},
            { columnName: 'Accounting', width: 100,  align: 'center'},
            { columnName: 'BusinessProtection', width: 100,  align: 'center'},
        ];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col h-full mt-12")}>
                <h3>Invoice Fees</h3>
                <Grid rows={this.state.data} columns={columns}>
                    <CurrencyTypeProvider
                        for={['Royalty', 'Advertising', 'Accounting', 'BusinessProtection']}
                    />
                    <VirtualTable height="auto"
                                  tableComponent={TableComponent}
                                  headComponent = {TableHeadComponent}
                                  columnExtensions={tableColumnExtensions}
                                  rowComponent = {this.TableRow}
                    />
                    <TableHeaderRow/>
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeTransaction: Actions.removeTransaction,
        openEditTransactionForm: Actions.openEditTransactionForm
    }, dispatch);
}

function mapStateToProps({transactions, auth, invoices}) {
    return {
        regionId: auth.login.defaultRegionId,
        transactions: transactions.transactionsDB,
        transactionTypeList: transactions.transactionTypeList,
        invoiceDetail: invoices.invoiceDetail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceFeesGrid)));

