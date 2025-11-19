<script setup lang="ts">
defineOptions({
  name: "ProductCostTableMyTable",
});

const productStore = useProductStore();
const { productQuotations, costTableIndex } = storeToRefs(productStore);

const activateDialogToEdit = ref(false);

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Ações", key: "action" },
  { title: "Id", key: "id" },
  { title: "Id produto", key: "product_id" },
  { title: "Id fornecedor", key: "Supplier.name" },
  { title: "Caminho arquivo", key: "filepath" },
  { title: "Nome arquivo", key: "filename" },
  { title: "Custo", key: "cost", width: 110 },
  { title: "Custo em", key: "cost_at" },
  { title: "Disponibilidade", key: "availability", align: "center" },
  { title: "Disponibilidade em", key: "availability_at" },
  { title: "Lead time", key: "lead_time" },
  { title: "Lead time em", key: "lead_time_at" },
  { title: "Quantidade virtual", key: "virtual_quantity" },
  { title: "Quantidade virtual em", key: "virtual_quantity_at" },
  { title: "Observação", key: "observation" },
  { title: "Ativo", key: "active" },
  { title: "Criado em", key: "created_at" },
  { title: "Atualizado em", key: "updated_at" },
]);
</script>

<template>
  <v-data-table
    class="rounded-xl border-sm pa-2"
    :headers="headers"
    :items="productQuotations"
    hide-default-footer
    disable-sort
  >
    <template #item.action="{ item, index }">
      <div class="d-flex flex-row">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          density="comfortable"
          color="blue"
          @click="
            costTableIndex = index;
            activateDialogToEdit = true;
          "
        />

        <UiDelete :id="item.id" url-local="quotation-pack/quotation" />
      </div>
    </template>

    <template #item.active="{ item }">
      <UiCheckIcon :value="item.active" />
    </template>

    <template #item.availability="{ item }: Record<string, any>">
      <TemplatesAvailability :availability="item.availability" />
    </template>

    <template #item.cost="{ item }: Record<string, any>">
      <UiToLocaleString :value="item.cost" />
    </template>

    <template #item.cost_at="{ item }">
      <UiDateString :date="item.cost_at" />
    </template>

    <template #item.lead_time_at="{ item }">
      <UiDateString :date="item.lead_time_at" />
    </template>

    <template #item.virtual_quantity_at="{ item }">
      <UiDateString :date="item.virtual_quantity_at" />
    </template>

    <template #item.created_at="{ item }">
      <UiDateString :date="item.created_at" />
    </template>

    <template #item.updated_at="{ item }">
      <UiDateString :date="item.updated_at" />
    </template>

    <template #item.availability_at="{ item }">
      <UiDateString :date="item.availability_at" />
    </template>
  </v-data-table>

  <ProductCostTableMyTableToEdit
    v-if="activateDialogToEdit"
    v-model="activateDialogToEdit"
    @disable="activateDialogToEdit = false"
  />
</template>
