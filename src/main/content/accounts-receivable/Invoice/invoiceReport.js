import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

//Material-UI
import {withStyles,Typography} from "@material-ui/core";

// for store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';

//3rd parties
import moment from 'moment';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import classNames from 'classnames';


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
    td:{
        color:'black',
    },
    tr:{
        color:'black',
    },
    th:{
        color:'black',
    },
    p:{
        color:'black',
    },
    span:{
        color:'black',
    },
    Typography:{
        color:'black',
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
    }
});

class InvoiceReport extends Component {
    state = {
        isOpen                          : false,
        invoiceDetail                   : [],
        Items                           : [],
        Region                          : [],
        CustomerSoldTo                  : [],
        CustomerFor                     : [],
        RegionInfo                      : null,
        customer: null,
    };

    constructor(props){
        super(props);

        this.downloadPDF = this.downloadPDF.bind(this);
        this.getDataUri  = this.getDataUri.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.Detail!==this.props.Detail){
            let customers = this.props.customersDB.Data.Regions[0].CustomerList;
            let customer = customers.filter(c=>c.CustomerNo===nextProps.Detail.Data.CustomerNo);
            if(customer.length)
                this.setState({customer: customer[0]});
        }

    }
    componentDidMount(){
        this.props.onRef(this);
        if(this.props.Detail ==="Failed"){
            alert("GET INVOICE DETAIL FAILD!!!");
        }
    }
    componentWillUnmount(){
        this.props.onRef(undefined);
    }
    componentWillMount(){
        // console.log("#################this.props.Detail",this.props.Detail);
        if(this.props.Detail !=="Failed"){
            this.setState({
                invoiceDetail:this.props.Detail.Data,
                Items: this.props.Detail.Data.Items,
                Region: this.props.Detail.Data.RegionId,
            });
            if(this.props.Region ){
                if(this.props.RegionId){
                    this.props.Region.map((item)=>{
                        if(item.regionid === this.props.RegionId){
                            this.setState({RegionInfo: item});
                        }
                    });
                }
            }
        }
        if(this.props.Detail ==="Faild"){

        }

    }
    componentDidUpdate(prevProps, prevState,){
        if(this.props.Detail !=="Faild" &&  this.props.Detail.Data.RegionId && this.props.Detail.Data.RegionId !== null && JSON.stringify(this.props.Detail.Data.RegionId) !== JSON.stringify(prevProps.Detail.Data.RegionId)){
            this.setState({
                Region: this.props.Detail.Data.RegionId,
            });
        }
        if(this.props.Detail !=="Faild" && this.props.Detail  && JSON.stringify(this.props.Detail) !== JSON.stringify(prevProps.Detail)){
            this.setState({
                invoiceDetail:this.props.Detail.Data,
                Items: this.props.Detail.Data.Items,
                Region: this.props.Detail.Data.RegionId,
            });
        }
        if(this.props.Detail !=="Faild" && this.props.Region && JSON.stringify(this.props.Region) !== JSON.stringify(prevProps.Region)){
            if(this.props.RegionId &&  JSON.stringify(this.props.RegionId) !== JSON.stringify(prevProps.RegionId)){
                this.props.Region.map((item)=>{
                    if(item.regionid === this.props.RegionId){
                        this.setState({RegionInfo:item});
                    }
                });
            }
        }
    }
    getDataUri=(url, cb)=>
    {
        var image = new Image();
        var log_url = 'https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png';
        image.setAttribute('crossOrigin', 'anonymous');
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';  /// set white fill style
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            canvas.getContext('2d').drawImage(this, 0, 0);
            cb(canvas.toDataURL('image/png'));
        };
        image.src = log_url;
    };

    downloadPDF=(input, imgURL)=> {
        let img = null;
        if (input != null && imgURL != null) {
            this.getDataUri(imgURL, function (dataUri) {
                img = dataUri;
            });
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/jpeg',1.0);
                    const pdf = new jsPDF();
                    // const pdf = new jsPDF('p', 'pt', [input.offsetWidth, input.offsetHeight]);
                    pdf.addImage(imgData, 'jpeg', 0, 0);
                    pdf.addImage(img, 'jpeg', 8, 15, 40, 30);
                    pdf.addImage(img, 'jpeg', 150, 102, 40, 30);
                    pdf.save("download.pdf");
                })
            ;
        }
    };

    render() {

        if (!this.props.show) {
            return null;
        }
        console.log('customer=', this.state.customer);

        if (this.props.Detail.Data && this.props.Detail.Data !== null && this.state.RegionInfo && this.state.RegionInfo !== null ) {
            return (

                <div onClick={this.props.onClose}   style={{
                    position: 'absolute',
                    top: -110,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 99999,
                    height: 'fit-content',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 50
                }}>

                    <div onClick={this.props.onClose} id="divToPrint" className="modal" style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        maxWidth: 800,
                        minHeight: 300,
                        margin: '0 auto',
                        padding: 30
                    }}>
                        <div style={{width: '100%',color:'black'}}>
                                <table style={{width: '100%',color:'black'}}>
                                    <thead>
                                    <tr>
                                        <th className="text-center" width='20%' align="left" style={{color:'black'}}>
                                            <Typography color="inherit">
                                                <img
                                                    src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png"
                                                    alt=""/>
                                            </Typography>
                                        </th>
                                        <th width='50%' className="text-left" style={{color:'black'}}>
                                            Remit To:
                                            <Typography >{this.state.RegionInfo.address1}</Typography>
                                            <Typography >{this.state.RegionInfo.address2}</Typography>
                                            <Typography >{this.state.RegionInfo.address3}</Typography>
                                            <Typography >{this.state.RegionInfo.address4}</Typography>
                                            <Typography >{`${this.state.RegionInfo.regionname}, ${this.state.RegionInfo.city}, ${this.state.RegionInfo.state} `}</Typography>
                                        </th>
                                        <th>
                                            <table style={{width: '100%', borderCollapse: 'collapse', border: 'solid 1px',color:'black'}}>
                                                <tbody>
                                                <tr>
                                                    <td style={{border: 'solid 1px',color:'black'}} colSpan="2">Invoice</td>
                                                </tr>
                                                <tr>
                                                    <td style={{border: 'solid 1px'}}>
                                                        <Typography  style={{color:'black'}}> <strong>Date</strong> </Typography>
                                                        <Typography  style={{color:'black'}}>{moment(this.state.invoiceDetail.InvoiceDate).format('MM/DD/YYYY')}</Typography>
                                                    </td>
                                                    <td style={{border: 'solid 1px'}}>
                                                        <Typography  style={{color:'black'}}><strong>Number</strong></Typography>
                                                        <Typography  style={{color:'black'}}>{this.state.invoiceDetail.Inv_no}</Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{border: 'solid 1px'}}>
                                                        <Typography  style={{color:'black'}}><strong>Due Date</strong></Typography>
                                                        <Typography  style={{color:'black'}}>{moment(this.state.invoiceDetail.DueDate).format('MM/DD/YYYY')}</Typography>
                                                    </td>
                                                    <td style={{border: 'solid 1px'}}>
                                                        <Typography  style={{color:'black'}}><strong>Cust. #</strong></Typography>
                                                        <Typography  style={{color:'black'}}>{this.state.invoiceDetail.CustomerNo}</Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{border: 'solid 1px',color:'black'}}>
                                                        <Typography  style={{color:'black'}}><strong style={{fontSize: '11px'}}>Invoice
                                                            Amount</strong></Typography>
                                                        <Typography  style={{color:'black'}}>
                                                            {'$'+parseFloat(this.state.invoiceDetail.GrandTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                        </Typography>
                                                    </td>
                                                    <td style={{border: 'solid 1px'}}>
                                                        <Typography  style={{color:'black'}}><strong style={{fontSize: '11px'}}>Amount Remitted</strong></Typography>
                                                        <Typography  style={{color:'black'}}>
                                                            &nbsp;
                                                        </Typography>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                                <table style={{width: '85%',color:'black'}} align="center">
                                    <tbody>
                                    {this.state.customer && (
                                        <tr>
                                            <td width='60%' className="text-left">
                                                <Typography  style={{color:'black'}}><strong>Sold To:</strong></Typography>
                                                <Typography  style={{color:'black'}}>{this.state.invoiceDetail.CustomerName}</Typography>
                                                <Typography  style={{color:'black'}}>{this.state.customer.BillingAddress}</Typography>
                                                <Typography  style={{color:'black'}}>{`${this.state.customer.BillingCity}, ${this.state.customer.BillingState}, ${this.state.customer.BillingPostalCode}`}</Typography>
                                            </td>
                                            <td width='40%' className="text-left">
                                                <Typography  style={{color:'black'}}><strong>For:</strong></Typography>
                                                <Typography  style={{color:'black'}}>{this.state.invoiceDetail.CustomerName}</Typography>
                                                <Typography  style={{color:'black'}}>{this.state.customer.Address}</Typography>
                                                <Typography  style={{color:'black'}}>{`${this.state.customer.City}, ${this.state.customer.StateName}, ${this.state.customer.PostalCode}`}</Typography>
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td width='50%' className="text-left">
                                            <Typography  style={{color:'black'}}><span  style={{color:'black'}}>{this.state.CustomerSoldTo.AddressLine1}</span><span
                                                style={{paddingLeft: 50,color:'black'}}>{this.state.CustomerSoldTo.State}</span><span
                                                style={{paddingLeft: 30,color:'black'}}>{this.state.CustomerSoldTo.ZipCode}</span></Typography>
                                        </td>
                                        <td width='' className="text-left">
                                            <Typography  style={{color:'black'}}><span  style={{color:'black'}}>{this.state.CustomerFor.AddressLine1}</span><span
                                                style={{paddingLeft: 50,color:'black'}}>{this.state.CustomerFor.State}</span><span
                                                style={{paddingLeft: 30,color:'black'}}>{this.state.CustomerFor.ZipCode}</span></Typography>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                                <table style={{width: '85%',color:'black'}} align="center">
                                    <tbody>
                                    <tr>
                                        <td className="text-center" width='100%'>
                                            <Typography><span style={{fontSize: '11px',color:'black'}}>Make All Checks Payable To:JANI-KING OF {this.state.RegionInfo.regionname},INC,</span></Typography>
                                            <Typography><span
                                                style={{fontSize: '11px',color:'black'}}>RETURN THIS PORTION WITH YOUR PAYMENT</span></Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style={{width: '100%', borderBottom: '2px solid rgb(0, 0, 0)'}}></div>
                                <table style={{width: '85%',color:'black'}} align="center">
                                    <tbody>
                                    <tr>
                                        <td width="20%"></td>
                                        <td width="60%" className="text-center">
                                            <Typography><strong><span style={{fontSize: '18px',color:'black'}}>JANI-KING OF {this.state.RegionInfo.regionname} ,INC</span></strong></Typography>
                                            <Typography><strong><span
                                                style={{fontSize: '14px',color:'black'}}>Commercial Cleaning Services</span></strong></Typography>
                                            <Typography><span style={{color:'black'}}>{this.state.RegionInfo.fax}</span></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>

                                        </td>
                                        <td width="20%">
                                            <Typography color="inherit">
                                                <img
                                                    src="https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png"
                                                    alt=""/>
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                                <table style={{width: '85%',color:'black'}} align="center">
                                    <tbody>
                                    {this.state.customer && (
                                        <tr>
                                            <td width='60%' className="text-left">
                                                <Typography  style={{color:'black'}}><strong>Sold To:</strong></Typography>
                                                <Typography  style={{color:'black'}}>{this.state.invoiceDetail.CustomerName}</Typography>
                                                <Typography  style={{color:'black'}}>{this.state.customer.BillingAddress}</Typography>
                                                <Typography  style={{color:'black'}}>{`${this.state.customer.BillingCity}, ${this.state.customer.BillingState}, ${this.state.customer.BillingPostalCode}`}</Typography>
                                            </td>
                                            <td width='40%' className="text-left">
                                                <Typography  style={{color:'black'}}><strong>For:</strong></Typography>
                                                <Typography  style={{color:'black'}}>{this.state.invoiceDetail.CustomerName}</Typography>
                                                <Typography  style={{color:'black'}}>{this.state.customer.Address}</Typography>
                                                <Typography  style={{color:'black'}}>{`${this.state.customer.City}, ${this.state.customer.StateName}, ${this.state.customer.PostalCode}`}</Typography>
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td width='50%' className="text-left">
                                            <Typography><span style={{color:'black'}}>{this.state.CustomerSoldTo.AddressLine1}</span><span
                                                style={{paddingLeft: 50,color:'black'}}>{this.state.CustomerSoldTo.State}</span><span
                                                style={{paddingLeft: 30,color:'black'}}>{this.state.CustomerSoldTo.ZipCode}</span></Typography>
                                        </td>
                                        <td className="text-left">
                                            <Typography><span style={{color:'black'}}>{this.state.CustomerFor.AddressLine1}</span><span
                                                style={{paddingLeft: 50,color:'black'}}>{this.state.CustomerFor.State}</span><span
                                                style={{paddingLeft: 30,color:'black'}}>{this.state.CustomerFor.ZipCode}</span></Typography>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                                <table style={{width: '100%', borderCollapse: 'collapse', border: 'solid 1px',color:'black'}}>
                                    <thead>
                                    <tr>
                                        <th width="15%" style={{border: 'solid 1px',color:'black'}} className="text-center">Invoice No</th>
                                        <th width="10%" style={{border: 'solid 1px',color:'black'}} className="text-center">Date</th>
                                        <th width="10%" style={{border: 'solid 1px',color:'black'}} className="text-center">Cust No</th>
                                        <th width="15%" style={{border: 'solid 1px',color:'black'}} className="text-center">Slsmn No</th>
                                        <th width="15%" style={{border: 'solid 1px',color:'black'}} className="text-center">PO Number</th>
                                        <th width="25%" style={{border: 'solid 1px',color:'black'}} className="text-center">Franchisee</th>
                                        <th width="10%" style={{border: 'solid 1px',color:'black'}} className="text-center">Due Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*{this.state.Items != null && this.state.Items && this.state.Items.map((item, index) => {*/}
                                    {/*return (*/}
                                    <tr >
                                        <td width="15%" style={{border: 'solid 1px',color:'black'}}
                                            className="text-center">{this.state.invoiceDetail.Inv_no}</td>
                                        <td width="10%" style={{border: 'solid 1px',color:'black'}}
                                            className="text-center">{moment(this.state.invoiceDetail.InvoiceDate).format('MM/DD/YYYY') }</td>
                                        <td width="10%" style={{border: 'solid 1px',color:'black'}}
                                            className="text-center">{this.state.invoiceDetail.CustomerNo}</td>
                                        <td width="15%" style={{border: 'solid 1px',color:'black'}}
                                            className="text-center">{this.state.invoiceDetail.slsmn_no}</td>
                                        <td width="15%" style={{border: 'solid 1px',color:'black'}}
                                            className="text-center">{this.state.invoiceDetail.PONumber}</td>
                                        <td width="25%" style={{border: 'solid 1px',color:'black'}}
                                            className="text-center">{this.state.invoiceDetail.apply_fran}</td>
                                        <td width="10%" style={{border: 'solid 1px',color:'black'}}
                                            className="text-center">{moment(this.state.invoiceDetail.DueDate).format('MM/DD/YYYY')}</td>
                                    </tr>
                                    {/*)*/}
                                    {/*})}*/}
                                    </tbody>
                                </table>
                                <table style={{width: '100%', borderCollapse: 'collapse', border: 'solid 1px'}}>
                                    <tbody>
                                    <tr>
                                        <td width="10%" style={{border: 'solid 1px',color:'black'}} className="text-center">
                                            <strong>Quantity</strong></td>
                                        <td width="60%" style={{border: 'solid 1px',color:'black'}} className="text-center">
                                            <strong>Description</strong></td>
                                        <td width="15%" style={{border: 'solid 1px',color:'black'}} className="text-center"><strong>Unit
                                            Price</strong></td>
                                        <td width="15%" style={{border: 'solid 1px',color:'black'}} className="text-center"><strong>Extended
                                            Price</strong></td>
                                    </tr>
                                    {this.state.Items != null && this.state.Items && this.state.Items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td width="10%" style={{border: 'solid 1px',color:'black'}}
                                                    className="text-center">{item.LineNo}</td>
                                                <td width="60%" style={{border: 'solid 1px',color:'black'}}
                                                    className="text-center">{item.Description}</td>
                                                <td width="15%" style={{border: 'solid 1px',color:'black'}} className="text-center">
                                                    {'$'+parseFloat(item.UnitPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                </td>
                                                <td rowSpan="1" width="15%" style={{border: 'solid 1px',color:'black'}}
                                                    className="text-center">
                                                    {'$'+parseFloat(item.ExtendedPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                </td>

                                            </tr>
                                        )
                                    })}

                                    <tr>
                                        <td style={{borderRight: 'solid 1px'}}>
                                            <Typography><br/></Typography> <Typography><br/></Typography>
                                            <Typography><br/></Typography> <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography> <Typography><br/></Typography>
                                            <Typography><br/></Typography> <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography>
                                            <Typography><br/></Typography><Typography><br/></Typography>
                                        </td>
                                        <td >
                                            <Typography><br/></Typography>
                                            <Typography style={{color:'black',textAlign: "center"}}>{this.state.invoiceDetail.InvoiceMessage}</Typography>
                                        </td>
                                        <td style={{border: 'solid 1px',color:'black'}}><Typography><br/></Typography></td>
                                        <td style={{border: 'solid 1px',color:'black'}}><Typography><br/></Typography></td>
                                    </tr>

                                    <tr>
                                        <td width="10%" style={{borderRight: 'solid 1px'}} className="text-center"></td>
                                        <td width="60%" className="text-center">  {this.state.invoiceDetail.InvMsg}</td>
                                        <td width="15%" style={{border: 'solid 1px'}} className="text-center">
                                            <strong>Amount of Sale</strong>
                                        </td>
                                        <td width="15%" style={{border: 'solid 1px'}} className="text-center">
                                            {'$'+parseFloat(this.state.invoiceDetail.SubTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="10%" style={{borderRight: 'solid 1px'}} className="text-center"></td>
                                        <td width="60%" className="text-center"></td>
                                        <td width="15%" style={{border: 'solid 1px'}} className="text-center">
                                            <strong>Sales Tax</strong>
                                        </td>
                                        <td width="15%" style={{border: 'solid 1px'}} className="text-center">
                                            {'$'+parseFloat(this.state.invoiceDetail.TaxAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="10%" style={{borderRight: 'solid 1px'}} className="text-center"></td>
                                        <td width="60%" className="text-center">
                                            <Typography><strong style={{fontSize: '11px'}}>Make All Checks Payable To:</strong></Typography>
                                            <Typography><strong style={{fontSize: '11px'}}>JANI-KING OF
                                                BUFFALO,INC:</strong></Typography>
                                        </td>
                                        <td width="15%" style={{border: 'solid 1px'}} className="text-center">
                                            <strong>Total</strong>
                                        </td>
                                        <td width="15%" style={{border: 'solid 1px'}} className="text-center">
                                            {'$'+parseFloat(this.state.invoiceDetail.GrandTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                    </div>
                </div>
            );
        }
        else {

            return(<div></div>)
        }
    }
}


InvoiceReport.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node,
    Detail: PropTypes.object,
    Region: PropTypes.array,
    RegionId: PropTypes.number,
};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}


function mapStateToProps({invoices})
{
    return {
        customersDB: invoices.customersDB,
        Detail: invoices.invoiceDetail
    }
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceReport)));

