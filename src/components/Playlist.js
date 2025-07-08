import React, { useState } from 'react';
import './Playlist.css';

const Playlist = ({ newPlaylist, handleSubmit, handleRemove }) => {
    const [name, setName] = useState('');

    return (
        <form className='playlist' onSubmit={(e) => handleSubmit(e, name)}>
            <input 
            name='title'
            placeholder='New playlist'
            onChange={(e) => setName(e.target.value)} 
            value={name}
            />
            <div>
                {newPlaylist.map((playlist) => (
                    <div key={playlist.id} className="tracks">
                        {playlist.name}<button onClick={() => handleRemove(playlist.id)}>-</button>
                    </div>
                ))}
            </div>
            <button type="submit">Add Playlist</button>
        </form>
    );
};

export default Playlist;