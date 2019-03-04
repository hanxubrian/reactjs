import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate,FusePageCustom} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import ContactsList from 'main/content/apps/contacts/ContactsList';
import ContactsHeader from 'main/content/apps/contacts/ContactsHeader';
import ContactsSidebarContent from 'main/content/apps/contacts/ContactsSidebarContent';
import _ from '@lodash';
import {Fab, Icon,CircularProgress} from '@material-ui/core';
import ContactDialog from 'main/content/apps/contacts/ContactDialog';

const styles = theme => ({
    addButton: {
        position: 'fixed',
        left   : 453,
        bottom  : 90,
        zIndex  : 99,
        display : 'none',
    },
    content:{
        // position: 'relative',
        marginTop: '10%',
        height:'90%'
    },
    overlay: {
        position: 'absolute',
        top: -104,
        left: -65,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    layoutHeader       : {
        height   : 80,
        minHeight: 80,
        zIndex      : 1,
        backgroundColor: theme.palette.secondary.main
    },
});

class ContactsApp extends Component {

    componentDidMount()
    {
        this.props.getContacts(this.props.match.params);
        this.props.getUserData();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getContacts(this.props.match.params);
        }
    }

    render()
    {
        const {classes, openNewContactDialog} = this.props;

        return (
            <React.Fragment>
                {this.props.openchatpanelstatus && (
                    <div className={classes.overlay}>
                        <CircularProgress className={classes.progress} color="secondary"  />
                    </div>
                )}

                <FusePageCustom
                    classes={{
                        root: classes.layoutRoot,
                        header: classes.layoutHeader,
                        leftSidebar       : "w-256 mt-64",

                    }}
                    header={
                            <ContactsHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <ContactsList/>
                    }
                    leftSidebarContent={
                        <ContactsSidebarContent/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={openNewContactDialog}
                    >
                        <Icon>person_add</Icon>
                    </Fab>
                </FuseAnimate>
                <ContactDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getContacts         : Actions.getContacts,
        getUserData         : Actions.getUserData,
        openNewContactDialog: Actions.openNewContactDialog
    }, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        contacts          : contactsApp.contacts.entities,
        selectedContactIds: contactsApp.contacts.selectedContactIds,
        searchText        : contactsApp.contacts.searchText,
        user              : contactsApp.user,
        openchatpanelstatus        : contactsApp.openchatpanelstatus,
    }
}

export default (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsApp))));
