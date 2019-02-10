import React, {Fragment} from 'react';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Icon from "@material-ui/core/es/Icon/Icon";


function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


function LinkTab(props) {
    return <Tab style={{width: '100%',maxWidth:'33.3333%'}} component="button" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    listRoot: {
        width: '100%',
        maxWidth: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    textSpan: {
        marginLeft: "5px",
        marginRight: "5px"
    },
    tabRoot: {
        flexGrow: 1,
        border: '1px solid lightgrey',
        marginTop: '10px'
        //backgroundColor: theme.palette.background.paper,
    }
});

class UsersPermission extends React.Component {
    state = {
        open: true,
        checkedStatus: [],
        step: 0,
        UserPermission:[],
    };

    componentWillMount() {
        this.props.getUserPermissionList();
    }


    componentWillReceiveProps(nextProps, nextContext) {

        let checkedStatus = {};

        if ( nextProps.userPermissionList !== this.props.userPermissionList )
        {
            if(nextProps.userPermissionList !== null)
            {
                this.state.UserPermission = nextProps.userPermissionList;

                nextProps.userPermissionList.forEach((x, xIndex) => {
                    x.menuOptions.forEach((y,yIndex)=>{
                        y.Children.forEach((z, zIndex) => {
                            checkedStatus[`view_${xIndex}_${yIndex}_${zIndex}`] = false;
                            checkedStatus[`create_${xIndex}_${yIndex}_${zIndex}`] = false;
                            checkedStatus[`edit_${xIndex}_${yIndex}_${zIndex}`] = false;
                            checkedStatus[`delete_${xIndex}_${yIndex}_${zIndex}`] = false;
                            checkedStatus[`execute_${xIndex}_${yIndex}_${zIndex}`] = false;
                        })
                    })
                })

                this.setState({checkedStatus});
            }
        }
    }

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleTabChange = (event, step) => {
        this.setState({step});
    };

    handleCheckToggle = (name) => event => {

        const checked = event.target.checked

        this.setState({
            checkedStatus: {
                ...this.state.checkedStatus,
                [name] : checked
            }
        })
    };

    render() {
        const {classes} = this.props;
        const {step, checkedStatus,UserPermission} = this.state;

        return (
            <NoSsr>
                <div className={classes.tabRoot}>
                    <AppBar color="default" position="static">
                        <Tabs variant="fullWidth" value={step} onChange={this.handleTabChange}>
                            {UserPermission.map(x=>(
                                <LinkTab key={x._id} label={x.name}/>
                            ))}
                        </Tabs>
                    </AppBar>
                    {UserPermission.map((x,index)=>(
                        <TabContainer key={x._id}>
                        {step === index &&
                          <div>
                            <List
                            component="nav"
                            className={classes.listRoot}
                            >
                            <ListItem button onClick={this.handleClick}
                            style={{borderBottom: "1px solid lightgray"}}>
                                <ListItemText primary="Navigation Options"/>
                                    <ListItemSecondaryAction>
                                        <span className={classes.textSpan}>View</span>
                                        <span className={classes.textSpan}>Create</span>
                                        <span className={classes.textSpan}>Edit</span>
                                        <span className={classes.textSpan}>Delete</span>
                                        <span className={classes.textSpan}>Execute</span>
                                    </ListItemSecondaryAction>
                            </ListItem>
                            {x.menuOptions.map((x, pIndex) => (
                                <Fragment key={x.MenuId}>
                                    <ListItem button onClick={this.handleClick}
                                              style={{borderBottom: "1px solid lightgray"}}>
                                        <ListItemIcon>
                                            <Icon>{x.Icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText inset primary={x.Title}/>
                                    </ListItem>
                                    {x.Children.map((x, cIndex) => (
                                        <List key={x.MenuId} component="div" disablePadding>
                                            <ListItem className={classes.nested}>
                                                <ListItemText inset primary={x.Title}/>
                                                <ListItemSecondaryAction>
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`view_${index}_${pIndex}_${cIndex}`)}
                                                        checked={checkedStatus[`view_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`create_${index}_${pIndex}_${cIndex}`)}
                                                        checked={checkedStatus[`create_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`edit_${index}_${pIndex}_${cIndex}`)}
                                                        checked={checkedStatus[`edit_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`delete_${index}_${pIndex}_${cIndex}`)}
                                                        checked={checkedStatus[`delete_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`execute_${index}_${pIndex}_${cIndex}`)}
                                                        checked={checkedStatus[`execute_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    ))}
                                </Fragment>
                            ))}
                            </List>
                          </div>
                        }
                        </TabContainer>
                    ))}
                </div>
            </NoSsr>

        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUserPermissionList: Actions.getUserPermissionList,
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        userPermissionList: usersApp.users.userPermissionList,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UsersPermission));
