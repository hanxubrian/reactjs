import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import axios from 'axios/index';
import {Avatar, AppBar, Button, Card,Input, TextField,Menu,MenuItem,FormControl,Select, InputLabel,OutlinedInput,Divider,CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimateGroup} from '@fuse';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';
import Pusher from "pusher-js";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

const styles = theme => ({
    root: {}
});
const THIS_WEEK = 1;
const THIS_WEEK_TO_DATE = 2;
const THIS_MONTH = 3;
const THIS_MONTH_TO_DATE = 4;
const THIS_QUARTER = 5;
const THIS_QUARTER_TO_DATE = 6;
const THIS_YEAR = 7;
const THIS_YEAR_TO_DATE = 8;
const TODAY = 9;
const YESTERDAY = 10;
const LAST_QUARTER = 11;
const LAST_YEAR = 12;
const CUSTOM_DATE = 13;
const PERIOD = 14;


class VersioningTab extends Component {

    state = {
        anchorEl : null,
        setAnchorEl : null,
        is_Mounted  : false,
        version     : 0,
        note        : "",
        postStatus  : false,

    };
    constructor(props){
        super(props);
    }

    componentDidMount()
    {
        this.setState({is_Mounted: true});
        // alert("MOUNT");


    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.postStatus !==prevState.postStatus && this.state.postStatus){
            this.versiontrigger();
        }
        if(this.props.adminveriontrigger && this.props.adminveriontrigger !== null && this.props.adminveriontrigger !== prevProps.adminveriontrigger){
            console.log("########################this.props.adminveriontrigger",this.props.adminveriontrigger);
        }
    }
    componentWillUnmount(){
        this.setState({is_Mounted: false});
    }
    handleVersionChange = event => {
        this.setState({version:event.target.value});
    }
    handleNoteChange = event =>{
        this.setState({note: event.target.value});

    }
    postversionnotification=()=>{
        this.setState({postStatus:true});

    }
    versiontrigger=()=>{
        if(this.state.version && this.state.version  !== null && this.state.note && this.state.note !== null){
            let data ={
                message     :this.state.note,
                version     : this.state.version
            }
            this.props.adminversionupgradetrigger(data);
            this.setState({postStatus: false});
        }



    }
    RegionHeader(){
        let region_name = '';
        if(this.props.login.IsSuccess){
            this.props.login.all_regions.forEach(region=>{
                if(parseInt(this.props.login.defaultRegionId) === region.RegionId) {
                    region_name = region.Displayname;
                    return false;
                }
            })
        }

        return (
            <Typography className="logo-icon-large">{region_name}</Typography>
        )
    };

    render()
    {
        const {classes} = this.props;
        const {is_Mounted,version,note} = this.state;

        if(is_Mounted)
        return (
            <div className={classNames(classes.root, "md:flex max-w-2xl")}>

                <div className="flex flex-col flex-1 md:pr-32">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >

                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            Versioning
                                        </Typography>
                                        <div style={{color:'white'}}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel  htmlFor="outlined-age-simple" style={{color:"white"}}>
                                                    Version
                                                </InputLabel>
                                                <Select
                                                    value={version}
                                                    onChange={this.handleVersionChange}
                                                    input={
                                                        <OutlinedInput
                                                            color="white"
                                                            name="date"
                                                            labelWidth={50}
                                                            id="outlined-age-native-simple"
                                                        />
                                                    }
                                                    inputProps={{
                                                        name: 'billrunDateOption',
                                                        id  : 'billrunDateOption'
                                                    }}
                                                    style={{color:"white"}}
                                                >
                                                    <MenuItem value={0}>1.0.0</MenuItem>
                                                    <MenuItem value={1}>1.0.1</MenuItem>
                                                    <MenuItem value={2}>1.0.2</MenuItem>
                                                    <MenuItem value={3}>1.0.3</MenuItem>
                                                    <MenuItem value={4}>1.0.4</MenuItem>
                                                    <MenuItem value={5}>1.0.5</MenuItem>
                                                    <MenuItem value={6}>1.0.6</MenuItem>
                                                    <MenuItem value={7}>1.0.7</MenuItem>
                                                    <MenuItem value={8}>1.0.8</MenuItem>
                                                    <MenuItem value={9}>1.0.9</MenuItem>
                                                    <MenuItem value={10}>1.1.0</MenuItem>


                                                </Select>
                                            </FormControl>
                                            {/*<TextField*/}
                                                {/*id="outlined-dense"*/}
                                                {/*label="Version"*/}
                                                {/*style ={{color:"white",*/}
                                                    {/*borderColor:"white",*/}
                                                {/*}}*/}
                                                {/*margin="dense"*/}
                                                {/*variant="outlined"*/}
                                            {/*/>*/}
                                        </div>
                                    </Toolbar>
                                </AppBar>

                                <CardContent>
                                    <div>
                                        <Card className="w-full overflow-hidden">
                                            <Input
                                                className="p-16 w-full"
                                                classes={{root: 'text-14'}}
                                                placeholder="Note.."
                                                multiline
                                                rows="6"
                                                margin="none"
                                                disableUnderline
                                                onChange={this.handleNoteChange}
                                            />

                                            <AppBar className="card-footer flex flex-row border-t-1" position="static" color="default" elevation={0}>
                                                <div className="flex-1 items-center">
                                                    {/*<IconButton aria-label="Add photo">*/}
                                                        {/*<Icon>photo</Icon>*/}
                                                    {/*</IconButton>*/}
                                                    {/*<IconButton aria-label="Mention somebody">*/}
                                                        {/*<Icon>person</Icon>*/}
                                                    {/*</IconButton>*/}
                                                    {/*<IconButton aria-label="Add location">*/}
                                                        {/*<Icon>location_on</Icon>*/}
                                                    {/*</IconButton>*/}
                                                </div>

                                                <div className="p-8">
                                                    <Button variant="contained" color="primary" size="small" aria-label="post" onClick={this.postversionnotification}>
                                                        POST
                                                    </Button>
                                                </div>

                                            </AppBar>
                                        </Card>


                                        <Divider className="my-32"/>
                                    </div>



                                </CardContent>
                            </Card>



                    </FuseAnimateGroup>
                </div>


            </div>
        );
        else{
            return <div/>
        }
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        adminversionupgradetrigger      : Actions.adminversionupgradetrigger,
        openDialog                      : Actions.openDialog,
        closeDialog                     : Actions.closeDialog
    }, dispatch);
}
function mapStateToProps({auth,notification})
{
    return {
        login: auth.login,
        adminveriontrigger :    notification.adminversiontriggerstatus,

    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps,mapDispatchToProps)(VersioningTab)));

