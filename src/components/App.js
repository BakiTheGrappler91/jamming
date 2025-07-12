import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList'
import Playlist from './Playlist'
import SavedPlaylists from './SavedPlaylists'

// App function component
function App() {

  // State for results obtained from API
  const [results, setResults] = useState([]);

  // State for newPlaylist
  const [newPlaylist, setNewPlaylist] = useState([]);

  // Function to add track from the results in the SearchBar to the newPlaylist
  const handleAddTrack = (result) => {
    setNewPlaylist((prev) => {
      if (prev.find(track => track.id === result.id)) return prev;
      return [...prev, result];
    });
  };

  // Function to remove track from the newPlaylist
  const handleRemoveTrack = (trackIdToRemove) => {
    setNewPlaylist((prev) => prev.filter(
      (result) => result.id !== trackIdToRemove
    ));
  };
  
  // State for all of the playlist that are created and stored
  const [allPlaylists, setAllPlaylists] = useState([]);

  useEffect(() => {console.log(allPlaylists)}, [allPlaylists]);

  // Function to submit the form for a playlist and saved it to the SavedPlaylists functional component
  const handleSubmit = (event, name) => {
    event.preventDefault();
    // if (!newPlaylist.title) return;
    if (!name || newPlaylist.length === 0) return;

    const id = Date.now();
    setAllPlaylists((prev) => [
      { id, title: name, tracks: newPlaylist }, ...prev]);
    setNewPlaylist([]);
  };

  
  const handleDelete = (playlistIdToRemove) => {
    setAllPlaylists((prev) => prev.filter(
      playlist => playlist.id !== playlistIdToRemove
    ));
  };

  return (
    <div className="App">      
      <div className="searchBarContainer">
        <h1>Jamming</h1>
        <SearchBar 
          setResults={setResults} 
        />
      </div>
      <div className="playlistCreationContainer">
        <div className="searchResultsContainer">
          <h2>Search results</h2>
          <SearchResultsList 
            results={results} 
            onAdd={handleAddTrack}
          />
        </div>
        <div className="currentPlaylistContainer">
          <h2>Current playlist</h2>
          <Playlist 
            newPlaylist={newPlaylist}
            handleRemove={handleRemoveTrack}
            handleSubmit={handleSubmit}
          /> 
        </div>
      </div>
      <div className="savedPlaylistsContainer">
        <h2>Saved Playlists</h2>
        <SavedPlaylists 
          allPlaylists={allPlaylists}
          handleDelete={handleDelete}
        />
      </div>       
    </div>
  );
};

export default App;
