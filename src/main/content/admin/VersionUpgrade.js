import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';
import authService from '../../../services';


import {Icon, IconButton,Button, Fab,ClickAwayListener, Input, Paper, Typography,CircularProgress,MenuItem,InputLabel ,OutlinedInput , FormControl, Select} from '@material-ui/core';
const styles = theme => ({
    layoutRoot: {}
});

class VersionUpgrade extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(VersionUpgrade);
