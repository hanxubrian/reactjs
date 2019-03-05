import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import axios from 'axios/index';
import {Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimateGroup} from '@fuse';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
const styles = theme => ({
    root: {}
});
const fakedata= {
    'general': {
        'gender'   : 'Male',
            'birthday' : 'February 30th, 1974',
            'locations': [
            'London, UK',
            'New York, USA'
        ],
            'about'    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget pharetra felis, sed ullamcorper dui. Sed et elementum neque. Vestibulum pellente viverra ultrices. Etiam justo augue, vehicula ac gravida a, interdum sit amet nisl. Integer vitae nisi id nibh dictum mollis in vitae tortor.'
    },
    'work'   : {
        'occupation': 'Developer',
            'skills'    : 'C#, PHP, Javascript, Angular, JS, HTML, CSS',
            'jobs'      : [
            {
                'company': 'Self-Employed',
                'date'   : '2010 - Now'
            },
            {
                'company': 'Google',
                'date'   : '2008 - 2010'
            }
        ]
    },
    'contact': {
        'address' : 'Ut pharetra luctus est quis sodales. Duis nisi tortor, bibendum eget tincidunt, aliquam ac elit. Mauris nec euismod odio.',
            'tel'     : [
            '+6 555 6600',
            '+9 555 5255'
        ],
            'websites': [
            'withinpixels.com'
        ],
            'emails'  : [
            'mail@withinpixels.com',
            'mail@creapond.com'
        ]
    },
    'groups' : [
        {
            'id'      : '1',
            'name'    : 'Android',
            'category': 'Technology',
            'members' : '1.856.546'
        },
        {
            'id'      : '2',
            'name'    : 'Google',
            'category': 'Web',
            'members' : '1.226.121'
        },
        {
            'id'      : '3',
            'name'    : 'Fallout',
            'category': 'Games',
            'members' : '526.142'
        }
    ],
        'friends': [
        {
            'id'    : '1',
            'name'  : 'Garry Newman',
            'avatar': 'assets/images/avatars/garry.jpg'
        },
        {
            'id'    : '2',
            'name'  : 'Carl Henderson',
            'avatar': 'assets/images/avatars/carl.jpg'
        },
        {
            'id'    : '3',
            'name'  : 'Jane Dean',
            'avatar': 'assets/images/avatars/jane.jpg'
        },
        {
            'id'    : '4',
            'name'  : 'Garry Arnold',
            'avatar': 'assets/images/avatars/garry.jpg'
        },
        {
            'id'    : '5',
            'name'  : 'Vincent Munoz',
            'avatar': 'assets/images/avatars/vincent.jpg'
        },
        {
            'id'    : '6',
            'name'  : 'Alice Freeman',
            'avatar': 'assets/images/avatars/alice.jpg'
        },
        {
            'id'    : '7',
            'name'  : 'Andrew Green',
            'avatar': 'assets/images/avatars/andrew.jpg'
        }
    ]
}

class AboutTab extends Component {

    // state = {
    //     general: null,
    //     work   : null,
    //     contact: null,
    //     groups : null,
    //     friends: null
    // };
    state = {
        general: fakedata.general,
        work   : fakedata.work,
        contact: fakedata.contact,
        groups : fakedata.groups,
        friends: fakedata.friends
    };

    componentDidMount()
    {

        axios.get('/api/profile/about').then(res => {
            // this.setState(res.data);
        });

    }
    RegionHeader(){
        let region_name = '';
        if(this.props.login.IsSuccess){
            this.props.login.all_regions.forEach(region=>{
                if(parseInt(this.props.login.defaultRegionId) === region.RegionId) {
                    region_name = region.Displayname;
                    return false;
                }
            })
        }

        return (
           <Typography className="logo-icon-large">{region_name}</Typography>
        )
    };

    render()
    {
        const {classes,user} = this.props;
        const {general, work, contact, groups, friends} = this.state;
        if(user && user !== null){
            return (
                <div className={classNames(classes.root, "md:flex max-w-2xl")}>

                    <div className="flex flex-col flex-1 md:pr-32">
                        <FuseAnimateGroup
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            {general && (
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>
                                        <Toolbar className="pl-16 pr-8">
                                            <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                General Information
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>

                                    <CardContent>
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Email</Typography>
                                            <Typography>{user.email}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                            <Typography>{user.phone}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Region</Typography>
                                            <Typography component={'span'}>{this.RegionHeader()}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">About Me</Typography>
                                            <Typography>{general.about}</Typography>
                                        </div>

                                    </CardContent>
                                </Card>
                            )}

                            {work && (
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>
                                        <Toolbar className="pl-16 pr-8">
                                            <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                Work
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>

                                    <CardContent>
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Occupation</Typography>
                                            <Typography>{user.title}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Skills</Typography>
                                            <Typography>{work.skills}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Jobs</Typography>
                                            <table className="">
                                                <tbody>
                                                {work.jobs.map((job) => (
                                                    <tr key={job.company}>
                                                        <td className="pr-16">
                                                            <Typography>{job.company}</Typography>
                                                        </td>
                                                        <td>
                                                            <Typography color="textSecondary">{job.date}</Typography>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {contact && (
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>
                                        <Toolbar className="pl-16 pr-8">
                                            <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                Contact
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>

                                    <CardContent>
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Address</Typography>
                                            <Typography>{user.address}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Tel.</Typography>

                                            {contact.tel.map((tel) => (
                                                <div className="flex items-center" key={tel}>
                                                    <Typography>{tel}</Typography>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Website</Typography>

                                            {contact.websites.map((website) => (
                                                <div className="flex items-center" key={website}>
                                                    <Typography>{website}</Typography>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Emails</Typography>

                                            {contact.emails.map((email) => (
                                                <div className="flex items-center" key={email}>
                                                    <Typography>{email}</Typography>
                                                </div>
                                            ))}
                                        </div>

                                    </CardContent>
                                </Card>
                            )}
                        </FuseAnimateGroup>
                    </div>

                    <div className="flex flex-col md:w-320">
                        <FuseAnimateGroup
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            My Team
                                        </Typography>
                                        <Button className="normal-case" color="inherit" size="small">See 454 more</Button>
                                    </Toolbar>
                                </AppBar>
                                <CardContent className="p-0">
                                    <List className="p-8">
                                        {friends && friends.map((friend) => (
                                            <img key={friend.id} className="w-64 m-4" src={friend.avatar} alt={friend.name}/>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>

                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            Groups
                                        </Typography>
                                        <Button className="normal-case" color="inherit" size="small">See 6 more</Button>
                                    </Toolbar>
                                </AppBar>
                                <CardContent className="p-0">
                                    <List className="p-0">
                                        {groups && groups.map((group) => (
                                            <ListItem key={group.id}>
                                                <Avatar alt={group.name}>{group.name[0]}</Avatar>
                                                <ListItemText
                                                    primary={(
                                                        <div className="">
                                                            <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                                {group.name}
                                                            </Typography>

                                                            <Typography className="inline ml-4" paragraph={false}>
                                                                {group.category}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                    secondary={group.members}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                        <Icon>more_vert</Icon>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </FuseAnimateGroup>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className={classNames(classes.root, "md:flex max-w-2xl")}>

                    <div className="flex flex-col flex-1 md:pr-32">
                        <FuseAnimateGroup
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            {general && (
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>
                                        <Toolbar className="pl-16 pr-8">
                                            <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                General Information
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>

                                    <CardContent>
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Email</Typography>
                                            <Typography>{this.props.login.Username}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                            <Typography>{this.props.login.Phone}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Region</Typography>
                                            <Typography component={'span'}>{this.RegionHeader()}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">About Me</Typography>
                                            <Typography>{general.about}</Typography>
                                        </div>

                                    </CardContent>
                                </Card>
                            )}

                            {work && (
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>
                                        <Toolbar className="pl-16 pr-8">
                                            <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                Work
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>

                                    <CardContent>
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Occupation</Typography>
                                            <Typography>{work.occupation}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Skills</Typography>
                                            <Typography>{work.skills}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Jobs</Typography>
                                            <table className="">
                                                <tbody>
                                                {work.jobs.map((job) => (
                                                    <tr key={job.company}>
                                                        <td className="pr-16">
                                                            <Typography>{job.company}</Typography>
                                                        </td>
                                                        <td>
                                                            <Typography color="textSecondary">{job.date}</Typography>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {contact && (
                                <Card className="w-full mb-16">
                                    <AppBar position="static" elevation={0}>
                                        <Toolbar className="pl-16 pr-8">
                                            <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                Contact
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>

                                    <CardContent>
                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Address</Typography>
                                            <Typography>{contact.address}</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Tel.</Typography>

                                            {contact.tel.map((tel) => (
                                                <div className="flex items-center" key={tel}>
                                                    <Typography>{tel}</Typography>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Website</Typography>

                                            {contact.websites.map((website) => (
                                                <div className="flex items-center" key={website}>
                                                    <Typography>{website}</Typography>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-24">
                                            <Typography className="font-bold mb-4 text-15">Emails</Typography>

                                            {contact.emails.map((email) => (
                                                <div className="flex items-center" key={email}>
                                                    <Typography>{email}</Typography>
                                                </div>
                                            ))}
                                        </div>

                                    </CardContent>
                                </Card>
                            )}
                        </FuseAnimateGroup>
                    </div>

                    <div className="flex flex-col md:w-320">
                        <FuseAnimateGroup
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            My Team
                                        </Typography>
                                        <Button className="normal-case" color="inherit" size="small">See 454 more</Button>
                                    </Toolbar>
                                </AppBar>
                                <CardContent className="p-0">
                                    <List className="p-8">
                                        {friends && friends.map((friend) => (
                                            <img key={friend.id} className="w-64 m-4" src={friend.avatar} alt={friend.name}/>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>

                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            Groups
                                        </Typography>
                                        <Button className="normal-case" color="inherit" size="small">See 6 more</Button>
                                    </Toolbar>
                                </AppBar>
                                <CardContent className="p-0">
                                    <List className="p-0">
                                        {groups && groups.map((group) => (
                                            <ListItem key={group.id}>
                                                <Avatar alt={group.name}>{group.name[0]}</Avatar>
                                                <ListItemText
                                                    primary={(
                                                        <div className="">
                                                            <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                                {group.name}
                                                            </Typography>

                                                            <Typography className="inline ml-4" paragraph={false}>
                                                                {group.category}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                    secondary={group.members}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                        <Icon>more_vert</Icon>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </FuseAnimateGroup>
                    </div>
                </div>
            );
        }
    }
}
AboutTab.propTypes = {
    user            : PropTypes.object,
};

function mapStateToProps({auth})
{
    return {
        login: auth.login
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(AboutTab)));
// export default withStyles(styles, {withTheme: true})(AboutTab);
