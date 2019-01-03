import mock from "./mock";
import _ from "lodash";

let transactionDB = [

];

/**
 * Read Billrun DB
 */
mock.onGet("/api/transactions/gets").reply(() => {
    return [200, transactionDB];
});

/**
 * Add new Bill-run
 */
mock.onPost("/api/transactions/save").reply(request => {
    const data = JSON.parse(request.data);
    let billrun = null;

    transactionDB = transactionDB.map(_transaction => {
        if (_transaction.Id === data.id) {
            billrun = data;
            return billrun;
        }
        return _transaction;
    });

    if (!billrun) {
        billrun = data;
        transactionDB = [...transactionDB, billrun];
    }

    return [200, billrun];
});

/**
 *  Update a Bill-run
 */
mock.onPost("/api/transactions/update").reply(request => {
    const data = JSON.parse(request.data);
    let transactions = data.transactions;
    let update = data.data;
    transactions = transactions.map(_transaction => {
        if (_transaction.Id === data.id) {
            return _.merge(_transaction, update);
        }
        return _transaction;
    });

    return [200, transactions];
});

/**
 *  Delete a invoice
 */
mock.onPost('/api/transactions/remove').reply((req) => {
    let data = JSON.parse(req.data);
    let transactions = data.transactions;
    _.remove(transactions.Data, function(_transaction) {
        return _transaction.Id === data.id;
    });

    return [200, transactions];
});

mock.onGet("/api/transactions/get").reply(request => {
    const { editId } = request.params;
    const response = _.find(transactionDB, { id: editId });
    return [200, response];
});
