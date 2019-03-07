import React, { Component, Fragment } from 'react';
// core components
import { Card, CardHeader, CardContent, Typography, Icon, IconButton, Input, Paper, Button, TextField, Snackbar, SnackbarContent, } from '@material-ui/core';

import { withStyles, CircularProgress } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';

import FuseUtils from '@fuse/FuseUtils';
import {
	Template, TemplateConnector
} from '@devexpress/dx-react-core';

import {
	SelectionState,
	PagingState,
	IntegratedPaging,
	IntegratedSelection,
	SortingState,
	GroupingState,
	IntegratedGrouping,
	IntegratedSorting,
	EditingState,
	DataTypeProvider,
	FilteringState,
	IntegratedFiltering,
	SearchState,
} from '@devexpress/dx-react-grid';


import {
	Grid,
	Table,
	VirtualTable,
	TableHeaderRow,
	TableSelection,
	GroupingPanel,
	Toolbar,
	TableGroupRow,
	PagingPanel,
	TableFilterRow,
	DragDropProvider,
	TableColumnResizing,

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';


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
			width: '100%',
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
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
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
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100vh',
		backgroundColor: 'rgba(0,0,0, .9)',
		zIndex: 999000,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		opacity: 0.5
	},
	cardHeader: {
		backgroundColor: theme.palette.secondary.main,
		padding: '8px 24px',
		width: '100%',
		'& span': {
			color: 'white',
			fontSize: 16,
		}
	},
	cardContent: {
		paddingTop: 12,
		width: '100%',
		paddingBottom: '70px!important',
		'& h6': {
			lineHeight: 1,
			fontSize: 16
		}
	},
	formControl: {
		width: '100%',
		marginBottom: 12,
		minWidth: 600,
	},
});
//
// table content rows stle
//
const TableComponentBase = ({ classes, ...restProps }) => (
	<Table.Table
		{...restProps}
		className={classes.tableStriped}
	/>
);
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
//
// table cell currency formatter
//
const CurrencyFormatter = ({ value }) => (<span>$ {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const CurrencyTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={CurrencyFormatter}
		{...props}
	/>
);
//
// table cell phone number formatter
//
const PhoneNumberFormatter = ({ value }) => {
	return value.replace(/(\d{3})(\d{3})(\d{4})/, '+1 ($1) $2 - $3')
};
const PhoneNumberTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={PhoneNumberFormatter}
		{...props}
	/>
);
//
// table cell date formatter
//
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
const DateTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={DateFormatter}
		{...props}
	/>
);
//
// table cell boolean edit formatter
//
const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;
const BooleanEditor = ({ value, onValueChange }) => (
	<Select
		input={<Input />}
		value={value ? 'Yes' : 'No'}
		onChange={event => onValueChange(event.target.value === 'Yes')}
		style={{ width: '100%' }}
	>
		<MenuItem value="Yes">Yes</MenuItem>
		<MenuItem value="No">No</MenuItem>
	</Select>
);
const BooleanTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={BooleanFormatter}
		editorComponent={BooleanEditor}
		{...props}
	/>
);
//
// filter icon
//
const FilterIcon = ({ type, ...restProps }) => {
	return <TableFilterRow.Icon type={type} {...restProps} />;
};

//
// amount filter editor component
//
const AmountEditorBase = ({ value, onValueChange, classes }) => {
	const handleChange = (event) => {
		const { value: targetValue } = event.target;
		if (targetValue.trim() === '') {
			onValueChange();
			return;
		}
		onValueChange(parseFloat(targetValue));
	};
	return (
		<Input
			type="number"
			classes={{
				input: classes.numericInput,
			}}
			fullWidth
			value={value === undefined ? '' : value}
			inputProps={{
				min: 0,
				placeholder: 'Filter...',
			}}
			onChange={handleChange}
		/>
	);
};
AmountEditorBase.propTypes = {
	value: PropTypes.number,
	onValueChange: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};
AmountEditorBase.defaultProps = { value: undefined, };
const AmountEditor = withStyles(styles)(AmountEditorBase);
//
// table row edit command buttons
//
const AddButton = ({ onExecute }) => (
	<div style={{ textAlign: 'center' }}>
		<Button
			color="primary"
			onClick={onExecute}
			title="Create new row"
		>
			New
        </Button>
	</div>
);

const EditButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Edit row">
		<EditIcon />
	</IconButton>
);

const DeleteButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Delete row">
		<DeleteIcon />
	</IconButton>
);

const CommitButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Save changes">
		<SaveIcon />
	</IconButton>
);

const CancelButton = ({ onExecute }) => (
	<IconButton color="secondary" onClick={onExecute} title="Cancel changes">
		<CancelIcon />
	</IconButton>
);

const commandComponents = {
	add: AddButton,
	edit: EditButton,
	delete: DeleteButton,
	commit: CommitButton,
	cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
	const CommandButton = commandComponents[id];
	return (
		<CommandButton
			onExecute={onExecute}
		/>
	);
};
const GridRootComponent = props => <Grid.Root {...props} style={{ height: '100%' }} />;

//Snackbar
const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const stylesSnackbar = theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});
function MySnackbarContent(props) {
	const { classes, className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={classNames(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

MySnackbarContent.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(stylesSnackbar)(MySnackbarContent);

class PaymentLockBoxContentList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			locationFilterValue: [],
			pins: [],
			pins2: [],
			s: '',
			temp: [],
			data: [],
			selectAll: false,
			selection: this.props.activePaymentRows,
			rows: this.getRowData(this.props.payments),
			tableColumnExtensions: [
				{
					title: "C.Name",
					name: "CustomerNameNo",
					columnName: "CustomerNameNo",
					width: 150,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "LockBox Date",
					name: "lboxdate",
					columnName: 'lboxdate',
					width: 180,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "LockBox Time",
					name: "lboxtime",
					columnName: "lboxtime",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "LockBox Number",
					name: "lboxnum",
					columnName: "lboxnum",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Import Date",
					name: "importdate",
					columnName: "importdate",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Credit Date",
					name: "creditdate",
					columnName: "creditdate",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Invoice Number",
					name: "invno",
					columnName: 'invno',
					width: 150,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Check Number",
					name: "checkno",
					columnName: 'checkno',
					width: 150,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,

				},
				{
					title: "Check Amount",
					name: "amount",
					columnName: 'amount',
					width: 150,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,

				},
				{
					title: "Post Result",
					name: "postresult",
					columnName: 'postresult',
					width: 150,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,

				},
				{
					title: "Post Amount",
					name: "postamt",
					columnName: 'postamt',
					width: 150,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,

				}
			],
			sorting: [
				{ columnName: 'checkno', direction: 'asc' },
			],
			editingColumnExtensions: [],
			currencyColumns: [
				'amount'
			],
			phoneNumberColumns: [
				'Phone'
			],
			dateColumns: ['saleDate'],
			//    groupingColumns: [
			//    //      // { columnName: 'CustomerName' },
			//    //      // { columnName: 'CustomerNo' },
			//         { columnName: 'CustomerNameNo' },
			//    //
			//     ],
			expandedGroups: ['ExceptionItems'],
			pageSize: 20,
			pageSizes: [10, 20, 30, 50, 100],
			amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
			searchValue: '',
			paymentsParam: [],
			payments: []
		};

		this.fetchData = this.fetchData.bind(this);

		this.changeSorting = sorting => this.setState({ sorting });
		this.commitChanges = this.commitChanges.bind(this);
		this.changeSearchValue = value => this.setState({ searchValue: value });
		this.changeGrouping = grouping => this.setState({ grouping });


		if (this.props.bLoadedPayments === false && this.props.getPaymentsParam && this.props.getPaymentsParam !== null) {
			this.props.getAccountReceivablePaymentsList(
				this.props.regionId,
				this.props.getPaymentsParam.fromDate,
				this.props.getPaymentsParam.toDate,
				"",
				this.props.status);
		}
	}

	changeSelection = (selection) => {
		this.setState({ selection })
		// let selectedRows = this.state.rows.filter((x, index) => {
		// 	x.id = index;
		// 	return selection.indexOf(index) > -1
		// });
		// console.log("selection", selectedRows)
		this.props.setActivePaymentRows(selection)
	}
	//
	// to edit table cell
	//
	commitChanges({ added, changed, deleted }) {
		console.log("commitChanges");
		let { rows } = this.state;
		if (added) {
			const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
			rows = [
				...rows,
				...added.map((row, index) => ({
					id: startingAddedId + index,
					...row,
				})),
			];
		}
		if (changed) {
			rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
		}
		if (deleted) {
			const deletedSet = new Set(deleted);
			rows = rows.filter(row => !deletedSet.has(row.id));
		}
		this.setState({ rows });
	}

	onChange = (event, { newValue, method }) => {
		console.log("onChange");

		this.setState({
			value: newValue.toString()
		});
	};

	shouldComponentUpdate(nextProps, nextState) {
		// console.log("shouldComponentUpdate", this.state !== nextState);
		return true;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.paymentlockbox !== this.props.paymentlockbox) {

			this.setState({
				rows: this.getRowData(nextProps.paymentlockbox),
				expandedGroups: [...new Set(this.getRowData(nextProps.paymentlockbox).map(x => x.CustomerNameNo))],
			})

		}
		if (nextProps.regionId != this.props.regionId) {
			this.props.getAccountReceivablePaymentsList(
				nextProps.regionId,
				nextProps.getPaymentsParam.fromDate,
				nextProps.getPaymentsParam.toDate,
				"",
				nextProps.status);
		}
		if (nextProps.status != this.props.status) {
			this.props.getAccountReceivablePaymentsList(
				nextProps.regionId,
				nextProps.getPaymentsParam.fromDate,
				nextProps.getPaymentsParam.toDate,
				"",
				nextProps.status);
		}
		if (nextProps.activePaymentRows != this.props.activePaymentRows) {
			if (JSON.stringify(this.state.selection) !== JSON.stringify(nextProps.activePaymentRows)) {
				this.setState({ selection: [...nextProps.activePaymentRows] })
			}
		}


		if (nextProps.searchText !== this.props.searchText) {
			// console.log("------search text changed-------", nextProps.searchText)
			this.search(nextProps.searchText);
		}
	} // deprecate

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
			this.setState({ rows: this.props.data });
		}

		// console.log("componentDidUpdate", "CustomerListContent.js", this.props.locationFilterValue, this.props.customers);
	}
	getRowData(payments) {
		if (payments.Regions === undefined)
			return [];
		let res = [...payments.Regions[0].Payments]

		res.forEach(x => {
			x.CustomerNameNo = `${x.CustomerName} - ${x.CustomerNo}`;
		})
		// console.log("getRowData", res);
		return res;
	}
	search(val) {
		console.log("---------search---------", val);
		val = val.toLowerCase();
		if (val === '') {
			this.setState({ rows: this.getRowData(this.props.payments) });
			return;
		}
		const temp = this.getRowData(this.props.payments).filter(d => {
			return (d.CheckNo && d.CheckNo.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.CustomerName && d.CustomerName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.CustomerNo && d.CustomerNo.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.InvoiceNo && d.InvoiceNo.toString().toLowerCase().indexOf(val) !== -1)
		});
		this.setState({ rows: [...temp] });
	}

	componentDidMount() {
		console.log("componentDidMount");
	}

	componentWillMount() {
		this.setState({
			"paymentsParam": this.props.getPaymentsParam,
			"rows": this.props.data,
			expandedGroups: [...new Set(this.getRowData(this.props.payments).map(x => x.CustomerNameNo))],
			lockboxDate: FuseUtils.getDateString(this.props.lockboxDate),
		});
		// this.props.getAccountReceivablePaymentsList(
		// 	this.props.regionId,
		// 	this.props.getPaymentsParam.fromDate,
		// 	this.props.getPaymentsParam.toDate,
		// 	this.props.getPaymentsParam.searchText);
		this.timer = null;
	}
	componentWillUnmount() {

	}


	handleChange = name => event => {
		const value = event.target.value
		this.setState({ [name]: value });

		if (name === "lockboxDate") {
			this.props.updateLockboxDate(value)
		}
	};

	removeCustomers = () => {
		console.log("removeCustomers");

		if (this.state.selection.length === 0) {
			alert("Please choose customer(s) to delete");
			return;
		}
		if (window.confirm("Do you really want to remove the selected customer(s)")) {
			this.props.deleteCustomersAction(this.state.selection, this.props.customers);
			this.setState({ selection: [], selectAll: false })
		}
	};

	fetchData(state, instance) {
		console.log("fetchData");

		this.setState({
			pageSize: state.pageSize,
			page: state.page,
		});
	}


	TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {

		let timer = 0;
		let delay = 200;
		let prevent = false;
		delete restProps.selectByRowClick;
		const handleClick = () => {
			timer = setTimeout(() => {
				if (!prevent) {
					// onToggle();
				}
				prevent = false;
			}, delay);
		};
		const handleDoubleClick = () => {
			clearTimeout(timer);
			prevent = true;
			console.log("restProps", tableRow);
			this.props.setActivePaymentRows([tableRow.rowId]);
			// this.props.openEditCustomerForm(this.props.regionId, tableRow.row.CustomerId);
			// this.props.openNewInvoiceForm()
			this.props.openPaymentDialog(true)
		}
		return (
			<Table.Row
				{...restProps}
				className={selected ? 'active' : ''}
				style={{ color: 'green', cursor: 'pointer' }}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
			/>
		);
	};
	expandedGroupsChange = (expandedGroups) => {
		this.setState({ expandedGroups });
	};

	GroupCellContent = ({ column, row }) => (
		<span>
			<strong>{row.value}</strong>
		</span>
	);

	fetchLockbox = () => {
		const { lockboxDate } = this.state
		console.log('fetchLockbox', lockboxDate)
		if (!lockboxDate) {
			this.props.openSnackbar("Please select Lockbox date")
			return
		}

		this.props.paymentlockboxgetalldata(lockboxDate, true);
	}

	processLockbox = () => {
		const { rows } = this.state
		if (!rows || rows.length < 1) {
			this.props.openSnackbar("Nothing to process")
			return
		}

		this.setState({
			rows: []
		})
		this.props.processLockbox()
		this.props.openSnackbar("Lockbox has been processed", "success")
	}

	render() {
		const { classes } = this.props;
		console.log(rows)

		const {

			selection,
			tableColumnExtensions,
			sorting,
			editingColumnExtensions,
			currencyColumns,
			phoneNumberColumns,
			getPaymentsParam,
			pageSizes,
			searchValue,
			payments,
			groupingColumns,
			expandedGroups,
			integratedGroupingColumnExtensions,
			tableGroupColumnExtension,
		} = this.state;

		let rows = [];
		let result = [];

		if (this.state.rows.ExceptionItems && this.state.rows.ExceptionItems !== null) {
			let miditem = this.state.rows.ExceptionItems;
			miditem.map((item) => {
				let mitem = {};
				mitem = item;
				mitem.CustomerNameNo = 'ExceptionItems';
				rows.push(mitem);
			});
			// rows = this.state.rows.FoundItems;
			let temp = rows.forEach(x => {
				result.push(x.CustomerNameNo)
			})
			console.log(result);
		}

		if (this.state.rows && this.state.rows !== null) {
			if (this.state.rows.FoundItems && this.state.rows.FoundItems !== null) {
				let miditem = this.state.rows.FoundItems;
				miditem.map((item) => {
					let mitem = {};
					mitem = item;
					mitem.CustomerNameNo = 'FoundItems';
					rows.push(mitem);
				});

			}


			// rows = this.state.rows;


		}

		// console.log('this.state.rows------------', this.state.rows);
		// console.log('payments------------', rows);
		// console.log('paymentlockbox------------', this.props.paymentlockbox);
		return (

			<div className={classNames(classes.layoutTable, "flex flex-col h-full width:100%")}>
				{this.props.paymentlockbox.getallstatus && (
					<div className={classes.overlay}>
						<CircularProgress className={classes.progress} color="secondary" />
					</div>
				)}
				<div className='flex w-full justify-end items-center mb-12'>
					<TextField
						type="date"
						id="lockboxDate"
						label="Lockbox Date *"
						className={classNames(classes.textField, "mr-6")}
						InputLabelProps={{
							shrink: true
						}}
						value={this.state.lockboxDate || ''}
						onChange={this.handleChange('lockboxDate')}
						margin="dense"
					// variant="outlined"
					// style={{ width: "20%", minWidth: "180px" }}
					/>
					<Button
						variant="contained"
						color="primary"
						className={classNames(classes.button, "pr-12 pl-24 mr-12")}
						onClick={this.fetchLockbox}
					>Fetch Lockbox&nbsp;&nbsp;<Icon fontSize="small">lock_open</Icon>
					</Button>
					<Button
						variant="contained"
						color="primary"
						className={classNames(classes.button, "pr-12 pl-24 mr-12")}
						onClick={this.processLockbox}
					>Process&nbsp;&nbsp;<Icon fontSize="small">attach_money</Icon>
					</Button>
				</div>

				<div className={classNames("flex flex-col width:100%")}>
					<div className="mb-8 ml-8 mr-8">
						<Card className={classes.card}>
							<CardHeader title="Lockbox payments" className={classNames(classes.cardHeader, "flex-1")} />
							<CardContent >
								{this.props.bStart &&
									<div className="flex flex-row justify-between mb-4">
										{/* <Icon fontSize={"small"} className="mr-4">account_circle</Icon> */}
										<Typography variant="subtitle1" color="inherit">
											<strong>Lockbox Date: {this.props.data.ExceptionItems[0].lboxdate} </strong>
										</Typography>

										<Typography variant="subtitle1" color="inherit">
											<strong>Lockbox Time: {this.props.data.ExceptionItems[0].lboxtime} </strong >
										</Typography>

										<Typography variant="subtitle1" color="inherit">
											<strong>Lockbox Number: {this.props.data.ExceptionItems[0].lboxnum} </strong>
										</Typography>

										<Typography variant="subtitle1" color="inherit">
											<strong>File Import Date: {this.props.data.ExceptionItems[0].importdate} </strong>
										</Typography>
									</div>
								}
							</CardContent>
						</Card>
					</div>


					<Grid
						rows={rows}
						columns={tableColumnExtensions}
					>
						<DragDropProvider />
						<PagingState
							defaultCurrentPage={0}
							defaultPageSize={20}
						/>

						<PagingPanel pageSizes={pageSizes} />

						{/*<SelectionState*/}
						{/*selection={selection}*/}
						{/*onSelectionChange={this.changeSelection}*/}
						{/*/>*/}

						{/*<IntegratedSelection />*/}

						<SortingState
							sorting={sorting}
							onSortingChange={this.changeSorting}
							columnExtensions={tableColumnExtensions}
						/>
						<IntegratedSorting />

						<GroupingState
							// grouping={grouping}
							// onGroupingChange={this.changeGrouping}
							grouping={[
								{ columnName: 'CustomerNameNo' }
							]}
							defaultExpandedGroups={result}
							onExpandedGroupsChange={this.expandedGroupsChange}

						// columnExtensions={tableColumnExtensions}
						/>
						<IntegratedGrouping
							columnExtensions={integratedGroupingColumnExtensions}
						/>

						<IntegratedPaging />

						<SearchState
							value={searchValue}
							onValueChange={this.changeSearchValue}
						/>

						<FilteringState
							defaultFilters={[]}
							columnExtensions={tableColumnExtensions}
						/>
						<IntegratedFiltering />

						<EditingState
							columnExtensions={editingColumnExtensions}
							onCommitChanges={this.commitChanges}
						/>
						<CurrencyTypeProvider
							for={currencyColumns}
						/>
						<PhoneNumberTypeProvider
							for={phoneNumberColumns}
						/>
						<Table rowComponent={this.TableRow} />

						<VirtualTable height='auto'
							noDataCellComponent={
								({ colSpan }) => (
									<td colSpan={colSpan} style={{ textAlign: 'center' }}>
										<big className="TableNoDataCell">{this.props.NoDataString}</big>
									</td>
								)
							}
							columnExtensions={tableColumnExtensions}
						/>
						<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />

						{/*<TableSelection  highlightRow rowComponent={this.TableRow} />*/}

						<TableHeaderRow showSortingControls />

						<Template
							name="tableRow"
							predicate={({ tableRow }) => tableRow.type === 'data'}
						>
							{params => (
								<TemplateConnector>
									{({ selection }, { toggleSelection }) => (
										<this.TableRow
											{...params}
											selected={selection.findIndex((i) => i === params.tableRow.rowId) > -1}
										// onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
										/>
									)}
								</TemplateConnector>
							)}
						</Template>
						{/* <Toolbar />					 */}
						<TableGroupRow
							showColumnsWhenGrouped
							columnExtensions={tableGroupColumnExtension}
							contentComponent={this.GroupCellContent}
						/>
						{/* <GroupingPanel showSortingControls showGroupingControls /> */}
					</Grid>
				</div>

				<Snackbar
					anchorOrigin={{
						vertical: this.props.snack.vertical,
						horizontal: this.props.snack.horizontal,
					}}
					open={this.props.snack.open}
					autoHideDuration={this.props.snack.duration}
					onClose={this.props.closeSnackbar}
				>
					<MySnackbarContentWrapper
						onClose={this.props.closeSnackbar}
						variant={this.props.snack.icon}
						message={this.props.snack.message}
					/>
				</Snackbar>
			</div>

		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getAccountReceivablePaymentsList: Actions.getAccountReceivablePaymentsList,
		openNewInvoiceForm: Actions.openNewInvoiceForm,

		setActivePaymentRows: Actions.setActivePaymentRows,
		openPaymentDialog: Actions.openPaymentDialog,

		openSnackbar: Actions.openSnackbar,
		closeSnackbar: Actions.closeSnackbar,

		paymentlockboxgetalldata: Actions.paymentlockboxgetalldata,
		updateLockboxDate: Actions.updateLockboxDate,
		processLockbox: Actions.processLockbox,

	}, dispatch);
}

function mapStateToProps({ accountReceivablePayments, auth, paymentlockbox, customers }) {
	return {
		bLoadedPayments: accountReceivablePayments.bLoadedPayments,
		payments: accountReceivablePayments.ACC_payments,
		regionId: auth.login.defaultRegionId,
		getPaymentsParam: accountReceivablePayments.getPaymentsParam,

		searchText: accountReceivablePayments.searchText,
		activePaymentRows: accountReceivablePayments.activePaymentRows,
		data: paymentlockbox.data,
		bStart: paymentlockbox.bStart,
		modalForm: paymentlockbox.modalForm,
		paymentlockbox: paymentlockbox,

		snack: customers.snack,
		lockboxDate: paymentlockbox.lockboxDate,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentLockBoxContentList)));

