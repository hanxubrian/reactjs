import React, {Component} from 'react';

//store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

//UI material,moment
import {Icon, IconButton,Button, TextField, Fab,ClickAwayListener, Input, Paper,Card, Typography,CircularProgress,MenuItem,InputLabel ,OutlinedInput , FormControl, Select} from '@material-ui/core';
import moment from "moment/moment";


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



//Table
import classNames from 'classnames';
import {withRouter} from "react-router-dom";




const styles = theme => ({
    layoutRoot: {},
    overlay: {
        position: 'absolute',
        top: -104,
        left: -65,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
});

class BillRunInvoiceDetail extends Component {

    componentDidMount(){
        this.props.onRef(this);
    }
    componentWillUnmount(){
        this.props.onRef(undefined);
    }
    getInfofromParent=(row)=>{
        console.log("row",row);
    }
    render()
    {
        const {classes} = this.props;
        if (this.props.open){
            return (

                <div className={classes.overlay}>
                    <FuseAnimate
                        animation="transition.expandIn"
                        duration={400}
                        delay={400}
                    >
                        <Paper className={classes.cuspaper}>
                            <div className={classNames(classes.tableWrapper, "flex flex-col h-full")}>
                                <ReactTable
                                    data={[]}
                                    minRows = {0}
                                    showPagination ={false}
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
                                    getTdProps={(state, rowInfo, column, instance) =>{

                                    }}
                                    columns={[
                                        {
                                            columns: [
                                                {
                                                    Header: "Invoice #",
                                                    accessor: "billing",
                                                    Cell: row=>{

                                                    },
                                                    width: 200,
                                                    className: classNames(classes.billingSuggestion, "flex items-center justify-center"),
                                                },
                                                {
                                                    Header: "Service",
                                                    accessor: "service",
                                                    Cell: row=>{


                                                    },
                                                    width: 200,
                                                    className: classNames(classes.tableTdEven, "flex items-center"),
                                                },
                                                {
                                                    Header: "Description",
                                                    accessor: "description",
                                                    Cell: row=>{


                                                    },
                                                },
                                                {
                                                    Header: "Qty",
                                                    accessor: "quantity",

                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center text-center"),
                                                    width: 60
                                                },
                                                {
                                                    Header: "Amount",
                                                    accessor: "amount",
                                                    Cell: row=>{



                                                    },
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center text-right"),
                                                    width: 100
                                                },
                                                {
                                                    Header: "Tax",
                                                    accessor: "tax",
                                                    Cell: row=>{

                                                    },
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end text-right"),
                                                    width: 80
                                                },
                                                {
                                                    Header: "Markup(%)",
                                                    accessor: "markup",
                                                    Cell: row=>{

                                                    },
                                                    className: classNames(classes.tableTdEven, "flex items-center  text-right justify-end"),
                                                    width: 80
                                                },
                                                {
                                                    Header: "Ext. Amount",
                                                    accessor: "extended",
                                                    Cell: row=>{

                                                    },
                                                    className: classNames(classes.tableTdEven, "flex items-center  w-full text-center pr-12"),
                                                    width: 100
                                                },
                                                {
                                                    Header: "Action",
                                                    width: 130,
                                                    Cell: row=>{

                                                    }
                                                },
                                            ]
                                        }
                                    ]}
                                    className={classNames( "-striped -highlight")}
                                    defaultPageSize={200}
                                    style={{
                                        height: '100%',
                                    }}
                                />
                            </div>



                        </Paper>
                    </FuseAnimate>

                </div>
            )
        }
        else{
            return null;
        }

    }
}

BillRunInvoiceDetail.propTypes = {

    open: PropTypes.bool,
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getBillruns             : Actions.getBillruns,
        getAllBillruns          : Actions.getAllBillruns,
        deleteSeletedBillRun    : Actions.deleteSeletedBillRun,
        openDialog              : Actions.openDialog,
        closeDialog             : Actions.closeDialog
    }, dispatch);
}

function mapStateToProps({billruns, auth})
{
    return {
        billruns            : billruns.billrunsDB,
        bLoadedBillruns     : billruns.bLoadedBillruns,
        regionId            : auth.login.defaultRegionId,
        loading             : billruns.loadingstatus,
        auth                : auth.login,
    }
}
// export default withStyles(styles, {withTheme: true})(BillRunInvoiceDetail);
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillRunInvoiceDetail)));