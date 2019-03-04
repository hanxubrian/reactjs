import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';
import {CircularProgress,Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import * as ChatActions from '../../../chatPanel/store/actions';
import ReactTable from "react-table";
import classNames from 'classnames';
import JanikingPagination from 'Commons/JanikingPagination';
// import withReducer from 'store/withReducer';
// import reducer from './store/reducers';
import IndividualChat from '../../../chatPanel/individualChat';
import "../../../chatPanel/individualChat.css";
import _ from 'lodash';


const hexToRgb = (hex) =>{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const styles = theme => ({
    // react-bootstrap-table:{
    //     height: '500px',
    //     overflow: 'auto',
    // },
    reacttableheader:{
        fontSize: '1.6rem',
        fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
        fontWeight: 400,
        lineHeight: 1.75,
        color: 'white',
        background:theme.palette.secondary.main,
        border:'1px solid rgba(255,255,255,.6)',
    },
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
            border: '1px solid coral',
            display: 'none'
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
    },
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
    progress: {
        margin: theme.spacing.unit * 2,
    },
    cwidth:{
        marginTop: '8%',
        height:'90%',
    }

});
const defaultavatar ='https://res.cloudinary.com/janiking/image/upload/v1547085033/apps/users/generic.jpg';
class ContactsList extends Component {

    state = {
        selectedContactsMenu   : null,
        isOpen                 : true,
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
            // console.log('chatDetail', nextProps.chatDetail)
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
                if(item['contactId']===this.state.currentSeletedchatId){
                    this.setState({
                        chatId : item['chatId'],
                    });
                }
            });
        }
        if(!this.state.isOpen && this.state.chatId && this.state.chatId !==null){
            this.openChat();
        }
        if(this.props !== prevProps && this.state.chatId && this.state.chatId !== null){
                let msg = this.state.chatDetail.messages;
                this.setState({
                    individualchatDetail:msg[this.state.chatId],
                })
        }
        if(this.state.currentRoom === null || this.state.chatId !== prevState.chatId){
                this.state.chatDetail.rooms.map((item, index)=>{
                   if(item.id === this.state.chatId){
                       if(this.state.currentRoom !==item){
                           this.setState({
                               currentRoom:item,
                           });
                           this.props.individualcurrentChat(item);
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
    mgetFilteredArray = (entities) => {

        let userid = this.props.login.UserId;
        let mid = _.filter(entities, function(o) { return o.id!==userid; });
        return mid;
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
    openchatpaneldetail=(row)=>{
        console.log("row",row);
        let chatlist = this.props.chatUser.chatList;
        let contact = row.name;
        let chatid = null;
        chatid =_.find(chatlist,{contactId:contact});
        console.log(chatlist);
        console.log(chatid, contact);
        if(chatid && chatid !== null && contact && contact !== null && chatid.chatId){
            this.props.openChatPanel();
            this.props.getChat(chatid.chatId,contact);
        }

    }
    getMsgInfo=(userId,userInfo)=>{
        if(userId && userId !=null){
            this.setState({
                currentSeletedchatId: userId,
                selectedUserDetail  : userInfo,
            });
            let msg      = this.state.chatDetail.messages;
            let chatlist = this.state.chatUser.chatList;
            console.log("userId",userId);
            console.log("userInfo",userInfo);
            if(userId && userId !== null){
                this.setState({
                    chatId : userId,
                });
            }
        }
    }
    render()
    {
        const {classes, contacts, user, searchText, selectedContactIds, selectAllContacts, deSelectAllContacts, toggleInSelectedContacts, removeContacts, removeContact, toggleStarredContact, setContactsUnstarred, setContactsStarred,state, openChat} = this.props;
        let midcontact = this.mgetFilteredArray(contacts);
        const data = this.getFilteredArray(midcontact, searchText);
        const {selectedContactsMenu} = this.state;
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
            <div className="flex-1 flex-col cwidth absolute" style={{marginTop:'80px',height:window.innerHeight-150,width: '-webkit-fill-available',}}>

            {/*<FuseAnimate*/}
                {/*animation="transition.slideUpIn" delay={300}*/}
            {/*>*/}
                <ReactTable
                    // className={classNames(classes.root, "-striped -highlight border-0")}
                    minRows = {0}
                    PaginationComponent={JanikingPagination}
                    getTheadGroupProps={(state, rowInfo, column, instance) =>{
                        return {
                            style:{
                                // padding: "10px 10px",
                                fontSize: 16,
                                fontWeight: 700
                            },
                        }
                    }}

                    getTheadThProps={(state, rowInfo, column, instance) =>{
                        let border = '1px solid rgba(255,255,255,.6)';
                        if(column.Header==='Actions') border = 'none';
                        return {
                            className: classes.reacttableheader
                        }
                    }}

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
                                <Avatar className="mr-8" alt={row.original.name} src={row.value?row.value:defaultavatar}/>
                            ),
                            className: "justify-center",
                            width    : 64,
                            sortable : false
                        },
                        {
                            Header    : "Name",
                            accessor  : "firstName",
                            Cell      : row=>(
                               <div>{row.original.firstName}  {row.original.lastName}</div>
                            ),
                            className : "font-bold justify-center",
                            width    : 200,
                        },
                        {
                            Header    : "Email",
                            accessor  : "email",
                            className: "justify-center",
                            // filterable: true,
                            width    : 300,
                        },
                        {
                            Header    : "Phone",
                            accessor  : "phone",
                            className: "justify-center",
                            // filterable: true
                        },
                        {
                            Header    : "DepartMent",
                            accessor  : "company",
                            className : "justify-center",
                            width     : 150,
                            // filterable: true
                        },
                        {
                            Header    : "Region",
                            accessor  : "defaultRegion",
                            className : "font-bold justify-center",
                            Cell      : row=>{
                                let re =_.find(row.original.region,{RegionId:row.original.defaultRegion});
                                return(
                                    <div>{re?re.Name:''}</div>
                                )
                            },
                            width     : 150,
                            // filterable: true
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
                                            // openChat(row.original.id);
                                            this.openchatpaneldetail(row.original);
                                            // this.getMsgInfo(row.original.name,row.original);
                                        }}
                                        className={classes.chatIcon}
                                    >
                                        <Icon>chat</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={50}
                    noDataText="No contacts found"
                    style={{
                        height: '100%',

                    }}
                    totalRecords = {data.length}

                />

            {/*</FuseAnimate>*/}




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
        individualcurrentChat   : ChatActions.IndividualsetCurrentRoom,
        openChatPanel           : ChatActions.openChatPanel,
        getChat                 : ChatActions.getChat,
        closeChatPanel          : ChatActions.closeChatPanel
    }, dispatch);
}

function mapStateToProps({contactsApp,chatPanel,auth})
{
    return {
        contacts                   : contactsApp.contacts.entities,
        selectedContactIds         : contactsApp.contacts.selectedContactIds,
        searchText                 : contactsApp.contacts.searchText,
        user                       : contactsApp.user,
        openchatpanelstatus        : contactsApp.openchatpanelstatus,
        // contacts                : chatPanel.contacts.entities,
        selectedContactId          : chatPanel.contacts.selectedContactId,
        state                      : chatPanel.state,
        chatDetail                 : chatPanel.chat,
        chatUser                   : chatPanel.user,
        login                      : auth.login,
        currentRoom                : chatPanel.chat.currentRoom,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsList)));
