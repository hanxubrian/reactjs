import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// core components
import {
    Hidden,
    Icon,
    IconButton,
    Fab,
    Typography,
    Toolbar,
    CircularProgress,
    Button,
    Input,
    Paper
} from '@material-ui/core';

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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .9)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        opacity: 0.5
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
    imageIcon: {
        width: 24
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
    "Service":""
};

class InvoiceApp extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        checkedEbill: true,
        checkedPrint: true,
        selection: [],
        selectAll: false,
        regionId: 0,
        customers: null,
        franchisees: null,
        ...newInvoiceState,
        value: '',
        selectedInvoice: null
    };

    constructor(props){
        super(props);

        if(!props.bLoadedInvoices) {
            props.getInvoiceStatus(props.regionId);
            props.getInvoices([props.regionId] ,props.StatusId, props.FromDate, props.ToDate, props.PeriodId,
                props.OpenOrClosed, props.InvoiceTypeId, props.ToPrintOrToEmail, props.SearchText);
        }

        if (!props.bLoadedCustomers) {
            props.getCustomers(props.regionId);
        }
        if (!props.bLoadedFranchisees) {
            props.getFranchisees(props.regionId, props.fstatusId, props.fLocation, props.fLongitude, props.fLatitude, props.fSearchText);
        }
        this.escFunction = this.escFunction.bind(this);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }


    componentDidUpdate(prevProps, prevState, snapshot){
        let bChanged = false;

        const {regionId, StatusId, FromDate, ToDate,PeriodId, OpenOrClosed,InvoiceTypeId, ToPrintOrToEmail, SearchText} = this.props;
        const {fstatusId, fLocation, fLongitude, fLatitude, fSearchText} = this.props;

        if(this.props.transactionStatus.checkedEbill !== prevProps.transactionStatus.checkedEbill) {
            this.setState({checkedEbill: !this.state.checkedEbill});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedPrint !== prevProps.transactionStatus.checkedPrint) {
            this.setState({checkedPrint: !this.state.checkedPrint});
            bChanged = true;
        }

        if(regionId !== prevProps.regionId){
            this.props.getCustomers(regionId);
        }
        if(regionId !== prevProps.regionId){
            this.props.getFranchisees(regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText);
        }
        if(regionId !== prevProps.regionId ||
            FromDate !== prevProps.FromDate ||
            ToDate !== prevProps.ToDate
        ) {
            this.props.getInvoices([regionId] ,StatusId, FromDate, ToDate, PeriodId,
                OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText);
        }

        if(prevState.s!==this.state.s) {
            this.search(this.state.s);
        }

        if(bChanged)
            this.getInvoicesFromStatus();

        if(prevProps.invoices===null && this.props.invoices!==null){
            this.getInvoicesFromStatus();
        }
    }

    search(val) {
        const temp = this.state.data.filter( d => {
            return d.InvoiceId.toString().indexOf(val) !== -1 || !val ||
                d.InvoiceNo.indexOf(val) !== -1 ||
                d.InvoiceAmount.toString().indexOf(val) !== -1 ||
                d.InvoiceTotal.toString().indexOf(val) !== -1 ||
                d.InvoiceTax.toString().indexOf(val) !== -1 ||
                d.InvoiceDescription!==null && d.InvoiceDescription.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerName.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerId.toString().indexOf(val) !== -1 ||
                d.CustomerNo.toString().indexOf(val) !== -1 ||
                d.TransactionStatusListId.toString().indexOf(val) !== -1
        });

        this.setState({temp: temp});
    }

    componentWillMount(){
        this.setState({checkedOpen: this.props.transactionStatus.checkedEbill});
        this.setState({checkedOpen: this.props.transactionStatus.checkedPrint});

        this.getInvoicesFromStatus();
        const {regionId, StatusId, FromDate, ToDate,PeriodId, OpenOrClosed,InvoiceTypeId, ToPrintOrToEmail, SearchText} = this.props;
        const {fstatusId, fLocation, fLongitude, fLatitude, fSearchText} = this.props;

        if(this.props.invoices===null) {
            this.props.getInvoices([regionId], StatusId, FromDate, ToDate, PeriodId,
                OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText);
            this.props.getCustomers(regionId);
            this.props.getFranchisees(regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.invoices === null && nextProps.invoices !== null)
            this.getInvoicesFromStatus(nextProps.invoices);
        if (this.props.invoices !== nextProps.invoices)
            this.getInvoicesFromStatus(nextProps.invoices);


        if (nextProps.customers !== null && this.props.customers !== nextProps.customers) {
            let temp = [];
            let regions = nextProps.customers.Data.Regions;

            regions.map(x => {
                temp = [...temp, ...x.CustomerList];
                return true;
            });
            this.setState({customers: temp});
        }
        if(nextProps.franchisees!==null && this.props.franchisees!==nextProps.franchisees){
            this.setState({franchisees: nextProps.franchisees.Data.Region[0].FranchiseeList});
        }
    }

    getInvoicesFromStatus =(rawData=this.props.invoices) =>{
        let temp=[];
        let all_temp=[];

        if(rawData===null) return;
        if(rawData.Data.Region.length===0) return;

        let temp0 = rawData.Data.Region[0].InvList;

        this.setState({temp: temp0});
        this.setState({data: temp0});
    };

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction);
        if(this.props.customers!==null){
            let temp = [];
            let regions = this.props.customers.Data.Regions;

            regions.map(x => {
                temp = [...temp, ...x.CustomerList];
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

    onNewInvoice = ()=>{
        if(this.props.filterState) this.props.toggleFilterPanel();
        if(this.props.summaryState) this.props.toggleSummaryPanel();

        this.props.openNewInvoiceForm();
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleSearchChange = prop => event => {
        this.setState({ [prop]: event.target.value });
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
                                </div>
                            )}
                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            {(this.state.temp && !invoiceForm.props.open) && (
                                <div className={classNames("flex flex-col h-full")}>
                                    <div className="flex flex-row items-center p-12">
                                        <div className="flex justify-start items-center">
                                            <Hidden smDown>
                                                <Button
                                                    onClick={(ev) => toggleFilterPanel()}
                                                    aria-label="toggle filter panel"
                                                    color="secondary"
                                                    disabled={filterState ? true : false}
                                                    className={classNames(classes.filterPanelButton)}
                                                >
                                                    <img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>
                                                </Button>
                                            </Hidden>
                                            <Hidden smUp>
                                                <Button
                                                    onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                                    aria-label="toggle filter panel"
                                                    className={classNames(classes.filterPanelButton)}
                                                >
                                                    <img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>
                                                </Button>
                                            </Hidden>
                                        </div>
                                        <div className="flex items-center w-full h-44 mr-12 ml-12">
                                            <Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>
                                                <Input
                                                    placeholder="Search..."
                                                    className={classNames(classes.search, 'pl-16')}
                                                    // className="pl-16"
                                                    disableUnderline
                                                    fullWidth
                                                    value={this.state.s}
                                                    onChange={this.handleSearchChange('s')}
                                                    inputProps={{
                                                        'aria-label': 'Search'
                                                    }}
                                                />
                                                <Icon color="action" className="mr-16">search</Icon>
                                            </Paper>
                                        </div>
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
                                    </div>
                                    <InvoiceListContent data={this.state.temp}/>
                                </div>
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
                {(this.props.bInvoiceStart || this.props.bCustomerFetchStart || this.props.bFranchiseesFetchStart) && (
                    <div className={classes.overlay}>
                        <CircularProgress className={classes.progress} color="secondary"  />
                    </div>
                )}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getInvoices: Actions.getInvoices,
        getInvoiceStatus: Actions.getInvoiceStatus,
        getInvoiceDetail: Actions.getInvoiceDetail,
        toggleFilterPanel: Actions.toggleFilterPanel,
        toggleSummaryPanel: Actions.toggleSummaryPanel,
        openNewInvoiceForm: Actions.openNewInvoiceForm,
        openEditInvoiceForm: Actions.openEditInvoiceForm,
        getCustomers: Actions.getCustomers,
        getFranchisees: Actions.getFranchisees,
    }, dispatch);
}

function mapStateToProps({invoices, auth, customers, franchisees})
{
    return {
        invoices: invoices.invoicesDB,
        invoiceDetail: invoices.invoiceDetail,
        bLoadedInvoices: invoices.bLoadedInvoices,
        transactionStatus: invoices.transactionStatus,
        invoiceStatus: invoices.invoiceStatus,
        filterState: invoices.bOpenedFilterPanel,
        summaryState: invoices.bOpenedSummaryPanel,
        invoiceForm: invoices.invoiceForm,
        FromDate: invoices.FromDate,
        ToDate: invoices.ToDate,
        StatusId: invoices.StatusId,
        PeriodId: invoices.PeriodId,
        OpenOrClosed: invoices.OpenOrClosed,
        InvoiceTypeId: invoices.InvoiceTypeId,
        ToPrintOrToEmail: invoices.ToPrintOrToEmail,
        SearchText: invoices.SearchText,
        bInvoiceStart: invoices.bInvoiceStart,
        customers: customers.customersDB,
        bLoadedCustomers: customers.bLoadedCustomers,
        bCustomerFetchStart: customers.bCustomerFetchStart,
        regionId: auth.login.defaultRegionId,
        franchisees: franchisees.franchiseesDB,
        bLoadedFranchisees: franchisees.bLoadedFranchisees,
        fstatusId: franchisees.statusId,
        fLocation: franchisees.Location,
        fLongitude: franchisees.Longitude,
        fLatitude: franchisees.Latitude,
        fSearchText: franchisees.SearchText,
        bFranchiseesFetchStart: franchisees.bFranchiseesFetchStart,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceApp)));
