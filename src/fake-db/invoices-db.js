import mock from "./mock";
import _ from "lodash";

let invoicesDb = {
    "IsSuccess": true,
    "MessageCode": 0,
    "Message": null,
    "Data": [
        {
            "MasterTrxTypeListId": 1,
            "RegionId": 24,
            "RegionName": "PHI",
            "InvoiceId": 232601,
            "InvoiceNo": "01180657                 ",
            "InvoiceDate": "2018-01-29T00:00:00",
            "DueDate": "2018-01-31T00:00:00",
            "CustomerId": 109859,
            "CustomerNo": "490058",
            "CustomerName": "KLONDIKE KATES",
            "EBill": false,
            "PrintInvoice": true,
            "InvoiceDescription": "UNDERPAID DECEMBER REVENUE  TRANS FROM 570",
            "InvoiceAmount": 752.88,
            "InvoiceTax": 0,
            "InvoiceTotal": 752.88,
            "CPI": 0,
            "TransactionStatusListId": 6,
            "TransactionStatus": "Paid",
            "InvoiceBalanceAmount": 0,
            "InvoiceBalanceTax": 0,
            "InvoiceBalanceTotal": 0,
            "EBillText": "",
            "PrintInvoiceText": "P",
            "IsOpen": "N",
            "ConsolidatedInvoice": null,
            "ConsolidatedInvoiceId": null,
            "ConsolidatedInvoiceNo": "",
            "CreditId": 0
        },
    ],
    "headerData": {
        "Total": 665,
        "open": 39,
        "closed": 626,
        "overPaid": 7,
        "overDue": 11370.27,
        "totalOpen": 29118.33,
        "totalClosed": 947251.98,
        "totalOverPaid": 7,
        "totalOverDue": 11370.27,
        "totalInvoice": 976370.31,
        "ftInvoiceAmount": 903833.72,
        "ftInvoiceTax": 37040.4601,
        "ftInvoiceTotal": 940874.19
    }
}

/**
 * Read Openinghours DB
 */
mock.onGet("/api/invoices/gets").reply(() => {
    return [200, invoicesDb];
});

/**
 * Add new Openinghour
 */
mock.onPost("/api/invoices/save").reply(request => {
    const data = JSON.parse(request.data);
    let invoice = null;

    invoicesDb = invoicesDb.map(_invoice => {
        if (_invoice.id === data.id) {
            invoice = data;
            return invoice;
        }
        return _invoice;
    });

    if (!invoice) {
        invoice = data;
        invoicesDb = [...invoicesDb, invoice];
    }

    return [200, invoice];
});

/**
 *  Update a Openinghours
 */
mock.onPost("/api/invoices/update").reply(request => {
    const data = JSON.parse(request.data);
    let invoices = data.invoices;
    let update = data.data;
    invoices = invoices.map(_invoice => {
        if (_invoice.id === data.id) {
            return _.merge(_invoice, update);
        }
        return _invoice;
    });

    return [200, invoices];
});

/**
 *  Delete a invoice
 */
mock.onPost("/api/invoices/delete").reply(req => {
    let data = JSON.parse(req.data);
    let invoices = data.invoices;
    _.forEach(data.ids, function(id){
        _.remove(invoices.Data, function(_invoice) {
            return _invoice.InvoiceId===id
        });
    });

    return [200, invoices];
});


mock.onPost('/api/invoices/remove').reply((req) => {
    let data = JSON.parse(req.data);
    console.log('id=', data.invoices);
    let invoices = data.invoices;
    _.remove(invoices.Data, function(_invoice) {
        return _invoice.InvoiceId === data.id;
    });

    return [200, invoices];
});

mock.onGet("/api/invoices/get").reply(request => {
    const { editId } = request.params;
    const response = _.find(invoicesDb, { id: editId });
    return [200, response];
});
