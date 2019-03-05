import React from 'react';
import _ from "lodash";
import TextField from '@material-ui/core/TextField';
import { Divider, FormControl, InputLabel, Select} from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import ReactDataGrid from "react-data-grid";

const hexToRgb = (hex) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const styles = theme => ({

	root: {
		width: '90%',
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
	},
	backButton: {
		marginRight: theme.spacing.unit
	},
	completed: {
		display: 'inline-block'
	},
	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	//////////////////
	layoutForm: {
		flexDirection: 'row',
	},
	button: {
		marginRight: theme.spacing.unit,
		'& span': {
			textTransform: 'none'
		},
		margin: theme.spacing.unit
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
	tableTheadRow: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
	},

});

const CurrencyFormatter = ({ value }) => (<span>$ {parseFloat(`0${value}`).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>);
const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, '$2/$3/$1');

class TransactionsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ key: "InvoiceNo", name: "Invoice No", editable: false },
				{ key: "Description", name: "Description", editable: false },
				{ key: "InvDate", name: "Invoice Date", editable: false, formatter: DateFormatter },
				{ key: "DueDate", name: "Due Date", editable: false, formatter: DateFormatter, sortDescendingFirst: true },
				{ key: "Class", name: "Class", editable: false },
				{ key: "IC", name: "I / C", editable: false },
				{ key: "Qty", name: "Qty", editable: false },
				{ key: "Amount", name: "Amount", editable: false, formatter: CurrencyFormatter },
				{ key: "ApplyTo", name: "Apply To", editable: true, formatter: CurrencyFormatter },
			],
			rows: [],

		}
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		const { classes } = this.props;
		const { columns, rows } = this.state;

		return (
			<div className="flex flex-col flex-1">
				<div className={classNames("flex flex-col")}>
					<div className={classNames('items-center')}>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="Description"
								label="Description"
								className={classes.textField}
								InputLabelProps={{ shrink: true }}
								value={this.state.Description}
								onChange={this.handleChange('Description')}
								margin="dense"
								// variant="outlined"
								style={{ minWidth: '100px', width: '70%' }}
							/>
							<FormControl className={classNames(classes.formControl, 'ml-12')} style={{ marginTop: 5, minWidth: "100px", width: "30%" }}>
								<InputLabel shrink htmlFor="contract_lenght">Type</InputLabel>
								<Select
									native
									value={this.state.contract_lenght || ''}
									onChange={this.handleChange('contract_lenght')}
									inputProps={{
										name: 'contract_lenght',
										id: 'contract_lenght',
									}}
								>
									{["B"].map((x, index) => (
										<option key={index} value={index}>{x}</option>
									))}
								</Select>
							</FormControl>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<ReactDataGrid
								columns={columns}
								rowGetter={i => rows[i]}
								rowsCount={rows.length}
								onGridRowsUpdated={this.onGridRowsUpdated}
								enableCellSelect={true}
							/>
						</div>
						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="InvoiceMessge"
								label="Invoice Messge"
								className={classes.textField}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceMessge}
								onChange={this.handleChange('InvoiceMessge')}
								margin="dense"
								fullWidth
							/>
						</div>

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="TotalItems"
								label="Total Items"
								className={classes.textField}
								InputLabelProps={{ shrink: true }}
								value={this.state.TotalItems}
								onChange={this.handleChange('TotalItems')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="InvoiceAmount"
								label="Invoice Amount"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceAmount}
								onChange={this.handleChange('InvoiceAmount')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="InvoiceTax"
								label="Invoice Tax"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceTax}
								onChange={this.handleChange('InvoiceTax')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="InvoiceTotal"
								label="Invoice Total"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.InvoiceTotal}
								onChange={this.handleChange('InvoiceTotal')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="Royalty"
								label="Royalty"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.Royalty}
								onChange={this.handleChange('Royalty')}
								margin="dense"
								fullWidth
							/>
						</div>

						<Divider variant="middle" className='mt-12 mb-12' style={{ alignSelf: 'center', height: 2 }} />

						<div xs={12} sm={12} md={12} className="flex flex-row">
							<TextField
								id="BP"
								label="BP"
								className={classes.textField}
								InputLabelProps={{ shrink: true }}
								value={this.state.BP}
								onChange={this.handleChange('BP')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="AcctAdmin"
								label="Acct / Admin"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.AcctAdmin}
								onChange={this.handleChange('AcctAdmin')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="AdvertFee"
								label="Advert Fee"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.AdvertFee}
								onChange={this.handleChange('AdvertFee')}
								margin="dense"
								fullWidth
							/>
							<TextField
								id="TechnologyFee"
								label="Technology Fee"
								className={classNames(classes.textField, 'ml-12')}
								InputLabelProps={{ shrink: true }}
								value={this.state.TechnologyFee}
								onChange={this.handleChange('TechnologyFee')}
								margin="dense"
								fullWidth
							/>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

	}, dispatch);
}

function mapStateToProps({ customers, auth }) {
	return {

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)));
