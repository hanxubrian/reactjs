import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';
import moment from 'moment';

// core components
import {Card, CardContent, Typography} from '@material-ui/core';
import Grid1 from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles/index';

//Theme component
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//Store
import {bindActionCreators} from "redux";
import * as Actions from 'store/actions';

import {
    PagingState,
    IntegratedPaging,
    DataTypeProvider,
    GroupingState, SelectionState,
    IntegratedGrouping, TableColumnVisibility,
    SortingState,
    IntegratedSorting, SummaryState, IntegratedSummary, IntegratedSelection,
} from '@devexpress/dx-react-grid';

import {
    Grid,
    Table,
    VirtualTable,
    TableHeaderRow,
    TableGroupRow,
    PagingPanel, TableSummaryRow, TableSelection
} from '@devexpress/dx-react-grid-material-ui';
import NumberFormat from "react-number-format";


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

const CurrencyFormatter = ({value}) => (
    <NumberFormat value={value}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator
                  decimalScale={2}
                  prefix="$" renderText={value => <div>{value}</div>}/>
);

const CurrencyTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
);

const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
    />
);

const TableHeadComponentBase = ({ classes, ...restProps }) => (
    <Table.TableHead
        {...restProps}
        className={classes.tableTheadRow}
    />
);
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
export const TableHeadComponent = withStyles(styles, { name: 'TableHeadComponent' })(TableHeadComponentBase);

class PrintChecksLists extends Component {
    state={
        data: [],
        selection: [],
    };

    changeSelection = selection => this.setState({ selection });
    componentDidMount()
    {
        this.props.onRef(this);
        if (this.props.printChecksDB!==null) {
            this.setState({data: this.props.printChecksDB})
        }
    }
    componentWillUnmount() {

        this.props.onRef(undefined);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.printChecksDB!==null && this.props.printChecksDB !== prevProps.printChecksDB) {
            console.log('fired');
             this.setState({data: this.props.printChecksDB})
        }
    }


    TableRow = ({ tableRow, selected, onToggle, ...restProps }) => {
        return (
            <Table.Row
                {...restProps}
            />
        );
    };

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

    render()
    {
        const { classes} = this.props;
        const columns = [
            {name: "PayeeName", title: "Payee Name",},
            {name: "PayeeNumber", title: "Payee #"},
            {name: "PayeeAddress1", title: "Address"},
            {name: "checkAmounttext", title: "Amount Text"},
            {name: "checkamountnumber", title: "Amount"},
            {name: "bankname", title: "Bank Name"},
            {name: "bankaddress1", title: "Bank Address"},
            {name: "checkdate", title: "checkdate"},
        ];
        let  tableColumnExtensions = [
            { columnName: 'Customer', width: -1, },
            { columnName: 'CustomerNo', width: 100},
            { columnName: 'ReferenceNo', width: 150,},
            { columnName: 'Description', width: 120,},
            { columnName: 'FranchiseeNo', width: 120},
            { columnName: 'Amount', width: 120,  align: 'right'},
        ];
        console.log('data=', this.state.data, this.props.printChecksDB);
        // if(!this.state.data.length)
        //     return (<div/>);

        let totalSummaryItems = [
            { columnName: 'Amount', type: 'sum'},
        ];

        return (
            <div className={classNames(classes.root, "flex flex-col h-full whole print:p-0")} id ="wholediv">
                    <div className={classNames("flex flex-col")}>
                        <Grid
                            rows={this.state.data}
                            columns={columns}
                        >
                            {this.state.data.length>0 && (
                            <CurrencyTypeProvider
                                for={['checkamountnumber']}
                            />
                            )}
                            <PagingState
                                defaultCurrentPage={0}
                                defaultPageSize={50}
                            />

                            <PagingPanel pageSizes={[10, 20, 25, 50, 100]} />
                            <SelectionState
                                selection={this.state.selection}
                                onSelectionChange={this.changeSelection}
                            />
                            {/* The Select All checkbox selects/deselects all rows on a page or all pages depending on the IntegratedSelection and IntegratedPaging plugin’s order. */}
                            <IntegratedSelection />

                            <IntegratedPaging />
                            <VirtualTable height="auto"
                                          tableComponent={TableComponent}
                                          headComponent = {TableHeadComponent}
                                          columnExtensions={tableColumnExtensions}
                            />
                            <TableSelection showSelectAll highlightRow rowComponent={this.TableRow} />
                            <TableHeaderRow/>
                        </Grid>
                    </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
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

export default  withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PrintChecksLists)));
