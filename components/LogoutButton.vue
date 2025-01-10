<template>
  <button v-if="isLoggedIn" class="logout-button" @click="logout">Logout</button>
</template>

<script setup>

const isLoggedIn = ref(false);
const router = useRouter();

const checkLoginStatus = () => {
  const token = localStorage.getItem('spotify_access_token');
  isLoggedIn.value = !!token;
};

const logout = () => {
  localStorage.removeItem('spotify_access_token'); // Clear token
  isLoggedIn.value = false;
  alert('You have been logged out.');
  router.push('/'); // Redirect to the home page after logout
};

// Check login status when the component is mounted
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
.logout-button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #d9534f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.logout-button:hover {
  background-color: #c9302c;
}
</style>
