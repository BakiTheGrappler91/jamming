const clientId = '8cded5c4bd6544b79e557f40183247dd'; // Insert client ID here.
const redirectUri = 'http://127.0.0.1:8000/callback'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    
}