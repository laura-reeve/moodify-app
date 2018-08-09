<template>
  <div>
    <ul v-for="mood in moods">
      <li v-on:click="selectMood">
        <img :src="mood.src" :alt="mood.text">
        <p>{{mood.text}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
name: 'moodSlider',
data () {
  return {
    moods: {
      happy: {
        src: require('@/assets/happy.png'),
        text: "happy"
      },
      love: {
        src: require('@/assets/love.png'),
        text: "love"
      },
      silly: {
        src: require('@/assets/silly.png'),
        text: "silly"
      },
      surprise: {
        src: require('@/assets/surprised.png'),
        text: "surprise"
      },
      cool: {
        src: require('@/assets/cool.png'),
        text: "cool"
      },
      sleepy: {
        src: require('@/assets/sleepy.png'),
        text: "sleepy"
      },
      meh: {
        src: require('@/assets/meh.png'),
        text: "meh"
      },
      sad: {
        src: require('@/assets/sad.png'),
        text: "sad"
        }, 
      }
    } 
  },
  methods: {
    selectMood: function (event) {
      this.$emit('selected', event.currentTarget.childNodes[0].alt)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
ul {
  list-style-type: none;
  display: inline-block;
}
</style>