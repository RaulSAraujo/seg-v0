<script lang="ts" setup>
type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: Header[] = [
  { title: "Ações", key: "actions" },
  { title: "Descrição", key: "service_description" },
  { title: "Quantidade", key: "quantity", align: "center" },
  { title: "Valor serviço", key: "service_value", align: "center" },
  { title: "Valor total", key: "amount", align: "center" },
];

const servicesStore = useServiceOrderServicesStore();
const { serviceOrderServices } = storeToRefs(servicesStore);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="serviceOrderServices"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5"
    items-per-page="-1"
  >
    <template #item.actions="{ item, index }">
      <UiDelete
        :id="item.id"
        url-local="service-order/service-order-services"
        :splice-external="true"
        @remove="servicesStore.remove(index)"
      />
    </template>

    <template #item.quantity="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        attr="quantity"
        :value="item.quantity"
        url="service-order/service-order-services"
        @update-text="item.quantity = $event"
      />
    </template>

    <template #item.service_value="{ item }">
      <UiEditDialogCurrency
        :id="item.id"
        attr="service_value"
        :value="item.service_value"
        url="service-order/service-order-services"
        @update-text="item.service_value = `${$event}`"
      />
    </template>

    <template #item.amount="{ item }">
      <ServiceOrderTabsBudgetServicesTableTemplateValueTotal
        :quantity="item.quantity"
        :value="item.service_value"
      />
    </template>
  </v-data-table>
</template>
