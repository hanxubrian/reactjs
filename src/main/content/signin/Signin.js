import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {FuseAnimate} from '@fuse';
import * as Actions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';


const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    card: {
        width   : '100%',
        maxWidth: 384,
        // background: '#424242'
    }
});

class Signin extends Component {
    state = {
        email   : '',
        password: '',
        remember: true
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.login.IsSuccess){
            this.props.history.push('/example');
        }

    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    canBeSubmitted()
    {
        const {email, password} = this.state;
        return (
            email.length > 0 && password.length > 0
        );
    }

    onLogin(){
        const {email, password} = this.state;
        this.props.signinUser(email, password);
    }
    render()
    {
        const {classes} = this.props;
        const {email, password, remember} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className={classes.card}>

                            <CardContent className="flex flex-col items-center justify-center p-16">

                                <img className="w-128 mt-16" style={{width: '280px'}} src="assets/images/logos/logo-full.png" alt="logo"/>

                                <Typography variant="h6" className="mt-16 mb-32">Sign in to your account</Typography>

                                <form name="loginForm" noValidate className="flex flex-col justify-center w-full">

                                    <TextField
                                        className="mb-16"
                                        label="Email"
                                        autoFocus
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />

                                    <TextField
                                        className="mb-16"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />

                                    <div className="flex items-center justify-between">

                                        <FormControl>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="remember"
                                                        checked={remember}
                                                        onChange={this.handleChange}/>
                                                }
                                                label="Remember Me"
                                            />
                                        </FormControl>

                                        <Link className="font-medium" to="/auth/forgot-password">
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <Button variant="contained" color="primary" className="w-224 mx-auto mt-16 w-full" aria-label="LOG IN"
                                            disabled={!this.canBeSubmitted()}
                                            onClick={this.onLogin.bind(this)}
                                    >
                                        LOGIN
                                    </Button>

                                </form>

                                <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                    <span className="font-medium">Don't have an account?</span>
                                    <Link className="font-medium" to="/auth/register">Register a account</Link>
                                </div>

                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        signinUser: Actions.signinUser
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin)));

