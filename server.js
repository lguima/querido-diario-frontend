const express = require('express')

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

const app = express();
app.use(forceSSL());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/querido-diario-frontend/index.html');
});

app.listen(process.env.PORT || 8080);