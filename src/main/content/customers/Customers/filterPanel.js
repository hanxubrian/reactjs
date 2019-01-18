import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Geocode from "react-geocode";

import { Paper, withStyles, Checkbox } from '@material-ui/core';
import { TextField, Divider, Toolbar, Typography } from '@material-ui/core';
import keycode from 'keycode';

//Material UI core
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';

//Store
import * as Actions from 'store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Third Party
import classNames from 'classnames';

import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import CustomerLineTable from "./CustomerLine"

import Autosuggest from "react-autosuggest"
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import Utils from './Utils'

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { Input, InputLabel, FormControl, InputAdornment } from '@material-ui/core';

Geocode.setApiKey("AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA");

const styles = theme => ({
	root: {

	},
	panel: {
		position: 'absolute',
		width: 300,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[3],
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		left: -300,
		margin: 0,
		zIndex: 1000,
		transform: 'translate3d(50px,0,0)',
		overflow: 'hidden',
		[theme.breakpoints.down('md')]: {
			transform: 'translate3d(360px,0,0)',
			boxShadow: 'none',
			'&.opened': {
				boxShadow: theme.shadows[5]
			}
		},
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.standard
		}),
		'&.opened1': {
			transform: 'translateX(300px)'
		}
	},

	autosuggest__container: {
		position: "relative",
	},

	autosuggest__input: {
		width: "240px",
		height: "30px",
		padding: "10px 20px",
		fontFamily: "Helvetica, sans-serif",
		fontWeight: "300",
		fontDize: "16px",
		border: "1px solid #aaa",
		borderRadius: "4px",
	},

	autosuggest__input_focused: {
		outline: "none",
	},

	autosuggest__input_open: {
		borderBottomLeftRadius: "0",
		borderBottomRightRadius: "0",
	},

	autosuggest__suggestions_container: {
		display: "none",
	},

	autosuggest__suggestions_container_open: {
		display: "block",
		position: "absolute",
		top: "51px",
		width: "280px",
		border: "1px solid #aaa",
		backgroundColor: "#fff",
		fontFamily: "Helvetica, sans-serif",
		fontWeight: "300",
		fontSize: "16px",
		borderBottomLeftRadius: "4px",
		borderBottomRightRadius: "4px",
		zIndex: "2",
	},

	autosuggest__suggestions_list: {
		margin: "0",
		padding: "0",
		listStyleType: "none",
	},

	autosuggest__suggestion: {
		cursor: "pointer",
		padding: "10px 20px",
	},

	autosuggest__suggestion_highlighted: {
		backgroundColor: "#ddd",
	},

	autosuggest__suggestion_match: {
		color: "red",
		fontWeight: "bold",
	},

	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 10,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
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
});

const stateNames = [
	{
		Value: "AL",
		Text: "Alabama"
	},
	{
		Value: "AK",
		Text: "Alaska"
	},
	{
		Value: "AZ",
		Text: "Arizona"
	},
	{
		Value: "AR",
		Text: "Arkansas"
	},
	{
		Value: "CA",
		Text: "California"
	},
	{
		Value: "CO",
		Text: "Colorado"
	},
	{
		Value: "CT",
		Text: "Connecticut"
	},
	{
		Value: "DE",
		Text: "Delaware"
	},
	{
		Value: "FL",
		Text: "Florida"
	},
	{
		Value: "GA",
		Text: "Georgia"
	},
	{
		Value: "HI",
		Text: "Hawaii"
	},
	{
		Value: "ID",
		Text: "Idaho"
	},
	{
		Value: "IL",
		Text: "Illinois"
	},
	{
		Value: "IN",
		Text: "Indiana"
	},
	{
		Value: "IA",
		Text: "Iowa"
	},
	{
		Value: "KS",
		Text: "Kansas"
	},
	{
		Value: "KY",
		Text: "Kentucky"
	},
	{
		Value: "LA",
		Text: "Louisiana"
	},
	{
		Value: "ME",
		Text: "Maine"
	},
	{
		Value: "MD",
		Text: "Maryland"
	},
	{
		Value: "MA",
		Text: "Massachusetts"
	},
	{
		Value: "MI",
		Text: "Michigan"
	},
	{
		Value: "MN",
		Text: "Minnesota"
	},
	{
		Value: "MS",
		Text: "Mississippi"
	},
	{
		Value: "MO",
		Text: "Missouri"
	},
	{
		Value: "MT",
		Text: "Montana"
	},
	{
		Value: "NE",
		Text: "Nebraska"
	},
	{
		Value: "NV",
		Text: "Nevada"
	},
	{
		Value: "NH",
		Text: "New Hampshire"
	},
	{
		Value: "NJ",
		Text: "New Jersey"
	},
	{
		Value: "NM",
		Text: "New Mexico"
	},
	{
		Value: "NY",
		Text: "New York"
	},
	{
		Value: "NC",
		Text: "North Carolina"
	},
	{
		Value: "ND",
		Text: "North Dakota"
	},
	{
		Value: "OH",
		Text: "Ohio"
	},
	{
		Value: "OK",
		Text: "Oklahoma"
	},
	{
		Value: "OR",
		Text: "Oregon"
	},
	{
		Value: "PA",
		Text: "Pennsylvania"
	},
	{
		Value: "RI",
		Text: "Rhode Island"
	},
	{
		Value: "SC",
		Text: "South Carolina"
	},
	{
		Value: "SD",
		Text: "South Dakota"
	},
	{
		Value: "TN",
		Text: "Tennessee"
	},
	{
		Value: "TX",
		Text: "Texas"
	},
	{
		Value: "UT",
		Text: "Utah"
	},
	{
		Value: "VT",
		Text: "Vermont"
	},
	{
		Value: "VA",
		Text: "Virginia"
	},
	{
		Value: "WA",
		Text: "Washington"
	},
	{
		Value: "DC",
		Text: "Washington D.C."
	},
	{
		Value: "WV",
		Text: "West Virginia"
	},
	{
		Value: "WI",
		Text: "Wisconsin"
	},
	{
		Value: "WY",
		Text: "Wyoming"
	}
];
const address_headers = [
	{
		id: 'billing',
		numeric: false,
		disablePadding: false,
		label: 'Type'
	},
	{
		id: 'service',
		numeric: false,
		disablePadding: false,
		label: 'Address'
	},
	{
		id: 'description',
		numeric: false,
		disablePadding: false,
		label: 'City'
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: 'State'
	},
	{
		id: 'amount',
		numeric: true,
		disablePadding: false,
		label: 'Zip / Postal'
	}
];

const billing_headers = [
	{
		id: 'billing',
		numeric: false,
		disablePadding: false,
		label: 'First'
	},
	{
		id: 'service',
		numeric: false,
		disablePadding: false,
		label: 'Last'
	},
	{
		id: 'description',
		numeric: false,
		disablePadding: false,
		label: 'Title'
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: 'Office Phone'
	},
	{
		id: 'amount',
		numeric: true,
		disablePadding: false,
		label: 'Mobile Phone'
	},
	{
		id: 'email',
		numeric: true,
		disablePadding: false,
		label: 'Email'
	},
];

function TextMaskPhone(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

TextMaskPhone.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

const WAIT_INTERVAL = 1000
const ENTER_KEY = 13

class FilterPanel extends Component {

	constructor(props) {
		super(props)

		this.state = {
			AccountTypes: -2,
			AccountExecutive: 0,

			Location: this.props.locationFilterValue.id,
			NearbyRadius: this.props.locationFilterValue.miles,
			AddressZipcodeRadius: this.props.locationFilterValue.miles,

			customerName: "",
			suggestions: [],
		}
	}




	componentDidMount() {
		const { customers } = this.props;
		this.setState({
			rows: Utils.getCustomerListFromDb(customers)
		});
	}

	componentWillMount() {

	}
	componentWillReceiveProps(nextProps) {
		const { customers } = this.props;
		if (nextProps.customers !== customers) {
			this.setState({
				rows: Utils.getCustomerListFromDb(nextProps.customers)
			});
		}

		// if (nextProps.locationFilterValue !== this.props.locationFilterValue) {
		// 	this.setState({
		// 		Location: nextProps.locationFilterValue.id,
		// 		NearbyRadius: nextProps.locationFilterValue.miles,
		// 		AddressZipcodeRadius: nextProps.locationFilterValue.miles,
		// 		SpecificAddress: nextProps.locationFilterValue.addrZipcode === undefined ? "" : nextProps.locationFilterValue.addrZipcode.addr,
		// 	})
		// this.onLocationFilter("Location", nextProps.locationFilterValue.id)
		// }
	}
	componentDidUpdate(prevProps) {
		if (this.props.state !== prevProps.state) {
			if (this.props.state) {
				document.addEventListener("keydown", this.handleDocumentKeyDown);
			}
			else {
				document.removeEventListener('keydown', this.handleDocumentKeyDown);
			}
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleDocumentKeyDown);
	}

	handleDocumentKeyDown = event => {
		if (keycode(event) === 'esc') {
			this.props.closeFilterPanel();
		}
	};

	handleChangeChecked = name => event => {
		if (name === "customerStatusList0") {
			this.props.customerStatusList.Data.map((x, index) => {
				this.setState({
					["customerStatusList" + index + 1]: event.target.checked
				})
			})

		} else {
			this.setState({ [name]: event.target.checked });
		}

		// this.props.toggleStatus(name, event.target.checked)
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});

		let val = event.target.value
		let onLocationFilter = this.onLocationFilter
		if (name === "SpecificAddress") {
			clearTimeout(this.timer)
			this.timer = setTimeout(
				function () {
					onLocationFilter(name, val);
				},
				WAIT_INTERVAL)
		}
		else if (
			name === "Location"
			|| name === "NearbyRadius"
			|| name === "AddressZipcodeRadius"
		) {
			this.onLocationFilter(name, val)
		}
	};

	onLocationFilter = (name, value) => {

		let payload = {
			...this.props.locationFilterValue,
			id: this.state.Location,
			miles: this.state.Location === "locationNearBy" ?
				this.state.NearbyRadius :
				(this.state.Location === "locationNearSpecificAddress" ?
					this.state.AddressZipcodeRadius :
					this.props.locationFilterValue.miles),
			addrZipcode:
				this.state.Location === "locationNearSpecificAddress" ?
					this.state.SpecificAddress : undefined
		}
		switch (name) {
			case "Location":
				payload = {
					...payload,
					id: value,
					miles: value === "locationNearBy" ?
						this.props.locationFilterValue.miles :
						(value === "locationNearSpecificAddress" ?
							this.state.AddressZipcodeRadius :
							this.props.locationFilterValue.miles),
				}
				if (value != "locationNearSpecificAddress") {

				} else {
					Geocode.fromAddress(this.state.SpecificAddress).then(
						response => {
							const { lat, lng } = response.results[0].geometry.location;
							// console.log(lat, lng);

							payload = {
								...payload,
								addrZipcode: {
									lat,
									lng,
									addr: this.state.SpecificAddress
								}
							}
							this.props.selectLocationFilter(payload)
							return
						},
						error => {
							// console.error(error);
							payload = {
								...payload,
								addrZipcode: undefined
							}
							this.props.selectLocationFilter(payload)
							return
						}
					);
					return
				}

				break;
			case "NearbyRadius":
				payload = {
					...payload,
					miles: value
				}
				break;
			case "SpecificAddress":

				Geocode.fromAddress(value).then(
					response => {
						const { lat, lng } = response.results[0].geometry.location;
						// console.log(lat, lng);

						payload = {
							...payload,
							addrZipcode: {
								lat,
								lng,
								addr: value
							}
						}
						this.props.selectLocationFilter(payload)
						return
					},
					error => {
						// console.error(error);
						payload = {
							...payload,
							addrZipcode: undefined
						}
						this.props.selectLocationFilter(payload)
						return
					}
				);

				return;
			case "AddressZipcodeRadius":
				Geocode.fromAddress(this.state.SpecificAddress).then(
					response => {
						const { lat, lng } = response.results[0].geometry.location;
						// console.log(lat, lng);

						payload = {
							...payload,
							miles: value,
							addrZipcode: {
								lat,
								lng,
								addr: value
							}
						}
						this.props.selectLocationFilter(payload)
						return
					},
					error => {
						// console.error(error);
						payload = {
							...payload,
							miles: value,
							addrZipcode: undefined
						}
						this.props.selectLocationFilter(payload)
						return
					}
				);

				return;
		}
		console.log(payload)
		this.props.selectLocationFilter(payload)
	}


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
		if (this.state.rows == undefined) return [];
		return this.state.rows.filter(x => regex.test(x.CustomerName));
	}

	getSuggestionValue(suggestion) {
		return suggestion.CustomerName;
	}

	// renderSuggestion(suggestion, { query }) {
	// 	const matches = AutosuggestHighlightMatch(suggestion.CustomerName, query);
	// 	const parts = AutosuggestHighlightParse(suggestion.CustomerName, matches);

	// 	return (
	// 		<span>
	// 			{parts.map((part, index) => {
	// 				const className = part.highlight ? 'autosuggest__suggestion_match' : null;

	// 				return (
	// 					<span className={className} key={index}>
	// 						{part.text}
	// 					</span>
	// 				);
	// 			})}
	// 		</span>
	// 	);
	// }

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
			customerName: newValue
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
				variant="outlined"
				label="Customer name"
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
	render() {
		const { classes, customerForm, customers } = this.props;

		const { customerName, suggestions } = this.state;
		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			classes,
			placeholder: 'Type a customer name...',
			value: customerName,
			onChange: this.onChange
		};


		let regionCustomers = [];

		// if (customers) { // to avoid error
		// 	customers.Data.Regions.filter(x => {
		// 		return this.props.regionId === 0 || x.Id === this.props.regionId;
		// 	}).forEach(x => {
		// 		regionCustomers = [...regionCustomers, ...x.CustomerList];
		// 	});
		// }

		// let accountTypes = [...new Set(regionCustomers.map(x => x.AccountTypeListName))].sort();
		// let accountStatuses = [...new Set(regionCustomers.map(x => x.StatusName))].sort();

		// return (<MenuItem key={index} value={index}>{x.Title}</MenuItem>)

		let customerStatusListTexts = []
		if (this.props.customerStatusList !== null && this.props.customerStatusList.Data !== undefined) {
			customerStatusListTexts = this.props.customerStatusList.Data.filter(x => {
				if (x.Text === null) return false
				return true
			}).map(x => {
				return x.Text
			}).sort();
		}


		let accountTypeTexts = []
		if (this.props.accountTypeList !== null && this.props.accountTypeList.Data !== undefined) {
			accountTypeTexts = this.props.accountTypeList.Data.filter(x => {
				if (x.Text === null) return false
				return true
			}).map(x => {
				return x.Text
			}).sort();
		}

		let execTitles = []
		if (this.props.accountExecutiveList !== null && this.props.accountExecutiveList.Data !== undefined) {
			execTitles = this.props.accountExecutiveList.Data.filter(x => {
				if (x.Title === null) return false
				return true
			}).map(x => {
				return x.FirstName + " " + x.LastName
			}).sort();
		}

		let accountTypesGroups = []
		if (this.props.accountTypesGroups !== null && this.props.accountTypesGroups.Data !== undefined) {
			accountTypesGroups = this.props.accountTypesGroups.Data.filter(x => {
				if (x.Name === null) return false
				return true
			}).map(x => {
				return x.Name
			}).sort();
		}


		return (
			<div className={classNames(classes.root, "flex flex-col")}>
				{/* <div className={classNames("flex flex-col")}> */}

				<Paper className="flex flex-1 flex-col min-h-px p-20">
					{customerForm && customerForm.props.open
						? (
							<div>
								<GridContainer style={{ alignItems: 'center', width: 500 }} className={classNames(classes.formControl)}>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<h3 className="mt-24">Customer Information</h3>
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="Name"
											label="Name *"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Name')}
											margin="dense"
											variant="outlined"
											autoFocus
											fullWidth />

									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Address *"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Address')}
											margin="dense"
											variant="outlined"
											fullWidth />
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Address2"
											className={classes.textField}
											// value={customerForm.state.name}
											onChange={this.handleChange('Address2')}
											margin="dense"
											variant="outlined"
											fullWidth />
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="City *"
											className={classNames(classes.textField, 'mr-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('City')}
											margin="dense"
											variant="outlined"
											style={{ width: '55%' }}
										/>


										<TextField
											id="outlined-name"
											label="State *"
											select
											className={classNames(classes.textField, 'mr-6 ml-6')}
											value={this.state.State === undefined ? "" : this.state.State}
											onChange={this.handleChange('State')}
											margin="dense"
											variant="outlined"
											style={{ width: '20%' }}
										>
											{stateNames.map((option, index) => (
												<MenuItem key={index} value={option.Value}>
													{option.Value}
												</MenuItem>
											))}
										</TextField>

										<TextField
											id="outlined-name"
											label="Zip *"
											className={classNames(classes.textField, 'ml-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Zip')}
											margin="dense"
											variant="outlined"
											style={{ width: '25%' }}
										/>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										{/* <TextField
											id="outlined-name"
											label="Phone *"
											className={classNames(classes.textField, 'mr-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Phone')}
											margin="dense"
											variant="outlined"
											style={{ width: '100%' }}
										/> */}
										<FormControl className={classNames(classes.formControl, 'mr-6')} style={{ flex: 1 }}>
											<InputLabel htmlFor="Phone">Phone</InputLabel>
											<Input
												// className={classNames(classes.textField, 'mr-6')}
												value={this.state.Phone}
												onChange={this.handleChange('Phone')}
												id="Phone"
												inputComponent={TextMaskPhone}
												variant="outlined"
												margin="normal"
												fullWidth
											/>
										</FormControl>

										{/* <TextField
											id="outlined-name"
											label="Fax"
											className={classNames(classes.textField, 'ml-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Fax')}
											margin="dense"
											variant="outlined"

											style={{ width: '100%' }}
										/> */}

										<FormControl className={classNames(classes.formControl, 'ml-6')} style={{ flex: 1 }}>
											<InputLabel htmlFor="Fax">Fax</InputLabel>
											<Input
												// className={classNames(classes.textField, 'ml-6')}
												value={this.state.Fax}
												onChange={this.handleChange('Fax')}
												id="Fax"
												inputComponent={TextMaskPhone}
												variant="outlined"
												margin="normal"
												fullWidth
											/>
										</FormControl>

									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Email"
											type="email"
											className={classNames(classes.textField, 'mr-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Email')}
											margin="dense"
											variant="outlined"
											style={{ width: '100%' }}
										/>

										<TextField
											id="outlined-name"
											label="Website"
											className={classNames(classes.textField, 'ml-6')}
											// value={customerForm.state.name}
											onChange={this.handleChange('Website')}
											margin="dense"
											variant="outlined"
											style={{ width: '100%' }}
										/>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="AccountTypeGroup"
											label="Account Type Group"
											select
											className={classNames(classes.textField, 'mr-6')}
											value={this.state.AccountTypeGroup === undefined ? 0 : this.state.AccountTypeGroup}
											onChange={this.handleChange('AccountTypeGroup')}
											margin="dense"
											variant="outlined"
											fullWidth
										// style={{ minWidth: "100px", width: "30%" }}
										>
											{
												accountTypesGroups.map((x, index) => (
													<MenuItem key={index} value={index}>{x}</MenuItem>
												))
											}

										</TextField>

										<TextField
											id="AccountType"
											label="Account Type *"
											select
											className={classNames(classes.textField, 'ml-6')}
											value={this.state.AccountType === undefined ? 0 : this.state.AccountType}
											onChange={this.handleChange('AccountType')}
											margin="dense"
											variant="outlined"
											fullWidth
										// style={{ minWidth: "100px", width: "30%" }}
										>
											{
												accountTypeTexts.map((x, index) => (
													<MenuItem key={index} value={index}>{x}</MenuItem>
												))
											}

										</TextField>
									</GridItem>
									<GridItem xs={12} sm={12} md={12} className="flex flex-col">
										<div className="flex justify-around">
											<FormControlLabel
												control={
													<Checkbox
														checked={this.state.NationalAccount}
														onChange={this.handleChangeChecked('NationalAccount')}
														value="NationalAccount"
													/>
												}
												label="National Account"
											/>
											<FormControlLabel
												control={
													<Checkbox
														checked={this.state.ChildAccount}
														onChange={this.handleChangeChecked('ChildAccount')}
														value="ChildAccount"
													/>
												}
												label="Child Account"
											/>
										</div>

										{this.state.ChildAccount && (
											<div className="flex flex-col">
												<Autosuggest
													style={{ width: "100%" }}
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
												/>

												<TextField
													id="StoreNumber"
													label="Store Number"
													className={classes.textField}
													onChange={this.handleChange('StoreNumber')}
													margin="dense"
													variant="outlined"
													fullWidth />
											</div>
										)}


									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-col">
										<h3 className="mt-24">Addresses</h3>
										<CustomerLineTable tableType="ADDRESS" headers={address_headers} />

										<h3 className="mt-24">Contacts</h3>
										<CustomerLineTable tableType="BILLING_SETTING" headers={billing_headers} />
									</GridItem>


								</GridContainer>
							</div>
						) :
						(
							<div>
								{/* <RadioGroup */}
								<div className="mt-0 flex flex-col" style={{ width: '200px' }}>
									<h3>Location</h3>
									<RadioGroup
										aria-label="Location"
										name="Location"
										className={classes.group}
										value={this.props.locationFilterValue.id}
									>

										<FormControlLabel value="locationAll" control={<Radio onChange={this.handleChange('Location')} />} label="All" />
										<FormControlLabel value="locationNearBy" control={<Radio onChange={this.handleChange('Location')} />} label="NearBy" />
										{this.state.Location === "locationNearBy" && (
											<TextField
												select

												id="NearbyRadius"
												label="Radius"
												className={classes.textField}
												InputLabelProps={{
													shrink: true
												}}
												value={this.props.locationFilterValue.miles}
												onChange={this.handleChange('NearbyRadius')}
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
													value={this.props.locationFilterValue.miles}
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

								<div className="mt-36 flex flex-col" style={{ width: '200px' }}>
									<h3>Billing Amount</h3>
									<div className="flex flex-row" >
										<TextField
											type="number"
											id="BillingFrom"
											label="From"
											className={classNames(classes.textField, "mr-6")}
											onChange={this.handleChange('BillingFrom')}
											margin="dense"
											variant="outlined"
											InputProps={{
												startAdornment: <InputAdornment position="start">$</InputAdornment>,
											}}
											inputProps={{ min: "0", precision:"2" }}
											fullWidth
										/>
										<TextField
											type="number"
											id="BillingTo"
											label="To"
											className={classNames(classes.textField, "ml-6")}
											onChange={this.handleChange('BillingTo')}
											margin="dense"
											variant="outlined"
											InputProps={{
												startAdornment: <InputAdornment position="start">$</InputAdornment>,
												min: "0",
											}}
											inputProps={{ min: "0", precision:"2"  }}
											fullWidth
										/>
									</div>
								</div>


								<div className="mt-0 flex flex-col" style={{ width: '200px' }}>
									<Divider variant="middle" style={{ marginTop: 24, marginBottom: 24 }} />
									<TextField
										select

										id="AccountTypes"
										label="Account Types"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.AccountType === undefined ? 0 : this.state.AccountType}
										onChange={this.handleChange('AccountType')}
										margin="dense"
										variant="outlined"
										fullWidth
									>


										{/* <MenuItem value={-2}><em>All</em></MenuItem>
										<MenuItem value={-1}><em>None</em></MenuItem>
										{
											accountTypes.map((x, index) => {
												if (x !== null)
													return (<MenuItem key={x} value={index}>{x}</MenuItem>)
												else
													return null
											})
										} */}
										{
											accountTypeTexts.map((x, index) => (
												<MenuItem key={index} value={index}>{x}</MenuItem>
											))
										}


									</TextField>

									<TextField
										select

										id="AccountExecutive"
										label="Account Executive"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.AccountExecutive === undefined ? 0 : this.state.AccountExecutive}
										onChange={this.handleChange('AccountExecutive')}
										margin="dense"
										variant="outlined"
										fullWidth
									>
										{/* {[{
											value: 0, label: "All"
										}, {
											value: 1, label: "None"
										}].map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))} */}
										{
											execTitles.map((x, index) => {
												return (<MenuItem key={index} value={index}>{x}</MenuItem>)
											})
										}

									</TextField>

								</div>

								<div className="mt-36 flex flex-col" style={{ width: '200px' }}>
									<h3>Customer Status</h3>
									<FormControlLabel
										control={
											<Switch checked={this.state['customerStatusList0']}
												onChange={this.handleChangeChecked('customerStatusList0')} />
										}
										label="All"
									/>
									{
										customerStatusListTexts.map((x, index) => (
											<FormControlLabel key={index}
												control={
													<Switch checked={this.state['customerStatusList' + (index + 1)]}
														onChange={this.handleChangeChecked('customerStatusList' + index + 1)} />
												}
												label={x}
											/>
										))
									}
								</div>
							</div>
						)
					}
				</Paper>
				{/* </div> */}
			</div >
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleStatus: Actions.toggleStatus,
		selectLocationFilter: Actions.selectLocationFilter
	}, dispatch);
}

function mapStateToProps({ customers, auth }) {
	return {
		filterState: customers.bOpenedFilterPanel,
		transactionStatus: customers.transactionStatus,
		customers: customers.customersDB,
		customerForm: customers.customerForm,
		regionId: auth.login.defaultRegionId,
		locationFilterValue: customers.locationFilterValue,

		accountTypeList: customers.accountTypeList,
		accountExecutiveList: customers.accountExecutiveList,
		customerStatusList: customers.customerStatusList,
		accountTypesGroups: customers.accountTypesGroups,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
