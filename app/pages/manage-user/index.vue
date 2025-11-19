<script setup lang="ts">
useHead({
  titleTemplate: `Usuários - %s`,
});

definePageMeta({
  path: "/configuracoes/usuarios/gerenciamento",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">GERENCIAMENTO DE USUÁRIOS</span>

    <UiFilter>
      <template #button-create>
        <ManageUserCreation />
      </template>
    </UiFilter>

    <UiTable :multi-sort="true">
      <template #item.action="{ item }">
        <ManageUserEdit :item="item" />

        <UiDelete :id="item.id" />
      </template>

      <template #item.group_id="{ item }">
        <UiTooltip
          :text="`${item.group_id} - ${item.Group?.name || ''}`"
          :vw="5"
        />
      </template>
    </UiTable>
  </div>
</template>
