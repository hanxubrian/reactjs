import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import * as ChatActions from '../../../chatPanel/store/actions';
import ReactTable from "react-table";
import classNames from 'classnames';

// import withReducer from 'store/withReducer';
// import reducer from './store/reducers';
import IndividualChat from '../../../chatPanel/individualChat';
import "../../../chatPanel/individualChat.css";

const styles = theme => ({
    mailList: {
        padding: 0
    },
    mailItem: {},
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    },
    labels  : {},
    chatIcon : {
        padding: 8
    },
    individualChat: {
        position: 'fixed',
        bottom: 70,
        right: 360,
        zIndex: 10,
        display: 'flex'
    }

});

class ContactsList extends Component {

    state = {
        selectedContactsMenu   : null,
        isOpen                 : false,
        chatDetail             : null,
        individualchatDetail   : null,
        chatUser               : null,
        chatId                 : null,
        currentSeletedchatId   : null,
        selectedUserDetail     : null,
        contacts               : null,
        user                   : null,
        currentRoom            : null,
    };
    componentWillMount(){
        this.setState({
            chatDetail: this.props.chatDetail,
            chatUser  : this.props.chatUser,
            contacts  : this.props.contacts,
            // currentRoom: this.props.chatDetail.currentRoom,
        });
    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.chatDetail && nextProps.chatUser) {
            console.log('chatDetail', nextProps.chatDetail)
            this.setState({
                chatDetail: nextProps.chatDetail,
                chatUser  : nextProps.chatUser,
                user      : nextProps.chatUser,
                contacts  : nextProps.contacts,
                // currentRoom: nextProps.chatDetail.currentRoom,
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.chatDetail!==prevProps.chatDetail){
            this.setState({
                chatDetail: this.props.chatDetail,
            });
        }
        if(this.props.chatUser!==prevProps.chatUser){
            this.setState({
                chatUser  : this.props.chatUser,
                user      : this.props.chatUser,
                contacts  : this.props.contacts,
            });
        }
        if(this.props.chatDetail.currentRoom !== prevProps.chatDetail.currentRoom){
            // this.setState({
            //     currentRoom: this.props.chatDetail.currentRoom,
            // });
        }
        if(this.props.chatUser.chatList !== prevProps.chatUser.chatList && this.state.currentSeletedchatId && this.state.currentSeletedchatId!=null){
            this.props.chatUser.chatList.map((item)=>{
                if(item['contactId']==this.state.currentSeletedchatId){
                    this.setState({
                        chatId : item['chatId'],
                    });
                }
            });
        }
        if(!this.state.isOpen && this.state.chatId && this.state.chatId !==null){
            this.openChat();
            console.log("chatID=============",this.state.chatId);
        }
        if(this.props !== prevProps && this.state.chatId && this.state.chatId !== null){
                let msg = this.state.chatDetail.messages;
                console.log("====================this.state.chatDetail.messages",msg[this.state.chatId]);
                this.setState({
                    individualchatDetail:msg[this.state.chatId],
                })
        }
        console.log("==1==rooms",this.state.chatDetail.rooms);
        console.log("==1==chatID",this.state.chatId);
        console.log("==1==currentRoom",this.state.currentRoom);
        if(this.state.currentRoom == null || this.state.chatId != prevState.chatId){
                this.state.chatDetail.rooms.map((item, index)=>{
                   if(item.id === this.state.chatId){
                       if(this.state.currentRoom !==item){
                           this.setState({
                               currentRoom:item,
                           });
                           console.log("cuurent room",this.state.currentRoom);
                       }
                   }
                });
        }
    }
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedContactMenu = (event) => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };
    openChat = () => {
        if(!this.state.isOpen)
            this.setState({
                isOpen: !this.state.isOpen
            });
    };
    toggleChat = () => {
        if(!this.state.isOpen)
            this.setState({
                isOpen: !this.state.isOpen
            });
    };
    getMsgInfo=(userId,userInfo)=>{
        if(userId && userId !=null){
            this.setState({
                currentSeletedchatId: userId,
                selectedUserDetail  : userInfo,
            });
            let msg      = this.state.chatDetail.messages;
            let chatlist = this.state.chatUser.chatList;
            if(chatlist  && chatlist != null){
                chatlist.map((item)=>{
                    if(item['contactId']==userId){
                        this.setState({
                            chatId : item['chatId'],
                        });
                    }
                });
            }

        }
    }
    render()
    {
        const {classes, contacts, user, searchText, selectedContactIds, selectAllContacts, deSelectAllContacts, toggleInSelectedContacts, removeContacts, removeContact, toggleStarredContact, setContactsUnstarred, setContactsStarred,state, openChat} = this.props;
        const data = this.getFilteredArray(contacts, searchText);
        const {selectedContactsMenu} = this.state;
        console.log("chatDetal====",this.state.chatDetail);
        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no contacts!
                    </Typography>
                </div>
            );
        }

        return (
            <div>
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className={classNames(classes.root, "-striped -highlight border-0")}
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            onClick: (e)=>{
                                e.stopPropagation();
                                // this.openChat();
                                console.log("rowinfo",rowInfo);
                                openChat(rowInfo.original.id);
                                this.getMsgInfo(rowInfo.original.name,rowInfo.original);
                            },
                            className: "cursor-pointer",

                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header   : () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        event.target.checked ? selectAllContacts() : deSelectAllContacts();
                                    }}
                                    checked={selectedContactIds.length === Object.keys(contacts).length && selectedContactIds.length > 0}
                                    indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedContactIds.includes(row.value.id)}
                                        onChange={() => toggleInSelectedContacts(row.value.id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedContactIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedContactsMenu ? 'selectedContactsMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedContactMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedContactsMenu"
                                            anchorEl={selectedContactsMenu}
                                            open={Boolean(selectedContactsMenu)}
                                            onClose={this.closeSelectedContactsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeContacts(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon className={classes.icon}>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setContactsStarred(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon className={classes.icon}>
                                                        <Icon>star</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Starred"/>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setContactsUnstarred(selectedContactIds);
                                                        this.closeSelectedContactsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon className={classes.icon}>
                                                        <Icon>star_border</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Unstarred"/>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </React.Fragment>
                                )
                            ),
                            accessor : "avatar",
                            Cell     : row => (
                                <Avatar className="mr-8" alt={row.original.name} src={row.value}/>
                            ),
                            className: "justify-center",
                            width    : 64,
                            sortable : false
                        },
                        {
                            Header    : "First Name",
                            accessor  : "name",
                            filterable: true,
                            className : "font-bold",
                            width    : 200,
                        },
                        {
                            Header    : "Last Name",
                            accessor  : "lastName",
                            filterable: true,
                            className : "font-bold",
                            width    : 150,
                        },
                     /*    {
                            Header    : "Company",
                            accessor  : "company",
                            filterable: true
                        }, */
                        /* {
                            Header    : "Job Title",
                            accessor  : "jobTitle",
                            filterable: true
                        }, */
                        {
                            Header    : "Email",
                            accessor  : "email",
                            filterable: true,
                            width    : 300,
                        },
                        {
                            Header    : "Phone",
                            accessor  : "phone",
                            filterable: true
                        },
                        {
                            Header: "",
                            width : 128,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            toggleStarredContact(row.original.id)
                                        }}
                                        className={classes.chatIcon}
                                    >
                                        {user.starred && user.starred.includes(row.original.id) ? (
                                            <Icon>star</Icon>
                                        ) : (
                                            <Icon>star_border</Icon>
                                        )}
                                    </IconButton>
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeContact(row.original.id);
                                        }}
                                        className={classes.chatIcon}
                                    >
                                        <Icon>delete</Icon>
                                       
                                    </IconButton>

                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            openChat(row.original.id);
                                        }}
                                        className={classes.chatIcon}
                                    >
                                        <Icon>chat</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No contacts found"
                />

            </FuseAnimate>

                {this.state.isOpen && (
                    <div className={classNames(classes.individualChat, {'closeIndvidualchat': !state})}>
                        {

                            <IndividualChat show ={this.state.isOpen} onClose={this.toggleChat}
                            message ={this.state.individualchatDetail} userdetail = {this.state.selectedUserDetail}
                                            currentUser ={this.state.chatDetail.currentUser}
                                            contacts ={this.state.contacts} user={this.state.chatUser}
                                            currentRoom={this.state.currentRoom}
                            />

                        }

                    </div>
                )}

            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts             : Actions.getContacts,
        getUserData             : Actions.getUserData,
        toggleInSelectedContacts: Actions.toggleInSelectedContacts,
        selectAllContacts       : Actions.selectAllContacts,
        deSelectAllContacts     : Actions.deSelectAllContacts,
        openEditContactDialog   : Actions.openEditContactDialog,
        removeContacts          : Actions.removeContacts,
        openChat                : Actions.openChat,
        removeContact           : Actions.removeContact,
        toggleStarredContact    : Actions.toggleStarredContact,
        toggleStarredContacts   : Actions.toggleStarredContacts,
        setContactsStarred      : Actions.setContactsStarred,
        setContactsUnstarred    : Actions.setContactsUnstarred,

        openChatPanel : ChatActions.openChatPanel,
        closeChatPanel: ChatActions.closeChatPanel
    }, dispatch);
}

function mapStateToProps({contactsApp,chatPanel})
{
    return {
        contacts                   : contactsApp.contacts.entities,
        selectedContactIds         : contactsApp.contacts.selectedContactIds,
        searchText                 : contactsApp.contacts.searchText,
        user                       : contactsApp.user,
        // contacts                : chatPanel.contacts.entities,
        selectedContactId          : chatPanel.contacts.selectedContactId,
        state                      : chatPanel.state,
        chatDetail                 : chatPanel.chat,
        chatUser                   : chatPanel.user,
        currentRoom                :chatPanel.chat.currentRoom,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsList)));
