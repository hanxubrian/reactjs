import React, { Component } from 'react';

import { Icon, IconButton, Input, Paper, Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';

import { withStyles } from "@material-ui/core";

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

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

    timer = null

    constructor(props) {
        super(props)

        this.state =
            {
                s: ""
            }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    handleKeyDown = (event) => {

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
        this.setState({ [prop]: event.target.value });

        if (prop === 's') {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
        }
    };

    triggerChange = (s = this.state.s) => {

    };

    clearSearch = () => {
        clearTimeout(this.timer);
        this.setState({ s: '' });
        this.triggerChange('')
    };

    render() {
        const {
            classes,
        } = this.props

        return (
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-start p-12">
                    <Button
                        onClick={this.props.toggleFilterPanel}
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

                <div className="flex items-center justify-end p-12">
                    <Button
                        onClick={this.props.toggleSummaryPanel}
                        aria-label="toggle summary panel"
                        className={classNames(classes.summaryPanelButton)}
                    >
                        <Icon>insert_chart</Icon>
                    </Button></div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleFilterPanel: Actions.toggleVerificationFilterPanel,
        toggleSummaryPanel: Actions.toggleVerificationSummaryPanel
    }, dispatch);
}

function mapStateToProps({ verifications }) {
    return {

    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(VerificationSearchBar)));
