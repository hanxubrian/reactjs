export const fuseNavigationConfig = [
    {
        'id'      : 'applications',
        'Title'   : 'Applications',
        'Type'    : 'group',
        'Icon'    : 'apps',
        'Children': [
            {
                'id'   : 'example-component',
                'Title': 'Example',
                'Type' : 'item',
                'Icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'   : 'calendar',
                'Title': 'Calendar',
                'Type' : 'item',
                'Icon' : 'today',
                'url'  : '/apps/calendar'
            },
            {
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
                'id'   : 'profile',
                'Title': 'Profile',
                'Type' : 'item',
                'Icon' : 'person',
                'url'  : '/profile'
            },
        ]
    },
];
