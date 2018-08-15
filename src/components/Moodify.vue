<template>
  <div>
    <div id="loggedIn">
      <p>Music for your Mood</p>
      <p>This is a playlist based on {{query}}</p>
      
      <!-- mood slider goes here -->
      <mood-slider @selected="getPlaylist"></mood-slider>
      
      <!-- Blob loader animation -->
      <blob-loader v-if="showLoading"></blob-loader>

      <!-- Error list -->
        <ul v-if="errors.length > 0">
          <li v-for="error in errors">
            <p>{{error.response}}</p>
          </li>
        </ul>

      <!-- API call 1 - return playlist objects -->
      <ul v-if="results && results.length > 0">
       <li v-for="result in results">
         <p>{{result.name}}</p>
         <p>There are {{result.tracks.total}} tracks in this playlist.</p>

         <button id="playlistLink" @click="openPlaylist(result.tracks.href)">Show me tracks</button>

          <!-- API call 2 - return track list -->
          <ul v-if="lists && lists.length > 0">
            <li v-for="list in lists"> 
              <p>{{list.track.name}} - {{list.track.artists[0].name}}</p>
            </li>
          </ul>
         
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
      lists: [],
      errors: [],
      query: '',
      access_token: access_token,
      showLoading: false
    }
  },
  components: {
    'mood-slider': moodSlider,
    'blob-loader': Loader
  },
  methods: { //Return list of playlists
    getPlaylist: function (someValue) {
      // clear errors 
      this.errors.clear;
      // show blob loading animation
      this.showLoading = true;
      // API call
      console.log(someValue);
      this.query = someValue;
      let config = {
        headers: {
          Authorization: "Bearer ".concat(this.access_token)
        }
      };
        let URL = `https://api.spotify.com/v1/search?type=playlist&q=${this.query}`;
      let self = this;
      axios
        .get(URL, config) 
        .then(response => {
          self.results = response.data.playlists.items;
          this.showLoading = false;
          })
        .catch(error => {
          this.errors.push(error);
          this.showLoading = false;
        });
    }, // Return list of tracks - artists
      openPlaylist: function (URL) {
        let config = {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer ".concat(this.access_token),
          "Content-Type": "application/json"
        }
      };
      axios
        .get(URL, config)
        .then(response => { 
            console.log(URL);
            this.lists = response.data.items;
            this.showLoading = false;
          })
        .catch(error => {
          this.errors.push(error);
          this.showLoading = false;
        }); 
      } 
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
.error {
  color: red;
}
</style>
