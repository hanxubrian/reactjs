import mock from "./mock";
import _ from "lodash";

let billrunDB = [
    {
        "Id": 3434,
        "RegionId": 2,
        "Month": 8,
        "Year": 2018,
        "Message": "This is a bill run test",
        "InvoiceDate": "08/03/2018",
        "CreateBy": "German Sosa"
    },
    {
        "Id": 3435,
        "RegionId": 32,
        "Month": 9,
        "Year": 2018,
        "Message": "This is a bill run test",
        "InvoiceDate": "09/03/2018",
        "CreateBy": "German Sosa"
    },
    {
        "Id": 3436,
        "RegionId": 2,
        "Month": 10,
        "Year": 2018,
        "Message": "This is a bill run test",
        "InvoiceDate": "10/03/2018",
        "CreateBy": "German Sosa"
    }
];

/**
 * Read Billrun DB
 */
mock.onGet("/api/billrunDB/gets").reply(() => {
    return [200, billrunDB];
});

/**
 * Add new Bill-run
 */
mock.onPost("/api/invoices/save").reply(request => {
    const data = JSON.parse(request.data);
    let billrun = null;

    billrunDB = billrunDB.map(_billrun => {
        if (_billrun.Id === data.id) {
            billrun = data;
            return billrun;
        }
        return _billrun;
    });

    if (!billrun) {
        billrun = data;
        billrunDB = [...billrunDB, billrun];
    }

    return [200, billrun];
});

/**
 *  Update a Bill-run
 */
mock.onPost("/api/billruns/update").reply(request => {
    const data = JSON.parse(request.data);
    let billruns = data.billruns;
    let update = data.data;
    billruns = billruns.map(_billrun => {
        if (_billrun.Id === data.id) {
            return _.merge(_billrun, update);
        }
        return _billrun;
    });

    return [200, billruns];
});

/**
 *  Delete a invoice
 */
mock.onPost('/api/billruns/remove').reply((req) => {
    let data = JSON.parse(req.data);
    let billruns = data.billruns;
    let deleted = _.remove(billruns.Data, function(_billrun) {
        return _billrun.Id === data.id;
    });

    return [200, billruns];
});

mock.onGet("/api/billruns/get").reply(request => {
    const { editId } = request.params;
    const response = _.find(billrunDB, { id: editId });
    return [200, response];
});
