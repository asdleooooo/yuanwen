<script setup>
</script>

<template>
  <div class="app">
    <nav class="nav-menu">
      <router-link to="/rich-text" class="nav-item">富文本编辑器</router-link>
      <router-link to="/math-jax" class="nav-item">数学公式</router-link>
      <router-link to="/pdf-sync" class="nav-item">PDF同步</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-menu {
  background-color: #333;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #444;
}

.nav-item.router-link-active {
  background-color: #666;
}
</style>
