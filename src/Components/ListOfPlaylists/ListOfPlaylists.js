import React from 'react';
import './ListOfPlaylists.css';
import UserPlaylist from '../UserPlaylist/UserPlaylist';

class ListOfPlaylists extends React.Component{

  render(){
    return(
      <div className="TrackList">

        {this.props.playlists.map(playlist =>{
          return <UserPlaylist playlist={playlist} key={playlist.id} tracklist={playlist.tracklist}/>
        })
      }




      </div>
    )

  }

}

export default ListOfPlaylists;
