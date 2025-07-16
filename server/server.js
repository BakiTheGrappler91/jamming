// Backend of the app that receives requests and performs tasks based on type of request

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
//const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log("Refresh Token:", refreshToken);
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://127.0.0.1:3000/callback",
        clientId: "8cded5c4bd6544b79e557f40183247dd",
        clientSecret: "d76db6f92dd74d168525395112850dad",
        refreshToken,
    })

    spotifyApi
        .refreshAccessToken()
        .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
    const code = req.body.code
    console.log("Received code from client:", code);
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://127.0.0.1:3000/callback",
        clientId: "8cded5c4bd6544b79e557f40183247dd",
        clientSecret: "d76db6f92dd74d168525395112850dad",
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            console.log("Spotfiy token response:", data.body);
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
        })
    })
    .catch(err => {
        console.error("Error during authorisationCodeGrant", err);
        res.status(400).send("Login failed");
    });
});

/*app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})*/

app.listen(3001)