import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: "8cded5c4bd6544b79e557f40183247dd",
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    /*const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);*/

    return (
        <Container className="d-flex flex-column py-2" style={{
            height: "100vh" }}>
            {/*
            <Form.Control 
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            */}
            <div className="flex-grow-1 my-2" style={{ overflowY: 
                "auto"  }}>
                Songs + {code}
            </div>
            <div>Bottom</div>
        </Container>
    )
};