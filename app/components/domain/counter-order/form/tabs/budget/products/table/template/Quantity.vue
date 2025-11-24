<script lang="ts" setup>
import { updateCounterOrderProduct } from "~/services/counter-order.service";

import type { FetchError } from "ofetch";
import type { CounterOrderProduct } from "~/interfaces/CounterOrder";

defineOptions({
  name: "CounterOrderBudgetProductsTableTemplateQuantity",
});

const props = defineProps<{
  item: CounterOrderProduct;
}>();

const emit = defineEmits(["update"]);

const loading = useLoadingIndicator();

const updateQuantity = async (newValue: number) => {
  if (!props.item.id) return emit("update", newValue);

  try {
    loading.start();

    await updateCounterOrderProduct(props.item.id, { quantity: newValue });

    emit("update", newValue);
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <UiEditDialogNumber
    :value="item.quantity"
    :export-save="true"
    @export-save="updateQuantity"
  />
</template>
