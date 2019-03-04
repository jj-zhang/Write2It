// HARDCODED DATA
// a object representing current current users as well as fake API calls to retrieve/update them

const users = {
    'user': {username: 'user', password: 'user', userType: 'user', email: 'hi@gmail.com', dateCreated: new Date()},
    'admin': {username: 'admin', password: 'admin', userType: 'admin', email: 'hi@gmail.com', dateCreated: new Date()}
};


// authenticate a user, returns 1 if successful and 0 if not successful
function authenticate(credentials) {
    if (credentials.username in users && users[credentials.username].password === credentials.password) {
        return users[credentials.username];
    } else {
        return 0;
    }
}

// logs out a user
// returns 1 if successful and 0 if unsuccessful
function logout() {

    if (!localStorage.getItem('loginStatus')) {
        return 0;
    }

    localStorage.removeItem("loginStatus");
    localStorage.removeItem("token");
    localStorage.removeItem("username");


    return 1;
}


// get user object of a specified username
// return 0 if unsuccessful
function getUser(user) {
    return user.username in users ? users[user.username] : 0;
}

// update a user
// return the user object if successful and 0 if unsuccesful
function updateUser(user) {

    if (user.username in users) {
        users[user.username] = user;
        return users[user.username];
    }

    return 0;
}

// register a new user
// return the user object if successful and
// 0 if unsuccessful
function signup(credentials) {
    if (!(credentials.username in users)) {
        users[credentials.username] = {
            username: credentials.username,
            password: credentials.password,
            userType: 'user',
            profilePhoto: credentials.profilePhoto,
            email: credentials.email,
            description: null,
            dateCreated: new Date()
        };
        return users[credentials.username];
    }

    return 0;
}


// // set a user as an admin
// // return the user object if successful and 0 if unsuccesful
// function setAsAdmin(username) {
//     if (username in users) {
//         users[username].userType = 'admin';
//         return users[username];
//     }
//
//     return 0;
// }

export {updateUser, getUser, logout, authenticate, signup};