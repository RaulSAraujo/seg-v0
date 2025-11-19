<script setup lang="ts">
import Header from '~/components/header/Index.vue'

const { $device, $router } = useNuxtApp();

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

watch(
  () => selected.value,
  (newValue) => {
    const root = document.documentElement;

    if (newValue && newValue.length === 0) {
      root.style.setProperty("--padding-bottom", "0px");
    } else {
      root.style.setProperty("--padding-bottom", "94px");
    }
  }
);
</script>

<template>
  <v-app>
    <Header />

    <LazyHeaderMobileDrawer
      v-if="$device.isMobileOrTablet"
      hydrate-on-media-query="(max-width: 768px)"
    />

    <v-main :class="$router.currentRoute.value.name !== 'home' ? 'main' : ''">
      <slot />
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
:root {
  --padding-bottom: 94px;
}

.main {
  padding-bottom: var(--padding-bottom);
}
</style>
