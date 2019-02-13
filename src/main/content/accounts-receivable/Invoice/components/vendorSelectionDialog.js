import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// core components
import {
    Typography, Button, IconButton, Grid, Dialog, FormControl, Select,OutlinedInput, InputLabel, MenuItem,TextField
} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import 'date-fns'
import CloseIcon from '@material-ui/icons/Close';


// theme components
import {FuseAnimate} from '@fuse';
import {withStyles} from "@material-ui/core";

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import _ from "lodash";


const styles = theme => ({
    layoutForm: {
        flexDirection: 'row',
    },
    button: {
        '& span': {
            textTransform: 'none'
        }
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 12,
        width: '100%',

    },
    textField: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    input: {
        padding: '12px 14px'
    },
    label: {
        transform: 'translate(14px, 14px) scale(1)'
    },
    root1: {
        flexGrow: 1,
    },
    input1: {
        display: 'flex',
        padding: '12px 12px'
    },
});

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


class VendorDialogBox extends Component {
    state = {
        vendor: '',
        vendorInvoiceNumber: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.itemId!==prevProps.itemId) {
            let lines = this.props.invoiceForm.data.line;
            this.setState({vendor: lines[this.props.itemId].vendorId, vendorInvoiceNumber: lines[this.props.itemId].vendorInvNo});
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount(){
        if(this.props.invoiceForm.data!==null) {
            let lines = this.props.invoiceForm.data.line;

            this.setState({vendor: lines[this.props.itemId].vendorId, vendorInvoiceNumber: lines[this.props.itemId].vendorInvNo});
        }
    }

    updateVendor = () => {
        this.props.updateInvoiceVendor(this.state.vendor, this.state.vendorInvoiceNumber);
        this.props.closeInvoiceVendorDialogBox();
    };

    isDisable = ()=>{
        if(this.state.vendor==='' || this.state.vendorInvoiceNumber==='') return true;
        return false;
    };

    handleVendorChange = (event)=> {
        this.setState({vendor: event.target.value});
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render()
    {
        let vendors = [];

        if(this.props.vendorList!==null) {
            vendors = this.props.vendorList.map(v=>{
                return {value:  v.VendorID, label: v.Name}
            })
        }

        const {classes} = this.props;

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="">
                    <Dialog
                        open={this.props.bInvoiceVendorBox}
                        onClose={()=> this.props.closeInvoiceVendorDialogBox()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        maxWidth={'sm'}
                    >
                        <DialogTitle id="alert-dialog-title">Vendor Choice</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <div className={classes.root1}>
                                        <TextField
                                            id="vendor-choice"
                                            select
                                            fullWidth
                                            autoFocus={true}
                                            label="Vendor Choice"
                                            className={classes.textField}
                                            value={this.state.vendor}
                                            onChange={this.handleVendorChange}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            required
                                            margin="normal"
                                            variant="outlined"
                                        >
                                            {vendors.length>0 && vendors.map(v=>(
                                                <MenuItem  key={v.value} value={v.value}>
                                                    {v.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <TextField
                                            id="vendorInvoiceNumber"
                                            label="Vendor Invoice Number"
                                            name="vendorInvoiceNumber"
                                            value={this.state.vendorInvoiceNumber}
                                            onChange={this.handleChange('vendorInvoiceNumber')}
                                            placeholder="Vendor Invoice Number"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                                autoFocus: true
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=> this.props.closeInvoiceVendorDialogBox()} color="primary">
                                Close
                            </Button>
                            <Button
                                disabled={this.isDisable() ? true: false}
                                onClick={()=>this.updateVendor()} color="primary" autoFocus>
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeInvoiceVendorDialogBox: Actions.closeInvoiceVendorDialogBox,
        updateInvoiceVendor: Actions.updateInvoiceVendor,
        updateVendor: Actions.updateVendor,
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        vendorList: invoices.vendorList,
        bInvoiceVendorBox: invoices.bInvoiceVendorBox,
        invoiceForm: invoices.invoiceForm,
        itemId: invoices.itemId
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorDialogBox)));
