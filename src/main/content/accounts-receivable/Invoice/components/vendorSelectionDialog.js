import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// core components
import {
    TextField, Typography, Button, IconButton, Grid, Dialog, NoSsr
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

// third party
import _ from 'lodash';
import moment from 'moment'
import Select from 'react-select';

//Utility
import {escapeRegexCharacters} from 'services/utils'
import {
    Control, Menu, NoOptionsMessage, Option,  Placeholder,  SingleValue, ValueContainer
} from "main/content/accounts-receivable/Invoice/selectUtils";

import {emphasize} from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
    layoutForm: {
        flexDirection: 'row',
    },
    button: {
        '& span': {
            textTransform: 'none'
        }
    },
    card: {
        width: '100%',
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 12,
        minWidth: 200,
    },
    textField: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },
    summary: {
        fontSize: 15,
        fontWeight: 700
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
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
    inputOrange: {
        padding: '12px 14px',
        color: 'orange'
    },
    dropdownMenu: {
        '& li': {
            fontSize: 12,
            height: 12,
        }
    },
    picker: {
        padding: '0 6px'
    },
    root1: {
        flexGrow: 1,
    },
    input1: {
        display: 'flex',
        padding: '12px 12px'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 14,
    },
    placeholder: {
        position: 'absolute',
        left: 6,
        fontSize: 14,
    },
    paper: {
        position: 'absolute',
        zIndex: '9999!important',
        marginTop: theme.spacing.unit,
        fontSize: 14,
        left: 0,
        right: 0
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
        vendor: {value:'', label: ''},
        bOpen: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot){
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount(){
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));

    };

    updateVendor = () => {
        const {vendor, vendor_no, vendorDate} = this.state;
        this.props.updateVendor({vendor, vendor_no, vendorDate});
        this.props.hideVendorDialogBox();
    };

    isDisable = ()=>{
        if(this.state.vendor===null) return true;
        return false;
    };

    handleVendorChange = (newValue)=> {
        this.setState({vendor: newValue});
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

        const selectStyles = {
            input: base => ({
                ...base,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const components = { Control, Menu, NoOptionsMessage, Option, Placeholder, SingleValue, ValueContainer };

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="">
                    <Dialog
                        open={this.props.bVendorBox}
                        onClose={()=> this.props.hideVendorDialogBox()}
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
                                        <NoSsr>
                                            <Select
                                                autoFocus
                                                classes={classes}
                                                styles={selectStyles}
                                                value={this.state.vendor}
                                                components={components}
                                                onChange={(v)=>this.handleVendorChange(v)}
                                                options={vendors}
                                                placeholder="Select a vendor"
                                            />
                                        </NoSsr>
                                    </div>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=> this.props.hideVendorDialogBox()} color="primary">
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
        showVendorDialogBox: Actions.showVendorDialogBox,
        hideVendorDialogBox: Actions.hideVendorDialogBox,
        updateVendor: Actions.updateVendor,
    }, dispatch);
}

function mapStateToProps({transactions, invoices})
{
    return {
        transactionForm: transactions.transactionForm,
        bVendorBox: transactions.transactionForm.bVendorBox,
        vendorList: invoices.vendorList
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorDialogBox)));
