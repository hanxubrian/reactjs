import React, { Component } from 'react';

import { Icon, IconButton, Input, Paper, Button } from '@material-ui/core';
import classNames from 'classnames';

import { withStyles } from "@material-ui/core";

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

const styles = theme => ({
	content: {
		position: 'relative'
	},
	search: {
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
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

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class ChargeBackSearchBar extends Component {

	timer = null;

	constructor(props) {
		super(props)

		this.state =
			{
				s: ""
			}
	}
	componentDidMount() {
		console.log("componentDidMount");
		document.addEventListener("keydown", this.handleKeyDown, false);
	}

	handleKeyDown = (event) => {
		console.log("escFunction");

		if (event.keyCode === ENTER_KEY) {
			clearTimeout(this.timer)
			this.triggerChange()
		} else if (event.keyCode === 27) {
			clearTimeout(this.timer)
			this.setState({ s: '' });
			this.triggerChange()
		}
	}

	handleChange = prop => event => {
		console.log("handleChange");


		this.setState({ [prop]: event.target.value });

		if (prop === 's') {
			clearTimeout(this.timer);
			this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
		}
	};

	triggerChange = (s = this.state.s) => {

		console.log("start to search", s)

		this.props.applySearchText(s);
	}

	clearSearch = () => {
		clearTimeout(this.timer)
		this.setState({ s: '' });
		this.triggerChange('')
	}

	render() {
		const {
			classes,
		} = this.props

		return (
			<div className="flex flex-row items-center">
				<div className="flex items-center justify-start p-12">
					<Button
						onClick={this.props.toggleFilterPanel}
						aria-label="toggle filter panel"
						color="secondary"
						className={classNames(classes.filterPanelButton)}
					>
						<img className={classes.imageIcon} alt="" src="assets/images/invoices/filter.png" />
					</Button>
				</div>

				<Paper className={"flex items-center w-full h-44 mr-0"} elevation={1}>
					<Icon color="action" className="ml-16">search</Icon>
					<Input
						placeholder="Search..."
						className={classNames(classes.search, 'pl-16')}
						disableUnderline
						fullWidth
						value={this.state.s}
						onChange={this.handleChange('s')}
						inputProps={{
							'aria-label': 'Search'
						}}
					/>

					<IconButton
						className={classNames(classes.button)}
						aria-label="Add an alarm"
						onClick={this.clearSearch}>
						<Icon color="action">close</Icon>
					</IconButton>

				</Paper>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		toggleFilterPanel: Actions.toggleFilterPanel,

		applySearchText: Actions.applySearchText_ARP,
	}, dispatch);
}

function mapStateToProps({ chargebacks }) {
	return {
		bOpenedFilterPanel: chargebacks.bOpenedFilterPanel,

		searchText: chargebacks.searchText,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ChargeBackSearchBar)));
