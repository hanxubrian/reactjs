import React from 'react';

import { process } from '@progress/kendo-data-query';
import { GridPDFExport, PDFExport, savePDF } from '@progress/kendo-react-pdf';

// for Store
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

const styles = theme => ({

});
class ExportChecks extends React.Component {
    pdfExportComponent;

    render() {
        return (
            <div>
                <div className="example-config">
                    <button className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Export PDF
                    </button>
                </div>

                <PDFExport
                    paperSize="A4"
                    margin="1.5cm"
                    forcePageBreak=".page-break"
                    ref={(component) => this.pdfExportComponent = component}
                >
                    <div style={{ width: "500px;"}}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci.
                        </p>
                        <p className="page-break">
                            Ut orci ligula, varius ac consequat in, rhoncus in dolor. Mauris pulvinar molestie accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean velit ligula, pharetra quis aliquam sed, scelerisque sed sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam dui mi, vulputate vitae pulvinar ac, condimentum sed eros.
                        </p>
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

function mapStateToProps({auth, printChecks, paymentLog})
{
    return {
        paymentLogList: paymentLog.paymentLogList,
        printChecksDB: printChecks.printChecksDB,
        regionId: auth.login.defaultRegionId,
        logDate: paymentLog.logDate,
        all_regions: auth.login.all_regions,
    }
}

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExportChecks)));
