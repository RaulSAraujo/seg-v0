<script lang="ts" setup>
defineOptions({
  name: "OrderImportTable",
});
</script>

<template>
  <UiTable :show-expand="true">
    <template #item.total_value="{ item }">
      <UiToLocaleString :value="item.total_value" />
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="pa-0">
          <OrderImportTableProducts
            :import-orders-products="item.ImportOrdersProducts"
          />
        </td>
      </tr>
    </template>
  </UiTable>
</template>
