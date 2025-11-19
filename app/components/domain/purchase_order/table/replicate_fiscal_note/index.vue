<script lang="ts" setup>
import { updatePurchaseControlProduct } from "~/services/purchase-order.service";
import { calculateDifferences } from "~/composables/purchase_order/utils/calculateDifference";

import type { Row } from "~/interfaces/PurchaseControlProduct";

defineOptions({
  name: "PurchaseOrderReplicateFiscalNote",
});

const loading = useLoadingIndicator();

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const replicate = async () => {
  try {
    loading.start();

    const rows = selected.value as unknown as Row[];

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];

      if (!row) continue;

      const diffs = calculateDifferences({
        invoiceCost: `${row.purchase_cost}`,
        segCost: row.seg_cost,
        purchaseCost: row.purchase_cost,
      });

      const res = await updatePurchaseControlProduct({
        id: row.id,
        invoice_cost: row.purchase_cost,
        ...diffs,
      });

      if (!res.result[0]) continue;

      Object.entries(res.result[0]).forEach(([key, value]) => {
        if (key in row) {
          (row as unknown as Record<string, unknown>)[key] = value;
        }
      });
    }

    loading.finish();
  } catch (error) {
    loading.finish();

    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-btn
    text="Replicar valores nota fiscal"
    prepend-icon="mdi-transfer"
    stacked
    class="text-cyan"
    variant="plain"
    @click="replicate"
  />
</template>
