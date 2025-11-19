<script lang="ts" setup>
import { updateProductPurchaseInvoice } from "~/services/purchase-order.service";

import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
}>();

const { brDate } = useDateConversion();
const loading = useLoadingIndicator();

const purchaseOrderStore = usePurchaseOrderStore();
const { edit } = storeToRefs(purchaseOrderStore);

const activeEdit = (event: MouseEvent) => {
  purchaseOrderStore.showEdit({
    save,
    type: "string",
    external: true,
    attr: "invoice",
    item: props.item,
    mouseEvent: event,
  });
};

const save = async () => {
  try {
    if (!edit.value.item) return;

    loading.start();

    const res = await updateProductPurchaseInvoice({
      id: props.item.id,
      invoice: `${edit.value.newValue}`,
    });

    edit.value.item.invoice = res.invoice;
    edit.value.item.invoice_issuance_date = res.invoice_issuance_date;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <div
    v-if="!item.invoice_issuance_date"
    class="container-global-edit"
    @click="activeEdit"
  >
    <span>{{ item.invoice }}</span>
  </div>

  <v-tooltip
    v-else
    location="top"
    :text="brDate(`${item.invoice_issuance_date || ''}`)"
    :disabled="!item.invoice_issuance_date"
    content-class="bg-primary"
  >
    <template #activator="{ props: tooltip }">
      <div v-bind="tooltip" class="container-global-edit" @click="activeEdit">
        <span>{{ item.invoice }}</span>
      </div>
    </template>
  </v-tooltip>
</template>

<style scoped>
.container-global-edit {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
