import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// core components
import {
    Paper, TextField, Typography, MenuItem, Card,  CardHeader, CardContent, Divider, Button,
    Snackbar, SnackbarContent, IconButton
} from '@material-ui/core';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';


// theme components
import {FuseAnimate} from '@fuse';
import {withStyles} from "@material-ui/core";

//Custom components
import GridContainer from "Commons/Grid/GridContainer";
import GridItem from "Commons/Grid/GridItem";
import LeaseLine from "./LeaseLine"

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

// third party
import "react-table/react-table.css";
import _ from 'lodash';
import Chance from 'chance'
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import moment from 'moment'
import PropTypes from 'prop-types';

//Utility
import {escapeRegexCharacters} from 'services/utils'

const styles = theme => ({
    layoutForm: {
        flexDirection: 'row',
    },
    button: {
        '& span':{
            textTransform: 'none'
        }
    },
    card: {
        width   : '100%',
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    formControl: {
        marginBottom: 12,
        minWidth: 200,
    },
    textField: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },
    summary: {
        fontSize: 15,
        fontWeight: 700
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
    cardHeader       : {
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
        '& h6':{
            lineHeight: 1.6,
            fontSize: 14
        }
    },
    input: {
        padding: '12px 14px'
    },
    label: {
        transform: 'translate(14px, 14px) scale(1)'
    },
    inputOrange: {
        padding: '12px 14px',
        color: 'orange'
    }
});
const chance = new Chance();

const newLeaseState = {
    "MasterTrxTypeListId": "",
    "RegionId": "",
    "RegionName": "",
    "LeaseId": "",
    "LeaseDate": new Date(),
    "DueDate": new Date(),
    "CustomerId": "",
    "CustomerNo": "",
    "CustomerName": "",
    "EBill": "",
    "PrintLease": "",
    "LeaseDescription": "",
    "LeaseAmount": "",
    "LeaseTax": "",
    "LeaseTotal": "",
    "CPI": "",
    "TransactionStatusListId": "",
    "TransactionStatus": "",
    "LeaseBalanceAmount": "",
    "LeaseBalanceTax": "",
    "LeaseBalanceTotal": "",
    "EBillText": "",
    "PrintLeaseText": "",
    "IsOpen": "",
    "ConsolidatedLease": "",
    "ConsolidatedLeaseId": "",
    "ConsolidatedLeaseNo": "",
    "CreditId": "",
    "Service":"",
    "notes": ""
};

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

//Snackbar
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);


class LeaseForm extends Component {
    state = {
        customers: [],
        franchisees: [],
        ...newLeaseState,
        value: '',
        suggestions: [],
        selectedCustomer: null,
        fSuggestions: [],
        selectedFranchisee: null,
        labelWidth: 0,
        selectedWork: "",
        total: 0.0,
        subTotal: 0.0,
        tax: 0,
        markup: 0.0,
        LeaseNo: "",
        snackMessage: "",
        openSnack: false
    };

    renderInputComponent = (inputProps ) => {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps ;

        return (
            <TextField
                fullWidth
                variant="outlined"
                label="Lease For:"
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                InputLabelProps = {{
                    classes: {outlined: classes.label}
                }}
                required
                {...other}
                autoFocus={true}
            />
        );
    };

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue.toString()
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if(value.length<2) return;

        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue =  (suggestion) =>{
        this.setState({selectedCustomer: suggestion});
        return suggestion.CustomerName;
    };

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const regex = new RegExp(escapedValue, 'i');
        if(this.props.customers!==null)
            return this.props.customers.filter(customer => regex.test(customer.CustomerName));
    };

    getTotal = () => {
        let subTotal = 0.0;
        let markup = 0.0;
        let tax = 0.0;

        if(this.props.leaseForm.data===null) return;

        const data = [...this.props.leaseForm.data.line];

        data.forEach(n => {
            let mk = 0.;
            let qty = 0;
            if(n.quantity!=='') qty = n.quantity;
            if(n.markup!=='') mk = n.markup;
            subTotal += parseFloat(n.extended);
            tax += parseFloat(n.tax);
            markup += parseFloat(n.extended*qty*parseFloat(mk)/100);
        });

        this.setState({subTotal: subTotal});
        this.setState({markup: markup});
        this.setState({tax: tax});
        this.setState({total: subTotal+tax+markup});
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.leaseForm!== prevProps.leaseForm) {
            this.getTotal();
        }
        if(this.state.selectedCustomer!== null && JSON.stringify(this.state.selectedCustomer)!== JSON.stringify(this.props.leaseForm.customer)) {
            this.props.selectCustomer(this.state.selectedCustomer);
        }
    }

    componentWillMount(){

    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.leaseForm.customer!==null){
    //         if(nextProps.leaseForm.type==='edit')
    //             this.setState({LeaseNo: nextProps.leaseForm.customer.LeaseNo});
    //         this.setState({value: nextProps.leaseForm.customer.CustomerName});
    //         this.setState({CustomerNo: nextProps.leaseForm.customer.CustomerNo});
    //         this.setState({LeaseDate: moment(nextProps.leaseForm.customer.LeaseDate).format('MM/DD/YYYY')});
    //         this.setState({DueDate: moment(nextProps.leaseForm.customer.DueDate).format('MM/DD/YYYY')});
    //     }
    // }

    componentDidMount(){
        if(this.props.leaseForm.type === 'new')
            this.setState({LeaseNo: "PENDING"});

        if(this.input) {
            setTimeout(() => {this.input.focus()}, 500);
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    onSaveLease = () => {
        if(this.state.selectedCustomer===null){
            this.setState({snackMessage: 'Please choose customer from Lease suggestion'});
            this.setState({openSnack: true});
            return;
        }


        let items = [];
        let lines = this.props.leaseForm.data.line;
        //
        lines.forEach(line=>{
            let item = {
                ServiceTypeListId: 0,
                Descrption: line.description,
                LineNo: 1,
                UnitPrice: line.amount,
                Quantity: parseInt(line.quantity),
                TaxRate: line.tax,
                ExtendedPrice: line.extended,
                Total: line.total,
                MarkUpTotal: line.markup,
                Commission: 0,
                CommissionTotal: 0,
                ExtraWork: 1,
                TaxExcempt: 1,
                Distribution: []
            };
            let franchisees = [];

            if(line.franchisees.length>0) {
                line.franchisees.forEach(f=>{
                    franchisees.push(
                        {
                            FranchiseeId: 12,
                            FranchiseNumber: f.fnumber,
                            LineNo: 1,
                            Name: f.name,
                            Description: "Work done",
                            Amount: f.amount
                        }
                    )

                })
            }
            item.Distribution.push(franchisees);

            items.push(item);
        });

        let result = {
            CustomerId: this.state.selectedCustomer.CustomerId,
            PeriodId: this.props.leases.PeriodId[0],
            PeriodMonth: moment().month()+1,
            PeriodYear: moment().year(),
            Description: this.state.LeaseDescription,
            Notes: this.state.note,
            RegionId: this.props.regionId,
            BillRunId: 999,
            LeaseDate: this.state.LeaseDate,
            CreatedById: this.props.user.UserId,
            CreatedDate: moment().format('MM/DD/YYYY'),
            SubTotal: this.state.subTotal,
            MarkupAmountTotal :this.state.markup,
            CPIIncrease: 0.00,
            TaxTotal: this.state.tax,
            GrandTotal: this.state.total,
            LeaseItems: [
                {
                    Inv_No: chance.guid()+'_pending',
                    Items: items
                }
            ]
        };
        console.log('result', JSON.stringify(result));
    };

    onSaveAndAddMore=()=>{
        this.onSaveLease();
        this.props.resetLeaseForm();
        this.setState({LeaseDescription: ''});
        this.setState({note: ''});
        this.setState({selectedCustomer: null});
        this.setState({value: ''});
        this.setState({CustomerNo: ''});
    };

    onSubmitForApproval=()=>{
        this.onSaveLease();
    };

    onSaveAndClose = () => {
        this.onSaveLease();
        this.closeComposeForm();
    };

    closeComposeForm = () => {
        this.props.leaseForm.type === 'edit' ? this.props.closeEditLeaseForm() : this.props.closeNewLeaseForm();
    };

    handleDueDateChange = date => {
        this.setState({ DueDate: date});
    };
    handleLeaseDateChange = date => {
        this.setState({ LeaseDate: date });
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };

    render()
    {
        const { classes} = this.props;
        const { value, suggestions } = this.state;

        const today = new Date();

        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };


        let bReadonly = false;
        if(this.props.leaseForm.type === 'new') bReadonly = true;

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="h-full flex flex-col relative">
                    <div className="flex flex-col p-24 pt-12 pb-0" style={{flex: "1"}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <GridContainer className={classNames(classes.formControl)}>
                                <GridItem xs={12} sm={6} md={6} className="flex flex-row">
                                    <Autosuggest
                                        {...autosuggestProps}
                                        inputProps={{
                                            classes,
                                            placeholder: 'Search Franchisee Name or Number',
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
                                        ref={this.storeInputReference}
                                    />
                                </GridItem>
								<GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col">
                                    <TextField
                                        margin="none"
                                        label="Lease #"
                                        placeholder="Lease #"
                                        InputProps={{
                                            readOnly: bReadonly,
                                            classes: {
                                                input: bReadonly? classes.inputOrange: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        name="LeaseNo"
                                        variant="outlined"
                                        value={this.state.LeaseNo}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        style = {{fontSize: this.props.leaseForm.type === 'new' ? '18px!important': 'inherit',
                                            fontWeight: this.props.leaseForm.type === 'new' ? 700: 'inherit'
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col xs:mb-24">
                                    <DatePicker
                                        margin="none"
                                        label="Date Signed"
                                        name="DateSigned"
                                        variant="outlined"
                                        format="MM/dd/YYYY"
                                        value={this.state.LeaseDate}
                                        onChange={this.handleLeaseDateChange}
                                        fullWidth
                                        required
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2} className="flex flex-row xs:flex-col">
                                    <DatePicker
                                        margin="none"
                                        label="Payment Starts"
                                        format="MM/dd/YYYY"
                                        name="PaymentStarts"
                                        variant="outlined"
                                        value={this.state.DueDate}
                                        onChange={this.handleDueDateChange}
                                        required
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.input,
                                            },
                                        }}
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </MuiPickersUtilsProvider>
                        <GridContainer className={classNames(classes.formControl, "mb-0")}>
                            <GridItem xs={12} sm={6} md={6} className="flex flex-row xs:flex-col">
                                <Card className={classes.card}>
                                    <CardHeader title="Franchisee" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>
                                        <Typography variant="subtitle1" color="inherit">
                                            <strong>Franchisee Name: {this.state.selectedCustomer ? this.state.selectedCustomer.CustomerName: this.state.value}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Franchisee No: {this.state.selectedCustomer? this.state.selectedCustomer.CustomerNo: this.state.CustomerNo}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Address: {this.state.selectedCustomer ? this.state.selectedCustomer.Address: ''}
                                        </Typography>
                                        {this.state.selectedCustomer && (
                                            <Typography variant="subtitle1" color="inherit">
                                                {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} className= "flex flex-row justify-end xs:flex-col">
                                <Card className={classes.card}>
                                    <CardHeader title="Billing" className={classNames(classes.cardHeader, "flex-1")} />
                                    <CardContent className={classNames(classes.cardContent)}>
                                        <Typography variant="subtitle1" color="inherit">
                                            <strong>Billing Name: {this.state.selectedCustomer ? this.state.selectedCustomer.CustomerName: this.state.value}</strong>
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Customer No: {this.state.selectedCustomer ? this.state.selectedCustomer.CustomerNo: this.state.CustomerNo}
                                        </Typography>
                                        <Typography variant="subtitle1" color="inherit">
                                            Address: {this.state.selectedCustomer ? this.state.selectedCustomer.Address: ''}
                                        </Typography>
                                        {this.state.selectedCustomer && (
                                            <Typography variant="subtitle1" color="inherit">
                                                {this.state.selectedCustomer.City}, {this.state.selectedCustomer.StateName} {this.state.selectedCustomer.PostalCode}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </GridItem>
                        </GridContainer>
                        <div className="w-full mt-4">
                            <TextField
                                id="LeaseDescription"
                                name="LeaseDescription"
                                label="Description"
                                className={classes.textField}
                                value={this.state.LeaseDescription}
                                onChange={this.handleChange}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                InputLabelProps = {{
                                    shrink: true,
                                    classes: {outlined: classes.label}
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.input, multiline: classes.input
                                    },
                                }}
                            />
                        </div>
                        <GridContainer className={classNames(classes.formControl)} style={{flex: "9999 1 0"}}>
                            <GridItem xs={12} sm={12} md={12} className="flex flex-row xs:flex-col xs:mb-24">
                                <LeaseLine />
                            </GridItem>
                        </GridContainer>
                        <Divider variant="middle"/>
                    </div>
                    <div className="flex flex-shrink flex-col w-full pl-24 pr-24 pt-0 pb-12">
                        <GridContainer style={{alignItems: 'center'}} className={classNames(classes.formControl)}>
                            <GridItem xs={12} sm={9} md={9} className="flex flex-col xs:flex-col xs:mb-24">
                                <div className="w-full">
                                    <TextField
                                        id="note"
                                        name="note"
                                        label="Note"
                                        className={classes.textField}
                                        value={this.state.note}
                                        onChange={this.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        InputLabelProps = {{
                                            shrink: true,
                                            classes: {outlined: classes.label}
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: classes.input, multiline: classes.input
                                            },
                                        }}
                                        rows={3}
                                    />
                                </div>
                            </GridItem>
                            <GridItem xs={12} sm={3} md={3} className="flex flex-col xs:flex-col xs:mb-24">
                                <div className="w-full p-12 flex justify-end pb-0">
                                    <span className={classes.summary}><strong>Subtotal: </strong>${this.state.subTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end pb-0 pt-6 ">
                                    <span className={classes.summary}><strong>Markup Total: </strong>${this.state.markup.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end pt-6 pb-6">
                                    <span className={classes.summary}><strong>Tax: </strong>${this.state.tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                                <div className="w-full p-12 flex justify-end  pt-6 pb-6">
                                    <span className={classes.summary}><strong>Grand Total: </strong>${this.state.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className="flex flex-1 flex-row justify-between items-center">
                            <div className="flex flex-row justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <span className={classes.summary}><strong>Created By: </strong>{`${this.props.user.firstName} ${this.props.user.lastName}, ${moment(today).format('MM/DD/YYYY')}`}</span>
                                </FuseAnimate>
                            </div>
                            <div className="flex flex-1 flex-row justify-end">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSaveAndAddMore();
                                        }}
                                    >
                                        Save & Add more
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSaveAndClose();
                                        }}
                                    >
                                        Save & Close
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.button, "mr-12")}
                                        onClick={() => {
                                            this.onSubmitForApproval();
                                        }}
                                    >
                                        Submit for Approval
                                    </Button>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => {
                                            this.closeComposeForm();
                                        }}
                                    >
                                        Close
                                    </Button>
                                </FuseAnimate>
                            </div>
                        </div>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnack}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose}
                            variant="error"
                            message={this.state.snackMessage}
                        />
                    </Snackbar>
                </div>
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openEditLeaseForm: Actions.openEditLeaseForm,
        closeEditLeaseForm: Actions.closeEditLeaseForm,
        closeNewLeaseForm : Actions.closeNewLeaseForm,
        selectCustomer: Actions.selectCustomer,
        resetLeaseForm: Actions.resetLeaseForm
    }, dispatch);
}

function mapStateToProps({leases, auth})
{
    return {
        leaseForm: leases.leaseForm,
        leases: leases,
        user: auth.login,
        regionId: auth.login.defaultRegionId,
        bStartingSaveFormData: leases.bStartingSaveFormData
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaseForm)));
