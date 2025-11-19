<script lang="ts" setup>
import { updateImportOrdersProducts } from "~/services/order-import.service";

defineOptions({
  name: "OrderImportTribute",
});

const props = defineProps<{
  id: number;
  tribute: string | number;
}>();

const emit = defineEmits(["update"]);

const loading = useLoadingIndicator();

const save = async (value: number) => {
  loading.start();

  try {
    const res = await updateImportOrdersProducts({
      id: props.id,
      tribute: value.toFixed(2),
    });

    emit("update", res);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <UiEditDialogCurrency
    :id="id"
    :value="`${tribute}`"
    attr="tribute"
    :export-save="true"
    @export-save="save"
  />
</template>
