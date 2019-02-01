import {territoriesService} from "services";

export const GET_PAYMENTS_DIALOG_INVOICE_LIST = "[A.R.Payments] GET_PAYMENTS_DIALOG_INVOICE_LIST";

export function getPaymentsDialogInvoiceList(regionId,invoiceId) {
    return (dispatch) => {
        (async () => {
            let dialogInvoiceList = await territoriesService.getInvoiceListForPayments(regionId,invoiceId);
            dispatch({
                type: GET_PAYMENTS_DIALOG_INVOICE_LIST,
                payload: dialogInvoiceList
            });
        })();
    }
}