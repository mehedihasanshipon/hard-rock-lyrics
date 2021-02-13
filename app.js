// Enter key

var searchButton = document.getElementById("search-btn");
var searchField = document.getElementById("search-field");

searchField.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key == 'Enter'){
        searchButton.click();
    }
});

const searchSongs =async() => {
    const searchText = document.getElementById('search-field').value;
    loadSpinner();
    try{
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }catch(err){
        displayError('Sorry!');
        loadSpinner();
    }
}




const displaySongs = songs => {
    const songDiv = document.getElementById('song-container');
    songDiv.innerHTML = "";
    songs.forEach(song => {
        // console.log(song)
        const div = document.createElement('div');
        div.className = "single-result row align-items-center my-3 p-3";
        div.innerHTML = `
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songDiv.appendChild(div);
    });
    loadSpinner();
}

const getLyrics = async(artist,title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    loadSpinner();
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(err){
        displayError('Sorry!');
    } 
}

// const getLyrics = (artist,title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
//     .catch(err => displayError('Something went wrong.Please try again later'))
// }

const displayLyrics = lyric => {
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyric;
    loadSpinner();
}

const displayError = error => {
    const errorTag = document.getElementById('error');
    errorTag.innerText = error;
}
const loadSpinner = () =>{
    const spinner = document.getElementById('spinner');
    const lyricsSpinner = document.getElementById('song-lyrics');
    const songSpinner = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    lyricsSpinner.classList.toggle('d-none');
    songSpinner.classList.toggle('d-none');
}
