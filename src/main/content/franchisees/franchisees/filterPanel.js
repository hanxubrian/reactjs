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
import FormControl from "@material-ui/core/FormControl/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";

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
        Active: true,
        CTDB: true,
        NonRenewed: true,
        Pending: true,
        Repurchased: true,
        Terminated: true,
        Transfer: true,
        Rejected: true,
        LegalCompliancePending: true,
        Inactive: true,
        PendingTransfer: true,
        State: '',
        contactState: '',
        locationValue: 'all',
        radius: 0
    };

    constructor(props){
        super(props);
        if(!props.bLoadedFilterList) {
            props.getStatusFilterList(this.props.regionId);
        }
    }
    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
            Active: this.props.transactionStatusFranchisees.Active,
            Inactive: this.props.transactionStatusFranchisees.Inactive,
            CTDB: this.props.transactionStatusFranchisees.CTDB,
            PendingTransfer: this.props.transactionStatusFranchisees.PendingTransfer,
            LegalCompliancePending: this.props.transactionStatusFranchisees.LegalCompliancePending,
            Transfer: this.props.transactionStatusFranchisees.Transfer,
            Terminated: this.props.transactionStatusFranchisees.Terminated,
            Rejected: this.props.transactionStatusFranchisees.Rejected,
            Pending: this.props.transactionStatusFranchisees.Pending,
            NonRenewed: this.props.transactionStatusFranchisees.NonRenewed,
            Repurchased: this.props.transactionStatusFranchisees.Repurchased
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
            this.setState({ [name]: event.target.checked });
            this.props.toggleStatusFranchisees(name, event.target.checked);
    };
    handleStateChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleLocationChange = event => {
        this.props.selectLocation(event.target.value);
        this.setState({ locationValue: event.target.value });
    };
    handleFilterChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
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
                               <h2>Business info</h2>
                               <GridContainer style={{ alignItems: 'center', width: 300 }} className={classNames(classes.formControl)}>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="Name"
                                                label="Name"
                                                className={classes.textField}
                                                onChange={this.handleChange('Name')}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                fullWidth
                                            />

                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Address"
                                                className={classes.textField}
                                                onChange={this.handleChange('Address')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Address2"
                                                className={classes.textField}
                                                onChange={this.handleChange('Address2')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="City"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="State"
                                                select
                                                className={classes.textField}
                                                value={this.state.State}
                                                onChange={this.handleStateChange('State')}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                fullWidth
                                            >
                                                {stateNames.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Zip"
                                                className={classes.textField}
                                                onChange={this.handleChange('Zip')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Phone"
                                                className={classes.textField}
                                                onChange={this.handleChange('Phone')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="E-mail"
                                                className={classes.textField}
                                                onChange={this.handleChange('Email')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                               </GridContainer>
                               <br/>
                               <h2>Contact</h2>
                               <GridContainer style={{ alignItems: 'center', width: 300 }} className={classNames(classes.formControl)}>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="Name"
                                                label="Name"
                                                className={classes.textField}
                                                onChange={this.handleChange('Name')}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                fullWidth
                                            />

                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Address"
                                                className={classes.textField}
                                                onChange={this.handleChange('Address')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Address2"
                                                className={classes.textField}
                                                onChange={this.handleChange('Address2')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="City"
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="State"
                                                select
                                                className={classes.textField}
                                                value={this.state.contactState}
                                                onChange={this.handleStateChange('contactState')}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                fullWidth
                                            >
                                                {stateNames.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Zip"
                                                className={classes.textField}
                                                onChange={this.handleChange('Zip')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="Phone"
                                                className={classes.textField}
                                                onChange={this.handleChange('Phone')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                       <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                           <TextField
                                               id="contactExt"
                                               label="Ext"
                                               className={classes.textField}
                                               onChange={this.handleChange('Ext')}
                                               margin="normal"
                                               variant="outlined"
                                               fullWidth
                                               required
                                           />
                                       </GridItem>
                                       <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                           <TextField
                                               id="contactCell"
                                               label="Cell"
                                               className={classes.textField}
                                               onChange={this.handleChange('Cell')}
                                               margin="normal"
                                               variant="outlined"
                                               fullWidth
                                               required
                                           />
                                       </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="outlined-name"
                                                label="E-mail"
                                                className={classes.textField}
                                                onChange={this.handleChange('Email')}
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                               </GridContainer>

                           </div>
                        ):(
                           <div style={{display: 'flex', flexDirection: 'column'}}>
                                <h3>Location</h3>
                                <FormControl component="fieldset" className={classNames(classes.formControl,"mt-12")}>
                                   <RadioGroup
                                       aria-label="location"
                                       name="location"
                                       value={this.state.locationValue}
                                       onChange={this.handleLocationChange}
                                   >
                                       <FormControlLabel value="all" control={<Radio />} label="All" />
                                       <FormControlLabel value="nearby" control={<Radio />} label="Near By" />
                                       <FormControlLabel value="address" control={<Radio />} label="Near Specific Address" />
                                       {this.state.locationValue === "address" && (
                                           <TextField
                                               id="address"
                                               label="Zip code or Address"
                                               className={classes.textField}
                                               value={this.state.address}
                                               onChange={this.handleFilterChange('address')}
                                               margin="normal"
                                               variant="outlined"
                                           />
                                       ) }
                                       <FormControlLabel value="radius" control={<Radio />} label="Radius" />
                                       {this.state.locationValue === "radius" && (
                                           <TextField
                                               id="franchisee_filter_radius"
                                               select
                                               label="Radius"
                                               className={classes.textField}
                                               value={this.state.radius}
                                               onChange={this.handleFilterChange('radius')}
                                               SelectProps={{
                                                   MenuProps: {
                                                       className: classes.menu,
                                                   },
                                               }}
                                               margin="normal"
                                               variant="outlined"
                                           >
                                               {
                                                   Array.apply(null, {length: 15}).map(Number.call, Number)
                                                       .map((val, index) => (
                                                           <MenuItem key={index} value={index}>
                                                               {(index) * 5} Miles
                                                           </MenuItem>
                                                       ))
                                               }
                                           </TextField>
                                       )}
                                   </RadioGroup>
                                </FormControl>
                                <br/>
                                <h3>Franchisees Statuses</h3>
                               { this.props.franchiseeFilterList && this.props.bLoadedFilterList && (
                                   <FormControl>
                                       {
                                           this.props.franchiseeFilterList.Data.map(data=>(
                                               <FormControlLabel
                                                   key={data.Value}
                                                   control={
                                                       <Switch
                                                           checked={data.Name}
                                                           onChange={this.handleChange(`${data.Name}`)}
                                                           value={data.Value}
                                                       />
                                                   }
                                                   label={data.Text}
                                               />
                                           ))
                                       }
                                   </FormControl>
                               )}
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
        toggleStatusFranchisees: Actions.toggleStatusFranchisees,
        selectLocation: Actions.selectLocation,
        getStatusFilterList: Actions.getStatusFilterList
    }, dispatch);
}

function mapStateToProps({franchisees, auth})
{
    return {
        filterStateFranchisees: franchisees.bOpenedSummaryPanelFranchisees,
        transactionStatusFranchisees: franchisees.transactionStatusFranchisees,
        franchiseesForm: franchisees.createFranchisees,
        Location: franchisees.Location,
        franchiseeFilterList: franchisees.franchiseeFilterList,
        bLoadedFilterList: franchisees.bLoadedFilterList,
        regionId: auth.login.defaultRegionId,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
