import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import classNames from 'classnames';

const styles = theme => ({
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    },
    marginTopItem: {
       marginTop: 25
    },
    marginBottomItem:{
        marginBottom: 30
    }
});

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

const Role = [
    {
        value: 0,
        label: 'All Roles',
    },
    {
        value: 1,
        label: 'Admin',
    },
    {
        value: 2,
        label: 'Customer',
    },
    {
        value: 3,
        label: 'Guest',
    },
    {
        value: 4,
        label: 'Contractor',
    },
];

const Region = [
    {
        value: 0,
        label: 'All Regions',
    },
    {
        value: 1,
        label: 'New York',
    },
    {
        value: 2,
        label: 'Buffalo',
    },
    {
        value: 3,
        label: 'LosAngels',
    },
    {
        value: 4,
        label: 'Miami',
    },
];

class UsersSidebarContent extends Component {

    state = {
        GroupName: 0,
        RoleName: 0,
        RegionName: 0
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render()
    {
        const {GroupName , RoleName , RegionName} = this.state;
        const {classes} = this.props;
        return (
            <div >
               <div className="p-24 flex items-center">
                            <h2>FILTER PANEL</h2>
                        </div>
               <List>
                            <ListItem
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-20 bold" color="action">group</Icon>
                                <ListItemText className="truncate text-18 bold pr-0" primary="Filter by Group" disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <TextField
                                    id="filter-group-name"
                                    select
                                    variant={"outlined"}
                                    className={classes.textField}
                                    value={GroupName}
                                    onChange={this.handleChange('GroupName')}
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
                            </ListItem>
                            <ListItem
                                activeClassName="active"
                                className={classNames(classes.listItem,classes.marginTopItem)}
                            >
                                <Icon className="list-item-icon text-20 bold" color="action">location_city</Icon>
                                <ListItemText className="truncate text-18 bold pr-0" primary="Filter by Region" disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <TextField
                                    id="filter-group-name"
                                    select
                                    variant={"outlined"}
                                    className={classes.textField}
                                    value={RegionName}
                                    onChange={this.handleChange('RegionName')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="dense"
                                    fullWidth
                                >
                                    {Region.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ListItem>
                            <ListItem
                                activeClassName="active"
                                className={classNames(classes.listItem,classes.marginTopItem)}
                            >
                                <Icon className="list-item-icon text-20 bold" color="action">person_pin_circle</Icon>
                                <ListItemText className="truncate pr-0 text-18 bold" primary="Filter by Role" disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                activeClassName="active"
                                className={classNames(classes.listItem,classes.marginBottomItem)}
                            >
                                <TextField
                                    id="filter-role-name"
                                    select
                                    variant={"outlined"}
                                    className={classes.textField}
                                    value={RoleName}
                                    onChange={this.handleChange('RoleName')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="dense"
                                    fullWidth
                                >
                                    {Role.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ListItem>
                        </List>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        user: contactsApp.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersSidebarContent)));
