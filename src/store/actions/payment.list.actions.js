import axios from "axios";
import { paymentService } from "../../services";


export const PAYMENTLIST_TOGGLE_SUMMARY_PANEL = "[PAYMENTLIST] TOGGLE SUMMARY PANEL";
export const PAYMENTLIST_TOGGLE_FILTER_STATUS = "[PAYMENTLIST] TOGGLE FILTER STATUS";
export const PAYMENTLIST_TOGGLE_FILTER_PANEL  = "[PAYMENTLIST] TOGGLE FILTER PANEL";


export function paymenttoggleFilterPanel() {
    return {
        type: PAYMENTLIST_TOGGLE_FILTER_PANEL
    }
}