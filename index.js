var express = require('express');
var app = express();
var AWS = require('aws-sdk');

// Set region to govcloud
AWS.config.update({region: 'us-east-1'});
var s3 = new AWS.S3();
var PUBLIC_PATH = process.env.PUBLIC_PATH || 'public';
var port = process.env.PORT || 3000;

var trashStatus = {
  trash0: 'empty',
  trash1: 'empty',
  trash2: 'empty',
  trash3: 'empty',
  trash4: 'empty',
  trash5: 'empty',
  trash6: 'empty',
  trash7: 'empty',
  trash8: 'empty',
  trash9: 'empty'
};

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
  var alexaUpdate = "These trash can are full ";
  boolean swagger = false;
  alexaUpdate = JSON.stringify(alexaUpdate);
  for (prop in trashStatus) {
    if(trashStatus[prop] == "full"){
      alexaUpdate += prop;
      swagger = true;
    }
    if (trashStatus.hasOwnProperty(prop)) {
      results.push({
        name: prop,
        status: trashStatus[prop]
      });
    }
  }
  if(swagger == false){
    var alexaUpdate = "There are no full trashcans this hackathon is lit";
  }
  var params = {
    Key: 'text.txt',
    Bucket: 'testinghackathoniot',
    Body : alexaUpdate
  };
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
      //res.status(500).send('Could not save data to s3');
    } else {
        console.log('success');
      }
  });
  res.send(JSON.stringify(results));
});

app.use(express.static(PUBLIC_PATH));

app.listen(port, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!');
});
