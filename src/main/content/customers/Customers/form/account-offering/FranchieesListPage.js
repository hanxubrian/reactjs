import React, { Component, Fragment } from 'react';
import _ from "lodash";
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
import { CustomizedDxGridSelectionPanel } from "./../../../../common/CustomizedDxGridSelectionPanel";

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
			openSideBar: false,
			showMapView: false,

			gmapVisible: false,

			pins: [],
			pins2: [],


			temp: [],
			rows: [],
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

		this.changeSorting = sorting => this.setState({ sorting });
		this.changeSearchValue = value => this.setState({ searchValue: value });
	}

	changeSelection = selection => {
		this.setState({ selection });

		const { rows } = this.state
		const franchieesesToOffer = selection.map(x => (rows[x]))

		console.log(selection, franchieesesToOffer)

		this.props.setFranchieesesToOffer(franchieesesToOffer)
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
		if (!_.isEqual(this.props.franchisees, nextProps.franchisees)) {
			this.getFranchiseesFromStatus(nextProps.franchisees);
		}
	}
	getFranchiseesFromStatus = (rawData = this.props.franchisees) => {
		console.log("rawData-getFranchiseesFromStatus", rawData);

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
			rows = [...rows, ...x.Franchisees]
		})
		this.setState({ rows })


		// this.setState({ temp: data });
		// this.setState({ data: data });
	};
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

	onClickAssign = () => {
		// this.props.showFranchieesAssignModalForm(true)
		this.props.setStep(3)
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
			rows,
			columns,
		} = this.state;

		return (
			<Fragment>
				<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>
					<div className={classNames("flex w-full justify-between items-center mb-12")}>
						<Typography variant="h6">Franchisees List</Typography>
						<div>
							<Tooltip title="Location Filter">
								<IconButton onClick={this.toggleSideBar}><Icon>menu</Icon></IconButton>
							</Tooltip>

							<Tooltip title={showMapView ? "Grid View" : "Map view"}>
								<IconButton className={classNames(classes.button, "mr-12")}
									onClick={this.toggleMapView}
								>
									{/* <Icon>{this.props.mapViewState ? 'list' : 'location_on'}</Icon> */}
									<Icon>location_on</Icon>
								</IconButton>
							</Tooltip>

							<Button variant="contained" onClick={this.backToAccountOfferingHome} className={classNames("pl-24 pr-24 mr-12")}><Icon fontSize="small">keyboard_arrow_left</Icon>Back</Button>

							<Button
								variant="contained"
								color="primary"
								className={classNames(classes.button, "pr-24 pl-24")}
								onClick={this.onClickAssign}
							> <Icon fontSize="small">check</Icon>Assign </Button>
						</div>
					</div>

					<GridContainer style={{ alignItems: 'center' }} className={classNames("flex flex-col", showMapView ? "h-full" : "")} style={{ backgroundColor: "" }}>
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
												// value={this.props.locationFilterValue && this.props.locationFilterValue.id || ""}
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
										{/* map area */}
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
									(<div className="w-full h-full">
										{/* grid area */}
										<Grid rows={rows} columns={columns}>
											<SearchState value={searchValue} onValueChange={this.changeSearchValue} />
											<IntegratedFiltering />
											<SelectionState selection={selection} onSelectionChange={this.changeSelection} />
											<PagingState defaultCurrentPage={0} defaultPageSize={10} />
											<PagingPanel pageSizes={pageSizes} />
											<IntegratedSelection />
											<SortingState sorting={sorting} onSortingChange={this.changeSorting} columnExtensions={columns} />
											<IntegratedSorting />
											<IntegratedPaging />
											<EditingState
												// columnExtensions={editingColumnExtensions}
												onCommitChanges={this.commitChanges} />
											<Table />
											{/* <VirtualTable height="auto" /> */}

											<TableColumnResizing defaultColumnWidths={columns} />

											<TableSelection showSelectAll selectByRowClick highlightRow />
											<TableHeaderRow showSortingControls />
											{/* <TableEditRow /> */}
											<TableEditColumn width={60} cellComponent={this.EditingCellComponent} headerCellComponent={EditingHeaderCellComponent}
											// showAddCommand
											// showEditCommand
											// showDeleteCommand
											// commandComponent={Command}
											/>
											<Toolbar rootComponent={this.ToolbarRoot} />
											<SearchPanel />
											<CustomizedDxGridSelectionPanel selection={selection} rows={rows} />
										</Grid>
									</div>
									)}
							</Paper>
						</GridItem>
					</GridContainer>
				</div>
			</Fragment>
		)

	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getFranchisees: Actions.getFranchisees,

		showFranchieesAssignModalForm: Actions.showFranchieesAssignModalForm,
		setFranchieesesToOffer: Actions.setFranchieesesToOffer,
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

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FranchieesListPage)));
