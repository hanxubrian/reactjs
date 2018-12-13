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
            id   : PropTypes.string.isRequired,
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
        '& .list-item-icon'        : {},
        '& .list-item-text'        : {},
        color                      : 'inherit!important',
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
        const {item, classes, nestedLevel, userRole, navbarCloseMobile, active, cur_path} = this.props;

        if (item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest')))) {
            return null;
        }
        let paddingValue = 40 + (nestedLevel * 16);
        const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';
        let active1 = '';

        let browserList = '';
        if (item.BrowserRouter && item.BrowserRouter.length)
            browserList = item.BrowserRouter[0];


        let url = item.url;
        if(item.MenuId>40) {
            url = `/bill-run?id=${item.MenuId}`;
        }

        if (browserList!=='')
            active1 = url === `${cur_path.pathname}${cur_path.search}` ? 'active':'';

        return (

            <ListItem
                button
                component={NavLink}
                to={url}
                activeClassName="active"
                className={classNames(classes.item, listItemPadding, 'list-item', active1)}
                onClick={() => this.handleClick(navbarCloseMobile, browserList)}
                exact={item.exact}
            >
                {item.Icon && (
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
