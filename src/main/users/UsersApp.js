import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import UsersList from 'main/users/UsersList';
import UsersHeader from 'main/users/UsersHeader';
import _ from '@lodash';
import UsersSidebarContent from "./UsersSidebarContent";
import UsersForm from "./UsersForm";
import classNames from 'classnames';
import FusePageUsersCustom from "../../@fuse/components/FusePageLayouts/FusePageUsersCustom";



const styles = theme => ({
    addButton: {
        position: 'fixed',
        left   : 453,
        bottom  : 90,
        zIndex  : 99
    },
    leftFilterPanel: {
        display: 'none',
        width: '0px'
    }
});

class UsersApp extends Component {

    state = {
       openUsersFormStatus: false
    }

    componentDidMount()
    {
        this.props.getContacts(this.props.match.params);
        this.props.getUserData();
    }

    componentWillMount() {
        this.setState({
           "openUsersFormStatus": this.props.openUsersFormStatus
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getContacts(this.props.match.params);
        }
        if(this.props.openUsersFormStatus !== prevProps.openUsersFormStatus){
            this.setState({
                "openUsersFormStatus": this.props.openUsersFormStatus
            })
        }
    }

    render()
    {
        const {classes} = this.props;
        const {openUsersFormStatus} = this.state;

        return (
            <React.Fragment>
                <FusePageUsersCustom
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80 ",
                        leftSidebar       : classNames({"w-0": openUsersFormStatus}),
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <UsersHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <div>
                            {!openUsersFormStatus && (
                               <UsersList/>
                            )}
                            {openUsersFormStatus && (
                               <UsersForm/>
                            )}
                        </div>

                    }
                    leftSidebarContent={
                        <UsersSidebarContent />
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts         : Actions.getContacts,
        getUserData         : Actions.getUserData,
        openUsersForm       : Actions.openUsersForm
    }, dispatch);
}

function mapStateToProps({contactsApp , usersApp})
{
    return {
        contacts          : contactsApp.contacts.entities,
        selectedContactIds: contactsApp.contacts.selectedContactIds,
        searchText        : contactsApp.contacts.searchText,
        user              : contactsApp.user,
        openUsersFormStatus  : usersApp.users.openUsersFormStatus
    }
}

export default (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersApp))));
