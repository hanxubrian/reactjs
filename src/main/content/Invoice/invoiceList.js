import React, {Component} from 'react';
import ReactTable from "react-table";
import _ from 'lodash';

// core components
import TextField from "@material-ui/core/TextField";
import {Hidden, Icon, IconButton} from '@material-ui/core';

// theme components
import {FusePageSimple, FuseAnimate} from '@fuse';


import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import SummaryPanel from './SummaryPanel';
import FilterPanel from './filterPanel';

import moment from 'moment'
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

const headerHeight = 160;

const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    layoutRoot: {},
    card: {
        width   : '100%',
        maxWidth: 384,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    overlay:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight
    },
    layoutRightSidebar : {
        width: 320
    },
    layoutSidebarHeader: {
        height   : headerHeight,
        minHeight: headerHeight
    },
    addButton          : {
        position: 'absolute',
        bottom  : -28,
        left    : 16,
        zIndex  : 999
    }
});

class InvoicePage extends Component {
    state = {
        s: '',
        temp: [],
        checkedPaid: true,
        checkedPP: true,
        checkedComplete: true,
        checkedOpen: true,
    };

    constructor(props){
        super(props);

        if(!props.bLoadedInvoices) {
            props.getInvoices();
        }

        this.escFunction = this.escFunction.bind(this);
    }

    componentWillMount(){
        this.setState({checkedPaid: this.props.transactionStatus.checkedPaid});
        this.setState({checkedPP: this.props.transactionStatus.checkedPP});
        this.setState({checkedComplete: this.props.transactionStatus.checkedComplete});
        this.setState({checkedOpen: this.props.transactionStatus.checkedOpen});

        this.getInvoicesFromStatus(this.props.transactionStatus)

    }

    getInvoicesFromStatus =(newprops, rawData=this.props.invoices) =>{
        let temp=[];
        let all_temp=[];
        let temp1=[];
        const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
        const keys=['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];

        if(rawData===null) return;

        let temp0 = rawData.Data;

        temp1 = keys.map((key, index)=> {

            if(newprops[key]){
                temp = temp0.filter(d => {
                    return d.TransactionStatus.toLowerCase() === statusStrings[index]
                });
            }
            all_temp =_.uniq([...all_temp, ...temp]);
        });
        this.setState({temp: all_temp})
    };

    componentWillReceiveProps(nextProps){
        let bChanged = false;
        if(this.props.transactionStatus.checkedPaid !== nextProps.transactionStatus.checkedPaid) {
            this.setState({checkedPaid: !this.state.checkedPaid});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedPP !== nextProps.transactionStatus.checkedPP) {
            this.setState({checkedPP: !this.state.checkedPP});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedComplete !== nextProps.transactionStatus.checkedComplete) {
            this.setState({checkedComplete: !this.state.checkedComplete});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedOpen !== nextProps.transactionStatus.checkedOpen) {
            this.setState({checkedOpen: !this.state.checkedOpen});
            bChanged = true;
        }

        if(bChanged)
            this.getInvoicesFromStatus(nextProps.transactionStatus);

        if(nextProps.invoices){
            this.getInvoicesFromStatus(nextProps.transactionStatus, nextProps.invoices);
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({s: ''});
            this.setState({temp: this.props.invoices.Data});
        }
    }
    search(val) {
        const temp = this.props.invoices.Data.filter( d => {
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

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });

        if(prop==='s') {
            this.search(event.target.value.toLowerCase());
        }
    };

    toggleLeftSidebar = () => {
    };

    render()
    {
        const { classes } = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center pl-12 lg:pl-24 p-24">
                            {/*<Hidden lgUp>*/}
                                <IconButton
                                    onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                    aria-label="open left sidebar"
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                            {/*</Hidden>*/}
                            <div className="flex-1"><h4>Header</h4></div>
                        </div>
                    </div>
                }
                content={
                    <div className="p-24">
                        <h4>Content</h4>
                        <br/>
                    </div>
                }
                leftSidebarHeader={
                    <div className="p-24"><h4>Sidebar Header</h4></div>
                }
                leftSidebarContent={
                    <FilterPanel/>
                }
                leftSidebarVariant="temporary"
                rightSidebarHeader={
                    <div className="p-24"><h4>Sidebar Header</h4></div>
                }
                rightSidebarContent={
                    <div className="p-24">
                        <h4>Sidebar Content</h4>
                        <br/>
                    </div>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            >
            </FusePageSimple>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getInvoices: Actions.getInvoices,
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        invoices: invoices.invoicesDB,
        bLoadedInvoices: invoices.bLoadedInvoices,
        transactionStatus: invoices.transactionStatus
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoicePage)));

