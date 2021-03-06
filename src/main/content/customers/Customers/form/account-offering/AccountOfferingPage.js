import React, { Component, Fragment } from 'react';

import {
	Icon, IconButton, Input, Paper, Button, Tooltip, TextField, MenuItem, InputAdornment, FormControlLabel, Checkbox, RadioGroup, Radio, Typography,
	Step, Stepper, StepLabel
} from '@material-ui/core';
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

import NewIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";

import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withHandlers, lifecycle } from "recompose";

import FranchieesSubmitOfferPage from './FranchieesSubmitOfferPage';
import FranchieesListPage from './FranchieesListPage';
import FranchieesOfferedListPage from './FranchieesOfferedListPage';

import FranchiseeDistributionPage from '../franchisee-distribution/FranchiseeDistributionPage'

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

const account_offering_columns = [
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
		title: "Offer Date",
		name: "OfferDate",
		columnName: "OfferDate",
		width: 130,
	},
	{
		title: "Response",
		name: "Response",
		columnName: "Response",
		width: 100,
	},
	{
		title: "User",
		name: "User",
		columnName: "User",
		width: 120,
	},
	{
		title: "Response Date",
		name: "ResponseDate",
		columnName: "ResponseDate",
		width: 130,
	},
	{
		title: "Result",
		name: "Result",
		columnName: "Result",
		width: 100,
	},
	{
		title: "Offer Sent",
		name: "OfferSent",
		columnName: "OfferSent",
		width: 100,
	},

];

const account_offering_franchisee_columns = [
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

];

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


class AccountOfferingPage extends Component {


	constructor(props) {
		super(props)

		this.state = {
			openSideBar: false,
			showMapView: false,

			gmapVisible: false,

			pins: [],
			pins2: [],


			temp: [],
			data: [],
			customers: [],

			pageSizes: [5, 10, 20, 30, 50, 100],
			pageSize: 20,
			searchValue: '',
			selection: [],
			sorting: [
				{ columnName: 'Number', direction: 'asc' }
			],

			step: 0,

		};

		console.log("props.bLoadedFranchisees", props.bLoadedFranchisees)
		if (!props.bLoadedFranchisees) {
			props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
		}

		this.changeSelection = selection => this.setState({ selection });
		this.changeSorting = sorting => this.setState({ sorting });
		this.changeSearchValue = value => this.setState({ searchValue: value });
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

		this.getFranchiseesFromStatus();

		this.getLocation();
	}
	componentDidMount() {
		console.log("componentDidMount");
	}

	componentWillReceiveProps(nextProps) {
		console.log("this.props.franchisees")
		console.log(this.props.franchisees)
		if (this.props.franchisees === null && nextProps.franchisees !== null)
			this.getFranchiseesFromStatus(nextProps.franchisees);
		if (this.props.franchisees !== nextProps.franchisees)
			this.getFranchiseesFromStatus(nextProps.franchisees);
	}
	getFranchiseesFromStatus = (rawData = this.props.franchisees) => {
		console.log("rawData-getFranchiseesFromStatus", rawData);

		let data = [];
		let tempData = [];
		if (rawData === undefined || rawData === null) return;

		if (rawData.Data.Region.length === 0) {
			data = [];
			this.setState({ temp: data });
			this.setState({ data: data });
			return;
		} else {
			for (let i = 0; i < rawData.Data.Region.length; i++) {
				tempData = rawData.Data.Region[i].Franchisees;
				data = data.concat(tempData);
			}
		}
		this.setState({ temp: data });
		this.setState({ data: data });
	};
	offerThisAccount = () => {
		this.setState({ step: 1 })
	}
	backToAccountOfferingHome = () => {
		this.setState({
			step: 0,
			showMapView: false
		})
	}
	backToFranchiseeList = () => {
		this.setState({ step: 1 })
	}


	showDetails = row => {
		this.setState({ popupVisible: true, activeRow: row, step: 2 });
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
		this.setState({
			[name]: event.target.value
		});
	};

	toggleSideBar = () => {
		this.setState({
			openSideBar: !this.state.openSideBar
		})
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

	setStep = step => {
		this.setState({
			step
		})
	}
	setActiveRow = activeRow => {
		this.setState({
			activeRow
		})
	}

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
			activeRow,
		} = this.state;

		return (
			<div className={classNames("flex flex-col flex-1")}>

				<Stepper activeStep={step} style={{ padding: 0, background: 'unset' }} className='mb-12'>
					{['Offered Franchisees', 'Assign Franchisees', 'Offering Account', 'Revenue Distribution', 'Finders Fees'].map((label, index) => {
						const props = {};
						const labelProps = {};

						if (index === 2) labelProps.optional = <Typography variant="caption">Optional</Typography>;
						// if (this.isStepOptional(index)) {
						// 	labelProps.optional = <Typography variant="caption">Optional</Typography>;
						// }
						// if (this.isStepSkipped(index)) {
						// 	props.completed = false;
						// }
						props.completed = false;
						return (
							<Step key={label} {...props}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>

				{step === 0 &&
					<FranchieesOfferedListPage setStep={this.setStep} setActiveRow={this.setActiveRow} />}
				{step === 1 &&
					< FranchieesListPage setStep={this.setStep} setActiveRow={this.setActiveRow} />}
				{step === 2 &&
					<FranchieesSubmitOfferPage setStep={this.setStep} setActiveRow={this.setActiveRow} activeRow={activeRow} />
				}
				{step === 3 &&
					<FranchiseeDistributionPage setStep={this.setStep} />
				}
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getFranchisees: Actions.getFranchisees,
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

		bTransferFranchiseeFtate: customers.bTransferFranchiseeFtate,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountOfferingPage)));
