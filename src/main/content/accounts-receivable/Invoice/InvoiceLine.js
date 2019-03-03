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
import {NumberFormatCustom, escapeRegexCharacters, NumberFormatCustom4, NumberFormatCustomPercent, NumberFormatCustom2} from '../../../../services/utils'
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

function createData(billing={label:'Regular Billing', value: '5c41e517d2963319d486a19b'}, service='Adjust-Balance', description='', quantity=1, amount='', tax=0, markup='', extended=0, total=0, markupAmount=0, markupTax=0, commission=0, commissionAmount=0.0, vendorId='', vendorInvNo='')
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
        commission,
        commissionAmount,
        franchisees: [],
        type: 'line',
        vendorId,
        vendorInvNo
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
            padding: '0 5px',
            '&.hidden': {
                display: 'none!important'
            }
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
                padding: '2px 8px',
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
    let status = suggestion.StatusName;
    if (suggestion.StatusName==='Y') status = 'Active';
    return (
        <MenuItem selected={isHighlighted} component="div">
            <span>{suggestion.Number} - {suggestion.Name} - {status}</span>
        </MenuItem>
    );
}

class InvoiceLineTable extends React.Component {
    state = {
        order      : 'asc',
        selected   : [],
        data       :  this.props.invoiceForm.type === 'new' ? [
            createData({label: this.props.billingLists[3].Name, value:this.props.billingLists[3]._id}, {label: this.props.serviceLists[0].Name, value:this.props.serviceLists[0]._id}, '',1),
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
        selectedBillingOption0: {label: this.props.billingLists[3].Name, value:this.props.billingLists[3]._id},selectedBillingOption1: null,selectedBillingOption2: null,selectedBillingOption3: null,
        selectedBillingOption4: null,selectedBillingOption5: null,selectedBillingOption6: null,selectedBillingOption7: null,
        selectedBillingOption8: null,selectedBillingOption9: null,selectedBillingOption10: null,selectedBillingOption11: null,
        selectedBillingOption12: null,selectedBillingOption13: null,selectedBillingOption14: null,selectedBillingOption15: null,
        selectedServiceOption0: {value: "Buffing", label: "Buffing"},selectedServiceOption1: null,selectedServiceOption2: null,selectedServiceOption3: null,
        selectedServiceOption4: null,selectedServiceOption5: null,selectedServiceOption6: null,selectedServiceOption7: null,
        selectedServiceOption8: null,selectedServiceOption9: null,selectedServiceOption10: null,selectedServiceOption11: null,
        selectedServiceOption12: null,selectedServiceOption13: null,selectedServiceOption14: null,selectedServiceOption15: null,
        bTaxAlert: false,
        bTaxAlertReduction: false,
        bAllowAlertReduction: false,
        bAllowAlertTaxZero: false,
        bAllowNeverAlertReduction: false,
        bAllowNeverAlertTaxZero: false,


        billingSuggestions: this.props.billingLists.map(b => ({
            value: b._id, label: b.Name})),
        serviceSuggestions: this.props.serviceLists.map(s=>({
            BillingTypeId: s.BillingTypeId, label: s.Name, value: s._id
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

    componentDidMount(){
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

            let billingSuggestions = this.props.billingLists.map(b => ({
                value: b._id, label: b.Name}));

            let serviceSuggestions = this.props.serviceLists.map(s=>({
                label: s.Name, value: s._id
            }));

            let f_index = 0;

            if(items!==null && items.length>0){
                let newData = items.map((item, index)=>{
                    let billing = billingSuggestions.filter(b=>b.value===item.Billing);
                    this.setState({[`selectedBillingOption${index}`]: billing[0]});

                    let service = serviceSuggestions.filter(s=>s.value===item.Service);
                    if(service.length)
                        this.setState({[`selectedServiceOption${index}`]: service[0]});

                    let line = createData(billing[0], service[0], item.Description, item.Quantity, item.UnitPrice, item.TaxRate, 0, item.ExtendedPrice, item.Total, item.MarkUpTotal, item.MarkUpTax, item.Commission, item.CommissionTotal, item.VendorId, item.VendorInvNo);

                    let distributions = [];
                    if(item.Distribution!==null && item.Distribution.length>0){
                        distributions = item.Distribution.map((d,fid)=>{
                            if(d.Name!==null)
                                this.setState({['nameValue'+f_index++]: d.Name});

                            return {id: index, fid, fnumber: d.FranchiseeNumber, amount: d.Amount, name: d.Name, type: 'franch'}
                        })
                    }
                    line.franchisees = distributions;

                    return line;
                });

                let id = 0;
                let data = newData.map(record=>{
                    record.id = id++;
                    return record;
                });

                this.setState({data: data});
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.data!==null && prevState.data!==this.state.data) {
            let data = this.state.data;
            if(!this.props.bSkip && this.props.invoiceForm.type==='edit') {
                if(data.length>0 && this.props.invoiceForm.data.line.length>0){
                    data.map((line, index)=>{
                        if(index<this.props.invoiceForm.data.line.length) {
                            line.vendorId = this.props.invoiceForm.data.line[index].vendorId;
                            line.vendorInvNo = this.props.invoiceForm.data.line[index].vendorInvNo;
                        }
                    })
                }
            }
            this.props.updateInvoiceLine(data);
        }

        if(JSON.stringify(this.state.customerTaxAmountLine)!== JSON.stringify(prevState.customerTaxAmountLine)){
            this.updateTaxFromLine();
        }

        if(this.props.invoiceForm.customer!==null && this.props.invoiceForm.type==='edit' && this.props.invoiceForm.customer!==prevProps.invoiceForm.customer){
            let rows = this.props.invoiceForm.data.line;
            rows.forEach(row=>{
                let markup = 0.0;
                if(row.markup!=='' && row.billing.value===this.props.billingLists[1]._id) markup = row.markup;  //Client Supplies

                if( row.billing.value===this.props.billingLists[1]._id)
                    this.props.getCustomerTaxAmount(row.id, this.props.regionId, this.props.invoiceForm.customer.CustomerId, row.amount, row.quantity, markup, 0);
                else if( row.billing.value===this.props.billingLists[0]._id)
                    this.props.getCustomerTaxAmount(row.id, this.props.regionId, this.props.invoiceForm.customer.CustomerId, row.amount, row.quantity, 0, row.commission);
                else
                    this.props.getCustomerTaxAmount(row.id, this.props.regionId, this.props.invoiceForm.customer.CustomerId, row.amount, row.quantity, 0, 0);
            });
        }

        if(this.props.fn!==null && prevProps.fn!==this.props.fn){
            let franchisees = this.props.franchisees.Data.Region[0].Franchisees;
            let selectedFranchiess = _.filter(franchisees, franchisee=>this.props.fn.map(x=>x.Number).indexOf(franchisee.Number)>-1);


            //in case of selection any customer from auto suggestion
            if(selectedFranchiess.length>0) {
                const data = [...this.state.data];

                let f_row = data[0];

                let fIndex = 0;
                selectedFranchiess.forEach(sf=>{
                    let fLine = createFranchisee(0, fIndex, sf.Number, sf.Name, sf.DistributionAmount);
                    f_row.franchisees[fIndex] = fLine;
                    this.setState({["nameValue"+fIndex]: sf.Name});
                    fIndex++;
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.customerTaxAmountLine!==nextProps.customerTaxAmountLine){
            this.setState({customerTaxAmountLine: nextProps.customerTaxAmountLine})
        }

        //for save & add more
        if(nextProps.invoiceForm.data===null && JSON.stringify(nextProps.invoiceForm.data)!==JSON.stringify(this.props.invoiceForm.data)){
            let newData = createData({label: this.props.billingLists[3].Name, value:this.props.billingLists[3]._id},  {label: this.props.serviceLists[0].Name, value:this.props.serviceLists[0]._id}, '','');
            this.setState({data: [{...newData, id: 0}]});
        }
    }


    updateTaxFromLine = ()=> {
        const data = [...this.state.data];
        const {taxRowId, customerTaxAmountLine} = this.state;
        if(customerTaxAmountLine.length) {
            data[taxRowId].tax = parseFloat(customerTaxAmountLine[taxRowId].TotalTaxAmount);
            data[taxRowId].extended = parseFloat(customerTaxAmountLine[taxRowId].ExtendedPrice);
            data[taxRowId].total = parseFloat(customerTaxAmountLine[taxRowId].TotalAmount);
            data[taxRowId].markupAmount = customerTaxAmountLine[taxRowId].MarkupAmount;
            data[taxRowId].commissionAmount = customerTaxAmountLine[taxRowId].CommissionAmount;
            data[taxRowId].markupTax = customerTaxAmountLine[taxRowId].MarkupTax;
            if(data[taxRowId].franchisees.length){
                let d_amount = customerTaxAmountLine[taxRowId].ExtendedPrice/data[taxRowId].franchisees.length;
                data[taxRowId].franchisees.forEach(f=>f.amount = d_amount)
            }

            this.setState({data: data});
            if(this.props.invoiceForm.type==='edit')
                this.setState({bAllowAlertReduction: true});
        }
    };

    // For Franchisee suggestion
    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');

        let franchisees = this.props.franchisees.Data.Region[0].Franchisees;
        let suggestions =  franchisees.filter(f => regex.test(f.Number) || regex.test(f.Name));


       return suggestions.filter(c=>c.StatusName==='Y');
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
        this.setState({ bAllowNeverAlertTaxZero: true });

    };

    handleTaxAlertReductionClose = () => {
        this.setState({ bTaxAlertReduction: false });
        this.setState({ bAllowNeverAlertReduction: true });
    };

    showVendorDialogBox = (row) =>{
        this.props.openInvoiceVendorDialogBox(row.id);
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

        const data = [...this.state.data, createData({label: this.props.billingLists[3].Name, value:this.props.billingLists[3]._id},{value: "Buffing", label: "Buffing"})];
        this.setState({
            ["selectedBillingOption"+parseInt(data.length-1)]: {label: this.props.billingLists[3].Name, value:this.props.billingLists[3]._id,
            }
        });

        this.setState({
            ["selectedServiceOption"+parseInt(data.length-1)]: {value: "Buffing", label: "Buffing"}
        });

        let id = 0;
        let newData = data.map(record=>{
            record.id = id++;
            return record;
        });

        let lastRow = newData[newData.length-1];
        lastRow.franchisees = [createFranchisee(lastRow.id, 0)];

        this.setState({data: newData})
    };

    addFranchiseeLine = (n) =>{
        const data = [...this.state.data];
        let fline = createFranchisee(n.id, n.franchisees.length);
        n.franchisees = [...n.franchisees, fline];

        if(n.extended>0) {
            let d_amount = n.extended/n.franchisees.length;
            n.franchisees.forEach(f=>f.amount = d_amount)
        }

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
            if(d.franchisees.length>0 && d.id===row.id){
                let fid=0;
                let franchisees = d.franchisees;
                let newData = franchisees.map(record=>{
                    record.fid = fid++;
                    return record;
                });
                d.franchisees = newData
            }
        });

        let n = data[row.id];

        if(n.extended>0) {
            let d_amount = n.extended/n.franchisees.length;
            n.franchisees.forEach(f=>f.amount = d_amount)
        }

        this.setState({data: data});
        this.setState({['nameValue'+row.f_index]: ''})
    };

    getInvoiceLineTaxAmount = row =>{
        if(!this.isDisable(row)) {
            let markup = 0.0;
            if(row.markup!=='') markup = row.markup;
            if(row.markup!=='' && row.billing.value===this.props.billingLists[1]._id) markup = row.markup; //Client Supplies

            if( row.billing.value===this.props.billingLists[1]._id)
                this.props.getCustomerTaxAmount(row.id, this.props.regionId, this.props.invoiceForm.customer.CustomerId, row.amount, row.quantity, markup, 0);
            else if( row.billing.value===this.props.billingLists[0]._id)
                this.props.getCustomerTaxAmount(row.id, this.props.regionId, this.props.invoiceForm.customer.CustomerId, row.amount, row.quantity, 0, row.commission);
            else
                this.props.getCustomerTaxAmount(row.id, this.props.regionId, this.props.invoiceForm.customer.CustomerId, row.amount, row.quantity, 0, 0);

            this.setState({taxRowId: row.id})
        }
    };

    handleChange = row => event => {
        const data = [...this.state.data];

        let d_total = 0;
        let distributions = data[row.id].franchisees;
        if(distributions.length>0){
            distributions.forEach(d=>{
                let d_amount = d.amount;
                if(d.id===row.id && d.fid===row.fid)
                    d_amount = parseFloat(event.target.value);

                d_total += parseFloat(d_amount);
            })
        }

        // if(d_total>data[row.id].extended) {
        //     this.setState({snackMessage: "Distribution amount can\'t be greater than Line amount"});
        //     this.setState({openSnack: true});
        //     return ;
        // }

        data[row.id].franchisees[row.fid].amount = parseFloat(event.target.value);
        this.setState({data: data});
    };

    handleChangeDesc = row => event => {
        const data = [...this.state.data];
        data[row.id].description = event.target.value;
        this.setState({data: data});
    };

    handleChangeInvoiceLine =  (row, name) => event => {
        const data = [...this.state.data];
        let value = event.target.value;
        if (name==='amount')  value = parseFloat(value);
        if (name==='quantity')  value = parseInt(value);
        if (name==='markup')  value = parseFloat(value);
        if (name==='commission')  value = parseFloat(value);

        // if(name==='commission') data[row.id]['markup'] = 0.00;
        // if(name==='markup') data[row.id]['commission'] = 0.00;

        data[row.id][name] = value;
        this.setState({data: data});
        // if(name==='tax')
        //     this.setState({customerTaxAmountLine: {...this.state.customerTaxAmountLine, TotalTaxAmount: parseFloat(event.target.value)}})
    };

    handleChangeInvoiceLineOnBlur = (row, name) => event => {
        if(name==='quantity' && (row.quantity===0 || row.quantity==='')) {
            this.setState({snackMessage: 'not allowed quantity of 0'});
            this.setState({openSnack: true});
            row.quantity = 1;
            return ;
        }

        if(!this.isDisable(row) && name!=='tax')
            this.getInvoiceLineTaxAmount(row)
    };

    handleChangeInvoiceTaxLine = (row, name) => event => {
        if(this.props.invoiceForm.customer===null) return;

        if(!this.state.bAllowNeverAlertTaxZero && this.props.invoiceForm.customer.TaxExempt==='N' && name==='tax' && parseFloat(row.tax)===0) {
            this.setState({bTaxAlert: true});
            return;
        }
        if(!this.state.bAllowNeverAlertReduction && this.state.bAllowAlertReduction && this.props.invoiceForm.customer.TaxExempt==='N' && name==='tax' && parseFloat(row.tax)!==0 &&
            parseFloat(row.tax)!==this.props.customerTaxAmountLine[row.id].TotalTaxAmount)
        {
            this.setState({bTaxAlertReduction: true});
            // this.setState({bAllowNeverAlertReduction: true});
            const data = [...this.state.data];
            data[row.id].tax = this.props.customerTaxAmountLine[row.id].TotalTaxAmount;
            this.setState({data: data});
        }

        if(name==='tax' &&
            !this.state.bAllowAlertReduction &&
            this.props.invoiceForm.customer.TaxExempt==='N' &&
            parseFloat(row.tax)!==0 &&
            parseFloat(row.tax)!==this.props.customerTaxAmountLine[row.id].TotalTaxAmount) {
            setTimeout(() => {this.setState({bAllowAlertReduction: true})}, 1000);
        }

        if(name==='tax' &&
            !this.state.bAllowAlertTaxZero &&
            this.props.invoiceForm.customer.TaxExempt==='N' &&
            parseFloat(row.tax)===0) {
            setTimeout(() => {this.setState({bAllowAlertTaxZero: true})}, 1000);
        }
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

    handleServiceChange = async (newValue, row) => {
        this.setState({
            ["selectedServiceOption"+row.id]: newValue
        });
        const data = [...this.state.data];
        data[row.id].service = newValue;
        await this.setState({data: data});

        if(newValue.value==='5c4b8a3b651a9c5970514a68') {//label: "Customer Supplies"
            this.props.openInvoiceVendorDialogBox(row.id);
        }
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
                all_data.push({f_index: f_index++,...f, length: d.franchisees.length});
            });
        });

        let billingSuggestions = [];
        if(this.props.billingLists!==null && this.props.billingLists.length>0) {
            billingSuggestions = this.props.billingLists.map(b => ({
                value: b._id, label: b.Name
            }));
        }

        const serviceSuggestions =this.props.serviceLists.map(suggestion => ({
            value: suggestion._id,
            label: suggestion.Name
        }));

        let bReadonly = false;

        if(this.props.invoiceForm.customer!==null && this.props.invoiceForm.customer.TaxExempt!=='N')
            bReadonly = true;

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
                                // className: classNames(
                                //     {"hidden": column.id==='commission' && rowInfo.original.billing.value!==1},
                                //     {"hidden": column.id==='markup' && rowInfo.original.billing.value===1}),
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
                                        {"justify-end": column.id==='extended'},
                                        {"franchiRow": column.id==='description'},
                                        {"taxColumn": column.id==='tax'},
                                    )
                                };
                            }
                            else {
                                return {
                                    className: classNames(
                                        {"justify-end": column.id==='total'},
                                        {"justify-end": rowInfo.original.type!=='line'})
                                    // {"hidden": column.id==='commission' && rowInfo.original.billing.value!==1},
                                    // {"hidden": column.id==='markup' && rowInfo.original.billing.value===1}),
                                }
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
                                                                value={this.state["selectedBillingOption"+row.original.id]}
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
                                                        style={{ margin: '0 8px' }}
                                                        placeholder="Description"
                                                        fullWidth
                                                        value={row.original.description}
                                                        onChange={this.handleChangeDesc(row.original)}
                                                        margin="normal"
                                                        multiline
                                                        rows={1}
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
                                                    onBlur={this.handleChangeInvoiceLineOnBlur(row.original, 'quantity')}
                                                    onChange={this.handleChangeInvoiceLine(row.original, 'quantity')}
                                                    InputProps={{
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
                                                    onBlur={this.handleChangeInvoiceLineOnBlur(row.original, 'amount')}
                                                    onChange={this.handleChangeInvoiceLine(row.original, 'amount')}
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
                                                    onChange={this.handleChangeInvoiceLine(row.original, 'tax')}
                                                    onBlur={this.handleChangeInvoiceTaxLine(row.original, 'tax')}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustom,
                                                        classes: {
                                                            input: classes.input,
                                                        },
                                                        readOnly: bReadonly,
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
                                                            inputComponent: NumberFormatCustom4,
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
                                                    onBlur={this.handleChangeInvoiceLineOnBlur(row.original, 'markup')}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustomPercent,
                                                        // readOnly: row.original.billing.value!==2,
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
                                        Header: "Commission(%)",
                                        accessor: "commission",
                                        Cell: row=>{
                                            if(row.original.type==='line') {
                                                return <TextField
                                                    className={classes.fInput}
                                                    placeholder="Commission"
                                                    value={row.original.commission}
                                                    onChange={this.handleChangeInvoiceLine(row.original, 'commission')}
                                                    onBlur={this.handleChangeInvoiceLineOnBlur(row.original, 'commission')}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustomPercent,
                                                        // readOnly: row.original.billing.value!==1,
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
                                        width: 110
                                    },
                                    {
                                        Header: "Tot. Amount",
                                        accessor: "total",
                                        Cell: row=>{
                                            if(row.original.type==='line') {
                                                let markup = 0.0;
                                                if(row.original.markupAmount!=='') markup = row.original.markupAmount;
                                                return ("$" + parseFloat(row.original.total+markup).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            }
                                            else {
                                                if (row.original.length>1)
                                                    return (
                                                        <Fab aria-label="remove"
                                                             onClick={()=>this.removeFranch(row.original)}
                                                             className={classNames(classes.lineCancelButton, "mr-12")} style={{width: 24, height: 24, minHeight: 24}}>
                                                            <Icon>close</Icon>
                                                        </Fab>
                                                    );
                                                else
                                                    return (<div/>)
                                            }
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  w-full text-center pr-12"),
                                        width: 100
                                    },
                                    {
                                        Header: "Action",
                                        width: 150,
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
                                                        {row.original.service.value==='5c4b8a3b651a9c5970514a68' && (
                                                            <Fab color="secondary" aria-label="show vendor box"
                                                                 className={classNames(classes.lineButton, "mr-8")}
                                                                 onClick={()=>this.showVendorDialogBox(row.original)}
                                                            >
                                                                <Icon>settings</Icon>
                                                            </Fab>
                                                        )}
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
                        vertical: 'top',
                        horizontal: 'center',
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
                    <DialogTitle id="alert-dialog-title">{"Tax Validation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This Customer is Not Tax-Exempt but this transaction will be allowed as Tax-Exempt.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleTaxAlertClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.bTaxAlertReduction}
                    onClose={this.handleTaxAlertReductionClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Tax Validation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tax Editing is not allowed. Tax is calculated based on Customer Tax Settings
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleTaxAlertReductionClose} color="primary" autoFocus>
                            OK
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
        getServiceLists: Actions.getServiceLists,
        openInvoiceVendorDialogBox: Actions.openInvoiceVendorDialogBox,
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
        serviceLists: invoices.serviceLists,
        itemId: invoices.itemId,
        bSkip: invoices.bSkip,
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceLineTable)));
