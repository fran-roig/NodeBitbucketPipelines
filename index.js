'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/run-pipe', (req, res) => {

    const PRBranch = req.body.source.branch.name;
    const PRRepo = req.body.source.repository;
    var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.bitbucket.org",
  "port": null,
  "path": "/2.0/repositories/koodu_software/" + PRRepo + "/pipelines/?access_token=nPDKvoYW8gWcZOC0GN3moBnl3T0-aAlV7UWlYflePBGy7ULUq5Vu7sWKN7r8bnEQRMDqWk7rVMUythGxemA%3D",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "3aaf9b9f-e9bd-fbee-1219-1512aa8636d0"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ target: 
   { ref_type: 'branch',
     type: 'pipeline_ref_target',
     ref_name: PRBranch } }));
req.end();

});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});