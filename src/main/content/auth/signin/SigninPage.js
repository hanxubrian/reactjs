import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, TextField, Typography, CircularProgress} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import keycode from 'keycode';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {FuseAnimate} from '@fuse';
import * as Actions from 'auth/store/actions';
import * as NavigationActions from '../../../../store/actions/fuse/navigation.actions'
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import VideoCover from 'react-video-cover';

const styles = theme => ({
    root: {
        background: "url('') no-repeat",
        backgroundSize: 'cover'
    },
    card: {
        width: '100%',
        maxWidth: 384
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    }
});

class SigninPage extends Component {
    state = {
        email   : '',
        password: '',
        remember: true,
        alertOpen: false,
        commandKeyPressed: false,
        url: window.location.host.split(':')[0],
        hidden: null
    };

    componentDidMount() {
        this.handleAppStart(this.state.url);
        document.addEventListener("keydown", this.handleDocumentKeyDown);
    }

    componentWillUnmount()
    {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    handleAppStart = (url) => {
       this.props.loadHomeScreen(url);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login.IsSuccess){
            this.props.history.push('/profile');
        }
        if(nextProps.login.bAlertShown) {
            this.setState({alertOpen: true})
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

    handleClose = () => {
        this.setState({ alertOpen: false });
        this.props.closeAlertDialog();
    };

    handleDocumentKeyDown = (event) => {
        const {email, password, url} = this.state;
        if ( keycode(event) === 'enter' ) {
            this.props.signinUser(email, password, url);
        }
    };

    onLogin = () => {
        const {email, password, url} = this.state;
        this.props.signinUser(email, password, url);
    }

    render() {
       const styles = ({
            root: {
                background:  `url(${this.props.app.loginBackground})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'noRepeat'
            },
            card: {
                width: '100%',
                maxWidth: 384
            },
            overlay: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0, .6)',
                zIndex: 1000,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                opacity: 0.5
            }
       });

        const {classes} = this.props;
        const { email, password, remember } = this.state;

        const videoOptions = {
            src: this.props.app.loginVideoBackground,
            autoPlay: true,
            loop: true,
            muted: true
        }

        return (
            <div style={{ background: styles.root.background, backgroundSize: styles.root.backgroundSize, backgroundRepeat: styles.root.backgroundRepeat }} className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

             <VideoCover style= {{ position: styles.overlay.position, opacity: styles.overlay.opacity }}
                                videoOptions={videoOptions}
                                hidden={this.props.app.hidden}
                                />

                {this.props.login.bLoginStart && (
                    <div className={classes.overlay}>
                        <CircularProgress className={classes.progress} color="secondary"  />
                    </div>
                )}

                    <Dialog
                        open={this.state.alertOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"SigninPage Failure"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.props.login.message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary" autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className={classes.card}>

                            <CardContent className="flex flex-col items-center justify-center p-16">

                                <img className="w-128 mt-16" style={{ width: '280px' }} src={this.props.app.loginLogo} alt="logo"/>

                                <Typography variant="h6" className="mt-16 mb-32" hidden={this.props.app.hidden}>Sign in to your account</Typography>

                                <form name="loginForm" noValidate className="flex flex-col justify-center w-full">

                                    <TextField
                                        className="mb-16"
                                        label="Email"
                                        autoFocus
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        // variant="outlined"
                                        required
                                        fullWidth
                                        margin="normal"
                                        hidden={this.props.app.hidden}
                                    />

                                    <TextField
                                        className="mb-16"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        // variant="outlined"
                                        required
                                        fullWidth
                                        margin="normal"
                                        hidden={this.props.app.hidden}
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
                                                hidden={this.props.app.hidden}
                                            />
                                        </FormControl>

                                        <Link className="font-medium" to="/auth/forgot-password" hidden={this.props.app.hidden}>
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <Button variant="contained" color="primary" className="w-224 mx-auto mt-16 w-full" aria-label="LOG IN"
                                            // disabled={!this.canBeSubmitted()}
                                            onClick={this.onLogin || this.handleDocumentKeyDown}
                                            hidden={this.props.app.hidden}
                                    >
                                        SIGN IN
                                    </Button>

                                </form>

                                {this.props.app.hidden && (
                                    <div className="flex flex-col items-center justify-center pt-32 pb-24" hidden={this.props.app.hidden}>
                                        <span className="font-medium">Closed for scheduled maintenance!</span>
                                        <span className="font-medium" >Currently Upgrading...</span>
                                        <br></br>
                                        <br></br>
                                        <span className="font-medium" >Please check back later.</span>
                                    </div>
                                )}
                                {!this.props.app.hidden && (
                                    <div className="flex flex-col items-center justify-center pt-32 pb-24" hidden={this.props.app.hidden}>
                                        <span className="font-medium">Don't have an account?</span>
                                        <Link className="font-medium" to="/auth/register">Register a account</Link>
                                        <br></br>
                                        <br></br>
                                        <span className="font-small">Copyright: {this.props.app.copyRight}</span>
                                    </div>
                                )}

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
        signinUser: Actions.submitSignIn,
        closeAlertDialog: Actions.closeDialog,
        // initializeFromLocalStorage: Actions.initializeFromLocalStorage,
        loadAccountMenu: NavigationActions.add_auth_navigation,
        loadHomeScreen: Actions.initialStart
    }, dispatch);
}

function mapStateToProps({auth,fuse})
{
    return {
        login       :      auth.login,
        accountmenu :      fuse.navigation,
        app         :      auth.app
        }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninPage)));


