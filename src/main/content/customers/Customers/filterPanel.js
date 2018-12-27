import React, {Component} from 'react';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import keycode from 'keycode';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
        checkedPaid: true,
        checkedPP: true,
        checkedComplete: true,
        checkedOpen: true,
        invoiceDate:''
    };

    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({checkedPaid: this.props.transactionStatus.checkedPaid,
            checkedPP: this.props.transactionStatus.checkedPP,
            checkedComplete: this.props.transactionStatus.checkedComplete});
    }

    componentDidUpdate(prevProps)
    {
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

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.toggleStatus(name, event.target.checked)
    };

    handleChange1 = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    render()
    {
        const {classes, filterState} = this.props;

        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">
                        <div >
                            <h3 className="mb-20">Filter by Date</h3>
                            <FormControl className={classes.formControl} style={{width: 200}}>
                                {/*<InputLabel htmlFor="age-simple">Invoice Date</InputLabel>*/}
                                <Select
                                    value={this.state.invoiceDate}
                                    onChange={this.handleChange1}
                                    inputProps={{
                                        name: 'invoiceDate',
                                        id  : 'invoice_date'
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>This Week</MenuItem>
                                    <MenuItem value={2}>This Week-to-date</MenuItem>
                                    <MenuItem value={3}>This Month</MenuItem>
                                    <MenuItem value={4}>This Month-to-date</MenuItem>
                                    <MenuItem value={5}>This Quarter</MenuItem>
                                    <MenuItem value={6}>This Quarter-to-Date</MenuItem>
                                    <MenuItem value={7}>This Fiscal Year</MenuItem>
                                    <MenuItem value={8}>This Fiscal Year-to-date</MenuItem>
                                    <MenuItem value={9}>Today</MenuItem>
                                    <MenuItem value={10}>Yesterday</MenuItem>
                                    <MenuItem value={11}>This Month</MenuItem>
                                    <MenuItem value={12}>Last Quarter</MenuItem>
                                    <MenuItem value={13}>Last Year</MenuItem>
                                    <MenuItem value={14}>Custom Date</MenuItem>
                                    <MenuItem value={15}>Period</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div style={{marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                            <h3>Transaction Statuses</h3>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedPaid}
                                        onChange={this.handleChange('checkedPaid')}
                                        value="checkedPaid"
                                    />
                                }
                                label="Paid"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedPP}
                                        onChange={this.handleChange('checkedPP')}
                                        value="checkedPP"
                                    />
                                }
                                label="Paid Partial"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedComplete}
                                        onChange={this.handleChange('checkedComplete')}
                                        value="checkedComplete"
                                    />
                                }
                                label="Completed"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedOpen}
                                        onChange={this.handleChange('checkedOpen')}
                                        value="checkedOpen"
                                    />
                                }
                                label="Open"
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
        toggleStatus: Actions.toggleStatus
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        filterState: invoices.bOpenedFilterPanel,
        transactionStatus: invoices.transactionStatus
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
