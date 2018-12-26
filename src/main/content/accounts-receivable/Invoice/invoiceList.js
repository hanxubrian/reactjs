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
import "react-table/react-table.css";
import _ from 'lodash';


import classNames from 'classnames';

const headerHeight = 100;

const CheckboxTable = checkboxHOC(ReactTable);
const chance = new Chance();

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
            top: '150px',
            border: '1px solid coral'
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
    tableTheadEven:{
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
    },
    tableThEven:{
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .3)'
    },
    tableTdEven:{
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
    }
});
const defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
};


class InvoicePage extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        checkedPaid: true,
        checkedPP: true,
        checkedComplete: true,
        checkedOpen: true,
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

        if(this.props.regionId !== prevProps.regionId) {
            this.setState({regionId: prevProps.regionId});
            bChanged = true;
        }

        if(bChanged)
            this.getInvoicesFromStatus();

        if(prevProps.invoices===null && this.props.invoices!==null){
            this.getInvoicesFromStatus();
        }

        if(prevState.s!==this.state.s) {
            this.search(this.state.s);
        }
    }

    componentWillMount(){
        this.setState({checkedPaid: this.props.transactionStatus.checkedPaid});
        this.setState({checkedPP: this.props.transactionStatus.checkedPP});
        this.setState({checkedComplete: this.props.transactionStatus.checkedComplete});
        this.setState({checkedOpen: this.props.transactionStatus.checkedOpen});

        this.getInvoicesFromStatus()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.invoices===null && nextProps.invoices!==null)
            this.getInvoicesFromStatus(nextProps.invoices);
    }


    getInvoicesFromStatus =(rawData=this.props.invoices) =>{
        let temp=[];
        let all_temp=[];
        let temp1=[];
        const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
        const keys=['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];

        if(rawData===null) return;

        let temp0 = rawData.Data;

        temp1 = keys.map((key, index)=> {

            if(this.props.transactionStatus[key]){
                temp = temp0.filter(d => {
                    if(this.props.regionId===0)
                        return d.TransactionStatus.toLowerCase() === statusStrings[index]
                    else
                        return d.TransactionStatus.toLowerCase() === statusStrings[index] && d.RegionId === this.props.regionId
                });
            }
            all_temp =_.uniq([...all_temp, ...temp]);
        });
        this.setState({temp: all_temp});
        this.setState({data: all_temp});
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
            this.getInvoicesFromStatus();
        }
    }
    search(val) {
        if(val===''){
            this.getInvoicesFromStatus();
            return;
        }
        const temp = this.state.data.filter( d => {
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
            // this.search(event.target.value.toLowerCase());
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

        const { selectAll, selection } = this.state;
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
                                // padding: "5px 10px"
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
                    rightSidebar : classNames(classes.layoutRightSidebar, {'openSummary': summaryState}),
                    leftSidebar : classNames(classes.layoutLeftSidebar, {'openFilter': filterState}),
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
                                minRows = {0}
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
                                    let thClass='';
                                    if (column.id==='InvoiceNo' ||column.id==='CustomerNo'||column.id==='InvoiceBalanceAmount'||
                                        column.id==='InvoiceDate' || column.id==='TransactionStatus') thClass = classNames(classes.tableThEven);
                                    return {
                                        style:{
                                            fontSize: 12,
                                            padding: "10px 10px",
                                        },
                                        className: thClass
                                    }
                                }}
                                getTheadProps={(state, rowInfo, column, instance) =>{
                                    return {
                                        style:{
                                            fontSize: 13,
                                        },
                                        className: classes.tableTheadEven
                                    }
                                }}
                                getTdProps={(state, rowInfo, column, instance) =>{
                                    console.log('col', column)
                                    let direction = 'row';
                                    if (column.Header==='Description' ) direction = 'row';
                                    if (column.id==='CustomerName' ) {direction = 'row'; }

                                    let tdClass='flex items-center justify-center';
                                    // if (column.id==='_selector') width= 40;
                                    if (column.id==='InvoiceNo' ||column.id==='CustomerNo'||column.id==='InvoiceBalanceAmount'||
                                        column.id==='InvoiceDate' || column.id==='TransactionStatus') tdClass = classNames(classes.tableTdEven, "flex items-center  justify-center");

                                    return {
                                        style:{
                                            textAlign: 'center',
                                            flexDirection: direction,
                                            fontSize: 12,
                                            padding: "0",
                                        },
                                        className: tdClass
                                    }
                                }}
                                columns={[{
                                    Header: "Invoices",
                                    columns: [
                                        {
                                            Header: "Invoice #",
                                            accessor: "InvoiceNo",
                                            filterAll: true,
                                            width: 120
                                        },
                                        {
                                            Header: "Description",
                                            accessor: "InvoiceDescription",
                                            width: 360
                                        },
                                        {
                                            Header: "Customer #",
                                            accessor: "CustomerNo",
                                            width: 110
                                        },
                                        {
                                            Header: "Customer Name",
                                            accessor: "CustomerName",
                                            width: 240
                                        },
                                        {
                                            Header: "Balance",
                                            accessor: "InvoiceBalanceAmount",
                                            width: 110
                                        },
                                        {
                                            Header: "Total",
                                            accessor: "InvoiceTotal",
                                            width: 110
                                        },
                                        {
                                            Header: "Invoice Date",
                                            id: "InvoiceDate",
                                            accessor: d => moment(d.InvoiceDate).format('YYYY-MM-DD'),
                                            width: 110
                                        },
                                        {
                                            Header: "Due Date",
                                            id: "DueDate",
                                            accessor: d => moment(d.DueDate).format('YYYY-MM-DD'),
                                            width: 110
                                        },
                                        {
                                            Header: "Status",
                                            accessor: "TransactionStatus",
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
                                                            // removeContact(row.original.id);
                                                        }}
                                                    >
                                                        <Icon>delete</Icon>
                                                    </IconButton>,
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
                                }
                                ]}
                                defaultPageSize={100}
                                className={classNames( "-striped -highlight")}
                                style={{
                                    height: 600,
                                }}
                                {...checkboxProps}
                            />
                        )}
                    </div>
                }
                leftSidebarHeader={
                    <div className={classNames("flex flex-row w-full h-full justify-between p-24 align-middle pr-0", {'filteropen': filterState})}>
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
                                    {/*<IconButton onClick={()=>this.removeInvoices()}>*/}
                                    {/*<Icon>delete</Icon>*/}
                                    {/*</IconButton>*/}
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

function mapStateToProps({invoices, auth})
{
    return {
        invoices: invoices.invoicesDB,
        bLoadedInvoices: invoices.bLoadedInvoices,
        transactionStatus: invoices.transactionStatus,
        filterState: invoices.bOpenedFilterPanel,
        summaryState: invoices.bOpenedSummaryPanel,
        regionId: auth.login.defaultRegionId
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoicePage)));

