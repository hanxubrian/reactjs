import React, { Component, Fragment } from 'react';
// core components
import { Icon, IconButton, Input, Paper, Button, Zoom } from '@material-ui/core';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';
import { RowDetailState } from '@devexpress/dx-react-grid';
import moment from 'moment/moment';
import {
    Template, TemplateConnector
} from '@devexpress/dx-react-core';

import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    GroupingState,
    IntegratedGrouping,
    IntegratedSorting,
    EditingState,
    DataTypeProvider,
    FilteringState,
    IntegratedFiltering,
    SearchState,
} from '@devexpress/dx-react-grid';


import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableFixedColumns,
    TableSelection,
    GroupingPanel,
    Toolbar,
    TableGroupRow,
    PagingPanel,
    TableRowDetail,
    TableFilterRow,
    DragDropProvider,
    TableColumnResizing,

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


import  SystemNotificationSearchBar from "./SystemNotificationSearchBar";


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
        backgroundColor: theme.palette.primary.main
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
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
const RowDetail = ({ row }) =>{
    let str ="";
    str =`<table>`;
    if(row && row !==null){
        Object.keys(row).forEach(function(key) {
            // console.log("key:" + key + "value:" + item[key]);
            str+=`<tr>`+`<td>`+key+`</td>`+`<td>`+row[key]+`</td>`+`</tr>`
        });
        str+=`</table>`;
        let htmlObject = document.createElement('html');
        htmlObject.innerHTML = str;
        // return htmlObject;
        return(
            <div style={{flexGrow: 1,}}>
                <table style={{width: "100%",}}>
                    <thead>
                    <tr>
                        <th style={{textAlign: "center",}}>Bill Run No</th>
                        <th style={{textAlign: "center",}}>Message</th>
                        <th style={{textAlign: "center",}}>Invoice Description</th>
                        <th style={{textAlign: "center",}}>Period</th>
                        <th style={{textAlign: "center",}}>InvoiceDate</th>
                        <th style={{textAlign: "center",}}>CreatedDate</th>
                        <th style={{textAlign: "center",}}>CreateBy</th>
                        <th style={{textAlign: "center",}}>Invoice Count</th>
                        <th style={{textAlign: "center",}}>Billing</th>
                        <th style={{textAlign: "center",}}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "center",}}>{row.BillRunNo}</td>
                        <td style={{textAlign: "center",}}>{row.Message}</td>
                        <td style={{textAlign: "center",}}>{row.InvoiceDescription}</td>
                        <td style={{textAlign: "center",}}>{row.Month.toString().padStart(2,"0")}/{row.Year}</td>
                        <td style={{textAlign: "center",}}>{row.cusinvoicedate}</td>
                        <td style={{textAlign: "center",}}>{row.cuscreatedate}</td>
                        <td style={{textAlign: "center",}}>{row.CreateBy}</td>
                        <td style={{textAlign: "center",}}>{row.InvCount}</td>
                        <td style={{textAlign: "center",}}>{row.Billing}</td>
                        <td style={{textAlign: "center",}}>{row.Status}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }
    else{
        return (<div/>);
    }
}



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




class SystemNotificationContentList extends Component {

    constructor(props) {
        super(props);
        this.props.getallsystemnotification();
        this.state = {
            columns                             : [
                { name: 'process', title: 'Process' },
                { name: 'Message', title: 'Message' },
                { name: 'description', title: 'description' },
                { name: 'cuscreatedate', title: 'Created Date' },

            ],
            rows                                : [],
            tableColumnExtensions               : [
                { columnName: 'process', width: 100 },
                // { columnName: 'Message', width: 300 },
                // { columnName: 'description', width: 100 },
                { columnName: 'cuscreatedate', width: 100 },

            ],
            pageSizes                           : [5,10, 20, 30, 50, 100],
            pageSize                            : 5,
            sorting                             : [
                { columnName: 'process', direction: 'asc' },
            ],
            groupingColumns                     : [
                // { columnName: 'CustomerName' },
                // { columnName: 'CustomerNo' },
                { columnName: 'process' },

            ],
            searchValue                         : '',
            expandedGroups                      : ['process'],
            // leftColumns: ['region', 'sector'],
            // rightColumns: ['amount'],
            NotificationData                    :[],
            id                                  : null,
            ExpandedRowIds                      : null,
        };
    };
    TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {

        let timer = 0;
        let delay = 200;
        let prevent = false;
        delete restProps.selectByRowClick;
        const handleClick = () => {
            timer = setTimeout(() => {
                if (!prevent) {
                    // onToggle();
                }
                prevent = false;
            }, delay);
        };
        const handleDoubleClick = () => {
            clearTimeout(timer);
            prevent = true;
        }
        return (
            <Table.Row
                {...restProps}
                className={selected ? 'active' : ''}
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
            />
        );
    };
    componentWillMount(){
        console.log('this.props.match.params=', this.props.match.params);
        this.setState({id: this.props.match.params.id});

    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.sysnotification !==null && this.props.sysnotification !== prevProps.sysnotification){
            this.fetchData();
        }

    }
    fetchData=()=>{
        let sysnotification = this.props.sysnotification;
        let payload = sysnotification.processResponsePayload;
        let midROW = [];
        let sum = 0;
        if(sysnotification && sysnotification !==null){
            sysnotification.map((item)=>{

                let addprocess =[];
                addprocess =JSON.parse(item.processResponsePayload);
                addprocess.process=item.process;
                addprocess.description=item.description;
                addprocess.cuscreatedate =moment(item.CreateDate).format("MM/DD/YYYY");
                addprocess.cusinvoicedate = moment(item.InvoiceDate).format("MM/DD/YYYY");
                addprocess._id = item._id;
                if(this.state.id && this.state.id !== null && item._id===this.state.id && this.state.ExpandedRowIds === null && sum>=0){
                    this.setState({ExpandedRowIds:sum});
                    console.log("ExpandedRowIds",sum);
                    sum =-1;
                }
                if(sum>=0)
                    sum ++;
                midROW.push(addprocess);
            });
            if(sum>0){
                this.setState({ExpandedRowIds:-100});
            }

        }
        this.setState({NotificationData:midROW});
        if(this.state.rows && this.state.rows !== null && JSON.stringify(this.state.rows) !== JSON.stringify(midROW)){
            this.setState({rows: midROW});
        }

    }
    expandedGroupsChange = (expandedGroups) => {
        this.setState({ expandedGroups });
    };

    GroupCellContent = ({ column, row }) => (
        <span>
            <strong>{row.value}</strong>
		</span>
    );
    render(){
        const { classes } = this.props;
            const {
                rows, columns, tableColumnExtensions,pageSizes,sorting,searchValue,groupingColumns,expandedGroups,
            } = this.state;
            let checkstatus = true;
            let expandedId = null;
            console.log("row",rows);
            if(this.props.match.params && this.props.match.params !==null && this.props.match.params.id && this.props.match.params.id !==null){
                if(this.state.ExpandedRowIds >=0 && this.state.ExpandedRowIds !== null)
                    checkstatus = true;
                else{
                    checkstatus = false;
                }
            }
            if(this.state.ExpandedRowIds === -100){
                checkstatus=true;
            }
            if(this.state.ExpandedRowIds >=0 ){
                expandedId =this.state.ExpandedRowIds;
            }
            if(rows && rows !==null)
            return(
                <Fragment>

                    <div className={classNames(classes.layoutTable, "cust222 flex flex-col")}>
                        <SystemNotificationSearchBar/>
                        <div className={classNames("flex flex-col")}
                             style={{height:'600px'}}
                        >
                        <Grid
                        rows={rows}
                        columns={columns}
                        >
                            <PagingState
                                defaultCurrentPage={0}
                                defaultPageSize={5}
                            />
                            <IntegratedPaging />
                            <SortingState
                                defaultSorting={[{ columnName: 'process', direction: 'asc' }]}
                            />

                                <RowDetailState
                                    defaultExpandedRowIds={[expandedId]}
                                />


                            <IntegratedSorting />
                            <VirtualTable height='auto'
                            noDataCellComponent={
                            ({ colSpan }) => (
                            <td colSpan={colSpan} style={{ textAlign: 'center' }}>
                            <big className="TableNoDataCell">{this.props.NoDataString}</big>
                            </td>
                            )
                            }
                            columnExtensions={tableColumnExtensions}
                            />
                            <TableHeaderRow showSortingControls />
                            <TableRowDetail
                                contentComponent={RowDetail}
                            />
                            <PagingPanel
                                pageSizes={pageSizes}
                            />
                    </Grid>
                        </div>
                    </div>
                </Fragment>
                );
            else{
                return(<div/>)
            }
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

//
        getallsystemnotification    : Actions.getallsystemnotification,
    }, dispatch);
}

function mapStateToProps({ accountReceivablePayments, auth,notification }) {
    return {

//
        sysnotification     : notification.systnotification,
        sysstatus           : notification.status,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(SystemNotificationContentList)));

