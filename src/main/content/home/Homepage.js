import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import JanikingPagination from 'Commons/JanikingPagination';
// import * as Actions from './store/actions';
import * as Actions from 'store/actions';
import {bindActionCreators} from 'redux';
import {Chart} from 'react-chartjs-2';
import Widget1 from './widgets/widget1';
import Widget2 from './widgets/widget2';
import Widget3 from './widgets/widget3';
import Widget4 from './widgets/widget4';
import Widget5 from './widgets/widget5';
import Widget6 from './widgets/widget6';
import Widget7 from './widgets/widget7';
import Widget8 from './widgets/widget8';
import Widget9 from './widgets/widget9';
import {FuseAnimate} from '@fuse';
import withReducer from 'store/withReducer';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {Avatar,Card , Button,Fab, Icon,ClickAwayListener, IconButton,Divider, Paper,List, ListItem , ListItemIcon, ListItemText, Popover, MenuItem, Typography, Hidden} from '@material-ui/core';
import  Iconcus from "./icon";
import classNames from 'classnames';
const styles = theme => ({
    root: {
        width: '100%'
    },
    paperitem  :{
        padding         : '16px',
        margin          : '5px',
    },
    mainitem   :{
        border          : '1px solid ' + theme.palette.divider,
        boxShadow       : 'none',
        borderRadius    : 25
    },
    cusbtnitem :{
        paddingTop      :"20px !important",
    },
});

class Homepage extends Component {

    state = {
        checkurl        : "../../../../assets/images/icons/checkbox.png",
        checkedurl      : "../../../../assets/images/icons/checked.png",

    };


    constructor(props)
    {
        super(props);

        Chart.pluginService.register({
            afterDatasetsDraw: function (chart, easing) {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                )
                {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i) {
                    const meta = chart.getDatasetMeta(i);

                    if ( !meta.hidden )
                    {

                        meta.data.forEach(function (element, index) {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.54)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }

    componentDidMount()
    {
        this.props.getWidgets();
    }

    render()
    {
        const {widgets, classes} = this.props;
        if ( !widgets )
        {
            return 'Loading..';
        }
        return (
            <div className={classes.root}>

                <Widget1 data={widgets.widget1}/>

                <FuseAnimate animation="transition.slideUpIn" delay={200}>

                    <div className="flex flex-col md:flex-row sm:p-16">

                        <div className="flex flex-1 flex-col min-w-0">

                            <div className="flex flex-col sm:flex sm:flex-row pb-2">
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                            <FormControlLabel
                                                checked={true}
                                                control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked1" />}
                                            />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Bill Run
                                            </Typography>
                                            <Typography >
                                                128 invoice Created On 1/3/2019
                                            </Typography>
                                            <a href="/apps/mail">View Detail</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel checked={true}
                                            control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked2" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Turn Around Checks
                                            </Typography>
                                            <Typography >
                                                Nothing Processed
                                            </Typography>
                                            {/*<a href="/apps/mail">View Detail</a>*/}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col sm:flex sm:flex-row pb-2">
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel checked={true}
                                            control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked3" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                E-Billing
                                            </Typography>
                                            <Typography >
                                                65 invoice Emailed On 1/5/2019
                                            </Typography>
                                            <a href="/apps/mail">View Detail</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel
                                            control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked4" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Franchisee Reports
                                            </Typography>
                                            <Typography >
                                                Nothing Processed
                                            </Typography>
                                            <a href="/apps/mail">Generate | Print</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col sm:flex sm:flex-row pb-2">
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel
                                            control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked3" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Lockbox Process
                                            </Typography>
                                            <Typography >
                                                125 Payments Received and Processed On 1/5/2019
                                            </Typography>
                                            <a href="/apps/mail">View Payments | Enter Payment</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel
                                            control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked4" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Due Franchisee Checks
                                            </Typography>
                                            <Typography >
                                                Nothing Processed
                                            </Typography>
                                            {/*<a href="/apps/mail">Generate | Print</a>*/}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col sm:flex sm:flex-row pb-2">
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel
                                            control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked3" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Manual Payments
                                            </Typography>
                                            <Typography >
                                                125 Payments Received and Processed On 1/7/2019
                                            </Typography>
                                            <a href="/apps/mail">View Payments | Enter Payment</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-6">

                                </div>

                            </div>
                            <div className="flex flex-col sm:flex sm:flex-row pb-2">
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel
                                            control={<Checkbox icon={<Iconcus src={this.state.checkurl} size="60"/>} checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked3" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Frachisee Transactions
                                            </Typography>
                                            <Typography >
                                                125 Transactions Entered on from 1/3/2019 - 1/7/2019
                                            </Typography>
                                            <a href="/apps/mail">View | Add</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-6">

                                </div>

                            </div>
                            <div className="flex flex-col sm:flex sm:flex-row pb-2">
                                <div className="widget flex w-full sm:w-1/2 p-6">
                                    <div className="widget flex w-full sm:w-1/6 pl-40">
                                        <FormControlLabel
                                            control={<Checkbox  icon={<Iconcus src={this.state.checkurl} size="60"/>}  checkedIcon={<Iconcus src={this.state.checkedurl} size="60" />} value="checked3" />}
                                        />
                                    </div>
                                    <div  className={classNames(classes.cusbtnitem, "widget flex w-full sm:w-5/6 p-16 " )} >
                                        <div   elevation={1}>
                                            <Typography  component="h6" style={{fontSize:"21px"}}>
                                                Charge Backs
                                            </Typography>
                                            <Typography >
                                                Nothing Processd Yet
                                            </Typography>
                                            {/*<a href="/apps/mail">View | Add</a>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-6">

                                </div>

                            </div>
                        </div>

                        <div className="flex flex-wrap w-full md:w-320 pt-16">

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">
                                <FuseAnimate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300">
                                        2 New Customers
                                    </Typography>
                                </FuseAnimate>
                                <div className="widget w-full p-16">
                                    <Widget2 data={widgets.widget2}/>
                                    {/*<Widget8 data={widgets.widget8}/>*/}
                                </div>
                            </div>

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">
                                <FuseAnimate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300">
                                        1 New Franchisee
                                    </Typography>
                                </FuseAnimate>
                                <div className="widget w-full p-16">
                                    <Widget3 data={widgets.widget3}/>
                                </div>
                            </div>

                            <div className="mb-32 w-full sm:w-1/2 md:w-full">
                                <FuseAnimate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300">
                                        45 Active leads
                                    </Typography>
                                </FuseAnimate>
                                <div className="widget w-full p-16">
                                    <Widget4 data={widgets.widget4}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </FuseAnimate>
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getWidgets: Actions.gethomeWidgets
    }, dispatch);
}

function mapStateToProps({homepage})
{
    return {
        widgets: homepage.data
    }
}

// export default withReducer('dashboard', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))));
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage)));
