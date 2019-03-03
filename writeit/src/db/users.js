// HARDCODED DATA
// a object representing current current users as well as fake API calls to retrieve/update them

const users = {
    'user': {username: 'user', password: 'user', userType: 'user', email: 'hi@gmail.com'},
    'admin': {username: 'admin', password: 'admin', userType: 'admin', email: 'hi@gmail.com'}
};


// authenticate a user, returns 1 if successful and 0 if not successful
function authenticate (credentials) {
    if (credentials.username in users && users[credentials.username].password === credentials.password) {
        return users[credentials.username];
    } else {
        return 0;
    }
}

// logs out a user
// returns 1 if successful and 0 if unsuccessful
function logout() {

    if (!localStorage.getItem('loginStatus')){
        return 0;
    }

    localStorage.removeItem("loginStatus");
    localStorage.removeItem("token");
    localStorage.removeItem("username");


    return 1;
}

// register a new user
// return the user object if successful and
// 0 if unsuccessful
function signup (credentials) {
    if (!(credentials.username in users)) {
        users[credentials.username] = {
            username: credentials.username,
            password: credentials.password,
            userType: 'user',
            profilePhoto: credentials.profilePhoto,
            email: credentials.email};
        return users[credentials.username];
    }

    return 0;
}


// set a user as an admin
// return the user object if successful and 0 if unsuccesful
function setAsAdmin(username) {
    if (username in users) {
        users[username].userType = 'admin';
        return users[username];
    }

    return 0;
}

export {logout, authenticate, signup};