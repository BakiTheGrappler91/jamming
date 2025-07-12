import React, { useState } from 'react';
import './Playlist.css';

// Playlist component - the user creates their playlist by adding songs from the search results list, give the playlist a name and then submits the playlist where it will be saved in saved playlists.
const Playlist = ({ newPlaylist, handleSubmit, handleRemove }) => {
    const [name, setName] = useState('');

    // a function to call the function 'handleSubmit' and then clear the name of the playlist just saved
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e, name);
        setName("");
    };

    return (
        <form className='playlist' onSubmit={handleFormSubmit}>
            <input 
            name='title'
            placeholder='New playlist'
            onChange={(e) => setName(e.target.value)} 
            value={name}
            />
            <div>
                {newPlaylist.map((playlist) => (
                    <div key={playlist.id} className="tracks">
                        {playlist.name}<button type='button' onClick={() => handleRemove(playlist.id)}>-</button>
                    </div>
                ))}
            </div>
            <button type="submit">Add Playlist</button>
        </form>
    );
};

export default Playlist;