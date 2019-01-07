import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Material-UI core components
import {Icon, IconButton} from '@material-ui/core';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';


import {withStyles, Checkbox} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import ReactTable from "react-table";
import "react-table/react-table.css";
import classNames from 'classnames';
import _ from 'lodash';

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
        '& .openFilter':{
            width: 'inherit'
        },
        '& .openSummary':{
            width: 300
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        },
        '& .ReactTable .rt-noData': {
            top: '250px',
            border: '1px solid coral'
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
        '& .rt-thead.-headerGroups': {
            display: 'none'
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
    },
    content:{
        position: 'relative'
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

    summaryPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        color: 'white',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    imageIcon: {
        width: 24
    }
});

class ReportLists extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        selection: [],
        selectAll: false,
        alertOpen: false,
        keyToBeRemoved: -1,
        month: '01',
        year: '2017'
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

    isSelected = key => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
        return this.state.selection.includes(key);
    };

    constructor(props){
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.data!==prevProps.data)
            this.setState({data: this.props.data});

        if(prevState.s!==this.state.s) {
            this.search(this.state.s);
        }
    }
    search = (val)=> {
        const temp = this.props.data.filter( d => {
            console.log('value=', d);
            return d.Name.indexOf(val) !== -1 || !val ||
                d.FranchiseeNo.indexOf(val) !== -1 ||
                // d.TrxType.toString().indexOf(val) !== -1
                d.Number.indexOf(val) !== -1 ||
                d.ExtendedPrice.toString().indexOf(val) !== -1 ||
                d.Tax.toString().indexOf(val) !== -1 ||
                d.Fees.toString().indexOf(val) !== -1 ||
                d.TotalTrxAmount.toString().indexOf(val) !== -1
        });

        this.setState({data: temp});
    };

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

    render()
    {
        const { classes} = this.props;
        const { toggleSelection, isSelected} = this;
        const { data, year, month } = this.state;

        return (
            <div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
                <ReactTable
                    data={data.FranchiseeReports}
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
                    getTrProps={(state, row, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                this.props.history.push(`/franchisees/reports/${data.RegionId}/${row.original.BillYear}/${row.original.BillMonth}/${row.original.FranchiseeNo}`);
                            }
                        }
                    }}
                    columns={[
                        {
                            columns: [
                                {
                                    Header   : (instance) => (
                                        <div/>
                                    ),
                                    accessor : "",
                                    Cell     : row => {
                                        return (<Checkbox
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                }}
                                                checked={isSelected(row.value.FranchiseeNo)}
                                                onChange={() => toggleSelection(row.value.FranchiseeNo)}
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
                                    Header: "Franchisee #",
                                    accessor: "FranchiseeNo",
                                    filterAll: true,
                                    // width: 120,
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                },
                                {
                                    Header: "Name",
                                    accessor: "FranchiseeName",
                                    filterAll: true,
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-center")
                                },
                                {
                                    Header: "Total Revenue",
                                    accessor: "TotalRevenue",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.TotalRevenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                },
                                {
                                    Header: "Total Deductions",
                                    accessor: "TotalDeductions",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.TotalDeductions).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    className: classNames(classes.tableTdEven, "flex items-center  justify-end p-12-impor"),
                                },
                                {
                                    Header: "Total Payment",
                                    Cell     : row => {
                                        return '$'+parseFloat(row.original.TotalPayment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                    },
                                    accessor: "TotalPayment",
                                    className: classNames("flex items-center  justify-end p-12-impor"),
                                },
                                {
                                    Header: "Actions",
                                    // width : 128,
                                    Cell  : row => (
                                        <div className="flex items-center actions pl-24">
                                            <IconButton
                                                to = {`/franchisees/reports/${data.RegionId}/${year}/${month}/${row.original.FranchiseeNo}`}
                                                component={Link}
                                            >
                                                <Icon>visibility</Icon>
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
                    totalRecords = {data.FranchiseeReports.length}
                    style={{
                        height: '100%',
                    }}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleFilterPanel: Actions.toggleReportsFilterPanel,
    }, dispatch);
}

function mapStateToProps({franchiseeReports, auth})
{
    return {
        regionId: auth.login.defaultRegionId,
        franchiseeReports: franchiseeReports.franchiseeReports,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportLists)));

