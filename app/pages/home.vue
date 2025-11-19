<script setup lang="ts">
useHead({
  titleTemplate: `Inicio - %s`,
});

definePageMeta({
  path: "/inicio",
});
</script>

<template>
  <HomeBackground>
    <v-sheet
      height="50vh"
      class="d-flex flex-rows align-end justify-center"
      color="transparent"
    >
      <div class="d-flex flex-column justify-center align-center">
        <HomeClock />
      </div>
    </v-sheet>

    <HomeWeather />
  </HomeBackground>
</template>
