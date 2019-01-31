import React, { Component, Fragment } from 'react';
import { withStyles} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as Actions from './store/actions';
import "react-table/react-table.css";
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
    EditingState,
    DataTypeProvider,
    FilteringState,
    IntegratedFiltering,
    SearchState,
} from '@devexpress/dx-react-grid';

import { CustomizedDxGridSelectionPanel } from "./CustomizedDxGridSelectionPanel";

import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
    TableFilterRow,
    DragDropProvider

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import {connect} from 'react-redux';
import {FuseUtils, FuseAnimate} from '@fuse';
import {
    Icon,
    IconButton,
    MenuItem,
    Button,
    Input
} from '@material-ui/core';
import "../chatPanel/individualChat.css";
import UsersHeader from "./UsersHeader";
import UsersForm from "./UsersForm";





const styles = theme => ({
    mailList: {
        padding: 0
    },
    mailItem: {},
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    },
    labels  : {},
    chatIcon : {
        padding: 8
    },
    individualChat: {
        position: 'fixed',
        bottom: 70,
        right: 360,
        zIndex: 10,
        display: 'flex'
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
    },
    iconButton: {
        padding: 0,
        marginRight: 10
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
//
// table cell currency formatter
//
const CurrencyFormatter = ({ value }) => (<span>$ {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const CurrencyTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
);
//
// table cell phone number formatter
//
const PhoneNumberFormatter = ({ value }) => {
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '+1 ($1) $2 - $3')
};
const PhoneNumberTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={PhoneNumberFormatter}
        {...props}
    />
);
//
// table cell date formatter
//
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
const DateTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={DateFormatter}
        {...props}
    />
);
//
// table cell boolean edit formatter
//
const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;
const BooleanEditor = ({ value, onValueChange }) => (
    <Select
        input={<Input />}
        value={value ? 'Yes' : 'No'}
        onChange={event => onValueChange(event.target.value === 'Yes')}
        style={{ width: '100%' }}
    >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
    </Select>
);
const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
);
//
// filter icon
//
const FilterIcon = ({ type, ...restProps }) => {
    return <TableFilterRow.Icon type={type} {...restProps} />;
};

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
const AmountEditor = withStyles(styles)(AmountEditorBase);
//
// table row edit command buttons
//
const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <Button
            color="primary"
            onClick={onExecute}
            title="Create new row"
        >
            New
        </Button>
    </div>
);

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon />
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Delete row">
        <DeleteIcon />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <CancelIcon />
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};
const GridRootComponent = props => <Grid.Root {...props} style={{ height: '100%' }} />;




class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            s: '',
            temp: [],
            data: [],
            selectAll: false,
            selection: [],
            rows: [],
            tableColumnExtensions: [
                {
                    title: "First Name",
                    name: "firstName",
                    columnName: "firstName",
                    // width: 100,
                    wordWrapEnabled: true,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                {
                    title: "Last Name",
                    name: "lastName",
                    columnName: "lastName",
                    // width: 150,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                {
                    title: "Email",
                    name: "email",
                    columnName: "email",
                    // width: 250,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                },
                {
                    title: "Address",
                    name: "address",
                    columnName: "address",
                    // width: 120,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                }
            ],
            sorting: [
                { columnName: 'CustomerNo', direction: 'asc' }
            ],
            editingColumnExtensions: [

            ],
            currencyColumns: [
                'Amount'
            ],
            phoneNumberColumns: [
                'Phone'
            ],
            dateColumns: ['saleDate'],
            grouping: [
                // { columnName: 'AccountTypeListName' },
            ],
            pageSize: 20,
            pageSizes: [10, 20, 30, 50, 100],
            amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
            searchValue: '',


        };

        this.fetchData = this.fetchData.bind(this);

        this.changeSelection = selection =>{
            this.setState({ selection });
            this.props.updateSelectRows(selection);
            console.log('selectionLength',selection);
        }
        this.changeSorting = sorting => this.setState({ sorting });
        this.commitChanges = this.commitChanges.bind(this);
        this.changeSearchValue = value => this.setState({ searchValue: value });
        this.changeGrouping = grouping => this.setState({ grouping });
        console.log("constructor");
        props.getContacts();
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
        console.log("shouldComponentUpdate", this.state !== nextState);
        return true;
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
        console.log("componentDidMount");
    }


    componentWillMount() {
        //this.timer = null;
        let obj = this.props.contacts;
        this.setState({
            rows: Object.values(obj)
        });
        //console.log("componentWillMount",Object.values(obj));
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }


    handleChange = prop => event => {
        console.log("handleChange");
        this.setState({ [prop]: event.target.value });
    };



    fetchData(state, instance) {
        console.log("fetchData");

        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    generateRows() {
        console.log("generateRows");

        console.log(this.props.data.slice(0, 15));
        return this.props.data;
    }


    getCell = (props) => {

        const { classes }= this.props;

        if(this.state.rows !== undefined) {
            if (props.column.name.includes('Action')) {
                let thisCol = this.state.rows.filter(d => {
                    if (d.name === props.column.name) {
                        return d;
                    }
                    return false;
                });
                return (
                    <Table.Cell>
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

    //
    // row click
    //
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
            //this.props.openEditCustomerForm(this.props.regionId, tableRow.row.CustomerId);
        }
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

    render() {
        const { classes } = this.props;

        const {
            rows,
            selection,
            tableColumnExtensions,
            sorting,
            editingColumnExtensions,
            currencyColumns,
            phoneNumberColumns,
            pageSizes,
            searchValue,
        } = this.state;


        return (
            <Fragment>
                {!this.props.openUsersFormStatus && (
                  <UsersHeader />
                )}
                {!this.props.openUsersFormStatus && (
                    <div className={classNames(classes.layoutTable, "flex flex-col")}>
                        <div className={classNames("flex flex-col", classes.layoutTable)} >
                            <Grid
                                rows={rows}
                                columns={tableColumnExtensions}
                            >
                                <DragDropProvider />
                                <PagingState
                                    defaultCurrentPage={0}
                                    defaultPageSize={10}
                                />

                                <PagingPanel pageSizes={pageSizes} />

                                <SelectionState
                                    selection={selection}
                                    onSelectionChange={this.changeSelection}
                                />
                                <IntegratedSelection />

                                <SortingState
                                    sorting={sorting}
                                    onSortingChange={this.changeSorting}
                                    columnExtensions={tableColumnExtensions}
                                />
                                <IntegratedSorting />

                                <IntegratedPaging />

                                <SearchState
                                    value={searchValue}
                                    onValueChange={this.changeSearchValue}
                                />

                                <FilteringState
                                    defaultFilters={[]}
                                    columnExtensions={tableColumnExtensions}
                                />
                                <IntegratedFiltering />

                                <EditingState
                                    columnExtensions={editingColumnExtensions}
                                    onCommitChanges={this.commitChanges}
                                />

                                <CurrencyTypeProvider
                                    for={currencyColumns}
                                />

                                {/*<PhoneNumberTypeProvider*/}
                                {/*for={phoneNumberColumns}*/}
                                {/*/>*/}
                                <Table rowComponent={this.TableRow} cellComponent={this.getCell} />

                                {/*<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />*/}

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

                                <CustomizedDxGridSelectionPanel selection={selection} />

                            </Grid>
                        </div>
                    </div>
                )}
                {this.props.openUsersFormStatus && (
                    <UsersForm/>
                )}
            </Fragment>
        )
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts             : Actions.getContacts,
        updateSelectRows: Actions.updateSelectRows

    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        contacts                   : usersApp.contacts.entities,
        selectedRows               : usersApp.users.selectedRows,
        openUsersFormStatus  : usersApp.users.openUsersFormStatus,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersList)));
