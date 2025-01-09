export default defineNuxtConfig({
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
    },
  },

  compatibilityDate: "2025-01-09",
});