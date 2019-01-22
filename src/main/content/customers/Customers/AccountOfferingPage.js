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




class AccountOfferingPage extends Component {


	constructor(props) {
		super(props)

		this.state = {
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
		this.getFranchiseesFromStatus();
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
		console.log("rawData-getFranchiseesFromStatus", this.props.franchisees);

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
				tempData = rawData.Data.Region[i].FranchiseeList;
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
		this.setState({ step: 0 })
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
		} = this.state;

		let rows = []
		let columns = []
		switch (step) {
			case 0:
				rows = [
					{ Number: 712025, Name: "MICHAEL A. WHITEHEAD", OfferDate: "06/12/2018", Response: "Accepted", User: "BUDDY NGUYEN", ResponseDate: "06/15/2018", Result: "", OfferSent: "" },
					{ Number: 712025, Name: "ANA E. BURIANO", OfferDate: "06/12/2018", Response: "Declined", User: "WILLIAM E. JACKSON", ResponseDate: "06/15/2018", Result: "", OfferSent: "" },
					{ Number: 712025, Name: "SHANE DEUBELL", OfferDate: "06/12/2018", Response: "Expired", User: "AWA AVINO, INC.", ResponseDate: "06/15/2018", Result: "", OfferSent: "" },
				]
				columns = [...account_offering_columns]
				break;
			case 1:
				rows = [...this.state.data]
				columns = [...account_offering_franchisee_columns]
				break;
			case 2:
				break;
			default:
				break;
		}


		console.log("activeRow", this.state.activeRow)
		return (
			<Fragment>
				<div className={classNames("mb-12 w-full")}>
					{
						step === 0 && (
							<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<Button
									variant="contained"
									color="primary"
									className={classNames(classes.button, "pr-24 pl-24")}
									onClick={() => {
										this.offerThisAccount();
									}}
								> Offer this account... </Button>
							</div>
						)}

					{
						step === 1 && (
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div>
									<IconButton onClick={this.backToAccountOfferingHome}>
										<Icon>arrow_back</Icon>
									</IconButton>
									Back
								</div>

								<Tooltip title="Map view">
									<IconButton
										// className={classNames(classes.summaryPanelButton, "mr-12")}
										className={classNames(classes.button, "mr-12")}
									// aria-label="Add an alarm"
									// onClick={this.props.toggleMapView}
									>
										{/* <Icon>{this.props.mapViewState ? 'list' : 'location_on'}</Icon> */}
										<Icon>location_on</Icon>
									</IconButton>
								</Tooltip>

							</div>
						)}

					{step === 2 && (
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
					)}
				</div>

				{(step === 2) && (
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
											value={this.state.activeRow.Number || ""}
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
											value={this.state.activeRow.Phone || ""}
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
											value={this.state.activeRow.Name || ""}
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
									value={this.state.activeRow.Address || ""}
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
											value={this.state.activeRow.City || ""}
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
											value={this.state.activeRow.PostalCode || ""}
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

									{/* <GridItem xs={12} sm={12} md={12} className="flex flex-row justify-start">
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Mon"
											className="mr-36"

										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Tue"
											className="mr-36"

										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Wed"
											className="mr-36"

										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Thu"
											className="mr-36"

										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Fri"
											className="mr-36"

										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Sat"
											className="mr-36"

										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Sun"
											className="mr-36"
										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Weekends"

										/>
									</GridItem> */}

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="CPI Increase"
											style={{ marginRight: "30px" }}

										/>
										<FormControlLabel
											control={
												<Checkbox onChange={this.handleChange('weekdays')} />
											}
											label="Separate Invoice"
											style={{ marginRight: "30px" }}

										/>
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

				)}

				{(step === 0 || step === 1) && (
					<GridContainer style={{ alignItems: 'center' }} className={classNames("flex flex-col h-full")} style={{ backgroundColor: "" }}>
						<GridItem xs={12} sm={12} md={12} className="flex flex-row" style={{ backgroundColor: "" }}>
							{(step === 1) && (
								<Paper sm={6} className={classNames("flex flex-col h-full pl-24 pr-12 mr-12")} style={{ backgroundColor: "", height: "auto", minWidth: 250 }}>
									<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
										<GridItem xs={12} sm={12} md={12} className="flex flex-col">
											<h3 className={classNames("mt-24 mb-12")} >Location Filter</h3>
											<RadioGroup
												aria-label="Location"
												name="Location"
												className={classes.group}
												value={this.props.locationFilterValue && this.props.locationFilterValue.id || ""}
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
							<Paper sm={6} className={classNames("flex flex-col h-full p-6")} style={{ backgroundColor: "", overflowX: "scroll" }}>
								<Grid
									rows={rows}
									columns={columns}
								>
									{step === 1 && (
										<SearchState
											value={searchValue}
											onValueChange={this.changeSearchValue}
										/>
									)}
									{step === 1 && (
										<IntegratedFiltering />
									)}

									{step === 1 && (
										<SelectionState
											selection={selection}
											onSelectionChange={this.changeSelection}
										/>
									)}
									{step === 1 && (
										<PagingState
											defaultCurrentPage={0}
											defaultPageSize={10}
										/>
									)}
									{step === 1 && (
										<PagingPanel pageSizes={pageSizes} />
									)}

									{step === 1 && (
										<IntegratedSelection />
									)}
									<SortingState
										sorting={sorting}
										onSortingChange={this.changeSorting}
										columnExtensions={columns}
									/>
									<IntegratedSorting />
									{step === 1 && (
										<IntegratedPaging />
									)}
									{step === 1 && (
										<EditingState
											// columnExtensions={editingColumnExtensions}
											onCommitChanges={this.commitChanges}
										/>
									)}
									<Table />
									{/* <VirtualTable
								height="auto"
							/> */}



									{/* <TableColumnResizing defaultColumnWidths={columns} /> */}

									<TableHeaderRow showSortingControls />
									{step === 1 && (
										<TableEditRow />
									)}
									{step === 1 && (
										<TableEditColumn
											width={60}
											cellComponent={this.EditingCellComponent}
											headerCellComponent={EditingHeaderCellComponent}
										// showAddCommand
										// showEditCommand
										// showDeleteCommand
										// commandComponent={Command}
										/>
									)}

									{step === 1 && (
										<TableSelection showSelectAll selectByRowClick highlightRow />
									)}

									{step === 1 && (
										<Toolbar />
									)}
									{step === 1 && (
										<SearchPanel />
									)}

								</Grid>

								{(step === 1) && (
									<div
										className={classNames(classes.layoutTable, "flex flex-row")}
										style={{ justifyContent: "space-between" }}
									>
										<span className={"p-6"}>
											Rows Selected: <strong>{selection.length}</strong>
										</span>

										<span className={"p-6"}>
											Total Rows: <strong>{rows.length}</strong>
										</span>
									</div>
								)}
							</Paper>
						</GridItem>
					</GridContainer>
				)}
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

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountOfferingPage)));
