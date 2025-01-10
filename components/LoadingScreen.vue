<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
p {
  margin: 15px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
