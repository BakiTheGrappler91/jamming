import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";

// Function component for the search bar takes the prop 'setResults' from the 'App' component.
const SearchBar = ({ setResults }) => {
    // useState hook adds state to the functional component.
    const [input, setInput] = useState('');

    // fetchData function takes the value of the input and makes a request to the API.
    // The return data is converted into json for use.
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value && 
                        user && 
                        user.name && 
                        user.name.toLowerCase().includes(value)
                    );
                });
                setResults(results);
                console.log(results);
            });
    };

    // handleChange takes a value from the target event (typing in search bar) and sets the input as that value and triggers fetchData function.
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                placeholder="Type to search..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)} 
            />
        </div>
    )
};

export default SearchBar;