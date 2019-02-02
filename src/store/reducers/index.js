import {combineReducers} from 'redux';
import fuse from './fuse';
import invoices from './invoice.reducer';
import billruns from './billrun.reducer';
import auth from 'auth/store/reducers';
import quickPanel from 'main/quickPanel/store/reducers';
import calendarApp from '../../main/content/apps/calendar/store/reducers/';
import mailApp from '../../main/content/apps/mail/store/reducers/';
import chatPanel from '../../main/chatPanel/store/reducers/';
import contactsApp from '../../main/content/apps/contacts/store/reducers/';
import usersApp from '../../main/users/store/reducers/';
import franchisees from'./franchisees.reducer';
import transactions from'./franchisee.transaction.reducer';
import franchiseeReports from'./franchisee.reports.reducer';
import customers from './customers.reducer';
import leases from './leases.reducer';
import leads from './leads.reducer';
import findersFees from './findersfees.reducer';
import payments from './payment.reducer';
import dashboard from './dashboard.reducer';
import homepage from './homepage.reducer';
import accountReceivablePayments from'./account_receivable.payments.reducer';
import verifications from './verifications.reducer'
import paymentlockbox from './paymentlockbox.reducer';
import notification from './notification.reducer';
import territories from './regions.territories.reducer';
import franchiseeReportDatalist from './franchiseeReport.reducer';


import * as Actions from "../actions/";
import * as AuthAction from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import {USER_LOGGED_OUT} from "../../auth/store/actions";

import {ADMIN_CLEAN_CACHE_FOR_UPGRADE} from "../../auth/store/actions/login.actions";

const createReducer =
        (asyncReducers) =>
        (state, action) =>
    combineReducers({
        auth,
        fuse,
        invoices,
        billruns,
        quickPanel,
        calendarApp,
        mailApp,
        chatPanel,
        contactsApp,
		franchisees,
        leases,
        transactions,
		customers,
        franchiseeReports,
        leads,
        findersFees,
        payments,
		dashboard,
        homepage,
        accountReceivablePayments,
        usersApp,
        verifications,
        paymentlockbox,
        notification,
        territories,
        franchiseeReportDatalist,
        ...asyncReducers
    })
    (action.type === 'ADMIN_CLEAN_CACHE_FOR_UPGRADE' ? undefined : state, action)


export default createReducer;

