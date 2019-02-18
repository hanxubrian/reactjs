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
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";

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
        height: 200,
        width: 300,
        overflowY: 'scroll'
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },

});

// Define suggestion Array()
const suggestions = [];
const franchiseeSuggestions = [];


// Define render input component function
function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            variant="outlined"
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
            }}
            inputProps={{
                autoComplete: 'off',
            }}
            {...other}
        />
    );
}



// renderSuggestion functions

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.customerName, query);
    const parts = parse(suggestion.customerName, matches);

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

function renderFranchiseeSuggestion(franchiseeSuggestions, { query, isHighlighted }) {
    const matches = match(franchiseeSuggestions.franchiseeName, query);
    const parts = parse(franchiseeSuggestions.franchiseeName, matches);

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

// getSuggestions

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.customerName.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getFranchiseeSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.franchiseeName.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}


// getSuggestionValue

function getSuggestionValue(suggestion) {
    return suggestion.customerName;
}

function getFranchiseeSuggestionValue(franchiseeSuggestion) {
    return franchiseeSuggestion.franchiseeName;
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

    constructor(props) {
        super(props);
    }

    state = {
        FirstName: '',
        LastName : '',
        Title : '',
        Email : '',
        DepartmentId: 'Department 1',
        Phone : '',
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
        payload:{
            PasswordHash: "",
            IsFirstTimeLogin: "",
            Salt: "",
            OutlookPassword: "",
            Apps: [],
            Groups: [],
            UserId: 6,
            UserName: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
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
        if(this.props.payload.UserId !== this.props.userId){
            this.updateUserFormPayload("UserId", this.props.userId);
        }

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
            this.props.userDetail.details.Roles.map(x=>{
                RoleList.push(
                    x.RoleName
                );
            });

            this.setState({Roles: RoleList});

            let regions = [];
            this.props.userDetail.details.Regions.map(x=>{
                regions.push(
                    x.Name
                );
            });

            this.setState({Regions: regions});
        }

        if(!this.props.bNewForm && this.props.userGroupList.length>0 && (this.props.userGroupList!==prevProps.userGroupList) && (this.props.userDetail!==null && this.props.userDetail.details)){
            GroupList = [];
            this.props.userDetail.details.Groups.map(x=>{
                this.props.userGroupList.map(y=>{
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
            this.props.regions.map(x=>{
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
            details.Roles = details.Roles.map(x=>{
                RoleList.push(
                    x.RoleName
                );
            });
            details.Regions = details.Regions.map(x=>{
                RoleList.push(
                    x.Name
                );
            });

            this.setState({...details})
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if ( nextProps.userGroupList !== this.props.userGroupList )
        {
            if(nextProps.userGroupList !== null)
            {
                GroupList = [];
                nextProps.userGroupList.map(x=>{
                    GroupList.push(x.name);
                });
            }
        }
        if ( nextProps.userRoleList !== this.props.userRoleList )
        {
            if(nextProps.userRoleList !== null)
            {
                RoleList = [];
                nextProps.userRoleList.map(x=>{
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
                this.state.StateList = nextProps.userStateList;
            }
        }
        if ( nextProps.userDepartmentList !== this.props.userDepartmentList )
        {
            if(nextProps.userDepartmentList !== null)
            {
                this.state.DepartmentList = nextProps.userDepartmentList;
            }
        }
        if ( nextProps.customers !== this.props.customers ){
            if(nextProps.customers !== null){
                nextProps.customers.Data.Regions.map(x=>{
                    x.CustomerList.map(y=>{
                        suggestions.push({customerName: y.CustomerName});
                    });
                });
            }
        }
        if ( nextProps.franchisees !== this.props.franchisees ){
            if(nextProps.franchisees !== null){
                nextProps.franchisees.Data.Region.map(x=>{
                    x.Franchisees.map(y=>{
                        franchiseeSuggestions.push({franchiseeName: y.Name});
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

        if(name === "Groups" || name === "Regions" || name ==="Roles"){
            if(name === "Groups"){
                let changedGroups = [];
                event.target.value.map(x=>{
                    this.props.userGroupList.map(y=>{
                        if(x === y.name){
                            changedGroups.push(y.group_id);
                        }
                    })
                })
                this.updateUserFormPayload(name,changedGroups);
            }
            if(name === "Regions") {

                let changedRegions = [];
                event.target.value.map(x=>{
                    this.props.regions.map(y=>{
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
                event.target.value.map(x=>{
                    this.props.userRoleList.map((y,index)=>{
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
        setTimeout(function() {
            this.updateUserFormPayload(name,newValue);
        }, 1500);
    };


    updateUserFormPayload = (name,value) => {

        let insertPayload = this.state.payload;
        console.log("InsertPayload", insertPayload);
        insertPayload[name] = value;
        this.props.updateUserFormPayload(insertPayload);
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
                                        variant="outlined"
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
                                        variant="outlined"
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
                                        variant="outlined"
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
                                        variant="outlined"
                                        className={classes.textField}
                                        value={this.state.Phone}
                                        onChange={this.handleChange("Phone")}
                                        style={{marginRight:'1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        id="email"
                                        label="E Mail"
                                        variant="outlined"
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
                                        variant={"outlined"}
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
                                        variant="outlined"
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
                                        variant="outlined"
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
                                variant="outlined"
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
                                variant={"outlined"}
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
                                variant="outlined"
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
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.UserName}
                                onChange={this.handleChange("UserName")}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                            <TextField
                                id="PasswordHash"
                                label="Password"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.PasswordHash}
                                onChange={this.handleChange("PasswordHash")}
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
                                    input={<OutlinedInput id="select-Groups" labelWidth={80}/>}
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
                                    input={<OutlinedInput id="select-Regions" labelWidth={100}/>}
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
                                variant={"outlined"}
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
                                    input={<OutlinedInput id="select-roles" labelWidth={80}/>}
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
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="UserType"
                                label={"User Type"}
                                select
                                variant={"outlined"}
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
                            <TextField
                                id="UserTypeValue"
                                label="Name"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.UserTypeValue}
                                onChange={this.handleChange("UserTypeValue")}
                                style={{marginLeft:'1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">

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
