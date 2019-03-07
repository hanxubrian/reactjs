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
        '& .-pageSizeOptions': {
            display: 'none'
        },
        '& .openFilter': {
            width: 'inherit'
        },
        '& .openSummary': {
            width: 300
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        },
        '& .deduction':{
            '& td': {
                fontWeight: 700
            }
        },
        '& .credit':{
            '& td': {
            }
        }
    },
    content: {
        position: 'relative'
    },
    tableTheadRow: {
        backgroundColor: theme.palette.primary.main,
        '& tr': {
            height: 48
        },
        '& tr th': {
            color: 'white'
        }
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
    },
    tableTdEven: {
    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
        },
    },
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
        if (this.props.data !== prevProps.data)
            this.processData(this.props.data)
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.processData(this.props.data);
    }

    componentWillUnmount() {
    }


    processData= data => {
        let temp = [...data];
        temp.forEach(x => {
            x.FranNameNo = `${x.FranchiseeName} - ${x.FranchiseeNo}`
        });
    };

    handleClose = () => {
        this.setState({alertOpen: false})
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
            {name: "Royalty", title: "Royalty"},
            {name: "Advertising", title: "Advertising Fee"},
            {name: "Accounting", title: "Administration Fee"},
            {name: "BusinessProtection", title: "Business Protection"},
        ];

        let  tableColumnExtensions = [
            { columnName: 'Royalty', width: 100, },
            { columnName: 'Advertising', width: -1},
            { columnName: 'Accounting', width: 100,  align: 'right'},
            { columnName: 'BusinessProtection', width: 80,  align: 'right'},
        ];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
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

