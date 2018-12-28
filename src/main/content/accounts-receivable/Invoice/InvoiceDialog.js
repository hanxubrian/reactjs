import React, {Component} from 'react';
import {
    TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import {bindActionCreators} from 'redux';
import * as Actions from './../../../../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    }
});
const newInvoiceState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "InvoiceId": "",
    "InvoiceNo": "",
    "InvoiceDate": "",
    "DueDate": "",
    "CustomerId": "",
    "CustomerNo": "",
    "CustomerName": "",
    "EBill": "",
    "PrintInvoice": "",
    "InvoiceDescription": "",
    "InvoiceAmount": "",
    "InvoiceTax": "",
    "InvoiceTotal": "",
    "CPI": "",
    "TransactionStatusListId": "",
    "TransactionStatus": "",
    "InvoiceBalanceAmount": "",
    "InvoiceBalanceTax": "",
    "InvoiceBalanceTotal": "",
    "EBillText": "",
    "PrintInvoiceText": "",
    "IsOpen": "",
    "ConsolidatedInvoice": "",
    "ConsolidatedInvoiceId": "",
    "ConsolidatedInvoiceNo": "",
    "CreditId": "",
};

class InvoiceDialog extends Component {
    state = {...newInvoiceState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.invoiceDialog.props.open && this.props.invoiceDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.invoiceDialog.type === 'edit' &&
                this.props.contactDialog.data &&
                !_.isEqual(this.props.invoiceDialog.data, prevState) )
            {
                this.setState({...this.props.invoiceDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.invoiceDialog.type === 'new' &&
                !_.isEqual(newInvoiceState, prevState) )
            {
                this.setState({...newInvoiceState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.invoiceDialog.type === 'edit' ? this.props.closeEditInvoiceDialog() : this.props.closeNewInvoiceDialog();
    };

    canBeSubmitted()
    {
        return true;
        const {name} = this.state;
        return (
            name.length > 0
        );
    }

    render()
    {
        const {classes, invoiceDialog, addInvoice, updateInvoice, removeInvoice} = this.props;

        return (
            <Dialog
                classes={{
                    root : classes.root,
                    paper: "m-24"
                }}
                className={classes.root}
                {...invoiceDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="lg"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {invoiceDialog.type === 'new' ? 'New Invoice' : 'Edit Invoice'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        <Avatar className="w-96 h-96" alt="contact avatar" src={this.state.avatar}/>
                        {invoiceDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className={classes.formControl}
                            label="Name"
                            autoFocus
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Last name"
                            id="lastName"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">star</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Nickname"
                            id="nickname"
                            name="nickname"
                            value={this.state.nickname}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">phone</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Phone"
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">email</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">domain</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Company"
                            id="company"
                            name="company"
                            value={this.state.company}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">work</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Job title"
                            id="jobTitle"
                            name="jobTitle"
                            value={this.state.jobTitle}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">cake</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            id="birthday"
                            label="Birthday"
                            type="date"
                            value={this.state.birthday}
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">home</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Address"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">note</Icon>
                        </div>
                        <TextField
                            className={classes.formControl}
                            label="Notes"
                            id="notes"
                            name="notes"
                            value={this.state.notes}
                            onChange={this.handleChange}
                            variant="outlined"
                            multiline
                            rows={5}
                            fullWidth
                        />
                    </div>
                </DialogContent>

                {invoiceDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addInvoice(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateInvoice(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeInvoice(this.state.id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditInvoiceDialog: Actions.closeEditInvoiceDialog,
        closeNewInvoiceDialog : Actions.closeNewInvoiceDialog,
        addInvoice            : Actions.addInvoice,
        updateInvoice         : Actions.updateInvoice,
        removeInvoice         : Actions.removeInvoice,
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        invoiceDialog: invoices.invoiceDialog
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(InvoiceDialog));
