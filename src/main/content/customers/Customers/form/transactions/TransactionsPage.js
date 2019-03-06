import React from 'react';
import _ from "lodash";
import TextField from '@material-ui/core/TextField';
import { Divider, FormControl, InputLabel, Select, Chip, Input, MenuItem, Icon, IconButton, Button } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import * as Actions from 'store/actions';
import {
	Template, TemplateConnector
} from '@devexpress/dx-react-core';
import {
	SelectionState,
	PagingState,
	IntegratedPaging,
	IntegratedSelection,
	SortingState,
	IntegratedSorting,
	EditingState,
	DataTypeProvider,
	FilteringState,
	IntegratedFiltering,
	SearchState,
	RowDetailState,
} from '@devexpress/dx-react-grid';

import { CustomizedDxGridSelectionPanel } from "./../../../../common/CustomizedDxGridSelectionPanel";

import {
	Grid,
	Table,
	TableHeaderRow,
	TableSelection,
	PagingPanel,
	TableFilterRow,
	DragDropProvider,
	TableColumnResizing,
	VirtualTable,
	TableRowDetail,

} from '@devexpress/dx-react-grid-material-ui';



const hexToRgb = (hex) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const styles = theme => ({

	root: {
		width: '90%',
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
	},
	backButton: {
		marginRight: theme.spacing.unit
	},
	completed: {
		display: 'inline-block'
	},
	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	//////////////////
	layoutForm: {
		flexDirection: 'row',
	},
	button: {
		marginRight: theme.spacing.unit,
		'& span': {
			textTransform: 'none'
		},
		margin: theme.spacing.unit
	},
	card: {
		width: '100%',
	},
	container: {
		position: 'relative',
		width: '100%'
	},
	formControl: {
		marginBottom: 24,
		minWidth: 200,
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 10,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
		maxHeight: 200,
		overflowY: 'scroll'
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	divider: {
		height: theme.spacing.unit * 2,
	},
	cardHeader: {
		backgroundColor: theme.palette.secondary.main,
		padding: '10px 24px',
		'& span': {
			color: 'white'
		}
	},
	tableTheadRow: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
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
const CurrencyFormatter = ({ value }) => (<span>$ {value ? value.toLocaleString(undefined, { minimumFractionDigits: 2 }) : ''}</span>);
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
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)/, '$2/$3/$1');
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

// const CurrencyFormatter = ({ value }) => (<span>$ {parseFloat(`0${value}`).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
// const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$2/$3/$1');

class TransactionsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ key: "InvoiceNo", name: "Invoice No", editable: false },
				{ key: "Description", name: "Description", editable: false },
				{ key: "InvDate", name: "Invoice Date", editable: false, formatter: DateFormatter },
				{ key: "DueDate", name: "Due Date", editable: false, formatter: DateFormatter, sortDescendingFirst: true },
				{ key: "Class", name: "Class", editable: false },
				{ key: "IC", name: "I / C", editable: false },
				{ key: "Qty", name: "Qty", editable: false },
				{ key: "Amount", name: "Amount", editable: false, formatter: CurrencyFormatter },
				{ key: "ApplyTo", name: "Apply To", editable: true, formatter: CurrencyFormatter },
			],
			rows: [],
			selection: [],
			rows: [],
			// columns: [
			// 	{
			// 		title: "No", name: "CustomerNo",
			// 		// getCellValue: row => (row.user ? row.user.firstName : undefined),
			// 	},
			// 	{ title: "Name", name: "CustomerName", width: 200, },
			// 	{ title: "Address", name: "Address", width: 160 },
			// 	{ title: "City", name: "City", width: 90 },
			// 	{ title: "State", name: "StateName", width: 50 },
			// 	{ title: "Zip", name: "PostalCode", width: 50 },
			// 	{ title: "Phone", name: "Phone", width: 80, },
			// 	{ title: "Account Type", name: "AccountTypeListName", width: 150 },
			// 	{ title: "Status", name: "StatusName", width: 60 },
			// 	{ title: "Contract Amount", name: "Amount", width: 80 },
			// 	// { title: "Actions", name: "Actions", width: 110, }
			// ],
			tableColumnExtensions: [
				{
					title: "Invoice No",
					name: "inv_no",
					columnName: "inv_no",
					width: 120,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Description",
					name: "descr",
					columnName: 'descr',
					width: 400,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Invoice Date",
					name: "date_inv",
					columnName: "date_inv",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					togglingEnabled: false,
				},
				{
					title: "Due Date",
					name: "date_due",
					columnName: "date_due",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Amount",
					name: "itm_amt",
					columnName: "itm_amt",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Tax",
					name: "itm_tax",
					columnName: "itm_tax",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Total",
					name: "total",
					columnName: "total",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Balance",
					name: "balance",
					columnName: "balance",
					width: 120,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Days Past Due",
					name: "DaysPastDue",
					columnName: 'DaysPastDue',
					width: 150,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},

			],
			sorting: [
				{ columnName: 'date_inv', direction: 'desc' }
			],
			editingColumnExtensions: [
				// {
				// 	columnName: 'firstName',
				// 	createRowChange: (row, value) => ({ user: { ...row.user, firstName: value } }),
				// },
			],
			currencyColumns: [
				'itm_amt',
				'itm_tax',
				'total',
				'balance',
			],
			phoneNumberColumns: [
				'Phone'
			],
			dateColumns: [
				'date_inv',
				'date_due',
			],
			// groupingColumns: [
			// 	{ columnName: 'StateName', groupingEnabled: false },
			// 	{ columnName: 'AccountTypeListName', groupingEnabled: false },
			// 	{ columnName: 'StatusName', groupingEnabled: false },
			// ],
			grouping: [
				// { columnName: 'AccountTypeListName' },
			],
			pageSize: 20,
			pageSizes: [10, 20, 30, 50, 100],
			amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
			// defaultFilters: [{ columnName: 'StateName', value: 'PA' }],
			searchValue: '',
			// leftColumns: ['CustomerNo', 'CustomerName'],
			// rightColumns: ['Amount'],
			expandedRowIds: [],
			SearchText: '',

			billing_month: new Date().getMonth() + 1,
			billing_year: new Date().getFullYear(),

		}

		// this.fetchData = this.fetchData.bind(this);
		// this.escFunction = this.escFunction.bind(this);

		this.changeSelection = selection => this.setState({ selection });
		this.changeSorting = sorting => this.setState({ sorting });
		this.commitChanges = this.commitChanges.bind(this);
		// this.changeCurrentPage = currentPage => this.setState({ currentPage });
		// this.changePageSize = pageSize => this.setState({ pageSize });
		this.changeSearchValue = value => this.setState({ searchValue: value });
		this.changeGrouping = grouping => this.setState({ grouping });
		this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
		console.log("constructor");

		console.log("constructor", this.props.customerForm)
		if (this.props.activeCustomer && this.props.activeCustomer.Data) {
			this.props.getCustomerBillingList(this.props.regionId, this.props.activeCustomer.Data.cust_no)
		}
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.regionId !== this.props.regionId) {
			this.props.getCustomerBillingList(nextProps.regionId, this.props.activeCustomer.Data.cust_no)
		}

		if (nextProps.customerServiceForm.billingList, this.props.customerServiceForm.billingList) {
			this.initRowsFromRawJson(nextProps.customerServiceForm.billingList.data)
		}

		if (nextProps.isExpandedGrouping !== this.props.isExpandedGrouping) {
			this.expandCollapseGrouping(this.state.rows, nextProps.isExpandedGrouping)
		}
	} // deprecate 

	componentWillMount() {
		console.log("componentWillMount");

		this.initRowsFromRawJson();

		this.timer = null;
	}


	initRowsFromRawJson = (rawData = this.props.customerServiceForm.billingList.data) => {
		if (!rawData || !rawData.Data) return;

		rawData.Data.forEach(x => {
			x.DateTime = `${x.call_date} ${x.call_time}`

			console.log(x.payments)
			// console.log(x.payments.map(px => px.Amount).reduce((s, a) => s + a))
			x.paymentTotal = Array.isArray(x.payments) && x.payments.length > 0 ? x.payments.map(px => px.Amount).reduce((s, a) => s + a) : 0
		})
		const rows = rawData.Data
		console.log("initRowsFromRawJson=billingList", rows)

		this.setState({
			rows,
		})
		this.expandCollapseGrouping(rows)
		// this.setState({
		// 	expandedRowIds: rows.map((x, index) => index)
		// })
	};
	expandCollapseGrouping(rows = this.state.rows, grouping = this.props.isExpandedGrouping) {
		if (grouping) {
			this.setState({
				expandedRowIds: rows.map((x, index) => index)
			})
		} else {
			this.setState({
				expandedRowIds: []
			})
		}
	}

	//
	// row click
	//
	TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {
		// workaround for using the click & doubleClick events at the same time
		// from https://stackoverflow.com/questions/25777826/onclick-works-but-ondoubleclick-is-ignored-on-react-component
		let timer = 0;
		let delay = 200;
		let prevent = false;
		delete restProps.selectByRowClick
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
			// alert(JSON.stringify(tableRow.row));
			console.log(restProps);
			// this.props.openEditCustomerForm(this.props.regionId, tableRow.row.CustomerId);
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

	RowDetail = ({ row }) => {

		if (row.payments && row.payments.length > 0)
			return (
				<div className="flex flex-col">
					<div className="flex justify-start">
						<span style={{ width: "15%", marginLeft: 220, textAlign: 'center' }}><strong>Payment Type</strong></span>
						<span style={{ width: "12%" }}><strong>Ref. No.</strong></span>
						<span style={{ width: "12%" }}><strong>Pay Date</strong></span>
						<span style={{ width: "12%" }}><strong>Payment Amount</strong></span>
					</div>
					{
						row.payments.map((x, index) => (
							<div key={index} className="flex justify-start">
								<span style={{ width: "15%", marginLeft: 220, textAlign: 'center' }}>{x.PaymentType ? x.PaymentType : ""}</span>
								<span style={{ width: "12%" }}>{x.ReferenceNumber}</span>
								<span style={{ width: "12%" }}>{x.PayDate.replace(/(\d{4})-(\d{2})-(\d{2})(.+)/, '$2/$3/$1')}</span>
								<span style={{ width: "12%" }}>$ {x.Amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
							</div>
						))
					}
				</div>
			)
		return (<div className="flex justify-start">No Payments Data</div>)
	}


	handleChange = name => event => {
		const value = event.target.value
		this.setState({
			[name]: value
		});
		if (name === 'SearchText') {
			this.changeSearchValue(value)
		}
		if (name === 'billing_month') {
			this.props.getCustomerBillingList(
				this.props.regionId,
				this.props.activeCustomer.Data.cust_no,
				parseInt('0' + this.state.billing_year),
				parseInt('0' + value))
		}
		if (name === 'billing_year') {
			this.props.getCustomerBillingList(
				this.props.regionId,
				this.props.activeCustomer.Data.cust_no,
				parseInt('0' + value),
				parseInt('0' + this.state.billing_month))
		}
	};
	clearSearch = () => {
		this.setState({
			SearchText: ''
		})
		this.changeSearchValue('')
	}
	render() {
		const { classes } = this.props;
		const {
			pins,
			// locationFilterValue,
			pins2,
			gmapVisible,
			// mapViewState,
			rows,
			columns,
			selection,
			tableColumnExtensions,
			sorting,
			editingColumnExtensions,
			currencyColumns,
			dateColumns,
			phoneNumberColumns,
			pageSize,
			pageSizes,
			amountFilterOperations,
			// groupingColumns,
			// booleanColumns,
			searchValue,
			grouping,
			// leftColumns,
			// rightColumns,
			expandedRowIds,
		} = this.state;

		return (
			<div className="flex flex-col flex-1">
				<div className={classNames("flex flex-col")}>
					<div className={classNames('items-center')}>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<div className="flex items-center mr-12" style={{ minWidth: '100px', width: '100%' }}>
								<Icon color="action" className="ml-16">search</Icon>
								<TextField
									id="SearchText"
									placeholder="Search..."
									className={classes.textField}
									value={this.state.SearchText}
									onChange={this.handleChange('SearchText')}
									margin="dense"
									fullWidth
								/>
								<IconButton
									className={classNames(classes.button, 'p-0 m-0')}
									onClick={this.clearSearch}>
									<Icon color="action">close</Icon>
								</IconButton>
							</div>
							{/* <FormControl className={classNames(classes.formControl, 'ml-12')} style={{ marginTop: 5, minWidth: "100px", width: "30%" }}>
								<InputLabel shrink htmlFor="contract_lenght">Type</InputLabel>
								<Select
									native
									value={this.state.contract_lenght || ''}
									onChange={this.handleChange('contract_lenght')}
									inputProps={{
										name: 'contract_lenght',
										id: 'contract_lenght',
									}}
								>
									{["B"].map((x, index) => (
										<option key={index} value={index}>{x}</option>
									))}
								</Select>
							</FormControl> */}
							<FormControl className={classNames(classes.formControl)} style={{ marginTop: 5, width: 100 }}>
								<InputLabel shrink htmlFor="slsmn_no">Billing Month</InputLabel>
								<Select
									native
									value={this.state.billing_month || ''}
									onChange={this.handleChange('billing_month')}
									inputProps={{
										name: 'billing_month',
										id: 'billing_month',
									}}
								>
									{['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((x, index) => (
										<option key={index} value={index}>{x}</option>
									))}
								</Select>
							</FormControl>
							<FormControl className={classNames(classes.formControl, 'ml-6')} style={{ marginTop: 5, width: 100 }}>
								<InputLabel shrink htmlFor="slsmn_no">Billing Year</InputLabel>
								<Select
									native
									value={this.state.billing_year || ''}
									onChange={this.handleChange('billing_year')}
									inputProps={{
										name: 'billing_year',
										id: 'billing_year',
									}}
								>
									{Array.from(new Array(20), (val, index) => index + (new Date().getFullYear() - 19)).map((x, index) => (
										<option key={index} value={x}>{x}</option>
									))}
								</Select>
							</FormControl>

							<div className='flex items-center ml-12'>
								<Button variant="contained" color="primary">
									Payment<Icon font='small' className={classes.rightIcon}>add</Icon>
								</Button>
								<Button variant="contained" color="primary" className="ml-6">
									Credit<Icon font='small' className={classes.rightIcon}>add</Icon>
								</Button>
							</div>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-col flex-1 w-full">
							<div className="h-full">
								<Grid
									// rootComponent={GridRootComponent}
									rows={rows}
									columns={tableColumnExtensions}
								>
									<DragDropProvider />

									<RowDetailState
										expandedRowIds={expandedRowIds}
										onExpandedRowIdsChange={this.changeExpandedDetails}
									/>

									<PagingState
										defaultCurrentPage={0}
										// currentPage={currentPage}
										// onCurrentPageChange={this.changeCurrentPage}
										// pageSize={pageSize}
										// onPageSizeChange={this.changePageSize}
										defaultPageSize={20}
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

									<IntegratedPaging />

									<SearchState
										// defaultValue="Paris"
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



									{/* <GroupingState
										grouping={grouping}
										onGroupingChange={this.changeGrouping}
									// defaultGrouping={[]}
									// columnExtensions={tableColumnExtensions}
									/>
									<IntegratedGrouping /> */}

									{/* <BooleanTypeProvider
									for={booleanColumns}
								/> */}

									<CurrencyTypeProvider
										for={currencyColumns}
									// availableFilterOperations={amountFilterOperations}
									// editorComponent={AmountEditor}
									/>

									<PhoneNumberTypeProvider
										for={phoneNumberColumns}
									// availableFilterOperations={amountFilterOperations}
									// editorComponent={AmountEditor}
									/>
									<DateTypeProvider for={dateColumns} />

									{/* <VirtualTable height="auto" rowComponent={this.TableRow} /> */}
									<VirtualTable rowComponent={this.TableRow} />

									{/* <Table tableComponent={TableComponent} columnExtensions={tableColumnExtensions} rowComponent={TableRow} /> */}
									{/* <Table rowComponent={this.TableRow} /> */}

									<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />

									{/* showGroupingControls */}


									{/* <TableFixedColumns
									leftColumns={leftColumns}
									rightColumns={rightColumns}
								/> */}

									{/* <TableSelection showSelectAll selectByRowClick highlightRow /> */}
									{/* <TableSelection showSelectAll highlightRow rowComponent={this.TableRow} /> */}

									<TableHeaderRow showSortingControls />

									<TableRowDetail
										contentComponent={this.RowDetail}
									/>

									{/* <TableEditRow /> */}
									{/* <TableEditColumn
										// showAddCommand
										showEditCommand
										showDeleteCommand
										commandComponent={Command}
									/>
									<Getter
										name="tableColumns"
										computed={({ tableColumns }) => {
											// debugger
											const result = [
												...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
												{ key: 'editCommand', type: TableEditColumn.COLUMN_TYPE, width: 140 }
											];
											return result;
										}
										}
									/> */}

									{/* <TableColumnReordering
										defaultOrder={tableColumnExtensions.map(x => x.columnName)}
									/> */}
									{/* Column Visibility */}
									{/* Disable Column Visibility Toggling */}
									{/* <TableColumnVisibility
										defaultHiddenColumnNames={[]}
										columnExtensions={tableColumnExtensions}
									/> */}
									{/* <Toolbar /> */}
									{/* <SearchPanel /> */}
									{/* Column Visibility */}
									{/* <ColumnChooser /> */}

									{/* {filterState && (
										<TableFilterRow
											showFilterSelector
											iconComponent={FilterIcon}
										// messages={{ month: 'Month equals' }}
										/>
									)} */}

									{/* <TableGroupRow /> */}
									{/* <GroupingPanel showSortingControls showGroupingControls /> */}

									{/* <div
									className={classNames(classes.layoutTable, "flex flex-row")}
									style={{ justifyContent: "space-between" }}
								>
									<span className={"p-6"}>
										Rows Selected: <strong>{selection.length}</strong>
									</span>

									<span className={"p-6"}>
										Total Rows: <strong>{rows.length}</strong>
									</span>
								</div> */}

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

									<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />

								</Grid>
							</div>
						</div>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="InvoiceMessge"
								label="Invoice Messge"
								className={classes.textField}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceMessge}
								onChange={this.handleChange('InvoiceMessge')}
								margin="dense"
								fullWidth
							/>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="TotalItems"
								label="Total Items"
								className={classes.textField}
								InputLabelProps={{ shrink: true }}
								value={this.state.TotalItems}
								onChange={this.handleChange('TotalItems')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="InvoiceAmount"
								label="Invoice Amount"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceAmount}
								onChange={this.handleChange('InvoiceAmount')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="InvoiceTax"
								label="Invoice Tax"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceTax}
								onChange={this.handleChange('InvoiceTax')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="InvoiceTotal"
								label="Invoice Total"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceTotal}
								onChange={this.handleChange('InvoiceTotal')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="Royalty"
								label="Royalty"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.Royalty}
								onChange={this.handleChange('Royalty')}
								margin="dense"
								fullWidth
							/>
						</div>

						<Divider variant="middle" className='mt-12 mb-12' style={{ alignSelf: 'center', height: 2 }} />

						<div xs={12} sm={12} md={12} className="flex flex-row mb-12">
							<TextField
								id="BP"
								label="BP"
								className={classes.textField}
								InputLabelProps={{ shrink: true }}
								value={this.state.BP}
								onChange={this.handleChange('BP')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="AcctAdmin"
								label="Acct / Admin"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.AcctAdmin}
								onChange={this.handleChange('AcctAdmin')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="AdvertFee"
								label="Advert Fee"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.AdvertFee}
								onChange={this.handleChange('AdvertFee')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="TechnologyFee"
								label="Technology Fee"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.TechnologyFee}
								onChange={this.handleChange('TechnologyFee')}
								margin="dense"
								fullWidth
							/>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleFilterPanel: Actions.toggleFilterPanel,
		toggleMapView: Actions.toggleMapView,
		toggleSummaryPanel: Actions.toggleSummaryPanel,
		deleteCustomersAction: Actions.deleteCustomers,
		removeCustomerAction: Actions.removeCustomer,
		openEditCustomerForm: Actions.openEditCustomerForm,
		closeEditCustomerForm: Actions.closeEditCustomerForm,

		openNewCustomerForm: Actions.openNewCustomerForm,

		getCustomer: Actions.getCustomer,

		getCustomerBillingList: Actions.getCustomerBillingList,
	}, dispatch);
}

function mapStateToProps({ customers, auth }) {
	return {
		customers: customers.customersDB,
		bLoadedCustomers: customers.bLoadedCustomers,
		transactionStatus: customers.transactionStatus,
		filterState: customers.bOpenedFilterPanel,
		summaryState: customers.bOpenedSummaryPanel,
		regionId: auth.login.defaultRegionId,
		// customerForm: customers.customerForm,
		mapViewState: customers.bOpenedMapView,
		locationFilterValue: customers.locationFilterValue,
		searchText: customers.searchText,
		bCustomerFetchStart: customers.bCustomerFetchStart,

		customerServiceForm: customers.customerServiceForm,
		filterParam: customers.filterParam,
		isExpandedGrouping: customers.isExpandedGrouping,
		activeCustomer: customers.activeCustomer,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)));
