/* eslint-disable no-unused-vars */
function eventResponse(request, state, logger) {

    var envelope = JSON.parse(request.data);

    var respData = { };

    if(envelope.event === 'ping') {
        respData.event = 'pong';
    }

    return { data: JSON.stringify(respData) };
}
