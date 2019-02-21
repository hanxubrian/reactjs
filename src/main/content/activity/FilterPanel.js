import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles} from '@material-ui/core';

//Material UI core
import { FormControlLabel, RadioGroup, Radio, FormControl, Grid   } from '@material-ui/core';
import 'date-fns'
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';


//Store
import * as Actions from 'store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Third Party
import classNames from 'classnames';

import { SelectionPanel } from "./CustomizedDxGridSelectionPanel";
import _ from "lodash";
import {
    UPDATE_FROM_DATE_VERIFICATION,
    UPDATE_TO_DATE_VERIFICATION
} from "../../../store/actions";
import moment from "moment";


const styles = theme => ({
    root: {
        width: "250px",
        overflow: "hidden",
        padding: "5%"
    },
    filterContainer: {
        padding: "3%"
    },
    formControl: {
        margin: theme.spacing.unit * 1,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class FilterPanel extends Component {

    state = {
        verifyOption: 'transaction',
        FromDate: undefined,
        ToDate: undefined,
    };

    componentDidMount() {
        this.setState({FromDate: this.props.fromDate});
        this.setState({ToDate: this.props.toDate});
        this.setState({verifyOption: this.props.verifyOption});
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.fromDate!==this.props.fromDate){
            this.setState({FromDate: this.props.fromDate})
        }
        if(prevProps.toDate!==this.props.toDate){
            this.setState({ToDate: this.props.toDate})
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        this.props.updateVerifyOption(event.target.value);
    };

    handleFromDateChange = date => {
        this.setState({FromDate: date});
        this.props.updateVerifyPeriod(UPDATE_FROM_DATE_VERIFICATION, moment(date).format("MM/DD/YYYY"));
    };

    handleToDateChange = date => {
        this.setState({ ToDate: date });
        this.props.updateVerifyPeriod(UPDATE_TO_DATE_VERIFICATION, moment(date).format("MM/DD/YYYY"));
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-col")}>
                <Grid container  className={classNames(classes.formControl)}>
                    <Grid item xs={12} sm={12} md={12} className="flex flex-col">
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <div className="flex flex-col mt-20">
                                <h3 className="mb-20">Filter </h3>
                                <DatePicker
                                    margin="none"
                                    label="From Date"
                                    name="FromDate"
                                    variant="outlined"
                                    format="MM/DD/YYYY"
                                    value={this.state.FromDate}
                                    onChange={this.handleFromDateChange}
                                    fullWidth
                                    required
                                    color="secondary"
                                />
                                <br></br>
                                <DatePicker
                                    margin="none"
                                    label="To Date"
                                    name="ToDate"
                                    variant="outlined"
                                    format="MM/DD/YYYY"
                                    value={this.state.ToDate}
                                    onChange={this.handleToDateChange}
                                    fullWidth
                                    required
                                    color="secondary"
                                    style={{marginTop: '30px!important'}}
                                />
                            </div>
                        </MuiPickersUtilsProvider>
                        <FormControl component="fieldset" className={classNames(classes.formControl, "mt-36")}>
                            <h3>Verification Options</h3>
                            <RadioGroup
                                aria-label="Verification Option"
                                name="verifyOption"
                                className={classes.group}
                                value={this.state.verifyOption}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="transaction" control={<Radio />} label="Transaction" />
                                <FormControlLabel value="invoice" control={<Radio />} label="Invoice" />
                                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                                <FormControlLabel value="payment" control={<Radio />} label="Payment" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleStatus: Actions.toggleVerificationStatus,
        updateVerifyPeriod: Actions.updateVerifyPeriod,
        updateVerifyOption: Actions.updateVerifyOption
    }, dispatch);
}

function mapStateToProps({ verifications, auth }) {
    return {
        filterState: verifications.bOpenedFilterPanel,
        transactionStatus: verifications.transactionStatus,
        verifications: verifications.verificationsDB,
        verificationForm: verifications.verificationForm,
        regionId: auth.login.defaultRegionId,
        fromDate: verifications.fromDate,
        toDate: verifications.toDate,
        verifyOption: verifications.verifyOption,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
