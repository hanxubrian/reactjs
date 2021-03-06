import React, {Fragment} from 'react';
import {bindActionCreators} from "redux";
import * as Actions from "./store/actions";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Icon from "@material-ui/core/es/Icon/Icon";

import FuseUtils from '@fuse/FuseUtils';
import _ from 'lodash';

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


function LinkTab(props) {
    return <Tab style={{width: '100%',maxWidth:'25%'}} component="button" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    listRoot: {
        width: '100%',
        maxWidth: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    textSpan: {
        marginLeft: 0,
        marginRight: 0,
        flexDirection: 'column',
        display: 'flex',
    },
    checkBoxRoot: {
        padding: '0px 12px'
    },
    tabRoot: {
        flexGrow: 1,
        border: '1px solid lightgrey',
        marginTop: '10px'
        //backgroundColor: theme.palette.background.paper,
    }
});

class UsersPermission extends React.Component {
    state = {
        open: true,
        checkedStatus: [],
        step: 0,
        UserPermission:[],
        AppList: [],
        payload:{
            PasswordHash: "",
            IsFirstTimeLogin: "",
            Salt: "",
            OutlookPassword: "",
            Apps: [],
            Groups: [],
            // UserId: 6,
            UserName: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
            Address1: "",
            Address2: "",
            City: "",
            State: "",
            Zipcode: "",
            DepartmentId: "",
            Title: "",
            OutlookUsername: "",
            DefaultRegionId: 2,
            ProfilePhoto: "",
            UserType: "",
            UserTypeValue: "",
            Roles: [],
            Regions: [
              {
                RegionId: 2,
                Arcrym: "",
                Name: "",
                DisplayName: ""
              }
            ]
        },
        checkedSectionStatus: [
            {view: false, create: false, edit: false, delete: false, execute:false},
            {view: false, create: false, edit: false, delete: false, execute:false},
            {view: false, create: false, edit: false, delete: false, execute:false},
            {view: false, create: false, edit: false, delete: false, execute:false},
        ]
    };

    componentWillMount() {
        this.props.getUserPermissionList();
        this.setState({
            payload: this.props.payload
        })
    }

    componentDidMount() {

    }


    componentWillReceiveProps(nextProps, nextContext) {

        
    
        if ( nextProps.userPermissionList !== this.props.userPermissionList && nextProps.userPermissionList !== null )
        {
                

                //console.log("UserPermissionList",nextProps.userPermissionList);

                this.setState({
                    UserPermission: nextProps.userPermissionList
                });


                if(this.props.bNewForm === false && this.props.userDetail !== null){

                        if(this.props.userDetail.details.Apps !== null)  {
                            let checkedStatus = {};
                            let tempAppList = [];
        
                            console.log("userPermissionList",nextProps.userPermissionList);
                            console.log("userDetail",this.props.userDetail.details.Apps);
        
                            this.props.userDetail.details.Apps.forEach((x, xIndex) => {
        
                                tempAppList.push({
                                    _id: x._id,
                                    AppId: x.AppId,
                                    menuOptions: []
                                });
        
                                x.menuOptions.forEach((y,yIndex)=>{
        
                                    tempAppList[xIndex].menuOptions.push({
                                        MenuId: y.MenuId,
                                        Title: y.Title,
                                        Children: []
                                    });
                                
                                    y.Children.forEach((z, zIndex) => {
        
                                        tempAppList[xIndex].menuOptions[yIndex].Children.push({
                                            MenuId: z.MenuId,
                                            View: z.View,
                                            Create: z.Create,
                                            Delete: z.Edit,
                                            Edit: z.Delete,
                                            Execute: z.Execute
                                        });
            
                                        checkedStatus[`view_${xIndex}_${yIndex}_${zIndex}`] = z.View;
                                        checkedStatus[`create_${xIndex}_${yIndex}_${zIndex}`] = z.Create;
                                        checkedStatus[`edit_${xIndex}_${yIndex}_${zIndex}`] = z.Edit;
                                        checkedStatus[`delete_${xIndex}_${yIndex}_${zIndex}`] = z.Delete;
                                        checkedStatus[`execute_${xIndex}_${yIndex}_${zIndex}`] = z.Execute;
                                    })
                                })
            
                            });
                            console.log("temp-list",tempAppList);
                            nextProps.userPermissionList.forEach((x, xIndex) => {
                                if(tempAppList[xIndex] === undefined){
                                    tempAppList.push({
                                        _id: x._id,
                                        AppId: x.AppId,
                                        menuOptions: []
                                    });
                                }
                                x.menuOptions.forEach((y,yIndex)=>{
                                    let yFlag = false;
                                    tempAppList[xIndex].menuOptions.map(obj=>{
                                        if(obj.MenuId === y.MenuId){
                                            yFlag = true;
                                        }
                                    });
                                    if(!yFlag){
                                        tempAppList[xIndex].menuOptions.push({
                                            MenuId: y.MenuId,
                                            Title: y.Title,
                                            Children: []
                                        });
                                    }
                                    y.Children.forEach((z, zIndex) => {

                                            let zFlag = false;
                                            tempAppList[xIndex].menuOptions[yIndex].Children.map(obj=>{
                                                if(obj.MenuId === z.MenuId){
                                                     zFlag = true;
                                                }
                                            });
                                            if(!zFlag){
                                                tempAppList[xIndex].menuOptions[yIndex].Children.push({
                                                    MenuId: z.MenuId,
                                                    View: false,
                                                    Create: false,
                                                    Delete: false,
                                                    Edit: false,
                                                    Execute: false
                                                });
                                                checkedStatus[`view_${xIndex}_${yIndex}_${zIndex}`] = false;
                                                checkedStatus[`create_${xIndex}_${yIndex}_${zIndex}`] = false;
                                                checkedStatus[`edit_${xIndex}_${yIndex}_${zIndex}`] = false;
                                                checkedStatus[`delete_${xIndex}_${yIndex}_${zIndex}`] = false;
                                                checkedStatus[`execute_${xIndex}_${yIndex}_${zIndex}`] = false;
                                            }
                                    })
                                })
            
                            });
                            this.setState({checkedStatus});
                            this.setState({
                                AppList: tempAppList
                            });
                            console.log("tempAppList",tempAppList);
                            this.updateUserFormPayload("Apps",tempAppList);
                    }                
                }

                if(this.props.bNewForm){
                    let checkedStatus = {};
                    let tempAppList = [];
                    nextProps.userPermissionList.forEach((x, xIndex) => {

                        tempAppList.push({
                            _id: x._id,
                            AppId: x.AppId,
                            menuOptions: []
                        });
    
                        x.menuOptions.forEach((y,yIndex)=>{
                            tempAppList[xIndex].menuOptions.push({
                                MenuId: y.MenuId,
                                Title: y.Title,
                                Children: []
                            });
                            y.Children.forEach((z, zIndex) => {
                                tempAppList[xIndex].menuOptions[yIndex].Children.push({
                                    MenuId: z.MenuId,
                                    View: false,
                                    Create: false,
                                    Delete: false,
                                    Edit: false,
                                    Execute: false
                                });
                                checkedStatus[`view_${xIndex}_${yIndex}_${zIndex}`] = false;
                                checkedStatus[`create_${xIndex}_${yIndex}_${zIndex}`] = false;
                                checkedStatus[`edit_${xIndex}_${yIndex}_${zIndex}`] = false;
                                checkedStatus[`delete_${xIndex}_${yIndex}_${zIndex}`] = false;
                                checkedStatus[`execute_${xIndex}_${yIndex}_${zIndex}`] = false;
                            })
                        })
    
                    });
    
                    this.setState({checkedStatus});
                                  
                    this.setState({
                        AppList: tempAppList
                    });
                    
                    this.updateUserFormPayload("Apps",tempAppList);
                }                
        }

        if(nextProps.payload !== this.props.payload){
            this.setState({
                payload: nextProps.payload
            });
        }

        if(this.props.userPermissionList.length>0 && (!this.props.bNewForm && nextProps.userDetail!==null && nextProps.userDetail.menuOptions)){
            let localMenu = this.props.userPermissionList.filter(menu=>menu.AppId===2);
            // localMenu.
            console.log('fired menu', localMenu);

        }
    }

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleTabChange = (event, step) => {
        this.setState({step});
    };

    updateUserFormPayload = (name,value) => {

        let insertPayload = {...this.state.payload};
        insertPayload[name] = value;
        this.props.updateUserFormPayload(insertPayload);
    };

    handleSectionCheckToggle = (name, index) => event => {
        console.log('name=', name, index);
        let checkedSectionStatus = this.state.checkedSectionStatus;
        checkedSectionStatus[index][name] = event.target.checked;
        this.setState({checkedSectionStatus: checkedSectionStatus});

        let checkedStatus = this.state.checkedStatus;
        let all_keys = Object.keys(this.state.checkedStatus);
        let selected = all_keys.filter(key=>key.indexOf(`${name}_${index}`)!==-1);

        selected.map(s=>checkedStatus[s]=event.target.checked);

        let newAppList = [...this.state.AppList];
        let menus = newAppList[index].menuOptions;

        let actionName = FuseUtils.capital_letter(name);
         menus.map(menu=>{
             if(menu.Children.length===0) return;
             menu.Children.map(child=>child[actionName] = event.target.checked)
         });

        console.log('menu = ', menus);

        this.updateUserFormPayload("Apps",newAppList);

    };

    handleCheckToggle = (name,actionName,index,pIndex,cIndex) => event => {

        const checked = event.target.checked;

        this.setState({
            checkedStatus: {
                ...this.state.checkedStatus,
                [name] : checked
            }
        });

        let newAppList = [...this.state.AppList];
        newAppList[index].menuOptions[pIndex].Children[cIndex][actionName] = checked;
        console.log("newAPPlist",newAppList);
        this.updateUserFormPayload("Apps",newAppList);

    };

    render() {
        const {classes} = this.props;
        const {step, checkedStatus,UserPermission} = this.state;

        return (
            <NoSsr>
                <div className={classes.tabRoot}>
                    <AppBar color="default" position="static">
                        <Tabs variant="fullWidth" value={step} onChange={this.handleTabChange}>
                            {UserPermission.map((x,index)=>(
                                <LinkTab key={index} label={x.name}/>
                            ))}
                        </Tabs>
                    </AppBar>
                    {UserPermission.map((x,index)=>(
                        <TabContainer key={index}>
                        {step === index &&
                          <div>
                            <List
                            component="nav"
                            className={classes.listRoot}
                            >
                            <ListItem button onClick={this.handleClick}
                            style={{borderBottom: "1px solid lightgray"}}>
                                <ListItemText primary="Navigation Options"/>
                                    <ListItemSecondaryAction className="flex">
                                        <div className={classes.textSpan}>
                                            <span>View</span>
                                         <Checkbox
                                             classes={{root: classes.checkBoxRoot}}
                                             onChange={this.handleSectionCheckToggle('view', index)}
                                             checked={this.state.checkedSectionStatus[index].view}
                                         />
                                        </div>
                                        <div className={classes.textSpan}><span>Create</span>
                                         <Checkbox  classes={{root: classes.checkBoxRoot}}
                                                    onChange={this.handleSectionCheckToggle('create', index)}
                                                    checked={this.state.checkedSectionStatus[index].create}
                                         />
                                        </div>
                                        <div className={classes.textSpan}><span>Edit</span>
                                             <Checkbox  classes={{root: classes.checkBoxRoot}}
                                                        onChange={this.handleSectionCheckToggle('edit', index)}
                                                        checked={this.state.checkedSectionStatus[index].edit}
                                             />
                                        </div>
                                        <div className={classes.textSpan}><span>Delete</span>
                                         <Checkbox  classes={{root: classes.checkBoxRoot}}
                                                    onChange={this.handleSectionCheckToggle('delete', index)}
                                                    checked={this.state.checkedSectionStatus[index].delete}
                                         />
                                        </div>
                                        <div className={classes.textSpan}><span>Execute</span>
                                         <Checkbox  classes={{root: classes.checkBoxRoot}}
                                                    onChange={this.handleSectionCheckToggle('execute', index)}
                                                    checked={this.state.checkedSectionStatus[index].execute}
                                         />
                                        </div>
                                    </ListItemSecondaryAction>
                            </ListItem>
                            {x.menuOptions.map((x, pIndex) => (
                                <Fragment key={x.MenuId}>
                                    <ListItem button onClick={this.handleClick}
                                              style={{borderBottom: "1px solid lightgray"}}>
                                        <ListItemIcon>
                                            <Icon>{x.Icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText inset primary={x.Title}/>
                                    </ListItem>
                                    {x.Children.map((x, cIndex) => (
                                        <List key={x.MenuId} component="div" disablePadding>
                                            <ListItem className={classes.nested}>
                                                <ListItemText inset primary={x.Title}/>
                                                <ListItemSecondaryAction>
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`view_${index}_${pIndex}_${cIndex}`,"View",index,pIndex,cIndex)}
                                                        checked={checkedStatus[`view_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`create_${index}_${pIndex}_${cIndex}`,"Create",index,pIndex,cIndex)}
                                                        checked={checkedStatus[`create_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`edit_${index}_${pIndex}_${cIndex}`,"Edit",index,pIndex,cIndex)}
                                                        checked={checkedStatus[`edit_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`delete_${index}_${pIndex}_${cIndex}`,"Delete",index,pIndex,cIndex)}
                                                        checked={checkedStatus[`delete_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                    <Checkbox
                                                        onChange={this.handleCheckToggle(`execute_${index}_${pIndex}_${cIndex}`,"Execute",index,pIndex,cIndex)}
                                                        checked={checkedStatus[`execute_${index}_${pIndex}_${cIndex}`] || false}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    ))}
                                </Fragment>
                            ))}
                            </List>
                          </div>
                        }
                        </TabContainer>
                    ))}
                </div>
            </NoSsr>

        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUserPermissionList: Actions.getUserPermissionList,
        updateUserFormPayload: Actions.updateUserFormVariable
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        userPermissionList: usersApp.users.userPermissionList,
        payload: usersApp.users.payload,
        userDetail: usersApp.users.userDetail,
        bNewForm: usersApp.users.bNewForm
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UsersPermission));
