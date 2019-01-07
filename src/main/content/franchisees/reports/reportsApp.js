import React, {Component} from 'react';

// core components
import {Icon, Fab, Typography, Hidden, IconButton, AppBar, Toolbar, Button, Paper, Input} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

//Custom Components
import FilterPanel from './components/filterPanel';
import ReportLists from './components/reportLists';

// theme components
import {FusePageCustom, FuseAnimate} from '@fuse';

// for store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

// third party
import classNames from 'classnames';
import _ from "lodash";
import moment from "moment"

const headerHeight = 80;

const hexToRgb = (hex) =>{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

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
            width: 250
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
    content:{
        position: 'relative'
    },
    search: {
        width: '100%',
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
    imageIcon: {
        width: 24
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
});

class ReportsApp extends Component {
    state = {
        s: '',
        data: [],
        selection: [],
        regionId: 0,
        headerTitle: '',
        year: '2017',
        month: '01'
    };

    constructor(props){
        super(props);
        let year = moment(this.props.reportDate).year();
        let month = moment(this.props.reportDate).month();
        if(!props.bLoadedFranchiseeReports) {
            props.getReports(props.regionId, year, month);
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
        this.getFranchiseeReports()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        let year = moment(this.props.reportDate).year();
        let month = moment(this.props.reportDate).month();

        if(this.props.regionId !== prevProps.regionId) {
            this.props.getReports(this.props.regionId, year, month);
        }
        if(this.props.reportDate !== prevProps.reportDate) {
            this.props.getReports(this.props.regionId, year, month);
        }

        if(prevProps.franchiseeReports!== this.props.franchiseeReports){
            this.getFranchiseeReports();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.franchiseeReports!==nextProps.franchiseeReports) {
            this.getFranchiseeReports(nextProps.franchiseeReports);
        }
    }

    getFranchiseeReports =(rawData=this.props.franchiseeReports) =>{
        if(rawData===null) return;

        let temp0 = rawData.Data.Region[0].FranchiseeReports;

        this.setState({headerTitle: `${rawData.Data.Region[0].Name} Region Franchisee Reports for ${this.state.month}/${this.state.year} Period`})
        this.setState({data: rawData.Data.Region[0]});
    };

    toggleLeftSidebar = () => {
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    render()
    {
        const {classes, filterState, toggleFilterPanel} = this.props;
        const { selection } = this.state;
        return (
            <FusePageCustom
                classes={{
                    root: classes.layoutRoot,
                    header: classes.layoutHeader,
                    content: classes.content,
                    leftSidebar : classNames(classes.layoutLeftSidebar, {'openFilter': filterState}),
                    sidebarHeader: classes.layoutSidebarHeader,
                }}
                leftSidebarHeader={
                    <div className={classNames("flex flex-row w-full h-full justify-between p-12 align-middle pr-0", {'filteropen': filterState})}>
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
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="flex flex-shrink items-center">
                                <div className="flex items-center">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Icon className="text-32 mr-12">account_box</Icon>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">{this.state.headerTitle}</Typography>
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
                        <div className={classNames("flex flex-col h-full")}>
                            <div className="flex flex-row items-center p-12">
                                <div className="flex justify-start items-center">
                                    <Hidden smDown>
                                        <Button
                                            onClick={(ev) => toggleFilterPanel()}
                                            aria-label="toggle filter panel"
                                            color="secondary"
                                            disabled={filterState ? true : false}
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
                                    <Paper className={"flex items-center w-full h-44 lg:mr-12 xs:mr-0"}>
                                        <Input
                                            placeholder="Search..."
                                            className={classNames(classes.search, 'pl-16')}
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
                            </div>
                            <ReportLists data={this.state.data}/>
                        </div>
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
        getReports: Actions.getReports,
        toggleFilterPanel: Actions.toggleReportsFilterPanel
    }, dispatch);
}

function mapStateToProps({franchiseeReports, auth})
{
    return {
        franchiseeReports: franchiseeReports.franchiseeReports,
        bLoadedFranchiseeReports: franchiseeReports.bLoadedFranchiseeReports,
        filterState: franchiseeReports.bOpenedFilterPanelFranchiseeReports,
        regionId: auth.login.defaultRegionId,
        reportDate: franchiseeReports.reportDate
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsApp)));
