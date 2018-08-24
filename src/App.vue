<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: black;
}
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
  margin-top: 60px;
}
li {
    list-style-type: none;
}
#error {
  color: red;
}
.button {
    background-color: #5cb85c;
    margin: 5px;
    display: inline-block;
    padding: 7px 50px;
    border-radius: 30px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    color: white;
    text-decoration: none;
}
</style>
