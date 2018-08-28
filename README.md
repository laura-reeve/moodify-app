# Moodify

### A project built with Spotify API authentication, Vue.js, and love.

**NOTE: This is deployed using Firebase. Using Github gh-pages will not work! Authentication uses a '#' then a random string in the URL, so you must be ablt to control where the '#' goes (see "login" function on login.vue).  

**The flow of the app goes like this ...**
* Arrive at Login.vue (home/unauthenticated page)
* Pressing Log In button runs login function on login.vue
* Spotify authentication pop up runs and asks users to log in to their Spotify account
* After successful login, redirect URI is to authorize.vue
* Authorize.vue runs remainder of login function and stores authentication token in local storage (accessToken)
* You will need the authentication token to route anywhere else within the app or you will receive an error
* User is automatically routed to moodify.vue
* This is where the user clicks an emoji or descriptive word to generate a list of Spotify playlists (API call #1)
* User receives a list of playlists based on mood clicked and has option to show tracks or play tracks
* Show tracks takes user to tracks.vue (API call #2) where they are shown the "Title - Artist" for each playlist
* Note that "Artist" is an object in API call #2 (my code references [0] to return the first instance)
* On either moodify.vue or tracks.vue, if user clicks on Listen to Tracks button, new tab will open with Spotify web player, which is used to open the playlist and play all tracks within (no authentication token needed here)

This was built for a final capstone project for the Web Dev Certificate at Seattle University (2018)
This is also a constant work in progress, forks and pull requests welcome!  

Don't forget the webpack basics!
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
