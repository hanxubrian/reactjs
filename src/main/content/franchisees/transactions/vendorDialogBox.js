import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// core components
import {
    TextField, Typography, Button, IconButton, Grid, Dialog, NoSsr
} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import 'date-fns'
import CloseIcon from '@material-ui/icons/Close';


// theme components
import {FuseAnimate} from '@fuse';
import {withStyles} from "@material-ui/core";

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from '../../../../store/actions';

// third party
import _ from 'lodash';
import moment from 'moment'
import Select from 'react-select';

//Utility
import {escapeRegexCharacters} from 'services/utils'
import {
    Control, Menu, NoOptionsMessage, Option,  Placeholder,  SingleValue, ValueContainer
} from "../../accounts-receivable/Invoice/selectUtils";
import {emphasize} from "@material-ui/core/styles/colorManipulator";

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
    input: {
        padding: '12px 14px'
    },
    label: {
        transform: 'translate(14px, 14px) scale(1)'
    },
    inputOrange: {
        padding: '12px 14px',
        color: 'orange'
    },
    dropdownMenu: {
        '& li': {
            fontSize: 12,
            height: 12,
        }
    },
    picker: {
        padding: '0 6px'
    },
    root1: {
        flexGrow: 1,
    },
    input1: {
        display: 'flex',
        padding: '12px 12px'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 14,
    },
    placeholder: {
        position: 'absolute',
        left: 6,
        fontSize: 14,
    },
    paper: {
        position: 'absolute',
        zIndex: '9999!important',
        marginTop: theme.spacing.unit,
        fontSize: 14,
        left: 0,
        right: 0
    },
});

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
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
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);



class VendorDialogBox extends Component {
    state = {
        vendor_no: '',
        vendorDate: moment().format('YYYY-MM-DD'),
        vendor: null
    };

    componentDidUpdate(prevProps, prevState, snapshot){
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount(){
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));

    };

    updateVendor = () => {
        const {vendor, vendor_no, vendorDate} = this.state;
        this.props.updateVendor({vendor, vendor_no, vendorDate});
        this.props.hideVendorDialogBox();
    };

    isDisable = ()=>{
      if(this.state.vendor===null || this.state.vendor_no==='') return true;
      return false;
    };

    handleVendorChange = (newValue)=> {
        this.setState({vendor: newValue});
    };

    render()
    {
        const {classes} = this.props;
        const vendors = [
            {value:'PFO', label: 'Purchase from Office'},
            {value: '1120',label: 'PHILIP ROSENAU CO. INC.'},
            {value: 'ABCPAPER',label: 'ABC PAPER &amp; CHEMICAL INC.'},
            {value: 'ACA',label: 'ACA ENTERPRISES'},
            {value: 'ACCOMMODAT',label: 'ACCOMMODATION MOLLEN, INC.'},
            {value: 'ADV001',label: 'ADVANCE PRODUCTS &amp; BRUSH CO.'},
            {value: 'AFFLINK',label: 'AFFLINK c/o Wachovia Bank'},
            {value: 'ALPHA',label: 'ALPHASOURCE-PHILADELPHIA WIPER'},
            {value: 'AMSAN',label: 'AMSAN'},
            {value: 'BASIC',label: 'BASIC MAINTENANCE SUPPLY COMPA'},
            {value: 'BOBLILLY',label: 'BOB LILLY PROFESSIONAL PROMO'},
            {value: 'BURRELL',label: 'K &amp; L BURRELL ENTERPRISES LLC'},
            {value: 'CER001',label: 'CERTIFIED CHEMICAL CO.'},
            {value: 'CON001',label: 'CONTRACT CLEANERS SUPPLY INC.'},
            {value: 'EAGLE',label: 'EAGLE MAINTENANCE SUPPLY, INC.'},
            {value: 'ECOLAB',label: 'ECOLAB, INC.'},
            {value: 'FRA001',label: 'FRANKLIN CHEMICAL &amp; EQUIPMENT'},
            {value: 'GELMARC',label: 'GELMARC DISTRIBUTORS, INC'},
            {value: 'GRAINGER',label: 'GRAINGER'},
            {value: 'HILDEL',label: 'HILLYARD INC. - DELEWARE'},
            {value: 'HILL001',label: 'HILLYARD, INC - LANCASTER'},
            {value: 'HPI',label: 'HPI DIRECT'},
            {value: 'IMA001',label: 'IMAGE FIRST PROFESSIONAL APPAR'},
            {value: 'J.W.&amp;ASSOC',label: 'J.W. &amp; ASSOCIATES'},
            {value: 'JK SUPP',label: 'JANI-KING INTERNATIONAL, INC.'},
            {value: 'L B',label: 'L B SUPPLY'},
            {value: 'LEB001',label: 'LEBANON VALLEY PAPER COMPANY'},
            {value: 'MAS',label: 'MASTER CHEMICAL PRODUCTS INC'},
            {value: 'MEYER',label: 'MEYER LABORATORY INC'},
            {value: 'MODERN',label: 'MODERN GAS SALES INC'},
            {value: 'NIX001',label: 'NIXON UNIFORMS'},
            {value: 'PCA001',label: 'PCA INDUSTRIAL &amp; PAPER SUPPLIE'},
            {value: 'PEN001',label: 'PENN VALLEY CHEMICAL COMPANY'},
            {value: 'PROMOWORX',label: 'PROMOWORX, INC.'},
            {value: 'QUA001',label: 'QUAKER CITY PAPER COMPANY'},
            {value: 'ROOMS',label: 'ROOM SERVICE AMENITIES'},
            {value: 'SINGER',label: 'SINGER EQUIPMENT COMPANY'},
            {value: 'STCLAIR',label: 'ST. CLAIR PLASTICS CO.'},
            {value: 'SUBURBAN',label: 'SUBURBAN PAPER CO.'},
            {value: 'SUPERIOR',label: 'SUPERIOR SERVICE &amp; SUPPLY CO.'},
            {value: 'SUPPLY',label: 'INTERLINE BRANDS INC.'},
            {value: 'TRA001',label: 'TRAY S WHOLESALE, INC.'},
            {value: 'TRE002',label: 'TREXLER-HAINES GAS, INC.'},
            {value: 'TRIPLE',label: 'SSS TRIPLE S'},
            {value: 'TRIPLE2',label: 'TRIPLE S'},
            {value: 'USPRODUCTS',label: 'U.S. PRODUCTS'},
            {value: 'WIWIN',label: 'WIWIN ENTERPRISE, LLC'},
            {value: 'YKERO',label: 'YIBEGETA Y. KERO'},
            {value: 'ZIM001',label: 'ZIMMERMAN, INC.'},
            {value: 'ZIMMER',label: 'ZIMMERMAN MONTCO SANITARY INC.'}
    ];

        const selectStyles = {
            input: base => ({
                ...base,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        console.log('vendor= ', this.state)

        const components = { Control, Menu, NoOptionsMessage, Option, Placeholder, SingleValue, ValueContainer };

        return (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="">
                    <Dialog
                        open={this.props.bVendorBox}
                        onClose={()=> this.props.hideVendorDialogBox()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        maxWidth={'sm'}
                    >
                        <DialogTitle id="alert-dialog-title">Vendor Information</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <div className={classes.root1}>
                                        <NoSsr>
                                            <Select
                                                classes={classes}
                                                styles={selectStyles}
                                                value={this.state.vendor}
                                                components={components}
                                                onChange={(v)=>this.handleVendorChange(v)}
                                                options={vendors}
                                                placeholder="Select a vendor"
                                            />
                                        </NoSsr>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        name="vendor_no"
                                        value={this.state.vendor_no}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal"
                                        id="vendor_no"
                                        label="Vendor Invoice No"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        label="Vendor Date"
                                        name="vendorDate"
                                        type="date"
                                        variant="outlined"
                                        value={this.state.vendorDate}
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
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=> this.props.hideVendorDialogBox()} color="primary">
                                Close
                            </Button>
                            <Button
                                disabled={this.isDisable() ? true: false}
                                onClick={()=>this.updateVendor()} color="primary" autoFocus>
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showVendorDialogBox: Actions.showVendorDialogBox,
        hideVendorDialogBox: Actions.hideVendorDialogBox,
        updateVendor: Actions.updateVendor,
    }, dispatch);
}

function mapStateToProps({transactions})
{
    return {
        transactionForm: transactions.transactionForm,
        bVendorBox: transactions.transactionForm.bVendorBox
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorDialogBox)));
