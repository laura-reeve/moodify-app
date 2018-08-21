<template>
  <div>
    <h1>Moodify</h1>
    <p>Music to suit your mood.</p>

    <!-- data from Moodify -->
    <p>This is the {{playlistData.name}} playlist.</p>
    <p>There are {{playlistData.tracks.total}} songs in this playlist.</p>
    <button @click="playMusic(playlistData.external_urls.spotify)">Listen to playlist</button> 

<!-- can I do a router-link here to go back to Moodify? -->

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

export default {
  name: 'Tracks',
  data () {
    let access_token = this.$route.hash.substring(1);
    return {
      playlistData: [],
      lists: [],
      access_token: access_token
    }
  },
  components: {
    'moodify': Moodify 
  },
  mounted: {
    getTracks: function () {
      // localStorage.getItem('accessToken');
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer ".concat(this.access_token),
          "Content-Type": "application/json"
        }
      };
      axios
      // need to define URL = result.tracks.href from first API call...
        .get(playlistData.tracks.href, config)
        .then(response => { 
            console.log("Works so far...");
            this.lists = response.data.items;
            this.showLoading = false;
          })
        .catch(error => {
          this.errors.push(error);
          this.showLoading = false;
        }); 
    },
    methods: {
      playMusic: function (external_url) {
        window.location.replace(external_url);
      }
    }
  }
}
</script>

<style scoped>
button {
    background-color: #5cb85c;
    padding: 7px 50px;
    margin-bottom: 10px;
    border-radius: 30px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: white;
}
</style>