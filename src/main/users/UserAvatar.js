import React from "react";
import ReactDom from "react-dom";
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import AvatarCropper from "react-avatar-cropper";
import * as Actions from "./store/actions";
import connect from "react-redux/es/connect/connect";


const styles = theme => ({
    root     : {

    }
});

class FileUpload extends React.Component{

    handleFile = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        if (!file) return;

        reader.onload = (img) => {
            ReactDom.findDOMNode(this.ref.in).value = '';
            this.props.handleFileChange(img.target.result);
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
        );
    }
}

class UserAvatar extends React.Component {

    componentWillMount() {
        console.log("----------------- Hellow-------------------");
    }

    state = {
        cropperOpen: false,
        img: null,
        croppedImg: "http://www.fillmurray.com/400/400"
    }

    handleFileChange = (dataURI) => {
        this.setState({
            img: dataURI,
            croppedImg: this.state.croppedImg,
            cropperOpen: true
        });
    }
    handleCrop = (dataURI) => {
        this.setState({
            cropperOpen: false,
            img: null,
            croppedImg: dataURI
        });
    }
    handleRequestHide = () => {
        this.setState({
            cropperOpen: false
        });
    }

    render () {
        return (
            <div>
                <div className="avatar-photo">
                    <FileUpload handleFileChange={this.handleFileChange} />
                    <div className="avatar-edit">
                        <span>Click to Pick Avatar</span>
                        {/*//<i className="fa fa-camera"></i>*/}
                    </div>
                    <img src={this.state.croppedImg} />
                </div>
                {this.state.cropperOpen &&
                <AvatarCropper
                    onRequestHide={this.handleRequestHide}
                    cropperOpen={this.state.cropperOpen}
                    //onCrop={this.handleCrop(this.state.img)}
                    image={this.state.img}
                    width={400}
                    height={400}
                />
                }
            </div>
        );
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