<script setup lang="ts">
useHead({
  titleTemplate: `Notificações - %s`,
});

definePageMeta({
  path: "/configuracoes/usuarios/notificacoes",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">NOTIFICAÇÕES</span>

    <UiFilter />

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <UiDelete :id="item.id" />
      </template>
    </UiTable>
  </div>
</template>
