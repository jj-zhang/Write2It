// hardcoded
// a object of all current current users as well as fake API calls to retrieve/update them

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
function logout(username) {

}

// register a new user
function signup (credentials) {
    if (! credentials.username in users) {
        users[credentials.username] = {password: credentials.password, userType: 'user'};
        return 1;
    }

    return 0;
}


function setAsAdmin(credentials) {
    if (credentials.username in users) {
        users[credentials.username].userType = 'admin';
        return 1;
    }

    return 0;
}

export {authenticate, signup};