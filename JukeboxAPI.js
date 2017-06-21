
SC.initialize({client_id: 'QcfpeasymrnTbJJoanZ9kjWdzHZjfzXW'});

var playIcon = document.getElementById("play")
var pauseIcon = document.getElementById("pause")
var nextIcon = document.getElementById("next")
var prevIcon = document.getElementById("previous")
var albumPic = document.querySelector("#albumpic")
var ArtistName = document.querySelector("#ShowArtist")
var linkToArtist = document.querySelector("#linktoartist")
var MusicTitle = document.querySelector("#ShowMusicTitle")
var SongTitle = document.querySelector("#ShowSongTitle")
var linkToSong = document.querySelector("#linktosong")
var descriptionPlace = document.querySelector("#descriptionplace")
var GenrePos = document.querySelector("#genre")
var ReleaseDate = document.querySelector("#releasedate")
// var trackID = [271223883]
var index = [0]
var songs = []
var playlist = [317184390]
// var soundsong= SC.stream('/tracks/' + trackID[index])
var soundsong= SC.stream('/playlists/' + playlist[index])

SC.resolve("https://api.soundcloud.com/playlists/317184390").then(function(response) {
  console.log("Hey");
});

function Jukebox(songs){
  this.songs= songs

  SC.resolve("https://api.soundcloud.com/playlists/317184390").then(function(response){
    var album = response.artwork_url
    var img = document.createElement('img')
    img.src = album
    albumPic.appendChild(img)
    var title = response.title
    MusicTitle.innerHTML = "Album Title: " + title
    var trackTitle = response.tracktitle
    SongTitle.innerHTML = "Track: " + trackTitle
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
    // var description = response.description
    // descriptionPlace.innerHTML = "Description: " + description
    var genre = response.genre
    GenrePos.innerHTML = "Genre: " + genre + "/" + genre
    var month = response.release_month
    var day = response.release_day
    var year = response.release_year
    ReleaseDate.innerHTML = "Release Date: " + month + "/" + day + "/" + year
    console.log(response);
  });

}
//instantiation: jukebox object created, songs pushed into jukebox array
var jukebox = new Jukebox(songs);
// Jukebox object methods
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

Jukebox.prototype.skip = function() {
  soundsong.then(function(player){
    player.next();
  })
}

// button event listeners
playIcon.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.play()
  playIcon.style.color = "#ff4f5a"
  pauseIcon.style.color = "#2d2d2d"
})

pauseIcon.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.pause()
  pauseIcon.style.color = "#ff4f5a"
  playIcon.style.color = "#2d2d2d"
})

nextIcon.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.skip()
  ShowMusicTitle.innerHTML = titles[index]
  ShowArtist.innerHTML = artists[index]
  playIcon.style.color = "#FF1493"
  pauseIcon.style.color = "#000000"
  stopIcon.style.color = "#000000"
})

prevIcon.addEventListener("click", function(event){
  event.preventDefault()
  jukebox.back()
  ShowMusicTitle.innerHTML = titles[index]
  ShowArtist.innerHTML = artists[index]
  playIcon.style.color = "#FF1493"
  pauseIcon.style.color = "#000000"
  stopIcon.style.color = "#000000"
})
