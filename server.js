var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');
var port = process.env.PORT || 3000

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true
}).listen(port, '0.0.0.0', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:'+port+'/');
});
