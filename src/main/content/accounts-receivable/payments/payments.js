import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
	Hidden,
	Icon,
	IconButton,
	Fab,
	Typography,
	Toolbar,
	CircularProgress,
	Button,
	Input,
	Paper
} from '@material-ui/core';

// theme components
import { FusePageCustom, FuseAnimate } from '@fuse';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

//Custom components
import PaymentListContent from "./paymentsListContent"
import PaymentSearchBar from "./PaymentSearchBar"
import InvoiceForm from "./paymentsForm"
import SummaryPanel from './summaryPanel';
import FilterPanel from './filterPanel';
import PaymentFormModal from './PaymentFormModal';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import classNames from 'classnames';
import { FusePageCustomSidebarScroll } from '@fuse';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


const headerHeight = 80;

const styles = theme => ({
	root: {
		background: "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
		backgroundSize: 'cover',
	},
	layoutRoot: {
		flexDirection: 'row',
		'& .z-9999': {
			height: 64
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
		}
	},
	button: {
		'& span': {
			textTransform: 'none'
		}
	},
	card: {
		width: '100%',
	},
	progress: {
		margin: theme.spacing.unit * 2,
	},
	layoutHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.secondary.main
	},
	layoutRightSidebar: {
		width: 0,
		[theme.breakpoints.down('sm')]: {
			width: 'inherit'
		}
	},
	layoutLeftSidebar: {
		width: 0,
		[theme.breakpoints.down('sm')]: {
			width: 'inherit'
		}
	},
	layoutSidebarHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		display: 'flex',
		alignItems: 'center',
		backgroundColor: theme.palette.secondary.main,
	},
	content: {
		position: 'relative'
	},
	addButton: {
		position: 'absolute',
		bottom: -28,
		left: 16,
		zIndex: 999,
		backgroundColor: theme.palette.primary.light,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	sideButton: {
		backgroundColor: theme.palette.primary.light,
		height: 46,
		width: 46,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	removeButton: {
		position: 'absolute',
		bottom: -28,
		right: 16,
		zIndex: 999,
		backgroundColor: theme.palette.secondary.light,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		}
	},
	container: {
		position: 'relative',
		width: '100%'
	},
	formControl: {
		marginBottom: 24,
		minWidth: 200,
	},
	divider: {
		height: theme.spacing.unit * 2,
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

const newInvoiceState = {
	"MasterTrxTypeListId": "",
	"RegionId": "",
	"RegionName": "",
	"InvoiceId": "",
	"InvoiceNo": "",
	"InvoiceDate": "",
	"DueDate": "",
	"CustomerId": "",
	"CustomerNo": "",
	"CustomerName": "",
	"EBill": "",
	"PrintInvoice": "",
	"InvoiceDescription": "",
	"InvoiceAmount": "",
	"InvoiceTax": "",
	"InvoiceTotal": "",
	"CPI": "",
	"TransactionStatusListId": "",
	"TransactionStatus": "",
	"InvoiceBalanceAmount": "",
	"InvoiceBalanceTax": "",
	"InvoiceBalanceTotal": "",
	"EBillText": "",
	"PrintInvoiceText": "",
	"IsOpen": "",
	"ConsolidatedInvoice": "",
	"ConsolidatedInvoiceId": "",
	"ConsolidatedInvoiceNo": "",
	"CreditId": "",
	"Service": ""
};

class Payments extends Component {
	state = {
		s: '',
		temp: [],
		data: [],
		checkedEbill: true,
		checkedPrint: true,
		selection: [],
		selectAll: false,
		regionId: 0,
		customers: null,
		franchisees: null,
		...newInvoiceState,
		value: '',
		selectedInvoice: null,

		showAlertDialog: false,

	};

	constructor(props) {
		super(props);

		if (!props.bLoadedInvoices) {
			props.getInvoiceStatus(props.regionId);
			props.getInvoices([props.regionId], props.StatusId, props.FromDate, props.ToDate, props.PeriodId,
				props.OpenOrClosed, props.InvoiceTypeId, props.ToPrintOrToEmail, props.SearchText);
		}

		if (!props.bLoadedCustomers) {
			props.getCustomers(props.regionId);
		}
		if (!props.bLoadedFranchisees) {
			props.getFranchisees(props.regionId, props.fstatusId, props.fLocation, props.fLongitude, props.fLatitude, props.fSearchText);
		}
		this.escFunction = this.escFunction.bind(this);
		this.listenScrollEvent = this.listenScrollEvent.bind(this);
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		let bChanged = false;

		const { regionId, StatusId, FromDate, ToDate, PeriodId, OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText } = this.props;
		const { fstatusId, fLocation, fLongitude, fLatitude, fSearchText } = this.props;

		if (this.props.transactionStatus.checkedEbill !== prevProps.transactionStatus.checkedEbill) {
			this.setState({ checkedEbill: !this.state.checkedEbill });
			bChanged = true;
		}

		if (this.props.transactionStatus.checkedPrint !== prevProps.transactionStatus.checkedPrint) {
			this.setState({ checkedPrint: !this.state.checkedPrint });
			bChanged = true;
		}

		if (regionId !== prevProps.regionId) {
			this.props.getCustomers(regionId);
		}
		if (regionId !== prevProps.regionId) {
			this.props.getFranchisees(regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText);
		}
		if (regionId !== prevProps.regionId ||
			FromDate !== prevProps.FromDate ||
			ToDate !== prevProps.ToDate
		) {
			this.props.getInvoices([regionId], StatusId, FromDate, ToDate, PeriodId,
				OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText);
		}

		if (this.props.bInvoicesUpdated && this.props.bInvoicesUpdated !== prevProps.bInvoicesUpdated)
			this.props.getInvoices([regionId], StatusId, FromDate, ToDate, PeriodId,
				OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText);

		if (prevState.s !== this.state.s) {
			this.search(this.state.s);
		}

		if (bChanged)
			this.getInvoicesFromStatus();

		if (prevProps.invoices === null && this.props.invoices !== null) {
			this.getInvoicesFromStatus();
		}

		if (this.props.removedId !== undefined && this.props.removedId !== prevProps.removedId)
			this.props.getInvoices([regionId], StatusId, FromDate, ToDate, PeriodId,
				OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText);
	}

	search(val) {
		const temp = this.state.data.filter(d => {
			return d.InvoiceId.toString().indexOf(val) !== -1 || !val ||
				d.InvoiceNo.indexOf(val) !== -1 ||
				d.InvoiceAmount.toString().indexOf(val) !== -1 ||
				d.InvoiceTotal.toString().indexOf(val) !== -1 ||
				d.InvoiceTax.toString().indexOf(val) !== -1 ||
				d.InvoiceDescription !== null && d.InvoiceDescription.toLowerCase().indexOf(val) !== -1 ||
				d.CustomerName.toLowerCase().indexOf(val) !== -1 ||
				d.CustomerId.toString().indexOf(val) !== -1 ||
				d.CustomerNo.toString().indexOf(val) !== -1 ||
				d.TransactionStatusListId.toString().indexOf(val) !== -1
		});

		this.setState({ temp: temp });
	}

	componentWillMount() {
		this.setState({ checkedOpen: this.props.transactionStatus.checkedEbill });
		this.setState({ checkedOpen: this.props.transactionStatus.checkedPrint });

		this.getInvoicesFromStatus();
		const { regionId, StatusId, FromDate, ToDate, PeriodId, OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText } = this.props;
		const { fstatusId, fLocation, fLongitude, fLatitude, fSearchText } = this.props;

		if (this.props.invoices === null) {
			this.props.getInvoices([regionId], StatusId, FromDate, ToDate, PeriodId,
				OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText);
			this.props.getCustomers(regionId);
			this.props.getFranchisees(regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText);
		}

		this.setState({
			alertTitle: this.props.errorInfo.title,
			alertContent: this.props.errorInfo.message,
			showAlertDialog: this.props.errorInfo.show,
		})
	}

	componentWillReceiveProps(nextProps) {
		const { regionId, StatusId, FromDate, ToDate, PeriodId, OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText } = this.props;

		if (this.props.invoices === null && nextProps.invoices !== null)
			this.getInvoicesFromStatus(nextProps.invoices);
		if (this.props.invoices !== nextProps.invoices)
			this.getInvoicesFromStatus(nextProps.invoices);


		if (nextProps.customers !== null && this.props.customers !== nextProps.customers) {
			let temp = [];
			if (nextProps.customers.Data !== undefined) {
				let regions = nextProps.customers.Data.Regions;

				regions.map(x => {
					temp = [...temp, ...x.CustomerList];
					return true;
				});
			}
			this.setState({ customers: temp });
		}
		if (nextProps.franchisees !== null && this.props.franchisees !== nextProps.franchisees) {
			this.setState({ franchisees: nextProps.franchisees.Data.Region[0].FranchiseeList });
		}

		if (JSON.stringify(this.props.errorInfo) !== JSON.stringify(nextProps.errorInfo)) {
			this.setState({
				alertTitle: nextProps.errorInfo.title,
				alertContent: nextProps.errorInfo.message,
				showAlertDialog: nextProps.errorInfo.show,
			})
		}
	}

	getInvoicesFromStatus = (rawData = this.props.invoices) => {
		if (rawData === null) return;
		if (rawData.Data.Region.length === 0) return;

		let temp0 = rawData.Data.Region[0].InvList;

		this.setState({ temp: temp0 });
		this.setState({ data: temp0 });
	};

	componentDidMount() {
		document.addEventListener("keydown", this.escFunction);
		if (this.props.customers !== null && this.props.customers.Data) {
			let temp = [];
			let regions = this.props.customers.Data.Regions;

			regions.map(x => {
				temp = [...temp, ...x.CustomerList];
				return true;
			});
			this.setState({ customers: temp });
		}
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.escFunction, false);
		window.removeEventListener('scroll', this.listenScrollEvent);
	}

	listenScrollEvent(event) {
		console.log(event);
	}

	escFunction(event) {
		if (event.keyCode === 27) {
			this.setState({ s: '' });
			this.getInvoicesFromStatus();
		}
	}

	onNewInvoice = () => {
		if (this.props.filterState) this.props.toggleFilterPanel();
		if (this.props.summaryState) this.props.toggleSummaryPanel();

		this.props.openNewInvoiceForm();
	};

	handleChange = (event) => {
		this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
	};

	handleSearchChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};
	removeInvoices = () => {
		if (this.state.selection.length === 0) {
			alert("Please choose invoice(s) to delete");
			return;
		}
		if (window.confirm("Do you really want to remove the selected invoice(s)")) {
			this.props.deleteInvoicesAction(this.state.selection, this.props.invoices);
			this.setState({ selection: [], selectAll: false })
		}
	};

	handleCloseAlertDialog = () => {
		this.props.showErrorDialog({
			show: false,
			title: "",
			message: "",
		})
	}

	showPaymentFormModal = () => {
		console.log("this.props.activePaymentRows.length", this.props.activePaymentRows)
		if (this.props.activePaymentRows.length > 100) {
			this.props.showErrorDialog({
				show: true,
				title: "Warning",
				message: "Too many rows selected. Please try to reduce them.",
			})
		} else if (this.props.activePaymentRows.length === 1 && parseFloat(this.getRowData(this.props.payments)[this.props.activePaymentRows].InvoiceBalance) === 0) {
			this.props.showErrorDialog({
				show: true,
				title: "Warning",
				message: "The invoice balace is ZERO.",
			})
		} else if (this.props.activePaymentRows.length > 0) {
			this.props.openPaymentDialog(true)
		} else {
			this.props.showErrorDialog({
				show: true,
				title: "Warning",
				message: "Nothing selected for invoices. Please choose one at least.",
			})
		}
	}
	getRowData(payments) {
		if (!payments || payments.Regions === undefined || payments.Regions.length < 1)
			return [];
		let res = [...payments.Regions[0].Payments]

		res.forEach(x => {
			x.CustomerNameNo = `${x.CustomerName} - ${x.CustomerNo}`;
		})
		console.log("getRowData", res);

		return res;
	}
	render() {
		const { classes, toggleFilterPanel, toggleSummaryPanel, filterState, summaryState,
			openNewInvoiceForm, invoiceForm } = this.props;
		const { selection } = this.state;
		return (
			<React.Fragment>
				<FusePageCustomSidebarScroll
					classes={{
						root: classNames(classes.layoutRoot),
						rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': summaryState }),
						leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': filterState }),
						sidebarHeader: classes.layoutSidebarHeader,
						header: classes.layoutHeader,
						content: classes.content
					}}
					header={
						<div className="flex w-full items-center">
							{(this.state.temp && !invoiceForm.props.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												<FuseAnimate animation="transition.expandIn" delay={300}>
													<Icon className="text-32 mr-12">account_box</Icon>
												</FuseAnimate>
												<FuseAnimate animation="transition.slideLeftIn" delay={300}>
													<Typography variant="h6" className="hidden sm:flex">Accounts Receivable | Payments</Typography>
												</FuseAnimate>
											</div>
										</div>
										<div className="flex flex-shrink items-center">
											<Button variant="contained" color="primary" onClick={this.showPaymentFormModal}>
												<Icon>attach_money</Icon>
												Add Payment
											</Button>

											{/* <FuseAnimate animation="transition.expandIn" delay={300}>
												<Fab color="secondary" aria-label="add"
													className={classNames(classes.sideButton, "mr-12")} onClick={() => this.onNewInvoice()}>
													<Icon>add</Icon>
												</Fab>
											</FuseAnimate> */}

											{/* <FuseAnimate animation="transition.expandIn" delay={300}>
                                                <Fab color="secondary" aria-label="add"
                                                     className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
                                                    <Icon>mail_outline</Icon>
                                                </Fab>
                                            </FuseAnimate>
                                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                                <Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
                                                    <Icon>print</Icon>
                                                </Fab>
                                            </FuseAnimate> */}
										</div>
									</div>
									<div className="flex flex-none items-end" style={{ display: 'none' }}>
										<FuseAnimate animation="transition.expandIn" delay={600}>
											<Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => openNewInvoiceForm}>
												<Icon>add</Icon>
											</Fab>
										</FuseAnimate>
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<Fab color="primary" aria-label="add"
												className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
												<Icon>mail_outline</Icon>
											</Fab>
										</FuseAnimate>
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
												<Icon>print</Icon>
											</Fab>
										</FuseAnimate>
										{selection.length > 0 && (
											<FuseAnimate animation="transition.expandIn" delay={600}>
												<Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={() => this.removeInvoices()}>
													<Icon>delete</Icon>
												</Fab>
											</FuseAnimate>
										)}
									</div>
								</div>
							)}
							{(this.state.temp && invoiceForm.props.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												<FuseAnimate animation="transition.expandIn" delay={300}>
													<Toolbar className="pl-12 pr-0">
														<img className="mr-12" src="assets/images/invoices/invoice-icon-white.png" alt="new invoice" style={{ width: 32, height: 32 }} />
													</Toolbar>
												</FuseAnimate>

												{this.props.invoiceForm.type === 'edit' && (
													<FuseAnimate animation="transition.slideLeftIn" delay={300}>
														<Typography variant="h6" className="hidden sm:flex">Accounts
                                                            Receivable | Edit Invoice</Typography>
													</FuseAnimate>
												)}
												{this.props.invoiceForm.type === 'new' && (
													<FuseAnimate animation="transition.slideLeftIn" delay={300}>
														<Typography variant="h6" className="hidden sm:flex">Accounts
                                                            Receivable | New Payment</Typography>
													</FuseAnimate>
												)}

											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					}
					content={
						<div className="flex-1 flex-col absolute w-full h-full">
							<div className={classNames("flex flex-col h-full")}>
								<Dialog
									open={this.state.showAlertDialog}
									onClose={this.handleCloseAlertDialog}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">{this.state.alertTitle}</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">{this.state.alertContent}</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={this.handleCloseAlertDialog} color="primary" autoFocus>OK</Button>
									</DialogActions>
								</Dialog>

								<PaymentFormModal />

								<PaymentSearchBar />

								<PaymentListContent />
							</div>
						</div>
					}
					leftSidebarHeader={
						<div className={classNames("flex flex-row w-full h-full justify-between p-12 align-middle pr-0", { 'filteropen': filterState })}>
							<h4 style={{ marginBlockStart: '1em' }}>Filter Panel</h4>
							<FuseAnimate animation="transition.expandIn" delay={200}>
								<div>
									<Hidden xsDown>
										<IconButton onClick={(ev) => toggleFilterPanel()}>
											<Icon>close</Icon>
										</IconButton>
									</Hidden>
								</div>
							</FuseAnimate>
						</div>
					}
					leftSidebarContent={
						<FilterPanel />
					}
					rightSidebarHeader={
						<div className="flex flex-row w-full h-full justify-between p-24 align-middle pr-0">
							<h4 style={{ marginBlockStart: '1em' }}>Summary Panel</h4>
							<FuseAnimate animation="transition.expandIn" delay={200}>
								<div>
									<Hidden xsDown>
										<IconButton onClick={(ev) => toggleSummaryPanel()}>
											<Icon>close</Icon>
										</IconButton>
									</Hidden>
								</div>
							</FuseAnimate></div>
					}
					rightSidebarContent={
						<SummaryPanel />
					}
					onRef={instance => {
						this.pageLayout = instance;
					}}
				>
				</FusePageCustomSidebarScroll>
				{(this.props.bACC_fechStart) && (
					<div className={classNames(classes.overlay, "flex-col")}>
						<CircularProgress className={classes.progress} color="secondary" />
						<Typography variant="body2" color="primary">Fetching payments info...</Typography>
					</div>
				)}
				{(this.props.isStartedPaymentsCreated) && (
					<div className={classNames(classes.overlay, "flex-col")}>
						<CircularProgress className={classes.progress} color="secondary" />
						<Typography variant="body2" color="primary">Saving payment for invoices...</Typography>
					</div>
				)}
			</React.Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getInvoices: Actions.getInvoices,
		getInvoiceStatus: Actions.getInvoiceStatus,
		getInvoiceDetail: Actions.getInvoiceDetail,
		toggleFilterPanel: Actions.toggleFilterPanelAccountReceivablePayments,
		toggleSummaryPanel: Actions.toggleSummaryPanelAccountReceivablePayments,
		openNewInvoiceForm: Actions.openNewInvoiceForm,
		openEditInvoiceForm: Actions.openEditInvoiceForm,
		getCustomers: Actions.getSuggestCustomersList,
		getFranchisees: Actions.getFranchisees,

		openPaymentDialog: Actions.openPaymentDialog,
		showErrorDialog: Actions.showErrorDialog,

	}, dispatch);
}

function mapStateToProps({ invoices, auth, customers, franchisees, accountReceivablePayments }) {
	return {
		bACC_fechStart: accountReceivablePayments.bACC_fechStart,
		invoices: invoices.invoicesDB,
		invoiceDetail: invoices.invoiceDetail,
		bLoadedInvoices: invoices.bLoadedInvoices,
		transactionStatus: invoices.transactionStatus,
		invoiceStatus: invoices.invoiceStatus,
		filterState: accountReceivablePayments.bOpenedFilterPanel,
		summaryState: accountReceivablePayments.bOpenedSummaryPanel,
		invoiceForm: invoices.invoiceForm,
		FromDate: invoices.FromDate,
		ToDate: invoices.ToDate,
		StatusId: invoices.StatusId,
		PeriodId: invoices.PeriodId,
		OpenOrClosed: invoices.OpenOrClosed,
		InvoiceTypeId: invoices.InvoiceTypeId,
		ToPrintOrToEmail: invoices.ToPrintOrToEmail,
		SearchText: invoices.SearchText,
		bInvoiceStart: invoices.bInvoiceStart,
		bInvoicesUpdated: invoices.bInvoicesUpdated,

		customers: invoices.customersDB,
		bLoadedCustomers: invoices.bLoadedSuggestCustomers,
		bCustomerFetchStart: invoices.bSuggestCustomersFetchStart,
		removedId: invoices.removedId,

		regionId: auth.login.defaultRegionId,

		franchisees: franchisees.franchiseesDB,
		bLoadedFranchisees: franchisees.bLoadedFranchisees,
		fstatusId: franchisees.statusId,
		fLocation: franchisees.Location,
		fLongitude: franchisees.Longitude,
		fLatitude: franchisees.Latitude,
		fSearchText: franchisees.SearchText,
		bFranchiseesFetchStart: franchisees.bFranchiseesFetchStart,

		activePaymentRows: accountReceivablePayments.activePaymentRows,
		isStartedPaymentsCreated: accountReceivablePayments.isStartedPaymentsCreated,

		errorInfo: accountReceivablePayments.errorInfo,
		payments: accountReceivablePayments.ACC_payments,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Payments)));
