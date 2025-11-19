<script setup lang="ts">
useHead({
  titleTemplate: `Logs de alteração de senhas - %s`,
});

definePageMeta({
  path: "/logs-alteracao-senhas",
});
</script>

<template>
  <div class="mt-5">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para senhas de fornecedor"
        :to="{
          name: 'supplier-password',
        }"
      />

      <v-spacer />
    </div>

    <span class="ml-5 text-h6 text-primary"> LOGS DE ALTERAÇÃO DE SENHAS </span>

    <UiFilter />

    <UiTable multi-sort />
  </div>
</template>
