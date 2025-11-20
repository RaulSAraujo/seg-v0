<script setup lang="ts">
useHead({
  titleTemplate: `Novo cliente - %s`,
});

definePageMeta({
  path: "/cliente/criar",
});

const router = useRouter();
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-5">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar"
        @click="router.back()"
      />
    </div>

    <v-sheet class="mx-2 pb-3" rounded="xl" elevation="5">
      <ClientForm title="NOVO CLIENTE" />
    </v-sheet>
  </div>
</template>
