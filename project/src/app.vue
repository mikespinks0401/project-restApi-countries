<script setup lang="ts">
import { useThemeStore } from "~/stores/themeStore"
const themeStore = useThemeStore()

type theme = "dark" | "light" | "undefined"
const loading = ref(true)
onMounted(() => {
  const useTheme = themeStore.getThemeFromStorage()
  setTimeout(() => {
    if (useTheme != null) {
      themeStore.setTheme(useTheme)
    }
  }, 500)
  loading.value = false;

})

</script>

<template>
  <div>
    <div
      v-if="loading"
      style="height: 100vh; display: flex; justify-content: center; align-items: center;"
    >
      <h2>Loading</h2>
    </div>
    <v-app
      v-else
      :theme=themeStore.useTheme
    >
      <v-app-bar>
        <v-app-bar-title>
          <NuxtLink
            :class="themeStore.useTheme === 'dark' ? 'text-white' : 'text-grey'"
            id="homeLink"
            to="/"
          >
            Where in The World
          </NuxtLink>
        </v-app-bar-title>
        <v-spacer />
        <div class="d-flex align-center px-4">
          <v-btn
            :class="themeStore.useTheme === 'dark' ? 'text-white' : 'text-black'"
            @click="themeStore.changeTheme"
            :icon="themeStore.useTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          >
          </v-btn>
          <p class="font-weight-bold">{{ themeStore.useTheme === 'light' ? "dark mode" : "light mode" }}</p>
        </div>
      </v-app-bar>
      <v-main class="bg-surface">
        <NuxtPage />
      </v-main>
    </v-app>
  </div>
</template>
<style scoped>#homeLink {
  text-decoration: none;
}</style>