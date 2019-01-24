import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    iframe:{
        height: '1000px'
    }
});

class VerificationsApp extends Component {

    render()
    {
        const {classes, iframeURL} = this.props;

        console.log('props=', this.props);
        return (
            <div>
                <h1>Verifications APP!</h1>
            </div>
        );
    }
}


function mapStateToProps({auth, fuse})
{
    return {
        iframeURL: fuse.navbar.iframeURL
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, null)(VerificationsApp)));
