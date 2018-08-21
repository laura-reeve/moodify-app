<template>
  <div>
    <div id="login">
      <div id="user-profile-template"></div>
      <div id="user-profile"></div>
      <div id="oauth-template"></div>
      <div id="oauth"></div>
    </div>
    <h1>Moodify</h1>
    <p>Music to suit your mood.</p>
      <p>You must log in to Spotify to use this app.</p>
      <p><button id="login-button" v-on:click="login">LOG IN</button></p>
      <!-- blob loading animation -->
      <blob-loader v-if="showLoading"></blob-loader>
  </div>
</template>

<script>
import Loader from '@/components/Loader';

export default {
  name: 'Login',
  data () {
    let access_token = this.$route.hash.substring(1);
    return {
      results: null,
      errors: [],
      access_token: access_token,
      showLoading: false
    };
  },
  components: {
    'blob-loader': Loader
  },
  methods: {
    getHashParams: function() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
    },
    generateRandomString: function(length) {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
    },
    authorize: function(stateKey) {
            var client_id = '2acb1bf4bb054c3a9d24c0256833c1a7'; // Your client id
            var redirect_uri = 'http://localhost:8080/authorize'; // Your redirect uri TEST
          //  var redirect_uri = 'https://moodify-app.firebaseapp.com/authorize'; // Your redirect uri PROD
            var state = this.generateRandomString(16);
            localStorage.setItem(stateKey, state);
            var scope = 'user-read-private user-read-email';
            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            window.location = url;
    },
    login: function () {

      // show loading animation
      this.showLoading = true;

          // display login information 
      var userProfileSource = document.getElementById('user-profile-template').innerHTML,
      //  userProfileTemplate = Handlebars.compile(userProfileSource),
          userProfilePlaceholder = document.getElementById('user-profile');
      var oauthSource = document.getElementById('oauth-template').innerHTML,
      //  oauthTemplate = Handlebars.compile(oauthSource),
          oauthPlaceholder = document.getElementById('oauth');

      let stateKey = "spotify_auth_state";
      let params = this.getHashParams();
      let storedState = localStorage.getItem(stateKey);
      if (
        this.access_token.length > 0 &&
        (params.state == null || params.state !== storedState)
      ) {
        alert("There was an error during the authentication");
      } else {
        localStorage.removeItem(stateKey);
        if (this.access_token.length > 0) {
          axios.get({
            url: "https://api.spotify.com/v1/me",
            headers: {
              Authorization: "Bearer " + access_token
            },
            success: function(response) {
              userProfilePlaceholder.innerHTML = userProfileTemplate(response);
              window.location.replace("http://localhost:8080/authorize") // TEST
            //  window.location.replace("http://moodify-app.firebaseapp.com/authorize")  // PROD
            }
          });
        } else {
          console.log("Authentication needed, retreiving access token.");
        }
      }
      this.authorize(stateKey);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login-button {
    background-color: #5cb85c;
    margin-top: 20px;
    padding: 7px 50px;
    border-radius: 30px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: white;
  }
</style>