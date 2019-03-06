import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import _ from 'lodash'

const CUSTOMER_CREATION_PAYLOAD = {
	Data: {
		"Latitude": 0.0,
		"Longitude": 0.0,
		"CPIBillingAppliedDate": "",
		"lastModified": "",
		"cleaning_start_time": "",
		"cleaning_instructions": "",
		"overpayment": 0.0,
		"billing_term": 0,
		"contract_lenght": 0,
		"needs_distribution_update": false,
		"last_action": "",
		"ebill_email": "",
		"billing_frequency": "",
		"accounttype_groupid": "",
		"account_typeid": "",
		"website": "",
		"susp_date": "",
		"wkndTF": "",
		"AssignedFranchisees": [],
		"AccountOfferings": [],
		"pmt_history": [],
		"sys_cust": 0,
		"company_no": "",
		"dlr_code": "",
		"cust_no": "",
		"cus_name": "",
		"cus_addr": "",
		"cus_city": "",
		"cus_county": "",
		"cus_state": "",
		"cus_zip": "",
		"cus_phone": "",
		"bill_name": "",
		"bill_addr": "",
		"bill_city": "",
		"bill_state": "",
		"bill_zip": "",
		"bill_name2": "",
		"bill_addr2": "",
		"bill_phone": "",
		"cus_name2": "",
		"cus_addr2": "",
		"class_type": "",
		"royalty": 0.0,
		"sales_tax": 0.0,
		"cont_1": "",
		"cont_2": "",
		"cont_bill": 0.0,
		"date_sign": "",
		"flag": "A",
		"misc_info": "",
		"misc_info2": "",
		"po_1": "",
		"slsmn_no": "",
		"add_on": "",
		"cont_tax": "",
		"exp_date": "",
		"cleantimes": 0,
		"cleanper": "",
		"firstfran": "",
		"firstdate": "",
		"secondfran": "",
		"seconddate": "",
		"crteinv": "",
		"prntpd": "",
		"tax_exempt": "",
		"canc_date": "",
		"canreason": "",
		"candescr": "",
		"callbdate": "",
		"cscallbdat": "",
		"ops_mgr": "",
		"cus_fax": "",
		"bill_fax": "",
		"cs_rep": "",
		"date_start": "",
		"date_offer": "",
		"mon": "",
		"tue": "",
		"wed": "",
		"thu": "",
		"fri": "",
		"sat": "",
		"sun": "",
		"email1": "",
		"email2": "",
		"ebill": "",
		"prntinv": "",
		"atrisk": "",
		"canentdat": "",
		"coll_rep": "",
		"inv_msg": "",
		"masteracct": "",
		"parent": 0,
		"xregionid": 0,
		"xsys_cust": 0,
		"cpiadj": "",
		"resume_d": "",
		"natacct": "",
		"cus_ext": "",
		"bill_ext": "",
		"sqr_ft": 0,
		"agreeused": "",
		"arstatus": "Normal",
		"arstatdate": "",
		"notes": "4",
		"claimstat": "",
		"business": 0.0,
		"add_pct": 0.0,
		"ad_cur": 0.0,
		"tech_pct": 0.0
	}

}
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
	locationFilterValueForFranchiseeList: {
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
	findersFees: [],
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
	activeFranchisee: {

	},
	activeFindersFee: {
		"_id": "",
		"RegionId": 0,
		"Status": "",
		"company_no": "",
		"dlr_code": "",
		"cust_no": "",
		"ff_seq": "",
		"ff_desc": "",
		"ff_amtfin": 0.0,
		"ff_amtpaid": 0.0,
		"ff_down": 0.0,
		"ff_dwnamt": 0.0,
		"ff_factor": 0.0,
		"ff_interes": 0.0,
		"ff_pyamt": 0.0,
		"ff_pybill": 0,
		"ff_pytotl": 0,
		"ff_dwnpd": "",
		"dwn_take": "",
		"add_on": "",
		"calc_fact": "",
		"ff_start": 0,
		"ff_year": 0,
		"ff_tot": 0.0,
		"ff_adjtot": 0.0,
		"ffcredit": 0.0,
		"ffduetot": 0.0,
		"ffcont": 0.0,
		"ff_balance": 0.0,
		"ff_hold": "",
		"fullbill": 0.0,
		"ff_holdmon": 0,
		"ff_holdyr": 0
	},

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
	findersFeeParams: {
		"RegionId": 1,
		"CalculationMethodCode": "",
		"FranchiseeNum": "",
		"CustomerNum": "",
		"AmountPayableOn": 0.0,
		"DownPaymentPercent": 0.0,
		"DownPaymentAmount": 0.0,
		"MonthlyPaymentPercent": 0.0,
		"MonthlyPaymentAmount": 0.0,
		"NumberOfPayments": 0,
		"AmountFinanced": 0.0,
		"FinderFeeTotal": 0.0,
		"Balance": 0.0,
		"MultiTenantOccupancy": 0.0
	},
	findersFeeTypes: null,
	assignedFranchisees: null,
	activeCustomerFranchisees: null,

	loading: {},

	cancelReasons: [],
	suspendReasons: [],
	transferReasons: [],

	computedFinderFee: {},
	finderFee: {},

	bUpdateCustomerStart: false,

	bTransferFranchiseeFtate: false,
	franchiseeToTransfer: {
		new: null,
		old: null,
	},
	snack: {
		open: false,
		icon: "error",
		message: "",
		vertical: "bottom",
		horizontal: 'center',
		duration: 3000,
	},
	transferParam: {
		reason: '',
		notes: '',
		transfer_fee: ''
	}
};


const customers = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_CUSTOMERS:
			{
				return {
					...state,
					customersDB: action.payload.allCustomers,
					cancelReasons: action.payload.cancelReasons,
					suspendReasons: action.payload.suspendReasons,
					transferReasons: action.payload.transferReasons,
					bLoadedCustomers: true,
					bCustomerFetchStart: false,
					loading: {
						...state.loading,
						bCustomerFetchStart: "",
					}
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
				const regionId = action.payload.regionId
				let newCustomer = action.payload.newCustomer.Data
				// newCustomer.AccountTypeListId= ""
				// newCustomer.AccountTypeListName= ""
				newCustomer.Address = newCustomer.cus_addr
				newCustomer.Amount = newCustomer.cont_bill
				newCustomer.Atrisk = "Normal"
				newCustomer.City = newCustomer.cus_city
				newCustomer.CreatedBy = null
				newCustomer.CustomerId = newCustomer._id
				newCustomer.CustomerName = newCustomer.cus_name
				newCustomer.CustomerNo = newCustomer.cust_no
				// newCustomer.InvoiceDayPreference= "BOM"
				// newCustomer.Latitude= 37.4855107
				// newCustomer.LogMessage= null
				// newCustomer.Longitude= -122.1822702
				// newCustomer.OverPayment= 0
				// newCustomer.PaymentTerm= 30
				newCustomer.Phone = newCustomer.cus_phone
				newCustomer.PostalCode = newCustomer.cus_zip
				// newCustomer.Radius= 0
				newCustomer.RegionName = "BUF"
				newCustomer.StateName = newCustomer.cus_state
				newCustomer.StatusName = "A"



				const oldRegions = state.customersDB.Data.Regions

				const regions = oldRegions.filter(x => x.Id == regionId)
				let curRegionIndex = 0
				if (regions && regions.length > 0) {
					curRegionIndex = oldRegions.indexOf(regions[0])
				}
				const curRegion = oldRegions[curRegionIndex]

				const newRegion = {
					...curRegion,
					CustomerList: [newCustomer, ...curRegion.CustomerList]
				}

				oldRegions[curRegionIndex] = newRegion

				return {
					...state,
					customersDB: {
						...state.customersDB,
						Data: {
							...state.customersDB.Data,
							Regions: oldRegions
						}
					},

					createCustomerResponse: action.payload,
					bCreateCustomerStart: false,
					loading: {
						...state.loading,
						bCreateCustomerStart: "",
					},
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
					loading: {
						...state.loading,
						bCreateCustomerStart: "Creating new customer...",
					},
				}
			}
		case Actions.UPDATE_CUSTOMER:
			{
				return {
					...state,
					activeCustomer: action.payload,
					bUpdateCustomerStart: false,
					loading: {
						...state.loading,
						bUpdateCustomerStart: "",
					},
				}
			}
		case Actions.UPDATE_CUSTOMER_START:
			{
				return {
					...state,
					bUpdateCustomerStart: true,
					loading: {
						...state.loading,
						bUpdateCustomerStart: "Updating customer...",
					},
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
					bCustomerFetchStart: true,
					loading: {
						...state.loading,
						bCustomerFetchStart: "Fetching all customer data...",
					},
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
		case Actions.SELECT_LOCATION_FILTER_FRANCHISEE_LIST: {
			return {
				...state, locationFilterValueForFranchiseeList: action.payload
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
					activeStep: 0,
					franchieesesToOffer: [],
					bTransferFranchiseeFtate: false,
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
					},
					activeCustomer: null,
				};
			}
		case Actions.OPEN_EDIT_CUSTOMER_FORM:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: false,
					bGetCustomerStart: false,
					loading: {
						...state.loading,
						bGetCustomerStart: "",
					},
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
					findersFees: action.payload.findersFees,
					activeStep: 0,
					franchieesesToOffer: [],
					bTransferFranchiseeFtate: false,
				};
			}
		case Actions.STOP_FINDERS_FEES:
			{
				return {
					...state,
					findersFees: action.payload,
					bFindersFeesStart: false,
					loading: {
						...state.loading,
						bFindersFeesStart: "",
					},
				};
			}
		case Actions.STOP_FINDERS_FEES_START:
			{
				return {
					...state,
					bFindersFeesStart: true,
					loading: {
						...state.loading,
						bFindersFeesStart: "Fetching finders fee data...",
					},
				};
			}
		case Actions.UPDATE_CUSTOMER:
			{
				return {
					...state,
					activeCustomer: action.payload,
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
				loading: {
					...state.loading,
					bGetCustomerStart: "",
				},
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
					loading: {
						...state.loading,
						bGetCustomerStart: "Fetching customer data...",
					},
				}
			}

		case Actions.GET_CUSTOMER:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: false,
					bGetCustomerStart: false,
					loading: {
						...state.loading,
						bGetCustomerStart: "",
					},
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
					},
					activeCustomer: null,
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
					isStartedFindersFeesConfigsFetching: false,
					loading: {
						...state.loading,
						isStartedFindersFeesConfigsFetching: "",
					},
				};
			}
		case Actions.FINDERS_FEE_CONFIGS_START:
			{
				return {
					...state,
					isStartedFindersFeesConfigsFetching: true,
					loading: {
						...state.loading,
						isStartedFindersFeesConfigsFetching: "Fetching finders fees configuration data...",
					},
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
					},
					loading: {
						...state.loading,
						bFetchingServiceList: "",
					},
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
					},
					loading: {
						...state.loading,
						bFetchingServiceList: "Fetching customer service list...",
					},
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
					},
					loading: {
						...state.loading,
						bFetchingCollectionList: "",
					},
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
					},
					loading: {
						...state.loading,
						bFetchingCollectionList: "Fetching collection list...",
					},
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
					},
					loading: {
						...state.loading,
						bFetchingBillingList: "",
					},
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
					},
					loading: {
						...state.loading,
						bFetchingBillingList: "Fetching billing list...",
					},
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
				},
				loading: {
					...state.loading,
					bCustomerServiceCreate: "",
				},
			};
		case Actions.CUSTOMER_SERVICE_CREATE_START:
			return {
				...state,
				flags: {
					...state.flags,
					isCustomerServiceCreate: true
				},
				loading: {
					...state.loading,
					bCustomerServiceCreate: "Creating customer service...",
				},
			};

		case Actions.CUSTOMER_COLLECTION_CREATE:
			return {
				...state,
				flags: {
					...state.flags,
					isCustomerCollectionCreate: false
				},
				loading: {
					...state.loading,
					bCustomerCollectionCreate: "",
				},
			};
		case Actions.CUSTOMER_COLLECTION_CREATE_START:
			return {
				...state,
				flags: {
					...state.flags,
					isCustomerCollectionCreate: true
				},
				loading: {
					...state.loading,
					bCustomerCollectionCreate: "Creating customer collection...",
				},
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
		case Actions.SAVE_CANCEL_CONTRACT_START:
			return {
				...state,
				loading: {
					...state.loading,
					bSaveCancelContract: "Canceling contract...",
				},
			};
		case Actions.SAVE_CANCEL_CONTRACT:
			return {
				...state,
				loading: {
					...state.loading,
					bSaveCancelContract: "",
				},
				activeCustomer: action.payload,
			};
		case Actions.SAVE_SUSPEND_CONTRACT_START:
			return {
				...state,
				loading: {
					...state.loading,
					bSaveSuspendContract: "Suspending contract...",
				},
			};
		case Actions.SAVE_SUSPEND_CONTRACT:
			return {
				...state,
				loading: {
					...state.loading,
					bSaveSuspendContract: "",
				},
				activeCustomer: action.payload,
			};
		case Actions.GET_COMPUTED_FINDER_FEE:
			return {
				...state,
				computedFinderFee: {
					...state.computedFinderFee,
					[action.payload.FranchiseeNum]: action.payload
				}
			};
		case Actions.GET_FINDER_FEE:
			return {
				...state,
				finderFee: {
					...state.finderFee,
					[action.payload._id]: action.payload
				}
			};
		case Actions.SET_ACTIVE_FINDERS_FEE:
			return {
				...state,
				activeFindersFee: action.payload
			};
		case Actions.SET_ACTIVE_FRANCHISEE:
			return {
				...state,
				activeFranchisee: action.payload
			};
		case Actions.SET_TRANSFER_FRANCHISEE_STATE:
			return {
				...state,
				bTransferFranchiseeFtate: action.payload
			};
		case Actions.SET_FRANCHISEE_TO_TRANSFER:
			return {
				...state,
				franchiseeToTransfer: {
					...state.franchiseeToTransfer,
					[action.payload.key]: action.payload.value
				}
			};
		case Actions.OPEN_SNACK_BAR:
			return {
				...state,
				snack: {
					...state.snack,
					...action.payload,
				}
			};
		case Actions.CLOSE_SNACK_BAR:
			return {
				...state,
				snack: {
					...state.snack,
					open: false,
				}
			};
		case Actions.TRANSFER_ASSIGNED_FRANCHISEE_START:
			return {
				...state,
				loading: {
					...state.loading,
					bTransferAssignedFranchiseeStart: "Transfering franchisee...",
				},
			};
		case Actions.TRANSFER_ASSIGNED_FRANCHISEE:
			return {
				...state,
				loading: {
					...state.loading,
					bTransferAssignedFranchiseeStart: "",
				},
				activeCustomer: action.payload,
			};
		case Actions.SET_TRANSFER_PARAM:
			return {
				...state,
				transferParam: {
					...state.transferParam,
					[action.payload.key]: action.payload.value,
				},
			};
		case Actions.EXPAND_COLLAPSE_GROUPING:
			return {
				...state,
				isExpandedGrouping: action.payload,
			};
		case Actions.SHOW_FRANCHISEE_LOCATION_FILTER_IN_ACCOUNT_OFFERING:
			return {
				...state,
				showFranchiseeLocationFilterInAccountOffering: action.payload,
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
