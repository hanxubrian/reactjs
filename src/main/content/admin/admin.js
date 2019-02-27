import React, {Component} from 'react';

// core components
import {Icon, IconButton,Button,Tabs,Tab, Fab,ClickAwayListener, Input, Paper, Typography,CircularProgress,MenuItem,InputLabel ,OutlinedInput , FormControl, Select} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { Dialog ,DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// theme components
import {FusePageCustom, FuseAnimate ,FuseExample, FuseHighlight, FusePageSimple} from '@fuse';

// for store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';

// third party
import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';
import Pusher from 'pusher-js';
import VersionUpgrade from './VersionUpgrade';



//tabs
import VersioningTab from './tabs/Versioning';
import VersioningGrid from './tabs/VersioningGrid';

import VersionUpgradeDialog from './AdminDialog/VersionUpgradeDialog';

// import {UPDATE_FROM_DATE_INVOICE, UPDATE_TO_DATE_INVOICE} from "../../../../../store/actions";
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
        top: 0,
        left: 0,
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
    tabRoot      : {
        height: 50
    }
});

const TabName =['Versioning','Account','Photos & Videos','Settings Panel'];
class Admin extends Component {
    state = {
        s                       : '',
        value                   : 0,

    };

    constructor(props){
        super(props);


    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount(){

    }
    componentWillMount(){

    }
    componentDidUpdate(prevProps, prevState, snapshot){



    }
    componentWillUnmount(){

    }
    componentWillReceiveProps(nextProps) {

    }






    closeDialog=()=>{


    }


    render()
    {
        const {classes} = this.props;
        const { value } = this.state;

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
                                        <Icon className="text-32 mr-12">supervisor_account</Icon>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">Admin</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                            <div className={classNames(classes.topbtncus,"flex flex-shrink items-center")}>
                                {/*<Button variant="contained" color="primary"*/}
                                        {/*className={classNames(classes.button, classes.btntop) } onClick={this.opendialogwin}>*/}
                                    {/*Execute Bill Run*/}
                                    {/*<Icon className={classes.rightIcon}>attach_money</Icon>*/}
                                {/*</Button>*/}
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
                contentToolbar={
                    <div style={{width:"100%"}}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        scrollable
                        scrollButtons="auto"
                        classes={{
                            root: classes.tabsRoot
                        }}
                    >
                        <Tab
                            classes={{
                                root: classes.tabRoot
                            }} label="Versioning"/>
                        <Tab
                            classes={{
                                root: classes.tabRoot
                            }}
                            label="Push Notifications"/>
                        <Tab
                            classes={{
                                root: classes.tabRoot
                            }} label="Legacy Data Import"/>
                        <Tab
                            classes={{
                                root: classes.tabRoot
                            }} label="Regions"/>
                    </Tabs>
                    </div>
                }
                content={

                    <div className="p-16 sm:p-24">
                        {value === 0 && (
                            <VersioningGrid/>
                        )}
                        {value === 1 &&
                        (
                            <div>Push</div>
                        )}
                        {value === 2 && (
                            <div>Legacy Data Import</div>
                        )}
                        {value === 3 && (
                            <div>Regions</div>
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
        openDialog              : Actions.openDialog,
        closeDialog             : Actions.closeDialog
    }, dispatch);
}

function mapStateToProps({notification, auth})
{
    return {
        regionId            : auth.login.defaultRegionId,
        auth                : auth.login,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin)));
