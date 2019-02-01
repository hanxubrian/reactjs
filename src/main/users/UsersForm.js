import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
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


const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

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


const department = [
    {
        value: "DepartMent1",
        label: "DepartMent1"
    },
    {
        value: "DepartMent2",
        label: "DepartMent2"
    },
    {
        value: "DepartMent3",
        label: "DepartMent3"
    },
    {
        value: "DepartMent4",
        label: "DepartMent4"
    },
    {
        value: "DepartMent5",
        label: "DepartMent5"
    },
    {
        value: "DepartMent6",
        label: "DepartMent6"
    },
    {
        value: "DepartMent7",
        label: "DepartMent7"
    }
];

const State = [
    {
        label: "Buffalo",
        value: "Buffalo",
    },
    {
        label: "New York",
        value: "New York",
    },
    {
        label: "Kansas",
        value: "Kansas",
    },
    {
        label: "Ohio",
        value: "Ohio",
    },
    {
        label: "Georgia",
        value: "Georgia",
    },
    {
        label: "Texas",
        value: "Texas",
    },
    {
        label: "Florida",
        value: "Florida",
    }
];


const UserRegion = [
    "Buffalo",
    "New York",
    "Kansas",
    "Ohio",
    "Georgia",
    "Texas",
    "Florida",
];

const Group = [
     'Group 1',
     'Group 2',
     'Group 3',
     'Group 4',
];


const userRole = [
    'Admin-User',
    'Guest',
    'Editor',
    'Contractor',
    'Subscriber',
];

const userType = [
    {
        label: "Customer",
        value: "Customer",
    },
    {
        label: "Franchisee",
        value: "Franchisee",
    },
    {
        label: "Employee",
        value: "Employee",
    },
    {
        label: "Vendor",
        value: "Vendor",
    },
    {
        label: "Third-Party",
        value: "ThirdParty",
    },
    {
        label: "Contractor",
        value: "Contractor",
    }
]

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
        firstName: '',
        lastName : '',
        title : '',
        email : '',
        department: 'DepartMent1',
        phone : '',
        address: '',
        state: 'Buffalo',
        city : '',
        zip : '',
        userName: '',
        accPassword: '',
        selectRegion: [],
        userGroup: [],
        defaultRegion: '',
        checked: [1],
        userRole: [],
        userType: '',
        userTypeFranchisee: '',
        userTypeCustomer: '',
        userTypeVendor: '',
        userTypeEmployee: '',
        userTypeThirdParty: '',
        userTypeContractor: '',

        single: '',
        popper: '',
        suggestions: [],
    };


    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
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
    };


    render()
    {
        const {classes} = this.props;

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
                                        value={this.state.firstName}
                                        onChange={this.handleChange("firstName")}
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
                                        value={this.state.lastName}
                                        onChange={this.handleChange("lastName")}
                                        style={{marginRight:'1%', marginLeft: '1%'}}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        id="title"
                                        label="Title"
                                        onChange={this.handleChange("title")}
                                        value={this.state.title}
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
                                        value={this.state.phone}
                                        onChange={this.handleChange("phone")}
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
                                        value={this.state.email}
                                        onChange={this.handleChange("email")}
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
                                        value={this.state.department}
                                        label={"Department"}
                                        onChange={this.handleChange('department')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="dense"
                                        fullWidth
                                    >
                                        {department.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
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
                                        value={this.state.address}
                                        onChange={this.handleChange("address")}
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
                                        value={this.state.city}
                                        onChange={this.handleChange("city")}
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
                                        value={this.state.state}
                                        onChange={this.handleChange('state')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="dense"
                                        fullWidth
                                    >
                                        {State.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="zip"
                                        label="Zip"
                                        onChange={this.handleChange("zip")}
                                        value={this.state.zip}
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
                                value={this.state.userName}
                                onChange={this.handleChange("userName")}
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
                                <InputLabel variant={"outlined"} htmlFor="select-userGroup">User Group</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.userGroup}
                                    className={classes.textField}
                                    onChange={this.handleChange('userGroup')}
                                    input={<OutlinedInput id="select-userGroup" labelWidth={80}/>}
                                    margin="dense"
                                    MenuProps={MenuProps}
                                >
                                    {Group.map(name => (
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
                                    value={this.state.selectRegion}
                                    className={classes.textField}
                                    onChange={this.handleChange('selectRegion')}
                                    input={<OutlinedInput id="select-selectRegion" labelWidth={100}/>}
                                    margin="dense"
                                    MenuProps={MenuProps}
                                >
                                    {UserRegion.map(name => (
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
                                {State.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
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
                                    value={this.state.userRole}
                                    className={classes.textField}
                                    onChange={this.handleChange('userRole')}
                                    input={<OutlinedInput id="select-userRole" labelWidth={80}/>}
                                    margin="dense"
                                    MenuProps={MenuProps}
                                >
                                    {userRole.map(name => (
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
                                {userType.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
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
                                        label: 'Label',
                                        placeholder: 'With Popper',
                                        value: this.state.popper,
                                        onChange: this.handleAutoChange('popper'),
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
        openUsersForm : Actions.openUsersForm
    }, dispatch);
}

function mapStateToProps({usersApp, fuse})
{
    return {
        openUsersFormStatus: usersApp.users.openUsersFormStatus,
        navigation : fuse.navigation
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UsersForm));