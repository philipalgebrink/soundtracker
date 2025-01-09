<template>
  <div>
    <h1>Processing Spotify Authorization...</h1>
    <p v-if="error">Error: {{ error }}</p>
    <p v-else-if="loading">Exchanging token...</p>
    <p v-else>Success! Access token exchanged.</p>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const code = route.query.code;

  if (!code) {
    error.value = 'Authorization code is missing.';
    loading.value = false;
    return;
  }

  try {
    // Exchange the code for an access token
    const res = await fetch('/api/spotify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        redirect_uri: 'http://localhost:3000/callback',
      }),
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }

    const data = await res.json();
    console.log('Access Token Response:', data);

    // Save the access token (optional)
    localStorage.setItem('spotify_access_token', data.access_token);

    loading.value = false;
    // Redirect to home or a success page
    router.push('/');
  } catch (err) {
    error.value = err.message;
    loading.value = false;
    console.error('Error:', err);
  }
});
</script>
