import React, {Component} from 'react';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

import {MenuItem, OutlinedInput, withStyles} from "@material-ui/core";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import  {CircularProgress,IconButton,Button,Dialog, TextField, Typography, Grid,
} from '@material-ui/core';

//3rd party
import PropTypes from 'prop-types';
import _ from 'lodash';
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
        labelWidth: 0,
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
        let all_regions = this.props.all_regions;
        let region = all_regions.filter(r=>r.regionid===this.props.regionId);

        let period = region[0].OpenPeriods.current;
        let month = period.month-1;

        this.setState({month: month});
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


    onChangeMessage=(e)=>{
        this.setState({message:e.target.value})
    };

    onChangeDescription=(e)=>{
        this.setState({description:e.target.value})
    };

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
    };

    createBillrunMesssage=()=>{
        this.props.showMessage({
            message     : `Bill Run Process has started.You will be notified when completed.\n You can continue using the system as usual`,//text or html
            autoHideDuration: 3000,//ms
            anchorOrigin: {
                vertical  : 'top',//top  bottom
                horizontal: 'center'//left center right
            },
            variant: 'success'//success error info warning null
        });
    };

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
    };

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
    };

    billrun=(e)=>{

        e.stopPropagation();

        if(this.props.auth && this.props.auth !==null){
            let year = parseInt(this.setState.year);
            let month = parseInt(this.state.month)+1;
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

            if(checkflag && this.state.isMounted && userid != null && regionid && year && month ){
                this.props.createBillrun(this.props.regionId, year, month, user, userid, this.state.message, this.state.description);

                this.createBillrunMesssage();
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


    };

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
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        let year = event.target.name==='year' ? event.target.value : this.state.year;
        let month = event.target.name==='month' ? event.target.value : this.state.month;

        let defMSG = `MONTHLY CONTRACT BILLING AMOUNT FOR `+mL[month].toUpperCase()+` `+year;
        this.setState({
            desMSG: defMSG
        });
    };


    render() {

        const { classes,loading } = this.props;
        const { showP} = this.state;
        let years = _.range(moment().year(), moment().year()+10);

        let all_regions = this.props.all_regions;
        let region = all_regions.filter(r=>r.regionid===this.props.regionId);

        let period = region[0].OpenPeriods.current;
        let year = period.year;
        let month = period.month-1;

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
                        <Grid container>
                            <Grid item sm={6}  className="pr-12">
                                <TextField
                                    margin={"normal"}
                                    name="month"
                                    label="Month"
                                    variant="outlined"
                                    select
                                    value={this.state.month}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="month"
                                            id="month"
                                        />
                                    }
                                    fullWidth
                                >
                                    {mL.map((m, index)=>{
                                        return (<MenuItem disabled={this.state.year===year && index<month} key={index} value={index}>{m}</MenuItem>)
                                    })}
                                </TextField>
                            </Grid>
                            <Grid item sm={6} className="pl-12">
                                <TextField
                                    margin={"normal"}
                                    name="year"
                                    label="Year"
                                    variant="outlined"
                                    select
                                    value={this.state.year}
                                    onChange={this.handleChange}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="year"
                                            id="year"
                                        />
                                    }
                                    fullWidth
                                >
                                    {years.map((year, index)=>{
                                        return (<MenuItem  key={index} value={year}>{year}</MenuItem>)
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                        <br/>
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
                                onChange={this.onChangeDescription}
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
                                onChange={this.onChangeMessage}
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
        createBillrun: Actions.createBillrun,
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
        regionId: auth.login.defaultRegionId,
        all_regions: auth.login.all_regions,
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(BillRunDialog);
export default (withStyles(styles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(BillRunDialog)));
