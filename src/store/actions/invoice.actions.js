import axios from "axios";
import {invoiceService} from "../../services"

export const GET_ALL_INVOICES = "[INVOICES] GETS ALL";
export const GET_INVOICE_STATUS = "[INVOICES] GETS INVOICE STATUS";
export const GET_INVOICE_DETAIL = "[INVOICES] GETS INVOICE DETAIL";
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
export const GET_SUGGEST_CUSTOMERS_FETCH_START = "[INVOICES] GET SUGGEST CUSTOMERS FETCH START";

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

            }
        })();
    };
}

export function getInvoiceDetail(InvoiceId,RegionId) {
    return (dispatch) => {
       (async () => {
            let res = await invoiceService.getInvoiceDetailList(InvoiceId,RegionId);
            if (res) {
                dispatch({
                    type: GET_INVOICE_DETAIL,
                    payload: res
                });
            } else {

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
            console.log('remove result=', res);
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

export function openEditInvoiceForm(data)
{
    return {
        type: OPEN_EDIT_INVOICE_FORM,
        data
    }
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
            console.log('result=', res);
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
 * @param RegionId
 * @param CustomerId
 * @param Amount
 * @param Quantity
 * @param Markup
 * @param TaxTypeId
 * @returns {Function}
 */
export function getCustomerTaxAmount(RegionId,CustomerId, Amount, Quantity, Markup=0.0, TaxTypeId=1 ) {
    return (dispatch) => {
        (async () => {
            let res = await invoiceService.getCustomerTaxAmount(RegionId,CustomerId, Amount, Quantity, Markup, TaxTypeId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_CUSTOMER_TAX_AMOUNT,
                    payload: res.Data
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
            dispatch({
                type: GET_ALL_SUGGEST_CUSTOMERS,
                payload: res
            });
        })();
    }
}


export function updatedInvoices() {
    return {
        type: UPDATED_INVOICES,
    }
}
