import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Icon from "@material-ui/core/es/Icon/Icon";
import menuOptions from "./menuOptions";


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="button" onClick={event => event.preventDefault()} {...props} />;
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
        checkedStatus:[],
        step: 0,
    };

    componentWillMount() {
        console.log("menu-options",menuOptions);
        const checkedStatus = [];
        {menuOptions.map(x => {
            checkedStatus["view_checked"+x.MenuId] = false;
            checkedStatus["create_checked"+x.MenuId] = false;
            checkedStatus["edit_checked"+x.MenuId] = false;
            checkedStatus["delete_checked"+x.MenuId] = false;
            checkedStatus["execute_checked"+x.MenuId] = false;
            { x.Children.map(x=>{
                checkedStatus["view_checked"+x.MenuId] = false;
                checkedStatus["create_checked"+x.MenuId] = false;
                checkedStatus["edit_checked"+x.MenuId] = false;
                checkedStatus["delete_checked"+x.MenuId] = false;
                checkedStatus["execute_checked"+x.MenuId] = false;
            })}
        })}

        this.setState({checkedStatus:checkedStatus});
        console.log("-------Checked Status----------",checkedStatus);
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleTabChange = (event, step) => {
        this.setState({ step });
    };

    handleCheckToggle = name => event => {
        let result = this.state.checkedStatus[name] = event.target.checked ;
        this.setState({ checkedStatus: result });
    };

    render() {
        const { classes } = this.props;
        const { step } = this.state;

        return (
            <NoSsr>
                <div className={classes.tabRoot}>
                    <AppBar color="default" position="static">
                        <Tabs variant="fullWidth" value={step} onChange={this.handleTabChange}>
                            <LinkTab icon={<Icon>web</Icon>}/>
                            <LinkTab icon={<Icon>phone</Icon>}/>
                            <LinkTab icon={<Icon>tablet</Icon>}/>
                        </Tabs>
                    </AppBar>
                    {step === 0 && <TabContainer>
                        <div>
                            <List
                                component="nav"
                                className={classes.listRoot}
                            >
                                <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                                    <ListItemText primary="Navigation Options" />
                                    <ListItemSecondaryAction>
                                        <span className={classes.textSpan}>View</span>
                                        <span className={classes.textSpan}>Create</span>
                                        <span className={classes.textSpan}>Edit</span>
                                        <span className={classes.textSpan}>Delete</span>
                                        <span className={classes.textSpan}>Execute</span>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {menuOptions.map(x => (
                                    <Fragment key={x.MenuId}>
                                        <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                                            <ListItemIcon>
                                                <Icon>{x.Icon}</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary={x.Title} />
                                        </ListItem>
                                        { x.Children.map(x=>(
                                            <List key={x.MenuId} component="div" disablePadding>
                                                <ListItem className={classes.nested}>
                                                    <ListItemText inset primary={x.Title} />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox
                                                            onChange={this.handleCheckToggle("view_checked"+x.MenuId)}
                                                            checked={this.state.checkedStatus["view_checked"+x.MenuId] || false}
                                                        />
                                                        <Checkbox
                                                            onChange={this.handleCheckToggle("create_checked"+x.MenuId)}
                                                            checked={this.state.checkedStatus["create_checked"+x.MenuId] || false}
                                                        />
                                                        <Checkbox
                                                            onChange={this.handleCheckToggle("edit_checked"+x.MenuId)}
                                                            checked={this.state.checkedStatus["edit_checked"+x.MenuId] || false}
                                                        />
                                                        <Checkbox
                                                            onChange={this.handleCheckToggle("delete_checked"+x.MenuId)}
                                                            checked={this.state.checkedStatus["delete_checked"+x.MenuId] || false}
                                                        />
                                                        <Checkbox
                                                            onChange={this.handleCheckToggle("execute_checked"+x.MenuId)}
                                                            checked={this.state.checkedStatus["execute_checked"+x.MenuId] || false}
                                                        />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </List>
                                        ))}
                                    </Fragment>
                                ))}
                            </List>
                        </div>
                    </TabContainer>}
                    {step === 1 && <TabContainer>
                        <div>
                            <List
                                component="nav"
                                className={classes.listRoot}
                            >
                                <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                                    <ListItemText primary="Navigation Options" />
                                    <ListItemSecondaryAction>
                                        <span className={classes.textSpan}>View</span>
                                        <span className={classes.textSpan}>Create</span>
                                        <span className={classes.textSpan}>Edit</span>
                                        <span className={classes.textSpan}>Delete</span>
                                        <span className={classes.textSpan}>Execute</span>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {menuOptions.map(x => (
                                    <Fragment key={x.MenuId}>
                                        <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                                            <ListItemIcon>
                                                <Icon>{x.Icon}</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary={x.Title} />
                                        </ListItem>
                                        { x.Children.map(x=>(
                                            <List key={x.MenuId} component="div" disablePadding>
                                                <ListItem className={classes.nested}>
                                                    <ListItemText inset primary={x.Title} />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </List>
                                        ))}
                                    </Fragment>
                                ))}
                            </List>
                        </div>
                    </TabContainer>}
                    {step === 2 && <TabContainer>
                        <div>
                            <List
                                component="nav"
                                className={classes.listRoot}
                            >
                                <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                                    <ListItemText primary="Navigation Options" />
                                    <ListItemSecondaryAction>
                                        <span className={classes.textSpan}>View</span>
                                        <span className={classes.textSpan}>Create</span>
                                        <span className={classes.textSpan}>Edit</span>
                                        <span className={classes.textSpan}>Delete</span>
                                        <span className={classes.textSpan}>Execute</span>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {menuOptions.map(x => (
                                    <Fragment key={x.MenuId}>
                                        <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                                            <ListItemIcon>
                                                <Icon>{x.Icon}</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary={x.Title} />
                                        </ListItem>
                                        { x.Children.map(x=>(
                                            <List key={x.MenuId} component="div" disablePadding>
                                                <ListItem className={classes.nested}>
                                                    <ListItemText inset primary={x.Title} />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            //onChange={this.handleToggle(value)}
                                                            checked={true}
                                                        />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </List>
                                        ))}
                                    </Fragment>
                                ))}
                            </List>
                        </div>
                    </TabContainer>}
                </div>
            </NoSsr>

        );
    }
}

UsersPermission.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersPermission);