import React, { Component, Fragment } from 'react';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import Geocode from "react-geocode";

import {
	Paper, withStyles, Checkbox, TextField, Divider, Button, IconButton, Card, CardHeader, CardContent, Icon,
	Typography
} from '@material-ui/core';

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
import { Input, InputLabel, FormControl, InputAdornment } from '@material-ui/core';

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
import { Getter } from '@devexpress/dx-react-core';
import NewIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

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

const stateNames = [
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

TextMaskPhone.propTypes = {
	inputRef: PropTypes.func.isRequired,
};


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
	<IconButton onClick={onExecute} title="Delete">
		<DeleteIcon />
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

const EditingCellComponentBase = props => {
	return (<TableEditColumn.Cell {...props}

	/>);
};

const EditingCellComponent = withStyles(editing_cell_styles, { name: "EditingCell" })(
	EditingCellComponentBase
);

const CUSTOMER_STATUS_LIST = [
	"Active",
	"Cancelled",
	"Inactive",
	"Suspended",
	"Transferred",
	"Unknown",
]

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
		const { classes, customerServiceForm, customers } = this.props;

		const { addressRows, addressColumns, contactsRows, contactsColumns } = this.state;

		const { childCustomerName, suggestions, activeCustomer } = this.state;
		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			classes,
			placeholder: 'Type a customer name...',
			value: childCustomerName,
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
					{customerServiceForm && customerServiceForm.open
						? (
							<div>
								<GridContainer style={{ alignItems: 'center', width: 500 }} className={classNames(classes.formControl, "mb-0")}>
									<GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col">
										<Card className={classes.card}>
											<CardHeader title={"Customer Information" + (activeCustomer ? " (" + activeCustomer.cust_no + ")" : "")} className={classNames(classes.cardHeader, "flex-1")} />
											<CardContent className={classNames(classes.cardContent)}>
												<div className="flex flex-row mb-4">
													<div className="flex mr-6" style={{ flex: 2 }}>
														{/* <Icon fontSize={"small"} className="mr-4">person_outline</Icon> */}
														{/* <Typography variant="subtitle1" color="inherit"><strong>{this.state.customerName}</strong></Typography> */}
														<TextField
															id="customerName"
															label="Name"
															value={activeCustomer ? activeCustomer.cus_name : ''}
															className={classes.textField}
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															fullWidth
														/>
													</div>
													<div className="flex ml-6" style={{ flex: 1 }}>
														{/* <Icon fontSize={"small"} className="mr-4">phone_iphone</Icon> */}
														{/* <Typography variant="subtitle1" color="inherit">{this.state.customerPhone}</Typography> */}
														<TextField
															id="customerPhone"
															label="Phone"
															value={activeCustomer ? '+1' + activeCustomer.cus_phone : ''}
															className={classes.textField}
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															fullWidth
														/>
													</div>
												</div>

												<div className="flex flex-row justify-between mb-4">
													<div className="flex mr-6" style={{ flex: 2 }}>
														{/* <Icon fontSize={"small"} className="mr-4">location_on</Icon> */}
														{/* <Typography variant="subtitle1" color="inherit">{FuseUtils.capital_letter(this.state.customerAddress)}</Typography> */}
														<TextField
															id="customerAddress"
															label="Address"
															value={activeCustomer ? FuseUtils.capital_letter(activeCustomer.cus_addr) : ''}
															className={classes.textField}
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															fullWidth
														/>
													</div>
													<div className="flex ml-6" style={{ flex: 1 }}>
														{/* <Icon fontSize={"small"} className="mr-4">phone_iphone</Icon> */}
														{/* <Typography variant="subtitle1" color="inherit">{this.state.customerFax}</Typography> */}
														<TextField
															id="customerFax"
															label="Fax"
															value={activeCustomer ? '+1' + activeCustomer.cus_fax : ''}
															className={classes.textField}
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															fullWidth
														/>
													</div>
												</div>


												<div className="flex flex-row justify-between mb-4">
													<div className="flex" style={{ flex: 1 }}>
														{/* <Icon fontSize={"small"} className="mr-4"></Icon> */}
														{/* <Typography variant="subtitle1" color="inherit">{FuseUtils.capital_letter(this.state.customerCity)}, {this.state.customerState}, {this.state.customerZip}</Typography> */}
														<TextField
															id="customerAddress"
															label=""
															value={activeCustomer ? FuseUtils.capital_letter(activeCustomer.cus_city) + ", " + activeCustomer.cus_state + ", " + activeCustomer.cus_zip : ''}
															className={classes.textField}
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															fullWidth
														/>
													</div>
												</div>

												<Divider variant="middle" style={{ marginTop: 5, marginBottom: 5 }} />

												<div className="flex flex-row justify-start mb-4">
													{/* <Icon fontSize={"small"} className="mr-4">email</Icon> */}
													{/* <Typography variant="subtitle1" color="inherit">{this.state.customerEmail}</Typography> */}
													<TextField
														id="customerEmail"
														label="Email 1"
														value={activeCustomer ? activeCustomer.email1 : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

													<TextField
														id="customerEmail"
														label="Email 2"
														value={activeCustomer ? activeCustomer.email2 : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

												</div>

												<div className="flex flex-row justify-start mb-4">
													{/* <Icon fontSize={"small"} className="mr-4">language</Icon> */}
													{/* <Typography variant="subtitle1" color="inherit">{this.state.customerWebsite}</Typography> */}
													<TextField
														id="customerWebsite"
														label="Website"
														value={activeCustomer ? 'Not Specified' : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>

												<div className="flex flex-row justify-start mb-4">
													<TextField
														id="AccountTypeGroup"
														label="Account Type Group"
														select
														className={classNames(classes.textField, 'mr-6')}
														value={this.state.AccountTypeGroup === undefined ? 0 : this.state.AccountTypeGroup}
														InputProps={{
															readOnly: true,
														}}
														onChange={this.handleChange('AccountTypeGroup')}
														margin="dense"
														// variant="outlined"
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
														InputProps={{
															readOnly: true,
														}}
														onChange={this.handleChange('AccountType')}
														margin="dense"
														// variant="outlined"
														fullWidth
													// style={{ minWidth: "100px", width: "30%" }}
													>
														{
															accountTypeTexts.map((x, index) => (
																<MenuItem key={index} value={index}>{x}</MenuItem>
															))
														}

													</TextField>
												</div>

												<div className="flex justify-around">
													<FormControlLabel
														control={
															<Checkbox
																// checked={this.state.NationalAccount}
																// onChange={this.handleChangeChecked('NationalAccount')}
																value="NationalAccount"
															/>
														}
														label="National Account"
													/>
													<FormControlLabel
														control={
															<Checkbox
																// checked={this.state.ChildAccount}
																// onChange={this.handleChangeChecked('ChildAccount')}
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
															// variant="outlined"
															fullWidth />
													</div>
												)}

											</CardContent>
										</Card>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row mt-12">
										<Card className={classes.card}>
											<CardHeader title="Assigned Franchisees" className={classNames(classes.cardHeader, "flex-1")} />
											<CardContent className={classNames(classes.cardContent)}>
												{activeCustomer && activeCustomer.AssignedFranchisees.map((x, index) => (
													<div key={index} className="flex flex-row justify-start mb-4">
														<TextField
															id="FranchiseeNumber"
															label="Number"
															value={x.FranchiseeNumber}
															className="pr-6"
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															style={{ flex: 2 }}
														/>
														<TextField
															id="Status"
															label="Status"
															value={x.Status}
															className="pl-6 pr-6"
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															style={{ flex: 2 }}
														/>
														<TextField
															id="AssignedDate"
															label="Assigned Date"
															value={x.AssignedDate}
															className="pl-6 pr-6"
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															style={{ flex: 3 }}
														/>
														<TextField
															id="MonthlyBilling"
															label="Monthly Billing"
															value={x.MonthlyBilling && x.MonthlyBilling.length > 0 ? x.MonthlyBilling.map(x => x.MonthlyBilling).reduce((a, b) => a + b, 0) : ''}
															className="pl-6"
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															style={{ flex: 3 }}
														/>
													</div>
												))
												}
											</CardContent>
										</Card>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col mt-12">
										<Card className={classes.card}>
											<CardHeader title="Contract" className={classNames(classes.cardHeader, "flex-1")} />
											<CardContent className={classNames(classes.cardContent)}>
												<div className="flex flex-row justify-start mb-4">
													<div className="flex mr-6" style={{ flex: 1 }}>
														{/* <Icon fontSize={"small"} className="mr-4" >attach_money</Icon> */}
														{/* <Typography variant="subtitle1" color="inherit">Amount:</Typography> */}
														<TextField
															id="Amount"
															label="Amount"
															value={activeCustomer ? activeCustomer.cont_bill : ''}
															className={classes.textField}
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															fullWidth
														/>
													</div>
													<div className="flex ml-6" style={{ flex: 1 }}>
														{/* <Icon fontSize={"small"} className="mr-4" >date_range</Icon>
														<Typography variant="subtitle1" color="inherit">Sign Date:</Typography> */}
														<TextField
															id="SignDate"
															label="SignDate"
															value={activeCustomer ? activeCustomer.date_sign : ''}
															className={classes.textField}
															InputLabelProps={{ shrink: true }}
															InputProps={{ readOnly: true }}
															margin="dense"
															fullWidth
														/>
													</div>
												</div>

												<div className="flex flex-row justify-start mb-4">
													{/* <Icon fontSize={"small"} className="mr-4">date_range</Icon> */}
													{/* <Typography variant="subtitle1" color="inherit">Start Date:</Typography> */}
													<TextField
														id="ContractType"
														label="Contract Type"
														value={this.state.ContractType}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="StartDate"
														label="Start Date"
														value={activeCustomer ? activeCustomer.date_start : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>

												<div className="flex flex-row justify-start mb-4">

													<TextField
														id="ContractLength"
														label="Contract Length (Months)"
														value={activeCustomer ? activeCustomer.contract_length : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

													<TextField
														id="ExpirationDate"
														label="Expiration Date"
														value={activeCustomer ? activeCustomer.exp_date : ''}
														className={classes.textField}
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>

												<div className="flex flex-row justify-start mb-4">
													{/* <Icon fontSize={"small"} className="mr-4"></Icon>
													<Typography variant="subtitle1" color="inherit">Acct Exec:</Typography> */}
													<TextField
														id="AgreementType"
														label="Agreement Type"
														value={activeCustomer ? activeCustomer.agreeused : ''}
														className="mr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

													<TextField
														id="AccountExecutive"
														label="Account Executive"
														value={this.state.AccountExecutive}
														className="ml-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>

											</CardContent>
										</Card>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col mt-12">
										<Card className={classes.card}>
											<CardHeader title="Billing" className={classNames(classes.cardHeader, "flex-1")} />
											<CardContent className={classNames(classes.cardContent)}>
												<div className="flex flex-row justify-start mb-4">
													<TextField
														id="Name"
														label="Name"
														value={activeCustomer ? activeCustomer.bill_name : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

												</div>

												<div className="flex flex-row justify-start mb-4">
													<TextField
														id="BillingAddress"
														label="Address"
														value={activeCustomer ? FuseUtils.capital_letter(activeCustomer.bill_addr) : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>

												<div className="flex flex-row justify-start mb-4">
													<TextField
														id="City"
														label="City"
														value={activeCustomer ? FuseUtils.capital_letter(activeCustomer.bill_city) : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="State"
														label="State"
														value={activeCustomer ? activeCustomer.bill_state : ''}
														className="pl-6 pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="Zip"
														label="Zip"
														value={activeCustomer ? activeCustomer.bill_zip : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>


												<div className="flex flex-row justify-start mb-4">
													<TextField
														id="Phone"
														label="Phone"
														value={activeCustomer ? "+1" + activeCustomer.bill_phone : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="Fax"
														label="Fax"
														value={activeCustomer ? "+1" + activeCustomer.bill_fax : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>
												<div className="flex flex-row justify-start mb-4">
													<TextField
														id="BillingMethod"
														label="Billing Method"
														value={activeCustomer ? activeCustomer.Ebilling : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="Email"
														label="Email"
														value={activeCustomer ? activeCustomer.ebilling_email : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>

												<div className="flex flex-row justify-start mb-4">

													{/* <Icon fontSize={"small"} className="mr-4"></Icon>
														<Typography variant="subtitle1" color="inherit">PO number:</Typography> */}
													<TextField
														id="PONumber"
														label="PO Number"
														value={activeCustomer ? activeCustomer.po_1 : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

													{/* <Icon fontSize={"small"} className="mr-4">check_box</Icon>
														<Typography variant="subtitle1" color="inherit">Term:</Typography> */}
													<TextField
														id="Term"
														label="Term"
														value={activeCustomer ? activeCustomer.BillingTerm : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="ARStatus"
														label="AR Status"
														value={activeCustomer ? activeCustomer.arstatus : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
												</div>

											</CardContent>
										</Card>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col mt-12">
										<Card className={classes.card}>
											<CardHeader title="Cleaning Schedule" className={classNames(classes.cardHeader, "flex-1")} />
											<CardContent className={classNames(classes.cardContent)}>
												<div className="flex flex-row justify-start mb-4">

													<TextField
														id="ServiceType"
														label="Service Type"
														value={this.state.ServiceType}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="SquareFootage"
														label="Square Footage"
														value={activeCustomer ? activeCustomer.SquareFootage : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>
													<TextField
														id="StartTime"
														label="Start Time"
														value={activeCustomer ? activeCustomer.cleaning_start_time.replace(/(\d{4})-(\d{2})-(\d{2})(.+)/, '$2/$3/$1') : ''}
														className="pr-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

												</div>

												<div className="flex flex-row justify-start mb-4">
													<TextField
														id="CleanTimes"
														label="Clean Times &amp; Frequency"
														value={activeCustomer ? ("Clean " + activeCustomer.cleantimes + " Times Per " + activeCustomer.cleanper) : ''}
														className="pl-6"
														InputLabelProps={{ shrink: true }}
														InputProps={{ readOnly: true }}
														margin="dense"
														fullWidth
													/>

												</div>

												<div className="flex flex-row justify-between mb-4">
													<FormControlLabel label="Mon" labelPlacement="top" control={<Checkbox />} style={{ marginLeft: 0, marginRight: 0 }}
														checked={activeCustomer ? activeCustomer.mon !== "F" : false}
													/>
													<FormControlLabel label="Tue" labelPlacement="top" control={<Checkbox />} style={{ marginLeft: 0, marginRight: 0 }}
														checked={activeCustomer ? activeCustomer.tue !== "F" : false}
													/>
													<FormControlLabel label="Wed" labelPlacement="top" control={<Checkbox />} style={{ marginLeft: 0, marginRight: 0 }}
														checked={activeCustomer ? activeCustomer.wed !== "F" : false}
													/>
													<FormControlLabel label="Thu" labelPlacement="top" control={<Checkbox />} style={{ marginLeft: 0, marginRight: 0 }}
														checked={activeCustomer ? activeCustomer.thu !== "F" : false}
													/>
													<FormControlLabel label="Fri" labelPlacement="top" control={<Checkbox />} style={{ marginLeft: 0, marginRight: 0 }}
														checked={activeCustomer ? activeCustomer.fri !== "F" : false}
													/>
													<FormControlLabel label="Sat" labelPlacement="top" control={<Checkbox />} style={{ marginLeft: 0, marginRight: 0 }}
														checked={activeCustomer ? activeCustomer.sat !== "F" : false}
													/>
													<FormControlLabel label="Sun" labelPlacement="top" control={<Checkbox />} style={{ marginLeft: 0, marginRight: 0 }}
														checked={activeCustomer ? activeCustomer.sun !== "F" : false}
													/>
												</div>


											</CardContent>
										</Card>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-col">
										{/* <h3 className="mt-24 mb-12">Addresses</h3> */}
										{/* <CustomerLineTable tableType="ADDRESS" headers={address_headers} /> */}
										{/* <Paper>
											<Grid
												rows={addressRows}
												columns={addressColumns}
											>

												<EditingState
													// columnExtensions={editingColumnExtensions}
													onCommitChanges={this.commitChanges}
												/>

												<Table />
												<TableHeaderRow />
												<TableEditRow />
												<TableEditColumn
													width={110}
													cellComponent={EditingCellComponent}
													headerCellComponent={EditingHeaderCellComponent}
													showAddCommand
													showEditCommand
													showDeleteCommand
													commandComponent={Command}
												/> */}
										{/* <Getter
													name="tableColumns"
													computed={({ tableColumns }) => {
														// debugger
														const result = [
															...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
															{ key: 'editCommand', type: TableEditColumn.COLUMN_TYPE, width: 100 }
														];
														return result;
													}
													}
												/> */}


										{/* </Grid>
										</Paper> */}


										{/* <h3 className="mt-24 mb-12">Contacts</h3> */}
										{/* <CustomerLineTable tableType="BILLING_SETTING" headers={billing_headers} /> */}
										{/* <Paper>
											<Grid
												rows={contactsRows}
												columns={contactsColumns}
											>

												<EditingState
													// columnExtensions={editingColumnExtensions}
													onCommitChanges={this.commitChanges}
												/>

												<Table />
												<TableHeaderRow />
												<TableEditRow />
												<TableEditColumn
													width={110}
													cellComponent={EditingCellComponent}
													headerCellComponent={EditingHeaderCellComponent}
													showAddCommand
													showEditCommand
													showDeleteCommand
													commandComponent={Command}
												/> */}
										{/* <Getter
													name="tableColumns"
													computed={({ tableColumns }) => {
														// debugger
														const result = [
															...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
															{ key: 'editCommand', type: TableEditColumn.COLUMN_TYPE, width: 100 }
														];
														return result;
													}
													}
												/> */}


										{/* </Grid>
										</Paper> */}
									</GridItem>


								</GridContainer>
							</div>
						) :
						(
							<div>
								{/* <RadioGroup */}
								<div className="mt-0 flex flex-col" style={{ width: '200px' }}>
									<h3 className="mb-12">Location</h3>
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
									<h3 className="mb-12">Billing Amount</h3>
									<div className="flex flex-row" >
										<TextField
											type="number"
											id="BillingAmountFrom"
											label="From"
											value={this.state.BillingAmountFrom}
											className={classNames(classes.textField, "mr-6")}
											onChange={this.handleChange('BillingAmountFrom')}
											margin="dense"
											variant="outlined"
											InputProps={{
												startAdornment: <InputAdornment position="start">$</InputAdornment>,
											}}
											inputProps={{ min: "0", precision: "2", step: "1" }}
											fullWidth
										/>
										<TextField
											type="number"
											id="BillingAmountTo"
											value={this.state.BillingAmountTo}
											label="To"
											className={classNames(classes.textField, "ml-6")}
											onChange={this.handleChange('BillingAmountTo')}
											margin="dense"
											variant="outlined"
											InputProps={{
												startAdornment: <InputAdornment position="start">$</InputAdornment>,
												min: "0",
											}}
											inputProps={{ min: "0", precision: "2" }}
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
									<h3 className="mb-12">Customer Status</h3>
									<FormControlLabel
										control={
											<Switch
												checked={this.state.filters.StatusNames.length >= customerStatusListTexts.length}
												onChange={this.handleChange('filters.StatusNames')}
												value="All"
											/>
										}
										label="All"
									/>
									{
										customerStatusListTexts
											.map((x, index) => (
												<FormControlLabel key={index}
													control={
														<Switch
															checked={this.state.filters.StatusNames.indexOf(x) > -1}
															onChange={this.handleChange('filters.StatusNames')}
															value={x}
														/>
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

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
