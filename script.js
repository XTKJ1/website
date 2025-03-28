// Navbar
document.addEventListener('DOMContentLoaded', function () {
  const userButton = document.getElementById('UserButton');
  const playerButton = document.getElementById('PlayerButton');
  const isiNavbar = document.getElementById('IsiNavbar');
  const isiNavbarMusic = document.getElementById('IsiNavbarMusic');
  const overlay = document.getElementById('Overlay');
  let isMenuOpen = false;
  let isMusicOpen = false;

  const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      isMusicOpen = false;
      updateNavbar();
  };

  const toggleMusicMenu = () => {
      isMusicOpen = !isMusicOpen;
      isMenuOpen = false;
      updateNavbar();
  };

  const updateNavbar = () => {
      isiNavbar.classList.toggle('menu-open', isMenuOpen);
      isiNavbarMusic.classList.toggle('menu-open', isMusicOpen);
      overlay.style.display = isMenuOpen || isMusicOpen ? 'block' : 'none';
  };

  userButton.addEventListener('click', toggleMenu);
  playerButton.addEventListener('click', toggleMusicMenu);

  document.addEventListener('click', function (event) {
      const isClickInsideNavbar = isiNavbar.contains(event.target);
      const isClickInsideNavbarMusic = isiNavbarMusic.contains(event.target);
      const isClickInsideUserButton = userButton.contains(event.target);
      const isClickInsidePlayerButton = playerButton.contains(event.target);

      if (!isClickInsideNavbar && !isClickInsideNavbarMusic && !isClickInsideUserButton && !isClickInsidePlayerButton && (isMenuOpen || isMusicOpen)) {
          isMenuOpen = false;
          isMusicOpen = false;
          updateNavbar();
      }
  });

  updateNavbar();
});

        // Mendapatkan elemen video dan kontrol
        const video1 = document.getElementById('myVideo1');
        const video2 = document.getElementById('myVideo2');
        const video3 = document.getElementById('myVideo3');
        const muteButton1 = document.getElementById('muteButton1');
        const muteButton2 = document.getElementById('muteButton2');
        const muteButton3 = document.getElementById('muteButton3');

        // Fungsi untuk toggle mute/unmute
        muteButton1.addEventListener('click', () => {
            video1.muted = !video1.muted;
            muteButton1.textContent = video1.muted ? 'Unmute-1' : 'Mute-1';
        });
        
        muteButton2.addEventListener('click', () => {
            video2.muted = !video2.muted;
            muteButton2.textContent = video2.muted ? 'Unmute-2' : 'Mute-2';
        });
        
        muteButton3.addEventListener('click', () => {
            video3.muted = !video3.muted;
            muteButton3.textContent = video3.muted ? 'Unmute-3' : 'Mute-3';
        });

// Fungsi confirm logout
  function showModol() {
    document.getElementById('logoutModol').classList.remove('hidden');
  }

  // Fungsi close logout
  function closeModol() {
    document.getElementById('logoutModol').classList.add('hidden');
  }

  // Fungsi Logout
  function logout() {
            localStorage.removeItem('loggedInUser');
            setTimeout(() => {
                window.location.href = 'https://xtkj.my.id';
            }, 500);
        }
        
  function toggleDarkMode() {
            var body = document.body;
            var icon = document.getElementById("dark-mode-icon");
            body.classList.toggle("dark");
            if (body.classList.contains("dark")) {
                icon.classList.remove("fa-adjust");
                icon.classList.add("fa-sun");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-adjust");
            }
        }

        function updateTime() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('clock').innerText = timeString;
        }

        function updateBatteryStatus() {
            navigator.getBattery().then(function(battery) {
                var level = battery.level * 100;
                document.getElementById('battery').innerText = `Battery: ${level}%`;
            });
        }

        function updateIP() {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('ip-address').innerText = `IP Address: ${data.ip}`;
                });
        }

        function updateVisitorCount() {
            // Simulate real-time visitor count
            var count = Math.floor(Math.random() * 10);
            document.getElementById('visitor-count').innerText = `Visit: ${count}`;
        }

        document.addEventListener('DOMContentLoaded', function() {
            updateTime();
            setInterval(updateTime, 1000);
            updateBatteryStatus();
            updateIP();
            updateVisitorCount();
            setInterval(updateVisitorCount, 600000); // Update visitor count every 5 seconds
        });
        
//fungsi rating
var step = 100;

$(".slider").each(function () {
  var self = $(this);
  var slider = self.slider({
      create: function () {
          self.find('.text strong').text(self.slider('value'));
          setPathData(self.find('.smiley').find('svg path'), self.slider('value'));
      },
      slide: function (event, ui) {
          self.find('.text strong').text(ui.value);
          setPathData(self.find('.smiley').find('svg path'), ui.value);
      },
      range: 'min',
      min: 1,
      max: step,
      value: 50,
      step: 1
  });
});

function setPathData(path, value) {
  var firstStep = 6 / step * value;
  var secondStep = 2 / step * value;
  path.attr('d', 'M1,' + (7 - firstStep) + ' C6.33333333,' + (2 + secondStep) + ' 11.6666667,' + (1 + firstStep) + ' 17,' + (1 + firstStep) + ' C22.3333333,' + (1 + firstStep) + ' 27.6666667,' + (2 + secondStep) + ' 33,' + (7 - firstStep));
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Menampilkan waktu
var today = new Date();
  document.getElementById("hours").innerHTML = today.getHours();
  document.getElementById("minutes").innerHTML = today.getMinutes();
  document.getElementById("seconds").innerHTML = today.getSeconds();

// Menampilkan nama pengguna jika sudah ada di localStorage
window.onload = function() {
  const username = localStorage.getItem('loggedInUser');
  if (username) {
    document.getElementById('username').textContent = username;
    
  }
  };

//fungsi struktur dan jadwal
function showStruktur() {
  document.getElementById('strukturContent').style.display = 'block';
  document.getElementById('jadwalContent').style.display = 'none';
}

function showJadwal() {
  document.getElementById('strukturContent').style.display = 'none';
  document.getElementById('jadwalContent').style.display = 'block';
}

showStruktur();

//fungsi update year
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.getElementById('copyrightYear');

  if (copyrightElement) {
      copyrightElement.textContent = `© ${currentYear} X TKJ 1 | Dikelola Siswa X TKJ 1`;
  }
}

updateCopyrightYear();
setInterval(updateCopyrightYear, 1000 * 60 * 60 * 24);

let currentAudio = null;

// function toggleMusicAlert() {
//   const musicAlert = document.getElementById('musicAlert');
//   if (musicAlert.style.display === 'none' || musicAlert.style.display === '') {
//       musicAlert.style.display = 'block';
//   } else {
//       musicAlert.style.display = 'none';
//   }

//   if (currentAudio) {
//       currentAudio.pause(); 
//       currentAudio.currentTime = 0;
//   }
// }

// function pauseMusic() {
//   if (currentAudio) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0; // Atur waktu audio kembali ke awal
//   }
// }

// function playSong(song) {
    
//     if (currentAudio) {
//         currentAudio.pause(); 
//         currentAudio.currentTime = 0; 
//     }

//     alert(Memutar: ${song});
//     currentAudio = new Audio(song);
//     currentAudio.play();
// }


// Fungsi untuk menghentikan pemutaran lagu
function pauseMusic() {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null; 
  }
}

const clientId = '7e2a5c7c2f4c4a1a9829a9e7fbebcee1'; 
const clientSecret = 'd9e9a08a171e4472b00cca67f3a5fbb5'; 
let accessToken = '';


async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      },
      body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
      throw new Error('Gagal mendapatkan token akses');
  }

  const data = await response.json();
  accessToken = data.access_token;
}

// Mencari lagu
async function searchTracks(query) {
  const loadingElement = document.getElementById('loading');
  const resultsDiv = document.getElementById('results');

  // Tampilkan loading
  loadingElement.style.display = 'block';
  resultsDiv.innerHTML = ''; // Kosongkan hasil sebelumnya

  try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      displayResults(data.tracks.items);
  } catch (error) {
      resultsDiv.innerText = 'Error: ' + error.message;
  } finally {
      // Sembunyikan loading
      loadingElement.style.display = 'none';
  }
}

function displayResults(tracks) {
  const resultsDiv = document.getElementById('results');

  if (tracks.length === 0) {
      resultsDiv.innerHTML = '<p>Ra ono Hasile</p>';
      return;
  }

  tracks.forEach(track => {
      const trackDiv = document.createElement('div');
      trackDiv.className = 'track-block mb-2';

      const artistName = track.artists && track.artists.length > 0 ? track.artists[0].name : 'Goleki sing pener';
      const previewUrl = track.preview_url;

      trackDiv.innerHTML = `
          <div class="track-info">
              <span>${track.name} - ${artistName}</span>
              ${previewUrl ? `<button onclick="playPreview('${previewUrl}')" class=" text-white p-1" style="border-bottom: 1px solid #fff;">Setel</button>` : previewUrl ? `<button class=" text-white p-1" style="border-bottom: 1px solid #fff;">Setel Preview</button>` : '<span >Ra Tersedia</span>'}
          </div>
      `;
      resultsDiv.appendChild(trackDiv);
  });
}

function playPreview(previewUrl) {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; 
  }

  currentAudio = new Audio(previewUrl);
  currentAudio.loop = true;
  currentAudio.play();

  currentAudio.onended = function () {
      currentAudio = null; 
  };
}

document.getElementById('searchButton').addEventListener('click', async () => {
  await getAccessToken();
  const query = document.getElementById('searchQuery').value.trim();
  if (query) {
      await searchTracks(query);
  } else {
      alert('Tunggu Lagu Nya..');
  }
});
