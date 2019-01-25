import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// third party

import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import SaveIcon from '@material-ui/icons/Save';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';
import GridContainer from "../../../Commons/Grid/GridContainer";
import GridItem from "../../../Commons/Grid/GridItem";


const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    }
});

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
    }

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
                    <form action="/" method={"POST"} onSubmit={(e) => {e.preventDefault();this.handleAddOwner();}}>
                        <DialogTitle id="form-dialog-title">Verified Form</DialogTitle>
                        <DialogContent>
                            <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="dialogSubject"
                                        label="Subject"
                                        className={classes.textField}
                                        value={this.state.dialogForm.Subject}
                                        variant={"outlined"}
                                        onChange={this.handleChangeForm("Subject")}
                                        margin="dense"
                                        inputProps={{
                                            maxLength: 20
                                        }}
                                        fullWidth
                                        required
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="dialogEmail"
                                        label="E-mail"
                                        className={classes.textField}
                                        value={this.state.dialogForm.Email}
                                        variant={"outlined"}
                                        onChange={this.handleChangeForm("Email")}
                                        margin="dense"
                                        inputProps={{
                                            maxLength: 20
                                        }}
                                        fullWidth
                                        required
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="dialogMessage"
                                        label="Message"
                                        variant={"outlined"}
                                        className={classes.textField}
                                        value={this.state.dialogForm.Message}
                                        onChange={this.handleChangeForm("Message")}
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
                            <Button onClick={this.handleClose} variant="contained"  size="small" className={classes.button}>
                                <CancelIcon style={{color:"gray"}} className={classNames(classes.leftIcon, classes.iconSmall)} />
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="small" className={classes.button}>
                                <SaveIcon style={{color:"gray"}} className={classNames(classes.leftIcon, classes.iconSmall)} />
                                Save
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
        openVerificationDialog: Actions.openVerificationDialog
    }, dispatch);
}

function mapStateToProps({ verifications }) {
    return {
        verifiedModal: verifications.verifiedModal
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifiedDialogForm)));
