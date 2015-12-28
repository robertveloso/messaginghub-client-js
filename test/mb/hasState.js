 /* eslint-disable no-unused-vars */
function hasState(request, logger) {
    var envelope = JSON.parse(request.data);
    return envelope.hasOwnProperty('state');
}
