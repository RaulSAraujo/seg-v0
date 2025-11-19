<script lang="ts" setup>
import TableProduct from "./template/TableProduct.vue";

defineOptions({
  name: "QuotationTable",
});

const { $config } = useNuxtApp();
</script>

<template>
  <UiTable :show-expand="true">
    <template #item.not_found_file="{ item }">
      <v-btn
        v-if="item.not_found_file"
        :href="`${$config.public.base_url_local}${item.not_found_file}`"
        variant="plain"
        target="_blank"
        color="blue"
        text="ARQUIVO.XLSX"
      />
    </template>

    <template #item.quotation_change_file="{ item }">
      <v-btn
        v-if="item.quotation_change_file"
        variant="plain"
        :href="`${$config.public.base_url_local}${item.quotation_change_file}`"
        target="_blank"
        color="blue"
        text="ARQUIVO.XLSX"
      />
    </template>

    <template #item.quotation_file="{ item }">
      <v-btn
        v-if="item.quotation_file"
        variant="plain"
        :href="`${$config.public.base_url_local}${item.quotation_file}`"
        target="_blank"
        color="blue"
        text="ARQUIVO.XLSX"
      />
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <TableProduct :items="item.QuotationItems" />
        </td>
      </tr>
    </template>
  </UiTable>
</template>
