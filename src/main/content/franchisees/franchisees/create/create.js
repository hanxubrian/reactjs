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
// theme components
import {FusePageCustom, FuseAnimate,FuseSearch} from '@fuse';
import {Checkbox, Fab, Hidden, Icon, IconButton, Input} from "@material-ui/core";
import {Link} from "react-router-dom";
import classNames from 'classnames';

const headerHeight = 80;
const styles = theme => ({
    root            : {
        width: '100%'
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
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
});

function getSteps()
{
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step)
{
    switch ( step )
    {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 0
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

    render()
    {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <FusePageCustom
                classes={{
                    root: classNames(classes.layoutRoot),
                    header: classes.layoutHeader,
                    content: classes.content
                }}
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="flex flex-shrink items-center">
                                <div className="flex items-center">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Icon className="text-32 mr-12">account_box</Icon>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">Franchisees | Create</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                            <div className="flex flex-shrink items-center">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <IconButton component={Link} to="/franchisees/create">
                                        <Icon>add</Icon>
                                    </IconButton>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <IconButton>
                                        <Icon>mail_outline</Icon>
                                    </IconButton>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <IconButton>
                                        <Icon>print</Icon>
                                    </IconButton>
                                </FuseAnimate>
                            </div>
                        </div>
                        <div className="flex flex-none items-end" style={{display: 'none'}}>
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => alert('ok')}>
                                    <Icon>add</Icon>
                                </Fab>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                content={
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            <Typography>{getStepContent(index)}</Typography>
                                            <div className={classes.actionsContainer}>
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
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            >
            </FusePageCustom>
        );
    }
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(VerticalLinearStepper);