<template>
  <div>
    <h1>Spotify Token Exchange Test</h1>
    <input v-model="authCode" placeholder="Enter Spotify Authorization Code" />
    <button @click="exchangeToken">Exchange Token</button>

    <div v-if="response">
      <h2>Response:</h2>
      <pre>{{ response }}</pre>
    </div>

    <div v-if="error">
      <h2>Error:</h2>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const authCode = ref('');
const response = ref(null);
const error = ref(null);

const exchangeToken = async () => {
  try {
    response.value = null;
    error.value = null;

    const res = await fetch('/api/spotify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: authCode.value,
        redirect_uri: 'http://localhost:3000/callback',
      }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    response.value = await res.json();
  } catch (err) {
    error.value = err.message;
    console.error('Error:', err);
  }
};
</script>
