/* eslint-disable no-unused-vars */
function isEvent(request) {
    return JSON.parse(request.data).hasOwnProperty('event');
}
