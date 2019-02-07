import axios from "axios";
import {invoiceService} from "../../services"

export const GET_ALL_INVOICES = "[INVOICES] GETS ALL";
export const GET_ALL_INVOICES_ERR = "[INVOICES] GETS ALL ERROR";
export const CLOSE_INVOICE_ERROR_DIALOG = "[INVOICES] CLOSE INVOICE ERROR DIALOG";
export const GET_INVOICE_STATUS = "[INVOICES] GETS INVOICE STATUS";
export const GET_INVOICE_DETAIL = "[INVOICES] GETS INVOICE DETAIL";

export const GET_INVOICE_DETAIL_START = "[INVOICES] GETS INVOICE DETAIL START";
export const GET_INVOICE_DETAIL_FAILD = "[INVOICES] GETS INVOICE DETAIL FAILD";

export const GET_INVOICES_FETCH_START = "[INVOICES] GETS STARTED FETCH";
export const DELETE_SELECTED_INVOICES = "[INVOICES] DELETE SELECTED";
export const REMOVE_SELECTED_INVOICE = "[INVOICE] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[INVOICES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[INVOICES] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[INVOICES] TOGGLE FILTER PANEL";
export const UPDATE_FROM_DATE_INVOICE = "[INVOICES] UPDATE FROM DATE";
export const UPDATE_TO_DATE_INVOICE = "[INVOICES] UPDATE TO DATE";
export const GET_CUSTOMER_TAX_AMOUNT = "[INVOICES] GET CUSTOMER TAX AMOUNT";
export const UPDATE_INVOICE_PERIOD_OPTION = "[INVOICES] UPDATE PERIOD OPTION";
export const SELECT_INVOICE_CUSTOMER = "[INVOICES] SELECT CUSTOMER";
export const RESET_INVOICE_FORM = "[INVOICES] RESET INVOICE FORM";
export const STARTING_SAVE_INVOICE_FORM_DATA = "[INVOICES] STARTING SAVE INVOICE FORM DATA";
export const GET_ALL_SUGGEST_CUSTOMERS = "[INVOICES] GET ALL SUGGEST CUSTOMERS";
export const GET_ALL_SUGGEST_CUSTOMERS_ERROR = "[INVOICES] GET ALL SUGGEST CUSTOMERS ERROR";
export const CLOSE_CUSTOMER_ERROR_DIALOG = "[INVOICES] CLOSE CUSTOMER ERROR DIALOG";
export const GET_SUGGEST_CUSTOMERS_FETCH_START = "[INVOICES] GET SUGGEST CUSTOMERS FETCH START";
export const GET_BILLING_LIST = "[INVOICES] GET BILLING LIST";
export const GET_SERVICE_LIST = "[INVOICES] GET SERVICE LIST";
export const UPDATE_AN_INVOICE = "[INVOICES] UPDATE AN INVOICE";
export const OPEN_PAYMENT_INVOICE_FORM = "[INVOICES] OPEN PAYMENT INVOICE FORM";
export const CLOSE_PAYMENT_INVOICE_FORM = "[INVOICES] CLOSE PAYMENT INVOICE FORM";
export const OPEN_CREDIT_INVOICE_FORM = "[INVOICES] OPEN CREDIT INVOICE FORM";
export const CLOSE_CREDIT_INVOICE_FORM = "[INVOICES] CLOSE CREDIT INVOICE FORM";

// for Add/Edit
export const OPEN_NEW_INVOICE_FORM = '[INVOICES APP] OPEN NEW INVOICE FORM';
export const CLOSE_NEW_INVOICE_FORM = '[INVOICES APP] CLOSE NEW INVOICE FORM';
export const OPEN_EDIT_INVOICE_FORM = '[INVOICES APP] OPEN EDIT INVOICE FORM';
export const CLOSE_EDIT_INVOICE_FORM = '[INVOICES APP] CLOSE EDIT INVOICE FORM';
export const ADD_INVOICE = '[INVOICES APP] ADD INVOICE';
export const UPDATED_INVOICES = '[INVOICES APP] UPDATED INVOICES';
export const UPDATE_INVOICE_STATUS = '[INVOICES APP] UPDATE INVOICE STATUS';
export const UPDATE_INVOICE_LINE = '[INVOICES APP] UPDATE INVOICE LINE';
export const UPDATE_INVOICE_DATE_OPTION = '[INVOICES APP] UPDATE INVOICE DATE OPTION';

//for Vendor
export const GET_INVOICE_VENDOR_LIST = '[INVOICES APP] GET INVOICE VENDOR LIST';
export const OPEN_INVOICE_VENDOR_DIALOG_BOX = '[INVOICES APP] OPEN INVOICE VENDOR DIALOG BOX';
export const CLOSE_INVOICE_VENDOR_DIALOG_BOX = '[INVOICES APP] CLOSE INVOICE VENDOR DIALOG BOX';
export const UPDATE_INVOICE_VENDOR_ID = '[INVOICES APP] UPDATE INVOICE VENDOR_ID';


export function getInvoices(RegionId, StatusId, FromDate, ToDate, PeriodId,OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText) {
    if(ToDate==="") {
        ToDate = new Date();
    }
    return (dispatch) => {

        dispatch({
            type: GET_INVOICES_FETCH_START,
            payload: true
        });

        (async () => {
            let res = await invoiceService.getInvoiceList(RegionId, StatusId, FromDate, ToDate, PeriodId, OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_INVOICES,
                    payload: res
                });
            } else {
                dispatch({
                    type: GET_ALL_INVOICES_ERR,
                    payload: res.message
                });
            }
        })();
    };
}

export function getInvoiceDetail(InvoiceId,RegionId) {
    return (dispatch) => {

        dispatch({
            type: GET_INVOICE_DETAIL_START,
        });
       (async () => {
            let res = await invoiceService.getInvoiceDetailList(InvoiceId,RegionId);
            if (res.success ) {
                dispatch({
                    type: GET_INVOICE_DETAIL,
                    payload: res
                });
            } else {
                dispatch({
                    type: GET_INVOICE_DETAIL_FAILD,
                    payload: "Failed",
                });
            }
        })();
    };
}

export function getInvoiceStatus(RegionId) {
    return (dispatch) => {
       (async () => {
            let res = await invoiceService.getInvoiceStatusList(RegionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_INVOICE_STATUS,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function toggleFilterPanel(){
    return {
        type: TOGGLE_FILTER_PANEL
    }
}

export function toggleSummaryPanel(){
    return {
        type: TOGGLE_SUMMARY_PANEL
    }
}

export function toggleStatus(key, status){
    return {
        type: TOGGLE_FILTER_STATUS,
        payload: {[key]: status}
    }
}

export function updateInvoiceStatus(newStatus){
    return {
        type: UPDATE_INVOICE_STATUS,
        payload: newStatus
    }
}

export function deleteInvoices(keys, invoices) {
    return dispatch => {
        const request = axios.post("/api/invoices/delete", { ids: keys, invoices: invoices });

        return request.then(response => {
            return dispatch({
                type: DELETE_SELECTED_INVOICES,
                payload: response.data
            });
        });
    };
}

export function removeInvoice(regionId, id) {
    return (dispatch) => {
        (async () => {
            let res = await invoiceService.deleteInvoice(regionId, id);
            if (res.IsSuccess) {
                dispatch({
                    type: REMOVE_SELECTED_INVOICE,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function openNewInvoiceForm()
{
    return {
        type: OPEN_NEW_INVOICE_FORM
    }
}

export function closeNewInvoiceForm()
{
    return {
        type: CLOSE_NEW_INVOICE_FORM
    }
}

export function openEditInvoiceForm(invoiceId, regionId)
{
    return (dispatch) => {
        dispatch({
            type: GET_INVOICES_FETCH_START,
            payload: true
        });
        (async () => {
            let res = await invoiceService.getInvoiceDetailList(invoiceId, regionId);
            if (res) {
                dispatch({
                    type: GET_INVOICE_DETAIL,
                    payload: res
                });
                dispatch({
                    type: OPEN_EDIT_INVOICE_FORM,
                });
            } else {

            }
        })();
    };
}

export function closeEditInvoiceForm()
{
    return {
        type: CLOSE_EDIT_INVOICE_FORM
    }
}

export function updateDate(key, date) {
    return {
        type: key,
        payload: date
    }

}

export function addInvoice(regionId, data)
{
    return (dispatch) => {
        // dispatch({
        //     type: GET_INVOICES_FETCH_START,
        //     payload: true
        // });

        (async () => {
            let res = await invoiceService.createNewInvoice(regionId, data);
            if (res.IsSuccess) {
                dispatch({
                    type: ADD_INVOICE,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function updateInvoiceLine(data) {
    return {
        type: UPDATE_INVOICE_LINE,
        payload: data
    }
}

/**
 * Gets Customer TaxRate, Extended Price, TaxAmount and Total Amount
 * @param row_index: Invoice Line index
 * @param RegionId
 * @param CustomerId
 * @param Amount
 * @param Quantity
 * @param Markup
 * @param TaxTypeId
 * @returns {Function}
 */
export function getCustomerTaxAmount(row_index, RegionId,CustomerId, Amount, Quantity, Markup=0.0, Commission= 0.0, TaxTypeId=1 ) {
    return (dispatch) => {
        (async () => {
            let res = await invoiceService.getCustomerTaxAmount(RegionId,CustomerId, Amount, Quantity, Markup, Commission, TaxTypeId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_CUSTOMER_TAX_AMOUNT,
                    payload: {...res.Data, id: row_index}
                });
            } else {

            }
        })();
    };
}

/**
 * updates invoice date option index
 * @param option
 * @returns {{type: string, payload: *}}
 */
export function updateInvoiceDateOption(option){
    return {
        type: UPDATE_INVOICE_DATE_OPTION,
        payload: option
    }
}

/**
 * Update perion options (year & month)
 * @param key
 * @param option
 * @returns {{type: string, payload: {}}}
 */
export function updatePeriodOption(key, option) {
    return {
        type: UPDATE_INVOICE_PERIOD_OPTION,
        payload: {[key]: option}
    }
}

/**
 * select a customer from auto suggetion on invoice form
 * @param obj
 * @returns {{type: string, payload: *}}
 */
export function selectCustomer(obj) {
    return {
        type: SELECT_INVOICE_CUSTOMER,
        payload: obj
    }
}

export function resetInvoiceForm(){
    return (dispatch) => {

        dispatch({
            type: STARTING_SAVE_INVOICE_FORM_DATA,
            payload: true
        });

        (async () => {
                dispatch({
                    type: RESET_INVOICE_FORM,
                });
        })();
    };
}

export function getSuggestCustomersList(regionId, statusId = 0, location = "all", latitude = "", longitude = "", searchText = "") {
    return (dispatch) => {

        dispatch({
            type: GET_SUGGEST_CUSTOMERS_FETCH_START,
        });



        (async () => {
            let res = await invoiceService.getSuggestCustomersList([regionId], [statusId], location, latitude, longitude, searchText);

            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_SUGGEST_CUSTOMERS,
                    payload: res
                });
            } else {
                dispatch({
                    type: GET_ALL_SUGGEST_CUSTOMERS_ERROR,
                    payload: res.message
                });
            }
        })();
    }
}


export function updatedInvoices() {
    return {
        type: UPDATED_INVOICES,
    }
}

export function getBillingLists (regionId) {
    return (dispatch) => {
        (async () => {
            let res = await invoiceService.getBillingLists(regionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_BILLING_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function getServiceLists (regionId, BillingTypeId=4) {
    return (dispatch) => {
        (async () => {
            let res = await invoiceService.getServiceLists(regionId, BillingTypeId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_SERVICE_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function updateInvoice(id, regionId, data) {
    return (dispatch) => {
        (async () => {
            let res = await invoiceService.updateInvoice(id, regionId, data);
            if (res.IsSuccess) {
                dispatch({
                    type: UPDATE_AN_INVOICE,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function closeInvoiceAlertDialog(){
    return {
        type: CLOSE_INVOICE_ERROR_DIALOG,
    }
}

export function closeCustomerAlertDialog(){
    return {
        type: CLOSE_CUSTOMER_ERROR_DIALOG,
    }
}

export function openPaymentInvoiceFormDialog() {
    return {
        type: OPEN_PAYMENT_INVOICE_FORM
    }
}

export function closePaymentInvoiceFormDialog() {
    return {
        type: CLOSE_PAYMENT_INVOICE_FORM
    }
}

export function openCreditInvoiceFormDialog() {
    return {
        type: OPEN_CREDIT_INVOICE_FORM
    }
}

export function closeCreditInvoiceFormDialog() {
    return {
        type: CLOSE_CREDIT_INVOICE_FORM
    }
}

export function getVendorLists(regionId) {
    return (dispatch) => {
        (async () => {
            let res = await invoiceService.getInvoiceVendorLists(regionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_INVOICE_VENDOR_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function openInvoiceVendorDialogBox(id) {
    return {
        type: OPEN_INVOICE_VENDOR_DIALOG_BOX,
        payload: id
    }
}

export function closeInvoiceVendorDialogBox() {
    return {
        type: CLOSE_INVOICE_VENDOR_DIALOG_BOX
    }
}

export function updateInvoiceVendor(vendorId) {
    return {
        type: UPDATE_INVOICE_VENDOR_ID,
        payload: vendorId
    }

}
