/* eslint-disable no-unused-vars */
function stateResponse(request, state, logger) {

    var envelope = JSON.parse(request.data);

    var respData = {
        id: '0',
        from: '127.0.0.1:8124'
    };

    if (envelope.state === 'new') {
        respData.state = 'authenticating';
    } else if (envelope.state === 'authenticating') {
        respData.state = 'established';
    } else {
        respData.state = 'unknown';
    }

    return { data: JSON.stringify(respData) }; 
}
