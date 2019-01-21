import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Material UI core and icons
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    Toolbar, Typography, Paper, Icon, IconButton, Tooltip, Fab, MenuItem, FormControlLabel
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

// third party

import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import GridContainer from "../../../../Commons/Grid/GridContainer";
import GridItem from "../../../../Commons/Grid/GridItem";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import SaveIcon from '@material-ui/icons/Save';
import Person from '@material-ui/icons/Person';
import Phone from '@material-ui/icons/Phone';
import Title from '@material-ui/icons/Title';
import BorderColor from '@material-ui/icons/BorderColor';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

let counter = 0;

function createData(firstName = '',lastName='', phone = '', title = 'description') {
	return {
		id: counter++,
		firstName,
		lastName,
		phone,
		title
	};
}

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

class CustomerLineTableHead extends React.Component {
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
					<TableCell padding="checkbox" style={{ width: 100 }}>
						Action
                    </TableCell>
				</TableRow>
			</TableHead>
		);
	}
}


CustomerLineTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
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

let CustomerLineTableToolbar = props => {
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

CustomerLineTableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired
};

CustomerLineTableToolbar = withStyles(toolbarStyles)(CustomerLineTableToolbar);

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
		CustomerLineHeadRoot: {
			backgroundColor: 'lightgray',
		},
	},
	outlined: {
		padding: "12px 24px 12px 12px!important"
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
	btnAddOwners: {
        marginBottom: '20px'
    },
	leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class leaseTable extends React.Component {
	state = {
		order: 'asc',
		selected: [],
		page: 0,
		rowsPerPage: 10,
		labelWidth: 0,
		data: [
			createData('Make','Model', '99999', '99999', '1', '1', '5')
		],
        openDialog: false,
        dialogFirstName: "",
		dialogLastName: "",
		dialogPhone: "",
		dialogTitle: ""
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

	handleSelectAllClick = event => {
		if (event.target.checked) {
			this.setState(state => ({ selected: state.data.map(n => n.id) }));
			return;
		}
		this.setState({ selected: [] });
	};

	componentDidMount() {
		let id = 0;
		const data = [...this.state.data];
		let newData = data.map(record => {
			record.id = id++;
			return record;
		});
		this.setState({ data: newData })
	}

    handleClickOpen = () => {
        this.setState({ openDialog: true });
    };

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    handleChangeAddOwnerSelect = (name) => event => {
        this.setState({
            [name]: event.target.value
        })
    }

	render() {
		const { classes } = this.props;
		const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
		console.log("this.props.tableType", this.props.tableType)
		return (
			<div className={classes.root}>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classNames(classes.button,classes.btnAddOwners)}>
                    <Icon  className={classes.leftIcon}>add Owner</Icon>
                    add
                </Button>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<CustomerLineTableHead
							className={classNames(classes.CustomerLineHeadRoot)}
							numSelected={selected.length}
							order={order}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
							headers={this.props.headers}
						/>
						<TableBody>
							{stableSort(data, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
										return (
											<TableRow hover key={n.id} >
												<TableCell component="td" scope="row" >
													{n.firstName}
												</TableCell>
                                                <TableCell component="td" scope="row" >
                                                    {n.lastName}
                                                </TableCell>
												<TableCell>
                                                    {n.phone}
												</TableCell>
												<TableCell>
                                                    {n.title}
												</TableCell>
                                                <TableCell>
                                                    {n.title}
												</TableCell>
                                                <TableCell>
                                                    {n.title}
												</TableCell>
                                                <TableCell>
                                                    {n.title}
												</TableCell>
                                                <TableCell>
                                                    {n.title}
												</TableCell>
												<TableCell padding="checkbox">
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
								)}
						</TableBody>
					</Table>
				</div>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth={"md"}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">ADD LEASE</DialogTitle>
                    <DialogContent>
                        <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="dialogFirstName"
                                    label="Make"
                                    className={classes.textField}
                                    value={this.state.dialogFirstName}
                                    onChange={this.handleChangeAddOwnerSelect("dialogFirstName")}
                                    margin="dense"
                                    fullWidth
									style={{marginRight: "1%"}}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BorderColor style={{color:"gray"}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="dialogLastName"
                                    label="Model"
                                    className={classes.textField}
                                    value={this.state.dialogLastName}
                                    onChange={this.handleChangeAddOwnerSelect("dialogLastName")}
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    style={{marginLeft: "1%"}}
                                    fullWidth
                                    required
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">

                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="dialogPhone"
                                    label="Serial Number"
                                    className={classes.textField}
                                    value={this.state.dialogPhone}
                                    onChange={this.handleChangeAddOwnerSelect("dialogPhone")}
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BorderColor style={{color:"gray"}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="dialogTitle"
                                    label="Lease Amount"
                                    className={classes.textField}
                                    value={this.state.dialogTitle}
                                    onChange={this.handleChangeAddOwnerSelect("dialogTitle")}
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BorderColor style={{color:"gray"}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="dialogTitle"
                                    label="Total Tax"
                                    className={classes.textField}
                                    value={this.state.dialogTitle}
                                    onChange={this.handleChangeAddOwnerSelect("dialogTitle")}
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BorderColor style={{color:"gray"}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="dialogTitle"
                                    label="Lease Term"
                                    className={classes.textField}
                                    value={this.state.dialogTitle}
                                    onChange={this.handleChangeAddOwnerSelect("dialogTitle")}
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BorderColor style={{color:"gray"}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="dialogTitle"
                                    label="Total Lease"
                                    className={classes.textField}
                                    value={this.state.dialogTitle}
                                    onChange={this.handleChangeAddOwnerSelect("dialogTitle")}
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BorderColor style={{color:"gray"}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                <TextField
                                    id="dialogTitle"
                                    label="Payment Number"
                                    className={classes.textField}
                                    value={this.state.dialogTitle}
                                    onChange={this.handleChangeAddOwnerSelect("dialogTitle")}
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BorderColor style={{color:"gray"}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    required
                                />
                            </GridItem>
                        </GridContainer>
                    </DialogContent>
                    <DialogActions style={{padding:"2%"}}>
                        <Button onClick={this.handleClose} variant="contained"  size="small" className={classes.button}>
                            <CancelIcon style={{color:"gray"}} className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} variant="contained" size="small" className={classes.button}>
                            <SaveIcon style={{color:"gray"}} className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
			</div>
		);
	}
}

leaseTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(leaseTable);
