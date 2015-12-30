/* eslint-disable no-unused-vars */
function isMessage(request) {
    return JSON.parse(request.data).hasOwnProperty('content');
}
