import React, {Component} from 'react';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';



import {withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import Pusher from 'pusher-js';

import _ from '@lodash';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import  {CircularProgress,LinearProgress,IconButton,Button,Dialog} from '@material-ui/core';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from "moment/moment";
import {UPDATE_TO_DATE_INVOICE} from "../../../../store/actions";



const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
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
            color: 'white!important'
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
});
const fakeEvent = {
    stopPropagation: () => false
}

class BillRunDialog extends Component {
    state = {
        open                    : false,
        selectedDate            : moment(),
        message                 : "",
        userId                  : null,
        regionId                : null,
        billruns                : null,
        auth                    : null,
        completed               : 0,
        statusMSG               : 10,
        pusherMSG               : null,
        showP                   : false,

    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.pusherMSG !== prevState.pusherMSG){
            console.log("pusherMSG-create",this.state.pusherMSG);
        }
        if(this.props.billruns && this.props.billruns != null && JSON.stringify(prevProps.billruns)!==JSON.stringify(this.props.billruns)){
            this.setState({billruns: this.props.billruns});
        }
        if(this.props.auth && this.props.auth != null && JSON.stringify(prevProps.auth)!==JSON.stringify(this.props.auth)){
            this.setState({auth: this.props.auth});
        }
        if(this.props.loading ===false && prevProps.loading ===true && this.state.statusMSG===200){
            this.setState({showP: !this.state.showP});
            if(this.props.billstatus===400){
                this.setState({statusMSG:10});
                this.errormessage();
            }
            else if(this.props.billstatus===200){
                this.setState({statusMSG:10});
                this.successmesssage();
            }

        }
    }
    componentDidMount() {
        this.props.onRef(this);
        this.timer = setInterval(this.progress, 500);
        const pusher = new Pusher('ecf6a4e23b186efa2d44', {
            cluster: 'us2',
            forceTLS: true
        });
        var channel = pusher.subscribe('jk-message-channel');
        channel.bind('on-message', data => {
            this.setState({ pusherMSG:data});
        });
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
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
        console.log("date",date);
        this.setState({ selectedDate: date });
    };
    onchangeDate=(event)=>{
        console.log("event.target.value",event.target.value);
        this.setState({selectedDate:event.target.value})

    }
    handleBillrunDateChange = date => {
        console.log("date",date);
        this.setState({selectedDate:date});


    };
    onchangeMessage=(e)=>{

        this.setState({message:e.target.value})

    }
    successmesssage=()=>{
        this.props.showMessage({
            message     : 'Created New Bill Run Success!!!',//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
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
    billrun=()=>{

        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
        // console.log("this.state.auth",this.props.auth);
        if(this.props.auth && this.props.auth !==null){
            let date = this.state.selectedDate;
            let year = moment(date).year();
            let month = moment(date).month()+1;
            let user = this.props.auth.firstName+ this.props.auth.lastName;
            let userid   = this.props.auth.UserId;
            let regionid = this.props.auth.defaultRegionId;
            if(userid && userid != null && regionid && regionid != null && year && year != null && month && month !=null ){
                let getres = this.props.createbillrun(
                    regionid,
                    year,
                    month,
                    user,
                    userid,
                    this.state.message
                );
                this.setState({statusMSG:200});
                this.setState({showP: !this.state.showP});

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
        console.log("GGGG");
    }
    render() {

        const { classes,loading ,billstatus} = this.props;
        const { selectedDate ,showP,auth,billruns} = this.state;
        return (
            <div>
                {showP === false && loading && loading !==null && (//loading && loading !==null
                    <div className={classes.overlay}>
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
                        Create New Bill Run
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
                                label="Message"
                                multiline
                                rows="10"
                                defaultValue=""

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
        billruns        : billruns.billruncreate,
        loading         : billruns.loadingstatus,
        auth            : auth.login,
        billstatus      : billruns.billrunstatus,
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(BillRunDialog);
export default (withStyles(styles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(BillRunDialog)));