import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';
import authService from '../../../services';

const styles = theme => ({
    layoutRoot: {}
});

class Example extends Component {
    componentWillMount() {
        if(!authService.isAuthenticated())
            this.props.history.push('/auth/signin/');
    }

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="spinner-wrapper">
                        <div className="spinner">
                            <div className="inner">
                                <div className="gap"/>
                                <div className="left">
                                    <div className="half-circle"/>
                                </div>
                                <div className="right">
                                    <div className="half-circle"/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Example);
