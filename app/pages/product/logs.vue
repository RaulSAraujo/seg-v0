<script setup lang="ts">
useHead({
  titleTemplate: `Logs da produto compra - %s`,
});

definePageMeta({
  path: "/logs-da-produto-compra",
});
</script>

<template>
  <div class="my-5">
    <div class="d-flex flex-row mx-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para produtos"
        :to="{
          name: 'product',
        }"
      />
    </div>

    <span class="ml-5 text-h6 text-primary"> LOGS DA PRODUTO COMPRA </span>

    <UiFilter />

    <UiTable multi-sort>
      <template #item.new_value="{ item }">
        <UiToLocaleString
          v-if="item.field_name.includes('Preço')"
          :value="item.new_value"
        />

        <span v-else>{{ item.new_value }}</span>
      </template>

      <template #item.old_value="{ item }">
        <UiToLocaleString
          v-if="item.field_name.includes('Preço')"
          :value="item.old_value"
        />

        <span v-else>{{ item.old_value }}</span>
      </template>
    </UiTable>
  </div>
</template>
