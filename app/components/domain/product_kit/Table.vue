<script setup lang="ts">
defineOptions({
  name: "ProductKitTable",
});

const { params } = useRoute();

const productStore = useProductStore();
const { kitList } = storeToRefs(productStore);

const headers = ref([
  { title: "Ações", key: "action" },
  { title: "Código fabricante", key: "name" },
  { title: "Código erp", key: "erp_product_id" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Quantidade composição kit", key: "qtd_itens" },
  { title: "Estoque", key: "quantity" },
  { title: "Estoque virtual", key: "virtual_quantity" },
  { title: "Lead time", key: "lead_time" },
  { title: "Observação", key: "observation" },
]);

const { data, status } = useProductKit(params.type_id as string, { lazy: true });

watch(
  () => data.value,
  () => {
    kitList.value = data.value;
  }
);

onMounted(() => {
  if (status.value === "success") {
    kitList.value = data.value;
  }
});
</script>

<template>
  <v-data-table
    disable-sort
    :items="kitList ?? []"
    :headers="headers"
    hide-default-footer
    :loading="status === 'pending'"
  >
    <template #item.action="{ item }">
      <ProductKitTemplateRemove :id="item.id" />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="10" />
    </template>
  </v-data-table>
</template>
