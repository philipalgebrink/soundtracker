<template>
  <button @click="redirectToSpotify">Login with Spotify</button>
</template>

<script setup>
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const redirectToSpotify = () => {
  const clientId = config.public.spotifyClientId;
  const redirectUri = config.public.redirectUri;
  const scope = 'user-read-private user-read-email';

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = spotifyAuthUrl;
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
