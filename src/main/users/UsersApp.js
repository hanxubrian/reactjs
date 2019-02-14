import React, {Component, Fragment} from 'react';
import {
    Icon,
    Typography,
    Button
} from '@material-ui/core';
import {FusePageCustomSidebarScroll, FuseAnimate} from '@fuse';
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from './store/actions';
import FilterPanel from './FilterPanel';
import "react-table/react-table.css";
import classNames from 'classnames';


import UsersList from 'main/users/UsersList';
import UsersHeader from 'main/users/UsersHeader';
import _ from '@lodash';
import UsersSidebarContent from "./UsersSidebarContent";
import UsersForm from "./UsersForm";
import FusePageUsersCustom from "../../@fuse/components/FusePageLayouts/FusePageUsersCustom";


import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'multipart/form-data'}});

const headerHeight = 80;

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const styles = theme => ({
    root: {
        background: "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover',
    },
    layoutRoot: {
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
        '& .wordwrap': {
            whiteSpace: 'pre-line !important',
            wordWrap: 'break-word',
        }
    },
    card: {
        width: '100%',
        maxWidth: 384,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    layoutHeader: {
        height: headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
    layoutRightSidebar: {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutLeftSidebar: {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutSidebarHeader: {
        height: headerHeight,
        minHeight: headerHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
    },
    content: {
        position: 'relative'
    },
    addButton: {
        position: 'absolute',
        bottom: -28,
        left: 16,
        zIndex: 999,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    sideButton: {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    removeButton: {
        position: 'absolute',
        bottom: -28,
        right: 16,
        zIndex: 999,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    imageIcon: {
        width: 24,
        height: 24
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.divider
    },
    search: {
        width: 360,
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
    tableTdEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .1)'
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
    validationMenu: {
        color: "#07DF07",
    },
    invalidationMenu: {
        color: "#FF557F",
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    btntop: {
        marginRight: 20
    },
    iconSmall: {
        fontSize: 20,
    }
});

class UsersApp extends Component {


    state = {
        openUsersFormStatus: false,
        HeaderIcon : null
    };

    componentWillMount() {
        this.setState({
            "openUsersFormStatus": this.props.openUsersFormStatus
        });
        this.props.nav.map(item=>{
            if(item.TabName==="Settings"){
                this.setState({HeaderIcon: item.Icon});
            }
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(this.props.openUsersFormStatus !== prevProps.openUsersFormStatus){
            this.setState({
                "openUsersFormStatus": this.props.openUsersFormStatus
            })
        }
    }

    toggleForm = (param) =>(event) => {
        this.props.openUsersForm(param);
        this.setState({
            "openUsersFormStatus": param
        })
    };

    uploadAvatar = () => {
        const formData = new FormData();
        formData.append('file',this.props.newUserAvatar);
        formData.append('upload_preset','mjsn2xvg');
        formData.append('source','uw');

        axios_instance.post('https://api.cloudinary.com/v1_1/janiking/upload',
            formData
        )
            .then(response=> {
                if(response.status===200) {
                    console.log('url=', response.data.url);
                    this.props.setNewUserAvatarURL(response.data.url);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    save =  () => async (ev)=>{
        if(this.props.newUserAvatar!==null)
            await this.uploadAvatar();

        console.log('result=', this.props.insertPayload);

        await this.props.createUser(this.props.insertPayload);
        await this.setState({"openUsersFormStatus": false});
        await this.props.openUsersForm(false);
    };

    render() {

        const {classes, filterState, summaryState} = this.props;

        const {openUsersFormStatus,HeaderIcon} = this.state;

        return (
            <React.Fragment>
                <FusePageCustomSidebarScroll
                    classes={{
                        root: classNames(classes.layoutRoot, 'test123'),
                        rightSidebar: classNames(classes.layoutRightSidebar, {'openSummary': summaryState}),
                        leftSidebar: classNames(classes.layoutLeftSidebar, {'openFilter': filterState}),
                        sidebarHeader: classes.layoutSidebarHeader,
                        header: classes.layoutHeader,
                        content: classes.content
                    }}
                    header={
                        <div className="flex w-full items-center">
                            <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                <div className="flex flex-row flex-1 justify-between">
                                    <div className="flex flex-shrink items-center">
                                        <div className="flex items-center">
                                            <Icon className="text-32 mr-12">{HeaderIcon}</Icon>
                                            {! openUsersFormStatus && (
                                                <Typography variant="h6" className="hidden sm:flex">Settings |
                                                    Users</Typography>
                                            )}
                                            {openUsersFormStatus && (
                                                <Typography variant="h6" className="hidden sm:flex">Settings |
                                                    Add New User</Typography>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink items-center">
                                        {! openUsersFormStatus && (
                                            <Button variant="contained" color="primary"
                                                    className={classNames(classes.button, classes.btntop) } onClick={this.toggleForm(true)}>
                                                Add New User
                                                <Icon className={classes.rightIcon}>add</Icon>
                                            </Button>
                                        )}
                                        { openUsersFormStatus && (
                                            <div>
                                                <Button variant="contained" color="primary"
                                                        className={classNames(classes.button, classes.btntop) } onClick={this.save()}>
                                                    Save
                                                    <Icon className={classes.rightIcon}>save</Icon>
                                                </Button>
                                                <Button variant="contained" color="primary"
                                                        className={classNames(classes.button, classes.btntop) } onClick={this.toggleForm(false)}>
                                                    Close
                                                    <Icon className={classes.rightIcon}>close</Icon>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            <Fragment>
                                <UsersList/>
                            </Fragment>
                        </div>
                    }
                    leftSidebarHeader={
                        <Fragment>
                            <div
                                className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
                                <h2 style={{marginBlockStart: '1em'}}>Filters</h2>
                            </div>
                        </Fragment>
                    }
                    leftSidebarContent={
                        <FilterPanel/>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                >
                </FusePageCustomSidebarScroll>
            </React.Fragment>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openUsersForm: Actions.openUsersForm,
        createUser: Actions.createUser,
        setNewUserAvatarURL: Actions.setNewUserAvatarURL,
    }, dispatch);
}

function mapStateToProps({ usersApp,fuse})
{
    return {
        openUsersFormStatus  : usersApp.users.openUsersFormStatus,
        filterState: usersApp.users.fpStatus,
        nav: fuse.navigation,
        insertPayload: usersApp.users.payload,
        newUserAvatar: usersApp.users.newUserAvatar,
    }
}

export default (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersApp))));

