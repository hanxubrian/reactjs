import React, {Component} from 'react';

// core components
import {
    Hidden, Icon, IconButton, Input, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';

//DevExtreme React-Grid
import {
    PagingState,
    IntegratedPaging,
    DataTypeProvider,
    GroupingState,SelectionState,IntegratedSelection,
    IntegratedGrouping, TableColumnVisibility
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
            backgroundColor: fade(theme.palette.primary.main, 0.15),
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

const ActionRender = ({value}) => (
    <div className="flex items-center actions justify-center w-full">
        <IconButton
            onClick={(ev) => {
                ev.stopPropagation();
                // this.handleOpen(value);
            }}
        >
            <Icon fontSize={"small"}>delete</Icon>
        </IconButton>
        <IconButton
            onClick={(ev) => {
                ev.stopPropagation();
                // this.props.openEditTransactionForm(this.props.regionId, row.original);
            }}
        >
            <Icon fontSize={"small"}>edit</Icon>
        </IconButton>
    </div>
);

const ActionProvider = props => (
    <DataTypeProvider
        formatterComponent={ActionRender}
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
        // expandedGroups: ['FranNameNo'],
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

    toggleSelection = (key, shift, row) => {
        /*
          https://react-table.js.org/#/story/select-table-hoc
          Implementation of how to manage the selection state is up to the developer.
          This implementation uses an array stored in the component state.
          Other implementations could use object keys, a Javascript Set, or Redux... etc.
        */
        // start off with the existing state
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        // check to see if the key exists
        if (keyIndex >= 0) {
            // it does exist so we will remove it using destructing
            selection = [
                ...selection.slice(0, keyIndex),
                ...selection.slice(keyIndex + 1)
            ];
        } else {
            // it does not exist so add it
            selection.push(key);
        }
        // update the state
        this.setState({selection});
    };

    isSelected = key => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
        return this.state.selection.includes(key);
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
			{/* {column.title} */}
            <strong>{row.value}</strong>
		</span>
    );

    emptyMessageContent = ({column, row}) => (
        <span>
			{/* {column.title} */}
            <strong>{row.value}</strong>
		</span>
    );

    expandedGroupsChange = (expandedGroups) => {
        this.setState({expandedGroups});
    };

    ActionCell =(props)=>{
        if (props.column.name.includes('Id')) {
            return (
                <Table.Cell>
                    <div className="flex items-center actions justify-center w-full">
                        <IconButton
                            onClick={(ev) => {
                                ev.stopPropagation();
                                this.handleOpen(props.row.Id);
                            }}
                        >
                            <Icon fontSize={"small"}>delete</Icon>
                        </IconButton>
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

        return <Table.Cell {...props} />;
    };

    TableRow = ({ row, ...restProps }) => (
        <Table.Row
            {...restProps}
            // eslint-disable-next-line no-alert
            onClick={() => this.props.openEditTransactionForm(this.props.regionId, row)}
            style={{
                cursor: 'pointer',
            }}
        />
    );

    changeSelection = selection => this.setState({ selection });

    render() {
        const {classes} = this.props;
        const {toggleSelection, isSelected} = this;

        const {expandedGroups} = this.state;

        console.log('rows=', this.state.data);
        const columns = [
            {name: "FranNameNo", title: "FranNameNo",},
            {name: "Number", title: "Trx. Number"},
            {name: "Description", title: "Description"},
            {name: "ExtendedPrice", title: "Ext. Price"},
            {name: "Tax", title: "Tax"},
            {name: "Fees", title: "Fees"},
            {name: "TotalTrxAmount", title: "Total"},
            {name: "TrxDate", title: "Trx. Date"},
            {name: "TrxType", title: "Type"},
            {name: "Status", title: "Status"},
            {name: "Id", title: "Actions"},
        ];

        let  tableColumnExtensions = [
                { columnName: 'Number', width: 100 },
                { columnName: 'Description', width: -1 },
                { columnName: 'ExtendedPrice', width: 100,  align: 'right' },
                { columnName: 'Tax', width: 80,  align: 'right' },
                { columnName: 'Fees', width: 80,  align: 'right' },
                { columnName: 'TotalTrxAmount', width: 120,  align: 'right'},
                { columnName: 'TrxDate', width: 100 },
                { columnName: 'TrxType', width: 50 },
                { columnName: 'Status', width: 80 },
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
                    <GroupingState
                        grouping={[
                            {columnName: 'FranNameNo'},
                            // {columnName: 'TrxType'},
                        ]}
                        // expandedGroups={expandedGroups}
                        // onExpandedGroupsChange={this.expandedGroupsChange}
                    />
                    <IntegratedSelection />
                    <IntegratedPaging/>
                    <IntegratedGrouping/>
                    <VirtualTable height="auto"
                                  tableComponent={TableComponent}
                                  headComponent = {TableHeadComponent}
                                  columnExtensions={tableColumnExtensions}
                                  cellComponent={this.ActionCell}
                                  rowComponent = {this.TableRow}
                    />
                    <TableHeaderRow/>
                    <TableGroupRow
                        showColumnsWhenGrouped contentComponent={this.GroupCellContent}
                    />
                    <TableColumnVisibility
                        hiddenColumnNames={['FranNameNo']}
                        emptyMessageComponent={this.emptyMessageContent} />
                    <TableSelection showSelectAll />
                    <PagingPanel pageSizes={this.state.pageSizes}/>
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
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsDxGridLists)));
