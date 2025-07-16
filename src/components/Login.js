import React from 'react';
import { Container } from 'react-bootstrap';
import querystring from 'querystring';

// authorisation URL request authorisation to access data.  Requires user login.  
const AUTH_URL = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
    client_id: '8cded5c4bd6544b79e557f40183247dd',
    response_type: 'code',
    redirect_uri: 'http://127.0.0.1:3000/callback',
    scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-modify-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative',
});
export default function Login() {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login With Spotify
            </a>
        </Container>
    )
}