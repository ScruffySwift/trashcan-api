var express = require('express');
var app = express();

var PUBLIC_PATH = process.env.PUBLIC_PATH || 'public';

var trashStatus = {};

app.post('/api/empty/:trashcan', function(req, res) {
  var trashcanName = req.params.trashcan;
  trashStatus[trashcanName] = 'empty';
  console.log(trashcanName, 'emptied');
  res.send('OK');
});

app.post('/api/full/:trashcan', function(req, res) {
  var trashcanName = req.params.trashcan;
  trashStatus[trashcanName] = 'full';
  console.log(trashcanName, 'full');
  res.send('OK');
});

app.get('/api', function(req, res) {
  res.send(JSON.stringify(trashStatus));
});

app.use(express.static(PUBLIC_PATH));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
