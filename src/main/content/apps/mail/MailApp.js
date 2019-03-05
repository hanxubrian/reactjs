import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MailList from './mails/MailList';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MailDetails from './mail/MailDetails';
import {FusePageCarded} from '@fuse';
import MailsToolbar from './mails/MailsToolbar';
import MailToolbar from './mail/MailToolbar';
import MailAppHeader from './MailAppHeader';
import MailAppSidebarHeader from './MailAppSidebarHeader';
import MailAppSidebarContent from './MailAppSidebarContent';
import MailCompose from './MailCompose';
import {withRouter} from "react-router-dom";
import _ from 'lodash';

const styles = theme => ({});

class MailApp extends Component {
    state = {
       openCompose: false
    }

    componentDidMount()
    {
        this.props.getFilters();
        this.props.getFolders();
        this.props.getLabels();
    }

    componentWillMount() {

        const path = window.location.pathname.split("/").pop();
        if(path === 'compose'){
            this.setState({
                openCompose: true
            })
        }else{
            this.setState({
                openCompose: false
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( !_.isEqual(this.props.location, prevProps.location) ) {

            const path = window.location.pathname.split("/").pop();
            if (path === 'compose') {
                this.setState({
                    openCompose: true
                });
            } else {
                this.setState({
                    openCompose: false
                })
            }
        }
    }

    render()
    {
        const {match} = this.props;
        const {openCompose} = this.state;
        const {params} = match;



        return (
            <FusePageCarded
                classes={{
                    root   : "w-full",
                    content: "flex flex-col",
                    header : "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <MailAppHeader pageLayout={() => this.pageLayout}/>
                }
                contentToolbar={
                    params.mailId ? (
                        <MailToolbar/>
                    ) : (
                        <MailsToolbar/>
                    )
                }
                content={
                    openCompose ? (
                           <MailCompose/>
                    ) : (
                        params.mailId ? (
                            <MailDetails/>
                        ) : (
                            <MailList/>
                        )
                    )
                }
                leftSidebarHeader={
                    <MailAppSidebarHeader/>
                }
                leftSidebarContent={
                    <MailAppSidebarContent/>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getFilters: Actions.getFilters,
        getFolders: Actions.getFolders,
        getLabels : Actions.getLabels
    }, dispatch);
}

function mapStateToProps({auth,mailApp})
{
    return {
        toggleCompose: mailApp.compose.toggleCompose
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailApp)));
