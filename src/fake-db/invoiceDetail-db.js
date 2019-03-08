// import mock from "./mock";
// import _ from "lodash";

// let invoiceDetailDb = {
//     "Id": "5c2e1b6a298d57137ce97999",
//     "SysCust": "1542",
//     "CustomerNo": "011050",
//     "CustomerSoldTo":[{
//         "Name":"Customer Name",
//         "AddressLine1":"123 Address",
//         "AddressLine2":"",
//         "City":"Dallas",
//         "State":"TX",
//         "ZipCode":"75001"
//     }],
//     "CustomerFor":[{
//         "Name":"Customer Name",
//         "AddressLine1":"123 Address",
//         "AddressLine2":"",
//         "City":"Dallas",
//         "State":"TX",
//         "ZipCode":"75001"
//     }],
//     "Franchisee":[{
//         "DlrCode": "701011",
//         "Name":"Customer Name"
//     }],
//     "Description": "MONTHLY CONTRACT BILLING AMOUNT FOR DECEMBER",
//     "inv_no": "12180000",
//     "SismnNo":"234455",
//     "InvoiceDate": "01/12/2018",
//     "DueDate": "12/31/2018",
//     "CompanyNo": "BUF701",
//     "BillMonth": "12",
//     "BillYear": "2018",
//     "EffectDate": "27.11.2018",
//     "Quantity": "  1",
//     "Royalty": "10.00",
//     "SepInv": "Y",
//     "TRX_Amount": " 28671.77",
//     "TRX_Class": "B",
//     "TRX_Tax": " 2508.78",
//     "TRX_Type": "I",
//     "PR_Flag": "False",
//     "Credit": "False",
//     "PrintInv": "Y",
//     "InvMsg": "PO63356B",
//     "OnReport": "False",
//     "Business": " 6.75",
//     "Add_PCT": " 3.00",
//     "Ad_Cur": " 1.50",
//     "TechnicalPCT": " 2.50",
//     "EditDate": null,
//     "PurchaseOrder":"99999",
//     "Items":[{
//         "LineNo":999999,
//         "Description":"MONTHLY CONTRACT BILLING AMOUNT FOR DECEMBER",
//         "BillingTypeId":1,
//         "ServiceTypeListId":60,
//         "Quantity":1,
//         "TaxRate":8.10,
//         "Amount":800.00,
//         "TaxAmount":8.1000,
//         "ExtendedAmount":808.10,
//         "MarkupAmount":0.00,
//         "ComissionPercentage":5.00,
//         "CreateDate":"01/12/2018",
//         "CreateById":99,
//         "ModifyById":99,
//         "ModifyDate":"01/02/2019",
//         "Distribution":
//         [
//             {
//                 "FranchiseeId":12,
//                 "FranchiseeNo":"789888",
//                 "LineNo":1,
//                 "Description":"Work done",
//                 "Amount":350.00
//             }
//         ]
//     }]
// }

// /**
//  * Read Openinghours DB
//  */
// mock.onGet("/api/invoiceDetail/gets").reply(() => {
//     return [200, invoiceDetailDb];
// });

// /**
//  * Add new Openinghour
//  */
// mock.onPost("/api/invoiceDetail/save").reply(request => {
//     const data = JSON.parse(request.data);
//     let invoice = null;

//     invoiceDetailDb = invoiceDetailDb.map(_invoice => {
//         if (_invoice.id === data.id) {
//             invoice = data;
//             return invoice;
//         }
//         return _invoice;
//     });

//     if (!invoice) {
//         invoice = data;
//         invoiceDetailDb = [...invoiceDetailDb, invoice];
//     }

//     return [200, invoice];
// });

// /**
//  *  Update a Openinghours
//  */
// mock.onPost("/api/invoiceDetail/update").reply(request => {
//     const data = JSON.parse(request.data);
//     let invoiceDetail = data.invoiceDetail;
//     let update = data.data;
//     invoiceDetail = invoiceDetail.map(_invoice => {
//         if (_invoice.id === data.id) {
//             return _.merge(_invoice, update);
//         }
//         return _invoice;
//     });

//     return [200, invoiceDetail];
// });

// /**
//  *  Delete a invoice
//  */
// mock.onPost("/api/invoiceDetail/delete").reply(req => {
//     let data = JSON.parse(req.data);
//     let invoiceDetail = data.invoiceDetail;
//     _.forEach(data.ids, function(id){
//         _.remove(invoiceDetail.Data, function(_invoice) {
//             return _invoice.InvoiceId===id
//         });
//     });

//     return [200, invoiceDetail];
// });


// mock.onPost('/api/invoiceDetail/remove').reply((req) => {
//     let data = JSON.parse(req.data);
//     console.log('id=', data.invoiceDetail);
//     let invoiceDetail = data.invoiceDetail;
//     _.remove(invoiceDetail.Data, function(_invoice) {
//         return _invoice.InvoiceId === data.id;
//     });

//     return [200, invoiceDetail];
// });

// mock.onGet("/api/invoiceDetail/get").reply(request => {
//     const { editId } = request.params;
//     const response = _.find(invoiceDetailDb, { id: editId });
//     return [200, response];
// });
