import React, {Component} from 'react';
import {Paper, withStyles} from '@material-ui/core';
import keycode from 'keycode';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import {FuseThemes} from '@fuse';

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//Store
import * as Actions from 'store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

//third party
import moment from "moment"

import {UPDATE_FROM_DATE_INVOICE, UPDATE_TO_DATE_INVOICE} from "../../../../store/actions";


const styles = theme => ({
    root : {
        '& input, & label': {
            // color: 'white'
        },
        '& fieldset': {
            // borderColor: 'white!important'
        }
    },
    panel: {
        position                      : 'absolute',
        width                         : 250,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        left                         :  -250,
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
            transform: 'translateX(250px)'
        }
    }
});

class FilterPanel extends Component {

    state = {
        checkedEbill: true,
        checkedPrint: true,
        invoiceStatus: [],
        FromDate: undefined,
        ToDate: undefined
    };

    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
            checkedEbill: this.props.transactionStatus.checkedEbill,
            checkedPrint: this.props.transactionStatus.checkedPrint});

        this.setState({invoiceStatus: this.props.invoiceStatus});
        this.setState({FromDate: this.props.FromDate});
        this.setState({ToDate: this.props.ToDate});
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.invoiceStatus!==this.props.invoiceStatus){
            this.setState({invoiceStatus: this.props.invoiceStatus})
        }
        if(prevProps.FromDate!==this.props.FromDate){
            this.setState({FromDate: this.props.FromDate})
        }
        if(prevProps.ToDate!==this.props.ToDate){
            this.setState({ToDate: this.props.ToDate})
        }

        if ( this.props.state !== prevProps.state )
        {
            if ( this.props.state )
            {
                document.addEventListener("keydown", this.handleDocumentKeyDown);
            }
            else
            {
                document.removeEventListener('keydown', this.handleDocumentKeyDown);
            }
        }
    }

    componentWillUnmount()
    {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    handleDocumentKeyDown = event => {
        if ( keycode(event) === 'esc' )
        {
            this.props.closeFilterPanel();
        }
    };

    handleChange = (index, name) => event => {
        const iStatus = this.state.invoiceStatus;
        iStatus[index]['checked'+name] = event.target.checked;

        this.setState({invoiceStatus: iStatus });
        this.props.updateInvoiceStatus(iStatus)
    };

    handleChange1 = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleInvoiceFromDateChange = date => {
        this.setState({FromDate: date});
        this.props.updateDate(UPDATE_FROM_DATE_INVOICE, moment(date).format("MM/DD/YYYY"));
    };

    handleInvoiceToDateChange = date => {
        this.setState({ ToDate: date });
        this.props.updateDate(UPDATE_TO_DATE_INVOICE, moment(date).format("MM/DD/YYYY"));
    };

    render()
    {
        const {classes} = this.props;
        console.log('xxx=', this.props.settings);
        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <h3 className="mb-20">Filter by Date</h3>
                            <MuiThemeProvider theme={FuseThemes['mainThemeLight']}>
                            <DatePicker
                                margin="none"
                                label="From Date"
                                name="FromDate"
                                variant="outlined"
                                format="MM/dd/YYYY"
                                value={this.state.FromDate}
                                onChange={this.handleInvoiceFromDateChange}
                                fullWidth
                                required
                            />
                            <br></br>
                            <DatePicker
                                margin="none"
                                label="To Date"
                                name="ToDate"
                                variant="outlined"
                                format="MM/dd/YYYY"
                                value={this.state.ToDate}
                                onChange={this.handleInvoiceToDateChange}
                                fullWidth
                                required
                                style={{marginTop: '30px!important'}}
                            />
                            </MuiThemeProvider>

                            {/*<FormControl className={classes.formControl} style={{width: 200}}>*/}
                            {/*/!*<InputLabel htmlFor="age-simple">Invoice Date</InputLabel>*!/*/}
                            {/*<Select*/}
                            {/*value={this.state.invoiceDate}*/}
                            {/*onChange={this.handleChange1}*/}
                            {/*inputProps={{*/}
                            {/*name: 'invoiceDate',*/}
                            {/*id  : 'invoice_date'*/}
                            {/*}}*/}
                            {/*>*/}
                            {/*<MenuItem value="">*/}
                            {/*<em>None</em>*/}
                            {/*</MenuItem>*/}
                            {/*<MenuItem value={1}>This Week</MenuItem>*/}
                            {/*<MenuItem value={2}>This Week-to-date</MenuItem>*/}
                            {/*<MenuItem value={3}>This Month</MenuItem>*/}
                            {/*<MenuItem value={4}>This Month-to-date</MenuItem>*/}
                            {/*<MenuItem value={5}>This Quarter</MenuItem>*/}
                            {/*<MenuItem value={6}>This Quarter-to-Date</MenuItem>*/}
                            {/*<MenuItem value={7}>This Fiscal Year</MenuItem>*/}
                            {/*<MenuItem value={8}>This Fiscal Year-to-date</MenuItem>*/}
                            {/*<MenuItem value={9}>Today</MenuItem>*/}
                            {/*<MenuItem value={10}>Yesterday</MenuItem>*/}
                            {/*<MenuItem value={11}>This Month</MenuItem>*/}
                            {/*<MenuItem value={12}>Last Quarter</MenuItem>*/}
                            {/*<MenuItem value={13}>Last Year</MenuItem>*/}
                            {/*<MenuItem value={14}>Custom Date</MenuItem>*/}
                            {/*<MenuItem value={15}>Period</MenuItem>*/}
                            {/*</Select>*/}
                            {/*</FormControl>*/}
                        </MuiPickersUtilsProvider>

                        <div style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                            <h3>Invoice Status</h3>
                            {this.state.invoiceStatus.length>0 && this.state.invoiceStatus.map((iv, index)=> {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Switch
                                                checked={iv['checked'+iv.TransactionStatusListId]}
                                                onChange={this.handleChange(index, iv.TransactionStatusListId)}
                                                value="checkedPaid"
                                            />
                                        }
                                        label={iv.Name}
                                    />
                                )
                            })}
                            <br></br>
                            <h3>Delivery Method</h3>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedEbill}
                                        onChange={this.handleChange('checkedEbill')}
                                        value="checkedEbill"
                                    />
                                }
                                label="Ebill (Email)"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedPrint}
                                        onChange={this.handleChange('checkedPrint')}
                                        value="checkedPrint"
                                    />
                                }
                                label="Print"
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleStatus: Actions.toggleStatus,
        updateDate: Actions.updateDate,
        updateInvoiceStatus: Actions.updateInvoiceStatus,
    }, dispatch);
}

function mapStateToProps({invoices, fuse})
{
    return {
        filterState: invoices.bOpenedFilterPanel,
        transactionStatus: invoices.transactionStatus,
        invoiceStatus: invoices.invoiceStatus,
        FromDate: invoices.FromDate,
        ToDate: invoices.ToDate,
        settings       : fuse.settings.current,
    }
}

export default (withStyles(styles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
