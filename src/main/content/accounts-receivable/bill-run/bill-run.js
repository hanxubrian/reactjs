import React, {Component} from 'react';

// core components
import {Icon, IconButton,Button, Fab,ClickAwayListener, Input, Paper, Typography,CircularProgress,MenuItem,InputLabel ,OutlinedInput , FormControl, Select} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { Dialog ,DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// theme components
import {FusePageCustom, FuseAnimate ,FuseExample, FuseHighlight, FusePageSimple} from '@fuse';

// for store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';

// third party
import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import classNames from 'classnames';


import MomentUtils from "@date-io/moment/build/index";
import BillRunDialog from './bill-run-create';
import BillRunInvoiceDetail from './bill-run-invoice';

import {UPDATE_FROM_DATE_INVOICE, UPDATE_TO_DATE_INVOICE} from "../../../../store/actions";

const headerHeight = 100;

const hexToRgb = (hex) =>{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const styles = theme => ({
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
            border: '1px solid coral',
            display: 'none'
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
            justifyContent: 'flex-start'
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        }
    },
    layoutHeader       : {
        height   : 80,
        minHeight: 80,
        backgroundColor: theme.palette.secondary.main
    },
    content:{
        position: 'relative'
    },
    search: {
        // width: 360,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        minWidth:360,
    },
    sideButton          : {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    tableTheadRow:{
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main,
        padding: 12
    },
    topbtncus:{
        // marginRight: 100,
    },
    overlay: {
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
    progress: {
        margin: theme.spacing.unit * 2,
    },
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: 120,
    },
});

const THIS_WEEK = 1;
const THIS_WEEK_TO_DATE = 2;
const THIS_MONTH = 3;
const THIS_MONTH_TO_DATE = 4;
const THIS_QUARTER = 5;
const THIS_QUARTER_TO_DATE = 6;
const THIS_YEAR = 7;
const THIS_YEAR_TO_DATE = 8;
const TODAY = 9;
const YESTERDAY = 10;
const LAST_QUARTER = 11;
const LAST_YEAR = 12;
const CUSTOM_DATE = 13;
const PERIOD = 14;
var channel =undefined;

class BillRun extends Component {
    state = {
        s                       : '',
        temp                    : [],
        data                    : [],
        selection               : [],
        regionId                : 0,
        open                    : false,
        flag                    : false,
        FromDate                : moment(),
        ToDate                  : moment(),
        startDate               : null,
        endDate                 : null,
        billrunDateOption       : THIS_MONTH,
        billrunDatePeriod       : moment(),
        status                  : false,
        pusherMSG               : null,
        viewinvoiceDetail       : false,

    };

    constructor(props){
        super(props);

        if(!props.bLoadedBillruns) {
        }

        this.fetchData = this.fetchData.bind(this);
        this._isMounted = false;
    }
    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillMount(){
        if( this._isMounted)
            this.getBillruns();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this._isMounted){
            let bChanged = false;

            if(this.props.regionId !== prevProps.regionId) {
                this.setState({regionId: prevProps.regionId});
                bChanged = true;
            }

            if(bChanged)
                this.getBillruns();

            if(prevProps.billruns===null && this.props.billruns!==null){
                this.getBillruns();
            }

            if(prevState.s!==this.state.s) {
                // this.search(this.state.s);
            }
            if(!this.state.status && this.state.startDate === null && this.state.endDate === null){
                this.setState({
                    startDate : moment().date(1),
                    endDate   : moment(moment().date(1)).endOf('month'),
                    FromDate  : moment(),
                    ToDate    : moment(),
                    status    : true,
                })

            }
            if(JSON.stringify(this.state) !== JSON.stringify(prevState) && !this.props.loading){
                if(JSON.stringify(this.state.viewinvoiceDetail) !== JSON.stringify(prevState.viewinvoiceDetail)){
                    return;
                }
                this.getBillRunList();
            }
            if(this.props.loading === false && prevProps.loading===true){
            }
        }
    }

    componentWillUnmount(){
        this.child=null;
        this.child1=null;
        this.pageLayout = undefined;
        this._isMounted = false;
        channel = undefined;

    }

    componentWillReceiveProps(nextProps) {
        if(this.props.billruns===null && nextProps.billruns!==null && this._isMounted)
            this.getBillruns(nextProps.billruns);
        if(this.props.billruns!==nextProps.billruns && this._isMounted)
            this.getBillruns(nextProps.billruns);
    }

    getBillruns =(rawData=this.props.billruns) =>{
        if(rawData===null) return;

        this.setState({temp: rawData});
        this.setState({data: rawData});
    };

    btnbillrun=(event)=>{
        this.setState({open: !this.state.open});
        if(!this.state.flag){

            this.setState({flag: !this.state.flag});
        }
    };

    getBillRunList=()=>{
        if(!this._isMounted) return ;
        let regisonid       = [];
        let userids         = [];
        let isbillperiod    = false;
        let month           = "";
        let year            = "";
        let fromdate        = null;
        let todate          = null;
        let searchtext      = "";
        if(this.props.auth && this.props.auth != null ){
            regisonid.push(this.props.auth.defaultRegionId);
            userids.push(this.props.auth.UserId);
            if(this.state.billrunDateOption !==CUSTOM_DATE && this.state.startDate !== null && this.state.endDate!== null){
                fromdate    = this.state.startDate.format("MM/DD/YYYY");
                todate      = this.state.endDate.format("MM/DD/YYYY");
            }
            else if(this.state.billrunDateOption ===CUSTOM_DATE && this.state.FromDate && this.state.FromDate !== null && this.state.ToDate !== null){
                fromdate    = this.state.FromDate.format("MM/DD/YYYY");
                todate      = this.state.ToDate.format("MM/DD/YYYY");
            }
            if(this.state.billrunDateOption ===PERIOD){
                isbillperiod = true;
                year = moment(this.state.startDate).year();
                month = moment(this.state.startDate).month()+1;
            }
            if(fromdate && fromdate != null && todate && todate != null){

                if(regisonid && regisonid.length >0 && userids && userids.length >0 && !this.props.loading){
                    this.props.getAllBillruns(
                        regisonid,userids,fromdate,todate, isbillperiod,month,year,searchtext
                    );
                }
            }
        }
    };

    opendialogwin=()=>{
        // this.refs.child.handleClickOpen();
        this.child.handleClickOpen();
    };

    closeDialog=()=>{


    };

    handleChange1 = event => {
        if(!this._isMounted){return null;}
        this.setState({[event.target.name]: event.target.value});
        let startDate, endDate, quarter, year;
        switch (event.target.value) {
            case THIS_WEEK:
                startDate = moment().day(0);
                endDate = moment().day(6);
                break;
            case THIS_WEEK_TO_DATE:
                startDate = moment().day(0);
                endDate = moment();
                break;
            case THIS_MONTH:
                startDate = moment().date(1);
                endDate = moment(moment().date(1)).endOf('month');
                break;
            case THIS_MONTH_TO_DATE:
                startDate = moment().date(1);
                endDate = moment();
                break;
            case THIS_QUARTER:
                quarter = moment().quarter();
                startDate = moment().quarter(quarter).startOf('quarter');
                endDate = moment().quarter(quarter).endOf('quarter');
                break;
            case THIS_QUARTER_TO_DATE:
                quarter = moment().quarter();
                startDate = moment().quarter(quarter).startOf('quarter');
                endDate = moment();
                break;
            case THIS_YEAR:
                year = moment().year();
                startDate = moment().startOf('year');
                endDate = moment().endOf('year');
                break;
            case THIS_YEAR_TO_DATE:
                year = moment().year();
                startDate = moment().startOf('year');
                endDate = moment();
                break;
            case TODAY:
                startDate = moment();
                endDate = startDate;
                break;
            case YESTERDAY:
                startDate = moment().subtract(1, 'days');
                endDate = startDate;
                break;
            case LAST_QUARTER:
                quarter = moment().quarter();
                if(quarter===1)
                    startDate = moment().subtract(1, 'years').quarter(4).startOf('quarter');
                else
                    startDate = moment().quarter(quarter-1).startOf('quarter');

                if(quarter===1)
                    endDate = moment().quarter(quarter).startOf('quarter').subtract(1, 'days');
                else
                    endDate = moment().quarter(quarter-1).endOf('quarter');
                break;
            case LAST_YEAR:
                year = moment().year();
                startDate = moment().subtract(1, 'years').startOf('year');
                endDate = moment().subtract(1, 'years').startOf('year').add(1,'years').subtract(1,'days');
                break;
            case PERIOD:
                year = moment(this.state.billrunDatePeriod).year();
                let month = moment(this.state.billrunDatePeriod).month();
                startDate = moment().year(year).month(month).startOf('month');
                endDate = moment().year(year).month(month).endOf('month');
        }

        if(event.target.value!==CUSTOM_DATE){
            this.setState({
                startDate   : startDate,
                endDate     : endDate,
            })
        }

    };

    handleBillRunFromDateChange = date => {
        this.setState({FromDate: date});
    };

    handleBillRunToDateChange = date => {
        this.setState({ ToDate: date });
    };

    handlePeriodChange = date => {
        this.setState({ billrunDatePeriod: date });
        let year = moment(date).year();
        let month = moment(date).month();
        let startDate = moment().year(year).month(month).startOf('month').format("MM/DD/YYYY");
        let endDate = moment().year(year).month(month).endOf('month').format("MM/DD/YYYY");
        this.setState({startDate: date});
        this.setState({endDate: date });
    };

    gotoInvoice = async rowinfo => {

        let year = rowinfo.Year;
        let month = rowinfo.Month-1;

        let startDate = moment().year(year).month(month).startOf('month');
        let endDate = moment().year(year).month(month).endOf('month');

        await this.props.updateInvoiceDate(UPDATE_FROM_DATE_INVOICE, startDate.format("MM/DD/YYYY"));
        await this.props.updateInvoiceDate(UPDATE_TO_DATE_INVOICE, endDate.format("MM/DD/YYYY"));
        this.props.history.push("/accounts-receivable/invoices");
    };

    CloseDetail=()=>{
        this.setState({viewinvoiceDetail:!this.state.viewinvoiceDetail});
    };

    render()
    {
        const {classes} = this.props;
        const { selection } = this.state;
        return (
            <FusePageCustom
                classes={{
                    root: classes.layoutRoot,
                    header: classes.layoutHeader,
                    content: classes.content
                }}
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between" >
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="flex flex-shrink items-center">
                                <div className="flex items-center">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Icon className="text-32 mr-12">account_box</Icon>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">Accounts Receivable | Bill Run</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                            <div className={classNames(classes.topbtncus,"flex flex-shrink items-center")}>
                                <Button variant="contained" color="primary"
                                        className={classNames(classes.button, classes.btntop) } onClick={this.opendialogwin}>
                                    Execute Bill Run
                                    <Icon className={classes.rightIcon}>attach_money</Icon>
                                </Button>
                                {/*<FuseAnimate animation="transition.expandIn" delay={300} >*/}
                                    {/*<Fab color="secondary" aria-label="add"*/}
                                         {/*className={classNames(classes.sideButton, "mr-12")}  onClick={this.opendialogwin}>*/}
                                        {/*<Icon>attach_money</Icon>*/}
                                    {/*</Fab>*/}
                                {/*</FuseAnimate>*/}
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
                                    <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeInvoices()}>
                                        <Icon>delete</Icon>
                                    </Fab>
                                </FuseAnimate>
                            )}
                        </div>
                    </div>
                }
                content={

                        <div className="flex-1 flex-col absolute w-full h-full">
                            {this.state.temp && (
                                <ReactTable
                                    data={this.state.temp}
                                    PaginationComponent={JanikingPagination}
                                    minRows = {0}
                                    onFetchData={this.fetchData}
                                    getTheadGroupProps={(state, rowInfo, column, instance) =>{
                                        return {
                                            style:{
                                                // padding: "10px 10px",
                                                fontSize: 16,
                                                fontWeight: 700
                                            },
                                        }
                                    }}
                                    getTheadGroupThProps={(state, rowInfo, column, instance) => {
                                        return {
                                            style:{
                                                // padding: "10px 10px",
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
                                        return {
                                            style:{
                                                textAlign: 'center',
                                                flexDirection: 'row',
                                                fontSize: 13,
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
                                                    this.gotoInvoice(rowInfo.original);
                                                }
                                            }
                                        }
                                    }}
                                    columns={[
                                        {
                                            Header: ()=>(
                                                <div style={{width:"100%"}}>
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
                                                    <div className="flex items-center pr-0 lg:pr-12">
                                                        {/*<Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>*/}
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <InputLabel  htmlFor="outlined-age-simple">
                                                                Date
                                                            </InputLabel>
                                                        <Select
                                                            value={this.state.billrunDateOption}
                                                            onChange={this.handleChange1}
                                                            input={
                                                                <OutlinedInput
                                                                    name="date"
                                                                    labelWidth={50}
                                                                    id="outlined-age-native-simple"
                                                                />
                                                            }
                                                            inputProps={{
                                                                name: 'billrunDateOption',
                                                                id  : 'billrunDateOption'
                                                            }}
                                                        >
                                                            <MenuItem value={THIS_WEEK}>This Week</MenuItem>
                                                            <MenuItem value={THIS_WEEK_TO_DATE}>This Week-to-date</MenuItem>
                                                            <MenuItem value={THIS_MONTH}>This Month</MenuItem>
                                                            <MenuItem value={THIS_MONTH_TO_DATE}>This Month-to-date</MenuItem>
                                                            <MenuItem value={THIS_QUARTER}>This Quarter</MenuItem>
                                                            <MenuItem value={THIS_QUARTER_TO_DATE}>This Quarter-to-Date</MenuItem>
                                                            <MenuItem value={THIS_YEAR}>This Year</MenuItem>
                                                            <MenuItem value={THIS_YEAR_TO_DATE}>This Year-to-date</MenuItem>
                                                            <MenuItem value={TODAY}>Today</MenuItem>
                                                            <MenuItem value={YESTERDAY}>Yesterday</MenuItem>
                                                            <MenuItem value={LAST_QUARTER}>Last Quarter</MenuItem>
                                                            <MenuItem value={LAST_YEAR}>Last Year</MenuItem>
                                                            <MenuItem value={CUSTOM_DATE}>Custom Date</MenuItem>
                                                            <MenuItem value={PERIOD}>Period</MenuItem>
                                                        </Select>
                                                        </FormControl>
                                                        {/*</Paper>*/}
                                                        { this.state.billrunDateOption===CUSTOM_DATE && (
                                                            <div className="flex items-center pr-0 lg:pr-12">
                                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                                    <div className="flex flex-row">

                                                                        <DatePicker
                                                                            margin="none"
                                                                            label="From Date"
                                                                            name="FromDate"
                                                                            variant="outlined"
                                                                            format="MM/DD/YYYY"
                                                                            value={this.state.FromDate}
                                                                            onChange={this.handleBillRunFromDateChange}
                                                                            fullWidth
                                                                            required
                                                                            color="secondary"
                                                                        />
                                                                        <br></br>
                                                                        <DatePicker
                                                                            margin="none"
                                                                            label="To Date"
                                                                            name="ToDate"
                                                                            variant="outlined"
                                                                            format="MM/DD/YYYY"
                                                                            value={this.state.ToDate}
                                                                            onChange={this.handleBillRunToDateChange}
                                                                            fullWidth
                                                                            required
                                                                            color="secondary"
                                                                            style={{marginTop: '30px!important'}}
                                                                        />
                                                                    </div>
                                                                </MuiPickersUtilsProvider>
                                                            </div>
                                                        )}
                                                        { this.state.billrunDateOption===PERIOD && (
                                                            <div>
                                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                                    <div className="flex flex-row">

                                                                        <DatePicker
                                                                            margin="none"
                                                                            label="Period"
                                                                            name="invoiceDatePeriod"
                                                                            variant="outlined"
                                                                            format="MM/YYYY"
                                                                            value={this.state.billrunDatePeriod}
                                                                            onChange={this.handlePeriodChange}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                classes: {
                                                                                    input: classes.input,
                                                                                },
                                                                            }}
                                                                            InputLabelProps = {{
                                                                                shrink: true,
                                                                                classes: {outlined: classes.label}
                                                                            }}
                                                                            openToYearSelection={true}
                                                                        />
                                                                    </div>
                                                                </MuiPickersUtilsProvider>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                </div>

                                            ),
                                            columns: [
                                                {
                                                    Header: "Period",
                                                    id: "Period",
                                                    accessor: d => moment(d.InvoiceDate).format('MM/YYYY'),
                                                    className: classNames("flex items-center  justify-center"),
                                                    Cell : row=>{
                                                        return((row.original.Month).toString().padStart(2, "0")+"/"+row.original.Year);
                                                    }
                                                },
                                                {
                                                    Header: "Description",
                                                    accessor: "InvoiceDescription",
                                                    width: 560,
                                                    className: classNames("flex items-center  justify-start p-12-impor p-24")
                                                },

                                                {
                                                    Header: "Create Date",
                                                    id: "InvoiceDate",
                                                    accessor: d => moment(d.InvoiceDate).format('MM/DD/YYYY'),
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                                },
                                                {
                                                    Header: "User",
                                                    accessor: "CreateBy",
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                                },
                                                {
                                                    Header: "Status",
                                                    accessor: "Status",
                                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                                    Cell    : row=>{
                                                        if(row.original.Status===null){
                                                            return "Preliminary";
                                                        }
                                                        else{
                                                            return row.original.Status;
                                                        }
                                                    }

                                                },
                                                {
                                                    Header: "Actions",
                                                    width : 128,
                                                    Cell  : row => (
                                                        <div className="flex items-center  justify-center actions">
                                                            <IconButton style ={{left: "71%"}} disabled={row.original.Status==="Deleted"?true:false}
                                                                onClick={(ev) => {
                                                                    ev.stopPropagation();
                                                                    if (window.confirm("Do you really want to remove this invoice")) {
                                                                        this.props.deleteSeletedBillRun(row.original.RegionId,row.original.BillRunNo);
                                                                    }
                                                                }}
                                                            >
                                                                    {row.original.Status !=="Deleted" && (
                                                                        <Icon>delete</Icon>
                                                                    )}
                                                                    {row.original.Status ==="Deleted" && (
                                                                        <Icon>remove_red_eye</Icon>
                                                                    )}


                                                            </IconButton>
                                                        </div>
                                                    )
                                                }
                                            ]
                                        }
                                    ]}
                                    defaultPageSize={100}
                                    className={classNames( "-striped -highlight")}
                                    totalRecords = {this.state.temp.length}
                                    style={{
                                        height: "100%",
                                    }}
                                />
                            )}
                            {this._isMounted ===true && (
                                <BillRunDialog open={this.state.open} onRef={ref => (this.child = ref)}/>
                            )}


                            <BillRunInvoiceDetail open={this.state.viewinvoiceDetail} Closedetail={this.CloseDetail} onRef ={ref =>(this.child1=ref)}/>


                        </div>

                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}

            >
                {/*<BillRunDialog></BillRunDialog>*/}



            </FusePageCustom>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getBillruns             : Actions.getBillruns,
        getAllBillruns          : Actions.getAllBillruns,
        deleteSeletedBillRun    : Actions.deleteSeletedBillRun,
        openDialog              : Actions.openDialog,
        closeDialog             : Actions.closeDialog,
        updateInvoiceDate: Actions.updateInvoiceDate,
    }, dispatch);
}

function mapStateToProps({billruns, auth})
{
    return {
        billruns            : billruns.billrunsDB,
        bLoadedBillruns     : billruns.bLoadedBillruns,
        regionId            : auth.login.defaultRegionId,
        loading             : billruns.loadingstatus,
        auth                : auth.login,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillRun)));
