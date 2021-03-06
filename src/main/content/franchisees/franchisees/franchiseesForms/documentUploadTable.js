import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Actions from 'store/actions';
import { withStyles } from '@material-ui/core/styles';

//Material UI core and icons
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    Toolbar, Typography, Paper, Icon, IconButton, Tooltip} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

// third party
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import DocumentSignatureDialog from "./documentSignature";
import DocumentViewDialog from "./documentView";


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

class DocumentUploadTableHead extends React.Component {

    state = {
        docSendModal: false
    }

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


DocumentUploadTableHead.propTypes = {
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

let documentUploadTableToolbar = props => {
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

documentUploadTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

documentUploadTableToolbar = withStyles(toolbarStyles)(documentUploadTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        head: {
            color: 'black',
        },
        '& thead tr th': {
            color: 'black!important',
            fontWeight: 700,
            fontSize: 14,
            padding: "4px 24px",
            width: 180
        },
        '& tbody tr td': {
            padding: "4px 24px",
            width: 180
        },
        documentuploadHeadRoot: {
            backgroundColor: 'lightgray',
        },
    },
    outlined: {
        padding: "6px 24px 6px 12px!important"
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: 'auto'
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

class FranchiseesDocumentUploadTable extends React.Component {
    state = {
        order: 'asc',
        selected: [],
        page: 0,
        rowsPerPage: 10,
        labelWidth: 0,
        documentsList: [],
        documentName: [],
        uploadDateTime: [],
        fileSize: [],
        view: [],

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

    componentDidMount() {

    }
    componentWillMount() {
        if(this.props.documentsList != null){
            this.setState({
                documentsList: this.props.documentsList
            });

            let documentPayloadList = [];
            this.props.documentsList.map(x=>{
                documentPayloadList.push(
                    {
                        status: x.status,
                        type: x.type,
                        name: x.name,
                        document_id: x.document_id,
                        group_permissions: x.group_permissions,
                        date_sent: "MM/DD/YYYY",
                        date_signed: "MM/DD/YYYY",
                        sign_via: "MM/DD/YYYY"
                    }
                )
            });
            let iStatus = this.props.insertPayload;
            iStatus.Documents = documentPayloadList;
            this.props.franchiseeUpdateInsertPayload(iStatus);
        }
    }

    documentView(data){

    }

    
    render() {
        const { classes } = this.props;
        const { documentsList, order, orderBy, selected, rowsPerPage, page } = this.state;

        const headers = [
            {
                id: 'doc_name',
                numeric: false,
                disablePadding: false,
                label: 'Document Name'
            },
            {
                id: 'type',
                numeric: false,
                disablePadding: false,
                label: 'Type'
            },
            {
                id: 'signDate',
                numeric: false,
                disablePadding: false,
                label: 'Sign Date'
            },
            {
                id: 'sentVia',
                numeric: false,
                disablePadding: false,
                label: 'Sent Via'
            },
            {
                id: 'status',
                numeric: false,
                disablePadding: false,
                label: 'Status'
            },
            {
                id: 'action',
                numeric: false,
                disablePadding: false,
                label: 'Action'
            }
        ];

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <DocumentUploadTableHead
                            className={classNames(classes.documentuploadHeadRoot)}
                            numSelected={selected.length}
                            order={order}
                            onRequestSort={this.handleRequestSort}
                            rowCount={documentsList.length}
                            headers={headers}
                        />
                        <TableBody>
                            {documentsList.length > 0 && (
                                stableSort(documentsList, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n,index) => {
                                            return (
                                                <TableRow hover key={n.document_id} >
                                                    <TableCell component="td" scope="row" style={{width:300}} >
                                                        {n.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {n.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        02/21/2019
                                                    </TableCell>
                                                    <TableCell>
                                                        DocuSign
                                                    </TableCell>
                                                    <TableCell>
                                                        {n.status}
                                                    </TableCell>                                                    
                                                    <TableCell style={{width: 250}}>
                                                        <IconButton
                                                            className={classNames(classes.summaryPanelButton, "mr-12")}
                                                            aria-label="view-icon"
                                                            onClick={(ev) => this.props.openCloseDocViewActionDialog(true)}>
                                                            <Icon>visibility</Icon>
                                                        </IconButton>
                                                        <IconButton
                                                                className={classNames(classes.summaryPanelButton, "mr-12")}
                                                                aria-label="send-icon"
                                                                onClick={(ev)=>this.props.openCloseDocSendActionDialog(true)}
                                                                >
                                                                <Icon>send</Icon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                    }
                                ))}
                        </TableBody>
                    </Table>
                </div>
                <DocumentSignatureDialog/>
                <DocumentViewDialog/>
            </Paper>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
       getFranchiseeDocumentsList: Actions.getFranchiseeDocumentsList,
       franchiseeUpdateInsertPayload: Actions.franchiseeUpdateInsertPayload,
       openCloseDocSendActionDialog: Actions.openCloseDocSendActionDialog,
       openCloseDocViewActionDialog: Actions.openCloseDocViewActionDialog
    }, dispatch);
}

function mapStateToProps({ franchisees, auth }) {
    return {
        regionId: auth.login.defaultRegionId,
        documentsList: franchisees.documentsList,
        insertPayload: franchisees.insertPayload,
        docSendModal: franchisees.docSendModal
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesDocumentUploadTable)));
