import { useState, useEffect } from "react"
import axios from "axios"  // promised-based HTTP client to make requests to your backend

export default function useAuth(code) { // defines a custome React hook called 'useAuth'
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => { 
        if (!code || hasRequested) return; // if 'code' is null or undefined, we skip the useEffect to prevent errors
        setHasRequested(true);
        console.log("Sending auth code to backend:", code);
        // sends a POST request to the backend endpoint /login, which:
        // 1. Initialises the Spotify Web API client
        // 2. Sends the authorisation code to Spotify
        // 3. Recieves an access_token, refresh_token, and expires_in
        axios 
            .post("http://127.0.0.1:3001/login", {
                code,
        },
        {
            headers: {
                "content-type": "application/json"
            }
        })
        // a successful request will result in the storage of tokens and expiration time in state
        .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.replaceState({}, document.title, "/")
        })
        // if there is an error, we redirect back to the login page by reloading the root route
        .catch((err) => {
            console.error("Login failed:", err.response?.data || err.message);
            alert("Login failed. Please try again.");
            window.location = "/";
        });
    // the dependancy causes the effect to run whenever the code changes (usually just once after login)    
    }, [code, hasRequested])

    useEffect(() => {
        if (!accessToken) return;
        // Once token is set, navigate to /dashboard
        window.history.replaceState({}, null, "/dashboard");
        }, [accessToken]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return; // if refreshToken/expiresIn is null or undefined, we skip the useEffect to prevent errors
        const interval = setInterval(() => { // sets a timer that will run a function every (expiresIn - 60) seconds, so the token refreshes 1 minute before expiration

            // sends a POST request to the backend endpoint /refresh to exchange the refresh token for a new access token
            axios
                .post("http://127.0.0.1:3001/refresh", {
                refreshToken,
            })
            // on success, updates the access token and expiration time
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            })
            // on failure, redirect user back to the login
            .catch(() => {
                window.location = "/"
            })
        // time for the interval to run in milliseconds so we multiply by 1000
        }, (expiresIn - 60) * 1000)
        // cleanup function: if the component unmounts or refreshToken/expiresIn changes, we clear the interval to avoid memory leaks or duplicates
        return () => clearInterval(interval)
        // the dependancy causes the effect to run whenever the refreshToken/expiresIn changes
        }, [refreshToken, expiresIn])

    // returns the accessToken to whatever component is using the 'useAuth' hook (Dashboard to make API calls)    
    return accessToken
}
