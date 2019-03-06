import React from 'react';
import moment from "moment"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import { IconButton, OutlinedInput, Slide, Select, ListItemLink } from '@material-ui/core';

// for store
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { withStyles } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import * as Actions from 'store/actions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import classNames from 'classnames';

import {
	TableHeaderRow,
	TableEditColumn,

} from '@devexpress/dx-react-grid-material-ui';

import NewIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import CancelIcon from '@material-ui/icons/Cancel';
import GridContainer from "../../../Commons/Grid/GridContainer";
import GridItem from "../../../Commons/Grid/GridItem";
import _ from "lodash";


const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: "#3c93ec",
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: "white",
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            {children}
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

const styles = theme => ({
	root: {

	},
	button: {
		margin: theme.spacing.unit,
	},
	dropdownMenu: {
        '& li': {
            fontSize: 12,
            height: 12,
        }
    },
	inputMenu1: {
        padding: '10px 16px',
        width: 125
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    dialogH2: {
        display: "flex",
        alignItems: "center",
        color: "white"
    },
    iconSmall: {
        fontSize: 20
    }
})




class PaymentLockBoxModalForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentWillMount() {

	}
	componentDidMount() {

	}

	handleClose = () => {
		this.props.showPaymentLockBoxModalForm(false)
	};
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
			errorMsg: ""
		});
	};






	autoDistribute = () => {
		this.setState(state => {
			const { PaymentAmount } = this.state
			let floatPaymentAmount = parseFloat(`0${PaymentAmount}`)

			const rows = state.rows.slice();
			for (let i = 0; i < rows.length; i++) {
				let invBalance = parseFloat(`0${rows[i].InvoiceBalance}`)

				if (invBalance <= floatPaymentAmount) {
					rows[i] = { ...rows[i], PaymentAmount: invBalance };
					floatPaymentAmount = floatPaymentAmount - invBalance
				} else {
					rows[i] = { ...rows[i], PaymentAmount: floatPaymentAmount };
					floatPaymentAmount = 0
				}
			}
			return {
				rows: rows,
				overpayment: this.getOverpaymentAmount(rows),
			}
		})
	}


	handleChangeEmailNotesTo = (event, value) => {
		this.setState({ EmailNotesTo: value });
	};


	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Dialog
                    open={this.props.paymentLockBoxModalForm.open}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"md"}
                    fullWidth
				>
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose }>
                        <h2 className={classes.dialogH2}>
                            <SettingsBackupRestore  className={classNames(classes.leftIcon)} />
                            Process LockBox
                        </h2>
                    </DialogTitle>
					<DialogContent>
						<GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl,"mt-24")}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row width:100%">
                            {this.props.bStart && (
								<TextField
									margin="none"
									label="Date"
									name="Date"
									// type="date"
									variant="outlined"
									value={this.props.data.ExceptionItems[0].lboxdate}
									onChange={this.handleChange}
									fullWidth
									required
									className={classes.textField}
									InputProps={{
										classes: {
											input: classes.input1,
										},
									}}
									InputLabelProps = {{
										shrink: true,
										classes: {outlined: classes.label}
									}}
								/>)}
							</GridItem>
                            {/* <GridItem xs={12} sm={6} md={6} className="flex flex-row ">
								<TextField
									margin="none"
									label="Year"
									name="Year"
									type="date"
									variant="outlined"
									value={this.state.Year}
									onChange={this.handleChange}
									fullWidth
									required
									InputProps={{
										classes: {
											input: classes.input1,
										},
									}}
									InputLabelProps = {{
										shrink: true,
										classes: {outlined: classes.label}
									}}
								/>
							</GridItem>
							<GridItem className="flex flex-col w-full pr-6 pl-6">
								<TextField margin="dense" variant="outlined" fullWidth id="Notes" label="Notes" multiline rows="9" rowsMax="9"
									InputLabelProps={{ shrink: true }}
									value={this.state.Notes || ''}
									onChange={this.handleChange('Notes')}
								/>
							</GridItem> */}
						</GridContainer>
					</DialogContent>

					<DialogActions>
						<Button variant="contained" onClick={this.handleCreateCustomerCollection} color="primary" className={classNames("pl-24 pr-24 mb-12 mr-12")}>Save</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		showPaymentLockBoxModalForm: Actions.showPaymentLockBoxModalForm,
	}, dispatch);
}

function mapStateToProps({ paymentlockbox, accountReceivablePayments, auth, chargebacks }) {
	return {
		regionId: auth.login.defaultRegionId,
        paymentLockBoxModalForm: paymentlockbox.paymentLockBoxModalForm,
        data: paymentlockbox.data,
        bStart              : paymentlockbox.bStart,

	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentLockBoxModalForm)));