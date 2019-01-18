import React, {Component} from 'react';
import withReducer from 'store/withReducer';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener,TextField, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FuseScrollbars} from '@fuse';
import Input from '@material-ui/core/Input';
import axios from 'axios/index';
// import Pusher from 'pusher-js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment/moment';
import "./individualChat.css";

const styles = theme => ({
    messageRow  : {
        position                          : 'relative',
        display                           : 'flex',
        flexDirection                     : 'column',
        alignItems                        : 'flex-start',
        justifyContent                    : 'flex-end',
        padding                           : '0 5px 4px 40px',
        flex                              : '0 0 auto',
        '&.contact'                       : {
            '& $bubble'       : {
                backgroundColor        : theme.palette.primary.main,
                color                  : theme.palette.primary.contrastText,
                borderTopLeftRadius    : 5,
                borderBottomLeftRadius : 5,
                borderTopRightRadius   : 20,
                borderBottomRightRadius: 20,
                '& $time'              : {
                    marginLeft: 12
                }
            },
            '&.first-of-group': {
                '& $bubble': {
                    borderTopLeftRadius: 20
                }
            },
            '&.last-of-group' : {
                '& $bubble': {
                    borderBottomLeftRadius: 20
                }
            }
        },
        '&.me'                            : {
            paddingLeft: 40,

            '& $avatar': {
                order : 2,
                margin: '0 0 0 16px'
            },

            '& $bubble'       : {
                marginLeft             : 'auto',
                backgroundColor        : theme.palette.grey[300],
                color                  : theme.palette.getContrastText(theme.palette.grey[300]),
                borderTopLeftRadius    : 20,
                borderBottomLeftRadius : 20,
                borderTopRightRadius   : 5,
                borderBottomRightRadius: 5,
                '& $time'              : {
                    justifyContent: 'flex-end',
                    right         : 0,
                    marginRight   : 12
                }
            },
            '&.first-of-group': {
                '& $bubble': {
                    borderTopRightRadius: 20
                }
            },

            '&.last-of-group': {
                '& $bubble': {
                    borderBottomRightRadius: 20
                }
            }
        },
        '&.contact + .me, &.me + .contact': {
            paddingTop: 20,
            marginTop : 20
        },
        '&.first-of-group'                : {
            '& $bubble': {
                borderTopLeftRadius: 20,
                paddingTop         : 13
            }
        },
        '&.last-of-group'                 : {
            '& $bubble': {
                borderBottomLeftRadius: 20,
                paddingBottom         : 13,
                '& $time'             : {
                    display: 'flex'
                }
            }
        }
    },
    avatar      : {
        position: 'absolute',
        left    : -7,
        margin  : 0
    },
    bubble      : {
        position      : 'relative',
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        padding       : 12,
        maxWidth      : '100%'
    },
    message     : {
        whiteSpace: 'pre-wrap',
        lineHeight: 1.2
    },
    time        : {
        position  : 'absolute',
        display   : 'none',
        width     : '100%',
        fontSize  : 11,
        marginTop : 8,
        top       : '100%',
        left      : 0,
        whiteSpace: 'nowrap'
    },
    bottom      : {
        background: theme.palette.background.default,
        borderTop : '1px solid rgba(0, 0, 0, 0.13)'
    },
    inputWrapper: {
        borderRadius: 24
    }
});

class IndividualChat extends Component {
    constructor() {
        super();

        this.state = {
            sendMSG     : "",
            messages    : null,
            seletedUser : null,
            userdetail  : null,
            currentUser : null,
            user        : null,
            contacts    : null,
            currentRoom : null,
            isOpen      : false,
            flage       : false,
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props !=prevProps){
            let msg = this.props.message;
            if(this.props.message && this.props.message !==null){
                this.setState({
                    messages:   this.props.message,
                })

            }
            if(this.props.userdetail && this.props.userdetail !== null){
                this.setState({
                    userdetail:   this.props.userdetail,
                })
            }
            if(this.props.currentUser && this.props.currentUser !== null){
                this.setState({
                    currentUser:   this.props.currentUser,
                })
            }
            if(this.props.user && this.props.user !== null){
                this.setState({
                    user:   this.props.user,
                })
            }
            if(this.props.contacts && this.props.contacts !== null){
                this.setState({
                    user:   this.props.contacts,
                })
            }
            if(this.props.currentRoom && this.props.currentRoom !== null){
                this.setState({
                    currentRoom:   this.props.currentRoom,
                })
            }
            if(this.props.user !=prevProps.user && this.props.user && this.props.user != null){
                this.setState({user: this.props.user});

            }
            if(this.props.show !=null && this.props.show !== prevProps.show){
                this.setState({isOpen: this.props.show});
            }
            if(!this.props.show && this.props.individualcurrentRoom && this.props.individualcurrentRoom != null && !this.state.flage){
                this.setState({
                    flage   : true,
                })
            }

            this.individualChatRoom();
        }
    }
    componentWillMount(){
        //|| (!this.props.show && this.props.individualcurrentRoom && !this.state.isOpen)
        // if(this.props.show || (this.props.show === "undefined" && this.props.individualcurrentRoom && this.props.individualcurrentRoom != null)){
        //     this.setState({
        //         isOpen: true,
        //     })
        // }
        // if(this.props.individualcurrentRoom && this.props.individualcurrentRoom != null && !this.props.show){
        //     this.setState({
        //         isOpen: true,
        //     })
        // }

        this.individualChatRoom();
    }
    individualChatRoom=()=>{
        if(this.props.individualcurrentRoom && this.props.individualcurrentRoom != null){
            let ChatId = this.props.individualcurrentRoom.id;
            let createdBy = this.props.individualcurrentRoom.createdByUserId;
            let msg = this.props.chat.messages[ChatId];
            let currentUserName = this.props.chat.currentUser.id;
            let userDetail = null;
            let userId ='';
            this.props.individualcurrentRoom.userIds.map((item,index)=>{
                if(item!==currentUserName){
                    userId = item;
                }
            });
            if(userId && userId !=null){
                this.props.contact.map((item)=>{
                    if(item['id']==userId){
                        userDetail = item;
                    }
                });
            }
            // console.log("#############ChatId",ChatId);
            // console.log("#############msg",msg);
            // console.log("#############this.props.chat.messages",this.props.chat.messages);
            // console.log("#############userId",userId);
            // console.log("#############this.props.contact",this.props.contact);
            // console.log("#############userDetail",userDetail);
            if(msg && msg != null && userDetail && userDetail != null){
                this.setState({
                    messages    :   msg,
                    userdetail  :   userDetail,
                    currentRoom :   this.props.individualcurrentRoom,
                    user        :   this.props.Chatuser,
                });
            }

        }
        // console.log("#############isopen",this.state.isOpen);
    }
    componentDidMount() {

    }
    componentWillUnmount(){

    }
    isFirstMessageOfGroup = (item, i) => {
        return (i === 0 || (this.state.messages[i - 1] && this.state.messages[i - 1].who !== item.who));
    };

    isLastMessageOfGroup = (item, i) => {
        return (i === this.state.messages.length - 1 || (this.state.messages[i + 1] && this.state.messages[i + 1].who !== item.who));
    };
    handleChange = (e) => {
        this.setState({
            sendMSG: e.target.value
        });

    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onMessageSubmit();
        }
    }
    onMessageSubmit = (ev) => {
        if ( this.state.sendMSG === '' )
        {
            return;
        }
        if(this.state.sendMSG && this.state.sendMSG != null && this.state.currentUser && this.state.currentUser !=null && this.state.currentRoom && this.state.currentRoom != null ){
            // this.props.sendMessage(this.state.sendMSG, this.props.currentUser, this.props.userdetail.id)

            this.props.sendMessage(this.state.sendMSG, this.state.currentRoom);
            this.setState({sendMSG: ''});
            this.scrollToBottom();
        }
        else if(this.props.individualcurrentRoom && this.props.individualcurrentRoom !==null){
            this.props.sendMessage(this.state.sendMSG, this.state.currentRoom);
            this.setState({sendMSG: ''});
            this.scrollToBottom();
        }

    };
    closeChat = () => {

            this.setState({
                isOpen: !this.state.isOpen
            });
    };
    scrollToBottom = () => {
        this.chatScroll.scrollTop = this.chatScroll.scrollHeight;
    };
    render() {
        const {classes, chat, contacts, className} = this.props;
        const {sendMSG,user} = this.state;

        if(this.props.individualcurrentRoom && this.props.individualcurrentRoom != null ){
            return (
            <div className="individual-chat-item">
                <div className="header">
                    <div>
                        <IconButton color="inherit">
                            <Icon>arrow_back</Icon>
                        </IconButton>
                        <span>
                            {this.state.userdetail && this.state.userdetail !==null  && this.state.userdetail.nickname && this.state.userdetail.nickname !=null && (
                                this.state.userdetail.nickname
                                // this.state.userdetail.name
                            )}
                            {this.state.userdetail && this.state.userdetail !==null  && this.state.userdetail.name && this.state.userdetail.name !=null && (
                                this.state.userdetail.name
                            )}

                        </span>

                    </div>
                    <div>
                        <IconButton color="inherit" onClick={this.closeChat}>
                            <Icon>close</Icon>
                        </IconButton>
                    </div>
                </div>
                <FuseScrollbars
                    containerRef={(ref) => {
                        this.chatScroll = ref
                    }}
                    className="flex flex-1 flex-col overflow-y-auto"
                >
                <div className="chat-content">
                    { this.state.messages !=null &&
                        this.state.messages.map((item,i) =>{
                                // const contact = item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
                            let contact = '';
                            if(item.who === this.state.userdetail.name || item.who === this.state.userdetail.id){
                                contact =this.state.userdetail.avatar;
                            }
                                return (
                                    <div
                                        key={item.time}
                                        className={classNames(
                                            classes.messageRow,
                                            {'me': item.who === user.id},
                                            {'contact': item.who !== user.id},
                                            {'first-of-group': this.isFirstMessageOfGroup(item, i)},
                                            {'last-of-group': this.isLastMessageOfGroup(item, i)}
                                        )}
                                    >
                                        {contact && (
                                            <Avatar className={classes.avatar} src={contact}/>
                                        )}

                                        <div className={classes.bubble}>
                                            <div className={classes.message}>{item.message}</div>
                                            <Typography className={classes.time} color="textSecondary">{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                        </div>
                                    </div>
                                )
                        }
                        )
                    }
                </div>
                </FuseScrollbars>
                <div  className={classNames(classes.bottom, "py-16 px-8")}>
                    <Paper className={classNames(classes.inputWrapper, "flex items-center relative")}>
                        <TextField
                            autoFocus={false}
                            id="message-input"
                            className="flex-1"
                            InputProps={{
                                disableUnderline: true,
                                classes         : {
                                    root : "flex flex-grow flex-no-shrink ml-16 mr-48 my-8",
                                    input: ""
                                },
                                placeholder     : "Type your message "
                            }}
                            InputLabelProps={{
                                shrink   : false,
                                className: classes.bootstrapFormLabel
                            }}
                            onKeyPress={this._handleKeyPress}
                            onChange={this.handleChange}
                            value={sendMSG}
                        />
                        <IconButton className="absolute pin-r pin-t" onClick={this.onMessageSubmit} >
                            <Icon className="text-24" color="action">send</Icon>
                        </IconButton>
                    </Paper>
                </div>
            </div>
        );
        }
        else{
            return null;
        }
    }
}
IndividualChat.propTypes = {
    onClose     : PropTypes.func,
    show        : PropTypes.bool,
    children    : PropTypes.node,
    Detail      : PropTypes.object,
    message     : PropTypes.array,
    userdetail  : PropTypes.object,
    currentUser : PropTypes.object,
    user        : PropTypes.object,
    contacts    : PropTypes.object,
    currentRoom : PropTypes.object,
};
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        sendMessage             : Actions.sendMsg,
    }, dispatch);
}
function mapStateToProps({chatPanel})
{
    return {
        contact          :  chatPanel.contacts.entities,
        selectedContactId:  chatPanel.contacts.selectedContactId,
        chat             :  chatPanel.chat,
        Chatuser             : chatPanel.user,
        individualcurrentRoom   : chatPanel.IndividualChat.individualChatcurrentRoom,
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IndividualChat));

// export default withStyles(styles)(IndividualChat);
