import React, { Component, Fragment } from 'react';
import _ from "lodash";
// core components
import { Icon, Typography, } from '@material-ui/core';

// theme components
import { FusePageCustomSidebarScroll, FuseAnimate } from '@fuse';


import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import classNames from 'classnames';

import CheckbookList from './checkbookList'

const headerHeight = 80;

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

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
        width: 360,
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


class CheckbookApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            s: '',
            temp: [],
            data: [],
            selection: [],
            selectAll: false,
            current_lat: 0,
            current_long: 0,
            regionId: this.props.regionId,
            statusId: this.props.statusId,
            longitude: this.props.longitude,
            latitude: this.props.latitude,
            location: this.props.location,
            searchText: this.props.searchText,
            // loading: false,
            isSubmittingForApproval: false,
        };

        if (!props.bLoadedCustomers) {
            this.props.getCustomers(
                this.props.regionId,
                this.props.statusId,
                this.props.filters.StatusNames,
                this.props.filters.AccountTypeListName,
                this.props.location,
                this.props.latitude,
                this.props.longitude,
                this.props.searchText);
        }
    }

    closeComposeForm = () => {
        switch (this.props.customerForm.type) {
            case "new":
                this.props.closeNewCustomerForm()
                break;
            case "edit":
                this.props.closeEditCustomerForm()
                break;
        }
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        let bChanged = false;

        if (this.props.regionId !== prevProps.regionId ||
            this.props.statusId !== prevProps.statusId) {
            console.log("regionId", this.props.regionId, prevProps.regionId)
            this.setState({
                regionId: this.props.regionId,
                statusId: this.props.statusId
            });
            this.props.getCustomers(
                this.props.regionId,
                this.props.statusId,
                this.props.filters.StatusNames,
                this.props.filters.AccountTypeListName,
                this.props.location,
                this.props.latitude,
                this.props.longitude,
                this.props.searchText);
            bChanged = true;
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    render() {
        const { classes, filterState, summaryState} = this.props;

        return (
            <React.Fragment >
                <FusePageCustomSidebarScroll
                    classes={{
                        root: classNames(classes.layoutRoot, 'test123'),
                        rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary1': summaryState }),
                        leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter1': filterState }),
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
                                            <Icon className="text-32 mr-12">account_box</Icon>
                                            <Typography variant="h6" className="hidden sm:flex">Checkbook | List</Typography>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            <div className={classNames("flex flex-col h-full")}>
                                <CheckbookList />
                            </div>
                        </div>
                    }
                    leftSidebarHeader={
                        <Fragment>
                                <div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
                                    <h2 style={{ marginBlockStart: '1em' }}>Filters</h2>
                                </div>
                        </Fragment>
                    }
                    leftSidebarContent={
                        <div />
                    }
                    rightSidebarHeader={
                        <div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
                            <h2 style={{ marginBlockStart: '1em' }}>Summary</h2>
                        </div>
                    }
                    rightSidebarContent={
                        <div />
                    }

                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                >
                </FusePageCustomSidebarScroll>
            </React.Fragment >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCustomers: Actions.getCustomers,
        toggleFilterPanel: Actions.toggleFilterPanel,
        toggleSummaryPanel: Actions.toggleSummaryPanel,
        toggleMapView: Actions.toggleMapView,
        deleteCustomersAction: Actions.deleteCustomers,
        removeCustomerAction: Actions.removeCustomer,
        openNewCustomerForm: Actions.openNewCustomerForm,
        openEditCustomerForm: Actions.openEditCustomerForm,
        closeEditCustomerForm: Actions.closeEditCustomerForm,
        closeNewCustomerForm: Actions.closeNewCustomerForm,

        getAccountTypeList: Actions.getAccountTypeList,
        getAccountExecutiveList: Actions.getAccountExecutiveList,
        getCustomerStatusList: Actions.getCustomerStatusList,
        getAccountTypesGroups: Actions.getAccountTypesGroups,

        openEmailToCustomerDialog: Actions.openEmailToCustomerDialog,

        createCustomer: Actions.createCustomer,
    }, dispatch);
}

function mapStateToProps({ customers, auth, franchisees }) {
    return {
        franchisees: franchisees.franchiseesDB,
        customers: customers.customersDB,
        bLoadedCustomers: customers.bLoadedCustomers,
        transactionStatus: customers.transactionStatus,
        filterState: customers.bOpenedFilterPanel,
        summaryState: customers.bOpenedSummaryPanel,
        mapViewState: customers.bOpenedMapView,
        regionId: auth.login.defaultRegionId,
        customerForm: customers.customerForm,

        statusId: customers.statusId,
        longitude: customers.longitude,
        latitude: customers.latitude,
        location: customers.location,
        searchText: customers.searchText,
        bCustomerFetchStart: customers.bCustomerFetchStart,

        createCustomerResponse: customers.createCustomerResponse,
        bCreateCustomerStart: customers.bCreateCustomerStart,

        bGetCustomerStart: customers.bGetCustomerStart,

        filters: customers.filters,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckbookApp)));

