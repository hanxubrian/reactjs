import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';

// core components
import { Icon, IconButton, Input, Paper, Button, Zoom } from '@material-ui/core';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';

// theme components
// import {FuseAnimate} from '@fuse';

import { withStyles, Checkbox } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
// import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';


import { Tooltip } from '@material-ui/core';
// import GoogleMap from 'google-map-react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withHandlers, lifecycle } from "recompose";

import {
    Getter, Template, TemplateConnector
} from '@devexpress/dx-react-core';
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

import { CustomizedDxGridSelectionPanel } from "./../../common/CustomizedDxGridSelectionPanel";

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

import * as PropTypes from 'prop-types';

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
    },
    content: {
        position: 'relative'
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
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
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
    imageIcon: {
        width: 24
    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: 'fade(' + theme.palette.primary.main + ', 0.03)',
        },
        '& tbody tr:nth-of-type(even)': {
            backgroundColor: 'fade(' + theme.palette.primary.secondary + ', 0.03)',
        },
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
    }
});
//
// table content rows stle
//
const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
    />
);
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);


class CheckbookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gmapVisible: false,
            locationFilterValue: [],
            pins: [],
            pins2: [],

            s: '',
            temp: [],
            data: [],
            selectAll: false,

            selection: [],
            rows: [],

            tableColumnExtensions: [
                {
                    title: "Id",
                    name: "_id",
                    columnName: "_id",
                    width: 250,
                    wordWrapEnabled: true,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                    togglingEnabled: false,
                },
                {
                    title: "No",
                    name: "cknumber",
                    columnName: "cknumber",
                    width: 120,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                {
                    title: "ckpayee",
                    name: "ckpayee",
                    columnName: "ckpayee",
                    width: -1,
                    sortingEnabled: false,
                    filteringEnabled: false,
                    groupingEnabled: false,
                },
                {
                    title: "amount",
                    name: "amount",
                    columnName: "amount",
                    width: 250,
                    wordWrapEnabled: true,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                {
                    title: "ckposted",
                    name: "ckposted",
                    columnName: "ckposted",
                    width: 130,
                    wordWrapEnabled: true,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                {
                    title: "gl_posted",
                    name: "gl_posted",
                    columnName: 'gl_posted',
                    width: 120,
                    align: 'center',
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: true,
                },
                {
                    title: "comp_gen",
                    name: "comp_gen",
                    columnName: "comp_gen",
                    width: 150,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                {
                    title: "ckdate",
                    name: "ckdate",
                    columnName: "ckdate",
                    width: 150,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                // { title: "Actions", name: "Actions", columnName: "Actions", width: 110, sortingEnabled: true, filteringEnabled: false, }
            ],
            sorting: [
                { columnName: 'CustomerNo', direction: 'asc' }
            ],
            editingColumnExtensions: [
                // {
                // 	columnName: 'firstName',
                // 	createRowChange: (row, value) => ({ user: { ...row.user, firstName: value } }),
                // },
            ],
            dateColumns: ['ckdate'],
            // groupingColumns: [
            // 	{ columnName: 'StateName', groupingEnabled: false },
            // 	{ columnName: 'AccountTypeListName', groupingEnabled: false },
            // 	{ columnName: 'StatusName', groupingEnabled: false },
            // ],
            grouping: [
                // { columnName: 'AccountTypeListName' },
            ],
            pageSize: 20,
            pageSizes: [10, 20, 30, 50, 100],
            amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
            // defaultFilters: [{ columnName: 'StateName', value: 'PA' }],
            searchValue: '',
            // leftColumns: ['CustomerNo', 'CustomerName'],
            // rightColumns: ['Amount'],
        };


        this.changeSelection = selection => this.setState({ selection });
        this.changeSorting = sorting => this.setState({ sorting });
        this.commitChanges = this.commitChanges.bind(this);
        // this.changeCurrentPage = currentPage => this.setState({ currentPage });
        // this.changePageSize = pageSize => this.setState({ pageSize });
        this.changeSearchValue = value => this.setState({ searchValue: value });
        this.changeGrouping = grouping => this.setState({ grouping });
    }
    //
    // to edit table cell
    //
    commitChanges({ added, changed, deleted }) {
        console.log("commitChanges");
        let { rows } = this.state;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }

    onChange = (event, { newValue, method }) => {
        console.log("onChange");

        this.setState({
            value: newValue.toString()
        });
    };


    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillReceiveProps(nextProps) {
    } // deprecate

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    search(val) {
        console.log("---------search---------", val);
        val = val.toLowerCase();
        if (val === '') {
            this.setState({ rows: [...this.state.data] });
            return;
        }
        const temp = this.state.data.filter(d => {
            return (d.CustomerNo && d.CustomerNo.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.CustomerName && d.CustomerName.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.Address && d.Address.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.City && d.City.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.StateName && d.StateName.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.PostalCode && d.PostalCode.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.Phone && d.Phone.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.AccountTypeListName && d.AccountTypeListName.toString().toLowerCase().indexOf(val) !== -1) ||
                (d.Amount && d.Amount.toString().toLowerCase().indexOf(val) !== -1)
        });
        this.setState({ rows: [...temp] });
    }

    componentDidMount() {
        fetch(`https://apifmsplusplus_mongo.jkdev.com/v1/2/Payment/Ckbook/List`)
            .then(response => response.json())
            .then(data => this.setState({ rows: data.Data }));
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    removeCustomers = () => {
        if (this.state.selection.length === 0) {
            alert("Please choose customer(s) to delete");
            return;
        }
        if (window.confirm("Do you really want to remove the selected customer(s)")) {
            this.props.deleteCustomersAction(this.state.selection, this.props.customers);
            this.setState({ selection: [], selectAll: false })
        }
    };

    fetchData(state, instance) {
        console.log("fetchData");

        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    initRowsFromRawJson = (rawData = this.props.customers, locationFilterValue = this.props.locationFilterValue) => {
        console.log("initRowsFromRawJson", "CustomerListContent.js", this.props.regionId, this.props.statusId, rawData)
        let all_temp = [];
        if (rawData === null || rawData === undefined || rawData.Data === undefined) return;

        let regions = rawData.Data.Regions.filter(x => {
            return this.props.regionId === 0 || x.Id === this.props.regionId;
        });


        console.log("regions", regions)

        regions.forEach(x => {
            all_temp = [...all_temp, ...x.CustomerList];
        });

        let _pins_temp = [];
        regions.forEach(x => {
            _pins_temp = [..._pins_temp, ...x.CustomerList.map(customer => {
                return {
                    lat: customer.Latitude,
                    lng: customer.Longitude,
                    text: customer.CustomerName
                }
            })];

        })

        this.filterPins(_pins_temp, locationFilterValue)

        this.setState({
            rows: all_temp,
            data: all_temp,
            // pins: _pins_temp,
        });

    };


    //
    // row click
    //
    TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {
        let timer = 0;
        let delay = 200;
        let prevent = false;
        delete restProps.selectByRowClick;
        const handleClick = () => {
            timer = setTimeout(() => {
                if (!prevent) {
                    onToggle();
                }
                prevent = false;
            }, delay);
        };
        return (
            <Table.Row
                {...restProps}
                className={selected ? 'active' : ''}
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={handleClick}
            />
        );
    };

    render() {
        console.log('rows=', this.state.rows);

        const {
            rows,
            columns,
            selection,
            tableColumnExtensions,
            sorting,
            editingColumnExtensions,
            currencyColumns,
            phoneNumberColumns,
            pageSize,
            pageSizes,
            amountFilterOperations,
            // groupingColumns,
            // booleanColumns,
            searchValue,
            grouping,
            // leftColumns,
            // rightColumns,
            atRiskColumns,
        } = this.state;
        return (
            <Fragment>
                <div className={classNames("flex flex-col")}>
                    <Grid
                        rows={rows}
                        columns={tableColumnExtensions}
                    >
                        <DragDropProvider />
                        <PagingState
                            defaultCurrentPage={0}
                            defaultPageSize={20}
                        />

                        <PagingPanel pageSizes={pageSizes} />

                        <SelectionState
                            selection={selection}
                            onSelectionChange={this.changeSelection}
                        />
                        {/* The Select All checkbox selects/deselects all rows on a page or all pages depending on the IntegratedSelection and IntegratedPaging plugin’s order. */}
                        <IntegratedSelection />

                        <SortingState
                            sorting={sorting}
                            onSortingChange={this.changeSorting}
                            columnExtensions={tableColumnExtensions}
                        />
                        <IntegratedSorting />

                        <IntegratedPaging />


                        <VirtualTable height="auto" rowComponent={this.TableRow} />
                        <TableColumnResizing defaultColumnWidths={tableColumnExtensions} />
                        <TableSelection showSelectAll highlightRow rowComponent={this.TableRow} />

                        <TableHeaderRow showSortingControls />

                        <Template
                            name="tableRow"
                            predicate={({ tableRow }) => tableRow.type === 'data'}
                        >
                            {params => (
                                <TemplateConnector>
                                    {({ selection }, { toggleSelection }) => (
                                        <this.TableRow
                                            {...params}
                                            selected={selection.findIndex((i) => i === params.tableRow.rowId) > -1}
                                            onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                                        />
                                    )}
                                </TemplateConnector>
                            )}
                        </Template>

                        <CustomizedDxGridSelectionPanel selection={selection} rows={rows} />

                    </Grid>
                </div>
            </Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleFilterPanel: Actions.toggleFilterPanel,
        toggleMapView: Actions.toggleMapView,
        toggleSummaryPanel: Actions.toggleSummaryPanel,
        deleteCustomersAction: Actions.deleteCustomers,
        removeCustomerAction: Actions.removeCustomer,
        openEditCustomerForm: Actions.openEditCustomerForm,
        closeEditCustomerForm: Actions.closeEditCustomerForm,

        openNewCustomerForm: Actions.openNewCustomerForm,

        getCustomer: Actions.getCustomer,
    }, dispatch);
}

function mapStateToProps({ customers, auth }) {
    return {
        customers: customers.customersDB,
        bLoadedCustomers: customers.bLoadedCustomers,
        transactionStatus: customers.transactionStatus,
        filterState: customers.bOpenedFilterPanel,
        summaryState: customers.bOpenedSummaryPanel,
        regionId: auth.login.defaultRegionId,
        CustomerForm: customers.CustomerForm,
        mapViewState: customers.bOpenedMapView,
        locationFilterValue: customers.locationFilterValue,
        searchText: customers.searchText,
        bCustomerFetchStart: customers.bCustomerFetchStart,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckbookList)));

