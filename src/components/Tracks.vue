<template>
  <div>
    <h1>Moodify</h1>
    <p>Music to suit your mood.</p>

    <!-- data from Moodify 
    <p>This is the {{playlistData.name}} playlist.</p>
    <p>There are {{playlistData.tracks.total}} songs in this playlist.</p> -->
    <a class="button" target="_blank" :href="this.openURL">Listen to tracks</a>

    <router-link class="button" to="/Moodify">Pick another playlist</router-link>

      <!-- blob loader -->
      <blob-loader v-if="showLoading"></blob-loader>

      <!-- error display -->
        <ul v-if="errors && errors.length > 0">
          <li v-for="error in errors">
            <p id="error">Error: {{error.response.status}} - {{error.response.statusText}}</p>
          </li>
        </ul>

      <!-- data from Tracks -->
      <ul v-if="lists && lists.length > 0">
        <li v-for="list in lists"> 
          <p>{{list.track.name}} - {{list.track.artists[0].name}}</p>
        </li>
      </ul>
  </div>
</template>

<script>
// treat Moodify as the child component?
import Moodify from '@/components/Moodify';
import Loader from '@/components/Loader';
import axios from 'axios';

export default {
  name: 'Tracks',
  data () {
    return {
      playlistData: [],
      lists: [],
      errors: [],
      URL: this.$route.params.URL,
      openURL: this.$route.params.openURL,
      showLoading: true
    }
  },
  components: {
    'moodify': Moodify,
    'blob-loader': Loader
  },
  mounted: function () {
      console.log(this.URL);
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer ".concat(this.$ls.get('accessToken')),
          "Content-Type": "application/json"
        }
      };
      axios
      // pass URL definition in route-link from Moodify?
        .get(this.URL, config)
        .then(response => { 
            console.log("Works so far...");
            this.lists = response.data.items;
            this.showLoading = false;
          })
        .catch(error => {
          this.errors.push(error);
          this.showLoading = false;
        }); 
  }
}
</script>

<style scoped>
.button {
    background-color: #5cb85c;
    padding: 7px 50px;
    margin-bottom: 10px;
    border-radius: 30px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: white;
    text-decoration: none;
}
#error {
  color: red;
}
li {
  list-style-type: none;
}
ul {
  padding-left: 0px;
  padding-top: 10px;
}
</style>