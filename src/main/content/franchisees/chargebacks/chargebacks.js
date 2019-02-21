import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import { bindActionCreators } from "redux";

// core components
import {
    Hidden,
    Icon,
    IconButton,
    Fab,
    Typography,
    Toolbar,
    CircularProgress,
	Button,
	Tooltip,
} from '@material-ui/core';

// theme components
import {FuseAnimate, FusePageCustom } from '@fuse';

// for store
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import FilterPanel from './FilterPanel';

// third party
// import moment from 'moment'
// import checkboxHOC from "react-table/lib/hoc/selectTable";
// import Chance from "chance";
// import ReactTable from "react-table";
import "react-table/react-table.css";
// import _ from 'lodash';


import classNames from 'classnames';

//table pagination
// import JanikingPagination from './../../../../Commons/JanikingPagination';

// import ChargebacksForm from './ChargebacksForm';
import ChargebackListContent from './ChargebackListContent';
import ChargeBackSearchBar from "./ChargeBackSearchBar"
import ProcessModalForm from './ProcessModalForm';
// import GoogleMap from 'google-map-react';

// function Marker({ text }) {
// 	return (
// 		<Tooltip title={text} placement="top">
// 			<Icon className="text-red">place</Icon>
// 		</Tooltip>
// 	);
// }
const headerHeight = 80;

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
		background: "url('/assets/images/backgrounds/signin-bg.jpg') no-repeat",
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
		'& .openFilter': {
			width: 'inherit'
		},
		'& .openSummary': {
			width: 300
		},
		'& .ReactTable .rt-tbody': {
			overflowY: 'scroll',
			overflowX: 'hidden'
		},
		'& .ReactTable .rt-tr-group': {
			flex: '0 0 auto'
		},
		'& .ReactTable .rt-thead .rt-th:nth-child(1)': {
			justifyContent: 'center'
		},
		'& .ReactTable .rt-thead.-headerGroups .rt-th:nth-child(2)': {
			width: 'inherit!important',
			minWidth: 'inherit!important',
		},
		'& .ReactTable .rt-thead .rt-th:last-child': {
			justifyContent: 'flex-end'
		},
		'& .p-12-impor': {
			paddingLeft: '1.2rem!important',
			paddingRight: '1.2rem!important',
		},
		'& .wordwrap': {
			whiteSpace: 'pre-line !important',
			wordWrap: 'break-word',
		}
	},
	card: {
		width: '100%',
		maxWidth: 384,
	},
	progress: {
		margin: theme.spacing.unit * 2,
	},
	layoutHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.secondary.main
	},
	layoutRightSidebar: {
		width: 0,
		[theme.breakpoints.down('sm')]: {
			width: 'inherit'
		}
	},
	layoutLeftSidebar: {
		width: 0,
		[theme.breakpoints.down('sm')]: {
			width: 'inherit'
		}
	},
	layoutSidebarHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		display: 'flex',
		alignItems: 'center',
		backgroundColor: theme.palette.secondary.main,
	},
	content: {
		position: 'relative'
	},
	addButton: {
		position: 'absolute',
		bottom: -28,
		left: 16,
		zIndex: 999,
		backgroundColor: theme.palette.primary.light,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	sideButton: {
		backgroundColor: theme.palette.primary.light,
		height: 46,
		width: 46,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		}
	},
	removeButton: {
		position: 'absolute',
		bottom: -28,
		right: 16,
		zIndex: 999,
		backgroundColor: theme.palette.secondary.light,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		}
	},
	imageIcon: {
		width: 24,
		height: 24
	},
	separator: {
		width: 1,
		height: '100%',
		backgroundColor: theme.palette.divider
	},
	search: {
		width: 360,
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
	},
	tableTheadRow: {
		// backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
		backgroundColor: theme.palette.primary.main
	},
	tableThEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .3)'
	},
	tableTdEven: {
		backgroundColor: 'rgba(' + hexToRgb(theme.palette.secondary.main).r + ',' + hexToRgb(theme.palette.secondary.main).g + ',' + hexToRgb(theme.palette.secondary.main).b + ', .1)'
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
        marginRight: 20,
        '& span': {
            textTransform: 'none'
        }
	},
	lastItem: {
		marginLeft: 'auto',
	},
});
// const defaultProps = {
// 	trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
// };
class Chargebacks extends Component {
	state = {
		s: '',
		temp: [],
		data: [],
		checkedPaid: true,
		checkedPP: true,
		checkedComplete: true,
		checkedOpen: true,
		selection: [],
		selectAll: false,
		// regionId: [2, 24],
		// statusId: [21, 24],
		// searchText: '',
		selectedChargebacks: null,
		current_lat: 0,
		current_long: 0,
		franchisees: null,
		isOpen: false
	};

	constructor(props) {
		super(props);

		if (!props.bLoadedChargebacks) {
			props.getChargebacks(props.regionId, props.month, props.year);
		}

		if (!props.bLoadedFranchisees) {
            props.getFranchisees(props.regionId, props.fstatusId, props.fLocation, props.fLongitude, props.fLatitude, props.fSearchText);
        }
		this.fetchData = this.fetchData.bind(this);
		this.escFunction = this.escFunction.bind(this);
    }

    toggleSelection = (key, shift, row) => {
        /*
          https://react-table.js.org/#/story/select-table-hoc
          Implementation of how to manage the selection state is up to the developer.
          This implementation uses an array stored in the component state.
          Other implementations could use object keys, a Javascript Set, or Redux... etc.
        */
		// start off with the existing state
		let selection = [...this.state.selection];
		const keyIndex = selection.indexOf(key);
		// check to see if the key exists
		if (keyIndex >= 0) {
			// it does exist so we will remove it using destructing
			selection = [
				...selection.slice(0, keyIndex),
				...selection.slice(keyIndex + 1)
			];
		} else {
			// it does not exist so add it
			selection.push(key);
		}
		// update the state
		this.setState({ selection });
	};

	toggleAll = (instance) => {
        /*
          'toggleAll' is a tricky concept with any filterable table
          do you just select ALL the records that are in your data?
          OR
          do you only select ALL the records that are in the current filtered data?

          The latter makes more sense because 'selection' is a visual thing for the user.
          This is especially true if you are going to implement a set of external functions
          that act on the selected information (you would not want to DELETE the wrong thing!).

          So, to that end, access to the internals of ReactTable are required to get what is
          currently visible in the table (either on the current page or any other page).

          The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
          ReactTable and then get the internal state and the 'sortedData'.
          That can then be iterated to get all the currently visible records and set
          the selection state.
        */
		const selectAll = this.state.selectAll ? false : true;
		const selection = [];
		if (selectAll) {
			let currentRecords = instance.data;
			// we just push all the IDs onto the selection array
			let page = this.state.page;
			let pageSize = this.state.pageSize;
			let start_index = page * pageSize;
			let end_index = start_index + pageSize;
			currentRecords.forEach(item => {
				if (item._index >= start_index && item._index < end_index)
					selection.push(item._original.ChargebacksId);
			});
		}
		this.setState({ selectAll, selection });
	};

	isSelected = key => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
		return this.state.selection.includes(key);
	};

	logSelection = () => {
		console.log("selection:", this.state.selection);
	};

	closeComposeForm = () => {
		switch (this.props.chargebackForm.type) {
			case "new":
				this.props.closeNewChargebackForm()
				break;
			case "edit":
				this.props.closeEditChargebackForm()
				break;
		}
	};



	componentDidUpdate(prevProps, prevState, snapshot) {
		let bChanged = false;

		const {fstatusId, fLocation, fLongitude, fLatitude, fSearchText} = this.props;
		const {regionId, month, year} = this.props;

		if (this.props.transactionStatus.checkedPaid !== prevProps.transactionStatus.checkedPaid) {
			this.setState({ checkedPaid: !this.state.checkedPaid });
			bChanged = true;
		}

		if (this.props.transactionStatus.checkedPP !== prevProps.transactionStatus.checkedPP) {
			this.setState({ checkedPP: !this.state.checkedPP });
			bChanged = true;
		}

		if (this.props.transactionStatus.checkedComplete !== prevProps.transactionStatus.checkedComplete) {
			this.setState({ checkedComplete: !this.state.checkedComplete });
			bChanged = true;
		}

		if (this.props.transactionStatus.checkedOpen !== prevProps.transactionStatus.checkedOpen) {
			this.setState({ checkedOpen: !this.state.checkedOpen });
			bChanged = true;
		}

		// if(regionId !== prevProps.regionId){
        //     this.props.getFranchisees(regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText);
		// }

		// if(regionId !== prevProps.regionId ||
        //     month !== prevProps.month ||
        //     year !== prevProps.year
        // ) {
        //     this.props.getChargebacks(regionId, month, year);
		// }

		// if(this.props.bChargebacksUpdated && this.props.bChargebacksUpdated!==prevProps.bChargebacksUpdated)
		// 	this.props.getChargebacks(regionId, month, year);

		// if (prevState.s !== this.state.s) {
		// 	this.search(this.state.s);
		// }

		// if (bChanged)
		// 	this.getChargebacksFromStatus();

		// if (prevProps.chargebacks === null && this.props.chargebacks !== null) {
		// 	this.getChargebacksFromStatus();
		// }

		// if(this.props.removedId!==undefined && this.props.removedId!==prevProps.removedId)
		// 	this.props.getChargebacks(regionId, month, year);
	}

	componentWillMount() {
		const {regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText} = this.props;
		const {month, year} = this.props;

		this.setState({ checkedPaid: this.props.transactionStatus.checkedPaid });
		this.setState({ checkedPP: this.props.transactionStatus.checkedPP });
		this.setState({ checkedComplete: this.props.transactionStatus.checkedComplete });
		this.setState({ checkedOpen: this.props.transactionStatus.checkedOpen });

		this.getChargebacksFromStatus()
		this.props.getFranchisees(regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText);

		if(this.props.chargebacks===null) {
			this.props.getChargebacks(regionId, month, year);
            this.props.getFranchisees(regionId, fstatusId, fLocation, fLongitude, fLatitude, fSearchText);
        }

	}

	componentWillReceiveProps(nextProps) {
		if (this.props.chargebacks === null && nextProps.chargebacks !== null)
			this.getChargebacksFromStatus(nextProps.chargebacks);
		if (this.props.chargebacks !== nextProps.chargebacks)
			this.getChargebacksFromStatus(nextProps.chargebacks);

		if(nextProps.franchisees!==null && this.props.franchisees!==nextProps.franchisees){
			this.setState({franchisees: nextProps.franchisees.Data.Region[0].FranchiseeList});
		}

	}


	getChargebacksFromStatus = (rawData = this.props.chargebacks) => {
		// let temp = [];
		let all_temp = [];
		// let temp1 = [];
		// const statusStrings = ['paid', 'paid partial', 'open', 'completed'];
		// const keys = ['checkedPaid', 'checkedPP', 'checkedOpen', 'checkedComplete'];
		if (rawData === null) return;

		// let regions = rawData.Data.filter(x => {
		// 	return this.props.regionId === 24 || x.Id === this.props.regionId;
		// });

		// regions.forEach(x => {
		// 	all_temp = [...all_temp, ...x.ChargebacksList];
		// });

		// regions.map(x => {
		// 	all_temp = [...all_temp, ...x.Chargebacks];
		// 	return;
        // });

		let regions = rawData.Data.filter(x => x)
		all_temp = regions

		this.setState({ temp: all_temp });
		this.setState({ data: all_temp });
	};

	componentDidMount() {
		document.addEventListener("keydown", this.escFunction, false);
		if(this.props.franchisees!==null){
            let temp = [];
            let regions = this.props.franchisees.Data.Region;

            regions.map(x => {
                temp = [...temp, ...x.Franchisees];
                return true;
            });
            this.setState({franchisees: temp});
        }
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.escFunction, false);
	}

	escFunction(event) {
		if (event.keyCode === 27) {
			this.setState({ s: '' });
			this.getChargebacksFromStatus();
		}
	}
	search(val) {
		// if (val === '') {
		// 	this.getChargebacksFromStatus();
		// 	return;
		// }
		const temp = this.state.data.filter(d => {
			return (d.ChargebacksNo && d.ChargebacksNo.toString().indexOf(val) !== -1) || !val ||
				(d.FranchiseeName && d.FranchiseeName.toString().indexOf(val) !== -1) ||
				(d.FranchiseeNo && d.FranchiseeNo.toString().indexOf(val) !== -1) ||
				(d.ChargebacksName && d.ChargebacksName.toString().indexOf(val) !== -1) ||
				(d.Address && d.Address.toString().indexOf(val) !== -1) ||
				(d.Phone && d.Phone.toString().indexOf(val) !== -1) ||
				(d.AccountTypeListName && d.AccountTypeListName.toString().indexOf(val) !== -1) ||
				(d.ChargebacksDescription && d.ChargebacksDescription.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.Amount && d.Amount.toString().toLowerCase().indexOf(val) !== -1) ||
				(d.StatusName && d.StatusName.toString().indexOf(val) !== -1)
		});
		this.setState({ temp: temp });
	}

	// onNewChargebacks = ()=>{
    //     if(this.props.filterState) this.props.toggleFilterPanel();

    //     this.props.openNewChargebacksForm();
	// };

	onNewChargebacks = () => {
		this.props.showProcessModalForm(true)
		// this.setState({isOpen: !this.state.isOpen})
	}

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });

		// if (prop === 's') {
		// 	// this.search(event.target.value.toLowerCase());
		// }
	};

	handleSearchChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

	canBeSubmitted() {
		return true;
		// const { name } = this.state;
		// return (
		// 	name.length > 0
		// );
	}

	removeChargebacks = () => {
		if (this.state.selection.length === 0) {
			alert("Pchargeback choose chargeback(s) to delete");
			return;
		}
		if (window.confirm("Do you really want to remove the selected chargeback(s)")) {
			this.props.deleteChargebacksAction(this.state.selection, this.props.chargebacks);
			this.setState({ selection: [], selectAll: false })
		}
	};

	fetchData(state, instance) {
		this.setState({
			pageSize: state.pageSize,
			page: state.page,
		});
	}


    render() {
		const { classes, toggleFilterPanel, filterState, summaryState,
		openNewChargebacksForm, chargebackForm } = this.props;
		console.log(this.props)
		console.log(this.state)
		// const { toggleSelection, toggleAll, isSelected, logSelection } = this;

        const { selection } = this.state;


		console.log('props=', this.props);

        return (
            <React.Fragment >
				<FusePageCustom
					classes={{
						root: classNames(classes.layoutRoot, 'test123'),
						rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': summaryState }),
						leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': filterState }),
						sidebarHeader: classes.layoutSidebarHeader,
						header: classes.layoutHeader,
						content: classes.content
					}}
					header={
						<div className="flex w-full items-center">
							{(this.state.temp && !chargebackForm.props.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												<FuseAnimate animation="transition.expandIn" delay={300}>
													<Icon className="text-32 mr-12">account_box</Icon>
												</FuseAnimate>
												<FuseAnimate animation="transition.slideLeftIn" delay={300}>
													<Typography variant="h6" className="hidden sm:flex">Franchisees | Chargebacks</Typography>
												</FuseAnimate>
											</div>
										</div>
										{/* <div className="flex flex-shrink items-center">
                                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                                <Fab color="secondary" aria-label="add"
                                                     className={classNames(classes.sideButton, "mr-12")} onClick={()=>this.onNewChargebacks()}>
                                                    <Icon>add</Icon>
                                                </Fab>
                                            </FuseAnimate>
                                        </div> */}
										<div className="flex flex-shrink items-center">
                                            <FuseAnimate animation="transition.expandIn" delay={300}>
												<Button 
													variant="contained" 
													color="primary"
													className={classNames(classes.btntop) } 
													onClick={this.onNewChargebacks}
												>
                                                    Process Chargebacks
													 {/* {this.props.processModalForm.open && <ProcessModalForm />} */}
                                                    <Icon className={classes.rightIcon}>add</Icon>
                                                </Button>
                                            </FuseAnimate>
                                        </div>
										{/* {this.props.processModalForm.open && <ProcessModalForm />} */}
									</div>
									{this.props.processModalForm.open && <ProcessModalForm />}
									{/* <div className="flex flex-none items-end" style={{ display: 'none' }}>
										<FuseAnimate animation="transition.expandIn" delay={600}>
											<Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => openNewChargebacksForm}>
												<Icon>add</Icon>
											</Fab>
										</FuseAnimate>
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<Fab color="primary" aria-label="add"
												className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
												<Icon>mail_outline</Icon>
											</Fab>
										</FuseAnimate>
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
												<Icon>print</Icon>
											</Fab>
										</FuseAnimate>
										{selection.length > 0 && (
											<FuseAnimate animation="transition.expandIn" delay={600}>
												<Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={() => this.removeChargebacks()}>
													<Icon>delete</Icon>
												</Fab>
											</FuseAnimate>
										)}
									</div> */}
								</div>
							)}
							{(this.state.temp && chargebackForm.props.open) && (
								<div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
									<div className="flex flex-row flex-1 justify-between">
										<div className="flex flex-shrink items-center">
											<div className="flex items-center">
												<FuseAnimate animation="transition.expandIn" delay={300}>
													<Toolbar className="pl-12 pr-0">
														<img className="mr-12" alt="" src="assets/images/invoices/invoice-icon-white.png" style={{ width: 32, height: 32 }} />
													</Toolbar>
												</FuseAnimate>

												<FuseAnimate animation="transition.slideLeftIn" delay={300}>
													<Typography variant="h6" className="hidden sm:flex">Chargebacks | Edit Chargebacks</Typography>
												</FuseAnimate>
											</div>
										</div>
										<div className="flex flex-shrink items-center">
												<Tooltip title="Close">
													<IconButton className={classes.btntop} aria-label="Add an alarm" onClick={(ev) => this.closeComposeForm()}>
														<Icon>close</Icon>
													</IconButton>
												</Tooltip>
												</div>
										{/* <div className="flex flex-shrink items-center"> */}

											{/* <IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => toggleFilterPanel()}>
												<Icon>person_outline</Icon>
											</IconButton>

											<IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => toggleSummaryPanel()}>
												<Icon>check_circle</Icon>
											</IconButton>

											<IconButton className={classes.button} aria-label="Add an alarm" onClick={(ev) => this.closeComposeForm()}>
												<Icon>close</Icon>
											</IconButton> */}

											{/* <FuseAnimate animation="transition.expandIn" delay={300}>
												<Button
													variant="contained"
													color="primary"
													className={classNames(classes.button, "mr-12")}
													onClick={() => {
														this.closeComposeForm();
													}}
													disabled={!this.canBeSubmitted()}
												> Discard </Button>
											</FuseAnimate>
											<FuseAnimate animation="transition.expandIn" delay={300}>
												<Button
													variant="contained"
													color="primary"
													className={classNames(classes.button, "mr-12")}
													onClick={() => {
														this.closeComposeForm();
													}}
													disabled={!this.canBeSubmitted()}
												> Save </Button>
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
												> Close </Button>
											</FuseAnimate> */}


										{/* </div> */}
									</div>
									<div className="flex flex-none items-end" style={{ display: 'none' }}>
										<FuseAnimate animation="transition.expandIn" delay={600}>
											<Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => alert('ok')}>
												<Icon>add</Icon>
											</Fab>
										</FuseAnimate>
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<Fab color="primary" aria-label="add"
												className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
												<Icon>mail_outline</Icon>
											</Fab>
										</FuseAnimate>
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
												<Icon>print</Icon>
											</Fab>
										</FuseAnimate>
										{selection.length > 0 && (
											<FuseAnimate animation="transition.expandIn" delay={600}>
												<Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={() => this.removeChargebacks()}>
													<Icon>delete</Icon>
												</Fab>
											</FuseAnimate>
										)}
									</div>
								</div>
							)}
						</div>
					}
					content={
                        <div className="flex-1 flex-col absolute w-full h-full">
                            {(this.state.temp && !chargebackForm.props.open) && (
                                <div className={classNames("flex flex-col h-full")}>
                                    <div className="flex flex-row items-center ">
                                        {/* <div className="flex justify-start items-center">
                                            <Hidden smDown>
                                                <Button
                                                    onClick={(ev) => toggleFilterPanel()}
                                                    aria-label="toggle filter panel"
                                                    color="secondary"
                                                    disabled={filterState ? true : false}
                                                    className={classNames(classes.filterPanelButton)}
                                                >
                                                    <img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>
                                                </Button>
                                            </Hidden>
                                            <Hidden smUp>
                                                <Button
                                                    onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                                    aria-label="toggle filter panel"
                                                    className={classNames(classes.filterPanelButton)}
                                                >
                                                    <img className={classes.imageIcon} src="assets/images/invoices/filter.png" alt="filter"/>
                                                </Button>
                                            </Hidden>
                                        </div> */}
                                        {/* <div className="flex items-center w-full h-44 mr-12 ml-12">
                                            <Paper className={"flex items-center h-44 w-full lg:mr-12 xs:mr-0"} elevation={1}>
                                                <Input
                                                    placeholder="Search..."
                                                    className={classNames(classes.search, 'pl-16')}
                                                    // className="pl-16"
                                                    disableUnderline
                                                    fullWidth
                                                    value={this.state.s}
                                                    onChange={this.handleSearchChange('s')}
                                                    inputProps={{
                                                        'aria-label': 'Search'
                                                    }}
                                                />
                                                <Icon color="action" className="mr-16">search</Icon>
                                            </Paper>
                                        </div> */}
                                        {/* <div className="flex items-center justify-end pr-12">
                                            <Hidden smDown>
                                                <Button
                                                    onClick={(ev) => toggleSummaryPanel()}
                                                    aria-label="toggle summary panel"
                                                    disabled={summaryState ? true : false}
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
                                        </div> */}
                                    </div>
									<ChargeBackSearchBar />
                                    <ChargebackListContent data={this.state.temp}/>
                                </div>
                            )}
                            {/* {(this.state.temp && chargebackForm.props.open) && (
                                <ChargebacksForm franchisees={this.state.franchisees} selectedChargebacks={this.state.selectedChargebacks}/>
                            )} */}
                        </div>
                    }
					leftSidebarHeader={
                        <div className={classNames("flex flex-row w-full h-full justify-between p-12 align-middle pr-0", {'filteropen': filterState})}>
                            <h4 style={{marginBlockStart: '1em'}}>Filter Panel</h4>
                            <FuseAnimate animation="transition.expandIn" delay={200}>
                                <div>
                                    <Hidden xsDown>
                                        <IconButton onClick={(ev)=>toggleFilterPanel()}>
                                            <Icon>close</Icon>
                                        </IconButton>
                                    </Hidden>
                                </div>
                            </FuseAnimate>
                        </div>
                    }
					leftSidebarContent={
						<FilterPanel />
					}
					// rightSidebarHeader={
					// 	/*<div className="flex flex-row w-full h-full justify-between p-24 align-middle pr-0"> */
					// 	<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
					// 		<h2 style={{ marginBlockStart: '1em' }}>Summary</h2>
					// 		{/* <FuseAnimate animation="transition.expandIn" delay={200}> */}
					// 		{/* <div> */}
					// 		{/* <Hidden xsDown> */}
					// 		{/*<IconButton onClick={()=>this.removeChargebacks()}>*/}
					// 		{/* <Icon>delete</Icon> */}
					// 		{/* </IconButton> */}
					// 		{/* <IconButton onClick={(ev) => toggleSummaryPanel()}>  */}

					// 		{/* <IconButton onClick={toggleSummaryPanel}> */}
					// 		{/* <Icon>close</Icon> */}
					// 		{/* </IconButton> */}
					// 		{/* </Hidden> */}
					// 		{/* </div> */}
					// 		{/* </FuseAnimate> */}
					// 	</div>
					// }
					// rightSidebarContent={
					// 	<SummaryPanel />
					// }

					onRef={instance => {
						this.pageLayout = instance;
					}}
				>
				</FusePageCustom>
				{(this.props.bChargebacksStart || this.props.bFranchiseeFetchStart || this.props.bFranchiseesFetchStart) && (
                    <div className={classes.overlay}>
                        <CircularProgress className={classes.progress} color="secondary"  />
						<Typography variant="body2" color="primary">Fetching chargebacks info...</Typography>
                    </div>
                )}
			</React.Fragment >
        );
    }
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getChargebacks: Actions.getChargebacks,
		toggleFilterPanel: Actions.toggleFilterPanel,
		toggleSummaryPanel: Actions.toggleSummaryPanel,
		toggleMapView: Actions.toggleMapView,
		showProcessModalForm: Actions.showProcessModalForm,
		// deleteChargebacksAction: Actions.deleteChargebacks,
		// removeChargebacksAction: Actions.removeChargebacks,
		// openNewChargebacksForm: Actions.openNewChargebacksForm,
		// openEditChargebacksForm: Actions.openEditChargebacksForm,
		closeEditChargebackForm: Actions.closeEditChargebackForm,
		closeNewChargebackForm: Actions.closeNewChargebackForm,
		getFranchisees: Actions.getFranchisees,
		// getChargebacksDetail: Actions.getChargebacksDetail,
	}, dispatch);
}

function mapStateToProps({ chargebacks, auth, franchisees }) {
	return {
		chargebacks: chargebacks.chargebacksDB,
		bLoadedChargebacks: chargebacks.bLoadedChargebacks,
		transactionStatus: chargebacks.transactionStatus,
		filterState: chargebacks.bOpenedFilterPanel,
		summaryState: chargebacks.bOpenedSummaryPanel,
		mapViewState: chargebacks.bOpenedMapView,
		chargebackForm: chargebacks.chargebackForm,
		regionId: auth.login.defaultRegionId,
		month: chargebacks.month,
		year: chargebacks.year,
		bChargebacksStart: chargebacks.bChargebacksStart,
        bChargebacksUpdated: chargebacks.bChargebacksUpdated,

		removedId: chargebacks.removedId,

		processModalForm: chargebacks.processModalForm,

		bLoadedFranchisees: franchisees.bLoadedFranchisees,
        franchisees: franchisees.franchiseesDB,
        fstatusId: franchisees.statusId,
        fLocation: franchisees.Location,
        fLongitude: franchisees.Longitude,
        fLatitude: franchisees.Latitude,
        fSearchText: franchisees.SearchText,
        bFranchiseesFetchStart: franchisees.bFranchiseesFetchStart,
	}
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Chargebacks)));
