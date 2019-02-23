import React from 'react';

import { process } from '@progress/kendo-data-query';
import { GridPDFExport, PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import {Typography,} from '@material-ui/core'
import GridM from '@material-ui/core/Grid'
// for Store
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

//3rd parties
import moment from 'moment';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        fontSize: 11,
        '& .small': {
            fontSize: 11
        }

    }
});
class ExportChecks extends React.Component {
    pdfExportComponent;
    image;

    onPrint = ()=> {
        this.pdfExportComponent.save();
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

        let selections = this.props.selectionsChecks.map((index)=>this.props.printChecksDB[index]);

        return (
            <div className={classNames("p-24")}>
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
                    scale={0.9}
                >
                    <div  style={{ width: "700px;", margin: '0 auto', maxWidth: 700}} className={classNames(classes.root)}>
                        {selections.map((check, index)=>{
                            return (
                                <div key={index} className={classNames("flex flex-col",{'page-break': index>0})}>
                                    <div className="flex flex-row relative justify-center mt-12">
                                        <div className="absolute checks-date small" style={{left: 0}}>{moment().format('MM/DD/YYYY')}</div>
                                        <Typography variant={"inherit"}>JaniKing | Franchise Management System</Typography>
                                    </div>
                                    <GridM container>
                                        <GridM item sm={3}>
                                            <img
                                                src={log_url}
                                            />
                                        </GridM>
                                        <GridM item sm={6}>
                                            <Typography variant={"subtitle1"}><strong>Jani-King of Buffalo, Inc</strong></Typography>
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

                                        <Grid
                                            ref={(grid) => this.grid = grid}
                                            data={check.turnArounddata}
                                        >
                                            <Column field="InvoiceNo" title="InvoiceNo" width="100px" />
                                            <Column field="CustomerNumber" title="Customer No" width="100px" />
                                            <Column field="CustomerName" title="Customer Name" width="240px"/>
                                            <Column field="Amount" title="Invoice Payment Amt." />
                                        </Grid>

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
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExportChecks)));
