import React, {Component} from 'react';
import ReactTable from "react-table";
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
    constructor(props){
        super(props);

        if(!props.bLoadedInvoices)
            props.getInvoices();
    }
    state = {
    };

    render()
    {
        let data;
        if(this.props.invoices){
            data = this.props.invoices.Data;
        }
        return (
            <div>
                {this.props.invoices && (
                    <ReactTable
                        data={data}
                        columns={[
                            {
                                Header: "Invoice",
                                columns: [
                                    {
                                        Header  : "No",
                                        accessor: "InvoiceNo"
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
                                    {
                                        Header  : "Due Date",
                                        id: "DueDate",
                                        accessor: d=>moment(d.DueDate).format('YYYY-MM-DD')
                                    }
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

