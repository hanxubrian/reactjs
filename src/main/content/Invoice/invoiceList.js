import React, {Component} from 'react';
import ReactTable from "react-table";

// core components
import TextField from "@material-ui/core/TextField";

import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
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
    temp = [];
    state = {
        s: ''
    };

    constructor(props){
        super(props);

        if(!props.bLoadedInvoices)
            props.getInvoices();
    }
    componentWillMount(){
        this.temp = this.props.invoices.Data;
        console.log('temp=', this.temp)
    }

    search(val) {
        const temp = this.props.invoices.Data.filter( d => {
            return d.InvoiceId.toString().indexOf(val) !== -1 || !val ||
                d.InvoiceNo.indexOf(val) !== -1 ||
                d.InvoiceDate.indexOf(val) !== -1 ||
                d.DueDate.indexOf(val) !== -1 ||
                d.InvoiceAmount.toString().indexOf(val) !== -1 ||
                d.InvoiceTotal.toString().indexOf(val) !== -1 ||
                d.InvoiceTax.toString().indexOf(val) !== -1 ||
                d.InvoiceDescription.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerName.toLowerCase().indexOf(val) !== -1 ||
                d.CustomerId.toString().indexOf(val) !== -1 ||
                d.CustomerNo.toString().indexOf(val) !== -1 ||
                d.TransactionStatusListId.toString().indexOf(val) !== -1 ||
                d.TransactionStatus.toLowerCase().indexOf(val) !== -1
        });

        this.temp = temp;
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
            <div>
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
                        data={this.temp}
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
                        defaultPageSize={20}
                        className="-striped -highlight"
                    />
                )}

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
        bLoadedInvoices: invoices.bLoadedInvoices
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoicePage)));
