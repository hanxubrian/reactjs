import React, {Component} from 'react';
import { Typography, Icon, IconButton, withStyles} from '@material-ui/core';
import {FuseScrollbars, FuseSettings} from '@fuse';

const styles = theme => ({
});
class SettingsPanel extends Component {
    state = {
        open: false
    };

    render()
    {
        return (
            <React.Fragment>
                    <FuseScrollbars className="p-24 sm:p-32">
                        <IconButton className="fixed pin-t pin-r z-10" onClick={this.handleClose}>
                            <Icon>close</Icon>
                        </IconButton>

                        <Typography className="mb-32" variant="h6">Theme Settings</Typography>

                        <FuseSettings/>

                    </FuseScrollbars>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SettingsPanel);
