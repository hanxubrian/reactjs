import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// core components
import {
	Paper, TextField, Button, Typography,
	MenuItem, FormControl, InputLabel, Select, OutlinedInput,
	Card, CardHeader, CardContent, Divider, Radio, RadioGroup, FormControlLabel
} from '@material-ui/core';


// theme components
import { FusePageCustom, FuseAnimate, FuseSearch } from '@fuse';

import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import CustomerLineTable from "./CustomerLine"

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const styles = theme => ({
	layoutForm: {
		flexDirection: 'row',
	},
	button: {
		'& span': {
			textTransform: 'none'
		}
	},
	card: {
		width: '100%',
	},
	container: {
		position: 'relative',
		width: '100%'
	},
	formControl: {
		marginBottom: 24,
		minWidth: 200,
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
	divider: {
		height: theme.spacing.unit * 2,
	},
	cardHeader: {
		backgroundColor: theme.palette.secondary.main,
		padding: '10px 24px',
		'& span': {
			color: 'white'
		}
	},
});

const newCustomerState = {
	"MasterTrxTypeListId": "",
	"RegionId": "",
	"RegionName": "",
	"CustomerId": "",
	"CustomerNo": "",
	"CustomerDate": "",
	"DueDate": "",
	"CustomerId": "",
	"CustomerNo": "",
	"CustomerName": "",
	"EBill": "",
	"PrintCustomer": "",
	"CustomerDescription": "",
	"CustomerAmount": "",
	"CustomerTax": "",
	"CustomerTotal": "",
	"CPI": "",
	"TransactionStatusListId": "",
	"TransactionStatus": "",
	"CustomerBalanceAmount": "",
	"CustomerBalanceTax": "",
	"CustomerBalanceTotal": "",
	"EBillText": "",
	"PrintCustomerText": "",
	"IsOpen": "",
	"ConsolidatedCustomer": "",
	"ConsolidatedCustomerId": "",
	"ConsolidatedCustomerNo": "",
	"CreditId": "",
	"Service": ""
};

function renderInputComponent(inputProps) {
	const { classes, inputRef = () => { }, ref, ...other } = inputProps;

	return (
		<TextField
			fullWidth
			variant="outlined"
			label="Customer For:"
			InputProps={{
				inputRef: node => {
					ref(node);
					inputRef(node);
				},
				classes: {
					input: classes.input,
				},
			}}
			{...other}
		/>
	);
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion.CustomerName, query);
	const parts = parse(suggestion.CustomerName, matches);

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

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class CustomerForm extends Component {
	state = {
		customers: [],
		...newCustomerState,
		value: '',
		suggestions: [],
		selectedCustomer: null,
		labelWidth: 0,
		selectedWork: ""
	};

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue.toString()
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		if (value.length < 2) return;

		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	getSuggestionValue = (suggestion) => {
		this.setState({ selectedCustomer: suggestion });
		return suggestion.CustomerName;
	};

	getSuggestions = (value) => {
		const escapedValue = escapeRegexCharacters(value.trim());
		const regex = new RegExp(escapedValue, 'i');

		return this.props.customers.filter(customer => regex.test(customer.CustomerName));
	};

	closeComposeForm = () => {
		this.props.customerForm.type === 'create' ? this.props.closeEditCustomerForm() : this.props.closeNewCustomerForm();
	};

	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
	}

	componentWillMount() {
	}

	componentWillReceiveProps(nextProps) {
	}

	componentDidMount() {
		if (this.InputLabelRef) {
			this.setState({
				labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
			});
		}
	}

	handleChange = (event) => {
		this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
	};

	canBeSubmitted() {
		return true;
		const { name } = this.state;
		return (
			name.length > 0
		);
	}

	render() {
		const { classes, CustomerForm, addCustomer, updateCustomer, removeCustomer } = this.props;
		const { value, suggestions } = this.state;

		const autosuggestProps = {
			renderInputComponent,
			suggestions: suggestions,
			onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.onSuggestionsClearRequested,
			getSuggestionValue: this.getSuggestionValue,
			renderSuggestion,
		};
		console.log('customers', this.props.customers);

		return (
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<div className="p-24">
					<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
						<GridItem xs={12} sm={8} md={8} className="flex flex-row">
							<Autosuggest
								{...autosuggestProps}
								inputProps={{
									classes,
									placeholder: 'Search Customer Name or Number',
									value: value,
									onChange: this.onChange,
								}}
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
							/>
						</GridItem>
						<GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col xs:mb-24">
							<TextField
								id="CustomerDate"
								label="Customer Date"
								type="date"
								name="CustomerDate"
								value={this.state.CustomerDate}
								onChange={this.handleChange}
								InputLabelProps={{
									shrink: true
								}}
								variant="outlined"
								fullWidth
								required
							/>
						</GridItem>
						<GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col">
							<TextField
								id="DueDate"
								label="Due Date"
								type="date"
								name="DueDate"
								value={this.state.DueDate}
								onChange={this.handleChange}
								InputLabelProps={{
									shrink: true
								}}
								variant="outlined"
								fullWidth
								required
							/>
						</GridItem>
					</GridContainer>
					{this.state.selectedCustomer && (
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
							<GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col">
								<Card className={classes.card}>
									<CardHeader title="Customer" className={classNames(classes.cardHeader, "flex-1")} />
									<CardContent>
										<Typography variant="subtitle1" color="inherit">
											<strong>Customer Name: {this.state.selectedCustomer.CustomerName}</strong>
										</Typography>
										<Typography variant="subtitle1" color="inherit">
											Customer No: {this.state.selectedCustomer.CustomerNo}
										</Typography>
										<Typography variant="subtitle1" color="inherit">
											Address: {this.state.selectedCustomer.Address}
										</Typography>
										<Typography variant="subtitle1" color="inherit">
											{this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
										</Typography>
									</CardContent>
								</Card>
							</GridItem>
							<GridItem xs={12} sm={6} md={6} className="flex flex-row justify-end xs:flex-col">
								<Card className={classes.card}>
									<CardHeader title="Billing" className={classNames(classes.cardHeader, "flex-1")} />
									<CardContent>
										<Typography variant="subtitle1" color="inherit">
											<strong>Billing Name: {this.state.selectedCustomer.CustomerName}</strong>
										</Typography>
										<Typography variant="subtitle1" color="inherit">
											Customer No: {this.state.selectedCustomer.CustomerNo}
										</Typography>
										<Typography variant="subtitle1" color="inherit">
											Address: {this.state.selectedCustomer.Address}
										</Typography>
										<Typography variant="subtitle1" color="inherit">
											{this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
										</Typography>
									</CardContent>

								</Card>
							</GridItem>
						</GridContainer>
					)}
					<Divider variant="middle" />
					<div className="flex">
						<CustomerLineTable />
					</div>
				</div>
			</FuseAnimate>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openEditCustomerForm: Actions.openEditCustomerForm,
		closeEditCustomerForm: Actions.closeEditCustomerForm,
	}, dispatch);
}

function mapStateToProps({ customers, }) {
	return {
		CustomerForm: customers.CustomerForm
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerForm)));

