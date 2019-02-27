import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from 'store/actions';

// third party

import TextField from "@material-ui/core/TextField/TextField";
import Dialog from "@material-ui/core/Dialog/Dialog";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import GridContainer from "../../../../../Commons/Grid/GridContainer";
import GridItem from "../../../../../Commons/Grid/GridItem";
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';


import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    dialogH2: {
        display: "flex",
        alignItems: "center",
        color: "white"
    },
    iconSmall: {
        fontSize: 20
    }
});

const stopReason = [
    {
        id: 1,
        label: "Reason 1"
    },
    {
        id: 2,
        label: "Reason 2"
    },
    {
        id: 3,
        label: "Reason 3"
    },
    {
        id: 4,
        label: "Reason 4"
    },
];

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: "#3c93ec",
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: "white",
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            {children}
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class StopModal extends React.Component {
    state = {
        openDialog: false,
        stopReason: "Reason 1",
        notice: ""
    };
    constructor (props){
        super(props);
    }

    componentWillMount() {
        this.setState({openDialog: this.props.stopReasonModal});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.stopReasonModal !== this.props.stopReasonModal){
            this.setState({openDialog: nextProps.stopReasonModal});
        }
    }

    handleClose = () => {
        this.props.openCloseStopReasonDialog(false);
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"md"}
                    fullWidth
                >
                    <form action="/" method={"POST"} onSubmit={(e) => {e.preventDefault();}}>
                        <DialogTitle id="form-dialog-title" onClose={this.handleClose }>
                            <h2 className={classes.dialogH2}>
                                <AssignmentTurnedIn  className={classNames(classes.leftIcon)} />
                                Finders Fees Stop
                            </h2>
                        </DialogTitle>
                        <DialogContent>
                            <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row ">
                                    <Typography className="flex" style={{alignItems: "center",marginRight:20,fontSize:"16px",whiteSpace:"nowrap"}}>Stop Date :</Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        defaultValue="2019-01-01"
                                        className={classes.textField}
                                        fullWidth
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row mt-24">
                                    <Typography className="flex" style={{alignItems: "center",marginRight:20,fontSize:"16px",whiteSpace:"nowrap"}}>Stop Reason :</Typography>
                                    <TextField
                                        id="stopReason"
                                        select
                                        placeholder="Select Reason"
                                        className={classes.textField}
                                        value={this.state.stopReason}
                                        onChange={this.handleChange('stopReason')}
                                        margin="dense"
                                        fullWidth
                                        required
                                    >
                                        {stopReason.map(option => (
                                            <MenuItem key={option.id} value={option.label}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="dialogMessage"
                                        variant={"outlined"}
                                        className={classes.textField}
                                        value=""
                                        onChange={this.handleChange("notice")}
                                        multiline
                                        margin={"dense"}
                                        rows={5}
                                        fullWidth
                                        required
                                    />
                                </GridItem>
                            </GridContainer>
                        </DialogContent>
                        <DialogActions style={{padding:"2%"}}>
                            <Button type="submit" color={"primary"} variant="contained" size="small" className={classes.button}>
                                <SendIcon  className={classNames(classes.leftIcon, classes.iconSmall)} />
                                Send
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseStopReasonDialog: Actions.openCloseStopReasonDialog
    }, dispatch);
}

function mapStateToProps({franchisees, auth}) {
    return {
        stopReasonModal: franchisees.stopReasonModal
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(StopModal)));
