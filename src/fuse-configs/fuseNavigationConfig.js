export const fuseNavigationConfig = [
    {
        MenuId    : 1,
        'id'      : 'applications',
        'Title'   : 'Applications',
        'Type'    : 'group',
        'Icon'    : 'apps',
        'Children': [
            {
                MenuId    : 11,
                'id'   : 'calendar',
                'Title': 'Calendar',
                'Type' : 'item',
                'Icon' : 'today',
                'url'  : '/apps/calendar'
            },
            {
                MenuId    : 12,
                'id'   : 'mail',
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
                MenuId    : 13,
                'id'   : 'profile',
                'Title': 'Profile',
                'Type' : 'item',
                'Icon' : 'person',
                'url'  : '/profile'
            },
        ]
    },
];
