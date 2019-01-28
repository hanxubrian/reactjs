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

const styles = theme => ({
    root     : {
        display : 'flex',
        flexWrap: 'wrap',
        width   : '80%',
        margin  : 'auto',
        marginTop: '50px'
    },
    margin   : {
        margin: theme.spacing.unit
    },
    userFormSection: {
        marginBottom : '10px'
    }
});

class UsersForm extends React.Component {
    state = {
        firstName: '',
        lastName : '',
        title : '',
        email : '',
        department: '',
        phone : '',
        address: '',
        state: '',
        city : '',
        zip : '',
        userName: '',
        accPassword: '',
        outlookUserName: '',
        outlookPassword: '',
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
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
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
                                label="Department"
                                onChange={this.handleChange("department")}
                                value={this.state.department}
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
                                label="State"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.state}
                                onChange={this.handleChange("state")}
                                style={{marginRight:'1%', marginLeft: '1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
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
                    <h2>Outlook Account</h2>
                    <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                        <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                            <TextField
                                id="outlookUserName"
                                label="User Name"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.outlookUserName}
                                onChange={this.handleChange("outlookUserName")}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                            <TextField
                                id="outlookPassword"
                                label="Password"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.outlookPassword}
                                onChange={this.handleChange("outlookPassword")}
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
                                label="User Group"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.userGroup}
                                onChange={this.handleChange("userGroup")}
                                style={{marginRight:'1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                            <TextField
                                id="selectRegion"
                                label="Select Region"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.selectRegion}
                                onChange={this.handleChange("selectRegion")}
                                style={{marginLeft: '1%', marginRight: '1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
                            <TextField
                                id="defaultRegion"
                                label="Default Region"
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.defaultRegion}
                                onChange={this.handleChange("defaultRegion")}
                                style={{marginLeft: '1%'}}
                                margin="dense"
                                fullWidth
                                required
                            />
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