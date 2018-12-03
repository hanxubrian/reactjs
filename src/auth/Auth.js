import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';

class Auth extends Component {
    /*eslint-disable-next-line no-useless-constructor*/
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            logout             : userActions.logoutUser,
            setUserData        : userActions.setUserData,
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
