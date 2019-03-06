import React, {Component} from 'react';
import {TextField, Button, Icon, IconButton, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
import * as MainActions from 'store/actions';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
// es modules
import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames';
import SendIcon from '@material-ui/icons/Send';
import {mailService} from "../../../../services";
import {SEND_MAIL} from "./store/actions";


const styles = theme => ({
    composeButton     : {
        width: '100%'
    },
    formControl       : {
        marginTop   : 8,
        marginBottom: 16
    },
    attachmentList    : {
        paddingTop: 8
    },
    attachment        : {
        fontSize       : 13,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        border         : '1px solid rgba(0, 0, 0, 0.16)',
        paddingLeft    : 16,
        marginBottom   : 8,
        borderRadius   : 2,
        display        : 'flex',
        justifyContent : 'space-between',
        alignItems     : 'center'
    },
    attachmentFilename: {
        fontWeight: 600
    },
    attachmentSize    : {
        marginLeft: 8,
        fontWeight: 300
    },
    button: {
        margin: theme.spacing.unit,
    },
    avatar: {
        width: 25,
        height: 25
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20
    }
});

class MailCompose extends Component {
    state = {
        from: '',
        sendMail: {
            Subject: '',
            ContentBody: '',
            Recipients: ''
        },
        openSuccess: false,
        openError: false
    };

    componentWillMount() {
        this.setState({
            from: this.props.user.email
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.state.sendMail) !== JSON.stringify(prevState.sendMail)){
            this.props.updatePayload(this.state.sendMail);
        }
    }

    handleChange = (name) => (event) => {
        if(name !== 'ContentBody'){
            this.setState({
                ...this.state,
                sendMail: {
                    ...this.state.sendMail,
                    [name]: event.target.value
                }
            })
        }else{
            this.setState({
                ...this.state,
                sendMail: {
                    ...this.state.sendMail,
                    [name]: event
                }
            })
        }
    };

    sendMail = async() =>{

        let res = await mailService.sendEmail(this.state.sendMail,this.props.user.UserId);

        if(res.IsSuccess){
            this.successmesssage(res.Message);
            this.setState({
                ...this.state,
                sendMail: {
                    Subject: '',
                    ContentBody: '',
                    Recipients: ''
                }
            });
        }else{
            this.errormessage(res.Message);
        }

    }

    successmesssage=(mg)=>{
        this.props.showMessage({
            message     : mg,
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
        });
    }
    errormessage=(mg)=>{
        this.props.showMessage({
            message     : mg,//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'error'//success error info warning null
        });
    }

    render()
    {
        const {classes} = this.props;

        function Attachment({fileName, size})
        {
            return (
                <div className={classes.attachment}>
                    <div className="flex">
                        <Typography variant="caption" className={classes.attachmentFilename}>{fileName}</Typography>
                        <Typography variant="caption" className={classes.attachmentSize}>({size})</Typography>
                    </div>
                    <IconButton>
                        <Icon className="text-16">close</Icon>
                    </IconButton>
                </div>
            );
        }

        return (
            <div className="p-24">
                <div className="flex align-middle flex-row" style={{alignItems: 'center'}}>
                    <Typography className="flex justify-start">From:&nbsp;&nbsp;</Typography>
                    <Avatar alt="mail avatar" src={this.props.profileUrl} className={classNames(classes.avatar,"justify-start")} />
                    <Typography className="flex justify-start">&nbsp;&nbsp;{this.props.user.firstName}&nbsp;{this.props.user.lastName}</Typography>
                    <Typography className="flex bold justify-start">&nbsp;&nbsp;({this.props.user.email})</Typography>
                    <div className="flex justify-end w-full">
                        <Button type="submit" color={"primary"} onClick={this.sendMail} variant="contained" size="small" className={classes.button}>
                            <SendIcon  className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Send
                        </Button>
                        <IconButton>
                            <Icon>attach_file</Icon>
                        </IconButton>
                    </div>
                </div>
                <TextField
                    className={classes.formControl}
                    type="hidden"
                    id="from"
                    name="from"
                    value={this.state.from}
                    margin={"dense"}
                    fullWidth
                    disabled
                />

                <TextField
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    label="To"
                    autoFocus
                    id="to"
                    name="to"
                    value={this.state.sendMail.Recipients}
                    margin={"dense"}
                    onChange={this.handleChange('Recipients')}
                    fullWidth
                    required
                />

                <TextField
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    margin={"dense"}
                    label="Subject"
                    id="subject"
                    name="subject"
                    value={this.state.sendMail.Subject}
                    onChange={this.handleChange('Subject')}
                    fullWidth
                />

                <p className="mb-6" >Message</p>
                <Editor apiKey="6rh4ia7bor4rum8cg0a0g4ij7g5sb8eohacbkt4nupdtc5nc" init={{ height: '400px',menubar:false}} value={this.state.sendMail.ContentBody} onEditorChange={this.handleChange('ContentBody')} textareaName="tinymce_textArea" />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleCompose: Actions.toggleCompose,
        updatePayload: Actions.updatePayload,
        showMessage : MainActions.showMessage,
    }, dispatch);
}

function mapStateToProps({auth,mailApp})
{
    return {
        toggleCompose: mailApp.compose.toggleCompose,
        profileUrl: auth.login.profilePhoto,
        user: auth.login,
        sendMail: mailApp.compose.sendMail,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailCompose)));
