import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PaymentLockBoxList from './PaymentLockBoxList';
import PaymentLockBoxContentList from './PaymentLockBoxContentList';
import PaymentLockBoxModalForm from './PaymentLockBoxModalForm';
// core components
import {
    Hidden,
    Icon,
    IconButton,
    Fab,
    Typography,
    Toolbar,
    CircularProgress,
    Button,
    Input,
    Paper,
    TextField
} from '@material-ui/core';

// theme components
import {FusePageCustom, FuseAnimate} from '@fuse';

import {withStyles,Card} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
//Custom components


// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import moment from 'moment';
// third party
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';

import axios from 'axios';

const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

const headerHeight = 80;




const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover',
    },
    layoutRoot: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
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
        }
    },
    button: {
        '& span':{
            textTransform: 'none'
        }
    },
    card: {
        width   : '100%',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
    layoutRightSidebar : {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutLeftSidebar : {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutSidebarHeader: {
        height   : headerHeight,
        minHeight: headerHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
    },
    content:{
        position: 'relative'
    },
    addButton          : {
        position: 'absolute',
        bottom  : -28,
        left    : 16,
        zIndex  : 999,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    sideButton          : {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    removeButton          : {
        position: 'absolute',
        bottom  : -28,
        right    : 16,
        zIndex  : 999,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 24,
        minWidth: 200,
    },
    divider: {
        height: theme.spacing.unit * 2,
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
    filebutton: {
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    },
    lineprogresroot: {
        flexGrow: 1
    },
    containerdate: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textFielddate: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});
class PaymentLockBoxReport extends Component {

    state ={
        OpenLeftPanelStatus             : false,
        OpenRightPanelStatus            : false,
        selectedFile                    : null,
        fileload                        : null,
        completed                       : 0,
        fileuploadstatus                : false,
        filestatus                      : false,
        date                            : moment().format('YYYY-MM-DD'),
    };
    OpenLeftPanel=()=>{
        this.setState({OpenLeftPanelStatus: !this.state.OpenLeftPanelStatus});
    }
    OpenRightPanel =()=>{
        this.setState({OpenRightPanelStatus: !this.state.OpenRightPanelStatus});
    }
    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            fileload: 0,
        });
        console.log("this.state.selectedfile",this.state.selectedFile);
    }
    progress = () => {
        const {completed} = this.state;
        if ( completed === 100 )
        {
            this.setState({completed: 0});
        }
        else
        {
            const diff = Math.random() * 10;
            this.setState({completed: Math.min(completed + diff, 100)});
        }
    };
    openModal=()=>{
        // this.props.paymentlockboxgetalldata();
        this.props.showPaymentLockBoxModalForm(true)
    }
    fileuploadstart=()=>{
        if(this.state.selectedFile && this.state.selectedFile !== null ){
            const formData = new FormData();
            formData.append(
                'myFile',
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/lockbox/upload?regionId=${this.props.regionId}`, this.state.selectedFile, {
                onUploadProgress: progressEvent => {
                    this.setState({fileload:Math.round(progressEvent.loaded / progressEvent.total*10000)/100});
                    console.log(progressEvent.loaded / progressEvent.total)
                }
            })
            .then(res => {
                console.log("ress=====",res);
                if(this.state.fileload === 100 && res.statusText ===""){
                        this.setState({fileload: 0});
                        this.setState({selectedFile:null});
                        this.setState({fileuploadstatus:false});
                        this.successmesssage();
                }
                else if(res.statusText || this.state.fileload < 100){
                    this.errormessage(res.statusText);
                }

            })
        }
    }
    successmesssage=()=>{

        this.props.showMessage({
            message     : "File Upload Finished Successfully!",//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
        });
    }
    errormessage=(msg)=>{
        this.props.showMessage({
            message     : "File Upload Faild!!!"+msg,//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'error'//success error info warning null
        });
    }

    componentDidUpdate(prevProps,prevState){

        // console.log("this.state.selectedfile",this.state.selectedFile);
        if(this.state.selectedFile && this.state.selectedFile !== null && !this.state.fileuploadstatus && this.state.fileload ===0){
            this.setState({fileuploadstatus: !this.state.fileuploadstatus});
        }
        if(this.state.fileload && this.state.fileload>0 && this.state.fileuploadstatus){
            this.setState({fileuploadstatus:false});
        }

        clearInterval(this.timer);
    }
    render()
    {
        const {classes} = this.props;
        const {OpenLeftPanelStatus,OpenRightPanelStatus} = this.state;
        return (
            <React.Fragment>
                <FusePageCustom
                    classes={{
                        root: classNames(classes.layoutRoot),
                        rightSidebar : classNames(classes.layoutRightSidebar, {'openSummary': OpenRightPanelStatus}),
                        leftSidebar : classNames(classes.layoutLeftSidebar, {'openFilter': OpenLeftPanelStatus}),
                        sidebarHeader: classes.layoutSidebarHeader,
                        header: classes.layoutHeader,
                        content: classes.content
                    }}
                    header={
                        <div className="flex w-full items-center">
                            { 1 && (
                                <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                    <div className="flex flex-row flex-1 justify-between">
                                        <div className="flex flex-shrink items-center">
                                            <div className="flex items-center">
                                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                                    <Icon className="text-32 mr-12">payment</Icon>
                                                </FuseAnimate>
                                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                    <Typography variant="h6" className="hidden sm:flex">Lockbox Payments</Typography>
                                                </FuseAnimate>
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink items-center" style={{marginRight:"5%"}}>

                                            <div>
                                                {/*<Button variant="contained" color="primary">*/}
                                                    {/*<Icon className={classes.rightIcon}>done_all</Icon>*/}
                                                    {/*Process Lockbox*/}
                                                {/*</Button>*/}
                                                <input
													// accept="image/*,video/*,pdf/*, txt/*"
													accept="txt/*"
                                                    className={classes.input}
                                                    style={{ display: 'none' }}
                                                    id="raised-button-file"
                                                    onChange={this.handleselectedFile}
                                                    type="file"
                                                />
                                                <label htmlFor="raised-button-file" style={{display:'none'}}>
                                                    <Button variant="contained" color="primary" component="span" style={{marginRight:20}}
                                                    >
                                                        <Icon className="text-24" color="action">attach_file</Icon>
                                                        File
                                                    </Button>
                                                    {/*<IconButton variant="raised"  component="span" className={classes.filebutton}>*/}
                                                        {/*<Icon className="text-24" color="action">attach_file</Icon>*/}
                                                    {/*</IconButton>*/}
                                                </label>
                                                {/*{this.state.fileload !==null && this.state.fileload>0 && (*/}
                                                    {/*this.state.fileload +"%"*/}
                                                {/*)}*/}
                                                {/*<form className={classes.containerdate} noValidate>*/}
                                                    {/*<TextField*/}
                                                        {/*id="date"*/}
                                                        {/*label="Date"*/}
                                                        {/*type="date"*/}
                                                        {/*variant="outlined"*/}
                                                        {/*defaultValue={this.state.date}*/}
                                                        {/*className={classes.textFielddate}*/}
                                                        {/*InputLabelProps={{*/}
                                                            {/*shrink: true,*/}
                                                        {/*}}*/}
                                                    {/*/>*/}
                                                {/*</form>*/}

                                                    <Button variant="contained" color="primary"  onClick={() => {this.openModal()}}>
                                                        <Icon className={classes.rightIcon}>done_all</Icon>
                                                        Process Lockbox
                                                    </Button>


                                                {/*<IconButton  variant="raised" disabled={!this.state.fileuploadstatus} aria-label="add" onClick={() => {this.fileuploadstart()}}>*/}
                                                     {/*<CloudUploadIcon  className={classes.rightIcon}/>*/}
                                                {/*</IconButton>*/}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex flex-none items-end" style={{display: 'none'}}>
                                        <FuseAnimate animation="transition.expandIn" delay={600}>
                                            <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => {alert("OK")}}>
                                                <Icon>add</Icon>
                                            </Fab>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Fab color="primary" aria-label="add"
                                                 className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
                                                <Icon>mail_outline</Icon>
                                            </Fab>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
                                                <Icon>print</Icon>
                                            </Fab>
                                        </FuseAnimate>
                                        { !1 && (
                                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                                <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeInvoices()}>
                                                    <Icon>delete</Icon>
                                                </Fab>
                                            </FuseAnimate>
                                        )}
                                    </div>




                                </div>
                            )}

                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            { 1 && (
                                <div className={classNames("flex flex-col h-full")}>
                                    <div className="flex flex-row items-center p-12">
                                        <div className="flex justify-start items-center">
                                            {/*<Hidden smDown>*/}
                                                {/*<Button*/}
                                                    {/*onClick={(ev) => this.OpenLeftPanel()}*/}
                                                    {/*aria-label="toggle filter panel"*/}
                                                    {/*color="secondary"*/}

                                                    {/*className={classNames(classes.filterPanelButton)}*/}
                                                {/*>*/}
                                                    {/*<img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>*/}
                                                {/*</Button>*/}
                                            {/*</Hidden>*/}
                                            {/*<Hidden smUp>*/}
                                                {/*<Button*/}
                                                    {/*onClick={(ev) => this.pageLayout.OpenLeftPanel()}*/}
                                                    {/*aria-label="toggle filter panel"*/}
                                                    {/*className={classNames(classes.filterPanelButton)}*/}
                                                {/*>*/}
                                                    {/*<img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>*/}
                                                {/*</Button>*/}
                                            {/*</Hidden>*/}
                                        </div>
                                        <div className="flex items-center w-full h-44 mr-12 ml-12">
                                            <Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>
                                                <Input
                                                    placeholder="Search..."
                                                    className={classNames(classes.search, 'pl-16')}
                                                    // className="pl-16"
                                                    disableUnderline
                                                    fullWidth
                                                    // value={this.state.s}
                                                    // onChange={this.handleSearchChange('s')}
                                                    inputProps={{
                                                        'aria-label': 'Search'
                                                    }}
                                                />
                                                <Icon color="action" className="mr-16">search</Icon>
                                            </Paper>
                                        </div>
                                        <div className="flex items-center justify-end pr-12">
                                            {/*<Hidden smDown>*/}
                                                {/*<Button*/}
                                                    {/*onClick={(ev) => this.OpenRightPanel()}*/}
                                                    {/*aria-label="toggle summary panel"*/}
                                                    {/*// disabled={summaryState ? true : false}*/}
                                                    {/*className={classNames(classes.summaryPanelButton)}*/}
                                                {/*>*/}
                                                    {/*<Icon>insert_chart</Icon>*/}
                                                {/*</Button>*/}
                                            {/*</Hidden>*/}
                                            {/*<Hidden smUp>*/}
                                                {/*<Button*/}
                                                    {/*onClick={(ev) => this.pageLayout.OpenRightPanel()}*/}
                                                    {/*aria-label="toggle summary panel"*/}
                                                    {/*className={classNames(classes.summaryPanelButton)}*/}
                                                {/*>*/}
                                                    {/*<Icon>insert_chart</Icon>*/}
                                                {/*</Button>*/}
                                            {/*</Hidden>*/}
                                        </div>
                                    </div>
                                    {/*<PaymentLockBoxList/>*/}
                                    <PaymentLockBoxContentList/>
                                    {this.props.paymentLockBoxModalForm.open && <PaymentLockBoxModalForm/>}
                                </div>
                            )}

                        </div>
                    }
                    leftSidebarHeader={
                        <div className={classNames("flex flex-row w-full h-full justify-between p-12 align-middle pr-0")}>
                            <h4 style={{marginBlockStart: '1em'}}>Filter Panel</h4>
                            <FuseAnimate animation="transition.expandIn" delay={200}>
                                <div>
                                    <Hidden xsDown>
                                        <IconButton onClick={(ev)=>this.OpenLeftPanel()}>
                                            <Icon>close</Icon>
                                        </IconButton>
                                    </Hidden>
                                </div>
                            </FuseAnimate>
                        </div>
                    }
                    leftSidebarContent={

                        <div>Left Side Bar</div>

                    }
                    rightSidebarHeader={
                        <div className="flex flex-row w-full h-full justify-between p-24 align-middle pr-0">
                            <h4 style={{marginBlockStart: '1em'}}>Summary Panel</h4>
                            <FuseAnimate animation="transition.expandIn" delay={200}>
                                <div>
                                    <Hidden xsDown>
                                        <IconButton onClick={(ev)=>this.OpenRightPanel()}>
                                            <Icon>close</Icon>
                                        </IconButton>
                                    </Hidden>
                                </div>
                            </FuseAnimate></div>
                    }
                    rightSidebarContent={
                        <div>Right Side Bar</div>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                >
                </FusePageCustom>
                {/*{(this.props.bInvoiceStart || this.props.bCustomerFetchStart || this.props.bFranchiseesFetchStart) && (*/}
                    {/*<div className={classes.overlay}>*/}
                        {/*<CircularProgress className={classes.progress} color="secondary"  />*/}
                    {/*</div>*/}
                {/*)}*/}
            </React.Fragment>
        )
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        paymentlockboxgetalldata                : Actions.paymentlockboxgetalldata,
        fileupload                              : Actions.paymentlockboxfileupload,
        showMessage                             : Actions.showMessage,
        hideMessage                             : Actions.hideMessage,
        showPaymentLockBoxModalForm             : Actions.showPaymentLockBoxModalForm,
    }, dispatch);
}

function mapStateToProps({paymentlockbox, auth})
{
    return {

        regionId            : auth.login.defaultRegionId,
        auth                : auth.login,
        data                : paymentlockbox.data,
        paymentLockBoxModalForm           : paymentlockbox.paymentLockBoxModalForm
    }
}
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentLockBoxReport)));

