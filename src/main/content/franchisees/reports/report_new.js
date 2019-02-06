import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';

// core components
import {Card, CardContent, Typography, TextField,CircularProgress} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';

//Theme component
import FuseUtils from '@fuse/FuseUtils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//Store
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';
import SummaryTransactons from "./components/summaryTransactions";
import CustomerTransactions from './components/customerTransactions'
import CustomerAccountTotals from './components/customerAccountTotal'
import SupplyTransactons from './components/supplyTransactions'
import RegularMiscTransactons from './components/regularMiscTransactions'
import FindersFeeTransactions from './components/findersFeeTransactions'

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
    cardContent: {},
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
        left: -65,
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
let PDF_Width                       = 0;
let PDF_Height                      = 0;
let canvas_image_width              = 0;
let canvas_image_height             = 0;

class Report extends Component {


    componentDidMount()
    {
        /**
         * Get the Report Data
         */
        this.props.onRef(this);
        this.props.createReport(this.props.match.params);
    }
    componentWillUnmount() {

        this.props.onRef(undefined);
    }
    getDataUri=(url, cb)=>
    {
        var image = new Image();
        var log_url = 'https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png';
        image.setAttribute('crossOrigin', 'anonymous');
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = 2500;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';  /// set white fill style
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            canvas.getContext('2d').drawImage(this, 0, 0);
            cb(canvas.toDataURL('image/png'));
        };
        image.src = log_url;
    }
    downloadPDF=(input, imgURL)=> {
        console.log("document.getElementsByClassName length",document.getElementsByClassName("pdfcardcontent").length);
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
                    // pdf = new jsPDF();
                    pdf = new jsPDF('p', 'pt', [input.offsetWidth, input.offsetHeight]);
                    pdf.addImage(imgData, 'jpeg', top_left_margin, top_left_margin, HTML_Width, HTML_Height);
                    pdf.save("download.pdf");


                    // const imgData = canvas.toDataURL('image/png');
                    // const pdf = new jsPDF();
                    // pdf.addImage(imgData, 'PNG', 0, 0);
                    // pdf.addImage(img, 'PNG', 8, 15, 40, 30);
                    // pdf.addImage(img, 'PNG', 150, 102, 40, 30);
                    // pdf.save("download.pdf");
                })
            ;
        }
    }
    calculatePDF_height_width=(selector,index)=>{
        // page_section = $(selector).eq(index);
        page_section = document.getElementsByClassName(selector)[index];
        console.log("page_section",page_section);
        HTML_Width = page_section.offsetWidth;
        console.log("HTML_Width",HTML_Width);
        HTML_Height = page_section.offsetHeight ;
        top_left_margin = 15;
        PDF_Width = HTML_Width + (top_left_margin * 2);
        PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
        canvas_image_width = HTML_Width;
        canvas_image_height = HTML_Height;
    }
    renderHeader = ()=>{
        const { all_regions} = this.props;
        const {month, year, regionid} = this.props.match.params;

        const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

        let region_name = '';

        all_regions.forEach(r=>{
            if(r.RegionId===parseInt(regionid)) {
                region_name = r.Displayname;
                return false
            }
        });
        return (
            <tr>
                <td className="text-center" width='200' align="left">
                    <Typography color="inherit">
                        <img src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png" alt=""/>
                    </Typography>
                </td>
                <td className="text-center" width='500'>
                    <Typography color="inherit">FRANCHISEE REPORT</Typography>
                    <Typography color="inherit">
                        {region_name}
                    </Typography>
                    <Typography color="inherit">
                        BUSINESS FOR THE MONTH OF {months[parseInt(month)-1]} {year}
                    </Typography>

                </td>
                <td align="left">
                    <Typography color="inherit">Date: 11/30/2018 </Typography>
                    <Typography>Time: 11:58:57</Typography>
                    <Typography><br/></Typography>
                </td>
            </tr>
        )
    };
    render()
    {
        const { classes, franchiseeReport, all_regions} = this.props;

        if(franchiseeReport===null || all_regions.length===0)
            return (
                <div className={classes.overlay} style={{

                }}>
                    <CircularProgress className={classes.progress} color="secondary"  />

                </div>

            );

        const {DLR_CODE, SUMMARY_PAGE, CUS_TRXS, CUST_ACCT_TOTALS, SUPPLY_TRXS, LEASE_PAYMENTS,REG_MISC, CHARGEBACKS }  = franchiseeReport.Data.PERIODS[0].FRANCHISEE[0];

        return (
            <div className={classNames(classes.root, "p-0 sm:p-64  whole print:p-0")} id ="wholediv">
                <div id ="testdiv" className="cardname">
                    <Card className={classNames(classes.card,  "pdfcardcontent mx-auto")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table align="">
                                    <tbody>
                                    {this.renderHeader()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <div>
                                    <table className="mb-16">
                                        <tbody>
                                        <tr>
                                            <td className="pb-4">
                                                <Typography color="inherit">Franchisee Code:</Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography color="inherit">Name</Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pr-16">
                                                <Typography color="inherit">{DLR_CODE}</Typography>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="text-left">
                                                <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_NAME}</Typography>
                                                <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_ADDRESS}</Typography>
                                                <Typography color="inherit">{SUMMARY_PAGE[0].FRAN_CITY} {SUMMARY_PAGE[0].FRAN_STATE},{SUMMARY_PAGE[0].FRAN_ZIP}</Typography>
                                            </td>
                                            <td className="text-left" width='200'>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="text-left">
                                                <Typography color="inherit">Plan Type: {SUMMARY_PAGE[0].PLAN_TYPE}</Typography>
                                                <Typography color="inherit">Plan Type: {SUMMARY_PAGE[0].DATE_SIGN}</Typography>
                                                <Typography color="inherit">Plan Type: {SUMMARY_PAGE[0].CONTACT}</Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <SummaryTransactons />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table align="">
                                    <tbody>
                                    {this.renderHeader()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="">
                                <div>
                                    <table className="mb-16">
                                        <tbody>
                                        <tr>
                                            <td className="pr-16 pb-4">
                                                <Typography color="inherit">Franchisee Code:
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography color="inherit">
                                                    Name
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="pr-16">
                                                <Typography color="inherit">
                                                    {DLR_CODE}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SUMMARY_PAGE[0].FRAN_NAME}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                               <CustomerTransactions />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table align="">
                                    <tbody>
                                    {this.renderHeader()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <div>
                                    <table className="mb-16">
                                        <tbody>
                                        <tr>
                                            <td className="pr-16 pb-4">
                                                <Typography color="inherit">Franchisee Code:
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography color="inherit">
                                                    Name
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="pr-16">
                                                <Typography color="inherit">
                                                    {DLR_CODE}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SUMMARY_PAGE[0].FRAN_NAME}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                               <CustomerAccountTotals />
                            </div>
                        </CardContent>
                    </Card>
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

function mapStateToProps({auth, franchiseeReports})
{
    return {
        franchiseeReport: franchiseeReports.franchiseeReport1,
        all_regions: auth.login.all_regions
    }
}
const divline ={
    width:'65%',
    borderBottom:'2px solid #25058a',
};

export default  withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Report)));
