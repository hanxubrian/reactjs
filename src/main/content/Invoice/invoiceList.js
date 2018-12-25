import React, {Component} from 'react';

// core components
import {Hidden, Icon, IconButton, Fab, Input, Paper,TextField} from '@material-ui/core';

// theme components
import {FusePageCustom, FuseAnimate,FuseSearch} from '@fuse';


import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

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
import _ from 'lodash';


import classNames from 'classnames';

const headerHeight = 100;

const CheckboxTable = checkboxHOC(ReactTable);
const chance = new Chance();

const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover',
    },
    layoutRoot: {
        flexDirection: 'row',
        '& .z-9999':{
            height: 64
        },
        '& .-pageSizeOptions': {
            display: 'none'
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
        width: 300
    },
    layoutSidebarHeader: {
        height   : headerHeight,
        minHeight: headerHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main
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
    }
});
const defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
};

class InvoicePage extends Component {
    state = {
        s: '',
        temp: [],
        checkedPaid: true,
        checkedPP: true,
        checkedComplete: true,
        checkedOpen: true,
        selection: [],
        selectAll: false
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

    toggleAll = () => {
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
            // we need to get at the internals of ReactTable
            const wrappedInstance = this.checkboxTable.getWrappedInstance();
            // the 'sortedData' property contains the currently accessible records based on the filter and sort
            const currentRecords = wrappedInstance.getResolvedState().sortedData;
            // we just push all the IDs onto the selection array
            console.log('toggle=', wrappedInstance.getResolvedState());
            let page = wrappedInstance.getResolvedState().page;
            let pageSize = wrappedInstance.getResolvedState().pageSize;
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

    getInvoicesFromStatus =(newprops=this.props.transactionStatus, rawData=this.props.invoices) =>{
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
            this.getInvoicesFromStatus();
        }
    }
    search(val) {
        const temp = this.state.temp.filter( d => {
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

    render()
    {
        const { classes,toggleFilterPanel, toggleSummaryPanel, filterState, summaryState, deleteInvoicesAction} = this.props;
        const { toggleSelection, toggleAll, isSelected, logSelection} = this;

        const { data, columns, selectAll, selection } = this.state;
        let checkboxProps={};
        logSelection();

        if (this.props.invoices) {
            checkboxProps = {
                selectAll,
                isSelected,
                toggleSelection,
                toggleAll,
                selectType: "checkbox",
                keyField: 'InvoiceId',
                getTrProps: (s, r) => {
                    // someone asked for an example of a background color change
                    // here it is...
                    if(r!==undefined) {
                        const selected = this.isSelected(r.original.InvoiceId);
                        return {
                            style: {
                                backgroundColor: selected ? "lightpink" : "",
                                padding: "5px 10px"
                            }
                        };
                    } else {
                        return {}
                    }
                }
            };
        }

        return (
            <FusePageCustom
                classes={{
                    root: classes.layoutRoot,
                    rightSidebar : classes.layoutRightSidebar,
                    sidebarHeader: classes.layoutSidebarHeader,
                    header: classes.layoutHeader
                }}
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="flex items-center pl-0 lg:pl-0 p-24">
                                { !filterState && (
                                    <Hidden smDown>
                                        <IconButton
                                            onClick={(ev) => toggleFilterPanel()}
                                            aria-label="toggle filter panel"
                                        >
                                            <img className={classes.imageIcon} src="assets/images/invoices/filter.png"/>
                                        </IconButton>
                                    </Hidden>
                                )}
                                <Hidden smUp>
                                    <IconButton
                                        onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                        aria-label="toggle filter panel"
                                    >
                                        <img className={classes.imageIcon} src="assets/images/invoices/filter.png"/>
                                        {/*<Icon>menu</Icon>*/}
                                    </IconButton>
                                </Hidden>
                            </div>
                            <div className="flex items-center pr-0 lg:pr-12 p-24">
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
                                {/*<div className={classes.separator}/>*/}
                                { !summaryState && (
                                    <Hidden smDown>
                                        <IconButton
                                            onClick={(ev) => toggleSummaryPanel()}
                                            aria-label="toggle summary panel"
                                            style={{marginRight: -12}}
                                        >

                                            <Icon>insert_chart</Icon>
                                            {/*{summaryState && (*/}
                                            {/*<Icon>close</Icon>*/}
                                            {/*)}*/}
                                        </IconButton>
                                    </Hidden>
                                )}
                                <Hidden smUp>
                                    <IconButton
                                        onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                        aria-label="toggle summary panel"
                                    >
                                        <Icon>insert_chart</Icon>
                                    </IconButton>
                                </Hidden>
                            </div>
                        </div>
                        <div className="flex flex-none items-end">
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => alert('ok')}>
                                    <Icon>add</Icon>
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
                }
                content={
                    <div className="flex-1 flex-col">
                        {this.state.temp && (
                            <CheckboxTable
                                data={this.state.temp}
                                ref={r => (this.checkboxTable = r)}
                                getTheadGroupProps={(state, rowInfo, column, instance) =>{
                                    return {
                                        style:{
                                            padding: "10px 10px",
                                            fontSize: 14,
                                            fontWeight: 700
                                        }
                                    }
                                }}
                                getTheadThProps={(state, rowInfo, column, instance) =>{
                                    let width=80;
                                    if (column.id==='InvoiceDescription') width= 250;
                                    if (column.id==='CustomerName') width= 190;
                                    return {
                                        style:{
                                            // minWidth: width,
                                            // width: width,
                                            fontSize: 12,
                                        }
                                    }
                                }}
                                getTheadProps={(state, rowInfo, column, instance) =>{
                                    return {
                                        style:{
                                            padding: "10px 10px",
                                            fontSize: 13,
                                        }
                                    }
                                }}
                                getTdProps={(state, rowInfo, column, instance) =>{
                                    let direction = 'column';
                                    if (column.Header==='Description' ) direction = 'row';
                                    if (column.Header==='Name' ) {direction = 'row'; }

                                    let width=80;
                                    if (column.id==='InvoiceDescription') width= 250;
                                    if (column.id==='CustomerName') width= 190;
                                    return {
                                        style:{
                                            textAlign: 'center',
                                            flexDirection: direction,
                                            // minWidth: width,
                                            // width: width,
                                            fontSize: 12,
                                        }
                                    }
                                }}
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
                                defaultPageSize={100}
                                className="-striped -highlight"
                                {...checkboxProps}
                            />
                        )}
                    </div>
                }
                leftSidebarHeader={
                    filterState ? <div className="flex flex-row w-full h-full justify-between p-24 align-middle pr-0">
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
                    </div>: ''
                }
                leftSidebarContent={
                    filterState ? <FilterPanel/>:''
                }
                rightSidebarHeader={
                    summaryState ? <div className="flex flex-row w-full h-full justify-between p-24 align-middle pr-0">
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
                        </FuseAnimate></div>:''
                }
                rightSidebarContent={
                    summaryState ? <SummaryPanel/> : ''
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
        getInvoices: Actions.getInvoices,
        toggleFilterPanel: Actions.toggleFilterPanel,
        toggleSummaryPanel: Actions.toggleSummaryPanel,
        deleteInvoicesAction: Actions.deleteInvoices
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        invoices: invoices.invoicesDB,
        bLoadedInvoices: invoices.bLoadedInvoices,
        transactionStatus: invoices.transactionStatus,
        filterState: invoices.bOpenedFilterPanel,
        summaryState: invoices.bOpenedSummaryPanel,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoicePage)));

