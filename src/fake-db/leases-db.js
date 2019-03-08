// import mock from "./mock";
// import _ from "lodash";

// let leasesDb = {
//     "IsSuccess": true,
//     "MessageCode": 0,
//     "Message": "Here is the data you requested",
//     "Data": {
//         "Regions": [
//             {
//             "Id": 2,
//             "Code": "BUF",
//             "Name": "Buffalo",
//             "Legalname": "Jani-King of Buffalo, Inc",
//             "Leases": [
//                 {
//                     "FranchiseeId": 23,
//                     "FranchiseeNo": "701022",
//                     "FranchiseeName": "JAMES MEDLEY",
//                     "LeaseCount": 5,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 4353.64,
//                     "TotalMonthlyPaymentAmount": 309.14,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 69,
//                     "FranchiseeNo": "701068",
//                     "FranchiseeName": "GWENNETTE DAVIS-JONES",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1321.42,
//                     "TotalMonthlyPaymentAmount": 114.06,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 89,
//                     "FranchiseeNo": "701088",
//                     "FranchiseeName": "CONNOR & SON, LLC",
//                     "LeaseCount": 5,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 3306.07,
//                     "TotalMonthlyPaymentAmount": 815.58,
//                     "TotalPaidAmount": 397.14,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 3,
//                     "FranchiseeNo": "701002",
//                     "FranchiseeName": "ANA E. BURIANO",
//                     "LeaseCount": 6,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2686.04,
//                     "TotalMonthlyPaymentAmount": 183.53,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 26,
//                     "FranchiseeNo": "701025",
//                     "FranchiseeName": "LATORIA SLAUGHTER",
//                     "LeaseCount": 2,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1920.43,
//                     "TotalMonthlyPaymentAmount": 128.2,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 6,
//                     "FranchiseeNo": "701005",
//                     "FranchiseeName": "FOREST RICHARDSON, III",
//                     "LeaseCount": 4,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 3057.87,
//                     "TotalMonthlyPaymentAmount": 204.13,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 49,
//                     "FranchiseeNo": "701048",
//                     "FranchiseeName": "JOSEPH T. SWARTZMEYER",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 8686.78,
//                     "TotalMonthlyPaymentAmount": 285.28,
//                     "TotalPaidAmount": 1240.96,
//                     "Status": "Active",
//                     "StatusListId": 21
//                 },
//                 {
//                     "FranchiseeId": 49,
//                     "FranchiseeNo": "701048",
//                     "FranchiseeName": "JOSEPH T. SWARTZMEYER",
//                     "LeaseCount": 40,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 34936.38,
//                     "TotalMonthlyPaymentAmount": 2000.24,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 109,
//                     "FranchiseeNo": "701108",
//                     "FranchiseeName": "RENEE ASTON",
//                     "LeaseCount": 4,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2303.22,
//                     "TotalMonthlyPaymentAmount": 2117.9,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 86,
//                     "FranchiseeNo": "701085",
//                     "FranchiseeName": "CRYSTAL FORD",
//                     "LeaseCount": 5,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 5726.69,
//                     "TotalMonthlyPaymentAmount": 263.89,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 43,
//                     "FranchiseeNo": "701042",
//                     "FranchiseeName": "PAUL P. REIDENOUER",
//                     "LeaseCount": 42,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 32823.77,
//                     "TotalMonthlyPaymentAmount": 1949.34,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 92,
//                     "FranchiseeNo": "701091",
//                     "FranchiseeName": "MARQUIS PERRY",
//                     "LeaseCount": 3,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 996.79,
//                     "TotalMonthlyPaymentAmount": 916.58,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 115,
//                     "FranchiseeNo": "701114",
//                     "FranchiseeName": "SCED LAND CO., LLC",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 996.79,
//                     "TotalMonthlyPaymentAmount": 530.35,
//                     "TotalPaidAmount": 3460.5,
//                     "Status": "Active",
//                     "StatusListId": 21
//                 },
//                 {
//                     "FranchiseeId": 15,
//                     "FranchiseeNo": "701014",
//                     "FranchiseeName": "JAMES H. JAZDZEWSKI",
//                     "LeaseCount": 19,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 9322.6,
//                     "TotalMonthlyPaymentAmount": 913.3,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 72,
//                     "FranchiseeNo": "701071",
//                     "FranchiseeName": "HARRY WASHINGTON",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 384.18,
//                     "TotalMonthlyPaymentAmount": 25.35,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 112,
//                     "FranchiseeNo": "701111",
//                     "FranchiseeName": "PRYOR & PRYOR, INC.",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2136.02,
//                     "TotalMonthlyPaymentAmount": 122.76,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 29,
//                     "FranchiseeNo": "701028",
//                     "FranchiseeName": "CHARLES ERVIN",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1739.05,
//                     "TotalMonthlyPaymentAmount": 141.03,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 9,
//                     "FranchiseeNo": "701008",
//                     "FranchiseeName": "BUDDY NGUYEN",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 5773.45,
//                     "TotalMonthlyPaymentAmount": 385.41,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 95,
//                     "FranchiseeNo": "701094",
//                     "FranchiseeName": "JOHNNY ROBINSON",
//                     "LeaseCount": 7,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 9775.61,
//                     "TotalMonthlyPaymentAmount": 453.71,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 118,
//                     "FranchiseeNo": "701ZZ9",
//                     "FranchiseeName": "JANI KING BUFFALO-IN HOUSE",
//                     "LeaseCount": 180,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 168229.46,
//                     "TotalMonthlyPaymentAmount": 11279.11,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 32,
//                     "FranchiseeNo": "701031",
//                     "FranchiseeName": "JAMES A. DUBIEL",
//                     "LeaseCount": 19,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 14633.47,
//                     "TotalMonthlyPaymentAmount": 906.29,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 12,
//                     "FranchiseeNo": "701011",
//                     "FranchiseeName": "KMBURNS, LLC",
//                     "LeaseCount": 16,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 33624.88,
//                     "TotalMonthlyPaymentAmount": 1434.79,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 35,
//                     "FranchiseeNo": "701034",
//                     "FranchiseeName": "JONATHAN D. ARGENTINO",
//                     "LeaseCount": 18,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 6467.34,
//                     "TotalMonthlyPaymentAmount": 429.48,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 58,
//                     "FranchiseeNo": "701057",
//                     "FranchiseeName": "HUER, WEHRMEYER, & KUDLA",
//                     "LeaseCount": 4,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2054.91,
//                     "TotalMonthlyPaymentAmount": 146.6,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 18,
//                     "FranchiseeNo": "701017",
//                     "FranchiseeName": "FRANKLIN REDD, JR.",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 584.82,
//                     "TotalMonthlyPaymentAmount": 39.04,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 84,
//                     "FranchiseeNo": "701083",
//                     "FranchiseeName": "JOE KOWALSKI dba JAKS",
//                     "LeaseCount": 17,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 11846.03,
//                     "TotalMonthlyPaymentAmount": 440.12,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 61,
//                     "FranchiseeNo": "701060",
//                     "FranchiseeName": "HUNTER & WHITE, LLC",
//                     "LeaseCount": 6,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 5209.55,
//                     "TotalMonthlyPaymentAmount": 325.72,
//                     "TotalPaidAmount": 529.5,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 41,
//                     "FranchiseeNo": "701040",
//                     "FranchiseeName": "JIMMY LEWIS HARDY & GEATHER LEE HARDY",
//                     "LeaseCount": 4,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 5403.93,
//                     "TotalMonthlyPaymentAmount": 227.71,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 104,
//                     "FranchiseeNo": "701103",
//                     "FranchiseeName": "TAINE S. NOWAK",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1023.58,
//                     "TotalMonthlyPaymentAmount": 67.23,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 21,
//                     "FranchiseeNo": "701020",
//                     "FranchiseeName": "DAVID A. GABAMONTE, INC.",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1778.42,
//                     "TotalMonthlyPaymentAmount": 118.72,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 64,
//                     "FranchiseeNo": "701063",
//                     "FranchiseeName": "FRED SCHOLTISEK",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 364.76,
//                     "TotalMonthlyPaymentAmount": 42.12,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 101,
//                     "FranchiseeNo": "701100",
//                     "FranchiseeName": "FAKHRI I. HAMIDEH",
//                     "LeaseCount": 1,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 510.95,
//                     "TotalMonthlyPaymentAmount": 33.56,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 44,
//                     "FranchiseeNo": "701043",
//                     "FranchiseeName": "JOHN J. LOCKE",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 463.88,
//                     "TotalMonthlyPaymentAmount": 30.68,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 107,
//                     "FranchiseeNo": "701106",
//                     "FranchiseeName": "JACKSON 4 JACKSON, INC.",
//                     "LeaseCount": 53,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 83679.74,
//                     "TotalMonthlyPaymentAmount": 3137.62,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 93,
//                     "FranchiseeNo": "701092",
//                     "FranchiseeName": "BASMAR CORPORATION",
//                     "LeaseCount": 6,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 3085.72,
//                     "TotalMonthlyPaymentAmount": 2837.44,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 10,
//                     "FranchiseeNo": "701009",
//                     "FranchiseeName": "RICHARD S. MONGIOVI, JR.",
//                     "LeaseCount": 4,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2120.57,
//                     "TotalMonthlyPaymentAmount": 258.56,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 113,
//                     "FranchiseeNo": "701112",
//                     "FranchiseeName": "JAM~AND~ASH, INC.",
//                     "LeaseCount": 7,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 3899.01,
//                     "TotalMonthlyPaymentAmount": 225.56,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 67,
//                     "FranchiseeNo": "701066",
//                     "FranchiseeName": "TANYA SOLER",
//                     "LeaseCount": 6,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 3182.97,
//                     "TotalMonthlyPaymentAmount": 248.54,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 24,
//                     "FranchiseeNo": "701023",
//                     "FranchiseeName": "DECARLO MCNEIL",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1025.66,
//                     "TotalMonthlyPaymentAmount": 79.88,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 47,
//                     "FranchiseeNo": "701046",
//                     "FranchiseeName": "HENLY HILL JR./JACQUELINE HILL",
//                     "LeaseCount": 4,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2520.35,
//                     "TotalMonthlyPaymentAmount": 166.69,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 110,
//                     "FranchiseeNo": "701109",
//                     "FranchiseeName": "KHAMPHET CORP.",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2025.99,
//                     "TotalMonthlyPaymentAmount": 133.07,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 4,
//                     "FranchiseeNo": "701003",
//                     "FranchiseeName": "SHANE DEUBELL",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 134.82,
//                     "TotalMonthlyPaymentAmount": 126,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 96,
//                     "FranchiseeNo": "701095",
//                     "FranchiseeName": "SAMO ENTERPRISES, LLC",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1358.35,
//                     "TotalMonthlyPaymentAmount": 84.75,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 73,
//                     "FranchiseeNo": "701072",
//                     "FranchiseeName": "ANDREW GERACE",
//                     "LeaseCount": 7,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 6369.79,
//                     "TotalMonthlyPaymentAmount": 290.45,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 116,
//                     "FranchiseeNo": "701115",
//                     "FranchiseeName": "RASOOLI, LLC",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2117.93,
//                     "TotalMonthlyPaymentAmount": 121.72,
//                     "TotalPaidAmount": 529.52,
//                     "Status": "Active",
//                     "StatusListId": 21
//                 },
//                 {
//                     "FranchiseeId": 76,
//                     "FranchiseeNo": "701075",
//                     "FranchiseeName": "MADD DOGG GROUP, INC.",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 4375.25,
//                     "TotalMonthlyPaymentAmount": 203.5,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 53,
//                     "FranchiseeNo": "701052",
//                     "FranchiseeName": "ROB, PATRICK,& YOLANDA JENKINS",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 496.93,
//                     "TotalMonthlyPaymentAmount": 229.53,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 36,
//                     "FranchiseeNo": "701035",
//                     "FranchiseeName": "OMAR TIPPS & KEITH GOSS",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1389.7,
//                     "TotalMonthlyPaymentAmount": 92.77,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 13,
//                     "FranchiseeNo": "701012",
//                     "FranchiseeName": "CURTIS HAIRSTON, JR.",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1985.75,
//                     "TotalMonthlyPaymentAmount": 132.56,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 56,
//                     "FranchiseeNo": "701055",
//                     "FranchiseeName": "ERICK J. ACOSTA",
//                     "LeaseCount": 5,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2520.54,
//                     "TotalMonthlyPaymentAmount": 196.21,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 59,
//                     "FranchiseeNo": "701058",
//                     "FranchiseeName": "GREGG E. ROBINS",
//                     "LeaseCount": 6,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 3069.66,
//                     "TotalMonthlyPaymentAmount": 1613.33,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 39,
//                     "FranchiseeNo": "701038",
//                     "FranchiseeName": "ROBERT L. JENKINS & PATRICK T. JENKINS",
//                     "LeaseCount": 5,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1913.22,
//                     "TotalMonthlyPaymentAmount": 143.88,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 16,
//                     "FranchiseeNo": "701015",
//                     "FranchiseeName": "GRADY H. MARTIN & PEGGY L. MARTIN",
//                     "LeaseCount": 3,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2140.25,
//                     "TotalMonthlyPaymentAmount": 155.19,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 19,
//                     "FranchiseeNo": "701018",
//                     "FranchiseeName": "WILLIAM E. BALD - TERMINATED",
//                     "LeaseCount": 40,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 291734.42,
//                     "TotalMonthlyPaymentAmount": 11412.93,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 85,
//                     "FranchiseeNo": "701084",
//                     "FranchiseeName": "BAJRO HADZIC",
//                     "LeaseCount": 33,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 20797.9,
//                     "TotalMonthlyPaymentAmount": 1366.3,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 42,
//                     "FranchiseeNo": "701041",
//                     "FranchiseeName": "MYRON W. HODGES",
//                     "LeaseCount": 3,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2773.39,
//                     "TotalMonthlyPaymentAmount": 183.25,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 22,
//                     "FranchiseeNo": "701021",
//                     "FranchiseeName": "ANGELO JAMES",
//                     "LeaseCount": 4,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 4432.14,
//                     "TotalMonthlyPaymentAmount": 255.05,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 108,
//                     "FranchiseeNo": "701107",
//                     "FranchiseeName": "ANITA ALVORD D/B/A AMA ENT.",
//                     "LeaseCount": 28,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 24767.1,
//                     "TotalMonthlyPaymentAmount": 2357.65,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 2,
//                     "FranchiseeNo": "701001",
//                     "FranchiseeName": "MICHAEL A. WHITEHEAD",
//                     "LeaseCount": 4,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1478,
//                     "TotalMonthlyPaymentAmount": 142.58,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 25,
//                     "FranchiseeNo": "701024",
//                     "FranchiseeName": "C.PRYOR, V. SMITH, V. PRYOR JR",
//                     "LeaseCount": 12,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 5896.39,
//                     "TotalMonthlyPaymentAmount": 391.59,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 105,
//                     "FranchiseeNo": "701104",
//                     "FranchiseeName": "TAMEKA R. & DAMON J. JOHNSON",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1484.9,
//                     "TotalMonthlyPaymentAmount": 97.53,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 5,
//                     "FranchiseeNo": "701004",
//                     "FranchiseeName": "AWA AVINO, INC.",
//                     "LeaseCount": 1,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 180.59,
//                     "TotalMonthlyPaymentAmount": 28.13,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 82,
//                     "FranchiseeNo": "701081",
//                     "FranchiseeName": "BIANCA MATHEIS",
//                     "LeaseCount": 6,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2951.14,
//                     "TotalMonthlyPaymentAmount": 216.7,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 102,
//                     "FranchiseeNo": "701101",
//                     "FranchiseeName": "WILLIAM BROWN, JR.",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 917.14,
//                     "TotalMonthlyPaymentAmount": 64.94,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 31,
//                     "FranchiseeNo": "701030",
//                     "FranchiseeName": "MICHAEL R. LIBUTTI",
//                     "LeaseCount": 4,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1834.45,
//                     "TotalMonthlyPaymentAmount": 122.46,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 11,
//                     "FranchiseeNo": "701010",
//                     "FranchiseeName": "NANCY GAGOLA",
//                     "LeaseCount": 5,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2714.87,
//                     "TotalMonthlyPaymentAmount": 184.42,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 111,
//                     "FranchiseeNo": "701110",
//                     "FranchiseeName": "LEHMAN CORP.",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2301.56,
//                     "TotalMonthlyPaymentAmount": 151.17,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 68,
//                     "FranchiseeNo": "701067",
//                     "FranchiseeName": "RHONDA & WINTHROP SARGENT",
//                     "LeaseCount": 1,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2335.39,
//                     "TotalMonthlyPaymentAmount": 154.1,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 117,
//                     "FranchiseeNo": "701116",
//                     "FranchiseeName": "ABATIS, LLC",
//                     "LeaseCount": 2,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1093.59,
//                     "TotalMonthlyPaymentAmount": 83.8,
//                     "TotalPaidAmount": 364.56,
//                     "Status": "Active",
//                     "StatusListId": 21
//                 },
//                 {
//                     "FranchiseeId": 114,
//                     "FranchiseeNo": "701113",
//                     "FranchiseeName": "GOLD JACKET 240, LLC",
//                     "LeaseCount": 1,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 354.31,
//                     "TotalMonthlyPaymentAmount": 27.15,
//                     "TotalPaidAmount": 118.12,
//                     "Status": "Active",
//                     "StatusListId": 21
//                 },
//                 {
//                     "FranchiseeId": 74,
//                     "FranchiseeNo": "701073",
//                     "FranchiseeName": "JEROME MROWINSKI",
//                     "LeaseCount": 6,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1926.59,
//                     "TotalMonthlyPaymentAmount": 233.11,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 8,
//                     "FranchiseeNo": "701007",
//                     "FranchiseeName": "WILLIAM E. JACKSON",
//                     "LeaseCount": 10,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 8271.68,
//                     "TotalMonthlyPaymentAmount": 539.71,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 51,
//                     "FranchiseeNo": "701050",
//                     "FranchiseeName": "ERIC C. SIMMONS",
//                     "LeaseCount": 8,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 3761.55,
//                     "TotalMonthlyPaymentAmount": 254.01,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 34,
//                     "FranchiseeNo": "701033",
//                     "FranchiseeName": "ANGIE MCDONALD",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1347.9,
//                     "TotalMonthlyPaymentAmount": 89.98,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 103,
//                     "FranchiseeNo": "701102",
//                     "FranchiseeName": "RONALD GARDNER",
//                     "LeaseCount": 4,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2497.06,
//                     "TotalMonthlyPaymentAmount": 164.01,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 80,
//                     "FranchiseeNo": "701079",
//                     "FranchiseeName": "JAMES GREEN & GEORGE MCGEE",
//                     "LeaseCount": 3,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1036.17,
//                     "TotalMonthlyPaymentAmount": 309.98,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 57,
//                     "FranchiseeNo": "701056",
//                     "FranchiseeName": "CHAD B. WILSON",
//                     "LeaseCount": 1,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2969.58,
//                     "TotalMonthlyPaymentAmount": 105.51,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 14,
//                     "FranchiseeNo": "701013",
//                     "FranchiseeName": "JIM DEVORE & ASSOCIATES, LLC",
//                     "LeaseCount": 40,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 39522.58,
//                     "TotalMonthlyPaymentAmount": 2033.34,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 37,
//                     "FranchiseeNo": "701036",
//                     "FranchiseeName": "Alesia H. Brown & Maurice D. Brown Associates, LLC",
//                     "LeaseCount": 7,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2819,
//                     "TotalMonthlyPaymentAmount": 187.3,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 100,
//                     "FranchiseeNo": "701099",
//                     "FranchiseeName": "HIBA KHALIL",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1364.92,
//                     "TotalMonthlyPaymentAmount": 89.65,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 60,
//                     "FranchiseeNo": "701059",
//                     "FranchiseeName": "BOB J. GATES",
//                     "LeaseCount": 2,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 967.44,
//                     "TotalMonthlyPaymentAmount": 55.6,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 40,
//                     "FranchiseeNo": "701039",
//                     "FranchiseeName": "AMINA ROBINSON",
//                     "LeaseCount": 4,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 1842.52,
//                     "TotalMonthlyPaymentAmount": 121.86,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 97,
//                     "FranchiseeNo": "701096",
//                     "FranchiseeName": "GRANDNUBIAN, LLC",
//                     "LeaseCount": 8,
//                     "IsActive": false,
//                     "RegionName": "BUF",
//                     "TotalBalance": 5525.73,
//                     "TotalMonthlyPaymentAmount": 345.55,
//                     "TotalPaidAmount": 264.74,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 },
//                 {
//                     "FranchiseeId": 20,
//                     "FranchiseeNo": "701019",
//                     "FranchiseeName": "THE REGNET ENTERPRISE, LLC",
//                     "LeaseCount": 3,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 2117.93,
//                     "TotalMonthlyPaymentAmount": 121.72,
//                     "TotalPaidAmount": 529.52,
//                     "Status": "Active",
//                     "StatusListId": 21
//                 },
//                 {
//                     "FranchiseeId": 20,
//                     "FranchiseeNo": "701019",
//                     "FranchiseeName": "THE REGNET ENTERPRISE, LLC",
//                     "LeaseCount": 14,
//                     "IsActive": true,
//                     "RegionName": "BUF",
//                     "TotalBalance": 18474.23,
//                     "TotalMonthlyPaymentAmount": 961.11,
//                     "TotalPaidAmount": 0,
//                     "Status": "Complete",
//                     "StatusListId": 22
//                 }
//             ]
//          }
//       ]
//     }
// }

// /**
//  * Read Openinghours DB
//  */
// mock.onGet("/api/leases/gets").reply(() => {
//     return [200, leasesDb];
// });

// mock.onPost("/api/leases/post").reply(() => {
//     return [200, leasesDb];
// });

// /**
//  * Add new Openinghour
//  */
// mock.onPost("/api/leases/save").reply(request => {
//     const data = JSON.parse(request.data);
//     let lease = null;
//     debugger
//     leasesDb = leasesDb.map(lease => {
//         if (lease.id === data.id) {
//             lease = data;
//             return lease;
//         }
//         return lease;
//     });

//     if (!lease) {
//         lease = data;
//         leasesDb = [...leasesDb, lease];
//     }

//     return [200, lease];
// });

// /**
//  *  Update a Openinghours
//  */
// mock.onPost("/api/leases/update").reply(request => {
//     const data = JSON.parse(request.data);
//     let leases = data.leases;
//     let update = data.data;
//     leases = leases.map(lease => {
//         if (lease.id === data.id) {
//             return _.merge(lease, update);
//         }
//         return lease;
//     });

//     return [200, leases];
// });

// /**
//  *  Delete a lease
//  */
// mock.onPost("/api/leases/delete").reply(req => {
//     let data = JSON.parse(req.data);
//     let leases = data.leases;
//     _.forEach(data.ids, function(id){
//         // let deleted = _.remove(leases.Data, function(_customer) {
//         //     // console.log('customer', _customer);
//         //     return _customer.CustomerId===id
//         // });
//     });

//     return [200, leases];
// });


// mock.onPost('/api/leases/remove').reply((req) => {
//     let data = JSON.parse(req.data);
//     console.log('id=', data.leases);
//     let leases = data.leases;
//     // let deleted = _.remove(leases.Data, function(_customer) {
//     //     return _customer.CustomerId === data.id;
//     // });

//     return [200, leases];
// });

// mock.onGet("/api/leases/get").reply(request => {
//     const { editId } = request.params;
//     const response = _.find(leasesDb, { id: editId });
//     return [200, response];
// });
