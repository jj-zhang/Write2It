// HARDCODED DATA
// a list of all current stories as well as fake API calls to retrieve/update the
// the stories

// source: https://swoonreads.com/read/

import {isAfter} from 'date-fns';


let stories = [
    {
        id: 0,
        title: 'Alice Lost Her Socks',
        author: 'Halo', // change to userid later
        dateCreated: new Date(2019, 3, 2),
        upvotes: 3000,
        status: 'IPR',
        description: 'Alice lost her socks and needs to find them.',
        upvotedBy: ['user', 'admin'],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 1,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: ['user', 'admin'],
        sentences: []

    },
    {
        id: 2,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 3,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 4,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 5,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 6,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 7,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 8,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 9,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 10,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 11,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 12,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 13,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 14,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    },
    {
        id: 15,
        title: 'Delicious Hope',
        author: 'Halo',
        dateCreated: new Date(2019, 2, 22),
        upvotes: 32,
        status: 'IPR',
        description: 'Xander and Jared are from two completly different worlds. The jock and the nerd.',
        upvotedBy: [],
        downvotedBy: [],
        sentences: []
    }
];


// get a story given its id
// return -1 if no story with given id exists
function getStory(story) {
    for (let i = 0; i < stories.length; i ++) {
        const _story = stories[i];

        if (_story.id === story.id) {
            return _story;
        }
    }

    return -1;
}

// get a page of stories (a page consists of 5 stories per page),
// ordered based on recency and popularity
function getPage(pageNum) {
    const _stories = stories.sort((a, b) => isAfter(a.dateCreated, b.dateCreated) * 0.7 + (a.upvotes >= b.upvotes) ? 1 : 0 * 0.3);

    return pageNum * 5 < stories.length ? _stories.slice(pageNum * 5, Math.min(pageNum * 5 + 5, stories.length)) : [];

}

// update a story and return if
// return 0 if unsuccessful
function updateStory(story) {
    if (!localStorage.getItem('loginStatus')) {
        return 0;
    }

    for (let i = 0; i < stories.length; i ++) {
        const _story = stories[i];

        if (_story.id === story.id ) {
            stories[i] = story;
            return story;
        }
    }
}

// create a new story
// return 0 if unsuccessful
function createStory(story) {
    if (!localStorage.getItem('loginStatus')) {
        return 0;
    }

    const user = localStorage.getItem('username');

    const _story =  {
            id: stories.length > 0 ? stories[stories.length - 1].id + 1 : 0,
            title: story.title,
            author: user,
            dateCreated: new Date(),
            upvotes: 0,
            status: 'IPR',
            description: story.description,
            upvotedBy: [],
            downvotedBy: [],
            sentences: []
    };

    stories.push(_story);


    return _story;

}

// delete a story given an id
// return 1 if successful and 0 if not
function deleteStory(story) {
    const userType = localStorage.getItem('loginStatus');

    if (!userType || userType != 'admin') {
        return 0;
    }

    stories =
        stories.filter((_story) => _story.id !== story.id);

    return 1;
}


export {deleteStory, getStory, createStory, getPage, updateStory};