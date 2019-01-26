import React, { Component, Fragment } from 'react';
// core components
import { Icon, IconButton, Input, Paper, Button, Zoom } from '@material-ui/core';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

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

class PaymentsListContent extends Component {

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
				// {
				//     title: "Payment ID",
				//     name: "PaymentId",
				//     columnName: "PaymentId",
				//     width: 200,
				//     sortingEnabled: true,
				//     filteringEnabled: true,
				//     groupingEnabled: false,
				// },
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
				// {
				// 	title: "C.Number",
				// 	name: "CustomerNo",
				// 	columnName: "CustomerNo",
				// 	width: 120,
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },
				{
					title: "Check No",
					name: "CheckNo",
					columnName: 'CheckNo',
					width: 180,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
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
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice Balance",
					name: "InvoiceBalance",
					columnName: "InvoiceBalance",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "InvoiceBalance OR",
					name: "InvoiceBalanceOR",
					columnName: 'InvoiceBalanceOR',
					width: 150,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Payment Amount",
					name: "PaymentAmount",
					columnName: 'PaymentAmount',
					width: 140,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,

				},
				// {
				//     title: "Region Name",
				//     name: "RegionName",
				//     columnName: 'RegionName',
				//     width: 120,
				//     align: 'right',
				//     wordWrapEnabled: true,
				//     sortingEnabled: true,
				//     filteringEnabled: true,
				//     groupingEnabled: false,

				// },
				{
					title: "Check Amount",
					name: "CheckAmount",
					columnName: 'CheckAmount',
					width: 140,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,

				}
			],
			sorting: [
				{ columnName: 'CustomerNo', direction: 'asc' },
			],
			editingColumnExtensions: [],
			currencyColumns: [
				'Amount'
			],
			phoneNumberColumns: [
				'Phone'
			],
			dateColumns: ['saleDate'],
			groupingColumns: [
				// { columnName: 'CustomerName' },
				// { columnName: 'CustomerNo' },
				{ columnName: 'CustomerNameNo' },

			],
			expandedGroups: ['CustomerNameNo'],
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
		console.log("constructor");

		if (this.props.bLoadedPayments === false) {
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
		console.log("shouldComponentUpdate", this.state !== nextState);
		return true;
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps", "CustomerListContent.js", nextProps.payments)


		if (nextProps.payments !== this.props.payments) {
			this.setState({
				rows: this.getRowData(nextProps.payments),
				expandedGroups: [...new Set(this.getRowData(nextProps.payments).map(x => x.CustomerNameNo))],
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
		if (!payments || payments.Regions === undefined)
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
					onToggle();
					// let selection = [...this.state.selection];
					// let rowIndexInSelection = selection.indexOf(tableRow.rowId)
					// if (selected) {
					// 	selection.splice(rowIndexInSelection, 1)
					// } else {
					// 	selection = [...selection, tableRow.rowId]
					// }
					// this.changeSelection(selection)
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
	expandedGroupsChange = (expandedGroups) => {
		this.setState({ expandedGroups });
	};

	GroupCellContent = ({ column, row }) => (
		<span>
			{/* {column.title} */}
			<strong>{row.value}</strong>
		</span>
	);

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
								defaultPageSize={20}
							/>

							<PagingPanel pageSizes={pageSizes} />

							<SelectionState
								selection={selection}
								onSelectionChange={this.changeSelection}
							/>

							<IntegratedSelection />

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

							<Table />

							<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />

							<TableSelection showSelectAll highlightRow rowComponent={this.TableRow} />

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
		openNewInvoiceForm: Actions.openNewInvoiceForm,

		setActivePaymentRows: Actions.setActivePaymentRows,
		openPaymentDialog: Actions.openPaymentDialog,
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
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentsListContent)));

