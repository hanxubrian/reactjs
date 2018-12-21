import React, {Component} from 'react';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import keycode from 'keycode';

import * as Actions from './../../../store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

const styles = theme => ({
    root : {
        width                         : 50,
        maxWidth                      : 50,
        minWidth                      : 50,
        [theme.breakpoints.down('md')]: {
            width   : 0,
            maxWidth: 0,
            minWidth: 0
        }
    },
    panel: {
        position                      : 'absolute',
        width                         : 300,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        right                         : 40,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(290px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition                    : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened'                    : {
            transform: 'translateX(40px)'
        }
    }
});

class SummaryPanel extends Component {

    componentDidMount()
    {
    }

    componentDidUpdate(prevProps)
    {
        if ( this.props.state !== prevProps.state )
        {
            if ( this.props.state )
            {
                document.addEventListener("keydown", this.handleDocumentKeyDown);
            }
            else
            {
                document.removeEventListener('keydown', this.handleDocumentKeyDown);
            }
        }
    }

    componentWillUnmount()
    {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    handleDocumentKeyDown = event => {
        if ( keycode(event) === 'esc' )
        {
            this.props.closeSummaryPanel();
        }
    };

    render()
    {
        const {classes, openSummaryPanel, closeSummaryPanel, summaryState} = this.props;

        return (
            <div className={classes.root}>
                <ClickAwayListener onClickAway={() => summaryState && closeSummaryPanel()}>
                    <div className={classNames(classes.panel, {'opened': summaryState}, "flex flex-col")}>
                        <AppBar position="static" elevation={1}>
                            <Toolbar className="pl-12 pr-8">
                                <div className="flex flex-1 items-center" style={{marginLeft: "-1rem"}}>
                                    {(!summaryState) && (
                                        <React.Fragment>
                                            <IconButton color="inherit" onClick={openSummaryPanel}>
                                                <Icon className="text-24" >filter</Icon>
                                            </IconButton>

                                        </React.Fragment>
                                    )}
                                </div>
                                <h2 style={{marginRight: 10}}>Invoice Summary</h2>
                                <IconButton onClick={()=>closeSummaryPanel()} color="inherit">
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Paper className="flex flex-1 flex-row min-h-px">
                        </Paper>
                    </div>
                </ClickAwayListener>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openSummaryPanel: Actions.openSummaryPanel,
        closeSummaryPanel: Actions.closeSummaryPanel,
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        summaryState: invoices.bOpenedSummaryPanel,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SummaryPanel)));
