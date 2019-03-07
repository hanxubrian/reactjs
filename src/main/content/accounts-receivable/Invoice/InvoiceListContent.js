import React, {Component} from 'react';

// Material-UI core components
import {
    Checkbox,
    Icon,
    IconButton,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Dialog,
    Fab,
    Paper,
} from '@material-ui/core';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';


import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import classNames from 'classnames';
import InvoiceLegacyReport from './invoiceReport';
import InvoiceNewReport from './InvoiceNewReport';
import InvoicePrintModal from './InvoicePrintModal';

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
        '& .pl-12-impor': {
            paddingLeft: '1.2rem!important',
        },
        '& .pr-12-impor': {
            paddingRight: '1.2rem!important',
        },
        '& .ReactTable .rt-noData': {
            top: '250px',
            border: '1px solid coral',
            display: 'none'
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
        '& .ReactTable .rt-thead.-header':{
            flex: '0 0 auto',
            overflowY: 'scroll'
        },
        '& .ReactTable .rt-th':{
            '& .rt-resizer':{
                display: 'none'
            }
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
    descr:{
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
    invoiceNo: {
        '& button':{
            padding :'8px 4px',
            '& span':{
                fontSize: 11,
                textTransform: 'none'
            }
        }
    },
});

class InvoiceListContent extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        selection: [],
        selectAll: false,
        isOpen: false,
        invoiceDetail: null,
        CustomerFor: [],
        CustomerSoldTo:[],
        selectedInvoice: null,
        alertOpen: false,
        selectedId: ''
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

        if(this.props.invoiceDetail!==prevProps.invoiceDetail && this.props.invoiceDetail !== null){
            this.setState({
                invoiceDetail: this.props.invoiceDetail,
            });
        }
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

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    invoiceReport =(ev, source, InvoiceId, RegionId)=>{
        ev.stopPropagation();
        this.props.getInvoiceDetail(InvoiceId, RegionId);

        if(source.toLowerCase()!=='billrun')
            this.setState({isOpen: true});
        else
            this.invoicePrintComponent.onShowFranchiseeDialog();
    };

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };


    handleCloseRemoveDialog = ()=>{
        this.setState({alertOpen: false})
    };

    handleOpenRemoveDialog = (key)=>{
        this.setState({alertOpen: true});
        this.setState({selectedId: key})
    };

    removeSelectedInvoice = ()=>{
        this.props.removeInvoiceAction(this.props.regionId, this.state.selectedId);
        this.setState({alertOpen: false});
    };

    printDocument=()=> {
        this.child.onInvoiceLegacyReportPrint();
    };

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
                                    if(this.props.filterState) this.props.toggleFilterPanel();
                                    if(this.props.summaryState) this.props.toggleSummaryPanel();
                                    this.props.openEditInvoiceForm(rowInfo.original.InvoiceId, this.props.regionId);
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
                                    width    : 56
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

                                    Cell: row => <Button onClick={(e)=>{this.invoiceReport(e,row.original.Source, row.original.InvoiceId,this.props.regionId)}}>{row.original.InvoiceNo}</Button> ,
                                    className: classNames(classes.invoiceNo, "flex items-center  justify-center text-12")
                                },
                                {
                                    Header: "Customer #",
                                    accessor: "CustomerNo",
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                    sortable: false,
                                    width: 100
                                },
                                {
                                    Header: "Customer Name",
                                    accessor: "CustomerName",
                                    width: 240,
                                    sortable: false,
                                    className: classNames("flex items-center  justify-start pl-12-impor")
                                },
                                {
                                    Header: "Description",
                                    accessor: "InvoiceDescription",
                                    className: classNames(classes.descr,"flex items-center justify-start p-12-impor"),
                                    width: '100%',
                                    sortable: false,
                                },
                                {
                                    Header: "Amount",
                                    accessor: "InvoiceAmount",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.InvoiceAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                    width: 100,
                                    sortable: false,
                                },
                                {
                                    Header: "Tax",
                                    accessor: "InvoiceTax",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.InvoiceTax).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                    width: 80,
                                    sortable: false,
                                },
                                {
                                    Header: "Total",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.InvoiceTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    accessor: "InvoiceTotal",
                                    className: classNames("flex items-center  justify-end p-12-impor"),
                                    width: 100,
                                    sortable: false,
                                },
                                {
                                    Header: "Invoice Date",
                                    id: "InvoiceDate",
                                    accessor: d => moment(d.InvoiceDate).format('MM/DD/YYYY'),
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                    width: 100,
                                    sortable: false,
                                },
                                {
                                    Header: "Due Date",
                                    id: "DueDate",
                                    accessor: d => moment(d.DueDate).format('MM/DD/YYYY'),
                                    className: classNames("flex items-center  justify-center"),
                                    width: 100,
                                    sortable: false,
                                },
                                {
                                    Header: "Actions",
                                    width : 90,
                                    sortable: false,
                                    Cell  : row => (
                                        <div className="flex items-center actions justify-center w-full">
                                            {row.original.InvoiceNo==='PENDING' && (
                                                <IconButton style={{padding: 8}}
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                                this.handleOpenRemoveDialog(row.original.InvoiceId);
                                                            }}
                                                >
                                                    <Icon fontSize={"small"}>delete</Icon>
                                                </IconButton>

                                            )}
                                            <IconButton style={{padding: 8}}
                                                        onClick={(ev) => {
                                                            ev.stopPropagation();
                                                            this.props.openEditInvoiceForm(row.original.InvoiceId, this.props.regionId);
                                                        }}
                                            >
                                                <Icon fontSize={"small"}>edit</Icon>
                                            </IconButton>
                                        </div>
                                    )
                                }
                            ]
                        },
                    ]}
                    defaultSorted={[
                        {
                            id: "InvoiceNo",
                            desc: true
                        }
                    ]}
                    defaultPageSize={100}
                    className={classNames( "-striped -highlight")}
                    totalRecords = {this.state.data.length}
                    style={{
                        height: '100%',
                    }}
                />
                <Dialog
                    open={this.state.alertOpen}
                    onClose={()=>this.handleCloseRemoveDialog()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Remove Invoice"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Proceed to remove the selected invoice?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleCloseRemoveDialog()} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={()=>this.removeSelectedInvoice()} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.props.invoiceDetail!==null && this.props.invoiceDetail!==undefined && this.state.invoiceDetail !==null && this.state.isOpen && (
                    <InvoiceLegacyReport onRef={ref => (this.child = ref)}  show={this.state.isOpen} onClose={this.toggleModal} Region={this.props.allRegion} RegionId ={this.props.regionId}  />
                )}
                {this.state.isOpen && this.state.invoiceDetail!==null &&(
                <div className="mb5" style={{zIndex:999999}}>
                    <button onClick={this.printDocument} style={{
                        left: '46%',
                        /* right: 50%; */
                        top: '-30px',
                        position: 'absolute',
                        backgroundColor: '#86ce99',
                        width: '150px',
                        height: '44px',
                        borderRadius: '7px',
                        color: 'white',
                        fontSize: '20px',
                    }}>Print</button>
                </div>
                )}
                <InvoicePrintModal onRef={component=>{this.invoicePrintComponent = component}}/>
            </div>

        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        removeInvoiceAction: Actions.removeInvoice,
        openEditInvoiceForm: Actions.openEditInvoiceForm,
        closeEditInvoiceForm: Actions.closeEditInvoiceForm,
        getInvoiceDetail: Actions.getInvoiceDetail,
        toggleFilterPanel: Actions.toggleFilterPanel,
        toggleSummaryPanel: Actions.toggleSummaryPanel,

    }, dispatch);
}

function mapStateToProps({invoices, auth})
{
    return {
        invoices: invoices.invoicesDB,
        invoiceDetail: invoices.invoiceDetail,
        transactionStatus: invoices.transactionStatus,
        regionId: auth.login.defaultRegionId,
        InvoiceForm: invoices.InvoiceForm,
        filterState: invoices.bOpenedFilterPanel,
        summaryState: invoices.bOpenedSummaryPanel,
        allRegion:auth.login.all_regions,

    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceListContent)));

