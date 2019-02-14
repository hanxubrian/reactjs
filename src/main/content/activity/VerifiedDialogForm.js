import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// third party

import TextField from "@material-ui/core/TextField/TextField";
import Check from '@material-ui/icons/Check';
import Dialog from "@material-ui/core/Dialog/Dialog";
import SendIcon from '@material-ui/icons/Send';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';
import GridContainer from "../../../Commons/Grid/GridContainer";
import GridItem from "../../../Commons/Grid/GridItem";

import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


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

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);


class VerifiedDialogForm extends React.Component {
    state = {
        openDialog: false,
        insertPayload: null,
        dialogForm: {
            Subject: "",
            Email: "",
            Message: ""
        }
    };
    constructor (props){
        super(props);
    }


    componentDidMount() {

    }

    componentWillMount() {
        this.setState({openDialog:this.props.verifiedModal});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.verifiedModal !== this.props.verifiedModal) {
            if(JSON.stringify(this.state.openDialog) !== JSON.stringify(nextProps.verifiedModal)){
                this.setState({openDialog:nextProps.verifiedModal});
            }
        }
    }

    handleClose = () => {
        this.setState({ openDialog: false });
        this.props.openVerificationDialog(false);
    };

    handleVerify = ()=> {

        let option = this.props.verifyOption;
        let action = 'verify';

        let selections = this.props.aInvoiceSelections;
        let data = this.props.verifications.Data.Invoices;
        let userId = this.props.user.UserId;

        if(option==='transaction') {
            data = this.props.verifications.Data.FranTransactions;
            selections = this.props.aTransactionSelections;
        }

        let objects = selections.map(x=>data[x]);

        let ids = [];
        objects.forEach(obj=>{
            ids.push(obj._id);
        });

        this.props.verifyBulkUpdate(this.props.regionId, userId, action, ids);
        if(option==='transaction')
            this.props.updateSelectedRowsLength([]);
        else
            this.props.updateInvoiceSelections([]);

        this.props.getInvoiceTransactionPendingLists(this.props.regionId, this.props.fromDate, this.props.toDate);
    };

    handleChangeForm = (name) => event => {
        const dialogForm = this.state.dialogForm;
        if(name === "Subject"){
            dialogForm.Subject = event.target.value;
        }
        if(name === "Email"){
            dialogForm.Email = event.target.value;
        }
        if(name === "Message"){
            dialogForm.Message = event.target.value;
        }
        this.setState({dialogForm: dialogForm});
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"sm"}
                    fullWidth
                >
                    <form action="/" method={"POST"} onSubmit={(e) => {e.preventDefault();this.handleVerify();}}>
                        <DialogTitle  id="form-dialog-title" onClose={this.handleClose }>
                            <h2 className={classes.dialogH2}>
                                <VerifiedUser  className={classNames(classes.leftIcon)} />
                                Verify Form
                            </h2>
                        </DialogTitle>
                        <DialogContent>
                            <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <Typography>To: German Sosa</Typography>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}  className="flex flex-row justify-between mt-16">
                                    <Typography className="justify-start">Verified By: {this.props.user.firstName} {this.props.user.lastName}</Typography>
                                    <Typography className="justify-end flex align-center">
                                        <Check  className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Verified
                                    </Typography>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row mt-48">
                                    <TextField
                                        id="dialogMessage"
                                        label="Message"
                                        variant={"outlined"}
                                        className={classes.textField}
                                        value={this.state.dialogForm.Message}
                                        onChange={this.handleChangeForm("Message")}
                                        multiline
                                        margin={"dense"}
                                        autoFocus={true}
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
        openVerificationDialog: Actions.openVerificationDialog,
        verifyBulkUpdate: Actions.verifyBulkUpdate,
        updateSelectedRowsLength: Actions.updateSelectedRowsLength,
        updateInvoiceSelections: Actions.updateInvoiceSelections,
        getInvoiceTransactionPendingLists: Actions.getInvoiceTransactionPendingLists1,
    }, dispatch);
}

function mapStateToProps({ verifications, auth}) {
    return {
        verifiedModal: verifications.verifiedModal,
        user: auth.login,
        verifyOption: verifications.verifyOption,
        aInvoiceSelections: verifications.aInvoiceSelections,
        aTransactionSelections: verifications.aTransactionSelections,
        regionId: auth.login.defaultRegionId,
        verifications: verifications.verificationsDB,
        fromDate: verifications.fromDate,
        toDate: verifications.toDate,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifiedDialogForm)));
