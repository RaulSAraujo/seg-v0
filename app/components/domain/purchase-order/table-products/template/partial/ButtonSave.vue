<script lang="ts" setup>
import { createPartialProductPurchaseControl } from "~/services/purchase-order.service";

import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  item: Row;
  products: Row[];
  quantity: number;
}>();

const emit = defineEmits(["update", "block", "add", "close"]);

const loading = ref(false);

const setPartial = async () => {
  try {
    loading.value = true;

    const res = await createPartialProductPurchaseControl({
      productId: props.item.id,
      productXml: {
        ...props.item,
        quantity: props.quantity,
      },
    });

    if (res.fatherItem) {
      const index = props.products.findIndex((e) => e.id == res.fatherItem.id);

      emit("block", { index: index, value: true });
    }

    emit("add", res.childItem);

    emit("update", res.itemUpdated);

    emit("close");

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    class="mb-2"
    color="primary"
    width="8vw"
    variant="flat"
    text="SALVAR"
    :loading="loading"
    @click="setPartial"
  />
</template>
