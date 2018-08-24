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

      <!-- error list -->
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

          <router-link class="button" id="playlistLink" v-bind:to="{name: 'tracks', params: { URL: result.tracks.href, openURL: result.external_urls.spotify }}">Display tracks</router-link>

          <!-- API call 2 - return track list refactored to Tracks.vue-->
          <!-- switch to a different view here -->

          <hr/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moodslider from '@/components/moodslider';
import loader from '@/components/loader';

export default {
  name: 'moodify',
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
      this.router.push("login");
    } else {
      // go to moodify
    }
  },
  components: {
    'mood-slider': moodslider,
    'blob-loader': loader,
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
    }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  padding: 0 10px 0 10px;
}
hr {
  margin-top: 20px;
}
</style>
