import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Actions from 'store/actions';
import { withStyles } from '@material-ui/core/styles';

//Material UI core and icons
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    Toolbar, Typography, Paper, Button, IconButton, Tooltip, TablePagination, Icon
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

// third party
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {Link, withRouter} from "react-router-dom";

import FindersFeesStopModal from './findersFeesStopModal';
import NumberFormat from 'react-number-format';

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
    }
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
        rowsPerPage: 10,
        labelWidth: 0,
        view: [],
        stopReasonModal: false,
        periodForReport: this.props.periodForReport
    };

    constructor (props){
        super(props);
    }

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

    componentDidMount() {

    }

    componentWillMount() {
        this.setState({stopReasonModal:this.props.stopReasonModal});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.stopReasonModal !== this.props.stopReasonModal){
            this.setState({stopReasonModal:nextProps.stopReasonModal});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.periodForReport!==prevProps.periodForReport){
            this.setState({periodForReport: this.props.periodForReport})
        }
    }


    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes,franchiseeReports } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;

        console.log('periodForReport=', this.state.periodForReport);

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
        let data;

        if(franchiseeReports.length) {
            data = franchiseeReports.map(r => {
                let prefix='';
                if(r.BillMonth<10) prefix='0';
                r.period = `${prefix}${r.BillMonth}/${r.BillYear}`;
            });
        }
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <FranchiseeReportTableHead
                            className={classNames(classes.HeadRoot)}
                            numSelected={selected.length}
                            order={order}
                            onRequestSort={this.handleRequestSort}
                            rowCount={franchiseeReports.length}
                            headers={headers}
                        />
                        {franchiseeReports.length && (
                            <TableBody>
                            {data.length > 0 && (
                                stableSort(franchiseeReports, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((n,index) => {
                                            return (
                                                <TableRow hover key={index} >
                                                    <TableCell >
                                                        {n.period}
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
                                                        <IconButton
                                                            //onClick={}
                                                            //component={Link}
                                                        >
                                                            <Icon>visibility</Icon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    ))}
                        </TableBody>
                        )}
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={franchiseeReports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <FindersFeesStopModal />
            </Paper>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseStopReasonDialog: Actions.openCloseStopReasonDialog
    }, dispatch);
}

function mapStateToProps({ franchisees, auth }) {
    return {
        franchiseeReports: franchisees.franchiseeReports,
        franchiseesForm: franchisees.createFranchisees,
        regionId: auth.login.defaultRegionId,
        insertPayload: franchisees.insertPayload,
        stopReasonModal: franchisees.stopReason,
        periodForReport: franchisees.periodForReport,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseeReportTable)));
