import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';
// core components
import {Card, CardContent, CircularProgress, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
//Theme component
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//Store
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

//3rd parties
import moment from 'moment';

//Child components
import SummaryTransactons from "./components/summaryTransactions";
import CustomerTransactions from './components/customerTransactions'
import CustomerAccountTotals from './components/customerAccountTotal'
import SupplyTransactons from './components/supplyTransactions'
import RegularMiscTransactions from './components/regularMiscTransactions'
import SpecialMiscTransactions from './components/specialMiscTransactions'
import FindersFeeTransactions from './components/findersFeeTransactions'
import ChargeBacksTransactions from './components/chargeBacksTransactions'


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
        '& .report-header h2':{
            fontSize: 19,
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
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
// let PDF_Width                       = 0;
// let PDF_Height                      = 0;
// let canvas_image_width              = 0;
// let canvas_image_height             = 0;

class Report extends Component {


    componentDidMount()
    {
        /**
         * Get the Report Data
         */
        this.props.onRef(this);
        console.log('props=', this.props);
        if(this.props.match.path !== '/franchisees/list')
            this.props.createReport(this.props.match.params);
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
        // let cardlen = document.getElementsByClassName("pdfcardcontent").length;
        // let img;

        if (input != null && imgURL != null) {
            this.getDataUri(imgURL, function (dataUri) {
                // img = dataUri;
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
        // PDF_Width = HTML_Width + (top_left_margin * 2);
        // PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
        // canvas_image_width = HTML_Width;
        // canvas_image_height = HTML_Height;
    };

    renderHeader = ()=>{
        let period = this.props.reportPeriod.split('/');

        let month = period[0];
        let year = period[1];

        const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

        return (
            <tr className="report-header">
                <td className="text-center" width='200' align="left">
                    <Typography color="inherit">
                        <img src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png" alt=""/>
                    </Typography>
                </td>
                <td className="text-center" width='550'>
                    <Typography variant={"h2"} color="inherit">FRANCHISEE REPORT</Typography>
                    <Typography variant={"h2"} color="inherit">
                        {/*{region[0].regionname}*/}
                    </Typography>
                    <Typography color="inherit" variant={"h2"}>
                        BUSINESS FOR THE MONTH OF {(months[parseInt(month)-1]).toUpperCase()} {year}
                    </Typography>

                </td>
                <td align="center">
                    <Typography color="inherit">Date: {moment().format('MM/DD/YYYY')} </Typography>
                    <Typography>Time: {moment().format("HH:mm:ss")}</Typography>
                    <Typography><br/></Typography>
                </td>
            </tr>
        )
    };
    render()
    {
        const { classes, franchiseeReport} = this.props;

        if(this.props.bFetchingFranchiseeReport)
            return (
                <div className={classNames(classes.overlay, 'flex items-center w-full')}>
                    <CircularProgress className={classes.progress} color="secondary"  />
                </div>
            );
        if(franchiseeReport===null)
            return <div/>;

        const {FranchiseeNumber, SummaryPages}  = franchiseeReport.Data.PERIODS[0].FRANCHISEES[0];

        return (
            <div className={classNames(classes.root, "p-0 sm:p-24  whole print:p-0")} id ="wholediv">
                <div id ="testdiv" className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                <Typography color="inherit">{FranchiseeNumber}</Typography>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="text-left">
                                                <Typography color="inherit">{SummaryPages[0].FranName}</Typography>
                                                <Typography color="inherit">{SummaryPages[0].FranAddress}</Typography>
                                                <Typography color="inherit">{SummaryPages[0].FranCity} {SummaryPages[0].FranState},{SummaryPages[0].FranZip}</Typography>
                                            </td>
                                            <td className="text-left" width='200'>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td className="text-left">
                                                <Typography color="inherit">Plan Type: {SummaryPages[0].PlanType}</Typography>
                                                <Typography color="inherit">Sign Date: {SummaryPages[0].DateSign}</Typography>
                                                {/* <Typography color="inherit">Plan Type: {SummaryPages[0].CONTACT}</Typography> */}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <SummaryTransactons />
                                <div className="flex flex-row justify-center pb-12 page1">Page 1 of 8</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                    {FranchiseeNumber}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SummaryPages[0].FranName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <CustomerTransactions />
                                <div className="flex flex-row justify-center pb-12 page">Page 2 of 8</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                    {FranchiseeNumber}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SummaryPages[0].FranName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <CustomerAccountTotals />
                                <div className="flex flex-row justify-center pb-12 page">Page 3 of 8</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                    {FranchiseeNumber}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SummaryPages[0].FranName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <FindersFeeTransactions />
                                <div className="flex flex-row justify-center pb-12 page">Page 4 of 8</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                    {FranchiseeNumber}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SummaryPages[0].FranName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <SupplyTransactons />
                                <div className="flex flex-row justify-center pb-12 page">Page 5 of 8</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                    {FranchiseeNumber}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SummaryPages[0].FranName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <RegularMiscTransactions />
                                <div className="flex flex-row justify-center pb-12 page">Page 6 of 8</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                    {FranchiseeNumber}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SummaryPages[0].FranName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <SpecialMiscTransactions />
                                <div className="flex flex-row justify-center pb-12 page">Page 7 of 8</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="cardname">
                    <Card className={classNames(classes.card, "pdfcardcontent mx-auto mt-64")}>
                        <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                            <div>
                                <table className="w-full">
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
                                                    {FranchiseeNumber}
                                                </Typography>
                                            </td>
                                            <td className="text-left" width='100'>
                                                <Typography color="inherit"><br/></Typography>
                                            </td>
                                            <td>
                                                <Typography color="inherit">
                                                    {SummaryPages[0].FranName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ChargeBacksTransactions />
                                <div className="flex flex-row justify-center pb-12 page">Page 8 of 8</div>
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

function mapStateToProps({franchiseeReports, franchisees})
{
    return {
        franchiseeReport: franchiseeReports.franchiseeReport1,
        bFetchingFranchiseeReport: franchiseeReports.bFetchingFranchiseeReport,
        reportPeriod: franchisees.reportPeriod,
    }
}

export default  withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Report)));
