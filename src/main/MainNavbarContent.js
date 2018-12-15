import React, {Component}  from 'react';
import {withStyles, AppBar, Typography, Avatar, Hidden} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseNavigation, FuseLayouts} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width     : 72,
        height    : 72,
        position  : 'absolute',
        top       : 92,
        padding   : 8,
        background: theme.palette.background.default,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        '& > img' : {
            borderRadius: '50%'
        }
    },
    logoIconText:{
        width: 184,
        height: 131
    },
    logofull:{
        justifyContent: 'center',
        flexDirection: 'column',
        height: 152
    },
    logoIcon  : {
        width     : 32,
        height    : 32,
        transition: theme.transitions.create(['width', 'height'], {
            duration: theme.transitions.duration.shortest,
            easing  : theme.transitions.easing.easeInOut
        })
    },
});


// function MainNavbar({classes, navigation, layoutStyle, user})
class MainNavbar extends Component{
    constructor(props)
    {
        super(props);
    }

    UserHeader()
    {
        const {classes, user} = this.props;
        return (
            <AppBar
                position="static"
                color="primary"
                elevation={0}
                className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
            >
                <Typography className="username text-16 whitespace-no-wrap" color="inherit">{user.data.displayName}</Typography>
                <Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{user.data.email}</Typography>
                <Avatar
                    className={classNames(classes.avatar, "avatar")}
                    alt="user photo"
                    src={user.data.photoURL && user.data.photoURL !== '' ? user.data.photoURL : "assets/images/avatars/profile.jpg"}
                />
            </AppBar>
        );
    }

    RegionHeader(){
        const {classes} = this.props;
        let region_name = '';
        if(this.props.login.IsSuccess){
            this.props.login.all_regions.forEach(region=>{
                if(parseInt(this.props.login.defaultRegionId) === region.RegionId) {
                    region_name = region.Displayname;
                    return false;
                }
            })
        }

        return (
            <div className={classNames(classes.logofull, "flex items-center")}>
                <img className={classNames(classes.logoIcon, "logo-icon-1 mt-8 showInitial navBarShownClosed")} src="assets/images/logos/logo.png" alt="logo"/>
                <img className={classNames(classes.logoIconText, "logo-icon-large")} src="assets/images/logos/logo-full.png" alt="logo"/>
                <Typography className="logo-icon-large">{region_name}</Typography>
            </div>
        )
    };

    render(){
        const {classes, navigation, layoutStyle} = this.props;
        const navigationLayout = FuseLayouts[layoutStyle].type;
        return (
            <div className={classes.root}>
                {navigationLayout === 'vertical' ? (
                    <React.Fragment>
                        {this.RegionHeader()}
                        <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Hidden lgUp>
                            {this.UserHeader()}
                        </Hidden>
                        <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                    </React.Fragment>
                )}

            </div>
        );
    }

}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        navigation : fuse.navigation,
        layoutStyle: fuse.settings.current.layout.style,
        user       : auth.user,
        login      : auth.login
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNavbar)));
