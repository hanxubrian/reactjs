import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import _ from 'lodash'

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
	accountTypesGroups: null,

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
		emailModalForm: { open: false },
		smsModalForm: { open: false },
		phoneCallModalForm: { open: false },
		chatModalForm: { open: false },
	},
	lists: {
		customerServiceTypes: [],
		franchiseeBillingTypes: [],
		franchiseeServiceTypes: [],
	},
	activeCustomer: {
	},
	flags: {
		isCustomerServiceCreate: false,
		isCustomerCollectionCreate: false,
	},
	franchieesAssignModalForm: {
		open: false,
	},
	franchieesesToOffer: [],
	increaseDecreaseContractModalForm: {
		open: false,
	},
	cancelContractPage: {
		open: false,
	},
	suspendContractPage: {
		open: false,
	},
	NewAmount: '',
	activeStep: 0,
	serviceAgreementStep: 0,
	increase_decrease: null,
	findersFeeComputed: null,
	findersFeeParams: null,
	findersFeeTypes: null,
	assignedFranchisees: null,
	activeCustomerFranchisees: null,

	newCustomerParam: {
		"_id": "sample string 1",
		"Latitude": 2.1,
		"Longitude": 3.1,
		"CPIBillingAppliedDate": "sample string 4",
		"lastModified": "2019-02-19T09:08:43.8991538-06:00",
		"cleaning_start_time": "2019-02-19T09:08:43.8991538-06:00",
		"cleaning_instructions": "sample string 7",
		"overpayment": 8.1,
		"billing_term": 9,
		"contract_lenght": 10,
		"AssignedFranchisees": [
			{
				"FranchiseeNumber": "sample string 1",
				"FranchiseeName": "sample string 2",
				"Id": "sample string 3",
				"FinderFeeId": "sample string 4",
				"Status": "sample string 5",
				"AssignedDate": "sample string 6",
				"MonthlyBilling": [
					{
						"EscrowBilling": true,
						"Status": "sample string 2",
						"BillingFrequency": "sample string 3",
						"BillingTypeServiceId": "sample string 4",
						"BillingTypeId": "sample string 5",
						"Description": "sample string 6",
						"MonthlyBilling": 7.1
					},
					{
						"EscrowBilling": true,
						"Status": "sample string 2",
						"BillingFrequency": "sample string 3",
						"BillingTypeServiceId": "sample string 4",
						"BillingTypeId": "sample string 5",
						"Description": "sample string 6",
						"MonthlyBilling": 7.1
					}
				],
				"CreatedById": 7
			},
			{
				"FranchiseeNumber": "sample string 1",
				"FranchiseeName": "sample string 2",
				"Id": "sample string 3",
				"FinderFeeId": "sample string 4",
				"Status": "sample string 5",
				"AssignedDate": "sample string 6",
				"MonthlyBilling": [
					{
						"EscrowBilling": true,
						"Status": "sample string 2",
						"BillingFrequency": "sample string 3",
						"BillingTypeServiceId": "sample string 4",
						"BillingTypeId": "sample string 5",
						"Description": "sample string 6",
						"MonthlyBilling": 7.1
					},
					{
						"EscrowBilling": true,
						"Status": "sample string 2",
						"BillingFrequency": "sample string 3",
						"BillingTypeServiceId": "sample string 4",
						"BillingTypeId": "sample string 5",
						"Description": "sample string 6",
						"MonthlyBilling": 7.1
					}
				],
				"CreatedById": 7
			}
		],
		"AccountOfferings": [
			{
				"FranchiseeNumber": "sample string 1",
				"FranchiseeName": "sample string 2",
				"Type": "sample string 3",
				"Response": "sample string 4",
				"OfferDate": "sample string 5",
				"ReplyDeadlineDateTime": "sample string 6",
				"ResponseDate": "sample string 7",
				"AssignedDate": "sample string 8",
				"MonthlyBillingOffered": 9.1,
				"CreatedById": 10
			},
			{
				"FranchiseeNumber": "sample string 1",
				"FranchiseeName": "sample string 2",
				"Type": "sample string 3",
				"Response": "sample string 4",
				"OfferDate": "sample string 5",
				"ReplyDeadlineDateTime": "sample string 6",
				"ResponseDate": "sample string 7",
				"AssignedDate": "sample string 8",
				"MonthlyBillingOffered": 9.1,
				"CreatedById": 10
			}
		],
		"pmt_history": [
			{
				"PaymentType": "sample string 1",
				"ReferenceNo": "sample string 2",
				"PaymentDate": "2019-02-19T09:08:43.8991538-06:00",
				"Note": "sample string 4",
				"Amount": 5.1,
				"AmountApplied": 6.1,
				"PayItems": [
					{
						"InvoiceNo": "sample string 1",
						"Amount": 2.1
					},
					{
						"InvoiceNo": "sample string 1",
						"Amount": 2.1
					}
				]
			},
			{
				"PaymentType": "sample string 1",
				"ReferenceNo": "sample string 2",
				"PaymentDate": "2019-02-19T09:08:43.8991538-06:00",
				"Note": "sample string 4",
				"Amount": 5.1,
				"AmountApplied": 6.1,
				"PayItems": [
					{
						"InvoiceNo": "sample string 1",
						"Amount": 2.1
					},
					{
						"InvoiceNo": "sample string 1",
						"Amount": 2.1
					}
				]
			}
		],
		"sys_cust": 11,
		"company_no": "sample string 12",
		"dlr_code": "sample string 13",
		"cust_no": "sample string 14",
		"cus_name": "sample string 15",
		"cus_addr": "sample string 16",
		"cus_city": "sample string 17",
		"cus_county": "sample string 18",
		"cus_state": "sample string 19",
		"cus_zip": "sample string 20",
		"cus_phone": "sample string 21",
		"bill_name": "sample string 22",
		"bill_addr": "sample string 23",
		"bill_city": "sample string 24",
		"bill_state": "sample string 25",
		"bill_zip": "sample string 26",
		"bill_name2": "sample string 27",
		"bill_addr2": "sample string 28",
		"bill_phone": "sample string 29",
		"cus_name2": "sample string 30",
		"cus_addr2": "sample string 31",
		"class_type": "sample string 32",
		"royalty": 33.1,
		"sales_tax": 34.1,
		"cont_1": "sample string 35",
		"cont_2": "sample string 36",
		"cont_bill": 37.1,
		"date_sign": "sample string 38",
		"flag": "sample string 39",
		"misc_info": "sample string 40",
		"misc_info2": "sample string 41",
		"po_1": "sample string 42",
		"slsmn_no": "sample string 43",
		"add_on": "sample string 44",
		"cont_tax": "sample string 45",
		"exp_date": "sample string 46",
		"cleantimes": 47,
		"cleanper": "sample string 48",
		"firstfran": "sample string 49",
		"firstdate": "sample string 50",
		"secondfran": "sample string 51",
		"seconddate": "sample string 52",
		"crteinv": "sample string 53",
		"prntpd": "sample string 54",
		"tax_exempt": "sample string 55",
		"canc_date": "sample string 56",
		"canreason": "sample string 57",
		"candescr": "sample string 58",
		"callbdate": "sample string 59",
		"cscallbdat": "sample string 60",
		"ops_mgr": "sample string 61",
		"cus_fax": "sample string 62",
		"bill_fax": "sample string 63",
		"cs_rep": "sample string 64",
		"date_start": "sample string 65",
		"date_offer": "sample string 66",
		"mon": "sample string 67",
		"tue": "sample string 68",
		"wed": "sample string 69",
		"thu": "sample string 70",
		"fri": "sample string 71",
		"sat": "sample string 72",
		"sun": "sample string 73",
		"email1": "sample string 74",
		"email2": "sample string 75",
		"ebill": "sample string 76",
		"prntinv": "sample string 77",
		"atrisk": "sample string 78",
		"canentdat": "sample string 79",
		"coll_rep": "sample string 80",
		"inv_msg": "sample string 81",
		"masteracct": "sample string 82",
		"parent": 83,
		"xregionid": 84,
		"xsys_cust": 85,
		"cpiadj": "sample string 86",
		"resume_d": "sample string 87",
		"natacct": "sample string 88",
		"cus_ext": "sample string 89",
		"bill_ext": "sample string 90",
		"sqr_ft": 91,
		"agreeused": "sample string 92",
		"arstatus": "sample string 93",
		"arstatdate": "sample string 94",
		"notes": "sample string 95",
		"claimstat": "sample string 96",
		"business": 97.1,
		"add_pct": 98.1,
		"ad_cur": 99.1,
		"tech_pct": 100.1
	}
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
		case Actions.UPDATE_CUSTOMERS_PARAMETERS:
			{
				return {
					...state,
					[action.payload.name]: action.payload.value
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
					},
					activeCustomer: null,
					activeStep: 0
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
		case Actions.GET_CUSTOMER:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: false,
					bGetCustomerStart: false,
					customerForm: {
						...state.customerForm,
						data: action.payload,
					},
					activeCustomer: action.payload,
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
		case Actions.GET_LOG_CALL_CUSTOMER_SERVICE_TYPES:
			return {
				...state,
				lists: {
					...state.lists,
					customerServiceTypes: action.payload,

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

		case Actions.CUSTOMER_SERVICE_CREATE:
			return {
				...state,
				flags: {
					...state.flags,
					isCustomerServiceCreate: false
				}
			};
		case Actions.CUSTOMER_SERVICE_CREATE_START:
			return {
				...state,
				flags: {
					...state.flags,
					isCustomerServiceCreate: true
				}
			};

		case Actions.CUSTOMER_COLLECTION_CREATE:
			return {
				...state,
				flags: {
					...state.flags,
					isCustomerCollectionCreate: false
				}
			};
		case Actions.CUSTOMER_COLLECTION_CREATE_START:
			return {
				...state,
				flags: {
					...state.flags,
					isCustomerCollectionCreate: true
				}
			};
		case Actions.SET_FRANCHIEESES_TO_OFFER:
			return {
				...state,
				franchieesesToOffer: action.payload
			};
		case Actions.SHOW_FRANCHIEES_ASSIGN_MODAL_FORM:
			return {
				...state,
				franchieesAssignModalForm: {
					...state.franchieesAssignModalForm,
					open: action.payload
				}
			};


		case Actions.GET_FRANCHISEE_SERVICE_TYPES:
			return {
				...state,
				lists: {
					...state.lists,
					franchiseeServiceTypes: action.payload,

				}
			};
		case Actions.GET_FRANCHISEE_BILLING_TYPES:
			return {
				...state,
				lists: {
					...state.lists,
					franchiseeBillingTypes: action.payload,

				}
			};

		case Actions.SHOW_INCREASE_DECREASE_CONTRACT_MODAL_FORM:
			return {
				...state,
				increaseDecreaseContractModalForm: {
					...state.increaseDecreaseContractModalForm,
					open: action.payload,
				}
			};
		case Actions.SHOW_CANCEL_CONTRACT_PAGE:
			return {
				...state,
				cancelContractPage: {
					...state.cancelContractPage,
					open: action.payload,
				}
			};
		case Actions.SHOW_SUSPEND_CONTRACT_PAGE:
			return {
				...state,
				suspendContractPage: {
					...state.suspendContractPage,
					open: action.payload,
				}
			};
		case Actions.GET_INCREASE_DECREASE:
			return {
				...state,
				increase_decrease: action.payload
			};
		case Actions.GET_COMPUTED_FINDERS_FEE:
			return {
				...state,
				findersFeeComputed: action.payload
			};
		case Actions.UPDATE_FINDERS_FEE_PARAMS_FOR_COMPUTED:
			return {
				...state,
				findersFeeParams: { ...state.findersFeeParams, ...action.payload }
			};
		case Actions.GET_FINDERS_FEE_TYPES:
			return {
				...state,
				findersFeeTypes: action.payload
			};
		case Actions.UPDATE_ASSIGNED_FRANCHISEE:
			return {
				...state,
				assignedFranchisees: action.payload
			};
		case Actions.UPDATE_ACTIVE_CUSTOMER_ASSIGNED_FRANCHISEES:
			let data = _.cloneDeep(state.activeCustomer);
			data.Data.AssignedFranchisees = action.payload;
			return {
				...state,
				activeCustomer: data
			};
		case Actions.UPDATE_NEW_CUSTOMER_PARAM:
			return {
				...state,
				newCustomerParam: {
					...state.newCustomerParam,
					[action.payload.name]: action.payload.value
				}
			};
		default:
			{
				return state;
			}
	}
};

const persistConfig = {
	key: 'customers',
	storage: storage,
	blacklist: ['customersDB, activeCustomer']
};
export default persistReducer(persistConfig, customers);
