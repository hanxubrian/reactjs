import BillRun from './bill-run'

export const BillRunConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable/bill-run',
            component: BillRun
        }
    ]
};
