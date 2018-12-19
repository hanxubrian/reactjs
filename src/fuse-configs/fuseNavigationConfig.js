export const fuseNavigationConfig = [
    {
        'MenuId'    : 1,
        'Slug'      : 'applications',
        'Title'   : 'Applications',
        'Type'    : 'group',
        'Icon'    : 'apps',
        'Children': [
            {
                'MenuId'    : 13,
                'Slug'   : 'profile',
                'Title': 'Profile',
                'Type' : 'item',
                'Icon' : 'person',
                'url'  : '/profile'
            },
            {
                'MenuId'    : 11,
                'Slug'   : 'calendar',
                'Title': 'Calendar',
                'Type' : 'item',
                'Icon' : 'today',
                'url'  : '/apps/calendar'
            },
            {
                'MenuId'    : 12,
                'Slug'   : 'mail',
                'Title': 'Mail',
                'Type' : 'item',
                'Icon' : 'email',
                'url'  : '/apps/mail',
                'badge': {
                    'title': 25,
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'MenuId'    : 18,
                'Slug'   : 'invoice',
                'Title': 'Invoice',
                'Type' : 'item',
                'Icon' : 'receipt',
                'url'  : '/invoices/dashboard'
            },
        ]
    },
];
