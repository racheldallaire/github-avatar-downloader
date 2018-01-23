//Required modules

var token = require('./secrets.js');
var request = require('request');
var fs = require('fs');

//Welcome message

console.log('Welcome to the GitHub Avatar Downloader!');

//Function for getting URL from command line input

function getRepoContributors(repoOwner, repoName, cb) {
  var url = "https://api.github.com/repos/" + process.argv[2] + "/" + process.argv[3] + "/contributors";

//If statements to require user input
  if (!process.argv[2] || !process.argv[3]) {
  console.log('Error: Please enter a valid repo owner and/or name.');
  return;
  }

  var options = {
    url: "https://api.github.com/repos/" + process.argv[2] + "/" + process.argv[3] + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

//Making sure the data is accessed as a JSON object rather than a massive string

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });

}

//Iterating through the array to access variables needed for callback function

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  for (var i = 0; i < result.length; i++)

  {
     var youareL =  result[i].avatar_url;
     var path = "./downloadedAvatars/" + result[i].login + result[i].id;

      downloadImageByURL(youareL, path);
  }

});

//Callback function used to download image, gives output for user readability

function downloadImageByURL(url, filePath) {

  request.get(url)
          .on('error', function (err) {
            throw err;
          })
          .on('end', function() {
          console.log('Download complete.');
          })
          .pipe(fs.createWriteStream(filePath));

}