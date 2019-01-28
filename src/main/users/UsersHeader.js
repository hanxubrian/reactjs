// import React, {Component} from 'react';
// import {MuiThemeProvider, withStyles} from '@material-ui/core/styles/index';
// import {
//     Fab,
//     Icon, Input, Paper,
//     Typography
// } from '@material-ui/core';
// import * as Actions from './store/actions';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import classNames from 'classnames';
// import {FuseAnimate, FuseSelectedTheme} from '@fuse';
//
// const headerHeight = 80;
//
// const styles = theme => ({
//     root: {},
//     sideButton          : {
//         backgroundColor: theme.palette.primary.light,
//         height: 46,
//         width: 46,
//         '&:hover': {
//             backgroundColor: theme.palette.primary.dark,
//         }
//     },
//     search: {
//         width: '100%',
//         [theme.breakpoints.down('sm')]: {
//             width: '100%'
//         }
//     },
//     layoutSidebarHeader: {
//         height   : headerHeight,
//         minHeight: headerHeight,
//         display: 'flex',
//         alignItems: 'center',
//         backgroundColor: theme.palette.secondary.main,
//     }
// });
//
// class UsersHeader extends Component {
//
//     state = {
//         openUsersFormStatus: false
//     }
//
//     componentWillMount() {
//         this.setState({
//             "openUsersFormStatus": this.props.openUsersFormStatus
//         })
//     }
//
//     toggleForm = (param) =>(event) => {
//         this.props.openUsersForm(param);
//         this.setState({
//             "openUsersFormStatus": param
//         })
//     }
//
//     render()
//     {
//         const {classes, setSearchText, searchText, pageLayout } = this.props;
//         const {openUsersFormStatus} = this.state;
//         return (
//
//         <div className= { classNames("flex row flex-1  p-8 sm:p-12 relative justify-between")}>
//
//                 <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
//                     <div className="flex flex-row flex-1 justify-between">
//
//                         <div className="flex w-full items-center">
//                             {!openUsersFormStatus && (
//                                 <div className="flex items-center">
//                                     <FuseAnimate animation="transition.expandIn" delay={300}>
//                                         <Icon className="text-32 mr-12">account_box</Icon>
//                                     </FuseAnimate>
//                                     <FuseAnimate animation="transition.slideLeftIn" delay={300}>
//                                         <Typography variant="h6" className="hidden sm:flex">Settings | Users</Typography>
//                                     </FuseAnimate>
//                                 </div>
//                             )}
//                             {openUsersFormStatus && (
//                                 <div className="flex items-center">
//                                     <FuseAnimate animation="transition.expandIn" delay={300}>
//                                         <Icon className="text-32 mr-12">account_box</Icon>
//                                     </FuseAnimate>
//                                     <FuseAnimate animation="transition.slideLeftIn" delay={300}>
//                                         <Typography variant="h6" className="hidden sm:flex">Settings | New User</Typography>
//                                     </FuseAnimate>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex w-full items-center">
//                             {!openUsersFormStatus && (
//                                 <div className="flex items-center w-full h-44 mr-12 ml-12">
//                                     <Paper className={"flex items-center h-44 w-full xs:mr-0"}>
//                                         <Input
//                                             placeholder="Search for users..."
//                                             className={classNames(classes.search, 'pl-16')}
//                                             disableUnderline
//                                             fullWidth
//                                             //value={this.state.s}
//                                             //onChange={this.handleChange('s')}
//                                             inputProps={{
//                                                 'aria-label': 'Search'
//                                             }}
//                                         />
//                                         <Icon color="action" className="flex justify-center mr-12">search</Icon>
//                                     </Paper>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex w-full items-center justify-end">
//                             {! openUsersFormStatus && (
//                             <FuseAnimate animation="transition.expandIn" delay={300}>
//                                     <Fab
//                                         color="secondary"
//                                         aria-label="add-user"
//                                         className={classNames(classes.sideButton, "mr-12")}
//                                         onClick={this.toggleForm(true)}
//                                     >
//                                         <Icon>person_add</Icon>
//                                     </Fab>
//                             </FuseAnimate>
//                             )}
//                             { openUsersFormStatus && (
//                                 <FuseAnimate animation="transition.expandIn" delay={300}>
//                                     <Fab
//                                         color="secondary"
//                                         aria-label="close-user-form"
//                                         className={classNames(classes.sideButton, "mr-12")}
//                                         onClick={this.toggleForm(false)}
//                                     >
//                                         <Icon>close</Icon>
//                                     </Fab>
//                                 </FuseAnimate>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//
//         </div>
//         );
//     }
// }
//
// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({
//         setSearchText: Actions.setSearchText,
//         openUsersForm : Actions.openUsersForm
//     }, dispatch);
// }
//
// function mapStateToProps({contactsApp, usersApp})
// {
//     return {
//         searchText     : contactsApp.contacts.searchText,
//         openUsersFormStatus: usersApp.users.openUsersFormStatus
//     }
// }
//
// export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UsersHeader));
import React, { Component } from 'react';

import { Icon, IconButton, Input, Paper, Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';

import { withStyles } from "@material-ui/core";

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from './store/actions';

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const styles = theme => ({
    layoutTable: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
        },
        '& .-pageSizeOptions': {
            display: 'none'
        },
        '& .openFilter': {
            width: 'inherit'
        },
        '& .openSummary': {
            width: 300
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        },
        '& .ReactTable .rt-noData': {
            top: '250px',
            border: '1px solid coral'
        },
        '& .ReactTable .rt-thead.-headerGroups': {
            paddingLeft: '0!important',
            paddingRight: '0!important',
            minWidth: 'inherit!important'
        },
        '& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
            background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
            color: 'white!important'
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group': {
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
            width: 'inherit!important',
            minWidth: 'inherit!important',
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
    },
    content: {
        position: 'relative'
    },
    search: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    tableTheadRow: {
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
    },
    tableTdEven: {
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
    },
    filterPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    summaryPanelButton: {
        backgroundColor: theme.palette.secondary.main,
        minWidth: 42,
        padding: 8,
        color: 'white',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    imageIcon: {
        width: 24
    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: 'fade(' + theme.palette.primary.main + ', 0.03)',
        },
        '& tbody tr:nth-of-type(even)': {
            backgroundColor: 'fade(' + theme.palette.primary.secondary + ', 0.03)',
        },
    },
});

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class VerificationSearchBar extends Component {

    state = {
       filterState: false
    }

    timer = null

    constructor(props) {
        super(props)

        this.state =
            {
                s: ""
            }
    }
    componentDidMount() {
        console.log("componentDidMount");
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    handleKeyDown = (event) => {
        console.log("escFunction");

        if (event.keyCode === ENTER_KEY) {
            clearTimeout(this.timer)
            this.triggerChange()
        } else if (event.keyCode === 27) {
            clearTimeout(this.timer)
            this.setState({ s: '' });
            this.triggerChange()
        }
    }

    handleChange = prop => event => {
        console.log("handleChange");


        this.setState({ [prop]: event.target.value });

        if (prop === 's') {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
        }
    };

    triggerChange = (s = this.state.s) => {

        console.log("start to search", s)

        //this.props.applySearchText(s);
    }

    clearSearch = () => {
        clearTimeout(this.timer)
        this.setState({ s: '' });
        this.triggerChange('')
    }

    toggleFilterPanel= (event) =>{
        this.props.toggleFilterPanel();
    }

    render() {
        const {
            classes,
        } = this.props;
        const {filterState} = this.state;

        return (
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-start p-12">
                    <Button
                        onClick={this.toggleFilterPanel}
                        aria-label="toggle filter panel"
                        color="secondary"
                        className={classNames(classes.filterPanelButton)}
                    >
                        <img className={classes.imageIcon} alt="" src="assets/images/invoices/filter.png" />
                    </Button>
                </div>

                <Paper className={"flex items-center w-full h-44 mr-0"} elevation={1}>
                    <Icon color="action" className="ml-16">search</Icon>
                    <Input
                        placeholder="Search..."
                        className={classNames(classes.search, 'pl-16')}
                        disableUnderline
                        fullWidth
                        value={this.state.s}
                        onChange={this.handleChange('s')}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        // onKeyDown={this.handleKeyDown}
                    />

                    <IconButton
                        className={classNames(classes.button)}
                        // className={classNames(classes.button)}
                        aria-label="Add an alarm"
                        onClick={this.clearSearch}>
                        <Icon color="action">close</Icon>
                    </IconButton>
                </Paper>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleFilterPanel: Actions.toggleUsersFilterPanel
    }, dispatch);
}

function mapStateToProps({ usersApp }) {
    return {
        fpStatus: usersApp.users.fpStatus
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(VerificationSearchBar)));
