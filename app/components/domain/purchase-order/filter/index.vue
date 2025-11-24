<script lang="ts" setup>
import ImportXml from "./menu/import_xml/Index.vue";
import CustomFilterInvoiceEmpty from "./CustomFilterInvoiceEmpty.vue";
import CustomFilterStatusLimite from "./CustomFilterStatusLimite.vue";

defineOptions({
  name: "PurchaseOrderFilter",
});

const purchaseOrderStore = usePurchaseOrderStore();
const { statusLimit, invoiceEmpty } = storeToRefs(purchaseOrderStore);

const clear = () => {
  statusLimit.value = false;
  invoiceEmpty.value = false;
};
</script>

<template>
  <UiFilter @clear="clear">
    <template #extra-filter>
      <CustomFilterStatusLimite />

      <CustomFilterInvoiceEmpty />
    </template>

    <template #menu>
      <ImportXml />
    </template>

    <template #button-create>
      <v-btn
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
        :to="{
          name: 'purchase-order-creation',
        }"
      />
    </template>
  </UiFilter>
</template>
