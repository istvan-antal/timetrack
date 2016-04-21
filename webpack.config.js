module.exports = {
    entry: './src/init.tsx',
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        },{
            test: /\.tsx$/,
            loader: 'ts-loader'
        }]
    },
    externals: [
        (function() {
            var IGNORES = [
                'electron'
            ];
            return function(context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, "require('" + request + "')");
                }
                return callback();
            };
        })()
    ]
};
