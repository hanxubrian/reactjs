import React, {Component} from 'react';
import {Paper, TextField, withStyles} from '@material-ui/core';
import keycode from 'keycode';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import GridContainer from "../../../../Commons/Grid/GridContainer";
import GridItem from "../../../../Commons/Grid/GridItem";

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
        checkedActive: true,
        checkedCTDB: true,
        checkedNonRenewed: true,
        checkedPending: true,
        checkedRepurchased: true,
        checkedTerminated: true,
        checkedTransfer: true,
        checkedRejected: true,
        checkedLegalCompliancePending: true,
        checkedInactive: true,
        checkedPendingTransfer: true,
        checkedSelectAll: true
    };

    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
            checkedSelectAll: this.props.transactionStatusFranchisees.checkedSelectAll,
            checkedActive: this.props.transactionStatusFranchisees.checkedActive,
            checkedInactive: this.props.transactionStatusFranchisees.checkedInactive,
            checkedCTDB: this.props.transactionStatusFranchisees.checkedCTDB,
            checkedPendingTransfer: this.props.transactionStatusFranchisees.checkedPendingTransfer,
            checkedLegalCompliancePending: this.props.transactionStatusFranchisees.checkedLegalCompliancePending,
            checkedTransfer: this.props.transactionStatusFranchisees.checkedTransfer,
            checkedTerminated: this.props.transactionStatusFranchisees.checkedTerminated,
            checkedRejected: this.props.transactionStatusFranchisees.checkedRejected,
            checkedPending: this.props.transactionStatusFranchisees.checkedPending,
            checkedNonRenewed: this.props.transactionStatusFranchisees.checkedNonRenewed,
            checkedRepurchased: this.props.transactionStatusFranchisees.checkedRepurchased
        });
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
        if(name==="checkedSelectAll"){
         const tempName = ['checkedSelectAll','checkedInactive','checkedActive','checkedCTDB','checkedPendingTransfer','checkedLegalCompliancePending','checkedTransfer','checkedTerminated','checkedPending','checkedRejected','checkedNonRenewed','checkedRepurchased'];
         for(let i=0 ; i< tempName.length ; i++){
             this.setState({ [tempName[i]]: event.target.checked });
             this.props.toggleStatusFranchisees(tempName[i], event.target.checked)
         }
        }else{
            if(this.state.checkedSelectAll){
                // this.setState({ ['checkedSelectAll']: event.target.checked });
            }
            this.setState({ [name]: event.target.checked });
            this.props.toggleStatusFranchisees(name, event.target.checked);
        }
    };
    handleStateChange = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.toggleStatus(name, event.target.checked)
    };


    render()
    {
        const {classes, franchiseesForm} = this.props;
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

        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">
                        {franchiseesForm && franchiseesForm.props.open
                        ?(
                           <div>
                                    {/* <h3 className="mb-20">Customer Information</h3> */}
                                    <GridContainer style={{ alignItems: 'center', width: 300 }} className={classNames(classes.formControl)}>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="Name"
                                                label="Name *"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Name')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth />

                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Address *"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Address')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Address2"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Address2')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="City *"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('City')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="State *"
                                                select
                                                className={classes.textField}
                                                value={this.state.State}
                                                onChange={this.handleChange('State')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{ width: '40%', marginRight: '2px' }}>
                                                {stateNames.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                id="outlined-name"
                                                label="Zip *"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Zip')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{ width: '60%', marginLeft: '2px' }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Phone *"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Phone')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{ marginRight: '2px' }} />

                                            <TextField
                                                id="outlined-name"
                                                label="Fax"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Fax')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{ marginLeft: '2px' }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Email"
                                                type="email"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Email')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{ marginRight: '2px' }} />

                                            <TextField
                                                id="outlined-name"
                                                label="Website"
                                                className={classes.textField}
                                                // value={customerForm.state.name}
                                                onChange={this.handleChange('Website')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{ marginLeft: '2px' }} />
                                        </GridItem>


                                    </GridContainer>
                                </div>
                        ):(
                           <div style={{marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                                <h3>Franchisees Statuses</h3>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedSelectAll}
                                            onChange={this.handleChange('checkedSelectAll')}
                                            value="All"
                                        />
                                    }
                                    label="All"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedActive}
                                            onChange={this.handleChange('checkedActive')}
                                            value="Active"
                                        />
                                    }
                                    label="Active"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedCTDB}
                                            onChange={this.handleChange('checkedCTDB')}
                                            value="CTDB"
                                        />
                                    }
                                    label="CTDB"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedNonRenewed}
                                            onChange={this.handleChange('checkedNonRenewed')}
                                            value="Non-Renewed"
                                        />
                                    }
                                    label="Non-Renewed"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedPending}
                                            onChange={this.handleChange('checkedPending')}
                                            value="Pending"
                                        />
                                    }
                                    label="Pending"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedRepurchased}
                                            onChange={this.handleChange('checkedRepurchased')}
                                            value="Repurchased"
                                        />
                                    }
                                    label="Repurchased"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedTerminated}
                                            onChange={this.handleChange('checkedTerminated')}
                                            value="Terminated"
                                        />
                                    }
                                    label="Terminated"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedTransfer}
                                            onChange={this.handleChange('checkedTransfer')}
                                            value="Transfer"
                                        />
                                    }
                                    label="Transfer"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedRejected}
                                            onChange={this.handleChange('checkedRejected')}
                                            value="Rejected"
                                        />
                                    }
                                    label="Rejected"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedLegalCompliancePending}
                                            onChange={this.handleChange('checkedLegalCompliancePending')}
                                            value="legal-compliance-pending"
                                        />
                                    }
                                    label="Legal Compliance Pending"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedInactive}
                                            onChange={this.handleChange('checkedInactive')}
                                            value="inactive"
                                        />
                                    }
                                    label="Inactive"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedPendingTransfer}
                                            onChange={this.handleChange('checkedPendingTransfer')}
                                            value="Pending-Transfer"
                                        />
                                    }
                                    label="Pending Transfer"
                                />
                            </div>
                        )}
                    </Paper>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleStatusFranchisees: Actions.toggleStatusFranchisees
    }, dispatch);
}

function mapStateToProps({franchisees})
{
    return {
        filterStateFranchisees: franchisees.bOpenedSummaryPanelFranchisees,
        transactionStatusFranchisees: franchisees.transactionStatusFranchisees,
        franchiseesForm: franchisees.createFranchisees
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
