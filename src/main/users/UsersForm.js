import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
import * as MainActions from "store/actions";
import connect from "react-redux/es/connect/connect";
import GridContainer from "../../Commons/Grid/GridContainer";
import GridItem from "../../Commons/Grid/GridItem";
import UserAvatar from"./UserAvatar"
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import UsersPermission from "./UsersPermission";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import MaskedInput from "react-text-mask";
import * as PropTypes from "prop-types";

// Auto Suggest
import Autosuggest from 'react-autosuggest';
import Paper from "@material-ui/core/Paper/Paper";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import _ from "lodash";

const styles = theme => ({
    root     : {
        display : 'flex',
        flexWrap: 'wrap',
        width   : '80%',
        margin  : 'auto',
        marginTop: '50px',
        marginBottom: '50px'
    },
    margin   : {
        margin: theme.spacing.unit
    },
    userFormSection: {
        marginBottom : '10px'
    },
    multiSelectControl: {
        margin: theme.spacing.unit,
        marginLeft: 0,
        '& label': {
            transform: 'translate(14px, 18px) scale(1)'
        },
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        right: 0,
        maxHeight: 200,
        width: '100%',
        height: 200,
        overflowY: 'scroll'
    },
    suggestion: {
        display: 'block',
        width: '100%'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        width: '100%'
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    autoSuggest: {
        position: 'absolute',
        zIndex: 20,
    }

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

// Define suggestion Array()
let franchiseeSuggestions = [];
let customerSuggestions = [];
let suggestions = [];


// Define render input component function
function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            className={classes.textField}
            margin="dense"
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
                autoComplete: 'off',
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
          )}
        </div>
      </MenuItem>
    );
  }

  function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  function getSuggestionValue(suggestion) {
    return suggestion.label;
  }


let GroupList = [];
let RoleList = [];

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class UsersForm extends React.Component {
    state = {
        FirstName: '',
        LastName : '',
        Title : '',
        Email : '',
        DepartmentId: 'Department 1',
        Phone : '+1(  )    -    ',
        Address1: '',
        Address2: '',
        State: 'Alabama',
        City : '',
        Zipcode : '',
        UserName: '',
        PasswordHash: '',
        Regions: [],
        Groups: [],
        DefaultRegionId: 2,
        checked: [1],
        Roles: [],
        UserType: '',
        UserTypeValue:'',
        single: '',
        suggestions: [],
        TypeList:[],
        MultiRegion: [],
        DefaultRegions: [],
        StateList: [],
        UserPermission: [],
        DepartmentList: [],
        showPassword: false,
        payload:{
            PasswordHash: "",
            IsFirstTimeLogin: "",
            Salt: "",
            OutlookPassword: "",
            Apps: [],
            Groups: [],
            // UserId: 6,
            UserName: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "+1(  )    -    ",
            Address1: "",
            Address2: "",
            City: "",
            State: "",
            Zipcode: "",
            DepartmentId: "",
            Title: "",
            OutlookUsername: "",
            DefaultRegionId: 2,
            ProfilePhoto: "",
            UserType: "",
            UserTypeValue: "",
            Roles: [],
            Regions: [
                {
                    RegionId: 2,
                    Arcrym: "",
                    Name: "",
                    DisplayName: ""
                }
            ]
        }
    };


    componentWillMount() {
        this.props.getUserFormGroupList();
        this.props.getUserFormRoleList();
        this.props.getUserFormUserTypeList();
        this.props.getUserStateList();
        this.props.getUserDepartmentList(this.props.regionId);
        this.props.getFranchisees(this.props.regionId);
        if(this.props.bNewForm){
            this.setState({ payload: this.props.payload} );
        }

        if(!this.props.bNewForm && this.props.userDetail.details !== null){
            this.setState({
                payload: {
                  ...this.state.payload,
                  ...this.props.userDetail.details
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(!this.props.bNewForm && this.props.userRoleList.length>0 && (this.props.userRoleList!==prevProps.userRoleList) && (this.props.userDetail!==null && this.props.userDetail.details)){
            RoleList = [];
            this.props.userDetail.details.Roles.forEach(x=>{
                RoleList.push(
                    x.RoleName
                );
            });

            this.setState({Roles: RoleList});

            let regions = [];
            this.props.userDetail.details.Regions.forEach(x=>{
                regions.push(
                    x.Name
                );
            });

            this.setState({Regions: regions});
        }

        if(!this.props.bNewForm && this.props.userGroupList.length>0 && (this.props.userGroupList!==prevProps.userGroupList) && (this.props.userDetail!==null && this.props.userDetail.details)){
            GroupList = [];
            this.props.userDetail.details.Groups.forEach(x=>{
                this.props.userGroupList.forEach(y=>{
                    if(y.group_id === x ){
                        GroupList.push(y.name);
                    }
                });
            });
            this.setState({
                Groups: GroupList
            });
        }
    }

    componentDidMount(){
        if(this.props.regions !== null){
            this.props.regions.forEach(x=>{
                this.state.MultiRegion.push(x.regionname);
                this.state.DefaultRegions.push({
                    "RegionId": x.regionid,
                    "Name":x.regionname,
                    "Arcrym":"",
                    "DisplayName":""
                });
            })
        }
        if(!this.props.bNewForm && this.props.userDetail!==null && this.props.userDetail.details){
            let details = _.cloneDeep(this.props.userDetail.details);
            details.Roles = details.Roles.forEach(x=>{
                RoleList.push(
                    x.RoleName
                );
            });

            this.setState({
                UserId: details.UserId,
                Address1: details.Address1,
                Address2: details.Address2,
                City: details.City,
                DefaultRegionId: details.DefaultRegionId,
                DepartmentId: details.DepartmentId,
                Email: details.Email,
                FirstName: details.FirstName,
                LastName: details.LastName,
                Phone: details.Phone,
                ProfilePhoto: details.ProfilePhoto,
                State: details.State,
                Title: details.Title,
                UserName: details.Username,
                UserType: details.UserType,
                UserTypeValue: details.UserTypeValue,
                Zipcode: details.Zipcode
            });

            this.setState({payload:details});


            console.log("state",this.state);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if ( nextProps.userGroupList !== this.props.userGroupList )
        {
            if(nextProps.userGroupList !== null)
            {
                GroupList = [];
                nextProps.userGroupList.forEach(x=>{
                    GroupList.push(x.name);
                });
            }
        }
        if ( nextProps.userRoleList !== this.props.userRoleList )
        {
            if(nextProps.userRoleList !== null)
            {
                RoleList = [];
                nextProps.userRoleList.forEach(x=>{
                    RoleList.push(
                        x.name
                    );
                });
            }
        }
        if ( nextProps.userTypeList !== this.props.userTypeList )
        {
            if(nextProps.userTypeList !== null)
            {
                this.setState({
                    TypeList: nextProps.userTypeList
                })
            }
        }
        if ( nextProps.userStateList !== this.props.userStateList )
        {
            if(nextProps.userStateList !== null)
            {
                this.setState({StateList:nextProps.userStateList});
            }
        }
        if ( nextProps.userDepartmentList !== this.props.userDepartmentList )
        {
            if(nextProps.userDepartmentList !== null)
            {
                this.setState({DepartmentList:nextProps.userDepartmentList});
            }
        }
        if ( nextProps.customers !== this.props.customers ){
            if(nextProps.customers !== null){
                nextProps.customers.Data.Regions.forEach(x=>{
                    x.CustomerList.forEach(y=>{
                        customerSuggestions.push({label: y.CustomerName});
                    });
                });
            }
        }
        if ( nextProps.franchisees !== this.props.franchisees ){
            if(nextProps.franchisees !== null){
                nextProps.franchisees.Data.Region.forEach(x=>{
                    x.Franchisees.forEach(y=>{
                        franchiseeSuggestions.push({label: y.Name});
                    });
                });
            }
        }
        if ( nextProps.payload !== this.props.payload){
            this.setState({
                payload: nextProps.payload
            });
        }
    }

    handleChange = name => event => {

        this.setState({[name]: event.target.value});

        if(name === "Groups" || name === "Regions" || name ==="Roles" || name === "UserType"){
            if(name === "Groups"){
                let changedGroups = [];
                event.target.value.forEach(x=>{
                    this.props.userGroupList.forEach(y=>{
                        if(x === y.name){
                            changedGroups.push(y.group_id);
                        }
                    })
                })
                this.updateUserFormPayload(name,changedGroups);
            }
            if(name === "Regions") {

                let changedRegions = [];
                event.target.value.forEach(x=>{
                    this.props.regions.forEach(y=>{
                        if(x === y.regionname){
                            changedRegions.push({
                                "RegionId": y.regionid,
                                "Name":y.regionname,
                                "Arcrym":"",
                                "DisplayName":""
                            });
                        }
                    })
                })
                this.updateUserFormPayload(name,changedRegions);
            }
            if(name === "Roles") {
                let changedRoles = [];
                event.target.value.forEach(x=>{
                    this.props.userRoleList.forEach((y,index)=>{
                        if(x === y.name){
                            changedRoles.push(
                                {
                                    "RoleId": y.role_id,
                                    "RoleName": y.name
                                }
                            );
                        }
                    })
                })
                this.updateUserFormPayload(name,changedRoles);
            }
            if(name === "UserType") {
                suggestions = [];
                this.setState({
                    UserTypeValue: ''
                })
                if(event.target.value === 'Franchisee'){
                    suggestions = franchiseeSuggestions;
                }
                if(event.target.value === 'Customer'){
                    suggestions = customerSuggestions;
                }
                this.updateUserFormPayload(name,event.target.value);
            }
        }else{
            this.updateUserFormPayload(name,event.target.value);
        }
    };


    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleAutoChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
        this.updateUserFormPayload(name,newValue);
    };


    updateUserFormPayload = (name,value) => {

        let insertPayload = this.state.payload;
        console.log("InsertPayload", insertPayload);
        insertPayload[name] = value;
        this.props.updateUserFormPayload(insertPayload);
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render()
    {
        const {classes} = this.props;
        const {
            TypeList,
            DepartmentList,
            MultiRegion,
            DefaultRegions,
            StateList
        } = this.state;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };

        return (
            <div className={classes.root}>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h2>User Profile</h2>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem sm={2} className="flex flex-row">
                            <UserAvatar onRef={ref=>this.avatar = ref}/>
                        </GridItem>
                        <GridItem sm={10} className="flex">
                            <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl,"flex justify-between")}>
                                <GridItem xs={12} sm={12} md={12} className="flex">
                                    <TextField
                                        id="firstName"
                                        label="First Name"
                                        className={classes.textField}
                                        value={this.state.FirstName}
                                        onChange={this.handleChange("FirstName")}
                                        style={{marginRight:'1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        id="lastName"
                                        label="Last Name"
                                        className={classes.textField}
                                        value={this.state.LastName}
                                        onChange={this.handleChange("LastName")}
                                        style={{marginRight:'1%', marginLeft: '1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        id="title"
                                        label="Title"
                                        value={this.state.Title}
                                        onChange={this.handleChange("Title")}
                                        className={classes.textField}
                                        style={{marginLeft:'1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex ">
                                    <TextField
                                        id="phone"
                                        label="Phone"
                                        className={classes.textField}
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                            value:this.state.Phone,
                                            onChange:this.handleChange("Phone")
                                        }}
                                        style={{marginRight:'1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        id="email"
                                        label="E Mail"
                                        className={classes.textField}
                                        value={this.state.Email}
                                        onChange={this.handleChange("Email")}
                                        style={{marginRight:'1%', marginLeft: '1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />

                                    <TextField
                                        id="department"
                                        select
                                        className={classes.textField}
                                        style={{marginLeft:'1%'}}
                                        value={this.state.DepartmentId}
                                        label={"Department"}
                                        onChange={this.handleChange('DepartmentId')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        margin="dense"
                                        fullWidth
                                    >
                                        {DepartmentList.map(option => (
                                            <MenuItem key={option._id} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="address1"
                                        label="Address 1"
                                        className={classes.textField}
                                        value={this.state.Address1}
                                        onChange={this.handleChange("Address1")}
                                        style={{marginRight:'1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        id="address2"
                                        label="Address 2"
                                        className={classes.textField}
                                        value={this.state.Address2}
                                        onChange={this.handleChange("Address2")}
                                        style={{marginLeft:'1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="city"
                                label="City"
                                className={classes.textField}
                                value={this.state.City}
                                onChange={this.handleChange("City")}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                            <TextField
                                id="state"
                                select
                                label={"State"}
                                className={classes.textField}
                                style={{marginRight:'1%', marginLeft: '1%'}}
                                value={this.state.State}
                                onChange={this.handleChange('State')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="dense"
                                fullWidth
                            >
                                {StateList.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="zip"
                                label="Zip"
                                onChange={this.handleChange("Zipcode")}
                                value={this.state.Zipcode}
                                inputProps={{
                                    maxLength:60
                                }}
                                className={classes.textField}
                                style={{marginLeft:'1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h4>User Account</h4>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="userName"
                                label="User Name"
                                className={classes.textField}
                                value={this.state.UserName !== null ? this.state.UserName : ""}
                                onChange={this.handleChange("UserName")}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                            <TextField
                                id="PasswordHash"
                                label="Password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                className={classes.textField}
                                value={this.state.PasswordHash}
                                onChange={this.handleChange("PasswordHash")}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="Toggle password visibility"
                                          onClick={this.handleClickShowPassword}
                                        >
                                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                }}
                                style={{marginLeft: '1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h4>User Group</h4>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControl style={{width:"100%"}} className={classes.multiSelectControl}>
                                <InputLabel variant={"outlined"} htmlFor="select-Groups">User Group</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.Groups}
                                    className={classes.textField}
                                    onChange={this.handleChange('Groups')}
                                    margin="dense"
                                    MenuProps={MenuProps}
                                >
                                    {GroupList.map(name => (
                                        <MenuItem key={name} value={name} >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl style={{width:"100%"}} className={classes.multiSelectControl}>
                                <InputLabel variant={"outlined"}  htmlFor="select-userGroup">Select Region</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.Regions}
                                    className={classes.textField}
                                    onChange={this.handleChange('Regions')}
                                    margin="dense"
                                    MenuProps={MenuProps}
                                >
                                    {MultiRegion.map(name => (
                                        <MenuItem key={name} value={name} >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="DefaultRegionId"
                                label={"Default Region"}
                                select
                                className={classes.textField}
                                value={this.state.DefaultRegionId}
                                style={{marginLeft: "1%"}}
                                onChange={this.handleChange('DefaultRegionId')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="dense"
                                fullWidth
                            >
                                {DefaultRegions.map(option => (
                                    <MenuItem key={option.RegionId} value={option.RegionId}>
                                        {option.Name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h4>User Role</h4>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControl style={{width:"100%"}} className={classes.multiSelectControl}>
                                <InputLabel variant={"outlined"}  htmlFor="select-userRole">User Role</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.Roles}
                                    className={classes.textField}
                                    onChange={this.handleChange('Roles')}
                                    margin="dense"
                                    MenuProps={MenuProps}
                                >
                                    {RoleList.map(name => (
                                        <MenuItem key={name} value={name} >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classNames(classes.userFormSection,"w-full relative")}>
                    <h4>User Type</h4>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={6} sm={6} md={6} >
                            <TextField
                                id="UserType"
                                label={"User Type"}
                                select
                                className={classes.textField}
                                value={this.state.UserType}
                                style={{marginRight: "1%"}}
                                onChange={this.handleChange('UserType')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="dense"
                                fullWidth
                            >
                                {TypeList.map(option => (
                                    <MenuItem key={option._id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                        {this.state.UserType === 'Franchisee' &&(
                            <Autosuggest
                                {...autosuggestProps}
                                style={{marginLeft: "1%"}}
                                inputProps={{
                                    classes,
                                    label: 'Franchisee Name',
                                    placeholder: 'Franchisee Name',
                                    value: this.state.UserTypeValue,
                                    onChange: this.handleAutoChange('UserTypeValue'),
                                    inputRef: node => {
                                      this.popperNode = node;
                                    },
                                    InputLabelProps: {
                                       shrink: true,
                                    },
                                }}
                                theme={{
                                    suggestionsList: classes.suggestionsList,
                                    suggestion: classes.suggestion,
                                }}
                                renderSuggestionsContainer={options => (
                                    <Paper
                                        square
                                        {...options.containerProps}
                                        style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
                                        className={classes.autoSuggest}
                                    >
                                        {options.children}
                                    </Paper>
                                )}
                            />
                        )}
                        {this.state.UserType === 'Customer' &&(
                            <Autosuggest
                                {...autosuggestProps}
                                style={{marginLeft: "1%"}}
                                inputProps={{
                                    classes,
                                    label: 'Customer Name',
                                    placeholder: 'Customer Name',
                                    value: this.state.UserTypeValue,
                                    onChange: this.handleAutoChange('UserTypeValue'),
                                    inputRef: node => {
                                      this.popperNode = node;
                                    },
                                    InputLabelProps: {
                                       shrink: true,
                                    },
                                }}
                                theme={{
                                    suggestionsList: classes.suggestionsList,
                                    suggestion: classes.suggestion,
                                }}
                                renderSuggestionsContainer={options => (
                                    <Paper
                                        square
                                        {...options.containerProps}
                                        style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
                                        className={classes.autoSuggest}
                                    >
                                        {options.children}
                                    </Paper>
                                )}
                            />
                        )}
                        {this.state.UserType !== 'Franchisee' && this.state.UserType !== 'Customer'&& (
                            <TextField
                                id="UserName"
                                label={"Name"}
                                className={classes.textField}
                                value={this.state.UserTypeValue}
                                style={{marginLeft: "1%"}}
                                onChange={this.handleChange('UserTypeValue')}
                                margin="dense"
                                fullWidth
                            >
                            </TextField>
                        )}

                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h4>User Permission</h4>
                    <UsersPermission/>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openUsersForm : Actions.openUsersForm,
        getUserFormGroupList: Actions.getUserFormGroupList,
        getUserFormRoleList: Actions.getUserFormRoleList,
        getUserFormUserTypeList: Actions.getUserFormUserTypeList,
        getUserStateList: Actions.getUserStateList,
        getUserDepartmentList: Actions.getUserDepartmentList,
        getUserPermissionList: Actions.getUserPermissionList,
        getCustomers: MainActions.getCustomers,
        getFranchisees: MainActions.getFranchisees,
        createUser: Actions.createUser,
        updateUserFormPayload: Actions.updateUserFormVariable
    }, dispatch);
}

function mapStateToProps({usersApp, fuse ,auth,customers, franchisees})
{
    return {
        openUsersFormStatus: usersApp.users.openUsersFormStatus,
        userGroupList: usersApp.users.userGroupList,
        userRoleList: usersApp.users.userRoleList,
        userTypeList: usersApp.users.userTypeList,
        userStateList: usersApp.users.userStateList,
        userDepartmentList: usersApp.users.userDepartmentList,
        userPermissionList: usersApp.users.userPermissionList,
        customers: customers.customersDB,
        navigation : fuse.navigation,
        regionId: auth.login.defaultRegionId,
        franchisees: franchisees.franchiseesDB,
        payload: usersApp.users.payload,
        userId: auth.login.UserId,
        regions: auth.login.all_regions,
        userDetail: usersApp.users.userDetail,
        bNewForm: usersApp.users.bNewForm,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UsersForm));
