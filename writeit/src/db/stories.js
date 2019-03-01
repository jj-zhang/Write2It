// hardcoded
// a list of all current stories

// source: https://swoonreads.com/read/
import { format, formatDistance, formatRelative, subDays } from 'date-fns';


const stories = [
    {
        id: 0,
        title: 'Alice Lost Her Socks',
        author: 'MrBean', // change to userid later
        dateCreated: new Date(2019, 3, 2),
        upvotes: 3000,
        status: 'IPR',
        description: 'Alice lost her socks and needs to find them.',
        sentences: [] //format: {text: '', author: '', dateCreated: '', upvotes: ''}
    },
    {
        id: 1,
        title: 'Champion\'s Dream',
        author: 'Kitty',
        dateCreated: new Date(2019, 2, 21),
        upvotes: 300,
        status: 'IPR',
        description: 'The bats are calling you, will you follow them? Do you want to know what lies in the darkness?'
    },
    {
        id: 2,
        title: 'There You Are',
        author: 'SomePerson',
        dateCreated: new Date(2019, 1, 30),
        upvotes: 100,
        status: 'IPR',
        description: 'Louise is torn between three men in her life, and she just can\'t seem to find her way out.'
    },
    {
        id: 3,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.'
    },
    {
        id: 4,
        title: 'RoBob',
        author: 'Socks',
        dateCreated: new Date(2019, 3, 3),
        upvotes: 5,
        status: 'IPR',
        description: 'RoBob interacts with humans and connects with the Universe beyond!'
    }
];

export default stories;