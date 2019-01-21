import React from 'react';
import {withRouter} from 'react-router-dom';

//Material UI core and icons
import {
    Snackbar, SnackbarContent, TextField, NoSsr, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
    Paper, Icon, IconButton, MenuItem, Fab, Button
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

// third party
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Autosuggest from 'react-autosuggest';
import Select1 from 'react-select';
import {Control,Menu, SingleValue, Placeholder, ValueContainer, inputComponent,NoOptionsMessage,Option, useStyles} from './selectUtils';

//Store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import keycode from "keycode";

//Utility
import {NumberFormatCustom, escapeRegexCharacters, NumberFormatCustom1, NumberFormatCustomPercent, NumberFormatCustom2} from '../../../../services/utils'
import {emphasize} from "@material-ui/core/styles/colorManipulator";


//Snackbar
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

let counter = 0;

function createFranchisee(parent_id,id, fnumber="", name="", amount=0) {
    return {
        id: parent_id,
        fid: id,
        fnumber,
        name,
        amount,
        type: 'franch'
    }
}

function createData(billing='Regular Billing', service='Adjust-Balance', description='', quantity='', amount='', tax=0, markup='', extended=0, total=0, markupAmount=0, markupTax=0)
{
    return {
        id: counter++,
        billing,
        service,
        description,
        quantity,
        amount,
        tax,
        markup,
        markupAmount,
        markupTax,
        extended,
        total,
        franchisees: [],
        type: 'line'
    };
}

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                }
            }}
            {...other}
        />
    );
}

const styles = theme => ({
    root        : {
        width    : '100%',
        marginTop: theme.spacing.unit,
        head: {
            color: 'black',
        },
        '& .ReactTable .rt-thead.-headerGroups': {
            display: 'none'
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group':{
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-td':{
            padding: '0 5px'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
        '& .franchiRow': {
            '& .f1': {
                width: '100px',
                minWidth: 100,
                padding: '0 10px',
                border: '1px solid lightgray',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                marginTop: 4,
                height: 32
            },
            '& .f2': {
                width: '100%',
                padding: '4px 8px',
                border: '0px solid lightgray',
                borderRadius: 6,
                marginLeft: 10
            }
        },
        '& .taxColumn': {
            maxWidth: '160px!important'
        },
        InvoiceLineHeadRoot:{
            backgroundColor: 'lightgray',
        },
        selectRoot:{
            backgroundColor: 'green'
        }
    },
    outlined: {
        padding: "6px 24px 6px 12px!important"
    },
    billing:{
        width: 170,
        fontSize: '1.3rem'
    },
    services:{
        width: 180,
        fontSize: '1.3rem'
    },
    dropdownMenu:{
        '& li':{
            fontSize: 12,
            height: 12,
        }
    },
    lineButton: {
        width: 24,
        height: 24,
        minHeight: 24,
        [theme.breakpoints.down('sm')]: {
            width: 24,
            height: 24,
            minHeight: 24,
        },
        '& .material-icons':{
            fontSize: 16
        }
    },
    lineCancelButton:{
        width: 24,
        height: 24,
        minHeight: 24,
        backgroundColor: '#ff4850',
        color: 'white',
        '&:hover':{
            backgroundColor: '#ff2a32',
        },
        [theme.breakpoints.down('sm')]: {
            width: 24,
            height: 24,
            minHeight: 24,
            padding: 0
        },
        '& .material-icons':{
            fontSize: 16
        }
    },
    distribution: {
        '& span': {
            backgroundColor: 'lightgrey',
            padding: '6px 12px',
            borderRadius: 20
        }
    },
    tableTheadRow:{
        backgroundColor: theme.palette.primary.main
    },
    input: {
        fontSize: 13
    },
    fInput: {
        width: '96%',
        marginLeft: 15,
        '& input': {
            fontSize: 13,
            textAlign: 'right',
        }
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    suggestionsContainerOpen: {
        position: 'fixed',
        zIndex: 100,
        marginTop: theme.spacing.unit,
        maxHeight: 200,
        overflowY: 'scroll',
        backgroundColor: 'white',
        borderRadius: 6,
        border: '1px solid lightgray'
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    root1: {
        flexGrow: 1,
    },
    input1: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        '&+div':{

        }
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
        fontSize: 12,
    },
    placeholder: {
        position: 'absolute',
        left: 6,
        fontSize: 12,
    },
    paper: {
        position: 'fixed',
        zIndex: '9999!important',
        marginTop: theme.spacing.unit,
        fontSize: 12
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    billingSuggestion:{
        '& >div':{
            width: '100%'
        }
    }
});

function renderSuggestion (suggestion,  { isHighlighted }) {
    return (
        <MenuItem selected={isHighlighted} component="div">
            <span>{suggestion.Number} - {suggestion.Name}</span>
        </MenuItem>
    );
}

class InvoiceLineTable extends React.Component {
    state = {
        order      : 'asc',
        selected   : [],
        data       :  this.props.invoiceForm.type === 'new' ? [
            createData({label: this.props.billingLists[0].Name, value:this.props.billingLists[0].BillingTypeId}, "Adjust-Balance", '',''),
        ] : [],
        page       : 0,
        rowsPerPage: 10,
        labelWidth: 0,
        openSnack: false,
        snackMessage: 'Please fill the data',
        nameValue0: '',
        nameValue1: '',
        nameValue2: '',
        nameValue3: '',
        nameValue4: '',
        nameValue5: '',
        nameValue6: '',
        nameValue7: '',
        nameValue8: '',
        nameValue9: '',
        nameValue10: '',
        nameValue11: '',
        nameValue12: '',
        nameValue13: '',
        nameValue14: '',
        nameValue15: '',
        nameValue16: '',
        nameValue17: '',
        nameValue18: '',
        nameValue19: '',
        nameValue20: '',
        nameSuggestions: [],
        numberSuggestions: [],
        taxRowId: 0,
        customerTaxAmountLine: null,
        selectedBillingOption0: {label: this.props.billingLists[0].Name, value:this.props.billingLists[0].BillingTypeId},selectedBillingOption1: null,selectedBillingOption2: null,selectedBillingOption3: null,
        selectedBillingOption4: null,selectedBillingOption5: null,selectedBillingOption6: null,selectedBillingOption7: null,
        selectedBillingOption8: null,selectedBillingOption9: null,selectedBillingOption10: null,selectedBillingOption11: null,
        selectedBillingOption12: null,selectedBillingOption13: null,selectedBillingOption14: null,selectedBillingOption15: null,
        selectedServiceOption0: null,selectedServiceOption1: null,selectedServiceOption2: null,selectedServiceOption3: null,
        selectedServiceOption4: null,selectedServiceOption5: null,selectedServiceOption6: null,selectedServiceOption7: null,
        selectedServiceOption8: null,selectedServiceOption9: null,selectedServiceOption10: null,selectedServiceOption11: null,
        selectedServiceOption12: null,selectedServiceOption13: null,selectedServiceOption14: null,selectedServiceOption15: null,
        bTaxAlert: false,
        bTaxAlertReduction: false,
        bAllowAlertReduction: false,
        billingSuggestions: this.props.billingLists.map(b => ({
            value: b.BillingTypeId, label: b.Name})),
        serviceSuggestions: this.props.serviceLists.map(s=>({
            BillingTypeId: s.BillingTypeId, label: s.Name, value: s.Name
        }))
    };

    constructor(props) {
        super(props);
        // this.addInvoiceLineFunction = this.addInvoiceLineFunction.bind(this);
    }

    componentWillMount() {
        this.props.updateInvoiceLine(this.state.data);
    }
    componentWillUnmount() {
        // document.removeEventListener("keydown", this.addInvoiceLineFunction, false);
    }

    addInvoiceLineFunction(event){
        if(keycode(event)==='enter' || keycode(event)==='down'){
            // this.addLineData();
        }
    }

    handleChangeBilling = (event, n) => {
        let newData = this.state.data.map(row=>{
            let temp = row;
            if(n.id===row.id){
                temp[event.target.name] = event.target.value
            }
            return temp;
        });

        this.setState({data: newData})
    };

    componentDidMount(){
        document.addEventListener("keydown", this.addInvoiceLineFunction, false);
        if(this.props.invoiceForm.type === 'new') {
            let id = 0;
            const data = [...this.state.data];
            let newData = data.map(record=>{
                record.id = id++;
                return record;
            });
            this.setState({data: newData});
        }
        else {//For Edit
            let items = this.props.invoiceDetail.Data.Items;

            if(items.length>0){
                let newData = items.map((item, index)=>{
                    let billing = this.state.billingSuggestions.filter(b=>b.value===parseInt(item.Billing));
                    this.setState({[`selectedBillingOption${index}`]: billing});
                    return createData(billing[0], 'Adjust-Balance', item.Description, item.Quantity, item.UnitPrice, item.TaxRate, 5, item.ExtendedPrice, item.Total, item.MarkUpTotal)
                });

                this.setState({data: newData});
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.data!==null && prevState.data!==this.state.data) {
            this.props.updateInvoiceLine(this.state.data);
        }
        if(JSON.stringify(this.state.customerTaxAmountLine)!== JSON.stringify(prevState.customerTaxAmountLine)){
            this.updateTaxFromLine();
        }

        if(this.props.fn!==null && prevProps.fn!==this.props.fn){
            let selectedFranchiess =[];
            let franchisees = this.props.franchisees.Data.Region[0].FranchiseeList;
            this.props.fn.forEach(f=>{
                selectedFranchiess = _.filter(franchisees, franchisee=>f.Number===franchisee.Number && f.Name===franchisee.Name);
            });

            if(selectedFranchiess.length>0) {
                const data = [...this.state.data];

                let f_row = data[0];

                let findex = 0;
                selectedFranchiess.forEach(sf=>{
                    let fline = createFranchisee(0, findex, sf.Number, sf.Name, sf.DistributionAmount);
                    f_row.franchisees = [...f_row.franchisees, fline];
                    this.setState({["nameValue"+findex]: sf.Name});
                    findex++;
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.customerTaxAmountLine)!==JSON.stringify(nextProps.customerTaxAmountLine)){
            this.setState({customerTaxAmountLine: nextProps.customerTaxAmountLine})
        }

        //for save & add more
        if(nextProps.invoiceForm.data===null && JSON.stringify(nextProps.invoiceForm.data)!==JSON.stringify(this.props.invoiceForm.data)){
            let newData = createData({label: this.props.billingLists[0].Name, value:this.props.billingLists[0].BillingTypeId}, "Adjust-Balance", '','');
            this.setState({data: [{...newData, id: 0}]});
        }
    }

    updateTaxFromLine = ()=> {
        const data = [...this.state.data];
        const {taxRowId, customerTaxAmountLine} = this.state;
        data[taxRowId].tax = customerTaxAmountLine.TotalTaxAmount;
        data[taxRowId].extended = customerTaxAmountLine.ExtendedPrice;
        data[taxRowId].total = customerTaxAmountLine.TotalAmount;
        data[taxRowId].markupAmount = customerTaxAmountLine.MarkupAmount;
        data[taxRowId].markupTax = customerTaxAmountLine.MarkupTax;
        this.setState({data: data});
        this.setState({bAllowAlertReduction: true});
    };

    // For Franchisee suggestion
    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');

        let franchisees = this.props.franchisees.Data.Region[0].FranchiseeList;
        return franchisees.filter(f => regex.test(f.Number) || regex.test(f.Name));
    };

    getSuggestionfName = (suggestion) => {
        return suggestion.Name;
    };

    onNameChange = row =>(event, { newValue }) => {
        this.setState({
            ["nameValue"+row.f_index]: newValue
        });
        const data = [...this.state.data];
        data[row.id].franchisees[row.fid].name = newValue;
        this.setState({data: data});
    };

    onNameSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            nameSuggestions: this.getSuggestions(value)
        });
    };

    onNameSuggestionsClearRequested = () => {
        this.setState({
            nameSuggestions: []
        });
    };

    onNameSuggestionSelected = row => (event, { suggestion }) => {
        const data = [...this.state.data];
        data[row.id].franchisees[row.fid].fnumber = suggestion.Number;
        this.setState({data: data});
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };

    handleTaxAlertClose = () => {
        this.setState({ bTaxAlert: false });
    };

    handleTaxAlertReductionClose = () => {
        this.setState({ bTaxAlertReduction: false });
    };

    addLineData=(row)=>{
        if(this.props.invoiceForm.customer===null) {
            this.setState({snackMessage: 'Please choose customer from Invoice suggestion'});
            this.setState({openSnack: true});
            return;
        }

        if(row.description==='') {
            this.setState({snackMessage: 'Please enter description'});
            this.setState({openSnack: true});
            return;
        }

        if(row.quantity==='') {
            this.setState({snackMessage: 'Please enter quantity'});
            this.setState({openSnack: true});
            return;
        }

        if(row.amount==='') {
            this.setState({snackMessage: 'Please enter amount'});
            this.setState({openSnack: true});
            return;
        }

        const data = [...this.state.data, createData({label: this.props.billingLists[0].Name, value:this.props.billingLists[0].BillingTypeId})];
        this.setState({
            ["selectedBillingOption"+parseInt(data.length-1)]: {label: this.props.billingLists[0].Name, value:this.props.billingLists[0].BillingTypeId}
        });

        let id = 0;
        let newData = data.map(record=>{
            record.id = id++;
            return record;
        });
        this.setState({data: newData})
    };

    addFranchiseeLine = (n) =>{
        const data = [...this.state.data];
        let fline = createFranchisee(n.id, n.franchisees.length);
        n.franchisees = [...n.franchisees, fline];

        let newData = data.map(record=>{
            if(record.id===n.id)
                record = n;
            return record;
        });
        this.setState({data: newData})
    };

    removeLineData=(line)=>{
        const data = [...this.state.data];
        _.remove(data, function (row) {
            return row.id === line.id;
        });
        let id = 0;
        let newData = data.map(record=>{
            record.id = id++;
            return record;
        });

        this.setState({data: newData})
    };

    removeFranch=(row)=>{
        const data = [...this.state.data];

        data.forEach(d=>{
            if(d.franchisees.length>0 && d.id===row.id){
                let franchisees = d.franchisees;
                _.remove(franchisees, function (record) {
                    return record.fid === row.fid
                })
            }
        });

        data.forEach(d=>{
            if(d.franchisees.length>0 && d.id===row.fid){
                let fid=0;
                let franchisees = d.franchisees;
                let newData = franchisees.map(record=>{
                    record.fid = fid++;
                    return record;
                });
                d.franchisees = newData
            }
        });
        this.setState({data: data});
        this.setState({['nameValue'+row.f_index]: ''})
    };

    getInvoiceLineTaxAmount = row =>{
        if(!this.isDisable(row)) {
            let markup = 0.0;
            if(row.markup!=='') markup = row.markup;
            this.props.getCustomerTaxAmount(this.props.regionId, this.props.invoiceForm.customer.CustomerId, row.amount, row.quantity, markup);
            this.setState({taxRowId: row.id})
        }
    };

    handleChange = row => event => {
        const data = [...this.state.data];
        data[row.id].franchisees[row.fid].amount = parseFloat(event.target.value);
        this.setState({data: data});
    };

    handleChangeDesc = row => event => {
        const data = [...this.state.data];
        data[row.id].description = event.target.value;
        this.setState({data: data});
    };

    handleChangeInvoiceLine = (row, name) => event => {
        const data = [...this.state.data];
        let value = event.target.value;
        if (name==='amount')  value = parseFloat(value);
        if (name==='quantity')  value = parseInt(value);

        data[row.id][name] = value;
        this.setState({data: data});

        if(!this.isDisable(row) && name!=='tax')
            this.getInvoiceLineTaxAmount(row)
    };

    handleChangeInvoiceTaxLine = (row, name) => event => {
        const data = [...this.state.data];
        if(this.props.invoiceForm.customer===null) return;

        if(this.props.invoiceForm.customer.TaxExempt==='N' && name==='tax' && parseFloat(event.target.value)===0) {
            this.setState({bTaxAlert: true});
            return;
        }
        if(this.state.bAllowAlertReduction && this.props.invoiceForm.customer.TaxExempt==='N' && name==='tax' && parseFloat(event.target.value)!==0 &&
            parseFloat(event.target.value)<parseFloat(data[row.id][name])
        ) {
            // this.setState({bTaxAlertReduction: true});
            // return;
        }

        data[row.id][name] = event.target.value;
        this.setState({data: data});

        if(!this.isDisable(row) && name!=='tax')
            this.getInvoiceLineTaxAmount(row)
    };

    isDisable = row =>{
        if(this.props.invoiceForm.customer===null) {
            this.setState({snackMessage: 'Please choose customer from Invoice suggestion'});
            this.setState({openSnack: true});
            return true;
        }
        if(row.quantity==='') return true;
        if(row.amount==='') return true;
    };

    handleBillingChange = (newValue, row) => {
        this.setState({
            ["selectedBillingOption"+row.id]: newValue
        });
        const data = [...this.state.data];
        data[row.id].billing = newValue;
        this.setState({data: data});
    };

    handleServiceChange = (newValue, row) => {
        this.setState({
            ["selectedServiceOption"+row.id]: newValue
        });
        const data = [...this.state.data];
        data[row.id].service = newValue;
        this.setState({data: data});
    };

    render()
    {
        const {classes} = this.props;
        const {data} = this.state;

        const components = {
            Control,
            Menu,
            NoOptionsMessage,
            Option,
            Placeholder,
            SingleValue,
            ValueContainer,
        };

        const selectStyles = {
            input: base => ({
                ...base,
                // color: ,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const {
            nameSuggestions,
        } = this.state;

        let all_data = [];

        let f_index = 0;
        data.forEach(d=>{
            if(d.franchisees.length===0) return all_data.push(d);
            let franchisees = d.franchisees;
            all_data.push(d);
            franchisees.forEach(f=>{
                all_data.push({f_index: f_index++,...f});
            });
        });

        let billingSuggestions = [];
        if(this.props.billingLists!==null && this.props.billingLists.length>0) {
            billingSuggestions = this.props.billingLists.map(b => ({
                value: b.BillingTypeId, label: b.Name
            }));
        }

        const serviceSuggestions =[
            {label: "Adjust-Balance"}, {label: "Adjust-Refund"}, {label: "Adjust-WriteOff"}, {label: "Buffing"},
            {label: "Carpet Clean"}, {label: "Customer Suppliers"}, {label: "Emergency Clean"}, {label: "Event Center"},
            {label: "Floor Services"}, {label: "Furniture Cleaning Service"}, {label: "High Dusting"}, {label: "Hotel"},
            {label: "In-House Work"}, {label: "Initial and Deep Clean"}, {label: "Initial One-Time Clean"}, {label: "Make Ready"},
            {label: "Miscellaneous - Special"}, {label: "Other"}, {label: "Porter Services"}, {label: "Power Washing"},
            {label: "Regular Billing"}, {label: "Regular Cleaning - Day"}, {label: "Regular Cleaning - Night"}
        ].map(suggestion => ({
            value: suggestion.label,
            label: suggestion.label,
        }));

        return (
            <Paper className={classNames(classes.root)}>
                <div className={classNames(classes.tableWrapper, "flex flex-col h-full")}>
                    <ReactTable
                        data={all_data}
                        minRows = {0}
                        showPagination ={false}
                        getTheadThProps={(state, rowInfo, column, instance) =>{
                            let border = '1px solid rgba(255,255,255,.6)';
                            if(column.Header==='Action') border = 'none';

                            return {
                                style:{
                                    fontSize: 13,
                                    fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
                                    fontWeight: 400,
                                    lineHeight: 2.0,
                                    color: 'white',
                                    borderRight: border
                                },
                            }
                        }}
                        getTheadProps={(state, rowInfo, column, instance) =>{
                            return {
                                style:{
                                    fontSize: 13,
                                },
                                className: classes.tableTheadRow
                            }
                        }}
                        getTdProps={(state, rowInfo, column, instance) =>{
                            if(rowInfo.original.type==='franch'){
                                if(column.Header==='Qty' || column.Header==='Amount' || column.Header==='Markup(%)')
                                    return {
                                        style: {display: 'none'},
                                        className: {}
                                    };
                                return {
                                    className: classNames(
                                        {"justify-end": column.Header==='Service'},
                                        {"justify-start": column.id==='extended'},
                                        {"franchiRow": column.id==='description'},
                                        {"taxColumn": column.id==='tax'},
                                    )
                                };
                            }
                            else
                                return {
                                    className: classNames(
                                        {"justify-end": column.id==='extended'},
                                        {"justify-end": rowInfo.original.type!=='line'})
                                }
                        }}
                        columns={[
                            {
                                columns: [
                                    {
                                        Header: "Billing",
                                        accessor: "billing",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (
                                                    <div className={classes.root1}>
                                                        <NoSsr>
                                                            <Select1
                                                                classes={classes}
                                                                styles={selectStyles}
                                                                // value={this.state.selectedBillingOption}
                                                                value={this.state['selectedBillingOption'+row.original.id]}
                                                                components={components}
                                                                onChange={(v)=>this.handleBillingChange(v, row.original)}
                                                                options={billingSuggestions}
                                                                placeholder="Select a billing"
                                                            />
                                                        </NoSsr>
                                                    </div>
                                                );
                                            else
                                                return (<div/>)
                                        },
                                        width: 200,
                                        className: classNames(classes.billingSuggestion, "flex items-center justify-center"),
                                    },
                                    {
                                        Header: "Service",
                                        accessor: "service",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (
                                                    <div className={classes.root1}>
                                                        <NoSsr>
                                                            <Select1
                                                                classes={classes}
                                                                styles={selectStyles}
                                                                value={this.state['selectedServiceOption'+row.original.id]}
                                                                components={components}
                                                                onChange={(v)=>this.handleServiceChange(v, row.original)}
                                                                options={serviceSuggestions}
                                                                placeholder="Select a service"
                                                            />
                                                        </NoSsr>
                                                    </div>
                                                );
                                            else
                                                return (<div className={classNames(classes.distribution)}><span>Distribution</span></div>)
                                        },
                                        width: 200,
                                        className: classNames(classes.tableTdEven, "flex items-center"),
                                    },
                                    {
                                        Header: "Description",
                                        accessor: "description",
                                        Cell: row=>{
                                            if(row.original.type==='line') {
                                                return (
                                                    <TextField
                                                        id="description"
                                                        style={{ margin: 8 }}
                                                        placeholder="Description"
                                                        fullWidth
                                                        value={row.original.description}
                                                        onChange={this.handleChangeDesc(row.original)}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        InputProps={{
                                                            classes: {
                                                                input: classes.input,
                                                            },
                                                        }}
                                                    />
                                                )
                                            }
                                            else
                                                return (
                                                    <div className={classNames("flex flex-row w-full justify-start")}>
                                                        <div className="f1">
                                                            {row.original.fnumber}
                                                        </div>
                                                        <div className="f2">
                                                            <Autosuggest
                                                                renderInputComponent = {renderInputComponent}
                                                                suggestions={nameSuggestions}
                                                                onSuggestionsFetchRequested={this.onNameSuggestionsFetchRequested}
                                                                onSuggestionsClearRequested={this.onNameSuggestionsClearRequested}
                                                                onSuggestionSelected={this.onNameSuggestionSelected(row.original)}
                                                                getSuggestionValue={this.getSuggestionfName}
                                                                renderSuggestion={renderSuggestion}
                                                                inputProps={
                                                                    {
                                                                        classes,
                                                                        placeholder: "Search Franchisee Name or Number",
                                                                        value: this.state['nameValue'+row.original.f_index],
                                                                        onChange: this.onNameChange(row.original)
                                                                    }
                                                                }
                                                                theme={{
                                                                    container: classNames(classes.container),
                                                                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                                                    suggestionsList: classes.suggestionsList,
                                                                    suggestion: classes.suggestion,
                                                                }}
                                                                renderSuggestionsContainer={options => (
                                                                    <Paper {...options.containerProps} square>
                                                                        {options.children}
                                                                    </Paper>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        },
                                    },
                                    {
                                        Header: "Qty",
                                        accessor: "quantity",
                                        Cell: row=>{
                                            if(row.original.type==='line') {
                                                return <TextField
                                                    className={classes.fInput}
                                                    placeholder="Qty"
                                                    value={row.original.quantity}
                                                    onBlur={this.handleChangeInvoiceLine(row.original, 'quantity')}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustom1,
                                                        classes: {
                                                            input: classes.input,
                                                        },
                                                    }}
                                                />
                                            }
                                            else
                                                return (<div/>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  justify-center text-center"),
                                        width: 60
                                    },
                                    {
                                        Header: "Amount",
                                        accessor: "amount",
                                        Cell: row=>{
                                            if(row.original.type==='line'){
                                                return <TextField
                                                    className={classes.fInput}
                                                    placeholder="Amount"
                                                    value={row.original.amount}
                                                    onBlur={this.handleChangeInvoiceLine(row.original, 'amount')}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustom2,
                                                        classes: {
                                                            input: classes.input,
                                                        },
                                                    }}
                                                />
                                            }
                                            else
                                                return (<div/>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  justify-center text-right"),
                                        width: 100
                                    },
                                    {
                                        Header: "Tax",
                                        accessor: "tax",
                                        Cell: row=>{
                                            if(row.original.type==='line') {
                                                return <TextField
                                                    className={classes.fInput}
                                                    placeholder="Tax"
                                                    value={row.original.tax}
                                                    onChange={this.handleChangeInvoiceTaxLine(row.original, 'tax')}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustom,
                                                        classes: {
                                                            input: classes.input,
                                                        },
                                                    }}
                                                />
                                            }
                                            else
                                                return ( <div className={classNames("flex flex-row w-full justify-end")}>
                                                    <TextField
                                                        className={classes.fInput}
                                                        placeholder="Amount"
                                                        value={row.original.amount}
                                                        onChange={this.handleChange(row.original)}
                                                        InputProps={{
                                                            inputComponent: NumberFormatCustom,
                                                        }}
                                                    />
                                                </div>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  justify-end text-right"),
                                        width: 80
                                    },
                                    {
                                        Header: "Markup(%)",
                                        accessor: "markup",
                                        Cell: row=>{
                                            if(row.original.type==='line') {
                                                return <TextField
                                                    className={classes.fInput}
                                                    placeholder="Markup"
                                                    value={row.original.markup}
                                                    onChange={this.handleChangeInvoiceLine(row.original, 'markup')}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustomPercent,
                                                        readOnly: row.original.billing.value!==2,
                                                        classes: {
                                                            input: classes.input,
                                                        },
                                                    }}
                                                />
                                            }
                                            else
                                                return (
                                                    <div/>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  text-right justify-end"),
                                        width: 80
                                    },
                                    {
                                        Header: "Ext. Amount",
                                        accessor: "extended",
                                        Cell: row=>{
                                            if(row.original.type==='line') {
                                                let markup = 0.0;
                                                if(row.original.markup!=='') markup = row.original.markup;
                                                return ("$" + parseFloat(row.original.total * (1 + parseFloat(markup) / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            }
                                            else
                                                return (
                                                    <Fab aria-label="remove"
                                                         onClick={()=>this.removeFranch(row.original)}
                                                         className={classNames(classes.lineCancelButton, "mr-12")} style={{width: 24, height: 24, minHeight: 24}}>
                                                        <Icon>close</Icon>
                                                    </Fab>
                                                )
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  w-full text-center pr-12"),
                                        width: 100
                                    },
                                    {
                                        Header: "Action",
                                        width: 130,
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (
                                                    <div className="flex flex-row items-center w-full justify-center">
                                                        <Fab color="secondary" aria-label="add"
                                                             className={classNames(classes.lineButton, "mr-8")}
                                                             onClick={()=>this.addFranchiseeLine(row.original)}
                                                        >
                                                            <Icon>call_merge</Icon>
                                                        </Fab>
                                                        <Fab color="secondary" aria-label="add"
                                                             className={classNames(classes.lineButton, "mr-8")}
                                                             onClick={()=>this.addLineData(row.original)}
                                                        >
                                                            <Icon>add</Icon>
                                                        </Fab>
                                                        {this.state.data.length>1 && (
                                                            <Fab aria-label="remove"
                                                                 onClick={()=>this.removeLineData(row.original)}
                                                                 className={classNames(classes.lineCancelButton, "mr-0")}>
                                                                <Icon>close</Icon>
                                                            </Fab>
                                                        )}
                                                    </div>
                                                );
                                            else
                                                return (<div/>)
                                        }
                                    },
                                ]
                            }
                        ]}
                        className={classNames( "-striped -highlight")}
                        defaultPageSize={200}
                        style={{
                            height: '100%',
                        }}
                    />
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnack}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="error"
                        message={this.state.snackMessage}
                    />
                </Snackbar>
                <Dialog
                    open={this.state.bTaxAlert}
                    onClose={this.handleTaxAlertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Customer is not Tax Exempt"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Customer is not Tax Exempt, but will be allowed as transaction is ???"
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleTaxAlertClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.bTaxAlertReduction}
                    onClose={this.handleTaxAlertReductionClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Tax Editing is not allowed"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tax Editing is not allowed. Tax is calculated based on Customer Tax Settings
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleTaxAlertReductionClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

InvoiceLineTable.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateInvoiceLine: Actions.updateInvoiceLine,
        getCustomerTaxAmount: Actions.getCustomerTaxAmount,
        getServiceLists: Actions.getServiceLists
    }, dispatch);
}

function mapStateToProps({invoices, franchisees, auth})
{
    return {
        invoiceForm: invoices.invoiceForm,
        invoiceDetail: invoices.invoiceDetail,
        franchisees: franchisees.franchiseesDB,
        regionId: auth.login.defaultRegionId,
        customerTaxAmountLine: invoices.customerTaxAmountLine,
        bStartingSaveFormData: invoices.bStartingSaveFormData,
        billingLists: invoices.billingLists,
        serviceLists: invoices.serviceLists
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceLineTable)));
