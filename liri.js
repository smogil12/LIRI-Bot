require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var query = process.argv[3];
var option = process.argv[2];

var spotify = new Spotify(keys.spotify);

switch (option) {
  case "movie-this":
    movieThis(query);
    break;
  case "spotify-this-song":
    spotifyCall(query);
    break;
  case "concert-this":
    concertThis(query);
    break;
  default:
    fs.readFile("random.txt", "utf8", function(error, data) {
      var data = data.split(",");
      var thatWay = data[1];
      if (error) {
        return console.log(error);
      }
      spotifyCall(thatWay);
    });
}

function spotifyCall(songName) {
  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(
      "\n_Track Info_" +
        "\nArtist: " +
        data.tracks.items[0].artists[0].name +
        "\nSong: " +
        data.tracks.items[0].name +
        "\nLink: " +
        data.tracks.items[0].external_urls.spotify +
        "\nAlbum: " +
        data.tracks.items[0].album.name +
        "\n" +
        "\nGreat song! Search another"
    );
  });
}
