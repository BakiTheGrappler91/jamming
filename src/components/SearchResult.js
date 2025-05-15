import React from 'react'
import './SearchResult.css'

const SearchResult = ({ result, onAdd }) => {
    return (
    <div 
    className="searchResult" >
        {result.name}<button onClick={() => onAdd(result)}>+</button>
    </div>
    );
};

export default SearchResult;