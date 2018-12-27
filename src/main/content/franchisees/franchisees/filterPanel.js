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
        active: true,
        ctdb: true,
        none_renewed: true,
        pending: true,
        repurchased: true,
        terminated: true,
        transfer: true,
        rejected: true,
        legal_compliance_pending: true,
        inactivate: true,
        pending_transfer: true,
        select_all: true
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
        if(name==="select_all"){
         const tempName = ['select_all','active','ctdb','none_renewed','pending','repurchased','terminated','transfer','rejected','legal_compliance_pending','pending_transfer'];
         for(let i=0 ; i< tempName.length ; i++){
             this.setState({ [tempName[i]]: event.target.checked });
             this.props.toggleStatus(tempName[i], event.target.checked)
         }
        }else{
            if(this.state.select_all){
                this.setState({ ['select_all']: event.target.checked });
            }
            this.setState({ [name]: event.target.checked });
            this.props.toggleStatus(name, event.target.checked)
        }
    };

    render()
    {
        const {classes, filterState} = this.props;

        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">

                        <div style={{marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                            <h3>Franchisees Statuses</h3>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.select_all}
                                        onChange={this.handleChange('select_all')}
                                        value="All"
                                    />
                                }
                                label="All"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.active}
                                        onChange={this.handleChange('active')}
                                        value="Active"
                                    />
                                }
                                label="Active"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.ctdb}
                                        onChange={this.handleChange('ctdb')}
                                        value="CTDB"
                                    />
                                }
                                label="CTDB"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.none_renewed}
                                        onChange={this.handleChange('none_renewed')}
                                        value="Non-Renewed"
                                    />
                                }
                                label="Non-Renewed"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.pending}
                                        onChange={this.handleChange('pending')}
                                        value="Pending"
                                    />
                                }
                                label="Pending"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.repurchased}
                                        onChange={this.handleChange('repurchased')}
                                        value="Repurchased"
                                    />
                                }
                                label="Repurchased"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.terminated}
                                        onChange={this.handleChange('terminated')}
                                        value="Terminated"
                                    />
                                }
                                label="Terminated"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.transfer}
                                        onChange={this.handleChange('transfer')}
                                        value="Transfer"
                                    />
                                }
                                label="Transfer"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.rejected}
                                        onChange={this.handleChange('rejected')}
                                        value="Rejected"
                                    />
                                }
                                label="Rejected"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.legal_compliance_pending}
                                        onChange={this.handleChange('legal_compliance_pending')}
                                        value="legal-compliance-pending"
                                    />
                                }
                                label="Legal Compliance Pending"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.legal_compliance_pending}
                                        onChange={this.handleChange('legal_compliance_pending')}
                                        value="Legal-Compliance-Pending"
                                    />
                                }
                                label="Inactive"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.pending_transfer}
                                        onChange={this.handleChange('pending_transfer')}
                                        value="Pending-Transfer"
                                    />
                                }
                                label="Pending Transfer"
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

function mapStateToProps({franchisees})
{
    return {
        filterState: franchisees.bOpenedSummaryPanelFranchisees,
        transactionStatus: franchisees.transactionStatusFranchisees
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
