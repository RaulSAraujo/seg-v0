<script lang="ts" setup>
import Chip from "./chip.vue";
import { updateOrderMl } from "~/services/order-ml.service";

defineOptions({
  name: "OrderMlTableStatus",
});

const props = defineProps<{
  id: number;
  statusCurrent: string;
}>();

const emit = defineEmits(["update-status", "update-received-date"]);

const status = ref([
  "EM ABERTO",
  "AGUARDANDO APROVAÇÃO",
  "DEVOLUÇÃO",
  "DEVOLVIDO",
  "CANC DELTA/FORNC",
  "LIBERADO",
]);

const computedStatus = computed(() => props.statusCurrent);

const save = async (event: string) => {
  try {
    await updateOrderMl({
      id: props.id,
      status: event,
      received_date: event == "LIBERADO" ? new Date() : null,
    });

    emit("update-status", event);
    emit("update-received-date", event == "LIBERADO" ? new Date() : null);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }
};
</script>

<template>
  <UiEditDialogObject
    :id="id"
    :items="status"
    attr="status"
    :value="computedStatus"
    :export-save="true"
    @export-save="save"
  >
    <template #default="bind">
      <Chip v-bind="bind" :status="computedStatus" />
    </template>
  </UiEditDialogObject>
</template>
