import {VerificationsAppConfig} from "./activity/VerificationsAppConfig";
import {SigninPageConfig} from './auth/signin/SigninPageConfig';
import {FranchiseeProfilePageConfig} from './profile/FranchiseeProfilePageConfig';
import {ProfilePageConfig} from './profile/ProfilePageConfig';
import {RegionsConfig} from "./regions/regions/regionsConfig";
import {TerritoriesConfig} from "./regions/territories/territoriesConfig";
import {FranchiseesConfig} from "./franchisees/franchisees/franchiseesConfig";
import {ChargebacksConfig} from "./franchisees/chargebacks/chargebacksConfig";
import {LeasesConfig} from "./franchisees/leases/leasesConfig";
import {EndofmonthConfig} from "./franchisees/endofmonth/endofmonthConfig";
import {DistributionsConfig} from "./franchisees/distributions/distributionsConfig";
import {TransactionsConfig} from "./franchisees/transactions/transactionsConfig";
import {ContractsConfig} from "./customers/Contracts/contractsConfig";
import {CustomersConfig} from "./customers/Customers/customersConfig";
import {InspectionsConfig} from "./operations/inspections/inspectionsConfig";
import {OperationsConfig} from "./operations/operations/operationsConfig";
import {PrintChecksConfig} from "./operations/printchecks/printChecksAppConfig";
import {SalesConfig} from "./sales/sales/salesConfig";
import {CallListConfig} from "./sales/call-list/call-listConfig";
import {LeadsConfig} from "./sales/leads/leadsConfig";
import {CustomerServicesConfig} from "./customer-service/customer-service/customer-servicesConfig";
import {CasesConfig} from "./customer-service/cases/casesConfig";
import {CustomerServiceCallListConfig} from "./customer-service/call-list/call-listConfig";
import {PlansConfig} from "./comissions/plans/plansConfig";
import {ComissionsConfig} from "./comissions/comissions/comissionsConfig";
import {AccountsReceivableConfig} from "./accounts-receivable/accounts-receivable/accounts-receivableConfig";
import {PaymentsConfig} from "./accounts-receivable/payments/paymentsConfig";
import {BillRunConfig} from "./accounts-receivable/bill-run/bill-runConfig";
import {InvoiceConfig} from "./accounts-receivable/Invoice/invoiceConfig";
import {ArLogConfig} from "./accounts-receivable/arlog/arLogConfig";
import {ReportsConfig} from "./franchisees/reports/reportsConfig";
import {FindersFeesConfig} from "./franchisees/findersfees/findersFeesConfig";
import {PaymentListConfig} from "./payments/payment-list/payment-listConfig";
import {DashboardConfig} from "./dashboard/DashboardConfig";
import {HomepageConfig} from "./home/HomepageConfig";
import {UsersAppConfig} from "../users/UsersAppConfig";
import {PaymentLockBoxReportConfig} from "./PaymentLockBoxReport/PaymentLockBoxReportConfig";
import {SystemNotificationConfig} from "./notifications/SystemNotificationConfig";
import {AdminConfig} from "./admin/adminConfig";
import {AdminImportConfig} from "./admin/imports/adminImportConfig";


export const pagesConfigs = [
    VerificationsAppConfig,
    SigninPageConfig,
    FranchiseeProfilePageConfig,
    ProfilePageConfig,
    RegionsConfig,
    TerritoriesConfig,
    FranchiseesConfig,
    ChargebacksConfig,
    LeasesConfig,
    EndofmonthConfig,
    DistributionsConfig,
    TransactionsConfig,
    ContractsConfig,
    CustomersConfig,
    InspectionsConfig,
    OperationsConfig,
    SalesConfig,
    CallListConfig,
    LeadsConfig,
    CustomerServiceCallListConfig,
    CasesConfig,
    CustomerServicesConfig,
    PlansConfig,
    ComissionsConfig,
    InvoiceConfig,
    PaymentsConfig,
    ArLogConfig,
    PrintChecksConfig,
    BillRunConfig,
    AccountsReceivableConfig,
    ReportsConfig,
    AccountsReceivableConfig,
    FindersFeesConfig,
    PaymentListConfig,
	DashboardConfig,
    HomepageConfig,
    UsersAppConfig,
    PaymentLockBoxReportConfig,
    SystemNotificationConfig,
    AdminConfig,
    AdminImportConfig
];
