import React, { Component } from 'react';
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
	}
});

class CustomerListContent extends Component {
	state = {
		s: '',
		temp: [],
		data: [],
		selection: [],
		selectAll: false,
	};

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue.toString()
		});
	};

	toggleSelection = (key, shift, row) => {
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
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
		return this.state.selection.includes(key);
	};

	logSelection = () => {
		console.log("selection:", this.state.selection);
	};


	constructor(props) {
		super(props);

		this.fetchData = this.fetchData.bind(this);
		this.escFunction = this.escFunction.bind(this);
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.data !== prevProps.data)
			this.setState({ data: this.props.data });

		if (prevState.s !== this.state.s) {
			this.search(this.state.s);
		}
	}
	getCustomersFromStatus = (rawData = this.props.customers) => {
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
			all_temp = [...all_temp, ...x.Customers];
		});

		// regions.map(x => {
		// 	all_temp = [...all_temp, ...x.Customers];
		// });

		this.setState({ temp: all_temp });
		this.setState({ data: all_temp });
	};
	search(val) {
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

		this.setState({ data: temp });
	}

	componentDidMount() {
		document.addEventListener("keydown", this.escFunction, false);
	}

	componentWillMount() {
		this.setState({ data: this.props.data })
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.escFunction, false);
	}

	escFunction(event) {
		if (event.keyCode === 27) {
			this.setState({ s: '' });
			this.setState({ data: this.props.data })
		}
	}

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
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

	render() {
		console.log(this.props)
		console.log(this.state)
		const {
			classes,
			toggleFilterPanel,
			toggleSummaryPanel,
			// filterState,
			// summaryState,
			// deleteCustomersAction,
			// data,
			// openNewCustomerForm,
			// closeNewCustomerForm,
			// CustomerForm,
			// toggleMapView
		} = this.props;
		const { toggleSelection, toggleAll, isSelected } = this;

		console.log(this.props)

		return (
			<div className={classNames(classes.layoutTable, "h-full")}>
				<div className="flex flex-row items-center">
					<div className="flex items-center justify-start p-12">
						<Button
							onClick={(ev) => toggleFilterPanel()}
							aria-label="toggle filter panel"
							color="secondary"
							// disabled={filterState ? true : false}
							className={classNames(classes.filterPanelButton)}
						>
							<img className={classes.imageIcon} alt="" src="assets/images/invoices/filter.png" />
						</Button>
					</div>
					{/* <Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}> */}
					<Paper className={"flex items-center w-full h-44 mr-12"} elevation={1}>
						<Input
							placeholder="Search..."
							className={classNames(classes.search, 'pl-16')}
							// className="pl-16"
							disableUnderline
							fullWidth
							value={this.state.s}
							onChange={this.handleChange('s')}
							inputProps={{
								'aria-label': 'Search'
							}}
						/>
						<Icon color="action" className="mr-16">search</Icon>
					</Paper>
					<div className="flex items-center justify-end p-12">
						<Button
							onClick={(ev) => toggleSummaryPanel()}
							aria-label="toggle summary panel"
							// disabled={summaryState ? true : false}
							className={classNames(classes.summaryPanelButton)}
						>
							<Icon>insert_chart</Icon>
						</Button></div>
				</div>



				<ReactTable
					data={this.state.data}
					minRows={0}
					PaginationComponent={JanikingPagination}
					onFetchData={this.fetchData}
					getTheadGroupProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								padding: "10px 10px",
								fontSize: 16,
								fontWeight: 700
							},
						}
					}}
					getTheadGroupThProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								padding: "10px 10px",
								fontSize: 18,
								fontWeight: 700,
							},
							className: classNames("flex items-center justify-start")
						}
					}}
					getTheadThProps={(state, rowInfo, column, instance) => {
						let border = '1px solid rgba(255,255,255,.6)';
						if (column.Header === 'Actions') border = 'none';

						return {
							style: {
								fontSize: '1.6rem',
								fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
								fontWeight: 400,
								lineHeight: 1.75,
								color: 'white',
								borderRight: border
							},
						}
					}}
					getTheadProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								fontSize: 13,
							},
							className: classes.tableTheadRow
						}
					}}
					getTdProps={(state, rowInfo, column, instance) => {
						// let tdClass = 'flex items-center justify-center';
						// if (column.id === 'CustomerNo' || column.id === 'CustomerNo' || column.id === 'CustomerBalanceAmount' ||
						// 	column.id === 'CustomerDate' || column.id === 'TransactionStatus') tdClass = classNames(classes.tableTdEven, "flex items-center  justify-center");

						return {
							style: {
								textAlign: 'center',
								flexDirection: 'row',
								fontSize: 12,
								padding: "0",
							},
						}
					}}
					getTrProps={(state, rowInfo, column) => {
						return {
							className: "cursor-pointer",
							onClick: (e, handleOriginal) => {
								if (rowInfo) {
									alert('ok');
									// openEditContactDialog(rowInfo.original);
								}
							}
						}
					}}
					columns={[
						{
							Header: (instance) => (
								<Checkbox
									onClick={(event) => {
										event.stopPropagation();
									}}
									onChange={(event) => toggleAll(instance)}
									checked={this.state.selectAll}
									style={{ color: 'white' }}
								// indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
								/>
							),
							accessor: "",
							Cell: row => {
								return (<Checkbox
									onClick={(event) => {
										event.stopPropagation();
									}}
									checked={isSelected(row.value.CustomerId)}
									onChange={() => toggleSelection(row.value.CustomerId)}
								/>
								)
							},
							className: "justify-center",
							sortable: false,
							width: 72
						},
						{
							Header: "No",
							accessor: "CustomerNo",
							filterAll: true,
							width: 60,
							className: classNames("flex items-center  justify-center") //classes.tableTdEven
						},
						{
							Header: "Name",
							accessor: "CustomerName",
							width: 200,
							className: classNames("flex items-center  justify-start p-12-impor")
						},
						{
							Header: "Address",
							// accessor: "Address",
							id: "Address",
							accessor: d => (this.capital_letter(d.Address)),
							className: classNames("flex items-center  justify-start"),
							width: 160
						},
						{
							Header: "City",
							// accessor: "City",
							id: "City",
							accessor: d => (this.capital_letter(d.City)),
							className: classNames("flex items-center  justify-start"),
							width: 90
						},
						{
							Header: "State",
							accessor: "StateName",
							className: classNames("flex items-center  justify-center"),
							width: 50
						},
						{
							Header: "Zip Code",
							accessor: "PostalCode",
							className: classNames("flex items-center  justify-center"),
							headerClassName: "wordwrap",
							width: 50
						},
						{
							Header: "Phone",
							accessor: "Phone",
							width: 80,
							className: classNames("flex items-center  justify-center p-12-impor")
						},
						{
							Header: "Account Type",
							accessor: "AccountTypeListName",
							// Cell: row => {
							// 	return '$' + parseFloat(row.original.CustomerBalanceAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
							// },
							className: classNames("flex items-center  justify-center p-12-impor"),
							width: 150
						},
						{
							Header: "Status",
							// Cell: row => {
							// 	return '$' + parseFloat(row.original.CustomerTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
							// },
							accessor: "StatusName",
							className: classNames("flex items-center  justify-center p-12-impor"),
							width: 60
						},
						{
							Header: "Contract Amount",
							id: "Amount",
							// accessor: d => ('$' + Number(d.Amount).toFixed(2)),
							accessor: d => '$' + d.Amount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
							// accessor: "Amount",
							className: classNames("flex items-center  justify-end p-12-impor"),
							headerClassName: "wordwrap",
							width: 80
						},
						// {
						// 	Header: "Due Date",
						// 	id: "DueDate",
						// 	accessor: d => moment(d.DueDate).format('MM/DD/YYYY'),
						// 	className: classNames("flex items-center  justify-center"),
						// 	width: 120
						// },
						// {
						// 	Header: "Status",
						// 	accessor: "TransactionStatus",
						// 	className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
						// 	width: 120
						// },
						{
							Header: "Actions",
							// width: 128,
							Cell: row => (
								<div className="flex items-center actions">
									<IconButton
										onClick={(ev) => {
											ev.stopPropagation();
											if (window.confirm("Do you really want to remove this customer")) {
												this.props.removeCustomerAction(row.original.CustomerId, this.props.customers);
												if (this.state.selection.length > 0) {
													_.remove(this.state.selection, function (id) {
														return id === row.original.CustomerId;
													});
												}
											}
										}}
									>
										<Icon>delete</Icon>
									</IconButton>
									<IconButton
										onClick={(ev) => {
											ev.stopPropagation();
											// removeContact(row.original.id);
										}}
									>
										<Icon>edit</Icon>
									</IconButton>
								</div>
							)
						},

					]}
					defaultPageSize={100}
					className={classNames("-striped -highlight")}
					totalRecords={this.state.data.length}
					style={{
						height: '100%',
					}}
				/>
			</div>
		);
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
		CustomerForm: customers.CustomerForm
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerListContent)));

