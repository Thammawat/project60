import path from 'path';
import fs from 'fs';
import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import Webpack from 'webpack';
import WebpackConfig from '../webpack.config';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebPackHotMiddleware from 'webpack-hot-middleware';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import bluebird from 'bluebird';


Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/basedir');
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});


const app = Express();
app.use(cors())
app.use(bodyParser.json())
app.use(require('./controllers'))
const webpackCompiler = Webpack(WebpackConfig);
app.use(WebpackDevMiddleware(webpackCompiler, {
  publicPath: WebpackConfig.output.publicPath,
  noInfo: true,
  quiet: false
}));
app.use(WebPackHotMiddleware(webpackCompiler));

app.get('/:filename.wasm', (req, res) => {
  const wasmFilePath = path.resolve(__dirname, `../dist/${req.params.filename}.wasm`);
  console.log(`Wasm request ${wasmFilePath}`);

  fs.readFile(wasmFilePath, (err, data) => {
    const errorMessage = `Error ${wasmFilePath} not found. ${JSON.stringify(err)}`;
    if (err) {
      console.log(errorMessage);
      res.status(404).send(errorMessage);
      return;
    }
    res.send(data);
  });
});

app.use((req, res) => {
  const htmlString = `<!DOCTYPE html>
    <html>
         <head>
            <title>Hasta la vista JS!</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB__Mr17aq_LZYOXQr_8_o0NDRCUkIgboE"></script>
            <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=geometry"></script>
          </head>
          <body>
            <div id="root"></div>
            <script src="/dist/utils.js"></script>
            <script src="/dist/bundle.js"></script>
          </body>
    </html>`;

  res.end(htmlString);
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started wasm-playground...`);
});
