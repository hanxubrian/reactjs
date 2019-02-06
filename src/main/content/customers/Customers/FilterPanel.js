import React, { Component, Fragment } from 'react';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import Geocode from "react-geocode";

import { Paper, withStyles, Checkbox, TextField, Divider, Button, IconButton } from '@material-ui/core';

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
import { Filter } from 'konva';

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

			customerName: "",
			customerAddress: "",
			customerCity: "",
			customerState: "",
			customerZip: "",

			customerPhone: "",
			customerFax: "",

			customerEmail: "",
			customerWeb: "",

			filters: {
				StatusNames: [],
				AccountTypeListName: "",
			}

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
			filters: { ...this.props.filters }
		})

	}
	componentWillReceiveProps(nextProps) {
		const { customers, customerForm } = this.props;
		if (nextProps.customers !== customers) {
			this.setState({
				rows: FuseUtils.getCustomerListFromDb(nextProps.customers),
			});
		}

		if (nextProps.customerForm !== customerForm) {
			if (nextProps.customerForm.data !== null) {
				console.log("nextProps.customerForm.data.Data.cus_phone", nextProps.customerForm.data.Data.cus_phone)
				this.setState({
					customerName: nextProps.customerForm.data.Data.cus_name,
					customerAddress: nextProps.customerForm.data.Data.cus_addr,
					customerCity: nextProps.customerForm.data.Data.cus_city,
					customerState: nextProps.customerForm.data.Data.cus_state,
					customerZip: nextProps.customerForm.data.Data.cus_zip,

					customerPhone: "+1" + nextProps.customerForm.data.Data.cus_phone,
					customerFax: "+1" + nextProps.customerForm.data.Data.cus_fax,

					customerEmail: nextProps.customerForm.data.Data.email1,
					customerWeb: nextProps.customerForm.data.Data.cus_zip,

				});
			}

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

		const value = event.target.value
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
						newStatusNames = [
							"Active",
							"Cancelled",
							"Inactive",
							"Suspended",
							"Transferred",
							"Unknown",
						]
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
					filter: {
						...this.state.filter,
						StatusNames: newStatusNames
					}
				})
				this.props.setFilterCustomerStatuses(newStatusNames)

				clearTimeout(this.customerStatusFiltertimer)
				this.customerStatusFiltertimer = setTimeout(
					this.fetchCustomersByStatus,
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
	fetchCustomersByStatus = (newStatusNames) => {
		this.props.getCustomers(
			this.props.regionId,
			this.props.statusId,
			newStatusNames.length >= 6 ? [] : newStatusNames.map(x => x.substring(0, 1)),
			this.props.filters.AccountTypeListName,
			this.props.location,
			this.props.latitude,
			this.props.longitude,
			this.props.searchText,
		);
	}
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
		const { classes, customerForm, customers } = this.props;

		const { addressRows, addressColumns, contactsRows, contactsColumns } = this.state;

		const { childCustomerName, suggestions } = this.state;
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
											value={this.state.customerName}
											onChange={this.handleChange('customerName')}
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
											value={this.state.customerAddress}
											onChange={this.handleChange('customerAddress')}
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
											value={this.state.customerCity}
											onChange={this.handleChange('customerCity')}
											margin="dense"
											variant="outlined"
											style={{ width: '55%' }}
										/>


										<TextField
											id="outlined-name"
											label="State *"
											select
											className={classNames(classes.textField, 'mr-6 ml-6')}
											value={this.state.customerState}
											onChange={this.handleChange('customerState')}
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
											value={this.state.customerZip}
											onChange={this.handleChange('customerZip')}
											margin="dense"
											variant="outlined"
											style={{ width: '25%' }}
										/>
									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<FormControl className={classNames(classes.formControl, 'mr-6')} style={{ flex: 1 }}>
											<TextField
												id="Phone"
												label="Phone"
												className={classes.textField}
												// onChange={this.handleChange('customerPhone')}
												margin="dense"
												InputLabelProps={{
													shrink: true
												}}
												InputProps={{
													inputComponent: TextMaskPhone,
													maxLength: 40,
													value: this.state.customerPhone,
													onChange: this.handleChange('customerPhone')
												}}
												variant="outlined"
												fullWidth
												required
											/>
										</FormControl>

										<FormControl className={classNames(classes.formControl, 'ml-6')} style={{ flex: 1 }}>
											<TextField
												id="Fax"
												label="Fax"
												className={classes.textField}
												// onChange={this.handleChange('customerFax')}
												margin="dense"
												InputLabelProps={{
													shrink: true
												}}
												InputProps={{
													inputComponent: TextMaskPhone,
													maxLength: 40,
													value: this.state.customerFax,
													onChange: this.handleChange('customerFax')
												}}
												variant="outlined"
												fullWidth
												required
											/>
										</FormControl>

									</GridItem>

									<GridItem xs={12} sm={12} md={12} className="flex flex-row">
										<TextField
											id="outlined-name"
											label="Email"
											type="email"
											className={classNames(classes.textField, 'mr-6')}
											value={this.state.customerEmail}
											onChange={this.handleChange('customerEmail')}
											margin="dense"
											variant="outlined"
											style={{ width: '100%' }}
										/>

										<TextField
											id="outlined-name"
											label="Website"
											className={classNames(classes.textField, 'ml-6')}
											value={this.state.customerWebsite}
											onChange={this.handleChange('customerWebsite')}
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
										<h3 className="mt-24 mb-12">Addresses</h3>
										{/* <CustomerLineTable tableType="ADDRESS" headers={address_headers} /> */}
										<Paper>
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
												/>
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


											</Grid>
										</Paper>


										<h3 className="mt-24 mb-12">Contacts</h3>
										{/* <CustomerLineTable tableType="BILLING_SETTING" headers={billing_headers} /> */}
										<Paper>
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
												/>
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


											</Grid>
										</Paper>
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

										id="AccountTypeGroup"
										label="Account Type Group"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										value={this.state.AccountTypeGroup || 0}
										onChange={this.handleChange('AccountTypeGroup')}
										margin="dense"
										variant="outlined"
										fullWidth
									>
										{accountTypesGroups.map((x, index) => (
											<MenuItem key={index} value={index}>{x}</MenuItem>
										))}
									</TextField>
									<TextField
										select

										id="AccountType"
										label="Account Type"
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
										{accountTypeTexts.map((x, index) => (
											<MenuItem key={index} value={index}>{x}</MenuItem>
										))}
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
												checked={this.state.filters.StatusNames.length >= 6}
												onChange={this.handleChange('filters.StatusNames')}
												value="All"
											/>
										}
										label="All"
									/>
									{
										// customerStatusListTexts
										[
											"Active",
											"Cancelled",
											"Inactive",
											"Suspended",
											"Transferred",
											"Unknown",
										]
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
		getCustomers: Actions.getCustomers,
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
		filters: customers.filters,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
