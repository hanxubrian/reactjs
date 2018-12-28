import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// core components
import {
    Hidden, Icon, IconButton, Fab, Input, Paper, TextField, Button, Typography,
    MenuItem,FormControl,InputLabel, Select,OutlinedInput,
    Card, CardHeader, CardContent, Divider, Radio, RadioGroup,FormControlLabel,FormLabel
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';
import InvoiceDialog from './InvoiceDialog';

// theme components
import {FusePageCustom, FuseAnimate,FuseSearch} from '@fuse';


import {bindActionCreators} from "redux";
import {withStyles, Checkbox} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import SummaryPanel from './SummaryPanel';
import FilterPanel from './filterPanel';

// third party
import moment from 'moment'
import checkboxHOC from "react-table/lib/hoc/selectTable";
import Chance from "chance";
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const headerHeight = 80;

const hexToRgb = (hex) =>{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover',
    },
    layoutRoot: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
        },
        '& .-pageSizeOptions': {
            display: 'none'
        },
        '& .ReactTable .rt-noData': {
            top: '250px',
            border: '1px solid coral'
        },
        '& .ReactTable .rt-thead.-headerGroups': {
            paddingLeft: '0!important',
            paddingRight: '0!important',
            minWidth: 'inherit!important'
        },
        '& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
            background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
            color: 'white!important'
        },
        '& .openFilter':{
            width: 'inherit'
        },
        '& .openSummary':{
            width: 300
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group':{
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
            width:'inherit!important',
            minWidth:'inherit!important',
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        }
    },
    card: {
        width   : '100%',
        maxWidth: 384,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
    layoutRightSidebar : {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutLeftSidebar : {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutSidebarHeader: {
        height   : headerHeight,
        minHeight: headerHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
    },
    content:{
        position: 'relative'
    },
    addButton          : {
        position: 'absolute',
        bottom  : -28,
        left    : 16,
        zIndex  : 999,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    sideButton          : {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    removeButton          : {
        position: 'absolute',
        bottom  : -28,
        right    : 16,
        zIndex  : 999,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    imageIcon:{
        width: 24,
        height: 24
    },
    separator: {
        width          : 1,
        height         : '100%',
        backgroundColor: theme.palette.divider
    },
    search: {
        width: 360,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    tableTheadRow:{
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main
    },
    tableThEven:{
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .3)'
    },
    tableTdEven:{
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
    },
    filterPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    summaryPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        color: 'white',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 24,
        minWidth: 200,
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
        padding: '10px 24px',
        '& span': {
            color: 'white'
        }
    },
});
const defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
};

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
    "Service":""
};

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

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
            {...other}
        />
    );
}

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

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


class InvoicePage extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        checkedPaid: true,
        checkedPP: true,
        checkedComplete: true,
        checkedOpen: true,
        checkedEbill: true,
        checkedPrint: true,
        selection: [],
        selectAll: false,
        regionId: 0,
        customers: [],
        ...newInvoiceState,
        value: '',
        suggestions: [],
        selectedCustomer: null,
        labelWidth: 0,
        selectedWork: ""
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

        return this.state.customers.filter(customer => regex.test(customer.CustomerName));
    };

    toggleSelection = (key, shift, row) => {
        /*
          https://react-table.js.org/#/story/select-table-hoc
          Implementation of how to manage the selection state is up to the developer.
          This implementation uses an array stored in the component state.
          Other implementations could use object keys, a Javascript Set, or Redux... etc.
        */
        // start off with the existing state
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        // check to see if the key exists
        if (keyIndex >= 0) {
            // it does exist so we will remove it using destructing
            selection = [
                ...selection.slice(0, keyIndex),
                ...selection.slice(keyIndex + 1)
            ];
        } else {
            // it does not exist so add it
            selection.push(key);
        }
        // update the state
        this.setState({ selection });
    };

    toggleAll = (instance) => {
        /*
          'toggleAll' is a tricky concept with any filterable table
          do you just select ALL the records that are in your data?
          OR
          do you only select ALL the records that are in the current filtered data?

          The latter makes more sense because 'selection' is a visual thing for the user.
          This is especially true if you are going to implement a set of external functions
          that act on the selected information (you would not want to DELETE the wrong thing!).

          So, to that end, access to the internals of ReactTable are required to get what is
          currently visible in the table (either on the current page or any other page).

          The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
          ReactTable and then get the internal state and the 'sortedData'.
          That can then be iterated to get all the currently visible records and set
          the selection state.
        */
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
            let currentRecords = instance.data;
            // we just push all the IDs onto the selection array
            let page = this.state.page;
            let pageSize = this.state.pageSize;
            let start_index = page * pageSize;
            let end_index = start_index+pageSize;
            currentRecords.forEach(item => {
                if(item._index>=start_index && item._index<end_index)
                    selection.push(item._original.InvoiceId);
            });
        }
        this.setState({ selectAll, selection });
    };

    isSelected = key => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
        return this.state.selection.includes(key);
    };

    logSelection = () => {
        console.log("selection:", this.state.selection);
    };

    closeComposeDialog = () => {
        this.props.invoiceDialog.type === 'edit' ? this.props.closeEditInvoiceDialog() : this.props.closeNewInvoiceDialog();
    };

    constructor(props){
        super(props);

        if(!props.bLoadedInvoices) {
            props.getInvoices();
        }

        if (!props.bLoadedCustomers) {
            props.getCustomers();
        }

        this.fetchData = this.fetchData.bind(this);
        this.escFunction = this.escFunction.bind(this);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let bChanged = false;
        if(this.props.transactionStatus.checkedPaid !== prevProps.transactionStatus.checkedPaid) {
            this.setState({checkedPaid: !this.state.checkedPaid});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedPP !== prevProps.transactionStatus.checkedPP) {
            this.setState({checkedPP: !this.state.checkedPP});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedComplete !== prevProps.transactionStatus.checkedComplete) {
            this.setState({checkedComplete: !this.state.checkedComplete});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedOpen !== prevProps.transactionStatus.checkedOpen) {
            this.setState({checkedOpen: !this.state.checkedOpen});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedEbill !== prevProps.transactionStatus.checkedEbill) {
            this.setState({checkedEbill: !this.state.checkedEbill});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedPrint !== prevProps.transactionStatus.checkedPrint) {
            this.setState({checkedPrint: !this.state.checkedPrint});
            bChanged = true;
        }

        if(this.props.regionId !== prevProps.regionId) {
            this.setState({regionId: prevProps.regionId});
            bChanged = true;
        }

        if(bChanged)
            this.getInvoicesFromStatus();

        if(prevProps.invoices===null && this.props.invoices!==null){
            this.getInvoicesFromStatus();
        }

        if(prevState.s!==this.state.s) {
            this.search(this.state.s);
        }
    }

    componentWillMount(){
        this.setState({checkedPaid: this.props.transactionStatus.checkedPaid});
        this.setState({checkedPP: this.props.transactionStatus.checkedPP});
        this.setState({checkedComplete: this.props.transactionStatus.checkedComplete});
        this.setState({checkedOpen: this.props.transactionStatus.checkedOpen});
        this.setState({checkedOpen: this.props.transactionStatus.checkedEbill});
        this.setState({checkedOpen: this.props.transactionStatus.checkedPrint});

        this.getInvoicesFromStatus()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.invoices===null && nextProps.invoices!==null)
            this.getInvoicesFromStatus(nextProps.invoices);
        if(this.props.invoices!==nextProps.invoices)
            this.getInvoicesFromStatus(nextProps.invoices);
    }


    getInvoicesFromStatus =(rawData=this.props.invoices) =>{
        let temp=[];
        let all_temp=[];
        let temp1=[];
        const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
        const keys=['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];

        if(rawData===null) return;

        let temp0 = rawData.Data;

        temp1 = keys.map((key, index)=> {

            if(this.props.transactionStatus[key]){
                temp = temp0.filter(d => {
                    if(this.props.regionId===0)
                        return d.TransactionStatus.toLowerCase() === statusStrings[index]
                    else
                        return d.TransactionStatus.toLowerCase() === statusStrings[index] && d.RegionId === this.props.regionId
                });
            }
            all_temp =_.uniq([...all_temp, ...temp]);
        });
        this.setState({temp: all_temp});
        this.setState({data: all_temp});
    };

    componentDidMount(){
        window.addEventListener('scroll', this.listenScrollEvent);
        document.addEventListener("keydown", this.escFunction, false);
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });

        if(this.props.customers!==null){
            let temp = [];
            let regions = this.props.customers.Data.Regions

            regions.map(x => {
                temp = [...temp, ...x.Customers];
            });
            this.setState({customers: temp})
        }
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    listenScrollEvent(event) {
        console.log('fired');
        console.log(event);

    }
    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({s: ''});
            this.getInvoicesFromStatus();
        }
    }
    search(val) {
        if(val===''){
            this.getInvoicesFromStatus();
            return;
        }
        const temp = this.state.data.filter( d => {
            return d.InvoiceId.toString().indexOf(val) !== -1 || !val ||
                d.InvoiceNo.indexOf(val) !== -1 ||
                d.InvoiceAmount.toString().indexOf(val) !== -1 ||
                d.InvoiceTotal.toString().indexOf(val) !== -1 ||
                d.InvoiceTax.toString().indexOf(val) !== -1 ||
                d.InvoiceDescription.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerName.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerId.toString().indexOf(val) !== -1 ||
                d.CustomerNo.toString().indexOf(val) !== -1 ||
                d.TransactionStatusListId.toString().indexOf(val) !== -1
        });

        this.setState({temp: temp});
    }

    handleChange1 = prop => event => {
        this.setState({ [prop]: event.target.value });

        if(prop==='s') {
            // this.search(event.target.value.toLowerCase());
        }
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    canBeSubmitted()
    {
        return true;
        const {name} = this.state;
        return (
            name.length > 0
        );
    }
    removeInvoices = ()=> {
        if(this.state.selection.length==0){
            alert("Please choose invoice(s) to delete");
            return;
        }
        if (window.confirm("Do you really want to remove the selected invoice(s)")) {
            this.props.deleteInvoicesAction(this.state.selection, this.props.invoices);
            this.setState({selection: [], selectAll: false})
        }
    };

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    render()
    {
        const { classes,toggleFilterPanel, toggleSummaryPanel, filterState, summaryState, deleteInvoicesAction,
            openNewInvoiceDialog, invoiceDialog,addInvoice, updateInvoice, removeInvoice} = this.props;
        const { toggleSelection, toggleAll, isSelected, logSelection} = this;
        const { selectAll, selection, value, suggestions } = this.state;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };

        return (
            <React.Fragment>
                <FusePageCustom
                    classes={{
                        root: classNames(classes.layoutRoot),
                        rightSidebar : classNames(classes.layoutRightSidebar, {'openSummary': summaryState}),
                        leftSidebar : classNames(classes.layoutLeftSidebar, {'openFilter': filterState}),
                        sidebarHeader: classes.layoutSidebarHeader,
                        header: classes.layoutHeader,
                        content: classes.content
                    }}
                    header={
                        <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                            <div className="flex flex-row flex-1 justify-between">
                                <div className="flex flex-shrink items-center">
                                    <div className="flex items-center">
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Icon className="text-32 mr-12">account_box</Icon>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="h6" className="hidden sm:flex">Accounts Receivable | Invoices</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                                <div className="flex flex-shrink items-center">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Fab color="secondary" aria-label="add"
                                             className={classNames(classes.sideButton, "mr-12")} onClick={openNewInvoiceDialog}>
                                            <Icon>add</Icon>
                                        </Fab>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Fab color="secondary" aria-label="add"
                                             className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
                                            <Icon>mail_outline</Icon>
                                        </Fab>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
                                            <Icon>print</Icon>
                                        </Fab>
                                    </FuseAnimate>
                                </div>
                            </div>
                            <div className="flex flex-none items-end" style={{display: 'none'}}>
                                <FuseAnimate animation="transition.expandIn" delay={600}>
                                    <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => alert('ok')}>
                                        <Icon>add</Icon>
                                    </Fab>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab color="primary" aria-label="add"
                                         className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
                                        <Icon>mail_outline</Icon>
                                    </Fab>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
                                        <Icon>print</Icon>
                                    </Fab>
                                </FuseAnimate>
=======
                                { selection.length>0 && (
                                    <FuseAnimate animation="transition.expandIn" delay={600}>
                                        <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeInvoices()}>
                                            <Icon>delete</Icon>
                                        </Fab>
                                    </FuseAnimate>
                                )}
>>>>>>> 055a639786b05bc09a9c3f0f4a61a420af4ad700
                            </div>
                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            {(this.state.temp && !invoiceDialog.props.open) && (
                                <ReactTable
                                    data={this.state.temp}
                                    minRows = {0}
                                    PaginationComponent={JanikingPagination}
                                    onFetchData={this.fetchData}
                                    getTheadGroupProps={(state, rowInfo, column, instance) =>{
                                        return {
                                            style:{
                                                padding: "10px 10px",
                                                fontSize: 16,
                                                fontWeight: 700
                                            },

                                        }
                                    }}
                                    getTheadGroupThProps={(state, rowInfo, column, instance) => {
                                        return {
                                            style:{
                                                padding: "10px 10px",
                                                fontSize: 18,
                                                fontWeight: 700,
                                            },
                                            className: classNames("flex items-center justify-start")
                                        }
                                    }}
                                    getTheadThProps={(state, rowInfo, column, instance) =>{
                                        let border = '1px solid rgba(255,255,255,.6)';
                                        if(column.Header==='Actions') border = 'none';

                                        return {
                                            style:{
                                                fontSize: '1.6rem',
                                                fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
                                                fontWeight: 400,
                                                lineHeight: 1.75,
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
                                        let tdClass='flex items-center justify-center';
                                        if (column.id==='InvoiceNo' ||column.id==='CustomerNo'||column.id==='InvoiceBalanceAmount'||
                                            column.id==='InvoiceDate' || column.id==='TransactionStatus') tdClass = classNames(classes.tableTdEven, "flex items-center  justify-center");

                                        return {
                                            style:{
                                                textAlign: 'center',
                                                flexDirection: 'row',
                                                fontSize: 12,
                                                padding: "0",
                                            },
                                        }
                                    }}
                                    getTrProps={(state, rowInfo, column) => {
                                        return {
                                            className: "cursor-pointer",
                                            onClick  : (e, handleOriginal) => {
                                                if ( rowInfo )
                                                {
                                                    alert('ok');
                                                    // openEditContactDialog(rowInfo.original);
                                                }
                                            }
                                        }
                                    }}
                                    columns={[
                                        {
                                            Header: (instance)=>(
                                                <div className="flex items-center">
                                                    <Hidden smDown>
                                                        <Button
                                                            onClick={(ev) => toggleFilterPanel()}
                                                            aria-label="toggle filter panel"
                                                            color="secondary"
                                                            disabled={filterState ? true : false}
                                                            className={classNames(classes.filterPanelButton)}
                                                        >
                                                            <img className={classes.imageIcon} src="assets/images/invoices/filter.png"/>
                                                        </Button>
                                                    </Hidden>
                                                    <Hidden smUp>
                                                        <Button
                                                            onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                                            aria-label="toggle filter panel"
                                                            className={classNames(classes.filterPanelButton)}
                                                        >
                                                            <img className={classes.imageIcon} src="assets/images/invoices/filter.png"/>
                                                        </Button>
                                                    </Hidden>
                                                </div>
                                            ),
                                            columns: [
                                                {
                                                    Header   : (instance) => (
                                                        <Checkbox
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                            }}
                                                            onChange={(event) => toggleAll(instance) }
                                                            checked={this.state.selectAll}
                                                            style={{color: 'white'}}
                                                            // indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
                                                        />
                                                    ),
                                                    accessor : "",
                                                    Cell     : row => {
                                                        return (<Checkbox
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                }}
                                                                checked={isSelected(row.value.InvoiceId)}
                                                                onChange={() => toggleSelection(row.value.InvoiceId)}
                                                            />
                                                        )
                                                    },
                                                    className: "justify-center",
                                                    sortable : false,
                                                    width    : 72
                                                }
                                            ],
                                            className: classNames("justify-center")
                                        },
                                        {
                                            Header: ()=>(
                                                <div className="flex items-center pr-0 lg:pr-12">
                                                    <Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>
                                                        <Input
                                                            placeholder="Search..."
                                                            className={classNames(classes.search, 'pl-16')}
                                                            // className="pl-16"
                                                            disableUnderline
                                                            fullWidth
                                                            value={this.state.s}
                                                            onChange={this.handleChange1('s')}
                                                            inputProps={{
                                                                'aria-label': 'Search'
                                                            }}
                                                        />
                                                        <Icon color="action" className="mr-16">search</Icon>
                                                    </Paper>
                                                </div>
                                            ),
                                            columns: [
                                                {
                                                    Header: "Invoice #",
                                                    accessor: "InvoiceNo",
                                                    filterAll: true,
                                                    width: 120,
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                                },
                                                {
                                                    Header: "Description",
                                                    accessor: "InvoiceDescription",
                                                    width: 420,
                                                    className: classNames("flex items-center  justify-start p-12-impor")
                                                },
                                                {
                                                    Header: "Customer #",
                                                    accessor: "CustomerNo",
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                                    width: 120
                                                },
                                                {
                                                    Header: "Customer Name",
                                                    accessor: "CustomerName",
                                                    width: 280,
                                                    className: classNames("flex items-center  justify-start p-12-impor")
                                                },
                                                {
                                                    Header: "Balance",
                                                    accessor: "InvoiceBalanceAmount",
                                                    Cell     : row => {
                                                        return '$'+parseFloat(row.original.InvoiceBalanceAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                                    },
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                                    width: 120
                                                },
                                                {
                                                    Header: "Total",
                                                    Cell     : row => {
                                                        return '$'+parseFloat(row.original.InvoiceTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                                    },
                                                    accessor: "InvoiceTotal",
                                                    className: classNames("flex items-center  justify-end p-12-impor"),
                                                    width: 120
                                                },
                                                {
                                                    Header: "Invoice Date",
                                                    id: "InvoiceDate",
                                                    accessor: d => moment(d.InvoiceDate).format('MM/DD/YYYY'),
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                                    width: 120
                                                },
                                                {
                                                    Header: "Due Date",
                                                    id: "DueDate",
                                                    accessor: d => moment(d.DueDate).format('MM/DD/YYYY'),
                                                    className: classNames("flex items-center  justify-center"),
                                                    width: 120
                                                },
                                                {
                                                    Header: "Status",
                                                    accessor: "TransactionStatus",
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                                    width: 120
                                                },
                                                {
                                                    Header: "Actions",
                                                    width : 128,
                                                    Cell  : row => (
                                                        <div className="flex items-center actions">
                                                            <IconButton
                                                                onClick={(ev) => {
                                                                    ev.stopPropagation();
                                                                    if (window.confirm("Do you really want to remove this invoice")) {
                                                                        this.props.removeInvoiceAction(row.original.InvoiceId, this.props.invoices);
                                                                        if(this.state.selection.length>0){
                                                                            _.remove(this.state.selection, function(id) {
                                                                                return id === row.original.InvoiceId;
                                                                            });
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                <Icon>delete</Icon>
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={(ev) => {
                                                                    ev.stopPropagation();
                                                                    // removeContact(row.original.id);
                                                                }}
                                                            >
                                                                <Icon>edit</Icon>
                                                            </IconButton>
                                                        </div>
                                                    )
                                                }
                                            ]
                                        },
                                        {
                                            Header: (instance)=>(
                                                <div className="flex items-center justify-end pr-12">
                                                    <Hidden smDown>
                                                        <Button
                                                            onClick={(ev) => toggleSummaryPanel()}
                                                            aria-label="toggle summary panel"
                                                            disabled={summaryState ? true : false}
                                                            className={classNames(classes.summaryPanelButton)}
                                                        >
                                                            <Icon>insert_chart</Icon>
                                                        </Button>
                                                    </Hidden>
                                                    <Hidden smUp>
                                                        <Button
                                                            onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                                            aria-label="toggle summary panel"
                                                            className={classNames(classes.summaryPanelButton)}
                                                        >
                                                            <Icon>insert_chart</Icon>
                                                        </Button>
                                                    </Hidden>
                                                </div>
                                            ),
                                            columns:[
                                                {
                                                    Header: '',
                                                    cell: ()=>(
                                                        <div className="flex w-full justify-end"/>
                                                    )
                                                }
                                            ]
                                        }
                                    ]}
                                    defaultPageSize={100}
                                    className={classNames( "-striped -highlight")}
                                    totalRecords = {this.state.temp.length}
                                    style={{
                                        height: '100%',
                                    }}
                                />
                            )}
                            {(this.state.temp && invoiceDialog.props.open) && (
                                <div className="p-24">
                                    <div className="flex">
                                        <Autosuggest
                                            {...autosuggestProps}
                                            inputProps={{
                                                classes,
                                                placeholder: 'Search Customer Name or Number',
                                                value: value,
                                                onChange: this.onChange,
                                            }}
                                            theme={{
                                                container: classNames(classes.container, classes.formControl),
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
                                    {this.state.selectedCustomer && (
                                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                                            <GridItem xs={12} sm={6} md={6} className="flex flex-row">
                                                <Card className={classes.card}>
                                                    <CardHeader title="Customer" className={classNames(classes.cardHeader, "flex-1")} />
                                                    <CardContent>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            <strong>Customer Name: {this.state.selectedCustomer.CustomerName}</strong>
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Customer No: {this.state.selectedCustomer.CustomerNo}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Address: {this.state.selectedCustomer.Address}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                                        </Typography>
                                                    </CardContent>

                                                </Card>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6} className= "flex flex-row justify-end">
                                                <div className="min-w-48 pt-20">
                                                </div>
                                                <Card className={classes.card}>
                                                    <CardHeader title="Billing" className={classNames(classes.cardHeader, "flex-1")} />
                                                    <CardContent>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            <strong>Billing Name: {this.state.selectedCustomer.CustomerName}</strong>
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Customer No: {this.state.selectedCustomer.CustomerNo}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Address: {this.state.selectedCustomer.Address}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                                        </Typography>
                                                    </CardContent>

                                                </Card>
                                            </GridItem>

                                        </GridContainer>
                                    )}

                                    <GridContainer>
                                        <GridItem xs={12} sm={9} md={9} className="flex flex-row">
                                            {/*<div className="min-w-48 pt-20"><Icon color="action">description</Icon></div>*/}
                                            <TextField
                                                className={classes.formControl}
                                                label="Description"
                                                id="description"
                                                name="InvoiceDescription"
                                                value={this.state.InvoiceDescription}
                                                onChange={this.handleChange}
                                                variant="outlined"
                                                fullWidth
                                                multiline={true}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={3} md={3} className="flex flex-row">
                                            {/*<div className="min-w-48 pt-20"><Icon color="action">calendar_today</Icon></div>*/}
                                            <TextField
                                                className={classes.formControl}
                                                id="InvoiceDate"
                                                label="Invoice Date"
                                                type="date"
                                                name="InvoiceDate"
                                                value={this.state.InvoiceDate}
                                                onChange={this.handleChange}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <Divider variant="middle" className={classNames(classes.formControl)}/>
                                    <div className="flex">
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel
                                                ref={ref => {
                                                    this.InputLabelRef = ref;
                                                }}
                                                htmlFor="Service"
                                            >
                                                Services
                                            </InputLabel>
                                            <Select
                                                value={this.state.Service}
                                                onChange={this.handleChange}
                                                input={
                                                    <OutlinedInput
                                                        labelWidth={this.state.labelWidth}
                                                        name="Service"
                                                        id="Service"
                                                    />
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>Select</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Adjust - Balance</MenuItem>
                                                <MenuItem value={2}>Adjust - Refund</MenuItem>
                                                <MenuItem value={3}>Adjust - WriteOff</MenuItem>
                                                <MenuItem value={4}>Buffing</MenuItem>
                                                <MenuItem value={5}>Carpet Clean</MenuItem>
                                                <MenuItem value={6}>Customer Suppliers</MenuItem>
                                                <MenuItem value={7}>Emergency Clean</MenuItem>
                                                <MenuItem value={8}>Event Center</MenuItem>
                                                <MenuItem value={9}>Floor Services</MenuItem>
                                                <MenuItem value={10}>Funiture Cleaning Service</MenuItem>
                                                <MenuItem value={11}>High Dusting</MenuItem>
                                                <MenuItem value={12}>Hotel</MenuItem>
                                                <MenuItem value={13}>In-House Work</MenuItem>
                                                <MenuItem value={14}>Initial and Deep Clean</MenuItem>
                                                <MenuItem value={15}>Initial One-Time Clean</MenuItem>
                                                <MenuItem value={16}>Make Ready</MenuItem>
                                                <MenuItem value={17}>Miscellaneous - Special</MenuItem>
                                                <MenuItem value={18}>Other</MenuItem>
                                                <MenuItem value={19}>Porter Services</MenuItem>
                                                <MenuItem value={20}>Power Washing</MenuItem>
                                                <MenuItem value={21}>Regular Billing</MenuItem>
                                                <MenuItem value={22}>Regular Cleaning - Day</MenuItem>
                                                <MenuItem value={23}>Regular Cleaning - Night</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classNames(classes.formControl, "flex ml-24")}>
                                            <RadioGroup
                                                aria-label="Work"
                                                name="selectedWork"
                                                className={classes.group}
                                                value={this.state.selectedWork}
                                                onChange={this.handleChange}
                                                className={classNames(classes.formControl, "flex flex-row ml-24")}
                                            >
                                                <FormControlLabel className="ml-36 mr-48" value="additional_billing_office" control={<Radio />} label="Additional Billing Office" />
                                                <FormControlLabel value="extrawork" control={<Radio />} label="Extra Work" />
                                                <FormControlLabel value="regularwork" control={<Radio />} label="Regular Billing" />
                                                <FormControlLabel value="client_supplies" control={<Radio />} label="Client Supplies" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <Divider variant="middle" className={classNames(classes.formControl)}/>
                                    <div className="flex">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                // addInvoice(this.state);
                                                this.closeComposeDialog();
                                            }}
                                            disabled={!this.canBeSubmitted()}
                                        >
                                            Save & Close
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    leftSidebarHeader={
                        <div className={classNames("flex flex-row w-full h-full justify-between p-12 align-middle pr-0", {'filteropen': filterState})}>
                            <h4 style={{marginBlockStart: '1em'}}>Filter Panel</h4>
                            <FuseAnimate animation="transition.expandIn" delay={200}>
                                <div>
                                    <Hidden xsDown>
                                        <IconButton onClick={(ev)=>toggleFilterPanel()}>
                                            <Icon>close</Icon>
                                        </IconButton>
                                    </Hidden>
                                </div>
                            </FuseAnimate>
                        </div>
                    }
                    leftSidebarContent={
                        <FilterPanel/>
                    }
                    rightSidebarHeader={
                        <div className="flex flex-row w-full h-full justify-between p-24 align-middle pr-0">
                            <h4 style={{marginBlockStart: '1em'}}>Summary Panel</h4>
                            <FuseAnimate animation="transition.expandIn" delay={200}>
                                <div>
                                    <Hidden xsDown>
                                        {/*<IconButton onClick={()=>this.removeInvoices()}>*/}
                                        {/*<Icon>delete</Icon>*/}
                                        {/*</IconButton>*/}
                                        <IconButton onClick={(ev)=>toggleSummaryPanel()}>
                                            <Icon>close</Icon>
                                        </IconButton>
                                    </Hidden>
                                </div>
                            </FuseAnimate></div>
                    }
                    rightSidebarContent={
                        <SummaryPanel/>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                >
                </FusePageCustom>
                {/*<InvoiceDialog customers={this.state.customers}/>*/}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getInvoices: Actions.getInvoices,
        toggleFilterPanel: Actions.toggleFilterPanel,
        toggleSummaryPanel: Actions.toggleSummaryPanel,
        deleteInvoicesAction: Actions.deleteInvoices,
        removeInvoiceAction: Actions.removeInvoice,
        openNewInvoiceDialog: Actions.openNewInvoiceDialog,
        openEditInvoiceDialog: Actions.openEditInvoiceDialog,
        closeEditInvoiceDialog: Actions.closeEditInvoiceDialog,
        closeNewInvoiceDialog : Actions.closeNewInvoiceDialog,
        getCustomers: Actions.getCustomers,
    }, dispatch);
}

function mapStateToProps({invoices, auth, customers})
{
    return {
        invoices: invoices.invoicesDB,
        bLoadedInvoices: invoices.bLoadedInvoices,
        transactionStatus: invoices.transactionStatus,
        filterState: invoices.bOpenedFilterPanel,
        summaryState: invoices.bOpenedSummaryPanel,
        regionId: auth.login.defaultRegionId,
        customers: customers.customersDB,
        bLoadedCustomers: customers.bLoadedCustomers,
        invoiceDialog: invoices.invoiceDialog
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoicePage)));

