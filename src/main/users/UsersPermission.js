import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Exposure from '@material-ui/icons/Exposure';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Visibility from '@material-ui/icons/Visibility';
import LocationCity from '@material-ui/icons/LocationCity';
import CardMembership from '@material-ui/icons/CardMembership';
import RingVolume from '@material-ui/icons/RingVolume';
import Language from '@material-ui/icons/Language';
import Gamepad from '@material-ui/icons/Gamepad';
import Build from '@material-ui/icons/Build';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Portrait from '@material-ui/icons/Portrait';
import VerticalSplit from '@material-ui/icons/VerticalSplit';
import HowToVote from '@material-ui/icons/HowToVote';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Icon from "@material-ui/core/es/Icon/Icon";
import menuOptions from "./menuOptions";


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        //backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    textSpan: {
        marginLeft: "5px",
        marginRight: "5px"
    }
});

class UsersPermission extends React.Component {
    state = {
        open: true,
    };

    componentWillMount() {
        console.log("menu-options",menuOptions);
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
               <List
                    component="nav"
                    className={classes.root}
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
        );
    }
}

UsersPermission.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersPermission);