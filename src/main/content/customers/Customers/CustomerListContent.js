import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';

// core components
import { Icon, IconButton, Input, Button } from '@material-ui/core';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';

import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withHandlers } from "recompose";

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
} from '@devexpress/dx-react-grid';

import { CustomizedDxGridSelectionPanel } from "./../../common/CustomizedDxGridSelectionPanel";

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

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

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
	return value ? value.replace(/(\d{3})(\d{3})(\d{4})/, '+1 ($1) $2 - $3') : ''
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
const DateFormatter = ({ value }) => {
	return value ? value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1') : ''
};
const DateTypeProvider = props => (
	<DataTypeProvider
		formatterComponent={DateFormatter}
		{...props}
	/>
);
const AtRiskFormatter = ({ value }) => {
	if (!value || value.trim() === "")
		return ""
	else if (value === "A") // Account At Risk
		return (<Icon style={{ color: 'red', textAlign: 'center' }} >error_outline</Icon >)
	else if (value === "C") // Active Complaint
		return (<Icon style={{ color: 'red', textAlign: 'center' }} >sentiment_dissatisfied</Icon >)
	else if (value === "X") // At Risk with Active Complaints
		return (<Icon style={{ color: 'red', textAlign: 'center' }} >new_releases</Icon >)
	else if (value === "CA") // Collection Activity
		return (<Icon style={{ color: 'red', textAlign: 'center' }} >block</Icon >)
	else if (value === "XCA") // highest risk
		return (<Icon style={{ color: 'red', textAlign: 'center' }} >warning</Icon >)
	else
		return value
}
const AtRiskProvider = props => (
	<DataTypeProvider
		formatterComponent={AtRiskFormatter}
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

class CustomerListContent extends Component {

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
					title: "No",
					name: "CustomerNo",
					columnName: "CustomerNo",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: " ",
					name: "atrisk",
					columnName: "atrisk",
					width: 50,
					sortingEnabled: false,
					filteringEnabled: false,
					groupingEnabled: false,
				},
				{
					title: "Name",
					name: "CustomerName",
					columnName: "CustomerName",
					width: 250,
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
					width: 250,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "City",
					name: "City",
					columnName: "City",
					width: 130,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "State",
					name: "StateName",
					columnName: 'StateName',
					width: 80,
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
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Phone",
					name: "Phone",
					columnName: "Phone",
					width: 150,
					sortingEnabled: true,
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
					title: "Contract",
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
				{ columnName: 'CustomerNo', direction: 'desc' }
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
			atRiskColumns: [
				'atrisk'
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
		// this.changeSearchValue = value => this.setState({ searchValue: value });
		this.changeGrouping = grouping => this.setState({ grouping });
	}
	//
	// to edit table cell
	//
	commitChanges({ added, changed, deleted }) {
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
		if (nextProps.customers !== this.props.customers) {
			this.initRowsFromRawJson(nextProps.customers);
		}

		if (this.props.locationFilterValue !== nextProps.locationFilterValue) {
			this.setState({ locationFilterValue: nextProps.locationFilterValue })
			this.initRowsFromRawJson(this.props.customers, nextProps.locationFilterValue);
		}

		// if (this.props.pins !== nextProps.pins) {
		// 	// this.setState({ pins: nextProps.pins })
		// 	this.filterPins(nextProps.pins, this.props.locationFilterValue)
		// }


		if (nextProps.searchText !== this.props.searchText) {
			this.changeSearchValue(nextProps.searchText);
		}
	} // deprecate

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.data !== prevProps.data) {
		}
	}

	changeSearchValue = value => {
		this.setState({ searchValue: value })
	};

	search_old(val) {
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
	}

	componentWillMount() {
		this.initRowsFromRawJson();

		this.getLocation();

		// this.setState({ rows: this.props.data })
		// this.setState({ data: this.props.data })

		this.timer = null;
	}
	componentWillUnmount() {
	}


	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });

		// if (prop === 's') {
		// 	clearTimeout(this.timer);
		// 	this.timer = setTimeout(this.search, this.WAIT_INTERVAL);
		// }
	};

	removeCustomers = () => {

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
		this.setState({
			pageSize: state.pageSize,
			page: state.page,
		});
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.setState({
						current_lat: position.coords.latitude,
						current_long: position.coords.longitude
					})

					// this.setState({
					// 	current_lat: 42.910772,
					// 	current_long: -78.74557
					// })

					if (this.state.addrLat == undefined) {
						this.setState({
							addrLat: position.coords.latitude,
							addrLng: position.coords.longitude
						})
						// this.setState({
						// 	addrLat: 42.910772,
						// 	addrLng: -78.74557
						// })
					}
					if (this.props.locationFilterValue) {
						this.initRowsFromRawJson();
					}
				}
			);
		}
	}

	generateRows() {
		return this.props.data;
	}



	initRowsFromRawJson = (rawData = this.props.customers, locationFilterValue = this.props.locationFilterValue) => {
		let all_temp = [];
		if (rawData === null || rawData === undefined || rawData.Data === undefined) return;

		let regions = rawData.Data.Regions.filter(x => {
			return this.props.regionId === 0 || x.Id === this.props.regionId;
		});


		regions.forEach(x => {
			all_temp = [...all_temp, ...x.CustomerList];
		});

		let _pins_temp = [];
		regions.forEach(x => {
			_pins_temp = [..._pins_temp, ...x.CustomerList.map(customer => {
				return {
					lat: customer.Latitude,
					lng: customer.Longitude,
					text: customer.CustomerName
				}
			})];

		})

		this.filterPins(_pins_temp, locationFilterValue)

		this.setState({
			rows: all_temp,
			data: all_temp,
			// pins: _pins_temp,
		});

	};

	filterPins(pins, locationFilterValue) {
		// this.setState({ gmapVisible: !this.state.gmapVisible });
		let k = (12.5 - 9.5) * 75 / (75 / 5 - 1)
		let b = 12.5 - k / 5

		switch (locationFilterValue.id) {
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
				map_zoom = DEFAULT_ZOOM
				break;
			case "locationNearBy":
				let _pins = []
				this.setState({
					addrLat: this.state.current_lat,
					addrLng: this.state.current_long
				})

				_pins = this.nearbyLocations(
					pins,
					{
						lat: this.state.current_lat,
						lng: this.state.current_long
					},
					locationFilterValue.miles)

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

				map_zoom = locationFilterValue.miles !== undefined ? k / locationFilterValue.miles + b : DEFAULT_ZOOM
				break;
			case "locationNearSpecificAddress":

				let _ = []
				if (locationFilterValue.addrZipcode !== undefined) {
					this.setState({
						addrLat: locationFilterValue.addrZipcode.lat,
						addrLng: locationFilterValue.addrZipcode.lng
					})
					_ = this.nearbyLocations(
						pins,
						{
							lat: locationFilterValue.addrZipcode.lat,
							lng: locationFilterValue.addrZipcode.lng
						},
						locationFilterValue.miles)
				} else {
					this.setState({
						addrLat: this.state.current_lat,
						addrLng: this.state.current_long
					})
					_ = this.nearbyLocations(
						pins,
						{
							lat: this.state.current_lat,
							lng: this.state.current_long
						},
						locationFilterValue.miles)
				}

				if (!this.state.gmapVisible) {
					this.setState({
						gmapVisible: !this.state.gmapVisible,
						pins: [..._],
						pins2: []
					})
				} else {
					this.setState({
						gmapVisible: !this.state.gmapVisible,
						pins: [],
						pins2: [..._]
					})
				}
				map_zoom = locationFilterValue.miles !== undefined ? k / locationFilterValue.miles + b : DEFAULT_ZOOM
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

	nearbyLocations(pins, center, miles = 5, addrZipcode = "") {
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
					onToggle();
				}
				prevent = false;
			}, delay);
		};
		const handleDoubleClick = () => {
			clearTimeout(timer);
			prevent = true;
			// alert(JSON.stringify(tableRow.row));
			this.props.openEditCustomerForm(this.props.regionId, tableRow.row.CustomerId, tableRow.row.CustomerNo);
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
			atRiskColumns,
		} = this.state;


		return (
			<Fragment>
				<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>

					{mapViewState && <div className={classNames("w-full h-full p-1")} style={{ borderColor: 'lightgray', borderWidth: '1px' }}>

						{gmapVisible && <MapWithAMarkerClusterer
							markers={pins}
							center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
						/>}

						{!gmapVisible && <MapWithAMarkerClusterer2
							markers={pins2}
							center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
						/>}

					</div>}

					{!mapViewState &&
						<div className={classNames("flex flex-col")}
						// style={{ height: "calc(100% - 110px)" }}
						// style={{ overflowY: 'scroll' }}
						>
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

								<IntegratedPaging />

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

								<AtRiskProvider
									for={atRiskColumns}
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

		openNewCustomerForm: Actions.openNewCustomerForm,

		getCustomer: Actions.getCustomer,
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
		bCustomerFetchStart: customers.bCustomerFetchStart,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerListContent)));

