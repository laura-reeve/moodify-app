<template>
  <div>
    <div id="loggedIn">
      <h1>Moodify</h1>
      <p>Music to suit your mood.</p>
      <p>Here are some {{query}} playlists.</p>
      
      <!-- mood slider goes here -->
      <mood-slider @selected="getPlaylist"></mood-slider>
      
      <!-- blob loader animation -->
      <blob-loader v-if="showLoading"></blob-loader>

      <!-- error list OK now this isn't displaying WTF -->
        <ul v-if="errors && errors.length > 0">
          <li v-for="error in errors">
            <p id="error">Error: {{error.response.data.error.status}} - {{error.response.data.error.message}}</p>
          </li>
        </ul>

      <!-- API call 1 - return playlist objects -->
      <ul v-if="results && results.length > 0">
       <li v-for="result in results">
         <p>{{result.name}}</p>
         <p>There are {{result.tracks.total}} tracks in this playlist.</p>
         <a class="button" target="_blank" :href="result.external_urls.spotify">Listen to tracks</a>

         <router-link class="button" id="playlistLink" v-bind:to="{name: 'Tracks', params: { URL: result.tracks.href, openURL: result.external_urls.spotify }}">Display tracks</router-link>

          <!-- API call 2 - return track list refactored to tracks.vue-->
          <!-- switch to a different view here -->
         
         <hr/>
        </li>
      </ul>
    </div>      
  </div>
</template>

<script>
import axios from 'axios';
import moodSlider from '@/components/moodSlider';
import Loader from '@/components/Loader';

export default {
  name: 'Moodify',
  data () {
    let access_token = this.$route.hash.substring(1);
    return {
      results: [],
      errors: [],
      query: '______',
      access_token: access_token,
      showLoading: false
    }
  },
  mounted: function () {
    if (this.$ls.get === undefined) { // if no token, redirect to Login
      this.router.push("Login");
    } else {
      
    }
  },
  components: {
    'mood-slider': moodSlider,
    'blob-loader': Loader,
  },
  props: {
    playlistData: [] // this is not connecting to results to return data in Tracks
  },
  methods: { //Return list of playlists
    getPlaylist: function (someValue) {
      // clear errors 
      this.errors = [];
      // clear previous playlists
      this.results = [];
      // show blob loading animation
      this.showLoading = true;
      // API call
      console.log(someValue);
      this.query = someValue;
      let config = {
        headers: {
          Authorization: "Bearer ".concat(this.$ls.get("accessToken"))
        }
      };
        let URL = `https://api.spotify.com/v1/search?type=playlist&q=${this.query}`;
      let self = this;
      axios
        .get(URL, config) 
        .then(response => {
          self.results = response.data.playlists.items;
          // turn off loader
          this.showLoading = false;
          })
        .catch(error => {
          this.errors.push(error);
          // turn off loader
          this.showLoading = false;
        });
    } /* Retiring this method in favor of router-link // Return list of tracks - artists
      openPlaylist: function (URL) {
        // clear errors 
        this.errors = [];
        // show loader
        this.showLoading = true;
        
        // this.$router.push({ path: `/tracks#${this.access_token}`});
      } */
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul {
  padding: 0 10px 0 10px;
}

li {
    list-style-type: none;
}
#error {
  color: red;
}
.button {
    background-color: #5cb85c;
    padding: 7px 50px;
    margin-bottom: 20px;
    border-radius: 30px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: white;
    text-decoration: none;
}
hr {
  margin-top: 30px;
}
</style>
