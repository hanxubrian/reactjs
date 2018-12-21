import React, {Component} from 'react';
import ReactTable from "react-table";
import _ from 'lodash';

// core components
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';



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

const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    card: {
        width   : '100%',
        maxWidth: 384,
        // background: '#424242'
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
    componentWillUpdate(){

    }

    getInvoicesFromStatus =(newprops) =>{
        let temp=[];
        let all_temp=[];
        let temp1=[];
        const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
        const keys=['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];

        let temp0 = this.props.invoices.Data;

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
                // d.InvoiceDate.indexOf(val) !== -1 ||
                // d.DueDate.indexOf(val) !== -1 ||
                d.InvoiceAmount.toString().indexOf(val) !== -1 ||
                d.InvoiceTotal.toString().indexOf(val) !== -1 ||
                d.InvoiceTax.toString().indexOf(val) !== -1 ||
                d.InvoiceDescription.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerName.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerId.toString().indexOf(val) !== -1 ||
                d.CustomerNo.toString().indexOf(val) !== -1 ||
                d.TransactionStatusListId.toString().indexOf(val) !== -1
            // d.TransactionStatus.toLowerCase().indexOf(val) !== -1
        });

        this.setState({temp: temp});
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });

        if(prop==='s') {
            console.log('sss=', event.target.value);
            this.search(event.target.value.toLowerCase());
        }
    };

    render()
    {
        let data;
        if(this.props.invoices){
            data = this.props.invoices.Data;
        }
        const { classes } = this.props;
        return (

            <div className="flex relative" style={{overflowX:'hidden'}}>
                <FilterPanel/>
                <div className="flex-1 flex-col">
                    <TextField
                        id="search-box"
                        label="Search"
                        className={classes.searchBox}
                        value={this.state.s}
                        onChange={this.handleChange('s')}
                        margin="normal"
                        style={{marginLeft: 20}}

                    />
                    {this.props.invoices && (
                        <ReactTable
                            data={this.state.temp}
                            columns={[
                                {
                                    Header: "Invoice",
                                    columns: [
                                        {
                                            Header  : "No",
                                            accessor: "InvoiceNo",
                                            filterAll: true
                                        },
                                        {
                                            Header  : "Id",
                                            accessor: "InvoiceId"
                                        },
                                        {
                                            Header  : "Date",
                                            id: "InvoiceDate",
                                            accessor: d=>moment(d.InvoiceDate).format('YYYY-MM-DD')
                                        },
                                        {
                                            Header  : "Due Date",
                                            id: "DueDate",
                                            accessor: d=>moment(d.DueDate).format('YYYY-MM-DD')
                                        },
                                        {
                                            Header  : "Amount",
                                            accessor: "InvoiceAmount",
                                        },
                                        {
                                            Header  : "Tax",
                                            accessor: "InvoiceTax",
                                        },
                                        {
                                            Header  : "Total",
                                            accessor: "InvoiceTotal",
                                        },
                                        {
                                            Header  : "Description",
                                            accessor: "InvoiceDescription",
                                        },
                                    ]
                                },
                                {
                                    Header: "Customer",
                                    columns: [
                                        {
                                            Header  : "No",
                                            accessor: "CustomerNo",
                                        },
                                        {
                                            Header  : "Id",
                                            accessor: "CustomerId",
                                        },
                                        {
                                            Header  : "Name",
                                            accessor: "CustomerName",
                                        },
                                    ]

                                },
                                {
                                    Header: "Transaction Status",
                                    columns:[
                                        {
                                            Header  : "List Id",
                                            accessor: "TransactionStatusListId",
                                        },
                                        {
                                            Header  : "Status",
                                            accessor: "TransactionStatus",
                                        },
                                    ]
                                }
                            ]}
                            defaultPageSize={18}
                            className="-striped -highlight"
                        />
                    )}
                </div>
                <SummaryPanel/>

            </div>
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

