import React from 'react';

//Material-UI core
import {Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, Grid,
    Icon, IconButton, Tooltip, Paper, InputAdornment, MenuItem
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
    escapeRegexCharacters,
    NumberFormatCustom1,
    NumberFormatCustom2,
    NumberFormatCustomDeduction
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
        minWidth: 200
    }
});

const CurrencyFormatter = ({ value }) => (<span>$ {parseFloat(`0${value}`).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$2/$3/$1');

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

class PayInvoiceFormModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            columns: [
                // {
                //     title: "Payment ID",
                //     name: "PaymentId",
                //     columnName: "PaymentId",
                //     width: 200,
                //     sortingEnabled: true,
                //     filteringEnabled: true,
                //     groupingEnabled: false,
                // },
                // {
                // 	title: "C.Name",
                // 	name: "CustomerNameNo",
                // 	columnName: "CustomerNameNo",
                // 	width: 150,
                // 	wordWrapEnabled: true,
                // 	sortingEnabled: true,
                // 	filteringEnabled: true,
                // 	groupingEnabled: true,
                // },
                // {
                // 	title: "C.Name",
                // 	name: "CustomerName",
                // 	columnName: "CustomerName",
                // 	width: 120,
                // 	wordWrapEnabled: true,
                // 	sortingEnabled: true,
                // 	filteringEnabled: true,
                // 	groupingEnabled: true,
                // },

                // {
                // 	title: "C.Number",
                // 	name: "CustomerNo",
                // 	columnName: "CustomerNo",
                // 	width: 120,
                // 	wordWrapEnabled: true,
                // 	sortingEnabled: true,
                // 	filteringEnabled: true,
                // 	groupingEnabled: true,
                // },
                // {
                // 	title: "Check No",
                // 	name: "CheckNo",
                // 	columnName: 'CheckNo',
                // 	width: 180,
                // 	align: 'center',
                // 	sortingEnabled: true,
                // 	filteringEnabled: true,
                // 	groupingEnabled: false,
                // },
                {
                    title: "Invoice No",
                    name: "InvoiceNo",
                    columnName: "InvoiceNo",
                    width: 200,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                    editingEnabled: false,
                },
                {
                    title: "Invoice Date",
                    name: "InvoiceDate",
                    columnName: "InvoiceDate",
                    width: 300,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                    editingEnabled: false,
                },
                {
                    title: "Due Date",
                    name: "DueDate",
                    columnName: "DueDate",
                    width: 300,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                    editingEnabled: false,
                },
                {
                    title: "Invoice Amount",
                    name: "InvoiceAmount",
                    columnName: "InvoiceAmount",
                    width: 300,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                    editingEnabled: false,
                },
                {
                    title: "Invoice Balance",
                    name: "InvoiceBalance",
                    columnName: "InvoiceBalance",
                    width: 300,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                    editingEnabled: false,
                },
                // {
                // 	title: "InvoiceBalance OR",
                // 	name: "InvoiceBalanceOR",
                // 	columnName: 'InvoiceBalanceOR',
                // 	width: 150,
                // 	align: 'center',
                // 	sortingEnabled: true,
                // 	filteringEnabled: true,
                // 	groupingEnabled: false,
                // },
                {
                    title: "Amount to Apply",
                    name: "PaymentAmount",
                    columnName: 'PaymentAmount',
                    width: 300,
                    align: 'right',
                    wordWrapEnabled: true,
                    sortingEnabled: true,
                    filteringEnabled: true,
                    groupingEnabled: false,
                    editingEnabled: true,

                },
                // {
                //     title: "Region Name",
                //     name: "RegionName",
                //     columnName: 'RegionName',
                //     width: 120,
                //     align: 'right',
                //     wordWrapEnabled: true,
                //     sortingEnabled: true,
                //     filteringEnabled: true,
                //     groupingEnabled: false,

                // },
                // {
                // 	title: "Check Amount",
                // 	name: "CheckAmount",
                // 	columnName: 'CheckAmount',
                // 	width: 140,
                // 	align: 'right',
                // 	wordWrapEnabled: true,
                // 	sortingEnabled: true,
                // 	filteringEnabled: true,
                // 	groupingEnabled: false,

                // }
            ],
            columnsForReactDataGrid: [
                { key: "InvoiceNo", name: "Invoice No", editable: false },
                { key: "InvoiceDate", name: "Invoice Date", editable: false, formatter: DateFormatter },
                { key: "DueDate", name: "Due Date", editable: false, formatter: DateFormatter },
                { key: "DaysPastDue", name: "Days Past Due", editable: false, sortDescendingFirst: true },
                { key: "InvoiceAmount", name: "Invoice Amount", editable: false, formatter: CurrencyFormatter },
                { key: "InvoiceBalance", name: "Invoice Balance", editable: false, formatter: CurrencyFormatter },
                { key: "PaymentAmount", name: "Payment to Apply", editable: true, formatter: CurrencyFormatter }
            ],
            rows: [],
            currencyColumns: [
                'InvoiceAmount', 'InvoiceBalance', 'PaymentAmount'
            ],
            customerName: "",
            customerNumber: "",

            PaymentType: "Check",
            ReferenceNo: "",
            PaymentDate: moment().format('YYYY-MM-DD'),
            PaymentNote: "",
            PaymentAmount: 0,
            overpayment: 0,
            errorMsg: "",

        }
    }

    componentWillMount() {

    }
    componentDidMount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    }

    handleClose = () => {
        this.setState({
            PaymentType: "Check",
            ReferenceNo: "",
            PaymentDate: new Date().toISOString().substr(0, 10),
            PaymentNote: "",
            PaymentAmount: 0,
            overpayment: 0,
            errorMsg: "",
        });
    };

    handleCreatePayment = () => {
        if (this.checkValidations()) {

            let PayItems = this.state.rows.map(x => {
                return {
                    InvoiceNo: x.InvoiceNo,
                    Amount: x.PaymentAmount
                }
            });

            this.props.createAccountReceivablePayment(
                this.props.regionId,
                this.state.customerNumber,

                this.state.PaymentType,
                this.state.ReferenceNo,
                this.state.PaymentDate,
                this.state.PaymentNote,
                this.getOverpaymentAmount(this.state.rows),
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

    getOverpaymentAmount(rows = this.state.rows, paymentAmount = this.state.PaymentAmount) {
        let totalPaymentAmount = 0;
        paymentAmount = parseFloat(`0${paymentAmount}`);
        rows.forEach(x => {
            totalPaymentAmount += parseFloat(`0${x.PaymentAmount}`)
        });
        return paymentAmount - totalPaymentAmount;
    }

    checkValidations(rows = this.state.rows, paymentAmount = this.state.paymentAmount) {
        if (!this.state.PaymentType) {
            this.setState({
                errorMsg: "Payment type not selected",
                overpayment: this.getOverpaymentAmount(rows, paymentAmount),
            })
        } else if (!this.state.ReferenceNo || !this.state.ReferenceNo.toString().trim()) {
            this.setState({
                errorMsg: "ReferenceNo is invalid",
                overpayment: this.getOverpaymentAmount(rows, paymentAmount),
            })
        } else if (!this.state.PaymentDate) {
            this.setState({
                errorMsg: "Payment date not selected",
                overpayment: this.getOverpaymentAmount(rows, paymentAmount),
            })
        } else if (this.state.PaymentAmount <= 0) {
            this.setState({
                errorMsg: "Amount is invalid",
                overpayment: this.getOverpaymentAmount(rows, paymentAmount),
            })

        } else if (!this.checkIfAllZeroPaymentsValidation(rows)) {
            this.setState({ errorMsg: "Neither of payments amount is settled" })
        } else if (!this.checkIfAPaymentGreaterThanBalanceValidation(rows)) {
            this.setState({ errorMsg: "One or more Payment Amounts is greater than Invoice Balance" })
        } else if (!this.checkIfAllPaymentsGreaterThanAmountValidation(rows, paymentAmount)) {
            this.setState({ errorMsg: "Sum of payments is greater than applied one." })
        } else {
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
                    open={this.props.bOpenPaymentInvoiceForm}
                    fullWidth={true}
                    maxWidth="lg"

                    onClose={()=>this.props.closePaymentInvoiceFormDialog()}
                    scroll="paper"
                    aria-labelledby="form-dialog-title"
                >
                    <BlueDialogTitle id="form-dialog-title" onClose={this.props.closePaymentInvoiceFormDialog}>
                        <h2 style={{ display: "flex", alignItems: "center", color: "white" }}>
                            <Icon>attach_money</Icon>
                            Invoice Payment
                        </h2>
                    </BlueDialogTitle>
                    <DialogContent>
                        <div className={classNames("flex flex-col")}>
                            <div className={classNames("flex flex-col")}>
                                {customer!==null && (
                                    <div className={classNames("flex")}>
                                        <TextField type="text" value={customer.CustomerName} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">person_outline</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerName" label="CustomerName" />
                                        <TextField type="text" value={customer.CustomerNo} InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><Icon fontSize={"small"} className="mr-4">apps</Icon></InputAdornment> }} margin="dense" fullWidth className={classNames("pr-6")} id="CustomerNumber" label="CustomerNumber" />
                                    </div>

                                )}
                                <div className="flex flex-1 justify-between" >

                                    <TextField select margin="dense" id="PaymentType" label="Payment Type" variant="outlined"
                                               className={classNames(classes.textField, "pr-6")}
                                               value={this.state.PaymentType}
                                               onChange={this.handleChange('PaymentType')}
                                    >
                                        <MenuItem value={"Check"}>Check</MenuItem>
                                        <MenuItem value={"CreditCard"}>Credit Card</MenuItem>
                                        <MenuItem value={"EFT"}>EFT</MenuItem>
                                        <MenuItem value={"Lockbox"}>Lockbox</MenuItem>
                                        <MenuItem value={"CreditFromOverpayment"}>Credit from Overpayment</MenuItem>
                                    </TextField>

                                    <TextField sm={3} margin="dense" id="ReferenceNo" label="Reference No." variant="outlined"
                                               autoFocus
                                               onChange={this.handleChange('ReferenceNo')}
                                               value={this.state.ReferenceNo}
                                               className={classNames(classes.textField, "pr-6")}
                                    />

                                    <TextField sm={1}
                                               type="date"
                                               id="PaymentDate"
                                               label="Payment Date"
                                               className={classNames(classes.textField, "pr-6")}
                                               InputLabelProps={{
                                                   shrink: true
                                               }}
                                               value={this.state.PaymentDate}
                                               onChange={this.handleChange('PaymentDate')}
                                               margin="dense"
                                               variant="outlined"
                                    />
                                    <TextField sm={2}
                                        id="PaymentAmount"
                                        name="PaymentAmount"
                                        label="Payment Amount"
                                        className={classNames(classes.textField, 'mr-12')}
                                        value={this.state.PaymentAmount}
                                               onChange={this.handleChange('PaymentAmount')}
                                        margin="dense"
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

                                </div>

                                <TextField margin="dense" variant="outlined" fullWidth id="PaymentNote" label="Notes" multiline rows="2" rowsMax="2"
                                           value={this.state.PaymentNote}
                                           onChange={this.handleChange('PaymentNote')}
                                />
                            </div>
                            <div className={classNames(classes.root, "flex flex-col flex-1 mt-12")}>
                            </div>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" onClick={this.handleCreatePayment} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-24")}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createAccountReceivablePayment: Actions.createAccountReceivablePayment,
        closePaymentInvoiceFormDialog: Actions.closePaymentInvoiceFormDialog
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

        bOpenPaymentInvoiceForm: invoices.bOpenPaymentInvoiceForm,
        invoiceForm: invoices.invoiceForm,
        invoiceDetail: invoices.invoiceDetail,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PayInvoiceFormModal)));