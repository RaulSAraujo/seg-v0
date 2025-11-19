<script lang="ts" setup>
import type { RowWithRelationship } from "~/interfaces/ProductSell";

defineOptions({
  name: "CounterOrderBudgetProductsCreationTable",
});

defineProps<{
  products: RowWithRelationship[];
  loading: boolean;
}>();

defineEmits(["add"]);

interface Headers {
  key: string;
  title: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Ações", key: "actions" },
  { title: "Cód. fabricante", key: "name" },
  { title: "Cód. auxiliar", key: "id" },
  { title: "Descrição", key: "description" },
  { title: "Estoque", key: "quantity", align: "center" },
  { title: "Preço", key: "price" },
]);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :loading="loading"
    items-per-page="-1"
    hide-default-footer
    disable-sort
  >
    <template #item.actions="{ item }">
      <v-btn
        icon="mdi-plus"
        variant="plain"
        size="small"
        color="primary"
        density="comfortable"
        @click="$emit('add', item)"
      />
    </template>

    <template #item.name="{ item }">
      <UiTooltip
        :text="item.type === 'KIT' ? '' : item.Family.SellPreference?.name"
        :vw="25"
      />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="25" />
    </template>

    <template #item.price="{ item }">
      <UiToLocaleString
        :value="
          item.type === 'KIT'
            ? item.Kit?.Products[0]?.counter_price
            : item.Family.SellPreference?.counter_price
        "
      />
    </template>
  </v-data-table>
</template>
