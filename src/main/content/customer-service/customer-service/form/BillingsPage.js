import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';
import _ from "lodash";
// core components
import { Icon, IconButton, Input, Paper, Button, Zoom } from '@material-ui/core';

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
import { compose, withProps, withHandlers, lifecycle } from "recompose";

import {
	Getter, Template, TemplateConnector
} from '@devexpress/dx-react-core';
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

import { CustomizedDxGridSelectionPanel } from "./../../../common/CustomizedDxGridSelectionPanel";

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

// const TableRow = ({ row, ...restProps }) => (
// 	<Table.Row
// 		{...restProps}
// 		// eslint-disable-next-line no-alert
// 		onClick={() => alert(JSON.stringify(row))}
// 		style={{
// 			cursor: 'pointer',
// 			// ...styles[row.sector.toLowerCase()],
// 		}}
// 	/>
// );

const DEFAULT_ZOOM = 8
let map_zoom = DEFAULT_ZOOM

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
	// lifecycle({
	// 	componentDidMount() {

	// 		this.setState({

	// 			zoomToMarkers: map => {
	// 				console.log("Zoom to markers");
	// 				const bounds = new window.google.maps.LatLngBounds();
	// 				props.markers.forEach((child) => {
	// 					if (child.type === Marker) {
	// 						bounds.extend(new window.google.maps.LatLng(child.props.position.lat, child.props.position.lng));
	// 					}
	// 				})
	// 				map.fitBounds(bounds);
	// 			}
	// 		})
	// 	},
	// }),
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
		// ref={props.markers}
		defaultZoom={map_zoom}
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
	// lifecycle({
	// 	componentDidMount() {

	// 		this.setState({

	// 			zoomToMarkers: map => {
	// 				console.log("Zoom to markers");
	// 				const bounds = new window.google.maps.LatLngBounds();
	// 				props.markers.forEach((child) => {
	// 					if (child.type === Marker) {
	// 						bounds.extend(new window.google.maps.LatLng(child.props.position.lat, child.props.position.lng));
	// 					}
	// 				})
	// 				map.fitBounds(bounds);
	// 			}
	// 		})
	// 	},
	// }),
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
		// ref={props.zoomToMarkers}
		defaultZoom={map_zoom}
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

class BillingsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			gmapVisible: false,
			locationFilterValue: [],
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
			tableColumnExtensions: [
				{
					title: "Invoice No",
					name: "inv_no",
					columnName: "inv_no",
					width: 160,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Invoice Date,",
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
					width: 80,
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
			phoneNumberColumns: [
				'Phone'
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

		console.log("constructor", this.props.customerForm)
		if (this.props.customerForm.data && this.props.customerForm.data.Data) {
			this.props.getCustomerBillingList(this.props.regionId, this.props.customerForm.data.Data.cust_no)
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

	onChange = (event, { newValue, method }) => {
		console.log("onChange");

		this.setState({
			value: newValue.toString()
		});
	};

	// toggleSelection = (key, shift, row) => {
	// 	console.log("toggleSelection");

	// 	/*
	// 	  https://react-table.js.org/#/story/select-table-hoc
	// 	  Implementation of how to manage the selection state is up to the developer.
	// 	  This implementation uses an array stored in the component state.
	// 	  Other implementations could use object keys, a Javascript Set, or Redux... etc.
	// 	*/
	// 	// start off with the existing state
	// 	let selection = [...this.state.selection];
	// 	const keyIndex = selection.indexOf(key);
	// 	// check to see if the key exists
	// 	if (keyIndex >= 0) {
	// 		// it does exist so we will remove it using destructing
	// 		selection = [
	// 			...selection.slice(0, keyIndex),
	// 			...selection.slice(keyIndex + 1)
	// 		];
	// 	} else {
	// 		// it does not exist so add it
	// 		selection.push(key);
	// 	}
	// 	// update the state
	// 	this.setState({ selection });
	// };

	// toggleAll = (instance) => {
	// 	console.log("toggleAll");

	// 	const selectAll = this.state.selectAll ? false : true;
	// 	const selection = [];
	// 	if (selectAll) {
	// 		let currentRecords = instance.data;
	// 		// we just push all the IDs onto the selection array
	// 		let page = this.state.page;
	// 		let pageSize = this.state.pageSize;
	// 		let start_index = page * pageSize;
	// 		let end_index = start_index + pageSize;
	// 		currentRecords.forEach(item => {
	// 			if (item._index >= start_index && item._index < end_index)
	// 				selection.push(item._original.CustomerId);
	// 		});
	// 	}
	// 	this.setState({ selectAll, selection });
	// };

	// isSelected = key => {
	// 	console.log("isSelected");

	// 	/*
	// 	  Instead of passing our external selection state we provide an 'isSelected'
	// 	  callback and detect the selection state ourselves. This allows any implementation
	// 	  for selection (either an array, object keys, or even a Javascript Set object).
	// 	*/
	// 	return this.state.selection.includes(key);
	// };

	// logSelection = () => {
	// 	console.log("logSelection", this.state.selection);
	// };

	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate", this.state !== nextState);

		// return this.state !== nextState
		// 	|| this.props.mapViewState !== nextProps.mapViewState
		// 	|| this.props.customers !== nextProps.customers
		// 	// || this.props.bOpenedFilterPanel !== nextProps.bOpenedFilterPanel
		// 	// 	// || this.props.loading !== nextProps.loading
		// 	// 	|| this.props.pins !== nextProps.pins
		// 	|| this.props.searchText !== nextProps.searchText
		return true;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.regionId !== this.props.regionId) {
			this.props.getCustomerBillingList(nextProps.regionId, this.props.customerForm.cus_no)
		}

		if (nextProps.customerServiceForm.billingList.data, this.props.customerServiceForm.billingList.data) {
			this.initRowsFromRawJson(nextProps.customerServiceForm.billingList.data)
		}
	} // deprecate 

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate", "CustomerListContent.js", this.props.locationFilterValue, this.props.customers);
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

	search(val) {
		console.log("---------search---------", val);
		val = val.toLowerCase();
		if (val === '') {
			this.setState({ rows: [...this.state.data] });
			return;
		}
		const temp = this.state.data.filter(d => {
			return (d.CustomerNo && d.CustomerNo.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.CustomerName && d.CustomerName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Address && d.Address.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.City && d.City.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.StateName && d.StateName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.PostalCode && d.PostalCode.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Phone && d.Phone.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.AccountTypeListName && d.AccountTypeListName.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Amount && d.Amount.toString().toLowerCase().indexOf(val) !== -1)
		});
		this.setState({ rows: [...temp] });
	}

	componentDidMount() {
		console.log("componentDidMount");
	}

	componentWillMount() {
		console.log("componentWillMount");

		this.initRowsFromRawJson();

		this.timer = null;
	}
	componentWillUnmount() {
		console.log("componentWillUnmount");
	}


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

	initRowsFromRawJson = (rawData = this.props.customerServiceForm.billingList.data) => {
		if (!rawData || !rawData.Data) return;

		rawData.Data.forEach(x => {
			x.DateTime = `${x.call_date} ${x.call_time}`
		})
		console.log("initRowsFromRawJson=billingList", rawData.Data)
		this.setState({ rows: rawData.Data })
	};


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

	render() {
		const {
			classes,
			toggleFilterPanel,
			toggleSummaryPanel,
			mapViewState,
			toggleMapView,
			filterState,
			locationFilterValue,
		} = this.props;

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
		} = this.state;

		console.log("-------render-------", locationFilterValue, pins, pins2)

		return (
			<Fragment>
				<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
					<Grid
						// rootComponent={GridRootComponent}
						rows={rows}
						columns={tableColumnExtensions}
					>
						<DragDropProvider />
						<PagingState
							defaultCurrentPage={0}
							// currentPage={currentPage}
							// onCurrentPageChange={this.changeCurrentPage}
							// pageSize={pageSize}
							// onPageSizeChange={this.changePageSize}
							defaultPageSize={20}
						/>

						<PagingPanel pageSizes={pageSizes} />

						<SelectionState
							selection={selection}
							onSelectionChange={this.changeSelection}
						/>
						{/* The Select All checkbox selects/deselects all rows on a page or all pages depending on the IntegratedSelection and IntegratedPaging plugin’s order. */}
						<IntegratedSelection />

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
						{/* <DateTypeProvider
									for={dateColumns}
								/> */}

						<VirtualTable height="auto" rowComponent={this.TableRow} />

						{/* <Table tableComponent={TableComponent} columnExtensions={tableColumnExtensions} rowComponent={TableRow} /> */}
						{/* <Table rowComponent={this.TableRow} /> */}

						<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />

						{/* showGroupingControls */}


						{/* <TableFixedColumns
									leftColumns={leftColumns}
									rightColumns={rightColumns}
								/> */}

						{/* <TableSelection showSelectAll selectByRowClick highlightRow /> */}
						<TableSelection showSelectAll highlightRow rowComponent={this.TableRow} />

						<TableHeaderRow showSortingControls />

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
		customerForm: customers.customerForm,
		mapViewState: customers.bOpenedMapView,
		locationFilterValue: customers.locationFilterValue,
		searchText: customers.searchText,
		bCustomerFetchStart: customers.bCustomerFetchStart,

		customerServiceForm: customers.customerServiceForm,
		filterParam: customers.filterParam,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BillingsPage)));

