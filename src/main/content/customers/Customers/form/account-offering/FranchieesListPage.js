import React, { Component, Fragment } from 'react';
import _ from "lodash";
import moment from 'moment';
import { Icon, IconButton, Paper, Button, Tooltip, TextField, MenuItem, FormControlLabel, RadioGroup, Radio, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { withStyles } from "@material-ui/core";

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';



import {
	SelectionState,
	PagingState,
	IntegratedPaging,
	IntegratedSelection,
	SortingState,
	IntegratedSorting,
	EditingState,
	IntegratedFiltering,
	SearchState,
} from '@devexpress/dx-react-grid';

import {
	Grid,
	Table,
	TableHeaderRow,
	TableSelection,
	PagingPanel,
	TableEditColumn,
	Toolbar,
	SearchPanel,
	TableColumnResizing,
	VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

import NewIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withHandlers } from "recompose";
import { CustomizedDxGridSelectionPanel } from "./../../../../common/CustomizedDxGridSelectionPanel";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA");

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
	franchiseeGridToolbar:
	{
		// backgroundColor: "lightyellow"
	}
});
//
// table row edit command buttons
//
const AddButton = ({ onExecute }) => (
	<div style={{ textAlign: 'center' }}>
		{/* <Button
			color="primary"
			onClick={onExecute}
			title="New Address"
		>
			New
	  </Button> */}
		<IconButton onClick={onExecute} title="Add New">
			<NewIcon />
		</IconButton>
	</div>
);

const EditButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Edit">
		<EditIcon />
	</IconButton>
);

const DeleteButton = ({ onExecute }) => (

	// <IconButton onClick={onExecute} title="Delete">
	<IconButton onClick={onExecute} title="Offer">
		<Icon>call_missed_outgoing</Icon>
	</IconButton>
);

const CommitButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Save">
		<SaveIcon />
	</IconButton>
);

const CancelButton = ({ onExecute }) => (
	<IconButton color="secondary" onClick={onExecute} title="Cancel">
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


const editing_cell_styles = theme => ({
	cell: {
		padding: 0,
	}
});
const EditingHeaderCellComponentBase = props => {
	return (<TableEditColumn.Cell {...props}

	/>);
};

const EditingHeaderCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
	EditingHeaderCellComponentBase
);


//
// Google Map
//


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

class PatchedTableSelection extends React.PureComponent {
	render() {
		const { rowSelectionEnabled, ...restProps } = this.props;
		return (
			<TableSelection
				cellComponent={props =>
					this.props.rowSelectionEnabled(props.tableRow.row) ?
						(
							<TableSelection.Cell {...props} />
						) : (
							<Table.StubCell {...props} style={{ paddingLeft: 8, textAlign: 'center', fontSize: '1.8em', color: '#00000082' }}>
								&#9745;
							</Table.StubCell >
						)
				}
				{...restProps}
			/>
		);
	}
}

const WAIT_INTERVAL = 1000
class FranchieesListPage extends Component {


	constructor(props) {
		super(props)

		this.state = {
			columns: [
				{
					title: "No.",
					name: "Number",
					columnName: "Number",
					width: 90,
				},
				{
					title: "Franchisees Name",
					name: "Name",
					columnName: "Name",
					width: 220,
				},
				{
					title: "Signed",
					name: "Signed",
					columnName: "Signed",
					width: 90,
				},
				{
					title: "Plan",
					name: "Plan",
					columnName: "Plan",
					width: 80,
				},
				{
					title: "Accounts",
					name: "Accounts",
					columnName: "Accounts",
					width: 100,
				},
				{
					title: "Billing",
					name: "Billing",
					columnName: "Billing",
					width: 130,
				},
				{
					title: "Cont Eval",
					name: "ContEval",
					columnName: "ContEval",
					width: 100,
				},
				{
					title: "Group1 Total",
					name: "Group1Total",
					columnName: "Group1Total",
					width: 120,
				},
				{
					title: "Compliant",
					name: "Compliant",
					columnName: "Compliant",
					width: 100,
				},
				{
					title: "Fail Insp",
					name: "FailInsp",
					columnName: "FailInsp",
					width: 90,
				},
				{
					title: "Cancel",
					name: "Cancel",
					columnName: "Cancel",
					width: 80,
				},
				{
					title: "Pend Cancel",
					name: "PendCancel",
					columnName: "PendCancel",
					width: 110,
				},
				{
					title: "Last Offered",
					name: "LastOffered",
					columnName: "LastOffered",
					width: 110,
				},
				{
					title: "Oblg",
					name: "Oblg",
					columnName: "Oblg",
					width: 80,
				},
			],
			// openSideBar: false,
			showMapView: false,

			gmapVisible: false,

			pins: [],
			pins2: [],


			temp: [],
			rows: [],
			originRows: [],
			customers: [],

			pageSizes: [5, 10, 20, 30, 50, 100],
			pageSize: 20,
			searchValue: '',
			selection: [],
			sorting: [
				{ columnName: 'Number', direction: 'asc' }
			],

			step: 0,

			Location: this.props.locationFilterValueForFranchiseeList.id,
			locationNearResidingCustomerRadius: this.props.locationFilterValueForFranchiseeList.miles,
			locationNearCleaningCustomerRadius: this.props.locationFilterValueForFranchiseeList.miles,
			AddressZipcodeRadius: this.props.locationFilterValueForFranchiseeList.miles,


		};

		console.log("props.bLoadedFranchisees", props.bLoadedFranchisees)
		if (!props.bLoadedFranchisees) {
			props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		}

		this.changeSorting = sorting => this.setState({ sorting });
		this.changeSearchValue = value => this.setState({ searchValue: value });
	}

	changeSelection = selection => {
		this.setState({ selection });

		const { rows } = this.state
		const franchieesesToOffer = selection.map(x => (rows[x]))

		console.log(selection, franchieesesToOffer)

		// "FranchiseeNumber": "sample string 1",
		// "FranchiseeName": "sample string 2",
		// "Id": "sample string 3",
		// "FinderFee":
		// "Status": "sample string 4",
		// "AssignedDate": "sample string 5",
		// "MonthlyBilling": []
		// "CreatedById": 6
		let newFranchieesesToOffer = _.cloneDeep(franchieesesToOffer)
		newFranchieesesToOffer.forEach(x => {
			x.FranchiseeId = x.Id
			x.FranchiseeNumber = x.Number
			x.FranchiseeName = x.Name
			// Id= ""
			x.Status = "Assigned"
			x.AssignedDate = moment().format('YYYY-MM-DD')
			x.CreatedById = 0
			x.MonthlyBilling = []
			x.FinderFee = {}
			x.new = true // to indentify newly added
		})
		this.props.setFranchieesesToOffer(newFranchieesesToOffer)
	}

	commitChanges = ({ added, changed, deleted }) => {
		let rows = this.state.addressRows;
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
		this.setState({ addressRows: rows });
	}
	componentWillMount() {
		this.props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);

		this.initRowsFromRawJson();

		this.getLocation();


	}
	componentDidMount() {
		console.log("componentDidMount");
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.franchisees, nextProps.franchisees)) {
			this.initRowsFromRawJson(nextProps.franchisees);
		}

		if (this.props.locationFilterValueForFranchiseeList !== nextProps.locationFilterValueForFranchiseeList) {
			this.filterPins(nextProps.locationFilterValueForFranchiseeList);
		}
	}
	initRowsFromRawJson = (rawData = this.props.franchisees, locationFilterValueForFranchiseeList = this.props.locationFilterValueForFranchiseeList) => {
		console.log("rawData-initRowsFromRawJson", rawData);

		let rows = [];

		if (!rawData || !rawData.Data || !rawData.Data.Region) return;

		// let tempData = [];
		// if (rawData.Data.Region.length === 0) {
		// 	data = [];
		// 	this.setState({ temp: data });
		// 	this.setState({ data: data });
		// 	return;
		// } else {
		// 	for (let i = 0; i < rawData.Data.Region.length; i++) {
		// 		tempData = rawData.Data.Region[i].Franchisees;
		// 		data = data.concat(tempData);
		// 	}
		// }

		rawData.Data.Region.forEach((x, index) => {
			rows = [...rows, ...(x.Franchisees.filter(f => f.StatusName === "Y"))]
		})
		rows.forEach(x => {
			x.lat = x.Latitude || 0
			x.lng = x.Longitude || 0
			x.text = x.Name
		})
		this.setState({
			rows,
			originRows: [...rows]
		})

		this.filterPins(locationFilterValueForFranchiseeList, [...rows])

		// this.setState({ temp: data });
		// this.setState({ data: data });

		//
		// update selections per assignedFranchisees
		//
		// this.updateFranchiseeGridSelection(rows)
	};

	updateFranchiseeGridSelection(rows = this.state.rows) {
		//
		// update selections per assignedFranchisees
		//
		const { franchieesesToOffer } = this.props

		if (rows && franchieesesToOffer && franchieesesToOffer.length > 0) {
			const fNumbers = franchieesesToOffer.map(x => x.Number)
			console.log('this.state.rows', rows)
			console.log('fNumbers', fNumbers)
			console.log('franchieesesToOffer', rows.filter(x => fNumbers.indexOf(x.Number) > -1))
			const selectedRows = rows.filter(x => fNumbers.indexOf(x.Number) > -1)
			this.setState({
				selection: selectedRows.map(x => rows.indexOf(x))
			})
		}
	}

	filterPins(locationFilterValueForFranchiseeList, pins = this.state.originRows) {
		// this.setState({ gmapVisible: !this.state.gmapVisible });
		let k = (12.5 - 9.5) * 75 / (75 / 5 - 1)
		let b = 12.5 - k / 5
		let newPins = [...pins]
		const gmapVisible = this.state.gmapVisible

		switch (locationFilterValueForFranchiseeList.id) {
			case "locationAll":
				// if (!this.state.gmapVisible) {
				// 	this.setState({
				// 		gmapVisible: !this.state.gmapVisible,
				// 		pins: pins === undefined ? [] : [...pins],
				// 		pins2: []
				// 	})
				// } else {
				// 	this.setState({
				// 		gmapVisible: !this.state.gmapVisible,
				// 		pins: [],
				// 		pins2: pins === undefined ? [] : [...pins]
				// 	})
				// }

				newPins = pins === undefined ? [] : [...pins]
				this.setState({
					addrLat: this.state.current_lat,
					addrLng: this.state.current_long,
					gmapVisible: !gmapVisible,
					pins: !gmapVisible ? newPins : [],
					pins2: gmapVisible ? newPins : [],
					rows: newPins,
				})
				this.updateFranchiseeGridSelection(newPins)

				map_zoom = DEFAULT_ZOOM
				break;
			case "locationNearResidingCustomer":
			case "locationNearCleaningCustomer":
				// this.setState({
				// 	addrLat: this.state.current_lat,
				// 	addrLng: this.state.current_long
				// })

				const _pins = this.nearbyLocations(
					pins,
					{
						lat: this.state.current_lat,
						lng: this.state.current_long
					},
					locationFilterValueForFranchiseeList.miles)

				// if (!this.state.gmapVisible) {
				// 	this.setState({
				// 		gmapVisible: !this.state.gmapVisible,
				// 		pins: [..._pins],
				// 		pins2: []
				// 	})
				// } else {
				// 	this.setState({
				// 		gmapVisible: !this.state.gmapVisible,
				// 		pins: [],
				// 		pins2: [..._pins]
				// 	})
				// }
				newPins = [..._pins]
				this.setState({
					addrLat: this.state.current_lat,
					addrLng: this.state.current_long,
					gmapVisible: !gmapVisible,
					pins: !gmapVisible ? newPins : [],
					pins2: gmapVisible ? newPins : [],
					rows: newPins,
				})
				this.updateFranchiseeGridSelection(newPins)

				map_zoom = locationFilterValueForFranchiseeList.miles !== undefined ? k / locationFilterValueForFranchiseeList.miles + b : DEFAULT_ZOOM
				break;
			case "locationNearSpecificAddress":

				let _ = []
				if (locationFilterValueForFranchiseeList.addrZipcode !== undefined) {
					this.setState({
						addrLat: locationFilterValueForFranchiseeList.addrZipcode.lat,
						addrLng: locationFilterValueForFranchiseeList.addrZipcode.lng
					})
					_ = this.nearbyLocations(
						pins,
						{
							lat: locationFilterValueForFranchiseeList.addrZipcode.lat,
							lng: locationFilterValueForFranchiseeList.addrZipcode.lng
						},
						locationFilterValueForFranchiseeList.miles)
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
						locationFilterValueForFranchiseeList.miles)
				}

				// if (!this.state.gmapVisible) {
				// 	this.setState({
				// 		gmapVisible: !this.state.gmapVisible,
				// 		pins: [..._],
				// 		pins2: []
				// 	})
				// } else {
				// 	this.setState({
				// 		gmapVisible: !this.state.gmapVisible,
				// 		pins: [],
				// 		pins2: [..._]
				// 	})
				// }
				newPins = [..._]
				this.setState({
					gmapVisible: !gmapVisible,
					pins: !gmapVisible ? newPins : [],
					pins2: gmapVisible ? newPins : [],
					rows: newPins,
				})
				this.updateFranchiseeGridSelection(newPins)
				map_zoom = locationFilterValueForFranchiseeList.miles !== undefined ? k / locationFilterValueForFranchiseeList.miles + b : DEFAULT_ZOOM
				break;
			default:
				this.setState({
					pins,
					rows: newPins,
				})
				this.updateFranchiseeGridSelection(newPins)
				break;
		}

	}
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
	offerThisAccount = () => {
		this.setState({ step: 1 })
	}
	backToAccountOfferingHome = () => {
		this.setState({
			showMapView: false
		})
		this.props.setStep(0)
	}

	showDetails = row => {
		this.props.setActiveRow(row)
		this.props.setStep(2)
	};

	EditingCellComponentBase = ({ children, row, ...restProps }) => {
		return (<TableEditColumn.Cell row={row} {...restProps}>
			{children}
			<TableEditColumn.Command
				id="custom"
				text="Offer"
				onExecute={() => {
					this.showDetails(row);
				}} // action callback
			/>
		</TableEditColumn.Cell>);
	};

	EditingCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
		this.EditingCellComponentBase
	);

	handleChange = name => event => {
		const value = event.target.value
		console.log('-------handleChange--------', name, value)
		const checked = event.target.checked

		let onLocationFilter = this.onLocationFilter

		switch (name) {
			case "SpecificAddress":
				clearTimeout(this.timer)
				this.timer = setTimeout(
					function () {
						onLocationFilter(name, value);
					},
					WAIT_INTERVAL)
				break;

			case "Location":
			case "locationNearResidingCustomerRadius":
			case "locationNearCleaningCustomerRadius":
			case "AddressZipcodeRadius":
				this.onLocationFilter(name, value)
				break;
		}

		this.setState({
			[name]: event.target.value
		});
	};

	onLocationFilter = (name, value) => {

		//
		// init payload
		//
		let id = this.props.locationFilterValueForFranchiseeList.id
		let miles = this.props.locationFilterValueForFranchiseeList.miles
		let addrZipcode = this.props.locationFilterValueForFranchiseeList.addrZipcode

		const locationValue = name === "Location" ? value : this.state.Location

		switch (locationValue) {
			case "locationAll":
				break
			case "locationNearResidingCustomer":
				miles = this.state.locationNearResidingCustomerRadius
				break
			case "locationNearCleaningCustomer":
				miles = this.state.locationNearCleaningCustomerRadius
				break
			case "locationNearSpecificAddress":
				miles = this.state.AddressZipcodeRadius
				break
		}
		//
		// set payload
		//
		switch (name) {
			case "Location":
				id = value
				break
			case "locationNearResidingCustomerRadius":
			case "locationNearCleaningCustomerRadius":
			case "AddressZipcodeRadius":
				miles = value
				break
			case "SpecificAddress":
				addrZipcode = value
				break
		}

		let payload = {
			id,
			miles,
			addrZipcode,
		}

		switch (name) {
			case "Location":
				break;
			case "locationNearResidingCustomerRadius":
			case "locationNearCleaningCustomerRadius":

				break;
			case "SpecificAddress":

				Geocode.fromAddress(value).then(
					response => {
						const { lat, lng } = response.results[0].geometry.location;
						payload = {
							...payload,
							addrZipcode: { lat, lng, addr: value }
						}
						this.props.selectLocationFilterForFranchiseeList(payload)
						return
					},
					error => {
						payload = {
							...payload,
							addrZipcode: undefined
						}
						this.props.selectLocationFilterForFranchiseeList(payload)
						return
					}
				);

				return;
			case "AddressZipcodeRadius":
			// Geocode.fromAddress(addrZipcode).then(
			// 	response => {
			// 		const { lat, lng } = response.results[0].geometry.location;
			// 		payload = {
			// 			...payload,
			// 			addrZipcode: { ...payload.addrZipcode, lat, lng }
			// 		}
			// 		this.props.selectLocationFilterForFranchiseeList(payload)
			// 		return
			// 	},
			// 	error => {
			// 		// console.error(error);
			// 		payload = {
			// 			...payload,
			// 			addrZipcode: undefined
			// 		}
			// 		this.props.selectLocationFilterForFranchiseeList(payload)
			// 		return
			// 	}
			// );
			// return;
		}
		console.log(payload)
		this.props.selectLocationFilterForFranchiseeList(payload)
	}
	handleChangeChecked = name => event => {
		this.setState({
			[name]: event.target.checked
		});
	};

	toggleSideBar = () => {
		// this.setState({
		// 	openSideBar: !this.state.openSideBar
		// })
		this.props.showFranchiseeLocationFilterInAccountOffering(!this.props.showFranchiseeLocationFilterInAccountOffering)
	}
	toggleMapView = () => {
		this.setState({
			showMapView: !this.state.showMapView
		})
	}
	ToolbarRootBase = ({ children, classes, className, ...restProps }) => (
		<Toolbar.Root
			className={classNames(className, classes.franchiseeGridToolbar)}
			{...restProps}

		>
			{/* <IconButton onClick={this.toggleSideBar}>
				<Icon>menu</Icon>
			</IconButton> */}
			{children}
		</Toolbar.Root>
	);
	ToolbarRoot = withStyles(styles)(this.ToolbarRootBase);

	getLocation() {
		console.log("getLocation");

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position.coords);
					this.setState({
						current_lat: position.coords.latitude,
						current_long: position.coords.longitude,
						current_lat: 42.879593,
						current_long: -78.798299,
						// current_lat: this.props.activeCustomer.Data.Latitude,
						// current_long: this.props.activeCustomer.Data.Longitude,
					})

					// this.setState({
					// 	current_lat: 42.910772,
					// 	current_long: -78.74557
					// })

					if (this.state.addrLat == undefined) {
						this.setState({
							addrLat: position.coords.latitude,
							addrLng: position.coords.longitude,
							addrLat: 42.879593,
							addrLng: -78.798299,
							// addrLat: this.props.activeCustomer.Data.Latitude,
							// addrLng: this.props.activeCustomer.Data.Longitude,
						})
						// this.setState({
						// 	addrLat: 42.910772,
						// 	addrLng: -78.74557
						// })
					}
					if (this.props.locationFilterValueForFranchiseeList) {
						this.initRowsFromRawJson();
					}
				}
			);
		}
	}

	onClickAssign = () => {
		this.changeSelection(this.state.selection)
		this.props.setStep(3)
	}
	rowSelectionEnabled = row => {
		return this.props.activeCustomer.Data.AssignedFranchisees.filter(x => x.FranchiseeNumber === row.Number && !x.new).length < 1
	};
	render() {
		const {
			classes,
		} = this.props

		//
		// Account Offering
		//

		const {
			searchValue,
			pageSizes,
			sorting,
			selection,
			step,

			pins,
			pins2,
			gmapVisible,
			showMapView,
			rows,
			columns,
		} = this.state;

		return (
			<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
				{/* {this.props.bTransferFranchiseeFtate &&
					<div className={classNames("flex justify-between items-center mt-12 mb-12")}>
						<TextField
							type="date"
							id="TransferEffectiveDate"
							label="Transfer Effective Date *"
							className={classNames(classes.textField, "mr-6")}
							InputLabelProps={{ shrink: true }}
							value={this.state.TransferEffectiveDate || ''}
							onChange={this.handleChange('TransferEffectiveDate')}
							margin="dense"
							// variant="outlined"
							style={{ width: "20%", minWidth: "180px" }}
						/>

						<TextField
							id="Reason"
							label="Reason"
							className={classNames(classes.textField, "mr-6")}
							InputLabelProps={{ shrink: true }}
							value={this.state.Reason || ''}
							onChange={this.handleChange('Reason')}
							margin="dense"
							// variant="outlined"
							style={{ width: "50%", minWidth: "180px" }}
						/>

						<FormControlLabel
							control={
								<Switch
									checked={this.state.StopFindersFee || false}
									onChange={this.handleChangeChecked('StopFindersFee')}
									value="StopFindersFee"
								/>
							}
							label="Stop Finders Fee"
						// style={{ width: '40%' }}
						/>
					</div>
				} */}

				<div className={classNames("flex justify-between items-center mt-12 mb-12")}>
					<div className="flex items-center">
						<Tooltip title="Location Filter">
							<IconButton onClick={this.toggleSideBar}><Icon>menu</Icon></IconButton>
						</Tooltip>
						<Typography variant="h6">Active Franchisees</Typography>
					</div>
					<div>
						<Tooltip title={showMapView ? "Grid View" : "Map view"}>
							<IconButton className={classNames(classes.button, "mr-12")}
								onClick={this.toggleMapView}
							>
								{/* <Icon>{this.props.mapViewState ? 'list' : 'location_on'}</Icon> */}
								<Icon>{showMapView ? 'list_alt' : 'location_on'}</Icon>
							</IconButton>
						</Tooltip>

						{!this.props.bTransferFranchiseeFtate &&
							<Button variant="contained" onClick={this.backToAccountOfferingHome} className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">keyboard_arrow_left</Icon>Prev</Button>
						}

						<Button
							variant="contained"
							color="primary"
							className={classNames(classes.button, "pr-24 pl-24")}
							onClick={this.onClickAssign}
						> <Icon fontSize="small">check</Icon>Assign </Button>
					</div>
				</div>

				{/* <div className="flex flex-col"> */}


				<Paper className={classNames("flex p-6 w-full h-full")}>
					{this.props.showFranchiseeLocationFilterInAccountOffering &&
						<div className="flex flex-col p-12" style={{ minWidth: 200 }}>

							<h3 className={classNames("mt-24 mb-12")} >Location Filter</h3>
							<RadioGroup
								aria-label="Location"
								name="Location"
								className={classes.group}
								value={this.state.Location || ""}
							>
								<FormControlLabel value="locationAll" control={<Radio onChange={this.handleChange('Location')} />} label="All" />
								<FormControlLabel value="locationNearResidingCustomer" control={<Radio onChange={this.handleChange('Location')} />} label="Residing Near Customer" />
								{this.state.Location === "locationNearResidingCustomer" && (
									<TextField
										select

										id="locationNearResidingCustomerRadius"
										label="Radius"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.props.locationFilterValueForFranchiseeList.miles}
										onChange={this.handleChange('locationNearResidingCustomerRadius')}
										margin="dense"
										variant="outlined"
										fullWidth
									>
										{
											Array.from({ length: 15 })
												.map((val, index) => (
													<MenuItem key={index} value={(index + 1) * 5}>
														{(index + 1) * 5} Miles
													</MenuItem>
												))
										}
									</TextField>)}

								<FormControlLabel value="locationNearCleaningCustomer" control={<Radio onChange={this.handleChange('Location')} />} label="Cleaning Near Customer" />
								{this.state.Location === "locationNearCleaningCustomer" && (
									<TextField
										select

										id="locationNearCleaningCustomerRadius"
										label="Radius"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.props.locationFilterValueForFranchiseeList.miles}
										onChange={this.handleChange('locationNearCleaningCustomerRadius')}
										margin="dense"
										variant="outlined"
										fullWidth
									>
										{
											Array.from({ length: 15 })
												.map((val, index) => (
													<MenuItem key={index} value={(index + 1) * 5}>
														{(index + 1) * 5} Miles
													</MenuItem>
												))
										}
									</TextField>)}

								<FormControlLabel value="locationNearSpecificAddress" control={<Radio onChange={this.handleChange('Location')} />} label="Near Specific Address" />

								{this.state.Location === "locationNearSpecificAddress" &&
									<TextField
										id="SpecificAddress"
										label="Address"
										className={classes.textField}
										// value={this.props.locationFilterValueForFranchiseeList.addrZipcode && this.props.locationFilterValueForFranchiseeList.addrZipcode.addr || ''}
										value={this.state.SpecificAddress || ''}
										onChange={this.handleChange('SpecificAddress')}
										margin="dense"
										variant="outlined"
										fullWidth
									/>
								}
								{this.state.Location === "locationNearSpecificAddress" &&
									<TextField
										select

										id="AddressZipcodeRadius"
										label="Radius"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.props.locationFilterValueForFranchiseeList.miles}
										onChange={this.handleChange('AddressZipcodeRadius')}
										margin="dense"
										variant="outlined"
										fullWidth
									>
										{
											Array.from({ length: 15 })
												.map((val, index) => (
													<MenuItem key={index} value={(index + 1) * 5}>
														{(index + 1) * 5} Miles
																</MenuItem>
												))
										}
									</TextField>
								}

							</RadioGroup>

						</div>
					}
					<div className="flex flex-col w-full" style={{ overflowX: 'scroll' }}>
						{showMapView &&
							<div className="flex flex-col w-full flex-1 h-full">
								{gmapVisible && (<MapWithAMarkerClusterer
									markers={pins}
									center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
								/>)}

								{!gmapVisible && (<MapWithAMarkerClusterer2
									markers={pins2}
									center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
								/>)}
							</div>
						}
						{!showMapView &&
							<Grid rows={rows} columns={columns}>
								<SearchState value={searchValue} onValueChange={this.changeSearchValue} />
								<IntegratedFiltering />
								<SelectionState selection={selection} onSelectionChange={this.changeSelection} />
								<PagingState defaultCurrentPage={0} defaultPageSize={20} />
								<PagingPanel pageSizes={pageSizes} />
								<IntegratedSelection />
								<SortingState sorting={sorting} onSortingChange={this.changeSorting} columnExtensions={columns} />
								<IntegratedSorting />
								<IntegratedPaging />
								<EditingState onCommitChanges={this.commitChanges} />
								<VirtualTable height="auto" />

								<TableColumnResizing defaultColumnWidths={columns} />

								{/* <TableSelection showSelectAll selectByRowClick highlightRow /> */}
								<PatchedTableSelection
									showSelectAll
									highlightRow
									rowSelectionEnabled={this.rowSelectionEnabled}
								/>

								<TableHeaderRow showSortingControls />
								<TableEditColumn width={60} cellComponent={this.EditingCellComponent} headerCellComponent={EditingHeaderCellComponent} />
								<Toolbar rootComponent={this.ToolbarRoot} />
								<SearchPanel />
								<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />
							</Grid>
						}
					</div>
				</Paper>

				{/* </div> */}



				{/* <GridContainer style={{ alignItems: 'center' }} className={classNames("flex flex-col", showMapView ? "h-full" : "")} style={{ backgroundColor: "" }}>
					<GridItem xs={12} sm={12} md={12} className="flex flex-row" style={{ backgroundColor: "" }}>
						{this.state.openSideBar && (
							<Paper className={classNames("flex flex-col h-full pl-24 pr-12 mr-12")} style={{ backgroundColor: "", height: "auto", minWidth: 250 }}>
								<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
									<GridItem xs={12} sm={12} md={12} className="flex flex-col">
										<h3 className={classNames("mt-24 mb-12")} >Location Filter</h3>
										<RadioGroup
											aria-label="Location"
											name="Location"
											className={classes.group}
											value={this.state.Location || ""}
										>
											<FormControlLabel value="locationAll" control={<Radio onChange={this.handleChange('Location')} />} label="All" />
											<FormControlLabel value="locationNearResidingCustomer" control={<Radio onChange={this.handleChange('Location')} />} label="Near Residing Customer" />
											{this.state.Location === "locationNearResidingCustomer" && (
												<TextField
													select

													id="locationNearResidingCustomerRadius"
													label="Radius"
													className={classes.textField}
													InputLabelProps={{
														shrink: true
													}}
													value={this.props.locationFilterValue && this.props.locationFilterValue.miles || ""}
													onChange={this.handleChange('locationNearResidingCustomerRadius')}
													margin="dense"
													variant="outlined"
													fullWidth
												>
													{
														Array.from({ length: 15 })
															.map((val, index) => (
																<MenuItem key={index} value={(index + 1) * 5}>
																	{(index + 1) * 5} Miles
													</MenuItem>
															))
													}
												</TextField>)}

											<FormControlLabel value="locationNearCleaningCustomer" control={<Radio onChange={this.handleChange('Location')} />} label="Near Cleaning Customer" />
											{this.state.Location === "locationNearCleaningCustomer" && (
												<TextField
													select

													id="locationNearCleaningCustomerRadius"
													label="Radius"
													className={classes.textField}
													InputLabelProps={{
														shrink: true
													}}
													value={this.props.locationFilterValue && this.props.locationFilterValue.miles || ""}
													onChange={this.handleChange('locationNearCleaningCustomerRadius')}
													margin="dense"
													variant="outlined"
													fullWidth
												>
													{
														Array.from({ length: 15 })
															.map((val, index) => (
																<MenuItem key={index} value={(index + 1) * 5}>
																	{(index + 1) * 5} Miles
													</MenuItem>
															))
													}
												</TextField>)}

											<FormControlLabel value="locationNearSpecificAddress" control={<Radio onChange={this.handleChange('Location')} />} label="Near Specific Address" />
											{this.state.Location === "locationNearSpecificAddress" && (
												<Fragment>
													<TextField
														id="SpecificAddress"
														label="Address"
														className={classes.textField}
														onChange={this.handleChange('SpecificAddress')}
														margin="dense"
														variant="outlined"
														fullWidth
													/>
													<TextField
														select

														id="AddressZipcodeRadius"
														label="Radius"
														className={classes.textField}
														InputLabelProps={{
															shrink: true
														}}
														value={this.props.locationFilterValue && this.props.locationFilterValue.miles || ""}
														onChange={this.handleChange('AddressZipcodeRadius')}
														margin="dense"
														variant="outlined"
														fullWidth
													>
														{
															Array.from({ length: 15 })
																.map((val, index) => (
																	<MenuItem key={index} value={(index + 1) * 5}>
																		{(index + 1) * 5} Miles
																</MenuItem>
																))
														}
													</TextField>
												</Fragment>
											)}
										</RadioGroup>
									</GridItem>
								</GridContainer>
							</Paper>
						)}
						<Paper className={classNames("flex flex-col h-full p-6 w-full")} style={{ height: "auto", overflowX: "scroll" }}>

							{showMapView ?
								(<div className="w-full h-full">
									{gmapVisible && (<MapWithAMarkerClusterer
										markers={pins}
										center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
									/>)}

									{!gmapVisible && (<MapWithAMarkerClusterer2
										markers={pins2}
										center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
									/>)}
								</div>
								) :
								(<div className="flex flex-col">
									<Grid rows={rows} columns={columns}>
										<SearchState value={searchValue} onValueChange={this.changeSearchValue} />
										<IntegratedFiltering />
										<SelectionState selection={selection} onSelectionChange={this.changeSelection} />
										<PagingState defaultCurrentPage={0} defaultPageSize={20} />
										<PagingPanel pageSizes={pageSizes} />
										<IntegratedSelection />
										<SortingState sorting={sorting} onSortingChange={this.changeSorting} columnExtensions={columns} />
										<IntegratedSorting />
										<IntegratedPaging />
										<EditingState
											onCommitChanges={this.commitChanges} />
										<VirtualTable height="auto" />

										<TableColumnResizing defaultColumnWidths={columns} />

										<TableSelection showSelectAll selectByRowClick highlightRow />
										<TableHeaderRow showSortingControls />
										<TableEditColumn width={60} cellComponent={this.EditingCellComponent} headerCellComponent={EditingHeaderCellComponent}
										/>
										<Toolbar rootComponent={this.ToolbarRoot} />
										<SearchPanel />
										<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />
									</Grid>
								</div>
								)}
						</Paper>
					</GridItem>
				</GridContainer> */}
			</div>
		)

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getFranchisees: Actions.getFranchisees,

		setFranchieesesToOffer: Actions.setFranchieesesToOffer,
		selectLocationFilterForFranchiseeList: Actions.selectLocationFilterForFranchiseeList,
		showFranchiseeLocationFilterInAccountOffering: Actions.showFranchiseeLocationFilterInAccountOffering,
	}, dispatch);
}

function mapStateToProps({ customers, franchisees, auth }) {
	return {
		franchisees: franchisees.franchiseesDB,

		bLoadedFranchisees: franchisees.bLoadedFranchisees,
		regionId: auth.login.defaultRegionId,

		statusId: franchisees.statusId,
		Longitude: franchisees.Longitude,
		Latitude: franchisees.Latitude,
		Location: franchisees.Location,
		SearchText: franchisees.SearchText,

		franchieesesToOffer: customers.franchieesesToOffer,
		bTransferFranchiseeFtate: customers.bTransferFranchiseeFtate,
		activeCustomer: customers.activeCustomer,
		locationFilterValueForFranchiseeList: customers.locationFilterValueForFranchiseeList,
		showFranchiseeLocationFilterInAccountOffering: customers.showFranchiseeLocationFilterInAccountOffering,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchieesListPage)));
