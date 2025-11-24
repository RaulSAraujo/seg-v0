<script lang="ts" setup>
import { updateCounterOrderProduct } from "~/services/counter-order.service";

import type { FetchError } from "ofetch";

const props = defineProps<{
  id?: number;
  price: string | null;
}>();

const emit = defineEmits(["update"]);

const loadingIndicator = useLoadingIndicator();

const update = async (value: string) => {
  if (!props.id) return emit("update", value.toString());

  try {
    loadingIndicator.start();

    await updateCounterOrderProduct(props.id, { counter_price: value });

    emit("update", value.toString());
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusMessage}`);
  } finally {
    loadingIndicator.finish();
  }
};
</script>

<template>
  <UiEditDialogCurrency
    :value="price"
    :export-save="true"
    @export-save="update"
  />
</template>
