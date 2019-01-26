import _authService from './auth/authService';
import _menuService from './menu/menuService';
import _franchiseesService from './franchisees/franchiseesService';
import _leaseService from './franchisees/leaseService';
import _findersFeesService from './franchisees/findersFeesService';
import _initialService from './initial/initialService';
import _invoiceService from './invoice/invoiceServices';
import _customersService from './customers/CustomersService';
import _contactService from './customers/ContactService';
import _chatService from './chat/ChatService';
import _paymentService from './payment/paymentListService';
import _dashboardService from './dashboard/dashboardService';
import _invoicePaymentService from './invoice/paymentsService'
import _homepageService from './home/HomepageService';
import _billrunService from './billrun/BillrunService';
import _paymentlockboxservice from './paymentlockbox/paymentlockboxService';


export const authService = _authService;
export const menuService = _menuService;
export const franchiseesService = _franchiseesService;
export const leaseService = _leaseService;
export const findersFeesService = _findersFeesService;
export const initialService = _initialService;
export const invoiceService = _invoiceService;
export const invoicePaymentsService = _invoicePaymentService;
export const customersService = _customersService;
export const chatService = _chatService;
export const contactService = _contactService;
export const paymentService = _paymentService;
export const dashboardService = _dashboardService;
export const homepageService = _homepageService;
export const billrunService = _billrunService;
export const paymentlockboxservice = _paymentlockboxservice;