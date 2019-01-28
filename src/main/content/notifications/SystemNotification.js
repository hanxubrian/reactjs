import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';
import authService from '../../../services';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const styles = theme => ({
    layoutRoot: {
        position                      : 'absolute',
        width                         : 350,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 250,
        height                        : '400px',
        minHeight                     : '100%',
        bottom                        : 0,
        right                         : 100,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(50px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition  : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.close'                    : {
            transform: 'translateX(450px)'
        }
    },
    sysnotification:{
        position        : 'absolute',
        width           : '357px',
        height          : '386px',
        right           : '40px',
        top             : '85%',
    }
});

class SystemNotification extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className={classes.root}>

                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(SystemNotification);
