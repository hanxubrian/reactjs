import React, {Component} from 'react';

// core components
import {Icon, IconButton, Fab, Input, Paper, Typography} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// theme components
import {FusePageCustom, FuseAnimate} from '@fuse';

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
import _ from 'lodash';
import classNames from 'classnames';


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
            justifyContent: 'flex-start'
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        }
    },
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
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
});

class BillRun extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        selection: [],
        regionId: 0
    };

    constructor(props){
        super(props);

        if(!props.bLoadedBillruns) {
            props.getBillruns();
        }
        this.fetchData = this.fetchData.bind(this);
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
    componentWillMount(){
        this.getBillruns()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
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
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.billruns===null && nextProps.billruns!==null)
            this.getBillruns(nextProps.billruns);
        if(this.props.billruns!==nextProps.billruns)
            this.getBillruns(nextProps.billruns);
    }

    getBillruns =(rawData=this.props.billruns) =>{
        if(rawData===null) return;

        this.setState({temp: rawData});
        this.setState({data: rawData});
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
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
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
                            <div className="flex flex-shrink items-center">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab color="secondary" aria-label="add"
                                         className={classNames(classes.sideButton, "mr-12")} onClick={() => alert('ok')}>
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
                                                alert('ok');
                                                // openEditContactDialog(rowInfo.original);
                                            }
                                        }
                                    }
                                }}
                                columns={[
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
                                                Header: "Bill Run Batch #",
                                                accessor: "Id",
                                                filterAll: true,
                                                className: classNames(classes.tableTdEven, "flex items-center  justify-center p-24")
                                            },
                                            {
                                                Header: "Message",
                                                accessor: "Message",
                                                width: 360,
                                                className: classNames("flex items-center  justify-start p-12-impor p-24")
                                            },
                                            {
                                                Header: "Invoice Date",
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
                                totalRecords = {this.state.temp.length}
                                style={{
                                    height: "100%",
                                }}
                            />
                        )}
                    </div>
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
        getBillruns: Actions.getBillruns,
    }, dispatch);
}

function mapStateToProps({billruns, auth})
{
    return {
        billruns: billruns.billrunsDB,
        bLoadedBillruns: billruns.bLoadedBillruns,
        regionId: auth.login.defaultRegionId
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillRun)));
