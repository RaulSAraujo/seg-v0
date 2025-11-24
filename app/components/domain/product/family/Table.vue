<script setup lang="ts">
defineOptions({
  name: "ProductFamilyTable",
});

const { params } = useRoute();

const productStore = useProductStore();
const { familyList, loadingFamily } = storeToRefs(productStore);

const headers = ref([
  { title: "Id", key: "id" },
  { title: "Código fabricante", key: "name" },
  { title: "Disponibilidade", key: "availability" },
  { title: "Tipo", key: "type" },
  { title: "Código erp", key: "erp_product_id" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Código barra", key: "ean" },
  { title: "Descrição", key: "description" },
  { title: "Marca", key: "brand" },
  { title: "Lead time", key: "lead_time" },
  { title: "Aparelho", key: "apparatus" },
  { title: "Custo", key: "cost" },
  { title: "Preço", key: "price" },
  { title: "Estoque", key: "quantity" },
  { title: "Estoque virtual", key: "virtual_quantity" },
  { title: "Imagem", key: "image" },
  { title: "Suporte", key: "support" },
  { title: "Sincronização ecom", key: "erp_syncecom" },
  { title: "Peso", key: "gross_weight" },
  { title: "Observação", key: "observation" },
]);

onMounted(async () => {
  const data = await productStore.fetchFamily(params.type_id as string);
  familyList.value = data;
});
</script>

<template>
  <v-data-table
    :items="familyList ?? []"
    :headers="headers"
    :loading="loadingFamily"
    hide-default-footer
    disable-sort
  >
    <template #item.image="{ item }">
      <UiCheckIcon :value="item.image ?? false" :readonly="true" />
    </template>

    <template #item.support="{ item }">
      <UiCheckIcon :value="item.support ?? false" :readonly="true" />
    </template>

    <template #item.erp_syncecom="{ item }">
      <UiCheckIcon :value="item.erp_syncecom ?? false" :readonly="true" />
    </template>

    <template #item.apparatus="{ item }">
      <UiTooltip :text="item.apparatus" :vw="5" />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="5" />
    </template>

    <template #item.price="{ item }">
      <UiToLocaleString :value="item.price || null" />
    </template>

    <template #item.cost="{ item }">
      <UiToLocaleString :value="item.cost || null" />
    </template>

    <template #item.observation="{ item }">
      <UiTooltip :text="item.observation" :vw="5" />
    </template>
  </v-data-table>
</template>
