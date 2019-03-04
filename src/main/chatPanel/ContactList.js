import React, {Component} from 'react';
import {
    withStyles,
    Button,
    Avatar,
    Divider,
    Tooltip
} from '@material-ui/core';
import classNames from 'classnames';
import {FuseScrollbars, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import ReactPlayer from 'react-player'
import _ from 'lodash';

const styles = theme => ({
    root         : {
        background: theme.palette.background.default
    },
    contactButton: {
        width           : 70,
        minWidth        : 70,
        flex            : '0 0 auto',
        '&.active:after': {
            position              : 'absolute',
            top                   : 8,
            right                 : 0,
            bottom                : 8,
            content               : "''",
            width                 : 4,
            borderTopLeftRadius   : 4,
            borderBottomLeftRadius: 4,
            backgroundColor       : theme.palette.primary.main
        }
    },
    unreadBadge  : {
        position       : 'absolute',
        minWidth       : 18,
        height         : 18,
        top            : 4,
        left           : 10,
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
        zIndex         : 10
    },
    status       : {
        position    : 'absolute',
        width       : 12,
        height      : 12,
        bottom      : 4,
        left        : 44,
        border      : '2px solid ' + theme.palette.background.default,
        borderRadius: '50%',
        zIndex      : 10,

        '&.online': {
            backgroundColor: '#4CAF50'
        },

        '&.do-not-disturb': {
            backgroundColor: '#F44336'
        },

        '&.unknown': {
            backgroundColor: '#FFC107'
        },

        '&.offline': {
            backgroundColor: '#646464'
        }
    },
    chatcontactview:{
        background: theme.palette.background.default
    },
});

class ContactList extends Component {

    constructor() {
        super();
        this.state = {
            flage       : false,
            individualcurrentRoom: null,
        }

    }
    componentDidMount(){
        this.props.initChat();
        this.props.getContacts();
        setInterval(this.tick, 5000);
    }
    componentDidUpdate(prevProps){
        if(this.props.contacts !== prevProps.contacts){
            this.props.contacts.map((item,index)=>{
                if(item.unread && item.unread>0 && !this.state.flage){
                    this.setState({flage: !this.state.flage});
                    setTimeout(
                        function() {
                            this.messagenotification();
                        }
                            .bind(this),
                        1000
                    );

                }
            });
        }
        if(this.props.individualcurrentRoom && this.props.individualcurrentRoom !== null && JSON.stringify(this.props.individualcurrentRoom) !== JSON.stringify(prevProps.individualcurrentRoom)){
            this.openindividual(this.props.individualcurrentRoom);
        }
    }
    openindividual=(val)=>{
        let currentroom = val;
        let id = val.id;
        let userIds = val.userIds;
        let me = this.props.login.username;
        let contacts =null;
        userIds.map((item)=>{
            if(item !== me){
                contacts = item;
                return;
            }
        });

    }
    messagenotification=()=>{
        this.setState({flage: !this.state.flage});

    }
    tick = () => {
        this.props.checkChatUserData();
    };

    handleContactClick = (chatId, contactId) => {
        this.props.openChatPanel();
        this.props.getChat(chatId, contactId);
        this.scrollToTop();
    };

    scrollToTop = () => {
        this.contactListScroll.scrollTop = 0;
    };

    render()
    {

        const {classes, chat, contacts, user, selectedContactId,contactuserList} = this.props;
        // console.log("user.contacts",contacts);
        // console.log("user.contacts.length",contacts.length);
        // console.log("user.contactuserList",contactuserList);
        let midcontacts = [];//avatar: "assets/images/avatars/1Velazquez.jpg"
        if(contacts && contacts !== null && contacts.length && contactuserList && contactuserList !== null && contactuserList.length>0){
            contacts.map((item)=>{
                let miditem = item;

                if(item.avatar ==="assets/images/avatars/1Velazquez.jpg"){
                    let mcontact = contactuserList.find((_item) => _item.name === item.id);
                    miditem.avatar =mcontact.avatar;
                }
                midcontacts.push(miditem);
            });
        }





        const ContactButton = ({chat, contact}) => {
            return (
                <Tooltip title={contact.name} placement="left">
                    <Button
                        onClick={() => this.handleContactClick(chat.chatId, contact.id)}
                        className={classNames(classes.contactButton, {'active': (selectedContactId === contact.id)})}
                    >
                        {contact.unread !==0 && (
                            <div className={classes.unreadBadge}>{contact.unread}</div>
                        )}
                        <div className={classNames(contact.status, classes.status)}/>
                        <Avatar
                            src={contact.avatar}
                            alt={contact.name}
                        >
                            {!contact.avatar || contact.avatar === '' ? contact.name[0] : ''}
                        </Avatar>
                    </Button>
                </Tooltip>
            )
        };

        return (
            <div className={classNames(classes.chatcontactview)} >
            <FuseScrollbars
                className={classNames(classes.root, "flex flex-no-shrink flex-col overflow-y-auto py-8")}
                containerRef={(ref) => {
                    this.contactListScroll = ref
                }}
            >
                {!chat.loading && contacts.length > 0 && (
                    <React.Fragment>
                        <FuseAnimateGroup
                            enter={{
                                animation: "transition.expandIn"
                            }}
                            className="flex flex-col flex-no-shrink"
                        >
                            {(user && user.chatList) &&
                            user.chatList.sort((a, b) => { return new Date(b.lastMessageTime) - new Date(a.lastMessageTime)}).map(chat => {
                                const contact = contacts.find((_contact) => _contact.id === chat.contactId);
                                return (
                                    contact? <ContactButton key={contact.id} contact={contact} chat={chat}/> : ''
                                )
                            })}
                           {/*  <Divider className="mx-24 my-8"/>
                            {contacts.map(contact => {
                                const chatContact = user.chatList.find((_chat) => _chat.contactId === contact.id);
                                return !chatContact ? <ContactButton key={contact.id} contact={contact}/> : '';
                            })} */}
                        </FuseAnimateGroup>
                    </React.Fragment>
                )}

            </FuseScrollbars>
                {this.state.flage && (
                    <div style={{width:'0px',height:'0px',}}>
                        <ReactPlayer url='/assets/audios/message.mp3' playing />
                    </div>
                )}
                </div>
        );
    };
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        initChat        : Actions.initChat,
        checkChatUserData       : Actions.checkChatUserData,
        getChat         : Actions.getChat,
        openChatPanel   : Actions.openChatPanel,
        getContacts                     : Actions.getContacts,
    }, dispatch);
}

function mapStateToProps({chatPanel,contactsApp,auth})
{
    return {
        chat             : chatPanel.chat,
        contacts         : chatPanel.contacts.entities,
        selectedContactId: chatPanel.contacts.selectedContactId,
        user             : chatPanel.user,
        login                   : auth.login,
        contactuserList             : contactsApp.contacts.entities,
        individualcurrentRoom       : chatPanel.IndividualChat.individualChatcurrentRoom,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ContactList));

