let accessToken = undefined;
let expiresIn = undefined;
//const redirectUri = 'http://greggles.surge.sh';
const redirectUri = 'http://localhost:3000/';
const clientId = 'eec9cfacecf748899f08399a8c4095cb';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;


const Spotify = {
    getAccessToken() {
      if(accessToken){
        return accessToken;
      }
      const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
      const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

      if(urlAccessToken && urlExpiresIn){
         expiresIn = urlExpiresIn[1];
        accessToken = urlAccessToken[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }else{
       window.location = spotifyUrl;
  }
},

search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            preview_url: track.preview_url
          }
        })
      });
  },

  savePlaylist(name, trackURIs) {
    if(!name || !trackURIs) return;

      const currentUser = 'https://api.spotify.com/v1/me';
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId = undefined;
      let playlistId = undefined;

      fetch(currentUser, {
        headers: headers
      })
      .then(response => response.json())
      .then(jsonResponse => userId = jsonResponse.id)
      .then(() => {
        const createPlayListURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
        fetch(createPlayListURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
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
            body: JSON.stringify({
              uris: trackURIs
          })
        });
      })
    })
  },

  getUsersPlaylists(){
    const currentUserPlaylists = `https://api.spotify.com/v1/me/playlists`;
    return fetch(currentUserPlaylists, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.items) return [];
        return jsonResponse.items.map(playlist => {
          return {
            id: playlist.id,
            name: playlist.name,
            tracks: playlist.tracks,
            uri: playlist.uri
          }
        })
      });
  },

  getUserPlaylistTracks(playlistID){
    const playlistTracksURL = `	https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    return fetch(playlistTracksURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.items.map(playlist => {
          return {
            id: playlist.track.id,
            name: playlist.track.name,
            artist: playlist.track.artists[0].name,
            album: playlist.track.album.name,
            uri: playlist.track.uri,
            preview_url: playlist.track.preview_url
          }
        })
      });

  }

}

export default Spotify;
