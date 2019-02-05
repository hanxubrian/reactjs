import React, {Component} from 'react';

// core components
import {Icon, IconButton,Button, Fab,ClickAwayListener, Input, Paper, Typography,CircularProgress,MenuItem,InputLabel ,OutlinedInput , FormControl, Select} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { Dialog ,DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// theme components
import {FusePageCustom, FuseAnimate ,FuseExample, FuseHighlight, FusePageSimple} from '@fuse';

// for store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";


import * as MainActions from 'store/actions';
import * as quickPanelActions from 'main/quickPanel/store/actions';
// import * as authActions from '../auth/store/actions/login.actions';
import * as chatPanelActions from 'main/chatPanel/store/actions';
import * as authActions from "../../../../auth/store/actions/login.actions";

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';

// third party
import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';
import Pusher from 'pusher-js';

import MomentUtils from "@date-io/moment/build/index";



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
        height   : 80,
        minHeight: 80,
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
        // marginRight: 100,
    },
    overlay: {
        position: 'absolute',
        top: -110,
        left: -65,
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
        // margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class AdminImport extends Component {
    state = {
        s                       : '',
        data                    : [],
        importList              : [],
        regionId                : 0,
        temp                    : [],
        regionName              : null,
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleChange1 = event => {
        this.setState({ regionId: event.target.value ,temp:[]});
        console.log(event.target.value);
        if(event.target.value !== null && this.props.login.all_regions !== null){
            this.props.login.all_regions.map((item)=>{
                if(item.regionid ===event.target.value ){
                    this.setState({regionName:item.regionname});
                }
            });
        }

    };
    componentDidMount(){
        if(this.props.login.defaultRegionId && this.props.login.defaultRegionId !==null ){
            this.setState({regionId:this.props.login.defaultRegionId});
            this.props.login.all_regions.map((item)=>{
                if(item.regionid ===this.props.login.defaultRegionId ){
                    this.setState({regionName:item.regionname});
                }
            });
        }
    }
    importaction=()=>{
        if(this.state.regionId && this.state.regionId !== null){
            this.props.getimportresult(this.state.regionId);
            this.getresult();
        }
    }
    getresult=()=>{

        if(this.props.importlist && this.props.importlist !== null &&  this.props.importlist[0] && this.props.importlist[0] !== null){
            let list = this.props.importlist[0];
            let successlist = [];
            let failedlist  = [];
            let midtemp     = [];
            let res         = [];
            if(list.SuccessList !== null && list.SuccessList.length >0){
                successlist = list.SuccessList;
            }
            if(list.FailedList !== null && list.FailedList.length >0){
                failedlist = list.FailedList;
            }
            midtemp = successlist;
            if(midtemp && midtemp.length ){
                midtemp.map((item)=>{
                    let miditem = [];
                    miditem.Tablename = item;
                    miditem.Region = this.state.regionName;
                    miditem.Dbname = list.dbName;
                    miditem.Status = "Success";
                    res.push(miditem);
                });

            }
            midtemp = failedlist;
            if(midtemp && midtemp.length ){
                midtemp.map((item)=>{
                    let miditem = [];
                    miditem.Tablename = item;
                    miditem.Region = this.state.regionName;
                    miditem.Dbname = list.dbName;
                    miditem.Status = "Failed";
                    res.push(miditem);
                });

            }
            this.setState({temp:res});
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.importlist && this.props.importlist !==  null){
            // console.log("this.props.importlist",this.props.importlist);
        }

        if(this.props.adminimportstatus ===false && prevProps.adminimportstatus === true){
            if(this.props.importlist && this.props.importlist !== null && this.props.importlist[0] && this.props.importlist[0] !== null){
                this.setState({importList:this.props.importlist[0]});
                this.getresult();
            }
        }
        if(this.state.importlist && this.state.importlist !== null && JSON.stringify(this.state.importlist) !== JSON.stringify(prevState.importlist) ){
            // console.log("this.state.importlist",this.state.importlist);
        }
        if(this.state.regionId !==prevState.regionId && this.state.regionId && this.state.regionId !== null){
            this.setState({
                importList:[],
            });
        }
    }
    render()
    {
        const {classes ,adminimportstatus}     = this.props;
        const {regionId}    = this.state;
        return (
            <FusePageCustom
                classes={{
                    root: classes.layoutRoot,
                    header: classes.layoutHeader,
                    content: classes.content
                }}
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between" >
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="flex flex-shrink items-center">
                                <div className="flex items-center">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Icon className="text-32 mr-12">important_devices</Icon>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">Admin | Imports</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                            <div className={classNames(classes.topbtncus,"flex flex-shrink items-center")}>
                                <Button variant="contained" color="primary"
                                        className={classNames(classes.button, classes.btntop) } onClick={this.importaction}>
                                    Import
                                    <Icon className={classes.rightIcon}>import_export</Icon>
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-none items-end" style={{display: 'none'}}>
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => alert('ok')}>
                                    <Icon>add</Icon>
                                </Fab>
                            </FuseAnimate>

                        </div>
                    </div>
                }
                content={

                    <div className="flex-1 flex-col absolute w-full h-full">
                        {adminimportstatus && (//loading && loading !==null
                            <div className={classes.overlay} style={{

                            }}>
                                <CircularProgress className={classes.progress} color="secondary"  />

                            </div>
                        )}

                        {this.state.temp && (
                            <ReactTable
                                data={this.state.temp}
                                PaginationComponent={JanikingPagination}
                                minRows = {0}
                                // onFetchData={this.fetchData}
                                getTheadGroupProps={(state, rowInfo, column, instance) =>{
                                    return {
                                        style:{
                                            // padding: "10px 10px",
                                            fontSize: 16,
                                            fontWeight: 700
                                        },
                                    }
                                }}
                                getTheadGroupThProps={(state, rowInfo, column, instance) => {
                                    return {
                                        style:{
                                            // padding: "10px 10px",
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
                                            fontSize: 15,
                                            height: 50,
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
                                                // alert('ok');

                                            }
                                        }
                                    }
                                }}
                                columns={[
                                    {
                                        Header: ()=>(
                                            <div style={{width:"100%"}}>
                                                <div className="flex items-center pr-0 lg:pr-12">
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
                                                    <div className="flex items-center pr-0 lg:pr-12">
                                                        {/*<Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>*/}
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <InputLabel  htmlFor="outlined-age-simple">
                                                                Regions
                                                            </InputLabel>
                                                            <Select
                                                                value={regionId}
                                                                onChange={this.handleChange1}
                                                                input={
                                                                    <OutlinedInput
                                                                        name="date"
                                                                        labelWidth={50}
                                                                        id="outlined-age-native-simple"
                                                                    />
                                                                }
                                                                inputProps={{
                                                                    name: 'adminregionOption',
                                                                    id  : 'adminregionOption'
                                                                }}
                                                            >

                                                                {this.props.login.all_regions.map((region, index)=>{
                                                                    return (
                                                                        <MenuItem key={index} style={{paddingLeft: '10px'}} value={region.regionid}>{region.regionname}</MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                        {/*</Paper>*/}


                                                    </div>
                                                </div>
                                            </div>

                                        ),
                                        columns: [
                                            {
                                                Header: "Region",
                                                id: "Region",
                                                accessor: "Region",
                                                className: classNames("flex items-center  justify-center"),
                                                // Cell : row=>{
                                                //     return((row.original.Month).toString().padStart(2, "0")+"/"+row.original.Year);
                                                // }
                                            },
                                            {
                                                Header: "DataBase",
                                                accessor: "Dbname",
                                                width: 560,
                                                className: classNames("flex items-center  justify-center p-12-impor p-24")
                                            },
                                            {
                                                Header: "Table Name",
                                                accessor: "Tablename",
                                                className: classNames("flex items-center  justify-center p-12-impor p-24")
                                            },
                                            {
                                                Header: "Status",
                                                accessor: "Status",
                                                className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                                Cell    : row=>{
                                                    if(row.original.Status===null){
                                                        return "Preliminary";
                                                    }
                                                    else if(row.original.Status==="Success"){
                                                        return (
                                                            <div style={{color:'green'}}>{row.original.Status}</div>
                                                        );
                                                    }
                                                    else{
                                                        return (
                                                            <div style={{color:'red'}}>{row.original.Status}</div>
                                                        );
                                                    }
                                                }

                                            },

                                        ]
                                    }
                                ]}
                                defaultPageSize={25}
                                className={classNames( "-striped -highlight")}
                                totalRecords = {this.state.temp.length}
                                style={{
                                    height: "100%",
                                }}
                            />
                        )}

                    </div>

                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}

            >
                {/*<BillRunDialog></BillRunDialog>*/}



            </FusePageCustom>
        )
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleQuickPanel                : quickPanelActions.toggleQuickPanel,
        showMessage                     : MainActions.showMessage,
        hideMessage                     : MainActions.hideMessage,
        getimportresult                 : MainActions.getallimportlist,
    }, dispatch);
}


function mapStateToProps({auth,chatPanel,contactsApp,notification,billruns,admin})
{
    return {
        user                    : auth.user,
        login                   : auth.login,
        importlist              : admin.adminImport,
        adminimportstatus       : admin.adminImportLoading,
    }
}
// export default withStyles(styles, {withTheme: true})(AdminImport);
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminImport)));