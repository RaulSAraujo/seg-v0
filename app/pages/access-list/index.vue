<script setup lang="ts">
useHead({
  titleTemplate: `Lista de acesso - %s`,
});

definePageMeta({
  path: "/configuracoes/usuarios/lista-acesso",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">LISTA DE ACESSO</span>

    <UiFilter>
      <template #menu>
        <AccessListIpAuthorization />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.authorized="{ item }">
        <UiCheckIcon
          :id="item.id"
          :value="item.authorized"
          attr="authorized"
          @update-value="item.authorized = $event"
        />
      </template>

      <template #item.pending="{ item }">
        <UiCheckIcon
          :id="item.id"
          :value="item.pending"
          attr="pending"
          @update-value="item.pending = $event"
        />
      </template>
    </UiTable>
  </div>
</template>
