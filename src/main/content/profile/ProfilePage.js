import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../apps/contacts/store/actions';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {Avatar, Button, Tab, Tabs, Typography} from '@material-ui/core';
import TimelineTab from 'main/content/profile/tabs/TimelineTab';
import PhotosVideosTab from 'main/content/profile/tabs/PhotosVideosTab';
import AboutTab from 'main/content/profile/tabs/AboutTab';
import SettingsPanel from "main/content/profile/tabs/SettingsPanel";
import PropTypes from 'prop-types';
import _ from 'lodash';

const styles = theme => ({
    layoutRoot   : {},
    layoutToolbar: {
        padding: 0
    },
    layoutHeader : {
        height                        : 100,
        minHeight                     : 100,
        background                    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize                : 'cover',
        color                         : '#fff',
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    },
    tabsRoot     : {
        height: 50,
        width : '100%'
    },
    tabRoot      : {
        height: 50
    }
});
const defaultavatar ='https://res.cloudinary.com/janiking/image/upload/v1547085033/apps/users/generic.jpg';
class ProfilePage extends Component {

    state = {
        value: 0,
        id:null,
        user:null,
        contacts: null,
        param:null,
    };
    constructor(props){
        super(props);
        this.props.getContacts();
    }
    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount(){
        console.log('this.props.match.params',this.props.match);
        let userid = null;
        if(this.props.match.params.id && this.props.match.params.id !== null){
            this.setState({id:this.props.match.params.id});
            userid = this.props.match.params.id;
            this.setState({param:this.props.match.params.id});
        }
        else{
            this.setState({id: this.props.login.UserId});
            userid = this.props.login.UserId;
        }
        if(this.props.contacts && this.props.contacts !== null){
            let userdetail = null;
            userdetail =_.find(this.props.contacts,{id:parseInt(userdetail)});
            console.log("user detail from update",userdetail);
            if(userdetail && userdetail !== null){
                this.setState({user: userdetail});
            }
        }

    }
    componentWillReceiveProps(props){


    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.contacts && this.props.contacts !== null && this.state.user ===null){
            let userdetail = null;
            userdetail =_.find(this.props.contacts,{id:parseInt(this.state.id)});
            console.log("user detail from update",userdetail);
            if(userdetail && userdetail !== null){
                this.setState({user: userdetail});
            }
        }
        if(this.props.contacts && this.props.contacts !== null &&  JSON.stringify(this.props.contacts) !== JSON.stringify(prevProps.contacts)){
            this.setState({contacts: this.props.contacts});

            let userdetail = null;
            userdetail =_.find(this.props.contacts,{id:parseInt(this.state.id)});
            if(userdetail && userdetail !== null){
                this.setState({user: userdetail});
            }
        }
    }
    render()
    {
        const {classes,} = this.props;
        const {value,user} = this.state;
        const miduser = {};

        if(this.state.param ===null){
            return (
                <FusePageSimple
                    classes={{
                        root   : classes.layoutRoot,
                        header : classes.layoutHeader,
                        toolbar: classes.layoutToolbar
                    }}
                    header={
                        <div className="p-4 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                            <div className="p-4 flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Avatar className="w-84 h-84" src={this.props.login.profilePhoto?this.props.login.profilePhoto:defaultavatar}/>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="md:ml-24" variant="h4" color="inherit">{this.props.login.firstName}&nbsp;&nbsp;{this.props.login.lastName}</Typography>
                                </FuseAnimate>
                            </div>

                            <div className="flex items-center justify-end">
                                <Button className="mr-8 mb-24 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                                <Button className="mb-24 normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
                            </div>
                        </div>
                    }
                    contentToolbar={
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
                                }} label="About"/>
                            <Tab
                                classes={{
                                    root: classes.tabRoot
                                }}
                                label="Timeline"/>
                            <Tab
                                classes={{
                                    root: classes.tabRoot
                                }} label="Photos & Videos"/>
                            <Tab
                                classes={{
                                    root: classes.tabRoot
                                }} label="Settings Panel"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-16 sm:p-24">
                            {value === 0 && (
                                <AboutTab/>
                            )}
                            {value === 1 &&
                            (
                                <TimelineTab/>
                            )}
                            {value === 2 && (
                                <PhotosVideosTab/>
                            )}
                            {value === 3 && (
                                <SettingsPanel/>
                            )}
                        </div>
                    }
                />
            )
        }
        else if(user && user !==null){

            return(
                <FusePageSimple
                    classes={{
                        root   : classes.layoutRoot,
                        header : classes.layoutHeader,
                        toolbar: classes.layoutToolbar
                    }}
                    header={
                        <div className="p-4 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                            <div className="p-4 flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Avatar className="w-84 h-84" src={user.avatar?user.avatar:defaultavatar}/>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="md:ml-24" variant="h4" color="inherit">{user.firstName}&nbsp;&nbsp;{user.lastName}</Typography>
                                </FuseAnimate>
                            </div>

                            <div className="flex items-center justify-end">
                                <Button className="mr-8 mb-24 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                                <Button className="mb-24 normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
                            </div>
                        </div>
                    }
                    contentToolbar={
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
                                }} label="About"/>
                            <Tab
                                classes={{
                                    root: classes.tabRoot
                                }}
                                label="Timeline"/>
                            <Tab
                                classes={{
                                    root: classes.tabRoot
                                }} label="Photos & Videos"/>
                            <Tab
                                classes={{
                                    root: classes.tabRoot
                                }} label="Settings Panel"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-16 sm:p-24">
                            {value === 0 && (
                                <AboutTab user={user}/>
                            )}
                            {value === 1 &&
                            (
                                <TimelineTab/>
                            )}
                            {value === 2 && (
                                <PhotosVideosTab/>
                            )}
                            {value === 3 && (
                                <SettingsPanel/>
                            )}
                        </div>
                    }
                />
            )
        }
        else{
            return(<div>Loading Data</div>)
        }

    };
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts         : Actions.getContacts,

    }, dispatch);
}

function mapStateToProps({auth,contactsApp})
{
    return {
            login: auth.login,
            contacts          : contactsApp.contacts.entities,
    }
}
export default (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))));
// export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(ProfilePage)));
