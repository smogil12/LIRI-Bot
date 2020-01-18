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
  case "do-what-it-says":
    doThing();
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

function movieThis(movieName) {
  if (!movieName) {
    movieName = "Mr. Nobody";
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    if (!movieName) {
      movieName = "Mr. Nobody";
    }
    console.log(
      "\n_Movie Info_" +
        "\nTitle: " +
        response.data.Title +
        "\nRelease Year: " +
        response.data.Year +
        "\nRating: " +
        response.data.Rated +
        "\nRelease Country: " +
        response.data.Country +
        "\nLanguage: " +
        response.data.Language +
        "\nPlot: " +
        response.data.Plot +
        "\nActors: " +
        response.data.Actors +
        "\n" +
        "\n Great Movie!"
    );
  });
}

function doThing() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    var txt = data.split(",");

    spotifyCall(txt[1]);
  });
}

function concertThis(artist) {
  const url = "https://rest.bandsintown.com/artists/" + artist + "/events?";
  axios
    .get(url, {
      params: {
        app_id: "codingbootcamp"
      }
    })
    .then(function(res) {
      const concerts = res.data;
      for (var i = 0; i < concerts.length; i++) {
        console.log("=======");
        console.log("Venue: " + concerts[i].venue.name);
        console.log(
          "Location: " +
            concerts[i].venue.city +
            ", " +
            concerts[i].venue.region +
            " " +
            concerts[i].venue.country
        );
        console.log(
          "When: " +
            moment(concerts[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")
        );
      }
    })
    .catch(console.error);
}
