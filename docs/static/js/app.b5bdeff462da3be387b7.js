webpackJsonp([1],{"+Al0":function(t,e,o){t.exports=o.p+"static/img/happy.a84d295.png"},"/qur":function(t,e,o){t.exports=o.p+"static/img/cool.d93d74d.png"},"6HYP":function(t,e,o){t.exports=o.p+"static/img/meh.270c9f2.png"},BcDc:function(t,e){},NHnr:function(t,e,o){"use strict";function s(t){o("rJ23")}function n(t){o("SrNG")}function r(t){o("qJnM")}function a(t){o("NJ0j")}function i(t){o("j5yj")}function c(t){o("BcDc")}Object.defineProperty(e,"__esModule",{value:!0});var l=o("7+uW"),u={name:"App"},d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},p=[],h={render:d,staticRenderFns:p},_=h,m=o("VU/8"),f=s,v=m(u,_,!1,f,null,null),g=v.exports,y=o("/ocq"),b={name:"loader"},k=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},x=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"loading"},[o("span",{staticClass:"blob1 blob"}),t._v(" "),o("span",{staticClass:"blob2 blob"}),t._v(" "),o("span",{staticClass:"blob3 blob"})])}],L={render:k,staticRenderFns:x},R=L,w=o("VU/8"),U=n,$=w(b,R,!1,U,"data-v-410bfe5f",null),M=$.exports,C={name:"login",data:function(){return{results:null,errors:[],access_token:this.$route.hash.substring(1),showLoading:!1}},components:{"blob-loader":M},methods:{getHashParams:function(){for(var t,e={},o=/([^&;=]+)=?([^&;]*)/g,s=window.location.hash.substring(1);t=o.exec(s);)e[t[1]]=decodeURIComponent(t[2]);return e},generateRandomString:function(t){for(var e="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=0;s<t;s++)e+=o.charAt(Math.floor(Math.random()*o.length));return e},authorize:function(t){var e=this.generateRandomString(16);localStorage.setItem(t,e);var o="https://accounts.spotify.com/authorize";o+="?response_type=token",o+="&client_id="+encodeURIComponent("2acb1bf4bb054c3a9d24c0256833c1a7"),o+="&scope="+encodeURIComponent("user-read-private user-read-email"),o+="&redirect_uri="+encodeURIComponent("http://localhost:8080/authorize"),o+="&state="+encodeURIComponent(e),window.location=o},login:function(){this.showLoading=!0;var t=(document.getElementById("user-profile-template").innerHTML,document.getElementById("user-profile")),e=(document.getElementById("oauth-template").innerHTML,document.getElementById("oauth"),"spotify_auth_state"),o=this.getHashParams(),s=localStorage.getItem(e);this.access_token.length>0&&(null==o.state||o.state!==s)?alert("There was an error during the authentication"):(localStorage.removeItem(e),this.access_token.length>0?axios.get({url:"https://api.spotify.com/v1/me",headers:{Authorization:"Bearer "+access_token},success:function(e){t.innerHTML=userProfileTemplate(e),window.location.replace("http://localhost:8080/authorize")}}):console.log("Authentication needed, retreiving access token.")),this.authorize(e)}}},E=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t._m(0),t._v(" "),o("h1",[t._v("Moodify")]),t._v(" "),o("p",[t._v("Music to suit your mood.")]),t._v(" "),o("p",[t._v("You must log in to Spotify to use this app.")]),t._v(" "),o("button",{attrs:{id:"login-button"},on:{click:t.login}},[t._v("LOG IN")]),t._v(" "),t.showLoading?o("blob-loader"):t._e()],1)},z=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"login"}},[o("div",{attrs:{id:"user-profile-template"}}),t._v(" "),o("div",{attrs:{id:"user-profile"}}),t._v(" "),o("div",{attrs:{id:"oauth-template"}}),t._v(" "),o("div",{attrs:{id:"oauth"}})])}],I={render:E,staticRenderFns:z},T=I,q=o("VU/8"),A=r,H=q(C,T,!1,A,"data-v-5a401c52",null),j=H.exports,B=o("mtWM"),V=o.n(B),P={name:"moodslider",data:function(){return{moods:{happy:{src:o("+Al0"),text:"happy"},love:{src:o("dyV4"),text:"love"},silly:{src:o("Zqf7"),text:"silly"},surprise:{src:o("rcH9"),text:"surprise"},cool:{src:o("/qur"),text:"cool"},sleepy:{src:o("izrj"),text:"sleepy"},meh:{src:o("6HYP"),text:"meh"},sad:{src:o("iC7B"),text:"sad"}}}},methods:{selectMood:function(t){this.$emit("selected",t.currentTarget.childNodes[0].alt)}}},N=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",t._l(t.moods,function(e){return o("ul",[o("li",{on:{click:t.selectMood}},[o("img",{attrs:{src:e.src,alt:e.text}}),t._v(" "),o("p",[t._v(t._s(e.text))])])])}))},S=[],F={render:N,staticRenderFns:S},J=F,D=o("VU/8"),G=a,Y=D(P,J,!1,G,"data-v-395e0d04",null),O=Y.exports,W={name:"moodify",data:function(){return{results:[],errors:[],query:"______",access_token:this.$route.hash.substring(1),showLoading:!1}},mounted:function(){void 0===this.$ls.get&&this.router.push("login")},components:{"mood-slider":O,"blob-loader":M},methods:{getPlaylist:function(t){var e=this;this.errors=[],this.results=[],this.showLoading=!0,console.log(t),this.query=t;var o={headers:{Authorization:"Bearer ".concat(this.$ls.get("accessToken"))}},s="https://api.spotify.com/v1/search?type=playlist&q="+this.query,n=this;V.a.get(s,o).then(function(t){n.results=t.data.playlists.items,e.showLoading=!1}).catch(function(t){e.errors.push(t),e.showLoading=!1})}}},Z=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{attrs:{id:"loggedIn"}},[o("h1",[t._v("Moodify")]),t._v(" "),o("p",[t._v("Music to suit your mood.")]),t._v(" "),o("p",[t._v("Here are some "+t._s(t.query)+" playlists.")]),t._v(" "),o("mood-slider",{on:{selected:t.getPlaylist}}),t._v(" "),t.showLoading?o("blob-loader"):t._e(),t._v(" "),t.errors&&t.errors.length>0?o("ul",t._l(t.errors,function(e){return o("li",[o("p",{attrs:{id:"error"}},[t._v("Error: "+t._s(e.response.data.error.status)+" - "+t._s(e.response.data.error.message))])])})):t._e(),t._v(" "),t.results&&t.results.length>0?o("ul",t._l(t.results,function(e){return o("li",[o("p",[t._v(t._s(e.name))]),t._v(" "),o("p",[t._v("There are "+t._s(e.tracks.total)+" tracks in this playlist.")]),t._v(" "),o("a",{staticClass:"button",attrs:{target:"_blank",href:e.external_urls.spotify}},[t._v("Listen to tracks")]),t._v(" "),o("router-link",{staticClass:"button",attrs:{id:"playlistLink",to:{name:"tracks",params:{URL:e.tracks.href,openURL:e.external_urls.spotify}}}},[t._v("Display tracks")]),t._v(" "),o("hr")],1)})):t._e()],1)])},X=[],K={render:Z,staticRenderFns:X},Q=K,tt=o("VU/8"),et=i,ot=tt(W,Q,!1,et,"data-v-2368d1f4",null),st=ot.exports,nt={name:"authorize",created:function(){console.log("Authorization token created")},data:function(){var t=location.hash.split("&").map(function(t){return t.split("=")}).reduce(function(t,e){return t[e[0]]=e[1],t},{}),e=t["#access_token"];return this.$ls.set("accessToken",e,36e5),this.$router.push({path:"/moodify#"+e}),{}},methods:{}},rt=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div")},at=[],it={render:rt,staticRenderFns:at},ct=it,lt=o("VU/8"),ut=lt(nt,ct,!1,null,null,null),dt=ut.exports,pt={name:"tracks",data:function(){return{lists:[],errors:[],URL:this.$route.params.URL,openURL:this.$route.params.openURL,showLoading:!0}},components:{"blob-loader":M},mounted:function(){var t=this;console.log(this.URL);var e={headers:{Accept:"application/json",Authorization:"Bearer ".concat(this.$ls.get("accessToken")),"Content-Type":"application/json"}};V.a.get(this.URL,e).then(function(e){t.lists=e.data.items,t.showLoading=!1}).catch(function(e){t.errors.push(e),t.showLoading=!1})}},ht=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h1",[t._v("Moodify")]),t._v(" "),o("p",[t._v("Music to suit your mood.")]),t._v(" "),o("a",{staticClass:"button",attrs:{target:"_blank",href:this.openURL}},[t._v("Listen to tracks")]),t._v(" "),o("router-link",{staticClass:"button",attrs:{to:"/moodify"}},[t._v("Pick another playlist")]),t._v(" "),t.showLoading?o("blob-loader"):t._e(),t._v(" "),t.errors&&t.errors.length>0?o("ul",t._l(t.errors,function(e){return o("li",[o("p",{attrs:{id:"error"}},[t._v("Error: "+t._s(e.response.status)+" - "+t._s(e.response.statusText))])])})):t._e(),t._v(" "),t.lists&&t.lists.length>0?o("ul",t._l(t.lists,function(e){return o("li",[o("p",[t._v(t._s(e.track.name)+" - "+t._s(e.track.artists[0].name))])])})):t._e()],1)},_t=[],mt={render:ht,staticRenderFns:_t},ft=mt,vt=o("VU/8"),gt=c,yt=vt(pt,ft,!1,gt,"data-v-c7ef85d6",null),bt=yt.exports;l.a.use(y.a);var kt=new y.a({mode:"history",routes:[{path:"/",name:"login",component:j},{path:"/moodify",name:"moodify",component:st},{path:"/authorize",name:"authorize",component:dt},{path:"/tracks/:URL/:openURL",name:"tracks",component:bt}]}),xt=o("yXtV"),Lt=o.n(xt),Rt={namespace:"auth___",name:"ls",storage:"local"};l.a.use(Lt.a,Rt),l.a.config.productionTip=!1,new l.a({el:"#app",router:kt,template:"<App/>",components:{App:g}})},NJ0j:function(t,e){},SrNG:function(t,e){},Zqf7:function(t,e,o){t.exports=o.p+"static/img/silly.61b3572.png"},dyV4:function(t,e,o){t.exports=o.p+"static/img/love.531943f.png"},iC7B:function(t,e,o){t.exports=o.p+"static/img/sad.27b92c1.png"},izrj:function(t,e,o){t.exports=o.p+"static/img/sleepy.8f3694c.png"},j5yj:function(t,e){},qJnM:function(t,e){},rJ23:function(t,e){},rcH9:function(t,e,o){t.exports=o.p+"static/img/surprised.8dae223.png"}},["NHnr"]);
//# sourceMappingURL=app.b5bdeff462da3be387b7.js.map