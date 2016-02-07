var express = require('express');
var app = express();
var AWS = require('aws-sdk');

// Set region to govcloud
AWS.config.update({region: 'us-east-1'});
var s3 = new AWS.S3();
var PUBLIC_PATH = process.env.PUBLIC_PATH || 'public';
var port = process.env.PORT || 3000;

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
  var results = [];
  var alexaUpdate = "These trash cans are full ";
  alexaUpdate = JSON.stringify(alexaUpdate);
  for (prop in trashStatus) {
    if(trashStatus[prop] == "full"){
      alexaUpdate += prop;
    }
    if (trashStatus.hasOwnProperty(prop)) {
      results.push({
        name: prop,
        status: trashStatus[prop]
      });
    }
  }
  var params = {
    Key: 'text.txt',
    Bucket: 'testinghackathoniot',
    Body : alexaUpdate
  };
  /*s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
      //res.status(500).send('Could not save data to s3');
    } else {
        console.log('success');
      }
  });*/
  res.send(JSON.stringify(results));
});

app.use(express.static(PUBLIC_PATH));

app.listen(port, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!');
});
