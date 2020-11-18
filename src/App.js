import React from 'react'

import Playlist from './Components/Playlist/Playlist'
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResults from './Components/SearchResults/SearchResults';
import Spotify from './Utility/Spotify'

import './App.css'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [
       
      ],
     
      playlistTracks: [
      
      ]
    }
  }

  addTrack=(track)=>{
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrack =(track)=>{
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName=(name)=>{
    this.setState({playlistName: name})
  }

  savePlayList=()=>{
    const trackUris= this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playlistName, trackUris).then(()=> this.setState({
    
      playlistTracks: []
    }))
    this.setState({
      searchResults: [
       
      ],
   
      playlistTracks: [
      
      ]
    })
  }

  search=(term)=>{
    Spotify.search(term).then(searchResults =>{
      this.setState({searchResults: searchResults})

    })
  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify. getAccesToken()});
  }

  render(){
 
 
  return (
  <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist" >
        <SearchResults tracks={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} 
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlayList}/>
      </div>
    </div>
   </div>
  );
  }
}
export default App;



   

