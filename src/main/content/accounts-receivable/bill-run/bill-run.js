import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    iframe:{
        height: '1000px'
    }
});

class BillRun extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <div/>
        );
    }
}


function mapStateToProps({billrun})
{
    return {

    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, null)(BillRun)));
