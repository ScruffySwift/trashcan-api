var express = require('express');
var app = express();

var trashStatus = {};

app.post('/empty/:trashcan', function(req, res) {
  var trashcanName = req.params.trashcan;
  trashStatus[trashcanName] = 'empty';
  console.log(trashcanName, 'emptied');
  res.send('OK');
});

app.post('/full/:trashcan', function(req, res) {
  var trashcanName = req.params.trashcan;
  trashStatus[trashcanName] = 'full';
  console.log(trashcanName, 'full');
  res.send('OK');
});

app.get('/', function(req, res) {
  res.send(JSON.stringify(trashStatus));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
