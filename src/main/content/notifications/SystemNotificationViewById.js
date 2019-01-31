import React, { Component, Fragment } from 'react';
// core components
import { Icon, IconButton,CircularProgress, TableBody ,TableCell ,TableHead ,TableRow ,Card,AppBar,Divider,Input,Typography,CardContent, Paper, Button, Zoom } from '@material-ui/core';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';
import { RowDetailState } from '@devexpress/dx-react-grid';
import moment from 'moment/moment';
import {
    Template, TemplateConnector
} from '@devexpress/dx-react-core';
import {FuseAnimateGroup} from '@fuse';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    SortingState,
    GroupingState,
    IntegratedGrouping,
    IntegratedSorting,
    EditingState,
    DataTypeProvider,
    FilteringState,
    IntegratedFiltering,
    SearchState,
} from '@devexpress/dx-react-grid';


import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableFixedColumns,
    TableSelection,
    GroupingPanel,
    Toolbar,
    TableGroupRow,
    PagingPanel,
    TableRowDetail,
    TableFilterRow,
    DragDropProvider,
    TableColumnResizing,

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';



const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor         : theme.palette.secondary.main,
        color                   : theme.palette.common.white,
        borderRight             : "1px solid",
    },
    body: {
        fontSize                : 14,
        width                   : "50%",
        borderRight             : "1px solid",
    },
}))(TableCell);

const hexToRgb = (hex) => {
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
        '& .openFilter': {
            width: 'inherit'
        },
        '& .openSummary': {
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
        '& .ReactTable .rt-thead.-headerGroups': {
            paddingLeft: '0!important',
            paddingRight: '0!important',
            minWidth: 'inherit!important'
        },
        '& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
            background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
            color: 'white!important'
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group': {
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
            width: 'inherit!important',
            minWidth: 'inherit!important',
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
    },
    content: {
        position: 'relative'
    },
    search: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    tableTheadRow: {
        backgroundColor: theme.palette.primary.main
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
    },
    filterPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
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
    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: 'fade(' + theme.palette.primary.main + ', 0.03)',
        },
        '& tbody tr:nth-of-type(even)': {
            backgroundColor: 'fade(' + theme.palette.primary.secondary + ', 0.03)',
        },
    },
    overlay: {
        position: 'absolute',
        top: -104,
        left: -65,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    tableView:{
        width: '100%', borderCollapse: 'collapse', border: 'solid 1px',color:'black',

    },
    tabletd:{
        border : 'solid 1px',color:'black',
        width  : '50%'
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});
//
// table content rows stle
//




const SubTd = ({ tdvalue, onClick }) => (
    <td onClick={onClick}>{tdvalue}</td>
);
const ListItem = ({ value, onClick }) => (
    <tr onClick={onClick}>
        {
            <SubTd  tdvalue={value}/>

        }
    </tr>

);
const List = ({ items, onItemClick }) => (
    <table>
        <tbody>
        {

            items.map((item, i) => <ListItem key={i} value={item.value} onClick={onItemClick} />)
        }
        </tbody>
    </table>
);

class SystemNotificationViewById extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id                      : this.props.match.params.id,
            MsgData                 : this.props.Data,
            loading                 : this.props.loadingstatus,
            row                     : null,
            multiKey                : null,
            multiData               : null,
        };
    };

    componentWillMount(){
        if(this.props.match.params && this.props.match.params !== null && this.props.match.params.id && this.props.match.params.id !== null){
            this.setState({id: this.props.match.params.id});
            this.props.getpusherMSGById(this.props.match.params.id);
        }

    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.Data && this.props.Data !== null && JSON.stringify(this.props.Data) !== JSON.stringify(prevProps.Data)){
            this.setState({MsgData:this.props.Data});
            let payload = JSON.parse(this.props.Data.ProcessResponsePayload);
            let KEYS    = [];
            let mapvalue  = [];
            let midmultikey =[];
            let midmultivalue = [];
            Object.keys(payload).forEach(function(key) {
                // console.log("key:" + key + "value:" + item[key]);
                let str = payload[key];
                if(!Array.isArray(str)){
                    mapvalue.push({'Key':key, 'Value':str.toString()});
                    KEYS.push(key);
                }
                else{
                    midmultikey.push(key);
                    midmultivalue.push({'Key':key, 'Value':str});
                }

            });
            this.setState({
                row             :mapvalue,
                multiKey        :midmultikey,
                multiData       :midmultivalue
            });
        }
    }
    handleItemClick = (e) => {console.log(e.target.innerHTML)}
    render(){
        const {Data,classes}                    = this.props;
        const {row,multiData,multiKey}          = this.state;
        if(1){
            if(this.props.loadingstatus){
                return(
                    <div className={classes.overlay}>
                        <CircularProgress className={classes.progress} color="secondary"  />
                    </div>
                )
            }
            else if(!this.props.loadingstatus && Data && Data !== null && row && row !== null){

                console.log("row",row);
                console.log("##multikey",this.state.multiKey);
                console.log("##multiData",this.state.multiData);

                return(
                    <div style={{marginTop:"20px"}}>
                        <div className="flex flex-col flex-1 md:pr-32 md:pl-32">
                            <FuseAnimateGroup
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}

                            >
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>

                                        <div style={{height:"50px",alignItems:"center"}}>
                                            {/*<Typography>TEST</Typography>*/}
                                        </div>

                                    </AppBar>
                                    <CardContent>

                                        <div>
                                            <table className={classes.tableView}>
                                                <TableHead className={classes.tableheader}>
                                                    <TableRow>
                                                        <CustomTableCell>Key</CustomTableCell>
                                                        <CustomTableCell align="right">Value</CustomTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>

                                                    <TableRow key={1}>
                                                        <CustomTableCell align="right">Process</CustomTableCell>
                                                        <CustomTableCell align="right">{Data.Process}</CustomTableCell>

                                                    </TableRow>
                                                    <TableRow key={2}>
                                                        <CustomTableCell align="right">Description</CustomTableCell>
                                                        <CustomTableCell align="right">{Data.Description}</CustomTableCell>

                                                    </TableRow>
                                                    {
                                                        row.map((item,index)=>(
                                                            <TableRow key={index+3}>
                                                                <CustomTableCell align="right">{item.Key}</CustomTableCell>
                                                                <CustomTableCell align="right">{item.Value}</CustomTableCell>
                                                            </TableRow>
                                                        ))
                                                    }

                                                </TableBody>
                                            </table>
                                        </div>





                                    </CardContent>
                                    <CardContent>
                                        <table className={classes.tableView}>
                                            <TableHead className={classes.tableheader}>
                                                <TableRow>
                                                    <CustomTableCell>CustomerName</CustomTableCell>
                                                    <CustomTableCell>CustomerNo</CustomTableCell>
                                                    <CustomTableCell align="right">CustomerBilling</CustomTableCell>
                                                    <CustomTableCell align="right">CPIPercent</CustomTableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>



                                            </TableBody>
                                        </table>

                                    </CardContent>
                                </Card>
                            </FuseAnimateGroup>
                        </div>
                    </div>
                )
            }
            else{
                return (
                    <div style={{marginTop:"20px"}}>

                        <div className="flex flex-col flex-1 md:pr-32 md:pl-32">
                            <FuseAnimateGroup
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}

                            >
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>

                                        <div style={{height:"50px",alignItems:"center"}}>
                                            {/*<Typography>TEST</Typography>*/}
                                        </div>

                                    </AppBar>
                                    <CardContent>

                                        <div>
                                            <span>No Data Found</span>
                                        </div>

                                    </CardContent>
                                </Card>
                            </FuseAnimateGroup>
                        </div>
                    </div>
                )
            }

        }

        else{
            return <div/>
        }
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getpusherMSGById            : Actions.getpushermsgbyid,
//
        getallsystemnotification    : Actions.getallsystemnotification,
    }, dispatch);
}

function mapStateToProps({ accountReceivablePayments, auth,notification }) {
    return {
        loadingstatus       : notification.loadingById,
        Data                : notification.pusherMSGById,
        sysnotification     : notification.systnotification,
        sysstatus           : notification.status,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(SystemNotificationViewById)));

