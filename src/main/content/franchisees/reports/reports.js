import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';

// core components
import {Card, CardContent, Typography, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';

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

class Reports extends Component {

    render()
    {
        const { classes } = this.props;
        return (
            <div className={classNames(classes.root, "p-0 sm:p-64  print:p-0")}>
                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>

                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>FRANCHISEE REPORT</tr>
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pb-4">
                                            <Typography color="inherit">
                                                <tr>Franchisee</tr>
                                                <tr>Code</tr>
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography color="inherit">
                                                <tr><br></br></tr>
                                                <tr>Name</tr>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="inherit">
                                                <tr>701011</tr>
                                                <tr><br></br></tr>
                                                <tr><br></br></tr>
                                            </Typography>
                                        </td>
                                        <td className="text-left">
                                            <Typography color="inherit">
                                                <tr>KMBURNS, LLC</tr>
                                                <tr>58 SUMMERDALE ROAD</tr>
                                                <tr>ANGOLA, NY  14006</tr>
                                            </Typography>
                                        </td>
                                        <td className="text-left" width='310'>
                                            <Typography color="inherit">
                                                <tr><br></br></tr>
                                                <tr><br></br></tr>
                                                <tr><br></br></tr>
                                            </Typography>
                                        </td>
                                        <td className="text-left">
                                            <Typography color="inherit">
                                                <tr>Plan Type: A</tr>
                                                <tr>Sign Date: 07/15/1997</tr>
                                                <tr>Contact: KEVIN BURNS</tr>
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>TOTAL CONTRACT BILLING:</h2>
                                        </th>
                                        <th className="text-right">
                                            109,128.44
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Actual Billing</Typography>
                                        </td>
                                        <td className="text-right">
                                            142,146.56
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Additional Billing By Franchisee</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Client Supplies </Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Additional Billing By Office</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">SUBTOTAL</Typography>
                                        </td>
                                        <td>
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            142,146.56
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Client Sales Tax</Typography>
                                        </td>
                                        <td>
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            12,437.84
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Total Monthly Revenue</Typography>
                                        </td>
                                        <td>
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            154,584.40
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>FRANCHISEE DEDUCTIONS:</h2>
                                        </th>
                                        <th className="text-right">
                                            {/* UNIT */}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Royalty</Typography>
                                        </td>
                                        <td className="text-right">
                                            14,214.66
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Accounting Fee</Typography>
                                        </td>
                                        <td className="text-right">
                                            4,264.40
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Techonology Fee </Typography>
                                        </td>
                                        <td className="text-right">
                                            3,553.66
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Additional Billing By Office Comm</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Franchise Note Payment</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Franchise Note Payment #2</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Finders Fees (See Customer Account)</Typography>
                                        </td>
                                        <td className="text-right">
                                            2,310.97
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Franchisee Supplies</Typography>
                                        </td>
                                        <td className="text-right">
                                            4,015.05
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Regular Miscellaneous</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">SUBTOTAL - Regular Deductions</Typography>
                                        </td>
                                        <td>
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            28,353.74
                                        </td>
                                        <td className="text-right">
                                            <br></br>
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Advertising Fee</Typography>
                                        </td>
                                        <td className="text-right">
                                            2,132.20
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Total Leases (see Leases)</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Business Protection Plan </Typography>
                                        </td>
                                        <td className="text-right">
                                            9,594.89
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">BPP Admin Fee </Typography>
                                        </td>
                                        <td className="text-right">
                                            14.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Client Sales Tax </Typography>
                                        </td>
                                        <td className="text-right">
                                            12,437.84
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Charge Backs </Typography>
                                        </td>
                                        <td className="text-right">
                                            4,256.83
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Pagers:</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Pagers2:</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1"> Special Miscellaneous </Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">SUBTOTAL - Special Deductions </Typography>
                                        </td>
                                        <td>
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            28,435.76
                                        </td>
                                        <td className="text-right">
                                            <br></br>
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography variant="subtitle1">Total Deductions </Typography>
                                        </td>
                                        <td>
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            <br></br>
                                        </td>
                                        <td className="text-right">
                                            56,789.50
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>DUE TO FRANCHISEE:</h2>
                                        </th>
                                        <th>
                                            {/* UNIT */}
                                        </th>
                                        <th className="text-right">
                                            {/* UNIT PRICE */}
                                        </th>
                                        <th className="text-right">
                                            {/* QUANTITY */}
                                        </th>
                                        <th className="text-right">
                                            97,794.90
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField className={classes.textField}
                                               label="Date Paid">
                                    </TextField>
                                    <TextField className={classes.textField}
                                               label="Check #">
                                    </TextField>
                                    <TextField className={classes.textField}
                                               label="Date Paid">
                                    </TextField>
                                    <TextField className={classes.textField}
                                               label="Check #">
                                    </TextField>
                                    <TextField className={classes.longerTextField}
                                               label="Notes"
                                               multiline>
                                    </TextField>
                                </form>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                            <tr>Customer Transactions</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                701011
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                KMBURNS, LLC
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Customer Transactions</h2>
                                        </th>
                                        <th>
                                            Invoice
                                        </th>
                                        <th className="text-left">
                                            Description
                                        </th>
                                        <th className="text-right">
                                            {/* QUANTITY */}
                                        </th>
                                        <th className="text-right">
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Customer</Typography>
                                        </td>
                                        <td>
                                            I/C
                                        </td>
                                        <td className="text-right">
                                        </td>
                                        <td className="text-right">
                                            Inv Amt
                                        </td>
                                        <td className="text-right">
                                            Inv Tax
                                        </td>
                                        <td className="text-right">
                                            Total
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td>
                                            11180000
                                        </td>
                                        <td className="text-left">
                                            Monthly Contract Billing Amount For November
                                        </td>
                                        <td className="text-right">
                                            28,671.77
                                        </td>
                                        <td className="text-right">
                                            2,508.78
                                        </td>
                                        <td className="text-right">
                                            31,180.55
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Totals for this Franchise</Typography>
                                        </td>
                                        <td>
                                        </td>
                                        <td className="text-left">
                                        </td>
                                        <td className="text-right">
                                            142,146.56
                                        </td>
                                        <td className="text-right">
                                            12,437.84
                                        </td>
                                        <td className="text-right">
                                            154,584.40
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>
                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                            <tr>Customer Account Totals</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                701011
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                KMBURNS, LLC
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Customer Account Totals</h2>
                                        </th>
                                        <th>
                                        </th>
                                        <th className="text-center">
                                        </th>
                                        <th className="text-right">
                                            {/* QUANTITY */}
                                        </th>
                                        <th className="text-right">
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Customer</Typography>
                                        </td>
                                        <td className="text-center">
                                            Contract Billing
                                        </td>
                                        <td className="text-center">
                                            Current Month
                                        </td>
                                        <td className="text-center">
                                            Addtl Bill Franchisee
                                        </td>
                                        <td className="text-center">
                                            Client Supplies
                                        </td>
                                        <td className="text-center">
                                            Additional Bill Office
                                        </td>
                                        <td className="text-center">
                                            Total
                                        </td>
                                        <td className="text-center">
                                            Finders Fee Nbr
                                        </td>
                                        <td className="text-center">
                                            Finders Fee
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >011050  Buffalo Bills Training And</Typography>
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            14 of 65
                                        </td>
                                        <td className="text-right">
                                            431.07
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Franchisee Actual Amount</Typography>
                                        </td>
                                        <td className="text-right">
                                            109,128.44
                                        </td>
                                        <td className="text-right">
                                            142,146.56
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            42,146.56
                                        </td>
                                        <td className="text-right">
                                        </td>
                                        <td className="text-right">
                                            2,310.97
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>


                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                            <tr>Supply Transactions</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                701011
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                KMBURNS, LLC
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Supply Transactions</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Description</Typography>
                                        </td>
                                        <td className="text-right">
                                            Quantity
                                        </td>
                                        <td className="text-right">
                                            Unit Cost
                                        </td>
                                        <td className="text-right">
                                            Extended
                                        </td>
                                        <td className="text-right">
                                            Tax
                                        </td>
                                        <td className="text-right">
                                            Total Amt
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >UNITED RENTALS (NORTH AMERICA) - 155091239-009</Typography>
                                        </td>
                                        <td className="text-right">
                                            1
                                        </td>
                                        <td className="text-right">
                                            1,053.89
                                        </td>
                                        <td className="text-right">
                                            1,053.89
                                        </td>
                                        <td className="text-right">
                                            92.22
                                        </td>
                                        <td className="text-right">
                                            1,146.11
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Total Supplies</Typography>
                                        </td>
                                        <td className="text-right">

                                        </td>
                                        <td className="text-right">

                                        </td>
                                        <td className="text-right">
                                            3,687.39
                                        </td>
                                        <td className="text-right">
                                            322.66
                                        </td>
                                        <td className="text-right">
                                            4,010.05
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>


                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>Charge Backs</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                701011
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                KMBURNS, LLC
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Charge Backs</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Description</Typography>
                                        </td>
                                        <td className="text-center">
                                            Tax Amt
                                        </td>
                                        <td className="text-center">
                                            Tax
                                        </td>
                                        <td className="text-center">
                                            Total Amt
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Chargeback from cust. 011056 (Buffalo Bills Llc. - Non Game)  for invoice #10180166</Typography>
                                        </td>
                                        <td className="text-right">
                                            594.75
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            594.75
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Total Charge Backs</Typography>
                                        </td>
                                        <td className="text-right">
                                            4,256.83
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            4,256.83
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>


                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>Leases</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                701011
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                KMBURNS, LLC
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Leases</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Lease Date</Typography>
                                        </td>
                                        <td className="text-center">
                                            Lease No
                                        </td>
                                        <td className="text-center">
                                            Description & Serial Number
                                        </td>
                                        <td className="text-center">
                                            Payment #
                                        </td>
                                        <td className="text-center">
                                            Amount
                                        </td>
                                        <td className="text-center">
                                            Tax
                                        </td>
                                        <td className="text-center">
                                            Total
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >04/18/2018</Typography>
                                        </td>
                                        <td className="text-left">
                                            07-2147
                                        </td>
                                        <td className="text-left">
                                            17" FLOOR MACHINE  S/N 4000159976
                                        </td>
                                        <td className="text-right">
                                            9 of 16
                                        </td>
                                        <td className="text-right">
                                            56.65
                                        </td>
                                        <td className="text-right">
                                            4.96
                                        </td>
                                        <td className="text-right">
                                            61.61
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Lease Totals</Typography>
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-right">
                                            121.72
                                        </td>
                                        <td className="text-right">
                                            10.66
                                        </td>
                                        <td className="text-right">
                                            132.38
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>

                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                            <tr>Special Misc</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                701011
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                KMBURNS, LLC
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Special Misc</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Type</Typography>
                                        </td>
                                        <td className="text-center">
                                            Description
                                        </td>
                                        <td className="text-center">
                                            Tax Amt
                                        </td>
                                        <td className="text-center">
                                            Tax
                                        </td>
                                        <td className="text-center">
                                            Total Amt
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Misc</Typography>
                                        </td>
                                        <td className="text-left">
                                            CHILD SUPPORT
                                        </td>
                                        <td className="text-right">
                                            357.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            357.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Total Special</Typography>
                                        </td>
                                        <td className="text-center">

                                        </td>
                                        <td className="text-right">
                                            357.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            357.00
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={classNames(classes.card, "mx-auto")}>
                    <CardContent className={classNames(classes.cardContent, "p-32 print:p-0")}>


                        <div>
                            <table align="center">
                                <tbody>
                                <tr>
                                    <td className="text-center" width='200'>
                                        <Typography color="inherit">
                                            <tr></tr>
                                            <tr></tr>
                                            <tr></tr>
                                        </Typography>
                                    </td>
                                    <td className="text-center" width='500'>
                                        <Typography color="inherit">
                                            <tr>JANI-KING OF BUFFALO, INC</tr>
                                            <tr>BUSINESS FOR THE MONTH OF NOVEMBER 2018</tr>
                                            <tr>Regular Misc</tr>
                                        </Typography>
                                    </td>
                                    <td align="left">
                                        <Typography color="inherit">
                                            <tr> Date: 11/30/2018 </tr>
                                            <tr> Time: 11:58:57 </tr>
                                            <tr><br></br></tr>
                                        </Typography>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="">
                            <div>
                                <table className="mb-16">
                                    <tbody>
                                    <tr>
                                        <td className="pr-16 pb-4">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                Franchisee Code
                                            </Typography>
                                        </td>
                                        <td className="pb-4">
                                            <Typography className="font-light" variant="h6" color="inherit">
                                                Name
                                            </Typography>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="pr-16">
                                            <Typography color="textSecondary">
                                                701011
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography color="inherit">
                                                KMBURNS, LLC
                                            </Typography>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-64">
                                <table className="simple invoice-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <h2>Regular Misc</h2>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr >
                                        <td>
                                            <Typography >Type</Typography>
                                        </td>
                                        <td className="text-center">
                                            Description
                                        </td>
                                        <td className="text-center">
                                            Tax Amt
                                        </td>
                                        <td className="text-center">
                                            Tax
                                        </td>
                                        <td className="text-center">
                                            Total Amt
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Misc</Typography>
                                        </td>
                                        <td className="text-left">
                                            ACCOUNT CANCELLATION FEE FOR 084069
                                        </td>
                                        <td className="text-right">
                                            50.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            50.00
                                        </td>
                                    </tr>

                                    <tr >
                                        <td>
                                            <Typography >Total Regular</Typography>
                                        </td>
                                        <td className="text-center">
                                        </td>
                                        <td className="text-right">
                                            50.00
                                        </td>
                                        <td className="text-right">
                                            0.00
                                        </td>
                                        <td className="text-right">
                                            50.00
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        )
    }
}


function mapStateToProps({auth, fuse})
{
    return {
        iframeURL: fuse.navbar.iframeURL
    }
}


export default  withStyles(styles)(withRouter(connect(mapStateToProps, null)(Reports)));
