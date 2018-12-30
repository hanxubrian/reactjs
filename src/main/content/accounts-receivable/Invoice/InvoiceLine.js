import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

//Material UI core and icons
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,TableFooter,
    Toolbar, Typography, Paper, Checkbox, Icon, IconButton, Tooltip, Select, OutlinedInput, MenuItem, FormControl, Fab
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';

// third party
import _ from 'lodash';

let counter = 0;

function createData(billing='Regular Billing', service='Adjust-Balance', description='description', quantity=1, amount=0, markup=0, extended=0)
{
    return {
        id: counter++,
        billing,
        service,
        description,
        quantity,
        amount,
        markup,
        extended
    };
}

function desc(a, b, orderBy)
{
    if ( b[orderBy] < a[orderBy] )
    {
        return -1;
    }
    if ( b[orderBy] > a[orderBy] )
    {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp)
{
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if ( order !== 0 ) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy)
{
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
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

class InvoiceLineTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render()
    {
        const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

        return (
            <TableHead style={{backgroundColor: "lightgray"}}>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell padding="checkbox" style={{width: 100}}>
                        Action
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }
}


InvoiceLineTableHead.propTypes = {
    numSelected     : PropTypes.number.isRequired,
    onRequestSort   : PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order           : PropTypes.string.isRequired,
    rowCount        : PropTypes.number.isRequired
};

class InvoiceLineTableFooter extends React.Component {
    render()
    {
        return (
            <TableFooter className={classNames("p-24")}>

            </TableFooter>
        )
    }
}
const toolbarStyles = theme => ({
    root     : {
        paddingRight: theme.spacing.unit
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color          : theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85)
            }
            : {
                color          : theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer   : {
        flex: '1 1 100%'
    },
    actions  : {
        color: theme.palette.text.secondary
    },
    title    : {
        flex: '0 0 auto'
    },
});

let InvoiceLineTableToolbar = props => {
    const {numSelected, classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Invoice Lines
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

InvoiceLineTableToolbar.propTypes = {
    classes    : PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

InvoiceLineTableToolbar = withStyles(toolbarStyles)(InvoiceLineTableToolbar);

const styles = theme => ({
    root        : {
        width    : '100%',
        marginTop: theme.spacing.unit * 3,
        head: {
            color: 'black',
        },
        '& thead tr th':{
            color: 'black!important',
            fontWeight: 700,
            fontSize: 14,
            padding: "4px 24px",
            width: 180
        },
        '& tbody tr td':{
            padding: "4px 24px",
            width: 180
        },
        InvoiceLineHeadRoot:{
            backgroundColor: 'lightgray',
        },
    },
    outlined: {
        padding: "12px 24px 12px 12px!important"
    },
    table       : {
        minWidth: 1020,
        '& .summary':{
            fontSize: 16,
            fontWeight: 700
        }
    },
    tableWrapper: {
        overflowX: 'auto'
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
    tableCellAction: {
        [theme.breakpoints.down('sm')]: {
            padding: '0!important'
        }
    }
});

class InvoiceLineTable extends React.Component {
    state = {
        order      : 'asc',
        // orderBy    : 'billing',
        selected   : [],
        data       : [
            createData("Regular Billing", "Adjust-Balance", "Invoice",1),
        ],
        page       : 0,
        rowsPerPage: 10,
        labelWidth: 0
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

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
        let id = 0;
        const data = [...this.state.data];
        let newData = data.map(record=>{
            record.id = id++;
            return record;
        });
        this.setState({data: newData})
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    AddLineData=()=>{
        const data = [...this.state.data, createData()];
        let id = 0;
        let newData = data.map(record=>{
            record.id = id++;
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

    renderEditable(cellInfo, id) {
        if (cellInfo.id>this.state.data.length-1) return;
        let prefix = '';
        if (id==='amount' || id==='extended') prefix = "$";
        let value='';
        if(this.state.data[cellInfo.id][id].length===0) return
        value= this.state.data[cellInfo.id][id];
        if (id==='amount' || id==='extended')
            value = parseFloat(this.state.data[cellInfo.id][id]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return (
            <div
                style={{ backgroundColor: "#fafafa", padding: 12 }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.id][id] = (e.target.innerHTML).replace('$','').replace(',','');
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
                style={{ backgroundColor: "#fafafa", padding: 12 }}
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
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <InvoiceLineTableHead
                            className={classNames(classes.InvoiceLineHeadRoot)}
                            numSelected={selected.length}
                            order={order}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow hover key={n.id}>
                                            <TableCell component="td" scope="row" >
                                                <FormControl variant="outlined" className={classNames(classes.selectRoot, classes.formControl)} style={{marginBottom: '0!important'}}>
                                                    <Select
                                                        classes={{
                                                            outlined: classes.outlined
                                                        }}
                                                        value={n.billing}
                                                        onChange={(ev)=>this.handleChangeBilling(ev, n)}
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
                                            </TableCell>
                                            <TableCell>
                                                <FormControl variant="outlined" className={classes.formControl} style={{marginBottom: '0!important'}}>
                                                    <Select
                                                        classes={{
                                                            outlined: classes.outlined
                                                        }}
                                                        value={n.service}
                                                        onChange={(ev)=>this.handleChangeBilling(ev, n)}
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
                                            </TableCell>
                                            <TableCell>{this.renderEditable(n, 'description')}</TableCell>
                                            <TableCell numeric>{this.renderEditable(n, 'quantity')}</TableCell>
                                            <TableCell numeric>{this.renderEditable(n, 'amount')}</TableCell>
                                            <TableCell numeric>{this.renderEditableMarkup(n, 'markup')}</TableCell>
                                            <TableCell numeric>${parseFloat((n.amount*n.quantity)*(1+parseFloat(n.markup)/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                            <TableCell padding="checkbox" className={classNames(classes.tableCellAction)}>
                                                <Fab color="secondary" aria-label="add"
                                                     className={classNames(classes.lineButton, "mr-12")}
                                                     onClick={()=>this.AddLineData()}
                                                >
                                                    <Icon>call_merge</Icon>
                                                </Fab>
                                                {this.state.data.length>1 && (
                                                    <Fab aria-label="add"
                                                         onClick={()=>this.removeLineData(n)}
                                                         className={classNames(classes.lineCancelButton, "mr-12")}>
                                                        <Icon>close</Icon>
                                                    </Fab>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}} style={{display: 'none'}}>
                                    <TableCell colSpan={8}/>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell className="border-0" colSpan={4}></TableCell>
                                <TableCell className="summary" numeric>Subtotal</TableCell>
                                <TableCell className="summary" align="right" numeric>$610.88</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border-0" colSpan={4}></TableCell>
                                <TableCell className="summary" numeric>Tax</TableCell>
                                <TableCell className="summary" align="right" numeric>$100</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border-0" colSpan={4}></TableCell>
                                <TableCell className="summary" numeric>Grand Total</TableCell>
                                <TableCell className="summary" align="right" numeric>$200</TableCell>
                            </TableRow>
                        </TableBody>
                        <InvoiceLineTableFooter/>
                    </Table>
                </div>
            </Paper>
        );
    }
}

InvoiceLineTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvoiceLineTable);
