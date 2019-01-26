import React, {Component} from 'react';

// core components
import {
    Hidden, Icon, IconButton, Input, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';


import {withStyles, Checkbox} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import ReactTable from "react-table";
import "react-table/react-table.css";
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

const hexToRgb = (hex) =>{
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
        '& .openFilter':{
            width: 'inherit'
        },
        '& .openSummary':{
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
            display: 'none'
        },
        '& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
            background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
            color: 'white!important'
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group':{
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead.-header':{
            flex: '0 0 auto',
            overflowY: 'scroll'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
            width:'inherit!important',
            minWidth:'inherit!important',
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
    },
    content:{
        position: 'relative'
    },
    tableTheadRow:{
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main
    },
    tableThEven:{
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .3)'
    },
    tableTdEven:{
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
    },
    imageIcon: {
        width: 24
    }
});

class TransactionsLists extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        selection: [],
        selectAll: false,
        selectedInvoice: null,
        alertOpen: false,
        keyToBeRemoved: -1
    };

    onChange = (event, { newValue, method }) => {
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
        this.setState({ selection });
    };

    isSelected = key => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
        return this.state.selection.includes(key);
    };

    constructor(props){
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.data!==prevProps.data)
            this.setState({data: this.props.data});
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillMount(){
        this.setState({data: this.props.data})
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({s: ''});
            this.setState({data: this.props.data})
        }
    }

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    handleClose = ()=>{
        this.setState({alertOpen: false})
    };

    handleOpen = (key)=>{
        this.setState({alertOpen: true});
        this.setState({keyToBeRemoved: key})
    };

    removeSelectedTransaction = ()=>{
        this.props.removeTransaction(this.props.regionId, this.state.keyToBeRemoved);
        this.setState({alertOpen: false})
    };
    render()
    {
        const { classes} = this.props;
        const { toggleSelection, isSelected} = this;

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
                <ReactTable
                    data={this.state.data}
                    minRows = {0}
                    PaginationComponent={JanikingPagination}
                    onFetchData={this.fetchData}
                    getTheadGroupProps={(state, rowInfo, column, instance) =>{
                        return {
                            style:{
                                padding: "10px 10px",
                                fontSize: 16,
                                fontWeight: 700
                            },
                        }
                    }}
                    getTheadGroupThProps={(state, rowInfo, column, instance) => {
                        return {
                            style:{
                                padding: "10px 10px",
                                fontSize: 18,
                                fontWeight: 700,
                            },
                            className: classNames("flex items-center justify-start")
                        }
                    }}
                    getTheadThProps={(state, rowInfo, column, instance) =>{
                        let border = '1px solid rgba(255,255,255,.6)';
                        if(column.Header==='Actions') border = 'none';

                        return {
                            style:{
                                fontSize: '1.6rem',
                                fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
                                fontWeight: 400,
                                lineHeight: 1.75,
                                color: 'white',
                                borderRight: border
                            },
                        }
                    }}
                    getTheadProps={(state, rowInfo, column, instance) =>{
                        return {
                            style:{
                                fontSize: 13,
                            },
                            className: classes.tableTheadRow
                        }
                    }}
                    getTdProps={(state, rowInfo, column, instance) =>{

                        return {
                            style:{
                                textAlign: 'center',
                                flexDirection: 'row',
                                fontSize: 12,
                                padding: "0",
                            },
                        }
                    }}
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    this.props.openEditTransactionForm(this.props.regionId, rowInfo.original);
                                }
                            }
                        }
                    }}
                    columns={[
                        {
                            columns: [
                                {
                                    Header   : (instance) => (
                                        <div/>
                                    ),
                                    accessor : "",
                                    Cell     : row => {
                                        return (<Checkbox
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                }}
                                                checked={isSelected(row.value.key)}
                                                onChange={() => toggleSelection(row.value.key)}
                                            />
                                        )
                                    },
                                    className: "justify-center",
                                    sortable : false,
                                    width    : 48
                                }
                            ],
                            className: classNames("justify-center")
                        },
                        {
                            columns: [
                                {
                                    Header: "Fran. #",
                                    accessor: "FranchiseeNo",
                                    filterAll: true,
                                    width: 100,
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                },
                                {
                                    Header: "Number",
                                    accessor: "Number",
                                    filterAll: true,
                                    width: 80,
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                },
                                {
                                    Header: "Description",
                                    accessor: "Description",
                                    className: classNames("flex items-center  justify-start p-12-impor")
                                },
                                {
                                    Header: "Name",
                                    accessor: "Name",
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-start"),
                                    width: 180
                                },
                                {
                                    Header: "Ext. Price",
                                    accessor: "ExtendedPrice",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.ExtendedPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                    width: 100
                                },
                                {
                                    Header: "Tax",
                                    accessor: "Tax",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.Tax).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                    width: 80
                                },
                                {
                                    Header: "Fees",
                                    accessor: "Fees",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.Fees).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                    width: 80
                                },
                                {
                                    Header: "Total",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.TotalTrxAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    accessor: "TotalTrxAmount",
                                    className: classNames("flex items-center  justify-end p-12-impor"),
                                    width: 120
                                },
                                {
                                    Header: "Trx Date",
                                    accessor: "TrxDate",
                                    Cell     : row => {
                                        return moment(row.TrxDate).format('MM/DD/YYYY');
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                    width: 100
                                },
                                {
                                    Header: "Type",
                                    accessor: "TrxType",
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                    width: 50
                                },
                                {
                                    Header: "Status",
                                    accessor: "Status",
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                    width: 80
                                },
                                {
                                    Header: "Actions",
                                    width : 100,
                                    Cell  : row => (
                                        <div className="flex items-center actions justify-center w-full">
                                            <IconButton
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    this.handleOpen(row.original.Id);
                                                }}
                                            >
                                                <Icon fontSize={"small"}>delete</Icon>
                                            </IconButton>
                                            <IconButton
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    this.props.openEditTransactionForm(this.props.regionId, row.original);
                                                }}
                                            >
                                                <Icon fontSize={"small"}>edit</Icon>
                                            </IconButton>
                                        </div>
                                    )
                                }
                            ]
                        },
                    ]}
                    defaultPageSize={100}
                    className={classNames( "-striped -highlight")}
                    totalRecords = {this.state.data.length}
                    style={{
                        height: '100%',
                    }}
                />
                <Dialog
                    open={this.state.alertOpen}
                    onClose={()=>this.handleClose()}
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
                        <Button onClick={()=>this.handleClose()} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={()=>this.removeSelectedTransaction()} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleFilterPanel: Actions.toggleTransactionFilterPanel,
        removeTransaction: Actions.removeTransaction,
        openEditTransactionForm: Actions.openEditTransactionForm
    }, dispatch);
}

function mapStateToProps({transactions, auth})
{
    return {
        regionId: auth.login.defaultRegionId,
        transactions: transactions.transactionsDB,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsLists)));

