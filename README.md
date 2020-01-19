# LIRI-Bot

### Overview

In this assignment I was tasked with making a LIRI Bot. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. This is a command line node app that takes in parameters and gives you back data. Programming languages used are Node.js and Javascript.

### How it Works

This application uses 4 node packages. Node-Spotify-Api, Axios, Moment, and DotEnv. The application is capable of searching Spotfiy for songs, Bands in Town For Concerts,and OMDB for movies. To retrieve the data, you'll need to send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. If you wanted to clone this app from github and run it yourself, you would need to supply your own `.env` file that contained a Spotfiy key and secret for it to work.

### Commands

*concert-this "artist name" <br>
*spotify-this-song "song name"<br>
*movie-this "movie name"<br>
*do-what-it-says

### Link to Demo of Application

https://drive.google.com/file/d/1DkqIaTqwl3okDhzdx_73uIzRIL0Y0393/view
