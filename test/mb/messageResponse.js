/* eslint-disable no-unused-vars */
function messageResponse(request, state, logger) {

    var envelope = JSON.parse(request.data);

    var respData = {
        type: 'text/plain'
    };

    if(envelope.content === 'ping') {
        respData.content = 'pong';
    }

    return { data: JSON.stringify(respData) };
}
