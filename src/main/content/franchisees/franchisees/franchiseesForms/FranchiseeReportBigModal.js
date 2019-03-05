import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from 'store/actions';

// third party

import Dialog from "@material-ui/core/Dialog/Dialog";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';

import {IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';


//Child components
import Report from './../report_new'


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


class FranchiseeReportBigModal extends React.Component {
    state = {
        openFranchiseeReportDialog: false,
    };


    componentWillMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    handleClose = () => {
        this.setState({openFranchiseeReportDialog: false});
    };

    onShowFranchiseeDialog = ()=>{
        this.setState({openFranchiseeReportDialog: true});
    };


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.franchiseeReport && this.state.openFranchiseeReportDialog}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"lg"}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose }>
                        <h2 className={classes.dialogH2}>
                            <AssignmentTurnedIn  className={classNames(classes.leftIcon)} />
                            Franchisee Report
                        </h2>
                    </DialogTitle>
                    <DialogContent>
                        <Report onRef={ref => (this.child = ref)}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({auth, franchiseeReports}) {
    return {
        franchiseeReport: franchiseeReports.franchiseeReport1,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseeReportBigModal)));
