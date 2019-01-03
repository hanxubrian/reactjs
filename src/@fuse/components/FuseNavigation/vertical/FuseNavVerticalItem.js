import React, {Component}  from 'react';
import {Icon, ListItem, ListItemText} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import {NavLink, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import FuseNavBadge from './../FuseNavBadge';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';

const propTypes = {
    item: PropTypes.shape(
        {
            Slug   : PropTypes.string.isRequired,
            Title: PropTypes.string,
            Icon : PropTypes.string,
            url  : PropTypes.string
        })
};

const defaultProps = {};

const styles = theme => ({
    item: {
        height                     : 40,
        width                      : 'calc(100% - 16px)',
        borderRadius               : '0 20px 20px 0',
        paddingRight               : 12,
        '&.active'                 : {
            backgroundColor            : theme.palette.secondary.main,
            color                      : theme.palette.secondary.contrastText + '!important',
            pointerEvents              : 'none',
            transition                 : 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon'        : {
                color: 'inherit'
            }
        },
        '&.square, &.active.square': {
            width       : '100%',
            borderRadius: '0'
        },
        '& .list-item-icon'        : {color:'white!important'},
        '& .list-item-text'        : {color:'white!important'},
        '& .list-item-text-primary': {
            color: 'white!important'
        },
        color                      : 'white!important',
        textDecoration             : 'none!important'
    }
});


class FuseNavVerticalItem extends Component
{

    handleClick(prop, url) {
        prop();

        if(url !== '')
            this.props.selectIframe(url);
    }

    render() {
        const {item, classes, nestedLevel, userRole, navbarCloseMobile, active} = this.props;

        if (item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest')))) {
            return null;
        }
        let paddingValue = 40 + (nestedLevel * 16);
        const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

        let url = item.url;
        if(item.MenuId>40) {
            url = `/${item.Slug}`;
        }
        if(item.Slug === 'calendar' || item.Slug === 'contacts' || item.Slug === 'mail' || item.Slug === 'profile' )
            return null;

        return (

                 <ListItem
                     button
                     component={NavLink}
                     to={url}
                     activeClassName="active"
                     className={classNames(classes.item, listItemPadding, 'list-item', active)}
                     onClick={() => this.handleClick(navbarCloseMobile, item.IframeUrl)}
                     exact={item.exact}
                 >
                     {item.Icon && item.Icon.trim() !== "" && (
                         <Icon className="list-item-icon text-16 flex-no-shrink" color="action">{item.Icon}</Icon>
                     )}
                     <ListItemText className="list-item-text" primary={item.Title}
                                   classes={{primary: 'text-14 list-item-text-primary'}}/>
                     {item.badge && (
                         <FuseNavBadge badge={item.badge}/>
                     )}
                 </ListItem>
             );

    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        navbarCloseMobile: Actions.navbarCloseMobile,
        selectIframe: Actions.selectIframe

    }, dispatch);
}

function mapStateToProps({auth, fuse})
{
    return {
        userRole: auth.user.role,
        iframeURL: fuse.navbar.iframeURL
    }
}

FuseNavVerticalItem.propTypes = propTypes;
FuseNavVerticalItem.defaultProps = defaultProps;

const NavVerticalItem = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseNavVerticalItem)));

export default NavVerticalItem;
