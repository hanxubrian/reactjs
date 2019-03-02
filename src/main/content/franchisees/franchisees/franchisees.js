import React, {Component} from 'react';

// core components
import {
    Hidden,
    Icon,
    IconButton,
    Input,
    Paper,
    Button,
    Typography,
    Toolbar,
    CircularProgress, Menu, MenuItem, FormControlLabel
} from '@material-ui/core';

// theme components
import {FuseAnimate} from '@fuse';

//Janiking
import JanikingPagination from './../../../../Commons/JanikingPagination';

import {bindActionCreators} from "redux";
import {withStyles, Checkbox} from "@material-ui/core";
import {Link, withRouter} from 'react-router-dom';

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import SummaryPanel from './SummaryPanel';
import FilterPanel from './filterPanel';

// third party
import classNames from 'classnames';
import ReactTable from "react-table";
import "react-table/react-table.css";

import CreateFranchiseesPage from "./franchiseesForms/createForm"
import FusePageCustomSidebarScroll from "../../../../@fuse/components/FusePageLayouts/FusePageCustomSidebarScroll";

import {withScriptjs, withGoogleMap, GoogleMap, Marker,} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withHandlers } from "recompose";


const headerHeight = 80;

const hexToRgb = (hex) =>{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
        backgroundSize: 'cover',
    },
    layoutRoot: {
        flexDirection: 'row',
        '& .z-9999': {
            height: 64
        },
        '& .-pageSizeOptions': {
            display: 'none'
        },
        '& .ReactTable .rt-noData': {
            top: '250px',
            border: '1px solid coral',
            display: 'none'
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
        '& .openFilter':{
            width: 'inherit'
        },
        '& .openSummary':{
            width: 300
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group':{
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
            width:'inherit!important',
            minWidth:'inherit!important',
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        }
    },
    card: {
        width   : '100%',
        maxWidth: 384,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
    },
    layoutRightSidebar : {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutLeftSidebar : {
        width: 0,
        [theme.breakpoints.down('sm')]: {
            width: 'inherit'
        }
    },
    layoutSidebarHeader: {
        height   : headerHeight,
        minHeight: headerHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
    },
    content:{
        position: 'relative'
    },
    addButton          : {
        position: 'absolute',
        bottom  : -28,
        left    : 16,
        zIndex  : 999,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    removeButton          : {
        position: 'absolute',
        bottom  : -28,
        right    : 16,
        zIndex  : 999,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    imageIcon:{
        width: 24,
        height: 24
    },
    separator: {
        width          : 1,
        height         : '100%',
        backgroundColor: theme.palette.divider
    },
    search: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    tableTheadRow:{
        backgroundColor: theme.palette.primary.main
    },
    tableThEven:{
        backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b +', .3)'
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
    sideButton          : {
        backgroundColor: theme.palette.primary.light,
        height: 46,
        width: 46,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    elementCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .9)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        opacity: 0.5
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    btntop: {
        marginRight: 20
    },
    iconSmall: {
        fontSize: 20,
    }
});

const DEFAULT_ZOOM = 8;
let map_zoom = DEFAULT_ZOOM;

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={map_zoom}
        defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map((x, index) => (
                <Marker
                    key={index}
                    position={{ lat: x.lat, lng: x.lng }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);


const MapWithAMarkerClusterer2 = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyChEVMf9jz-1iVYHVPQOS8sP2RSsKOsyeA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={map_zoom}
        defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map((x, index) => (
                <Marker
                    key={index}
                    position={{ lat: x.lat, lng: x.lng }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

class Franchisees extends Component {
    state = {
        s: '',
        temp: [],
        data: [],
        Active: true,
        InActive: true,
        selection: [],
        selectAll: false,
        regionId: 0,
        statusId: 9,
        current_lat: 0,
        current_long: 0,
        pins: [],
        pins2: [],
        gmapVisible: false,
        insertPayload:[]
    };

    toggleSelection = (key, shift, row) => {
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        if (keyIndex >= 0) {
            selection = [
                ...selection.slice(0, keyIndex),
                ...selection.slice(keyIndex + 1)
            ];
        } else {
            selection.push(key);
        }
        this.setState({ selection });
    };

    toggleAll = (instance) => {
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
            let currentRecords = instance.data;
            let page = this.state.page;
            let pageSize = this.state.pageSize;
            let start_index = page * pageSize;
            let end_index = start_index+pageSize;
            currentRecords.forEach(item => {
                if(item._index>=start_index && item._index<end_index)
                    selection.push(item._original.Id);
            });
        }
        this.setState({ selectAll, selection });
    };

    isSelected = key => {
        return this.state.selection.includes(key);
    };

    constructor(props){
        super(props);
        props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
        this.fetchData = this.fetchData.bind(this);
        this.escFunction = this.escFunction.bind(this);
        if(props.billingLists===null)
            props.getBillingLists(props.regionId);

        if(props.transactionTypeList===null)
            props.getFranchiseeTransactionTypeLists(props.regionId);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let bChanged = false;


        if(this.props.regionId !== prevProps.regionId) {
            this.setState({regionId: prevProps.regionId});
            this.props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
            bChanged = true;
        }
        if(this.props.Location !== prevProps.Location){
            this.props.getFranchisees(this.props.regionId, this.props.statusId, this.props.Location, this.props.Latitude, this.props.Longitude, this.props.SearchText);
            bChanged = true;
        }

        if(bChanged)
            this.getFranchiseesFromStatus();

        if(prevProps.franchisees===null && this.props.franchisees!==null){
            this.getFranchiseesFromStatus();
        }

        if(prevState.s!==this.state.s) {
            this.search(this.state.s);
        }
    }

    componentWillMount(){
        this.setState({
            Active: this.props.Active,
            InActive: this.props.InActive
        });
        this.getFranchiseesFromStatus();
        this.props.getFranchiseeFeeMaintenance(this.props.regionId);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.franchisees===null && nextProps.franchisees!==null)
            this.getFranchiseesFromStatus(nextProps.franchisees);
        if(this.props.franchisees!==nextProps.franchisees)
            this.getFranchiseesFromStatus(nextProps.franchisees);
        if (nextProps.franchisees !== this.props.franchisees) {
            this.initRowsFromRawJson(nextProps.franchisees);
        }
        if (this.props.locationFilterValue !== nextProps.locationFilterValue) {
            this.setState({ locationFilterValue: nextProps.locationFilterValue })
            this.initRowsFromRawJson(this.props.franchisees, nextProps.locationFilterValue);
        }
        if (this.props.detailPayload !== nextProps.detailPayload) {
           console.log("detail",nextProps.detailPayload);
        }
        if (this.props.createPayload !== nextProps.createPayload) {
            console.log("CreatePayload", nextProps.createPayload);
        }
        if(this.props.Active !== nextProps.Active){
            this.setState({
                 Active: nextProps.Active
            });
            this.getFranchiseesFromStatus(this.props.franchisees, nextProps.Active);
        }
        if(this.props.InActive !== nextProps.InActive){
            this.setState({
                 InActive: nextProps.InActive
            });
            this.getFranchiseesFromStatus(this.props.franchisees, this.props.Active, nextProps.InActive);
        }
    }
    getFranchiseesFromStatus =(rawData=this.props.franchisees, Active=this.state.Active, InActive=this.state.InActive) =>{
        let data = [];
        let tempData = [];
        let result = [];
        if(rawData ===null) return;

        if(rawData.Data.Region.length===0){
            data = [];
            this.setState({temp: data});
            this.setState({data: data});
            return;
        }else{
            for(let i= 0 ; i < rawData.Data.Region.length ; i++){
                tempData = rawData.Data.Region[i].Franchisees;
                data = data.concat(tempData);
            }
        }
        data.map(x=>{
            if(Active === true){
               if(x.StatusName === "Y"){
                  result.push(x);
               }
            }
            if(InActive=== true){
                if(x.StatusName === "N"){
                   result.push(x);
                }
             }
        })
        this.setState({temp: result});
        this.setState({data: result});
    };

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
        this.getLocation();
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);

        this.initRowsFromRawJson();

        // this.getLocation();
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({s: ''});
            this.getFranchiseesFromStatus();
        }
    }
    search(val) {
        if(val===''){
            this.getFranchiseesFromStatus();
            return;
        }
        const temp = this.state.data.filter( d => {
            return d.Number.toLowerCase().indexOf(val) !== -1 || !val ||
                d.Name.toLowerCase().indexOf(val) !== -1 ||
                d.Address.toLowerCase().indexOf(val) !== -1 ||
                d.Phone.toLowerCase().indexOf(val) !== -1
        });
        this.setState({temp: temp});
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });

        if(prop==='s') {
            this.search(event.target.value.toLowerCase());
        }
    };

    removeFranchisees = async(id)=> {
        if (window.confirm("Do you really want to remove the selected franchisee(s)")) {
            await this.props.deleteFranchisees(id,this.props.regionId, this.props.insertPayload);
            await this.props.getFranchisees(this.props.regionId);
        }
    };

    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }
    showValidationMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
    closeValidationMenu = () => {
        this.setState({ anchorEl: null });
    }

    canBeSubmitted()
    {
        return true;
    }
    closeComposeForm = () => {
        this.props.franchiseesForm.type === 'create' ? this.props.closeEditFranchisees() : this.props.closeCreateFranchisees();
    };
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        current_lat: position.coords.latitude,
                        current_long: position.coords.longitude
                    })

                    if (this.state.addrLat === undefined) {
                        this.setState({
                            addrLat: position.coords.latitude,
                            addrLng: position.coords.longitude
                        })
                    }
                    if (this.props.locationFilterValue) {
                        this.initRowsFromRawJson();
                    }
                }
            );
        }
    }

    initRowsFromRawJson = (rawData = this.props.franchisees, locationFilterValue = this.props.locationFilterValue) => {
        let all_temp = [];
        if (rawData === null || rawData === undefined) return;

        let regions = rawData.Data.Region.filter(x => {
            return this.props.regionId === 0 || x.Id === this.props.regionId;
        });

        regions.forEach(x => {
            all_temp = [...all_temp, ...x.Franchisee];
        });

        let _pins_temp = [];
        regions.forEach(x => {
            _pins_temp = [..._pins_temp, ...x.Franchisee.map(franchisee => {
                return {
                    lat: parseFloat(0+franchisee.Latitude),
                    lng: parseFloat(0+franchisee.Longitude),
                    text: franchisee.Name
                }
            })];

        })

        this.filterPins(_pins_temp, locationFilterValue)

        this.setState({
            rows: all_temp,
            data: all_temp,
        });

    };

    filterPins(pins, locationFilterValue) {
        let k = (12.5 - 9.5) * 75 / (75 / 5 - 1);
        let b = 12.5 - k / 5;

        switch (locationFilterValue.id) {
            case "locationAll":
                if (!this.state.gmapVisible) {
                    this.setState({
                        gmapVisible: !this.state.gmapVisible,
                        pins: pins === undefined ? [] : [...pins],
                        pins2: []
                    })
                } else {
                    this.setState({
                        gmapVisible: !this.state.gmapVisible,
                        pins: [],
                        pins2: pins === undefined ? [] : [...pins]
                    })
                }
                map_zoom = DEFAULT_ZOOM
                break;
            case "locationNearBy":
                let _pins = []
                this.setState({
                    addrLat: this.state.current_lat,
                    addrLng: this.state.current_long
                })

                _pins = this.nearbyLocations(
                    pins,
                    {
                        lat: this.state.current_lat,
                        lng: this.state.current_long
                    },
                    locationFilterValue.miles)

                if (!this.state.gmapVisible) {
                    this.setState({
                        gmapVisible: !this.state.gmapVisible,
                        pins: [..._pins],
                        pins2: []
                    })
                } else {
                    this.setState({
                        gmapVisible: !this.state.gmapVisible,
                        pins: [],
                        pins2: [..._pins]
                    })
                }

                map_zoom = locationFilterValue.miles !== undefined ? k / locationFilterValue.miles + b : DEFAULT_ZOOM
                break;
            case "locationNearSpecificAddress":

                let _ = []
                if (locationFilterValue.addrZipcode !== undefined) {
                    this.setState({
                        addrLat: locationFilterValue.addrZipcode.lat,
                        addrLng: locationFilterValue.addrZipcode.lng
                    })
                    _ = this.nearbyLocations(
                        pins,
                        {
                            lat: locationFilterValue.addrZipcode.lat,
                            lng: locationFilterValue.addrZipcode.lng
                        },
                        locationFilterValue.miles)
                } else {
                    this.setState({
                        addrLat: this.state.current_lat,
                        addrLng: this.state.current_long
                    })
                    _ = this.nearbyLocations(
                        pins,
                        {
                            lat: this.state.current_lat,
                            lng: this.state.current_long
                        },
                        locationFilterValue.miles)
                }

                if (!this.state.gmapVisible) {
                    this.setState({
                        gmapVisible: !this.state.gmapVisible,
                        pins: [..._],
                        pins2: []
                    })
                } else {
                    this.setState({
                        gmapVisible: !this.state.gmapVisible,
                        pins: [],
                        pins2: [..._]
                    })
                }
                map_zoom = locationFilterValue.miles !== undefined ? k / locationFilterValue.miles + b : DEFAULT_ZOOM
                break;
            default:
                this.setState({ pins: pins })
                break;
        }

    }

    Deg2Rad(deg) {
        return deg * Math.PI / 180;
    }

    PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        lat1 = this.Deg2Rad(lat1);
        lat2 = this.Deg2Rad(lat2);
        lon1 = this.Deg2Rad(lon1);
        lon2 = this.Deg2Rad(lon2);
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
        return d;
    }


    nearbyLocations(pins, center, miles = 5, addrZipcode = "") {

        return [...pins.filter(x => {
            return (this.PythagorasEquirectangular(center.lat, center.lng, x.lat, x.lng) <= miles)
        })];
    }


    handleEditRowFranchisee(id,regionId){
        this.props.getFranchiseeDetail(id,regionId);
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '')
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }

    createFranchiseeForm = async() => {
        if(this.props.franchiseesForm.type ==="new"){
            await this.props.createFranchisee(this.props.regionId,this.props.insertPayload);
            await this.props.getFranchisees(this.props.regionId);
            await this.initCloseState();
            // console.log("insertPayload",this.props.insertPayload);
        }
        if(this.props.franchiseesForm.type ==="edit"){
            await this.props.updateFranchisees(this.props.insertPayload._id , this.props.regionId, this.props.insertPayload);
            await this.props.getFranchisees(this.props.regionId);
            await this.initCloseState();
        }
    };

    initCloseState = () => {
        this.setState({
            labelWidth: 0,
            selectedWork: "",
            activeStep: 0,
            completed: new Set(),
            termsYrs: '',
            skipped: new Set(),
            Print1099: true,
            chargeBack: false,
            bbpAdministration: false,
            accountRebate: false,
            generateReport: false,
            StateValue: '',
            defaultPlanType: "A",
            selectedSignDate: new Date(),
            selectedRenewDate: new Date(),
            selectedExpDate: new Date(),
            planAmount: 8600.00,
            ibAmount: 500.00,
            downPayment: 2000.00,
            interest: 0.00,
            noOfPayments: 48,
            daysToFullfill: 120,
            paymentAmount: 0,
            documentsList: [],
            franchiseeFees: [],
            LegalName : "",
            LegalAddressLine1: "",
            LegalAddressLine2: "",
            LegalCity: "",
            LegalState: "",
            LegalZip: "",
            LegalCounty: "",
            LegalIdNum: 0,
            LegalId: "ein",
            NameOn1099: "",
            AllowBppAdminFee: true,
            AllowChargeBack: true,
            AllowAccountRebate: true,
            AllowGenerateReport: true,
            AgreementTerm: 0,
            LegalLabel: "LLC"
        });
    }
    render()
    {
        const { classes,toggleFilterPanelFranchisees,showCreteFranchisees, toggleSummaryPanelFranchisees, franchiseesForm, filterStateFranchisees, summaryStateFranchisees, toggleFranchiseeMapView, mapViewState} = this.props;
        const { toggleSelection, toggleAll, isSelected} = this;
        const { selection, anchorEl,pins, pins2,gmapVisible } = this.state;
        let period = this.props.reportPeriod.split('/');
        return (
            <React.Fragment >
              <FusePageCustomSidebarScroll
                classes={{
                    root: classNames(classes.layoutRoot),
                    rightSidebar : classNames(classes.layoutRightSidebar, {'openSummary': summaryStateFranchisees}),
                    leftSidebar : classNames(classes.layoutLeftSidebar, {'openFilter': filterStateFranchisees}),
                    sidebarHeader: classes.layoutSidebarHeader,
                    header: classes.layoutHeader,
                    content: classes.content
                }}
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                        {this.state.temp  && (!franchiseesForm.props.open) && (
                            <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                <div className="flex flex-row flex-1 justify-between">
                                    <div className="flex flex-shrink items-center">
                                        <div className="flex items-center">
                                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                                <Icon className="text-32 mr-12">account_box</Icon>
                                            </FuseAnimate>
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography variant="h6" className="hidden sm:flex">Franchisees | Franchisees Accounts</Typography>
                                            </FuseAnimate>
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink items-center">
                                            <Button variant="contained" color="primary"
                                                className={classNames(classes.button, classes.btntop) }
                                                onClick={showCreteFranchisees}>
                                            Add
                                            <Icon className={classes.rightIcon}>add</Icon>
                                           </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.temp  && (franchiseesForm.props.open) && (
                            <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                                <div className="flex flex-row flex-1 justify-between">
                                    <div className="flex flex-shrink items-center">
                                        <IconButton
                                            className={classNames(classes.button, classes.invalidationMenu)}
                                            aria-label="Add an alarm"
                                            aria-owns={anchorEl ? 'validation-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.showValidationMenu}
                                        >
                                            <Icon color="error">error</Icon>
                                        </IconButton>
                                        <Menu
                                            id="validation-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.closeValidationMenu}
                                        >
                                            <MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Company Information" /></MenuItem>
                                            <MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Billing Address" /></MenuItem>
                                            <MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Billing Settings" /></MenuItem>
                                            <MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Company Contacts" /></MenuItem>
                                            <MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Contract Details" /></MenuItem>
                                            <MenuItem><FormControlLabel control={<Checkbox checked={false} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Contract Signed" /></MenuItem>
                                            <MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Service Location Info" /></MenuItem>
                                            <MenuItem><FormControlLabel control={<Checkbox checked={true} classes={{ root: classes.validationMenu, checked: classes.validationMenuChecked }} />} label="Verified &amp; Approved" /></MenuItem>
                                        </Menu>
                                    </div>
                                    <div className="flex flex-shrink items-center">
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classNames(classes.button, "mr-12")}
                                                onClick={() => {this.closeComposeForm();}}
                                                disabled={!this.canBeSubmitted()}
                                            >
                                                Discard
                                                <Icon className={classes.rightIcon}>delete</Icon>
                                            </Button>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classNames(classes.button, "mr-12")}
                                                onClick={() => {this.createFranchiseeForm();}}
                                                disabled={!this.canBeSubmitted()}
                                            >
                                                Save
                                                <Icon className={classes.rightIcon}>save</Icon>
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
                                                disabled={!this.canBeSubmitted()}
                                            >
                                                Close
                                                <Icon className={classes.rightIcon}>close</Icon>
                                            </Button>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
                content={
                    <div className="flex-1 flex-col absolute w-full h-full">
                        {this.state.temp  && (!franchiseesForm.props.open) && mapViewState && (
                            <div className={classNames(classes.franchiseeListContent, "flex flex-col h-full")}>
                                <div className="flex flex-row items-center p-12">
                                    <div className="flex items-center justify-start">
                                        <Hidden smDown>
                                            <Button
                                                onClick={(ev) => toggleFilterPanelFranchisees()}
                                                aria-label="toggle filter panel"
                                                color="secondary"
                                                className={classNames(classes.filterPanelButton)}
                                            >
                                                <img className={classes.imageIcon} alt="icon-filter" src="assets/images/invoices/filter.png"/>
                                            </Button>
                                        </Hidden>
                                        <Hidden smUp>
                                            <Button
                                                onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                                aria-label="toggle filter panel"
                                                className={classNames(classes.filterPanelButton)}
                                            >
                                                <img className={classes.imageIcon} alt="icon-filter" src="assets/images/invoices/filter.png"/>
                                            </Button>
                                        </Hidden>
                                    </div>
                                    <div className="flex items-center w-full h-44 mr-12 ml-12">
                                        <Paper className={"flex items-center h-44 w-full xs:mr-0"}>
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
                                            <Icon color="action" className="flex justify-center mr-12">search</Icon>
                                        </Paper>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <IconButton
                                            className={classNames(classes.summaryPanelButton, "mr-12")}
                                            aria-label="Add an alarm"
                                            onClick={(ev) => toggleFranchiseeMapView()}>
                                            <Icon>{mapViewState ? 'list' : 'location_on'}</Icon>
                                        </IconButton>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Hidden smDown>
                                            <Button
                                                onClick={(ev) => toggleSummaryPanelFranchisees()}
                                                aria-label="toggle summary panel"
                                                className={classNames(classes.summaryPanelButton)}
                                            >
                                                <Icon>insert_chart</Icon>
                                            </Button>
                                        </Hidden>
                                        <Hidden smUp>
                                            <Button
                                                onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                                aria-label="toggle summary panel"
                                                className={classNames(classes.summaryPanelButton)}
                                            >
                                                <Icon>insert_chart</Icon>
                                            </Button>
                                        </Hidden>
                                    </div>
                                </div>
                                <div className="w-full h-full">
                                    <div className="w-full h-full">
                                        {gmapVisible && (<MapWithAMarkerClusterer
                                            markers={pins}
                                            center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
                                        />)}

                                        {!gmapVisible && (<MapWithAMarkerClusterer2
                                            markers={pins2}
                                            center={{ lat: this.state.addrLat, lng: this.state.addrLng }}
                                        />)}
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.temp  && (!franchiseesForm.props.open) && !mapViewState && (
                            <div className={classNames(classes.franchiseeListContent, "flex flex-col h-full")}>
                               <div className="flex flex-row items-center p-12">
                                    <div className="flex items-center justify-start">
                                        <Hidden smDown>
                                            <Button
                                                onClick={(ev) => toggleFilterPanelFranchisees()}
                                                aria-label="toggle filter panel"
                                                color="secondary"
                                                className={classNames(classes.filterPanelButton)}
                                            >
                                                <img className={classes.imageIcon} alt="icon-filter" src="assets/images/invoices/filter.png"/>
                                            </Button>
                                        </Hidden>
                                        <Hidden smUp>
                                            <Button
                                                onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                                aria-label="toggle filter panel"
                                                className={classNames(classes.filterPanelButton)}
                                            >
                                                <img className={classes.imageIcon} alt="icon-filter" src="assets/images/invoices/filter.png"/>
                                            </Button>
                                        </Hidden>
                                    </div>
                                    <div className="flex items-center w-full h-44 mr-12 ml-12">
                                        <Paper className={"flex items-center h-44 w-full xs:mr-0"}>
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
                                            <Icon color="action" className="flex justify-center mr-12">search</Icon>
                                        </Paper>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <IconButton
                                            className={classNames(classes.summaryPanelButton, "mr-12")}
                                            aria-label="Add an alarm"
                                            onClick={() => toggleFranchiseeMapView()}>
                                            <Icon>{mapViewState ? 'list' : 'location_on'}</Icon>
                                        </IconButton>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Hidden smDown>
                                            <Button
                                                onClick={() => toggleSummaryPanelFranchisees()}
                                                aria-label="toggle summary panel"
                                                className={classNames(classes.summaryPanelButton)}
                                            >
                                                <Icon>insert_chart</Icon>
                                            </Button>
                                        </Hidden>
                                        <Hidden smUp>
                                            <Button
                                                onClick={() => this.pageLayout.toggleRightSidebar()}
                                                aria-label="toggle summary panel"
                                                className={classNames(classes.summaryPanelButton)}
                                            >
                                                <Icon>insert_chart</Icon>
                                            </Button>
                                        </Hidden>
                                    </div>
                               </div>
                               <ReactTable
                                    data={this.state.temp}
                                    minRows = {0}
                                    onFetchData={this.fetchData}
                                    PaginationComponent={JanikingPagination}
                                    getTheadThProps={(state, rowInfo, column) =>{
                                        let border = '1px solid rgba(255,255,255,.6)';
                                        if(column.Header==='Actions') border = 'none';

                                        return {
                                            style:{
                                                fontSize: '1.5rem',
                                                fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
                                                fontWeight: 400,
                                                lineHeight: 1.5,
                                                color: 'white',
                                                borderRight: border,
                                                height: 40,
                                            },
                                        }
                                    }}
                                    getTheadProps={() =>{
                                        return {
                                            style:{
                                                fontSize: 12,
                                            },
                                            className: classes.tableTheadRow
                                        }
                                    }}
                                    getTdProps={() =>{
                                        return {
                                            style:{
                                                textAlign: 'center',
                                                flexDirection: 'row',
                                                fontSize: 12,
                                                padding: "0",
                                            },
                                        }
                                    }}
                                    getTrProps={(state, rowInfo) => {
                                        let period = this.props.reportPeriod.split('/');
                                        return {
                                            className: "cursor-pointer",
                                            onClick  : () => {
                                                if ( rowInfo )
                                                {
                                                   this.handleEditRowFranchisee(rowInfo.original.Id,this.props.regionId);
                                                }
                                            },
                                            style:{
                                                height: 40
                                            }
                                        }
                                    }}
                                    columns={[
                                        {

                                            columns: [
                                                {
                                                    Header   : (instance) => (
                                                        <Checkbox
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                            }}
                                                            onChange={(event) => toggleAll(instance) }
                                                            checked={this.state.selectAll}
                                                            style={{color: 'white'}}
                                                        />
                                                    ),
                                                    accessor : "",
                                                    Cell     : row => {
                                                        return (<Checkbox
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                }}
                                                                checked={isSelected(row.value.Id)}
                                                                onChange={() => toggleSelection(row.value.Id)}
                                                            />
                                                        )
                                                    },
                                                    className: "justify-center",
                                                    sortable : false,
                                                    width    : 50
                                                }
                                            ],
                                            className: classNames("justify-center")
                                        },
                                        {
                                            columns: [
                                                {
                                                    Header: "Number",
                                                    accessor: "Number",
                                                    filterAll: true,
                                                    width: 100,
                                                    className: classNames("flex items-center  justify-center")
                                                },
                                                {
                                                    Header: "Franchisee Name",
                                                    accessor: "Name",
                                                    width: 200,
                                                    className: classNames("flex items-center  justify-start p-12-impor")
                                                },
                                                {
                                                    Header: "Full Address",
                                                    accessor: "Address",
                                                    className: classNames("flex items-center  justify-start p-12-impor"),
                                                    width: -1
                                                },
                                                {
                                                    Header: "City",
                                                    accessor: "City",
                                                    className: classNames("flex items-center  justify-start p-12-impor"),
                                                    width: 150
                                                },
                                                {
                                                    Header: "Phone",
                                                    accessor: "Phone",
                                                    width: 150,
                                                    Cell: row =>{ return(this.formatPhoneNumber(row.original.Phone))},
                                                    className: classNames("flex items-center  justify-center p-12-impor")
                                                },
                                                {
                                                    Header: "Actions",
                                                    width : 200,
                                                    className: classNames("flex items-center  justify-center p-12-impor"),
                                                    Cell  : row =>{
                                                        return (
                                                        <div className="flex items-center actions ">
                                                            <IconButton
                                                                onClick={(ev) => {
                                                                    ev.stopPropagation();
                                                                    this.removeFranchisees(row.original.Id);
                                                                }}
                                                            >
                                                                <Icon>delete</Icon>
                                                            </IconButton>
                                                            <IconButton
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                            }}
                                                                to = {`/franchisees/reports_new/${this.props.regionId}/${period[1]}/${period[0]}/${row.original.Number}`}
                                                                component={Link}
                                                            >
                                                                <Icon>visibility</Icon>
                                                            </IconButton>
                                                        </div>
                                                    )}
                                                }
                                            ]
                                        }
                                    ]}
                                    defaultPageSize={100}
                                    className={classNames( "-striped -highlight")}
                                    totalRecords = {this.state.temp.length}
                                    style={{
                                        height: '100%',
                                    }}
                                />
                            </div>

                        )}
                        {(this.state.temp && franchiseesForm.props.open) && (
                            <CreateFranchiseesPage/>
                        )}
                    </div>
                }
                leftSidebarHeader={
                    <div className={classNames("flex flex-row w-full h-full justify-between p-12 align-middle pr-0", {'filteropen': filterStateFranchisees})}>
                        {franchiseesForm.props.open ? (
                            <div className = "flex items-center" style = {{paddingRight:20}}>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Toolbar className="pl-12 pr-0">
                                        <img className="mr-12" alt="icon-white" src="assets/images/invoices/invoice-icon-white.png" style={{width: 32, height: 32}}/>
                                    </Toolbar>
                                </FuseAnimate>
                                {franchiseesForm.type === "edit" && (
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">Franchisees | Edit Franchisees</Typography>
                                    </FuseAnimate>
                                )}
                                {franchiseesForm.type === "new" && (
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">Franchisees | New Franchisees</Typography>
                                    </FuseAnimate>
                                )}
                            </div>
                        ) : (
                            <h4 className={classes.elementCenter}>Filter Panel</h4>
                        )}
                    </div>
                }
                leftSidebarContent={
                    <FilterPanel/>
                }
                rightSidebarHeader={
                    <div className="flex flex-row w-full h-full justify-between p-24 align-middle pr-0">
                        <h4 className={classes.elementCenter}>Summary Panel</h4>
                    </div>
                }
                rightSidebarContent={
                    <SummaryPanel/>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            >
            </FusePageCustomSidebarScroll>
                {(this.props.bFranchiseesFetchStart) && (
                    <div className={classes.overlay}>
                        <CircularProgress className={classes.progress} color="secondary" />
                    </div>
                )}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getFranchisees: Actions.getFranchisees,
        toggleFilterPanelFranchisees: Actions.toggleFilterPanelFranchisees,
        toggleSummaryPanelFranchisees: Actions.toggleSummaryPanelFranchisees,
        deleteFranchisees: Actions.deleteFranchisees,
        showCreteFranchisees: Actions.showCreteFranchisees,
        closeCreateFranchisees: Actions.closeCreateFranchisees,
        showEditFranchisees: Actions.showCreteFranchisees,
        closeEditFranchisees: Actions.showCreteFranchisees,
        toggleFranchiseeMapView: Actions.toggleFranchiseeMapView,
        updateFranchisees: Actions.updateFranchisees,
        getFranchiseeDetail: Actions.getFranchiseeDetail,
        getBillingLists: Actions.getBillingLists,
        getFranchiseeFeeMaintenance: Actions.getFranchiseeFeeMaintenance,
        getFranchiseeTransactionTypeLists : Actions.getFranchiseeTransactionTypeLists,
        createFranchisee : Actions.createFranchisees,
    }, dispatch);
}

function mapStateToProps({franchisees,auth, invoices, transactions})
{
    return {
        franchiseesForm: franchisees.createFranchisees,
        franchisees: franchisees.franchiseesDB,
        bLoadedFranchisees: franchisees.bLoadedFranchisees,
        Active: franchisees.Active,
        InActive: franchisees.InActive,
        filterStateFranchisees: franchisees.bOpenedFilterPanelFranchisees,
        summaryStateFranchisees: franchisees.bOpenedSummaryPanelFranchisees,
        regionId: auth.login.defaultRegionId,
        statusId: franchisees.statusId,
        Longitude: franchisees.Longitude,
        Latitude: franchisees.Latitude,
        Location: franchisees.Location,
        SearchText: franchisees.SearchText,
        mapViewState: franchisees.bOpenedMapView,
        bFranchiseesFetchStart: franchisees.bFranchiseesFetchStart,
        locationFilterValue: franchisees.locationFilterValue,
        editPayload: franchisees.eiditPayload,
        detailPayload: franchisees.detailPayload,
        createPayload: franchisees.createPayload,
        reportPeriod: franchisees.reportPeriod,
        billingLists: invoices.billingLists,
        transactionTypeList: transactions.transactionTypeList,
        insertPayload: franchisees.insertPayload
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Franchisees)));

