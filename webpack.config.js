module.exports = {
    context: __dirname + "/src",
    entry: "./MessagingHubClient.js",
    output: {
        path: __dirname + "/dist",
        filename: "hub.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015'] }
            }
        ]
    },
    devtool: 'source-map'
};
