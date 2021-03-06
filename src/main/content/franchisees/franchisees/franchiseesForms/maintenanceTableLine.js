import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from 'store/actions';
//Material UI core and icons
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    Toolbar, Typography, Paper, Icon, IconButton, Tooltip, MenuItem, FormControlLabel
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

// third party
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import TextField from "@material-ui/core/TextField/TextField";
import Dialog from "@material-ui/core/Dialog/Dialog";
import GridContainer from "../../../../../Commons/Grid/GridContainer";
import GridItem from "../../../../../Commons/Grid/GridItem";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Person from "@material-ui/core/SvgIcon/SvgIcon";

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: "#3c93ec",
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: "white",
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            {children}
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);



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

class FranchiseeFeesTableHead extends React.Component {
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


FranchiseeFeesTableHead.propTypes = {
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

let FranchiseeFeeTableToolbar = props => {
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

FranchiseeFeeTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

FranchiseeFeeTableToolbar = withStyles(toolbarStyles)(FranchiseeFeeTableToolbar);

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
        franchiseeFeesHeadRoot: {
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
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    btnAddFees: {
        marginBottom: '20px'
    },
    iconSmall: {
        fontSize: 20,
    },
    dialogH2: {
        display: "flex",
        alignItems: "center",
        color: "white"
    }
});

const feeTypeList = [
    {FeeName:"Accounting Fee"},
    {FeeName:"Advertising Fee"},
    {FeeName:"Royalty Fee"},
    {FeeName:"Additional Billing (R.O.) Commission Fee"},
    {FeeName:"Business Protection Fee"}
]

class FranchiseesMaintenanceTable extends React.Component {
    state = {
        order: 'asc',
        selected: [],
        page: 0,
        rowsPerPage: 10,
        labelWidth: 0,
        franchiseeFees: [],
        openDialog: false,
        feesList: "",
        feeAmount:"",
        feeActive: false,
        insertPayload: null,
        dialogForm:[],
        tempDialogForm:
        {
          FeeName: "",
          Amount: 0,
          Deduct: true
        }
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
        if(this.props.insertPayload.Fees.length === 0){
            this.state.dialogForm.map(x=>{
                this.handleUpdateFeeInsertPayload(x,"add");
            });
        }
    }
    componentWillMount() {

        if(this.props.insertPayload.Fees .length > 0){
            const feeList = this.props.insertPayload.Fees;
            const insertPayload = this.props.insertPayload;
            //console.log("insertPayload",feeList);
            this.setState({
                dialogForm: feeList,
                insertPayload: this.props.insertPayload,
            });

        }else{
            const feeList = this.props.franchiseeFees;
            const insertPayload = this.props.insertPayload;
            const dialogForm = this.state.dialogForm;

            feeList.map(x=>{
                dialogForm.push({
                    FeeName: x.Name,
                    Amount: x.Amount,
                    Deduct:x.IsActive
                })
            });

            this.props.insertPayload.Fees = dialogForm;

            this.setState({
                dialogForm: dialogForm,
                insertPayload: this.props.insertPayload,
            });
        }
    }

    handleCheckboxChange = name => event=> {

        this.handleInitialUpdate(name,event.target.checked);

    }

    handleClickOpen = () => {
        this.setState({ openDialog: true });
    };

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    handleInitialUpdate (name , value){
        let originalStatus = this.props.franchiseeFees;
        const iStatus = this.props.franchiseeFees.FranchiseeFees;
        originalStatus.FranchiseeFees = iStatus.map( x => {
           if(x[name] != undefined){
               x[name] = value
           }
           return x;
        });

        this.setState({
            franchiseeFees: originalStatus.FranchiseeFees,
        });
        this.props.franchiseeFeeUpdateCheckbox(originalStatus);
    }

    handleChangeFeeTableCheckbox = (index) => event => {
         const dialogForm = this.state.dialogForm;
         dialogForm[index].Deduct = event.target.checked;
         this.setState({dialogForm: dialogForm});
    }

    handleChangeAddFeesSelect = (name) => event => {
        const tempDialogForm = this.state.tempDialogForm;
        if(name === "FeeName"){
            tempDialogForm.FeeName = event.target.value;
        }
        if(name === "Amount"){
            tempDialogForm.Amount = event.target.value;
        }
        if(name === "Deduct"){
            tempDialogForm.Deduct = event.target.checked;
        }

        this.setState({tempDialogForm: tempDialogForm});
    }

    handleAddFees = () => {
        // this.handleUpdateFeeInsertPayload(this.state.dialogForm,"add");
        this.handleUpdateFeeInsertPayload(this.state.tempDialogForm , "add");
        this.handleResetDialog();
        this.setState({openDialog: false});
    }

    handleResetDialog = () =>{
        this.setState({
            tempDialogForm:{
                FeeName: "",
                Amount: 0,
                Deduct:true
            }
        });
    }

    handleUpdateFeeInsertPayload = (param , actionType) => {
        const payloadData = this.state.insertPayload;

        if(actionType === "add"){
            payloadData.Fees.push(param);
        }
        if(actionType === "remove"){
            payloadData.Fees = param;
        }

        this.setState({dialogForm: payloadData.Fees});
        this.setState({insertPayload: payloadData});
        this.props.franchiseeUpdateInsertPayload(payloadData);
    }

    render() {
        const { classes } = this.props;
        const {  dialogForm,order, orderBy, selected, rowsPerPage, page } = this.state;
        let markup = 0.0;
        const headers = [
            {
                id: 'Fee',
                numeric: false,
                disablePadding: false,
                label: 'Fee'
            },
            {
                id: 'Rate',
                numeric: false,
                disablePadding: false,
                label: 'Rate'
            },
            {
                id: 'Deduct',
                numeric: false,
                disablePadding: false,
                label: 'Deduct'
            },
            {
                id: 'Action',
                numeric: false,
                disablePadding: false,
                label: 'Action'
            }
        ];

        return (
            <div className={classes.root}>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classNames(classes.button,classes.btnAddFees)}>
                    <Icon  className={classes.leftIcon}>add fees</Icon>
                    add
                </Button>
            <Paper>
                <div className={classNames(classes.tableWrapper,"mt-5 mb-5")}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <FranchiseeFeesTableHead
                            className={classNames(classes.franchiseeFeesHeadRoot)}
                            numSelected={selected.length}
                            order={order}
                            onRequestSort={this.handleRequestSort}
                            rowCount={dialogForm.length}
                            headers={headers}
                        />
                        <TableBody>
                            {dialogForm.length > 0 && (
                                stableSort(dialogForm, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((n,index) => {
                                            return (
                                                <TableRow hover key={index}>
                                                    <TableCell>
                                                        {n.FeeName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {n.Amount}
                                                        <span>&nbsp;%</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={dialogForm[index]["Deduct"]} />
                                                            }
                                                            onChange={this.handleChangeFeeTableCheckbox(index)}
                                                            value="Y"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                            <IconButton>
                                                                <Icon>delete</Icon>
                                                            </IconButton>
                                                            <IconButton>
                                                                <Icon>edit</Icon>
                                                            </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"sm"}
                    fullWidth
                >
                    <form action="/" method={"POST"} onSubmit={(e) => {e.preventDefault();this.handleAddFees();}}>
                        <DialogTitle id="form-dialog-title" onClose={this.handleClose }>
                            <h2 className={classes.dialogH2}>
                                <AddIcon  className={classNames(classes.leftIcon)} />
                                Add Franchisee Fee
                            </h2>
                        </DialogTitle>
                        <DialogContent>
                            <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="dialogFeeName"
                                        label="Fee Names"
                                        select
                                        className={classes.textField}
                                        value={this.state.tempDialogForm.FeeName}
                                        onChange={this.handleChangeAddFeesSelect('FeeName')}
                                        margin="dense"
                                        required
                                        fullWidth
                                    >
                                        {feeTypeList.map((option, index) => (
                                            <MenuItem key={index} value={option.FeeName}>
                                                {option.FeeName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <TextField
                                        id="dialogFeeAmount"
                                        label="Amount"
                                        className={classes.textField}
                                        type={"number"}
                                        value={this.state.tempDialogForm.Amount}
                                        onChange={this.handleChangeAddFeesSelect("Amount")}
                                        margin="dense"
                                        fullWidth
                                        required
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.tempDialogForm.Deduct} />
                                        }
                                        onChange={this.handleChangeAddFeesSelect('Deduct')}
                                        className={classes.textField}
                                        label="Active"
                                        margin="dense"
                                    />
                                </GridItem>
                            </GridContainer>
                        </DialogContent>
                        <DialogActions style={{padding:"2%"}}>
                            <Button type="submit" color={"primary"} variant="contained" size="small" className={classes.button}>
                                <SaveIcon  className={classNames(classes.leftIcon, classes.iconSmall)} />
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFranchiseeFeeMaintenance: Actions.getFranchiseeFeeMaintenance,
        franchiseeFeeUpdateCheckbox: Actions. franchiseeFeeUpdateCheckbox,
        franchiseeUpdateInsertPayload: Actions.franchiseeUpdateInsertPayload
    }, dispatch);
}


function mapStateToProps({ franchisees, auth }) {
    return {
        regionId: auth.login.defaultRegionId,
        franchiseeFees: franchisees.franchiseeFees,
        insertPayload: franchisees.insertPayload
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesMaintenanceTable)));

