import React, {Component} from 'react';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import {FuseAnimate} from '@fuse';
//Material UI core
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as Actions from './../../../store/actions';
import Widget8 from './widget8';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


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
    },
    card: {
        minWidth: 260,
        maxWidth: 260,
        backgroundColor: '#3C4252',
        marginTop: 30
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class SummaryPanel extends Component {
    state = {
        value: 0,
    };

    componentDidMount()
    {
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
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
        const {classes, widgets,openSummaryPanel, closeSummaryPanel, summaryState} = this.props;
        const { value } = this.state;

        let widgets_data ={
            widget8: {
                datasets: [
                    [
                        {
                            label      : '1Day',
                            data       : [72, 65, 70, 78, 85, 82, 88],
                            fill       : false,
                            borderColor: '#5c84f1'
                        }
                    ],
                    [
                        {
                            label      : '1Week',
                            data       : [540, 539, 527, 548, 540, 552, 566],
                            fill       : false,
                            borderColor: '#5c84f1'
                        }
                    ],
                    [
                        {
                            label      : '1Month',
                            data       : [1520, 1529, 1567, 1588, 1590, 1652, 1622],
                            fill       : false,
                            borderColor: '#5c84f1'
                        }
                    ]
                ],
                labels  : ['1', '2', '3', '4', '5', '6', '7'],
                options : {
                    spanGaps           : true,
                    legend             : {
                        display: false
                    },
                    maintainAspectRatio: true,
                    elements           : {
                        point: {
                            radius          : 2,
                            borderWidth     : 1,
                            hoverRadius     : 2,
                            hoverBorderWidth: 1
                        },
                        line : {
                            tension: 0
                        }
                    },
                    layout             : {
                        padding: {
                            top   : 24,
                            left  : 16,
                            right : 16,
                            bottom: 16
                        }
                    },
                    scales             : {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: true,
                                ticks  : {
                                    // min: 100,
                                    // max: 500
                                }
                            }
                        ]
                    }
                },
                today   : '12,540',
                change  : {
                    value     : 321,
                    percentage: 2.05
                }
            },
        }
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
                        <Paper className="flex flex-1 flex-col min-h-px" style={{alignItems: 'center', flexDirection:'column'}}>
                            <Card className={classes.card} >
                                <CardContent>
                                    <h2>Sales</h2>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Lifetime sum of your sale
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {this.props.invoices.headerData.totalInvoice}
                                    </Typography>

                                </CardContent>
                            </Card>
                            <Card className={classes.card} >
                                 <div className="mb-32 w-full sm:w-1/2 md:w-full">

                                    <FuseAnimate delay={600}>
                                        <div className="px-16 pb-8 text-18 font-300">
                                            How are your sales?
                                        </div>
                                    </FuseAnimate>

                                    <div className="widget w-full p-16">
                                        <Widget8 data={widgets_data.widget8}/>
                                    </div>
                                </div>
                            </Card>
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
        invoices: invoices.invoicesDB
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SummaryPanel)));
