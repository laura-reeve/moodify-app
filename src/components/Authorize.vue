<template>
  <div>
    <p>Congrats, you have been authorized.</p>
    <p>Logged in as {{display_name}}</p>
    <router-link to="/">Return Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Authorize',
  methods: {

  }
}
</script>