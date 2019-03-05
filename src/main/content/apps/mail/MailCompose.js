import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

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
});

class MailCompose extends Component {
    state = {
        composeDialog: false,
        from         : 'johndoe@creapond.com',
        to           : '',
        cc           : '',
        bcc          : '',
        subject      : '',
        message      : ''
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

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
                <TextField
                    className={classes.formControl}
                    label="From"
                    id="from"
                    name="from"
                    value={this.state.from}
                    margin={"dense"}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    disabled
                />

                <TextField
                    className={classes.formControl}
                    label="To"
                    autoFocus
                    id="to"
                    name="to"
                    value={this.state.to}
                    margin={"dense"}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />

                <TextField
                    className={classes.formControl}
                    label="Cc"
                    id="cc"
                    name="cc"
                    value={this.state.cc}
                    margin={"dense"}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                />

                <TextField
                    className={classes.formControl}
                    label="Bcc"
                    id="bcc"
                    name="bcc"
                    value={this.state.bcc}
                    margin={"dense"}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                />

                <TextField
                    className={classes.formControl}
                    label="Subject"
                    id="subject"
                    name="subject"
                    value={this.state.subject}
                    margin={"dense"}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                />

                <TextField
                    className={classes.formControl}
                    id="message"
                    name="message"
                    onChange={this.handleChange}
                    margin={"dense"}
                    label="Message"
                    type="text"
                    multiline
                    rows={5}
                    variant="outlined"
                    fullWidth
                />
                <div className="flex justify-end">
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
        toggleCompose: mailApp.compose.toggleCompose
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailCompose)));
