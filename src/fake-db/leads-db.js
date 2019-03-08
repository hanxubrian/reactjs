// import mock from "./mock";
// import _ from "lodash";

// let leadsDb = {
//     "IsSuccess": true,
//     "MessageCode": 200,
//     "Message": "Here is the data you requested",
//     "Data": {
//         "Leads": [
//             {
//                 "CRM_AccountId": 1709845,
//                 "FName": null,
//                 "LName": null,
//                 "UserName": null,
//                 "Email": null,
//                 "assigneeId": 0,
//                 "Regionid": 2,
//                 "CRM_BiddingId": 0,
//                 "CRM_CloseId": 0,
//                 "StageStatusName": "newlead",
//                 "StageStatus": 1,
//                 "Firstname": "Geman Sosita",
//                 "PhoneNumber": "2142222222",
//                 "CRM_AccountCustomerDetailId": 1495028,
//                 "CompanyName": "Something Company Name",
//                 "Title": null,
//                 "SalesVolume": null,
//                 "LineofBusiness": null,
//                 "SqFt": null,
//                 "SpokeWITH": null,
//                 "CRM_CallResultId": 0,
//                 "CallBack": null,
//                 "AccountTypeListId": 0,
//                 "AccountTypeName": null,
//                 "NumberOfLocations": 0,
//                 "BudgetAmount": 0,
//                 "MonthlyPrice": 0,
//                 "ContractAmount": 0,
//                 "LeftDay": "35 Days left",
//                 "CreatedBy": 0,
//                 "CreatedDate": null,
//                 "IsEnable": false,
//                 "IsDelete": false,
//                 "ModifiedBy": null,
//                 "ModifiedDate": null
//             },
//             {
//                 "CRM_AccountId": 311650,
//                 "FName": null,
//                 "LName": null,
//                 "UserName": null,
//                 "Email": null,
//                 "assigneeId": 0,
//                 "Regionid": 2,
//                 "CRM_BiddingId": 0,
//                 "CRM_CloseId": 0,
//                 "StageStatusName": "newlead",
//                 "StageStatus": 1,
//                 "Firstname": null,
//                 "PhoneNumber": "222",
//                 "CRM_AccountCustomerDetailId": 311654,
//                 "CompanyName": "he",
//                 "Title": null,
//                 "SalesVolume": null,
//                 "LineofBusiness": null,
//                 "SqFt": null,
//                 "SpokeWITH": null,
//                 "CRM_CallResultId": 0,
//                 "CallBack": null,
//                 "AccountTypeListId": 0,
//                 "AccountTypeName": null,
//                 "NumberOfLocations": 0,
//                 "BudgetAmount": 0,
//                 "MonthlyPrice": 0,
//                 "ContractAmount": 0,
//                 "LeftDay": "55 Days left",
//                 "CreatedBy": 0,
//                 "CreatedDate": null,
//                 "IsEnable": false,
//                 "IsDelete": false,
//                 "ModifiedBy": null,
//                 "ModifiedDate": null
//             },
//             {
//                 "CRM_AccountId": 311635,
//                 "FName": null,
//                 "LName": null,
//                 "UserName": null,
//                 "Email": null,
//                 "assigneeId": 0,
//                 "Regionid": 24,
//                 "CRM_BiddingId": 0,
//                 "CRM_CloseId": 0,
//                 "StageStatusName": "newlead",
//                 "StageStatus": 1,
//                 "Firstname": "MARIA IWANO",
//                 "PhoneNumber": "8562275077",
//                 "CRM_AccountCustomerDetailId": 311639,
//                 "CompanyName": "GLOUCESTER TOWNSHIP HOUSING AUTHORITY",
//                 "Title": null,
//                 "SalesVolume": null,
//                 "LineofBusiness": null,
//                 "SqFt": "",
//                 "SpokeWITH": "Joe Berlin",
//                 "CRM_CallResultId": 1,
//                 "CallBack": "Date(1542746700000)",
//                 "AccountTypeListId": 71,
//                 "AccountTypeName": "Administration Bldg.",
//                 "NumberOfLocations": 0,
//                 "BudgetAmount": 0,
//                 "MonthlyPrice": 0,
//                 "ContractAmount": 0,
//                 "LeftDay": "76 Days left",
//                 "CreatedBy": 0,
//                 "CreatedDate": null,
//                 "IsEnable": false,
//                 "IsDelete": false,
//                 "ModifiedBy": null,
//                 "ModifiedDate": null
//             },
//             {
//                 "CRM_AccountId": 311633,
//                 "FName": null,
//                 "LName": null,
//                 "UserName": null,
//                 "Email": null,
//                 "assigneeId": 0,
//                 "Regionid": 24,
//                 "CRM_BiddingId": 0,
//                 "CRM_CloseId": 0,
//                 "StageStatusName": "newlead",
//                 "StageStatus": 1,
//                 "Firstname": "Bree Kelly",
//                 "PhoneNumber": "6094520041",
//                 "CRM_AccountCustomerDetailId": 311637,
//                 "CompanyName": "Ruth\u0027s Chris",
//                 "Title": null,
//                 "SalesVolume": null,
//                 "LineofBusiness": null,
//                 "SqFt": "",
//                 "SpokeWITH": "Jonelle",
//                 "CRM_CallResultId": 2,
//                 "CallBack": null,
//                 "AccountTypeListId": 77,
//                 "AccountTypeName": "Consulting Firm",
//                 "NumberOfLocations": 0,
//                 "BudgetAmount": 0,
//                 "MonthlyPrice": 0,
//                 "ContractAmount": 0,
//                 "LeftDay": "78 Days left",
//                 "CreatedBy": 0,
//                 "CreatedDate": null,
//                 "IsEnable": false,
//                 "IsDelete": false,
//                 "ModifiedBy": null,
//                 "ModifiedDate": null
//             },
//             {
//                 "CRM_AccountId": 311600,
//                 "FName": null,
//                 "LName": null,
//                 "UserName": null,
//                 "Email": null,
//                 "assigneeId": 0,
//                 "Regionid": 2,
//                 "CRM_BiddingId": 0,
//                 "CRM_CloseId": 0,
//                 "StageStatusName": "newlead",
//                 "StageStatus": 1,
//                 "Firstname": "barbara pillmore",
//                 "PhoneNumber": "7162860111",
//                 "CRM_AccountCustomerDetailId": 311605,
//                 "CompanyName": "durez corp",
//                 "Title": "",
//                 "SalesVolume": null,
//                 "LineofBusiness": null,
//                 "SqFt": null,
//                 "SpokeWITH": null,
//                 "CRM_CallResultId": 0,
//                 "CallBack": null,
//                 "AccountTypeListId": 0,
//                 "AccountTypeName": null,
//                 "NumberOfLocations": 0,
//                 "BudgetAmount": 0,
//                 "MonthlyPrice": 0,
//                 "ContractAmount": 0,
//                 "LeftDay": "100 Days left",
//                 "CreatedBy": 0,
//                 "CreatedDate": null,
//                 "IsEnable": false,
//                 "IsDelete": false,
//                 "ModifiedBy": null,
//                 "ModifiedDate": null
//             },
//             {
//                 "CRM_AccountId": 311598,
//                 "FName": null,
//                 "LName": null,
//                 "UserName": null,
//                 "Email": null,
//                 "assigneeId": 0,
//                 "Regionid": 2,
//                 "CRM_BiddingId": 0,
//                 "CRM_CloseId": 0,
//                 "StageStatusName": "newlead",
//                 "StageStatus": 1,
//                 "Firstname": "Janita Maldonado",
//                 "PhoneNumber": "7162850044",
//                 "CRM_AccountCustomerDetailId": 311603,
//                 "CompanyName": "REM DISABILITY MGMT GROUP",
//                 "Title": "Manager",
//                 "SalesVolume": null,
//                 "LineofBusiness": null,
//                 "SqFt": "",
//                 "SpokeWITH": null,
//                 "CRM_CallResultId": 0,
//                 "CallBack": null,
//                 "AccountTypeListId": 91,
//                 "AccountTypeName": "Property Mgt. Co.",
//                 "NumberOfLocations": 0,
//                 "BudgetAmount": 0,
//                 "MonthlyPrice": 0,
//                 "ContractAmount": 0,
//                 "LeftDay": "119 Days left",
//                 "CreatedBy": 0,
//                 "CreatedDate": null,
//                 "IsEnable": false,
//                 "IsDelete": false,
//                 "ModifiedBy": null,
//                 "ModifiedDate": null
//             },
//             {
//                 "CRM_AccountId": 311597,
//                 "FName": null,
//                 "LName": null,
//                 "UserName": null,
//                 "Email": null,
//                 "assigneeId": 0,
//                 "Regionid": 2,
//                 "CRM_BiddingId": 0,
//                 "CRM_CloseId": 0,
//                 "StageStatusName": "newlead",
//                 "StageStatus": 1,
//                 "Firstname": "Troy Tripi",
//                 "PhoneNumber": "7168868333",
//                 "CRM_AccountCustomerDetailId": 311602,
//                 "CompanyName": "Best Western On the Avenue",
//                 "Title": "General Manager ",
//                 "SalesVolume": null,
//                 "LineofBusiness": null,
//                 "SqFt": "",
//                 "SpokeWITH": "Troy Tripi",
//                 "CRM_CallResultId": 2,
//                 "CallBack": null,
//                 "AccountTypeListId": 25,
//                 "AccountTypeName": "Hotel/Motel",
//                 "NumberOfLocations": 0,
//                 "BudgetAmount": 0,
//                 "MonthlyPrice": 0,
//                 "ContractAmount": 0,
//                 "LeftDay": "119 Days left",
//                 "CreatedBy": 0,
//                 "CreatedDate": null,
//                 "IsEnable": false,
//                 "IsDelete": false,
//                 "ModifiedBy": null,
//                 "ModifiedDate": null
//             }
//         ]
//     }
// }

// /**
//  * Read Openinghours DB
//  */
// mock.onGet("/api/leads/gets").reply(() => {
//     return [200, leadsDb];
// });

// mock.onPost("/api/leads/post").reply(() => {
//     return [200, leadsDb];
// });

// /**
//  * Add new Openinghour
//  */
// mock.onPost("/api/leads/save").reply(request => {
//     const data = JSON.parse(request.data);
//     let lead = null;
//     debugger
//     leadsDb = leadsDb.map(lead => {
//         if (lead.id === data.id) {
//             lead = data;
//             return lead;
//         }
//         return lead;
//     });

//     if (!lead) {
//         lead = data;
//         leadsDb = [...leadsDb, lead];
//     }

//     return [200, lead];
// });

// /**
//  *  Update a Openinghours
//  */
// mock.onPost("/api/leads/update").reply(request => {
//     const data = JSON.parse(request.data);
//     let leads = data.leads;
//     let update = data.data;
//     leads = leads.map(lead => {
//         if (lead.id === data.id) {
//             return _.merge(lead, update);
//         }
//         return lead;
//     });

//     return [200, leads];
// });

// /**
//  *  Delete a lead
//  */
// mock.onPost("/api/leads/delete").reply(req => {
//     let data = JSON.parse(req.data);
//     let leads = data.leads;
//     _.forEach(data.ids, function(id){
//         // let deleted = _.remove(leads.Data, function(_customer) {
//         //     // console.log('customer', _customer);
//         //     return _customer.CustomerId===id
//         // });
//     });

//     return [200, leads];
// });


// mock.onPost('/api/leads/remove').reply((req) => {
//     let data = JSON.parse(req.data);
//     console.log('id=', data.leads);
//     let leads = data.leads;
//     // let deleted = _.remove(leads.Data, function(_customer) {
//     //     return _customer.CustomerId === data.id;
//     // });

//     return [200, leads];
// });

// mock.onGet("/api/leads/get").reply(request => {
//     const { editId } = request.params;
//     const response = _.find(leadsDb, { id: editId });
//     return [200, response];
// });
