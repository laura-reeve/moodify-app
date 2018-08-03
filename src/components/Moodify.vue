<template>
  <div>
    <div id="loggedIn">
      <p>Music for your Mood</p>
      <p>This is a playlist based on {{query}}</p>
      <form v-on:submit.prevent="getPlaylist">
        <p>I'm feeling like...<input type="text" v-model.lazy="query" placeholder="something"><button type="submit">Go</button></p>
      </form>
      <ul v-if="results && results.length > 0">
       <li v-for="result in results">
         <p>{{result.name}}</p>
         <p>{{result.tracks.href}}</p>
         <!-- I can't get another link from this page to work... -->
         <!-- <buton id="playlistLink" v-on:click="openPlaylist()">{{result.tracks.href}}</button> -->
         <p>There are {{result.tracks.total}} tracks in this playlist.</p>
         <hr/>
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
    let access_token = this.$route.hash.substring(1);
    return {
      results: [],
      errors: [],
      query: '',
      access_token: access_token
    }
  },
  methods: {
    getPlaylist: function () {
      // API call
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
        })
        .catch(error => {
          this.errors.push(error);
        });
    }, /* I have no idea why this doesn't work... do I need a new token?
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
  li {
    list-style-type: none;
}
</style>
