<script lang="ts" setup>
defineOptions({
  name: "SupplierPasswordTable",
});
</script>

<template>
  <UiTable multi-sort>
    <template #item.action="{ item }">
      <SupplierPasswordEdit :item="item" />

      <UiDelete :id="item.id" />
    </template>

    <template #item.supplier_password="{ item }">
      {{ item.supplier_password }}
    </template>

    <template #item.history="{ item }">
      <v-btn
        icon="mdi-history"
        variant="plain"
        color="primary"
        :to="{
          name: 'supplier-password-id',
          params: { id: item.id },
        }"
      />
    </template>
  </UiTable>
</template>
