<script setup lang="ts">
useHead({
  titleTemplate: `Log de acesso - %s`,
});

definePageMeta({
  path: "/configuracoes/usuarios/log-acesso",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">LOG DE ACESSO</span>

    <UiFilter />

    <UiTable multi-sort />
  </div>
</template>
