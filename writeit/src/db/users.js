// HARDCODED DATA
// a object representing current current users as well as fake API calls to retrieve/update them

const users = {
    'user': {password: 'user', userType: 'user'},
    'admin': {password: 'admin', userType: 'admin'}
};


// authenticate a user, returns 1 if successful and 0 if not successful
function authenticate (credentials) {
    if (credentials.username in users && users[credentials.username].password === credentials.password) {
        return 1;
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
    if (! credentials.username in users) {
        users[credentials.username] = {password: credentials.password, userType: 'user'};
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