import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// core components
import {
    Paper,
    TextField,
    Typography,
    MenuItem,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Button,
} from '@material-ui/core';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

// theme components
import {FuseAnimate} from '@fuse';
import {withStyles} from "@material-ui/core";

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import InvoiceLineTable from "./InvoiceLine"

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import Chance from 'chance'
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import moment from 'moment'

//Utility
import {escapeRegexCharacters} from 'services/utils'

const styles = theme => ({
    layoutForm: {
        flexDirection: 'row',
    },
    button: {
        '& span':{
            textTransform: 'none'
        }
    },
    card: {
        width   : '100%',
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
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 10,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        maxHeight: 200,
        overflowY: 'scroll'
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
    cardHeader       : {
        backgroundColor: theme.palette.secondary.main,
        padding: '8px 24px',
        '& span': {
            color: 'white',
            fontSize: 16,
        }
    },
    cardContent: {
        paddingTop: 12,
        paddingBottom: '12px!important',
        '& h6':{
            lineHeight: 1.6,
            fontSize: 14
        }
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
    }
});
const chance = new Chance();

const newInvoiceState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "InvoiceId": "",
    "InvoiceDate": new Date(),
    "DueDate": new Date(),
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
    "Service":"",
    "notes": ""
};

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.CustomerName, query);
    const parts = parse(suggestion.CustomerName, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

class InvoiceForm extends Component {
    state = {
        customers: [],
        franchisees: [],
        ...newInvoiceState,
        value: '',
        suggestions: [],
        selectedCustomer: null,
        fSuggestions: [],
        selectedFranchisee: null,
        labelWidth: 0,
        selectedWork: "",
        total: 0.0,
        subTotal: 0.0,
        tax: 0,
        markup: 0.0,
        InvoiceNo: "",
    };

    renderInputComponent = (inputProps ) => {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps ;

        return (
            <TextField
                fullWidth
                variant="outlined"
                label="Invoice For:"
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                InputLabelProps = {{
                    classes: {outlined: classes.label}
                }}
                required
                {...other}
                autoFocus={true}
            />
        );
    };

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if(value.length<2) return;

        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue =  (suggestion) =>{
        this.setState({selectedCustomer: suggestion});
        return suggestion.CustomerName;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');
        if(this.props.customers!==null)
            return this.props.customers.filter(customer => regex.test(customer.CustomerName));
    };

    getTotal = () => {
        let subTotal = 0.0;
        let markup = 0.0;
        let tax = 0.0;
        const data = [...this.props.invoiceForm.data.line];

        data.forEach(n => {
            let mk = 0.;
            let qty = 0;
            if(n.quantity!=='') qty = n.quantity;
            if(n.markup!=='') mk = n.markup;
            subTotal += parseFloat(n.extended);
            tax += parseFloat(n.tax);
            markup += parseFloat(n.extended*qty*parseFloat(mk)/100);
        });

        this.setState({subTotal: subTotal});
        this.setState({markup: markup});
        this.setState({tax: tax});
        this.setState({total: subTotal+tax+markup});
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.invoiceForm!== prevProps.invoiceForm) {
            this.getTotal();
        }
        if(this.state.selectedCustomer!== null && JSON.stringify(this.state.selectedCustomer)!== JSON.stringify(this.props.invoiceForm.customer)) {
            this.props.selectCustomer(this.state.selectedCustomer);
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.invoiceForm.customer!==null){
            if(nextProps.invoiceForm.type==='edit')
                this.setState({InvoiceNo: nextProps.invoiceForm.customer.InvoiceNo});
            this.setState({value: nextProps.invoiceForm.customer.CustomerName});
            this.setState({CustomerNo: nextProps.invoiceForm.customer.CustomerNo});
            this.setState({InvoiceDate: moment(nextProps.invoiceForm.customer.InvoiceDate).format('MM/DD/YYYY')});
            this.setState({DueDate: moment(nextProps.invoiceForm.customer.DueDate).format('MM/DD/YYYY')});
        }
    }

    componentDidMount(){
        if(this.props.invoiceForm.type === 'new')
            this.setState({InvoiceNo: "PENDING"});

        if(this.input) {
            setTimeout(() => {this.input.focus()}, 500);
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    onSaveInvoice = () => {
        let items = [];
        let lines = this.props.invoiceForm.data.line;
        //
        lines.forEach(line=>{
            let item = {
                ServiceTypeListId: 0,
                Descrption: line.description,
                LineNo: 1,
                UnitPrice: line.amount,
                Quantity: parseInt(line.quantity),
                TaxRate: line.tax,
                ExtendedPrice: line.extended,
                Total: line.total,
                MarkUpTotal: line.markup,
                Commission: 0,
                CommissionTotal: 0,
                ExtraWork: 1,
                TaxExcempt: 1,
                Distribution: []
            };
            let franchisees = [];

            if(line.franchisees.length>0) {
                line.franchisees.forEach(f=>{
                    franchisees.push(
                        {
                            FranchiseeId: 12,
                            FranchiseNumber: f.fnumber,
                            LineNo: 1,
                            Name: f.name,
                            Description: "Work done",
                            Amount: f.amount
                        }
                    )

                })
            }
            item.Distribution.push(franchisees);

            items.push(item);
        });

        let result = {
            CustomerId: this.state.selectedCustomer.CustomerId,
            PeriodId: this.props.invoices.PeriodId[0],
            PeriodMonth: moment().month()+1,
            PeriodYear: moment().year(),
            Description: this.state.InvoiceDescription,
            Notes: this.state.note,
            RegionId: this.props.regionId,
            BillRunId: 999,
            InvoiceDate: this.state.InvoiceDate,
            CreatedById: this.props.user.UserId,
            CreatedDate: moment().format('MM/DD/YYYY'),
            SubTotal: this.state.subTotal,
            MarkupAmountTotal :this.state.markup,
            CPIIncrease: 0.00,
            TaxTotal: this.state.tax,
            GrandTotal: this.state.total,
            InvoiceItems: [
                {
                    Inv_No: chance.guid()+'_pending',
                    Items: items
                }
            ]
        };

        console.log('result', JSON.stringify(result));
    };

    onSaveAndAddMore=()=>{
        this.onSaveInvoice();

    };

    onSubmitForApproval=()=>{
        this.onSaveInvoice();
    };

    onSaveAndClose = () => {
        this.onSaveInvoice();
    };

    closeComposeForm = () => {
        this.props.invoiceForm.type === 'edit' ? this.props.closeEditInvoiceForm() : this.props.closeNewInvoiceForm();
    };

    handleDueDateChange = date => {
        this.setState({ DueDate: date});
    };
    handleInvoiceDateChange = date => {
        this.setState({ InvoiceDate: date });
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    render()
    {
        const { classes} = this.props;
        const { value, suggestions } = this.state;

        const today = new Date();

        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };


        let bReadonly = false;
        if(this.props.invoiceForm.type === 'new') bReadonly = true;

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="h-full flex flex-col relative">
                    <div className="flex flex-col p-24 pt-12 pb-0" style={{flex: "1"}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <GridContainer className={classNames(classes.formControl)}>
                                <GridItem xs={12} sm={6} md={6} className="flex flex-row">
                                    <Autosuggest
                                        {...autosuggestProps}
                                        inputProps={{
                                            classes,
                                            placeholder: 'Search Customer Name or Number',
                                            value: value,
                                            onChange: this.onChange,
                                        }}
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
                                        ref={this.storeInputReference}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col xs:mb-24">
                                    <DatePicker
                                        margin="none"
                                        label="Invoice Date"
                                        name="InvoiceDate"
                                        variant="outlined"
                                        format="MM/dd/YYYY"
                                        value={this.state.InvoiceDate}
                                        onChange={this.handleInvoiceDateChange}
                                        fullWidth
                                        required
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col">
                                    <DatePicker
                                        margin="none"
                                        label="Due Date"
                                        format="MM/dd/YYYY"
                                        name="DueDate"
                                        variant="outlined"
                                        value={this.state.DueDate}
                                        onChange={this.handleDueDateChange}
                                        required
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col">
                                    <TextField
                                        margin="none"
                                        label="Invoice #"
                                        placeholder="Invoice #"
                                        InputProps={{
                                            readOnly: bReadonly,
                                            classes: {
                                                input: bReadonly? classes.inputOrange: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        name="InvoiceNo"
                                        variant="outlined"
                                        value={this.state.InvoiceNo}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        style = {{fontSize: this.props.invoiceForm.type === 'new' ? '18px!important': 'inherit',
                                            fontWeight: this.props.invoiceForm.type === 'new' ? 700: 'inherit'
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </MuiPickersUtilsProvider>
                        <GridContainer className={classNames(classes.formControl, "mb-0")}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col">
                                <Card className={classes.card}>
                                    <CardHeader title="Customer" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>
                                        <Typography variant="subtitle1" color="inherit">
                                            <strong>Customer Name: {this.state.selectedCustomer ? this.state.selectedCustomer.CustomerName: this.state.value}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Customer No: {this.state.selectedCustomer? this.state.selectedCustomer.CustomerNo: this.state.CustomerNo}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Address: {this.state.selectedCustomer ? this.state.selectedCustomer.Address: ''}
                                        </Typography>
                                        {this.state.selectedCustomer && (
                                            <Typography variant="subtitle1" color="inherit">
                                                {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} className= "flex flex-row justify-end xs:flex-col">
                                <Card className={classes.card}>
                                    <CardHeader title="Billing" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>
                                        <Typography variant="subtitle1" color="inherit">
                                            <strong>Billing Name: {this.state.selectedCustomer ? this.state.selectedCustomer.CustomerName: this.state.value}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Customer No: {this.state.selectedCustomer ? this.state.selectedCustomer.CustomerNo: this.state.CustomerNo}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Address: {this.state.selectedCustomer ? this.state.selectedCustomer.Address: ''}
                                        </Typography>
                                        {this.state.selectedCustomer && (
                                            <Typography variant="subtitle1" color="inherit">
                                                {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </GridItem>
                        </GridContainer>
                        <div className="w-full mt-4">
                            <TextField
                                id="InvoiceDescription"
                                name="InvoiceDescription"
                                label="Description"
                                className={classes.textField}
                                value={this.state.InvoiceDescription}
                                onChange={this.handleChange}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.input, multiline: classes.input
                                    },
                                }}
                            />
                        </div>
                        <GridContainer className={classNames(classes.formControl)} style={{flex: "9999 1 0"}}>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col xs:mb-24">
                                <InvoiceLineTable />
                            </GridItem>
                        </GridContainer>
                        <Divider variant="middle"/>
                    </div>
                    <div className="flex flex-shrink flex-col w-full pl-24 pr-24 pt-0 pb-12">
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={9} md={9} className="flex flex-col xs:flex-col xs:mb-24">
                                <div className="w-full">
                                    <TextField
                                        id="note"
                                        name="note"
                                        label="Note"
                                        className={classes.textField}
                                        value={this.state.note}
                                        onChange={this.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.input, multiline: classes.input
                                            },
                                        }}
                                        rows={3}
                                    />
                                </div>
                            </GridItem>
                            <GridItem xs={12} sm={3} md={3} className="flex flex-col xs:flex-col xs:mb-24">
                                <div className="w-full p-12 flex justify-end pb-0">
                                    <span className={classes.summary}><strong>Subtotal: </strong>${this.state.subTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end pb-0 pt-6 ">
                                    <span className={classes.summary}><strong>Markup Total: </strong>${this.state.markup.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end pt-6 pb-6">
                                    <span className={classes.summary}><strong>Tax: </strong>${this.state.tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end  pt-6 pb-6">
                                    <span className={classes.summary}><strong>Grand Total: </strong>${this.state.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className="flex flex-1 flex-row justify-between items-center">
                            <div className="flex flex-row justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                                </FuseAnimate>
                            </div>
                            <div className="flex flex-1 flex-row justify-end">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSaveAndAddMore();
                                        }}
                                    >
                                        Save & Add more
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSaveAndClose();
                                        }}
                                    >
                                        Save & Close
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSubmitForApproval();
                                        }}
                                    >
                                        Submit for Approval
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => {
                                            this.closeComposeForm();
                                        }}
                                    >
                                        Close
                                    </Button>
                                </FuseAnimate>
                            </div>
                        </div>
                    </div>
                </div>
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openEditInvoiceForm: Actions.openEditInvoiceForm,
        closeEditInvoiceForm: Actions.closeEditInvoiceForm,
        closeNewInvoiceForm : Actions.closeNewInvoiceForm,
        selectCustomer: Actions.selectCustomer
    }, dispatch);
}

function mapStateToProps({invoices, auth})
{
    return {
        invoiceForm: invoices.invoiceForm,
        invoices: invoices,
        user: auth.login,
        regionId: auth.login.defaultRegionId,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceForm)));
