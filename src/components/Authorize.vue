<template>
  <div>
    <!-- Nothing to see here, move along to /moodify -->
  </div>
</template>

<script>
export default {
  name: 'Authorize',
  created: function() {
    console.log("Authorization token created");
  },
  data() {
    let hash2Obj = location.hash
      .split("&")
      .map(el => el.split("="))
      .reduce((pre, cur) => {
        pre[cur[0]] = cur[1];
        return pre;
      }, {});
    let accessCode = hash2Obj["#access_token"];
    // let searchUri = "search/" + accessCode;
    // let authorizedHome = "/#" + accessCode;
    this.$router.push({ path: `/moodify#${accessCode}`});
    return {};
  },
  methods: {
    /* This will not work. Token must be stored in the URL.
      storeToken: function () {
      console.log('Caching access token.');
      this.accessToken = this.$route.query.access_token;

      let cacheLable = ' access_token' + accessToken;
      let cacheExpiry = 60 * 60* 1000; // 60 minutes

      this.$ls.set(cacheLable, cacheExpiry);
      console.log('Access token has been stored for 1 hour.'); */
    }
  }
</script>