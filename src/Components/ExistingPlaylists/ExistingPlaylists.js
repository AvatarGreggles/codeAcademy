import React from 'react';
import './ExistingPlaylists.css';
import ListOfPlaylists from '../ListOfPlaylists/ListOfPlaylists';

class ExistingPlayLists extends React.Component{

  render(){
    return(
      <div className="Existing-Playlist">
        <h2>Your Playlists</h2>
    <div className="Action-Button" onClick={this.props.getUsersPlaylists}>
      LOAD PLAYLISTS
    </div>

      <ListOfPlaylists playlists={this.props.userPlaylists}/>
  </div>

    )
  }
}



export default ExistingPlayLists;
