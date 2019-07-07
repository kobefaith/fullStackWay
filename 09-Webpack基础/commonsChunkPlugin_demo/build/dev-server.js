const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const app = express();
Object.keys(webpackConfig.entry).forEach(name => {
  webpackConfig.entry[ name ] = [ 'webpack-hot-middleware/client?noInfo=true&reload=true' ].concat(webpackConfig.enrty[ name ]);
});
const compiler = webpack(webpackConfig)


app.use(devMiddleware(
  compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
   })
); 
app.use(hotMiddleware(
  compiler, {
    overlayStyles:true,
  })
);
app.listen(7000);
