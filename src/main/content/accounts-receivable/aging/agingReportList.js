import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {
    Typography,
} from '@material-ui/core';

import classNames from 'classnames';

// core components

import {withStyles} from '@material-ui/core/styles/index';

//Store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
// import * as Actions from 'store/actions';

import {
    DataTypeProvider,
    IntegratedSummary, SummaryState,
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableSummaryRow
} from '@devexpress/dx-react-grid-material-ui';

import NumberFormat from "react-number-format";

// const r=0,g=128, b=0;

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& table '    : {
            '& th:first-child, & td:first-child': {
                paddingLeft: '3.2em!important'
            },
            '& th:last-child, & td:last-child'  : {
                paddingRight: '3.2em!important'
            }
        },
        '& .customer-summary':{
            height: 36,
            // backgroundColor: `rgba(${r},${g},${b},.6)`,
            '& p': {
                color: theme.palette.text.primary,
            }
        }
    },
    tableTheadRow: {
        '& tr':{
            height: 36,
        },
        '& th':{
            color: theme.palette.text.primary,
            fontWeight: 700,
            // backgroundColor: `rgba(${r},${g},${b},.4)`,
        },
        '& th:first-child span':{
            display: 'none'
        }
    },
    tableStriped: {
        marginBottom: '0!important',
        '& tr':{
            height: 36,
        },
    },
    tableFootRow:{
            height: 36,
    },
    tableSummaryCell:{
        color: theme.palette.text.primary,
        // backgroundColor: `rgba(${r},${g},${b},.6)`,
    },
});

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

const TableSummaryCellComponentBase = ({ classes, ...restProps }) => {
    if(restProps.column.name==='customer'){
        return (
            <Table.Cell
                {...restProps}
                colSpan={4}
                className={classNames(classes.tableSummaryCell,"text-right")}>
                <strong>Customer Totals: </strong>
            </Table.Cell>
        );
    }

    else if(restProps.column.name==='current' || restProps.column.name==='value30'|| restProps.column.name==='value60'
        || restProps.column.name==='value90'|| restProps.column.name==='value91'){
        return (
            <Table.Cell
                {...restProps}
                colSpan={1}
                className={classes.tableSummaryCell}>
                {CurrencyFormatter({value: restProps.children.props.children[0].props.params.value})}
            </Table.Cell>
        );
    }
    else
        return (
            <Table.Cell
                {...restProps}
                className={classNames(classes.tableSummaryCell, 'hidden')}
            />
        );
};

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
export const TableHeadComponent = withStyles(styles, { name: 'TableHeadComponent' })(TableHeadComponentBase);
export const TableSummaryComponent = withStyles(styles, { name: 'TableSummaryComponent' })(TableSummaryComponentBase);
export const TableSummaryCellComponent = withStyles(styles, { name: 'TableSummaryCellComponent' })(TableSummaryCellComponentBase);


class AgingReportList extends Component {
    state={
        data: null
    };

    componentDidMount()
    {
        this.props.onRef(this);
        if (this.props.agingReports!==null) {

            if(this.props.agingReports.length)
                this.onProcessData();
        }
    }
    componentWillUnmount() {

        this.props.onRef(undefined);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.agingReports!==null && (this.props.agingReports !== prevProps.agingReports)) {

            if(this.props.agingReports.length)
                this.onProcessData();
        }
    }

    onProcessData = () =>{
        let temp = this.props.agingReports;
        let agings=[];
        temp.forEach(x => {
            let customers = [];
            customers.push(
                {
                    customer: x.CustomerNo,
                    customerInfo:  `${x.CustomerName} | ${x.CustomerPhone} | AR Status: ${x.ARStatus} | Effective: ${x.Effective}`,
                    type: 'customer'
                });

            let invoices=[];

            if(x.Invoices.length){
                x.Invoices.forEach(inv=>{
                    invoices.push({customer: '', ...inv, type:'invoice'})
                });
                customers.push({invoices: invoices})
            }

            agings.push(customers);
        });

        this.setState({data: agings,
            expandedGroups: [...new Set(agings.map(x => x.customer))]});
    };

    expandedGroupsChange = (expandedGroups) => {
        this.setState({expandedGroups});
    };

    TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {
        return (
            <Table.Row
                {...restProps}
            />
        );
    };

    GroupCellContent = ({column, row}) => (
        <span>
            <strong>{row.value}</strong>
		</span>
    );

    emptyMessageContent = ({column, row}) => (
        <span>
            <strong>{row.value}</strong>
		</span>
    );

    render()
    {
        const { classes} = this.props;
        const columns = [
            {name: "customer", title: "Customer"},
            {name: "InvDate", title: "Inv. Date"},
            {name: "DueDate", title: "DueDate"},
            {name: "InvoiceNo", title: "Invoice #"},
            {name: "current", title: "Current"},
            {name: "value30", title: "1-30"},
            {name: "value60", title: "31-60"},
            {name: "value90", title: "61-90"},
            {name: "value91", title: "91+"},
        ];
        let  tableColumnExtensions = [
            { columnName: 'InvDate', width: 120, },
            { columnName: 'DueDate', width: 120},
            { columnName: 'InvoiceNo', width: -1},
            { columnName: 'current', width: 120,  align: 'right'},
            { columnName: 'value30', width: 120,  align: 'right'},
            { columnName: 'value60', width: 120,  align: 'right'},
            { columnName: 'value90', width: 120,  align: 'right'},
            { columnName: 'value91', width: 120,  align: 'right'},
        ];

        console.log('data=', this.state.data);
        if(this.state.data===null)
            return <div/>;

        let totalSummaryItems = [
            { columnName: 'current',  type: 'sum'},
            { columnName: 'value30',  type: 'sum'},
            { columnName: 'value60',  type: 'sum'},
            { columnName: 'value90',  type: 'sum'},
            { columnName: 'value91',  type: 'sum'},
        ];

        return (
            <div className={classNames(classes.root, "p-0  flex flex-col h-full")} id ="wholediv">
                <div className={classNames("flex flex-col")}>
                    {this.state.data.map((aging, index)=>{
                        console.log('aging=',index, aging);
                        return (
                            <div key={index} className={classNames("flex flex-col")}>
                                <div className={classNames("w-full flex flex-row flex-start customer-summary items-center")}>
                                    <Typography className="pl-24">{aging[0].customer}</Typography>
                                    <Typography className="pl-24">{aging[0].customerInfo}</Typography>
                                </div>
                                <Grid
                                      rows={aging[1].invoices}
                                      columns={columns}
                                >
                                    <CurrencyTypeProvider
                                        for={['current', 'value30', 'value60', 'value90', 'value91']}
                                    />
                                    <SummaryState totalItems={totalSummaryItems} />

                                    <IntegratedSummary />
                                    <VirtualTable height="auto"
                                                  tableComponent={TableComponent}
                                                  headComponent = {TableHeadComponent}
                                                  columnExtensions={tableColumnExtensions}
                                    />
                                    <TableHeaderRow/>
                                    <TableSummaryRow  totalRowComponent={TableSummaryComponent}
                                                      totalCellComponent = {TableSummaryCellComponent}
                                    />
                                </Grid>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({auth, agings})
{
    return {
        agingReports: agings.agingReports,
        regionId: auth.login.defaultRegionId,
    }
}

export default  withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AgingReportList)));
