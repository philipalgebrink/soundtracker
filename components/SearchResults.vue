<template>
  <div class="results">
    <h2 v-if="results.length">Search Results</h2>
    <ul v-if="results.length">
      <li v-for="result in results" :key="result.id">
        {{ result.name }} by {{ result.artists[0].name }}
      </li>
    </ul>
    <p v-if="!results.length && query.trim() && !loading">No results found.</p>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  query: String,
});

const results = ref([]);
const loading = ref(false);

watch(
  () => props.query,
  async (newQuery) => {
    if (!newQuery.trim()) {
      results.value = [];
      return;
    }

    const token = localStorage.getItem('spotify_access_token');
    if (!token) return;

    loading.value = true;
    results.value = [];

    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(newQuery)}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        results.value = data.tracks.items;
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }
);
</script>

<style scoped>
.results {
  margin-top: 20px;
  text-align: left;
}

.results ul {
  list-style: none;
  padding: 0;
}

.results li {
  margin-bottom: 10px;
}

.results p {
  margin-top: 10px;
}
</style>
