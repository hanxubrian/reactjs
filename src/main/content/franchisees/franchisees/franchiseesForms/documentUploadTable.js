import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Actions from 'store/actions';
import { withStyles } from '@material-ui/core/styles';

//Material UI core and icons
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    Toolbar, Typography, Paper, Icon, IconButton, Tooltip, Fab} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

// third party
import TextField from "@material-ui/core/TextField/TextField";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";


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
        view: []
    };
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
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
        if(this.props.documentsList != null){
            this.setState({
                documentsList: this.props.documentsList
            })
        }
    }

    documentView(data){

    }

    handleChange(selectorFiles,id)
    {
        let today = new Date();
        let month = "";
        let day = "";
        if((today.getMonth()+1)<10){
            month = '0'+(today.getMonth()+1)
        }else{
            month = (today.getMonth()+1)
        }
        if(today.getDate()<10){
            day = '0'+(today.getDate())
        }else{
            day = (today.getDate())
        }
        let date = today.getFullYear()+'-'+month+'-'+day;
        const list = this.props.documentsList;
        list.map(x=>{
            if(id === x.FileTypeListId){
                x.UploadDocuments=selectorFiles;
                x["documentDateTime"+id] = date;
                x["documentFileSize"+id] = selectorFiles[0].size+" bytes";
            }
        })
        const tempInsertPayload = this.props.insertPayload;
        tempInsertPayload.documents = list;
        this.props.franchiseeUpdateInsertPayload(tempInsertPayload);
        this.setState({
            documentsList: list
        });
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
                id: 'uploadDateTime',
                numeric: false,
                disablePadding: false,
                label: 'Upload Date Time'
            },
            {
                id: 'fileSize',
                numeric: false,
                disablePadding: false,
                label: 'File Size'
            },
            {
                id: 'view',
                numeric: false,
                disablePadding: false,
                label: 'View'
            },
            {
                id: 'browse',
                numeric: false,
                disablePadding: false,
                label: 'Browse'
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
                                                <TableRow hover key={n.FileTypeListId} >
                                                    <TableCell component="td" scope="row" >
                                                        {n.Name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {documentsList[index]["documentDateTime"+n.FileTypeListId]}
                                                    </TableCell>
                                                    <TableCell>
                                                        {documentsList[index]["documentFileSize"+n.FileTypeListId]}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            className={classNames(classes.summaryPanelButton, "mr-12")}
                                                            aria-label="view-icon"
                                                            onClick={(ev) => this.documentView(["documentView"+n.FileTypeListId])}>
                                                            <Icon>visibility</Icon>
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id={"value" + n.FileTypeListId}
                                                            type="file"
                                                            multiple
                                                            onChange={ (e) => this.handleChange(e.target.files,n.FileTypeListId)}
                                                            margin="dense"
                                                            className={classes.textField}
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                    }
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
       getFranchiseeDocumentsList: Actions.getFranchiseeDocumentsList,
       franchiseeUpdateInsertPayload: Actions.franchiseeUpdateInsertPayload,
    }, dispatch);
}

function mapStateToProps({ franchisees, auth }) {
    return {
        regionId: auth.login.defaultRegionId,
        documentsList: franchisees.documentsList,
        insertPayload: franchisees.insertPayload
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesDocumentUploadTable)));