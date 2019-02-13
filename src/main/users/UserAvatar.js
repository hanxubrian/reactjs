import React from "react";
import Avatar from 'react-avatar-edit';
import ReactDOM from 'react-dom'
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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

    componentWillMount() {
        console.log("----------------- Hellow-------------------");
    }
    state = {
        preview: null,
        src: "",
        image: null,
        imageChoosed: false
    }
    constructor(props) {
        super(props)
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
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
    }
    onPhotoChange = (e) => {
        this.setState({preview: null});
        this.setState({imageChoosed: false});
        console.log(this.state.src);
    }

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
                            imageHeight={180}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            label = {"Choose User Photo"}
                            backgroundColor={"primary"}
                            src={this.state.src ? "" : this.state.src}
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
                    {this.state.imageChoosed && (
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
        // openUsersForm : Actions.openUsersForm
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        // openUsersFormStatus: usersApp.users.openUsersFormStatus
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UserAvatar));
//ReactDom.render(<App />, document.getElementById("content"));