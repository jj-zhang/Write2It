// hardcoded
// a list of all current stories as well as fake API calls to retrieve/update the
// the stories

// source: https://swoonreads.com/read/

import {isAfter} from 'date-fns';


const stories = [
    {
        id: 0,
        title: 'Alice Lost Her Socks',
        author: 'Halo', // change to userid later
        dateCreated: new Date(2019, 3, 2),
        upvotes: 3000,
        status: 'IPR',
        description: 'Alice lost her socks and needs to find them.',
        upvotedBy: ['user', 'admin'],
        downvotedBy: []
    },
    {
        id: 1,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: ['user', 'admin']
    },
    {
        id: 2,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 3,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 4,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 5,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 6,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 7,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 8,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 9,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 10,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 11,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 12,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 13,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 14,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    },
    {
        id: 15,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'C',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: []
    }
];

function getStory(id) {
    for (let i = 0; i < stories.length; i ++) {
        const story = stories[i];

        if (story.id === id) {
            return story;
        }
    }

    return -1;
}

function getPage(pageNum) {
    const _stories = stories.sort((a, b) => isAfter(a.dateCreated, b.dateCreated) * 0.7 + (a.upvotes >= b.upvotes) ? 1 : 0 * 0.3);

    return pageNum * 5 < stories.length ? _stories.slice(pageNum * 5, Math.min(pageNum * 5 + 5, stories.length)) : [];

}

function updateStory(story) {
    for (let i = 0; i < stories.length; i ++) {
        const _story = stories[i];

        if (_story.id === story.id ) {
            stories[i] = story;
        }
    }
}

export {getPage, updateStory};