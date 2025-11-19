<script setup lang="ts">
useHead({
  titleTemplate: `Log de separação - %s`,
});

definePageMeta({
  path: "/log-separacao",
})

const { brDateWithTime } = useDateConversion();
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">LOG DE SEPARAÇÃO</span>

    <UiFilter />

    <UiTable>
      <template #item.action="{ item }">
        <SeparationLogPrint :id="item.id" />
      </template>

      <template #item.produto_chave="{ item }">
        <span>{{ item.Product.produto_chave }}</span>
      </template>

      <template #item.description="{ item }">
        <UiTooltip :text="item.Product.description" :vw="5" />
      </template>

      <template #item.user_id="{ item }">
        <UiTooltip :text="item.User?.username" :vw="5" />
      </template>

      <template #item.created_at="{ item }">
        <span>{{ brDateWithTime(`${item.created_at}`) }}</span>
      </template>

      <template #item.updated_at="{ item }">
        <span>{{ brDateWithTime(`${item.updated_at}`) }}</span>
      </template>
    </UiTable>
  </div>
</template>
