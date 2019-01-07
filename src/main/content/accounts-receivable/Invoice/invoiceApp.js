import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// core components
import {Hidden, Icon, IconButton, Fab, Typography,Toolbar} from '@material-ui/core';

// theme components
import {FusePageCustom, FuseAnimate} from '@fuse';

import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

//Custom components
import InvoiceListContent from "./InvoiceListContent"
import InvoiceForm from "./InvoiceForm"
import SummaryPanel from './SummaryPanel';
import FilterPanel from './filterPanel';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';

const headerHeight = 80;

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
        '& .openFilter':{
            width: 'inherit'
        },
        '& .openSummary':{
            width: 300
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        }
    },
    button: {
        '& span':{
            textTransform: 'none'
        }
    },
    card: {
        width   : '100%',
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
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 24,
        minWidth: 200,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
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
    "Service":""
};

class InvoiceApp extends Component {
    state = {
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
        customers: null,
        ...newInvoiceState,
        value: '',
        selectedInvoice: null
    };

    constructor(props){
        super(props);

        if(!props.bLoadedInvoices) {
            props.getInvoices();
        }

        if (!props.bLoadedCustomers) {
            props.getCustomers();
        }

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
    }

    componentWillMount(){
        this.setState({checkedPaid: this.props.transactionStatus.checkedPaid});
        this.setState({checkedPP: this.props.transactionStatus.checkedPP});
        this.setState({checkedComplete: this.props.transactionStatus.checkedComplete});
        this.setState({checkedOpen: this.props.transactionStatus.checkedOpen});
        this.setState({checkedOpen: this.props.transactionStatus.checkedEbill});
        this.setState({checkedOpen: this.props.transactionStatus.checkedPrint});

        this.getInvoicesFromStatus();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.invoices===null && nextProps.invoices!==null)
            this.getInvoicesFromStatus(nextProps.invoices);
        if(this.props.invoices!==nextProps.invoices)
            this.getInvoicesFromStatus(nextProps.invoices);


        if(nextProps.customers!==null && this.state.customers===null){
            let temp = [];
            let regions = nextProps.customers.Data.Regions

            regions.map(x => {
                temp = [...temp, ...x.Customers];
                return true;
            });
            this.setState({customers: temp});
        }
    }

    getInvoicesFromStatus =(rawData=this.props.invoices) =>{
        let temp=[];
        let all_temp=[];
        const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
        const keys=['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];

        if(rawData===null) return;

        let temp0 = rawData.Data;

        keys.map((key, index)=> {

            if(this.props.transactionStatus[key]){
                temp = temp0.filter(d => {
                    if(this.props.regionId===0)
                        return d.TransactionStatus.toLowerCase() === statusStrings[index]
                    else
                        return d.TransactionStatus.toLowerCase() === statusStrings[index] && d.RegionId === this.props.regionId
                });
            }
            all_temp =_.uniq([...all_temp, ...temp]);
            return true;
        });
        this.setState({temp: all_temp});
        this.setState({data: all_temp});
    };

    componentDidMount(){
        window.addEventListener('scroll', this.listenScrollEvent);
        document.addEventListener("keydown", this.escFunction, false);
        if(this.InputLabelRef) {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
            });
        }

        if(this.props.customers!==null){
            let temp = [];
            let regions = this.props.customers.Data.Regions;

            regions.map(x => {
                temp = [...temp, ...x.Customers];
                return true;
            });
            this.setState({customers: temp});
        }
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    listenScrollEvent(event) {
        console.log(event);
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({s: ''});
            this.getInvoicesFromStatus();
        }
    }

    onNewInvoice=()=>{
        if(this.props.filterState) this.props.toggleFilterPanel();
        if(this.props.summaryState) this.props.toggleSummaryPanel();

        this.props.openNewInvoiceForm();
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    removeInvoices = ()=> {
        if(this.state.selection.length===0){
            alert("Please choose invoice(s) to delete");
            return;
        }
        if (window.confirm("Do you really want to remove the selected invoice(s)")) {
            this.props.deleteInvoicesAction(this.state.selection, this.props.invoices);
            this.setState({selection: [], selectAll: false})
        }
    };

    render()
    {
        const { classes,toggleFilterPanel, toggleSummaryPanel, filterState, summaryState,
            openNewInvoiceForm, invoiceForm} = this.props;
        const { selection } = this.state;

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
                        <div className="flex w-full items-center">
                            {(this.state.temp && !invoiceForm.props.open) && (
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
                                                     className={classNames(classes.sideButton, "mr-12")} onClick={()=>this.onNewInvoice()}>
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
                                            <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => openNewInvoiceForm}>
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
                                        { selection.length>0 && (
                                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                                <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeInvoices()}>
                                                    <Icon>delete</Icon>
                                                </Fab>
                                            </FuseAnimate>
                                        )}
                                    </div>
                                </div>
                            )}
                            {(this.state.temp && invoiceForm.props.open) && (
                                <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                    <div className="flex flex-row flex-1 justify-between">
                                        <div className="flex flex-shrink items-center">
                                            <div className="flex items-center">
                                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                                    <Toolbar className="pl-12 pr-0">
                                                        <img className="mr-12" src="assets/images/invoices/invoice-icon-white.png" alt="new invoice" style={{width: 32, height: 32}}/>
                                                    </Toolbar>
                                                </FuseAnimate>

                                                    {this.props.invoiceForm.type === 'edit' && (
                                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                        <Typography variant="h6" className="hidden sm:flex">Accounts
                                                            Receivable | Edit Invoice</Typography>
                                                        </FuseAnimate>
                                                    )}
                                                    {this.props.invoiceForm.type === 'new' && (
                                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                        <Typography variant="h6" className="hidden sm:flex">Accounts
                                                            Receivable | New Invoice</Typography>
                                                        </FuseAnimate>
                                                    )}

                                            </div>
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
                                        { selection.length>0 && (
                                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                                <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeInvoices()}>
                                                    <Icon>delete</Icon>
                                                </Fab>
                                            </FuseAnimate>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            {(this.state.temp && !invoiceForm.props.open) && (
                                <InvoiceListContent data={this.state.temp}/>
                            )}
                            {(this.state.temp && invoiceForm.props.open) && (
                                <InvoiceForm customers={this.state.customers} selectedInvoice={this.state.selectedInvoice}/>
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
        openNewInvoiceForm: Actions.openNewInvoiceForm,
        openEditInvoiceForm: Actions.openEditInvoiceForm,
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
        invoiceForm: invoices.invoiceForm
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceApp)));
