import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

//Material UI Core
import { IconButton, Input, Icon } from '@material-ui/core';
import { withStyles} from "@material-ui/core";

//Store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

//third party
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import moment from 'moment';

//DevExtreme React-Grid
import {
    Template, TemplateConnector
} from '@devexpress/dx-react-core';
import {
    SelectionState, PagingState, IntegratedPaging, IntegratedSelection, SortingState, IntegratedSorting, EditingState,
    DataTypeProvider, FilteringState, IntegratedFiltering, SearchState,
    IntegratedGrouping,
    GroupingState, TableColumnVisibility
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
    TableFilterRow,
    DragDropProvider,
    TableGroupRow
} from '@devexpress/dx-react-grid-material-ui';

import { CustomizedDxGridSelectionPanel } from "./CustomizedDxGridSelectionPanel";


import * as PropTypes from 'prop-types';

//Child components
import VerificationSearchBar from './VerificationSearchBar';

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
        backgroundColor: theme.palette.primary.main,
        '& tr': {
            height: 48
        },
        '& tr th': {
            color: 'white'
        },
        '& tr th:nth-child(5)': {
            width: '100%'
        },
        '& svg': {
            // color: theme.palette.text.primary,
            color: 'white',
        }
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
        '& tbody tr td:nth-child(5)': {
            width: '100%'
        },
        '& colgroup col:nth-child(5)':{
            width: '100%'
        }
    },
    iconButton: {
        padding: 0,
        marginRight: 10
    }
});

/** table content rows style
 *
 * @param classes
 * @param restProps
 * @returns {*}
 * @constructor
 */
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

export const TableHeadComponent = withStyles(styles, { name: 'TableHeadComponent' })(TableHeadComponentBase);
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);

//
// table cell currency formatter
//
const CurrencyFormatter = ({value}) => (
    <NumberFormat value={value}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator
                  decimalScale={2}
                  prefix="$" renderText={value => <span>{value}</span>}/>
);

const CurrencyTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
);


//
// amount filter editor component
//
const AmountEditorBase = ({ value, onValueChange, classes }) => {
    const handleChange = (event) => {
        const { value: targetValue } = event.target;
        if (targetValue.trim() === '') {
            onValueChange();
            return;
        }
        onValueChange(parseFloat(targetValue));
    };
    return (
        <Input
            type="number"
            classes={{
                input: classes.numericInput,
            }}
            fullWidth
            value={value === undefined ? '' : value}
            inputProps={{
                min: 0,
                placeholder: 'Filter...',
            }}
            onChange={handleChange}
        />
    );
};
AmountEditorBase.propTypes = {
    value: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};
AmountEditorBase.defaultProps = { value: undefined, };


class VerificationTransactionListContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            s: '',
            temp: [],
            data: [],
            selectAll: false,
            selection: [...this.props.aTransactionSelections],
            //rows: [],
            sorting: [
                { columnName: 'Franchisee', direction: 'asc' }
            ],
            editingColumnExtensions: [

            ],
            currencyColumns: [
                'ExtendedPrice', 'TotalTrxAmount', 'Tax'
            ],
            phoneNumberColumns: [
                'Phone'
            ],
            dateColumns: ['saleDate'],
            grouping: [
                // { columnName: 'AccountTypeListName' },
            ],
            pageSize: 100,
            pageSizes: [10, 20, 30, 50, 100],
            amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
            searchValue: '',
        };

        this.changeSelection = selection =>{
            this.setState({ selection });
            this.props.updateSelectedRowsLength(selection);
        };

        this.changeSorting = sorting => this.setState({ sorting });
        this.changeSearchValue = value => this.setState({ searchValue: value });
        this.changeGrouping = grouping => this.setState({ grouping });
    }


    onChange = (event, { newValue, method }) => {

        this.setState({
            value: newValue.toString()
        });
    };

    search(val) {
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
        if(this.props.verifications!==null) {
            this.processData();
        }
    }

    processData = ()=> {
        if(this.props.verifications!==null) {
            let temp = [...this.props.verifications.Data.FranTransactions];
            temp.forEach(x => {
                x.Franchisee = `${x.FranchiseeName} - ${x.FranchiseeNo}`
            });

            let expandedGroups = [...new Set(temp.map(d => d.Franchisee))];
            this.setState({data: temp});
            this.setState({expandedGroups: expandedGroups});
        }
    };


    componentWillMount() {
        this.timer = null;
    }
    componentWillUnmount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.verifications!==null && (this.props.verifications !== prevProps.verifications))
            this.processData()
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    getCell = (props) => {
        const { classes }= this.props;

        if(this.state.data.length) {
            if (props.column.name.includes('Action')) {
                let thisCol = this.state.data.filter(d => {
                    if (d.name === props.column.name) {
                        return d;
                    }
                    return false;
                });
                return (
                    <Table.Cell style={{textAlign: 'center'}}>
                        <IconButton className={classes.iconButton} onClick={this.openVerificationDialog} aria-label="Verify">
                            <Icon>verified_user</Icon>
                        </IconButton>
                        <IconButton className={classes.iconButton} onClick={this.openRejectDialog} aria-label="Reject">
                            <Icon>close</Icon>
                        </IconButton>
                        <IconButton className={classes.iconButton} onClick={this.openReviseDialog} aria-label="Request Changes">
                            <Icon>rotate_90_degrees_ccw</Icon>
                        </IconButton>
                    </Table.Cell>
                )
            }
        }

        return <Table.Cell {...props} />;

    };

    TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {
        let timer = 0;
        let delay = 200;
        let prevent = false;
        delete restProps.selectByRowClick
        const handleClick = () => {
            timer = setTimeout(() => {
                if (!prevent) {
                    onToggle();
                }
                prevent = false;
            }, delay);
        };
        const handleDoubleClick = () => {
            clearTimeout(timer);
            prevent = true;
            console.log(restProps);
        };

        return (
            <Table.Row
                {...restProps}
                className={selected ? 'active' : ''}
                style={{ color: 'green', cursor: 'pointer' }}
                //onClick={handleClick}
                onDoubleClick={handleDoubleClick}
            />
        );
    };

    openVerificationDialog = () => {
        this.props.openVerificationDialog(true);
    };
    openReviseDialog = () => {
        this.props.openCloseReviseDialog(true);
    };
    openRejectDialog = () => {
        this.props.openCloseRejectDialog(true);
    };

    expandedGroupsChange = (expandedGroups) => {
        this.setState({expandedGroups: expandedGroups});
    };

    emptyMessageContent = ({column, row}) => (
        <span>
            <strong>{row.value}</strong>
		</span>
    );

    GroupCellContent = ({column, row}) => (
        <span>
            <strong>{row.value}</strong>
		</span>
    );

    render() {
        const { classes } = this.props;

        const {
            selection,
            sorting,
            currencyColumns,
            pageSizes,
            searchValue,
        } = this.state;

        let data = this.state.data.map(d=>{
            let type = this.props.transactionTypeList.filter(t=>t._id===d.TrxType);
            if(type.length>0)
                d.Type = type[0].Name;
            // d.Type = d.TrxType;
            d.TrxDate = moment(d.TrxDate).format('MM/DD/YYYY');
            return d;
        });
        let  columns= [
            { title: "Region",      name: "Region"},
            { title: "Type",        name: "Type"},
            { title: "Description", name: "Description"},
            { title: "Franchisee",  name: "Franchisee"},
            { title: "Sub total",   name: "ExtendedPrice"},
            { title: "Tax",         name: "Tax"},
            { title: "Total",       name: "TotalTrxAmount"},
            { title: "Charge Type", name: "TrxChargeType"},
            { title: "Class",       name: "TrxClass"},
            { title: "Date",        name: "TrxDate"},
            { title: "Action",      name: "Action"}
        ];

        let  tableColumnExtensions = [
            { columnName: "Region", wordWrapEnabled: true, width: 80},
            { columnName: "Type",           width: 220},
            { columnName: "Description",    width: -1 },
            { columnName: "ExtendedPrice",  width: 100, align: 'right'},
            { columnName: "Tax",            width: 100, align: 'right'},
            { columnName: "TotalTrxAmount", width: 100, align: 'right'},
            { columnName: "TrxChargeType",  width: 140,  align: 'center'},
            { columnName: "TrxClass",       width: 100,  align: 'center'},
            { columnName: "TrxDate",        width: 100, align: 'center'},
            { columnName: "Action",         width: 180, align: 'center'}
        ];

        return (
            <Fragment>
                <div className={classNames(classes.layoutTable, "flex flex-col")}>
                    <VerificationSearchBar />
                    <div className={classNames("flex flex-col", classes.layoutTable)} >
                        <Grid
                            rows={data}
                            columns={columns}
                        >
                            <SelectionState
                                selection={selection}
                                onSelectionChange={this.changeSelection}
                            />
                            <PagingState
                                defaultCurrentPage={0}
                                defaultPageSize={100}
                            />

                            <CurrencyTypeProvider
                                for={currencyColumns}
                            />

                            <PagingPanel pageSizes={pageSizes} />
                            <IntegratedSelection />

                            <SortingState
                                sorting={sorting}
                                onSortingChange={this.changeSorting}
                                columnExtensions={tableColumnExtensions}
                            />
                            <GroupingState
                                grouping={[
                                    {columnName: 'Franchisee'},
                                ]}
                                expandedGroups={this.state.expandedGroups}
                                onExpandedGroupsChange={this.expandedGroupsChange}
                            />

                            <IntegratedSorting />

                            <IntegratedPaging />
                            <IntegratedGrouping/>
                            <VirtualTable height="auto"
                                          tableComponent={TableComponent}
                                          headComponent = {TableHeadComponent}
                                          columnExtensions={tableColumnExtensions}
                                          rowComponent={this.TableRow}
                                          cellComponent={this.getCell} />

                            <TableSelection showSelectAll highlightRow rowComponent={this.TableRow} />

                            <TableHeaderRow showSortingControls />
                            <TableGroupRow
                                showColumnsWhenGrouped contentComponent={this.GroupCellContent}
                            />
                            <TableColumnVisibility
                                hiddenColumnNames={['Franchisee']}
                                emptyMessageComponent={this.emptyMessageContent} />
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

                            <CustomizedDxGridSelectionPanel selection={selection} />
                        </Grid>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleFilterPanel: Actions.toggleVerificationFilterPanel,
        toggleSummaryPanel: Actions.toggleVerificationSummaryPanel,
        updateSelectedRowsLength: Actions.updateSelectedRowsLength,
        openCloseReviseDialog: Actions.openCloseReviseDialog,
        openVerificationDialog: Actions.openVerificationDialog,
        openCloseRejectDialog: Actions.openCloseRejectDialog
    }, dispatch);
}

function mapStateToProps({ customers, auth, verifications, transactions }) {
    return {
        verifications: verifications.verificationsDB,
        bLoadedVerifications: verifications.bLoadedVerifications,
        transactionStatus: verifications.transactionStatus,
        filterState: verifications.bOpenedFilterPanel,
        summaryState: verifications.bOpenedSummaryPanel,
        regionId: auth.login.defaultRegionId,
        verificationForm: verifications.verificationForm,
        searchText: verifications.searchText,
        aTransactionSelections: verifications.aTransactionSelections,
        verifiedModal: verifications.verifiedModal,
        reviseModal: verifications.reviseModal,
        rejectModal: verifications.rejectModal,
        transactionTypeList: transactions.transactionTypeList,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(VerificationTransactionListContent)));

