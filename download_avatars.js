var token = require('./secrets.js');

var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  request(url, function(err, res, body) {
    cb(err, body);

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });

  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  for (var i = 0; i < result.length; i++)

  {
    console.log(result[i].avatar_url);
  }


});