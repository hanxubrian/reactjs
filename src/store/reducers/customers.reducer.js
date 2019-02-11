import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
	customersDB: null,
	customersDocuments: null,
	bLoadedCustomers: false,
	bOpenedSummaryPanel: false,
	bOpenedFilterPanel: false,
	bOpenedMapView: false,
	transactionStatus: { checkedPaid: true, checkedPP: true, checkedComplete: true, checkedOpen: true },
	customerForm: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	},
	statusId: 1,
	location: "all",
	longitude: "",
	latitude: "",

	locationFilterValue: {
		id: "locationAll",
		miles: 15,
		addrZipcode: undefined
	},
	searchText: "",

	bCustomerFetchStart: false,

	accountTypeList: [],
	accountExecutiveList: [],
	customerStatusList: [],
	accountTypesGroups: [],

	bOpenEmailToCustomerDialog: false,

	createCustomerResponse: [],
	bCreateCustomerStart: false,

	getCustomerResponse: [],
	bGetCustomerStart: false,

	filters: {
		StatusNames: ["Active"],
		AccountTypeListName: "",
	},

	customerFormFindersFeesDialogPayload: {
		open: false,
	},
	// findersFees: [],
	// isStartedFindersFeesFetching : false,

	finderFeesConfigs: [],
	isStartedFindersFeesConfigsFetching: false,

	findersFeesCalculationMethod: {
		title: "",
		name: "",
		value: "",
	},

	customerServiceForm: {
		serviceList: {
			data: [],
			isFetching: false,
		},
		billingList: {
			data: [],
			isFetching: false,
		},
		collectionList: {
			data: [],
			isFetching: false,
		},
	},
	filterParam: {
		fromDate: "",
		toDate: "",
	},
	logCallModalForm: {
		open: false,
	},
	contactForms:
	{
		emailModalForm: { open: true },
		smsModalForm: { open: true },
		phoneCallModalForm: { open: true },
		chatModalForm: { open: true },
	},
	activeCustomer: {
		/*
		"_id": "5c60d0e7a0cca52060539838",
        "Latitude": 0,
        "Longitude": 0,
        "CPIBillingAppliedDate": null,
        "lastModified": "0001-01-01T00:00:00Z",
        "overpayment": 0,
        "AssignedFranchisees": [
            {
                "FranchiseeNumber": "701ZZ9",
                "Status": "Active",
                "AssignedDate": "09/03/1996",
                "MonthlyBilling": 1180.08,
                "CreatedById": 0
            }
        ],
        "AccountOfferings": [
            {
                "FranchiseeNumber": "701ZZ9",
                "Type": "Offer",
                "Response": "Accepted",
                "OfferDate": "01/01/1950",
                "ReplyDeadlineDateTime": null,
                "ResponseDate": null,
                "AssignedDate": "09/03/1996",
                "MonthlyBillingOffered": 1180.08,
                "CreatedById": 0
            }
        ],
        "pmt_history": null,
        "sys_cust": 1,
        "company_no": "BUF701",
        "dlr_code": "701ZZ9",
        "cust_no": "ZZ9001",
        "cus_name": "UNILAND DEVELOPMENT COMPANY",
        "cus_addr": "100 CORPORATE PARKWAY",
        "cus_city": "AMHERST",
        "cus_county": "ERIE",
        "cus_state": "NY",
        "cus_zip": "14226",
        "cus_phone": "7168345000",
        "bill_name": "UNILAND DEVELOPMENT COMPANY",
        "bill_addr": "100 CORPORATE PARKWAY",
        "bill_city": "AMHERST",
        "bill_state": "NY",
        "bill_zip": "14226",
        "bill_name2": "",
        "bill_addr2": "",
        "bill_phone": "7168345000",
        "cus_name2": "",
        "cus_addr2": "",
        "class_type": "Gas Station",
        "royalty": 10,
        "sales_tax": 7,
        "cont_1": "BOB KEIL",
        "cont_2": "",
        "cont_bill": 1180.08,
        "date_sign": "09/03/1996",
        "flag": "C",
        "misc_info": "",
        "misc_info2": "",
        "po_1": "46320",
        "slsmn_no": "",
        "add_on": " ",
        "cont_tax": "Y",
        "exp_date": "09/03/1997",
        "cleantimes": 5,
        "cleanper": "W",
        "firstfran": "",
        "firstdate": "01/01/1950",
        "secondfran": "",
        "seconddate": "01/01/1950",
        "crteinv": "N",
        "prntpd": "Y",
        "tax_exempt": "N",
        "canc_date": "03/31/2000",
        "canreason": "8",
        "candescr": "DISPUTE W/ LANDLORD",
        "callbdate": "01/01/1950",
        "cscallbdat": "01/01/1950",
        "ops_mgr": "",
        "cus_fax": "",
        "bill_fax": "",
        "cs_rep": "",
        "date_start": "01/01/1950",
        "date_offer": "01/01/1950",
        "mon": "F",
        "tue": "F",
        "wed": "F",
        "thu": "F",
        "fri": "F",
        "sat": "F",
        "sun": "F",
        "email1": "",
        "email2": "",
        "ebill": " ",
        "prntinv": "Y",
        "atrisk": " ",
        "canentdat": "01/01/1950",
        "coll_rep": "",
        "inv_msg": "",
        "masteracct": "F",
        "parent": 0,
        "xregionid": 0,
        "xsys_cust": 0,
        "cpiadj": "F",
        "resume_d": "01/01/1950",
        "natacct": " ",
        "cus_ext": "",
        "bill_ext": "",
        "sqr_ft": 0,
        "agreeused": "",
        "arstatus": "",
        "arstatdate": "01/01/1950",
        "notes": "",
        "claimstat": " ",
        "business": 6.75,
        "add_pct": 3,
        "ad_cur": 1,
        "tech_pct": 0
		*/
	},
};


const customers = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_CUSTOMERS:
			{
				return {
					...state,
					customersDB: action.payload,
					bLoadedCustomers: true,
					bCustomerFetchStart: false
				};
			}
		case Actions.GET_ACCOUNT_TYPE_LIST:
			{
				return {
					...state,
					accountTypeList: action.payload
				}
			}
		case Actions.GET_CUSTOMER_STATUS_LIST:
			{
				return {
					...state,
					customerStatusList: action.payload
				}
			}
		case Actions.GET_ACCOUNT_EXCUTIVE_LIST:
			{
				return {
					...state,
					accountExecutiveList: action.payload
				}
			}
		case Actions.GET_ACCOUNT_TYPES_GROUPS:
			{
				return {
					...state,
					accountTypesGroups: action.payload
				}
			}
		case Actions.CREATE_CUSTOMER:
			{
				return {
					...state,
					createCustomerResponse: action.payload,
					bCreateCustomerStart: false,
					customerForm: {
						type: 'new',
						props: {
							open: false
						},
						data: null
					}

				}
			}
		case Actions.CREATE_CUSTOMER_START:
			{
				return {
					...state,
					bCreateCustomerStart: true,
				}
			}
		case Actions.GET_CUSTOMER:
			{
				return {
					...state,
					getCustomerResponse: action.payload,
					bGetCustomerStart: false,
				}
			}
		case Actions.GET_CUSTOMER_START:
			{
				return {
					...state,
					bGetCustomerStart: true,
				}
			}
		case Actions.GET_ALL_DOCUMENTS:
			{
				return {
					...state,
					customersDocuments: action.payload
				};
			}
		case Actions.GET_CUSTOMERS_FETCH_START:
			{
				return {
					...state,
					bCustomerFetchStart: true
				};
			}
		case Actions.TOGGLE_FILTER_PANEL:
			{
				return {
					...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
				}
			}
		case Actions.TOGGLE_SUMMARY_PANEL:
			{
				return {
					...state, bOpenedSummaryPanel: !state.bOpenedSummaryPanel
				}
			}
		case Actions.TOGGLE_MAP_VIEW:
			{
				return {
					...state, bOpenedMapView: !state.bOpenedMapView
				}
			}
		case Actions.OPEN_EMAIL_TO_CUSTOMER_DIALOG:
			{
				return {
					...state, bOpenEmailToCustomerDialog: action.payload
				}
			}
		case Actions.TOGGLE_FILTER_STATUS: {
			return {
				...state, transactionStatus: { ...state.transactionStatus, ...action.payload }
			}
		}
		case Actions.SELECT_LOCATION_FILTER: {
			return {
				...state, locationFilterValue: action.payload
			}
		}
		case Actions.APPLY_SEARCH_TEXT: {
			return {
				...state, searchText: action.payload
			}
		}
		case Actions.DELETE_SELECTED_CUSTOMERS:
			{
				return { ...state, customersDB: action.payload }

			}
		case Actions.REMOVE_SELECTED_CUSTOMER:
			{
				return { ...state, customersDB: action.payload }

			}
		case UserActions.USER_LOGGED_OUT:
			{
				return {
					...initialState
				}
			}
		case Actions.OPEN_NEW_CUSTOMER_FORM:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: false,
					customerForm: {
						type: 'new',
						props: {
							open: true
						},
						data: null
					}
				};
			}
		case Actions.CLOSE_NEW_CUSTOMER_FORM:
			{
				return {
					...state,
					customerForm: {
						type: 'new',
						props: {
							open: false
						},
						data: null
					}
				};
			}
		case Actions.OPEN_EDIT_CUSTOMER_FORM:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: false,
					bGetCustomerStart: false,
					customerForm: {
						type: 'edit',
						props: {
							open: true
						},
						data: action.payload.customer,
						findersFees: action.payload.findersFees,
						findersFeesConfig: action.payload.findersFeesConfig,
					},
					activeCustomer: action.payload.customer,
				};
			}
		case Actions.CLOSE_EDIT_CUSTOMER_FORM:
			{
				return {
					...state,
					customerForm: {
						type: 'edit',
						props: {
							open: false
						},
						data: null
					}
				};
			}
		case Actions.SET_FILTER_CUSTOMER_STATUSES:
			{
				return {
					...state,
					filters: {
						...state.filters,
						StatusNames: action.payload
					}
				};
			}
		case Actions.SET_CUSTOMER_FORM_FINDERS_FEES_DIALOG_PAYLOAD:
			{
				return {
					...state,
					customerFormFindersFeesDialogPayload: action.payload
				};
			}
		case Actions.FINDERS_FEE_CONFIGS:
			{
				return {
					...state,
					finderFeesConfigs: action.payload,
					isStartedFindersFeesConfigsFetching: false
				};
			}
		case Actions.FINDERS_FEE_CONFIGS_START:
			{
				return {
					...state,
					isStartedFindersFeesConfigsFetching: true
				};
			}
		case Actions.SET_FINDERS_FEES_CALCULATION_METHOD:
			{
				return {
					...state,
					findersFeesCalculationMethod: action.payload
				};
			}
		case Actions.GET_CUSTOMER_SERVICE_LIST:
			{
				return {
					...state,
					customerServiceForm: {
						...state.customerServiceForm,
						serviceList: {
							data: action.payload,
							isFetching: false
						}
					}
				};
			}
		case Actions.GET_CUSTOMER_SERVICE_LIST_START:
			{
				return {
					...state,
					customerServiceForm: {
						...state.customerServiceForm,
						serviceList: {
							...state.customerServiceForm.serviceList,
							isFetching: true
						}
					}
				};
			}
		case Actions.GET_CUSTOMER_COLLECTION_LIST:
			{
				return {
					...state,
					customerServiceForm: {
						...state.customerServiceForm,
						collectionList: {
							data: action.payload,
							isFetching: false
						}
					}
				};
			}
		case Actions.GET_CUSTOMER_COLLECTION_LIST_START:
			{
				return {
					...state,
					customerServiceForm: {
						...state.customerServiceForm,
						collectionList: {
							...state.customerServiceForm.collectionList,
							isFetching: true
						}
					}
				};
			}
		case Actions.GET_CUSTOMER_BILLING_LIST:
			{
				return {
					...state,
					customerServiceForm: {
						...state.customerServiceForm,
						billingList: {
							data: action.payload,
							isFetching: false
						}
					}
				};
			}
		case Actions.GET_CUSTOMER_BILLING_LIST_START:
			{
				return {
					...state,
					customerServiceForm: {
						...state.customerServiceForm,
						billingList: {
							...state.customerServiceForm.billingList,
							isFetching: true
						}
					}
				};
			}
		case Actions.SHOW_LOG_CALL_MODAL_FORM:
			{
				return {
					...state,
					logCallModalForm: {
						...state.logCallModalForm,
						open: action.payload,
					}
				};
			}

		case Actions.SHOW_SEND_EMAIL_MODAL_FORM:
			return {
				...state,
				contactForms: {
					...state.contactForms,
					emailModalForm: {
						...state.contactForms.emailModalForm,
						open: action.payload,
					}
				}
			};
		case Actions.SHOW_SEND_SMS_MODAL_FORM:
			return {
				...state,
				contactForms: {
					...state.contactForms,
					smsModalForm: {
						...state.contactForms.smsModalForm,
						open: action.payload,
					}
				}
			};
		case Actions.SHOW_SEND_PHONE_CALL_MODAL_FORM:
			return {
				...state,
				contactForms: {
					...state.contactForms,
					phoneCallModalForm: {
						...state.contactForms.phoneCallModalForm,
						open: action.payload,
					}
				}
			};
		case Actions.SHOW_SEND_CHAT_MODAL_FORM:
			return {
				...state,
				contactForms: {
					...state.contactForms,
					chatModalForm: {
						...state.contactForms.chatModalForm,
						open: action.payload,
					}
				}
			};


		// case Actions.GET_FINDERS_FEES_BY_CUSTOMER_NO_START:
		// 	{
		// 		return {
		// 			...state,
		// 			isStartedFindersFeesFetching: true
		// 		};
		// 	}
		// case Actions.GET_FINDERS_FEES_BY_CUSTOMER_NO:
		// 	{
		// 		return {
		// 			...state,
		// 			findersFees: action.payload,
		// 			isStartedFindersFeesFetching: false,
		// 		};
		// 	}


		default:
			{
				return state;
			}
	}
};

const persistConfig = {
	key: 'customers',
	storage: storage,
	blacklist: ['customersDB']
};
export default persistReducer(persistConfig, customers);
