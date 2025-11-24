<script setup lang="ts">
defineOptions({
  name: "ProductStatusTable",
});

const productStore = useProductStore();
const { productPstatuses } = storeToRefs(productStore);

const headers = ref([
  { text: "ID", value: "id" },
  { text: "ID produto", value: "product_id" },
  { text: "Status", value: "pstatus_id" },
  { text: "Criado em", value: "created_at" },
  { text: "Alterado em", value: "updated_at" },
]);
</script>

<template>
  <v-data-table
    :items="productPstatuses"
    :headers="headers"
    hide-default-footer
  >
    <template #item.pstatus_id="{ item }">
      <span>{{ item.name }}</span>
    </template>

    <template #item.created_at="{ item }">
      <UiDateString
        :date="item.ProductPstatus?.created_at ?? null"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>

    <template #item.updated_at="{ item }">
      <UiDateString
        :date="item.ProductPstatus?.updated_at ?? null"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>
  </v-data-table>
</template>
