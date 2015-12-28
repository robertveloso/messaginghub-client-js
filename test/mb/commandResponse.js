/* eslint-disable no-unused-vars */

function commandResponse(request, state, logger) {
    var envelope = JSON.parse(request.data);
    var respData = {
        id: envelope.id
    };

    if(envelope.uri === '/ping') {
        respData.method = 'get';
        respData.status = 'success';
    }

    return { data: JSON.stringify(respData) };
}
