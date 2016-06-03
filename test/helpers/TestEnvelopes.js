export const Sessions = {
    authenticating: {
        id: '0',
        from: '127.0.0.1:8124',
        state: 'authenticating'
    },
    established: {
        id: '0',
        from: '127.0.0.1:8124',
        state: 'established'
    }
};
export const Commands = {
    pingResponse: (envelope) => ({
        id: envelope.id,
        method: 'get',
        status: 'success'
    })
};
export const Messages = {
    pong: {
        type: 'text/plain',
        content: 'pong'
    }
};
export const Notifications = {
    pong: {
        event: 'pong'
    }
};
