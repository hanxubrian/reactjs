import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from 'store/actions';

// third party

import Dialog from "@material-ui/core/Dialog/Dialog";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";

import MuiDialogContent from '@material-ui/core/DialogContent';


//Child components
import InvoiceNewPrintReport from './InvoiceNewReport'
import InvoiceNewReport from "./InvoiceListContent";


const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    dialogH2: {
        display: "flex",
        alignItems: "center",
        color: "white"
    },
    iconSmall: {
        fontSize: 20
    }
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);


class InvoicePrintModal extends React.Component {
    state = {
        openInvoiceReportPrintDialog: false,
    };


    componentWillMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    handleClose = () => {
        this.setState({openInvoiceReportPrintDialog: false});
    };

    onShowFranchiseeDialog = ()=>{
        this.setState({openInvoiceReportPrintDialog: true});
    };


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Dialog
                    open={this.state.openInvoiceReportPrintDialog}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"md"}
                    fullWidth
                    scroll={"body"}
                >
                    <DialogContent>
                        <InvoiceNewPrintReport Region={this.props.allRegion} RegionId ={this.props.regionId}  />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({auth}) {
    return {
        regionId: auth.login.defaultRegionId,
        allRegion:auth.login.all_regions,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoicePrintModal)));
