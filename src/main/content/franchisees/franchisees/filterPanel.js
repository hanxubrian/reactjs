import React, {Component} from 'react';
import {OutlinedInput, Paper, Select, TextField, withStyles} from '@material-ui/core';
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
import MaskedInput from "react-text-mask";
import * as PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";


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
    },
    dropdownMenu: {
        '& li': {
            fontSize: 12,
            height: 12,
        }
    },
    inputMenu: {
        padding: '10px 16px'
    },
    inputMenu1: {
        padding: '10px 16px',
        width: 150
    },
});


const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['+',/[1-9]/,'(',/\d/,/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
};

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const WAIT_INTERVAL = 1000;

class FilterPanel extends Component {

    state = {
        Active: true,
        InActive: true,
        State: '',
        contactState: '',
        Location: this.props.locationFilterValue.id,
        NearbyRadius: this.props.locationFilterValue.miles,
        AddressZipcodeRadius: this.props.locationFilterValue.miles,
        franchiseeStatus: [],
        stateList: [],
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        Zip: "",
        County: "",
        Phone1: '+1(  )    -    ',
        Phone2: '+1(  )    -    ',
        Email: "",
        Name: "",
        //transactionStatusFranchisees: {Active: true, InActive: true}
    };

    constructor(props){
        super(props);
        if(!props.bLoadedFilterList) {
            props.getStatusFilterList(this.props.regionId);
            props.getFranchiseeStateList(this.props.regionId);
        }
    }
    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
           franchiseeStatus: this.props.franchiseeStatus,
           stateList: this.props.getFranchiseeStateList(this.props.regionId),
           AddressLine1: this.props.insertPayload.AddressLine1,
           AddressLine2: this.props.insertPayload.AddressLine2,
           Name: this.props.insertPayload.Name,
           Phone1: this.props.insertPayload.Phone1,
           Phone2: this.props.insertPayload.Phone2,
           County: this.props.insertPayload.County,
           Zip: this.props.insertPayload.Zip,
           City: this.props.insertPayload.City,
           State: this.props.insertPayload.State,
           Email: this.props.insertPayload.Email,
           Active: this.props.Active,
           InActive: this.props.InActive,
        });
        
    }

    componentDidUpdate(prevProps, prevState, snapshot)
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
    componentWillReceiveProps(nextProps){
       if(nextProps.franchiseesForm.props.open === false){
           this.initialCloseState();
       }
       if(nextProps.franchiseesForm.props.open === true){
        this.setState({
            franchiseeStatus: this.props.franchiseeStatus,
            stateList: this.props.getFranchiseeStateList(this.props.regionId),
            AddressLine1: this.props.insertPayload.AddressLine1,
            AddressLine2: this.props.insertPayload.AddressLine2,
            Name: this.props.insertPayload.Name,
            Phone1: this.props.insertPayload.Phone1,
            Phone2: this.props.insertPayload.Phone2,
            County: this.props.insertPayload.County,
            Zip: this.props.insertPayload.Zip,
            City: this.props.insertPayload.City,
            State: this.props.insertPayload.State,
            Email: this.props.insertPayload.Email
         });
       }
    }

    initialCloseState = () => {
        this.setState({
            Name: '',
            State: '',
            stateList: [],
            AddressLine1: '',
            AddressLine2: '',
            City: '',
            Zip: '',
            County: '',
            Phone1: '+1(  )    -    ',
            Phone2: '+1(  )    -    ',
            Email: ''
        });
    }

    handleDocumentKeyDown = event => {
        if ( keycode(event) === 'esc' )
        {
            this.props.closeFilterPanel();
        }
    };

    handleFormChange = (name) => event => {
        
        this.setState({
                [name]: event.target.value,
        });
       
        const iStatus = this.props.insertPayload;
        console.log('insertPayload = ',iStatus);
        iStatus[name] = event.target.value;
        this.props.franchiseeUpdateInsertPayload(iStatus)
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.checked
        });
        if(name === "Active"){
            this.props.updateFranchiseeStatusActive(event.target.checked);
        }
        if(name === "InActive"){
            this.props.updateFranchiseeStatusInActive(event.target.checked);
        }
    };

    handleAddressFormChange = (name) => event => {

        if(name === 'State'){
            this.setState({
                [name]: event.target.value,
            });
        }
        const originStatus = this.props.insertPayload;
        const AddressStatus = originStatus.Addresses[0];
        console.log('insertPayload = ',AddressStatus);
        AddressStatus[name] = event.target.value;
        originStatus.Addresses[0] = AddressStatus;
        this.props.franchiseeUpdateInsertPayload(originStatus)
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
                if (value !== "locationNearSpecificAddress") {

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
                        console.log("payload", payload)
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
    };

    render()
    {
        const {classes, franchiseesForm} = this.props;

        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <div className="flex flex-1 flex-col min-h-px p-20">
                        {franchiseesForm && franchiseesForm.props.open
                        ?(
                           <div>
                               <GridContainer style={{ alignItems: 'center', width: 300 }} className={classNames(classes.formControl)}>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_name"
                                                label="Name"
                                                value={this.state.Name}
                                                className={classes.textField}
                                                onChange={this.handleFormChange('Name')}
                                                margin="dense"
                                                variant="outlined"
                                                inputProps={{
                                                    maxLength:60
                                                }}
                                                required
                                                fullWidth
                                            />

                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_address1"
                                                label="Address"
                                                className={classes.textField}
                                                value = {this.state.AddressLine1}
                                                onChange={this.handleFormChange('AddressLine1')}
                                                margin="dense"
                                                inputProps={{
                                                    maxLength:100
                                                }}
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_address2"
                                                label="Address2"
                                                className={classes.textField}
                                                value = {this.state.AddressLine2}
                                                onChange={this.handleFormChange('AddressLine2')}
                                                inputProps={{
                                                    maxLength:100
                                                }}
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_city"
                                                label="City"
                                                className={classes.textField}
                                                value = {this.state.City}
                                                onChange={this.handleFormChange('City')}
                                                margin="dense"
                                                variant="outlined"
                                                inputProps={{
                                                    maxLength:100
                                                }}
                                                fullWidth
                                                required
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_state"
                                                label="State"
                                                select
                                                className={classes.textField}
                                                value={this.state.State}
                                                onChange={this.handleFormChange('State')}
                                                margin="dense"
                                                variant="outlined"
                                                required
                                                fullWidth
                                            >
                                                {this.props.stateList.map(option => (
                                                    <MenuItem key={option.Value} value={option.Value}>
                                                        {option.Text}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                           <TextField
                                               id="lf_county"
                                               label="County"
                                               className={classes.textField}
                                               value = {this.state.County}
                                               onChange={this.handleFormChange('County')}
                                               margin="dense"
                                               variant="outlined"
                                               inputProps={{
                                                   maxLength:100
                                               }}
                                               fullWidth
                                               required
                                           />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_zip"
                                                label="Zip"
                                                className={classes.textField}
                                                value = {this.state.Zip}
                                                onChange={this.handleFormChange('Zip')}
                                                inputProps={{
                                                    maxLength:20
                                                }}
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_phone1"
                                                label="Phone"
                                                className={classes.textField}
                                                margin="dense"
                                                inputProps={{
                                                    maxLength:40
                                                }}
                                                InputProps={{
                                                    inputComponent: TextMaskCustom,
                                                    value:this.state.Phone1,
                                                    onChange: this.handleFormChange('Phone1')
                                                }}
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                            {/*<NumberFormat value={this.state.Phone1} displayType={'text'}  format="+1 (###) ###-####" mask="_" renderText={value => <div>{value}</div>} />*/}
                                        </GridItem>
                                       <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                           <TextField
                                               id="lf_phone2"
                                               label="Cell"
                                               className={classes.textField}
                                               onChange={this.handleFormChange('Phone2')}
                                               margin="dense"
                                               inputProps={{
                                                   maxLength:40
                                               }}
                                               InputProps={{
                                                   inputComponent: TextMaskCustom,
                                                   value:this.state.Phone2,
                                                   onChange: this.handleFormChange('Phone2')
                                               }}
                                               variant="outlined"
                                               fullWidth
                                               required
                                           />
                                       </GridItem>
                                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                            <TextField
                                                id="lf_email"
                                                label="E-mail"
                                                className={classes.textField}
                                                value={this.state.Email}
                                                onChange={this.handleFormChange('Email')}
                                                inputProps={{
                                                    maxLength:100
                                                }}
                                                margin="dense"
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
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.Active}
                                                onChange={this.handleChange("Active")}
                                                value="Y"
                                            />
                                           }
                                        label="Active"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.InActive}
                                                onChange={this.handleChange("InActive")}
                                                value="N"
                                            />
                                           }
                                        label="InActive"
                                    />
                                </FormControl>
                               
                            </div>
                        )}
                    </div>
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
        updateFranchiseeStatusActive: Actions.updateFranchiseeStatusActive,
        updateFranchiseeStatusInActive: Actions.updateFranchiseeStatusInActive,
        franchiseeUpdateInsertPayload: Actions.franchiseeUpdateInsertPayload,
        getFranchiseeStateList: Actions.getFranchiseeStateList,
        updateReportPeriod: Actions.updateReportPeriod
    }, dispatch);
}

function mapStateToProps({franchisees, auth})
{
    return {
        filterStateFranchisees: franchisees.bOpenedSummaryPanelFranchisees,
        Active: franchisees.Active,
        InActive: franchisees.InActive,
        franchiseesForm: franchisees.createFranchisees,
        bLoadedFilterList: franchisees.bLoadedFilterList,
        regionId: auth.login.defaultRegionId,
        franchiseeStatus: franchisees.franchiseeStatus,
        locationFilterValue: franchisees.locationFilterValue,
        insertPayload: franchisees.insertPayload,
        stateList: franchisees.StateList,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
