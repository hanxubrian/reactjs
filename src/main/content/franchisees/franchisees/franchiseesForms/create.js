import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import {Fab, Icon, IconButton} from "@material-ui/core";
import FuseAnimate from "../../../../../@fuse/components/FuseAnimate/FuseAnimate";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from "lodash";


const styles = theme => ({
    root            : {
        width: '80%',
        height: '100%',
        margin: 'auto'
    },
    button          : {
        marginTop  : theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2
    },
    resetContainer  : {
        padding: theme.spacing.unit * 3
    },
    stepContainer : {
        backgroundColor: theme.palette.main
    },
    cardContainer : {
        width: '80%',
        margin: 'auto'
    },
    cardHeader:{
       backgroundColor: theme.palette.secondary.main
    },
    textField: {
        width: '100%'
    },
    regionSelector: {
        color: 'black'
    },
    cardHeading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    cardRegions: {
       paddingLeft: '10px',
       paddingRight: '10px',
       borderRadius: '5px',
        '& :before':{
            borderBottom: '0px solid rgba(255, 255, 255, 0) !important'
        },
        '& :after': {
            borderBottom: '0px solid rgba(255, 255, 255, 0) !important'
        }
    },
    card: {
        marginBottom: 50
    },
    buttonGroup: {
        float: 'right'
    },
    sideButton          : {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
});


class CreateFranchiseesPage extends React.Component {
    state = {
        activeStep: 0,
        region: 2,
        planType: 'example1',
        open: false,
        openPlanType: false,
        value: 'ein',
        print1099: false,
        chargeBack: false,
        bbp: false,
        accountRebate: false,
        generateReport: false,
        data: [
            {
                "ownerName": "German Sosa",
                "ownerPhone": "123-456-7890",
                "ownerTitle": "Hellow World"
            },
            {
                "ownerName": "German Sosa",
                "ownerPhone": "123-456-7890",
                "ownerTitle": "Hellow World"
            },
            {
                "ownerName": "German Sosa",
                "ownerPhone": "123-456-7890",
                "ownerTitle": "Hellow World"
            },
            {
                "ownerName": "German Sosa",
                "ownerPhone": "123-456-7890",
                "ownerTitle": "Hellow World"
            },
            {
                "ownerName": "German Sosa",
                "ownerPhone": "123-456-7890",
                "ownerTitle": "Hellow World"
            }
        ],
        maintananceData:[
            {
              "maintananceName": "Acounting Fee",
                "maintananceRate": "percentage",
                "amount": 1.5,
                "active":"Active"
            },
            {
                "maintananceName": "Technology Fee",
                "maintananceRate": "percentage",
                "amount": 3,
                "active":"Active"
            },
            {
                "maintananceName": "Advertising Fee",
                "maintananceRate": "percentage",
                "amount": 2.5,
                "active":"Active"
            },
            {
                "maintananceName": "Royalty",
                "maintananceRate": "percentage",
                "amount": 2.5,
                "active":"Active"
            },
            {
                "maintananceName": "Business Protection",
                "maintananceRate": "percentage",
                "amount": 5.5,
                "active":"Active"
            }
        ]

    };
    handleRegionsChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleRegionsClose = () => {
        this.setState({ open: false });
    };
    handleRegionsOpen = () => {
        this.setState({ open: true });
    };
    handleRadioChange = event => {
        this.setState({ value: event.target.value });
    };
    handlefinanceCheckedChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleBillingCheckedChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handlePlanTypeChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render()
    {
        const {classes} = this.props;
        const {print1099,chargeBack ,bbp, generateReport , accountRebate} = this.state;
        const regions =[
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

        const planType = [
            {
                value: 'example1',
                label: 'example1'
            },
            {
                value: 'example2',
                label: 'example2'
            },
            {
                value: 'example3',
                label: 'example3'
            }
        ];

        return (
            <div className={classes.root}>
                <br/>
                <form className={classes.container} noValidate autoComplete="off">
                    <div className={classes.actionsContainer}>
                        <Card className={classes.card}>
                            <div className={classNames(classes.cardHeader,"flex row flex-1 relative justify-between")}>
                                <div className={classNames("flex flex-row flex-1  p-8 sm:p-12  justify-between")}>
                                    <h1 className={classNames(classes.cardHeading)}>Business Info</h1>
                                </div>
                                <div className={classNames("flex flex-row p-8 sm:p-12 justify-between justify-end")}>
                                    <Select
                                        open={this.state.open}
                                        onClose={this.handleRegionsClose}
                                        onOpen={this.handleRegionsOpen}
                                        value={this.state.region}
                                        onChange={this.handleRegionsChange}
                                        className={classes.cardRegions}
                                        inputProps={{
                                           name: 'region',
                                           id: 'franchiseesCreateRegionsSelector',
                                        }}
                                    >
                                        {regions.map(option => (
                                           <MenuItem key={option.value} value={option.value}>
                                              {option.label}
                                           </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <CardContent className={classNames(classes.cardContainer)}>
                            <br/>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-name"
                                            label="Name"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-address1"
                                            label="Address"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-address2"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-city"
                                            label="City"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-state"
                                            label="State"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-zip"
                                            label="Zip"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-phone"
                                            label="Phone"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-email"
                                            label="E-mail"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <div className={classNames(classes.cardHeader,"flex row flex-1 relative justify-between")}>
                                <div className={classNames("flex flex-row flex-1  p-8 sm:p-12  justify-between")}>
                                    <h1 className={classNames(classes.cardHeading)}>Contact</h1>
                                </div>
                            </div>
                            <CardContent className={classNames(classes.cardContainer)}>
                                <br/>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-name"
                                            label="Name"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-address1"
                                            label="Address"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-address2"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-city"
                                            label="City"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-state"
                                            label="State"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-zip"
                                            label="Zip"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-phone"
                                            label="Phone"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-ext"
                                            label="Ext"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-cell"
                                            label="Cell"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-cell"
                                            label="E-mail"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <div className={classNames(classes.cardHeader,"flex row flex-1 relative justify-between")}>
                                <div className={classNames("flex flex-row flex-1  p-8 sm:p-12  justify-between")}>
                                    <h1 className={classNames(classes.cardHeading)}>Owner</h1>
                                </div>
                                <div className={classNames("flex flex-row p-8 sm:p-12 justify-between justify-end")}>
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Fab color="secondary" aria-label="add"
                                             className={classNames(classes.sideButton, "mr-12")}>
                                            <Icon>add</Icon>
                                        </Fab>
                                    </FuseAnimate>
                                </div>
                            </div>
                            <CardContent className={classNames(classes.cardContainer)}>
                                <br/>
                                <ReactTable
                                    data={this.state.data}
                                    minRows = {0}
                                    getTheadGroupProps={(state, rowInfo, column, instance) =>{
                                        return {
                                            style:{
                                                padding: "10px 10px",
                                                fontSize: 16,
                                                fontWeight: 700
                                            },
                                        }
                                    }}
                                    getTheadGroupThProps={(state, rowInfo, column, instance) => {
                                        return {
                                            style:{
                                                padding: "10px 10px",
                                                fontSize: 18,
                                                fontWeight: 700,
                                            },
                                            className: classNames("flex items-center justify-start")
                                        }
                                    }}
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
                                                borderRight: border,
                                                backgroundColor: 'gray'
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
                                    getTrProps={(state, rowInfo, column) => {
                                        return {
                                            className: "cursor-pointer",
                                            onClick  : (e, handleOriginal) => {
                                                if ( rowInfo )
                                                {
                                                    alert('ok');
                                                    // openEditContactDialog(rowInfo.original);
                                                }
                                            }
                                        }
                                    }}
                                    columns={[
                                        {
                                            columns: [
                                                {
                                                    Header: "Name",
                                                    accessor: "ownerName",
                                                    filterAll: true,
                                                    width: 200,
                                                    className: classNames("flex items-center  justify-center")
                                                },
                                                {
                                                    Header: "Phone",
                                                    accessor: "ownerPhone",
                                                    width: 350,
                                                    className: classNames("flex items-center  justify-start p-12-impor")
                                                },
                                                {
                                                    Header: "Title",
                                                    accessor: "ownerTitle",
                                                    className: classNames("flex items-center  justify-start p-12-impor"),
                                                    width: 420
                                                },
                                                {
                                                    Header: "Actions",
                                                    width : 150,
                                                    className: classNames("flex items-center  justify-center p-12-impor"),
                                                    Cell  : row => (
                                                        <div className="flex items-center actions ">
                                                            <IconButton
                                                                onClick={(ev) => {
                                                                    ev.stopPropagation();
                                                                    if (window.confirm("Do you really want to remove this franchisee")) {
                                                                        this.props.removeFranchisees(row.original.ID, this.props.franchisees);
                                                                        if(this.state.selection.length>0){
                                                                            _.remove(this.state.selection, function(id) {
                                                                                return id === row.original.ID;
                                                                            });
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                <Icon>delete</Icon>
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={(ev) => {
                                                                    ev.stopPropagation();
                                                                    // removeContact(row.original.id);
                                                                    }}
                                                            >
                                                                <Icon>edit</Icon>
                                                            </IconButton>
                                                        </div>
                                                    )
                                                }
                                                ]
                                        }
                                        ]}
                                    defaultPageSize={100}
                                    className={classNames( "-striped -highlight")}
                                    style={{
                                        height: '100%',
                                    }}
                                />
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <div className={classNames(classes.cardHeader,"flex row flex-1 relative justify-between")}>
                                <div className={classNames("flex flex-row flex-1  p-8 sm:p-12  justify-between")}>
                                    <h1 className={classNames(classes.cardHeading)}>Financial Section</h1>
                                </div>
                            </div>
                            <CardContent className={classNames(classes.cardContainer)}>
                                <br/>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <RadioGroup
                                            aria-label="financialRadio"
                                            name="financialRadio"
                                            value={this.state.value}
                                            onChange={this.handleRadioChange}
                                            row
                                        >
                                            <FormControlLabel
                                                value="ein"
                                                control={<Radio color="primary" />}
                                                label="EIN"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="ssn"
                                                control={<Radio color="primary" />}
                                                label="SSN"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="financeEinSsn"
                                            label="EIN/SSN"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>

                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="financeName"
                                            label="Name"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="financeAddress"
                                            label="Address"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-city"
                                            label="City"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-state"
                                            label="State"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-zip"
                                            label="Zip"
                                            className={classes.textField}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <TextField
                                            id="outlined-phone"
                                            label="1099 Name"
                                            className={classes.textField}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={print1099} onChange={this.handlefinanceCheckedChange('print1099')} value="print1099" />
                                            }
                                            label="Print 1099"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <div className={classNames(classes.cardHeader,"flex row flex-1 relative justify-between")}>
                                <div className={classNames("flex flex-row flex-1  p-8 sm:p-12  justify-between")}>
                                    <h1 className={classNames(classes.cardHeading)}>Billing Setting Section</h1>
                                </div>
                            </div>
                            <CardContent className={classNames(classes.cardContainer)}>
                                <br/>
                                <Grid container spacing={24}>
                                    <Grid item xs>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={chargeBack} onChange={this.handleBillingCheckedChange('chargeBack')} value="chargeBack" />
                                            }
                                            label="ChargeBack"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={bbp} onChange={this.handleBillingCheckedChange('bbp')} value="bbp" />
                                            }
                                            label="BBP Administration Fee"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={accountRebate} onChange={this.handleBillingCheckedChange('accountRebate')} value="accountRebate" />
                                            }
                                            label="Account Rebate"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={generateReport} onChange={this.handleBillingCheckedChange('generateReport')} value="generateReport" />
                                            }
                                            label="Generate Report"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className={classes.card}>
                        <div className={classNames(classes.cardHeader,"flex row flex-1 relative justify-between")}>
                            <div className={classNames("flex flex-row flex-1  p-8 sm:p-12  justify-between")}>
                                <h1 className={classNames(classes.cardHeading)}>Contract</h1>
                            </div>
                        </div>
                        <CardContent className={classNames(classes.cardContainer)}>
                            <br/>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <TextField
                                        id="dateSign"
                                        label="Date Sign"
                                        type="date"
                                        defaultValue=""
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="lastReNewDate"
                                        label="Last Renew Date"
                                        type="date"
                                        defaultValue=""
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="termYrs"
                                        label="Term(Yrs)"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <TextField
                                        id="expDate"
                                        label="Exp. Date"
                                        type="date"
                                        defaultValue=""
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="selectPlanType"
                                        select
                                        label="Select"
                                        className={classes.textField}
                                        value={this.state.planType}
                                        onChange={this.handlePlanTypeChange('planType')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        variant="outlined"
                                    >
                                        {planType.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="planAmount"
                                        label="Plan Amount"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <TextField
                                        id="ibAmount"
                                        label="IB Amount"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="downPayment"
                                        label="Down Payment"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="interest"
                                        label="Interest"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <TextField
                                        id="paymentAmount"
                                        label="Payment Amount"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="noOfPayments"
                                        label="No Of Payments"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="daysToFullFill"
                                        label="Days To Fullfill"
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <div className={classNames(classes.cardHeader,"flex row flex-1 relative justify-between")}>
                            <div className={classNames("flex flex-row flex-1  p-8 sm:p-12  justify-between")}>
                                <h1 className={classNames(classes.cardHeading)}>Franchisees Fee Maintanance</h1>
                            </div>
                            <div className={classNames("flex flex-row p-8 sm:p-12 justify-between justify-end")}>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab color="secondary" aria-label="add"
                                         className={classNames(classes.sideButton, "mr-12")}>
                                        <Icon>add</Icon>
                                    </Fab>
                                </FuseAnimate>
                            </div>
                        </div>
                        <CardContent className={classNames(classes.cardContainer)}>
                            <br/>
                            <ReactTable
                                data={this.state.maintananceData}
                                minRows = {0}
                                getTheadGroupProps={(state, rowInfo, column, instance) =>{
                                    return {
                                        style:{
                                            padding: "10px 10px",
                                            fontSize: 16,
                                            fontWeight: 700
                                        },
                                    }
                                }}
                                getTheadGroupThProps={(state, rowInfo, column, instance) => {
                                    return {
                                        style:{
                                            padding: "10px 10px",
                                            fontSize: 18,
                                            fontWeight: 700,
                                        },
                                        className: classNames("flex items-center justify-start")
                                    }
                                }}
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
                                            borderRight: border,
                                            backgroundColor: 'gray'
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
                                getTrProps={(state, rowInfo, column) => {
                                    return {
                                        className: "cursor-pointer",
                                        onClick  : (e, handleOriginal) => {
                                            if ( rowInfo )
                                            {
                                                alert('ok');
                                                // openEditContactDialog(rowInfo.original);
                                            }
                                        }
                                    }
                                }}
                                columns={[
                                    {
                                        columns: [
                                            {
                                                Header: "Name",
                                                accessor: "maintananceName",
                                                filterAll: true,
                                                width: 200,
                                                className: classNames("flex items-center  justify-center")
                                            },
                                            {
                                                Header: "Rate",
                                                accessor: "maintananceRate",
                                                width: 350,
                                                className: classNames("flex items-center  justify-start p-12-impor")
                                            },
                                            {
                                                Header: "Amount",
                                                accessor: "amount",
                                                className: classNames("flex items-center  justify-start p-12-impor"),
                                                width: 420
                                            },
                                            {
                                                Header: "Active",
                                                accessor: "active",
                                                className: classNames("flex items-center  justify-start p-12-impor"),
                                                width: 420
                                            },
                                            {
                                                Header: "Actions",
                                                width : 150,
                                                className: classNames("flex items-center  justify-center p-12-impor"),
                                                Cell  : row => (
                                                    <div className="flex items-center actions ">
                                                        <IconButton
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                                if (window.confirm("Do you really want to remove this franchisee")) {
                                                                    this.props.removeFranchisees(row.original.ID, this.props.franchisees);
                                                                    if(this.state.selection.length>0){
                                                                        _.remove(this.state.selection, function(id) {
                                                                            return id === row.original.ID;
                                                                        });
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <Icon>delete</Icon>
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                                // removeContact(row.original.id);
                                                            }}
                                                        >
                                                            <Icon>edit</Icon>
                                                        </IconButton>
                                                    </div>
                                                )
                                            }
                                        ]
                                    }
                                ]}
                                defaultPageSize={100}
                                className={classNames( "-striped -highlight")}
                                style={{
                                    height: '100%',
                                }}
                            />
                        </CardContent>
                    </Card>
                </form>
            </div>
        );
    }
}

CreateFranchiseesPage.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(CreateFranchiseesPage);