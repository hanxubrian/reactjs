import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// third party

import TextField from "@material-ui/core/TextField/TextField";
import Dialog from "@material-ui/core/Dialog/Dialog";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';
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
import Check from "@material-ui/icons/Check";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

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

class DocumentSignatureDialog extends React.Component {
    state = {
        openDialog: false,
        insertPayload: null,
        dialogForm: {
            Subject: "",
            Email: "",
            Message: ""
        },
        radioValue: "docuSign",
        regionName: ""
    };
    constructor (props){
        super(props);
    }


    componentDidMount() {

    }

    componentWillMount() {
        this.setState({openDialog:this.props.docModal});
        this.props.regions.map(x=>{
             if(x.regionid === this.props.regionId){
                 this.setState({
                     regionName: x.regionname
                 });
             }
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.docModal !== this.props.docModal) {
            this.setState({
                openDialog: nextProps.docModal
            });
        }
    }

    handleClose = () => {
        this.setState({ openDialog: false });
        this.props.openClosedocDialog(false);
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

    handleRadioChange = event => {
        this.setState({ radioValue: event.target.value });
    };

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
                    <form action="/" method={"POST"} onSubmit={(e) => {e.preventDefault();this.handleAddOwner();}}>
                        <DialogTitle id="form-dialog-title" onClose={this.handleClose }>
                            <h2 className={classes.dialogH2}>
                                <AssignmentTurnedIn  className={classNames(classes.leftIcon)} />
                                Signature Documents
                            </h2>
                        </DialogTitle>
                        <DialogContent>
                            <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <Typography className="flex" style={{alignItems: "center",marginRight:20,fontSize:"16px"}}>Send Via :</Typography>
                                    <RadioGroup
                                            aria-label="sign"
                                            name="sign"
                                            value={this.state.radioValue}
                                            onChange={this.handleRadioChange}
                                            row
                                        >
                                            <FormControlLabel value="docuSign" labelPlacement="end" control={<Radio />} label="Document Sign" />
                                            <FormControlLabel labelPlacement="end" value="email" control={<Radio />} label="Email" />
                                    </RadioGroup>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}  className="flex flex-row justify-between">
                                    <Typography style={{fontSize:"16px"}} className="justify-start">From : {this.state.regionName} </Typography>   
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}  className="flex flex-row justify-between mt-16">
                                    <TextField
                                        id="franchisee-email"
                                        label="Franchisee Email"
                                        className={classes.textField}
                                        value={this.state.name}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">To:</InputAdornment>,
                                        }}
                                        autoFocus={true}
                                        onChange={this.handleChangeForm('franchiseeEmail')}
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                    />   
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}  className="flex flex-row justify-between">
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        label="Return Signed Before"
                                        className={classes.textField}
                                        InputLabelProps={{
                                           shrink: true,
                                        }}
                                        margin="dense"
                                        fullWidth
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="dialogMessage"
                                        label="Message"
                                        variant={"outlined"}
                                        className={classes.textField}
                                        value=""
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
        openClosedocDialog: Actions.openClosedocDialog
    }, dispatch);
}

function mapStateToProps({franchisees, auth}) {
    return {
        docModal: franchisees.docModal,
        regionId: auth.login.defaultRegionId,
        regions: auth.login.all_regions
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentSignatureDialog)));
