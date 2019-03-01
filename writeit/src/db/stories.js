// hardcoded
// a list of all current stories

// source: https://swoonreads.com/read/
import { format, formatDistance, formatRelative, subDays } from 'date-fns';


const stories = [
    {
        id: 0,
        title: 'My life',
        author: 'HaleyAbril', // change to userid later
        dateCreated: new Date(2019, 3, 2),
        upvotes: 3000,
        status: 'IPR',
        firstSentence: 'Haley goes through life feeling worthless and hurt as if nothing will ever work out for her. She has bumps in the road as life goes on, but she finally realizes that life is full of hurt and if you want to make it better you have to act upon it.'
    },
    {
        id: 1,
        title: 'Champion\'s Dream',
        author: 'MaryLukeAuthorItUp',
        dateCreated: new Date(2019, 2, 21),
        upvotes: 300,
        status: 'IPR',
        firstSentence: 'The bats are calling you, will you follow them? Do you want to know what lies in the darkness?'
    },
    {
        id: 2,
        title: 'There You Are',
        author: 'ErinReags',
        dateCreated: new Date(2019, 1, 30),
        upvotes: 100,
        status: 'IPR',
        firstSentence: 'Louise is torn between three men in her life, and she just can\'t seem to find her way out.'
    },
    {
        id: 3,
        title: 'Delicious Hope',
        author: 'Reagon',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        firstSentence: 'Xander and Jared are from two completly different worlds. The jock and the nerd.'
    },
    {
        id: 4,
        title: 'RoBob',
        author: 'Contess',
        dateCreated: new Date(2019, 3, 3),
        upvotes: 5,
        status: 'IPR',
        firstSentence: 'RoBob interacts with humans and connects with the Universe beyond!'
    }
];

export default stories;