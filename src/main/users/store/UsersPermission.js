import React from 'react';
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
import HowToVote from '@material-ui/icons/HowToVote';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '400px',
        //backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class UsersPermission extends React.Component {
    state = {
        open: true,
    };

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
                       <ListItemIcon>
                           <Exposure/>
                       </ListItemIcon>
                       <ListItemText inset primary="Corporate Accounting" />
                   </ListItem>
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <AccountBalance/>
                       </ListItemIcon>
                       <ListItemText inset primary="Accounts Receivable" />
                   </ListItem>
                   <List component="div" disablePadding>
                        <ListItem className={classes.nested}>
                            <ListItemText inset primary="Invoices" />
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
                            </ListItemSecondaryAction>
                        </ListItem>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Bill Run" />
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
                           </ListItemSecondaryAction>
                       </ListItem>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Payments" />
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
                           </ListItemSecondaryAction>
                       </ListItem>
                   </List>
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <Visibility/>
                       </ListItemIcon>
                       <ListItemText inset primary="Activity" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Verifications" />
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
                           </ListItemSecondaryAction>
                       </ListItem>
                   </List>
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <HowToVote/>
                       </ListItemIcon>
                       <ListItemText inset primary="Accounts Payable" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Vendors" />
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
                           </ListItemSecondaryAction>
                       </ListItem>
                   </List>
               </List>
            </div>
        );
    }
}

UsersPermission.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersPermission);