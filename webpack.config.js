module.exports = {
    entry: './src/init.tsx',
    output: {
        path: `${__dirname}/dist`,
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.tsx']
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.tsx$/,
            loader: 'ts-loader'
        }]
    },
    externals: [
        (function externals() {
            const IGNORES = [
                'electron'
            ];
            return function req(context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, `require('${request}')`);
                }
                return callback();
            };
        })()
    ]
};