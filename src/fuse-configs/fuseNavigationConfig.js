export const fuseNavigationConfig = [
    {
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
                'MenuId'   : 14,
                'Slug'   : 'contacts',
                'Title': 'Contacts',
                'Type' : 'item',
                'Icon' : 'account_box',
                'url'  : '/apps/contacts'
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
            }
        ]
    },
];
