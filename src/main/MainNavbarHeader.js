import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    root      : {
        display                       : 'flex',
        alignItems                    : 'center',
        '& .logo-text, & .react-badge': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    logo      : {},
    logoIcon  : {
        width     : 24,
        height    : 24,
        transition: theme.transitions.create(['width', 'height'], {
            duration: theme.transitions.duration.shortest,
            easing  : theme.transitions.easing.easeInOut
        })
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color          : '#61dafb'
    },
    logoIconText:{
        width: 128,
        height: 22
    }
});

function MainNavbarHeader({classes})
{
    return (
        <div className={classes.root}>
            <div className={classNames(classes.logo, "flex items-center")}>
                <Typography className="text-24 ml-8 font-light logo-text" color="inherit">JaniKing Apps</Typography>
            </div>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(withRouter(MainNavbarHeader));
