<script setup lang="ts">
definePageMeta({
  layout: "login",
  middleware: "auth",
});

useHead({
  titleTemplate: `Login - %s`,
});

const { $device } = useNuxtApp();
const { token } = useAuth();

// Se já está autenticado, redireciona
if (token.value) {
  await navigateTo('/inicio');
}
</script>

<template>
  <div>
    <v-row v-if="$device.isDesktop" no-gutters>
      <v-col cols="7" md="8" lg="9">
        <LoginBackground />
      </v-col>

      <v-col
        cols="5"
        md="4"
        lg="3"
        class="d-flex align-center justify-center bg-black"
      >
        <div class="w-75">
          <LoginLogo />

          <LoginForm />
        </div>
      </v-col>
    </v-row>

    <LazyLoginMobile v-else hydrate-on-media-query="(max-width: 768px)" />
  </div>
</template>
