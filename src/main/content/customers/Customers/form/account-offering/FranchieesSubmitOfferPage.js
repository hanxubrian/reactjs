import React, { Component, Fragment } from 'react';

import { Icon, IconButton, Input, Paper, Button, Tooltip, TextField, MenuItem, InputAdornment, FormControlLabel, Checkbox, RadioGroup, Radio, Typography } from '@material-ui/core';
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


class FranchieesSubmitOfferPage extends Component {


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

		this.setState({ activeRow: this.props.activeRow })

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

		if (nextProps.activeRow !== this.props.activeRow) {
			this.setState({ activeRow: nextProps.activeRow })
		}
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
	backToAccountOfferingHome = () => {
		this.props.setStep(0)
	}
	backToFranchiseeList = () => {
		this.props.setStep(1)
	}

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
			<Fragment>
				{/* <div className={classNames("mb-12 w-full")}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<IconButton onClick={this.backToFranchiseeList}>
								<Icon>arrow_back</Icon>
							</IconButton>
							Back
							</div>
						<Button
							variant="contained"
							color="primary"
							className={classNames(classes.button, "pr-36 pl-36")}
							onClick={() => {
								this.backToAccountOfferingHome();
							}}
						> Send </Button>
					</div>
				</div> */}

				<div className={classNames("flex w-full justify-between items-center mb-12")}>
					<Typography variant="h6">Submit Offering</Typography>
					<div>
						<Button variant="contained" onClick={this.backToFranchiseeList} className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">keyboard_arrow_left</Icon>Prev</Button>

						<Button
							variant="contained"
							color="primary"
							className={classNames(classes.button, "pr-24 pl-24")}
							onClick={this.backToAccountOfferingHome}
						> <Icon fontSize="small">send</Icon>Send </Button>
					</div>
				</div>

				<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
					<GridItem xs={12} sm={12} md={12} className="flex flex-row">
						<Paper className={classNames(classes.layoutTable, "flex flex-col p-24 mr-6 w-full")}>
							<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="text"
										id="FranchiseeNumber"
										label="Franchisee No."
										className={classNames(classes.textField, "mr-6")}
										InputProps={{
											readOnly: true,
										}}
										value={activeRow ? activeRow.Number : ""}
										onChange={this.handleChange('FranchiseeNumber')}
										margin="dense"
										fullWidth
									// variant="outlined"
									// style={{ width: '60%' }}
									/>

									<TextField
										type="text"
										id="FranchiseePhone"
										label="Phone"
										className={classNames(classes.textField, "ml-6")}
										InputProps={{
											readOnly: true,
										}}
										value={activeRow ? activeRow.Phone : ""}
										onChange={this.handleChange('FranchiseePhone')}
										margin="dense"
										fullWidth
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem>
							</GridContainer>

							<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">

									<TextField
										type="text"
										id="FranchiseeName"
										label="Franchisee Name"
										className={classNames(classes.textField, "mr-6")}
										InputProps={{
											readOnly: true,
										}}
										value={activeRow ? activeRow.Name : ""}
										onChange={this.handleChange('FranchiseeName')}
										margin="dense"
										fullWidth
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
									<TextField
										type="text"
										id="FranchiseeEmail"
										label="Email"
										className={classNames(classes.textField, "ml-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.FranchiseeEmail}
										onChange={this.handleChange('FranchiseeEmail')}
										margin="dense"
										fullWidth
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem>
							</GridContainer>

							<TextField
								type="text"
								id="Address1"
								label="Address 1"
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={activeRow ? activeRow.Address : ""}
								onChange={this.handleChange('Address1')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>
							<TextField
								type="text"
								id="Address2"
								label="Address 2"
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={this.state.Address2}
								onChange={this.handleChange('Address2')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>
							<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="text"
										id="City"
										label="City"
										className={classNames(classes.textField, "mr-6")}
										InputProps={{
											readOnly: true,
										}}
										value={activeRow ? activeRow.City : ""}
										onChange={this.handleChange('City')}
										margin="dense"
										fullWidth
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
									<TextField
										type="text"
										id="State"
										label="State"
										className={classNames(classes.textField, "mr-6 ml-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.State}
										onChange={this.handleChange('State')}
										margin="dense"
										fullWidth
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
									<TextField
										type="text"
										id="Zip"
										label="Zip"
										className={classNames(classes.textField, "ml-6")}
										InputProps={{
											readOnly: true,
										}}
										value={activeRow ? activeRow.PostalCode : ""}
										onChange={this.handleChange('Zip')}
										margin="dense"
										fullWidth
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem></GridContainer>

						</Paper>

						<Paper className={classNames(classes.layoutTable, "flex flex-col p-24 ml-6 w-full")}>
							<TextField
								type="text"
								id="CustomerNumber"
								label="Customer No."
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={this.state.CustomerNumber}
								onChange={this.handleChange('CustomerNumber')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>
							<TextField
								type="text"
								id="CustomerName"
								label="Customer Name"
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={this.state.CustomerName}
								onChange={this.handleChange('CustomerName')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>
							<TextField
								type="text"
								id="Address1"
								label="Address 1"
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={this.state.Address1}
								onChange={this.handleChange('Address1')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>
							<TextField
								type="text"
								id="Address2"
								label="Address 2"
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={this.state.Address2}
								onChange={this.handleChange('Address2')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>
							<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="text"
										id="City"
										label="City"
										className={classNames(classes.textField, "mr-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.City}
										onChange={this.handleChange('City')}
										margin="dense"
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
									<TextField
										type="text"
										id="State"
										label="State"
										className={classNames(classes.textField, "mr-6 ml-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.State}
										onChange={this.handleChange('State')}
										margin="dense"
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
									<TextField
										type="text"
										id="Zip"
										label="Zip"
										className={classNames(classes.textField, "ml-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.Zip}
										onChange={this.handleChange('Zip')}
										margin="dense"
									// variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem>
							</GridContainer>
							<TextField
								type="text"
								id="AccountType"
								label="Account Type"
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={this.state.AccountType}
								onChange={this.handleChange('AccountType')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>

							<TextField
								type="text"
								id="MonthlyBussinessAmount"
								label="Monthly Bussiness Amount"
								className={classes.textField}
								InputProps={{
									readOnly: true,
								}}
								value={this.state.MonthlyBussinessAmount}
								onChange={this.handleChange('MonthlyBussinessAmount')}
								margin="dense"
							// variant="outlined"
							// style={{ width: '60%' }}
							/>


							<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										id="ServiceType"
										label="Service Type *"
										select
										InputLabelProps={{
											shrink: true
										}}
										className={classNames(classes.textField, "mr-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.ServiceType === undefined ? "" : this.state.ServiceType}
										onChange={this.handleChange('ServiceType')}
										margin="dense"
										// variant="outlined"
										// style={{ minWidth: "100px", width: "30%" }}
										fullWidth
									>
										{[{ value: 0, label: "Select" }].map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>

									<TextField
										type="number"
										inputProps={{ min: "0", max: "999999", step: "1" }}
										id="SquareFootage"
										label="Square Footage"
										className={classNames(classes.textField, "ml-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.SquareFootage}
										onChange={this.handleChange('SquareFootage')}
										margin="dense"
										// variant="outlined"
										fullWidth
									// style={{ minWidth: "100px", width: "30%" }}
									/>
								</GridItem>


								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="time"
										id="StartTime"
										label="Start Time *"
										className={classNames(classes.textField, "mr-6")}
										InputProps={{
											readOnly: true,
										}}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.StartTime}
										onChange={this.handleChange('StartTime')}
										margin="dense"
										// variant="outlined"
										style={{ width: '100%' }}
									/>
									<TextField
										type="time"
										id="EndTime"
										label="End Time *"
										className={classNames(classes.textField, "ml-6")}
										InputProps={{
											readOnly: true,
										}}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.EndTime}
										onChange={this.handleChange('EndTime')}
										margin="dense"
										// variant="outlined"
										style={{ width: '100%' }}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="number"
										id="Amount"
										label="Amount *"
										className={classes.textField}
										InputProps={{
											readOnly: true,
										}}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.Amount}
										onChange={this.handleChange('Amount')}
										margin="dense"
										// variant="outlined"
										style={{ minWidth: "100px", width: "30%" }}
										InputProps={{
											startAdornment: <InputAdornment position="start">$</InputAdornment>
										}}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="number"
										id="CleanTimes"
										label="Clean Times *"
										className={classNames(classes.textField, "mr-6")}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.CleanTimes}
										onChange={this.handleChange('CleanTimes')}
										margin="dense"
										// variant="outlined"
										style={{ width: '100%' }}
									/>

									<TextField
										select

										id="CleanFrequency"
										label="Clean Frequency *"
										className={classNames(classes.textField, "ml-6")}
										InputProps={{
											readOnly: true,
										}}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.CleanFrequency === undefined ? "" : this.state.CleanFrequency}
										onChange={this.handleChange('CleanFrequency')}
										margin="dense"
										// variant="outlined"
										style={{ width: '100%' }}
									>
										{[{ value: 0, label: "Monthly" }].map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								</GridItem>

								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										id="Description"
										label="Description"
										multiline
										rows="2"
										rowsMax="2"
										className={classes.textField}
										InputProps={{
											readOnly: true,
										}}
										value={this.state.Description}
										onChange={this.handleChange('Description')}
										margin="dense"
										variant="outlined"
										style={{ width: '100%' }}
									/>
								</GridItem>
							</GridContainer>

						</Paper>

					</GridItem>

					<GridItem xs={12} sm={12} md={12} className="flex flex-row">
						< Paper
							className={classNames(classes.layoutTable, "flex flex-col h-full w-full p-24 mt-12")}
						>

							<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">

									<TextField
										type="Date"
										id="StartDate"
										label="Start Date"
										InputLabelProps={{
											shrink: true
										}}
										className={classNames(classes.textField, "mr-6")}
										value={this.state.StartDate}
										onChange={this.handleChange('StartDate')}
										margin="dense"
										fullWidth
										variant="outlined"
									// style={{ width: '60%' }}
									/>
									<TextField
										type="text"
										id="MonthlyContactBilling"
										label="Monthly Contact Billing"
										className={classNames(classes.textField, "ml-6")}
										value={this.state.MonthlyContactBilling}
										onChange={this.handleChange('MonthlyContactBilling')}
										margin="dense"
										fullWidth
										variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="text"
										id="To"
										label="To"
										className={classNames(classes.textField, "")}
										value={this.state.To}
										onChange={this.handleChange('To')}
										margin="dense"
										fullWidth
										variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="text"
										id="Subject"
										label="Subject"
										className={classNames(classes.textField, "")}
										value={this.state.Subject}
										onChange={this.handleChange('Subject')}
										margin="dense"
										fullWidth
										variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12} className="flex flex-row">
									<TextField
										type="text"
										id="Content"
										label="Content"
										multiline
										rows="7"
										rowsMax="7"
										className={classNames(classes.textField, "")}
										value={this.state.Content}
										onChange={this.handleChange('Content')}
										margin="dense"
										fullWidth
										variant="outlined"
									// style={{ width: '60%' }}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={12} className="flex flex-row" style={{ justifyContent: "flex-start" }}>
									<Button
										variant="contained"
										color="primary"
										className={classNames(classes.button, "pr-36 pl-36 mt-6")}
										onClick={() => {
											this.backToAccountOfferingHome();
										}}
									> Send </Button>
								</GridItem>
							</GridContainer>
						</Paper>
					</GridItem>
				</GridContainer>

			</Fragment>
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
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchieesSubmitOfferPage)));
