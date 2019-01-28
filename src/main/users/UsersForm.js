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
        value: "Buffalo",
        label: "Buffalo"
    },
    {
        value: "New York",
        label: "NewYork"
    },
    {
        value: "Kansas",
        label: "Kansas"
    },
    {
        value: "Ohio",
        label: "Ohio"
    },
    {
        value: "Georgia",
        label: "Georgia"
    },
    {
        value: "Texas",
        label: "Texas"
    },
    {
        value: "Florida",
        label: "Florida"
    }
];

const Group = [
    {
        value: 0,
        label: 'All Groups',
    },
    {
        value: 1,
        label: 'Group 1',
    },
    {
        value: 2,
        label: 'Group 2',
    },
    {
        value: 3,
        label: 'Group 3',
    },
    {
        value: 4,
        label: 'Group 4',
    },
];


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
        selectRegion: '',
        userGroup: '',
        defaultRegion: ''
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
                    <h2>User Account</h2>
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
                    <h2>User Group</h2>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="userGroup"
                                label={"userGroup"}
                                select
                                variant={"outlined"}
                                className={classes.textField}
                                value={this.state.userGroup}
                                onChange={this.handleChange('userGroup')}
                                style={{marginRight:"1%"}}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="dense"
                                fullWidth
                            >
                                {Group.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="selectRegion"
                                label={"Select Region"}
                                select
                                variant={"outlined"}
                                className={classes.textField}
                                value={this.state.selectRegion}
                                onChange={this.handleChange('selectRegion')}
                                style={{marginLeft:"1%",marginRight:"1%"}}
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
                    <h2>User Role</h2>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="userRole"
                                label="User Role"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.userRole}
                                onChange={this.handleChange("userRole")}
                                margin="dense"
                                required
                            />
                        </GridItem>
                    </GridContainer>
                </div>
                <div className={classNames(classes.userFormSection,"w-full")}>
                    <h2>User Permission</h2>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            {/*<TextField*/}
                                {/*id="userRole"*/}
                                {/*label="User Role"*/}
                                {/*variant="outlined"*/}
                                {/*className={classes.textField}*/}
                                {/*value={this.state.userRole}*/}
                                {/*onChange={this.handleChange("userRole")}*/}
                                {/*margin="dense"*/}
                                {/*required*/}
                            {/*/>*/}
                        </GridItem>
                    </GridContainer>
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

function mapStateToProps({usersApp})
{
    return {
        openUsersFormStatus: usersApp.users.openUsersFormStatus
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UsersForm));