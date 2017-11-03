"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var audio = document.getElementById("audio");
var list = document.getElementById("playlist");

var JukeBox = function () {
  function JukeBox(audioObj) {
    _classCallCheck(this, JukeBox);

    this.audioObj = audioObj;
    this.songList = [];
    this.load = function (song) {
      this.songList.push(song);
      var songId = this.songList.indexOf(song);
      list.innerHTML += "<li>" + song + "</li>";
      audioObj.src = song;
    };
  }

  _createClass(JukeBox, [{
    key: "pause",
    value: function pause() {
      this.audioObj.pause();
    }
  }, {
    key: "play",
    value: function play() {
      this.audioObj.play();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.audioObj.pause();
      audio.currentTime = 0;
    }
  }]);

  return JukeBox;
}();

var myJukeBox = new JukeBox(audio);
var controller = document.getElementById('controller');
myJukeBox.load("../music/Ophelia.mp3");

controller.addEventListener('click', function (event) {
  var btn = event.target.id;
  if (btn === "submit") {
    myJukeBox.load(document.getElementById("urllocation").value);
    document.getElementById("urllocation").value = "";
  } else if (btn === "pause") {
    myJukeBox.pause();
  } else if (btn === "stop") {
    myJukeBox.stop();
  } else if (btn === "play") {
    myJukeBox.play();
  } else if (btn === "add") {
    controller.innerHTML += "<input id='urllocation' placeholder=\"Please enter the file path\">\n      <button id=\"submit\">Load</button>";
  }
});

SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

var image = void 0;
var songTitle = void 0;
var songID = void 0;
var userLink = void 0;
var description = void 0;
var genre = void 0;
var username = void 0;
var trackLink = void 0;
var tracks = void 0;
var stream = '';

var scTitle = document.getElementById("title");
var scInfo = document.getElementById("info");

var SoundCloud = function () {
  function SoundCloud() {
    _classCallCheck(this, SoundCloud);

    this.render = function () {
      var userSearch = document.getElementById('scSearch').value;
      SC.get('/tracks', {
        q: userSearch
      }).then(function (tracks) {
        console.log(tracks);
        for (var i = 0; i < tracks.length; i++) {
          tracks[i];
        }
        image = tracks[0].artwork_url;
        songTitle = tracks[0].title;
        songID = tracks[0].id;
        userLink = tracks[0].user.permalink_url;
        trackLink = tracks[0].permalink_url;
        description = tracks[0].description;
        genre = tracks[0].genre;
        username = tracks[0].user.username;
        scTitle.innerHTML += "<h2>" + songTitle + " by " + username + "</h2>\n    <a href=" + userLink + ">Artist Link</a>\n    <br>\n    <a href=" + trackLink + ">Track Link</a>";
        scInfo.innerHTML += "<h3><img src=" + image + ">\n    <br>\n    Genre: " + genre + "\n    <br>\n    Description: " + description + "</h3>";
      });
    };
  }

  _createClass(SoundCloud, [{
    key: "play",
    value: function play(player) {
      if (stream === '') {
        SC.stream("/tracks/" + songID).then(function (player) {
          stream = player;
          player.play();
          console.log(player);
        });
      } else {
        stream.play();
        console.log(stream);
      }
    }
  }, {
    key: "pause",
    value: function pause(player) {
      stream.pause();
      console.log(stream);
    }
  }]);

  return SoundCloud;
}();

var scJukebox = new SoundCloud();

document.getElementById('scSubmitButton').addEventListener('click', function (event) {
  scJukebox.render();
});

scplayBtn.addEventListener('click', function (player) {
  scJukebox.play();
});

scpauseBtn.addEventListener('click', function (player) {
  scJukebox.pause();
});