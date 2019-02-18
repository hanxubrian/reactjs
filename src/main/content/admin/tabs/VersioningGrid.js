import React, { Component, Fragment } from 'react';
import _ from "lodash";
// core components
import { Dialog,Icon,TextField,Input, IconButton, Fab, Typography, Toolbar, CircularProgress, Menu, MenuItem, Checkbox, FormControlLabel, Tooltip, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
// theme components
import { FusePageCustomSidebarScroll, FuseAnimate } from '@fuse';


import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import moment from 'moment';


import "react-table/react-table.css";



import classNames from 'classnames';
import FuseUtils from '@fuse/FuseUtils';
import {
    PagingState,
    IntegratedPaging,
} from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    VirtualTable,
    TableHeaderRow,
    PagingPanel,
    TableRowDetail,
    Table
} from '@devexpress/dx-react-grid-material-ui';


import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import MomentUtils from "@date-io/moment/build/index";

const headerHeight = 80;

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const styles = theme => ({
    root: {
        background: "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
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
        '& .openFilter': {
            width: 'inherit'
        },
        '& .openSummary': {
            width: 300
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
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        },
        '& .wordwrap': {
            whiteSpace: 'pre-line !important',
            wordWrap: 'break-word',
        }
    },
    inputtext:{
        borderColor:'gray',
        borderWidth:1,
        borderRaidus:5,
    },
    card: {
        width: '100%',
        maxWidth: 384,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    layoutHeader: {
        height: headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
    layoutRightSidebar: {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutLeftSidebar: {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutSidebarHeader: {
        height: headerHeight,
        minHeight: headerHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
    },
    content: {
        position: 'relative'
    },
    addButton: {
        position: 'absolute',
        bottom: -28,
        left: 16,
        zIndex: 999,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    sideButton: {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    removeButton: {
        position: 'absolute',
        bottom: -28,
        right: 16,
        zIndex: 999,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    imageIcon: {
        width: 24,
        height: 24
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: theme.palette.divider
    },
    search: {
        width: 360,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    tableTheadRow: {
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
    },
    tableTdEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .1)'
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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .9)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        opacity: 0.7
    },
    validationMenu: {
        color: "#07DF07",//green[600],
    },
    invalidationMenu: {
        color: "#FF557F",//green[600],
    },
});

const getRowId = row => row.id;

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.secondary.main,
        color: "white !important",

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        // color: theme.palette.grey[500],
        color:"white",
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class VersioningGrid extends Component {

    constructor(props) {
        super(props);



        this.state = {
            postStatus:false,
            open:false,
            note:null,
            version:null,
            s: '',
            temp: [],
            data: [],
            columns: [
                { name: 'id', title: 'No' },
                { name: 'version', title: 'Version' },
                { name: 'date', title: 'Date' },
            ],
            totalCount: 0,
            currentPage: 0,
            pageSize: 20,
            pageSizes: [20, 40, 60, 80,100],
            rows:Array.from({ length: 100 })
            .map((item, index) => ({ id: index,version:Math.round((index+100)/100)+"."+Math.round(index/10)+"."+index%10,date:new moment().format('MM/DD/YYYY hh:mm:ss a')})),
        };
        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.version !==prevState.version && this.state.version !== null){
            this.setState({open:true});
        }
        if(this.state.postStatus !==prevState.postStatus && this.state.postStatus){
            this.versiontrigger();
            this.setState({postStatus: false});
        }
    }
    versiontrigger=()=>{

        if(this.state.version  !== null && this.state.note && this.state.note !== null){
            let data ={
                note         : this.state.note,
                version      : this.state.version
            }
            this.props.adminversionupgradetrigger(data);
            // localStorage.clear();
        }
    }
    componentWillMount() {
        this.setState({postStatus:false});

    }

    componentWillReceiveProps(nextProps) {


    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    TableRow=({ row, ...restProps })=>(
        <Table.Row
            {...restProps}
            // eslint-disable-next-line no-alert
            onClick={() => this.clickrow(row)}

        />
    )
    clickrow=(row)=>{
        this.setState({version:row.version});
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleNoteChange = event =>{
        this.setState({note: event.target.value});

    }
    postversionnotification=()=>{

        // console.log("postStatus==post",this.state.postStatus);
        // console.log("this.state.version",this.state.version);

        this.setState({postStatus:true});

    }
    render() {
        const { rows, columns ,totalCount,pageSizes,currentPage,pageSize} = this.state;
        return (
            <React.Fragment >
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    fullWidth={true}
                    maxWidth="md"
                    open={this.state.open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        <div style={{color:'white'}}>Version Upgrade Notification ({this.state.version})</div>
                    </DialogTitle>
                    <DialogContent >

                        {/*<Input*/}
                            {/*className="p-16 w-full "*/}
                            {/*classes={{root: 'text-14 '}}*/}
                            {/*placeholder="Note.."*/}
                            {/*multiline*/}
                            {/*rows="6"*/}
                            {/*margin="none"*/}
                            {/*disableUnderline*/}
                            {/*variant="outlined"*/}
                            {/*onChange={this.handleNoteChange}*/}
                        {/*/>*/}
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Note"
                            style={{ margin: 8 }}
                            placeholder="Please type here..."
                            multiline
                            rows="6"
                            margin="normal"
                            variant="outlined"
                            style={{width:'100%'}}
                            onChange={this.handleNoteChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained"
                                onClick={this.postversionnotification}
                                style={{width: "150px",
                            marginRight: "50px",
                            marginBottom: "20px",
                            marginTop: "20px"}}  color="primary">
                            Post
                        </Button>

                    </DialogActions>
                </Dialog>
                <Paper>
                    <Grid
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                    >

                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={this.changeCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={this.changePageSize}
                        />
                        <IntegratedPaging />
                        <VirtualTable rowComponent={this.TableRow}/>
                        <TableHeaderRow />

                        <PagingPanel pageSizes={pageSizes} />
                    </Grid>
                </Paper>

            </React.Fragment >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        adminversionupgradetrigger      : Actions.adminversionupgradetrigger,


    }, dispatch);
}

function mapStateToProps({ auth, franchisees }) {
    return {




    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(VersioningGrid)));

