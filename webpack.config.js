module.exports = {
    context: __dirname + '/src',
    entry: './MessagingHubClient.js',
    output: {
        path: __dirname + '/dist',
        filename: 'hub.js'
    },
    module: {
        preLoaders: [
            { test: /(src|test)(.+)\.js$/, loader: 'eslint' }
        ],
        loaders: [
            { test: /(src|test)(.+)\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
    },
    devtool: 'source-map'
};
