const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
config.plugins.push(new webpack.HotModuleReplacementPlugin({
  multiStep: true
}))
const options = {
  contentBase: './public',
  hot: true,
  host: 'localhost',
  port: 3000,
  proxy: {
    '^/*': {
      target: 'http://localhost/',
      secure: false
    }
  }
}

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {
  console.log('dev server listening on port 3000');
});
