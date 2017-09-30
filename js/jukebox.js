let audio = document.getElementById("audio");
let list = document.getElementById("playlist");

function JukeBox(audioObj) {
  this.audioObj = audioObj;
  this.songList = [];
  this.load = function(song) {
    this.songList.push(song);
    let songId = this.songList.indexOf(song);
    list.innerHTML += `<li>${song}</li>`;
    audioObj.src = song;
  };
}

JukeBox.prototype.pause = function() {
  this.audioObj.pause();
};

JukeBox.prototype.play = function() {
  this.audioObj.play();
};

JukeBox.prototype.stop = function() {
  this.audioObj.pause();
  audio.currentTime = 0;
};

// JukeBox.prototype.next = function() {
//   for (var i = 1; i < this.songList.length; i++) {
//     this.songList[i];
//     this.audioObj.play();
//   }
// };
//
// JukeBox.prototype.previous = function() {
//   this.audioObj.previous();
// };

let myJukeBox = new JukeBox(audio);
let controller = document.getElementById('controller');
myJukeBox.load("../music/Ophelia.mp3");

controller.addEventListener('click', function(event) {
  let btn = event.target.id;
  if (btn === "submit") {
    myJukeBox.load(document.getElementById("urllocation").value);
    document.getElementById("urllocation").value = "";
  } else if (btn === "pause") {
    myJukeBox.pause();
  }
  else if (btn === "stop") {
  myJukeBox.stop();
  }
  else if (btn === "play") {
    myJukeBox.play();
  }
  else if (btn === "add") {
    controller.innerHTML += `<input id='urllocation' placeholder="Please enter the file path">
      <button id="submit">Load</button>`;
  }
});

SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

var image;
var songTitle;
var songID;
var userLink;
var description;
var genre;
var username;
var trackLink;
var tracks;
var stream = '';

var scTitle = document.getElementById("title");
var scInfo = document.getElementById("info");

function SoundCloud (){
  this.render = function (){
    var userSearch = document.getElementById('scSearch').value;
    SC.get('/tracks', {
      q: userSearch,
    }).then(function(tracks) {
      console.log(tracks);
      for (var i = 0; i < tracks.length; i++) {
        tracks[i]
      }
    image = tracks[0]["artwork_url"];
    songTitle = tracks[0]["title"];
    songID = tracks[0]["id"];
    userLink = tracks[0]["user"]["permalink_url"];
    trackLink = tracks[0]["permalink_url"];
    description = tracks[0]["description"];
    genre = tracks[0]["genre"];
    username = tracks[0]["user"]["username"];
    scTitle.innerHTML += `<h2>${songTitle} by ${username}</h2>
  <a href=${userLink}>Artist Link</a>
  <br>
  <a href=${trackLink}>Track Link</a>`;
    scInfo.innerHTML += `<h3><img src=${image}>
  <br>
  Genre: ${genre}
  <br>
  Description: ${description}</h3>`;
});
}
};

SoundCloud.prototype.play = function(player) {
  if (stream === '') {
    SC.stream("/tracks/" + songID).then(function(player) {
      stream = player;
      player.play();
      console.log(player);
    });
  } else {
    stream.play();
    console.log(stream);
  }
};

SoundCloud.prototype.pause = function(player) {
  stream.pause();
  console.log(stream);
};

var scJukebox = new SoundCloud();

document.getElementById('scSubmitButton').addEventListener('click', function(event) {
  scJukebox.render();
});

scplayBtn.addEventListener('click', function(player) {
  scJukebox.play();
});

scpauseBtn.addEventListener('click', function(player) {
  scJukebox.pause();
});


// SC.initialize({
//   client_id: 'fd4e76fc67798bfa742089ed619084a6'
// });
//
// var image;
// var songTitle;
// var songID;
// var userLink;
// var description;
// var genre;
// var username;
// var trackLink;
// var tracks;
//
// var scTitle = document.getElementById("title");
// var scInfo = document.getElementById("info");
//
// document.getElementById('scSubmitButton').addEventListener('click', function(event) {
//   var userSearch = document.getElementById('scSearch').value;
//   SC.get('/tracks', {
//     q: userSearch,
//
//   }).then(function(tracks) {
//     console.log(tracks);
//     image = tracks[0]["artwork_url"];
//     songTitle = tracks[0]["title"];
//     songID = tracks[0]["id"];
//     userLink = tracks[0]["user"]["permalink_url"];
//     trackLink = tracks[0]["permalink_url"];
//     description = tracks[0]["description"];
//     genre = tracks[0]["genre"];
//     username = tracks[0]["user"]["username"];
//     scTitle.innerHTML += `<h2>${songTitle} by ${username}</h2>
//   <a href=${userLink}>Artist Link</a>
//   <br>
//   <a href=${trackLink}>Track Link</a>`;
//     scInfo.innerHTML += `<h3><img src=${image}>
//   <br>
//   Genre: ${genre}
//   <br>
//   Description: ${description}</h3>`;
//   });
// });
//
// var stream = '';
//
// scplayBtn.addEventListener('click', function(player) {
//   if (stream === '') {
//     SC.stream("/tracks/" + songID).then(function(player) {
//       stream = player;
//       player.play();
//       console.log(player);
//     });
//   } else {
//     stream.play();
//     console.log(stream);
//   }
// });
//
// scpauseBtn.addEventListener('click', function(player) {
//   stream.pause();
//   console.log(stream);
// });
//
// scnextbtn.addEventListener('click',function(){
//  SC.stream('/tracks/' + songID++)
//    .then(function(player){
//      player.play();
//      console.log(songID++);
//    })
//    })
//
// scprevbtn.addEventListener('click',function(){
//    SC.stream('/tracks/' + songID--)
//      .then(function(player){
//        player.play();
//        console.log(songID--);
//      })
//    })
