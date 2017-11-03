const audio = document.getElementById("audio");
const list = document.getElementById("playlist");

class JukeBox {
  constructor(audioObj) {
    this.audioObj = audioObj;
    this.songList = [];
    this.load = function(song) {
      this.songList.push(song);
      let songId = this.songList.indexOf(song);
      list.innerHTML += `<li>${song}</li>`;
      audioObj.src = song;
    };
  }

  pause() {
    this.audioObj.pause();
  }

  play() {
    this.audioObj.play();
  }

  stop() {
    this.audioObj.pause();
    audio.currentTime = 0;
  }
}

const myJukeBox = new JukeBox(audio);
const controller = document.getElementById('controller');
myJukeBox.load("../music/Ophelia.mp3");

controller.addEventListener('click', function(event) {
  let btn = event.target.id;
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
    controller.innerHTML += `<input id='urllocation' placeholder="Please enter the file path">
      <button id="submit">Load</button>`;
  }
});

SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

let image;
let songTitle;
let songID;
let userLink;
let description;
let genre;
let username;
let trackLink;
let tracks;
let stream = '';

let scTitle = document.getElementById("title");
let scInfo = document.getElementById("info");

class SoundCloud {
  constructor() {
    this.render = () => {
      let userSearch = document.getElementById('scSearch').value;
      SC.get('/tracks', {
        q: userSearch,
      }).then(tracks => {
        console.log(tracks);
        for (let i = 0; i < tracks.length; i++) {
          tracks[i]
        }
        image = tracks[0].artwork_url;
        songTitle = tracks[0].title;
        songID = tracks[0].id;
        userLink = tracks[0].user.permalink_url;
        trackLink = tracks[0].permalink_url;
        description = tracks[0].description;
        genre = tracks[0].genre;
        username = tracks[0].user.username;
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
  }

  play(player) {
    if (stream === '') {
      SC.stream(`/tracks/${songID}`).then(player => {
        stream = player;
        player.play();
        console.log(player);
      });
    } else {
      stream.play();
      console.log(stream);
    }
  }

  pause(player) {
    stream.pause();
    console.log(stream);
  }
}

const scJukebox = new SoundCloud();

document.getElementById('scSubmitButton').addEventListener('click', event => {
  scJukebox.render();
});

scplayBtn.addEventListener('click', player => {
  scJukebox.play();
});

scpauseBtn.addEventListener('click', player => {
  scJukebox.pause();
});
