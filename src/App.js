import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResultsList from './components/SearchResultsList'
import Playlist from './components/Playlist'
import SavedPlaylists from './components/SavedPlaylists'

// App function component
function App() {

  // State for results obtained from API
  const [results, setResults] = useState([]);

  // State for newPlaylist
  const [newPlaylist, setNewPlaylist] = useState([]);

  // Function to add track from the results in the SearchBar to the newPlaylist
  const handleAddTrack = (result) => {
    setNewPlaylist((prev) => [ ...prev, result ]);
  };

  // Function to remove track from the newPlaylist
  const handleRemoveTrack = (trackIdToRemove) => {
    setNewPlaylist((prev) => prev.filter(
      (result) => result !== trackIdToRemove
    ));
  };
  
  // State for all of the playlist that are created and stored
  const [allPlaylists, setAllPlaylists] = useState([]);

  // Function to submit the form for a playlist and saved it to the SavedPlaylists functional component
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (!newPlaylist.title) return;
    setAllPlaylists((prev) => [newPlaylist, ...prev]);
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
