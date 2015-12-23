import net from 'net';

export default net.createServer((socket) => {
    socket.on('data', (data) => {
        let json = JSON.parse(data);
        if(json.hasOwnProperty('state')) {
            switch(json.state) {
            case 'new':
                socket.write(JSON.stringify({
                    id: '0',
                    from: '127.0.0.1:8124',
                    state: 'authenticating'
                }));
                break;
            case 'authenticating':
                socket.write(JSON.stringify({
                    id: '0',
                    from: '127.0.0.1:8124',
                    state: 'established'
                }));
            }
        } else {
            if(json.content === 'ping' || json.event === 'ping' || json.uri === '/ping') {
                socket.write(JSON.stringify({
                    event: 'pong'
                }));
            }
        }
    });
});
