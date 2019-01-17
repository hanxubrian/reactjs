// import React, { Component } from 'react'

// // core components
// import { Icon, IconButton, Input, Paper, Button } from '@material-ui/core';

// //Janiking
// import JanikingPagination from 'Commons/JanikingPagination';

// // theme components
// // import {FuseAnimate} from '@fuse';

// import { withStyles, Checkbox } from "@material-ui/core";
// import { withRouter } from 'react-router-dom';


// // for store
// import { bindActionCreators } from "redux";
// import connect from "react-redux/es/connect/connect";
// import * as Actions from 'store/actions';

// // third party
// // import moment from 'moment'
// import ReactTable from "react-table";
// import "react-table/react-table.css";
// import _ from 'lodash';
// import classNames from 'classnames';

// const hexToRgb = (hex) => {
// 	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
// 	return result ? {
// 		r: parseInt(result[1], 16),
// 		g: parseInt(result[2], 16),
// 		b: parseInt(result[3], 16)
// 	} : null;
// };

// const styles = theme => ({
// 	layoutTable: {
// 		flexDirection: 'row',
// 		'& .z-9999': {
// 			height: 64
// 		},
// 		'& .-pageSizeOptions': {
// 			display: 'none'
// 		},
// 		'& .openFilter': {
// 			width: 'inherit'
// 		},
// 		'& .openSummary': {
// 			width: 300
// 		},
// 		'& .p-12-impor': {
// 			paddingLeft: '1.2rem!important',
// 			paddingRight: '1.2rem!important',
// 		},
// 		'& .ReactTable .rt-noData': {
// 			top: '250px',
// 			border: '1px solid coral'
// 		},
// 		'& .ReactTable .rt-thead.-headerGroups': {
// 			paddingLeft: '0!important',
// 			paddingRight: '0!important',
// 			minWidth: 'inherit!important'
// 		},
// 		'& .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
// 			background: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .8)',
// 			color: 'white!important'
// 		},
// 		'& .ReactTable .rt-tbody': {
// 			overflowY: 'scroll',
// 			overflowX: 'hidden'
// 		},
// 		'& .ReactTable .rt-tr-group': {
// 			flex: '0 0 auto'
// 		},
// 		'& .ReactTable .rt-thead .rt-th:nth-child(1)': {
// 			justifyContent: 'center'
// 		},
// 		'& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
// 			width: 'inherit!important',
// 			minWidth: 'inherit!important',
// 		},
// 		'& .ReactTable .rt-thead .rt-th:last-child': {
// 			justifyContent: 'flex-end'
// 		},
// 	},
// 	content: {
// 		position: 'relative'
// 	},
// 	search: {
// 		width: 360,
// 		[theme.breakpoints.down('sm')]: {
// 			width: '100%'
// 		}
// 	},
// 	tableTheadRow: {
// 		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
// 		backgroundColor: theme.palette.primary.main
// 	},
// 	tableThEven: {
// 		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
// 	},
// 	tableTdEven: {
// 		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .1)'
// 	},
// 	filterPanelButton: {
// 		backgroundColor: theme.palette.secondary.main,
// 		minWidth: 42,
// 		padding: 8,
// 		justifyContent: 'center',
// 		'&:hover': {
// 			backgroundColor: theme.palette.primary.dark,
// 		}
// 	},
// 	summaryPanelButton: {
// 		backgroundColor: theme.palette.secondary.main,
// 		minWidth: 42,
// 		padding: 8,
// 		color: 'white',
// 		justifyContent: 'center',
// 		'&:hover': {
// 			backgroundColor: theme.palette.primary.dark,
// 		}
// 	},
// 	imageIcon: {
// 		width: 24
// 	}
// });
// class LeaseListContent extends Component {
//     state = {
// 		s: '',
// 		temp: [],
// 		data: [],
// 		selection: [],
// 		selectAll: false,
// 	};

// 	onChange = (event, { newValue, method }) => {
// 		this.setState({
// 			value: newValue.toString()
// 		});
// 	};

// 	toggleSelection = (key, shift, row) => {
//         /*
//           https://react-table.js.org/#/story/select-table-hoc
//           Implementation of how to manage the selection state is up to the developer.
//           This implementation uses an array stored in the component state.
//           Other implementations could use object keys, a Javascript Set, or Redux... etc.
//         */
// 		// start off with the existing state
// 		let selection = [...this.state.selection];
// 		const keyIndex = selection.indexOf(key);
// 		// check to see if the key exists
// 		if (keyIndex >= 0) {
// 			// it does exist so we will remove it using destructing
// 			selection = [
// 				...selection.slice(0, keyIndex),
// 				...selection.slice(keyIndex + 1)
// 			];
// 		} else {
// 			// it does not exist so add it
// 			selection.push(key);
// 		}
// 		// update the state
// 		this.setState({ selection });
// 	};

// 	toggleAll = (instance) => {
// 		const selectAll = this.state.selectAll ? false : true;
// 		const selection = [];
// 		if (selectAll) {
// 			let currentRecords = instance.data;
// 			// we just push all the IDs onto the selection array
// 			let page = this.state.page;
// 			let pageSize = this.state.pageSize;
// 			let start_index = page * pageSize;
// 			let end_index = start_index + pageSize;
// 			currentRecords.forEach(item => {
// 				if (item._index >= start_index && item._index < end_index)
// 					selection.push(item._original.LeaseId);
// 			});
// 		}
// 		this.setState({ selectAll, selection });
// 	};

// 	isSelected = key => {
//         /*
//           Instead of passing our external selection state we provide an 'isSelected'
//           callback and detect the selection state ourselves. This allows any implementation
//           for selection (either an array, object keys, or even a Javascript Set object).
//         */
// 		return this.state.selection.includes(key);
// 	};

// 	logSelection = () => {
// 		console.log("selection:", this.state.selection);
// 	};


// 	constructor(props) {
// 		super(props);

// 		this.fetchData = this.fetchData.bind(this);
// 		this.escFunction = this.escFunction.bind(this);
// 	}
// 	componentDidUpdate(prevProps, prevState, snapshot) {
// 		if (this.props.data !== prevProps.data)
// 			this.setState({ data: this.props.data });

// 		if (prevState.s !== this.state.s) {
// 			this.search(this.state.s);
// 		}
// 	}
// 	getLeasesFromStatus = (rawData = this.props.leases) => {
// 		// let temp = [];
// 		let all_temp = [];
// 		// let temp1 = [];
// 		// const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
// 		// const keys = ['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];

// 		if (rawData === null) return;

// 		let regions = rawData.Data.Region.filter(x => {
// 			return this.props.regionId === 0 || x.Id === this.props.regionId;
// 		});

// 		regions.forEach(x => {
// 			all_temp = [...all_temp, ...x.Leases];
// 		});

// 		// regions.map(x => {
// 		// 	all_temp = [...all_temp, ...x.Leases];
// 		// });

// 		this.setState({ temp: all_temp });
//         this.setState({ data: all_temp });
// 	};
// 	search(val) {
// 		// const temp = this.props.data.filter( d => {
// 		//     console.log('lease=', d);
// 		//     return d.LeaseId.toString().indexOf(val) !== -1 || !val ||
// 		//         d.LeaseNo.indexOf(val) !== -1 ||
// 		//         d.LeaseAmount.toString().indexOf(val) !== -1 ||
// 		//         d.LeaseTotal.toString().indexOf(val) !== -1 ||
// 		//         d.LeaseTax.toString().indexOf(val) !== -1 ||
// 		//         d.LeaseDescription.toLowerCase().indexOf(val) !== -1 ||
// 		//         d.LeaseName.toLowerCase().indexOf(val) !== -1 ||
// 		//         d.LeaseId.toString().indexOf(val) !== -1 ||
// 		//         d.LeaseNo.toString().indexOf(val) !== -1 ||
// 		//         d.TransactionStatusListId.toString().indexOf(val) !== -1
// 		// });

//         // this.setState({data: temp});
// 		val = val.toLowerCase();
//         console.log(val)
// 		if (val === '') {
// 			this.getLeasesFromStatus();
// 			return;
// 		}
// 		const temp = this.state.data.filter(d => {
// 			return (d.LeaseNo && d.LeaseNo.toString().toLowerCase().indexOf(val) !== -1) || !val ||
// 				(d.LeaseName && d.LeaseName.toString().toLowerCase().indexOf(val) !== -1) ||
// 				(d.Address && d.Address.toString().toLowerCase().indexOf(val) !== -1) ||
// 				(d.Phone && d.Phone.toString().toLowerCase().indexOf(val) !== -1) ||
// 				(d.AccountTypeListName && d.AccountTypeListName.toString().toLowerCase().indexOf(val) !== -1) ||
// 				(d.LeaseDescription && d.LeaseDescription.toString().toLowerCase().indexOf(val) !== -1) ||
// 				(d.Amount && d.Amount.toString().toLowerCase().indexOf(val) !== -1) ||
// 				(d.StatusName && d.StatusName.toString().toLowerCase().indexOf(val) !== -1)
// 		});

// 		this.setState({ data: temp });
// 	}

// 	componentDidMount() {
// 		document.addEventListener("keydown", this.escFunction, false);
// 	}

// 	componentWillMount() {
// 		this.setState({ data: this.props.data })
// 	}
// 	componentWillUnmount() {
// 		document.removeEventListener("keydown", this.escFunction, false);
// 	}

// 	escFunction(event) {
// 		if (event.keyCode === 27) {
// 			this.setState({ s: '' });
// 			this.setState({ data: this.props.data })
// 		}
// 	}

// 	handleChange = prop => event => {
// 		this.setState({ [prop]: event.target.value });
// 	};

// 	removeLeases = () => {
// 		if (this.state.selection.length === 0) {
// 			alert("Please choose lease(s) to delete");
// 			return;
// 		}
// 		if (window.confirm("Do you really want to remove the selected lease(s)")) {
// 			this.props.deleteLeasesAction(this.state.selection, this.props.leases);
// 			this.setState({ selection: [], selectAll: false })
// 		}
// 	};

// 	fetchData(state, instance) {
// 		this.setState({
// 			pageSize: state.pageSize,
// 			page: state.page,
// 		});
// 	}

// 	capital_letter(str) {
// 		str = str.split(" ").map(x => {
// 			if (x.length > 1) {
// 				return x[0].toUpperCase() + x.substr(1).toLowerCase();
// 			} else if (x.length > 0) {
// 				return x[0].toUpperCase();
// 			} else {
// 				return "";
// 			}
// 		});

// 		return str.join(" ");
// 	}

// 	render() {
// 		const {
// 			classes,
// 			toggleFilterPanel,
// 			toggleSummaryPanel,
// 			// filterState,
// 			// summaryState,
// 			// deleteLeasesAction,
// 			// data,
// 			// openNewLeaseForm,
// 			// closeNewLeaseForm,
// 			// LeaseForm,
// 			// toggleMapView
// 		} = this.props;
// 		const { toggleSelection, toggleAll, isSelected } = this;

//         console.log(this.state)
//         console.log(this.props)
// 		return (
// 			<div className={classNames(classes.layoutTable, "h-full")}>
// 				<ReactTable
// 					data={this.state.data}
// 					minRows={0}
// 					PaginationComponent={JanikingPagination}
// 					onFetchData={this.fetchData}
// 					getTheadGroupProps={(state, rowInfo, column, instance) => {
// 						return {
// 							style: {
// 								padding: "10px 10px",
// 								fontSize: 16,
// 								fontWeight: 700
// 							},
// 						}
// 					}}
// 					getTheadGroupThProps={(state, rowInfo, column, instance) => {
// 						return {
// 							style: {
// 								padding: "10px 10px",
// 								fontSize: 18,
// 								fontWeight: 700,
// 							},
// 							className: classNames("flex items-center justify-start")
// 						}
// 					}}
// 					getTheadThProps={(state, rowInfo, column, instance) => {
// 						let border = '1px solid rgba(255,255,255,.6)';
// 						if (column.Header === 'Actions') border = 'none';

// 						return {
// 							style: {
// 								fontSize: '1.6rem',
// 								fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
// 								fontWeight: 400,
// 								lineHeight: 1.75,
// 								color: 'white',
// 								borderRight: border
// 							},
// 						}
// 					}}
// 					getTheadProps={(state, rowInfo, column, instance) => {
// 						return {
// 							style: {
// 								fontSize: 13,
// 							},
// 							className: classes.tableTheadRow
// 						}
// 					}}
// 					getTdProps={(state, rowInfo, column, instance) => {
// 						// let tdClass = 'flex items-center justify-center';
// 						// if (column.id === 'LeaseNo' || column.id === 'LeaseNo' || column.id === 'LeaseBalanceAmount' ||
// 						// 	column.id === 'LeaseDate' || column.id === 'TransactionStatus') tdClass = classNames(classes.tableTdEven, "flex items-center  justify-center");

// 						return {
// 							style: {
// 								textAlign: 'center',
// 								flexDirection: 'row',
// 								fontSize: 12,
// 								padding: "0",
// 							},
// 						}
// 					}}
// 					getTrProps={(state, rowInfo, column) => {
// 						return {
// 							className: "cursor-pointer",
// 							onClick: (e, handleOriginal) => {
// 								if (rowInfo) {
// 									alert('ok');
// 									// openEditContactDialog(rowInfo.original);
// 								}
// 							}
// 						}
// 					}}
// 					columns={[
// 						{
// 							Header: (instance) => (
// 								<div className="flex items-center">
// 									<Button
// 										onClick={(ev) => toggleFilterPanel()}
// 										aria-label="toggle filter panel"
// 										color="secondary"
// 										// disabled={filterState ? true : false}
// 										className={classNames(classes.filterPanelButton)}
// 									>
// 										<img className={classes.imageIcon} alt="" src="assets/images/invoices/filter.png" />
// 									</Button>

// 									{/* <Hidden smDown>
// 										<Button
// 											onClick={(ev) => toggleFilterPanel()}
// 											aria-label="toggle filter panel"
// 											color="secondary"
// 											disabled={filterState ? true : false}
// 											className={classNames(classes.filterPanelButton)}
// 										>
// 											<img className={classes.imageIcon} src="assets/images/invoices/filter.png" />
// 										</Button>
// 									</Hidden>
// 									<Hidden smUp>
// 										<Button
// 											onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
// 											aria-label="toggle filter panel"
// 											className={classNames(classes.filterPanelButton)}
// 										>
// 											<img className={classes.imageIcon} src="assets/images/invoices/filter.png" />
// 										</Button>
// 									</Hidden> */}
// 								</div>
// 							),
// 							columns: [
// 								{
// 									Header: (instance) => (
// 										<Checkbox
// 											onClick={(event) => {
// 												event.stopPropagation();
// 											}}
// 											onChange={(event) => toggleAll(instance)}
// 											checked={this.state.selectAll}
// 											style={{ color: 'white' }}
// 										// indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
// 										/>
// 									),
// 									accessor: "",
// 									Cell: row => {
// 										return (<Checkbox
// 											onClick={(event) => {
// 												event.stopPropagation();
// 											}}
// 											checked={isSelected(row.value.LeaseId)}
// 											onChange={() => toggleSelection(row.value.LeaseId)}
// 										/>
// 										)
// 									},
// 									className: "justify-center",
// 									sortable: false,
// 									width: 72
// 								}
// 							],
// 							className: classNames("justify-center")
// 						},
// 						{
// 							Header: () => (
// 								<div className="flex items-center pr-0 lg:pr-12">
// 									<Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>
// 										<Input
// 											placeholder="Search..."
// 											className={classNames(classes.search, 'pl-16')}
// 											// className="pl-16"
// 											disableUnderline
// 											fullWidth
// 											value={this.state.s}
// 											onChange={this.handleChange('s')}
// 											inputProps={{
// 												'aria-label': 'Search'
// 											}}
// 										/>
// 										<Icon color="action" className="mr-16">search</Icon>
// 									</Paper>
// 								</div>
// 							),
// 							columns: [
// 								// {
// 								// 	Header: "Region",
// 								// 	accessor: "RegionName",
// 								// 	filterAll: true,
// 								// 	width: 80,
// 								// 	className: classNames("flex items-center  justify-center") //classes.tableTdEven
// 								// },
// 								{
// 									Header: "Franchisee No.",
// 									accessor: "FranchiseeNo",
// 									width: 200,
// 									className: classNames("flex items-center  justify-center p-12-impor")
// 								},
// 								{
// 									Header: "Franchisee Name",
// 									// accessor: "Address",
// 									// id: "Address",
//                                     // accessor: d => (this.capital_letter(d.Address)),
//                                     accessor: "FranchiseeName",
// 									className: classNames("flex items-center  justify-start"),
// 									width: 350
// 								},
// 								{
// 									Header: "No. Of Lease",
// 									// accessor: "City",
// 									// id: "City",
// 									accessor: "LeaseCount",
//                                     className: classNames("flex items-center  justify-center"),
//                                     headerClassName: "wordwrap",
// 									width: 100
// 								},
// 								{
//                                     Header: "Monthly Payment Amount",
//                                     id: "TotalMonthlyPaymentAmount",
//                                     accessor: d => '$' + d.TotalMonthlyPaymentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
//                                     // accessor: TotalMonthlyPaymentAmount,
//                                     className: classNames("flex items-center  justify-end"),
//                                     headerClassName: "wordwrap",
// 									width: 200
// 								},
// 								{
//                                     Header: "Total Amount Paid",
//                                     id:  "TotalPaidAmount",
//                                     accessor: d => '$' + d.TotalPaidAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
// 									// accessor:  "TotalPaidAmount",
// 									className: classNames("flex items-center  justify-end"),
// 									headerClassName: "wordwrap",
// 									width: 200
// 								},
// 								{
//                                     Header: "Total Balance",
//                                     id:  "TotalBalance",
//                                     accessor: d => '$' + d.TotalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 }),
// 									// accessor: "TotalBalance",
// 									width: 200,
// 									className: classNames("flex items-center justify-end")
// 								},
// 								// {
// 								// 	Header: "Account Type",
// 								// 	accessor: "AccountTypeListName",
// 								// 	// Cell: row => {
// 								// 	// 	return '$' + parseFloat(row.original.LeaseBalanceAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
// 								// 	// },
// 								// 	className: classNames("flex items-center  justify-center p-12-impor"),
// 								// 	width: 150
// 								// },
// 								{
// 									Header: "Status",
// 									// Cell: row => {
// 									// 	return '$' + parseFloat(row.original.LeaseTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
// 									// },
// 									accessor: "Status",
// 									className: classNames("flex items-center  justify-center p-12-impor"),
// 									width: 150
// 								},
// 								// {
// 								// 	Header: "Contract Amount",
// 								// 	id: "Amount",
// 								// 	// accessor: d => ('$' + Number(d.Amount).toFixed(2)),
// 								// 	accessor: d => '$' + d.Amount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
// 								// 	// accessor: "Amount",
// 								// 	className: classNames("flex items-center  justify-end p-12-impor"),
// 								// 	headerClassName: "wordwrap",
// 								// 	width: 80
// 								// },
// 								// {
// 								// 	Header: "Due Date",
// 								// 	id: "DueDate",
// 								// 	accessor: d => moment(d.DueDate).format('MM/DD/YYYY'),
// 								// 	className: classNames("flex items-center  justify-center"),
// 								// 	width: 120
// 								// },
// 								// {
// 								// 	Header: "Status",
// 								// 	accessor: "TransactionStatus",
// 								// 	className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
// 								// 	width: 120
// 								// },
// 								{
// 									Header: "Actions",
// 									width: 128,
// 									Cell: row => (
// 										<div className="flex items-center actions">
// 											<IconButton
// 												onClick={(ev) => {
// 													ev.stopPropagation();
// 													if (window.confirm("Do you really want to remove this lease")) {
// 														this.props.removeLeaseAction(row.original.LeaseId, this.props.leases);
// 														if (this.state.selection.length > 0) {
// 															_.remove(this.state.selection, function (id) {
// 																return id === row.original.LeaseId;
// 															});
// 														}
// 													}
// 												}}
// 											>
// 												<Icon>delete</Icon>
// 											</IconButton>
// 											<IconButton
// 												onClick={(ev) => {
// 													ev.stopPropagation();
// 													// removeContact(row.original.id);
// 												}}
// 											>
// 												<Icon>edit</Icon>
// 											</IconButton>
// 										</div>
// 									)
// 								}
// 							]
// 						},
// 						{
// 							Header: (instance) => (
// 								<div className="flex items-center justify-end pr-12">
// 									<Button
// 										onClick={(ev) => toggleSummaryPanel()}
// 										aria-label="toggle summary panel"
// 										// disabled={summaryState ? true : false}
// 										className={classNames(classes.summaryPanelButton)}
// 									>
// 										<Icon>insert_chart</Icon>
// 									</Button>

// 									{/* <Hidden smDown>
// 										<Button
// 											onClick={(ev) => toggleSummaryPanel()}
// 											aria-label="toggle summary panel"
// 											disabled={summaryState ? true : false}
// 											className={classNames(classes.summaryPanelButton)}
// 										>
// 											<Icon>insert_chart</Icon>
// 										</Button>
// 									</Hidden>
// 									<Hidden smUp>
// 										<Button
// 											onClick={(ev) => this.pageLayout.toggleRightSidebar()}
// 											aria-label="toggle summary panel"
// 											className={classNames(classes.summaryPanelButton)}
// 										>
// 											<Icon>insert_chart</Icon>
// 										</Button>
// 									</Hidden> */}
// 								</div>
// 							),
// 							columns: [
// 								{
// 									Header: '',
// 									cell: () => (
// 										<div className="flex w-full justify-end" />
// 									)
// 								}
// 							]
// 						}
// 					]}
// 					defaultPageSize={100}
// 					className={classNames("-striped -highlight")}
// 					totalRecords={this.state.data.length}
// 					style={{
// 						height: '100%',
// 					}}
// 				/>
// 			</div>
// 		);
// 	}
// }

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({
// 		toggleFilterPanel: Actions.toggleFilterPanel,
// 		toggleMapView: Actions.toggleMapView,
// 		toggleSummaryPanel: Actions.toggleSummaryPanel,
// 		deleteLeasesAction: Actions.deleteLeases,
// 		removeLeaseAction: Actions.removeLease,
// 		openEditLeaseForm: Actions.openEditLeaseForm,
// 		closeEditLeaseForm: Actions.closeEditLeaseForm,
// 	}, dispatch);
// }

// function mapStateToProps({ leases, auth }) {
// 	return {
// 		leases: leases.leasesDB,
// 		bLoadedLeases: leases.bLoadedLeases,
// 		transactionStatus: leases.transactionStatus,
// 		filterState: leases.bOpenedFilterPanel,
// 		summaryState: leases.bOpenedSummaryPanel,
// 		regionId: auth.login.defaultRegionId,
// 		LeaseForm: leases.LeaseForm
// 	}
// }


// export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaseListContent)));







import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';

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
import _ from 'lodash';
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
	Getter,
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
// import LeaseSearchBar from './LeaseSearchBar';
import { getLeases } from '../../../../store/actions';

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

class LeaseListContent extends Component {




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
			tableColumnExtensions: [
				{
					title: "No",
					name: "FranchiseeNo",
					columnName: "FranchiseeNo",
					width: 80,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Name",
					name: "FranchiseeName",
					columnName: "FranchiseeName",
					width: 200,
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					togglingEnabled: false,
				},
				{
					title: "No. of Lease",
					name: "LeaseCount",
					columnName: "LeaseCount",
					width: 100,
					align: 'center',
					wordWrapEnabled: true,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Monthly Payment Amount",
					name: "TotalMonthlyPaymentAmount",
					columnName: "TotalMonthlyPaymentAmount",
					width: 200,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				{
					title: "Total Amount Paid",
					name: "TotalPaidAmount",
					columnName: 'TotalPaidAmount',
					width: 200,
					align: 'right',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				{
					title: "Total Balance",
					name: "TotalBalance",
					columnName: "TotalBalance",
					width: 200,
					align: 'right',
					sortingEnabled: false,
					filteringEnabled: true,
					groupingEnabled: false,
				},
				// {
				// 	title: "Phone",
				// 	name: "Phone",
				// 	columnName: "Phone",
				// 	width: 100,
				// 	sortingEnabled: false,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,
				// },
				// {
				// 	title: "Account Type",
				// 	name: "AccountTypeListName",
				// 	columnName: "AccountTypeListName",
				// 	width: 150,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },
				{
					title: "Status",
					name: "Status",
					columnName: 'Status',
					width: 90,
					align: 'center',
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: true,
				},
				// {
				// 	title: "Contract Amount",
				// 	name: "Amount",
				// 	columnName: 'Amount',
				// 	width: 120,
				// 	align: 'right',
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,

				// },
				// { title: "Actions", name: "Actions", columnName: "Actions", width: 110, sortingEnabled: true, filteringEnabled: false, }
			],
			sorting: [
				{ columnName: 'LeaseNo', direction: 'asc' }
			],
			editingColumnExtensions: [
				// {
				// 	columnName: 'firstName',
				// 	createRowChange: (row, value) => ({ user: { ...row.user, firstName: value } }),
				// },
			],
			currencyColumns: [
				'TotalBalance', 'TotalMonthlyPaymentAmount', 'TotalPaidAmount'
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
			// leftColumns: ['LeaseNo', 'LeaseName'],
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
		console.log("toggleAll");

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
					selection.push(item._original.LeaseId);
			});
		}
		this.setState({ selectAll, selection });
	};

	isSelected = key => {
		console.log("isSelected");

		/*
		  Instead of passing our external selection state we provide an 'isSelected'
		  callback and detect the selection state ourselves. This allows any implementation
		  for selection (either an array, object keys, or even a Javascript Set object).
		*/
		return this.state.selection.includes(key);
	};

	logSelection = () => {
		console.log("logSelection", this.state.selection);
	};

	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate", this.state !== nextState);

		// return this.state !== nextState
		// 	|| this.props.mapViewState !== nextProps.mapViewState
		// 	|| this.props.leases !== nextProps.leases
		// 	// || this.props.bOpenedFilterPanel !== nextProps.bOpenedFilterPanel
		// 	// 	// || this.props.loading !== nextProps.loading
		// 	// 	|| this.props.pins !== nextProps.pins
		// 	|| this.props.searchText !== nextProps.searchText
		return true;
	}

	componentWillReceiveProps(nextProps) {
		// this.setState({ mapViewState: nextProps.mapViewState });
		console.log("componentWillReceiveProps", "LeaseListContent.js", nextProps.locationFilterValue)


		if (nextProps.leases !== this.props.leases) {
			this.initRowsFromRawJson(nextProps.leases);
		}

		if (this.props.locationFilterValue !== nextProps.locationFilterValue) {
			this.setState({ locationFilterValue: nextProps.locationFilterValue })
			console.log("componentWillReceiveProps", "locationFilterValue", nextProps.locationFilterValue, this.props.leases)
			this.initRowsFromRawJson(this.props.leases, nextProps.locationFilterValue);
		}

		// if (this.props.pins !== nextProps.pins) {
		// 	// this.setState({ pins: nextProps.pins })
		// 	this.filterPins(nextProps.pins, this.props.locationFilterValue)
		// }


		if (nextProps.searchText !== this.props.searchText) {
			this.search(nextProps.searchText);
		}
	} // deprecate 

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate", "LeaseListContent.js", this.props.locationFilterValue, this.props.leases);
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
			return (d.LeaseNo && d.LeaseNo.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.LeaseName && d.LeaseName.toString().toLowerCase().indexOf(val) !== -1) ||
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

		this.getLocation();

		// this.setState({ rows: this.props.data })
		// this.setState({ data: this.props.data })

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

	removeLeases = () => {
		console.log("removeLeases");

		if (this.state.selection.length === 0) {
			alert("Please choose lease(s) to delete");
			return;
		}
		if (window.confirm("Do you really want to remove the selected lease(s)")) {
			this.props.deleteLeasesAction(this.state.selection, this.props.leases);
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

	capital_letter(str) {
		console.log("capital_letter");

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

	generateRows() {
		console.log("generateRows");

		console.log(this.props.data.slice(0, 15));
		return this.props.data;
	}



	initRowsFromRawJson = (rawData = this.props.leases, locationFilterValue = this.props.locationFilterValue) => {
		console.log("initRowsFromRawJson", "LeaseListContent.js", this.props.regionId, this.props.statusId, rawData)
		let all_temp = [];
		if (rawData === null || rawData === undefined) return;
		// let regions = rawData.Data.Region.filter(x => {
		// 	return this.props.regionId === 0 || x.Id === this.props.regionId;
		// });


		// console.log("regions", regions)

		// regions.forEach(x => {
		// 	all_temp = [...all_temp, ...x.LeaseList];
		// });
		let regions = rawData.Data[0].LeaseList.filter(x => x)
		all_temp = regions

		// let _pins_temp = [];
		// regions.forEach(x => {
		// 	_pins_temp = [..._pins_temp, ...x.LeaseList.map(lease => {
		// 		return {
		// 			lat: lease.Latitude,
		// 			lng: lease.Longitude,
		// 			text: lease.LeaseName
		// 		}
		// 	})];

		// })

		// this.filterPins(_pins_temp, locationFilterValue)

		this.setState({
			rows: all_temp,
			data: all_temp,
			// pins: _pins_temp,
		});

	};

	// filterPins(pins, locationFilterValue) {
	// 	// this.setState({ gmapVisible: !this.state.gmapVisible });
	// 	console.log("-------filterPins---------", pins)
	// 	let k = (12.5 - 9.5) * 75 / (75 / 5 - 1)
	// 	let b = 12.5 - k / 5

	// 	switch (locationFilterValue.id) {
	// 		case "locationAll":
	// 			if (!this.state.gmapVisible) {
	// 				this.setState({
	// 					gmapVisible: !this.state.gmapVisible,
	// 					pins: pins === undefined ? [] : [...pins],
	// 					pins2: []
	// 				})
	// 			} else {
	// 				this.setState({
	// 					gmapVisible: !this.state.gmapVisible,
	// 					pins: [],
	// 					pins2: pins === undefined ? [] : [...pins]
	// 				})
	// 			}
	// 			map_zoom = DEFAULT_ZOOM
	// 			break;
	// 		case "locationNearBy":
	// 			let _pins = []
	// 			this.setState({
	// 				addrLat: this.state.current_lat,
	// 				addrLng: this.state.current_long
	// 			})

	// 			_pins = this.nearbyLocations(
	// 				pins,
	// 				{
	// 					lat: this.state.current_lat,
	// 					lng: this.state.current_long
	// 				},
	// 				locationFilterValue.miles)

	// 			if (!this.state.gmapVisible) {
	// 				this.setState({
	// 					gmapVisible: !this.state.gmapVisible,
	// 					pins: [..._pins],
	// 					pins2: []
	// 				})
	// 			} else {
	// 				this.setState({
	// 					gmapVisible: !this.state.gmapVisible,
	// 					pins: [],
	// 					pins2: [..._pins]
	// 				})
	// 			}

	// 			map_zoom = locationFilterValue.miles !== undefined ? k / locationFilterValue.miles + b : DEFAULT_ZOOM
	// 			break;
	// 		case "locationNearSpecificAddress":

	// 			let _ = []
	// 			if (locationFilterValue.addrZipcode !== undefined) {
	// 				this.setState({
	// 					addrLat: locationFilterValue.addrZipcode.lat,
	// 					addrLng: locationFilterValue.addrZipcode.lng
	// 				})
	// 				_ = this.nearbyLocations(
	// 					pins,
	// 					{
	// 						lat: locationFilterValue.addrZipcode.lat,
	// 						lng: locationFilterValue.addrZipcode.lng
	// 					},
	// 					locationFilterValue.miles)
	// 			} else {
	// 				this.setState({
	// 					addrLat: this.state.current_lat,
	// 					addrLng: this.state.current_long
	// 				})
	// 				_ = this.nearbyLocations(
	// 					pins,
	// 					{
	// 						lat: this.state.current_lat,
	// 						lng: this.state.current_long
	// 					},
	// 					locationFilterValue.miles)
	// 			}

	// 			if (!this.state.gmapVisible) {
	// 				this.setState({
	// 					gmapVisible: !this.state.gmapVisible,
	// 					pins: [..._],
	// 					pins2: []
	// 				})
	// 			} else {
	// 				this.setState({
	// 					gmapVisible: !this.state.gmapVisible,
	// 					pins: [],
	// 					pins2: [..._]
	// 				})
	// 			}
	// 			map_zoom = locationFilterValue.miles !== undefined ? k / locationFilterValue.miles + b : DEFAULT_ZOOM
	// 			break;
	// 		default:
	// 			this.setState({ pins: pins })
	// 			break;
	// 	}

	// }

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

					{/* <LeaseSearchBar>

					</LeaseSearchBar> */}

					{/* Mapview */}
					{mapViewState && (<div className="w-full h-full">
						<div className="w-full h-full">
							{/* <GoogleMap
								bootstrapURLKeys={{
									key: "AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA" //process.env.REACT_APP_MAP_KEY
								}}
								defaultZoom={12}
								defaultCenter={[this.state.current_lat, this.state.current_long]}
							>
								{
									this.props.pins.map((x, index) => (
										<Marker
											key={index}
											text={x.text}
											lat={x.lat}
											lng={x.lng}
										/>
									))
								}
							</GoogleMap> */}

							{gmapVisible && (<MapWithAMarkerClusterer
								markers={pins}
								center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
							/>)}

							{!gmapVisible && (<MapWithAMarkerClusterer2
								markers={pins2}
								center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
							/>)}

						</div>
					</div>)}

					{/* Girdview */}
					{!mapViewState &&
						(
							<Paper
								className={classNames(classes.layoutTable, "flex flex-col h-full")}
							// style={{ flex: '1', }}
							>
								<Grid
									rootComponent={GridRootComponent}
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

									<IntegratedPaging />

									<VirtualTable
										height="auto"
									/>

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
										availableFilterOperations={amountFilterOperations}
										editorComponent={AmountEditor}
									/>
									{/* <DateTypeProvider
									for={dateColumns}
								/> */}


									{/* <Table tableComponent={TableComponent} columnExtensions={tableColumnExtensions} /> */}
									<TableColumnResizing defaultColumnWidths={tableColumnExtensions} />
									<TableHeaderRow showSortingControls />
									{/* showGroupingControls */}


									{/* <TableFixedColumns
									leftColumns={leftColumns}
									rightColumns={rightColumns}
								/> */}

									<TableSelection showSelectAll selectByRowClick highlightRow />

									<TableEditRow />
									<TableEditColumn
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
									/>
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

								</Grid>

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

							</Paper>
						)
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
		deleteLeasesAction: Actions.deleteLeases,
		removeLeaseAction: Actions.removeLease,
		openEditLeaseForm: Actions.openEditLeaseForm,
		closeEditLeaseForm: Actions.closeEditLeaseForm,
	}, dispatch);
}

function mapStateToProps({ leases, auth }) {
	return {
		leases: leases.leasesDB,
		bLoadedLeases: leases.bLoadedLeases,
		transactionStatus: leases.transactionStatus,
		filterState: leases.bOpenedFilterPanel,
		summaryState: leases.bOpenedSummaryPanel,
		regionId: auth.login.defaultRegionId,
		LeaseForm: leases.LeaseForm,
		mapViewState: leases.bOpenedMapView,
		locationFilterValue: leases.locationFilterValue,
		searchText: leases.searchText,
		bLeaseFetchStart: leases.bLeaseFetchStart,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaseListContent)));

