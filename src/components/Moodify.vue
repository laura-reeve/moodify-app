<template>
  <div>
    <div id="login">
      <div id="user-profile-template"></div>
      <div id="user-profile"></div>
      <div id="oauth-template"></div>
      <div id="oauth"></div>
    </div>
    <div id="loggedIn">
      <p>Music for your Mood</p>
      <p>This is a playlist based on {{query}}</p>
      <form v-on:submit.prevent="getPlaylist">
        <p>I'm feeling like...<input type="text" v-model.lazy="query" placeholder="something"><button type="submit">Go</button></p>
      </form>
      <ul v-if="results && results.length > 0">
       <li v-for="result in results">
         <p>{{result.name}}</p>
         <p>{{result.tracks}}</p>
       </li>
      </ul>
    </div>      
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Moodify',
  data () {
    return {
      results: [],
      errors: [],
      query: '',
    }
  },
  methods: {
    /* created: function () {

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
              window.location.replace("http://localhost:8080/authorize")
            }
          });
        } else {
          console.log("Authentication not recognized, please try again, or sign up with an account at Spotify.");
        }
      }
      this.authorize(stateKey);
    }, */
    getPlaylist: function () {
      // API call
  
      let config = {
        headers: {
          Authorization: "Bearer ".concat(this.access_token)
        }
      };
        let URL = `https://api.spotify.com/v1/search?type=playlist&mood=${this.query}`;
      let self = this;
      axios
        .get(URL, config)
        .then(response => {
          self.results = response.data.playlists.items;
        })
        .catch(error => {
          this.errors.push(error);
        });
      } 
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
