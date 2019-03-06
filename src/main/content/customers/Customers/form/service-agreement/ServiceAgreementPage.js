import React from 'react';
import _ from "lodash";
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Icon, Slide, RadioGroup, Radio, FormControlLabel, Paper, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem, Checkbox, Switch } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

import classNames from 'classnames';

import IncreaseDecreaseContractPage from './IncreaseDecreaseContractPage'

import CancelContractPage from './CancelContractPage';
import SuspendContractPage from './SuspendContractPage';


import Autosuggest from "react-autosuggest"
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import FuseUtils from '@fuse/FuseUtils';
import { NumberFormatCustomNoPrefix, } from '../../../../../../services/utils'

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

const styles = theme => ({
	root: {
		'& .react-grid-Cell': {
			background: '#565656',
			color: 'white',
		},
		'& .react-grid-HeaderCell': {
			background: '#424242',
			color: 'white',
		},
		'& .react-grid-Row:hover .react-grid-Cell': {
			background: ' #3d6d8a',
		},
		'& .react-grid-Canvas, .react-grid-Grid': {
			background: '#7b7b7b',
		}
	},
	button: {
		margin: theme.spacing.unit,
	},
	descriptionText: {
		fontSize: 13
	},


	suggestionsContainerOpen: {
		// position: 'absolute',
		// zIndex: 10,
		// marginTop: theme.spacing.unit,
		// left: 0,
		// right: 0,
		maxHeight: 200,
		overflowY: 'scroll'
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	container: {
		position: 'relative',
		width: '100%'
	},
	input: {
		padding: '12px 14px'
	},
	label: {
		transform: 'translate(14px, 14px) scale(1)'
	},
})
const stateNames = [
	{ Value: "", Text: "" },
	{ Value: "AL", Text: "Alabama" },
	{ Value: "AK", Text: "Alaska" },
	{ Value: "AZ", Text: "Arizona" },
	{ Value: "AR", Text: "Arkansas" },
	{ Value: "CA", Text: "California" },
	{ Value: "CO", Text: "Colorado" },
	{ Value: "CT", Text: "Connecticut" },
	{ Value: "DE", Text: "Delaware" },
	{ Value: "FL", Text: "Florida" },
	{ Value: "GA", Text: "Georgia" },
	{ Value: "HI", Text: "Hawaii" },
	{ Value: "ID", Text: "Idaho" },
	{ Value: "IL", Text: "Illinois" },
	{ Value: "IN", Text: "Indiana" },
	{ Value: "IA", Text: "Iowa" },
	{ Value: "KS", Text: "Kansas" },
	{ Value: "KY", Text: "Kentucky" },
	{ Value: "LA", Text: "Louisiana" },
	{ Value: "ME", Text: "Maine" },
	{ Value: "MD", Text: "Maryland" },
	{ Value: "MA", Text: "Massachusetts" },
	{ Value: "MI", Text: "Michigan" },
	{ Value: "MN", Text: "Minnesota" },
	{ Value: "MS", Text: "Mississippi" },
	{ Value: "MO", Text: "Missouri" },
	{ Value: "MT", Text: "Montana" },
	{ Value: "NE", Text: "Nebraska" },
	{ Value: "NV", Text: "Nevada" },
	{ Value: "NH", Text: "New Hampshire" },
	{ Value: "NJ", Text: "New Jersey" },
	{ Value: "NM", Text: "New Mexico" },
	{ Value: "NY", Text: "New York" },
	{ Value: "NC", Text: "North Carolina" },
	{ Value: "ND", Text: "North Dakota" },
	{ Value: "OH", Text: "Ohio" },
	{ Value: "OK", Text: "Oklahoma" },
	{ Value: "OR", Text: "Oregon" },
	{ Value: "PA", Text: "Pennsylvania" },
	{ Value: "RI", Text: "Rhode Island" },
	{ Value: "SC", Text: "South Carolina" },
	{ Value: "SD", Text: "South Dakota" },
	{ Value: "TN", Text: "Tennessee" },
	{ Value: "TX", Text: "Texas" },
	{ Value: "UT", Text: "Utah" },
	{ Value: "VT", Text: "Vermont" },
	{ Value: "VA", Text: "Virginia" },
	{ Value: "WA", Text: "Washington" },
	{ Value: "DC", Text: "Washington D.C." },
	{ Value: "WV", Text: "West Virginia" },
	{ Value: "WI", Text: "Wisconsin" },
	{ Value: "WY", Text: "Wyoming" }
];
function Transition(props) {
	return <Slide direction="up" {...props} />;
}

function TextMaskPhone(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			// mask={['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			// placeholderChar={'\u2000'}
			placeholderChar={'∗'}
			showMask
			guide
		/>
	);
}

TextMaskPhone.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

class ServiceAgreementPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			// bOpenPaymentDialog: props.bOpenPaymentDialog,
			columns: [
				// {
				//     title: "Payment ID",
				//     name: "PaymentId",
				//     columnName: "PaymentId",
				//     width: 200,
				//     sortingEnabled: true,
				//     filteringEnabled: true,
				//     groupingEnabled: false,
				// },
				// {
				// 	title: "C.Name",
				// 	name: "CustomerNameNo",
				// 	columnName: "CustomerNameNo",
				// 	width: 150,
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },
				// {
				// 	title: "C.Name",
				// 	name: "CustomerName",
				// 	columnName: "CustomerName",
				// 	width: 120,
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },

				// {
				// 	title: "C.Number",
				// 	name: "CustomerNo",
				// 	columnName: "CustomerNo",
				// 	width: 120,
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: true,
				// },
				// {
				// 	title: "Check No",
				// 	name: "CheckNo",
				// 	columnName: 'CheckNo',
				// 	width: 180,
				// 	align: 'center',
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,
				// },
				{
					title: "Invoice No",
					name: "InvoiceNo",
					columnName: "InvoiceNo",
					width: 200,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Invoice Date",
					name: "InvoiceDate",
					columnName: "InvoiceDate",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Due Date",
					name: "DueDate",
					columnName: "DueDate",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Invoice Amount",
					name: "InvoiceAmount",
					columnName: "InvoiceAmount",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				{
					title: "Invoice Balance",
					name: "InvoiceBalance",
					columnName: "InvoiceBalance",
					width: 300,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: false,
				},
				// {
				// 	title: "InvoiceBalance OR",
				// 	name: "InvoiceBalanceOR",
				// 	columnName: 'InvoiceBalanceOR',
				// 	width: 150,
				// 	align: 'center',
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,
				// },
				{
					title: "Amount to Apply",
					name: "PaymentAmount",
					columnName: 'PaymentAmount',
					width: 300,
					align: 'right',
					wordWrapEnabled: true,
					sortingEnabled: true,
					filteringEnabled: true,
					groupingEnabled: false,
					editingEnabled: true,

				},
				// {
				//     title: "Region Name",
				//     name: "RegionName",
				//     columnName: 'RegionName',
				//     width: 120,
				//     align: 'right',
				//     wordWrapEnabled: true,
				//     sortingEnabled: true,
				//     filteringEnabled: true,
				//     groupingEnabled: false,

				// },
				// {
				// 	title: "Check Amount",
				// 	name: "CheckAmount",
				// 	columnName: 'CheckAmount',
				// 	width: 140,
				// 	align: 'right',
				// 	wordWrapEnabled: true,
				// 	sortingEnabled: true,
				// 	filteringEnabled: true,
				// 	groupingEnabled: false,

				// }
			],

			rows: [],
			currencyColumns: [
				'InvoiceAmount', 'InvoiceBalance', 'PaymentAmount'
			],
			customerName: "",
			customerNumber: "",

			PaymentType: "Check",
			ReferenceNo: "",
			PaymentDate: new Date().toISOString().substr(0, 10),
			PaymentNote: "",
			PaymentAmount: 0,
			overpayment: 0,
			errorMsg: "",

			paymentDlgPayloads: {
				open: false,
				paymentType: "Check",
				paymentAmount: 0
			},
			step: 0,
			franchiseeServiceTypes: [],
			franchiseeBillingTypes: [],

			EffectiveDate: new Date().toISOString().substr(0, 10),

			execTitles: [],
			note: '',
			SignDate: moment().format('YYYY-MM-DD'),
			StartDate: moment().format('YYYY-MM-DD'),
			ExpirationDate: moment().format('YYYY-MM-DD'),


			addressColumns: [
				{
					title: "Company Name",
					name: "CompanyName",
					columnName: "CompanyName",
					width: 50,
				},
				{
					title: "Address 1",
					name: "Address1",
					columnName: "Address1",
					width: 80,
				},
				{
					title: "Address 2",
					name: "Address2",
					columnName: "Address2",
					width: 80,
				},
				{
					title: "City",
					name: "City",
					columnName: "City",
					width: 80,
				},
				{
					title: "State",
					name: "State",
					columnName: "State",
					width: 50,
				},
				{
					title: "Zip / Postal",
					name: "ZipPostal",
					columnName: "ZipPostal",
					width: 80,
				},
			],
			addressRows: [{
				CompanyName: "",
				Address1: "",
				Address2: "",
				City: "",
				State: "",
				ZipPostal: "",
			}],

			contactsColumns: [
				{
					title: "First",
					name: "First",
					columnName: "First",
					width: 80,
				},
				{
					title: "Last",
					name: "Last",
					columnName: "Last",
					width: 80,
				},
				{
					title: "Office Phone",
					name: "OfficePhone",
					columnName: "OfficePhone",
					width: 80,
				},
				{
					title: "Mobile Phone",
					name: "MobilePhone",
					columnName: "MobilePhone",
					width: 80,
				},
				{
					title: "Email",
					name: "Email",
					columnName: "Email",
					width: 80,
				},
			],
			contactsRows: [{
				First: "Sample First",
				Last: "Sample Last",
				OfficePhone: "Sample OfficePhone",
				MobilePhone: "Sample MobilePhone",
				Email: "Sample Email",
			}],
			childCustomerName: "",
			suggestions: [],
		};
		// this.commitChanges = this.commitChanges.bind(this);
		this.props.getLogCallCustomerServiceTypes()

		this.props.getFranchiseeServiceTypes(this.props.regionId)
		this.props.getFranchiseeBillingTypes(this.props.regionId)
	}

	commitChangesAddresses = ({ added, changed, deleted }) => {
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
	commitChangesContacts = ({ added, changed, deleted }) => {
		let rows = this.state.contactsRows;
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
		this.setState({ contactsRows: rows });
	}
	componentWillMount() {
		console.log("componentWillMount")

		let execTitles = []
		if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
			execTitles = this.props.accountExecutiveList.Data.sort();
		}
		if (this.props.activeCustomer && this.props.activeCustomer.Data) {
			const {
				cont_bill,

				flag,
				arstatus,

				contract_lenght,
				slsmn_no,
				date_sign,
				date_start,
				exp_date,

				po_1,
				cpiadj,
				crteinv,
				prntpd,
				tax_exempt,

				invoice_date,
				billing_frequency,
				ebill,
				ebill_email,
				billing_term,
				inv_msg,
				natacct,
				parent,

				bill_name,
				bill_addr,
				bill_addr2,
				bill_city,
				bill_state,
				bill_zip,
				bill_phone,
				sameBillingAsMain,

				sqr_ft,
				cleantimes,
				cleanper,

				mon, tue, wed, thu, fri, sat, sun, wkndTF,
				detailed_cleaning_instructions,
			} = this.props.activeCustomer.Data

			this.setState({
				customerServiceTypes: this.props.lists.customerServiceTypes,
				franchiseeServiceTypes: this.props.lists.franchiseeServiceTypes,
				franchiseeBillingTypes: this.props.lists.franchiseeBillingTypes,
				execTitles: execTitles,


				cont_bill,
				flag,
				arstatus,

				contract_lenght,
				slsmn_no,
				date_sign: FuseUtils.getDateString(date_sign),
				date_start: FuseUtils.getDateString(date_start),
				exp_date: FuseUtils.getDateString(exp_date),

				po_1,
				cpiadj,
				crteinv,
				prntpd,
				tax_exempt,

				invoice_date,
				billing_frequency,
				ebill,
				ebill_email,
				billing_term,
				inv_msg,
				natacct,
				parent,

				bill_name,
				bill_addr,
				bill_addr2,
				bill_city,
				bill_state,
				bill_zip,
				bill_phone,
				sameBillingAsMain,

				sqr_ft,
				cleantimes,
				cleanper,

				mon, tue, wed, thu, fri, sat, sun, wkndTF,
				detailed_cleaning_instructions,

			})
		}
		this.initCustomerInfo()

	}
	componentDidMount() {
		// if (this.props.bOpenPaymentDialog === true) {
		// 	this.checkValidations()
		// }
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		// if (nextProps.payments !== this.props.payments) {
		// 	console.log("componentWillReceiveProps payments")
		// 	this.setRowData(nextProps.payments)
		// }
		if (nextProps.customers !== this.props.customers) {
			this.setState({
				customers: FuseUtils.getCustomerListFromDb(nextProps.customers),
			});
		}
		// if (!_.isEqual(nextProps.activePaymentRows, this.props.activePaymentRows)) {
		// 	console.log("componentWillReceiveProps activePaymentRows", nextProps.activePaymentRows, this.props.activePaymentRows)
		// 	this.setRowData(this.props.payments, nextProps.activePaymentRows)
		// }
		// if (!_.isEqual(nextProps.paymentDlgPayloads, this.props.paymentDlgPayloads)) {
		// 	this.setState({
		// 		paymentDlgPayloads: nextProps.paymentDlgPayloads,
		// 		PaymentAmount: nextProps.paymentDlgPayloads.paymentAmount,
		// 		PaymentType: nextProps.paymentDlgPayloads.paymentType
		// 	})

		// 	// if (nextProps.bOpenPaymentDialog === true) {
		// 	// 	this.checkValidations()
		// 	// }
		// }
		if (nextProps.regionId !== this.props.regionId) {
			this.props.getFranchiseeServiceTypes(nextProps.regionId)
			this.props.getFranchiseeBillingTypes(nextProps.regionId)
		}
		if (!_.isEqual(nextProps.activeCustomer, this.props.activeCustomer)) {
			this.initCustomerInfo(nextProps.activeCustomer)
		}
		// if (nextProps.activeCustomer && nextProps.activeCustomer.Data && !_.isEqual(nextProps.activeCustomer.Data, this.props.activeCustomer.Data)) {
		if (nextProps.activeCustomer && this.props.activeCustomer) {
			const {
				cont_bill,

				flag,
				arstatus,

				contract_lenght,
				slsmn_no,
				date_sign,
				date_start,
				exp_date,

				po_1,
				cpiadj,
				crteinv,
				prntpd,
				tax_exempt,

				invoice_date,
				billing_frequency,
				ebill,
				ebill_email,
				billing_term,
				inv_msg,
				natacct,
				parent,

				bill_name,
				bill_addr,
				bill_addr2,
				bill_city,
				bill_state,
				bill_zip,
				bill_phone,
				sameBillingAsMain,

				sqr_ft,
				cleantimes,
				cleanper,

				mon, tue, wed, thu, fri, sat, sun, wkndTF,
				detailed_cleaning_instructions,
			} = nextProps.activeCustomer.Data

			this.setState({
				cont_bill,
				flag,
				arstatus,

				contract_lenght,
				slsmn_no,
				date_sign: FuseUtils.getDateString(date_sign),
				date_start: FuseUtils.getDateString(date_start),
				exp_date: FuseUtils.getDateString(exp_date),

				po_1,
				cpiadj,
				crteinv,
				prntpd,
				tax_exempt,

				invoice_date,
				billing_frequency,
				ebill,
				ebill_email,
				billing_term,
				inv_msg,
				natacct,
				parent,

				bill_name,
				bill_addr,
				bill_addr2,
				bill_city,
				bill_state,
				bill_zip,
				bill_phone,
				sameBillingAsMain,

				sqr_ft,
				cleantimes,
				cleanper,

				mon, tue, wed, thu, fri, sat, sun, wkndTF,
				detailed_cleaning_instructions,

			})
		}
	}
	initCustomerInfo = (activeCustomerInfo = this.props.activeCustomer) => {
		if (activeCustomerInfo && activeCustomerInfo.Data) {
			this.setState({
				SA_Amount: activeCustomerInfo.Data.cont_bill,
				franchieesesToOffer: activeCustomerInfo.Data.AssignedFranchisees,
			})
		}
	}

	handleStep = () => {
		this.setState({
			step: this.state.step === 0 ? 1 : 0
		})

	}
	IncreaseDecreaseContract = () => {
		this.props.showIncreaseDecreaseContractModalForm(true)
	}

	showCancelContractPage = () => {
		this.props.showCancelContractPage(true)
	}
	showSuspendContractPage = () => {
		this.props.showSuspendContractPage(true)
	}

	handleChangeChecked = name => event => {
		const checked = event.target.checked
		this.setState({ [name]: checked });
		if (name === "sameBillingAsMain") {
			this.props.updateNewCustomerParam('sameBillingAsMain', checked)
			if (checked) {
				this.props.updateNewCustomerParam('bill_name', this.props.activeCustomer.Data.cus_name)
				this.props.updateNewCustomerParam('bill_phone', this.props.activeCustomer.Data.cus_phone)
				this.props.updateNewCustomerParam('bill_addr', this.props.activeCustomer.Data.cus_addr)
				this.props.updateNewCustomerParam('bill_addr2', this.props.activeCustomer.Data.cus_addr2)
				this.props.updateNewCustomerParam('bill_city', this.props.activeCustomer.Data.cus_city)
				this.props.updateNewCustomerParam('bill_state', this.props.activeCustomer.Data.cus_state)
				this.props.updateNewCustomerParam('bill_zip', this.props.activeCustomer.Data.cus_zip)

				// this.setState({
				// 	bill_name: this.props.activeCustomer.Data.cus_name,
				// 	bill_phone: this.props.activeCustomer.Data.cus_phone,

				// 	bill_addr: this.props.activeCustomer.Data.cus_addr,
				// 	bill_addr2: this.props.activeCustomer.Data.cus_addr2,

				// 	bill_city: this.props.activeCustomer.Data.cus_city,
				// 	bill_state: this.props.activeCustomer.Data.cus_state,
				// 	bill_zip: this.props.activeCustomer.Data.cus_zip,
				// })
			}
		}
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
			errorMsg: ""
		});
		if (name === 'length' && event.target.value === 1) {
			this.setState({ TermMonths: 0 });
		}
	};

	//
	// customer name suggestion
	//
	escapeRegexCharacters(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	getSuggestions(value) {
		const escapedValue = this.escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return [];
		}

		const regex = new RegExp('^' + escapedValue, 'i');
		const { customers } = this.state
		if (customers == undefined) return [];
		return customers.filter(x => regex.test(x.CustomerName));
	}

	getSuggestionValue(suggestion) {
		return suggestion.CustomerName;
	}
	renderSuggestion(suggestion, { query, isHighlighted }) {
		const matches = AutosuggestHighlightMatch(suggestion.CustomerName, query);
		const parts = AutosuggestHighlightParse(suggestion.CustomerName, matches);

		return (
			<MenuItem selected={isHighlighted} component="div">
				<div>
					{parts.map((part, index) => {
						return part.highlight ? (
							<span key={String(index)} style={{ fontWeight: 700 }}>
								{part.text}
							</span>
						) : (
								<strong key={String(index)} style={{ fontWeight: 300 }}>
									{part.text}
								</strong>
							);
					})}
				</div>
			</MenuItem>
		);
	}
	onChange = (event, { newValue, method }) => {
		this.setState({
			childCustomerName: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};
	renderInputComponent = (inputProps) => {
		const { classes, inputRef = () => { }, ref, ...other } = inputProps;

		return (
			<TextField
				fullWidth
				// variant="outlined"
				label="Customer Name"
				InputProps={{
					inputRef: node => {
						ref(node);
						inputRef(node);
					},
					classes: {
						input: classes.input,
					},
				}}
				InputLabelProps={{
					classes: { outlined: classes.label }
				}}
				required
				{...other}
				autoFocus={true}
			/>
		);
	};
	handleChangeCustomerInfoProps = name => event => {
		let value = event.target.value
		switch (name) {
			case "Latitude":
			case "Longitude":
			case "overpayment":
			case "royalty":
			case "sales_tax":
			case "cont_bill":
			case "business":
			case "add_pct":
			case "ad_cur":
			case "tech_pct":
				value = parseFloat("0" + value)
				break
			case "billing_term":
			case "contract_lenght":
			case "sys_cust":
			case "cleantimes":
			case "parent":
			case "xregionid":
			case "xsys_cust":
			case "sqr_ft":
				value = parseInt("0" + value)
				break
		}
		if (name === "contract_lenght" && [0, 2].indexOf(value) === -1) {
			this.setState({ cont_bill: 0 })
			this.props.updateNewCustomerParam("cont_bill", 0)
		}
		this.setState({ [name]: value })
		this.props.updateNewCustomerParam(name, value)

	}
	handleChangeCustomerInfoPropsChecked = name => event => {
		let checked = event.target.checked
		switch (name) {
			case "parent":
				checked = checked ? 1 : 0
			case "tax_exempt":
				checked = checked ? "Y" : "N"
				break
			case "cpiadj":
				checked = checked ? "T" : "F"
				break
		}
		this.setState({ [name]: checked })
		this.props.updateNewCustomerParam(name, checked)
	}
	render() {
		const { classes, customerForm } = this.props;
		const { execTitles,
			addressRows,
			addressColumns,
			contactsRows,
			contactsColumns,
		} = this.state;

		const { childCustomerName, suggestions } = this.state;
		const inputProps = {
			classes,
			placeholder: 'Type a customer name...',
			value: childCustomerName,
			onChange: this.onChange
		};

		return (
			<div className="flex flex-col flex-1">
				{!this.props.increaseDecreaseContractModalForm.open && !this.props.cancelContractPage.open && !this.props.suspendContractPage.open &&
					<div className={classNames("flex flex-col")}>
						{/* <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}> */}
						<div className={classNames('items-center')}>
							<div xs={12} sm={12} md={12} className="flex flex-row justify-between items-center">
								<FormControl className={classNames(classes.formControl)} style={{ marginTop: 5, minWidth: "100px", width: "30%" }}>
									<InputLabel shrink htmlFor="contract_lenght">Type</InputLabel>
									<Select
										native
										value={this.state.contract_lenght || ''}
										onChange={this.handleChangeCustomerInfoProps('contract_lenght')}
										inputProps={{
											name: 'contract_lenght',
											id: 'contract_lenght',
										}}
									>
										{["Recurring", "One-Time", "Variable"].map((x, index) => (
											<option key={index} value={index}>{x}</option>
										))}
									</Select>
								</FormControl>

								{customerForm.props.open && customerForm.type === "edit" && (this.props.activeCustomer && this.props.activeCustomer.Data) &&
									<div>
										{['C', 'S'].indexOf(this.props.activeCustomer.Data.flag) === -1 &&
											<Button
												variant="contained"
												color="primary"
												className={classNames(classes.button, "pr-12 pl-24 mr-12")}
												onClick={this.IncreaseDecreaseContract}
											>Increase/Decrease<Icon fontSize="small">keyboard_arrow_right</Icon>
											</Button>}

										{['C', 'S'].indexOf(this.props.activeCustomer.Data.flag) === -1 &&
											<Button
												variant="contained"
												color="primary"
												onClick={this.showSuspendContractPage}
												className={classNames(classes.button, "pr-12 pl-24")}
											>Suspend Account<Icon fontSize="small">keyboard_arrow_right</Icon>
											</Button>}

										{['C'].indexOf(this.props.activeCustomer.Data.flag) === -1 &&
											<Button
												variant="contained"
												color="primary"
												onClick={this.showCancelContractPage}
												className={classNames(classes.button, "pr-12 pl-24")}
											>Cancel Contract<Icon fontSize="small">keyboard_arrow_right</Icon>
											</Button>}

										{['S'].indexOf(this.props.activeCustomer.Data.flag) > -1 &&
											<Button
												variant="contained"
												color="primary"
												className={classNames("")}>
												<Icon fontSize="small" className={classNames("mr-6")}>replay</Icon>
												Restart
											</Button>}
									</div>}
							</div>

							<div xs={12} sm={12} md={12} className="flex flex-row">
								{[0, 2].indexOf(this.state.contract_lenght) > -1 &&
									<TextField
										id="cont_bill"
										label="Monthly Contract Amount"
										required
										className={classes.textField}
										InputLabelProps={{ shrink: true }}
										value={this.state.cont_bill || ''}
										onChange={this.handleChangeCustomerInfoProps('cont_bill')}
										margin="dense"
										// variant="outlined"
										style={{ minWidth: "100px", width: "30%" }}

										InputProps={{
											readOnly: false,
											startAdornment: <InputAdornment position="start" className="mr-4">$</InputAdornment>,
											// inputComponent: NumberFormatCustomNoPrefix,
											classes: {
												input: classNames('text-right')
											},
											inputComponent: NumberFormatCustomNoPrefix
										}}
									/>
								}
							</div>
							<div xs={12} sm={12} md={12} className="flex flex-row">
								<FormControl className={classNames(classes.formControl)} style={{ marginTop: 5, minWidth: 200, width: "30%" }}>
									<InputLabel shrink htmlFor="slsmn_no">Account Executive</InputLabel>
									<Select
										native
										value={this.state.slsmn_no || ''}
										onChange={this.handleChangeCustomerInfoProps('slsmn_no')}
										inputProps={{
											name: 'slsmn_no',
											id: 'slsmn_no',
										}}
									>
										{execTitles.map((x, index) => (
											<option key={index} value={x.UserId}>{x.FullName}</option>
										))}
									</Select>
								</FormControl>
							</div>
							<div xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="date"
									id="SignDate"
									label="Sign Date *"
									className={classNames(classes.textField, "mr-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.date_sign || ''}
									onChange={this.handleChangeCustomerInfoProps('date_sign')}
									margin="dense"
									// variant="outlined"
									style={{ width: "20%", minWidth: "180px" }}
								/>
								<TextField
									type="date"
									id="StartDate"
									label="Start Date *"
									className={classNames(classes.textField, "mr-6 ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.date_start || ''}
									onChange={this.handleChangeCustomerInfoProps('date_start')}
									margin="dense"
									// variant="outlined"
									style={{ width: "20%", minWidth: "180px" }}
								/>

								<TextField
									type="date"
									id="ExpirationDate"
									label="Expiration Date *"
									className={classNames(classes.textField, "ml-6")}
									InputLabelProps={{
										shrink: true
									}}
									value={this.state.exp_date || ''}
									onChange={this.handleChangeCustomerInfoProps('exp_date')}
									margin="dense"
									// variant="outlined"
									style={{ width: "20%", minWidth: "180px" }}
								/>
							</div>
						</div>
						{/* </GridContainer> */}

						<Typography variant="h6" className="mt-24 mb-12">Billing</Typography>

						{/* <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}> */}
						<div className={classNames('items-center')}>

							<div xs={12} sm={12} md={12} className="flex flex-col">
								<div className='flex w-full items-center'>
									<h3 className="">Billing Address</h3>
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeChecked('sameBillingAsMain')} checked={this.state.sameBillingAsMain} />
										}
										label="Same as main"
										className="ml-24"
									/>
								</div>
								<div className='flex w-full'>
									<TextField
										id="bill_name"
										label="Name"
										className={classNames(classes.textField, 'pr-12')}
										value={this.state.bill_name || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_name')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										InputProps={{ readOnly: FuseUtils.parseBoolean(this.state.sameBillingAsMain) }}
										style={{ width: '50%' }} />
									<FormControl className={classNames(classes.formControl, 'mr-6')} style={{ flex: 1 }}>
										<TextField
											id="bill_phone"
											label="Phone"
											className={classes.textField}
											// onChange={this.handleChange('customerPhone')}
											margin="dense"
											InputLabelProps={{
												shrink: true
											}}
											InputProps={{
												readOnly: FuseUtils.parseBoolean(this.state.sameBillingAsMain),
												inputComponent: TextMaskPhone,
												maxLength: 40,
												value: this.state.bill_phone || '',
												onChange: this.handleChangeCustomerInfoProps('bill_phone')
											}}
											// variant="outlined"
											fullWidth
											required
										/>
									</FormControl>
								</div>
								<div className='flex w-full'>
									<TextField
										id="bill_addr"
										label="Address"
										className={classNames(classes.textField, 'pr-12')}
										InputProps={{ readOnly: FuseUtils.parseBoolean(this.state.sameBillingAsMain) }}
										value={this.state.bill_addr || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_addr')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '30%' }} />
									<TextField
										id="bill_addr2"
										label="Address2"
										className={classNames(classes.textField, 'pr-12')}
										InputProps={{ readOnly: FuseUtils.parseBoolean(this.state.sameBillingAsMain) }}
										value={this.state.bill_addr2 || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_addr2')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '27%' }} />
									<TextField
										id="bill_city"
										label="City"
										className={classNames(classes.textField, 'pr-12')}
										InputProps={{ readOnly: FuseUtils.parseBoolean(this.state.sameBillingAsMain) }}
										value={this.state.bill_city || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_city')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '20%' }} />

									<FormControl className={classNames(classes.formControl, 'pr-12')} style={{ marginTop: 5, width: '7%' }}>
										<InputLabel shrink htmlFor="bill_state">State</InputLabel>
										<Select
											native
											value={this.state.bill_state || ''}
											onChange={this.handleChangeCustomerInfoProps('bill_state')}
											inputProps={{
												name: 'bill_state',
												id: 'bill_state',
											}}
										>
											{stateNames.map((option, index) => (
												<option key={index} value={option.Value}>
													{option.Value}
												</option>
											))}
										</Select>
									</FormControl>

									<TextField
										id="bill_zip"
										label="Zip/Postal"
										className={classes.textField}
										InputProps={{ readOnly: FuseUtils.parseBoolean(this.state.sameBillingAsMain) }}
										value={this.state.bill_zip || ''}
										onChange={this.handleChangeCustomerInfoProps('bill_zip')}
										margin="dense"
										// variant="outlined"
										InputLabelProps={{ shrink: true }}
										style={{ width: '13%' }} />
								</div>
							</div>
							<div xs={12} sm={12} md={12} className="flex flex-row justify-between">
								<div className="flex flex-col justify-around">
									<TextField
										id="PONumer"
										label="PO Numer"
										className={classes.textField}
										value={this.state.po_1 || ''}
										onChange={this.handleChangeCustomerInfoProps('po_1')}
										InputLabelProps={{ shrink: true }}
										margin="dense"
										// variant="outlined"
										style={{ width: "100%", minWidth: "180px" }}
									/>
									<TextField
										id="InvoiceDate"
										label="Invoice Date"
										className={classNames(classes.textField, "")}
										select
										InputLabelProps={{ shrink: true }}
										value={this.state.invoice_date || 'BOM'}
										onChange={this.handleChangeCustomerInfoProps('invoice_date')}
										margin="dense"
										// variant="outlined"
										style={{ width: "100%" }}
									>
										{["BOM", "EOM"].map((x, index) => (
											<MenuItem key={index} value={x}>{x}</MenuItem>
										))}
									</TextField>

									<TextField
										id="BillingFrequency"
										label="Billing Frequency"
										select
										InputLabelProps={{
											shrink: true
										}}
										className={classNames(classes.textField, "")}
										value={this.state.billing_frequency || ''}
										onChange={this.handleChangeCustomerInfoProps('billing_frequency')}
										margin="dense"
										// variant="outlined"
										style={{ width: "100%" }}
									>
										{["Monthly"].map((x, index) => (
											<MenuItem key={index} value={x}>{x}</MenuItem>
										))}
									</TextField>
								</div>
								<div className="flex flex-col justify-around">
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('cpiadj')} checked={FuseUtils.parseBoolean(this.state.cpiadj)} />
										}
										label="CPI Increase"
										style={{ marginRight: "30px" }}

									/>


									<div className="flex">
										<FormControlLabel
											control={
												<Switch
													checked={FuseUtils.parseBoolean(this.state.ebill)}
													onChange={this.handleChangeCustomerInfoPropsChecked('ebill')}
													value="ebill"
												/>
											}
											label="E-Billing"
										// style={{ width: '40%' }}
										/>

										<TextField
											type="email"
											id="Email"
											label="Email"
											className={classes.textField}
											value={this.state.ebill_email || ''}
											onChange={this.handleChangeCustomerInfoProps('ebill_email')}
											InputLabelProps={{ shrink: true }}
											margin="dense"
										// variant="outlined"
										// style={{ width: '60%' }}
										/>
									</div>

									<FormControl className={classNames(classes.formControl)} style={{ marginTop: 5 }} fullWidth>
										<InputLabel shrink htmlFor="billing_term">Term</InputLabel>
										<Select
											native
											value={this.state.billing_term || ''}
											onChange={this.handleChangeCustomerInfoProps('billing_term')}
											inputProps={{
												name: 'billing_term',
												id: 'billing_term',
											}}
										>
											{["Due Upon Receipt", "EOM", "Net 30", "Net 40", "Net 45", "Net 60"].map((x, index) => (
												<option key={index} value={index + 1}>{x}</option>
											))}
										</Select>
									</FormControl>

									{this.props.customerForm.type === "edit" &&
										// <TextField
										// 	id="ARStatus"
										// 	label="AR Status"
										// 	select
										// 	className={classNames(classes.textField, "ml-6")}
										// 	InputLabelProps={{ shrink: true }}
										// 	value={this.state.ARStatus || 'Normal'}
										// 	onChange={this.handleChange('ARStatus')}
										// 	margin="dense"
										// 	// variant="outlined"
										// 	style={{ width: '100%' }}
										// >
										// 	{["Bankruptcy", "In Litigation", "Normal", "Referred to Collections", "Slow Pay", "Uncollectable", "National Accoints", "AutoPay", "TEST"].map((x, index) => (
										// 		<MenuItem key={index} value={x}>{x}</MenuItem>
										// 	))}
										// </TextField>
										<FormControl className={classNames(classes.formControl)} style={{ marginTop: 5 }} fullWidth>
											<InputLabel shrink htmlFor="arstatus">AR Status</InputLabel>
											<Select
												native
												value={this.state.arstatus || 'Normal'}
												onChange={this.handleChangeCustomerInfoProps('arstatus')}
												inputProps={{
													name: 'arstatus',
													id: 'arstatus',
												}}
											>
												{["Bankruptcy", "In Litigation", "Normal", "Referred to Collections", "Slow Pay", "Uncollectable", "National Accoints", "AutoPay", "TEST"].map((x, index) => (
													<option key={index} value={x}>{x}</option>
												))}
											</Select>
										</FormControl>
									}


								</div>
								<div className="flex flex-col justify-between">
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('crteinv')} checked={FuseUtils.parseBoolean(this.state.crteinv)} />
										}
										label="Create Invoice"
										className="mr-36"
									/>
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('prntpd')} checked={FuseUtils.parseBoolean(this.state.prntpd)} />
										}
										label="Print Past Due"
										className="mr-36"
									/>
									<FormControlLabel
										control={
											<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('tax_exempt')} checked={FuseUtils.parseBoolean(this.state.tax_exempt)} />
										}
										label="Tax Exempt"
										className="mr-36"
									/>
									<RadioGroup
										aria-label="Location"
										name="Location"
										className={classes.group}
										value={this.state.InvoiceType}
									>
										<FormControlLabel
											control={
												<Radio onChange={this.handleChange('InvoiceType')} />
											}
											label="Consolidated Invoice"
											value="Consolidated Invoice"
										/>
										<FormControlLabel
											control={
												<Radio onChange={this.handleChange('InvoiceType')} />
											}
											label="Separate Invoice"
											value="Separate Invoice"
										/>
									</RadioGroup>
								</div>

							</div>

							<div xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="Notes"
									label="Notes"
									multiline
									rows="2"
									rowsMax="2"
									className={classes.textField}
									value={this.state.inv_msg || ''}
									onChange={this.handleChangeCustomerInfoProps('inv_msg')}
									InputLabelProps={{ shrink: true }}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
							</div>

							<div xs={12} sm={12} md={12} className="flex flex-col">
								<div className="flex justify-around">
									<FormControlLabel
										control={
											<Checkbox
												checked={FuseUtils.parseBoolean(this.state.natacct)}
												onChange={this.handleChangeCustomerInfoPropsChecked('natacct')}
												value="natacct"
											/>
										}
										label="National Account"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={FuseUtils.parseBoolean(this.state.parent)}
												onChange={this.handleChangeCustomerInfoPropsChecked('parent')}
												value="parent"
											/>
										}
										label="Child Account"
									/>
								</div>

								{this.state.ChildAccount && (
									<div className="flex flex-col">
										<Autosuggest
											className={classNames(classes.textfield)}
											theme={{
												container: classNames(classes.container),
												suggestionsContainerOpen: classes.suggestionsContainerOpen,
												suggestionsList: classes.suggestionsList,
												suggestion: classes.suggestion,
											}}
											renderSuggestionsContainer={options => (
												<Paper {...options.containerProps} square>
													{options.children}
												</Paper>
											)}
											renderInputComponent={this.renderInputComponent}

											suggestions={suggestions}
											onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
											onSuggestionsClearRequested={this.onSuggestionsClearRequested}
											getSuggestionValue={this.getSuggestionValue}
											renderSuggestion={this.renderSuggestion}
											inputProps={inputProps}
											fullWidth
										/>

										<TextField
											id="StoreNumber"
											label="Store Number"
											className={classes.textField}
											onChange={this.handleChange('StoreNumber')}
											margin="dense"
											// variant="outlined"
											fullWidth />
									</div>
								)}


							</div>

						</div>
						{/* </GridContainer> */}

						<Typography variant="h6" className="mt-24 mb-12">Cleaning Schedule</Typography>

						{/* <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}> */}
						<div className={classNames('items-center')}>
							{/* <div xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="ServiceType"
									label="Service Type *"
									select
									InputLabelProps={{ shrink: true }}
									className={classes.textField}
									value={this.state.ServiceType === undefined ? "" : this.state.ServiceType}
									onChange={this.handleChange('ServiceType')}
									margin="dense"
									// variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								>
									{[].map((x, index) => (
										<MenuItem key={index} value={x}>{x}</MenuItem>
									))}
								</TextField>
							</div> */}

							<div xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="number"
									inputProps={{ min: "0", max: "999999", step: "1" }}
									id="SquareFootage"
									label="Square Footage"
									className={classes.textField}
									value={this.state.sqr_ft || ''}
									onChange={this.handleChangeCustomerInfoProps('sqr_ft')}
									InputLabelProps={{ shrink: true }}
									margin="dense"
									// variant="outlined"
									style={{ minWidth: "100px", width: "30%" }}
								/>

							</div>

							<div xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="time"
									id="StartTime"
									label="Start Time *"
									className={classNames(classes.textField, "mr-6")}
									InputLabelProps={{ shrink: true }}
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
									InputLabelProps={{ shrink: true }}
									value={this.state.EndTime}
									onChange={this.handleChange('EndTime')}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
							</div>

							<div xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									type="number"
									id="CleanTimes"
									label="Clean Times *"
									className={classNames(classes.textField, "mr-6")}
									value={this.state.cleantimes || ''}
									onChange={this.handleChangeCustomerInfoProps('cleantimes')}
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
									onChange={this.handleChangeCustomerInfoProps('cleanper')}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								>
									{["Month", "Week", "Event"].map((x, index) => (
										<MenuItem key={index} value={x}>{x}</MenuItem>
									))}
								</TextField>
							</div>

							<div xs={12} sm={12} md={12} className="flex flex-row justify-start">
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('mon')} checked={FuseUtils.parseBoolean(this.state.mon)} />}
									label="Mon"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('tue')} checked={FuseUtils.parseBoolean(this.state.tue)} />}
									label="Tue"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('wed')} checked={FuseUtils.parseBoolean(this.state.wed)} />}
									label="Wed"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('thu')} checked={FuseUtils.parseBoolean(this.state.thu)} />}
									label="Thu"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('fri')} checked={FuseUtils.parseBoolean(this.state.fri)} />}
									label="Fri"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('sat')} checked={FuseUtils.parseBoolean(this.state.sat)} />}
									label="Sat"
									className="mr-36"

								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('sun')} checked={FuseUtils.parseBoolean(this.state.sun)} />}
									label="Sun"
									className="mr-36"
								/>
								<FormControlLabel
									control={<Checkbox onChange={this.handleChangeCustomerInfoPropsChecked('wkndTF')} checked={FuseUtils.parseBoolean(this.state.wkndTF)} />}
									label="Weekends"
								/>
							</div>

							<div xs={12} sm={12} md={12} className="flex flex-row">
								<TextField
									id="DetailedCleaningInstructions"
									label="Detailed Cleaning Instructions"
									multiline
									rows="3"
									rowsMax="3"
									className={classes.textField}
									value={this.state.detailed_cleaning_instructions}
									onChange={this.handleChangeCustomerInfoProps('detailed_cleaning_instructions')}
									InputLabelProps={{ shrink: true }}
									margin="dense"
									// variant="outlined"
									style={{ width: '100%' }}
								/>
							</div>
							{/* </GridContainer> */}
						</div>
					</div>
				}
				{/* <IncreaseDecreaseContractModal /> */}
				{this.props.increaseDecreaseContractModalForm.open &&
					<IncreaseDecreaseContractPage />
				}
				{this.props.cancelContractPage.open &&
					<CancelContractPage />
				}
				{this.props.suspendContractPage.open &&
					<SuspendContractPage />
				}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openPaymentDialog: Actions.openPaymentDialog,
		createAccountReceivablePayment: Actions.createAccountReceivablePayment,

		getLogCallCustomerServiceTypes: Actions.getLogCallCustomerServiceTypes,

		getFranchiseeServiceTypes: Actions.getFranchiseeServiceTypes,
		getFranchiseeBillingTypes: Actions.getFranchiseeBillingTypes,
		showIncreaseDecreaseContractModalForm: Actions.showIncreaseDecreaseContractModalForm,
		showCancelContractPage: Actions.showCancelContractPage,
		showSuspendContractPage: Actions.showSuspendContractPage,

		updateNewCustomerParam: Actions.updateNewCustomerParam,
	}, dispatch);
}

function mapStateToProps({ customers, accountReceivablePayments, auth }) {
	return {
		regionId: auth.login.defaultRegionId,
		// bOpenPaymentDialog: accountReceivablePayments.bOpenPaymentDialog,
		// activePaymentRows: accountReceivablePayments.activePaymentRows,

		// payments: accountReceivablePayments.ACC_payments,

		// filterParam: accountReceivablePayments.filterParam,
		// searchText: accountReceivablePayments.searchText,

		// paymentDlgPayloads: accountReceivablePayments.paymentDlgPayloads,

		increaseDecreaseContractModalForm: customers.increaseDecreaseContractModalForm,
		cancelContractPage: customers.cancelContractPage,
		suspendContractPage: customers.suspendContractPage,

		lists: customers.lists,
		franchieesesToOffer: customers.franchieesesToOffer,
		activeCustomer: customers.activeCustomer,
		customerForm: customers.customerForm,
		accountExecutiveList: customers.accountExecutiveList,

		customers: customers.customersDB,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceAgreementPage)));
