// import mock from "./mock";
// import _ from "lodash";

// let customersDb = {
//     "IsSuccess": true,
//     "MessageCode": 200,
//     "Message": "Here is the data you requested",
//     "Data": {
//         "Regions": [
//           ]
//     }
// }

// /**
//  * Read Openinghours DB
//  */
// mock.onGet("/api/customers/gets").reply(() => {
//     return [200, customersDb];
// });

// /**
//  * Add new Openinghour
//  */
// mock.onPost("/api/customers/save").reply(request => {
//     const data = JSON.parse(request.data);
//     let customer = null;

//     customersDb = customersDb.map(_customer => {
//         if (_customer.id === data.id) {
//             customer = data;
//             return customer;
//         }
//         return _customer;
//     });

//     if (!customer) {
//         customer = data;
//         customersDb = [...customersDb, customer];
//     }

//     return [200, customer];
// });

// /**
//  *  Update a Openinghours
//  */
// mock.onPost("/api/customers/update").reply(request => {
//     const data = JSON.parse(request.data);
//     let customers = data.customers;
//     let update = data.data;
//     customers = customers.map(_customer => {
//         if (_customer.id === data.id) {
//             return _.merge(_customer, update);
//         }
//         return _customer;
//     });

//     return [200, customers];
// });

// /**
//  *  Delete a customer
//  */
// mock.onPost("/api/customers/delete").reply(req => {
//     let data = JSON.parse(req.data);
//     let customers = data.customers;
//     _.forEach(data.ids, function(id){
//         // let deleted = _.remove(customers.Data, function(_customer) {
//         //     // console.log('customer', _customer);
//         //     return _customer.CustomerId===id
//         // });
//     });

//     return [200, customers];
// });


// mock.onPost('/api/customers/remove').reply((req) => {
//     let data = JSON.parse(req.data);
//     console.log('id=', data.customers);
//     let customers = data.customers;
//     // let deleted = _.remove(customers.Data, function(_customer) {
//     //     return _customer.CustomerId === data.id;
//     // });

//     return [200, customers];
// });

// mock.onGet("/api/customers/get").reply(request => {
//     const { editId } = request.params;
//     const response = _.find(customersDb, { id: editId });
//     return [200, response];
// });
