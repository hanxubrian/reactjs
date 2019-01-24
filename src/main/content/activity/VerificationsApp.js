import React, { Component, Fragment } from 'react';
import { Icon, IconButton, Fab, Typography, Toolbar, CircularProgress, Menu, MenuItem, Checkbox, FormControlLabel, Tooltip, Button } from '@material-ui/core';
import { FusePageCustomSidebarScroll, FuseAnimate } from '@fuse';
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import SummaryPanel from './SummaryPanel';
import FilterPanel from './FilterPanel';
import "react-table/react-table.css";
import classNames from 'classnames';

import VerificationForm from './VerificationForm';
import VerificationListContent from './VerificationListContent';
// import DialogEmailToCustomer from './DialogEmailToCustomer';
import FuseUtils from '@fuse/FuseUtils';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        opacity: 0.5
    },
    validationMenu: {
        color: "#07DF07",
    },
    invalidationMenu: {
        color: "#FF557F",
    },
});

class VerificationsApp extends Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);

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
            isSubmittingForApproval: false,
        };
        console.log("constructor, Customer.js")

        if (!props.bLoadedCustomers) {
            console.log("getCustomers")
            this.props.getVerifications(this.props.regionId, "","", "","","");
        }
    }

    closeComposeForm = () => {
        switch (this.props.verificationForm.type) {
            case "new":
                this.props.closeNewVerificationForm()
                break;
        }
    };

    trySubmitForApproval = () => {
        this.setState({
            isSubmittingForApproval: true
        })

    }

    submitForApproval = () => {
        this.setState({
            isSubmittingForApproval: false
        })

        let payload = {
            CustomerId: "vaaa4v5432v34b235", agreeused: "sample string 5", arstatdate: "sample string 6", arstatus: "sample string 7", atrisk: "sample string 8", bill_addr: "sample string 9", bill_addr2: "sample string 10", bill_city: "sample string 11", bill_ext: "sample string 12", bill_fax: "sample string 13", bill_name: "sample string 14", bill_name2: "sample string 15", bill_phone: "sample string 16", bill_state: "sample string 17", bill_zip: "sample string 18", business: "sample string 19", callbdate: "sample string 20", canc_date: "sample string 21", candescr: "sample string 22", canentdat: "sample string 23", canreason: "sample string 24", claimstat: "sample string 25", class_type: "sample string 26", coll_rep: "sample string 27", company_no: "sample string 28", cleantimes: "sample string 29", cleanper: "sample string 30", cont_1: "sample string 31", cont_2: "sample string 32", cont_bill: "sample string 33", cont_tax: "sample string 34", cpiadj: "sample string 35", crteinv: "sample string 36", cs_rep: "sample string 37", cscallbdat: "sample string 38", cus_addr: "sample string 39", cus_addr2: "sample string 40", cus_city: "sample string 41", cus_county: "sample string 42", cus_ext: "sample string 43", cus_fax: "sample string 44", cus_name: "sample string 45", cus_name2: "sample string 46", cus_phone: "sample string 47", cus_state: "sample string 48", cus_zip: "sample string 49", CustomerNo: "sample string 50", date_offer: "sample string 51", date_sign: "2019-01-18T03:12:26.1440384-06:00", date_start: "2019-01-18T03:12:26.1440384-06:00", dlr_code: "sample string 54", Ebilling: "sample string 55", email1: "sample string 56", email2: "sample string 57", exp_date: "2019-01-18T03:12:26.1450367-06:00", firstdate: "2019-01-18T03:12:26.1450367-06:00", firstfran: "sample string 60", flag: "sample string 61", fri: "sample string 62", inv_msg: "sample string 63", masteracct: "sample string 64", misc_info: "sample string 65", misc_info2: "sample string 66", mon: "sample string 67", natacct: "sample string 68", notes: "sample string 69", ops_mgr: "sample string 70", parent: "sample string 71", po_1: "sample string 72", prntinv: "sample string 73", prntpd: "sample string 74", resume_d: "sample string 75", royalty: "sample string 76", sales_tax: "sample string 77", sat: "sample string 78", seconddate: "sample string 79", secondfran: "sample string 80", slsmn_no: "sample string 81", SquareFootage: "sample string 82", sun: "sample string 83", sys_cust: "sample string 84", tax_exempt: "sample string 85", tech_pct: "sample string 86", thu: "sample string 87", tue: "sample string 88", wed: "sample string 89", xregionid: "sample string 90", xsys_cust: "sample string 91",
            Addresses: [
                { Type: "sample string 1", AttentionTo: "sample string 2", AddressLine1: "sample string 3", AddressLine2: "sample string 4", City: "sample string 5", State: "sample string 6", Zip: "sample string 7", Country: "sample string 8", Latitude: 9.1, Longitude: 10.1, IsServiceLocation: 11 },
                { Type: "sample string 1", AttentionTo: "sample string 2", AddressLine1: "sample string 3", AddressLine2: "sample string 4", City: "sample string 5", State: "sample string 6", Zip: "sample string 7", Country: "sample string 8", Latitude: 9.1, Longitude: 10.1, IsServiceLocation: 11 }
            ],
            Contacts: [
                { FirstName: "sample string 1", LastName: "sample string 2", Phone: "sample string 3", MobilePhone: "sample string 4", Email: "sample string 5" },
                { FirstName: "sample string 1", LastName: "sample string 2", Phone: "sample string 3", MobilePhone: "sample string 4", Email: "sample string 5" }
            ],
            Agreement: [
                { Amount: 1.1, Description: "sample string 2", ContractType: "sample string 3", AgreementType: "sample string 4", AccountExecutiveUserId: "sample string 5", SignDate: "sample string 6", StartDate: "sample string 7", Term: "sample string 8", ExpirationDate: "sample string 9" },
                { Amount: 1.1, Description: "sample string 2", ContractType: "sample string 3", AgreementType: "sample string 4", AccountExecutiveUserId: "sample string 5", SignDate: "sample string 6", StartDate: "sample string 7", Term: "sample string 8", ExpirationDate: "sample string 9" }
            ]
        }
        switch (this.props.verificationForm.type) {
            case "new":
                this.props.createCustomer(this.props.regionId, payload)
                break;
            case "edit":
                this.props.createCustomer(this.props.regionId, payload)
                break;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate", "Customer.js")
        let bChanged = false;

        if (this.props.regionId !== prevProps.regionId ||
            this.props.statusId !== prevProps.statusId) {
            console.log("regionId", this.props.regionId, prevProps.regionId)
            this.setState({
                regionId: this.props.regionId,
                statusId: this.props.statusId
            });
            console.log("----------START FETCHING----------")
            // this.setState({ loading: true });
            this.props.getVerifications(this.props.regionId, "", "", "", "", "");
            bChanged = true;
        }
    }

    componentWillMount() {
        if (this.props.verifications === null) {
            this.props.getVerifications(this.props.regionId, "", "", "", "", "");
        }
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

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    showValidationMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
    closeValidationMenu = () => {
        this.setState({ anchorEl: null });
    }
    showContactMenu = event => {
        this.setState({ anchorContactMenu: event.currentTarget });
    }
    closeContactMenu = () => {
        this.setState({ anchorContactMenu: null });
    }
    onClickEmailToCustomer = () => {
        this.setState({
            anchorContactMenu: null,
        });

        this.props.openEmailToCustomerDialog(true);
    }
    handleCloseConfirmDialog = () => {
        this.setState({
            isSubmittingForApproval: false
        })
    }
    render() {

        const { classes, filterState, summaryState, openNewVerificationForm, verificationForm, mapViewState, toggleMapView } = this.props;

        const { anchorEl, anchorContactMenu } = this.state;

        return (
            <React.Fragment >
                <FusePageCustomSidebarScroll
                    classes={{
                        root: classNames(classes.layoutRoot, 'test123'),
                        rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': summaryState }),
                        leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': filterState }),
                        sidebarHeader: classes.layoutSidebarHeader,
                        header: classes.layoutHeader,
                        content: classes.content
                    }}
                    header={
                        <div className="flex w-full items-center">
                            {(this.state.temp && !verificationForm.props.open) && (
                                <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                    <div className="flex flex-row flex-1 justify-between">
                                        <div className="flex flex-shrink items-center">
                                            <div className="flex items-center">
                                                <Icon className="text-32 mr-12">account_box</Icon>
                                                <Typography variant="h6" className="hidden sm:flex">Activity | Verifications</Typography>
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink items-center">
                                            <Tooltip title="Add new customer">
                                                <IconButton className={classes.button} aria-label="add" onClick={openNewVerificationForm}>
                                                    <Icon>add</Icon>
                                                </IconButton>
                                            </Tooltip>
                                            <IconButton className={classes.button} aria-label="mail" onClick={() => this.props.history.push('/apps/mail/inbox')}>
                                                <Icon>mail_outline</Icon>
                                            </IconButton>
                                            <IconButton className={classes.button} aria-label="print" onClick={() => alert('ok')}>
                                                <Icon>print</Icon>
                                            </IconButton>
                                        </div>
                                    </div>

                                </div>
                            )}
                            {(this.state.temp && verificationForm.props.open) && (
                                <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                    <div className="flex flex-row flex-1 justify-between">
                                        <div className="flex">
                                            <IconButton
                                                className={classNames(classes.button, classes.invalidationMenu)}
                                                aria-label="Add an alarm"
                                                aria-owns={anchorEl ? 'validation-menu' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.showValidationMenu}
                                            >
                                                <Icon>error</Icon>
                                            </IconButton>
                                            <Menu
                                                id="validation-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={this.closeValidationMenu}
                                            >
                                                <MenuItem><FormControlLabel control={<Checkbox checked={true} style={{color:'#07df07'}} />} label="Company Information" /></MenuItem>
                                                <MenuItem><FormControlLabel control={<Checkbox checked={false} style={{color:'#07df07'}} />} label="Billing Address" /></MenuItem>
                                                <MenuItem><FormControlLabel control={<Checkbox checked={false} style={{color:'#07df07'}} />} label="Billing Settings" /></MenuItem>
                                                <MenuItem><FormControlLabel control={<Checkbox checked={false} style={{color:'#07df07'}} />} label="Company Contacts" /></MenuItem>
                                                <MenuItem><FormControlLabel control={<Checkbox checked={true} style={{color:'#07df07'}} />} label="Contract Details" /></MenuItem>
                                                <MenuItem><FormControlLabel control={<Checkbox checked={false} style={{color:'#07df07'}} />} label="Contract Signed" /></MenuItem>
                                                <MenuItem><FormControlLabel control={<Checkbox checked={true} style={{color:'#07df07'}} />} label="Service Location Info" /></MenuItem>
                                                <MenuItem><FormControlLabel control={<Checkbox checked={true} style={{color:'#07df07'}} />} label="Verified &amp; Approved" /></MenuItem>
                                            </Menu>
                                            <Tooltip title="Save">
                                                <IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => this.closeComposeForm()}>
                                                    <Icon>save</Icon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Submit for Approval">
                                                <IconButton className={classes.button} aria-label="Add an alarm" onClick={this.trySubmitForApproval}>
                                                    <Icon>cloud_upload</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <div className="flex">
                                            <Tooltip title="Contact">
                                                <IconButton
                                                    className={classNames(classes.button)}
                                                    aria-label="Add an alarm"
                                                    aria-owns={anchorContactMenu ? 'title-bar-contact-menu' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={this.showContactMenu}
                                                >
                                                    <Icon>sms</Icon>
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                id="title-bar-contact-menu"
                                                anchorEl={anchorContactMenu}
                                                open={Boolean(anchorContactMenu)}
                                                onClose={this.closeContactMenu}
                                            >
                                                <MenuItem onClick={this.closeContactMenu}>Chat with Account Executive</MenuItem>
                                                <MenuItem onClick={this.closeContactMenu}>Email to Account Executive</MenuItem>
                                                <MenuItem onClick={this.closeContactMenu}>SMS to Customer</MenuItem>
                                                <MenuItem onClick={this.onClickEmailToCustomer}>Email to Customer</MenuItem>
                                            </Menu>
                                            <Tooltip title="Discard">
                                                <IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => this.closeComposeForm()}>
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Close">
                                                <IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => this.closeComposeForm()}>
                                                    <Icon>close</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    }
                    content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            <Dialog
                                open={this.state.isSubmittingForApproval}
                                onClose={this.handleCloseConfirmDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"You are submitting customer data for approval."}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">There are still some incompleted items. Are you sure to sumit anyway?</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseConfirmDialog} color="primary">No</Button>
                                    <Button onClick={this.submitForApproval} color="primary" autoFocus>Yes</Button>
                                </DialogActions>
                            </Dialog>
                            {this.state.temp && (
                                <Fragment>
                                    {verificationForm.props.open ?
                                        (
                                            <VerificationForm />
                                        ) :
                                        (
                                            <VerificationListContent />
                                        )}
                                </Fragment>
                            )}
                        </div>
                    }
                    leftSidebarHeader={
                        <Fragment>
                            {verificationForm.props.open ? (
                                <div className="flex flex-shrink items-center">
                                    <div className="flex items-center">
                                        <Toolbar className="pl-12 pr-0">
                                            <img className="mr-12" alt="" src="assets/images/invoices/invoice-icon-white.png" style={{ width: 32, height: 32 }} />
                                        </Toolbar>
                                        <Typography variant="h6" className="hidden sm:flex">Customers | {FuseUtils.capital_letter(verificationForm.type)} Customer</Typography>
                                    </div>
                                </div>
                            ) : (
                                <div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
                                    <h2 style={{ marginBlockStart: '1em' }}>Filters</h2>
                                </div>
                            )}
                        </Fragment>
                    }
                    leftSidebarContent={
                        <FilterPanel />
                    }
                    rightSidebarHeader={
                        <div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
                            <h2 style={{ marginBlockStart: '1em' }}>Summary</h2>
                        </div>
                    }
                    rightSidebarContent={
                        <SummaryPanel />
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
        getVerifications: Actions.getVerifications,
        toggleFilterPanel: Actions.toggleVerificationFilterPanel,
        toggleSummaryPanel: Actions.toggleVerificationSummaryPanel,
        openNewVerificationForm: Actions.openNewVerificationForm,
        closeNewVerificationForm: Actions.closeNewVerificationForm,
    }, dispatch);
}

function mapStateToProps({ verifications, auth}) {
    return {
        verifications: verifications.verificationsDB,
        bLoadedVerifications: verifications.bLoadedVerifications,
        transactionStatus: verifications.transactionStatus,
        summaryState: verifications.bOpenedSummaryPanel,
        filterState: verifications.bOpenedFilterPanel,
        verificationForm: verifications.verificationForm,
        statusId: verifications.statusId,
        searchText: verifications.searchText
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(VerificationsApp)));

