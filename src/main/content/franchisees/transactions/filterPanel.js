import React, {Component} from 'react';
import {Paper, withStyles} from '@material-ui/core';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as Actions from 'store/actions';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

const styles = theme => ({
    root : {
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
        left                         :  -300,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(50px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition  : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened1'                    : {
            transform: 'translateX(300px)'
        }
    }
});

class FilterPanel extends Component {

    state = {
        checkedOpen: true,
        checkedCompleted: true,
    };

    componentDidMount()
    {
    }

    componentWillMount(){
        this.setState({
            checkedOpen: this.props.transactionStatus.checkedOpen,
            checkedCompleted: this.props.transactionStatus.checkedCompleted,
            });
    }

    componentDidUpdate(prevProps)
    {
    }

    componentWillUnmount()
    {

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.toggleStatus(name, event.target.checked)
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root)}>
                <div className={classNames("flex flex-col")}>
                    <Paper className="flex flex-1 flex-col min-h-px p-20">

                        <div style={{marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                            <h3>Transaction Status</h3>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedOpen}
                                        onChange={this.handleChange('checkedOpen')}
                                        value="checkedOpen"
                                    />
                                }
                                label="Open"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedCompleted}
                                        onChange={this.handleChange('checkedCompleted')}
                                        value="checkedCompleted"
                                    />
                                }
                                label="Completed"
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleStatus: Actions.toggleStatus
    }, dispatch);
}

function mapStateToProps({invoices})
{
    return {
        filterState: invoices.bOpenedFilterPanel,
        transactionStatus: invoices.transactionStatus
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
