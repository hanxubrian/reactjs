import React, {Component} from 'react';

//Material UI core
import {Paper, withStyles} from '@material-ui/core';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//Store
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'store/actions';

//Third party
import classNames from 'classnames';

const styles = theme => ({
    root : {
    },
    panel: {
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
        '&.opened1'                    : {
            transform: 'translateX(300px)'
        }
    }
});

class FilterPanel extends Component {

    state = {
        reportDate: new Date()
    };

    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
            reportDate: this.props.reportDate
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.reportDate!==this.state.reportDate) {
            this.props.updateReportDate(this.state.reportDate);
        }
    }

    componentWillUnmount()
    {

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.toggleStatus(name, event.target.checked)
    };

    handleInvoiceDateChange = date => {
        this.setState({ reportDate: date });
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div style={{marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                            <h3>Choose a date</h3>
                            <DatePicker
                                margin="none"
                                label="Period"
                                name="InvoiceDate"
                                variant="outlined"
                                format="dd/MM/yyyy"
                                value={this.state.reportDate}
                                onChange={this.handleInvoiceDateChange}
                                fullWidth
                                required
                                className={classNames("mt-24")}
                            />
                        </div>
                        </MuiPickersUtilsProvider>
                    </Paper>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateReportDate: Actions.updateReportDate

    }, dispatch);
}

function mapStateToProps({franchiseeReports, auth})
{
    return {
        filterState: franchiseeReports.bOpenedFilterPanelFranchiseeReports,
        reportDate: franchiseeReports.reportDate
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
