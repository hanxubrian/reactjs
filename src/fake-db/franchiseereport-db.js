import mock from './mock';

const franchiseeReportDB={
    "_id": "5c379c6533dcfd07f4339111",
    "COMPANY_NO": "BUF701",
    "PERIODS": [
        {
            "BILL_PERIOD": "2017-01",
            "FRANCHISEES": [
                {
                    "DLR_CODE": "701106",
                    "SUMMARY_PAGE": [
                        {
                            "FRAN_NAME": "JACKSON 4 JACKSON, INC.",
                            "FRAN_ADDRESS": "124 GERALD AVENUE",
                            "FRAN_CITY": "BUFFALO",
                            "FRAN_STATE": "NY",
                            "FRAN_ZIP": "14215",
                            "PLAN_TYPE": "B",
                            "DATE_SIGN": "05/14/2009",
                            "CONTACT": "ANTOINE JACKSON",
                            "FRAN_NOTE_PYMT2": null,
                            "FRANCHISE NOTE PAYMENT2": "145.83",
                            "FINDERS_FEES": [
                                {
                                    "LABEL": "Finders Fees",
                                    "AMOUNT": "9415.07"
                                }
                            ],
                            "FRANCHISE SUPPLIES": [
                                {
                                    "LABEL": "Franchisee Supplies",
                                    "AMOUNT": "0"
                                }
                            ],
                            "REGULAR MISCELLANEOUS": [
                                {
                                    "LABEL": "Regular Miscellaneous",
                                    "AMOUNT": "0"
                                }
                            ],
                            "SUBTOTAL_REG_DEDS": null,
                            "ADVERTISING_FEE": [
                                {
                                    "LABEL": "Advertising Fee",
                                    "AMOUNT": "847.9878"
                                }
                            ],
                            "TOTAL_LEASES": [
                                {
                                    "LABEL": "Lease Total",
                                    "AMOUNT": "0"
                                }
                            ],
                            "BUSINESS_PROT": null,
                            "BPP_ADMIN": null,
                            "CLIENT_SALES_TAX_BOT": [
                                {
                                    "LABEL": "Client Sales Tax",
                                    "AMOUNT": "0"
                                }
                            ],
                            "CHARGEBACKS": [],
                            "PAGERS": null,
                            "PAGERS2": null,
                            "SPECIAL_MISC": [],
                            "SUBTOTAL_SPEC_DEDS": null,
                            "TOTAL_DEDS": null,
                            "DUE_TO_FRAN": null,
                            "ACCT_FEE_REB_CUR": null,
                            "ACCT_FEE_REB_BAL": null,
                            "TOTAL_CONTRACT_BILLING": [
                                {
                                    "LABEL": "TOTAL CONTRACT BILLING:",
                                    "AMOUNT": "84054.86"
                                }
                            ],
                            "ACTUAL BILLING": null,
                            "ADTL_BILL_FRAN": null,
                            "CLIENT_SUPPLIES": null,
                            "ADDTL_BILL_OFFICE": null,
                            "SUBTOTAL": null,
                            "CLIENT_SALES_TAX": null,
                            "TOTAL_MON_REV": [
                                {
                                    "LABEL": "Total Monthly Revenue",
                                    "AMOUNT": "56532.52"
                                }
                            ],
                            "ROYALTY": [
                                {
                                    "LABEL": "Royalty",
                                    "AMOUNT": "5653.252"
                                }
                            ],
                            "ACCT_FEE": [
                                {
                                    "LABEL": "Accounting Fee",
                                    "AMOUNT": "1695.9756"
                                }
                            ],
                            "TECH_FEE": [
                                {
                                    "LABEL": "Technology Fee",
                                    "AMOUNT": "1413.313"
                                }
                            ],
                            "ADDTL_BILL_OFFICE_COMM": [
                                {
                                    "LABEL": "Aditional Billing By Office Comm",
                                    "AMOUNT": "0"
                                }
                            ],
                            "FRAN_NOTE_PYMT": [
                                {
                                    "LABEL": "Franchise Note Payment",
                                    "AMOUNT": "145.83"
                                }
                            ]
                        }
                    ],
                    "CUS_TRXS": [
                        {
                            "CUST_NO": "106004",
                            "CUS_NAME": "SPECIFIC SOLUTIONS",
                            "TRX_TYPE": null,
                            "INV_NO": "02192855",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "625.92",
                            "TRX_TAX": null,
                            "TRX_TOT": "625.92",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106014",
                            "CUS_NAME": "BRAVO CUCINA ITALIANA",
                            "TRX_TYPE": null,
                            "INV_NO": "02192860",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "2495.39",
                            "TRX_TAX": null,
                            "TRX_TOT": "2495.39",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106024",
                            "CUS_NAME": "UNIVERSITY NUCLEAR MEDICINE",
                            "TRX_TYPE": null,
                            "INV_NO": "02192872",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "271.17",
                            "TRX_TAX": null,
                            "TRX_TOT": "271.17",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106025",
                            "CUS_NAME": "CAPITAL MANAGEMENT",
                            "TRX_TYPE": null,
                            "INV_NO": "02192873",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "11006.03",
                            "TRX_TAX": null,
                            "TRX_TOT": "11006.03",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106032",
                            "CUS_NAME": "MONROE TRACTOR",
                            "TRX_TYPE": null,
                            "INV_NO": "02192881",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "224.05",
                            "TRX_TAX": null,
                            "TRX_TOT": "224.05",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106035",
                            "CUS_NAME": "SHEET METAL WORKERS",
                            "TRX_TYPE": null,
                            "INV_NO": "02192889",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "261.63",
                            "TRX_TAX": null,
                            "TRX_TOT": "261.63",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106036",
                            "CUS_NAME": "MIDCITY OFFICE FURNITURE",
                            "TRX_TYPE": null,
                            "INV_NO": "02192890",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "288.94",
                            "TRX_TAX": null,
                            "TRX_TOT": "288.94",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106037",
                            "CUS_NAME": "ANGUS CHEMICAL CO.",
                            "TRX_TYPE": null,
                            "INV_NO": "02192892",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "1460.12",
                            "TRX_TAX": null,
                            "TRX_TOT": "1460.12",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106049",
                            "CUS_NAME": "RICH PRODUCTS CORPORATION",
                            "TRX_TYPE": null,
                            "INV_NO": "02192911",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "1200",
                            "TRX_TAX": null,
                            "TRX_TOT": "1200",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106052",
                            "CUS_NAME": "3M COMPANY",
                            "TRX_TYPE": null,
                            "INV_NO": "02192912",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "7481.6",
                            "TRX_TAX": null,
                            "TRX_TOT": "7481.6",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106063",
                            "CUS_NAME": "MUELLER SERVICES INC.",
                            "TRX_TYPE": null,
                            "INV_NO": "02192929",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "3388.88",
                            "TRX_TAX": null,
                            "TRX_TOT": "3388.88",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106077",
                            "CUS_NAME": "WKBW",
                            "TRX_TYPE": null,
                            "INV_NO": "02192965",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "1797.21",
                            "TRX_TAX": null,
                            "TRX_TOT": "1797.21",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106078",
                            "CUS_NAME": "LIPSEY CLINIC-SPCA",
                            "TRX_TYPE": null,
                            "INV_NO": "02192966",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "1217",
                            "TRX_TAX": null,
                            "TRX_TOT": "1217",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106079",
                            "CUS_NAME": "DUREZ CORPORATION",
                            "TRX_TYPE": null,
                            "INV_NO": "02192967",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "3173.69",
                            "TRX_TAX": null,
                            "TRX_TOT": "3173.69",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106080",
                            "CUS_NAME": "DELAWARE PEDIATRICS, LLP",
                            "TRX_TYPE": null,
                            "INV_NO": "02192978",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "2426.87",
                            "TRX_TAX": null,
                            "TRX_TOT": "2426.87",
                            "Commission": false
                        },
                        {
                            "CUST_NO": "106081",
                            "CUS_NAME": "4545 TRANSIT LLC",
                            "TRX_TYPE": null,
                            "INV_NO": "02192984",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR FEBRUARY 2019",
                            "TRX_AMT": "19214.02",
                            "TRX_TAX": null,
                            "TRX_TOT": "19214.02",
                            "Commission": false
                        }
                    ],
                    "CUST_ACCT_TOTALS": [
                        {
                            "CUST_NO": "106081",
                            "CUS_NAME": "WKBW",
                            "TRX_TYPE": null,
                            "Billing": "5c41e517d2963319d486a19b",
                            "Amount": 56532.520000000004
                        }
                    ],
                    "SUPPLY_TRXS": [],
                    "LEASE_PAYMENTS": [],
                    "LEASE_PAYMENTS2": [],
                    "FINDER_FEES": [
                        {
                            "CUST_NO": "106001",
                            "CUS_NAME": "106001",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106002",
                            "CUS_NAME": "106002",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106003",
                            "CUS_NAME": "106003",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106008",
                            "CUS_NAME": "106008",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "12",
                            "PYMNT_TOT": 185.5
                        },
                        {
                            "CUST_NO": "106012",
                            "CUS_NAME": "106012",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "33",
                            "PYMNT_TOT": 235.47
                        },
                        {
                            "CUST_NO": "106013",
                            "CUS_NAME": "106013",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "33",
                            "PYMNT_TOT": 189.32
                        },
                        {
                            "CUST_NO": "106015",
                            "CUS_NAME": "106015",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "2",
                            "PYMNT_TOT": 47.71
                        },
                        {
                            "CUST_NO": "106017",
                            "CUS_NAME": "106017",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "8",
                            "PYMNT_TOT": 326.37
                        },
                        {
                            "CUST_NO": "106019",
                            "CUS_NAME": "106019",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "15",
                            "PYMNT_TOT": 234.31
                        },
                        {
                            "CUST_NO": "106021",
                            "CUS_NAME": "106021",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "14",
                            "PYMNT_TOT": 348.02
                        },
                        {
                            "CUST_NO": "106022",
                            "CUS_NAME": "106022",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "12",
                            "PYMNT_TOT": 306.25
                        },
                        {
                            "CUST_NO": "106023",
                            "CUS_NAME": "106023",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "28",
                            "PYMNT_TOT": 722.98
                        },
                        {
                            "CUST_NO": "106026",
                            "CUS_NAME": "106026",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "5",
                            "PYMNT_TOT": 258.36
                        },
                        {
                            "CUST_NO": "106027",
                            "CUS_NAME": "106027",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "4",
                            "PYMNT_TOT": 184.46
                        },
                        {
                            "CUST_NO": "106029",
                            "CUS_NAME": "106029",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "3",
                            "PYMNT_TOT": 91.65
                        },
                        {
                            "CUST_NO": "106030",
                            "CUS_NAME": "106030",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 321.94
                        },
                        {
                            "CUST_NO": "106033",
                            "CUS_NAME": "106033",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "8",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106034",
                            "CUS_NAME": "106034",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "6",
                            "PYMNT_TOT": 264.28
                        },
                        {
                            "CUST_NO": "106039",
                            "CUS_NAME": "106039",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "10",
                            "PYMNT_TOT": 444.29
                        },
                        {
                            "CUST_NO": "106044",
                            "CUS_NAME": "106044",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "7",
                            "PYMNT_TOT": 347.8
                        },
                        {
                            "CUST_NO": "106025",
                            "CUS_NAME": "106025",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106045",
                            "CUS_NAME": "106045",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "15",
                            "PYMNT_TOT": 286.77
                        },
                        {
                            "CUST_NO": "106046",
                            "CUS_NAME": "106046",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "10",
                            "PYMNT_TOT": 74.11
                        },
                        {
                            "CUST_NO": "106044",
                            "CUS_NAME": "106044",
                            "DESCRIPTION": "FINDER'S FEE ON INCREASE 5/10/15",
                            "PYMNT_NUM": "4",
                            "PYMNT_TOT": 36.66
                        },
                        {
                            "CUST_NO": "106041",
                            "CUS_NAME": "106041",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "13",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106048",
                            "CUS_NAME": "106048",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "11",
                            "PYMNT_TOT": 302.1
                        },
                        {
                            "CUST_NO": "106052",
                            "CUS_NAME": "106052",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "31",
                            "PYMNT_TOT": 701.06
                        },
                        {
                            "CUST_NO": "106054",
                            "CUS_NAME": "106054",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "12",
                            "PYMNT_TOT": 120
                        },
                        {
                            "CUST_NO": "106056",
                            "CUS_NAME": "106056",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "2",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106058",
                            "CUS_NAME": "106058",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 0
                        },
                        {
                            "CUST_NO": "106050",
                            "CUS_NAME": "106050",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "7",
                            "PYMNT_TOT": 80
                        },
                        {
                            "CUST_NO": "106063",
                            "CUS_NAME": "106063",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "21",
                            "PYMNT_TOT": 308.42
                        },
                        {
                            "CUST_NO": "106066",
                            "CUS_NAME": "106066",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "7",
                            "PYMNT_TOT": 257.05
                        },
                        {
                            "CUST_NO": "106067",
                            "CUS_NAME": "106067",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "2",
                            "PYMNT_TOT": 50.5
                        },
                        {
                            "CUST_NO": "106068",
                            "CUS_NAME": "106068",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 144.14
                        },
                        {
                            "CUST_NO": "106071",
                            "CUS_NAME": "106071",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 161.67
                        },
                        {
                            "CUST_NO": "106076",
                            "CUS_NAME": "106076",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 228.8
                        },
                        {
                            "CUST_NO": "106077",
                            "CUS_NAME": "106077",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "3",
                            "PYMNT_TOT": 269.58
                        },
                        {
                            "CUST_NO": "106078",
                            "CUS_NAME": "106078",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "3",
                            "PYMNT_TOT": 243.4
                        },
                        {
                            "CUST_NO": "106079",
                            "CUS_NAME": "106079",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "3",
                            "PYMNT_TOT": 317.37
                        },
                        {
                            "CUST_NO": "106080",
                            "CUS_NAME": "106080",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 364.03
                        },
                        {
                            "CUST_NO": "106081",
                            "CUS_NAME": "106081",
                            "DESCRIPTION": "FINDER'S FEE ON CONTRACT BILLING",
                            "PYMNT_NUM": "1",
                            "PYMNT_TOT": 960.7
                        }
                    ],
                    "REG_MISC": null,
                    "SPEC_MISC": null,
                    "CHARGEBACKS": []
                }
            ]
        }
    ]
}

mock.onGet('/v1/franchiseereport').reply((config) => {
    return [200, franchiseeReportDB];
});
