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
import Geocode from "react-geocode";

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

const WAIT_INTERVAL = 1000;

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
        Location: this.props.locationFilterValue.id,
        NearbyRadius: this.props.locationFilterValue.miles,
        AddressZipcodeRadius: this.props.locationFilterValue.miles,
        franchiseeStatus: [],
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
           franchiseeStatus: this.props.franchiseeStatus
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

    handleChange = (index,name) => event => {

        const iStatus = this.props.franchiseeStatus;
        iStatus[index][name] = event.target.checked;

        this.setState({franchiseeStatus: iStatus });
        this.props.updateFranchiseeStatus(iStatus)
    };
    handleSelectChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleLocationChange = name => event => {
        this.setState({
            [name]: event.target.value
        });

        let val = event.target.value
        let onLocationFilter = this.onLocationFilter
        if (name === "SpecificAddress") {
            clearTimeout(this.timer)
            this.timer = setTimeout(
                function () {
                    onLocationFilter(name, val);
                },
                WAIT_INTERVAL)
        }
        else if (
            name === "Location"
            || name === "NearbyRadius"
            || name === "AddressZipcodeRadius"
        ) {
            onLocationFilter(name, val)
        }
    };

    handleFilterChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    onLocationFilter = (name, value) => {

        let payload = {
            ...this.props.locationFilterValue,
            id: this.state.Location,
            miles: this.state.Location === "locationNearBy" ?
                this.state.NearbyRadius :
                (this.state.Location === "locationNearSpecificAddress" ?
                    this.state.AddressZipcodeRadius :
                    this.props.locationFilterValue.miles),
            addrZipcode:
                this.state.Location === "locationNearSpecificAddress" ?
                    this.state.SpecificAddress : undefined
        }
        console.log("payload", payload)
        switch (name) {
            case "Location":
                payload = {
                    ...payload,
                    id: value,
                    miles: value === "locationNearBy" ?
                        this.props.locationFilterValue.miles :
                        (value === "locationNearSpecificAddress" ?
                            this.state.AddressZipcodeRadius :
                            this.props.locationFilterValue.miles),
                }
                if (value != "locationNearSpecificAddress") {

                } else {
                    Geocode.fromAddress(this.state.SpecificAddress).then(
                        response => {
                            const { lat, lng } = response.results[0].geometry.location;
                            // console.log(lat, lng);

                            payload = {
                                ...payload,
                                addrZipcode: {
                                    lat,
                                    lng,
                                    addr: this.state.SpecificAddress
                                }
                            }
                            this.props.franchiseeSelectLocationFilter(payload)
                            return
                        },
                        error => {
                            // console.error(error);
                            payload = {
                                ...payload,
                                addrZipcode: undefined
                            }
                            this.props.franchiseeSelectLocationFilter(payload)
                            return
                        }
                    );
                    return
                }

                break;
            case "NearbyRadius":
                payload = {
                    ...payload,
                    miles: value
                }
                break;
            case "SpecificAddress":

                Geocode.fromAddress(value).then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        // console.log(lat, lng);

                        payload = {
                            ...payload,
                            addrZipcode: {
                                lat,
                                lng,
                                addr: value
                            }
                        }
                        this.props.franchiseeSelectLocationFilter(payload)
                        return
                    },
                    error => {
                        // console.error(error);
                        payload = {
                            ...payload,
                            addrZipcode: undefined
                        }
                        this.props.franchiseeSelectLocationFilter(payload)
                        return
                    }
                );

                return;
            case "AddressZipcodeRadius":
                Geocode.fromAddress(this.state.SpecificAddress).then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        // console.log(lat, lng);

                        payload = {
                            ...payload,
                            miles: value,
                            addrZipcode: {
                                lat,
                                lng,
                                addr: value
                            }
                        }
                        this.props.franchiseeSelectLocationFilter(payload)
                        return
                    },
                    error => {
                        // console.error(error);
                        payload = {
                            ...payload,
                            miles: value,
                            addrZipcode: undefined
                        }
                        this.props.franchiseeSelectLocationFilter(payload)
                        return
                    }
                );

                return;
        }
        this.props.franchiseeSelectLocationFilter(payload)
    }
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
                                                onChange={this.handleSelectChange('State')}
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
                                                onChange={this.handleSelectChange('contactState')}
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
                           <div style={{display: 'flex', flexDirection: 'column',width: '200px'}}>
                                <h3>Location</h3>
                                <FormControl component="fieldset" className={classNames(classes.formControl,"mt-12")}>
                                   <RadioGroup
                                       aria-label="Location"
                                       name="Location"
                                       value={this.props.locationFilterValue.id}

                                   >
                                       <FormControlLabel value="locationAll" control={<Radio onChange={this.handleLocationChange('Location')}/>} label="All" />
                                       <FormControlLabel value="locationNearBy" control={<Radio onChange={this.handleLocationChange('Location')}/>} label="Near By" />
                                       {this.state.Location === "locationNearBy" && (
                                           <TextField
                                               select

                                               id="NearbyRadius"
                                               label="Radius"
                                               className={classes.textField}
                                               InputLabelProps={{
                                                   shrink: true
                                               }}
                                               value={this.props.locationFilterValue.miles}
                                               onChange={this.handleLocationChange('NearbyRadius')}
                                               margin="dense"
                                               variant="outlined"
                                               fullWidth
                                           >
                                               {
                                                   Array.from({ length: 15 })
                                                       .map((val, index) => (
                                                           <MenuItem key={index} value={(index + 1) * 5}>
                                                               {(index + 1) * 5} Miles
                                                           </MenuItem>
                                                       ))
                                               }
                                           </TextField>
                                       ) }
                                       <FormControlLabel value="locationNearSpecificAddress" control={<Radio onChange={this.handleLocationChange('Location')}/>} label="Near Specific Address" />

                                   </RadioGroup>
                                    {this.state.Location === "locationNearSpecificAddress" && (
                                        <div>
                                            <TextField
                                                id="SpecificAddress"
                                                label="Address"
                                                className={classes.textField}
                                                onChange={this.handleLocationChange('SpecificAddress')}
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                            />
                                            <TextField
                                                select

                                                id="AddressZipcodeRadius"
                                                label="Radius"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                value={this.props.locationFilterValue.miles}
                                                onChange={this.handleLocationChange('AddressZipcodeRadius')}
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                            >
                                                {
                                                    Array.from({ length: 15 })
                                                        .map((val, index) => (
                                                            <MenuItem key={index} value={(index + 1) * 5}>
                                                                {(index + 1) * 5} Miles
                                                            </MenuItem>
                                                        ))
                                                }
                                            </TextField>
                                        </div>
                                    )}
                                </FormControl>
                                <br/>
                                <h3>Franchisees Statuses</h3>
                               { this.props.franchiseeStatus && this.props.bLoadedFilterList && (
                                   <FormControl>
                                       {
                                           this.props.franchiseeStatus.map((data,index)=>(
                                               <FormControlLabel
                                                   key={data.Value}
                                                   control={
                                                       <Switch
                                                           checked={data[data.Name]}
                                                           onChange={this.handleChange(index,`${data.Name}`)}
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
        franchiseeSelectLocationFilter: Actions.franchiseeSelectLocationFilter,
        getStatusFilterList: Actions.getStatusFilterList,
        updateFranchiseeStatus: Actions.updateFranchiseeStatus
    }, dispatch);
}

function mapStateToProps({franchisees, auth})
{
    return {
        filterStateFranchisees: franchisees.bOpenedSummaryPanelFranchisees,
        transactionStatusFranchisees: franchisees.transactionStatusFranchisees,
        franchiseesForm: franchisees.createFranchisees,
        bLoadedFilterList: franchisees.bLoadedFilterList,
        regionId: auth.login.defaultRegionId,
        franchiseeStatus: franchisees.franchiseeStatus,
        locationFilterValue: franchisees.locationFilterValue,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
