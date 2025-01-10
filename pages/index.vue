<template>
  <div class="container">
    <HeaderComponent />
    <SearchBar v-model:query="query" />
    <div class="results-wrapper">
      <SearchResults :query="query" />
    </div>
  </div>
  <LogoutButton class="logout" />
</template>

<script setup>
import HeaderComponent from '~/components/HeaderComponent.vue';
import SearchBar from '~/components/SearchBar.vue';
import SearchResults from '~/components/SearchResults.vue';
import LogoutButton from '~/components/LogoutButton.vue';

const query = ref('');
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.results-wrapper {
  margin-top: 20px;
  min-height: 200px;
  width: 100%;
  max-width: 600px;
}

.logout {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>
