import React, {Component} from 'react';

// core components
import {Hidden, Icon, IconButton, Fab, Input, Paper,TextField} from '@material-ui/core';
import {withStyles, Checkbox} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// theme components
import {FusePageCustom, FuseAnimate,FuseSearch} from '@fuse';

// for store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';


// third party
import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';


const headerHeight = 100;

const hexToRgb = (hex) =>{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const styles = theme => ({
    layoutRoot: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
        },
        '& .-pageSizeOptions': {
            display: 'none'
        },
        '& .ReactTable .rt-noData': {
            top: '180px',
            border: '1px solid coral'
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
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        }
    },
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
});

class BillRun extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        selection: [],
        selectAll: false,
        regionId: 0
    };

    constructor(props){
        super(props);

        if(!props.bLoadedBillruns) {
            props.getBillruns();
        }
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    render()
    {
        const {classes} = this.props;
        const { selectAll, selection } = this.state;
        return (
            <FusePageCustom
                classes={{
                    root: classes.layoutRoot,
                    header: classes.layoutHeader
                }}
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="flex items-center pr-0 lg:pr-12 p-24">
                                <Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>
                                    <Input
                                        placeholder="Search..."
                                        className={classNames(classes.search, 'pl-16')}
                                        // className="pl-16"
                                        disableUnderline
                                        fullWidth
                                        value={this.state.s}
                                        onChange={this.handleChange('s')}
                                        inputProps={{
                                            'aria-label': 'Search'
                                        }}
                                    />
                                    <Icon color="action" className="mr-16">search</Icon>
                                </Paper>
                            </div>
                        </div>
                        <div className="flex flex-none items-end">
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => alert('ok')}>
                                    <Icon>add</Icon>
                                </Fab>
                            </FuseAnimate>
                            { selection.length>0 && (
                                <FuseAnimate animation="transition.expandIn" delay={600}>
                                    <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeInvoices()}>
                                        <Icon>delete</Icon>
                                    </Fab>
                                </FuseAnimate>
                            )}
                        </div>
                    </div>
                }
                content={
                    <div className="flex-1 flex-col">
                        {this.state.temp && (
                            <ReactTable
                                data={this.state.temp}
                                minRows = {0}
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
                                            fontWeight: 700
                                        },
                                        className: classNames("flex items-center justify-start")
                                    }
                                }}
                                getTheadThProps={(state, rowInfo, column, instance) =>{
                                    let thClass='';
                                    if (column.id==='InvoiceNo' ||column.id==='CustomerNo'||column.id==='InvoiceBalanceAmount'||
                                        column.id==='InvoiceDate' || column.id==='TransactionStatus') thClass = classNames(classes.tableThEven);
                                    return {
                                        style:{
                                            fontSize: 12,
                                            padding: "0",
                                        },
                                        className: thClass
                                    }
                                }}
                                getTheadProps={(state, rowInfo, column, instance) =>{
                                    return {
                                        style:{
                                            fontSize: 13,
                                        },
                                        className: classes.tableTheadEven
                                    }
                                }}
                                getTdProps={(state, rowInfo, column, instance) =>{
                                    let tdClass='flex items-center justify-center';
                                    if (column.id==='InvoiceNo' ||column.id==='CustomerNo'||column.id==='InvoiceBalanceAmount'||
                                        column.id==='InvoiceDate' || column.id==='TransactionStatus') tdClass = classNames(classes.tableTdEven, "flex items-center  justify-center");

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
                                                alert('ok');
                                                // openEditContactDialog(rowInfo.original);
                                            }
                                        }
                                    }
                                }}
                                columns={[
                                    {
                                        Header: "Accounts Receivable>Invoices",
                                        columns: [
                                            {
                                                Header: "Bill Run Batch #",
                                                accessor: "Id",
                                                filterAll: true,
                                                width: 120,
                                                className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                            },
                                            {
                                                Header: "Message",
                                                accessor: "Message",
                                                width: 360,
                                                className: classNames("flex items-center  justify-start p-12-impor")
                                            },
                                            {
                                                Header: "Invoice Date",
                                                id: "InvoiceDate",
                                                accessor: d => moment(d.InvoiceDate).format('MM/DD/YYYY'),
                                                width: 110,
                                                className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                            },
                                            {
                                                Header: "Status",
                                                accessor: "TransactionStatus",
                                                width: 110,
                                                className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                            },
                                            {
                                                Header: "Actions",
                                                width : 128,
                                                Cell  : row => (
                                                    <div className="flex items-center actions">
                                                        <IconButton
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                                if (window.confirm("Do you really want to remove this invoice")) {
                                                                    this.props.removeInvoiceAction(row.original.InvoiceId, this.props.invoices);
                                                                    if(this.state.selection.length>0){
                                                                        _.remove(this.state.selection, function(id) {
                                                                            return id === row.original.InvoiceId;
                                                                        });
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <Icon>delete</Icon>
                                                        </IconButton>,
                                                        <IconButton
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                                // removeContact(row.original.id);
                                                            }}
                                                        >
                                                            <Icon>edit</Icon>
                                                        </IconButton>
                                                    </div>
                                                )
                                            }
                                        ]
                                    }
                                ]}
                                defaultPageSize={100}
                                className={classNames( "-striped -highlight")}
                                style={{
                                    height: 650,
                                }}
                            />
                        )}
                    </div>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            >
            </FusePageCustom>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getBillruns: Actions.getBillruns,
    }, dispatch);
}

function mapStateToProps({billrun, auth})
{
    return {
        billruns: billrun.billrunsDB,
        bLoadedBillruns: billrun.bLoadedBillruns,
        regionId: auth.login.defaultRegionId
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillRun)));
