import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Icon, MenuItem, TextField} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    root             : {},
    logo             : {},
    logoIcon         : {
        fontSize: '32px!important'
    },
    logoText         : {
        fontSize: 24
    },
    accountSelect    : {},
    accountSelectMenu: {}
});

class MailAppSidebarHeader extends Component {

    state = {
        selectedAccount: 'creapond'
    };
    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-col justify-center h-full p-24")}>

                <div className={classNames(classes.logo, "flex items-center flex-1")}>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className={classNames(classes.logoIcon, "mr-16")}>mail</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <span className={classes.logoText}>Mailbox</span>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MailAppSidebarHeader);
