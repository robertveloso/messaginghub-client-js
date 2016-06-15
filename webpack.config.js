module.exports = {
    context: __dirname + '/src',
    entry: './MessagingHubClient.js',
    externals: {
        'lime-js': 'Lime',
        'bluebird': 'bluebird'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'messaginghub-client.js',
        library: 'MessagingHubClient',
        libraryTarget: 'umd'
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
