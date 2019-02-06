import React, {Component, Fragment} from 'react';
import {
    Icon,
    IconButton,
    Fab,
    Typography,
    Toolbar,
    CircularProgress,
    Menu,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Tooltip,
    Button
} from '@material-ui/core';
import {FusePageCustomSidebarScroll, FuseAnimate} from '@fuse';
import {bindActionCreators} from "redux";
import {withStyles,ClickAwayListener} from "@material-ui/core";
import {withRouter} from 'react-router-dom';
// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
// import SummaryPanel from './SummaryPanel';
// import FilterPanel from './FilterPanel';
import "react-table/react-table.css";
import classNames from 'classnames';
import Report from './report_new';
import FilterPanel from "./filterPanel1";

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
    filterPanel: {
        position                      : 'absolute',
        width                         : 300,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        left                         :  -300,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(50px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition  : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened'                    : {
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
        width: 300,
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

class ReportLayout extends Component {
    constructor(props) {
        super(props);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {

    }


    componentDidMount() {
        console.log('this.props.match.params===', this.props.match.params);
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

    goBackList =()=>{
        this.props.history.push('/franchisees/list');
    };
    render() {

        const {classes, filterState, summaryState, filterStateFranchisees} = this.props;

        return (
            <React.Fragment>
                <FusePageCustomSidebarScroll
                    classes={{
                        root: classNames(classes.layoutRoot),
                        rightSidebar: classNames(classes.layoutRightSidebar, {'openSummary': summaryState}),
                        leftSidebar: classNames(classes.layoutLeftSidebar, classes.filterPanel, "opened"),
                        sidebarHeader: classes.layoutSidebarHeader,
                        header: classes.layoutHeader,
                        content: classes.content
                    }}
                    header={
                        <div className="flex w-full items-center">
                            <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                <div className="flex flex-row flex-1 justify-between">

                                    <div className="flex flex-shrink items-center" onClick={this.goBackList} style={{
                                        cursor: "pointer",
                                    }}>

                                        <div className="flex items-center">
                                            <Icon className="text-32 mr-12">list_alt</Icon>
                                            <Typography variant="h6" className="hidden sm:flex">Franchisee Report |
                                                Detail</Typography>
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
                            <Fragment>
                                <div id ="franchiseesprint">
                                    <Report onRef={ref => (this.child = ref)}/>
                                </div>
                            </Fragment>
                        </div>
                    }
                    leftSidebarHeader={
                        <div className={classNames("flex flex-row w-full h-full justify-between p-12 items-center pr-0", {'filteropen': filterStateFranchisees})}>
                            <h4 className={classes.elementCenter}>Period Panel</h4>
                        </div>
                    }
                    leftSidebarContent={
                        <FilterPanel franchiNo={this.props.match.params.franchiseenumber}/>
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
        openCloseReviseModal: Actions.openCloseReviseDialog,
        openCloseRejectModal: Actions.openCloseRejectDialog
    }, dispatch);
}

function mapStateToProps({auth, franchisees}) {
    return {
        filterStateFranchisees: franchisees.bOpenedFilterPanelFranchisees,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportLayout)));

