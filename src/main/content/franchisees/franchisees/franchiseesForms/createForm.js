import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
// core components
import {
    TextField, Button, Typography,  Divider, FormControlLabel
} from '@material-ui/core';
// theme components
import { FuseAnimate} from '@fuse';
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FranchiseesOwnerTable from './ownerTable'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,  DatePicker } from 'material-ui-pickers';
import moment from "moment";
import FranchiseesDocumentUploadTable from "./documentUploadTable";
import FranchiseesMaintenanceTable from "./maintenanceTableLine";
const styles = theme => ({

    root: {
        width: '90%'
    },
    completed: {
        display: 'inline-block'
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    button: {
        '& span': {
            textTransform: 'none'
        },
        margin: theme.spacing.unit
    },
    formControl: {
        marginBottom: 12,
        minWidth: 200,
    },
    textField: {
        width: '100%'
    }
});

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



function getSteps() {
    return ["Owner", "Financial", "Billing Settings", "Contract", "Franchisees Fee Maintenance","Upload Required Document"];
}

function getStepContent(customerForm, step) {
    const { classes} = customerForm.props;

    const Owner_headers = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Name'
        },
        {
            id: 'phone',
            numeric: false,
            disablePadding: false,
            label: 'Phone'
        },
        {
            id: 'title',
            numeric: false,
            disablePadding: false,
            label: 'Title'
        }
	];
	
	const fee_maintenance_headers = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Name'
        },
        {
            id: 'rate',
            numeric: false,
            disablePadding: false,
            label: 'Rate'
        },
        {
            id: 'value',
            numeric: false,
            disablePadding: false,
            label: 'Value'
		},
		{
            id: 'active',
            numeric: false,
            disablePadding: false,
            label: 'Active'
        },
    ];
    const Upload_Document_headers = [
        {
            id: 'doc_type',
            numeric: false,
            disablePadding: false,
            label: 'Doc Type'
        },
        {
            id: 'documentName',
            numeric: false,
            disablePadding: false,
            label: 'Document Name'
        },
        {
            id: 'browse',
            numeric: false,
            disablePadding: false,
            label: 'Browse'
        },
        {
            id: 'uploadDateTime',
            numeric: false,
            disablePadding: false,
            label: 'Upload Date Time'
        },
        {
            id: 'fileSize',
            numeric: false,
            disablePadding: false,
            label: 'File Size'
        },
        {
            id: 'view',
            numeric: false,
            disablePadding: false,
            label: 'View'
        }
    ];
    switch (step) {
        case 0:
            return (
                <Fragment>
                    {/* <div style={{ marginTop: '30px' }}></div> */}
                    {/* <h3>Owner</h3> */}
                    <div className="flex">
                        <FranchiseesOwnerTable tableType="OWNER" headers={Owner_headers} />
                    </div>
                </Fragment>
            );
        case 1:
            return (
                <Fragment>
                    {/* <div style={{ marginTop: '30px' }}></div> */}
                    {/* <h3>Financial Section</h3> */}
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <RadioGroup
                                aria-label="financialRadio"
                                name="financialRadio"
                                margin="dense"
                                row
                            >
                                <FormControlLabel
                                    value="ein"
                                    control={<Radio color="primary" />}
                                    label="EIN"
                                    labelPlacement="end"
                                    margin="dense"
                                />
                                <FormControlLabel
                                    value="ssn"
                                    control={<Radio color="primary" />}
                                    label="SSN"
                                    labelPlacement="end"
                                    margin="dense"
                                />
                            </RadioGroup>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeEinSsn"
                                label="EIN/SSN"
                                variant="outlined"
                                className={classes.textField}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeName"
                                label="Name"
                                variant="outlined"
                                className={classes.textField}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="financeAddress"
                                label="Address"
                                variant="outlined"
                                className={classes.textField}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-city"
                                label="City"
                                variant="outlined"
                                className={classes.textField}
                                margin="dense"
                                style={{marginRight:'1%'}}
                                required
                            />
                            <TextField
                                id="outlined-state"
                                label="State"
                                variant="outlined"
                                className={classes.textField}
                                margin="dense"
                                style={{marginRight:'1%',marginLeft:'1%'}}
                                required
                            />
                            <TextField
                                id="outlined-zip"
                                label="Zip"
                                variant="outlined"
                                className={classes.textField}
                                margin="dense"
                                style={{marginLeft:'1%'}}
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlined-phone"
                                variant="outlined"
                                label="1099 Name"
                                className={classes.textField}
                                margin="dense"
                                style={{marginRight:'1%'}}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} />
                                }
                                className={classes.textField}
                                label="Print 1099"
                                margin="dense"
                                style={{marginLeft:'1%'}}
                            />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            );
        case 2:
            return (
                <Fragment>
                    {/* <div style={{ marginTop: '30px' }}></div> */}
                    {/* <h3>Billing Setting Section</h3> */}
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="chargeBack" />
                                }
                                label="ChargeBack"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="bbp" />
                                }
                                label="BBP Administration Fee"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="accountRebate" />
                                }
                                label="Account Rebate"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true} value="generateReport" />
                                }
                                label="Generate Report"
                            />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            );
        case 3:
            return (
                <Fragment>
                    {/* <div style={{ marginTop: '30px' }}></div> */}
                    {/* <h3>Contract</h3> */}
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="Date Sign"
                                    // value={selectedDateSign}
                                    // onChange={this.handleDateSignChange}
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    style={{marginRight: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="Latest Renew Date"
                                    // value={selectedRenewDate}
                                    // onChange={this.handleRenewDateChange}
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    style={{marginLeft: '1%', marginRight: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                id="termYrs"
                                label="Term(Yrs)"
                                margin="dense"
                                variant="outlined"
                                className={classes.textField}
                                required
                                style={{marginLeft: '1%'}}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="EXP. Date"
                                    // value={selectedExpDate}
                                    // onChange={this.handleExpDateChange}
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    style={{marginRight: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                id="selectPlanType"
                                select
                                label="Select"
                                margin="dense"
                                variant="outlined"
                                className={classes.textField}
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                // value={this.state.planType}
                                // onChange={this.handlePlanTypeChange('planType')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                            >
                                {/*{planType.map(option => (*/}
                                {/*<MenuItem key={option.value} value={option.value}>*/}
                                {/*{option.label}*/}
                                {/*</MenuItem>*/}
                                {/*))}*/}
                            </TextField>
                            <TextField
                                id="planAmount"
                                label="Plan Amount"
                                className={classes.textField}
                                variant="outlined"
                                margin="dense"
                                style={{marginLeft: '1%'}}
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="ibAmount"
                                label="IB Amount"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="downPayment"
                                label="Down Payment"
                                className={classes.textField}
                                variant="outlined"
                                margin="dense"
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="interest"
                                label="Interest"
                                className={classes.textField}
                                variant="outlined"
                                style={{marginLeft: '1%'}}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="paymentAmount"
                                label="Payment Amount"
                                className={classes.textField}
                                variant="outlined"
                                margin="dense"
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="noOfPayments"
                                label="No Of Payments"
                                className={classes.textField}
                                variant="outlined"
                                margin="dense"
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="daysToFullFill"
                                label="Days To Fullfill"
                                className={classes.textField}
                                variant="outlined"
                                style={{marginLeft: '1%'}}
                                margin="dense"
                                required
                            />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            );

        case 4:
            return(
                <Fragment>
                    {/* <div style={{ marginTop: '30px' }}></div> */}
                    {/* <h3>Franchisees Fee Maintenance</h3> */}
                    <div className="flex">
                        <FranchiseesMaintenanceTable tableType="FEE_MAINTENACE" headers={fee_maintenance_headers} />
                    </div>
                </Fragment>
            );
        case 5:
            return(
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <div className="flex">
                        <FranchiseesDocumentUploadTable tableType="DOCUMENT_UPLOADING" headers={Upload_Document_headers} />
                    </div>
                </Fragment>
            )
        default:
            return 'Unknown step';
    }
}


class FranchiseesCreateForm extends Component {
    state = {
        customers: [],
        value: '',
        suggestions: [],
        selectedCustomer: null,
        labelWidth: 0,
        selectedWork: "",
        activeStep: 0,
        completed: new Set(),
        skipped: new Set(),
        print1099: false,
        radioValue: 'ein'
    };

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if (value.length < 2) return;

        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue = (suggestion) => {
        this.setState({ selectedCustomer: suggestion });
        return suggestion.CustomerName;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');

        return this.props.customers.filter(customer => regex.test(customer.CustomerName));
    };

    closeComposeForm = () => {
        this.type === 'create' ? this.props.closeEditFranchisees() : this.props.closeCreateFranchisees();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        if (this.InputLabelRef) {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
            });
        }
    }

    handleChange = (event) => {
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    canBeSubmitted() {
        return true;
    }


    //////////////////////
    totalSteps = () => {
        return getSteps().length;
    };

    skippedSteps() {
        return this.state.skipped.size;
    }


    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    handleTab = (event, activeStep) => {
        this.setState({ activeStep });
    };
    //////////////////////
    render() {
        const { classes} = this.props;

        const steps = getSteps();
        const { activeStep} = this.state;
        const today = new Date();

        return (
            <Fragment>
                <AppBar position="static" color="default">
                    <Tabs
                        value={activeStep}
                        onChange={this.handleTab}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="Owner" />
                        <Tab label="Financial" />
                        <Tab label="Billing Settings" />
                        <Tab label="Contract" />
                        <Tab label="Franchisees Fee Maintenance" />
                        <Tab label="Upload Required Document" />
                    </Tabs>
                </AppBar>
                <div
                    className={classNames(classes.layoutTable, "p-24")}
                    style={{
                        overflowY: 'scroll',
                        width: '100%',
                        height: 'calc(100% - 110px)'
                    }}>
                    <h2>{steps[activeStep]}</h2>
                    <Divider variant="middle" style={{ marginTop: 12, marginBottom: 12, height: 1 }} />

                    <div>
                        {this.allStepsCompleted() ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={this.handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <div>
                                {getStepContent(this, activeStep)}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-1 flex-row justify-between items-center">
                    <div className="flex flex-row justify-start pl-24">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                        </FuseAnimate>
                    </div>
                    <div className="flex flex-row flex-1 justify-end pr-24">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classNames(classes.button, "mr-12")}
                                onClick={() => {this.closeComposeForm();}}
                                disabled={!this.canBeSubmitted()}
                            > Discard </Button>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classNames(classes.button, "mr-12")}
                                onClick={() => {this.closeComposeForm();}}
                                disabled={!this.canBeSubmitted()}
                            > Save </Button>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => {
                                    this.closeComposeForm();
                                }}
                                disabled={!this.canBeSubmitted()}
                            > Close </Button>
                        </FuseAnimate>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showCreteFranchisees: Actions.showCreteFranchisees,
        closeCreateFranchisees: Actions.closeCreateFranchisees,
        showEditFranchisees: Actions.showCreteFranchisees,
        closeEditFranchisees: Actions.showCreteFranchisees
    }, dispatch);
}

function mapStateToProps({ franchisees, auth }) {
    return {
        franchiseesForm: franchisees.createFranchisees,
        user: auth.login
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesCreateForm)));
