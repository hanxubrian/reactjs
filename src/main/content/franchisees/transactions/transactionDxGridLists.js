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
    GroupingState,SelectionState,IntegratedSelection,
    IntegratedGrouping, TableColumnVisibility,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableGroupRow,
    PagingPanel,TableSelection
} from '@devexpress/dx-react-grid-material-ui';


import {withStyles, Checkbox} from "@material-ui/core";
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
                color: '#cc0000!important',
                fontWeight: 700
            }
        },
        '& .credit':{
            '& td': {
                // color: 'black!important',
                // fontWeight: 700
            }
        }
    },
    content: {
        position: 'relative'
    },
    tableTheadRow: {
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
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
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
    },
    imageIcon: {
        width: 24
    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            // backgroundColor: fade(theme.palette.primary.main, 0.15),
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

const DateFormatter = ({value}) => value !== '' ? moment(value).format('MM/DD/YYYY') : '';

const DateTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={DateFormatter}
        {...props}
    />
);


class TransactionsDxGridLists extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        selection: [],
        selectAll: false,
        selectedInvoice: null,
        alertOpen: false,
        keyToBeRemoved: -1,
        pageSizes: [5, 10, 25, 50, 100],
        currentPage: 0,
        pageSize: 100,
        sorting: [{ columnName: 'TrxClass', direction: 'asc'}]
    };

    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.escFunction = this.escFunction.bind(this);
        this.changeCurrentPage = currentPage => this.setState({currentPage});
        this.changePageSize = pageSize => this.setState({pageSize});
    }

    onChange = (event, {newValue, method}) => {
        this.setState({
            value: newValue.toString()
        });
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data)
            this.processData(this.props.data)
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);

    }

    componentWillMount() {
        this.processData(this.props.data);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.setState({s: ''});
            this.processData(this.props.data)
        }
    }

    processData(data) {
        let temp = [...data];
        temp.forEach(x => {
            x.FranNameNo = `${x.FranchiseeName} - ${x.FranchiseeNo}`
        });


        this.setState(
            {data: temp,
                expandedGroups: [...new Set(temp.map(x => x.FranNameNo))]},
        );
    }

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    handleClose = () => {
        this.setState({alertOpen: false})
    };

    handleOpen = (key) => {
        this.setState({alertOpen: true});
        this.setState({keyToBeRemoved: key})
    };

    removeSelectedTransaction = () => {
        this.props.removeTransaction(this.props.regionId, this.state.keyToBeRemoved);
        this.setState({alertOpen: false})
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

    expandedGroupsChange = (expandedGroups) => {
        this.setState({expandedGroups});
    };

    ActionCell =(props )=>{
        if (props.column.name.includes('Id')) {
            return (
                <Table.Cell>
                    <div className="flex items-center actions justify-center w-full">
                        {props.row.Number==='PENDING' && (
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    this.handleOpen(props.row.Id);
                                }}
                            >
                                <Icon fontSize={"small"}>delete</Icon>
                            </IconButton>
                        )}

                        <IconButton
                            onClick={(ev) => {
                                ev.stopPropagation();
                                this.props.openEditTransactionForm(props.row.Id, props.row);
                            }}
                        >
                            <Icon fontSize={"small"}>edit</Icon>
                        </IconButton>
                    </div>
                </Table.Cell>
            )
        }
        else if (props.column.name.includes('TrxType')) {
            let _typeId = props.row.TrxType;
            // let type = this.props.transactionTypeList.filter(f=>f._id===props.row.TrxType);

            let trxTypeName = _typeId;

            if(props.row.TrxChargeType!==null)
                trxTypeName = props.row.TrxChargeType;
            // if(type.length) trxTypeName = type[0].Name;
            return (
                <Table.Cell>
                    <div className="flex items-center actions w-full">
                        {trxTypeName}
                    </div>
                </Table.Cell>
            )
        }
        else if (props.column.name.includes('TrxClass')) {
            let _typeId = props.row.TrxClass;
            let type1 = this.props.transactionTypeList.filter(f=>f.TrxClass===props.row.TrxClass);
            let type = this.props.transactionTypeList.filter(f=>f.TrxClass===props.row.TrxClass);

            let trxTypeName = _typeId;
            if (type.length) trxTypeName = type[0].Name;
            // if (type.length===0) trxTypeName = type[0].Name;

            return (
                <Table.Cell>
                    <div className="flex items-center actions w-full">
                        {trxTypeName}
                    </div>
                </Table.Cell>
            )
        }

        return <Table.Cell {...props} />;
    };


    pagerContainer = (props, ContainerProps)=> {
        return <div style={{padding: '0 12px'}} {...props}></div>
    };

    TableRow = ({ row, ...restProps }) => {
        let backColor = 'inherit';
        if(row.TrxChargeType==='D')
            backColor = 'rgba(255,0,0, .2)';
        let rowClass='';
        if(row.TrxChargeType==='D')
            rowClass = 'deduction';
        else if(row.TrxChargeType==='C')
            rowClass = 'credit';

        return (
            <Table.Row className = {classNames(rowClass)}
                       {...restProps}
                // eslint-disable-next-line no-alert
                       onClick={() => this.props.openEditTransactionForm(this.props.regionId, row)}
                       style={{
                           cursor: 'pointer',
                       }}
            />
        )
    };

    changeSelection = selection => this.setState({ selection });

    changeSorting = sorting => this.setState({ sorting });

    render() {
        const {classes} = this.props;
        const {expandedGroups} = this.state;

        const columns = [
            {name: "FranNameNo", title: "FranNameNo",},
            {name: "Number", title: "Trx. Number"},
            {name: "TrxDate", title: "Trx. Date"},
            {name: "Description", title: "Description"},
            {name: "TrxType", title: "Type"},
            {name: "TrxClass", title: "Trx. Class"},
            {name: "ExtendedPrice", title: "Ext. Price"},
            {name: "Tax", title: "Tax"},
            {name: "Fees", title: "Fees"},
            {name: "TotalTrxAmount", title: "Total"},
            {name: "Status", title: "Status"},
            {name: "Id", title: "Actions"},
        ];

        let  tableColumnExtensions = [
            { columnName: 'Number', width: 100, },
            { columnName: 'Description', width: -1},
            { columnName: 'ExtendedPrice', width: 100,  align: 'right'},
            { columnName: 'Tax', width: 80,  align: 'right'},
            { columnName: 'Fees', width: 80,  align: 'right'},
            { columnName: 'TotalTrxAmount', width: 120,  align: 'right'},
            { columnName: 'TrxDate', width: 100 },
            { columnName: 'TrxType', width: 80 },
            { columnName: 'TrxClass', width: 200},
            { columnName: 'Status', width: 80},
            { columnTitle: 'Id', width: 100 },
        ];

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
                <Grid rows={this.state.data} columns={columns}>
                    <SelectionState
                        selection={this.state.selection}
                        onSelectionChange={this.changeSelection}
                    />
                    <PagingState
                        currentPage={this.state.currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={this.state.pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    <CurrencyTypeProvider
                        for={['ExtendedPrice', 'Tax', 'Fees', 'TotalTrxAmount']}
                    />
                    <DateTypeProvider
                        for={['TrxDate']}
                    />
                    <SortingState
                        sorting={this.state.sorting}
                        onSortingChange={this.changeSorting}
                    />
                    <IntegratedSorting />
                    <GroupingState
                        grouping={[
                            {columnName: 'FranNameNo'},
                            // {columnName: 'TrxType'},
                        ]}
                        expandedGroups={expandedGroups}
                        onExpandedGroupsChange={this.expandedGroupsChange}
                    />
                    {/*<IntegratedSelection />*/}
                    <IntegratedPaging/>
                    <IntegratedGrouping/>
                    <VirtualTable height="auto"
                                  tableComponent={TableComponent}
                                  headComponent = {TableHeadComponent}
                                  columnExtensions={tableColumnExtensions}
                                  cellComponent={this.ActionCell}
                                  rowComponent = {this.TableRow}
                    />
                    <TableHeaderRow showSortingControls/>
                    <TableGroupRow
                        showColumnsWhenGrouped contentComponent={this.GroupCellContent}
                    />
                    <TableColumnVisibility
                        hiddenColumnNames={['FranNameNo']}
                        emptyMessageComponent={this.emptyMessageContent} />
                    {/*<TableSelection showSelectAll />*/}
                    <PagingPanel pageSizes={this.state.pageSizes} />
                </Grid>
                <Dialog
                    open={this.state.alertOpen}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Remove Transaction"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Proceed to remove the selected transaction?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={() => this.removeSelectedTransaction()} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleFilterPanel: Actions.toggleTransactionFilterPanel,
        removeTransaction: Actions.removeTransaction,
        openEditTransactionForm: Actions.openEditTransactionForm
    }, dispatch);
}

function mapStateToProps({transactions, auth}) {
    return {
        regionId: auth.login.defaultRegionId,
        transactions: transactions.transactionsDB,
        transactionTypeList: transactions.transactionTypeList,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsDxGridLists)));

