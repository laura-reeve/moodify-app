<template>
  <div>
    <ul v-for="mood in moods">
      <li @click="selectMood">
        <img :src="mood.src" :alt="mood.text">
        <p>{{mood.text}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
name: 'moodslider',
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
/* Responsive emoji */
@media screen and (max-width: 5000px) {
  img {
    max-width: 100px;
  }
}

@media screen and (max-width: 900px) {
  img {
    max-width: 90px;
  }
}

@media screen and (max-width: 600px) {
  img {
    max-width: 70px;
  }
}

@media screen and (max-width: 450px) {
  img {
    max-width: 50px;
  }
}

ul {
  list-style-type: none;
  display: inline-block;
}

div {
  background-color: white;
  color: black;
  border-radius: 10px;
  margin-top: 30px;
}
</style>