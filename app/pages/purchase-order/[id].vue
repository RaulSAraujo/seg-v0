<script lang="ts" setup>
import { createDefaultPurchaseControl } from "~/factories/current/purchaseControl";
import { usePurchaseControl } from "~/composables/purchase_order/usePurchaseControl";

import type { Form } from "~/interfaces/PurchaseControl";
import type { Row } from "~/interfaces/PurchaseControlProduct";

const { params } = useRoute();

useHead({
  titleTemplate: `Pedido de compra #${params.id} - %s`,
});

definePageMeta({
  path: "/pedido-de-compra/:id",
});

const form = reactive<Form>({} as Form);

const loading = ref(false);
const setValueLoading = ref(0);
const products = ref<Row[]>([]);

const openErrors = ref(false);
const errors = ref<Row[]>([]);

const { data, status } = usePurchaseControl(params.id as string, {
  lazy: true,
});

const openError = (event: Row[]) => {
  errors.value = event;

  openErrors.value = true;
};

onMounted(() => {
  if (status.value === "error") return;

  const purchaseControl = createDefaultPurchaseControl(data.value);

  Object.assign(form, {
    id: purchaseControl.id,
    erp_order: purchaseControl.erp_order,
    description: purchaseControl.description,
    supplier: purchaseControl.supplier,
    supplier_order: purchaseControl.supplier_order,
    observation: purchaseControl.observation,
  });
  products.value = purchaseControl.PurchaseControlProducts;
});

onBeforeRouteLeave((to, from, next) => {
  if (
    to.name == "purchase-order" ||
    to.name == "purchase-order-id"
  ) {
    next();
  } else {
    const tableStore = useTableStore();
    tableStore.clearTableProps();

    const gridStore = useGridStore();
    gridStore.clearGridProps();

    next();
  }
});
</script>

<template>
  <div class="my-5">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para pedido de compra"
        :to="{
          name: 'purchase-order',
        }"
      />
    </div>

    <PurchaseOrderForm
      :title="`Pedido de compra #${params.id}`"
      :form="form"
      method-rest="PUT"
      :products="products"
      @loading="loading = $event"
      @errors="openError($event)"
      @set-value-loading="setValueLoading = $event"
    />

    <PurchaseOrderErrorList v-model="openErrors" :items="errors" />
  </div>
</template>
