<template>
  <div>
    <h1>Moodify</h1>
    <p>Music to suit your mood.</p>

    <a class="button" target="_blank" :href="this.openURL" @click="tracksOpenPlaylist">Listen to tracks</a>

    <router-link class="button" to="/moodify">Pick another playlist</router-link>

    <!-- blob loader -->
    <blob-loader v-if="showLoading"></blob-loader>

    <!-- error display -->
    <ul v-if="errors && errors.length > 0">
      <li v-for="error in errors">
        <p id="error">Error: {{error.response.status}} - {{error.response.statusText}}</p>
      </li>
    </ul>

    <!-- data from API call 2 - return track list -->
    <ul v-if="lists && lists.length > 0">
      <li v-for="list in lists">
        <p>{{list.track.name}} - {{list.track.artists[0].name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import loader from '@/components/loader';
import axios from 'axios';

export default {
  name: 'tracks',
  data () {
    return {
      lists: [],
      errors: [],
      URL: this.$route.params.URL,
      openURL: this.$route.params.openURL,
      showLoading: true
    }
  },
  components: {
    'blob-loader': loader
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
      // pass URL definition from data
      .get(this.URL, config)
      .then(response => {
        this.lists = response.data.items;
        // turn off loader
        this.showLoading = false;
      })
      .catch(error => {
        this.errors.push(error);
        // turn off loader
        this.showLoading = false;
      });
  },
  methods: {
  tracksOpenPlaylist() {
    this.$ga.event('button-tracks', 'click', 'playlist-tracks', '1');
    }
  }
}
</script>

<style scoped>
ul {
  padding-left: 0px;
  padding-top: 2px;
}
p {
  padding-bottom: 5px;
}
</style>