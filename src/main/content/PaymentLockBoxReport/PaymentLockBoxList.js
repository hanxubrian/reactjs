import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    IntegratedSorting,
    EditingState,
    GroupingState,
    IntegratedGrouping,
    DataTypeProvider,
    FilteringState,
    IntegratedFiltering,
    SearchState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
    TableEditRow,
    TableEditColumn,
    GroupingPanel,
    Toolbar,
    TableGroupRow,
    TableFilterRow,
    SearchPanel,
    DragDropProvider,
    TableColumnReordering,
    TableColumnResizing,
    ColumnChooser,
    TableColumnVisibility,
    TableFixedColumns,
    VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles,Icon, IconButton, Fab, Typography,Button, Input, CircularProgress, Menu, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import {fade} from "@material-ui/core/styles/colorManipulator";

const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
    />
);
const styles = theme => ({
    root: {
        background: "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover',
    },
    layoutRoot: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
        },
        '& .-pageSizeOptions': {
            display: 'none'
        },
        '& .ReactTable .rt-noData': {
            top: '250px',
            border: '1px solid coral'
        },
        '& .ReactTable .rt-thead.-headerGroups': {
            paddingLeft: '0!important',
            paddingRight: '0!important',
            minWidth: 'inherit!important'
        },
        '& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
            background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
            color: 'white!important'
        },
        '& .openFilter': {
            width: 'inherit'
        },
        '& .openSummary': {
            width: 300
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group': {
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
            width: 'inherit!important',
            minWidth: 'inherit!important',
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        },
        '& .wordwrap': {
            whiteSpace: 'pre-line !important',
            wordWrap: 'break-word',
        }
    },
    card: {
        width: '100%',
        maxWidth: 384,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    layoutHeader: {
        height: headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
    layoutRightSidebar: {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutLeftSidebar: {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutSidebarHeader: {
        height: headerHeight,
        minHeight: headerHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
    },
    content: {
        position: 'relative'
    },
    addButton: {
        position: 'absolute',
        bottom: -28,
        left: 16,
        zIndex: 999,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    sideButton: {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    removeButton: {
        position: 'absolute',
        bottom: -28,
        right: 16,
        zIndex: 999,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    imageIcon: {
        width: 24,
        height: 24
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.divider
    },
    search: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    tableTheadRow: {
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
    },
    tableTdEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .1)'
    },
    filterPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    summaryPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        color: 'white',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .9)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        opacity: 0.5
    },
    validationMenu: {
        color: "#07DF07!important",//green[600],
        '&$checked': {
            color: "#07DF07!important", //green[500] 00C73F 33FF33 66CC66 07DF07
        }
    },
    invalidationMenu: {
        color: "#FF557F!important",//green[600],
        '&$checked': {
            color: "#FF557F!important", //green[500] FF557F
        }
    },
    validationMenuChecked: {

    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: fade(theme.palette.primary.main, 0.15),
        },
    },
    checked:{}
});
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
const GridRootComponent = props => <Grid.Root {...props} style={{ height: '100%' }} />;
const headerHeight = 80;
const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


class PaymentLockBoxList extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            columns: Array.from([
                { name: 'lockboxdate'   ,           title: 'LockBox Date'   },
                { name: 'lockboxtime'   ,           title: 'LockBox Time'   },
                { name: 'lockboxnumber' ,           title: 'LockBox Number' },
                { name: 'creditdate'    ,           title: 'Credit Date'    },
                { name: 'invoicenumber' ,           title: 'Invoice Number' },
                { name: 'checknumber'   ,           title: 'Check Number'   },
                { name: 'checkamount'   ,           title: 'Check Amount'   },
                { name: 'postresult'    ,           title: 'Post Result'    },
                { name: 'postamount'    ,           title: 'Post Amount'    },
            ]).map((item, index)=>({ name: `${item.name}`, title: `${item.title}`, getCellValue: row => `${row.id};${item.title}` })),
            rows:  Array.from({ length: 150 })
                .map((item, index) => ({ id: index })),
            sorting: [
                { columnName: 'lockboxdate'  ,      direction: 'asc' },

            ],
            tableColumnExtensions: [
                { columnName: 'postamount',        width: 130 },

            ],
            currentPage: 0,
            pageSize: 5,
            pageSizes: [5,25, 50,75, 100],
            totalCount: 0,
            searchValue: '',
            hiddenColumnNames: ['customer', 'referencememo'],

        };
        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({ hiddenColumnNames });
        };
        this.changeSearchValue = value => this.setState({ searchValue: value });
        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });


    }
    changeSorting(sorting) {
        this.setState({
            // loading: true,
            sorting,
        });
    }
    changeCurrentPage(currentPage) {
        this.setState({
            // loading: true,
            currentPage,
        });
    }
    componentWillUnmount(){
    }
    render() {
        const { rows, columns, pageSize, pageSizes, currentPage,searchValue,tableColumnExtensions,hiddenColumnNames} = this.state;
        return (
            <Paper>
                <Grid
                    rootComponent={GridRootComponent}
                    rows={
                        rows
                    }
                    columns={columns}
                >
                    <SearchState
                        value={searchValue}
                        onValueChange={this.changeSearchValue}
                    />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    <SortingState
                        defaultSorting={[{ columnName: 'resion', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <IntegratedPaging />
                    <IntegratedFiltering />
                    <Table
                        columnExtensions={tableColumnExtensions}
                        tableComponent={TableComponent}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        hiddenColumnNames={hiddenColumnNames}
                        onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
                    />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <Toolbar />
                    <ColumnChooser />
                    <SearchPanel />
                </Grid>
            </Paper>
        );
    }
}
// export default withStyles(styles, {withTheme: true})(PaymentLockBoxReport);
export default (PaymentLockBoxList);
