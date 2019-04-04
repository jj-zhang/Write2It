// this session duration must be consistent with serverside session which is the auto logout time
const sessionDuration = 600000;

// simply logout on local page and go back to the main page
const logout = () => {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    window.location.href = '/';
}

// this function is used with authenticationuser or authenticationadmin functions, when error 401 is detected
// authmiddleware knows authentication has failed, remove localstorage, logout and alert to login again
// usage: fetch(request).then(res=>return authmiddleware(res)).then(//whatever you do with regular response)
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
    setTimeout(() => {
        logout();
        alert("session expired, please log in again");
    }, sessionDuration);
    window.location.href="/";
}



module.exports.onlogout = logout;