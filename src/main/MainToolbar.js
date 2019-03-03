import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';


import classNames from 'classnames';
import {
    Avatar,
    Button,
    Icon,
    ClickAwayListener,
    IconButton,
    Divider,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
    MenuItem,
    Typography,
    TextField
} from '@material-ui/core';
import * as quickPanelActions from 'main/quickPanel/store/actions';
import * as authActions from '../auth/store/actions/login.actions';
import * as chatPanelActions from 'main/chatPanel/store/actions';
import {FuseShortcuts, FuseAnimate, FuseSearch} from '@fuse';
import {Link} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pusher from 'pusher-js';
import moment from 'moment/moment';

import * as Actions from "./chatPanel/store/actions";

import * as MainActions from 'store/actions';
import ReactPlayer from 'react-player';

import VersionUpgradeDialog from '../main/content/admin/AdminDialog/VersionUpgradeDialog';


const styles = theme => ({
    root     : {
        display   : 'flex',
        alignItems: 'center',
        width     : '100%',
        zIndex    : 10,
    },
    separator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    },
    formControl:{
        '& .region-select': {
            minWidth: "150px",
            paddingRight: "15px",
            marginTop: "15px",
        },
        '& .region-select:before': {
            borderBottom: "solid 0px transparent !important"
        },'.MuiInput-underline-538:after': {
            borderBottom: "solid 0px transparent !important"
        },
        '& .period-select': {
            minWidth: "120px",
            paddingRight: "15px",
            marginTop: "15px",
        },
        '& .period-select:before': {
            borderBottom: "solid 0px transparent !important"
        }
    },
    notificationroot: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
    },
    notificationbody:{
        position: 'absolute',
        top: '70px',
        right: '10px',
        backgroundColor: '#625e5e',
        transform                     : 'translate3d(0,10,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(0,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition                    : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
    },
    avatarresize:{
        width:'30px',
        height:'30px',
        marginTop:'1px',
    },
    unreadBadge  : {
        position       : 'absolute',
        minWidth       : 18,
        height         : 18,
        top            : 29,
        right          : 15,
        borderRadius   : 9,
        padding        : '0 5px',
        fontSize       : 11,
        textAlign      : 'center',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        backgroundColor: theme.palette.secondary.main,
        color          : theme.palette.secondary.contrastText,
        boxShadow      : '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
        zIndex         : 10,
        cursor         : 'pointer',
    },
    unreadchatBadge  : {
        position       : 'absolute',
        minWidth       : 18,
        height         : 18,
        top            : 29,
        right          : "70%",
        borderRadius   : 9,
        padding        : '0 5px',
        fontSize       : 11,
        textAlign      : 'center',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        backgroundColor: theme.palette.secondary.main,
        color          : theme.palette.secondary.contrastText,
        boxShadow      : '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
        zIndex         : 10,
        cursor         : 'pointer',
    },
    unreadsystemBadge  : {
        position       : 'absolute',
        minWidth       : 18,
        height         : 18,
        top            : 29,
        right          : "36%",
        borderRadius   : 9,
        padding        : '0 5px',
        fontSize       : 11,
        textAlign      : 'center',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        backgroundColor: theme.palette.secondary.main,
        color          : theme.palette.secondary.contrastText,
        boxShadow      : '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
        zIndex         : 10,
        cursor         : 'pointer',
    },
    unreademailBadge  : {
        position       : 'absolute',
        minWidth       : 18,
        height         : 18,
        top            : 29,
        right          : "5%",
        borderRadius   : 9,
        padding        : '0 5px',
        fontSize       : 11,
        textAlign      : 'center',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        backgroundColor: theme.palette.secondary.main,
        color          : theme.palette.secondary.contrastText,
        boxShadow      : '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
        zIndex         : 10,
        cursor         : 'pointer',
    },
    morebtn :   {
        width                   : '100%',
        height                  : '44px',
        backgroundColor         : theme.palette.secondary.main,
    },
    mainnotificationbtns:{
        backgroundColor         : theme.palette.secondary.main,
        width                   : '100%',
        color                   : 'white',
        borderRadius            : '0',
    },
    chattogglebtn:{
        position: 'fixed',
        bottom: '30%',
        // right: '90px',
        right: '1%',
        zIndex: 999999,
    },
    chattogglebtnpro:{
        backgroundColor:'#3c93ec',

        color:'white',
    },
    chatheader:{
        backgroundColor         : theme.palette.secondary.main,
        width                   : '100%',
        height                  : '35px',
        color                   : 'white',
    },
    sysnotification:{
        position        : 'absolute',
        width           : '357px',
        height          : '386px',
        right           : '40px',
        top             : '85%',
    },
    input1: {
        padding: '12px 6px'
    },
});

class MainToolbar extends Component {
    state = {
        userMenu                    : null,
        region                      : -1,
        open                        : false,
        notification                : false,
        messages                    : null,
        contacts                    : null,
        chatUser                    : null,
        chatMSG                     : null,
        unreadMSGnum                : 0,
        chatpanelshowstatus         : null,
        value                       : 0,
        pusherMSG                   : null,
        pusherMSGList               : [],
        pusherMSGtime               : null,
        systeunread                 : 0,
        chatunread                  : 0,
        sysflage                    : false,
        sysnotificationSeletedID    : null,
        adminMSG                    : null,
        adminVersionStatus          : false,
        MSG                         : null,
        triggerF                    : false,
        checkloadingchatMSG         : true,
        period: -1,

    };

    userMenuClick = event => {
        this.setState({userMenu: event.currentTarget});
    };

    userMenuClose = () => {
        this.setState({userMenu: null});
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        if(event.target.name==='region')
            this.props.setRegionId(event.target.value);

        if(event.target.name==='period')
            this.props.changeDefaultPeriod(event.target.value);
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    componentDidMount() {
        this.mainmsg();

        if(this.props.getpusherNotificationDB && this.props.getpusherNotificationDB !== null){
            this.setState({pusherMSGList: this.props.getpusherNotificationDB});
        }
        if(this.props.login.IsSuccess){
            this.setState({region: this.props.login.defaultRegionId});
        }
        const pusher = new Pusher('ecf6a4e23b186efa2d44', {
            cluster: 'us2',
            forceTLS: true
        });
        var channel = pusher.subscribe('jk-message-channel');//my-channel my-event jk-message-channel  on-message
        channel.bind('on-message', data => {
            this.setState({ pusherMSG:data});
        });
        var adminchannel = pusher.subscribe('jk-admin-channel');
        adminchannel.bind('on-admin', data => {
            this.setState({ adminMSG:data});
        });


        if(this.props.defaultPeriod!==-1)
            this.setState({period: this.props.defaultPeriod})
    }
    shownotification=()=>{
        // e.stopPropagation();
        this.setState({unreadMSGnum:0});
        this.setState({notification: !this.state.notification});
    }
    billrunerrormessage=()=>{
        this.props.showMessage({
            message     : "Error!!!We can't create New Bill Run",//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'error'//success error info warning null
        });
        this.props.changebillrunstatus();
    }
    billrunsuccessmesssage=()=>{
        let msg = this.state.pusherMSG.message;
        if(msg === null)msg = "";
        if(1){
            if(this.props.billstatus === 200){

                this.props.showMessage({
                    message     : msg,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'//success error info warning null
                });
                this.props.changebillrunstatus();
                this.setState({triggerF:true});
            }

        }

    }
    changeallmsg=(param)=>{
        let chatmidmsg          = this.state.chatMSG;
        let pushermidmsg        = param;
        let allmsg              = [];
        if(chatmidmsg && chatmidmsg !== null && pushermidmsg === null ){
            allmsg =chatmidmsg;
        }
        else if(chatmidmsg === null && pushermidmsg !== null && pushermidmsg ){
            allmsg =pushermidmsg;
        }
        else if(chatmidmsg !== null && pushermidmsg !== null ){
            allmsg =chatmidmsg.concat(pushermidmsg);
        }

        if(allmsg && allmsg.length >0){
            allmsg.sort(function (a,b) {
                return (new Date(b['time']))-(new Date(a['time']));
            });
        }
        this.setState({MSG:allmsg});
    }
    mainmsg=()=>{

        let chatmidmsg          = this.state.chatMSG;
        let pushermidmsg        = this.state.pusherMSGList;
        let allmsg              = [];

        if(chatmidmsg && chatmidmsg !== null && pushermidmsg === null ){
            allmsg =chatmidmsg;
        }
        else if(chatmidmsg === null && pushermidmsg !== null && pushermidmsg ){
            allmsg =pushermidmsg;
        }
        else if(chatmidmsg !== null && pushermidmsg !== null ){
            allmsg =chatmidmsg.concat(pushermidmsg);
        }

        if(allmsg && allmsg.length >0){
            allmsg.sort(function (a,b) {
                return (new Date(b['time']))-(new Date(a['time']));
            });
        }
        this.setState({MSG:allmsg});

    }
    showchatPanel =()=>{
        if(this.props.getchatnotification){
            this.props.chatnotificationstatus();
        }
        else{
            this.props.chatnotificationstatus();
            this.props.openChatPanel();
            this.shownotification();
        }

    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.billstatus !== prevProps.billstatus && prevProps.billstatus===200){
            this.setState({triggerF:false});
        }
        if(JSON.stringify(this.state.chatMSG) !== JSON.stringify(prevState.chatMSG)){//chat 0Message
            this.mainmsg();
        }

        if(this.props.billstatus !== prevProps.billstatus){
            if(this.props.billstatus === 200){
                this.billrunsuccessmesssage();
            }
            else if(this.props.billstatus === 400){
                this.billrunerrormessage();
            }
        }

        let midflage = false;
        if(this.state.adminMSG && this.state.adminMSG !== null && this.state.adminMSG !== prevState.adminMSG){
            if(this.state.adminMSG.note && this.state.adminMSG.version){
                this.setState({adminVersionStatus:true});

            }
        }

        if (this.state.sysflage === true){
            setTimeout(
                function() {
                    this.setState({sysflage: false});
                }
                    .bind(this),
                1000
            );
        }
        if (this.state.systeunread >0 && this.state.systeunread>prevState.systeunread){
            this.setState({sysflage:true});
        }

        if (this.state.systeunread !==prevState.systeunread && this.state.systeunread<prevState.systeunread){
            this.setState({sysflage:false});
        }

        if(JSON.stringify(this.state.pusherMSG) !== JSON.stringify(prevState.pusherMSG) && this.state.pusherMSG !== null  ){
            if(this.state.pusherMSG.user === this.props.login.UserId.toString()){
                let PusherList =[];
                let settime = moment();
                let unreadNum = this.state.unreadMSGnum;
                let sysunread = this.state.systeunread;

                let midgetPusherMSG=[];
                midgetPusherMSG = this.state.pusherMSG;
                midgetPusherMSG.time = moment();
                PusherList=this.state.pusherMSGList;
                PusherList.unshift(midgetPusherMSG);//this.state.pusherMSG
                unreadNum += 1;
                this.props.addpushernotification(midgetPusherMSG);//this.state.pusherMSG
                this.setState({unreadMSGnum:unreadNum});
                this.setState({pusherMSGList:PusherList});
                this.setState({systeunread:sysunread+1});
                this.changeallmsg(PusherList);
            }
        }
        if(this.props.chat.messages !== prevProps.chat.messages){
            this.setState({messages: this.props.chat.messages});
            midflage = true;
        }
        if(this.state.checkloadingchatMSG && this.props.chat.messages){
            this.setState({messages: this.props.chat.messages});
            this.setState({checkloadingchatMSG:false});
        }
        if(this.props.contacts.entities !== prevProps.contacts.entities){
            this.setState({contacts: this.props.contacts.entities});
            let num = 0;
            let midcontact =null;
            if(this.state.contacts && this.state.contacts !== null){
                midcontact  = Object.values(this.state.contacts);
            }
            if(midcontact && midcontact !==null && midcontact.length){
                midcontact.map((item)=>{
                        if(item.unread && item.unread>0){
                            num +=item.unread;
                        }
                });
            }
            this.setState({unreadMSGnum: num});
            this.setState({chatunread: num});
        }
        if(this.props.chatUser !== prevProps.chatUser){
            this.setState({chatUser: this.props.chatUser});
        }
        if(this.state.contacts && this.state.contacts !== null && this.state.messages && this.state.messages !== null && this.state.chatUser && this.state.chatUser !== null && this.state.chatUser.id && this.state.chatUser.id !== null){
            let msg = Object.values(this.state.messages);
            let chatMSG =[];
            let midMSG = '';
            msg.map((item)=>{
                let checkMSG=[];
                item.map((subitem)=>{
                    if(subitem['who'] !== this.state.chatUser.id && subitem['message']){
                        checkMSG.push(subitem);
                    }
                });
                checkMSG.sort(function (a,b) {
                    return (new Date(b['time']))-(new Date(a['time']));
                });
                if(checkMSG.length)
                    chatMSG.push(checkMSG[0]);
            });
            if(chatMSG && chatMSG.length && JSON.stringify(chatMSG) !== JSON.stringify(this.state.chatMSG)){
                chatMSG.sort(function (a,b) {
                    return (new Date(b['time']))-(new Date(a['time']));
                });
                if(JSON.stringify(chatMSG) !== JSON.stringify(this.state.chatMSG)){
                    this.setState({chatMSG: chatMSG});
                }
            }
        }
        if(this.props.chatpanelshowstatus !== this.state.chatpanelshowstatus){
            this.setState({
                chatpanelshowstatus   :this.props.chatpanelshowstatus,
            });
        }


    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login.IsSuccess && !nextProps.login.bLoadedMenu){
            this.setState({region: nextProps.login.defaultRegionId});
        }
    }
    chatPanelshowbtn=()=>{
        this.props.openChatPanel();
    }
    mailnotificationchat=()=>{
        this.props.openChatPanel();
        this.shownotification();
    }
    openchatpanel=()=>{
        this.props.changechatpanelshowstatus();
        this.props.openChatPanel();
    }
    closechatpanel=()=>{
        this.props.changechatpanelshowstatus();
        this.props.closeChatPanel();
    }
    handleContactClick = (contactId) => {
        if(contactId && contactId != null){
            let contactid =contactId;
            let chatid = null;
            this.state.chatUser.chatList.map((item)=>{
                if(item.contactId ===contactid){
                    chatid = item.chatId;
                }
            });
            if(chatid && chatid !=null){
                this.props.openChatPanel();
                this.props.getChat(chatid, contactid);
            }
        }
        else{
            return null;
        }

    };
    systemreadmake=()=>{
        this.setState({unreadMSGnum:0});

    };

    handleNotificationChange = (event, value) => {
        this.setState({value});
    };
    systemitemnotification =(e)=>{
        this.props.history.push('/notification/system/'+e);
    };

    closenotification=(param)=>{
        let midMSG = this.state.MSG;
        let getMsg =[];
        if(param !== null){
            midMSG.map((item)=>{
                if(item!==param){
                    getMsg.push(item);
                }
            });
        }
        this.setState({MSG:getMsg});


    }
    render()
    {
        const {classes, user, logout, openChatPanel} = this.props;
        const {userMenu,value} = this.state;
        return (
            <div className={classNames(classes.root, "flex flex-row")}>
                {this.state.sysflage === true && (
                    <div style={{width:'0px',height:'0px',}}>
                        <ReactPlayer url='/assets/audios/sysmessage.mp3' playing />
                    </div>
                )}
                <div className="flex flex-1">
                    <FuseShortcuts/>

                </div>
                <div className="flex">
                    <FuseAnimate delay={300}>
                        <Button className="h-64" onClick={this.userMenuClick}>
                            {user.data.photoURL ?
                                (
                                    <Avatar className="" alt="user photo" src={this.props.login.profilePhoto}/>
                                )
                                :
                                (
                                    <Avatar className="">
                                        {user.data.displayName[0]}
                                    </Avatar>
                                )
                            }
                            <div className="hidden md:flex flex-col ml-12 items-start">
                                <Typography component="span" className="normal-case font-600 flex">
                                    {this.props.login.firstName}&nbsp;&nbsp;{this.props.login.lastName}
                                </Typography>
                                <Typography className="text-11 capitalize" color="textSecondary">
                                    {this.props.login.role}
                                </Typography>
                            </div>
                            <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
                        </Button>
                    </FuseAnimate>
                    {this.props.login.IsSuccess && (
                        <form autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <Select
                                    className="region-select"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    name='region'
                                    defaultValue={this.props.login.DefaultRegionId}
                                    value={parseInt(this.state.region)}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'region',
                                        id  : 'region-select'
                                    }}
                                >
                                    {this.props.login.all_regions.map((region, index)=>{
                                        return (
                                            <MenuItem key={index} style={{paddingLeft: '10px'}} value={region.regionid}>{region.regionname}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classNames(classes.formControl) }>
                                <TextField
                                    select
                                    name="period"
                                    value={this.state.period}
                                    onChange={this.handleChange}
                                    className="period-select"
                                    InputProps={{
                                        name: "period",
                                        classes: {
                                            input: classes.input2,
                                        },
                                    }}
                                    fullWidth
                                >
                                    {this.props.all_periods.map((p, index)=>{
                                        return (<MenuItem key={index} value={p}>{p}</MenuItem>)
                                    })}
                                </TextField>
                            </FormControl>
                        </form>
                    )}
                    <Popover
                        open={Boolean(userMenu)}
                        anchorEl={userMenu}
                        onClose={this.userMenuClose}
                        anchorOrigin={{
                            vertical  : 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical  : 'top',
                            horizontal: 'center'
                        }}
                        classes={{
                            paper: "py-8"
                        }}
                    >
                        {user.role === 'guest' ? (
                            <React.Fragment>
                            <MenuItem component={Link} to="/pages/profile" onClick={this.userMenuClose}>
                               <ListItemIcon>
                                   <img src={this.props.login.profilePhoto} alt="user" style={{width: 32, height: 32, borderRadius: 30}}/>
                               </ListItemIcon>
                               <ListItemText className="pl-0" primary="My Profile"/>
                            </MenuItem>
                            <MenuItem
                            onClick={() => {
                            this.props.logout();
                            this.userMenuClose();
                            this.props.history.push('/auth/signin');
                        }}
                            >
                            <ListItemIcon>
                            <Icon>input</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="SignOut"/>
                            </MenuItem>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <MenuItem component={Link} to="/pages/profile" onClick={this.userMenuClose}>
                                    <ListItemIcon>
                                        <Icon>account_circle</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="My Profile"/>
                                </MenuItem>
                                <MenuItem component={Link} to="/apps/mail" onClick={this.userMenuClose}>
                                    <ListItemIcon>
                                        <Icon>mail</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="Inbox"/>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                        this.userMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <Icon>exit_to_app</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="Logout"/>
                                </MenuItem>
                            </React.Fragment>
                        )}
                    </Popover>

                    <div className={classes.separator}/>
                        <div onClick={this.shownotification}>
                                <div className={classes.unreadBadge}>
                                    {this.state.unreadMSGnum && this.state.unreadMSGnum !=="0" && (
                                        this.state.unreadMSGnum
                                    )}
                                </div>
                            <IconButton className="w-64 h-64" >
                                <Icon>chat</Icon>
                            </IconButton>
                        </div>
                    {this.state.notification && (
                        <ClickAwayListener onClickAway={() => this.shownotification()}>
                        <div className={classes.notificationbody}>
                            <div className={classes.chatheader} style={{display:"none"}}>

                                <div className={classes.chatheader} style={{display:"none"}}>
                                    <Button className={classes.mainnotificationbtns} onClick={()=>{this.shownotification()}}>Close</Button>
                                </div>
                            </div>
                            <Paper style={{maxHeight: 350, overflow: 'auto'}}>

                                    <List component="nav" className={classes.notificationroot} >

                                        { this.state.MSG && this.state.MSG !== null && (
                                            this.state.MSG.map((item,index)=>{
                                                if(index < 15){
                                                    if(item.who && item.who !== null){
                                                        return (
                                                            <div key={index}>
                                                                <ListItem button style ={{height:'55px',}} onClick={() => this.handleContactClick(item.who)}>
                                                                    <React.Fragment>
                                                                        {this.state.contacts && this.state.contacts !== null && (
                                                                            this.state.contacts.map((contact,i)=>{
                                                                                if(contact && contact != null && contact.id ===item.who){
                                                                                    return(
                                                                                        <div key={i}  style={{textAlign: '-webkit-center',height:'40px',width:'50px'}}>
                                                                                            <Avatar className={classes.avatarresize} alt={contact.name} src ={contact.avatar} />
                                                                                            <span style={{fontSize:'12px'}}>{contact.name}</span>
                                                                                        </div>

                                                                                    )
                                                                                }
                                                                            })
                                                                        )}
                                                                    </React.Fragment>
                                                                    <span style={{
                                                                        fontSize:'15px',width:'350px',paddingLeft:'16px',paddingRight:'16px',textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                    }}>{item.message}<br/><span style={{fontSize:'9px'}}>{moment(item.time).format('DD/MM/YYYY')}</span></span><br/>
                                                                    <div>
                                                                        <IconButton onClick={(e)=>{e.stopPropagation();this.closenotification(item)}}><Icon>close</Icon></IconButton>
                                                                    </div>

                                                                    {/*<Typography style={{fontSize:'9px'}}>{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>*/}
                                                                    {/*<ListItemText style={{fontSize:'0.7em'}} primary={item.message} secondary={moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}/>*/}
                                                                </ListItem>
                                                                <Divider className="my-0.5"/>
                                                            </div>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <div key={index} >
                                                                <ListItem button key={item.id} onClick={()=>{this.setState({sysnotificationSeletedID:item.id});this.systemitemnotification(item.id)}} style ={{height:'55px'}} >
                                                                    <React.Fragment>
                                                                        <div style={{textAlign: '-webkit-center',height:'40px',width:'50px'}}>

                                                                            <div><Icon>notifications</Icon></div>
                                                                            <span style={{fontSize:'12px'}}>{item.subject}</span>
                                                                        </div>
                                                                    </React.Fragment>
                                                                    <span style={{
                                                                        fontSize:'15px',width:'350px',paddingLeft:'16px',paddingRight:'16px',textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                    }}>{item.message}<br/><span style={{fontSize:'9px'}}>{moment(item.time).format('DD/MM/YYYY')}</span></span><br/>
                                                                    <div>
                                                                        <IconButton onClick={(e)=>{e.stopPropagation();this.closenotification(item)}}><Icon>close</Icon></IconButton>
                                                                    </div>
                                                                </ListItem>
                                                                <Divider className="my-0.5"/>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })
                                        )}
                                        { !1 && value === 0 && this.state.chatMSG && this.state.chatMSG.length &&  (
                                            this.state.chatMSG.map((item, index)=>{
                                                if(index < 15)
                                                    return (
                                                        <div key={index}>
                                                            <ListItem button style ={{height:'55px'}} onClick={() => this.handleContactClick(item.who)}>
                                                                <React.Fragment>
                                                                    {this.state.contacts && this.state.contacts !== null && (
                                                                        this.state.contacts.map((contact,i)=>{
                                                                            if(contact && contact != null && contact.id ==item.who){
                                                                                return(
                                                                                    <div key={i} style ={{height:'40px',textAlign: '-webkit-center'}}>
                                                                                        <Avatar className={classes.avatarresize} alt={contact.name} src ={contact.avatar} />
                                                                                        <span style={{fontSize:'12px'}}>{contact.name}</span>
                                                                                    </div>

                                                                                )
                                                                            }
                                                                        })
                                                                    )}
                                                                </React.Fragment>
                                                                <span style={{
                                                                    fontSize:'15px',width:'250px',paddingLeft:'16px',paddingRight:'16px',textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                }}>{item.message}<br/><span style={{fontSize:'9px'}}>{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</span></span><br/>
                                                                {/*<Typography style={{fontSize:'9px'}}>{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>*/}
                                                                {/*<ListItemText style={{fontSize:'0.7em'}} primary={item.message} secondary={moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}/>*/}
                                                            </ListItem>
                                                            <Divider className="my-0.5"/>
                                                        </div>
                                                    )
                                            })

                                        )
                                        }
                                        {!1 && value === 1 && this.state.pusherMSG && this.state.pusherMSG != null &&  (
                                            this.state.pusherMSGList.map((item,index)=>{
                                                return (
                                                <div key={index} >
                                                    <ListItem button key={item._id} onClick={()=>{this.setState({sysnotificationSeletedID:item.id});this.systemitemnotification(item.id)}} style ={{height:'55px'}} >
                                                        <React.Fragment>
                                                            <div style ={{height:'40px',textAlign: '-webkit-center'}}>
                                                                <Avatar className={classes.avatarresize} alt={this.props.login.firstName + this.props.login.lastName} src ={this.props.login.profilePhoto} />
                                                                <span style={{fontSize:'12px'}}>{item.subject}</span>
                                                            </div>
                                                        </React.Fragment>
                                                        <span style={{
                                                            fontSize:'15px',width:'250px',paddingLeft:'16px',paddingRight:'16px',textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                        }}>{item.message}<br/><span style={{fontSize:'9px'}}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span></span><br/>
                                                    </ListItem>
                                                    <Divider className="my-0.5"/>
                                                </div>
                                                )
                                            })

                                        )}
                                    </List>




                            </Paper>
                            {/*<div>*/}
                                {/*<Button className={classes.morebtn} color="inherit" onClick={this.showchatPanel}>*/}
                                    {/*{this.props.getchatnotification && (*/}
                                        {/*<span>Hidden ChatPanel</span>*/}
                                    {/*)}*/}
                                    {/*{!this.props.getchatnotification && (*/}
                                        {/*<span>More</span>*/}
                                    {/*)}*/}
                                {/*</Button>*/}
                            {/*</div>*/}
                        </div>

                        </ClickAwayListener>

                    )}
                </div>
                { this.state.adminVersionStatus && this.state.adminMSG.version !== null && (
                    <div style={{position:"absolute"}}>
                    <VersionUpgradeDialog
                        show={this.state.adminVersionStatus}
                        version={this.state.adminMSG.version}
                        note ={this.state.adminMSG.note}
                    />
                    </div>
                )}


                {1 && (

                    <div className={classNames(classes.chattogglebtn,"chattogglebtnview")}>
                        <IconButton onClick={this.chatPanelshowbtn} style={{
                            // visibility: 'hidden',
                            backgroundColor: '#3c93ec',
                            borderRadius: '50%',
                            color: 'white',
                            // width: '64px',
                            // height: '64px',
                        }}>
                            <Icon>forum</Icon>
                        </IconButton>
                    </div>


                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleQuickPanel                : quickPanelActions.toggleQuickPanel,
        logout                          : authActions.logoutUser,
        setRegionId                     : authActions.changeRegionId,
        changeDefaultPeriod             : authActions.changeDefaultPeriod,
        openChatPanel                   : chatPanelActions.openChatPanel,
        getChat                         : chatPanelActions.getChat,
        loadedMenu                      : authActions.loadedMenu,
        chatnotificationstatus          : Actions.chatnotificationstatus,
        closeChatPanel                  : chatPanelActions.closeChatPanel,
        changechatpanelshowstatus       : chatPanelActions.changechatpanelshowstatus,
        addpushernotification           : MainActions.addnotification,
        showMessage                     : MainActions.showMessage,
        hideMessage                     : MainActions.hideMessage,
        changebillrunstatus             : MainActions.changebillrunstatus,

    }, dispatch);
}


function mapStateToProps({auth,chatPanel,contactsApp,notification,billruns})
{
    return {
        user                    : auth.user,
        login                   : auth.login,
        all_periods             : auth.login.all_periods,
        defaultPeriod           : auth.login.defaultPeriod,
        chat                    : chatPanel.chat,
        IndividualChat          : chatPanel.IndividualChat,
        contacts                : chatPanel.contacts,
        chatUser                : chatPanel.user,
        getchatnotification     : chatPanel.IndividualChat.chatnotificationstatus,
        chatpanelshowstatus     : chatPanel.IndividualChat.chatpanelshowstatus,
        getpusherNotificationDB : notification.pusherMSGDB,
        billstatus              : billruns.billrunstatus,
        loading                 : billruns.loadingstatus,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainToolbar)));
