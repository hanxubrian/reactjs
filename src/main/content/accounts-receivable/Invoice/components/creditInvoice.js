import React from 'react';

//Material-UI core
import {Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent,
    Icon, IconButton, InputAdornment, MenuItem
} from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

//third party
import classNames from 'classnames';
import moment from 'moment';

import {
    NumberFormatCustom2,
} from "../../../../../services/utils";


const styles = theme => ({
    root: {
        '& .react-grid-Cell': {
            background: '#565656',
            color: 'white',
        },
        '& .react-grid-HeaderCell': {
            background: '#424242',
            color: 'white',
        },
        '& .react-grid-Row:hover .react-grid-Cell': {
            background: ' #3d6d8a',
        },
        '& .react-grid-Canvas, .react-grid-Grid': {
            background: '#7b7b7b',
        }
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        maxWidth: 200,
    },
    input: {
        padding: '12px 14px'
    },
    label: {
        transform: 'translate(14px, 14px) scale(1)'
    },
});

const BlueDialogTitle = withStyles(theme => ({
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
        <DialogTitle disableTypography className={classes.root}>
            {children}
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <Icon>close</Icon>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});
const initialState = {
    Reason: "",
    PaymentDate: moment().format('YYYY-MM-DD'),
    PaymentAmount: 0,
    overpayment: 0,
    errorMsg: "",
};

class CreditInvoiceFormModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            invoiceAmount: 0.0
        }
    }

    componentWillMount() {

    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.invoiceForm.data!==null) {
            let lines = nextProps.invoiceForm.data.line;
            let s = 0;
            lines.forEach(line=>{
                s+=parseFloat(line.total);
            });
            this.setState({PaymentAmount: s});
            this.setState({invoiceAmount: s});
        }
    }

    handleClose = () => {
        this.setState({
            ...initialState
        });
    };

    handleCreatePayment = () => {
        if (this.checkValidations()) {

            let customer = this.props.invoiceForm.customer;
            let PayItems = [{ InvoiceNo: this.props.invoiceDetail.Data.Inv_no,  Amount: this.state.PaymentAmount}];

            this.props.createAccountReceivablePayment(
                this.props.regionId,
                customer.CustomerNo,
                'Credit',//Payment Type
                this.state.Reason,
                this.state.PaymentDate,
                '',//note
                this.getOverpaymentAmount(),
                this.state.PaymentAmount,

                PayItems,

                this.props.getPaymentsParam.fromDate,
                this.props.getPaymentsParam.toDate,
                this.props.searchText,
                this.props.filter.paymentStatus
            );

            this.handleClose();
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            errorMsg: ""
        });
    };

    getOverpaymentAmount() {
        return this.state.PaymentAmount - this.state.invoiceAmount;
    }

    checkValidations() {
        if (!this.state.Reason || !this.state.Reason.toString().trim()) {
            this.setState({
                errorMsg: "Reason is invalid",
                overpayment: this.getOverpaymentAmount(),
            })
        }
        else if (!this.state.PaymentDate) {
            this.setState({
                errorMsg: "Payment date not selected",
                overpayment: this.getOverpaymentAmount(),
            })
        }
        else if (this.state.PaymentAmount <= 0) {
            this.setState({
                errorMsg: "Amount is invalid",
                overpayment: this.getOverpaymentAmount(),
            })

        }
        // else if (!this.checkIfAllZeroPaymentsValidation(rows)) {
        //     this.setState({ errorMsg: "Neither of payments amount is settled" })
        // }
        // else if (!this.checkIfAPaymentGreaterThanBalanceValidation(rows)) {
        //     this.setState({ errorMsg: "One or more Payment Amounts is greater than Invoice Balance" })
        // }
        // else if (!this.checkIfAllPaymentsGreaterThanAmountValidation(rows, paymentAmount)) {
        //     this.setState({ errorMsg: "Sum of payments is greater than applied one." })
        else {
            return true
        }
        return false
    }

    checkIfAllZeroPaymentsValidation(rows) {
        let existPositivePayment = false;
        rows.forEach(x => {
            existPositivePayment = existPositivePayment || 0 < x.PaymentAmount
        });
        return existPositivePayment
    }

    checkIfAPaymentGreaterThanBalanceValidation(rows) {
        let existPaymentsGreaterThanBalance = false;
        rows.forEach(x => {
            existPaymentsGreaterThanBalance = existPaymentsGreaterThanBalance || x.InvoiceBalance < x.PaymentAmount
        });
        return !existPaymentsGreaterThanBalance
    }

    checkIfAllPaymentsGreaterThanAmountValidation(rows, paymentAmount = this.state.PaymentAmount) {
        let totalPaymentAmount = 0;
        paymentAmount = parseFloat(`0${paymentAmount}`);
        rows.forEach(x => {
            totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
        });
        return totalPaymentAmount <= paymentAmount
    }

    render() {
        const { classes, invoiceForm } = this.props;
        let customer = invoiceForm.customer;

        return (
            <div>
                <Dialog
                    open={this.props.bOpenCreditInvoiceForm}
                    fullWidth={true}
                    maxWidth="md"

                    onClose={()=>this.props.closeCreditInvoiceFormDialog()}
                    scroll="paper"
                    aria-labelledby="form-dialog-title"
                >
                    <BlueDialogTitle id="form-dialog-title" onClose={this.props.closeCreditInvoiceFormDialog}>
                        <h2 style={{ display: "flex", alignItems: "center", color: "white" }}>
                            <Icon>attach_money</Icon>
                            Add Credit
                        </h2>
                    </BlueDialogTitle>
                    <DialogContent style={{paddingBottom: 0}}>
                        <div className={classNames("flex flex-col")}>
                            <div className={classNames("flex flex-col")}>
                                {customer!==null && (
                                    <div className="flex flex-row flex-1 w-full">
                                        <TextField type="text" value={customer.CustomerName} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">person_outline</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerName" label="CustomerName" />
                                        <TextField type="text" value={customer.CustomerNo} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">apps</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerNumber" label="CustomerNumber" />
                                    </div>

                                )}
                                <div className="flex flex-1 justify-between w-full" >
                                    <TextField
                                        type="date"
                                        id="PaymentDate"
                                        label="Date"
                                        className={classNames(classes.textField, "mr-12")}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        InputProps={{
                                            classes: {input: classes.input}
                                        }}
                                        value={this.state.PaymentDate}
                                        onChange={this.handleChange('PaymentDate')}
                                        margin="normal" fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="PaymentAmount"
                                        name="PaymentAmount"
                                        label="Amount"
                                        className={classNames(classes.textField, 'ml-12')}
                                        value={this.state.PaymentAmount}
                                        onChange={this.handleChange('PaymentAmount')}
                                        margin="normal" fullWidth
                                        variant="outlined"
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom2,
                                            classes: {
                                                input: classNames(classes.input, "text-right")
                                            },
                                        }}
                                    />
                                    <TextField  margin="normal" id="Reason" label="Reason" variant="outlined"
                                                fullWidth
                                                onChange={this.handleChange('Reason')}
                                                placeholder="Reason"
                                                value={this.state.Reason}
                                                className={classNames("ml-12")}
                                                InputProps={{
                                                    classes: {input: classes.input}
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {outlined: classes.label}
                                                }}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className={classNames(classes.root, "flex flex-col flex-1 mt-12")}>
                            {this.state.overpayment > 0 &&
                            <span className="p-12" style={{ background: '#efad49', color: 'black', textAlign: 'right' }}><Icon fontSize={"small"} className="mr-4" style={{ verticalAlign: 'text-bottom' }}>error_outline</Icon><strong>Over Payment: $ {this.state.overpayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></span>
                            }
                            {this.state.errorMsg &&
                            <span className="p-12" style={{ background: 'red', color: 'white', textAlign: 'right' }}><Icon fontSize={"small"} className="mr-4" style={{ verticalAlign: 'text-bottom' }}>warning</Icon><strong>Error: {this.state.errorMsg}</strong></span>
                            }
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" onClick={()=>this.handleCreatePayment()} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-24")}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createAccountReceivablePayment: Actions.createAccountReceivablePayment,
        closeCreditInvoiceFormDialog: Actions.closeCreditInvoiceFormDialog,
    }, dispatch);
}

function mapStateToProps({ accountReceivablePayments, auth, invoices }) {
    return {
        regionId: auth.login.defaultRegionId,
        activePaymentRows: accountReceivablePayments.activePaymentRows,

        payments: accountReceivablePayments.ACC_payments,

        getPaymentsParam: accountReceivablePayments.getPaymentsParam,
        filter: accountReceivablePayments.filter,
        searchText: accountReceivablePayments.searchText,

        bOpenCreditInvoiceForm: invoices.bOpenCreditInvoiceForm,
        invoiceForm: invoices.invoiceForm,
        invoiceDetail: invoices.invoiceDetail,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CreditInvoiceFormModal)));
