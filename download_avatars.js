var token = require('./secrets.js');

var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var url = "https://api.github.com/repos/" + process.argv[2] + "/" + process.argv[3] + "/contributors";

  var options = {
    url: "https://api.github.com/repos/" + process.argv[2] + "/" + process.argv[3] + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  for (var i = 0; i < result.length; i++)

  {
     var youareL =  result[i].avatar_url;
     var path = "./downloadedAvatars/" + result[i].login + result[i].id;

      downloadImageByURL(youareL, path);
  }



});

function downloadImageByURL(url, filePath) {

  request.get(url)
          .on('error', function (err) {
            throw err;
          })
          .pipe(fs.createWriteStream(filePath));

}