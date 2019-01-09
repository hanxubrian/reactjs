import React from 'react';
import NumberFormat from 'react-number-format';
import {withRouter} from 'react-router-dom';

//Material UI core and icons
import {
    Snackbar, SnackbarContent,
    Paper, Icon, IconButton, Select, OutlinedInput, MenuItem, FormControl, Fab
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

// third party
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";

//Store
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'store/actions';
import keycode from "keycode";

//Snackbar
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

let counter = 0;

function createFranchisee(parent_id,id, franchisee="Franchisee", name="Franchisee Name", amount=0) {
    return {
        id: parent_id,
        fid: id,
        franchisee,
        name,
        amount,
        type: 'franch'
    }
}

function createData(billing='Regular Billing', service='Adjust-Balance', description=' ', quantity=' ', amount=' ', tax=" ", markup=0, extended=0)
{
    return {
        id: counter++,
        billing,
        service,
        description,
        quantity,
        amount,
        tax,
        markup,
        extended,
        franchisees: [],
        type: 'line'
    };
}

const rows = [
    {
        id            : 'billing',
        numeric       : false,
        disablePadding: false,
        label         : 'Billing'
    },
    {
        id            : 'service',
        numeric       : false,
        disablePadding: false,
        label         : 'Service'
    },
    {
        id            : 'description',
        numeric       : false,
        disablePadding: false,
        label         : 'Description'
    },
    {
        id            : 'quantity',
        numeric       : true,
        disablePadding: false,
        label         : 'Quantity'
    },
    {
        id            : 'amount',
        numeric       : true,
        disablePadding: false,
        label         : 'Amount'
    },
    {
        id            : 'markup',
        numeric       : true,
        disablePadding: false,
        label         : 'Markup (%)'
    },
    {
        id            : 'extend_amount',
        numeric       : true,
        disablePadding: false,
        label         : 'Extended Amount'
    }
];

const styles = theme => ({
    root        : {
        width    : '100%',
        marginTop: theme.spacing.unit * 2,
        head: {
            color: 'black',
        },
        '& .ReactTable .rt-thead.-headerGroups': {
            // display: 'none'
        },
        '& .ReactTable .rt-tbody': {
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        '& .ReactTable .rt-tr-group':{
            flex: '0 0 auto'
        },
        '& .ReactTable .rt-thead .rt-th:nth-child(1)': {
            justifyContent: 'center'
        },
        '& .ReactTable .rt-thead .rt-th:last-child': {
            justifyContent: 'flex-end'
        },
        '& .franchiRow': {
            '& .f1': {
                width: '25%',
                minWidth: 100,
                padding: 10,
                border: '1px solid lightgray',
                borderRadius: 6
            },
            '& .f2': {
                width: '75%',
                padding: 10,
                border: '1px solid lightgray',
                borderRadius: 6,
                marginLeft: 10
            }
        },
        InvoiceLineHeadRoot:{
            backgroundColor: 'lightgray',
        },
        selectRoot:{
            backgroundColor: 'green'
        }
    },
    outlined: {
        padding: "12px 24px 12px 12px!important"
    },
    billing:{
        width: 200,
        fontSize: '1.3rem'
    },
    services:{
        width: 200,
        fontSize: '1.3rem'
    },
    lineButton: {
        width: 32,
        height: 32,
        minHeight: 32,
        [theme.breakpoints.down('sm')]: {
            width: 24,
            height: 24,
            minHeight: 24,
        }
    },
    lineCancelButton:{
        width: 32,
        height: 32,
        minHeight: 32,
        backgroundColor: '#ff4850',
        color: 'white',
        '&:hover':{
            backgroundColor: '#ff2a32',
        },
        [theme.breakpoints.down('sm')]: {
            width: 24,
            height: 24,
            minHeight: 24,
            padding: 0
        }
    },
    distribution: {
        '& span': {
            backgroundColor: 'lightgrey',
            padding: '8px 12px',
            borderRadius: 20
        }
    },
    tableTheadRow:{
        backgroundColor: theme.palette.primary.main
    },
});

class InvoiceLineTable extends React.Component {
    state = {
        order      : 'asc',
        // orderBy    : 'billing',
        selected   : [],
        data       : [
            createData("Regular Billing", "Adjust-Balance", " ",' '),
        ],
        page       : 0,
        rowsPerPage: 10,
        labelWidth: 0,
        openSnack: false,
        snackMessage: 'Please fill the data'
    };

    constructor(props) {
        super(props);
        this.addInvoiceLineFunction = this.addInvoiceLineFunction.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.addInvoiceLineFunction, false);
    }

    addInvoiceLineFunction(event){
        if(keycode(event)==='enter' || keycode(event)==='down'){
            this.addLineData();
        }
    }

    handleChangeBilling = (event, n) => {
        let newData = this.state.data.map(row=>{
            let temp = row;
            if(n.id===row.id){
                temp[event.target.name] = event.target.value
            }
            return temp;
        });

        this.setState({data: newData})
    };

    componentDidMount(){
        document.addEventListener("keydown", this.addInvoiceLineFunction, false);

        let id = 0;
        const data = [...this.state.data];
        let newData = data.map(record=>{
            record.id = id++;
            return record;
        });
        this.setState({data: newData})
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.data!==this.state.data){
            this.props.updateInvoiceLine(this.state.data);
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };

    addLineData=()=>{
        const lineData = [...this.state.data];
        const lastRow = lineData[lineData.length-1];

        if(lastRow.description===' ') {
            this.setState({snackMessage: 'Please enter description'})
            this.setState({openSnack: true});
            return;
        }

        if(lastRow.quantity===' ') {
            this.setState({snackMessage: 'Please enter quantity'})
            this.setState({openSnack: true});
            return;
        }

        if(lastRow.amount===' ') {
            this.setState({snackMessage: 'Please enter amount'})
            this.setState({openSnack: true});
            return;
        }

        const data = [...this.state.data, createData()];
        let id = 0;
        let newData = data.map(record=>{
            record.id = id++;
            return record;
        });
        this.setState({data: newData})
    };

    addFranchiseeLine = (n) =>{
        console.log('fired franchiseeline=', n);
        const data = [...this.state.data];
        console.log('data=', data);
        let fline = createFranchisee(n.id, n.franchisees.length);
        n.franchisees = [...n.franchisees, fline];

        let newData = data.map(record=>{
            if(record.id===n.id)
                record = n;
            return record;
        });
        this.setState({data: newData})
    };

    removeLineData=(line)=>{
        const data = [...this.state.data];
        _.remove(data, function (row) {
            return row.id === line.id;
        });
        let id = 0;
        let newData = data.map(record=>{
            record.id = id++;
            return record;
        });

        this.setState({data: newData})
    };

    removeFranch=(parent_id, child_id)=>{
        const data = [...this.state.data];

        data.forEach(d=>{
            if(d.franchisees.length>0 && d.id===parent_id){
                let franchisees = d.franchisees;
                _.remove(franchisees, function (record) {
                    return record.fid === child_id
                })
            }
        });

        data.forEach(d=>{
            if(d.franchisees.length>0 && d.id===parent_id){
                let fid=0;
                let franchisees = d.franchisees;
                let newData = franchisees.map(record=>{
                    record.fid = fid++;
                    return record;
                });
                d.franchisees = newData
            }
        });
        this.setState({data: data});
    };

    renderEditable(cellInfo, id) {
        if (cellInfo.id>this.state.data.length-1) return;
        let prefix = '';
        if (id==='amount' || id==='tax' || id==='extended') {
            if(this.state.data[cellInfo.id][id]!==' ')
                prefix = "$";
        }

        if(this.state.data[cellInfo.id][id].length===0) return;

        let value='';
        value= this.state.data[cellInfo.id][id];

        if (id==='amount' || id==='tax' || id==='extended') {
            if(this.state.data[cellInfo.id][id]!==' ')
                value = parseFloat(this.state.data[cellInfo.id][id]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        return (
            <div
                style={{ backgroundColor: "#fafafa", padding: 12, border: "1px solid lightgray", borderRadius: 6, width: '96%', marginLeft: id==='description'?'2%':'15px' }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.id][id] = (e.target.innerHTML).replace('$','').replace(',','');

                    if(id==='amount' || id==='markup') {
                        if(this.state.data[cellInfo.id][id]!==' ')
                            data[cellInfo.id][id] = parseFloat(data[cellInfo.id][id]);
                    }

                    if(id==='quantity') {
                        if(this.state.data[cellInfo.id][id]!==' ')
                            data[cellInfo.id][id] = parseInt(data[cellInfo.id][id]);
                    }
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: prefix + value
                }}
            />
        );
    }
    renderEditableMarkup(cellInfo, id) {
        if (cellInfo.id>this.state.data.length-1) return;
        return (
            <div
                style={{ backgroundColor: "#fafafa", padding: 12, border: "1px solid lightgray", width: '96%', borderRadius: 6, marginLeft:'15px' }}
                contentEditable={cellInfo.billing==="Client Supplies" ? true: false}
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.id][id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.id][id]
                }}
            />
        );
    }

    render()
    {
        const {classes} = this.props;
        const {data} = this.state;

        let all_data = [];

        data.forEach(d=>{
            if(d.franchisees.length===0) return all_data.push(d);
            let franchisees = d.franchisees;
            all_data.push(d);
            franchisees.forEach(f=>{
                all_data.push(f);
            });
        });
        console.log('row=', all_data);
        return (
            <Paper className={classNames(classes.root)}>
                <div className={classNames(classes.tableWrapper, "flex flex-col h-full")}>
                    <ReactTable
                        data={all_data}
                        minRows = {0}
                        showPagination ={false}
                        getTheadThProps={(state, rowInfo, column, instance) =>{
                            let border = '1px solid rgba(255,255,255,.6)';
                            if(column.Header==='Action') border = 'none';

                            return {
                                style:{
                                    fontSize: 13,
                                    fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
                                    fontWeight: 400,
                                    lineHeight: 1.75,
                                    color: 'white',
                                    borderRight: border
                                },
                            }
                        }}
                        getTheadProps={(state, rowInfo, column, instance) =>{
                            return {
                                style:{
                                    fontSize: 13,
                                },
                                className: classes.tableTheadRow
                            }
                        }}
                        getTdProps={(state, rowInfo, column, instance) =>{
                            if(rowInfo.original.type==='franch'){
                                if(column.Header==='Quantity' || column.Header==='Amount' || column.Header==='Tax')
                                    return {
                                        style: {display: 'none'},
                                        className: {}
                                    };
                                // else if(column.Header==='Service' || column.Header==='extended')
                                return {
                                    className: classNames(
                                        {"justify-end": column.Header==='Service'},
                                        {"justify-start": column.id==='extended'},
                                        {"franchiRow": column.id==='description'},
                                    )
                                };
                            }
                            else
                                return {
                                    className: classNames(
                                        {"justify-end": column.id==='extended'},
                                        // {"justify-center": rowInfo.original.type==='line'},
                                        {"justify-end": rowInfo.original.type!=='line'})
                                }
                        }}
                        columns={[
                            {
                                columns: [
                                    {
                                        Header: "Billing",
                                        accessor: "billing",
                                        Cell: row=>{
                                            console.log('row=', row);
                                            if(row.original.type==='line')
                                                return (
                                                    <FormControl variant="outlined" className={classNames(classes.selectRoot, classes.formControl)} style={{marginBottom: '0!important', display: row.original.type!=='line'?'none':'block'}}>
                                                        <Select
                                                            classes={{
                                                                outlined: classNames(classes.outlined, classes.billing)
                                                            }}
                                                            value={row.original.billing}
                                                            onChange={(ev)=>this.handleChangeBilling(ev, row.original)}
                                                            input={
                                                                <OutlinedInput
                                                                    labelWidth={this.state.labelWidth}
                                                                    name="billing"
                                                                    id="billing"
                                                                />
                                                            }
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select</em>
                                                            </MenuItem>
                                                            <MenuItem value="Regular Billing">Regular Billing</MenuItem>
                                                            <MenuItem value="Additional Billing Office">Additional Billing Office</MenuItem>
                                                            <MenuItem value="Extra Work">Extra Work</MenuItem>
                                                            <MenuItem value="Client Supplies">Client Supplies</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                );
                                            else
                                                return (<div/>)
                                        },
                                        width: 210,
                                        className: classNames(classes.tableTdEven, "flex items-center  justify-center"),
                                    },
                                    {
                                        Header: "Service",
                                        accessor: "service",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (
                                                    <FormControl variant="outlined" className={classes.formControl} style={{marginBottom: '0!important'}}>
                                                        <Select
                                                            classes={{
                                                                outlined: classNames(classes.outlined,classes.services)
                                                            }}
                                                            value={row.original.service}
                                                            onChange={(ev)=>this.handleChangeBilling(ev, row.original)}
                                                            input={
                                                                <OutlinedInput
                                                                    labelWidth={this.state.labelWidth}
                                                                    name="service"
                                                                    id="service"
                                                                />
                                                            }
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select</em>
                                                            </MenuItem>
                                                            <MenuItem value="Adjust-Balance">Adjust - Balance</MenuItem>
                                                            <MenuItem value="Adjust-Refund">Adjust - Refund</MenuItem>
                                                            <MenuItem value="Adjust-WriteOff">Adjust - WriteOff</MenuItem>
                                                            <MenuItem value="Buffing">Buffing</MenuItem>
                                                            <MenuItem value="Carpet Clean">Carpet Clean</MenuItem>
                                                            <MenuItem value="Customer Suppliers">Customer Suppliers</MenuItem>
                                                            <MenuItem value="Emergency Clean">Emergency Clean</MenuItem>
                                                            <MenuItem value="Event Center">Event Center</MenuItem>
                                                            <MenuItem value="Floor Services">Floor Services</MenuItem>
                                                            <MenuItem value="Furniture Cleaning Service">Furniture Cleaning Service</MenuItem>
                                                            <MenuItem value="High Dusting">High Dusting</MenuItem>
                                                            <MenuItem value="Hotel">Hotel</MenuItem>
                                                            <MenuItem value="In-House Work">In-House Work</MenuItem>
                                                            <MenuItem value="Initial and Deep Clean">Initial and Deep Clean</MenuItem>
                                                            <MenuItem value="Initial One-Time Clean">Initial One-Time Clean</MenuItem>
                                                            <MenuItem value="Make Ready">Make Ready</MenuItem>
                                                            <MenuItem value="Miscellaneous - Special">Miscellaneous - Special</MenuItem>
                                                            <MenuItem value="Other">Other</MenuItem>
                                                            <MenuItem value="Porter Services">Porter Services</MenuItem>
                                                            <MenuItem value="Power Washing">Power Washing</MenuItem>
                                                            <MenuItem value="Regular Billing">Regular Billing</MenuItem>
                                                            <MenuItem value="Regular Cleaning - Day">Regular Cleaning - Day</MenuItem>
                                                            <MenuItem value="Regular Cleaning - Night">Regular Cleaning - Night</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                );
                                            else
                                                return (<div className={classNames(classes.distribution)}><span>Distribution</span></div>)
                                        },
                                        width: 210,
                                        className: classNames(classes.tableTdEven, "flex items-center"),
                                    },
                                    {
                                        Header: "Description",
                                        accessor: "description",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (this.renderEditable(row.original, 'description'))
                                            else
                                                return (
                                                    <div className={classNames("flex flex-row w-full justify-start")}>
                                                        <div className="f1">{row.original.franchisee}</div>
                                                        <div className="f2">{row.original.name}</div>
                                                    </div>
                                                )
                                        },
                                    },
                                    {
                                        Header: "Quantity",
                                        accessor: "quantity",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (this.renderEditable(row.original, 'quantity'))
                                            else
                                                return (<div/>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  justify-center text-center"),
                                        width: 80
                                    },
                                    {
                                        Header: "Amount",
                                        accessor: "amount",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (this.renderEditable(row.original, 'amount'));
                                            else
                                                return (<div/>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  justify-center text-right"),
                                        width: 100
                                    },
                                    {
                                        Header: "Tax",
                                        accessor: "tax",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (this.renderEditable(row.original, 'tax'));
                                            else
                                                return (<div/>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  justify-center text-right"),
                                        width: 100
                                    },
                                    {
                                        Header: "Markup(%)",
                                        accessor: "markup",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (this.renderEditableMarkup(row.original, 'markup'));
                                            else
                                                return (<div className="" style={{width: '96%', marginLeft: 15, border:'1px solid lightgray', borderRadius: 6, padding:'8px 12px'}}>{row.original.amount}</div>)
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  text-right justify-end"),
                                        width: 100
                                    },
                                    {
                                        Header: "Extended Amount",
                                        accessor: "extended",
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return ("$"+parseFloat((row.original.amount*row.original.quantity)*(1+parseFloat(row.original.markup)/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            else
                                                return (
                                                    <Fab aria-label="remove"
                                                         onClick={()=>this.removeFranch(row.original.id, row.original.fid)}
                                                         className={classNames(classes.lineCancelButton, "mr-12")} style={{width: 24, height: 24, minHeight: 24}}>
                                                        <Icon>close</Icon>
                                                    </Fab>
                                                )
                                        },
                                        className: classNames(classes.tableTdEven, "flex items-center  w-full text-center pr-12"),
                                        width: 140
                                    },
                                    {
                                        Header: "Action",
                                        width: 200,
                                        Cell: row=>{
                                            if(row.original.type==='line')
                                                return (
                                                    <div className="flex flex-row items-center w-full justify-center">
                                                        <Fab color="secondary" aria-label="add"
                                                             className={classNames(classes.lineButton, "mr-12")}
                                                             onClick={()=>this.addFranchiseeLine(row.original)}
                                                        >
                                                            <Icon>call_merge</Icon>
                                                        </Fab>
                                                        <Fab color="secondary" aria-label="add"
                                                             className={classNames(classes.lineButton, "mr-12")}
                                                             onClick={()=>this.addLineData()}
                                                        >
                                                            <Icon>add</Icon>
                                                        </Fab>
                                                        {this.state.data.length>1 && (
                                                            <Fab aria-label="remove"
                                                                 onClick={()=>this.removeLineData(row.original)}
                                                                 className={classNames(classes.lineCancelButton, "mr-12")}>
                                                                <Icon>close</Icon>
                                                            </Fab>
                                                        )}
                                                    </div>
                                                );
                                            else
                                                return (<div/>)
                                        }
                                    },
                                ]
                            }
                        ]}
                        className={classNames( "-striped -highlight")}
                        defaultPageSize={200}
                        style={{
                            height: '100%',
                        }}
                    />
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnack}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="error"
                        message={this.state.snackMessage}
                    />
                </Snackbar>
            </Paper>
        );
    }
}

InvoiceLineTable.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateInvoiceLine: Actions.updateInvoiceLine
    }, dispatch);
}

function mapStateToProps({invoices })
{
    return {
        invoiceForm: invoices.invoiceForm
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceLineTable)));
