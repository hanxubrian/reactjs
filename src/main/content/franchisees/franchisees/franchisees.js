import React, {Component} from 'react';

// core components
import {
    Hidden,
    Icon,
    IconButton,
    Fab,
    Input,
    Paper,
    TextField,
    Button,
    Typography,
    MenuItem,
    Toolbar
} from '@material-ui/core';

// theme components
import {FusePageCustom, FuseAnimate,FuseSearch} from '@fuse';

//Janiking
import JanikingPagination from './../../../../Commons/JanikingPagination';

import {bindActionCreators} from "redux";
import {withStyles, Checkbox} from "@material-ui/core";
import {Link, withRouter} from 'react-router-dom';

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import SummaryPanel from './SummaryPanel';
import FilterPanel from './filterPanel';

// third party
import classNames from 'classnames';
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';

import CreateFranchiseesPage from "./franchiseesForms/create"



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
    sideButton          : {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
});
const defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
};


class Franchisees extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        checkedSelectAll: true,
        checkedActive: true,
        checkedInactive: true,
        checkedCTDB: true,
        checkedPendingTransfer: true,
        checkedLegalCompliancePending: true,
        checkedTransfer: true,
        checkedTerminated: true,
        checkedRejected: true,
        checkedPending: true,
        checkedNonRenewed: true,
        checkedRepurchased: true,
        selection: [],
        selectAll: false,
        regionId: 0
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
                    selection.push(item._original.ID);
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

    constructor(props){
        super(props);

        if(!props.bLoadedFranchisees) {
            props.getFranchisees();
        }
        this.fetchData = this.fetchData.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let bChanged = false;
        if(this.props.transactionStatusFranchisees.checkedSelectAll !== prevProps.transactionStatusFranchisees.checkedSelectAll) {
            this.setState({checkedSelectAll: !this.state.checkedSelectAll});
            bChanged = true;
        }

        if(this.props.transactionStatusFranchisees.checkedActive !== prevProps.transactionStatusFranchisees.checkedActive) {
            this.setState({checkedActive: !this.state.checkedActive});
            bChanged = true;
        }

        if(this.props.transactionStatusFranchisees.checkedInactive !== prevProps.transactionStatusFranchisees.checkedInactive) {
            this.setState({checkedInactive: !this.state.checkedInactive});
            bChanged = true;
        }

        if(this.props.transactionStatusFranchisees.checkedCTDB !== prevProps.transactionStatusFranchisees.checkedCTDB) {
            this.setState({checkedCTDB: !this.state.checkedCTDB});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedPendingTransfer !== prevProps.transactionStatusFranchisees.checkedPendingTransfer) {
            this.setState({checkedPendingTransfer: !this.state.checkedPendingTransfer});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedLegalCompliancePending !== prevProps.transactionStatusFranchisees.checkedLegalCompliancePending) {
            this.setState({checkedLegalCompliancePending: !this.state.checkedLegalCompliancePending});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedTransfer !== prevProps.transactionStatusFranchisees.checkedTransfer) {
            this.setState({checkedTransfer: !this.state.checkedTransfer});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedTerminated !== prevProps.transactionStatusFranchisees.checkedTerminated) {
            this.setState({checkedTerminated: !this.state.checkedTerminated});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedRejected !== prevProps.transactionStatusFranchisees.checkedRejected) {
            this.setState({checkedRejected: !this.state.checkedRejected});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedPending !== prevProps.transactionStatusFranchisees.checkedPending) {
            this.setState({checkedPending: !this.state.checkedPending});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedNonRenewed !== prevProps.transactionStatusFranchisees.checkedNonRenewed) {
            this.setState({checkedNonRenewed: !this.state.checkedNonRenewed});
            bChanged = true;
        }
        if(this.props.transactionStatusFranchisees.checkedRepurchased !== prevProps.transactionStatusFranchisees.checkedRepurchased) {
            this.setState({checkedRepurchased: !this.state.checkedRepurchased});
            bChanged = true;
        }

        if(this.props.regionId !== prevProps.regionId) {
            this.setState({regionId: prevProps.regionId});
            bChanged = true;
        }

        if(bChanged)
            this.getFranchiseesFromStatus();

        if(prevProps.franchisees===null && this.props.franchisees!==null){
            this.getFranchiseesFromStatus();
        }

        if(prevState.s!==this.state.s) {
            this.search(this.state.s);
        }
    }

    componentWillMount(){
        this.setState({checkedSelectAll: this.props.transactionStatusFranchisees.checkedSelectAll});
        this.setState({checkedActive: this.props.transactionStatusFranchisees.checkedActive});
        this.setState({checkedInactive: this.props.transactionStatusFranchisees.checkedInactive});
        this.setState({checkedCTDB: this.props.transactionStatusFranchisees.checkedCTDB});
        this.setState({checkedPendingTransfer: this.props.transactionStatusFranchisees.checkedPendingTransfer});
        this.setState({checkedLegalCompliancePending: this.props.transactionStatusFranchisees.checkedLegalCompliancePending});
        this.setState({checkedTransfer: this.props.transactionStatusFranchisees.checkedTransfer});
        this.setState({checkedTerminated: this.props.transactionStatusFranchisees.checkedTerminated});
        this.setState({checkedRejected: this.props.transactionStatusFranchisees.checkedRejected});
        this.setState({checkedPending: this.props.transactionStatusFranchisees.checkedPending});
        this.setState({checkedNonRenewed: this.props.transactionStatusFranchisees.checkedNonRenewed});
        this.setState({checkedRepurchased: this.props.transactionStatusFranchisees.checkedRepurchased});

        this.getFranchiseesFromStatus();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.franchisees===null && nextProps.franchisees!==null)
            this.getFranchiseesFromStatus(nextProps.franchisees);
        if(this.props.franchisees!==nextProps.franchisees)
            this.getFranchiseesFromStatus(nextProps.franchisees);
    }


    getFranchiseesFromStatus =(rawData=this.props.franchisees) =>{
        let filterTemp=[];
        let totalFilterTemp=[];
        let all_temp=[];
        let temp1 = [];
        let currentStatus = this.props.transactionStatusFranchisees;
        if(rawData===null) return;
        let temp0 = rawData.Data.Region;
        if(this.props.regionId===0 ){
            for(let i = 0; i < temp0.length ; i++){
                temp1 = all_temp.concat(temp0[i].Franchisees);
                all_temp = temp1;
            }
        }else{
            for(let i = 0; i < temp0.length ; i++){
                if(this.props.regionId ===temp0[i].Id){
                    all_temp = temp0[i].Franchisees;
                }
            }
        }
        if(all_temp.length>0){
            for(var i = 0; i < all_temp.length ; i++){
                if(currentStatus.checkedInactive){
                    if(all_temp[i].StatusName ==='InActive'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedActive){
                    if(all_temp[i].StatusName==='Active'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedLegalCompliancePending){
                    if(all_temp[i].StatusName ==='LegalCompliancePending'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedPending){
                    if(all_temp[i].StatusName==='Pending'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedTerminated){
                    if(all_temp[i].StatusName==='Terminated'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedTransfer){
                    if(all_temp[i].StatusName==='Transfer'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedPendingTransfer){
                    if(all_temp[i].StatusName==='PendingTransfer'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedNonRenewed){
                    if(all_temp[i].StatusName==='NonRenewed'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedRejected){
                    if(all_temp[i].StatusName==='Rejected'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedRepurchased){
                    if(all_temp[i].StatusName==='Repurchased'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
                if(currentStatus.checkedCTDB){
                    if(all_temp[i].StatusName==='CTDB'){
                        filterTemp = totalFilterTemp.concat(all_temp[i]);
                        totalFilterTemp = filterTemp;
                    }
                }
            }
        }
        this.setState({temp: totalFilterTemp});
        this.setState({data: totalFilterTemp});
    };

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({s: ''});
            this.getFranchiseesFromStatus();
        }
    }
    search(val) {
        if(val===''){
            this.getFranchiseesFromStatus();
            return;
        }
        const temp = this.state.data.filter( d => {
            return d.Number.toLowerCase().indexOf(val) !== -1 || !val ||
                d.StatusName.toLowerCase().indexOf(val) !== -1 ||
                d.Name.toLowerCase().indexOf(val) !== -1 ||
                d.Address1.toLowerCase().indexOf(val) !== -1 ||
                d.DistributionAmount.toLowerCase().indexOf(val) !== -1 ||
                d.Phone.toLowerCase().indexOf(val) !== -1
        });
        this.setState({temp: temp});
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });

        if(prop==='s') {
            // this.search(event.target.value.toLowerCase());
        }
    };

    removeFranchisees = ()=> {
        if(this.state.selection.length==0){
            alert("Please choose franchisee(s) to delete");
            return;
        }
        if (window.confirm("Do you really want to remove the selected franchisee(s)")) {
            this.props.deleteFranchisees(this.state.selection, this.props.franchisees);
            this.setState({selection: [], selectAll: false})
        }
    };

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    canBeSubmitted()
    {
        return true;
        const {name} = this.state;
        return (
            name.length > 0
        );
    }
    closeComposeForm = () => {
        this.props.createFranchisees.type === 'create' ? this.props.closeEditFranchisees() : this.props.closeCreateFranchisees();
    };


    render()
    {
        const { classes,toggleFilterPanelFranchisees,showCreteFranchisees, toggleSummaryPanelFranchisees, createFranchisees, filterStateFranchisees, summaryStateFranchisees, deleteFranchisees} = this.props;
        const { toggleSelection, toggleAll, isSelected} = this;

        const { selection } = this.state;
        return (
            <FusePageCustom
                classes={{
                    root: classNames(classes.layoutRoot,'test123'),
                    rightSidebar : classNames(classes.layoutRightSidebar, {'openSummary': summaryStateFranchisees}),
                    leftSidebar : classNames(classes.layoutLeftSidebar, {'openFilter': filterStateFranchisees}),
                    sidebarHeader: classes.layoutSidebarHeader,
                    header: classes.layoutHeader,
                    content: classes.content
                }}
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                        {this.state.temp  && (!createFranchisees.props.open) && (
                            <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                <div className="flex flex-row flex-1 justify-between">
                                    <div className="flex flex-shrink items-center">
                                        <div className="flex items-center">
                                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                                <Icon className="text-32 mr-12">account_box</Icon>
                                            </FuseAnimate>
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography variant="h6" className="hidden sm:flex">Franchisees | List</Typography>
                                            </FuseAnimate>
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink items-center">
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Fab color="secondary" aria-label="add"
                                                 className={classNames(classes.sideButton, "mr-12")} onClick={showCreteFranchisees}>
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
                                    { selection.length>0 && (
                                        <FuseAnimate animation="transition.expandIn" delay={600}>
                                            <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeFranchisees()}>
                                                <Icon>delete</Icon>
                                            </Fab>
                                        </FuseAnimate>
                                    )}
                                </div>
                            </div>
                        )}
                        {this.state.temp  && (createFranchisees.props.open) && (
                            <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                <div className="flex flex-row flex-1 justify-between">
                                    <div className="flex flex-shrink items-center">
                                        <div className="flex items-center">
                                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                                <Toolbar className="pl-12 pr-0">
                                                    <img className="mr-12" src="assets/images/invoices/invoice-icon-white.png" style={{width: 32, height: 32}}/>
                                                </Toolbar>
                                            </FuseAnimate>
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography variant="h6" className="hidden sm:flex">Franchisees | New Franchisees</Typography>
                                            </FuseAnimate>
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink items-center">
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classNames(classes.button, "mr-12")}
                                                onClick={() => {
                                                    this.closeComposeForm();
                                                }}
                                                disabled={!this.canBeSubmitted()}
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
                                                    this.closeComposeForm();
                                                }}
                                                disabled={!this.canBeSubmitted()}
                                            >
                                                Save & Add more
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
                                                disabled={!this.canBeSubmitted()}
                                            >
                                                Close
                                            </Button>
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
                        {this.state.temp  && (!createFranchisees.props.open) && (
                            <ReactTable
                                data={this.state.temp}
                                minRows = {0}
                                onFetchData={this.fetchData}
                                PaginationComponent={JanikingPagination}
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
                                        column.id==='InvoiceDate' || column.id==='transactionStatusFranchisees') tdClass = classNames( "flex items-center  justify-center");

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
                                                        onClick={(ev) => toggleFilterPanelFranchisees()}
                                                        aria-label="toggle filter panel"
                                                        color="secondary"
                                                        disabled={filterStateFranchisees ? true : false}
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
                                                            checked={isSelected(row.value.ID)}
                                                            onChange={() => toggleSelection(row.value.ID)}
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
                                                        onChange={this.handleChange('s')}
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
                                                Header: "NUMBER",
                                                accessor: "Number",
                                                filterAll: true,
                                                width: 200,
                                                className: classNames("flex items-center  justify-center")
                                            },
                                            {
                                                Header: "FRANCHISEES NAME",
                                                accessor: "Name",
                                                width: 350,
                                                className: classNames("flex items-center  justify-start p-12-impor")
                                            },
                                            {
                                                Header: "FULL ADDRESS",
                                                accessor: "Address",
                                                className: classNames("flex items-center  justify-start p-12-impor"),
                                                width: 420
                                            },
                                            {
                                                Header: "PHONE",
                                                accessor: "Phone",
                                                width: 200,
                                                className: classNames("flex items-center  justify-center p-12-impor")
                                            },
                                            {
                                                Header: "STATUS",
                                                accessor: "StatusName",
                                                className: classNames("flex items-center  justify-center p-12-impor"),
                                                width: 150
                                            },
                                            {
                                                Header: "DISTRIBUTION AMOUNT",
                                                accessor: "DistributionAmount",
                                                className: classNames("flex items-center  justify-end p-12-impor"),
                                                width: 200
                                            },
                                            {
                                                Header: "Actions",
                                                width : 150,
                                                className: classNames("flex items-center  justify-center p-12-impor"),
                                                Cell  : row => (
                                                    <div className="flex items-center actions ">
                                                        <IconButton
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                                if (window.confirm("Do you really want to remove this franchisee")) {
                                                                    this.props.removeFranchisees(row.original.ID, this.props.franchisees);
                                                                    if(this.state.selection.length>0){
                                                                        _.remove(this.state.selection, function(id) {
                                                                            return id === row.original.ID;
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
                                                        onClick={(ev) => toggleSummaryPanelFranchisees()}
                                                        aria-label="toggle summary panel"
                                                        disabled={summaryStateFranchisees ? true : false}
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
                        {(this.state.temp && createFranchisees.props.open) && (
                            <CreateFranchiseesPage/>
                        )}
                    </div>
                }
                leftSidebarHeader={
                    <div className={classNames("flex flex-row w-full h-full justify-between p-12 align-middle pr-0", {'filteropen': filterStateFranchisees})}>
                        <h4 style={{marginBlockStart: '1em'}}>Filter Panel</h4>
                        <FuseAnimate animation="transition.expandIn" delay={200}>
                            <div>
                                <Hidden xsDown>
                                    <IconButton onClick={(ev)=>toggleFilterPanelFranchisees()}>
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
                                    <IconButton onClick={(ev)=>toggleSummaryPanelFranchisees()}>
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
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getFranchisees: Actions.getFranchisees,
        toggleFilterPanelFranchisees: Actions.toggleFilterPanelFranchisees,
        toggleSummaryPanelFranchisees: Actions.toggleSummaryPanelFranchisees,
        deleteFranchisees: Actions.deleteFranchisees,
        removeFranchisees: Actions.removeFranchisees,
        showCreteFranchisees: Actions.showCreteFranchisees,
        closeCreateFranchisees: Actions.closeCreateFranchisees,
        showEditFranchisees: Actions.showCreteFranchisees,
        closeEditFranchisees: Actions.showCreteFranchisees
    }, dispatch);
}

function mapStateToProps({franchisees,auth})
{
    return {
        franchisees: franchisees.franchiseesDB,
        bLoadedFranchisees: franchisees.bLoadedFranchisees,
        transactionStatusFranchisees: franchisees.transactionStatusFranchisees,
        filterStateFranchisees: franchisees.bOpenedFilterPanelFranchisees,
        summaryStateFranchisees: franchisees.bOpenedSummaryPanelFranchisees,
        regionId: auth.login.defaultRegionId,
        createFranchisees: franchisees.createFranchisees
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Franchisees)));

