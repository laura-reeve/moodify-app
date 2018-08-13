<template>
  <div>
    <div id="loggedIn">
      <p>Music for your Mood</p>
      <p>This is a playlist based on {{query}}</p>
      
      <!-- mood slider goes here -->
      <mood-slider @selected="getPlaylist"></mood-slider>
      
      <!-- Blob loader animation -->
      <blob-loader v-if="showLoading"></blob-loader>

      <!-- API call 1 - return playlist objects -->
      <ul v-if="results && results.length > 0">
       <li v-for="result in results">
         <p>{{result.name}}</p>
         <p id="playlistLink">{{result.tracks.href}}</p>
         <!-- I can't get another link from this page to work... -->
         <!-- <button id="playlistLink" v-on:click="openPlaylist()">{{result.tracks.href}}</button> -->
         <p>There are {{result.tracks.total}} tracks in this playlist.</p>
         
         <!-- put accordian menu here - hide display first and then show on click -->
          <ul v-if="lists && lists.length > 0">
            <li v-for="list in lists">
              <p>{{list.name}} - {{list.artists}}</p>
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
  methods: {
    getPlaylist: function (someValue) {
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
          
          // second API call for playlist href - this is not working rrgh!
          axios.get(document.getElementById("playlistLink").innerHTML, config)
          })
          .then(response => {
            console.log("second function works");
            self.lists = response.data.track.items;
            this.showLoading = false;
          })
        .catch(error => {
          this.errors.push(error);
        });
    }, /* I think this second function doesn't work as a separate second API call...
      openPlaylist: function () {
        let config = {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer ".concat(this.access_token),
          "Content-Type": "application/json"
        }
      };
        let URL = document.getElementById("playlistLink").innerHTML;
      axios
        .get(URL, config)
        .then(response => { 
          fetch(URL, {
          headers: {
            Accept: "application/json",
            Authorization: this.access_token,
            "Content-Type": "application/json"
            }
          });
        })
        .catch(error => {
          this.errors.push(error);
        }); 
      } */
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  padding-left: 0px;
}

li {
    list-style-type: none;
}
</style>
