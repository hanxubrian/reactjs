import Payments from './payments'

export const PaymentsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable/payments',
            component: Payments
        }
    ]
};
