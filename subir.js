const fileInput = document.getElementById('fileInput');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const prevBtn = document.getElementById('prevBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');

let tracks = []; 
let currentTrackIndex = 0; 

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    tracks = [];
    playlist.innerHTML = '';

    Array.from(files).forEach((file, index) => {
        const url = URL.createObjectURL(file);
        tracks.push({ name: file.name, url });

        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.dataset.index = index; 
        listItem.addEventListener('click', () => playTrack(index));
        playlist.appendChild(listItem);
    });

    if (tracks.length > 0) {
        playTrack(0); 
    }
});

function playTrack(index) {
    if (index >= 0 && index < tracks.length) {
        currentTrackIndex = index;
        audioPlayer.src = tracks[currentTrackIndex].url;
        audioPlayer.play();
        updatePlaylistUI();
    }
}

function updatePlaylistUI() {
    const items = playlist.getElementsByTagName('li');
    Array.from(items).forEach((item) => item.classList.remove('playing')); 
    items[currentTrackIndex].classList.add('playing'); 
}

prevBtn.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
});

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

audioPlayer.addEventListener('ended', () => {
    if (currentTrackIndex < tracks.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
});
