import React, {Component} from 'react';

// core components
import {
    Hidden, Icon, IconButton, Input, Paper, Button
} from '@material-ui/core';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';


import {withStyles,Card, CardContent, Typography, TextField, Checkbox} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';

const hexToRgb = (hex) =>{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const styles = theme => ({
    layoutTable: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
        },
        '& .-pageSizeOptions': {
            display: 'none'
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        },
        '& .ReactTable .rt-noData': {
            top: '250px',
            border: '1px solid coral'
        },
        '& .ReactTable .rt-thead.-headerGroups': {
            display: 'none'
        },
        '& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
            background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
            color: 'white!important'
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
    },
    content:{
        position: 'relative'
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
});

class InvoiceListContent extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        selection: [],
        selectAll: false,
        selectedInvoice: null,
        isOpen: false,
    };

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
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

    toggleLeftSidebar = () => {};
    constructor(props){
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.data!==prevProps.data)
            this.setState({data: this.props.data});
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillMount(){
        this.setState({data: this.props.data})
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({s: ''});
            this.setState({data: this.props.data})
        }
    }

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

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }
    onEditInvoice = row => {
        this.props.openEditInvoiceForm(row);
    };
    invoicereport =(ev)=>{
        ev.stopPropagation();
        console.log("invoice report");
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render()
    {
        const { classes} = this.props;
        const { toggleSelection, toggleAll, isSelected} = this;

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
                <ReactTable
                    data={this.state.data}
                    minRows = {0}
                    PaginationComponent={JanikingPagination}
                    onFetchData={this.fetchData}
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
                                    this.props.openEditInvoiceForm(rowInfo.original);
                                }
                            }
                        }
                    }}
                    columns={[
                        {
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
                            columns: [
                                {
                                    Header: "Invoice #",
                                    accessor: "InvoiceNo",
                                    filterAll: true,
                                    width: 120,
                                    Cell: props => <Button onClick={this.invoicereport}>{props.value}</Button> ,
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
                                                    this.props.openEditInvoiceForm(row.original);
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
                    totalRecords = {this.state.data.length}
                    style={{
                        height: '100%',
                    }}
                />
                {this.state.isOpen && (
                    <div onClick={this.invoicereport}  className="backdrop" style={{position: 'absolute',
                        top: -110,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex:99999,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        padding: 50}}>
                        <div onClick={this.invoicereport} className="modal" style={{ backgroundColor: '#fff',
                            borderRadius: 5,
                            maxWidth: '80%',
                            minHeight: 300,
                            margin: '0 auto',
                            padding: 30}}>
                            <div style={{width: '100%'}}>
                                <table style={{width: '100%'}}>
                                    <thead>
                                    <tr>
                                        <th className="text-center" width='20%' align="left">
                                            <Typography color="inherit">
                                                <img src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png" alt=""/>
                                            </Typography>
                                        </th>
                                        <th width='50%' className="text-left">
                                                Remit To:
                                            <Typography>JANI-KING OF BUFFALO, INC</Typography>
                                            <Typography>P.O.BOX 415291</Typography>
                                            <Typography>BOSTON <span style={{paddingLeft:150}}>MA</span>  <span style={{paddingLeft:50}}>02241-5291</span> </Typography>
                                            <Typography>(716) 636-4840</Typography>
                                        </th>
                                        <th>
                                            <table style={{width:'100%',borderCollapse: 'collapse',border:'solid 1px'}}>
                                                <tbody>
                                                <tr >
                                                    <td style={{border:'solid 1px'}} colSpan="2">Invoice</td>
                                                </tr>
                                                <tr>
                                                    <td style={{border:'solid 1px'}}>
                                                        <Typography> <strong>Date</strong> </Typography>
                                                        <Typography>12/01/2018</Typography>
                                                    </td>
                                                    <td style={{border:'solid 1px'}}>
                                                        <Typography><strong>Number</strong></Typography>
                                                        <Typography>BUF12180000</Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{border:'solid 1px'}}>
                                                        <Typography><strong>Due Date</strong></Typography>
                                                        <Typography>12/31/2018</Typography>
                                                    </td>
                                                    <td style={{border:'solid 1px'}}>
                                                        <Typography><strong>Cust#</strong></Typography>
                                                        <Typography>011050</Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{border:'solid 1px'}}>
                                                        <Typography><strong style={{fontSize:'11px'}}>Invoice Amount</strong></Typography>
                                                        <Typography>$31,180.55</Typography>
                                                    </td>
                                                    <td style={{border:'solid 1px'}}>
                                                        <Typography><strong style={{fontSize:'11px'}}>Amount Remitted</strong></Typography>
                                                        <Typography><br/></Typography>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                                <table style={{width:'85%'}} align="center">
                                    <tbody>
                                    <tr>
                                        <td width='60%' className="text-left">
                                            <Typography><strong>Sold To:</strong></Typography>
                                            <Typography>BUFFALO BILLS,LLC</Typography>
                                            <Typography><br/></Typography>
                                            <Typography>ONE BILLS DRIVE</Typography>
                                        </td>
                                        <td width='40%' className="text-left">
                                            <Typography><strong>For:</strong></Typography>
                                            <Typography>BUFFALO BILLS TRAINING AND</Typography>
                                            <Typography>OPERATIONS CENTER</Typography>
                                            <Typography>ONE BILLS DRIVE</Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td width='60%' className="text-left">
                                            <Typography><span>ORCHARD PARK</span><span style={{paddingLeft:100}}>NY</span><span style={{paddingLeft:30}}>14127</span></Typography>
                                        </td>
                                        <td width='40%' className="text-left">
                                            <Typography><span>ORCHARD PARK</span><span style={{paddingLeft:100}}>NY</span><span style={{paddingLeft:30}}>14127</span></Typography>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                                <table style={{width:'85%'}} align="center">
                                    <tbody>
                                    <tr>
                                        <td className="text-center" width='100%'>
                                            <Typography><span style={{fontSize:'11px'}}>Make All Chekcs Payable To:JANI-KING OF BUFFALO,INC,</span></Typography>
                                            <Typography><span style={{fontSize:'11px'}}>RETURN THIS PORTION WITH YOUR PAYMENT</span></Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style ={{ width:'100%',borderBottom:'2px solid rgb(0, 0, 0)',}}></div>
                                <table style={{width:'85%'}} align="center">
                                    <tbody>
                                    <tr>
                                        <td width ="20%"></td>
                                        <td width ="60%" className="text-center">
                                            <Typography><strong><span style={{fontSize:'18px'}}>JANI-KING OF BUFFALO,INC</span></strong></Typography>
                                            <Typography><strong><span style={{fontSize:'14px'}}>Commercial Cleaning Services</span></strong></Typography>
                                            <Typography><span>(716)</span> <span>636-4840</span></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>

                                        </td>
                                        <td width ="20%">
                                            <Typography color="inherit">
                                                <img src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png" alt=""/>
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                                <table style={{width:'85%'}} align="center">
                                    <tbody>
                                    <tr>
                                        <td width='60%' className="text-left">
                                            <Typography><strong>Sold To:</strong></Typography>
                                            <Typography>BUFFALO BILLS,LLC</Typography>
                                            <Typography><br/></Typography>
                                            <Typography>ONE BILLS DRIVE</Typography>
                                        </td>
                                        <td width='40%' className="text-left">
                                            <Typography><strong>For:</strong></Typography>
                                            <Typography>BUFFALO BILLS TRAINING AND</Typography>
                                            <Typography>OPERATIONS CENTER</Typography>
                                            <Typography>ONE BILLS DRIVE</Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td width='60%' className="text-left">
                                            <Typography><span>ORCHARD PARK</span><span style={{paddingLeft:100}}>NY</span><span style={{paddingLeft:30}}>14127</span></Typography>
                                        </td>
                                        <td width='40%' className="text-left">
                                            <Typography><span>ORCHARD PARK</span><span style={{paddingLeft:100}}>NY</span><span style={{paddingLeft:30}}>14127</span></Typography>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                                <table style={{width:'100%',borderCollapse: 'collapse',border:'solid 1px'}}>
                                    <thead>
                                    <tr>
                                        <th width="15%" style={{border:'solid 1px'}} className="text-center">Invoice No</th>
                                        <th width="10%" style={{border:'solid 1px'}} className="text-center">Date</th>
                                        <th width="10%" style={{border:'solid 1px'}} className="text-center">Cust No</th>
                                        <th width="15%" style={{border:'solid 1px'}} className="text-center">Sismn No</th>
                                        <th width="15%" style={{border:'solid 1px'}} className="text-center">PO Number</th>
                                        <th width="25%" style={{border:'solid 1px'}} className="text-center">Franchisee</th>
                                        <th width="10%" style={{border:'solid 1px'}} className="text-center">Due Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">BUF12180000</td>
                                        <td width="10%" style={{border:'solid 1px'}} className="text-center">12/01/2018</td>
                                        <td width="10%" style={{border:'solid 1px'}} className="text-center">011050</td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">4435</td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">63356B</td>
                                        <td width="25%" style={{border:'solid 1px'}} className="text-center">KMBURNS.LLC</td>
                                        <td width="10%" style={{border:'solid 1px'}} className="text-center">112/31/2018</td>
                                    </tr>

                                    </tbody>
                                </table>
                                <table style={{width:'100%',borderCollapse: 'collapse',border:'solid 1px'}}>
                                    <tbody>
                                    <tr>
                                        <td width="10%" style={{border:'solid 1px'}} className="text-center"><strong>Quantity</strong></td>
                                        <td width="60%" style={{border:'solid 1px'}} className="text-center"><strong>Description</strong></td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center"><strong>Unit Price</strong></td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center"><strong>Extended Price</strong></td>
                                    </tr>
                                    <tr>
                                        <td width="10%" style={{border:'solid 1px'}} className="text-center">1</td>
                                        <td width="60%" style={{border:'solid 1px'}} className="text-center">MONTHLY CONTRACY BILLING AMOUNT FOR DECEMBER</td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">
                                            28671.77
                                        </td>
                                        <td rowSpan="1" width="15%" style={{border:'solid 1px'}} className="text-center">
                                            28671.77
                                        </td>

                                        {/*<td rowSpan="1" width="15%" style={{border:'solid 1px'}} className="text-center"><strong>Extended Price1</strong></td>*/}
                                        {/*<td rowSpan="1" width="15%" style={{border:'solid 1px'}} className="text-center"><strong>Extended Price2</strong></td>*/}
                                        {/*<td rowSpan="1" width="15%" style={{border:'solid 1px'}} className="text-center"><strong>Extended Price3</strong></td>*/}
                                        {/*<td rowSpan="1" width="15%" style={{border:'solid 1px'}} className="text-center"><strong>Extended Price4</strong></td>*/}
                                    </tr>
                                    <tr>
                                        <td style={{borderRight:'solid 1px'}}>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography><Typography><br/></Typography><Typography><br/></Typography><Typography><br/></Typography>
                                        </td>
                                        <td><Typography><br/></Typography></td>
                                        <td style={{border:'solid 1px'}}><Typography><br/></Typography></td>
                                        <td style={{border:'solid 1px'}}><Typography><br/></Typography></td>
                                    </tr>

                                    <tr>
                                        <td width="10%"  style={{borderRight:'solid 1px'}} className="text-center"></td>
                                        <td width="60%"  className="text-center">PO63356B</td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">
                                           <strong>Amount of Sale</strong>
                                        </td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">
                                            $28671.77
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="10%"  style={{borderRight:'solid 1px'}} className="text-center"></td>
                                        <td width="60%"  className="text-center"></td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">
                                            <strong>Sales Tax</strong>
                                        </td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">
                                            $2,508.78
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="10%"  style={{borderRight:'solid 1px'}} className="text-center"></td>
                                        <td width="60%"  className="text-center">
                                            <Typography><strong style={{fontSize:'11px'}}>Make All Checks Payable To:</strong></Typography>
                                            <Typography><strong style={{fontSize:'11px'}}>JANI-KING OF BUFFALO,INC:</strong></Typography>
                                        </td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">
                                            <strong>Total</strong>
                                        </td>
                                        <td width="15%" style={{border:'solid 1px'}} className="text-center">
                                            $31,180.55
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/*<div onClick={this.invoicereport} className="footer">*/}
                                {/*<button onClick={this.invoicereport}>*/}
                                    {/*Close*/}
                                {/*</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        deleteInvoicesAction: Actions.deleteInvoices,
        removeInvoiceAction: Actions.removeInvoice,
        openEditInvoiceForm: Actions.openEditInvoiceForm,
        closeEditInvoiceForm: Actions.closeEditInvoiceForm,
    }, dispatch);
}

function mapStateToProps({invoices, auth})
{
    return {
        invoices: invoices.invoicesDB,
        transactionStatus: invoices.transactionStatus,
        regionId: auth.login.defaultRegionId,
        InvoiceForm: invoices.InvoiceForm
    }
}
const backdropStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
};

// The modal "window"
const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30
};
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceListContent)));

