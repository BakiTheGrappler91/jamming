const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const querystring = require('querystring');
const qs = require('qs');
const cookieParser = require('cookie-parser')

const clientId = '8cded5c4bd6544b79e557f40183247dd'; // Insert client ID here.
const clientSecret = 'd76db6f92dd74d168525395112850dad';
const redirectUri = 'http://127.0.0.1:8000/callback'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
const authUrl = 'https://accounts.spotify.com/authorize';  // URL to request authorisation.
const tokenUrl = 'https://accounts.spotify.com/api/token';  // URL to post the authorisation code to in exchange for access and refresh tokens.
const apiBaseUrl = 'https://api.spotify.com/v1/';

const Spotify = express();

// tells app to use this middleware for all routes.  Every incoming request now has easy access to cookies through req.cookies
Spotify.use(cookieParser());

// function that generates random string for security purposes
function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0,length);
};

// function to login and receive authorisation code
Spotify.get('/login', function(req, res) {

    const state = generateRandomString(16); // Provides protection against attacks such as cross-site request forgery.
    const scope = 'user-read-private user-read-email'; // Scope only allows access to certain information.  In this case, logging in only requires a user's subscription type ('private') and their email.
    res.cookie('spotify_auth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV('production'),
        sameSite: 'lax',
    }); // sets cookie name 'spotify_auth_state' to the user's browser.  The value of the cookie is the randomly generated state string.

    parameters = {
        response_type: 'code',
        client_id: clientId, // The Client ID after registering the application.  Tells Spotify where requests are coming from.
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        show_dialog: true,
    };

    res.redirect(authUrl + '?' + querystring.stringify(parameters));        
    
});

// function to exchange authorisation code for access token
Spotify.get('/callback', async function(req, res) {

    const code = req.query.code || null;  // Authorisation code obtained from request that can be exchanged for an access token.
    const state = req.query.state || null;  // The value of the state parameter supplied in the request received from the url.
    const storedState = req.cookies ? req.cookies['spotify_auth_state']: null;  // state received from the cookie.

    if (state === null || state !== storedState) { // if state equals null or does not match the state received from the cookie, there is risk of cross-site request forgery (CSRF)
        res.redirect('/#' +
        querystring.stringify({ error: 'state_mismatch' }));
    }

    try {
        const response = await axios.post(tokenUrl, 
            qs.stringify({
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')  // Base 64 encoded string that contains the client ID and client secret key.
                }
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        res.redirect('/#' + querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            expires_in: expires_in,
        }));

    } catch (error) {
        console.error('Error exchanging token:', error.response?.data || error.message);
        res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
    }
});

function get_tracks() {

}