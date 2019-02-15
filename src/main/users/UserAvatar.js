import React from "react";
import Avatar from 'react-avatar-edit';

import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import * as Actions from './store/actions';

import connect from "react-redux/es/connect/connect";
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    root     : {

    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    button: {
        textTransform: "none"
    }
});


class UserAvatar extends React.Component {
    state = {
        preview: null,
        src: "",
        image: null,
        imageChoosed: false,
        file: null,
        avatar: null,
    };

    constructor(props) {
        super(props);
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
    }

    onBeforeFileLoad(elem) {
        this.setState({file:  elem.target.files[0]});
        this.props.updateNewUserAvatar(elem.target.files[0]);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps){
    }

    getDataUri=(url, cb)=>
    {
        var image = new Image();
        var log_url = 'https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png';
        image.setAttribute('crossOrigin', 'anonymous');
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';  /// set white fill style
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            canvas.getContext('2d').drawImage(this, 0, 0);
            cb(canvas.toDataURL('image/png'));
        };
        image.src = url;
    };

    componentDidMount(){
        this.props.onRef(this);
        if(!this.props.bNewForm && this.props.userDetail!==null && this.props.userDetail.details){
            this.setState({avatar: this.props.userDetail.details.ProfilePhoto});
            let img = null;
            this.getDataUri(this.props.userDetail.details.ProfilePhoto, dataUri => {
                img = dataUri;
                this.setState({preview: img});
                this.setState({imageChoosed: true});
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }

    componentWillUnmount() {

        this.props.onRef(undefined);
    }

    onClose() {
        this.setState({preview: null});
        this.setState({imageChoosed: false});
    }

    onCrop(preview) {
        this.setState({preview:preview});
    }
    onChoosed = (e) => {
        this.setState({imageChoosed: true});
    };
    onPhotoChange = (e) => {
        this.setState({preview: null});
        this.setState({imageChoosed: false});
    };

    render () {
        const {classes} = this.props;
        return (
            <div className={"flex justify-between"}>
                <div style={{margin: "auto", position:'relative' , textAlign: "center", marginTop: 20,marginBottom: 5, padding: 5}}>
                    {this.state.imageChoosed === false && (
                        <Avatar
                            width={180}
                            height={180}
                            imageWidth={180}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            label = {"Choose User Photo"}
                            backgroundColor={"primary"}
                            src={this.state.src ? "" : this.state.src}
                            onBeforeFileLoad={this.onBeforeFileLoad}
                        />
                    )}
                    {this.state.preview && this.state.imageChoosed === false &&(
                        <Fab
                            style={{position: 'absolute', bottom: 10, right:10}}
                            size="small"
                            color="primary"
                            aria-label="check"
                            onClick = {this.onChoosed}
                        >
                          <CheckIcon />
                        </Fab>
                    )}
                    {(this.state.imageChoosed) && (
                        <div style={{width:180, height: 180}}>
                            <img src={this.state.preview} alt="Preview" />
                            <Fab
                                style={{position: 'absolute', bottom: 10, right:10}}
                                size="small"
                                color="primary"
                                aria-label="edit"
                                onClick = {this.onPhotoChange}
                            >
                                <EditIcon />
                            </Fab>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}


// export default UserAvatar


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateNewUserAvatar : Actions.updateNewUserAvatar
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        userDetail: usersApp.users.userDetail,
        bNewForm: usersApp.users.bNewForm,
        // openUsersFormStatus: usersApp.users.openUsersFormStatus
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UserAvatar));

