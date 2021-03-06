import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Actions from 'store/actions';
import { withStyles } from '@material-ui/core/styles';

//Material UI core and icons
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Button,Icon,
    Toolbar, Typography, Paper, IconButton, Tooltip, TablePagination} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

// store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

// third party
import NumberFormat from 'react-number-format';

// theme components
import {FuseAnimate} from '@fuse';

import FranchiseeReportBigModal from './FranchiseeReportBigModal';

//Child components
import Report from './../report_new'
import LegacyReport from './legacyReport'

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class FranchiseeReportTableHead extends React.Component {

    state = {
        docSendModal: false
    };

    componentWillMount(){
        this.setState({
            docSendModal: this.props.docSendModal
        });
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };


    render() {
        const { order, orderBy, headers } = this.props;
        let rows = headers;

        return (
            <TableHead style={{ backgroundColor: "lightgray" }}>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}


FranchiseeReportTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer: {
        flex: '1 1 100%'
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto'
    },
});

let FranchiseeReportToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Customer Lines
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

FranchiseeReportToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

FranchiseeReportToolbar = withStyles(toolbarStyles)(FranchiseeReportToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        head: {
            color: 'black',
        },
        '& thead tr th': {
            color: 'black!important',
            fontWeight: 700,
            fontSize: 14,
            height: 40,
            padding: "4px 12px",
            width: 'auto',
            whiteSpace: 'nowrap'
        },
        '& tbody tr td': {
            padding: "2px 12px",
            fontSize: 12,
            whiteSpace: 'nowrap'
        },
        HeadRoot: {
            backgroundColor: 'lightgray',
        },
    },
    outlined: {
        padding: "6px 24px 6px 12px!important"
    },
    table: {
        minWidth: 1020,
        overflow: 'auto',
        maxWidth: "100%",
        width: "100%"
    },
    tableWrapper: {
        overflow: 'auto'
    },
    lineButton: {
        width: 32,
        height: 32,
        minHeight: 32
    },
    lineCancelButton: {
        width: 32,
        height: 32,
        minHeight: 32,
        backgroundColor: '#ff4850',
        color: 'white',
        '&:hover': {
            backgroundColor: '#ff2a32',
        }
    },
    overlay: {
        position: 'absolute',
        top: -104,
        left: 0,
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
});

const CurrencyFormatter = ({value}) => (
    <NumberFormat value={value}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator
                  decimalScale={2}
                  prefix="$" renderText={value => <div>{value}</div>}/>
);


class FranchiseeReportTable extends React.Component {

    state = {
        order: 'asc',
        selected: [],
        page: 0,
        rowsPerPage: 13,
        labelWidth: 0,
        view: [],
        periodForReport: this.props.periodForReport,
        data: [],
        bShowReportModal: false
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    onFilterByPeriod = (month, year)=>{
        let data = this.props.franchiseeReports.filter(f=>f.BillMonth===(month+1) && f.BillYear===year);

        if(month===-1)
            data = this.props.franchiseeReports.filter(f=>f.BillYear===year);

        let filteredData = data.map(r => {
            let prefix='';
            if(r.BillMonth<10) prefix='0';
            r.period = `${prefix}${r.BillMonth}/${r.BillYear}`;
            return r;
        });

        let all_data = [{period: `${this.props.defaultPeriod}`}, ...filteredData];

        this.setState({data: all_data});
    };

    componentDidMount() {
        if(this.props.franchiseeReports!==null) {
            let year = this.state.periodForReport.year;
            let month = this.state.periodForReport.month;
            this.onFilterByPeriod(month, year);
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps){
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.periodForReport!==prevProps.periodForReport){
            this.setState({periodForReport: this.props.periodForReport});

            let year = this.props.periodForReport.year;
            let month = this.props.periodForReport.month;
            this.onFilterByPeriod(month, year);
        }
    }


    showFranchiseeModal = (row)=>{
        if(row.period===this.props.defaultPeriod) {
            let period = this.props.defaultPeriod.split('/');
            this.props.getCurrentReport({
                regionId: this.props.regionId,
                year: period[1],
                month: period[0],
                franchiseenumber: this.props.insertPayload.dlr_code
            });
        }
        else
            this.props.getLegacyReport({
                regionId: this.props.regionId,
                year: row.BillYear,
                month: row.BillMonth,
                franchiseenumber: this.props.insertPayload.dlr_code
            });
    };

    render() {
        const { classes } = this.props;
        const { order, orderBy, selected} = this.state;

        if(!this.state.data.length)
            return <div/>;

        const headers = [
            {
                id: 'BillMonth',
                numeric: false,
                disablePadding: false,
                label: 'Period'
            },
            {
                id: 'TotalRevenue',
                numeric: true,
                disablePadding: false,
                label: 'Total Revenue'
            },
            {
                id: 'TotalDeductions',
                numeric: true,
                disablePadding: false,
                label: 'Total Deductions'
            },
            {
                id: 'TotalPayment',
                numeric: true,
                disablePadding: false,
                label: 'Total Payment'
            },
            {
                id: 'action',
                numeric: true,
                disablePadding: false,
                label: 'Action'
            }
        ];

        return (
            <Paper className={classes.root}>
                {this.props.franchiseeReport===null && this.props.franchiseeLegacyReport===null ? (
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <FranchiseeReportTableHead
                                className={classNames(classes.HeadRoot)}
                                numSelected={selected.length}
                                order={order}
                                onRequestSort={this.handleRequestSort}
                                rowCount={this.state.data.length}
                                headers={headers}
                            />
                            {this.state.data.length && (
                                <TableBody>
                                    {this.state.data.length > 0 && (
                                        stableSort(this.state.data, getSorting(order, orderBy))
                                            .map((n,index) => {
                                                return (
                                                    <TableRow hover key={index} >
                                                        <TableCell >
                                                            {n.period===this.props.defaultPeriod ? (
                                                                    <strong>{n.period} (Current)</strong>
                                                                ):
                                                                (
                                                                    n.period
                                                                )}
                                                        </TableCell>
                                                        <TableCell style={{textAlign:'right'}}>
                                                            {CurrencyFormatter({value: n.TotalRevenue})}
                                                        </TableCell>
                                                        <TableCell style={{textAlign:'right'}}>
                                                            {CurrencyFormatter({value: n.TotalDeductions})}
                                                        </TableCell>
                                                        <TableCell style={{textAlign:'right'}}>
                                                            {CurrencyFormatter({value: n.TotalPayment})}
                                                        </TableCell>
                                                        <TableCell style={{textAlign:'right'}}>
                                                            {n.period===this.props.defaultPeriod ? (
                                                                    <Button color={"primary"} size={"small"} variant="contained"
                                                                            style={{textTransform: 'none'}}
                                                                            onClick={()=>this.showFranchiseeModal(n)}
                                                                    >
                                                                        Generate Report
                                                                    </Button>
                                                                )
                                                                : (
                                                                    <IconButton
                                                                        onClick={()=>this.showFranchiseeModal(n)}
                                                                        //component={Link}
                                                                    >
                                                                        <Icon>visibility</Icon>
                                                                    </IconButton>
                                                                )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                }
                                            ))}
                                </TableBody>
                            )}
                        </Table>
                    </div>

                ) : (
                    <div>
                        <Report onRef={ref => (this.child = ref)}/>
                        <LegacyReport onRef={ref => (this.childLegacy = ref)}/>
                    </div>
                )}

                {/*<FranchiseeReportBigModal onRef={component=>{this.franchiseeComponent = component}}/>*/}
            </Paper>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCurrentReport: Actions.createReport,
        getLegacyReport: Actions.getReport,
    }, dispatch);
}

function mapStateToProps({ franchisees, auth, franchiseeReports }) {
    return {
        franchiseeReports: franchisees.franchiseeReports,
        franchiseeReport: franchiseeReports.franchiseeReport1,
        franchiseeLegacyReport: franchiseeReports.franchiseeReport,
        franchiseesForm: franchisees.createFranchisees,
        regionId: auth.login.defaultRegionId,
        insertPayload: franchisees.insertPayload,
        periodForReport: franchisees.periodForReport,
        defaultPeriod: auth.login.defaultPeriod,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseeReportTable)));
