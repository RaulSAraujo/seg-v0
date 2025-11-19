<script lang="ts" setup>
import Chip from "./Chip.vue";
import { updateImportOrdersProducts } from "~/services/order-import.service";

defineOptions({
  name: "OrderImportTableStatus",
});

const p = defineProps<{
  id: number;
  status: string;
}>();

const emit = defineEmits(["update-status", "update-receipt-date"]);

const loading = useLoadingIndicator();

const statusList = ref([
  "EM ABERTO",
  "EM RECEBIMENTO",
  "CANCEL. FORN",
  "LIBERADO",
  "REJEITADO",
  "CANCEL. DELTA",
  "PERDA",
  "PENDENTE",
]);

const save = async (event: string) => {
  try {
    loading.start();

    let receivingAt: Date | null | undefined = undefined;

    if (event == "EM ABERTO") {
      receivingAt = null;
    }

    if (event == "EM RECEBIMENTO") {
      receivingAt = new Date();
    }

    await updateImportOrdersProducts({
      id: p.id,
      status: event,
      receipt_date: receivingAt,
    });

    emit("update-status", event);

    if (receivingAt != undefined) {
      emit("update-receipt-date", receivingAt);
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <UiEditDialogObject
    :items="statusList"
    :value="status"
    :export-save="true"
    @export-save="save"
  >
    <template #default="props">
      <Chip v-bind="props" :status="status" />
    </template>
  </UiEditDialogObject>
</template>
