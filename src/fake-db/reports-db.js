import mock from "./mock";
import _ from "lodash";

let reportsDB = {

    "COMPANY_NO": "BUF701",
    "PERIODS": [
        {
            "BILL_PERIOD": "2017-01",
            "FRANCHISEES": [
                {
                    "DLR_CODE": "701011",
                    "SUMMARY_PAGE": [
                        {
                            "FRAN_NAME": "KEVIN M. BURNS",
                            "FRAN_ADDRESS": "612 ADAMS AVENUE",
                            "FRAN_CITY": "ANGOLA",
                            "FRAN_STATE": "NY",
                            "FRAN_ZIP": "14006",
                            "PLAN_TYPE": "A",
                            "DATE_SIGN": "07/15/1997",
                            "CONTACT": "KEVIN BURNS",
                            "TOTAL_CONTRACT_BILLING": [
                                {
                                    "LABEL": "TOTAL CONTRACT BILLING:",
                                    "AMOUNT": "46096.26"
                                }
                            ],
                            "ACTUAL BILLING": [
                                {
                                    "LABEL": "Actual Billing",
                                    "AMOUNT": "152515.86"
                                }
                            ],
                            "ADTL_BILL_FRAN": [
                                {
                                    "LABEL": "Additonal Billing By Franchisee",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "CLIENT_SUPPLIES": [
                                {
                                    "LABEL": "Client Supplies",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "ADDTL_BILL_OFFICE": [
                                {
                                    "LABEL": "Additional Billing By Office",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "SUBTOTAL": [
                                {
                                    "LABEL": "SUBTOTAL",
                                    "AMOUNT": "198612.12"
                                }
                            ],
                            "CLIENT_SALES_TAX": [
                                {
                                    "LABEL": "Client Sales Tax",
                                    "AMOUNT": "12723.05"
                                }
                            ],
                            "TOTAL_MON_REV": [
                                {
                                    "LABEL": "Total Monthly Revenue",
                                    "AMOUNT": "165238.91"
                                }
                            ],
                            "ROYALTY": [
                                {
                                    "LABEL": "Royalty",
                                    "AMOUNT": "15251.59"
                                }
                            ],
                            "ACCT_FEE": [
                                {
                                    "LABEL": "Accounting Fee",
                                    "AMOUNT": "4575.48"
                                }
                            ],
                            "TECH_FEE": [
                                {
                                    "LABEL": "Technology Fee",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "ADDTL_BILL_OFFICE_COMM": [
                                {
                                    "LABEL": "Addiitonal Billing By Office Comm",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "FRAN_NOTE_PYMT": [
                                {
                                    "LABEL": "Franchise Note Payment ",
                                    "AMOUNT": "151.13"
                                }
                            ],
                            "FRANCHISE NOTE PAYMENT2": "0.00",
                            "FINDERS_FEES": "2643.12",
                            "FRANCHISE_SUPPLIES": "196.62",
                            "REGULAR_MISC": "-148.65",
                            "SUBTOTAL_REG_DEDS": "19467.84",
                            "ADVERTISING_FEE": "1525.16",
                            "TOTAL_LEASES": "133.28",
                            "BUSINESS_PROT": "10294.82",
                            "BPP_ADMIN": "14.00",
                            "CLIENT_SALES_TAX_BOT": "12723.05",
                            "CHARGEBACKS": "25584.78",
                            "PAGERS": "0.00",
                            "PAGERS2": "0.00",
                            "SPECIAL_MISC": "0.00",
                            "SUBTOTAL_SPEC_DEDS": "53325.41",
                            "TOTAL_DEDS": "72793.25",
                            "DUE_FRAN": "92445.66",
                            "ACCT_FEE_REB_CUR": "3050.32",
                            "ACCT_FEE_REB_BAL": "3050.32"
                        }
                    ],
                    "CUS_TRXS": [
                        {
                            "CUST_NO": "011043",
                            "CUS_NAME": "CORNERSTONE COMMUNITY FCU",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170000",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "3779.49",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "3779.49"
                        },
                        {
                            "CUST_NO": "011044",
                            "CUS_NAME": "CORNERSTONE",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170001",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "1400.98",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "1400.98"
                        },
                        {
                            "CUST_NO": "011045",
                            "CUS_NAME": "MILLARD FILLMORE SURGERY",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170002",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "8100.00",
                            "TRX_TAX": "708.75",
                            "TRX_TOT": "8808.75"
                        },
                        {
                            "CUST_NO": "011047",
                            "CUS_NAME": "CORNERSTONE COMMUNITY FCU",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170003",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "876.09",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "876.09"
                        },
                        {
                            "CUST_NO": "011050",
                            "CUS_NAME": "BUFFALO BILLS TRAINING AND",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170004",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "10234.85",
                            "TRX_TAX": "895.55",
                            "TRX_TOT": "11130.40"
                        },
                        {
                            "CUST_NO": "011051",
                            "CUS_NAME": "BUFFALO BILLS, LLC.- FULL TIME",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170005",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "14968.03",
                            "TRX_TAX": "1309.70",
                            "TRX_TOT": "16277.73"
                        },
                        {
                            "CUST_NO": "011052",
                            "CUS_NAME": "BUFFALO BILLS, LLC. - SEASONAL",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170006",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "5582.39",
                            "TRX_TAX": "488.46",
                            "TRX_TOT": "6070.85"
                        },
                        {
                            "CUST_NO": "011053",
                            "CUS_NAME": "BUFFALO BILLS - SUITES",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170007",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "24035.10",
                            "TRX_TAX": "2103.07",
                            "TRX_TOT": "26138.17"
                        },
                        {
                            "CUST_NO": "011055",
                            "CUS_NAME": "CORNERSTONE FCU",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170008",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "1052.95",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "1052.95"
                        },
                        {
                            "CUST_NO": "011056",
                            "CUS_NAME": "BUFFALO BILLS LLC. - NON GAME",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170210",
                            "DESCR": "SUITE CREW OT - 11/28/16-1/1/17",
                            "TRX_AMT": "7717.22",
                            "TRX_TAX": "675.26",
                            "TRX_TOT": "8392.48"
                        },
                        {
                            "CUST_NO": "011056",
                            "CUS_NAME": "BUFFALO BILLS LLC. - NON GAME",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170211",
                            "DESCR": "KIM AND ARLENE OT - 11/28/16 - 1/1/17",
                            "TRX_AMT": "3412.85",
                            "TRX_TAX": "298.62",
                            "TRX_TOT": "3711.47"
                        },
                        {
                            "CUST_NO": "011056",
                            "CUS_NAME": "BUFFALO BILLS LLC. - NON GAME",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170212",
                            "DESCR": "REGULAR CREW OT - 11/28/16 - 1/1/17",
                            "TRX_AMT": "9764.93",
                            "TRX_TAX": "854.43",
                            "TRX_TOT": "10619.36"
                        },
                        {
                            "CUST_NO": "011056",
                            "CUS_NAME": "BUFFALO BILLS LLC. - NON GAME",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170213",
                            "DESCR": "TARP CREW - 11/28/16 - 1/1/17",
                            "TRX_AMT": "61590.98",
                            "TRX_TAX": "5389.21",
                            "TRX_TOT": "66980.19"
                        }
                    ],
                    "CUST_ACCT_TOTALS": [
                        {
                            "CUST_NO": "011043",
                            "CUS_NAME": "CORNERSTONE COMMUNITY FCU",
                            "CONT_BILL": "3858.86",
                            "CUR_MONTH": "3779.49",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "011044",
                            "CUS_NAME": "CORNERSTONE",
                            "CONT_BILL": "1400.98",
                            "CUR_MONTH": "1400.98",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "011045",
                            "CUS_NAME": "MILLARD FILLMORE SURGERY",
                            "CONT_BILL": "8100.00",
                            "CUR_MONTH": "8100.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "011047",
                            "CUS_NAME": "CORNERSTONE COMMUNITY FCU",
                            "CONT_BILL": "876.09",
                            "CUR_MONTH": "876.09",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "011050",
                            "CUS_NAME": "BUFFALO BILLS TRAINING AND",
                            "CONT_BILL": "10234.85",
                            "CUR_MONTH": "10234.85",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "29 of 65",
                            "FF_PYMNT": "72.83"
                        },
                        {
                            "CUST_NO": "011051",
                            "CUS_NAME": "BUFFALO BILLS, LLC.- FULL TIME",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "0.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "29 of 65",
                            "FF_PYMNT": "45.50"
                        },
                        {
                            "CUST_NO": "011051",
                            "CUS_NAME": "BUFFALO BILLS, LLC.- FULL TIME",
                            "CONT_BILL": "14968.03",
                            "CUR_MONTH": "14968.03",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "55 of 65",
                            "FF_PYMNT": "324.15"
                        },
                        {
                            "CUST_NO": "011052",
                            "CUS_NAME": "BUFFALO BILLS, LLC. - SEASONAL",
                            "CONT_BILL": "5582.39",
                            "CUR_MONTH": "5582.39",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "33 of 65",
                            "FF_PYMNT": "138.49"
                        },
                        {
                            "CUST_NO": "011053",
                            "CUS_NAME": "BUFFALO BILLS - SUITES",
                            "CONT_BILL": "24035.10",
                            "CUR_MONTH": "24035.10",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "011054",
                            "CUS_NAME": "BUFFALO BILLS - GAME DAY SUITE",
                            "CONT_BILL": "7063.23",
                            "CUR_MONTH": "0.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "011055",
                            "CUS_NAME": "CORNERSTONE FCU",
                            "CONT_BILL": "1075.06",
                            "CUR_MONTH": "1052.95",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "011056",
                            "CUS_NAME": "BUFFALO BILLS LLC. - NON GAME",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "82485.98",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "45.50% of Totl",
                            "FF_PYMNT": "2062.15"
                        }
                    ],
                    "LEASE_PAYMENTS": [
                        {
                            "DESCR": "20 ORBITAL SCRUBBER 3510141005184",
                            "LEASE_DATE": "07/07/2014",
                            "LEASE_NO": "70-2099",
                            "PYMNT_NUM": "21 of 28",
                            "PYMNT_AMT": "122.56",
                            "PYMNT_TAX": "10.72",
                            "PYMNT_TOT": "133.28"
                        }
                    ],
                    "SUPPLY_TRXS": [
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 725714",
                            "QUANTITY": "1",
                            "UNIT COST": "85.64",
                            "EXTENDED": "85.64",
                            "TRX_TAX": "7.49",
                            "TRX_TOT": "93.13"
                        },
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 726200",
                            "QUANTITY": "1",
                            "UNIT COST": "13.21",
                            "EXTENDED": "13.21",
                            "TRX_TAX": "1.16",
                            "TRX_TOT": "14.37"
                        },
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 726772",
                            "QUANTITY": "1",
                            "UNIT COST": "81.95",
                            "EXTENDED": "81.95",
                            "TRX_TAX": "7.17",
                            "TRX_TOT": "89.12"
                        }
                    ],
                    "REG_MISC": [
                        {
                            "TYPE": "Misc",
                            "DESCR": "PURCHASE FROM OFFICE - RWS-BIGD-083",
                            "TRX_AMT": "-148.65",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "-148.65"
                        }
                    ],
                    "CHARGEBACKS": [
                        {
                            "DESCR": "Chargeback from cust. 011045 for invoice #12160002",
                            "TRX_AMT": "6419.25",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "6419.25"
                        },
                        {
                            "DESCR": "Chargeback from cust. 011053 for invoice #12160007",
                            "TRX_AMT": "19047.81",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "19047.81"
                        },
                        {
                            "DESCR": "Chargeback from cust. 011056 for invoice #12160179",
                            "TRX_AMT": "117.72",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "117.72"
                        }
                    ]
                },
                {
                    "DLR_CODE": "701013",
                    "SUMMARY_PAGE": [
                        {
                            "FRAN_NAME": "JIM DEVORE",
                            "FRAN_ADDRESS": "5632 KIES AVENUE",
                            "FRAN_CITY": "NIAGARA FALLS",
                            "FRAN_STATE": "NY",
                            "FRAN_ZIP": "14304",
                            "PLAN_TYPE": "B",
                            "DATE_SIGN": "09/25/1997",
                            "CONTACT": "",
                            "TOTAL_CONTRACT_BILLING": [
                                {
                                    "LABEL": "TOTAL CONTRACT BILLING:",
                                    "AMOUNT": "8251.61"
                                }
                            ],
                            "ACTUAL BILLING": [
                                {
                                    "LABEL": "Actual Billing",
                                    "AMOUNT": "8592.32"
                                }
                            ],
                            "ADTL_BILL_FRAN": [
                                {
                                    "LABEL": "Additonal Billing By Franchisee",
                                    "AMOUNT": "200.00"
                                }
                            ],
                            "CLIENT_SUPPLIES": [
                                {
                                    "LABEL": "Client Supplies",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "ADDTL_BILL_OFFICE": [
                                {
                                    "LABEL": "Additional Billing By Office",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "SUBTOTAL": [
                                {
                                    "LABEL": "SUBTOTAL",
                                    "AMOUNT": "17043.93"
                                }
                            ],
                            "CLIENT_SALES_TAX": [
                                {
                                    "LABEL": "Client Sales Tax",
                                    "AMOUNT": "538.98"
                                }
                            ],
                            "TOTAL_MON_REV": [
                                {
                                    "LABEL": "Total Monthly Revenue",
                                    "AMOUNT": "9331.30"
                                }
                            ],
                            "ROYALTY": [
                                {
                                    "LABEL": "Royalty",
                                    "AMOUNT": "879.23"
                                }
                            ],
                            "ACCT_FEE": [
                                {
                                    "LABEL": "Accounting Fee",
                                    "AMOUNT": "439.62"
                                }
                            ],
                            "TECH_FEE": [
                                {
                                    "LABEL": "Technology Fee",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "ADDTL_BILL_OFFICE_COMM": [
                                {
                                    "LABEL": "Addiitonal Billing By Office Comm",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "FRAN_NOTE_PYMT": [
                                {
                                    "LABEL": "Franchise Note Payment ",
                                    "AMOUNT": "147.93"
                                }
                            ],
                            "FRANCHISE NOTE PAYMENT2": "0.00",
                            "FINDERS_FEES": "577.57",
                            "FRANCHISE_SUPPLIES": "272.58",
                            "REGULAR_MISC": "50.00",
                            "SUBTOTAL_REG_DEDS": "2653.08",
                            "ADVERTISING_FEE": "87.92",
                            "TOTAL_LEASES": "133.33",
                            "BUSINESS_PROT": "593.48",
                            "BPP_ADMIN": "14.00",
                            "CLIENT_SALES_TAX_BOT": "538.98",
                            "CHARGEBACKS": "0.00",
                            "PAGERS": "0.00",
                            "PAGERS2": "0.00",
                            "SPECIAL_MISC": "0.00",
                            "SUBTOTAL_SPEC_DEDS": "1455.63",
                            "TOTAL_DEDS": "4108.71",
                            "DUE_FRAN": "5222.59",
                            "ACCT_FEE_REB_CUR": "0.00",
                            "ACCT_FEE_REB_BAL": "0.00"
                        }
                    ],
                    "CUS_TRXS": [
                        {
                            "CUST_NO": "013040",
                            "CUS_NAME": "TERMINAL COMMERCE WAREHOUSE",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170009",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "235.00",
                            "TRX_TAX": "18.80",
                            "TRX_TOT": "253.80"
                        },
                        {
                            "CUST_NO": "013067",
                            "CUS_NAME": "ST. JOHN DE LA SALLE",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170010",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "406.67",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "406.67"
                        },
                        {
                            "CUST_NO": "013068",
                            "CUS_NAME": "ST. JOHN DE LA SALLE  - PASTOR",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170011",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "498.86",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "498.86"
                        },
                        {
                            "CUST_NO": "013075",
                            "CUS_NAME": "GHD SERVICES, INC.",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170012",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "769.14",
                            "TRX_TAX": "61.53",
                            "TRX_TOT": "830.67"
                        },
                        {
                            "CUST_NO": "013090",
                            "CUS_NAME": "CHILDS CREATIVE DEVELOPMENT",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170013",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "470.28",
                            "TRX_TAX": "41.15",
                            "TRX_TOT": "511.43"
                        },
                        {
                            "CUST_NO": "013091",
                            "CUS_NAME": "HELMEL ENGINEERING PRODUCTS",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170014",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "311.22",
                            "TRX_TAX": "24.90",
                            "TRX_TOT": "336.12"
                        },
                        {
                            "CUST_NO": "013092",
                            "CUS_NAME": "8610 TRANSIT ROAD, LLC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170015",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "391.67",
                            "TRX_TAX": "34.27",
                            "TRX_TOT": "425.94"
                        },
                        {
                            "CUST_NO": "013093",
                            "CUS_NAME": "THE CAROUSEL ACADEMY",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170016",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "297.61",
                            "TRX_TAX": "26.04",
                            "TRX_TOT": "323.65"
                        },
                        {
                            "CUST_NO": "013098",
                            "CUS_NAME": "LASALLE CHURCH OF CHRIST",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170017",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "229.82",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "229.82"
                        },
                        {
                            "CUST_NO": "013099",
                            "CUS_NAME": "TOWN OF NEWSTEAD",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170018A",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "274.21",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "274.21"
                        },
                        {
                            "CUST_NO": "013100",
                            "CUS_NAME": "QUERMBACK ELECTRIC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170019",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "750.00",
                            "TRX_TAX": "65.63",
                            "TRX_TOT": "815.63"
                        },
                        {
                            "CUST_NO": "013101",
                            "CUS_NAME": "NEWSTEAD FIRE STATION",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170020",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "457.00",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "457.00"
                        },
                        {
                            "CUST_NO": "013101",
                            "CUS_NAME": "NEWSTEAD FIRE STATION",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170217",
                            "DESCR": "CLEAN UP - CHILDRENS XMAS PARTY - 12/18/16",
                            "TRX_AMT": "200.00",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "200.00"
                        },
                        {
                            "CUST_NO": "013102",
                            "CUS_NAME": "BUFFALO GEAR INC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170021",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "205.00",
                            "TRX_TAX": "16.40",
                            "TRX_TOT": "221.40"
                        },
                        {
                            "CUST_NO": "013103",
                            "CUS_NAME": "MOLEY MAGNETICS INC.",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170022",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "390.72",
                            "TRX_TAX": "31.26",
                            "TRX_TOT": "421.98"
                        },
                        {
                            "CUST_NO": "013104",
                            "CUS_NAME": "CHILDS CREATIVE DEVELOPMENT",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170023",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "450.00",
                            "TRX_TAX": "39.38",
                            "TRX_TOT": "489.38"
                        },
                        {
                            "CUST_NO": "013104",
                            "CUS_NAME": "CHILDS CREATIVE DEVELOPMENT",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170182",
                            "DESCR": "CREDIT TO NOV.11160023-MISSED CLEAN 11/14/16",
                            "TRX_AMT": "-112.50",
                            "TRX_TAX": "-9.84",
                            "TRX_TOT": "-122.34"
                        },
                        {
                            "CUST_NO": "013105",
                            "CUS_NAME": "DAVID DEMARIE DANCE STUDIO",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170024",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "690.00",
                            "TRX_TAX": "60.38",
                            "TRX_TOT": "750.38"
                        },
                        {
                            "CUST_NO": "013106",
                            "CUS_NAME": "THE CHAPEL AT LOCKPORT",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170025",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "355.29",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "355.29"
                        },
                        {
                            "CUST_NO": "013108",
                            "CUS_NAME": "YOLO RESTAURANT AND LOUNGE",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170026",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "793.33",
                            "TRX_TAX": "69.42",
                            "TRX_TOT": "862.75"
                        },
                        {
                            "CUST_NO": "013109",
                            "CUS_NAME": "ICC  THE COMPLIANCE CENTER INC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170167",
                            "DESCR": "MONTHLY CONTRACT BILLING FOR JANUARY",
                            "TRX_AMT": "550.00",
                            "TRX_TAX": "44.00",
                            "TRX_TOT": "594.00"
                        },
                        {
                            "CUST_NO": "013110",
                            "CUS_NAME": "EXCURIA SALON & SPA",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170168",
                            "DESCR": "MONTHLY CONTRACT BILLING FOR JANUARY",
                            "TRX_AMT": "320.00",
                            "TRX_TAX": "28.00",
                            "TRX_TOT": "348.00"
                        },
                        {
                            "CUST_NO": "013110",
                            "CUS_NAME": "EXCURIA SALON & SPA",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170195",
                            "DESCR": "CREDIT TO JANUARY 01170168-CANCEL DATE 1/2/17",
                            "TRX_AMT": "-256.00",
                            "TRX_TAX": "-22.40",
                            "TRX_TOT": "-278.40"
                        },
                        {
                            "CUST_NO": "013111",
                            "CUS_NAME": "SALON PROFESSIONAL ACADAMY",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170170",
                            "DESCR": "PARTIAL CONTRACT BILLING FOR JANUARY",
                            "TRX_AMT": "460.00",
                            "TRX_TAX": "40.25",
                            "TRX_TOT": "500.25"
                        },
                        {
                            "CUST_NO": "013111",
                            "CUS_NAME": "SALON PROFESSIONAL ACADAMY",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170194",
                            "DESCR": "CREDIT TO JANUARY 01170170-CANCEL DATE 1/8/17",
                            "TRX_AMT": "-345.00",
                            "TRX_TAX": "-30.19",
                            "TRX_TOT": "-375.19"
                        }
                    ],
                    "CUST_ACCT_TOTALS": [
                        {
                            "CUST_NO": "013040",
                            "CUS_NAME": "TERMINAL COMMERCE WAREHOUSE",
                            "CONT_BILL": "235.00",
                            "CUR_MONTH": "235.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013067",
                            "CUS_NAME": "ST. JOHN DE LA SALLE",
                            "CONT_BILL": "406.67",
                            "CUR_MONTH": "406.67",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013068",
                            "CUS_NAME": "ST. JOHN DE LA SALLE  - PASTOR",
                            "CONT_BILL": "498.86",
                            "CUR_MONTH": "498.86",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013075",
                            "CUS_NAME": "GHD SERVICES, INC.",
                            "CONT_BILL": "769.14",
                            "CUR_MONTH": "769.14",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013090",
                            "CUS_NAME": "CHILDS CREATIVE DEVELOPMENT",
                            "CONT_BILL": "470.28",
                            "CUR_MONTH": "470.28",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013091",
                            "CUS_NAME": "HELMEL ENGINEERING PRODUCTS",
                            "CONT_BILL": "311.22",
                            "CUR_MONTH": "311.22",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013092",
                            "CUS_NAME": "8610 TRANSIT ROAD, LLC",
                            "CONT_BILL": "391.67",
                            "CUR_MONTH": "391.67",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013093",
                            "CUS_NAME": "THE CAROUSEL ACADEMY",
                            "CONT_BILL": "297.61",
                            "CUR_MONTH": "297.61",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013098",
                            "CUS_NAME": "LASALLE CHURCH OF CHRIST",
                            "CONT_BILL": "229.82",
                            "CUR_MONTH": "229.82",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013099",
                            "CUS_NAME": "TOWN OF NEWSTEAD",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "274.21",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013100",
                            "CUS_NAME": "QUERMBACK ELECTRIC",
                            "CONT_BILL": "750.00",
                            "CUR_MONTH": "750.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "013101",
                            "CUS_NAME": "NEWSTEAD FIRE STATION",
                            "CONT_BILL": "457.00",
                            "CUR_MONTH": "457.00",
                            "ADTL_B_FRN": "200.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "9 of 13",
                            "FF_PYMNT": "45.70"
                        },
                        {
                            "CUST_NO": "013102",
                            "CUS_NAME": "BUFFALO GEAR INC",
                            "CONT_BILL": "205.00",
                            "CUR_MONTH": "205.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "9 of 13",
                            "FF_PYMNT": "41.00"
                        },
                        {
                            "CUST_NO": "013103",
                            "CUS_NAME": "MOLEY MAGNETICS INC.",
                            "CONT_BILL": "390.72",
                            "CUR_MONTH": "390.72",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "8 of 13",
                            "FF_PYMNT": "66.00"
                        },
                        {
                            "CUST_NO": "013103",
                            "CUS_NAME": "MOLEY MAGNETICS INC.",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "0.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "3 of 13",
                            "FF_PYMNT": "12.14"
                        },
                        {
                            "CUST_NO": "013104",
                            "CUS_NAME": "CHILDS CREATIVE DEVELOPMENT",
                            "CONT_BILL": "450.00",
                            "CUR_MONTH": "337.50",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "4 of 13",
                            "FF_PYMNT": "45.00"
                        },
                        {
                            "CUST_NO": "013105",
                            "CUS_NAME": "DAVID DEMARIE DANCE STUDIO",
                            "CONT_BILL": "690.00",
                            "CUR_MONTH": "690.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "3 of 13",
                            "FF_PYMNT": "138.00"
                        },
                        {
                            "CUST_NO": "013106",
                            "CUS_NAME": "THE CHAPEL AT LOCKPORT",
                            "CONT_BILL": "355.29",
                            "CUR_MONTH": "355.29",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "3 of 13",
                            "FF_PYMNT": "71.06"
                        },
                        {
                            "CUST_NO": "013108",
                            "CUS_NAME": "YOLO RESTAURANT AND LOUNGE",
                            "CONT_BILL": "793.33",
                            "CUR_MONTH": "793.33",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "2 of 13",
                            "FF_PYMNT": "158.67"
                        },
                        {
                            "CUST_NO": "013109",
                            "CUS_NAME": "ICC  THE COMPLIANCE CENTER INC",
                            "CONT_BILL": "550.00",
                            "CUR_MONTH": "550.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "Down Pmt",
                            "FF_PYMNT": "330.00"
                        },
                        {
                            "CUST_NO": "013110",
                            "CUS_NAME": "EXCURIA SALON & SPA",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "64.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "Down Pmt",
                            "FF_PYMNT": "192.00"
                        },
                        {
                            "CUST_NO": "013111",
                            "CUS_NAME": "SALON PROFESSIONAL ACADAMY",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "115.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        }
                    ],
                    "LEASE_PAYMENTS": [
                        {
                            "DESCR": "SC450 3510141507137",
                            "LEASE_DATE": "02/26/2015",
                            "LEASE_NO": "70-2107",
                            "PYMNT_NUM": "25 of 28",
                            "PYMNT_AMT": "122.60",
                            "PYMNT_TAX": "10.73",
                            "PYMNT_TOT": "133.33"
                        }
                    ],
                    "SUPPLY_TRXS": [
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 726604",
                            "QUANTITY": "1",
                            "UNIT COST": "114.43",
                            "EXTENDED": "114.43",
                            "TRX_TAX": "10.01",
                            "TRX_TOT": "124.44"
                        },
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 726603",
                            "QUANTITY": "1",
                            "UNIT COST": "136.22",
                            "EXTENDED": "136.22",
                            "TRX_TAX": "11.92",
                            "TRX_TOT": "148.14"
                        }
                    ],
                    "REG_MISC": [
                        {
                            "TYPE": "Misc",
                            "DESCR": "ACCOUNT CANCELLATION FEE FOR 013111",
                            "TRX_AMT": "50.00",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "50.00"
                        }
                    ]
                },
                {
                    "DLR_CODE": "701019",
                    "SUMMARY_PAGE": [
                        {
                            "FRAN_NAME": "MYRAKLE, LLC",
                            "FRAN_ADDRESS": "348 LEROY AVENUE",
                            "FRAN_CITY": "BUFFALO",
                            "FRAN_STATE": "NY",
                            "FRAN_ZIP": "14214",
                            "PLAN_TYPE": "B",
                            "DATE_SIGN": "10/16/2000",
                            "CONTACT": "YOLANDA WALKER",
                            "TOTAL_CONTRACT_BILLING": [
                                {
                                    "LABEL": "TOTAL CONTRACT BILLING:",
                                    "AMOUNT": "7836.77"
                                }
                            ],
                            "ACTUAL BILLING": [
                                {
                                    "LABEL": "Actual Billing",
                                    "AMOUNT": "7551.62"
                                }
                            ],
                            "ADTL_BILL_FRAN": [
                                {
                                    "LABEL": "Additonal Billing By Franchisee",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "CLIENT_SUPPLIES": [
                                {
                                    "LABEL": "Client Supplies",
                                    "AMOUNT": "0.00"
                                }
                            ],
                            "ADDTL_BILL_OFFICE": [
                                {
                                    "LABEL": "Additional Billing By Office",
                                    "AMOUNT": "624.94"
                                }
                            ],
                            "SUBTOTAL": [
                                {
                                    "LABEL": "SUBTOTAL",
                                    "AMOUNT": "16013.33"
                                }
                            ],
                            "CLIENT_SALES_TAX": [
                                {
                                    "LABEL": "Client Sales Tax",
                                    "AMOUNT": "693.63"
                                }
                            ],
                            "TOTAL_MON_REV": [
                                {
                                    "LABEL": "Total Monthly Revenue",
                                    "AMOUNT": "8870.19"
                                }
                            ],
                            "ROYALTY": [
                                {
                                    "LABEL": "Royalty",
                                    "AMOUNT": "817.66"
                                }
                            ],
                            "ACCT_FEE": [
                                {
                                    "LABEL": "Accounting Fee",
                                    "AMOUNT": "245.30"
                                }
                            ],
                            "TECH_FEE": [
                                {
                                    "LABEL": "Technology Fee",
                                    "AMOUNT": "204.41"
                                }
                            ],
                            "ADDTL_BILL_OFFICE_COMM": [
                                {
                                    "LABEL": "Addiitonal Billing By Office Comm",
                                    "AMOUNT": "31.25"
                                }
                            ],
                            "FRAN_NOTE_PYMT": [
                                {
                                    "LABEL": "Franchise Note Payment ",
                                    "AMOUNT": "147.93"
                                }
                            ],
                            "FRANCHISE NOTE PAYMENT2": "0.00",
                            "FINDERS_FEES": "928.72",
                            "FRANCHISE_SUPPLIES": "186.38",
                            "REGULAR_MISC": "0.00",
                            "SUBTOTAL_REG_DEDS": "2413.72",
                            "ADVERTISING_FEE": "122.65",
                            "TOTAL_LEASES": "321.30",
                            "BUSINESS_PROT": "551.92",
                            "BPP_ADMIN": "14.00",
                            "CLIENT_SALES_TAX_BOT": "693.63",
                            "CHARGEBACKS": "1652.80",
                            "PAGERS": "0.00",
                            "PAGERS2": "0.00",
                            "SPECIAL_MISC": "0.00",
                            "SUBTOTAL_SPEC_DEDS": "3356.30",
                            "TOTAL_DEDS": "5770.02",
                            "DUE_FRAN": "3100.17",
                            "ACCT_FEE_REB_CUR": "0.00",
                            "ACCT_FEE_REB_BAL": "0.00"
                        }
                    ],
                    "CUS_TRXS": [
                        {
                            "CUST_NO": "019105",
                            "CUS_NAME": "ROSWELL PARK HEMATOLOGY",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170027",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "249.51",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "249.51"
                        },
                        {
                            "CUST_NO": "019106",
                            "CUS_NAME": "AMERICAN HOMEPATIENT",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170028",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "414.50",
                            "TRX_TAX": "36.27",
                            "TRX_TOT": "450.77"
                        },
                        {
                            "CUST_NO": "019107",
                            "CUS_NAME": "VALLEY TIRE COMPANY",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170029",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "241.81",
                            "TRX_TAX": "21.16",
                            "TRX_TOT": "262.97"
                        },
                        {
                            "CUST_NO": "019109",
                            "CUS_NAME": "MAZIN DHAFIR, MD",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170030",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "254.39",
                            "TRX_TAX": "22.26",
                            "TRX_TOT": "276.65"
                        },
                        {
                            "CUST_NO": "019109",
                            "CUS_NAME": "MAZIN DHAFIR, MD",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170180",
                            "DESCR": "CREDIT TO JAN.01170030-NO SERVICE 1/6/17",
                            "TRX_AMT": "-63.60",
                            "TRX_TAX": "-5.57",
                            "TRX_TOT": "-69.17"
                        },
                        {
                            "CUST_NO": "019110",
                            "CUS_NAME": "GUNTHER MELE PACKAGING",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170031",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "249.69",
                            "TRX_TAX": "21.85",
                            "TRX_TOT": "271.54"
                        },
                        {
                            "CUST_NO": "019113",
                            "CUS_NAME": "PSA HEALTHCARE",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170032",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "257.94",
                            "TRX_TAX": "22.57",
                            "TRX_TOT": "280.51"
                        },
                        {
                            "CUST_NO": "019118",
                            "CUS_NAME": "SAFETY-KLEEN SYSTEMS, INC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170033",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "249.93",
                            "TRX_TAX": "21.87",
                            "TRX_TOT": "271.80"
                        },
                        {
                            "CUST_NO": "019118",
                            "CUS_NAME": "SAFETY-KLEEN SYSTEMS, INC",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170201",
                            "DESCR": "CREDIT TO JAN.01170033-MISSED CLEAN 1/2/17",
                            "TRX_AMT": "-49.99",
                            "TRX_TAX": "-4.37",
                            "TRX_TOT": "-54.36"
                        },
                        {
                            "CUST_NO": "019119",
                            "CUS_NAME": "MUELLER SERVICES INC.",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170034",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "3009.00",
                            "TRX_TAX": "263.29",
                            "TRX_TOT": "3272.29"
                        },
                        {
                            "CUST_NO": "019120",
                            "CUS_NAME": "SHIVLEY BROS, INC.",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170035",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "281.25",
                            "TRX_TAX": "24.61",
                            "TRX_TOT": "305.86"
                        },
                        {
                            "CUST_NO": "019120",
                            "CUS_NAME": "SHIVLEY BROS, INC.",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170173",
                            "DESCR": "CREDIT TO DECEMBER 12160037-CANCEL DATE 12/21/16",
                            "TRX_AMT": "-70.31",
                            "TRX_TAX": "-6.15",
                            "TRX_TOT": "-76.46"
                        },
                        {
                            "CUST_NO": "019120",
                            "CUS_NAME": "SHIVLEY BROS, INC.",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170174",
                            "DESCR": "CREDIT JANUARY 01170035-CANCEL DATE 12/21/16",
                            "TRX_AMT": "-281.25",
                            "TRX_TAX": "-24.61",
                            "TRX_TOT": "-305.86"
                        },
                        {
                            "CUST_NO": "019124",
                            "CUS_NAME": "NEPHROLOGY ASSOCIATES OF WNY",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170036",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "600.00",
                            "TRX_TAX": "52.50",
                            "TRX_TOT": "652.50"
                        },
                        {
                            "CUST_NO": "019125",
                            "CUS_NAME": "NEPHROLOGY ASSOCIATES",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170037",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "300.00",
                            "TRX_TAX": "26.25",
                            "TRX_TOT": "326.25"
                        },
                        {
                            "CUST_NO": "019126",
                            "CUS_NAME": "TRI-MAIN DEVELOPMENT, LLC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170038",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "1100.00",
                            "TRX_TAX": "96.25",
                            "TRX_TOT": "1196.25"
                        },
                        {
                            "CUST_NO": "019127",
                            "CUS_NAME": "NATIONAL RESPONSE CORP",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170039",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "225.00",
                            "TRX_TAX": "19.69",
                            "TRX_TOT": "244.69"
                        },
                        {
                            "CUST_NO": "019127",
                            "CUS_NAME": "NATIONAL RESPONSE CORP",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170181",
                            "DESCR": "CREDIT TO DEC.12160041-MISSED CLEAN 12/26/16",
                            "TRX_AMT": "-56.25",
                            "TRX_TAX": "-4.92",
                            "TRX_TOT": "-61.17"
                        },
                        {
                            "CUST_NO": "019127",
                            "CUS_NAME": "NATIONAL RESPONSE CORP",
                            "TRX_TYPE": "C",
                            "INV_NO": "01170199",
                            "DESCR": "CREDIT TO JAN.01170039-MISSED CLEAN 1/2/17",
                            "TRX_AMT": "-45.00",
                            "TRX_TAX": "-3.94",
                            "TRX_TOT": "-48.94"
                        },
                        {
                            "CUST_NO": "019132",
                            "CUS_NAME": "EMPIRE VISUAL EFFECTS",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170040",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "260.00",
                            "TRX_TAX": "22.75",
                            "TRX_TOT": "282.75"
                        },
                        {
                            "CUST_NO": "019133",
                            "CUS_NAME": "SOMA CURA WELLNESS CENTER",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170041",
                            "DESCR": "MONTHLY CONTRACT BILLING AMOUNT FOR JANUARY",
                            "TRX_AMT": "425.00",
                            "TRX_TAX": "37.19",
                            "TRX_TOT": "462.19"
                        },
                        {
                            "CUST_NO": "019134",
                            "CUS_NAME": "PAUL T. BIDDLE M.D., PLLC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170228",
                            "DESCR": "MONTHLY CLEANING SERVICES 12/16 - 1/17",
                            "TRX_AMT": "312.47",
                            "TRX_TAX": "27.34",
                            "TRX_TOT": "339.81"
                        },
                        {
                            "CUST_NO": "019134",
                            "CUS_NAME": "PAUL T. BIDDLE M.D., PLLC",
                            "TRX_TYPE": "I",
                            "INV_NO": "01170238",
                            "DESCR": "MONTHLY CLEANING SERVICES",
                            "TRX_AMT": "312.47",
                            "TRX_TAX": "27.34",
                            "TRX_TOT": "339.81"
                        }
                    ],
                    "CUST_ACCT_TOTALS": [
                        {
                            "CUST_NO": "019105",
                            "CUS_NAME": "ROSWELL PARK HEMATOLOGY",
                            "CONT_BILL": "249.51",
                            "CUR_MONTH": "249.51",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "019106",
                            "CUS_NAME": "AMERICAN HOMEPATIENT",
                            "CONT_BILL": "414.50",
                            "CUR_MONTH": "414.50",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "019107",
                            "CUS_NAME": "VALLEY TIRE COMPANY",
                            "CONT_BILL": "241.81",
                            "CUR_MONTH": "241.81",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "019109",
                            "CUS_NAME": "MAZIN DHAFIR, MD",
                            "CONT_BILL": "254.39",
                            "CUR_MONTH": "190.79",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "019110",
                            "CUS_NAME": "GUNTHER MELE PACKAGING",
                            "CONT_BILL": "249.69",
                            "CUR_MONTH": "249.69",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "019113",
                            "CUS_NAME": "PSA HEALTHCARE",
                            "CONT_BILL": "257.94",
                            "CUR_MONTH": "257.94",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "Final Pmt",
                            "FF_PYMNT": "50.73"
                        },
                        {
                            "CUST_NO": "019118",
                            "CUS_NAME": "SAFETY-KLEEN SYSTEMS, INC",
                            "CONT_BILL": "249.93",
                            "CUR_MONTH": "199.94",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "11 of 13",
                            "FF_PYMNT": "49.99"
                        },
                        {
                            "CUST_NO": "019119",
                            "CUS_NAME": "MUELLER SERVICES INC.",
                            "CONT_BILL": "3009.00",
                            "CUR_MONTH": "3009.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "11 of 30",
                            "FF_PYMNT": "300.90"
                        },
                        {
                            "CUST_NO": "019120",
                            "CUS_NAME": "SHIVLEY BROS, INC.",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "-70.31",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "019124",
                            "CUS_NAME": "NEPHROLOGY ASSOCIATES OF WNY",
                            "CONT_BILL": "600.00",
                            "CUR_MONTH": "600.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "7 of 13",
                            "FF_PYMNT": "120.00"
                        },
                        {
                            "CUST_NO": "019125",
                            "CUS_NAME": "NEPHROLOGY ASSOCIATES",
                            "CONT_BILL": "300.00",
                            "CUR_MONTH": "300.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "7 of 13",
                            "FF_PYMNT": "60.00"
                        },
                        {
                            "CUST_NO": "019126",
                            "CUS_NAME": "TRI-MAIN DEVELOPMENT, LLC",
                            "CONT_BILL": "1100.00",
                            "CUR_MONTH": "1100.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "7 of 13",
                            "FF_PYMNT": "220.00"
                        },
                        {
                            "CUST_NO": "019127",
                            "CUS_NAME": "NATIONAL RESPONSE CORP",
                            "CONT_BILL": "225.00",
                            "CUR_MONTH": "123.75",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "7 of 13",
                            "FF_PYMNT": "45.00"
                        },
                        {
                            "CUST_NO": "019132",
                            "CUS_NAME": "EMPIRE VISUAL EFFECTS",
                            "CONT_BILL": "260.00",
                            "CUR_MONTH": "260.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        },
                        {
                            "CUST_NO": "019133",
                            "CUS_NAME": "SOMA CURA WELLNESS CENTER",
                            "CONT_BILL": "425.00",
                            "CUR_MONTH": "425.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "0.00",
                            "FF_NBR": "1 of 13",
                            "FF_PYMNT": "82.10"
                        },
                        {
                            "CUST_NO": "019134",
                            "CUS_NAME": "PAUL T. BIDDLE M.D., PLLC",
                            "CONT_BILL": "0.00",
                            "CUR_MONTH": "0.00",
                            "ADTL_B_FRN": "0.00",
                            "CLIENT_SUP": "0.00",
                            "ADTL_B_OFC": "624.94",
                            "FF_NBR": "",
                            "FF_PYMNT": "0.00"
                        }
                    ],
                    "LEASE_PAYMENTS": [
                        {
                            "DESCR": "DUAL MOTOR VACUUM 144400013",
                            "LEASE_DATE": "04/27/2015",
                            "LEASE_NO": "70-2112",
                            "PYMNT_NUM": "13 of 14",
                            "PYMNT_AMT": "31.25",
                            "PYMNT_TAX": "2.73",
                            "PYMNT_TOT": "33.98"
                        },
                        {
                            "DESCR": "SUPER COACH 15023R2045",
                            "LEASE_DATE": "04/27/2015",
                            "LEASE_NO": "70-2120",
                            "PYMNT_NUM": "12 of 14",
                            "PYMNT_AMT": "31.28",
                            "PYMNT_TAX": "2.74",
                            "PYMNT_TOT": "34.02"
                        },
                        {
                            "DESCR": "1500 HEPA VAC 1551 KC 00179",
                            "LEASE_DATE": "02/18/2016",
                            "LEASE_NO": "70-2126",
                            "PYMNT_NUM": "13 of 16",
                            "PYMNT_AMT": "33.02",
                            "PYMNT_TAX": "2.89",
                            "PYMNT_TOT": "35.91"
                        },
                        {
                            "DESCR": "30 VACUUM 101191",
                            "LEASE_DATE": "05/18/2016",
                            "LEASE_NO": "70-2129",
                            "PYMNT_NUM": "10 of 28",
                            "PYMNT_AMT": "90.30",
                            "PYMNT_TAX": "7.90",
                            "PYMNT_TOT": "98.20"
                        },
                        {
                            "DESCR": "BURNISHER 4000112961",
                            "LEASE_DATE": "10/18/2016",
                            "LEASE_NO": "70-2132",
                            "PYMNT_NUM": "5 of 16",
                            "PYMNT_AMT": "109.60",
                            "PYMNT_TAX": "9.59",
                            "PYMNT_TOT": "119.19"
                        }
                    ],
                    "SUPPLY_TRXS": [
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 724938",
                            "QUANTITY": "1",
                            "UNIT COST": "24.00",
                            "EXTENDED": "24.00",
                            "TRX_TAX": "2.10",
                            "TRX_TOT": "26.10"
                        },
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 725196",
                            "QUANTITY": "1",
                            "UNIT COST": "23.00",
                            "EXTENDED": "23.00",
                            "TRX_TAX": "2.01",
                            "TRX_TOT": "25.01"
                        },
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 725197",
                            "QUANTITY": "1",
                            "UNIT COST": "20.25",
                            "EXTENDED": "20.25",
                            "TRX_TAX": "1.77",
                            "TRX_TOT": "22.02"
                        },
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 726201",
                            "QUANTITY": "1",
                            "UNIT COST": "82.21",
                            "EXTENDED": "82.21",
                            "TRX_TAX": "7.19",
                            "TRX_TOT": "89.40"
                        },
                        {
                            "DESCR": "DOBMEIER JANITORIAL SUPPLY INC - 726605",
                            "QUANTITY": "1",
                            "UNIT COST": "21.93",
                            "EXTENDED": "21.93",
                            "TRX_TAX": "1.92",
                            "TRX_TOT": "23.85"
                        }
                    ],
                    "CHARGEBACKS": [
                        {
                            "DESCR": "Chargeback from cust. 019118 for invoice #12160035",
                            "TRX_AMT": "190.57",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "190.57"
                        },
                        {
                            "DESCR": "Chargeback from cust. 019120 for invoice #12160037",
                            "TRX_AMT": "107.23",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "107.23"
                        },
                        {
                            "DESCR": "Chargeback from cust. 019126 for invoice #12160040",
                            "TRX_AMT": "838.75",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "838.75"
                        },
                        {
                            "DESCR": "Chargeback from cust. 019132 for invoice #12160042",
                            "TRX_AMT": "198.25",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "198.25"
                        },
                        {
                            "DESCR": "Chargeback from cust. 019132 for invoice #12160223",
                            "TRX_AMT": "89.05",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "89.05"
                        },
                        {
                            "DESCR": "Chargeback from cust. 019134 for invoice #12160241",
                            "TRX_AMT": "228.95",
                            "TRX_TAX": "0.00",
                            "TRX_TOT": "228.95"
                        }
                    ]
                }
            ]
        }
    ]
};

/**
 * Read DB
 */
mock.onGet("/api/reports/gets").reply(() => {
    return [200, reportsDB];
});

/**
 * Add new DB
 */
mock.onPost("/api/reports/save").reply(request => {
    const data = JSON.parse(request.data);
    let reports = null;

    reportsDB = reportsDB.map(_report => {
        if (_report.id === data.id) {
            reports = data;
            return reports;
        }
        return _report;
    });

    if (!reports) {
        reports = data;
        reportsDB = [...reportsDB, reports];
    }

    return [200, reports];
});

/**
 *  Update a DB
 */
mock.onPost("/api/reports/update").reply(request => {
    const data = JSON.parse(request.data);
    let reports = data.reports;
    let update = data.data;
    reports = reports.map(_report => {
        if (_report.id === data.id) {
            return _.merge(_report, update);
        }
        return _report;
    });

    return [200, reports];
});

mock.onPost('/api/reports/remove').reply((req) => {
    let data = JSON.parse(req.data);
    console.log('id=', data.reports);
    let removeFranchisees = data.reports;
    for(let i = 0 ; i < (removeFranchisees.Data.Region).length ;i++ ){
        // let deleted = _.remove((removeFranchisees.Data.Region)[i].Franchisees, function(_report) {
        //     return _report.ID === data.id;
        // });
    }
    return [200, removeFranchisees];
});

mock.onGet("/api/reports/get").reply(request => {
    const { editId } = request.params;
    const response = _.find(reportsDB, { id: editId });
    return [200, response];
});

