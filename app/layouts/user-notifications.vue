<script setup lang="ts">
import Header from '~/components/header/Index.vue'
import HeaderMobileDrawer from '~/components/header/mobile/Drawer.vue'

const { $device } = useNuxtApp();
</script>

<template>
  <v-app>
    <Header />

    <LazyHeaderMobileDrawer
      v-if="$device.isMobileOrTablet"
      hydrate-on-media-query="(max-width: 768px)"
    />

    <v-main class="d-flex flex-column align-center justify-center">
      <slot />
    </v-main>
  </v-app>
</template>
