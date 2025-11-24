<script lang="ts" setup>
import Delete from "./template/Delete.vue";
import Quantity from "./template/Quantity.vue";
import EditPrice from "./template/EditPrice.vue";
import ValueTotal from "./template/ValueTotal.vue";

defineOptions({
  name: "CounterOrderBudgetProductsTable",
});

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: Header[] = [
  { title: "Ações", key: "actions" },
  { title: "Código de fabricante", key: "name" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Quantidade", key: "quantity", align: "center" },
  { title: "Preço", key: "counter_price" },
  { title: "Valor total", key: "value_total" },
];

const counterOrderProductsStore = useCounterOrderProductsStore();
const { products } = storeToRefs(counterOrderProductsStore);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="products"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5 bg-transparent"
    items-per-page="-1"
  >
    <template #item.actions="{ item, index }">
      <Delete
        :id="item.id"
        :index="index"
        @remove="products.splice(index, 1)"
      />
    </template>

    <template #item.quantity="{ item }">
      <Quantity :item="item" @update="item.quantity = $event" />
    </template>

    <template #item.counter_price="{ item }">
      <EditPrice
        :id="item.id"
        :price="item.counter_price ?? ''"
        @update="item.counter_price = $event"
      />
    </template>

    <template #item.value_total="{ item }">
      <ValueTotal :value="`${item.counter_price}`" :quantity="item.quantity" />
    </template>
  </v-data-table>
</template>
