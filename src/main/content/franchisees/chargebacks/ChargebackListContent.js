import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';

// core components
import {  IconButton, Input,  Button, } from '@material-ui/core';
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import classNames from 'classnames';
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

import {
	 Template, TemplateConnector
  } from '@devexpress/dx-react-core';

import { CustomizedDxGridSelectionPanel } from "./../../common/CustomizedDxGridSelectionPanel";

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
	TableGroupRow,
	TableFilterRow,
	DragDropProvider,
	VirtualTable,

} from '@devexpress/dx-react-grid-material-ui';

import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';




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
        }
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
        //backgroundColor: theme.palette.primary.main
    },
    tableThEven: {
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
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

const TableHeadComponentBase = ({ classes, ...restProps }) => (
    <Table.TableHead
        {...restProps}
        className={classes.tableTheadRow}
    />
);

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
export const TableHeadComponent = withStyles(styles, { name: 'TableHeadComponent' })(TableHeadComponentBase);

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
		{/* <EditIcon /> */}
	</IconButton>
);

const DeleteButton = ({ onExecute }) => (
	<IconButton onClick={onExecute} title="Delete row">
		{/* <DeleteIcon /> */}
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

class ChargebackListContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gmapVisible: false,
			locationFilterValue: [],
			pins: [],
			pins2: [],
			chargebackDetail: null,
			s: '',
			temp: [],
			data: [],
			selectAll: false,

			selection: [],
			rows: [],
			tableColumnExtensions: [
				{
					title: "Name",
					name: "FranchiseeNameNo",
					columnName: "FranchiseeNameNo",
					width: 400,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
					togglingEnabled: true,
					showWhenGrouped: true
				},
				{
					title: "Cust No",
					name: "cust_no",
					columnName: "cust_no",
					width: 150,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
					togglingEnabled: true,
					showWhenGrouped: true
				},
				{
					title: "Customer Name",
					name: "cust_name",
					columnName: "cust_name",
					width: 400,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
					showWhenGrouped: true
				},
				{
					title: "Invoice No",
					name: "inv_no",
					columnName: "inv_no",
					width: 150,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
					showWhenGrouped: true
				},
				{
					title: "CB Amount",
					name: "cb_amt",
					columnName: "cb_amt",
                    width: 150,
                    align: 'right',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
					showWhenGrouped: true
				},
			],
			expandedGroups: ['FranchiseeNameNo'],
			sorting: [
				{ columnName: 'ChargebackNo', direction: 'asc' }
			],
			editingColumnExtensions: [
			],
			currencyColumns: [
				'cb_amt'
			],
			dateColumns: ['saleDate'],
			grouping: [
			],
			pageSize: 20,
			pageSizes: [10, 20, 30, 50, 100],
			amountFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'],
			searchValue: '',
			chargebacksParam: [],
			chargebacks: []
		};

		this.fetchData = this.fetchData.bind(this);

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
		let selection = [...this.state.selection];
		const keyIndex = selection.indexOf(key);
		if (keyIndex >= 0) {
			selection = [
				...selection.slice(0, keyIndex),
				...selection.slice(keyIndex + 1)
			];
		} else {
			selection.push(key);
		}
		// update the state
		this.setState({ selection });
	};

	toggleAll = (instance) => {

		const selectAll = !this.state.selectAll;
		const selection = [];
		if (selectAll) {
			let currentRecords = instance.data;
			let page = this.state.page;
			let pageSize = this.state.pageSize;
			let start_index = page * pageSize;
			let end_index = start_index + pageSize;
			currentRecords.forEach(item => {
				if (item._index >= start_index && item._index < end_index)
					selection.push(item._original.ChargebackId);
			});
		}
		this.setState({ selectAll, selection });
	};

	isSelected = key => {
		return this.state.selection.includes(key);
	};

	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate", this.state !== nextState);
		return true;
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps", "ChargebackListContent.js", nextProps.locationFilterValue)

		if (nextProps.chargebacks !== this.props.chargebacks) {
			this.setState({
				rows: this.getRowData(nextProps.chargebacks),
				expandedGroups: [...new Set(this.getRowData(nextProps.chargebacks).map(x => x.FranchiseeNameNo))],
			})
		}

		if (nextProps.searchText !== this.props.searchText) {
			this.search(nextProps.searchText);
		}
	} // deprecate 

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.data!==prevProps.data)
            this.setState({data: this.props.data});

        if(this.props.chargebackDetail!==prevProps.chargebackDetail){
            this.setState({
                chargebackDetail: this.props.chargebackDetail,
            });
		}
	}


	getRowData(chargebacks) {
		
		if (chargebacks.data !== undefined) {
            let res = '';
            res = chargebacks.Data;
			return res;
		} else {
			let res = [...chargebacks.Data];
			res.forEach(x=>{
				x.FranchiseeNameNo = `${x.dlr_name} - ${x.dlr_code}`;
			});
			console.log("getRowData", res);
			return res;
			}
	}

	search(val) {
		val = val.toLowerCase();
		const temp =this.getRowData(this.props.chargebacks).filter(d => {
			return (d.ChargebackNo && d.ChargebackNo.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.ChargebackName && d.ChargebackName.toString().toLowerCase().indexOf(val) !== -1) ||
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
	}


	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	fetchData(state, instance) {
		console.log("fetchData");

		this.setState({
			pageSize: state.pageSize,
			page: state.page,
		});
	}

	capital_letter(str) {
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

	initRowsFromRawJson = (rawData = this.props.chargebacks) => {
		let all_temp = [];
		if (rawData === null || rawData === undefined) return;
		let regions = rawData.Data.filter(x => x)
		all_temp = regions
		this.setState({
			rows: all_temp,
			data: all_temp,
			expandedGroups: [...new Set(this.getRowData(this.props.chargebacks).map(x => x.FranchiseeNameNo))]
		});

	};


	TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {
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
			this.props.openEditChargebackForm(tableRow.row.ChargebackId);
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

	expandedGroupsChange = (expandedGroups) => {
		this.setState({ expandedGroups });
	};

	GroupCellContent = ({ column, row }) => (
		<span>
			<strong>{row.value}</strong>
		</span>
	);



	render() {
		const {classes} = this.props;

		const {
			rows,
			selection,
			tableColumnExtensions,
			sorting,
			editingColumnExtensions,
			currencyColumns,
			pageSizes,
			amountFilterOperations,
			searchValue,
			grouping,
			expandedGroups,
		} = this.state;
		return (
				<div className={classNames(classes.layoutTable, "flex flex-col h-full")}>

					 <div className={classNames("flex flex-col")} >
						<Grid
							rootComponent={GridRootComponent}
							rows={rows}
							columns={tableColumnExtensions}
						>
							<DragDropProvider />
							<PagingState
								defaultCurrentPage={0}
								defaultPageSize={100}
							/>
							<PagingPanel pageSizes={pageSizes} />
							<SelectionState
								selection={selection}
								onSelectionChange={this.changeSelection}
							/>
							<IntegratedSelection />
							<IntegratedPaging />
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
							<GroupingState
								grouping={[
									{columnName: 'FranchiseeNameNo'}
								]}
								expandedGroups={expandedGroups}
								onExpandedGroupsChange={this.expandedGroupsChange}
							/>
							<IntegratedGrouping />
							<VirtualTable
								tableComponent={TableComponent}
								headComponent = {TableHeadComponent}
								columnExtensions={tableColumnExtensions}
								rowComponent = {this.TableRow}
							/>
							<TableHeaderRow showSortingControls />
							<DataTypeProvider for={grouping}/>
							<TableGroupRow
								  showColumnsWhenGrouped contentComponent={this.GroupCellContent}
							/>
							<CurrencyTypeProvider
								for={currencyColumns}
								availableFilterOperations={amountFilterOperations}
								editorComponent={AmountEditor}
							/>
							<TableSelection showSelectAll highlightRow  rowComponent={this.TableRow}/>
							<TableEditRow />
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
							<CustomizedDxGridSelectionPanel selection={selection} rows={rows}/>
						</Grid>
					 </div>
				</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleFilterPanel: Actions.toggleFilterPanel,
		toggleMapView: Actions.toggleMapView,
		toggleSummaryPanel: Actions.toggleSummaryPanel,
		deleteChargebacksAction: Actions.deleteChargebacks,
		removeChargebackAction: Actions.removeChargeback,
		openEditChargebackForm: Actions.openEditChargebackForm,
		closeEditChargebackForm: Actions.closeEditChargebackForm,
		getChargebackDetail: Actions.getChargebackDetail
	}, dispatch);
}

function mapStateToProps({ chargebacks, auth }) {
	return {
		chargebacks: chargebacks.chargebacksDB,
		bLoadedChargebacks: chargebacks.bLoadedChargebacks,
		transactionStatus: chargebacks.transactionStatus,
		filterState: chargebacks.bOpenedFilterPanel,
		summaryState: chargebacks.bOpenedSummaryPanel,
		regionId: auth.login.defaultRegionId,
		ChargebackForm: chargebacks.ChargebackForm,
		mapViewState: chargebacks.bOpenedMapView,
		locationFilterValue: chargebacks.locationFilterValue,
		searchText: chargebacks.searchText,
		bChargebackFetchStart: chargebacks.bChargebackFetchStart,
		getChargebacksParam: chargebacks.getChargebacksParam,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ChargebackListContent)));

