<template>
  <div>
    <div id="login" v-show="mustLogin">
      <p>You must log in to Spotify to use this app.</p>
      <p><button id="login-button" @click="login">Log In</button></p>
      <div id="user-profile-template"></div>
      <div id="user-profile"></div>
      <div id="oauth-template"></div>
      <div id="oauth"></div>
    </div>
    <div id="loggedIn" v-show="loggedIn">
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
      query: '',
      mustLogin: true,
      loggedIn: false
    }
  },
  methods: {
    login: function () {

    var stateKey = 'spotify_auth_state';
        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }
        /**
         * Generates a random string containing numbers and letters
         * @param  {number} length The length of the string
         * @return {string} The generated string
         */
        function generateRandomString(length) {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        };
        var userProfileSource = document.getElementById('user-profile-template').innerHTML,
//            userProfileTemplate = Handlebars.compile(userProfileSource),
            userProfilePlaceholder = document.getElementById('user-profile');
        var oauthSource = document.getElementById('oauth-template').innerHTML,
//            oauthTemplate = Handlebars.compile(oauthSource),
            oauthPlaceholder = document.getElementById('oauth');
    
        var params = getHashParams();
        
        var access_token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);
        
        if (access_token && (state == null || state !== storedState)) {
          alert('There was an error during the authentication');
        } else {
          localStorage.removeItem(stateKey);
          if (access_token) {
            axios.get({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                  this.mustLogin = false,
                  this.loggedIn = true
                  }
            });
          } else {
              this.mustLogin = true,
              this.loggedIn = false
          }
          
          var authorize = function() {
            var client_id = '2acb1bf4bb054c3a9d24c0256833c1a7'; // Your client id
            var redirect_uri = 'http://reevedesigns.com/spotify-weather-app/authorize'; // Your redirect uri
            var state = generateRandomString(16);
            localStorage.setItem(stateKey, state);
            var scope = 'user-read-private user-read-email';
            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            window.location = url;
          };
        }
      authorize (); 
    },

    getPlaylist: function () {
      // API call
  
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
    } 
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
