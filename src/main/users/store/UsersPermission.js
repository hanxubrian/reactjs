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
                           <LocationCity/>
                       </ListItemIcon>
                       <ListItemText inset primary="Franchisees" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Franchisee List" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Transactions" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Leases" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Finders Fee" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Charge Backs" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Charge Back TAR" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Negative Dues" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Distributions" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="End of Month" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Franchisee Reports" />
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
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <CardMembership/>
                       </ListItemIcon>
                       <ListItemText inset primary="Customers" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Customer List" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Contracts" />
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
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <RingVolume/>
                       </ListItemIcon>
                       <ListItemText inset primary="Customer Service" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Customers" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Call list" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Cases" />
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
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <Language/>
                       </ListItemIcon>
                       <ListItemText inset primary="Regions" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Territories" />
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
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <Gamepad/>
                       </ListItemIcon>
                       <ListItemText inset primary="Sales" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Call list" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="leads" />
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
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <Build/>
                       </ListItemIcon>
                       <ListItemText inset primary="Operations" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Business Offering" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Account Work-Thrus" />
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
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Inspections" />
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
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <MonetizationOn/>
                       </ListItemIcon>
                       <ListItemText inset primary="Comissions" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Plans" />
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
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <Portrait/>
                       </ListItemIcon>
                       <ListItemText inset primary="Social Media" />
                   </ListItem>
                   <ListItem button onClick={this.handleClick} style={{borderBottom: "1px solid lightgray"}}>
                       <ListItemIcon>
                           <VerticalSplit/>
                       </ListItemIcon>
                       <ListItemText inset primary="Settings" />
                   </ListItem>
                   <List component="div" disablePadding>
                       <ListItem className={classes.nested}>
                           <ListItemText inset primary="Users" />
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
               </List>
            </div>
        );
    }
}

UsersPermission.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersPermission);