import React from 'react';
import './SavedPlaylists.css';

const SavedPlaylists = ({ allPlaylists, handleDelete }) => {
    return (
        <div className="savedPlaylists">
            {allPlaylists.map((Playlist, index) => (
                <div key={index} className="playlists">
                    {Playlist.title}
                    {Playlist.name}
                    {Playlist.email}
                </div>
            ))}
        </div>
    );
};

export default SavedPlaylists;