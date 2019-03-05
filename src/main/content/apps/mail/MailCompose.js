import React, {Component} from 'react';
import {TextField, Button, Icon, IconButton, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
// es modules
import { Editor } from '@tinymce/tinymce-react';


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
    }
});

class MailCompose extends Component {
    state = {
        composeDialog: false,
        from         : 'johndoe@creapond.com',
        to           : '',
        cc           : '',
        bcc          : '',
        subject      : '',
        message      : '',
        content      : ''
    };

    componentWillMount() {
        this.setState({
            from: this.props.user.email
        })
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleEditorChange = (content) => {
        this.setState({ content });
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
                <div className="flex align-middle" style={{alignItems: 'center'}}>
                    <Typography className="flex">From:&nbsp;&nbsp;</Typography>
                    <Avatar alt="Remy Sharp" src={this.props.profileUrl} className={classes.avatar} />
                    <Typography className="flex">&nbsp;&nbsp;{this.props.user.firstName}&nbsp;{this.props.user.lastName}</Typography>
                    <Typography className="flex bold">&nbsp;&nbsp;({this.props.user.email})</Typography>
                </div>
                <TextField
                    className={classes.formControl}
                    type="hidden"
                    id="from"
                    name="from"
                    value={this.state.from}
                    margin={"dense"}
                    onChange={this.handleChange}
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
                    value={this.state.to}
                    margin={"dense"}
                    onChange={this.handleChange}
                    fullWidth
                    required
                />

                {/*<TextField*/}
                    {/*className={classes.formControl}*/}
                    {/*label="Cc"*/}
                    {/*id="cc"*/}
                    {/*name="cc"*/}
                    {/*value={this.state.cc}*/}
                    {/*margin={"dense"}*/}
                    {/*onChange={this.handleChange}*/}
                    {/*fullWidth*/}
                {/*/>*/}

                {/*<TextField*/}
                    {/*className={classes.formControl}*/}
                    {/*label="Bcc"*/}
                    {/*id="bcc"*/}
                    {/*name="bcc"*/}
                    {/*value={this.state.bcc}*/}
                    {/*margin={"dense"}*/}
                    {/*onChange={this.handleChange}*/}
                    {/*fullWidth*/}
                {/*/>*/}

                <TextField
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    label="Subject"
                    id="subject"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.handleChange}
                    fullWidth
                />

                {/*<TextField*/}
                    {/*className={classes.formControl}*/}
                    {/*id="message"*/}
                    {/*name="message"*/}
                    {/*onChange={this.handleChange}*/}
                    {/*label="Message"*/}
                    {/*type="text"*/}
                    {/*multiline*/}
                    {/*rows={10}*/}
                    {/*fullWidth*/}
                {/*/>*/}
                <p className="mb-6" >Message</p>
                <Editor apiKey="6rh4ia7bor4rum8cg0a0g4ij7g5sb8eohacbkt4nupdtc5nc" value={this.state.content} onEditorChange={this.handleEditorChange} />
                <div className="flex justify-start mt-24">
                    <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.props.toggleCompose(false)}>
                        Send
                    </Button>
                    <IconButton>
                        <Icon>attach_file</Icon>
                    </IconButton>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleCompose: Actions.toggleCompose
    }, dispatch);
}

function mapStateToProps({auth,mailApp})
{
    return {
        toggleCompose: mailApp.compose.toggleCompose,
        profileUrl: auth.login.profilePhoto,
        user: auth.login
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailCompose)));
