import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// third party

import TextField from "@material-ui/core/TextField/TextField";
import Dialog from "@material-ui/core/Dialog/Dialog";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';
import GridContainer from "../../../../../Commons/Grid/GridContainer";
import GridItem from "../../../../../Commons/Grid/GridItem";
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn'; 


import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import PDF from '../../../../../styles/document.pdf';

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


const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: "#3c93ec",
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: "white",
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            {children}
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class DocumentView extends React.Component {
    state = {
        openDialog: false,
        file : PDF
    };
    constructor (props){
        super(props);
    }


    componentDidMount() {

    }

    componentWillMount() {
        this.setState({openDialog:this.props.docViewModal});
        //console.log("PDF",PDF);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.docViewModal !== this.props.docViewModal) {
            this.setState({
                openDialog: nextProps.docViewModal
            });
        }
    }

    handleClose = () => {
        this.setState({ openDialog: false });
        this.props.openCloseDocViewActionDialog(false);
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    onFileChange = (event) => {
        this.setState({
          file: event.target.files[0],
        });
      }
    

    render() {
        const { classes } = this.props;
        const { pageNumber, numPages, file } = this.state;

        return (
            <div className={classes.root}>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose }
                    aria-labelledby="form-dialog-title"
                    maxWidth={"lg"}
                    fullWidth
                >
                    
                        <DialogTitle id="form-dialog-title" onClose={this.handleClose }>
                            <h2 className={classes.dialogH2}>
                                <AssignmentTurnedIn  className={classNames(classes.leftIcon)} />
                                Document Details
                            </h2>
                        </DialogTitle>
                        <DialogContent>
                            <GridContainer style={{ alignItems: 'center' }} className={classNames(classes.formControl)}>
                            <embed src={PDF} width="100%" height="800px" />
                            </GridContainer>
                        </DialogContent>
                </Dialog>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseDocViewActionDialog: Actions.openCloseDocViewActionDialog,
    }, dispatch);
}

function mapStateToProps({franchisees, auth}) {
    return {
        docViewModal: franchisees.docViewModal,
        regionId: auth.login.defaultRegionId,
        regions: auth.login.all_regions
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentView)));
