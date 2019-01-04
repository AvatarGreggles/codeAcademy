let accessToken = '';
const redirectUri = 'http://localhost:3000/';
const clientId = 'eec9cfacecf748899f08399a8c4095cb';


const Spotify = {
    getAccessToken() {
      if(accessToken !== ''){
        return accessToken;
      }else if(window.location.href.includes('access_token=') && window.location.href.includes('expires_in=')){
        const url = window.location.href;
        const expiresIn = url.match(/expires_in=([^&]*)/);
        accessToken = url.match(/access_token=([^&]*)/);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }else{
       window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

search(searchTerm){
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.tracks){
        return jsonResponse.tracks.items.map(track =>({

              id: track.id,
            name: track.name,
            artist: track.artist[0].name,
            album: track.album.name,
            uri: track.uri
        }))
      }else{
        return [];
      }
    })
  },

  savePlaylist(name, trackURIs) {
    if(!name || !trackURIs) return;

      const currentUser = 'https://api.spotify.com/v1/me';
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId = undefined;
      let playlistId = undefined;

      fetch(currentUser, {headers: headers
      })
      .then(response => response.json())
      .then(jsonResponse => userId = jsonResponse.id)
      .then(() => {
        const createPlayListURL = `https://api.spotify.com/v1/v1/users/${userId}/playlists`;
        fetch(createPlayListURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringif({
            name: name
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistId = jsonResponse.id)
        .then(() => {
          const addPlayListTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          fetch(addPlayListTracksUrl , {
            method: 'POST',
            headers: headers,
            body: JSON.stringif({
              uris: trackURIs
          })
        });
      })
    })
  }

}

export default Spotify;
