 /* eslint-disable no-unused-vars */
function hasState(request) {
    let envelope = JSON.parse(request.data);
    return envelope.hasOwnProperty('state');
}
