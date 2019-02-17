import React, { Fragment } from 'react';
import _ from "lodash";
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Tooltip, Slide, RadioGroup, Radio, FormControlLabel, Paper, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem, Divider, ListItem, List, ListItemText, ListItemLink, Checkbox } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import classNames from 'classnames';

import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    IntegratedSorting,
    EditingState,
    GroupingState,
    IntegratedGrouping,
    DataTypeProvider,
    FilteringState,
    IntegratedFiltering,
    SearchState,
} from '@devexpress/dx-react-grid';
import { Getter } from '@devexpress/dx-react-core';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
    TableEditRow,
    TableEditColumn,
    GroupingPanel,
    Toolbar,
    TableGroupRow,
    TableFilterRow,
    SearchPanel,
    DragDropProvider,
    TableColumnReordering,
    TableColumnResizing,
    ColumnChooser,
    TableColumnVisibility,
    TableFixedColumns,
    VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

import NewIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import ReactDataGrid from "react-data-grid";
import IncreaseDecreaseContractModal from './IncreaseDecreaseContractModal'
import IncreaseDecreaseContractPage from './IncreaseDecreaseContractPage'

import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";

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
    descriptionText: {
        fontSize: 13
    }
})
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const editing_cell_styles = theme => ({
    cell: {
        background: "#989898",
        color: "white",
        padding: 0,
    }
});
const EditingHeaderCellComponentBase = props => {
    return (<TableEditColumn.Cell {...props}

    />);
};

const EditingHeaderCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
    EditingHeaderCellComponentBase
);

const EditingCellComponentBase = props => {
    return (<TableEditColumn.Cell {...props}>
        {React.Children.toArray(props.children)
            .filter((child) => {
                if (child.props.id === 'delete') {
                    // if (props.tableRow.row.id < 2) {
                    // return true;
                    // }
                    return false;
                }
                return true;
            })}
    </TableEditColumn.Cell>)
};

//
// header cell style
//
const header_cell_styles = theme => ({
    cell: {
        background: "#989898",
        color: "white",
    }
});
const tableHeaderCellComponentBase = props => {
    return (<TableHeaderRow.Cell {...props}

    />);
};
const tableHeaderCellComponent = withStyles(header_cell_styles)(
    tableHeaderCellComponentBase
);


const EditingCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
    EditingCellComponentBase
);
const getRowId = row => row.id;

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

class ServiceAgreementPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // bOpenPaymentDialog: props.bOpenPaymentDialog,
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
            PaymentDate: new Date().toISOString().substr(0, 10),
            PaymentNote: "",
            PaymentAmount: 0,
            overpayment: 0,
            errorMsg: "",

            paymentDlgPayloads: {
                open: false,
                paymentType: "Check",
                paymentAmount: 0
            },
            step: 0,
            franchiseeServiceTypes: [],
            franchiseeBillingTypes: [],

            EffectiveDate: new Date().toISOString().substr(0, 10),

            execTitles: [],
            note: '',
            SignDate: moment().format('YYYY-MM-DD'),
            StartDate: moment().format('YYYY-MM-DD'),
            ExpirationDate: moment().format('YYYY-MM-DD'),
        };
        // this.commitChanges = this.commitChanges.bind(this);
        this.props.getLogCallCustomerServiceTypes()

        this.props.getFranchiseeServiceTypes(this.props.regionId)
        this.props.getFranchiseeBillingTypes(this.props.regionId)
    }

    componentWillMount() {
        console.log("componentWillMount")

        let execTitles = []
        if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
            execTitles = this.props.accountExecutiveList.Data.filter(x => {
                if (x.Title === null) return false
                return true
            }).map(x => {
                return x.FirstName + " " + x.LastName
            }).sort();
        }

        this.setState({
            customerServiceTypes: this.props.lists.customerServiceTypes,
            franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
            franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
            execTitles: execTitles,
        })

        this.initCustomerInfo()

    }
    componentDidMount() {
        // if (this.props.bOpenPaymentDialog === true) {
        // 	this.checkValidations()
        // }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.payments !== this.props.payments) {
            console.log("componentWillReceiveProps payments")
            this.setRowData(nextProps.payments)
        }
        if (!_.isEqual(nextProps.activePaymentRows, this.props.activePaymentRows)) {
            console.log("componentWillReceiveProps activePaymentRows", nextProps.activePaymentRows, this.props.activePaymentRows)
            this.setRowData(this.props.payments, nextProps.activePaymentRows)
        }
        if (!_.isEqual(nextProps.paymentDlgPayloads, this.props.paymentDlgPayloads)) {
            this.setState({
                paymentDlgPayloads: nextProps.paymentDlgPayloads,
                PaymentAmount: nextProps.paymentDlgPayloads.paymentAmount,
                PaymentType: nextProps.paymentDlgPayloads.paymentType
            })

            // if (nextProps.bOpenPaymentDialog === true) {
            // 	this.checkValidations()
            // }
        }
        if (nextProps.regionId !== this.props.regionId) {
            this.props.getFranchiseeServiceTypes(nextProps.regionId)
            this.props.getFranchiseeBillingTypes(nextProps.regionId)
        }
        if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
            this.initCustomerInfo(nextProps.activeCustomer.Data)
        }
    }
    initCustomerInfo = (activeCustomerInfo = this.props.activeCustomer.Data) => {
        this.setState({
            SA_Amount: activeCustomerInfo.cont_bill,
            franchieesesToOffer: activeCustomerInfo.AssignedFranchisees,
        })
    }

    handleStep = () => {
        this.setState({
            step: this.state.step === 0 ? 1 : 0
        })

    }
    IncreaseDecreaseContract = () => {
        this.props.showIncreaseDecreaseContractModalForm(true)
    }
    handleClose = () => {

        this.props.showIncreaseDecreaseContractModalForm(false)

    };

    handleChangeChecked = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            errorMsg: ""
        });
        if(name==='length' && event.target.value===1) {
            this.setState({TermMonths: 0});
        }
    };

    render() {
        const { classes, customerForm } = this.props;
        const { execTitles } = this.state;

        return (
            <Fragment>
                {!this.props.increaseDecreaseContractModalForm.open && <>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row justify-between items-center">
                            <TextField
                                type="number"
                                id="SA_Amount"
                                label="Monthly Contract Amount"
                                required
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                                value={this.state.SA_Amount}
                                onChange={this.handleChange('SA_Amount')}
                                margin="dense"
                                variant="outlined"
                                style={{ width: 250 }}

                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    readOnly: true
                                }}
                            />
                            {customerForm.props.open && customerForm.type === "edit" &&
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classNames(classes.button, "pr-24 pl-24 mr-12")}
                                    onClick={this.IncreaseDecreaseContract}
                                >Increase/Decrease<Icon>keyboard_arrow_right</Icon>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.IncreaseDecreaseContract}
                                    className={classNames(classes.button, "pr-24 pl-24")}
                                >Cancel Contract
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.IncreaseDecreaseContract}
                                    className={classNames(classes.button, "pr-24 pl-24")}
                                >Suspend Account
                                </Button>
                            </div>}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="length"
                                label="Length"
                                required
                                select
                                InputLabelProps={{
                                    shrink: true
                                }}
                                className={classNames(classes.textField, "mr-6")}
                                value={this.state.length === undefined ? 0 : this.state.length}
                                onChange={this.handleChange('length')}
                                margin="dense"
                                variant="outlined"
                                style={{ minWidth: "100px", width: "30%" }}
                            >
                                {[{ value: 0, label: "Recurring" }
                                    , { value: 1, label: "One-Time" }
                                    , { value: 2, label: "Variable" }].map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                type="number"
                                inputProps={{ min: "0", max: "99", step: "1" }}
                                id="TermMonths"
                                label="Term Months"
                                required
                                InputLabelProps={{
                                    shrink: true
                                }}
                                className={classNames(classes.textField, "ml-6")}
                                value={this.state.TermMonths}
                                onChange={this.handleChange('TermMonths')}
                                margin="dense"
                                variant="outlined"
                                style={{ width: '10%', minWidth: '110px' }}
                                disabled={this.state.length===1}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="AgreementType"
                                label="Agreement Type *"
                                select
                                InputLabelProps={{
                                    shrink: true
                                }}
                                className={classNames(classes.textField, "mr-6")}
                                value={this.state.AgreementType === undefined ? 1 : this.state.AgreementType}
                                onChange={this.handleChange('AgreementType')}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            >
                                {[{ value: 0, label: "Customer" }
                                    , { value: 1, label: "Jani-King" }
                                    , { value: 2, label: "General" }
                                ].map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="AcctExec"
                                label="Acct Exec"
                                select
                                InputLabelProps={{
                                    shrink: true
                                }}
                                className={classNames(classes.textField, "ml-6")}
                                value={this.state.AcctExec === undefined ? 0 : this.state.AcctExec}
                                onChange={this.handleChange('AcctExec')}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            >
                                {
                                    execTitles.map((x, index) => {
                                        return (<MenuItem key={index} value={index}>{x}</MenuItem>)
                                    })
                                }
                            </TextField>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                type="date"
                                id="SignDate"
                                label="Sign Date *"
                                className={classNames(classes.textField, "mr-6")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={this.state.SignDate}
                                onChange={this.handleChange('SignDate')}
                                margin="dense"
                                variant="outlined"
                                style={{ width: "20%", minWidth: "180px" }}
                            />
                            <TextField
                                type="date"
                                id="StartDate"
                                label="Start Date *"
                                className={classNames(classes.textField, "mr-6 ml-6")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={this.state.StartDate}
                                onChange={this.handleChange('StartDate')}
                                margin="dense"
                                variant="outlined"
                                style={{ width: "20%", minWidth: "180px" }}
                            />

                            <TextField
                                type="date"
                                id="ExpirationDate"
                                label="Expiration Date *"
                                className={classNames(classes.textField, "ml-6")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={this.state.ExpirationDate}
                                onChange={this.handleChange('ExpirationDate')}
                                margin="dense"
                                variant="outlined"
                                style={{ width: "20%", minWidth: "180px" }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="note"
                                label="Note"
                                multiline
                                rows="2"
                                rowsMax="2"
                                className={classes.textField}
                                value={this.state.note}
                                onChange={this.handleChange('note')}
                                margin="dense"
                                variant="outlined"
                                style={{ width: '100%' }}
                            />
                        </GridItem>
                    </GridContainer>
				</>}
                {/* <IncreaseDecreaseContractModal /> */}
                {this.props.increaseDecreaseContractModalForm.open &&
                <IncreaseDecreaseContractPage />
                }
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openPaymentDialog: Actions.openPaymentDialog,
        createAccountReceivablePayment: Actions.createAccountReceivablePayment,

        getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

        getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
        getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
        showIncreaseDecreaseContractModalForm: Actions.showIncreaseDecreaseContractModalForm,
    }, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth }) {
    return {
        regionId: auth.login.defaultRegionId,
        bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
        activePaymentRows: accountReceivablePayments.activePaymentRows,

        payments: accountReceivablePayments.ACC_payments,

        filterParam: accountReceivablePayments.filterParam,
        searchText: accountReceivablePayments.searchText,

        paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

        increaseDecreaseContractModalForm: customers.increaseDecreaseContractModalForm,
        lists: customers.lists,
        franchieesesToOffer: customers.franchieesesToOffer,
        activeCustomer: customers.activeCustomer,
        customerForm: customers.customerForm,
        accountExecutiveList: customers.accountExecutiveList,

    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceAgreementPage)));
