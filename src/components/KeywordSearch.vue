<template>
  <div>
    <p>Music for your Mood</p>
    <p>This is a playlist based on {{query}}</p>
    <form v-on:submit.prevent="getPlaylist">
      <p>I'm feeling like...<input type="text" v-model.lazy="query" placeholder="something"><button type="submit">Go</button></p>
    </form>
    <ul v-if="results && results.length > 0">
      <li v-for="result in results">
        <p>{{playlists.items.name}}</p>
        <p>{{playlists.items.tracks}}</p>
      </li>
    </ul>      
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KeywordSearch',
  data () {
    return {
      results: null,
      errors: [],
      query: ''
    }
  },
  methods: {
    getPlaylist: function () {
      // API call
      // I am trying to use this API call https://developer.spotify.com/web-api/console/get-search-item/#complete

      axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: this.query,
          type: "playlist"
        }
      })
      .then(response => {
        this.results = response.data;
      })
      .catch(error => {
        this.errors.push(error);
      })

      // Authorization - I can't get this to work :(
        // This is trying the npm node way https://www.npmjs.com/package/vue-spotify
        // With also these instructions https://github.com/thelinmichael/spotify-web-api-node
        // Here's the Authentication section, this is trying Client Credentials (I just want a playlist to appear)
        // https://github.com/thelinmichael/spotify-web-api-node#authorization
        // I have written the import statements in the src/main.js file 
        // The error is that it does not recognize the custom functions - clientCredentialsGrant() for example
      var SpotifyWebApi = require('spotify-web-api-node');

      var clientId = '2acb1bf4bb054c3a9d24c0256833c1a7',
      clientSecret = '069269d06de84e21a59dfaedc91074db';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });
    } 
  }
}

// I have also tried the Implict Grant flow https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow
// This just says that I am making a bad call (Error 400)
// I was using this API request from Postman https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http://localhost:8080&scope=user-read-private user-read-email&response_type=token&state=123
// That is my client ID and all the rest

// I even tried with some other code to make my own unique state (instead of 123) using a .random function
// I got that idea from here https://github.com/spotify/web-api-auth-examples/blob/master/implicit_grant/public/index.html
// Using this link I had gotten the closest I had ever gotten to getting this to work.
// I cut and paste a few things from here to make my own authentication call
// A popup window opened with the window.location (URL) in it, but nothing was displayed and nothing happened
// And I am unable to use their sample #loggedin show/hide commands because Vue didn't like some commands like {{images.0.url}}
// And I don't know enough about the handlebars template to get anything to display
// That's where I stopped - I got the URL to work, but I couldn't get anything to display saying "You've logged in" or "Here's your playlist"
// This is the only example that I could get working in my browser so that you can see how it's supposed to work http://jsfiddle.net/JMPerez/62wafrm7/
// At this point, I have spent way more time on authentication than I have on the actual assignment, so I think I should stop here 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
