const inputSong = () => {
    document.getElementById('allResult').innerHTML = '';
    document.getElementById('lyrics').innerHTML = '';
    const songName =  document.getElementById('songName').value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => {   
        loadData = data;                              
        for (let i = 0; i < 9; i++) {
            const title = data.data[i].title;
            const artist = data.data[i].artist.name;
            document.getElementById('allResult').innerHTML +=  `<div class="single-result row align-items-center  my-3 p-3">
                                                                    <div class="col-md-9">
                                                                        <h3 class="lyrics-name">${title}</h3>
                                                                        <p class="author lead">Album by <span id="artist1">${artist}</span></p>
                                                                    </div>
                                                                    <button onclick="searchLyrics(${i})" class="btn btn-success">Get Lyrics</button>
                                                                </div>`                                               
        } 
    })
}

const searchLyrics = (index) => {
        const song = loadData.data[index].title;
        const artist = loadData.data[index].artist.name;
        fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(res => res.json())
        .then(data => {
            let lyrics = data.lyrics;
            if (lyrics == undefined) {
                lyrics = `Song Lyrics Not Found. Try for another song`
            }
                document.getElementById('lyrics').innerHTML = `<h1 class="text-info mb-3">Song Lyrics</h1>
                                                                <h4 class="text-success">Song name: ${song}</h4>
                                                                <h4 class="text-success">Artist name: ${artist}</h4>
                                                                <pre class="my-4 text-white">${lyrics}</pre>`
        }) 
}



