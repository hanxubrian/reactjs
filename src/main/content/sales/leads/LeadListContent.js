import React, { Component, Fragment } from 'react';
// core components
import { Icon, IconButton, Input, Paper, Button } from '@material-ui/core';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';


import { withStyles, Checkbox } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';


import { Tooltip } from '@material-ui/core';
import GoogleMap from 'google-map-react';

import {
	SelectionState,
	IntegratedSelection,
	SortingState,
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
	TableEditRow,
	TableEditColumn,
	TableFilterRow,
	DragDropProvider,
	TableColumnReordering,
	TableColumnResizing,
	VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

function Marker({ text }) {
	return (
		<Tooltip title={text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}



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
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
	},
	tableTdEven: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
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
class LeadListContent extends Component {


	constructor(props) {
		super(props);

		this.state = {
			s: '',
			temp: [],
			data: [],
			selectAll: false,
			selection: [],
			rows: [],

			tableColumnExtensions2: [
				{
					title: "id",
					name: "id",
					columnName: "id",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "product",
					name: "product",
					columnName: "product",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "owner",
					name: "owner",
					columnName: "owner",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
			],
			tableColumnExtensions: [
				{
					title: "No",
					name: "CRM_AccountId",
					columnName: "CRM_AccountId",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Name",
					name: "CompanyName",
					columnName: "CompanyName",
					width: 200,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					togglingEnabled: false,
				},
				{
					title: "Contact Name",
					name: "Firstname",
					columnName: "Firstname",
					width: 200,
					wordWrapEnabled: true,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Contact No",
					name: "PhoneNumber",
					columnName: "PhoneNumber",
					width: 130,
					wordWrapEnabled: true,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Account Type",
					name: "AccountTypeName",
					columnName: 'AccountTypeName',
					width: 150,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "# LOC",
					name: "NumberOfLocations",
					columnName: "NumberOfLocations",
					width: 100,
					align: 'center',
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Budget",
					name: "BudgetAmount",
					columnName: "BudgetAmount",
					width: 90,
					align: 'right',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Bidding",
					name: "CRM_BiddingId",
					columnName: 'CRM_BiddingId',
					width: 90,
					align: 'right',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Contract Amount",
					name: "ContractAmount",
					columnName: 'ContractAmount',
					width: 150,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false

				},
				{
					title: "Stage",
					name: "StageStatusName",
					columnName: 'StageStatusName',
					width: 90,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,

				},
			],
			sorting: [
				{ columnName: 'LeadNo', direction: 'asc' }
			],
			editingColumnExtensions: [

			],
			currencyColumns: [
				'BudgetAmount','ContractAmount', 'CRM_BiddingId'
			],
			dateColumns: ['saleDate'],

			grouping: [
			],
			pageSize: 20,
			pageSizes: [10, 20, 30, 50, 100],
			amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
			searchValue: ''
		};

		this.fetchData = this.fetchData.bind(this);
		this.escFunction = this.escFunction.bind(this);

		this.changeSelection = selection => this.setState({ selection });
		this.changeSorting = sorting => this.setState({ sorting });
		this.commitChanges = this.commitChanges.bind(this);
		this.changeSearchValue = value => this.setState({ searchValue: value });
		this.changeGrouping = grouping => this.setState({ grouping });
		console.log("constructor");
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

	toggleSelection = (key, shift, row) => {
		console.log("toggleSelection");

		// start off with the existing state
		let selection = [...this.state.selection];
		const keyIndex = selection.indexOf(key);
		// check to see if the key exists
		if (keyIndex >= 0) {
			// it does exist so we will remove it using destructing
			selection = [
				...selection.slice(0, keyIndex),
				...selection.slice(keyIndex + 1)
			];
		} else {
			// it does not exist so add it
			selection.push(key);
		}
		// update the state
		this.setState({ selection });
	};

	toggleAll = (instance) => {
		console.log("toggleAll");

		const selectAll = this.state.selectAll ? false : true;
		const selection = [];
		if (selectAll) {
			let currentRecords = instance.data;
			// we just push all the IDs onto the selection array
			let page = this.state.page;
			let pageSize = this.state.pageSize;
			let start_index = page * pageSize;
			let end_index = start_index + pageSize;
			currentRecords.forEach(item => {
				if (item._index >= start_index && item._index < end_index)
					selection.push(item._original.LeadId);
			});
		}
		this.setState({ selectAll, selection });
	};

	isSelected = key => {
		console.log("isSelected");

		return this.state.selection.includes(key);
	};

	logSelection = () => {
		console.log("logSelection", this.state.selection);
	};


	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate");
		if (this.props.data !== prevProps.data) {
			this.setState({ data: this.props.data });
			this.setState({ rows: this.props.data });

		}

		if (prevState.s !== this.state.s) {
			this.search(this.state.s);
		}
	}
	getLeadsFromStatus = (rawData = this.props.leads) => {
		console.log("getLeadsFromStatus");

		let all_temp = [];

		if (rawData === null) return;

		let regions = rawData.Data.Regions.filter(x => {
			return this.props.regionId === 0 || x.Id === this.props.regionId;
		});

		regions.forEach(x => {
			all_temp = [...all_temp, ...x.Leads];
		});


		this.setState({ temp: all_temp });
		this.setState({ data: all_temp });

		this.setState({ rows: all_temp });

	};
	search(val) {
		console.log("search");

	    // this.setState({data: temp});
		val = val.toLowerCase();
		if (val === '') {
			this.getLeadsFromStatus();
			return;
		}
		const temp = this.state.data.filter(d => {
			return (d.LeadNo && d.LeadNo.toString().toLowerCase().indexOf(val) !== -1) || !val ||
				(d.LeadName && d.LeadName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Address && d.Address.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Phone && d.Phone.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.AccountTypeListName && d.AccountTypeListName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.LeadDescription && d.LeadDescription.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Amount && d.Amount.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.StatusName && d.StatusName.toString().toLowerCase().indexOf(val) !== -1)
		});

		this.setState({ data: temp });
		this.setState({ rows: temp });
	}

	componentDidMount() {
		console.log("componentDidMount");

		document.addEventListener("keydown", this.escFunction, false);
		this.getLocation();
	}

	componentWillMount() {
		console.log("componentWillMount");

		this.setState({ rows: this.props.data })
		this.setState({ data: this.props.data })
	}
	componentWillUnmount() {
		console.log("componentWillUnmount");

		document.removeEventListener("keydown", this.escFunction, false);
	}

	escFunction(event) {
		console.log("escFunction");

		if (event.keyCode === 27) {
			this.setState({ s: '' });
			this.setState({ data: this.props.data })
		}
	}

	handleChange = prop => event => {
		console.log("handleChange");

		this.setState({ [prop]: event.target.value });
	};

	removeLeads = () => {
		console.log("removeLeads");

		if (this.state.selection.length === 0) {
			alert("Please choose lead(s) to delete");
			return;
		}
		if (window.confirm("Do you really want to remove the selected lead(s)")) {
			this.props.deleteLeadsAction(this.state.selection, this.props.leads);
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

	capital_letter(str) {
		console.log("capital_letter");

		str = str.split(" ").map(x => {
			if (x.length > 1) {
				return x[0].toUpperCase() + x.substr(1).toLowerCase();
			} else if (x.length > 0) {
				return x[0].toUpperCase();
			} else {
				return "";
			}
		});

		return str.join(" ");
	}

	getLocation() {
		console.log("getLocation");

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position.coords);
					this.setState({
						current_lat: position.coords.latitude,
						current_long: position.coords.longitude
					})
				}
			);
		}
	}

	generateRows() {
		console.log("generateRows");

		console.log(this.props.data.slice(0, 15));
		return this.props.data;
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.state !== nextState ||
			this.props.mapViewState !== nextProps.mapViewState ||
			this.props.data !== nextProps.data

		// return true;
	}
	componentWillReceiveProps(nextProps) {
		// this.setState({ mapViewState: nextProps.mapViewState });
	} // deprecate 
	render() {
		console.log("render");

		const {
			classes,
			toggleFilterPanel,
			toggleSummaryPanel,
			mapViewState,
			toggleMapView,
			filterState
		} = this.props;

		const {
			rows,
			selection,
			tableColumnExtensions,
			sorting,
			editingColumnExtensions,
			currencyColumns,
			amountFilterOperations,
			searchValue,
		} = this.state;

		return (
			<Fragment>
				<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>

					<div className="flex flex-row items-center">
						<div className="flex items-center justify-start p-6">
							<Button
								onClick={(ev) => toggleFilterPanel()}
								aria-label="toggle filter panel"
								color="secondary"
								className={classNames(classes.filterPanelButton)}
							>
								<img className={classes.imageIcon} alt="" src="assets/images/invoices/filter.png" />
							</Button>
						</div>
						<Paper className={"flex items-center w-full h-44 m-12"} elevation={1}>
							<Input
								placeholder="Search..."
								className={classNames(classes.search, 'pl-16')}
								disableUnderline
								fullWidth
								value={this.state.s}
								onChange={this.handleChange('s')}
								inputProps={{
									'aria-label': 'Search'
								}}
							/>
							<Icon color="action" className="mr-16">search</Icon>
						</Paper>
                        <div className="flex items-center justify-start p-6">
                            <IconButton
                                className={classNames(classes.button,classes.summaryPanelButton, "mr-12")}
                                aria-label="Add an alarm"
                                onClick={(ev) => toggleMapView()}>
                                <Icon>{mapViewState ? 'list' : 'location_on'}</Icon>
                            </IconButton>
                        </div>
						<div className="flex items-center justify-end p-6 pl-0">
							<Button
								onClick={(ev) => toggleSummaryPanel()}
								aria-label="toggle summary panel"
								className={classNames(classes.summaryPanelButton)}
							>
								<Icon>insert_chart</Icon>
							</Button>
						</div>
					</div>
					{mapViewState && (<div className="w-full h-full">
						<div className="w-full h-full">
							<GoogleMap
								bootstrapURLKeys={{
									key: "AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA" //process.env.REACT_APP_MAP_KEY
								}}
								defaultZoom={12}
								defaultCenter={[this.state.current_lat, this.state.current_long]}
							>
								<Marker
									text="Marker Text"
									lat={this.state.current_lat}
									lng={this.state.current_long}
								/>
							</GoogleMap>
						</div>
					</div>)}
					{!mapViewState &&
						(
							<Paper
								className={classNames(classes.layoutTable, "flex flex-col h-full")}
							>
								<Grid
									rootComponent={GridRootComponent}
									rows={
										rows
									}
									columns={tableColumnExtensions}
								>
									<DragDropProvider />

									<VirtualTable
										height="auto"
									/>

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
										availableFilterOperations={amountFilterOperations}
										editorComponent={AmountEditor}
									/>

									<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />
									<TableHeaderRow showSortingControls />

									<TableSelection showSelectAll selectByRowClick highlightRow />

									<TableEditRow />
									<TableEditColumn
										showAddCommand
										showEditCommand
										showDeleteCommand
										commandComponent={Command}
									/>

									<TableColumnReordering
										defaultOrder={tableColumnExtensions.map(x => x.columnName)}
									/>

									{filterState && (
										<TableFilterRow
											showFilterSelector
											iconComponent={FilterIcon}
										/>
									)}

								</Grid>
							</Paper>
						)
					}
				</div>
			</Fragment>
		)
	}

	render2() {
		console.log(this.props)
		console.log(this.state)
		const {
			classes,
			toggleFilterPanel,
			toggleSummaryPanel,
			mapViewState
		} = this.props;
		const { toggleSelection, toggleAll, isSelected } = this;
		console.log("mapViewState")
		console.log(this.state.mapViewState)

		return (
			<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>

				<div className="flex flex-row items-center">
					<div className="flex items-center justify-start p-12">
						<Button
							onClick={(ev) => toggleFilterPanel()}
							aria-label="toggle filter panel"
							color="secondary"
							className={classNames(classes.filterPanelButton)}
						>
							<img className={classes.imageIcon} alt="" src="assets/images/invoices/filter.png" />
						</Button>
					</div>
					<Paper className={"flex items-center w-full h-44 mr-12"} elevation={1}>
						<Input
							placeholder="Search..."
							className={classNames(classes.search, 'pl-16')}
							// className="pl-16"
							disableUnderline
							fullWidth
							value={this.state.s}
							onChange={this.handleChange('s')}
							inputProps={{
								'aria-label': 'Search'
							}}
						/>
						<Icon color="action" className="mr-16">search</Icon>
					</Paper>
					<div className="flex items-center justify-end p-12">
						<Button
							onClick={(ev) => toggleSummaryPanel()}
							aria-label="toggle summary panel"
							className={classNames(classes.summaryPanelButton)}
						>
							<Icon>insert_chart</Icon>
						</Button></div>
				</div>

				{/* MapView */}
				{mapViewState && (<div className="w-full h-full">
					<div className="w-full h-full">
						<GoogleMap
							bootstrapURLKeys={{
								key: "AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA" //process.env.REACT_APP_MAP_KEY
							}}
							defaultZoom={12}
							defaultCenter={[this.state.current_lat, this.state.current_long]}
						>
							<Marker
								text="Marker Text"
								lat={this.state.current_lat}
								lng={this.state.current_long}
							/>
						</GoogleMap>
					</div>
				</div>)}

				{/* GridView */}
				{!mapViewState && (
					<ReactTable
						data={this.state.data}
						minRows={0}
						PaginationComponent={JanikingPagination}
						onFetchData={this.fetchData}
						getTheadGroupProps={(state, rowInfo, column, instance) => {
							return {
								style: {
									padding: "10px 10px",
									fontSize: 16,
									fontWeight: 700
								},
							}
						}}
						getTheadGroupThProps={(state, rowInfo, column, instance) => {
							return {
								style: {
									padding: "10px 10px",
									fontSize: 18,
									fontWeight: 700,
								},
								className: classNames("flex items-center justify-start")
							}
						}}
						getTheadThProps={(state, rowInfo, column, instance) => {
							let border = '1px solid rgba(255,255,255,.6)';
							if (column.Header === 'Actions') border = 'none';

							return {
								style: {
									fontSize: '1.6rem',
									fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
									fontWeight: 400,
									lineHeight: 1.75,
									color: 'white',
									borderRight: border
								},
							}
						}}
						getTheadProps={(state, rowInfo, column, instance) => {
							return {
								style: {
									fontSize: 13,
								},
								className: classes.tableTheadRow
							}
						}}
						getTdProps={(state, rowInfo, column, instance) => {
							return {
								style: {
									textAlign: 'center',
									flexDirection: 'row',
									fontSize: 12,
									padding: "0",
								},
							}
						}}
						getTrProps={(state, rowInfo, column) => {
							return {
								className: "cursor-pointer",
								onClick: (e, handleOriginal) => {
									if (rowInfo) {
										alert('ok');
									}
								}
							}
						}}
						columns={[
							{
								Header: (instance) => (
									<Checkbox
										onClick={(event) => {
											event.stopPropagation();
										}}
										onChange={(event) => toggleAll(instance)}
										checked={this.state.selectAll}
										style={{ color: 'white' }}
									/>
								),
								accessor: "",
								Cell: row => {
									return (<Checkbox
										onClick={(event) => {
											event.stopPropagation();
										}}
										checked={isSelected(row.value.LeadId)}
										onChange={() => toggleSelection(row.value.LeadId)}
									/>
									)
								},
								className: "justify-center",
								sortable: false,
								width: 72
							},
							{
								Header: "No",
								accessor: "LeadNo",
								filterAll: true,
								width: 60,
								className: classNames("flex items-center  justify-center") //classes.tableTdEven
							},
							{
								Header: "Name",
								accessor: "LeadName",
								width: 200,
								className: classNames("flex items-center  justify-start p-12-impor")
							},
							{
								Header: "Address",
								// accessor: "Address",
								id: "Address",
								accessor: d => (this.capital_letter(d.Address)),
								className: classNames("flex items-center  justify-start"),
								width: 160
							},
							{
								Header: "City",
								// accessor: "City",
								id: "City",
								accessor: d => (this.capital_letter(d.City)),
								className: classNames("flex items-center  justify-start"),
								width: 90
							},
							{
								Header: "State",
								accessor: "StateName",
								className: classNames("flex items-center  justify-center"),
								width: 50
							},
							{
								Header: "Zip",
								accessor: "PostalCode",
								className: classNames("flex items-center  justify-center"),
								headerClassName: "wordwrap",
								width: 50
							},
							{
								Header: "Phone",
								accessor: "Phone",
								width: 80,
								className: classNames("flex items-center  justify-center p-12-impor")
							},
							{
								Header: "Account Type",
								accessor: "AccountTypeListName",
								className: classNames("flex items-center  justify-center p-12-impor"),
								width: 150
							},
							{
								Header: "Status",
								accessor: "StatusName",
								className: classNames("flex items-center  justify-center p-12-impor"),
								width: 60
							},
							{
								Header: "Contract Amount",
								id: "Amount",
								accessor: d => '$' + d.Amount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
								className: classNames("flex items-center  justify-end p-12-impor"),
								headerClassName: "wordwrap",
								width: 80
							},
							{
								Header: "Actions",
								width: 110,
								Cell: row => (
									<div className="flex items-center actions">
										<IconButton
											onClick={(ev) => {
												ev.stopPropagation();
												if (window.confirm("Do you really want to remove this lead")) {
													this.props.removeLeadAction(row.original.LeadId, this.props.leads);
													if (this.state.selection.length > 0) {
														_.remove(this.state.selection, function (id) {
															return id === row.original.LeadId;
														});
													}
												}
											}}
										>
											<Icon>delete</Icon>
										</IconButton>
										<IconButton
											onClick={(ev) => {
												ev.stopPropagation();
											}}
										>
											<Icon>edit</Icon>
										</IconButton>
									</div>
								)
							},

						]}
						defaultPageSize={100}
						className={classNames("-striped -highlight")}
						totalRecords={this.state.data.length}
						style={{ flex: '1', }}
					/>
				)}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleFilterPanel: Actions.toggleFilterPanel,
		toggleMapView: Actions.toggleMapView,
		toggleSummaryPanel: Actions.toggleSummaryPanel,
		deleteLeadsAction: Actions.deleteLeads,
		removeLeadAction: Actions.removeLead,
		openEditLeadForm: Actions.openEditLeadForm,
		closeEditLeadForm: Actions.closeEditLeadForm,
	}, dispatch);
}

function mapStateToProps({ leads, auth }) {
	return {
		leads: leads.leadsDB,
		bLoadedLeads: leads.bLoadedLeads,
		transactionStatus: leads.transactionStatus,
		filterState: leads.bOpenedFilterPanel,
		summaryState: leads.bOpenedSummaryPanel,
		regionId: auth.login.defaultRegionId,
		LeadForm: leads.LeadForm,
		mapViewState: leads.bOpenedMapView
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeadListContent)));

