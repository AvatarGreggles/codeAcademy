import React from 'react';
import './UserPlaylist.css';

class UserPlaylist extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      toggleDropdown: false
    }
this.toggleDropdown = this.toggleDropdown.bind(this);
  }

checkForTracklist(){
  if(this.props.tracklist && this.state.toggleDropdown){
    let tracks = [];
    let track;
    let trackNum = 1;
    let previewUrl;
  for(let i = 0; i < this.props.playlist.tracklist.length; i++){
    track = this.props.playlist.tracklist[i].name + ' ';
    previewUrl = this.props.playlist.tracklist[i].preview_url;

    tracks.push(<a href={previewUrl} key={previewUrl} target="_blank" className="Play-Preview" rel="noopener noreferrer">►</a>);
    tracks.push([trackNum] + ': ' + track);
    tracks.push(<br key={[i]}/>);
    trackNum++;
  }

  return <p>{tracks}</p>



  }
}

toggleDropdown(){
  this.setState(prevState => ({
  toggleDropdown: !prevState.toggleDropdown
}));
}

arrowForToggle(){
  if(this.state.toggleDropdown){
  return <p><span className="ToggleButton">▲</span></p>
}else{
  return <p><span className="ToggleButton">▼</span></p>

}
}


  render(){
    return(
      <div className="Track">
    <div className="Playlist-Track-information">
    <div className="Playlist-Title" onClick={this.toggleDropdown}>
      <h3 className="ToggleTracklist">{this.props.playlist.name}</h3>
      {this.arrowForToggle()}
    </div>
    {/*This line below returns <p>{tracks}</p> for each track */}
      {this.checkForTracklist()}

    </div>

  </div>

    )

  }
}

export default UserPlaylist;
