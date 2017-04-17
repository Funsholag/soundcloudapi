
// var play=document.querySelector("#play")
// var pause=document.querySelector("#pause")
// var cover=document.querySelector("#albumpic")
// var titleGo = document.querySelector('#ShowMusicTitle')
// var artistGo = document.querySelector('#ShowArtist')
//
//
// SC.initialize({ client_id: 'fd4e76fc67798bfa742089ed619084a6'
// });
//
// SC.get("/tracks/99444696").then(function(response) {console.log(response);
// });
//
// function Jukebox(){
//  this.player = SC.stream("/tracks/99444696")
// }
//
// var jukebox = new Jukebox()
//
// Jukebox.prototype.play=function(){
//    this.player.then(function(player){
//      player.play();
//   })
// }
//
// Jukebox.prototype.pause=function(){
//    this.player.then(function(player){
//      player.pause();
//    })
//   }
//
//
// play.addEventListener("click", function(event){
//  event.preventDefault();
//  jukebox.play()
//  SC.get("/tracks/99444696").then(function(response){
//    titleGo.innerHTML = response.title;
//    titleGo.setAttribute("href", response.permalink_url);
//    artistGo.innerHTML = response.user.username;
//    artistGo.setAttribute("href", response.user.permalink_url);
//    document.getElementById("genre").innerHTML = "Genre: " + response.genre;
//    document.getElementById("albumpic").src = response.artwork_url;
//    document.getElementById("releasedate").innerHTML = "Date Added: " + response.created_at;
//    document.getElementById("descriptionplace").innerHTML = "Description: " + response.description;
//   // console.log(response);
//  });
// })
//
// pause.addEventListener("click", function(event){
//  event.preventDefault();
//  jukebox.pause()
// })
SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});


var vid = document.getElementById("bgvid");

var playIcon = document.getElementById("play")
var pauseIcon = document.getElementById("pause")
var stopIcon = document.getElementById("stop")
var nextIcon = document.getElementById("next")
var prevIcon = document.getElementById("previous")
var albumPic = document.querySelector("#albumpic")

var index = [0]
var songs = []
var ArtistName = document.querySelector("#ShowArtist")
var linkToArtist = document.querySelector("#linktoartist")
var MusicTitle = document.querySelector("#ShowMusicTitle")
var linkToSong = document.querySelector("#linktosong")
var descriptionPlace = document.querySelector("#descriptionplace")
var GenrePos = document.querySelector("#genrepos")
var ReleaseDate = document.querySelector("#releasedate")
var trackID = [99444696]
var soundsong= SC.stream('/tracks/' + trackID[index])

SC.resolve("https://soundcloud.com/asapferg/shabba-feat-a-ap-rocky-dirty").then(function(response) {
  console.log(response);
});

function Jukebox(songs){
  this.songs= songs

  SC.resolve("https://soundcloud.com/asapferg/shabba-feat-a-ap-rocky-dirty").then(function(response){
    var album = response.artwork_url
    var img = document.createElement('img')
    img.src = album
    albumPic.appendChild(img)
    var title = response.title
    MusicTitle.innerHTML = "Title: " + title
    var titlelink = response.permalink_url
    var a = document.createElement('a')
    a.setAttribute('href', titlelink)
    a.setAttribute('target', '_blank')
    a.innerHTML = "link to track"
    linkToSong.appendChild(a)
    var artist = response.user.username
    ArtistName.innerHTML = "Artist: " + artist
    var artistlink = response.user.permalink_url
    var anchor = document.createElement('a')
    anchor.setAttribute('href', artistlink)
    anchor.setAttribute('target', '_blank')
    anchor.innerHTML = "link to artist page"
    linkToArtist.appendChild(anchor)
    var description = response.description
    descriptionPlace.innerHTML = "Description: " + description
    var genre = response.genre
    GenrePos.innerHTML = "Genre: " + genre
    var month = response.release_month
    var day = response.release_day
    var year = response.release_year
    ReleaseDate.innerHTML = "Release Date: " + month + "/" + day + "/" + year
    console.log(response);
  });

}



Jukebox.prototype.play = function() {
  soundsong.then(function(player){
    player.play()
    player.on("finish", function(){
      player.pause()
      soundsong.currentTime= 0
      pauseIcon.style.color= "#ff4f5a"
      playIcon.style.color= "#2d2d2d"
      player.play()
    })
  })
}

Jukebox.prototype.pause = function() {
  soundsong.then(function(player){
    player.pause()
  })
}

var jukebox = new Jukebox(songs);

playIcon.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.play()
  playIcon.style.color = "#FF1493"
  pauseIcon.style.color = "#000000"
})

pauseIcon.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.pause()
  pauseIcon.style.color = "#FF1493"
  playIcon.style.color = "#000000"
})
