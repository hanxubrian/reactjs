import { combineReducers } from 'redux';
import fuse from './fuse';
import invoices from './invoice.reducer';
import agings from './aging.reducer';
import billruns from './billrun.reducer';
import auth from 'auth/store/reducers';
import quickPanel from 'main/quickPanel/store/reducers';
import calendarApp from '../../main/content/apps/calendar/store/reducers/';
import mailApp from '../../main/content/apps/mail/store/reducers/';
import chatPanel from '../../main/chatPanel/store/reducers/';
import contactsApp from '../../main/content/apps/contacts/store/reducers/';
import usersApp from '../../main/users/store/reducers/';
import franchisees from './franchisees.reducer';
import transactions from './franchisee.transaction.reducer';
import franchiseeReports from './franchisee.reports.reducer';
import customers from './customers.reducer';
import printChecks from './printChecks.reducer';
import customerService from './customerService.reducer';
import leases from './leases.reducer';
import chargebacks from './chargebacks.reducer';
import leads from './leads.reducer';
import findersFees from './findersfees.reducer';
import payments from './payment.reducer';
import dashboard from './dashboard.reducer';
import homepage from './homepage.reducer';
import accountReceivablePayments from './account_receivable.payments.reducer';
import verifications from './verifications.reducer'
import paymentlockbox from './paymentlockbox.reducer';
import paymentLog from './payment.log.reducer';
import notification from './notification.reducer';
import territories from './regions.territories.reducer';
import franchiseeReportDatalist from './franchiseeReport.reducer';
import negativeDue from './negativeDue.reducer';
import admin from './admin.reducer';
import projectDashboardApp from '../../main/content/dashboard/project/store/reducers';
import academyApp from '../../main/content/apps/academy/store/reducers';

import * as Actions from "../actions/";
import * as AuthAction from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { USER_LOGGED_OUT } from "../../auth/store/actions";

import { ADMIN_CLEAN_CACHE_FOR_UPGRADE } from "../../auth/store/actions/login.actions";

const createReducer =
	(asyncReducers) =>
		(state, action) =>
			combineReducers({
				auth,
				fuse,
				invoices,
				agings,
				billruns,
				quickPanel,
				calendarApp,
				mailApp,
				chatPanel,
				contactsApp,
				franchisees,
				chargebacks,
				leases,
				transactions,
				customers,
				customerService,
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
				paymentLog,
				notification,
				territories,
                printChecks,
				franchiseeReportDatalist,
				negativeDue,
				admin,
                projectDashboardApp,
                academyApp,
				...asyncReducers
			})
				(action.type === 'ADMIN_CLEAN_CACHE_FOR_UPGRADE' ? undefined : state, action)


export default createReducer;

