import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    iframe:{
        height: '1000px'
    }
});

class Transactions extends Component {
    render()
    {
        const {classes} = this.props;

        return (
           <div>This is transaction page</div>
        );
    }
}

function mapStateToProps({auth, fuse})
{
    return {
        iframeURL: fuse.navbar.iframeURL
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, null)(Transactions)));
