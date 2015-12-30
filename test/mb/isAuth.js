/* eslint-disable no-unused-vars */
function isAuth(request) {
    return JSON.parse(request.data).hasOwnProperty('state');
}
