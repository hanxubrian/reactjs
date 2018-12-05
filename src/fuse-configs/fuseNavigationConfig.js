export const fuseNavigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'   : 'calendar',
                'title': 'Calendar',
                'type' : 'item',
                'icon' : 'today',
                'url'  : '/apps/calendar'
            },
            {
                'id'   : 'mail',
                'title': 'Mail',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/apps/mail',
                'badge': {
                    'title': 25,
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'   : 'profile',
                'title': 'Profile',
                'type' : 'item',
                'icon' : 'person',
                'url'  : '/profile'
            },
        ]
    },
    {
        'id'      : 'accounting',
        'title'   : 'Accounting',
        'type'    : 'group',
        'icon'    : 'person',
        'children': [
            {
                'id': 'home',
                'title': 'Home',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/apps/home',
            },
            {
                'id': 'franchisee-payable',
                'title': 'Franchisee Payable',
                'type'    : 'collapse',
                'icon'    : 'view_quilt',
                'children': [
                    {
                        'id': 'billing',
                        'title': 'Billing',
                        'type'    : 'collapse',
                        'icon'    : 'view_quilt',
                        'children': [
                            {
                                'id': 'fran-billing-list',
                                'title': 'Fran Billing List',
                                'type' : 'item',
                                'url'  : '/ui/page-layouts/carded/full-width'
                            },
                            {
                                'id': 'fran-Billing-run',
                                'title': 'Fran Billing Run',
                                'type' : 'item',
                                'url'  : '/ui/page-layouts/carded/full-width'
                            },
                            {
                                'id': 'franchisee-due',
                                'title': 'Franchisee Due',
                                'type' : 'item',
                                'url'  : '/ui/page-layouts/carded/full-width'
                            },
                            {
                                'id': 'franchisee-report',
                                'title': 'Franchisee Report',
                                'type' : 'item',
                                'url'  : '/ui/page-layouts/carded/full-width'
                            }
                        ]
                    },
                ]
            }
        ]
    }
];
