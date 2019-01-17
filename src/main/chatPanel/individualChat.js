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
import Pusher from 'pusher-js';
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
            messages    : [],
            seletedUser : null,
            userdetail  : null,
            currentUser : null,
            user        : null,
            contacts    : null,
            currentRoom : null,
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props !=prevProps){
            let msg = this.props.message;
            if(this.props.message && this.props.message !==null){
                console.log("get ================================",msg);
                this.setState({
                    messages:   this.props.message,
                })

            }
            if(this.props.userdetail && this.props.userdetail !== null){
                console.log("userdetail ================================",this.props.userdetail);
                this.setState({
                    userdetail:   this.props.userdetail,
                })
            }
            if(this.props.currentUser && this.props.currentUser !== null){
                console.log("currentUser ================================",this.props.currentUser);
                this.setState({
                    currentUser:   this.props.currentUser,
                })
            }
            if(this.props.user && this.props.user !== null){
                console.log("user ================================",this.props.user);
                this.setState({
                    user:   this.props.user,
                })
            }
            if(this.props.contacts && this.props.contacts !== null){
                console.log("contacts ================================",this.props.contacts);
                this.setState({
                    user:   this.props.contacts,
                })
            }
            if(this.props.currentRoom && this.props.currentRoom !== null){
                console.log("contacts ================================",this.props.currentRoom);
                this.setState({
                    currentRoom:   this.props.currentRoom,
                })
            }
        }
    }
    componentDidMount() {
        // Pusher.logToConsole = true;
        //
        // const pusher = new Pusher('64a9f0ddad38c595ba94', {
        //     cluster: 'us2',
        //     forceTLS: true
        // });
        //
        // const channel = pusher.subscribe('ChatChannel_69');
        // var me = this;
        // channel.bind('my-event', function (data) {
        //     me.state.messages.push(data);
        //     me.setState({
        //         messages: me.state.messages
        //     });
        // });
    }
    isFirstMessageOfGroup = (item, i) => {
        return (i === 0 || (this.props.message[i - 1] && this.props.message[i - 1].who !== item.who));
    };

    isLastMessageOfGroup = (item, i) => {
        return (i === this.props.message.length - 1 || (this.props.message[i + 1] && this.props.message[i + 1].who !== item.who));
    };
    handleChange = (e) => {
        this.setState({
            sendMSG: e.target.value
        });
        console.log("e.target.value",e.target.value);
        console.log("e.==sendMSG",this.state.sendMSG);
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onMessageSubmit();
        }
    }
    onMessageSubmit = (ev) => {
        // ev.stopPropagation();
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",this.state.sendMSG);
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^this.state.currentRoom^^^^^^^^^^^^^^^^^^^^^^^^^",this.state.currentRoom);
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^this.props.currentUser^^^^^^^^^^^^^^^^^^^^^^^^^",this.props.currentUser);



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

    };
    // sendMSG = (e) => {
    //     if (this.state.sendMSG == "") {
    //         return;
    //     }
    //
    //     const sendmessage = {
    //         sender: "",
    //         receiver: "",
    //         message: this.state.sendMSG
    //     }
    //     this.state.sendMSG = "";
    //     this.setState({
    //         sendMSG: this.state.sendMSG,
    //     });
    //
    //     axios({
    //         method: 'post',
    //         url: 'https://apifmsplus_c.jkdev.com/Messenger/Create?userid=69',
    //         data: sendmessage
    //     }).then(function (res) {
    //         console.log(res);
    //     });
    // }
    scrollToBottom = () => {
        this.chatScroll.scrollTop = this.chatScroll.scrollHeight;
    };
    render() {
        const {classes, chat, contacts, user, className} = this.props;
        const {sendMSG} = this.state;
        return (

            <div className="individual-chat-item">
                <div className="header">
                    <div>
                        <IconButton color="inherit">
                            <Icon>arrow_back</Icon>
                        </IconButton>
                        <span>
                            {this.state.userdetail && this.state.userdetail !==null && this.state.userdetail.nickname && this.state.userdetail.nickname !==null && (
                                this.state.userdetail.nickname
                            )}
                        </span>

                    </div>
                    <div>
                        <IconButton color="inherit">
                            <Icon>more_vert</Icon>
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
                    {
                        this.state.messages.map((item,i) =>{
                                // const contact = item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
                            let contact = '';
                            if(item.who === this.state.userdetail.name){
                                contact =this.state.userdetail.avatar;
                            }
                            // if(messageItem.who === this.state.userdetail.name){
                            //    return(
                            //        <div key={index}>
                            //            <div  className="chat-item chat-item-other">
                            //                <div className="chat-avatar">
                            //                    <img src={this.state.userdetail.avatar} />
                            //                </div>
                            //                <div className="chat-message">
                            //                    {messageItem.message}
                            //                </div>
                            //            </div>
                            //            <div  className="chat-item chat-item-other">
                            //                <div className="chat-message-time">{moment(messageItem.time).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            //            </div>
                            //        </div>
                            //    )
                            // }else{
                            //     return(
                            //         <div key={index}>
                            //             <div  className="chat-item chat-item-other">
                            //                 <div className="chat-message-right">
                            //                     {messageItem.message}
                            //                 </div>
                            //
                            //             </div>
                            //             <div  className="chat-item chat-item-other">
                            //                 <div className="chat-message-right chat-message-time">{moment(messageItem.time).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            //             </div>
                            //         </div>
                            //     )
                            // }
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


                            // <div key={index} className="chat-item chat-item-other">
                            //     <div className="chat-avatar">
                            //         <img src="assets/images/avatars/Barrera.jpg" />
                            //     </div>
                            //     <div className="chat-message">
                            //         {messageItem.message}
                            //     </div>
                            // </div>
                        )
                    }
                </div>
                </FuseScrollbars>
                {/*<div className="chat-message-input">*/}
                    {/*<Input*/}
                        {/*placeholder="Send Message"*/}
                        {/*inputProps={{*/}
                            {/*'aria-label': 'Description'*/}
                        {/*}}*/}
                        {/*value={this.state.sendMSG}*/}
                        {/*onChange={this.handleChange}*/}
                        {/*onKeyPress={this._handleKeyPress}*/}
                    {/*/>*/}
                    {/*<IconButton color="inherit" onClick={this.sendMSG}>*/}
                        {/*<Icon>send</Icon>*/}
                    {/*</IconButton>*/}
                {/*</div>*/}

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
}
IndividualChat.propTypes = {
    onClose     : PropTypes.func.isRequired,
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
        sendMessage: Actions.sendMsg
    }, dispatch);
}
function mapStateToProps({chatPanel})
{
    return {
        // contacts         : chatPanel.contacts.entities,
        selectedContactId: chatPanel.contacts.selectedContactId,
        // chat             : chatPanel.chat,
        // user             : chatPanel.user
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IndividualChat));

// export default withStyles(styles)(IndividualChat);
