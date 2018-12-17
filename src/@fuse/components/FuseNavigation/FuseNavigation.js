import React, {Component} from 'react';
import FuseNavVerticalGroup from './vertical/FuseNavVerticalGroup';
import FuseNavVerticalCollapse from './vertical/FuseNavVerticalCollapse';
import FuseNavVerticalItem from './vertical/FuseNavVerticalItem';
import FuseNavHorizontalGroup from './horizontal/FuseNavHorizontalGroup';
import FuseNavHorizontalCollapse from './horizontal/FuseNavHorizontalCollapse';
import FuseNavHorizontalItem from './horizontal/FuseNavHorizontalItem';
import {Divider, List, Hidden} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
    navigation: PropTypes.array.isRequired
};

const defaultProps = {
    layout: "vertical"
};

class FuseNavigation extends Component {
    render()
    {
        const {navigation, layout, active} = this.props;

        const verticalNav = (
            <List className="whitespace-no-wrap">
                {
                    navigation.map((item) => (

                        <React.Fragment key={item.Slug}>

                            {item.Type === 'group' && (
                                <FuseNavVerticalGroup item={item} nestedLevel={0} active={active}/>
                            )}

                            {item.Type === 'collapse' && (
                                <FuseNavVerticalCollapse item={item} nestedLevel={0} active={active}/>
                            )}

                            {item.Type === 'item' && (
                                <FuseNavVerticalItem item={item} nestedLevel={0} active={active}/>
                            )}

                            {item.Type === 'divider' && (
                                <Divider className="my-16"/>
                            )}
                        </React.Fragment>
                    ))
                }
            </List>
        );

        const horizontalNav = (
            <List className="whitespace-no-wrap flex p-0">
                {
                    navigation.map((item) => (

                        <React.Fragment key={item.Slug}>

                            {item.Type === 'group' && (
                                <FuseNavHorizontalGroup item={item} nestedLevel={0}/>
                            )}

                            {item.Type === 'collapse' && (
                                <FuseNavHorizontalCollapse item={item} nestedLevel={0}/>
                            )}

                            {item.Type === 'item' && (
                                <FuseNavHorizontalItem item={item} nestedLevel={0}/>
                            )}

                            {item.Type === 'divider' && (
                                <Divider className="my-16"/>
                            )}
                        </React.Fragment>
                    ))
                }
            </List>
        );


        if ( navigation.length > 0 )
        {
            switch ( layout )
            {
                case 'horizontal':
                {
                    return (
                        <React.Fragment>
                            <Hidden lgUp>
                                {verticalNav}
                            </Hidden>
                            <Hidden mdDown>
                                {horizontalNav}
                            </Hidden>
                        </React.Fragment>
                    )
                }
                case 'vertical':
                default:
                {
                    return verticalNav;
                }
            }
        }
        else
        {
            return '';
        }
    }
}

FuseNavigation.propTypes = propTypes;
FuseNavigation.defaultProps = defaultProps;

export default withRouter(FuseNavigation);
