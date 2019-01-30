import React from 'react';
import PropTypes from 'prop-types';

//store
import { withStyles } from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import * as Actions from "../../../chatPanel/store/actions";
import * as authActions from "../../../../auth/store/actions/login.actions";
import ReactPlayer from 'react-player';

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
});

class VersionUpgradeDialog extends React.Component {
    state = {
        open: false,
        fullWidth: true,
        maxWidth: 'sm',
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleUpgrade = () =>{
        this.props.adminCleanCache();
        this.props.history.push('/auth/signin');
    }
    handleMaxWidthChange = event => {
        this.setState({ maxWidth: event.target.value });
    };

    handleFullWidthChange = event => {
        this.setState({ fullWidth: event.target.checked });
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={this.props.show}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">SYSTEM NOTIFICATION <strong style={{
                        color:"red",
                        fontSize: "12px",
                        background: "gray",
                        marginLeft: "10px",
                        borderRadius: "4px"}}>new</strong> <span style={{fontSize:"14px"}}>{this.props.version}</span></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>Note:</strong>  <span style={{fontSize:"13px"}}>{this.props.note}</span>
                        </DialogContentText>
                        <Divider className="my-12"/>
                        <DialogContentText>
                            There is a new version({this.props.version}), click <strong>UPGRAGE</strong>  to log out and delete cache and log back in.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleUpgrade} color="primary">
                            Upgrade
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                { 1 && (
                    <ReactPlayer url='/assets/audios/versionupgrade.mp3' playing />
                )}

            </React.Fragment>
        );
    }
}

VersionUpgradeDialog.propTypes = {
    classes     : PropTypes.object.isRequired,
    show        : PropTypes.bool.isRequired,
    version     : PropTypes.string,
    note        : PropTypes.string,
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        adminCleanCache                          : authActions.adminCleanCache,
    }, dispatch);
}


function mapStateToProps({auth,chatPanel,contactsApp,notification})
{
    return {
        user                    : auth.user,
        login                   : auth.login,


    }
}
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(VersionUpgradeDialog)));
// export default withStyles(styles)(VersionUpgradeDialog);