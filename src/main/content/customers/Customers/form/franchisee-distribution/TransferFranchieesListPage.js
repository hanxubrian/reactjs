import React, { Component, Fragment } from 'react';
import _ from "lodash";
import { Icon, IconButton, Paper, Button, TextField, MenuItem, FormControlLabel, RadioGroup, Radio, Typography, Switch, FormControl, InputLabel, Select, Checkbox } from '@material-ui/core';
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


class TransferFranchieesListPage extends Component {


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
		selection = selection.length > 0 ? [selection[selection.length - 1]] : []
		this.setState({ selection });

		const { rows } = this.state
		const franchieesesToOffer = selection.map(x => (rows[x]))

		console.log(selection, franchieesesToOffer)

		// let newFranchieesesToOffer = _.cloneDeep(franchieesesToOffer)
		// newFranchieesesToOffer.forEach(x => {
		// 	x.FranchiseeNumber = x.Number
		// 	x.FranchiseeName = x.Name
		// 	// Id= ""
		// 	x.Status = "Assigned"
		// 	x.AssignedDate = moment().format('YYYY-MM-DD')
		// 	// CreatedById= 0
		// 	x.MonthlyBilling = []
		// 	x.FinderFee = {}
		// 	x.new = true // to indentify newly added
		// })
		// this.props.setFranchieesesToOffer(newFranchieesesToOffer)
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
			rows = [...rows, ...(x.Franchisees.filter(f => f.StatusName === "Y"))]
		})
		this.setState({ rows })

		// this.setState({ temp: data });
		// this.setState({ data: data });

		//
		// update selections per assignedFranchisees
		//
		const { franchiseeToTransfer } = this.props

		if (rows && franchiseeToTransfer.new) {
			const fNumber = franchiseeToTransfer.new.Number
			console.log('franchieesesToOffer', rows.filter(x => x.Number === fNumber))
			const selectedRows = rows.filter(x => x.Number === fNumber)
			this.setState({
				selection: selectedRows.map(x => rows.indexOf(x)),
			})
		}
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

	handleChangeChecked = name => event => {
		this.setState({
			[name]: event.target.checked
		});
		if (name === "enabled_cancelation_fee") {
			this.setState({ canc_fee: event.target.checked ? 50 : '' })
		}
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
		this.props.setStep(3)
	}
	gotoTransferSummary = () => {
		const { selection } = this.state
		if (selection.length < 1) {
			this.props.openSnackbar("Please select a franchisee to tranfer", "error")
			return
		}

		const fId = selection[selection.length - 1]
		const newFranchisee = this.state.rows[fId]
		const existFranchisees = this.props.activeCustomer.Data.AssignedFranchisees.filter(x => x.FranchiseeNumber === newFranchisee.Number)
		if (existFranchisees && existFranchisees.length > 0) {
			this.props.openSnackbar("Already assigned franchisee", "error")
			return
		}

		this.props.setFranchiseeToTransfer('new', newFranchisee)
		this.props.handleStep(3)
	}
	cancelTransfer = () => {
		this.props.handleStep(0)
	}

	rowSelectionEnabled = row => {
		return this.props.activeCustomer.Data.AssignedFranchisees.filter(x => x.FranchiseeNumber === row.Number).length < 1
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

				<div className={classNames("flex items-center mt-12 mb-12")}>
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

					{/* <TextField
						select
						id="Reason"
						label="Reason"
						className={classNames(classes.textField, "mr-6")}
						InputLabelProps={{ shrink: true }}
						value={this.state.Reason || ''}
						onChange={this.handleChange('Reason')}
						margin="dense"
						// variant="outlined"
						style={{ width: "50%", minWidth: "180px" }}
					/> */}

					<FormControl className={classNames(classes.formControl)} style={{ marginTop: 5, width: "23%", minWidth: "180px" }}>
						<InputLabel shrink htmlFor="Reason">Reason</InputLabel>
						<Select
							native
							value={this.state.Reason || ''}
							onChange={this.handleChange('Reason')}
							inputProps={{
								name: 'Reason',
								id: 'Reason',
							}}
						>
							{this.props.transferReasons.Data && this.props.transferReasons.Data.map((x, index) => (
								<option key={index} value={x.ReasonNumber}>{x.name}</option>
							))}
						</Select>
					</FormControl>

					<Checkbox
						checked={this.state.enabled_cancelation_fee || false}
						onChange={this.handleChangeChecked('enabled_cancelation_fee')}
						style={{ marginTop: 14 }}
					/>
					<TextField
						disabled={!this.state.enabled_cancelation_fee}
						id="canc_fee"
						label="Cancelation Fee"
						placeholder="Amount Fee"
						type="number"
						value={this.state.enabled_cancelation_fee ? (this.state.canc_fee || '') : ''}
						onChange={this.handleChange('canc_fee')}
						className={classNames(classes.textField, '')}
						InputLabelProps={{ shrink: this.state.enabled_cancelation_fee }}
						margin="dense"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={this.state.continue_findersfee || false}
								onChange={this.handleChangeChecked('continue_findersfee')}
								value="continue_findersfee"
							/>
						}
						label="Stop Finders Fee"
					// style={{ width: '40%' }}
					/>

					{this.state.continue_findersfee &&
						<TextField
							type="date"
							id="stop_finders_fee"
							label="Stop Date"
							className={classNames(classes.textField, "ml-12")}
							InputLabelProps={{ shrink: true }}
							value={this.state.stop_finders_fee}
							onChange={this.handleChange('stop_finders_fee')}
							margin="dense"
							// variant="outlined"
							style={{ minWidth: "180px" }}
						/>
					}


				</div>

				<div className={classNames("flex justify-start w-full mt-12")}>
					<div className={classNames("flex flex-col justify-start w-full")}>
						<div className={classNames("flex justify-start w-full")}>
							<TextField
								type="number"
								id="CleanTimes"
								label="Clean Times *"
								className={classNames(classes.textField, "mr-6")}
								value={this.state.cleantimes || ''}
								onChange={this.handleChange('cleantimes')}
								InputLabelProps={{ shrink: true }}
								margin="dense"
								// variant="outlined"
								style={{ width: '100%' }}
							/>
							<TextField
								select

								id="CleanFrequency"
								label="Clean Frequency *"
								className={classNames(classes.textField, "ml-6")}
								InputLabelProps={{ shrink: true }}
								value={this.state.cleanper || ''}
								onChange={this.handleChange('cleanper')}
								margin="dense"
								// variant="outlined"
								style={{ width: '100%' }}
							>
								{["Month", "Week", "Event"].map((x, index) => (
									<MenuItem key={index} value={x}>{x}</MenuItem>
								))}
							</TextField>
						</div>

						<div className={classNames("flex justify-start w-full mt-6")}>
							{[
								{ label: 'Mon', value: 'mon' },
								{ label: 'Tue', value: 'tue' },
								{ label: 'Wed', value: 'wed' },
								{ label: 'Thu', value: 'thu' },
								{ label: 'Fri', value: 'fri' },
								{ label: 'Sat', value: 'sat' },
								{ label: 'Sun', value: 'sun' },
								{ label: 'Weekends', value: 'wkndTF' },
							].map((x, index) =>
								<FormControlLabel key={index}
									control={<Checkbox onChange={this.handleChangeChecked(x.value)} checked={this.state[x.value] || false} className="pr-0" />}
									label={x.label}
									className="mr-6"
								/>
							)}
						</div>

						<TextField
							id="DetailedCleaningInstructions"
							label="Detailed Cleaning Instructions"
							multiline
							rows="3"
							rowsMax="3"
							className={classes.textField}
							value={this.state.detailed_cleaning_instructions}
							onChange={this.handleChange('detailed_cleaning_instructions')}
							InputLabelProps={{ shrink: true }}
							margin="dense"
							// variant="outlined"
							style={{ width: '100%' }}
						/>
					</div>
					<div className={classNames("flex flex-col mt-12 justify-start w-full ml-12")}>
						<TextField
							id="note"
							name="note"
							label="Note"
							className={classes.textField}
							value={this.state.note || ''}
							onChange={this.handleChange('note')}
							margin="dense"
							variant="outlined"
							fullWidth
							multiline
							InputLabelProps={{
								shrink: true,
								classes: { outlined: classes.label }
							}}
							InputProps={{
								classes: {
									input: classes.input, multiline: classes.input
								},
							}}
							rows={3}
						/>
					</div>
				</div>


				<div className={classNames("flex mt-12 justify-start w-full")}>

				</div>

				<div className={classNames("flex justify-between items-center mt-12 mb-12")}>
					<Typography variant="h6">Active Franchisees (To Transfer)</Typography>
					<div>
						{/* <Tooltip title="Location Filter">
							<IconButton onClick={this.toggleSideBar}><Icon>menu</Icon></IconButton>
						</Tooltip>

						<Tooltip title={showMapView ? "Grid View" : "Map view"}>
							<IconButton className={classNames(classes.button, "mr-12")}
								onClick={this.toggleMapView}
							>
								<Icon>location_on</Icon>
							</IconButton>
						</Tooltip> */}

						{/* <Button
							variant="contained"
							color="primary"
							className={classNames(classes.button, "pr-24 pl-24")}
							onClick={this.onClickAssign}
						> <Icon fontSize="small">check</Icon>Assign </Button> */}
						<Button
							variant="contained"
							className={classNames(classes.button, "pr-24 pl-24 mr-12")}
							onClick={this.cancelTransfer}
						> <Icon fontSize="small">close</Icon>Cancel Transfer </Button>
						<Button
							variant="contained"
							color="primary"
							className={classNames(classes.button, "pr-24 pl-24")}
							onClick={this.gotoTransferSummary}
						> <Icon fontSize="small">keyboard_arrow_right</Icon>Next </Button>
					</div>
				</div>

				{/* <div className="flex flex-col"> */}


				<Paper className={classNames("flex p-6 w-full h-full")}>
					{this.state.openSideBar && <div className="flex flex-col p-12" style={{ minWidth: 200 }}>

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

					</div>
					}
					<div className="flex flex-col" style={{ overflowX: 'scroll' }}>
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
								{/* <EditingState onCommitChanges={this.commitChanges} /> */}
								<VirtualTable height="auto" />

								<TableColumnResizing defaultColumnWidths={columns} />

								{/* <TableSelection selectByRowClick highlightRow /> */}
								<PatchedTableSelection
									highlightRow
									rowSelectionEnabled={this.rowSelectionEnabled}
								/>

								<TableHeaderRow showSortingControls />
								{/* <TableEditColumn width={60} cellComponent={this.EditingCellComponent} headerCellComponent={EditingHeaderCellComponent} /> */}
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

		setFranchiseeToTransfer: Actions.setFranchiseeToTransfer,
		openSnackbar: Actions.openSnackbar,
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

		snack: customers.snack,
		activeCustomer: customers.activeCustomer,
		franchiseeToTransfer: customers.franchiseeToTransfer,

		transferReasons: customers.transferReasons,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferFranchieesListPage)));
