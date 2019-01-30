import React, { Component, Fragment } from 'react';
// core components
import { Icon, IconButton, Input, Paper, Button, Zoom, Checkbox } from '@material-ui/core';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions/account_receivable.payments.actions.js';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';


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

import { CustomizedDxGridSelectionPanel } from "./../../common/CustomizedDxGridSelectionPanel";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

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
		zIndex: 1000,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		opacity: 0.5
	}
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
const CurrencyFormatter = ({ value }) => (<span>$ {!value ? "0" : value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
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
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$2/$3/$1');
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

class paymentsHistoryListContent extends Component {

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
					title: "Invoice No",
					name: "InvoiceNo",
					columnName: "InvoiceNo",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice Amount",
					name: "InvoiceAmount",
					columnName: "InvoiceAmount",
					align: 'right',
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice Balance",
					name: "InvoiceBalance",
					columnName: "InvoiceBalance",
					align: 'right',
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "OverPayment",
					name: "OverPayment",
					columnName: "OverPayment",
					align: 'right',
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice Date",
					name: "InvoiceDate",
					columnName: 'InvoiceDate',
					width: 250,
					align: 'center',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Due Date",
					name: "DueDate",
					columnName: 'DueDate',
					width: 250,
					align: 'center',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Days Past Due",
					name: "DaysPastDue",
					columnName: 'DaysPastDue',
					width: 140,
					align: 'center',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
			],
			sorting: [
				// { columnName: 'CustomerNameNo', direction: 'asc' },
				{ columnName: 'DaysPastDue', direction: 'asc' },
			],
			editingColumnExtensions: [],
			currencyColumns: [
				'InvoiceAmount',
				'InvoiceBalance',
				'OverPayment',
			],
			phoneNumberColumns: [
				'Phone'
			],
			dateColumns: [
				'InvoiceDate',
				'DueDate'
			],
			groupingColumns: [
				{ columnName: 'CustomerNameNo' },
			],
			expandedGroups: ['CustomerNameNo'],
			pageSize: 50,
			pageSizes: [10, 20, 30, 50, 100],
			amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
			searchValue: '',
			paymentsParam: [],
			payments: [],

			showNoSelectionAlertDialog: false,
		};

		this.fetchData = this.fetchData.bind(this);

		this.changeSorting = sorting => this.setState({ sorting });
		this.commitChanges = this.commitChanges.bind(this);
		this.changeSearchValue = value => this.setState({ searchValue: value });
		this.changeGrouping = grouping => this.setState({ grouping });
		console.log("constructor");

		if (this.props.bLoadedPayments === false) {
			this.props.getAccountReceivablePaymentsList(
				this.props.regionId,
				this.props.getPaymentsParam.fromDate,
				this.props.getPaymentsParam.toDate,
				"",
				this.props.filter.paymentStatus);
		}
	}

	changeSelection = (selection) => {
		if (selection.length > 1) selection = [selection[selection.length - 1]]
		this.setState({ selection })
		this.props.setActivePaymentRows(selection)
	}

	changeGroupSelection = (selection) => {

		if (selection.length < 1) {
			selection = []
		} else {
			const latestSelectionId = selection[selection.length - 1]
			const { rows } = this.state
			//
			// get lastest selected row
			//
			console.log("rows", rows)
			console.log("latestSelectionId", latestSelectionId)
			let selectedLastRow = rows.filter((x, index) => x.id === latestSelectionId)
			// let selectedLastRow = rows[latestSelectionId]
			console.log("selectedLastRow", selectedLastRow)
			if (selectedLastRow.length > 0) {
				selectedLastRow = selectedLastRow[0]
				console.log("selectedLastRow", selectedLastRow)
				//
				// get CustomerNameNo
				//
				const customerNameNo = selectedLastRow.CustomerNameNo
				console.log("customerNameNo", customerNameNo)
				selection = rows.filter(x => x.CustomerNameNo === customerNameNo).map((x, index) => x.id)
				// selection = rows.filter(x => x.CustomerNameNo === customerNameNo).map((x, index) => index)
				console.log("selection", selection)
			}
		}
		this.setState({ selection })
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
		console.log("shouldComponentUpdate", this.state !== nextState);
		return true;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.payments !== this.props.payments) {
			console.log("componentWillReceiveProps", "nextProps.payments", nextProps.payments)
			this.setState({
				rows: this.getRowData(nextProps.payments),
				expandedGroups: [...new Set(this.getRowData(nextProps.payments).map(x => x.CustomerNameNo))],
			})
		}

		if (nextProps.regionId !== this.props.regionId) {
			console.log("componentWillReceiveProps", "nextProps.regionId", nextProps.regionId)
			this.props.getAccountReceivablePaymentsList(
				nextProps.regionId,
				nextProps.getPaymentsParam.fromDate,
				nextProps.getPaymentsParam.toDate,
				"",
				nextProps.status);
		}
		if (nextProps.filter.paymentStatus !== this.props.filter.paymentStatus) {
			console.log("componentWillReceiveProps", "nextProps.status", nextProps.filter.paymentStatus)
			this.props.getAccountReceivablePaymentsList(
				nextProps.regionId,
				nextProps.getPaymentsParam.fromDate,
				nextProps.getPaymentsParam.toDate,
				"",
				nextProps.filter.paymentStatus);
		}
		if (JSON.stringify(nextProps.activePaymentRows) !== JSON.stringify(this.props.activePaymentRows)) {
			console.log("componentWillReceiveProps", "nextProps.activePaymentRows", nextProps.activePaymentRows)
			if (JSON.stringify(this.state.selection) !== JSON.stringify(nextProps.activePaymentRows)) {
				this.setState({ selection: [...nextProps.activePaymentRows] })
			}
		}
		// if (this.props.locationFilterValue !== nextProps.locationFilterValue) {
		// 	this.setState({ locationFilterValue: nextProps.locationFilterValue })
		// 	console.log("componentWillReceiveProps", "locationFilterValue", nextProps.locationFilterValue, this.props.customers)
		// 	this.initRowsFromRawJson(this.props.customers, nextProps.locationFilterValue);
		// }

		if (nextProps.searchText !== this.props.searchText) {
			console.log("------search text changed-------", nextProps.searchText)
			this.search(nextProps.searchText);
		}
	} // deprecate

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate", "CustomerListContent.js", this.props.locationFilterValue, this.props.customers);
	}
	getRowData(payments) {
		if (!payments || payments.Regions === undefined || payments.Regions.length < 1)
			return [];
		let res = [...payments.Regions[0].Payments]

		res.forEach(x => {
			x.CustomerNameNo = `${x.CustomerName} - ${x.CustomerNo}`;
		})
		console.log("getRowData", res);

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
				(d.CustomerNameNo && d.CustomerNameNo.toString().toLowerCase().indexOf(val) !== -1) ||
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
			"rows": this.getRowData(this.props.payments),
			expandedGroups: [...new Set(this.getRowData(this.props.payments).map(x => x.CustomerNameNo))],
		});
		// this.props.getAccountReceivablePaymentsList(
		// 	this.props.regionId,
		// 	this.props.getPaymentsParam.fromDate,
		// 	this.props.getPaymentsParam.toDate,
		// 	this.props.getPaymentsParam.searchText);
		this.timer = null;
	}
	componentWillUnmount() {
		console.log("componentWillUnmount");
	}


	handleChange = prop => event => {
		console.log("handleChange");
		this.setState({ [prop]: event.target.value });

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
					// let selection = [...this.state.selection];
					// let rowIndexInSelection = selection.indexOf(tableRow.rowId)
					// if (selected) {
					// 	selection.splice(rowIndexInSelection, 1)
					// } else {
					// 	selection = [...selection, tableRow.rowId]
					// }
					// this.changeSelection(selection)
					console.log("tableRow", tableRow)
					if (!selected) {
						this.changeSelection([tableRow.rowId])
					} else {
						this.changeSelection([])
					}
				}
				prevent = false;
			}, delay);
		};
		const handleDoubleClick = () => {
			clearTimeout(timer);
			prevent = true;
			console.log("restProps", tableRow);
			this.props.setActivePaymentRows([tableRow.rowId]);
			console.log("handleDoubleClick tableRow", tableRow)
			if (tableRow.row.InvoiceBalance > 0) {
				this.props.openPaymentDialog(true)
			} else {
				this.props.showErrorDialog({
					show: true,
					title: "Warning",
					message: "A payment can't be applied to an invoice with 0 balance.",
				})
			}
		}
		return (
			<Table.Row
				{...restProps}
				className={selected ? 'active' : ''}
				style={selected ?
					{
						background: '#3c93ec45',
						cursor: 'pointer'
					} :
					{
						cursor: 'pointer'
					}}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
			/>
		);
	};
	handleCloseNoSelectionAlertDialog = () => {
		this.setState({
			showNoSelectionAlertDialog: false
		})
	}
	expandedGroupsChange = (expandedGroups) => {
		this.setState({ expandedGroups });
	};

	GroupCellContent = ({ column, row }) => (
		<span>
			{/* {column.title} */}
			<span>
				<strong>{row.value}</strong>
			</span>

			<span style={{ float: "right" }}>
				OverPayment: $ {this.getOverpaymentByGroupTitle(row.value)}
			</span>
		</span>
	);

	onClickGroupCell = (ev, groupTitle) => {
		console.log(groupTitle)
		console.log(ev.target.checked)

		const checked = ev.target.checked

		if (!checked) {
			this.setState({ selections: [] })
			this.props.setActivePaymentRows([])
		} else {

			const { rows } = this.state
			const groupRows = rows.filter(x => x.CustomerNameNo === groupTitle);
			console.log("groupRows", groupRows)
			let selections = groupRows.map(x => rows.indexOf(x))
			console.log("selections", selections)

			this.setState({ selections })
			this.props.setActivePaymentRows(selections)
		}
		ev.stopPropagation();
	}

	getOverpaymentByGroupTitle(groupTitle) {
		const { rows } = this.state
		const groupRows = rows.filter(x => x.CustomerNameNo === groupTitle);
		if (groupRows.length < 1) return 0

		return groupRows[0].OverPayment
	}

	onClickGroupCellApplyOverpayment = (ev, groupTitle) => {
		ev.stopPropagation();
	}

	render() {
		const { classes } = this.props;

		const {
			rows,
			selection,
			tableColumnExtensions,
			sorting,
			editingColumnExtensions,
			currencyColumns,
			phoneNumberColumns,
			dateColumns,
			getPaymentsParam,
			pageSizes,
			searchValue,
			payments,
			groupingColumns,
			expandedGroups,
		} = this.state;
		return (
			<Fragment>
				<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>

					<div className={classNames("flex flex-col")}
					>
						<Grid
							rows={rows}
							columns={tableColumnExtensions}
						>
							<DragDropProvider />
							<PagingState
								defaultCurrentPage={0}
								defaultPageSize={50}
							/>

							<PagingPanel pageSizes={pageSizes} />

							{/* <SelectionState
								selection={selection}
								onSelectionChange={this.changeSelection}
							/>

							<IntegratedSelection /> */}

							<SortingState
								sorting={sorting}
								onSortingChange={this.changeSorting}
								columnExtensions={tableColumnExtensions}
							/>
							<IntegratedSorting />

							<GroupingState
								// grouping={grouping}
								// onGroupingChange={this.changeGrouping}
								grouping={groupingColumns}
								expandedGroups={expandedGroups}
								onExpandedGroupsChange={this.expandedGroupsChange}

							// columnExtensions={tableColumnExtensions}
							/>
							<IntegratedGrouping />

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

							<DateTypeProvider
								for={dateColumns}
							/>

							{/* <Table /> */}
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

							{/* <TableSelection showSelectAll highlightRow rowComponent={this.TableRow} /> */}
							{/* <TableSelection highlightRow rowComponent={this.TableRow} /> */}

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
												onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
											/>
										)}
									</TemplateConnector>
								)}
							</Template>
							{/* <Toolbar />					 */}
							<TableGroupRow contentComponent={this.GroupCellContent} />

							<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />
							{/* <GroupingPanel showSortingControls showGroupingControls /> */}
						</Grid>
					</div>
				</div>
			</Fragment>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getAccountReceivablePaymentsList: Actions.getAccountReceivablePaymentsList,

		setActivePaymentRows: Actions.setActivePaymentRows,
		openPaymentDialog: Actions.openPaymentDialog,
		showErrorDialog: Actions.showErrorDialog,
	}, dispatch);
}

function mapStateToProps({ accountReceivablePayments, auth }) {
	return {
		bLoadedPayments: accountReceivablePayments.bLoadedPayments,
		payments: accountReceivablePayments.ACC_payments,
		regionId: auth.login.defaultRegionId,
		getPaymentsParam: accountReceivablePayments.getPaymentsParam,
		searchText: accountReceivablePayments.searchText,
		activePaymentRows: accountReceivablePayments.activePaymentRows,
		NoDataString: accountReceivablePayments.NoDataString,

		filter: accountReceivablePayments.filter,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(paymentsHistoryListContent)));

