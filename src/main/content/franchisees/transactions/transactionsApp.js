import React, {Component} from 'react';

// core components
import {Icon, Fab, Typography, Hidden, IconButton} from '@material-ui/core';
import {withStyles} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

//Custom Components
import FilterPanel from './filterPanel';

// theme components
import {FusePageCustom, FuseAnimate} from '@fuse';

// for store
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

// third party
import classNames from 'classnames';
import TransactionLists from './FranchiseeLists';
import _ from "lodash";

const headerHeight = 80;

const hexToRgb = (hex) =>{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const styles = theme => ({
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
            justifyContent: 'flex-start'
        },
        '& .p-12-impor': {
            paddingLeft: '1.2rem!important',
            paddingRight: '1.2rem!important',
        }
    },
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight,
        backgroundColor: theme.palette.secondary.main
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
    search: {
        width: 360,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
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
    tableTheadRow:{
        // backgroundColor: 'rgba(' + hexToRgb(theme.palette.primary.main).r + ',' + hexToRgb(theme.palette.primary.main).g + ',' + hexToRgb(theme.palette.primary.main).b +', .2)'
        backgroundColor: theme.palette.primary.main,
        padding: 12
    },
});

class TransactionsApp extends Component {
    state = {
        s: '',
        data: [],
        selection: [],
        regionId: 0,
        checkedCompleted: true,
        checkedOpen: true,
    };

    constructor(props){
        super(props);

        if(!props.bLoadedTransactions) {
            props.getTransactions();
        }
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(state, instance) {
        this.setState({
            pageSize: state.pageSize,
            page: state.page,
        });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    componentWillMount(){
        this.setState({checkedCompleted: this.props.transactionStatus.checkedCompleted});
        this.setState({checkedOpen: this.props.transactionStatus.checkedOpen});
        this.getTransactions()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        let bChanged = false;

        if(this.props.regionId !== prevProps.regionId) {
            this.setState({regionId: prevProps.regionId});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedCompleted !== prevProps.transactionStatus.checkedCompleted) {
            this.setState({checkedCompleted: !this.state.checkedCompleted});
            bChanged = true;
        }

        if(this.props.transactionStatus.checkedOpen !== prevProps.transactionStatus.checkedOpen) {
            this.setState({checkedOpen: !this.state.checkedOpen});
            bChanged = true;
        }

        if(bChanged)
            this.getTransactions();

        if(prevProps.transactions!== this.props.transactions){
            this.getTransactions();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.transactions!==nextProps.transactions)
            this.getTransactions(nextProps.transactions);
    }

    getTransactions =(rawData=this.props.transactions) =>{
        if(rawData.transactionsDB===null) return;

        let temp0 = rawData.transactionsDB.Data.FranchiseeTransactions;
        let temp=[];
        let all_temp=[];
        const statusStrings = ['Open', 'Completed'];
        const keys=['checkedOpen', 'checkedCompleted'];

        keys.map((key, index)=> {

            if(this.props.transactionStatus[key]){
                temp = temp0.filter(d => {
                    // if(this.props.regionId===0)
                        return d.Status.toLowerCase() === statusStrings[index].toLowerCase();
                    // else
                    //     return d.Status.toLowerCase() === statusStrings[index] && d.RegionId === this.props.regionId
                });
            }
            all_temp =_.uniq([...all_temp, ...temp]);
            return true;
        });
        this.setState({temp: all_temp});
        this.setState({data: all_temp});
    };

    render()
    {
        const {classes, filterState, toggleFilterPanel} = this.props;
        const { selection } = this.state;
        return (
            <FusePageCustom
                classes={{
                    root: classes.layoutRoot,
                    header: classes.layoutHeader,
                    content: classes.content,
                    leftSidebar : classNames(classes.layoutLeftSidebar, {'openFilter': filterState}),
                    sidebarHeader: classes.layoutSidebarHeader,
                }}
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
                    <FilterPanel/>
                }
                header={
                    <div className="flex row flex-1  p-8 sm:p-12 relative justify-between">
                        <div className="flex flex-row flex-1 justify-between">
                            <div className="flex flex-shrink items-center">
                                <div className="flex items-center">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <Icon className="text-32 mr-12">account_box</Icon>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="h6" className="hidden sm:flex">Franchisees | Transactions</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                            <div className="flex flex-shrink items-center">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab color="secondary" aria-label="add"
                                         className={classNames(classes.sideButton, "mr-12")} onClick={() => alert('ok')}>
                                        <Icon>add</Icon>
                                    </Fab>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab color="secondary" aria-label="add"
                                         className={classNames(classes.sideButton, "mr-12")} onClick={() => this.props.history.push('/apps/mail/inbox')}>
                                        <Icon>mail_outline</Icon>
                                    </Fab>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab color="secondary" aria-label="add" className={classes.sideButton} onClick={() => alert('ok')}>
                                        <Icon>print</Icon>
                                    </Fab>
                                </FuseAnimate>
                            </div>
                        </div>
                        <div className="flex flex-none items-end" style={{display: 'none'}}>
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={() => alert('ok')}>
                                    <Icon>add</Icon>
                                </Fab>
                            </FuseAnimate>
                            { selection.length>0 && (
                                <FuseAnimate animation="transition.expandIn" delay={600}>
                                    <Fab color="secondary" aria-label="delete" className={classes.removeButton} onClick={()=>this.removeInvoices()}>
                                        <Icon>delete</Icon>
                                    </Fab>
                                </FuseAnimate>
                            )}
                        </div>
                    </div>
                }
                content={
                    <div className="flex-1 flex-col absolute w-full h-full">
                        {
                            <TransactionLists data={this.state.data}/>
                        }
                    </div>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            >
            </FusePageCustom>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getTransactions: Actions.getTransactions,
        toggleFilterPanel: Actions.toggleTransactionFilterPanel
    }, dispatch);
}

function mapStateToProps({transactions, auth})
{
    return {
        transactions: transactions,
        bLoadedTransactions: transactions.bLoadedTransactions,
        filterState: transactions.bOpenedTransactionFilterPanel,
        transactionStatus: transactions.transactionStatus,
        regionId: auth.login.defaultRegionId
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsApp)));
