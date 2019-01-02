import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    iframe:{
        height: '1000px'
    }
});

class Distributions extends Component {
    render()
    {
        const {classes, iframeURL} = this.props;

        console.log('props=', this.props);
        return (
           <iframe title="iframe-distributions" src={iframeURL} className={classes.iframe}></iframe>
        );
    }
}

function mapStateToProps({auth, fuse})
{
    return {
        iframeURL: fuse.navbar.iframeURL
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, null)(Distributions)));