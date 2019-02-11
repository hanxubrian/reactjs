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
import Input from "@material-ui/core/Input/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";

// Auto Suggest
import Autosuggest from 'react-autosuggest';
import Paper from "@material-ui/core/Paper/Paper";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';

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
    marginLeft: 0
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
    }
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





const GroupList = [];
const RoleList = [];

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
        title : '',
        Email : '',
        DepartmentId: 'DepartMent1',
        Phone : '',
        Address: '',
        State: 'Buffalo',
        City : '',
        Zipcode : '',
        UserName: '',
        PasswordHash: '',
        Regions: [],
        Groups: [],
        defaultRegion: '',
        checked: [1],
        Roles: [],
        userType: '',
        userTypeFranchisee: '',
        userTypeCustomer: '',
        userTypeVendor: '',
        userTypeEmployee: '',
        userTypeThirdParty: '',
        userTypeContractor: '',
        single: '',
        suggestions: [],
        TypeList:[],
        MultiRegion: [],
        DefaultRegion: [],
        UserPermission: [],
        DepartmentList: [],
        payload:{
            PasswordHash: "sample string 1",
            IsFirstTimeLogin: "sample string 2",
            Salt: "sample string 3",
            OutlookPassword: "sample string 4",
            Apps: [
              {
                _id: "sample string 1",
                MenuOptions: [
                  {
                    Children: [
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      },
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      }
                    ],
                    Icon: "sample string 1",
                    IconMobile: "sample string 2",
                    IframeUrl: "sample string 3",
                    MenuId: 4.1,
                    Level: 5.1,
                    Slug: "sample string 6",
                    TabName: "sample string 7",
                    Title: "sample string 8",
                    Type: "sample string 9"
                  },
                  {
                    Children: [
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      },
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      }
                    ],
                    Icon: "sample string 1",
                    IconMobile: "sample string 2",
                    IframeUrl: "sample string 3",
                    MenuId: 4.1,
                    Level: 5.1,
                    Slug: "sample string 6",
                    TabName: "sample string 7",
                    Title: "sample string 8",
                    Type: "sample string 9"
                  }
                ]
              },
              {
                _id: "sample string 1",
                MenuOptions: [
                  {
                    Children: [
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      },
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      }
                    ],
                    Icon: "sample string 1",
                    IconMobile: "sample string 2",
                    IframeUrl: "sample string 3",
                    MenuId: 4.1,
                    Level: 5.1,
                    Slug: "sample string 6",
                    TabName: "sample string 7",
                    Title: "sample string 8",
                    Type: "sample string 9"
                  },
                  {
                    Children: [
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      },
                      {
                        AppId: 1.1,
                        Icon: "sample string 2",
                        IconMobile: "sample string 3",
                        IframeUrl: "sample string 4",
                        MenuId: 5.1,
                        MenuLevel: 6.1,
                        MenuOrder: 7.1,
                        ParentId: 8.1,
                        Slug: "sample string 9",
                        TabName: "sample string 10",
                        Title: "sample string 11",
                        Type: "sample string 12"
                      }
                    ],
                    Icon: "sample string 1",
                    IconMobile: "sample string 2",
                    IframeUrl: "sample string 3",
                    MenuId: 4.1,
                    Level: 5.1,
                    Slug: "sample string 6",
                    TabName: "sample string 7",
                    Title: "sample string 8",
                    Type: "sample string 9"
                  }
                ]
              }
            ],
            UserId: 6,
            UserName: "sample string 7",
            FirstName: "sample string 8",
            LastName: "sample string 9",
            Email: "sample string 10",
            Phone: "sample string 11",
            Address: "sample string 12",
            City: "sample string 13",
            State: "sample string 14",
            Zipcode: "sample string 15",
            DepartmentId: "sample string 16",
            Title: "sample string 17",
            OutlookUsername: "sample string 18",
            DefaultRegionId: 19,
            ProfilePhoto: "sample string 20",
            UserType: "sample string 21",
            Roles: [1,2],
            Groups: [1,2],
            Regions: [1,2]
        }
    }


    componentWillMount() {
        this.props.getUserFormGroupList();
        this.props.getUserFormRoleList();
        this.props.getUserFormUserTypeList();
        this.props.getUserStateList();
        this.props.getUserDepartmentList(this.props.regionId);
        this.props.getFranchisees(this.props.regionId);
        this.setState({
            payload: this.props.payload
        });
        if(this.props.payload.UserId !== this.props.userId){
            this.updateUserFormPayload("UserId", this.props.userId);
        }
        if(this.props.payload.DefaultRegionId !== this.props.regionId){
            this.updateUserFormPayload("DefaultRegionId",this.props.regionId);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if ( nextProps.userGroupList !== this.props.userGroupList )
        {
            if(nextProps.userGroupList !== null)
            {
                nextProps.userGroupList.map(x=>{
                    GroupList.push(x.name);
                });
            }
        }
        if ( nextProps.userRoleList !== this.props.userRoleList )
        {
            if(nextProps.userRoleList !== null)
            {
                nextProps.userRoleList.map(x=>{
                    RoleList.push(x.name);
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
                nextProps.userStateList.map(x=>{
                    this.state.MultiRegion.push(x.name);
                });
                this.state.DefaultRegion = nextProps.userStateList;
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
                console.log("CustomerList",franchiseeSuggestions);
            }
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
        if(name === "Groups" || name === "Regions" || name ==="Roles"){
            if(name === "Groups"){
                let temp = event.target.value;
                let changedGroups = [];
                temp.map(x=>{
                    this.props.userGroupList.map(y=>{
                        if(x === y.name){
                          changedGroups.push(y.group_id);
                        }
                    })
                })
                this.updateUserFormPayload(name,changedGroups);
            }
            if(name === "Regions") {
                let temp = event.target.value;
                let changedRegions = [];
                temp.map(x=>{
                    this.props.userStateList.map(y=>{
                        if(x === y.name){
                            changedRegions.push(y.abbreviation);
                        }
                    })
                })
                //console.log("roles",changedRegions);
                this.updateUserFormPayload(name,changedRegions);
            }     
            if(name === "Roles") {
                let temp = event.target.value;
                let changedRoles = [];
                temp.map(x=>{
                    this.props.userRoleList.map(y=>{
                        if(x === y.name){
                            changedRoles.push(y._id);
                        }
                    })
                })
                console.log("roles",changedRoles);
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
        insertPayload[name] = value;
        this.props.updateUserFormPayload(insertPayload);
    }


    render()
    {
        const {classes} = this.props;
        const {
            TypeList,
            DepartmentList,
            MultiRegion,
            DefaultRegion,
            UserPermission,
            CustomerName
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
                            <UserAvatar/>
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
                                        onChange={this.handleChange("Title")}
                                        value={this.state.Title}
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
                                        id="address"
                                        label="Address"
                                        variant="outlined"
                                        className={classes.textField}
                                        value={this.state.Address}
                                        onChange={this.handleChange("Address")}
                                        style={{marginRight:'1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        id="city"
                                        label="City"
                                        variant="outlined"
                                        className={classes.textField}
                                        value={this.state.City}
                                        onChange={this.handleChange("City")}
                                        style={{marginRight:'1%', marginLeft: '1%'}}
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
                                        {DefaultRegion.map(option => (
                                            <MenuItem key={option._id} value={option.abbreviation}>
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
                                id="accPassword"
                                label="Password"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.accPassword}
                                onChange={this.handleChange("accPassword")}
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
                                id="defaultRegion"
                                label={"Default Region"}
                                select
                                variant={"outlined"}
                                className={classes.textField}
                                value={this.state.defaultRegion}
                                style={{marginLeft: "1%"}}
                                onChange={this.handleChange('defaultRegion')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="dense"
                                fullWidth
                            >
                                {DefaultRegion.map(option => (
                                    <MenuItem key={option._id} value={option.abbreviation}>
                                        {option.name}
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
                                id="userType"
                                label={"User Type"}
                                select
                                variant={"outlined"}
                                className={classes.textField}
                                value={this.state.userType}
                                style={{marginRight: "1%"}}
                                onChange={this.handleChange('userType')}
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
                            {this.state.userType === 'Employee' && (
                                <TextField
                                    id="userTypeEmployee"
                                    label="Employee"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.userTypeEmployee}
                                    onChange={this.handleChange("userTypeEmployee")}
                                    style={{marginLeft:'1%'}}
                                    margin="dense"
                                    fullWidth
                                    required
                                />
                            )}
                            {this.state.userType === 'Franchisee' && (
                                <TextField
                                    id="userTypeFranchisee"
                                    label="Franchisee"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.userTypeFranchisee}
                                    onChange={this.handleChange("userTypeFranchisee")}
                                    style={{marginLeft:'1%'}}
                                    margin="dense"
                                    fullWidth
                                    required
                                />
                            )}
                            {this.state.userType === 'Customer' && (
                                <Autosuggest
                                    {...autosuggestProps}
                                    inputProps={{
                                        classes,
                                        label: 'Customer',
                                        placeholder: 'Enter Customer Name',
                                        value: this.state.userTypeCustomer,
                                        autoComplete: 'off',
                                        onChange: this.handleAutoChange('userTypeCustomer'),
                                        inputRef: node => {
                                            this.popperNode = node;
                                        },
                                        InputLabelProps: {
                                            shrink: true,
                                        },
                                    }}
                                    theme={{
                                        container: classNames(classes.container),
                                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                        suggestionsList: classes.suggestionsList,
                                        suggestion: classes.suggestion,
                                    }}
                                    renderSuggestionsContainer={options => (
                                            <Paper
                                                square
                                                {...options.containerProps}
                                                style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
                                            >
                                                {options.children}
                                            </Paper>
                                    )}
                                />
                            )}
                            {this.state.userType === 'Vendor' && (
                                <TextField
                                    id="userTypeVendor"
                                    label="Vendor"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.userTypeVendor}
                                    onChange={this.handleChange("userTypeVendor")}
                                    style={{marginLeft:'1%'}}
                                    margin="dense"
                                    fullWidth
                                    required
                                />
                            )}
                            {this.state.userType === 'ThirdParty' && (
                                <TextField
                                    id="userTypeThirdParty"
                                    label="Thirty-Party"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.userTypeThirdParty}
                                    onChange={this.handleChange("userTypeThirdParty")}
                                    style={{marginLeft:'1%'}}
                                    margin="dense"
                                    fullWidth
                                    required
                                />
                            )}
                            {this.state.userType === 'Contractor' && (
                                <TextField
                                    id="userTypeContractor"
                                    label="Contractor"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.userTypeContractor}
                                    onChange={this.handleChange("userTypeContractor")}
                                    style={{marginLeft:'1%'}}
                                    margin="dense"
                                    fullWidth
                                    required
                                />
                            )}
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
        userId: auth.login.UserId
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UsersForm));