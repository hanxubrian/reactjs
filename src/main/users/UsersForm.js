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
    //minWidth: 120,
    //maxWidth: 300,
}
});


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

const appList = [
    'Web APP',
    'Mobile APP'
]


const userRole = [
    'Admin-User',
    'Guest',
    'Editor',
    'Contractor',
    'Subscriber',
];

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
        appPermission: []
    };


    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };



    render()
    {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h2>User Profile</h2>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row justify-center">
                            <UserAvatar/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
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
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
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
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h4>APP Permission</h4>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <FormControl style={{width:"100%"}} className={classes.multiSelectControl}>
                                <InputLabel variant={"outlined"}  htmlFor="select-appPermission">Select APP Permission</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.appPermission}
                                    className={classes.textField}
                                    onChange={this.handleChange('appPermission')}
                                    input={<OutlinedInput id="select-appPermission" labelWidth={170}/>}
                                    margin="dense"
                                    MenuProps={MenuProps}
                                >
                                    {appList.map(name => (
                                        <MenuItem key={name} value={name} >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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