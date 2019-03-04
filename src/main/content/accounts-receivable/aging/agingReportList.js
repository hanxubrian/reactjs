import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

import classNames from 'classnames';

// core components

import {withStyles} from '@material-ui/core/styles/index';

//Store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

import {
    DataTypeProvider,
    GroupingState, IntegratedGrouping, TableColumnVisibility,
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableGroupRow
} from '@devexpress/dx-react-grid-material-ui';

import NumberFormat from "react-number-format";


//Child components

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& table '    : {
            '& th:first-child, & td:first-child': {
                paddingLeft: 0 + '!important'
            },
            '& th:last-child, & td:last-child'  : {
                paddingRight: 0 + '!important'
            }
        },
        '& .report-header h1':{
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1.5,
        },
        '& .report-header h2':{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.5,
        },
        '& .report-header h3':{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.5,
        },
        '& .report-header td:nth-child(2), & .report-header td:nth-child(3)':{
            verticalAlign: 'top',
            paddingTop: 20
        },
        '& .report-header td:nth-child(3)':{
            paddingLeft: 30
        }

    },
    paper: {
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card       : {
        width         : 1020,
        '@media print': {
            width    : '100%!important',
            boxShadow: 'none'
        }
    },
    cardContent: {
        '& .page': {
            // borderBottom: `1px solid ${theme.palette.text.primary}`
        },
        '& .page1': {
            paddingTop: 12,
            borderTop: `1px solid ${theme.palette.text.primary}`,
            // borderBottom: `1px solid ${theme.palette.text.primary}`
        }
    },
    divider    : {
        width          : 1,
        backgroundColor: theme.palette.divider,
        height         : 144
    },
    seller     : {
        backgroundColor: theme.palette.primary.dark,
        color          : theme.palette.getContrastText(theme.palette.primary.dark),
        marginRight    : -88,
        paddingRight   : 66,
        width          : 480,
        '& .divider'   : {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
            opacity        : .5
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    longerTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 835
    },
    overlay: {
        position: 'absolute',
        top: -104,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    progress: {
        margin: theme.spacing.unit * 2,
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
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
export const TableHeadComponent = withStyles(styles, { name: 'TableHeadComponent' })(TableHeadComponentBase);

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
            let customer = `${x.CustomerNo} ${x.CustomerName} | ${x.CustomerPhone} | AR Status: ${x.ARStatus} | Effective: ${x.Effective}`;
            if(x.Invoices.length){
                x.Invoices.forEach(inv=>{
                    agings.push({customer: customer, ...inv})
                })
            }
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
        const {expandedGroups} = this.state;
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

        let totalSummaryItems = [
            { columnName: 'Amount', type: 'sum'},
        ];

        console.log('data=', this.state.data);
        if(this.state.data===null)
            return <div/>;


        return (
            <div className={classNames(classes.root, "p-0 sm:p-32  flex flex-col h-full")} id ="wholediv">
                <div className={classNames("flex flex-col")}>
                    <Grid
                        rows={this.state.data}
                        columns={columns}
                    >
                        <CurrencyTypeProvider
                            for={['current', 'value30', 'value60', 'value90', 'value91']}
                        />
                        <GroupingState
                            grouping={[
                                {columnName: 'customer'},
                            ]}
                            expandedGroups={expandedGroups}
                            onExpandedGroupsChange={this.expandedGroupsChange}
                        />
                        <IntegratedGrouping/>
                        <VirtualTable height="auto"
                                      tableComponent={TableComponent}
                                      headComponent = {TableHeadComponent}
                                      columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow/>
                        <TableGroupRow
                            showColumnsWhenGrouped contentComponent={this.GroupCellContent}
                        />
                        <TableColumnVisibility
                            hiddenColumnNames={['customer']}
                            emptyMessageComponent={this.emptyMessageContent}
                        />
                    </Grid>
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
