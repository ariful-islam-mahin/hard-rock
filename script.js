const searchMusic = () => {
    document.getElementById('allResult').innerHTML = '';
    document.getElementById('lyrics').innerHTML = '';
    const inputSong =  document.getElementById('inputSong').value;
    fetch(`https://api.lyrics.ovh/suggest/${inputSong}`)
    .then(res => res.json())
    .then(data => {   
        loadData = data;                              
        for (let i = 0; i < 9; i++) {
            const songTitle = data.data[i].title;
            const artistName = data.data[i].artist.name;
            document.getElementById('allResult').innerHTML +=  `<div class="single-result row align-items-center  my-3 p-3">
                                                                    <div class="col-md-9">
                                                                        <h3 class="lyrics-name">${songTitle}</h3>
                                                                        <p class="author lead">Album by <span id="artist1">${artistName}</span></p>
                                                                    </div>
                                                                    <button onclick="getLyrics(${i})" class="btn btn-success">Get Lyrics</button>
                                                                </div>`                                               
        } 
    })
}

const getLyrics = (index) => {
        const songTitle = loadData.data[index].title;
        const artistName = loadData.data[index].artist.name;
        fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
        .then(res => res.json())
        .then(data => {
            let lyrics = data.lyrics;
            if (lyrics == undefined) {
                lyrics = `Song Lyrics Not Found. Try for another song`
            }
                document.getElementById('lyrics').innerHTML = `<h1 class="text-info mb-3">Song Lyrics</h1>
                                                                <h4 class="text-success">Song name: ${songTitle}</h4>
                                                                <h4 class="text-success">Artist name: ${artistName}</h4>
                                                                <pre class="my-4 text-white">${lyrics}</pre>`
        }) 
}



