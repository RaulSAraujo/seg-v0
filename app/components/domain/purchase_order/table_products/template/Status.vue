<script lang="ts" setup>
import { updatePurchaseControlProduct } from "~/services/purchase-order.service";
import {
  getStatusColor,
  PURCHASE_ORDER_STATUS_TEXTS,
} from "~/composables/purchase_order/utils/purchaseOrderStatus";

import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
}>();

const purchaseOrderStore = usePurchaseOrderStore();
const { edit } = storeToRefs(purchaseOrderStore);

const list = PURCHASE_ORDER_STATUS_TEXTS;

const activeEdit = (event: MouseEvent) => {
  purchaseOrderStore.showEdit({
    mouseEvent: event,
    attr: "status",
    type: "object",
    items: list,
    item: props.item,
    itemTitle: "text",
    itemValue: "text",
    external: true,
    save: save,
  });
};

const save = async () => {
  try {
    let receivingAt: Date | null | undefined = undefined;

    if (edit.value.newValue == "EM ABERTO") {
      receivingAt = null;
    }

    if (edit.value.newValue == "EM RECEBIMENTO") {
      receivingAt = new Date();
    }

    await updatePurchaseControlProduct({
      id: props.item.id,
      status: `${edit.value.newValue}`,
      receiving_at: receivingAt,
    });

    if (edit.value.item) {
      edit.value.item.status = `${edit.value.newValue}`;

      if (receivingAt !== undefined) {
        edit.value.item.receiving_at = receivingAt?.toLocaleString() ?? null;
      }
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <div class="container-global-edit" @click="activeEdit">
    <v-chip :color="getStatusColor(item.status)" size="small">
      {{ item.status }}
    </v-chip>
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
