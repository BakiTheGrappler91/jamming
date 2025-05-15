import React, { useState } from 'react';
import './Playlist.css';

const Playlist = ({ newPlaylist, handleSubmit, handleRemove }) => {
    const [name, setName] = useState('');

    return (
        <form className='playlist' onSubmit={handleSubmit}>
            <input 
            name='title'
            placeholder='New playlist'
            onChange={(e) => setName(e.target.value)} 
            value={name}
            />
            <div>
                {newPlaylist.map((playlist, index) => (
                    <div key={index} className="tracks">
                        {playlist.name}<button onClick={() => handleRemove(playlist)}>-</button>
                    </div>
                ))}
            </div>
            <button type="submit">Add Playlist</button>
        </form>
    );
};

export default Playlist;