import React from 'react';
import './SavedPlaylists.css';

const SavedPlaylists = ({ allPlaylists, handleDelete }) => {
    return (
        <div className="savedPlaylists">
            {allPlaylists.map((playlist) => (
                <div key={playlist.id || playlist.email} className="playlists">
                    <p>Title: {playlist.title}</p>
                    <p>Tracks: {playlist.tracks?.map(track => track.name).join(', ')}</p>
                    <p>Email: {playlist.email}</p>
                    <button onClick={() => handleDelete(playlist.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default SavedPlaylists;