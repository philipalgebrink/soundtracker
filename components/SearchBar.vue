<template>
  <div class="search-icon" :class="{ expanded: isExpanded }">
    <template v-if="!isExpanded">
      <span @click="handleClick">🔍</span>
    </template>
    <template v-else>
      <input
        type="text"
        v-model="query"
        placeholder="Search..."
        @input="updateQuery"
      />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Emit definition
const emit = defineEmits(['update:query']);

const query = ref('');
const isExpanded = ref(false);

const updateQuery = () => {
  emit('update:query', query.value); // Emit the input event with the query value
};

const handleClick = () => {
  const token = localStorage.getItem('spotify_access_token');
  if (!token) {
    // Redirect to Spotify login
    const clientId = '612d7ae5a99f4f25b49f74b777ea6a42';
    const redirectUri = 'http://localhost:3000/callback';
    const scope = 'user-read-private user-read-email';
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = spotifyAuthUrl;
  } else {
    // Expand search bar
    isExpanded.value = true;
  }
};
</script>

<style scoped>
.search-icon {
  font-size: 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 10px;
}

.search-icon.expanded {
  font-size: 1rem;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 5px;
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
}

.search-icon input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1rem;
}
</style>
