<script lang="ts" setup>
import { updatePurchaseControlProduct } from "~/services/purchase-order.service";
import { calculateDifferences } from "~/composables/purchase_order/utils/calculateDifference";

import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
}>();

const purchaseOrderStore = usePurchaseOrderStore();
const { edit } = storeToRefs(purchaseOrderStore);

const activeEdit = (event: MouseEvent) => {
  purchaseOrderStore.showEdit({
    mouseEvent: event,
    attr: "invoice_cost",
    type: "currency",
    item: props.item,
    external: true,
    save: save,
  });
};

const save = async () => {
  try {
    const diffs = calculateDifferences({
      invoiceCost: `${edit.value.newValue}`,
      segCost: props.item.seg_cost,
      purchaseCost: props.item.purchase_cost,
    });

    await updatePurchaseControlProduct({
      id: props.item.id,
      invoice_cost: `${edit.value.newValue}`,
      ...diffs,
    });

    if (edit.value.item) {
      edit.value.item.invoice_cost = `${edit.value.newValue}`;
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <div class="container-global-edit" @click="activeEdit">
    <UiToLocaleString :value="item.invoice_cost" />
  </div>
</template>

<style scoped>
.container-global-edit {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
