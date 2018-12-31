import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root            : {
        width: '100%',
        height: '100%'
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
       background: 'white',
       color: 'black',
       paddingLeft: '10px',
       paddingRight: '10px',
       borderRadius: '5px'
    },
    'cardRegions:before': {
        borderColor: 'transparent'
    },
    'cardRegions:after': {
        borderColor: 'transparent'
    }
});

function getSteps()
{
    return ['Step 1', 'Step 2', 'Step 3'];
}


class CreateFranchiseesPage extends React.Component {
    state = {
        activeStep: 0,
        region: 2,
        open: false
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
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


    render()
    {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
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

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepContainer}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel><h2>{label}</h2></StepLabel>
                                <StepContent>
                                    <div className={classes.actionsContainer}>
                                        {(activeStep === 0) && (
                                        <Card className={classes.card}>
                                            <form className={classes.container} noValidate autoComplete="off">
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
                                                                margin="normal"
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
                                                               margin="normal"
                                                               variant="outlined"
                                                               required
                                                           />
                                                       </Grid>
                                                       <Grid item xs>
                                                           <TextField
                                                               id="outlined-address2"
                                                               className={classes.textField}
                                                               margin="normal"
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
                                                               margin="normal"
                                                               variant="outlined"
                                                               required
                                                           />
                                                       </Grid>
                                                       <Grid item xs>
                                                           <TextField
                                                               id="outlined-state"
                                                               label="State"
                                                               className={classes.textField}
                                                               margin="normal"
                                                               variant="outlined"
                                                               required
                                                           />
                                                       </Grid>
                                                       <Grid item xs>
                                                           <TextField
                                                               id="outlined-zip"
                                                               label="Zip"
                                                               className={classes.textField}
                                                               margin="normal"
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
                                                               margin="normal"
                                                               variant="outlined"
                                                           />
                                                       </Grid>
                                                       <Grid item xs>
                                                           <TextField
                                                               id="outlined-email"
                                                               label="E-mail"
                                                               className={classes.textField}
                                                               margin="normal"
                                                               variant="outlined"
                                                               required
                                                           />
                                                       </Grid>
                                                   </Grid>
                                               </CardContent>
                                           </form>
                                        </Card>
                                        )}
                                        {(activeStep === 1) && (
                                            <Grid container spacing={24}>
                                                <Grid item xs>
                                                    <Paper className={classes.paper}>xs</Paper>
                                                </Grid>
                                                <Grid item xs>
                                                    <Paper className={classes.paper}>xs</Paper>
                                                </Grid>
                                                <Grid item xs>
                                                    <Paper className={classes.paper}>xs</Paper>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {(activeStep === 2) && (
                                            <Grid container spacing={24}>
                                                <Grid item xs>
                                                    <Paper className={classes.paper}>xs</Paper>
                                                </Grid>
                                                <Grid item xs>
                                                    <Paper className={classes.paper}>xs</Paper>
                                                </Grid>
                                                <Grid item xs>
                                                    <Paper className={classes.paper}>xs</Paper>
                                                </Grid>
                                            </Grid>
                                        )}
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        );
    }
}

CreateFranchiseesPage.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(CreateFranchiseesPage);