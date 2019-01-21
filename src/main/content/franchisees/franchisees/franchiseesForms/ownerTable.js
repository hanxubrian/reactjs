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
import GridContainer from "../../../../../Commons/Grid/GridContainer";
import GridItem from "../../../../../Commons/Grid/GridItem";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import SaveIcon from '@material-ui/icons/Save';
import Person from '@material-ui/icons/Person';
import Phone from '@material-ui/icons/Phone';
import Title from '@material-ui/icons/Title';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MaskedInput from "react-text-mask";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';





let counter = 0;

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['+',/[1-9]/,'(',/\d/,/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


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
								padding={row.disablePadding ? 'none' : 'default'}
							>
								{row.label}
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

class FranchiseesOwnerTable extends React.Component {
	state = {
		order: 'asc',
		selected: [],
		page: 0,
		rowsPerPage: 10,
		labelWidth: 0,
		data: [],
        openDialog: false,
        insertPayload: null,
		dialogForm: {
			FirstName: "",
			LastName: "",
			Phone: "+1(  )    -    ",
			Title: ""
		}
	};
    constructor (props){
        super(props);
    }


	componentDidMount() {

	}

	componentWillMount() {
        this.setState({
            data: this.props.insertPayload.Owners,
            insertPayload: this.props.insertPayload
        });
    }


    handleClickOpen = () => {
        this.setState({ openDialog: true });
    };

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    handleChangeAddOwnerSelect = (name) => event => {
        const dialogForm = this.state.dialogForm;
        if(name === "FirstName"){
            dialogForm.FirstName = event.target.value;
        }
        if(name === "LastName"){
            dialogForm.LastName = event.target.value;
        }
        if(name === "Title"){
            dialogForm.Title = event.target.value;
        }
        if(name === "Phone"){
            dialogForm.Phone = event.target.value;
        }
        this.setState({dialogForm: dialogForm});
    }

    handleAddOwner = () => {
        this.handleUpdateOwnerInsertPayload(this.state.dialogForm , "add");
		this.handleResetDialog();
        this.setState({openDialog: false});
	}

    handleRemoveOwner = (index) => {
        const payloadData = this.state.insertPayload.Owners;
        let removedData = payloadData.slice(0, index).concat(payloadData.slice(index+1, payloadData.length));
        this.handleUpdateOwnerInsertPayload(removedData,"remove");
    }

	handleResetDialog = () =>{
        this.setState({dialogForm:{
                FirstName: "",
                LastName: "",
                Title: "",
                Phone: "+1(  )    -    "
        }});
	}

	handleUpdateOwnerInsertPayload = (param, actionType) => {
    	const payloadData = this.state.insertPayload;
        if(actionType === "add"){
            payloadData.Owners.push(param);
        }
        if(actionType === "remove"){
            payloadData.Owners = param;
        }
        this.setState({data: payloadData.Owners});
        this.setState({insertPayload: payloadData})
    	this.props.franchiseeUpdateInsertPayload(payloadData);
	}

	render() {
		const { classes } = this.props;
		const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

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
							headers={this.props.headers}
						/>
                        {data.length > 0 && (
							<TableBody>
								{stableSort(data, getSorting(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((n,index) => {
											return (
												<TableRow hover key={index} >
													<TableCell component="td" scope="row" >
														{n.FirstName}
													</TableCell>
													<TableCell component="td" scope="row" >
														{n.LastName}
													</TableCell>
													<TableCell>
														{n.Phone}
													</TableCell>
													<TableCell>
														{n.Title}
													</TableCell>
													<TableCell padding="checkbox">
														<IconButton onClick={()=>this.handleRemoveOwner(index)}>
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
                        )}
                        {data.length === 0 && (
							<TableBody>
								<TableRow>
									<TableCell>
										No Data
									</TableCell>
								</TableRow>
							</TableBody>
						)}
					</Table>
				</div>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth={"sm"}
                    fullWidth
                >
					<form action="/" method={"POST"} onSubmit={(e) => {e.preventDefault();this.handleAddOwner();}}>
						<DialogTitle id="form-dialog-title">ADD OWNER</DialogTitle>
						<DialogContent>
							<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										id="dialogFirstName"
										label="First Name"
										className={classes.textField}
										value={this.state.dialogForm.FirstName}
										onChange={this.handleChangeAddOwnerSelect("FirstName")}
										margin="dense"
										inputProps={{
											maxLength: 20
										}}
										fullWidth
										style={{marginRight: "1%"}}
										required
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<Person style={{color:"gray"}} />
												</InputAdornment>
											),
										}}
									/>
									<TextField
										id="dialogLastName"
										label="Last Name"
										className={classes.textField}
										value={this.state.dialogForm.LastName}
										onChange={this.handleChangeAddOwnerSelect("LastName")}
										margin="dense"
										inputProps={{
											maxLength: 20
										}}
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
										label="Phone"
										className={classes.textField}
										margin="dense"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<Phone style={{color:"gray"}} />
												</InputAdornment>
											),
											inputComponent: TextMaskCustom,
											value:this.state.dialogForm.Phone,
											onChange:this.handleChangeAddOwnerSelect("Phone"),
										}}
										inputProps={{
											maxLength: 20
										}}
										fullWidth
										required
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										id="dialogTitle"
										label="Title"
										className={classes.textField}
										value={this.state.dialogForm.Title}
										onChange={this.handleChangeAddOwnerSelect("Title")}
										margin="dense"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<Title style={{color:"gray"}}/>
												</InputAdornment>
											),
										}}
										inputProps={{
											maxLength: 20
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
							<Button type="submit" variant="contained" size="small" className={classes.button}>
								<SaveIcon style={{color:"gray"}} className={classNames(classes.leftIcon, classes.iconSmall)} />
								Save
							</Button>
						</DialogActions>
					</form>
                </Dialog>
			</div>
		);
	}
}

FranchiseesOwnerTable.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        franchiseeUpdateInsertPayload: Actions.franchiseeUpdateInsertPayload,
    }, dispatch);
}

function mapStateToProps({ franchisees, auth }) {
    return {
    	insertPayload: franchisees.insertPayload
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchiseesOwnerTable)));
