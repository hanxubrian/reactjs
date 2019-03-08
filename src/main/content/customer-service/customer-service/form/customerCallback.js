import React, { Component, Fragment } from 'react';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import Geocode from "react-geocode";

import { Paper, withStyles, Checkbox, TextField, Divider, Card, CardHeader, CardContent } from '@material-ui/core';
import {TimePicker, DatePicker } from 'material-ui-pickers';
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

import Autosuggest from "react-autosuggest"
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import FuseUtils from '@fuse/FuseUtils';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { InputAdornment } from '@material-ui/core';

Geocode.setApiKey("AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA");

const styles = theme => ({
	root: {

	},
	card: {
		width: '100%',
	},
	formControl: {
		marginBottom: 12,
		minWidth: 200,
	},
	cardHeader: {
		backgroundColor: theme.palette.secondary.main,
		padding: '8px 24px',
		'& span': {
			color: 'white',
			fontSize: 16,
		}
	},
	cardContent: {
		paddingTop: 12,
		paddingBottom: '12px!important',
		'& h6': {
			lineHeight: 1.5,
			fontSize: 14
		}
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

function TextMaskPhone(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			// placeholderChar={'\u2000'}
			placeholderChar={'∗'}
			showMask
			guide
		/>
	);
}
function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
TextMaskPhone.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

const CUSTOMER_STATUS_LIST = [
	"Active",
	"Cancelled",
	"Inactive",
	"Suspended",
	"Transferred",
	"Unknown",
]

const WAIT_INTERVAL = 1000

class CustomerCallBack extends Component {

	constructor(props) {
		super(props)

		this.state = {
			AccountTypes: -2,
			AccountExecutive: 0,

			Location: this.props.locationFilterValue.id,
			NearbyRadius: this.props.locationFilterValue.miles,
			AddressZipcodeRadius: this.props.locationFilterValue.miles,
			selectedDate: new Date('2014-08-18T21:11:54'),
			childCustomerName: "",
			suggestions: [],

			BillingAmountFrom: "",
			BillingAmountTo: "",


			addressColumns: [
				{
					title: "Type",
					name: "Type",
					columnName: "Type",
					width: 50,
				},
				{
					title: "Address",
					name: "Address",
					columnName: "Address",
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
				Type: "Sample Type",
				Address: "Sample Address",
				City: "Sample City",
				State: "Sample State",
				ZipPostal: "Sample ZipPostal",
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
			filters: {
				StatusNames: [],
				AccountTypeListName: "",
			},
			activeCustomer: null,
		}


	}
	datestate = {
		// The first commit of Material-UI
		selectedDate: new Date('2014-08-18T21:11:54'),
	};

	handleDateChange = date => {
		this.setState({ selectedDate: date });
	  };


	componentDidMount() {
		const { customers } = this.props;
		this.setState({
			rows: FuseUtils.getCustomerListFromDb(customers)
		});
	}

	componentWillMount() {
		this.setState({
			filters: { ...this.props.filters },
			activeCustomer: this.props.customerServiceForm.activeCustomer ? this.props.customerServiceForm.activeCustomer.Data : null,
		})
	}
	componentWillReceiveProps(nextProps) {
		// const { customers, customerForm } = this.props;
		// if (nextProps.customers !== customers) {
		// 	this.setState({
		// 		rows: FuseUtils.getCustomerListFromDb(nextProps.customers),
		// 	});
		// }

		if (nextProps.customerServiceForm.activeCustomer !== this.props.customerServiceForm.activeCustomer) {
			this.setState({ activeCustomer: nextProps.customerServiceForm.activeCustomer ? nextProps.customerServiceForm.activeCustomer.Data : null })
		}
		if (!_.isEqual(nextProps.filters, this.props.filters)) {
			this.setState({
				filters: { ...nextProps.filters }
			})
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
	customerStatusFiltertimer = null
	handleChange = name => event => {

		let value = event.target.value
		const checked = event.target.checked

		let onLocationFilter = this.onLocationFilter

		switch (name) {
			case "SpecificAddress":
				clearTimeout(this.timer)
				this.timer = setTimeout(
					function () {
						onLocationFilter(name, value);
					},
					WAIT_INTERVAL)
				break;

			case "Location":
			case "NearbyRadius":
			case "AddressZipcodeRadius":
				this.onLocationFilter(name, value)
				break;

			case "BillingAmountFrom":
			case "BillingAmountTo":
				value = parseFloat("0" + value).toLocaleString(undefined, { maximumFractionDigits: 0 })
				console.log("value", value)
				break;

			case "filters.StatusNames":

				let newStatusNames = [...this.state.filters.StatusNames]
				if (checked) {
					if (value === "All") {
						newStatusNames = CUSTOMER_STATUS_LIST
					} else {
						newStatusNames = [...new Set([...newStatusNames, value])]
					}
				} else {
					if (value === "All") {
						newStatusNames = ["-"]
					} else {
						newStatusNames.splice(newStatusNames.indexOf(value), 1)
						if (newStatusNames.length === 0) {
							newStatusNames = ["-"]
						}
					}

				}
				this.setState({
					filters: {
						...this.state.filter,
						StatusNames: newStatusNames
					}
				})
				console.log("newStatusNames", newStatusNames)
				clearTimeout(this.customerStatusFiltertimer)
				this.customerStatusFiltertimer = setTimeout(
					this.props.setFilterCustomerStatuses,
					WAIT_INTERVAL,
					newStatusNames)
				return

			default:
				break;

		}

		this.setState({
			[name]: value
		});

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
				if (value !== "locationNearSpecificAddress") {

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
		if (!this.state.rows) return [];
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

	render() {
		const { classes, customerServiceForm } = this.props;

		const { selectedDate,childCustomerName, suggestions, activeCustomer } = this.state;
		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			classes,
			placeholder: 'Type a customer name...',
			value: childCustomerName,
			onChange: this.onChange
		};

		let customerStatusListTexts = []
		if (this.props.customerStatusList !== null && this.props.customerStatusList.Data !== undefined) {
			customerStatusListTexts = this.props.customerStatusList.Data.filter(x => {
				if (x.Text === null) return false
				return true
			}).map(x => {
				return x.Text
			}).sort();
		}
		customerStatusListTexts = CUSTOMER_STATUS_LIST

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
		if (this.props.accountExecutiveList && this.props.accountExecutiveList.Data) {
			// execTitles = this.props.accountExecutiveList.Data.filter(x => {
			// 	if (x.FullName === null) return false
			// 	return true
			// }).map(x => {
			// 	return { title: x.FullName, value: x.UserId }
			// }).sort();
			execTitles = this.props.accountExecutiveList.Data;
		}
		console.log("account executive :" + this.props.accountExecutiveList.Data);
		let accountTypesGroups = []
		if (this.props.accountTypesGroups !== null && this.props.accountTypesGroups.Data !== undefined) {
			accountTypesGroups = this.props.accountTypesGroups.Data.filter(x => {
				if (x.Name === null) return false
				return true
			}).map(x => {
				return x.Name
			}).sort();
		}
        const calltype =[
            {
                value : 'this is first call',
                label : 'This is First call '
            },
            {
                value : 'this is second call',
                label : 'This is second call '
            },
            {
                value : 'this is third call',
                label : 'This is third call '
            },
            {
                value : 'this is forth call',
                label : 'This is forth call '
            }, 
                                   
        ]
        const InitiatedDrop =[
            {
                value : 'this is first call',
                label : 'This is First call '
            },
            {
                value : 'this is second call',
                label : 'This is second call '
            },
            {
                value : 'this is third call',
                label : 'This is third call '
            },
            {
                value : 'this is forth call',
                label : 'This is forth call '
            }, 
                                   
		]
		
		return (
			<div className={classNames(classes.root, "flex flex-col")}>
				<Paper className="flex flex-1 flex-col min-h-px p-20">
							<div>
								<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl, "mb-0")}>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col">
										<Card className={classes.card}>
											<CardContent className={classNames(classes.cardContent)}>
                                            <div className="flex flex-row justify-start mb-4">
                                                <div className="flex mr-6" style={{ flex: 2 }}>
													<TextField
														id="AccountTypeGroup"
														label="Call Type DropDown"
														select
														className={classNames(classes.textField, 'mr-4')}
														value={calltype}
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
                                                </div>
                                                <div className="flex mr-4" style={{ flex: 2 }}></div>
                                                <div className="flex mr-4" style={{ flex: 2 }}>                
													<TextField
														id="date"
														label="Call Date"
														type="date"
														defaultValue="2017-05-24"
														className={classes.textField}
														InputLabelProps={{
														shrink: true,
														}}
													/>
													{/* <DatePicker
														id = "calldate"
														margin="normal"
														label="Date picker"
														value={selectedDate}
														onChange={this.handleDateChange}
														fullWidth
													/>													 */}
                                                </div>
											</div>                                            
											<div className="flex flex-row mb-4">
												<div className="flex mr-4" style={{ flex: 2 }}>
													<TextField
														id="AccountTypeGroup"
														label="Initiated By DropDown"
														select
														className={classNames(classes.textField, 'mr-4')}
														value={calltype}
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
												</div>
                                                <div className="flex mr-4" style={{ flex: 2 }}></div>
                                                <div className="flex mr-4" style={{ flex: 2 }}>
													<TextField
															id="date"
															label="Call Date"
															type="date"
															defaultValue="2017-05-24"
															className={classes.textField}
															InputLabelProps={{
															shrink: true,
															}}
													/>	
											</div>
                                            </div>
											<div className="flex flex-row mb-4">
												<div className="flex mr-12" style={{ flex: 2 }}>
													<TextField
																id="AccountType"
																label='Spoke to select other option'
																select
																className={classNames(classes.textField, 'ml-4')}
																value={this.state.AccountType === undefined ? 0 : this.state.AccountType}
																onChange={this.handleChange('AccountType')}
																margin="normal"
																fullWidth
																variant="outlined"
															>
																{
																	accountTypeTexts.map((x, index) => (
																		<MenuItem key={index} value={index}>{x}</MenuItem>
																	))
																}

													</TextField>    
												</div>
												<div className="flex mr-12" style={{ flex: 1 }}></div>
											</div>
                                            <div className="flex flex-row mb-4">
                                                <div className="flex mr-12" style={{ flex: 2 }}>
                                                    <TextField
                                                                id="note"
                                                                label="Note"
                                                                multiline
                                                                rows  =  '7' 
																value={''}
																variant="outlined"
                                                                className={classes.textField}
                                                                margin="dense"
                                                                fullWidth
                                                            />                                                
                                                </div>
											</div>
                                            <div className="flex flex-row justify-between mb-4">
												<div className="flex mr-6" style={{ flex: 1 }}>
														{/* <Icon fontSize={"small"} className="mr-4">location_on</Icon> */}
														{/* <Typography variant="subtitle1" color="inherit">{FuseUtils.capital_letter(this.state.customerAddress)}</Typography> */}
														<TextField
															id="callbackdate"
                                                            label="Call Back Date"
                                                            value={''}
															className={classes.textField}
															margin="normal"
															variant="outlined"
															fullWidth
														/>
												</div>
												<div className="flex mr-6" style={{ flex: 2 }}></div>
											</div>
                                            <div className="flex flex-row justify-between mb-6">
												<div className="flex mr-6" style={{ flex: 1 }}>
												<TextField
														id="AccountTypeGroup"
														label="Assing and following up"
														select
														className={classNames(classes.textField, 'mr-4')}
														value={calltype}
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
												</div>
												<div className="flex mr-6" style={{ flex: 2}}></div>
											</div>
											<div className="flex flex-row justify-start mb-6">
												<div className="flex mr-6" style={{ flex: 1}}>
													<TextField
														id="autoreassign"
														label="Auto Reassign if not handled "
														value={''}
														className={classNames(classes.margin, classes.textField)}
														margin="normal"
														variant="outlined"
														fullWidth
													/>
												</div>
												<div className="flex mr-6" style={{ flex: 2}}></div>
											</div>
											</CardContent>
										</Card>
									</GridItem>
								</GridContainer>
							</div>

				</Paper>
			</div >
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleStatus: Actions.toggleStatus,
		selectLocationFilter: Actions.selectLocationFilter,
		setFilterCustomerStatuses: Actions.setFilterCustomerStatuses,
	}, dispatch);
}

function mapStateToProps({ customers, auth }) {
	return {
		filterState: customers.bOpenedFilterPanel,
		transactionStatus: customers.transactionStatus,
		customers: customers.customersDB,
		// customerForm: customers.customerForm,
		customerServiceForm: customers.customerServiceForm,
		regionId: auth.login.defaultRegionId,
		locationFilterValue: customers.locationFilterValue,

		accountTypeList: customers.accountTypeList,
		accountExecutiveList: customers.accountExecutiveList,
		customerStatusList: customers.customerStatusList,
		accountTypesGroups: customers.accountTypesGroups,
		filters: customers.filters,
		activeCustomer: customers.activeCustomer,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerCallBack)));