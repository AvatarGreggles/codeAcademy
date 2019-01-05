import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [{name: '', artist: '', album: '', id: ''}],
                playlistName: 'Greggles Playlist',
                playlistTracks: [{name: '', artist: '', album: '', id: '', uri: ''}]
                }

  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }else{
      this.setState({playlistTracks: track});
    }
  }

  //Would this work??
  removeTrack(track){
    const removal = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: removal});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

//Step 63 - huh?
  savePlaylist(){
    Spotify.savePlaylist();
    this.setState({playlistName: 'New Playlist', playlistTracks: []});

  }

   search(term){

    Spotify.search(term)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
