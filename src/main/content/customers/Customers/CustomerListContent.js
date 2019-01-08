import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';

// core components
import { Icon, IconButton, Input, Paper, Button } from '@material-ui/core';

//Janiking
import JanikingPagination from 'Commons/JanikingPagination';

// theme components
// import {FuseAnimate} from '@fuse';

import { withStyles, Checkbox } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
// import moment from 'moment'
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';


import { Tooltip } from '@material-ui/core';
// import GoogleMap from 'google-map-react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withHandlers } from "recompose";

import { geolib } from 'geolib';

import {
	SelectionState,
	PagingState,
	IntegratedPaging,
	IntegratedSelection,
	SortingState,
	IntegratedSorting,
	EditingState,
	GroupingState,
	IntegratedGrouping,
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
	PagingPanel,
	TableEditRow,
	TableEditColumn,
	GroupingPanel,
	Toolbar,
	TableGroupRow,
	TableFilterRow,
	SearchPanel,
	DragDropProvider,
	TableColumnReordering,
	TableColumnResizing,
	ColumnChooser,
	TableColumnVisibility,
	TableFixedColumns,
	VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { fade } from '@material-ui/core/styles/colorManipulator';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import Spinner from 'react-spinner-material';
import { getOverlappingDaysInIntervals } from 'date-fns';
import CustomerSearchBar from './CustomerSearchBar';
import { getCustomers } from '../../../../store/actions';

// function Marker({ text }) {
// 	return (
// 		<Tooltip title={text} placement="top">
// 			<Icon className="text-red">place</Icon>
// 		</Tooltip>
// 	);
// }



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


const MapWithAMarkerClusterer = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100%` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withHandlers({
		onMarkerClustererClick: () => (markerClusterer) => {
			const clickedMarkers = markerClusterer.getMarkers()
			console.log(`Current clicked markers length: ${clickedMarkers.length}`)
			console.log(clickedMarkers)
		},
	}),
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
		defaultZoom={10.5}
		defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
	>
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons
			gridSize={60}
		>
			{props.markers.map((x, index) => (
				<Marker
					key={index}
					position={{ lat: x.lat, lng: x.lng }}
				/>
			))}
		</MarkerClusterer>
	</GoogleMap>
);


const MapWithAMarkerClusterer2 = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100%` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withHandlers({
		onMarkerClustererClick: () => (markerClusterer) => {
			const clickedMarkers = markerClusterer.getMarkers()
			console.log(`Current clicked markers length: ${clickedMarkers.length}`)
			console.log(clickedMarkers)
		},
	}),
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
		defaultZoom={10.5}
		defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
	>
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons
			gridSize={60}
		>
			{props.markers.map((x, index) => (
				<Marker
					key={index}
					position={{ lat: x.lat, lng: x.lng }}
				/>
			))}
		</MarkerClusterer>
	</GoogleMap>
);

class CustomerListContent extends Component {




	constructor(props) {
		super(props);
		this.state = {
			gmapVisible: false,
			locationFilterValue: this.props.locationFilterValue,
			pins: [],
			pins2: [],

			s: '',
			temp: [],
			data: [],
			selectAll: false,

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
					name: "CustomerNo",
					columnName: "CustomerNo",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Name",
					name: "CustomerName",
					columnName: "CustomerName",
					width: 200,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					togglingEnabled: false,
				},
				{
					title: "Address",
					name: "Address",
					columnName: "Address",
					width: 200,
					wordWrapEnabled: true,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "City",
					name: "City",
					columnName: "City",
					width: 130,
					wordWrapEnabled: true,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "State",
					name: "StateName",
					columnName: 'StateName',
					width: 90,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Zip",
					name: "PostalCode",
					columnName: "PostalCode",
					width: 90,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Phone",
					name: "Phone",
					columnName: "Phone",
					width: 100,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Account Type",
					name: "AccountTypeListName",
					columnName: "AccountTypeListName",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Status",
					name: "StatusName",
					columnName: 'StatusName',
					width: 90,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Contract Amount",
					name: "Amount",
					columnName: 'Amount',
					width: 120,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,

				},
				// { title: "Actions", name: "Actions", columnName: "Actions", width: 110, sortingEnabled: true, filteringEnabled: false, }
			],
			sorting: [
				{ columnName: 'CustomerNo', direction: 'asc' }
			],
			editingColumnExtensions: [
				// {
				// 	columnName: 'firstName',
				// 	createRowChange: (row, value) => ({ user: { ...row.user, firstName: value } }),
				// },
			],
			currencyColumns: [
				'Amount'
			],
			dateColumns: ['saleDate'],
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
		};

		this.fetchData = this.fetchData.bind(this);
		// this.escFunction = this.escFunction.bind(this);

		this.changeSelection = selection => this.setState({ selection });
		this.changeSorting = sorting => this.setState({ sorting });
		this.commitChanges = this.commitChanges.bind(this);
		// this.changeCurrentPage = currentPage => this.setState({ currentPage });
		// this.changePageSize = pageSize => this.setState({ pageSize });
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

		/*
		  https://react-table.js.org/#/story/select-table-hoc
		  Implementation of how to manage the selection state is up to the developer.
		  This implementation uses an array stored in the component state.
		  Other implementations could use object keys, a Javascript Set, or Redux... etc.
		*/
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
					selection.push(item._original.CustomerId);
			});
		}
		this.setState({ selectAll, selection });
	};

	isSelected = key => {
		console.log("isSelected");

		/*
		  Instead of passing our external selection state we provide an 'isSelected'
		  callback and detect the selection state ourselves. This allows any implementation
		  for selection (either an array, object keys, or even a Javascript Set object).
		*/
		return this.state.selection.includes(key);
	};

	logSelection = () => {
		console.log("logSelection", this.state.selection);
	};


	componentDidUpdate(prevProps, prevState, snapshot) {
		// console.log("componentDidUpdate", "CustomerListContent.js", this.props.locationFilterValue);
		if (this.props.data !== prevProps.data) {
			// this.setState({ data: this.props.data });
			// this.setState({ rows: this.props.data });
			// this.setState({ pins: this.props.pins })
			// this.setState({ pins: this.props.pins })
			// this.setState({ locationFilterValue: this.props.locationFilterValue })
		}

		// if (prevState.s !== this.state.s) {
		// 	this.search(this.state.s);
		// }
	}
	getCustomersFromStatus = (rawData = this.props.customers) => {
		console.log("getCustomersFromStatus");

		// let temp = [];
		let all_temp = [];
		// let temp1 = [];
		// const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
		// const keys = ['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];

		if (rawData === null) return;

		let regions = rawData.Data.Regions.filter(x => {
			return this.props.regionId === 0 || x.Id === this.props.regionId;
		});

		regions.forEach(x => {
			all_temp = [...all_temp, ...x.CustomerList];
		});

		// regions.map(x => {
		// 	all_temp = [...all_temp, ...x.Customers];
		// });

		// this.setState({ temp: all_temp });
		// this.setState({ data: all_temp });


		this.setState({
			data: [...all_temp],
			rows: [...all_temp]
		});

	};

	search(val) {
		console.log("---------search---------", val);

		// const temp = this.props.data.filter( d => {
		//     console.log('customer=', d);
		//     return d.CustomerId.toString().indexOf(val) !== -1 || !val ||
		//         d.CustomerNo.indexOf(val) !== -1 ||
		//         d.CustomerAmount.toString().indexOf(val) !== -1 ||
		//         d.CustomerTotal.toString().indexOf(val) !== -1 ||
		//         d.CustomerTax.toString().indexOf(val) !== -1 ||
		//         d.CustomerDescription.toLowerCase().indexOf(val) !== -1 ||
		//         d.CustomerName.toLowerCase().indexOf(val) !== -1 ||
		//         d.CustomerId.toString().indexOf(val) !== -1 ||
		//         d.CustomerNo.toString().indexOf(val) !== -1 ||
		//         d.TransactionStatusListId.toString().indexOf(val) !== -1
		// });

		// this.setState({data: temp});
		val = val.toLowerCase();
		if (val === '') {
			this.getCustomersFromStatus();
			return;
		}
		const temp = this.state.data.filter(d => {
			return (d.CustomerNo && d.CustomerNo.toString().toLowerCase().indexOf(val) !== -1) || !val ||
				(d.CustomerName && d.CustomerName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Address && d.Address.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Phone && d.Phone.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.AccountTypeListName && d.AccountTypeListName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.CustomerDescription && d.CustomerDescription.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Amount && d.Amount.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.StatusName && d.StatusName.toString().toLowerCase().indexOf(val) !== -1)
		});

		// this.setState({ data: temp });
		this.setState({ rows: [...temp] });
	}

	componentDidMount() {
		console.log("componentDidMount");

		document.addEventListener("keydown", this.escFunction, false);
	}

	componentWillMount() {
		console.log("componentWillMount");
		this.getLocation();

		// this.setState({ rows: this.props.data })
		// this.setState({ data: this.props.data })

		this.timer = null;
	}
	componentWillUnmount() {
		console.log("componentWillUnmount");

		// document.removeEventListener("keydown", this.escFunction, false);
	}

	// escFunction(event) {
	// 	console.log("escFunction");

	// 	if (event.keyCode === 27) {
	// 		this.setState({ s: '' });
	// 		// this.setState({ data: this.props.data })
	// 		this.setState({ rows: this.props.data })
	// 	}
	// }


	handleChange = prop => event => {
		console.log("handleChange");


		this.setState({ [prop]: event.target.value });

		// if (prop === 's') {
		// 	clearTimeout(this.timer);
		// 	this.timer = setTimeout(this.search, this.WAIT_INTERVAL);
		// }
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
					// this.setState({
					// 	current_lat: position.coords.latitude,
					// 	current_long: position.coords.longitude
					// })
					this.setState({
						current_lat: 42.910772,
						current_long: -78.74557
					})
					if (this.props.locationFilterValue && this.props.pins) {
						this.initPins()
					}
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
		console.log("shouldComponentUpdate", this.state !== nextState);

		return this.state !== nextState ||
			this.props.mapViewState !== nextProps.mapViewState ||
			this.props.data !== nextProps.data ||
			this.props.loading !== nextProps.loading ||
			this.props.pins !== nextProps.pins ||
			this.props.searchText !== nextProps.searchText
	}

	componentWillReceiveProps(nextProps) {
		// this.setState({ mapViewState: nextProps.mapViewState });
		// console.log("componentWillReceiveProps", "CustomerListContent.js", nextProps.locationFilterValue)


		if (nextProps.data !== this.props.data) {
			this.setState({ rows: nextProps.data })
		}

		if (this.props.locationFilterValue !== nextProps.locationFilterValue) {
			this.setState({ locationFilterValue: nextProps.locationFilterValue })
			this.props.pins && this.initPins(this.props.pins, nextProps.locationFilterValue)
		}

		if (this.props.pins !== nextProps.pins) {
			// this.setState({ pins: nextProps.pins })
			this.initPins(nextProps.pins, this.props.locationFilterValue)
		}


		if (nextProps.searchText !== this.props.searchText) {
			this.search(nextProps.searchText);
		}
	} // deprecate 

	initPins(pins, locationFilterValue) {
		// this.setState({ gmapVisible: !this.state.gmapVisible });
		console.log("-------initPins---------", pins)
		switch (locationFilterValue) {
			case "locationAll":
				if (!this.state.gmapVisible) {
					this.setState({
						gmapVisible: !this.state.gmapVisible,
						pins: pins === undefined ? [] : [...pins],
						pins2: []
					})
				} else {
					this.setState({
						gmapVisible: !this.state.gmapVisible,
						pins: [],
						pins2: pins === undefined ? [] : [...pins]
					})
				}

				break;
			case "locationNearBy":
				let _pins = this.nearbyLocations(pins, { lat: this.state.current_lat, lng: this.state.current_long }, 15)

				if (!this.state.gmapVisible) {
					this.setState({
						gmapVisible: !this.state.gmapVisible,
						pins: [..._pins],
						pins2: []
					})
				} else {
					this.setState({
						gmapVisible: !this.state.gmapVisible,
						pins: [],
						pins2: [..._pins]
					})
				}

				break;
			case "locationNearSpecificAddress":

				if (!this.state.gmapVisible) {
					this.setState({
						pins: [],
						gmapVisible: !this.state.gmapVisible,
					})
				} else {
					this.setState({
						pins2: [],
						gmapVisible: !this.state.gmapVisible,
					})
				}
				break;
			default:
				this.setState({ pins: pins })
				break;
		}

	}

	Deg2Rad(deg) {
		return deg * Math.PI / 180;
	}

	PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
		lat1 = this.Deg2Rad(lat1);
		lat2 = this.Deg2Rad(lat2);
		lon1 = this.Deg2Rad(lon1);
		lon2 = this.Deg2Rad(lon2);
		var R = 6371; // km
		var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
		var y = (lat2 - lat1);
		var d = Math.sqrt(x * x + y * y) * R;
		return d;
	}

	// NearestCity(latitude, longitude) {
	// 	var mindif = 99999;
	// 	var closest;

	// 	for (index = 0; index < cities.length; ++index) {
	// 		var dif = this.PythagorasEquirectangular(latitude, longitude, cities[index][1], cities[index][2]);
	// 	}
	// }

	nearbyLocations(pins, center, miles = 5) {
		// let _nearbys = [];
		// this.props.pins.forEach(x => {
		// 	let dist = this.PythagorasEquirectangular(center.lat, center.lng, x.lat, x.lng);

		// 	if (dist <= miles) {
		// 		_nearbys = [..._nearbys, x]
		// 	}

		// });

		return [...pins.filter(x => {
			return (this.PythagorasEquirectangular(center.lat, center.lng, x.lat, x.lng) <= miles)
		})];
		// return _nearbys
	}

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
			pins,
			locationFilterValue,
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
			pageSize,
			pageSizes,
			amountFilterOperations,
			// groupingColumns,
			// booleanColumns,
			searchValue,
			grouping,
			// leftColumns,
			// rightColumns,
		} = this.state;

		console.log("-------render-------", locationFilterValue, pins, pins2)

		return (
			<Fragment>
				<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>

					<CustomerSearchBar>

					</CustomerSearchBar>

					{/* Mapview */}
					{mapViewState && (<div className="w-full h-full">
						<div className="w-full h-full">
							{/* <GoogleMap
								bootstrapURLKeys={{
									key: "AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA" //process.env.REACT_APP_MAP_KEY
								}}
								defaultZoom={12}
								defaultCenter={[this.state.current_lat, this.state.current_long]}
							>
								{
									this.props.pins.map((x, index) => (
										<Marker
											key={index}
											text={x.text}
											lat={x.lat}
											lng={x.lng}
										/>
									))
								}
							</GoogleMap> */}

							{gmapVisible && (<MapWithAMarkerClusterer
								markers={pins}
								center={{ lat: this.state.current_lat, lng: this.state.current_long }}
							/>)}

							{!gmapVisible && (<MapWithAMarkerClusterer2
								markers={pins2}
								center={{ lat: this.state.current_lat, lng: this.state.current_long }}
							/>)}

						</div>
					</div>)}

					{/* Girdview */}
					{!mapViewState &&
						(
							<Paper
								className={classNames(classes.layoutTable, "flex flex-col h-full")}
							// style={{ flex: '1', }}
							>

								<Grid
									rootComponent={GridRootComponent}
									rows={
										// [
										// 	{ id: 0, product: 'DevExtreme', owner: 'DevExpress' },
										// 	{ id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
										// ]


										// Array.from({ length: 10000 })
										// 	.map((item, index) => (
										// 		{ id: index, product: 'Product' + index, owner: 'owner' + index }
										// 	))

										rows
									}
									columns={tableColumnExtensions}
								>
									<DragDropProvider />

									<VirtualTable
										height="auto"
									/>

									{/* <PagingState
										defaultCurrentPage={0}
										// currentPage={currentPage}
										// onCurrentPageChange={this.changeCurrentPage}
										// pageSize={pageSize}
										// onPageSizeChange={this.changePageSize}
										defaultPageSize={20}
									/>

									<PagingPanel pageSizes={pageSizes} /> */}

									<SelectionState
										selection={selection}
										onSelectionChange={this.changeSelection}
									/>
									{/* The Select All checkbox selects/deselects all rows on a page or all pages depending on the IntegratedSelection and IntegratedPaging plugin’s order. */}
									<IntegratedSelection />

									{/* <IntegratedPaging /> */}


									<SortingState
										sorting={sorting}
										onSortingChange={this.changeSorting}
										columnExtensions={tableColumnExtensions}
									/>
									<IntegratedSorting />

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
										availableFilterOperations={amountFilterOperations}
										editorComponent={AmountEditor}
									/>
									{/* <DateTypeProvider
									for={dateColumns}
								/> */}


									{/* <Table tableComponent={TableComponent} columnExtensions={tableColumnExtensions} /> */}
									<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />
									<TableHeaderRow showSortingControls />
									{/* showGroupingControls */}


									{/* <TableFixedColumns
									leftColumns={leftColumns}
									rightColumns={rightColumns}
								/> */}

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

									{filterState && (
										<TableFilterRow
											showFilterSelector
											iconComponent={FilterIcon}
										// messages={{ month: 'Month equals' }}
										/>
									)}
									{/* <TableGroupRow /> */}
									{/* <GroupingPanel showSortingControls showGroupingControls /> */}

								</Grid>

								<div
									className={classNames(classes.layoutTable, "flex flex-row")}
									style={{ justifyContent: "space-between" }}
								>
									<span className={"p-6"}>
										Rows Selected: <strong>{selection.length}</strong>
									</span>
									<Spinner size={45} spinnerColor={"#F40456"} spinnerWidth={5}
										visible={this.props.loading}
										className={classNames("p-6")}
									/>
									<span className={"p-6"}>
										Total Rows: <strong>{rows.length}</strong>
									</span>
								</div>

							</Paper>
						)
					}
				</div>
			</Fragment>
		)
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
		CustomerForm: customers.CustomerForm,
		mapViewState: customers.bOpenedMapView,
		locationFilterValue: customers.locationFilterValue,
		searchText: customers.searchText,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerListContent)));

