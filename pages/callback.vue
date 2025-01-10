<template>
  <div class="callback-container">
    <h1>Processing Spotify Authorization...</h1>
    <p v-if="error" class="error">Error: {{ error }}</p>
    <p v-else-if="loading" class="loading">Exchanging token...</p>
    <p v-else class="success">Success! Access token exchanged.</p>
    <LoadingScreen />
  </div>
</template>

<script setup>

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const code = route.query.code;

  if (!code) {
    handleError('Authorization code is missing.');
    return;
  }

  try {
    // Exchange the authorization code for an access token
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
      throw new Error(message || 'Failed to exchange token with Spotify.');
    }

    const data = await res.json();
    console.log('Access Token Response:', data);

    // Save the access token to localStorage
    localStorage.setItem('spotify_access_token', data.access_token);

    // Update loading state
    loading.value = false;

    // Redirect to home or another page
    router.push('/');
  } catch (err) {
    handleError(err.message || 'An unexpected error occurred.');
  }
});

const handleError = (message) => {
  error.value = message;
  loading.value = false;
  console.error('Error:', message);
};
</script>

<style scoped>
.callback-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  text-align: center;
}

.error {
  color: red;
  margin-bottom: 25px;
}

.loading {
  color: #555;
}

.success {
  color: green;
  margin-bottom: 25px;
}
</style>
