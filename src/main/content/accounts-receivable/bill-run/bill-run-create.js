import React, {Component} from 'react';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

import {withStyles} from "@material-ui/core";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import  {CircularProgress,IconButton,Button,Dialog} from '@material-ui/core';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

import 'date-fns';
import TextField from '@material-ui/core/TextField';
import moment from "moment/moment";

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.secondary.main,
        color: "white !important",

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        // color: theme.palette.grey[500],
        color:"white",
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
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

const styles = theme => ({
    root : {
        '& input, & label': {
            // color: 'white'
        },
        '& fieldset': {
            // borderColor: 'white!important'
        },
        '& white': {
            color: 'white'
        }
    },
    panel: {
        position                      : 'absolute',
        width                         : 250,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        left                         :  -250,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(50px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition  : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened1'                    : {
            transform: 'translateX(250px)'
        }
    },
    overlay: {
        position: 'absolute',
        top: -104,
        left: -65,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    modalheader:{
        backgroundColor: theme.palette.secondary.main,
    },
});

const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class BillRunDialog extends Component {
    state = {
        open                    : false,
        selectedDate            : moment(),
        message                 : "",
        description             : "",
        userId                  : null,
        regionId                : null,
        billruns                : null,
        auth                    : null,
        completed               : 0,
        statusMSG               : 10,
        pusherMSG               : null,
        showP                   : false,
        year                    : moment().year(),
        month                   : moment().month(),
        desMSG                  : `MONTHLY CONTRACT BILLING AMOUNT FOR `+mL[moment().month()].toUpperCase()+` `+moment().year(),
        isMounted               : false,
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.billruns && this.props.billruns != null && JSON.stringify(prevProps.billruns)!==JSON.stringify(this.props.billruns)){
            this.setState({billruns: this.props.billruns});
        }
        if(this.props.auth && this.props.auth != null && JSON.stringify(prevProps.auth)!==JSON.stringify(this.props.auth)){
            this.setState({auth: this.props.auth});
        }
    }

    componentDidMount() {
        this.setState({isMounted:true});
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.setState({isMounted:false});
        this.props.onRef(undefined);
    }

    componentWillReceiveProps(nextProps){
        this.setState({open: nextProps.open});
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleDateChange = date => {
        let defMSG = `MONTHLY CONTRACT BILLING AMOUNT FOR `+mL[moment(date).month()].toUpperCase()+` `+moment(date).year();
        this.setState({ selectedDate: date });
        this.setState({
            year:  moment(date).year(),
            month: moment(date).month(),
            desMSG: defMSG
        });

    };
    onchangeDate=(event)=>{
        this.setState({selectedDate:event.target.value})

    }
    handleBillrunDateChange = date => {
        this.setState({selectedDate:date});
    };
    onchangeMessage=(e)=>{
        this.setState({message:e.target.value})
    }
    onchangedescription=(e)=>{
        this.setState({description:e.target.value})
    }

    successmesssage=()=>{

        this.props.showMessage({
            message     : this.state.pusherMSG.message,//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
        });
    }
    createbillrunmesssage=()=>{
        this.props.showMessage({
            message     : `Bill Run Process has started.You will be notified when completed.\n You can continue using the system as usual`,//text or html
            autoHideDuration: 3000,//ms
            anchorOrigin: {
                vertical  : 'top',//top  bottom
                horizontal: 'center'//left center right
            },
            variant: 'success'//success error info warning null
        });
    }
    errormessage=()=>{
        this.props.showMessage({
            message     : "Error!!!We can't create New Bill Run",//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'error'//success error info warning null
        });
    }
    duplicatederrormessage=()=>{
        this.props.showMessage({
            message     : "Error!!!That will prevent it from running",//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'error'//success error info warning null
        });
    }
    billrun=(e)=>{

        e.stopPropagation();

        if(this.props.auth && this.props.auth !==null){
            let date = this.state.selectedDate;
            let year = moment(date).year();
            let month = moment(date).month()+1;
            let user = this.props.auth.firstName+"     "+ this.props.auth.lastName;
            let userid   = this.props.auth.UserId;
            let regionid = this.props.auth.defaultRegionId;
            let billrunDB = this.props.billrunsDB;
            let checkflag = true;
            if(billrunDB && billrunDB !== null){
                billrunDB.map((item)=>{
                    if(item.Month === month && item.Year === year && item.Status !== "Deleted"){
                        checkflag = false;
                    }
                });
            }
            if(checkflag && this.state.isMounted && userid != null && regionid && regionid != null && year && year != null && month && month !=null ){

                this.createbillrunmesssage();
                let buggyObject = setTimeout(
                    function() {
                        this.setState({statusMSG:200});
                        this.setState({showP: !this.state.showP});
                        clearTimeout(buggyObject);
                    }
                        .bind(this),
                    3000
                );

                buggyObject = null;
            }
            if(!checkflag){
                this.duplicatederrormessage();
            }
        }


    }
    progress = () => {
        const {completed} = this.state;
        if ( completed === 100 )
        {
            this.setState({completed: 0});
        }
        else
        {
            const diff = Math.random() * 10;
            this.setState({completed: Math.min(completed + diff, 100)});
        }
    };
    test=()=>{
    }
    render() {

        const { classes,loading } = this.props;
        const { selectedDate ,showP} = this.state;

        return (
            <div style={{

            }}>
                {showP === false && loading && loading !==null && (//loading && loading !==null
                    <div className={classes.overlay} style={{

                    }}>
                        <CircularProgress className={classes.progress} color="secondary"  />

                    </div>
                )}


                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    fullWidth={true}
                    maxWidth="md"
                    open={this.state.open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        <div style={{color:'white'}}>Create New Bill Run</div>
                    </DialogTitle>
                    <DialogContent>
                        <div>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <div className="flex flex-col mt-20">
                                    <DatePicker
                                        margin="none"
                                        label="Period"
                                        name="selectedDate"
                                        variant="outlined"
                                        format="MM/YYYY"
                                        value={selectedDate}
                                        onChange={this.handleDateChange}

                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        openToYearSelection={true}
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Invoice Description"
                                multiline
                                rows="1"
                                value={this.state.desMSG}
                                margin="normal"
                                variant="outlined"
                                style={{width: "100%"}}
                                onChange={this.onchangedescription}
                            />
                        </div>
                        <div>

                            <TextField
                                id="outlined-multiline-static"
                                label="Invoice Message"
                                multiline
                                rows="3"
                                defaultValue={""}

                                margin="normal"
                                variant="outlined"
                                style={{width: "100%"}}
                                onChange={this.onchangeMessage}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained"  style={{width: "150px",
                            marginRight: "50px",
                            marginBottom: "20px",
                            marginTop: "20px"}} onClick={this.billrun} color="primary">
                            Run
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
BillRunDialog.propTypes = {

    open: PropTypes.bool,
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        createbillrun: Actions.createbillrun,
        showMessage: Actions.showMessage,
        hideMessage: Actions.hideMessage,
    }, dispatch);
}

function mapStateToProps({invoices, auth,billruns})
{
    return {
        invoices        : invoices.invoicesDB,
        billrunsDB      : billruns.billrunsDB,
        billruns        : billruns.billruncreate,
        loading         : billruns.loadingstatus,
        auth            : auth.login,
        billstatus      : billruns.billrunstatus,
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(BillRunDialog);
export default (withStyles(styles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(BillRunDialog)));
