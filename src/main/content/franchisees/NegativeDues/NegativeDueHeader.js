import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Icon,
    Typography,
    Button,
    CircularProgress
} from '@material-ui/core';
import {withStyles} from "@material-ui/core";

import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import {bindActionCreators} from "redux";
import classNames from 'classnames';


const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    btntop: {
        marginRight: 20
    },
    iconSmall: {
        fontSize: 20,
    }
});


class NegativeDueHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
           HeaderIcon: ""
        };
    }

    componentWillMount() {

        this.props.nav.map(item=>{
            if(item.TabName==="Franchisees"){
                this.setState({HeaderIcon: item.Icon});
            }
        });
    }
    render() {
        const {classes} = this.props;
        const { HeaderIcon} = this.state;
        return(
            <div className={classNames("flex w-full items-center")}>
                <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                    <div className="flex flex-row flex-1 justify-between">
                        <div className="flex flex-shrink items-center">
                            <div className="flex items-center">
                                <Icon className="text-32 mr-12">{HeaderIcon}</Icon>
                                <Typography variant="h6" className="hidden sm:flex">Franchisee |
                                    Negative Dues</Typography>
                            </div>
                        </div>
                        <div className="flex flex-shrink items-center">
                            
                            <Button variant="contained" color="primary"
                                    className={classNames(classes.button, classes.btntop)} >
                                ADD
                                <Icon className={classes.rightIcon}>add</Icon>
                            </Button>
                        </div>
                    </div>

                </div>                
            </div>            
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

function mapStateToProps({verifications, auth, fuse, transactions}) {
    return {
        nav: fuse.navigation,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(NegativeDueHeader)));