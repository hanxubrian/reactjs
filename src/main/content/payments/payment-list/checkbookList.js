import React, { Component, Fragment } from 'react';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import classNames from 'classnames';

import {
    Template, TemplateConnector
} from '@devexpress/dx-react-core';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    IntegratedSorting,

} from '@devexpress/dx-react-grid';

import { CustomizedDxGridSelectionPanel } from "./../../common/CustomizedDxGridSelectionPanel";

import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
    DragDropProvider,
    TableColumnResizing,
    VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

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
    search: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    tableTheadRow: {
        backgroundColor: theme.palette.primary.main
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
});

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
            ],
            sorting: [
                { columnName: 'CustomerNo', direction: 'asc' }
            ],
            editingColumnExtensions: [
            ],
            dateColumns: ['ckdate'],
            grouping: [
            ],
            pageSize: 20,
            pageSizes: [10, 20, 30, 50, 100],
            amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],

            searchValue: '',
        };


        this.changeSelection = selection => this.setState({ selection });
        this.changeSorting = sorting => this.setState({ sorting });
        this.changeSearchValue = value => this.setState({ searchValue: value });
        this.changeGrouping = grouping => this.setState({ grouping });
    }

    onChange = (event, { newValue, method }) => {
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
        val = val.toLowerCase();
        if (val === '') {
            this.setState({ rows: [...this.state.data] });
            return;
        }
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
        const {
            rows,
            selection,
            tableColumnExtensions,
            sorting,
            pageSizes,
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
    }, dispatch);
}

function mapStateToProps({ auth }) {
    return {
        regionId: auth.login.defaultRegionId,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckbookList)));

