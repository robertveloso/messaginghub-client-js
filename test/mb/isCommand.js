/* eslint-disable no-unused-vars */
function isCommand(request) {
    return JSON.parse(request.data).hasOwnProperty('method');
}
