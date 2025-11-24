<script setup lang="ts">
const partsCollection = usePartsCollectionStore();
const { products, selected } = storeToRefs(partsCollection);

interface Headers {
  title: string;
  key: string;
  width?: number | string;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Código fabricante", key: "name" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Quantidade", key: "quantity" },
  { title: "Custo", key: "cost" },
  { title: "Preço", key: "product_value" },
]);
</script>

<template>
  <v-data-table
    v-model="selected"
    show-select
    :items="products"
    item-key="id"
    :headers="headers"
    hide-default-footer
    disable-sort
    items-per-page="-1"
    class="rounded-lg"
    select-strategy="single"
    :return-object="true"
  >
    <template #item.cost="{ item }">
      <UiToLocaleString :value="item.cost" />
    </template>

    <template #item.product_value="{ item }">
      <UiToLocaleString :value="item.product_value" />
    </template>
  </v-data-table>
</template>
