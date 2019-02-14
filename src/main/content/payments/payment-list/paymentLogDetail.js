import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';
import moment from 'moment';

// core components
import {Card, CardContent, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';

//Theme component
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//Store
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

//Child components

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& table '    : {
            '& th:first-child, & td:first-child': {
                paddingLeft: 0 + '!important'
            },
            '& th:last-child, & td:last-child'  : {
                paddingRight: 0 + '!important'
            }
        },
        '& .report-header h1':{
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1.5,
        },
        '& .report-header h2':{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.5,
        },
        '& .report-header h3':{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.5,
        },
        '& .report-header td:nth-child(2), & .report-header td:nth-child(3)':{
            verticalAlign: 'top',
            paddingTop: 20
        },
        '& .report-header td:nth-child(3)':{
            paddingLeft: 30
        }

    },
    paper: {
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card       : {
        width         : 1020,
        '@media print': {
            width    : '100%!important',
            boxShadow: 'none'
        }
    },
    cardContent: {
        '& .page': {
            // borderBottom: `1px solid ${theme.palette.text.primary}`
        },
        '& .page1': {
            paddingTop: 12,
            borderTop: `1px solid ${theme.palette.text.primary}`,
            // borderBottom: `1px solid ${theme.palette.text.primary}`
        }
    },
    divider    : {
        width          : 1,
        backgroundColor: theme.palette.divider,
        height         : 144
    },
    seller     : {
        backgroundColor: theme.palette.primary.dark,
        color          : theme.palette.getContrastText(theme.palette.primary.dark),
        marginRight    : -88,
        paddingRight   : 66,
        width          : 480,
        '& .divider'   : {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
            opacity        : .5
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    longerTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 835
    },
    overlay: {
        position: 'absolute',
        top: -104,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0, .6)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

let pdf                             = 0;
let page_section                    = 0;
let HTML_Width                      = 0;
let HTML_Height                     = 0;
let top_left_margin                 = 0;

class PaymentLogDetail extends Component {


    componentDidMount()
    {
        this.props.onRef(this);
    }
    componentWillUnmount() {

        this.props.onRef(undefined);
    }

    getDataUri=(url, cb)=>
    {
        let image = new Image();
        let log_url = 'https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png';
        image.setAttribute('crossOrigin', 'anonymous');
        image.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = 2500;
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';  /// set white fill style
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            canvas.getContext('2d').drawImage(this, 0, 0);
            cb(canvas.toDataURL('image/png'));
        };
        image.src = log_url;
    };

    downloadPDF=(input, imgURL)=> {
        console.log("document.getElementsByClassName length",document.getElementsByClassName("pdfcardcontent").length);
        console.log('image=',imgURL,top_left_margin, top_left_margin, HTML_Width, HTML_Height);
        let cardlen = document.getElementsByClassName("pdfcardcontent").length;
        let img = null;

        if (input != null && imgURL != null) {
            this.getDataUri(imgURL, function (dataUri) {
                img = dataUri;
            });
            html2canvas(input)
                .then((canvas) => {

                    const imgData = canvas.toDataURL('image/jpeg',1.0);
                    this.calculatePDF_height_width("whole",0);

                    pdf = new jsPDF('p', 'pt', [input.offsetWidth, input.offsetHeight]);
                    pdf.addImage(imgData, 'jpeg', top_left_margin, top_left_margin, HTML_Width, HTML_Height);

                    pdf.save("download.pdf");
                })
            ;
        }
    };

    calculatePDF_height_width=(selector,index)=>{

        page_section = document.getElementsByClassName(selector)[index];
        HTML_Width = page_section.offsetWidth;
        HTML_Height = page_section.offsetHeight ;
        top_left_margin = 15;
    };

    renderHeader = ()=>{
        return (
            <Grid container className="flex flex-row items-center report-header">
                <Grid item sm={3} className="text-left" >
                    <Typography color="inherit" variant={"p"}>{moment().format('MM/DD/YYYY')}</Typography>
                    <Typography color="inherit" variant={"p"}>{moment().format('HH:mm:ss')}</Typography>
                    <Typography className="mt-16" color="inherit" variant={"p"}>* <i>Indicates invoice applied</i></Typography>
                    <Typography color="inherit" variant={"p"}><i>to non-default franchisee.</i></Typography>
                </Grid>
                <Grid item sm={7} className="text-center">
                    <Typography variant={"h1"} color="inherit">Janiking of Bufflo, Inc.</Typography>
                    <Typography color="inherit" variant={"h2"}>
                        Accounts Receivable Log
                    </Typography>
                    <Typography color="inherit" variant={"h3"}>Deposit Date: {moment(this.props.logDate).format('MM/DD/YYYY')} </Typography>
                </Grid>
                <Grid item sm={2} className="text-right" width='200' align>
                    <Typography color="inherit">
                        <img src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png" alt=""/>
                    </Typography>
                </Grid>
            </Grid>
        )
    };
    render()
    {
        const { classes} = this.props;

        return (
            <div className={classNames(classes.root, "p-0 sm:p-64  whole print:p-0")} id ="wholediv">
                <div id ="testdiv" className="cardname">
                    <div className="w-full">
                        {this.renderHeader()}
                    </div>
                </div>

            </div>
        )
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        createReport: Actions.createReport,
    }, dispatch);
}

function mapStateToProps({auth, paymentLog})
{
    return {
        paymentLogList: paymentLog.paymentLogList,
        regionId: auth.login.defaultRegionId,
        logDate: paymentLog.logDate,
    }
}

export default  withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentLogDetail)));
