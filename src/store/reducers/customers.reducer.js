import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import _ from 'lodash'

const CUSTOMER_CREATION_PAYLOAD = { Data: { "Latitude": "", "Longitude": "", "CPIBillingAppliedDate": "", "lastModified": "", "cleaning_start_time": "", "cleaning_instructions": "", "overpayment": "", "billing_term": "", "contract_lenght": "", "AssignedFranchisees": [], "AccountOfferings": [], "pmt_history": [], "sys_cust": "", "company_no": "", "dlr_code": "", "cust_no": null, "cus_name": "", "cus_addr": "", "cus_city": "", "cus_county": "", "cus_state": "", "cus_zip": "", "cus_phone": "", "bill_name": "", "bill_addr": "", "bill_city": "", "bill_state": "", "bill_zip": "", "bill_name2": "", "bill_addr2": "", "bill_phone": "", "cus_name2": "", "cus_addr2": "", "class_type": "", "royalty": "", "sales_tax": "", "cont_1": "", "cont_2": "", "cont_bill": "", "date_sign": "", "flag": "", "misc_info": "", "misc_info2": "", "po_1": "", "slsmn_no": "", "add_on": "", "cont_tax": "", "exp_date": "", "cleantimes": "", "cleanper": "", "firstfran": "", "firstdate": "", "secondfran": "", "seconddate": "", "crteinv": "", "prntpd": "", "tax_exempt": "", "canc_date": "", "canreason": "", "candescr": "", "callbdate": "", "cscallbdat": "", "ops_mgr": "", "cus_fax": "", "bill_fax": "", "cs_rep": "", "date_start": "", "date_offer": "", "mon": "", "tue": "", "wed": "", "thu": "", "fri": "", "sat": "", "sun": "", "email1": "", "email2": "", "ebill": "", "prntinv": "", "atrisk": "", "canentdat": "", "coll_rep": "", "inv_msg": "", "masteracct": "", "parent": "", "xregionid": "", "xsys_cust": "", "cpiadj": "", "resume_d": "", "natacct": "", "cus_ext": "", "bill_ext": "", "sqr_ft": "", "agreeused": "", "arstatus": "", "arstatdate": "", "notes": "", "claimstat": "", "business": "", "add_pct": "", "ad_cur": "", "tech_pct": "", "last_action": "", "needs_distribution_update": "" } }
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
		isOpenFilterPanel: false,
		isOpenSummaryPanel: false,
		open: false,

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
		Data: {}
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
		"Latitude": "", "Longitude": "", "CPIBillingAppliedDate": "", "lastModified": "", "cleaning_start_time": "", "cleaning_instructions": "", "overpayment": "", "billing_term": "", "contract_lenght": "",
		"AssignedFranchisees": [
			// {
			// 	"FranchiseeNumber": "",
			// 	"FranchiseeName": "",
			// 	"Id": "",
			// 	"FinderFeeId": "",
			// 	"Status": "",
			// 	"AssignedDate": "",
			// 	"MonthlyBilling": [
			// 		{
			// 			"EscrowBilling": "",
			// 			"Status": "",
			// 			"BillingFrequency": "",
			// 			"BillingTypeServiceId": "",
			// 			"BillingTypeId": "",
			// 			"Description": "",
			// 			"MonthlyBilling": ""
			// 		},
			// 	],
			// 	"CreatedById": ""
			// },
		],
		"AccountOfferings": [
			// {
			// 	"FranchiseeNumber": "",
			// 	"FranchiseeName": "",
			// 	"Type": "",
			// 	"Response": "",
			// 	"OfferDate": "",
			// 	"ReplyDeadlineDateTime": "",
			// 	"ResponseDate": "",
			// 	"AssignedDate": "",
			// 	"MonthlyBillingOffered": "",
			// 	"CreatedById": ""
			// },
		],
		"pmt_history": [
			// {
			// 	"PaymentType": "",
			// 	"ReferenceNo": "",
			// 	"PaymentDate": "",
			// 	"Note": "",
			// 	"Amount": "",
			// 	"AmountApplied": "",
			// 	"PayItems": [
			// 		{
			// 			"InvoiceNo": "",
			// 			"Amount": ""
			// 		},
			// 	]
			// },
		],
		"sys_cust": "", "company_no": "", "dlr_code": "", "cust_no": null, "cus_name": "", "cus_addr": "", "cus_city": "", "cus_county": "", "cus_state": "", "cus_zip": "", "cus_phone": "", "bill_name": "", "bill_addr": "", "bill_city": "", "bill_state": "", "bill_zip": "", "bill_name2": "", "bill_addr2": "", "bill_phone": "", "cus_name2": "", "cus_addr2": "", "class_type": "", "royalty": "", "sales_tax": "", "cont_1": "", "cont_2": "", "cont_bill": "", "date_sign": "", "flag": "", "misc_info": "", "misc_info2": "", "po_1": "", "slsmn_no": "", "add_on": "", "cont_tax": "", "exp_date": "", "cleantimes": "", "cleanper": "", "firstfran": "", "firstdate": "", "secondfran": "", "seconddate": "", "crteinv": "", "prntpd": "", "tax_exempt": "", "canc_date": "", "canreason": "", "candescr": "", "callbdate": "", "cscallbdat": "", "ops_mgr": "", "cus_fax": "", "bill_fax": "", "cs_rep": "", "date_start": "", "date_offer": "", "mon": "", "tue": "", "wed": "", "thu": "", "fri": "", "sat": "", "sun": "", "email1": "", "email2": "", "ebill": "", "prntinv": "", "atrisk": "", "canentdat": "", "coll_rep": "", "inv_msg": "", "masteracct": "", "parent": "", "xregionid": "", "xsys_cust": "", "cpiadj": "", "resume_d": "", "natacct": "", "cus_ext": "", "bill_ext": "", "sqr_ft": "", "agreeused": "", "arstatus": "", "arstatdate": "", "notes": "", "claimstat": "", "business": "", "add_pct": "", "ad_cur": "", "tech_pct": "", "last_action": "", "needs_distribution_update": "",
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
					activeCustomer: CUSTOMER_CREATION_PAYLOAD,
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
		case Actions.OPEN_EDIT_CUSTOMER_SERVICE_FORM:
			return {
				...state,
				customerServiceForm: {
					...state.customerServiceForm,
					open: true,
					isOpenFilterPanel: true,
					isOpenSummaryPanel: false,
					activeCustomer: action.payload.customer,
				},
				bGetCustomerStart: false,
			};
		case Actions.CLOSE_CUSTOMER_SERVICE_FORM:
			{
				return {
					...state,
					customerServiceForm: {
						...state.customerServiceForm,
						open: false,
						activeCustomer: null,
					},
				};
			}
		case Actions.GET_CUSTOMER_START:
			{
				return {
					...state,
					bGetCustomerStart: true,
				}
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
				activeCustomer: {
					...state.activeCustomer,
					Data: {
						...state.activeCustomer.Data,
						[action.payload.name]: action.payload.value
					}
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
