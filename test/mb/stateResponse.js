/* eslint-disable-line no-unused-vars */
function stateResponse(request, state, logger) {

    var envelope = JSON.parse(request.data);
    logger.info('with state -> ', state);
    if (typeof state !== 'Number') {
        state = 0;
    }
    state++;

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

    logger.info('Response ', respData, ' with state -> ', state);

    return JSON.stringify({ data: respData });
}
