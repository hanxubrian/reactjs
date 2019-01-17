import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Icon, IconButton, Tooltip } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
})
class DialogEmailToCustomer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			bOpenEmailToCustomerDialog: props.bOpenEmailToCustomerDialog
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log("bOpenEmailToCustomerDialog", nextProps.bOpenEmailToCustomerDialog)
		this.state = {
			bOpenEmailToCustomerDialog: nextProps.bOpenEmailToCustomerDialog
		}
	}

	handleClose = () => {
		// this.setState({ bOpenEmailToCustomerDialog: false });
		this.props.openEmailToCustomerDialog(false);
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					open={this.state.bOpenEmailToCustomerDialog}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">New Message</DialogTitle>
					<DialogContent>
						<DialogContentText></DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="From"
							label="From"
							type="email"
							variant="outlined"
							fullWidth
						/>

						<TextField margin="dense" id="To" label="To" type="email" variant="outlined" fullWidth />
						<TextField margin="dense" id="Cc" label="Cc" type="email" variant="outlined" fullWidth />
						<TextField margin="dense" id="Bcc" label="Bcc" type="email" variant="outlined" fullWidth />

						<TextField margin="dense" id="Subject" label="Subject" type="email" variant="outlined" fullWidth />

						<TextField id="Message" label="Message" multiline rows="3" rowsMax="3" margin="dense" variant="outlined" fullWidth />

						<Tooltip title="Discard">
							<IconButton
								className={classes.button}
								aria-label="Attachment"
								onClick={this.handleClose}>
								<Icon>attach_file</Icon>
							</IconButton>
						</Tooltip>
					</DialogContent>

					<DialogActions>


						<Tooltip title="Discard">
							<IconButton
								className={classes.button}
								aria-label="Discard"
								onClick={this.handleClose}>
								<Icon>delete</Icon>
							</IconButton>
						</Tooltip>
						<Button variant="contained" onClick={this.handleClose} color="primary"> Send&nbsp;&nbsp;&nbsp;<Icon className={classes.rightIcon}>send</Icon> </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openEmailToCustomerDialog: Actions.openEmailToCustomerDialog,
	}, dispatch);
}

function mapStateToProps({ customers }) {
	return {
		bOpenEmailToCustomerDialog: customers.bOpenEmailToCustomerDialog,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(DialogEmailToCustomer)));

