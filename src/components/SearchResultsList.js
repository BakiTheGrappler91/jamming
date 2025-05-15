import React from 'react';
import "./SearchResultsList.css"
import SearchResult from './SearchResult'

// Function component for the search results takes the prop 'results' from the 'SearchBar' component.
const SearchResultsList = ({ results, onAdd }) => {
    return (
    // 
    <div className="resultsList">
        {results.map((result, id) => {
            return <SearchResult result={result} key={id} onAdd={onAdd} />;
        })}
    </div>
    );
};

export default SearchResultsList;