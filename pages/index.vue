<template>
  <div class="container">
    <HeaderComponent />
    <SearchBar v-model:query="query" />
    <div class="results-wrapper">
      <SearchResults :query="query" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderComponent from '~/components/HeaderComponent.vue';
import SearchBar from '~/components/SearchBar.vue';
import SearchResults from '~/components/SearchResults.vue';

const query = ref('');
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Prevent elements from moving up/down */
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.results-wrapper {
  margin-top: 20px; /* Add some space between search bar and results */
  min-height: 200px; /* Reserve space for results to prevent jumping */
  width: 100%;
  max-width: 600px;
}
</style>
