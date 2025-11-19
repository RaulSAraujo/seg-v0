<script setup lang="ts">
useHead({
  titleTemplate: `Classificação de aparelhos - %s`,
});

definePageMeta({
  path: "/classificacao-de-aparelhos",
});

const dialog = ref(false);
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-3">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para aparelhos"
        :to="{
          name: 'apparatus',
        }"
      />
    </div>

    <span class="ml-5 text-h6 text-primary"> CLASSIFICAÇÃO DE APARELHOS </span>

    <ApparatusClassificationFilter @active="dialog = true" />

    <ApparatusClassificationTable />

    <ApparatusClassificationCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
