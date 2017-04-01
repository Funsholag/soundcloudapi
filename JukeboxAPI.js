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

  SC.get("/tracks/99444696").then(function(response){
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
// SC.resolve("https://soundcloud.com/asapferg/shabba-feat-a-ap-rocky-dirty").then(function(response) {
//   var album = response.artwork_url
//   var img = document.createElement('img')
//   img.src = album
//   albumPic.appendChild(img)
//   var title = response.title
//   MusicTitle.innerHTML = "Title: " + title
//   var titlelink = response.permalink_url
//   var a = document.createElement('a')
//   a.setAttribute('href', titlelink)
//   a.setAttribute('target', '_blank')
//   a.innerHTML = "link to track"
//   linkToSong.appendChild(a)
//   var artist = response.user.username
//   ArtistName.innerHTML = "Artist: " + artist
//   var artistlink = response.user.permalink_url
//   var anchor = document.createElement('a')
//   anchor.setAttribute('href', artistlink)
//   anchor.setAttribute('target', '_blank')
//   anchor.innerHTML = "link to artist page"
//   linkToArtist.appendChild(anchor)
//   var description = response.description
//   descriptionPlace.innerHTML = "Description: " + description
//   var genre = response.genre
//   GenrePos.innerHTML = "Genre: " + genre
//   var month = response.release_month
//   var day = response.release_day
//   var year = response.release_year
//   ReleaseDate.innerHTML = "Release Date: " + month + "/" + day + "/" + year
// })

}

// SC.stream('track').then(function(player){
//   this.player.play();
// });


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
