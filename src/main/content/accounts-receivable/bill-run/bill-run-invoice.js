import React, {Component} from 'react';

//store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

//UI material,moment
import {Icon, IconButton,Button, TextField, Fab,ClickAwayListener, Input, Paper,Card, Typography,CircularProgress,MenuItem,InputLabel ,OutlinedInput , FormControl, Select} from '@material-ui/core';
import moment from "moment/moment";

import JanikingPagination from 'Commons/JanikingPagination';
import {FuseShortcuts, FuseAnimate, FuseSearch} from '@fuse';
//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';

import ReactTable from "react-table";
import {withStyles} from '@material-ui/core/styles';

import {FusePageSimple, DemoContent} from '@fuse';
import PropTypes from 'prop-types';
import "react-table/react-table.css";
import MomentUtils from "@date-io/moment/build/index";

//Table
import classNames from 'classnames';
import {withRouter} from "react-router-dom";
import {NumberFormatCustom1} from "../../../../services/utils";



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
        '& .openFilter':{
            width: 'inherit'
        },
        '& .openSummary':{
            width: 300
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group':{
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
            width:'inherit!important',
            minWidth:'inherit!important',
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-start'
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
    content:{
        position: 'relative'
    },
    search: {
        // width: 360,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        minWidth:360,
    },
    sideButton          : {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    tableTheadRow:{
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main,
        padding: 12
    },
    topbtncus:{
        marginRight: 100,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: -100,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});
class BillRunInvoiceDetail extends Component {

    state = {
        invoices            : [],
        RegionId            : null,
        BillRunNo           : null,
        open                : false,
    };
    constructor(props){
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.invoices !== prevProps.invoices && this.props.invoices !== null){
            this.setState({invoices:this.props.invoices});
        }
    }
    componentDidMount(){
        this.props.onRef(this);
    }
    componentWillUnmount(){
        this.props.onRef(undefined);
    }
    getInfofromParent=(row)=>{
        console.log("row",row);
        if(row && row !== null){
            this.setState({
                RegionId        : row.RegionId,
                BillRunNo       : row.BillRunNo,
            })
            console.log("row.RegionId", row.RegionId);
            console.log("row.BiLLRunNo",row.BillRunNo);
            if(row.RegionId && row.RegionId !== null && row.BillRunNo && row.BillRunNo !== null){
                this.getInvoiceDetailList(row.RegionId,row.BillRunNo);
            }
        }
    }
    getInvoiceDetailList=(RegionId,BillRunNo)=>{
        if(RegionId && RegionId != null && BillRunNo && BillRunNo != null){
            this.props.getinvoicedetailfrombillrun(RegionId,BillRunNo);
        }
    }
    closeDialog=()=>{
        // if(this.state.flag){
        //     this.setState({open: !this.state.open});
        //     this.setState({flag: !this.state.flag});
        // }
        this.props.Closedetail();
    }
    render()
    {
        const { classes,loading ,open,billruninvoiceDetailStatus} = this.props;
        const { invoices }        = this.state;
        if (this.props.open  && invoices && invoices !== null && open && !loading &&  billruninvoiceDetailStatus){
            return (

                <div className={classes.overlay} style={{
                    position: 'absolute',
                    top: -110,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 99999,
                    height: 'fit-content',
                    width: "100%",
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 50

                }}>
                    {loading && !1 && (
                        <CircularProgress className={classes.progress} color="secondary"  />
                    )}
                    { !loading &&  billruninvoiceDetailStatus && (
                    <ClickAwayListener onClickAway={this.closeDialog}>
                    <div
                        // animation="transition.expandIn"
                        // duration={400}
                        // delay={0}
                        // style={{marginLeft:100,}}
                    >
                        <Paper >
                            <div className={classNames(classes.tableWrapper, "flex flex-col h-full")} style={{

                            }}>
                                <ReactTable
                                    className={classNames(classes.root, "-striped -highlight border-0")}

                                    getTheadThProps={(state, rowInfo, column, instance) =>{
                                        let border = '1px solid rgba(255,255,255,.6)';
                                        if(column.Header==='Action') border = 'none';

                                        return {
                                            style:{
                                                fontSize: 13,
                                                fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
                                                fontWeight: 400,
                                                lineHeight: 2.0,
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
                                    getTrProps={(state, rowInfo, column) => {
                                        return {
                                            className: "cursor-pointer",
                                            onClick  : (e, handleOriginal) => {
                                                if ( rowInfo )
                                                {
                                                    // openEditContactDialog(rowInfo.original);
                                                }
                                            }
                                        }
                                    }}
                                    getTdProps={() => ({
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }
                                    })}
                                    data={invoices}
                                    columns={[
                                        {
                                            Header    : "Invoice #",
                                            accessor  : "Inv_no",
                                            // filterable: true,
                                            width     : 100,
                                            className : "font-bold"
                                        },
                                        {
                                            Header    : "Description",
                                            accessor  : "Description",
                                            // filterable: true,
                                            width     : 550,
                                            className : "font-bold"
                                        },
                                        {
                                            Header    : "Invoice Date",
                                            // accessor  : "InvoiceDate",
                                            id        : "InvoiceDate",
                                            accessor: d => moment(d.InvoiceDate).format('MM/DD/YYYY'),
                                            width     : 200,
                                            // filterable: true
                                        },
                                        {
                                            Header    : "Due Date",
                                            id        : "DueDate",
                                            accessor: d => moment(d.DueDate).format('MM/DD/YYYY'),
                                            width     : 200,
                                            // filterable: true
                                        },
                                        {
                                            Header    : "Amount",
                                            accessor  : "GrandTotal",
                                            Cell     : row => {
                                                return '$'+parseFloat(row.original.GrandTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                            },
                                            width     : 150,
                                            textAlign: 'right'
                                            // filterable: true
                                        },

                                        {
                                            Header: "Action",
                                            width : 128,
                                            Cell  : row => (
                                                <div className="flex items-center">
                                                    <IconButton
                                                        onClick={(ev) => {
                                                            ev.stopPropagation();
                                                            // toggleStarredContact(row.original.id)
                                                        }}
                                                    >
                                                        {/*{user.starred && user.starred.includes(row.original.id) ? (*/}
                                                            {/*<Icon>star</Icon>*/}
                                                        {/*) : (*/}
                                                            {/*<Icon>star_border</Icon>*/}
                                                        {/*)}*/}
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={(ev) => {
                                                            ev.stopPropagation();

                                                        }}
                                                    >
                                                        <Icon>delete</Icon>
                                                    </IconButton>
                                                </div>
                                            )
                                        }
                                    ]}
                                    defaultPageSize={10}
                                    noDataText="No Invoice found"
                                />

                            </div>
                        </Paper>
                    </div>
                        </ClickAwayListener>
                    )}
                    {!loading && !billruninvoiceDetailStatus &&(
                        this.closeDialog()
                    )}
                </div>
            )
        }
        else{
            return null;
        }

    }
}

BillRunInvoiceDetail.propTypes = {

    open            : PropTypes.bool,
    Closedetail     : PropTypes.func,
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getBillruns                             : Actions.getBillruns,
        getAllBillruns                          : Actions.getAllBillruns,
        getinvoicedetailfrombillrun             : Actions.getinvoicedetailfrombillrun,
        deleteSeletedBillRun                    : Actions.deleteSeletedBillRun,
        openDialog                              : Actions.openDialog,
        closeDialog                             : Actions.closeDialog,

    }, dispatch);
}

function mapStateToProps({billruns, auth})
{
    return {
        billruns                    : billruns.billrunsDB,
        invoices                    : billruns.billruninvoiceDetail,
        bLoadedBillruns             : billruns.bLoadedBillruns,
        regionId                    : auth.login.defaultRegionId,
        loading                     : billruns.billruninvoiceDetailStatus,
        auth                        : auth.login,
        billruninvoiceDetailStatus  : billruns.billruninvoiceDetailStatusF,
    }
}
// export default withStyles(styles, {withTheme: true})(BillRunInvoiceDetail);
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillRunInvoiceDetail)));