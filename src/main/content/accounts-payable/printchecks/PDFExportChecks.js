import React from 'react';

import { GridPDFExport, PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import {Divider, Typography,} from '@material-ui/core'
import GridM from '@material-ui/core/Grid'
// for Store
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

//3rd parties
import moment from 'moment';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

const styles = theme => ({
    root: {
        fontSize: 11,
        '& .checkdate': {
            borderBottom:"1px solid #333",
            marginLeft: '2.4em',
        },
        '& .k-grid-header': {
          paddingRight: '0!important',
            '& .k-grid-header-wrap':{
              borderTop:"1px solid #333",
              borderBottom:"1px solid #333",
            }
        },
        '& .small': {
            fontSize: 11,
        },
        '& table': {
          width: '100%',
            '& thead th': {
                textAlign: 'left',
                '& a':{
                    color: 'black!important'
                }
            },
            '& thead th:nth-child(4)': {
                textAlign: 'right'
            },
            '& tbody': {
                '& tr td:nth-child(4)': {
                    textAlign: 'right'
                },
                '& tr:last-child td': {
                    borderBottom:"1px solid #333",
                },
            },
        },
    }
});

const CurrencyFormatter = ({value}) => (
    <NumberFormat value={value}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator
                  decimalScale={2}
                  prefix="$" renderText={value => <div className="sum-01">{value}</div>}/>
);
const CurrencyFormatterTd = ({value}) => (
    <NumberFormat value={value}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator
                  decimalScale={2}
                  prefix="$" renderText={value => <td className="sum-01">{value}</td>}/>
);
class ExportChecks extends React.Component {
    pdfExportComponent;
    image;

    onPrint = async ()=> {
        await this.pdfExportComponent.save();
    };
    componentDidMount()
    {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    render() {
        const {classes} = this.props;
        const  log_url = 'https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png';
        // const  log_url = 'assets/images/logo-blank.png';

        // let selections = this.props.selectionsChecks.map((index)=>this.props.printChecksDB[index]);
        if(this.props.checksObj===null)
            return (<div/>)
        let selections = [this.props.checksObj];

        return (
            <div className={classNames("p-24 ")} style={{ position: "absolute", left: "-2000px", top: 0 }}>
                <div className="example-config">
                    <button className="k-button" onClick={this.onPrint}>
                        Export PDF
                    </button>
                </div>

                <PDFExport
                    paperSize="A4"
                    margin="1cm"
                    forcePageBreak=".page-break"
                    ref={(component) => this.pdfExportComponent = component}
                    scale={0.75}
                >
                    <div  style={{ width: "700px", margin: '0 auto', maxWidth: 700}} className={classNames(classes.root)}>
                        {selections.map((check, index)=>{
                            let amountSum = 0;
                            let dueSum = 0;
                            check.turnArounddata.forEach(t=>{
                                amountSum+=t.Amount;
                                dueSum+=t.NegativeDueTotal;
                            });
                            return (
                                <div key={index} className={classNames("flex flex-col",{'page-break': index>0})}>
                                    <div className="flex flex-row relative justify-center mt-12">
                                        <div className="absolute checks-date small" style={{left: 0}}>{moment().format('MM/DD/YYYY')}</div>
                                        <Typography variant={"inherit"}>JaniKing | Franchise Management System</Typography>
                                    </div>
                                    <GridM container>
                                        <GridM item sm={3}>
                                            <img style={{border: '0px solid black'}}
                                                src={log_url}
                                            />
                                        </GridM>
                                        <GridM item sm={6}>
                                            <Typography variant={"subtitle1"}><strong>Jani-King of {check.regionname}, Inc</strong></Typography>
                                        </GridM>
                                        <GridM item sm={3}>
                                            <Typography variant={"inherit"}>Check Number: {check.checknumber}</Typography>
                                            <Typography variant={"inherit"}>Check Date: {moment(check.checkdate).format('MM/DD/YYYY')}</Typography>
                                        </GridM>

                                    </GridM>
                                    <GridM container>
                                        <GridM item sm={3}>
                                        </GridM>
                                        <GridM item sm={3} >
                                            <Typography variant={"inherit"}>Payee: {check.PayeeNumber}</Typography>
                                        </GridM>
                                        <GridM item sm={6}>
                                            <Typography variant={"inherit"}>JACKSON 4 JACKSON, INC., an Authorized Franchisee</Typography>
                                        </GridM>
                                    </GridM>
                                    <br/>
                                    <br/>

                                    <Grid
                                        ref={(grid) => this.grid = grid}
                                        data={check.turnArounddata} style={{width: 700}}
                                    >
                                        <Column field="InvoiceNo" title="InvoiceNo" width="100px" />
                                        <Column field="CustomerNumber" title="Customer No" width="100px" />
                                        <Column field="CustomerName" title="Customer Name" />
                                        <Column field="Amount" title="Invoice Payment Amt." width="240px"
                                                cell={(props) =>CurrencyFormatterTd({value: props.dataItem[props.field]})}/>
                                    </Grid>
                                    <br/>
                                    <br/>
                                    <GridM container>
                                        <GridM item sm={3}>
                                        </GridM>
                                        <GridM item sm={3} >

                                        </GridM>
                                        <GridM item sm={3}>
                                            <Typography style={{textAlign: 'right'}} variant={"inherit"}>Total Invoice Payment:</Typography>
                                            <Typography style={{textAlign: 'right'}} variant={"inherit"}>Total Negative Due</Typography>
                                        </GridM>
                                        <GridM item sm={3}>
                                            <Typography style={{textAlign: 'right'}} variant={"inherit"}>{CurrencyFormatter({value: amountSum})}</Typography>
                                            <Typography style={{textAlign: 'right'}} variant={"inherit"}>{CurrencyFormatter({value: dueSum})}</Typography>
                                        </GridM>
                                    </GridM>
                                    <br/>
                                    <br/>
                                    <div className={classNames("flex flex-col w-full")}>
                                        <div className={classNames("flex flex-row w-full")}>
                                            <div style={{width: '12%'}}>
                                                <img style={{border: '0px solid black'}}
                                                     src={log_url}
                                                />
                                            </div>
                                            <GridM container>
                                                <GridM item sm={5} style={{paddingLeft: 12}}>
                                                    <Typography variant={"inherit"}><strong>Jani-King of {check.regionname}, Inc</strong></Typography>
                                                    <Typography variant={"inherit"}>Special Trust</Typography>
                                                    <Typography variant={"inherit"}>{check.PayeeAddress1}</Typography>
                                                    <Typography variant={"inherit"}>{check.regioncity}, {check.regionstate} {check.PayeePostalCode}</Typography>
                                                </GridM>
                                                <GridM item sm={7} >
                                                    <GridM container>
                                                        <GridM item sm={6} >
                                                            <Typography variant={"inherit"}><strong>Bank Name</strong></Typography>
                                                            <Typography variant={"inherit"}>Bank Address</Typography>
                                                            <Typography variant={"inherit"}>Bank Number</Typography>
                                                            <Typography variant={"inherit"}>Bank Phone</Typography>
                                                        </GridM>
                                                        <GridM item sm={6} >
                                                            <Typography style={{textAlign:'right'}} variant={"subtitle1"}><strong>{check.checknumber || 'Check Number'}</strong></Typography>
                                                            <br/>
                                                            <br/>
                                                            <br/>
                                                            <Typography style={{textAlign:'right'}} variant={"subtitle1"}><strong>Date <span className="checkdate">{moment(check.checkdate).format('MM/DD/YYYY')}</span></strong></Typography>
                                                        </GridM>
                                                    </GridM>
                                                </GridM>
                                            </GridM>
                                        </div>
                                        <div className={classNames("flex flex-row w-full items-center mt-4")}>
                                            <div style={{width: '12%'}}>
                                                <Typography variant={"subtitle1"}><strong>PAY</strong></Typography>
                                            </div>
                                            <div style={{width: '70%'}} className="flex flex-1 items-center">
                                                <Typography variant={"inherit"}>{check.checkAmounttext}</Typography>
                                            </div>
                                            <div style={{width: '18%'}} className="text-right">
                                                <Typography variant={"subtitle1"}><strong>{CurrencyFormatter({value: amountSum})}</strong></Typography>
                                            </div>
                                        </div>
                                        <div className={classNames("flex flex-row w-full items-start mt-4")}>
                                            <div style={{width: '12%'}}>
                                                <Typography style={{lineHeight: 1.2}} variant={"subtitle1"}><strong>To The Order Of:</strong></Typography>
                                            </div>
                                            <GridM container>
                                                <GridM item sm={7} style={{paddingLeft: '1.2em'}} >
                                                    <Typography variant={"inherit"}>KMBURNS, LLC, an Authorized Franchisee</Typography>
                                                    <Typography variant={"inherit"}>58 SUMMERDALE ROAD</Typography>
                                                    <Typography variant={"inherit"}>ANGOLA, NY 14006</Typography>
                                                </GridM>
                                                <GridM item sm={5} >
                                                    <Typography variant={"inherit"} style={{textAlign: 'center'}}><i>Void after 90 Days</i></Typography>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    <Divider classes={{}} style={{backgroundColor: 'black'}}/>
                                                    <Typography variant={"inherit"} style={{textAlign: 'center'}}><i>Authorized Signature</i></Typography>
                                                </GridM>
                                            </GridM>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </PDFExport>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateSelections: Actions.updateSelections
    }, dispatch);
}

function mapStateToProps({auth, printChecks})
{
    return {
        printChecksDB: printChecks.printChecksDB,
        selectionsChecks: printChecks.selections,
        regionId: auth.login.defaultRegionId,
        all_regions: auth.login.all_regions,
        checksObj: printChecks.checksObj,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExportChecks)));
