//--VARIABLE DECLARATION--


// Using the require keyword lets us access all of the exports
// in our keys.js file
var keys = require("./keys.js");
// Include the twitter,Spotify and request NPM packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// Load the fs package to read and write
var fs = require("fs");
// Take two arguments.
// The first will be the action (i.e. my-tweets,spotify-this-song,movie-this and do-what-it-says)
var action = process.argv[2];
var value = process.argv[3];
//If no song is provided then your program will default to "The Sign" by Ace of Base.
var defaultSong = "The Sign";
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
var defaultMovie = "Mr. Nobody";


var twitterKeys = keys.twitterKeys;




//------SWITCH FUCTION-----
	// The switch-case will direct which function gets run.
	function Switch(action, value){
	switch (action) {
		case "my-tweets":
		    tweets();
		    break;

		case "spotify-this-song":
		    spotify(value);
		    break;

		case "movie-this":
		    movie(value);
		    break;

		case "do-what-it-says":
		    doThat();
		    break;
	}
};
// ----END SWITCH FUNCTION----


//-- TWEETS FUNCTION--

	function tweets() {
         
	 
		// set up credentials object for Twitter access
		var client = new Twitter({
			consumer_key: twitterKeys.consumer_key,
			consumer_secret: twitterKeys.consumer_secret,
			access_token_key: twitterKeys.access_token_key,
			access_token_secret: twitterKeys.access_token_secret
		});
        
        var params = {
		screen_name: 'goswamiruchi1',
		count: 20
	    };
	     console.log("-----------My last 20 tweets------------");
		// get the 20 most recent tweets
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			
	            for (var i=0; i<tweets.length; i++) {
	            	console.log("");
	            	console.log('**********************************************************************************');
			          console.log('TWEET TIME  :' + tweets[i].created_at);
			          console.log('TWEET  :' + tweets[i].text);
			        console.log('***********************************************************************************');
			        console.log("");
			
		}
	            
	             }
	            }); 
	           };
	//---END TWEETS FUNCTION---
	

    //----SPOTIFY FUNCTION
	function spotify(value){
		       var spotify = new Spotify({
		  id: "06b21c633c954b59ad900c899c37fa5d",
		  secret: "50536d340632464f82146317bb31cb70"
		});
		var song = value;
		if(song===undefined|| song===null|| song===''){
			song=defaultSong;
		}      
		 
		spotify.search({ type: 'track', query: song }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		  var data = data.tracks.items[0];
		 console.log("**********************************************");
		    console.log("Artist: " + data.artists[0].name);
	        console.log("The song's name : " + data.album.name);
	        console.log("The album that the song is from : " + data.name);
	        console.log("Preview link : " + data.preview_url);
	     console.log("**********************************************");

    });
	}           
	//---END SPOTIFY FUNCTION---  

	//--MOVIE FUNCTION---
	function movie(value){

   
        var movieName = value;
        if(movieName===undefined|| movieName===null|| movieName===''){
			movieName=defaultMovie;
		}  
        var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece"
        request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log("*************************************");
        console.log("*************************************")
		        var bodyJson = JSON.parse(body);
		        var ratings= bodyJson.Ratings;
		        var rottenTommRating='';
		        for(var i=0; i<ratings.length;i++){
		        	if(ratings[i].Source==='Rotten Tomatoes'){
		        		rottenTommRating=ratings[i].Value;
		        	}
		        }
	        console.log("Title of the movie : " + bodyJson.Title);
	        console.log("Year the movie came out : " + bodyJson.Year);
	        console.log("IMDB Rating of the movie :" + bodyJson.imdbRating);
	        console.log("Rotten Tomatoes Rating of the movie : " + rottenTommRating);
	         console.log("Country where the movie was produced : " + bodyJson.Country);
	        console.log("Language of the movie : " + bodyJson.Language);
	        console.log("Plot of the movie : " + bodyJson.Plot);
	        console.log("Actors in the movie :" + bodyJson.Actors);
	    console.log("*************************************");
	    console.log("*************************************");


	    });     
	}

//--END MOVIE FUNCTION--

//--DOTHAT FUNCTION--
function doThat(){
  fs.readFile('random.txt', "utf8", function(err, data){
  	if (err) {
    return console.log(err);
    }
    var text = data.split(',');
    console.log(text[0])
    action = text[0];
    value = text[1];

   Switch(action, value);

  });
}
Switch(action, value);

	
	
	          
    