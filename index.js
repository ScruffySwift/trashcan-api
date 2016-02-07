var express = require('express');
var app = express();

app.post('/update/:trashcan', function(req, res) {
  var trashcanName = req.params.trashcan;
  console.log(trashcanName);
  res.send('OK');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
