<template>
  <div>
    <h1>Your Spotify Profile</h1>
    <button @click="fetchProfile">Fetch Profile</button>

    <div v-if="profile">
      <h2>{{ profile.display_name }}</h2>
      <p>Email: {{ profile.email }}</p>
      <p>Followers: {{ profile.followers.total }}</p>
    </div>

    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const profile = ref(null);
const error = ref(null);

const fetchProfile = async () => {
  error.value = null;
  profile.value = null;

  const token = localStorage.getItem('spotify_access_token');
  if (!token) {
    error.value = 'Access token is missing.';
    return;
  }

  try {
    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    profile.value = await res.json();
  } catch (err) {
    error.value = err.message;
    console.error('Error fetching profile:', err);
  }
};
</script>
