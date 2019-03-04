import React, {Component, Fragment} from 'react';
import {
    Icon,
    Typography,
    Button, Hidden, Paper, Input
} from '@material-ui/core';
import {FusePageCustomSidebarScroll, FuseAnimate} from '@fuse';
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

import "react-table/react-table.css";
import classNames from 'classnames';

import AgingReportList from './agingReportList';
import FilterPanel from "./agingReportFilterPanel";
import InvoiceListContent from "../Invoice/invoiceApp";

const headerHeight = 80;

const styles = theme => ({
    root: {
        background: "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover',
    },
    filterPanel: {
        position                      : 'absolute',
        width                         : 0,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        left                         :  -300,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(0px,0,0)',
        overflow                      : 'hidden',
        transition  : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened'                    : {
            width: 300,
            transform: 'translateX(300px)'
        }
    },
    layoutRoot: {
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
        '& .wordwrap': {
            whiteSpace: 'pre-line !important',
            wordWrap: 'break-word',
        }
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
        width: 'inherit',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
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
        opacity: 0.5
    },
    validationMenu: {
        color: "#07DF07",
    },
    invalidationMenu: {
        color: "#FF557F",
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    btntop: {
        marginRight: 20,
        // backgroundColor: "#3c93ec",
    },
});

class AgingReportLayout extends Component {
    state={
        s: ''
    };

    constructor(props) {
        super(props);
        props.getPaymentLogList(props.regionId, props.logDate);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.regionId!== prevProps.regionId ||
        this.props.logDate!==prevProps.logDate){
            this.props.getPaymentLogList(this.props.regionId, this.props.logDate);
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {

    }


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    print = () => {
        let imgUrl ='https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png';
        const input = document.getElementById('wholediv');
        this.child.downloadPDF(input, imgUrl);
    };
    email = () => {
        alert("Email");
    };

    handleSearchChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {

        const {classes, bAgingFilterPanel, summaryState} = this.props;

        return (
            <React.Fragment>
                <FusePageCustomSidebarScroll
                    classes={{
                        root: classNames(classes.layoutRoot),
                        rightSidebar: classNames(classes.layoutRightSidebar, {'openSummary': summaryState}),
                        leftSidebar: classNames(classes.layoutLeftSidebar, classes.filterPanel, {"opened": bAgingFilterPanel}),
                        sidebarHeader: classes.layoutSidebarHeader,
                        header: classes.layoutHeader,
                        content: classes.content
                    }}
                    header={
                        <div className="flex w-full items-center">
                            <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                <div className="flex flex-row flex-1 justify-between">

                                    <div className="flex flex-shrink items-center">
                                        <div className="flex items-center">
                                            <Icon className="text-32 mr-12">list_alt</Icon>
                                            <Typography variant="h6" className="hidden sm:flex">Aging Report</Typography>
                                        </div>

                                    </div>

                                    <div className="flex flex-shrink items-center">
                                        <Button variant="contained" color="primary"
                                                className={classNames(classes.btntop) } onClick={this.print}>
                                            Print
                                            <Icon className={classes.rightIcon}>print</Icon>
                                        </Button>
                                        <Button variant="contained" color="primary"
                                                className={classNames( classes.btntop)} onClick={this.email}>
                                            Email
                                            <Icon className={classes.rightIcon}>email</Icon>
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            <div className={classNames("flex flex-col h-full")}>
                                <div className="flex flex-row items-center p-12">
                                    <div className="flex justify-start items-center">
                                        <Hidden smDown>
                                            <Button
                                                onClick={(ev) => this.props.toggleFilterPanel()}
                                                aria-label="toggle filter panel"
                                                color="secondary"
                                                // disabled={filterState ? true : false}
                                                className={classNames(classes.filterPanelButton)}
                                            >
                                                <img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>
                                            </Button>
                                        </Hidden>
                                        <Hidden smUp>
                                            <Button
                                                onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                                aria-label="toggle filter panel"
                                                className={classNames(classes.filterPanelButton)}
                                            >
                                                <img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>
                                            </Button>
                                        </Hidden>
                                    </div>
                                    <div className="flex items-center w-full h-44 mr-12 ml-12">
                                        <Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>
                                            <Input
                                                placeholder="Search..."
                                                className={classNames(classes.search, 'pl-16')}
                                                // className="pl-16"
                                                disableUnderline
                                                fullWidth
                                                value={this.state.s}
                                                onChange={this.handleSearchChange('s')}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                            />
                                            <Icon color="action" className="mr-16">search</Icon>
                                        </Paper>
                                    </div>
                                </div>
                                <AgingReportList onRef={ref => (this.child = ref)}/>
                            </div>
                        </div>
                    }
                    leftSidebarHeader={
                        <div className={classNames("flex flex-row w-full h-full justify-between p-12 items-center pr-0", {'filteropen': bAgingFilterPanel})}>
                            <h4 className={classes.elementCenter}>Filter</h4>
                        </div>
                    }
                    leftSidebarContent={
                        <FilterPanel/>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                >
                </FusePageCustomSidebarScroll>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPaymentLogList: Actions.getPaymentLogList,
        toggleFilterPanel: Actions.toggleAgingFilterPanel,
    }, dispatch);
}

function mapStateToProps({auth, paymentLog, agings}) {
    return {
        regionId: auth.login.defaultRegionId,
        logDate: paymentLog.logDate,
        bAgingFilterPanel: agings.bAgingFilterPanel,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(AgingReportLayout)));
