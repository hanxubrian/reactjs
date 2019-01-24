import React, { Component, Fragment } from 'react';
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

import { SelectionPanel } from "./CustomizedDxGridSelectionPanel";

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



class FilterPanel extends Component {

    constructor(props) {
        super(props)
    }


    componentWillMount() {

    }


    render() {
        const { classes, verificationForm } = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-col")}>
                <Paper className="flex flex-1 flex-col min-h-px p-20">
                     <div>
                                <GridContainer style={{ alignItems: 'center', width: 500 }} className={classNames(classes.formControl)}>
                                    <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                        <h3 className="mt-24">Filter Information</h3>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                        <TextField
                                            id="Name"
                                            label="Name *"
                                            className={classes.textField}
                                            //value={this.state.customerName}
                                            //onChange={this.handleChange('customerName')}
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
                                            //value={this.state.customerAddress}
                                            //onChange={this.handleChange('customerAddress')}
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
                                            //onChange={this.handleChange('Address2')}
                                            margin="dense"
                                            variant="outlined"
                                            fullWidth />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} className="flex flex-row">
                                        <TextField
                                            id="outlined-name"
                                            label="City *"
                                            className={classNames(classes.textField, 'mr-6')}
                                            //value={this.state.customerCity}
                                            //onChange={this.handleChange('customerCity')}
                                            margin="dense"
                                            variant="outlined"
                                            style={{ width: '55%' }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Zip *"
                                            className={classNames(classes.textField, 'ml-6')}
                                            //value={this.state.customerZip}
                                            //onChange={this.handleChange('customerZip')}
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
                                                    //inputComponent: TextMaskPhone,
                                                    maxLength: 40,
                                                   // value: this.state.customerPhone,
                                                   // onChange: this.handleChange('customerPhone')
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
                                                    //inputComponent: TextMaskPhone,
                                                    maxLength: 40,
                                                   // value: this.state.customerFax,
                                                    //onChange: this.handleChange('customerFax')
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
                                            //value={this.state.customerEmail}
                                            //onChange={this.handleChange('customerEmail')}
                                            margin="dense"
                                            variant="outlined"
                                            style={{ width: '100%' }}
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Website"
                                            className={classNames(classes.textField, 'ml-6')}
                                            //value={this.state.customerWebsite}
                                            //onChange={this.handleChange('customerWebsite')}
                                            margin="dense"
                                            variant="outlined"
                                            style={{ width: '100%' }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} className="flex flex-col">
                                        <div className="flex justify-around">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        //checked={this.state.NationalAccount}
                                                        checked={true}
                                                        //onChange={this.handleChangeChecked('NationalAccount')}
                                                        value="NationalAccount"
                                                    />
                                                }
                                                label="National Account"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        //checked={this.state.ChildAccount}
                                                        checked={true}
                                                        //onChange={this.handleChangeChecked('ChildAccount')}
                                                        value="ChildAccount"
                                                    />
                                                }
                                                label="Child Account"
                                            />
                                        </div>
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
        toggleStatus: Actions.toggleVerificationStatus
    }, dispatch);
}

function mapStateToProps({ verifications, auth }) {
    return {
        filterState: verifications.bOpenedFilterPanel,
        transactionStatus: verifications.transactionStatus,
        verifications: verifications.verificationsDB,
        verificationForm: verifications.verificationForm,
        regionId: auth.login.defaultRegionId,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPanel)));
