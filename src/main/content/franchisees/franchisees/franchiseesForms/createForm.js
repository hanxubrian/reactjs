import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
// core components
import {
    TextField, Button, Typography, Divider, FormControlLabel, IconButton, Icon
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
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FranchiseesOwnerTable from './ownerTable'
import Radio from '@material-ui/core/Radio';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,  DatePicker } from 'material-ui-pickers';
import moment from "moment";
import FranchiseesMaintenanceTable from "./maintenanceTableLine";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {
    UPDATE_DATE_SIGN_FRANCHISEE,
    UPDATE_EXP_DATE_FRANCHISEE,
    UPDATE_RENEW_DATE_FRANCHISEE
} from "../../../../../store/actions";
import FranchiseesDocumentUploadTable from "./documentUploadTable";
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


function getSteps() {
    return ["Company Information", "Franchisee Agreement", "Fees","Upload Required Document"];
}

function getStepContent(franchiseeForm, step) {
    const { classes} = franchiseeForm.props;

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

    const stateNames = [
        {
            value: 2,
            label: "Buffalo"
        },
        {
            value: 7,
            label: "Detroit"
        },
        {
            value: 9,
            label: "Hartford"
        },
        {
            value: 13,
            label: "Las Vegas"
        },
        {
            value: 14,
            label: "Los Angeles/Colton"
        },
        {
            value: 16,
            label: "Miami"
        },
        {
            value: 18,
            label: "Minneapolis"
        },
        {
            value: 20,
            label: "New Jersey"
        },
        {
            value: 21,
            label: "New York"
        },
        {
            value: 22,
            label: "San Francisco/Oakland"
        },
        {
            value: 23,
            label: "Oklahoma City"
        },
        {
            value: 24,
            label: "Philadelphia"
        },
        {
            value: 25,
            label: "Sacramento"
        },
        {
            value: 26,
            label: "Washington DC"
        },
        {
            value: 28,
            label: "Jani-King Int'l, Inc."
        },
        {
            value: 29,
            label: "JANI-KING OF NEW MEXICO, INC"
        },
        {
            value: 31,
            label: "New Mexico"
        },
        {
            value: 46,
            label: "Houston"
        },
        {
            value: 55,
            label: "Pittsburgh"
        },
        {
            value: 64,
            label: "Tulsa"
        },
        {
            value: 82,
            label: "Reno"
        }
    ];

    switch (step) {
        case 0:
            return (
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Financial</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <FormControlLabel
                                    value="ein"
                                    checked={franchiseeForm.state.selectedValue === 'ein'}
                                    onChange={franchiseeForm.handleRadioChange}
                                    control={<Radio color="primary" />}
                                    label="EIN"
                                    labelPlacement="end"
                                    margin="dense"
                                />
                                <FormControlLabel
                                    checked={franchiseeForm.state.selectedValue === 'ssn'}
                                    value="ssn"
                                    onChange={franchiseeForm.handleRadioChange}
                                    control={<Radio color="primary" />}
                                    label="SSN"
                                    labelPlacement="end"
                                    margin="dense"
                                />
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
                                value=""
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
                                value=""
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
                                id="state"
                                label="State"
                                select
                                className={classes.textField}
                                value={franchiseeForm.state.StateValue}
                                onChange={franchiseeForm.handleStateChange('StateValue')}
                                variant="outlined"
                                margin="dense"
                                style={{marginRight:'1%',marginLeft:'1%'}}
                                required
                            >
                                {stateNames.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                                    <Checkbox checked={franchiseeForm.state.print1099} />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('print1099')}
                                className={classes.textField}
                                label="Print 1099"
                                margin="dense"
                                style={{marginLeft:'1%'}}
                            />
                        </GridItem>
                    </GridContainer>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Owner</h3>
                    <div className="flex">
                        <FranchiseesOwnerTable tableType="OWNER" headers={Owner_headers} />
                    </div>
                </Fragment>
            );
        case 1:
            return (
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Contract</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="Date Sign"
                                    value={franchiseeForm.state.selectedSignDate}
                                    onChange={franchiseeForm.handleSignDateChange}
                                    format="MM/dd/YYYY"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    style={{marginRight: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="Latest Renew Date"
                                    value={franchiseeForm.state.selectedRenewDate}
                                    onChange={franchiseeForm.handleRenewDateChange}
                                    className={classes.textField}
                                    format="MM/dd/YYYY"
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
                                onChange={franchiseeForm.handleTextChange('termYrs')}
                                className={classes.textField}
                                required
                                style={{marginLeft: '1%'}}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="EXP. Date"
                                    value={franchiseeForm.state.selectedExpDate}
                                    onChange={franchiseeForm.handleExpDateChange}
                                    format="MM/dd/YYYY"
                                    className={classes.textField}
                                    variant="outlined"
                                    margin="dense"
                                    style={{marginRight: '1%'}}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                id="selectPlanType"
                                select
                                label="Plan Type"
                                margin="dense"
                                variant="outlined"
                                className={classes.textField}
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                value={franchiseeForm.state.defaultPlanType}
                                onChange={franchiseeForm.handleStateChange('defaultPlanType')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                            >
                                {franchiseeForm.props.planType &&(
                                    franchiseeForm.props.planType.Data.map(option => (
                                            <MenuItem key={option.FranchiseeContractTypeListId} value={option.FranchiseeContractTypeListId}>
                                                {option.Name}
                                            </MenuItem>
                                        ))
                                )}
                            </TextField>
                            <TextField
                                id="planAmount"
                                label="Plan Amount"
                                value={franchiseeForm.state.planAmount}
                                onChange={franchiseeForm.handleTextChange('BusinessAmount')}
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
                                onChange={franchiseeForm.handleTextChange('BusinessAmount')}
                                margin="dense"
                                value={franchiseeForm.state.ibAmount}
                                InputProps={{
                                    readOnly: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="downPayment"
                                label="Down Payment"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('DownPayment')}
                                value={franchiseeForm.state.downPayment}
                                InputProps={{
                                    readOnly: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                margin="dense"
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="interest"
                                label="Interest"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('Interest')}
                                variant="outlined"
                                value={franchiseeForm.state.interest}
                                InputProps={{
                                    readOnly: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginLeft: '1%'}}
                                margin="dense"
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="paymentAmount"
                                label="Payment Amount"
                                className={classNames(classes.textField)}
                                onChange={franchiseeForm.handleTextChange('BusinessAmount')}
                                value={franchiseeForm.state.paymentAmount}
                                variant="outlined"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="noOfPayments"
                                label="No Of Payments"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('NoOfPayments')}
                                value={franchiseeForm.state.noOfPayments}
                                variant="outlined"
                                margin="dense"
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                required
                            />
                            <TextField
                                id="daysToFullFill"
                                label="Days To Fullfill"
                                className={classes.textField}
                                onChange={franchiseeForm.handleTextChange('DaysToFulfill')}
                                value={franchiseeForm.state.daysToFullfill}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                style={{marginLeft: '1%'}}
                                margin="dense"
                                required
                            />
                        </GridItem>
                    </GridContainer>
                    <div style={{ marginTop: '30px' }}></div>
                    <h3>Billing Settings</h3>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.chargeBack} value="chargeBack" />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('chargeBack')}
                                label="ChargeBack"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.bbpAdministration} value="bbp" />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('bbpAdministration')}
                                label="BBP Administration Fee"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.accountRebate} value="accountRebate" />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('accountRebate')}
                                label="Account Rebate"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={franchiseeForm.state.generateReport} value="generateReport" />
                                }
                                onChange={franchiseeForm.handleCheckboxChange('generateReport')}
                                label="Generate Report"
                            />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            );

        case 2:
            return(
                <Fragment>
                    <div className="flex">
                        <FranchiseesMaintenanceTable tableType="FEE_MAINTENACE" headers={fee_maintenance_headers} />
                    </div>
                </Fragment>
            );
        case 3:
            return(
                <Fragment>
                    <div style={{ marginTop: '30px' }}></div>
                    <div className="flex">
                        <FranchiseesDocumentUploadTable/>
                    </div>
                </Fragment>
            )
        default:
            return 'Unknown step';
    }
}


class FranchiseesCreateForm extends Component {
    state = {
        labelWidth: 0,
        selectedWork: "",
        activeStep: 0,
        completed: new Set(),
        termsYrs: '',
        skipped: new Set(),
        print1099: false,
        chargeBack: false,
        bbpAdministration: false,
        accountRebate: false,
        generateReport: false,
        selectedValue: 'ein',
        StateValue: '',
        defaultPlanType: 1,
        selectedSignDate: new Date(),
        selectedRenewDate: new Date(),
        selectedExpDate: new Date(),
        planAmount: 0,
        ibAmount: 0,
        downPayment: 0,
        interest: 0,
        noOfPayments: 0,
        daysToFullfill: 0,
        paymentAmount: 0,
        documentsList: []
    };

    constructor (props){
        super(props);
        props.getFranchiseeFormPlanType(props.regionId);
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };
    closeComposeForm = () => {
        this.type === 'create' ? this.props.closeEditFranchisees() : this.props.closeCreateFranchisees();
    };
    componentWillMount(){
        this.setState({
            planType: this.props.planType
        });
        this.setState({
            documentsList: this.props.getFranchiseeDocumentsList(this.props.regionId)
        });
        if(this.props.planType.Data != null){
            this.props.planType.Data.map( x => {
                    if (x.FranchiseeContractTypeListId === this.state.defaultPlanType) {
                        this.setState({
                            planAmount: x.Price,
                            daysToFullfill: x.DaysToFulfill,
                            noOfPayments: x.NoOfPayments,
                            interest: x.Interest,
                            downPayment: x.DownPayment,
                            ibAmount: x.BusinessAmount
                        });
                    }
                }
            )
        }
    }

    componentDidMount() {
        if (this.InputLabelRef) {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
            });
        }
    }
    handleSignDateChange = date => {
        this.setState({ selectedSignDate: date });
        this.props.updateDate(UPDATE_DATE_SIGN_FRANCHISEE, moment(date).format("MM/DD/YYYY"));
    };
    handleRenewDateChange = date => {
        this.setState({ selectedRenewDate: date });
        this.props.updateDate(UPDATE_RENEW_DATE_FRANCHISEE, moment(date).format("MM/DD/YYYY"));
    };
    handleExpDateChange = date => {
        this.setState({ selectedExpDate: date });
        this.props.updateDate(UPDATE_EXP_DATE_FRANCHISEE, moment(date).format("MM/DD/YYYY"));
    };
    handleRadioChange = event => {
        this.setState({ selectedValue: event.target.value });
    };
    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    canBeSubmitted() {
        return true;
    }
    handleStateChange = name => event => {
        let val = event.target.value;
        if(name === 'defaultPlanType'){
            this.props.planType.Data.map( (x,index)=> {
                    if (val === x.FranchiseeContractTypeListId) {
                        this.setState({
                            planAmount: x.Price,
                            daysToFullfill: x.DaysToFulfill,
                            noOfPayments: x.NoOfPayments,
                            interest: x.Interest,
                            downPayment: x.DownPayment,
                            ibAmount: x.BusinessAmount
                        });
                    }
                }
            )
        }
        this.setState({
            [name]: val,
        });
    };
    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
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
                        <Tab label="Company Information" />
                        <Tab label="Franchisee Agreement" />
                        <Tab label="Fees" />
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
        closeEditFranchisees: Actions.showCreteFranchisees,
        updateDate: Actions.updateDate,
        getFranchiseeFormPlanType: Actions.getFranchiseeFormPlanType,
        getFranchiseeDocumentsList: Actions.getFranchiseeDocumentsList
    }, dispatch);
}

function mapStateToProps({ franchisees, auth }) {
    return {
        franchiseesForm: franchisees.createFranchisees,
        regionId: auth.login.defaultRegionId,
        planType: franchisees.planType,
        user: auth.login,
        documentsList: franchisees.documentsList
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesCreateForm)));

