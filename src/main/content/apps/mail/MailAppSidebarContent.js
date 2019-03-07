import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Icon, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
import RateReviewIcon from '@material-ui/icons/RateReview';
import classNames from 'classnames';

const styles = theme => ({
    listWrapper  : {},
    listItem     : {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
        }
    },
    listSubheader: {
        paddingRight: 24,
        paddingLeft : 24
    },
    composeButton     : {
        width: '100%'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20
    }
});

class MailAppSidebarContent extends Component {


    clickCompose = ()=>{
        this.props.history.push('compose');
    }

    render(){
        const {classes, folders, filters, labels} = this.props;

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={400}>
                <div>
                    <div className="p-24">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.composeButton}
                            onClick={this.clickCompose}
                            size="large"
                        >
                            <RateReviewIcon  className={classNames(classes.leftIcon, classes.iconSmall)} />
                            COMPOSE
                        </Button>
                    </div>

                    <div className={classes.listWrapper}>

                        <List>

                            <ListSubheader className={classes.listSubheader} disableSticky>FOLDERS</ListSubheader>

                            {folders.length > 0 && folders.map((folder) => (
                                <ListItem
                                    button
                                    component={NavLink}
                                    to={'/apps/mail/' + folder.handle} key={folder.id}
                                    activeClassName="active"
                                    className={classes.listItem}
                                >
                                    <Icon className="list-item-icon" color="action">{folder.icon}</Icon>
                                    <ListItemText primary={folder.title} disableTypography={true}/>
                                </ListItem>
                            ))}
                        </List>

                        <List>

                            <ListSubheader className={classes.listSubheader} disableSticky>FILTERS</ListSubheader>

                            {filters.length > 0 && filters.map((filter) => (
                                <ListItem
                                    button
                                    component={NavLink}
                                    to={'/apps/mail/filter/' + filter.handle}
                                    activeClassName="active"
                                    className={classes.listItem}
                                    key={filter.id}
                                >
                                    <Icon className="list-item-icon" color="action">{filter.icon}</Icon>
                                    <ListItemText primary={filter.title} disableTypography={true}/>
                                </ListItem>
                            ))}
                        </List>

                        <List>

                            <ListSubheader className={classes.listSubheader} disableSticky>LABELS</ListSubheader>

                            {labels && labels.map((label) => (
                                <ListItem
                                    button
                                    component={NavLink}
                                    to={'/apps/mail/label/' + label.handle}
                                    key={label.id}
                                    className={classes.listItem}
                                >
                                    <Icon className="list-item-icon" style={{color: label.color}} color="action">label</Icon>
                                    <ListItemText primary={label.title} disableTypography={true}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </FuseAnimate>
        );
    }

}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleCompose: Actions.toggleCompose
    }, dispatch);
}

function mapStateToProps({mailApp})
{
    return {
        folders: mailApp.folders,
        labels : mailApp.labels,
        filters: mailApp.filters,
        toggleCompose: mailApp.compose.toggleCompose
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailAppSidebarContent)));