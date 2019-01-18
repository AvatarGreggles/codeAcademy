import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component{
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return(
      <div className="Playlist">
    <input value={this.props.playlistName} onChange={this.handleNameChange}/>
    <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
    <div className="Action-Button" onClick={this.props.onSave}>SAVE TO SPOTIFY</div>
  </div>
    )
  }
}



export default PlayList;
