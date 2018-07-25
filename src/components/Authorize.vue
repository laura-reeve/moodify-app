<template>
  <div>
    <p>Congrats, you have been authorized.</p>
    <router-link to="/" v-on:click="storeToken">Return Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Authorize',
  methods: {
    storeToken: function () {
      console.log('Caching access token.');
      this.accessToken = this.$route.query.access_token;

      let cacheLable = ' access_token' + accessToken;
      let cacheExpiry = 60 * 60* 1000; // 60 minutes

      this.$ls.set(cacheLable, cacheExpiry);
      console.log('Access token has been stored for 1 hour.');
      }
    }
  }
</script>