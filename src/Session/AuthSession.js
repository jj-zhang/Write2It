// It's understood that session storage may also be used to store local login data
//  we pick local storage because it is consistent on all tabs. browser open& closes
// and all private data fetches/updates requires session so there wont be any security 
// problem



// simply remove all local login data and go back to the main page
const logout = () => {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    window.location.href = '/landing';
}

// this function is used with authenticationuser or authenticationadmin functions, when error 401 is detected
// authmiddleware knows authentication has failed, remove localstorage, logout and alert to login again
// usage: fetch(request).then(res=> authmiddleware(res)).then(//whatever you do with regular response)
module.exports.authmiddleware = (res) => {
    if (res.status === 401) {
        logout();
        alert("session expired, please log in again");
        return Promise.reject(new Error("session expired"));
    } else {
        return Promise.resolve(res);
    }
}


// onlogin & onlogout should be called when authentication status changed.
module.exports.onlogin = (name, status, id) => {
    localStorage.setItem("loginStatus", status);
    localStorage.setItem("username", name);
    localStorage.setItem('userid', id);
    window.location.href="/landing";
}



module.exports.onlogout = logout;