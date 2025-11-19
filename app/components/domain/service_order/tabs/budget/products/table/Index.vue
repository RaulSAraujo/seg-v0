<script lang="ts" setup>
import Printer from "./template/Printer.vue";
import ValueTotal from "./template/ValueTotal.vue";
import Reserved from "./template/reserved/Index.vue";
import DeleteAndGenerateCrm from "./template/DeleteAndGenerateCrm/Index.vue";

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers = ref<Header[]>([
  { title: "Ações", key: "actions" },
  { title: "Código de fabricante", key: "name" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Quantidade", key: "quantity" },
  { title: "Custo", key: "cost" },
  { title: "Preço", key: "product_value" },
  { title: "Valor total", key: "value_total" },
  { title: "Disponível", key: "availability", align: "center" },
  { title: "Dias previsão", key: "forecast_days" },
  { title: "Data previsão", key: "availability_at" },
  { title: "Reservado", key: "reserved", align: "center" },
  { title: "Imprimir", key: "print", align: "center" },
]);

const productStore = useServiceOrderProductsStore();
const { serviceOrderProducts } = storeToRefs(productStore);

const { hasPermission } = usePermissions();

const permissionBudgetCost = await hasPermission("service-order-budget-cost");

if (!permissionBudgetCost) {
  headers.value = headers.value.filter((e) => e.key != "cost");
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="serviceOrderProducts"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5"
    items-per-page="-1"
  >
    <template #item.actions="{ item, index }">
      <UiDelete
        v-if="item.reserved != 2"
        :id="item.id"
        :splice-external="true"
        url-local="service-order/service-order-products"
        @remove="productStore.remove(index)"
      />

      <DeleteAndGenerateCrm
        v-else
        :id="item.id"
        :name-product="item.name"
        @remove="productStore.remove(index)"
      />
    </template>

    <template #item.quantity="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        attr="quantity"
        :value="item.quantity"
        url="service-order/service-order-products"
        @update-text="item.quantity = $event"
      />
    </template>

    <template #item.cost="{ item }">
      <UiEditDialogCurrency
        :id="item.id"
        attr="cost"
        :value="item.cost"
        url="service-order/service-order-products"
        @update-text="item.cost = `${$event}`"
      />
    </template>

    <template #item.product_value="{ item }">
      <UiEditDialogCurrency
        :id="item.id"
        attr="product_value"
        :value="item.product_value"
        url="service-order/service-order-products"
        @update-text="item.product_value = `${$event}`"
      />
    </template>

    <template #item.availability="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.availability"
        url="service-order/service-order-products"
        attr="availability"
        :enable-alert="true"
        @update-value="item.availability = $event"
      />
    </template>

    <template #item.forecast_days="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        attr="forecast_days"
        :value="item.forecast_days"
        url="service-order/service-order-products"
        @update-text="item.forecast_days = $event"
      />
    </template>

    <template #item.value_total="{ item }">
      <ValueTotal :value="`${item.product_value}`" :quantity="item.quantity" />
    </template>

    <template #item.reserved="{ item }">
      <Reserved
        :id="item.id"
        :reserved="item.reserved"
        :name-product="item.name"
        @update="item.reserved = $event"
      />
    </template>

    <template #item.print="{ item }">
      <Printer
        :ean="item.ean"
        :name="item.name"
        :service-order-id="item.service_order_id"
        :erp-reserve-id="item.erp_reserve_id"
      />
    </template>

    <template #item.availability_at="{ item }">
      <UiDateString :date="item.availability_at" />
    </template>
  </v-data-table>
</template>
