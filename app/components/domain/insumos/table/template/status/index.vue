<script lang="ts" setup>
import { updateInputMaterials } from "~/services/insumos.service";
import Chip from "./Chip.vue";

defineOptions({
  name: "InsumosStatus",
});

const props = defineProps<{
  idInputMaterial: number;
  text: string;
}>();

const emit = defineEmits([
  "updateStatus",
  "updatePurchasedBy",
  "updatePurchaseDate",
  "updateReceivedDate",
]);

const status = [
  "EM ABERTO",
  "EM ANDAMENTO",
  "COMPRADO",
  "CANCEL DELTA",
  "CANCEL FORN",
  "LIBERADO",
];

const { data } = useAuth();

const update = (value: string) => {
  let receivedDate;
  if (value === "LIBERADO") {
    receivedDate = new Date();
  }

  let purchaseBy;
  let purchaseDate;
  if (value === "EM ABERTO") {
    purchaseBy = null;
    purchaseDate = null;
    receivedDate = null;
  } else if (value === "COMPRADO") {
    purchaseBy = data.value?.name;
    purchaseDate = new Date();
    receivedDate = null;
  }

  updateInputMaterials({
    id: props.idInputMaterial,
    status: value,
    purchased_by: purchaseBy,
    purchase_date: purchaseDate,
    received_date: receivedDate,
  });

  emit("updateStatus", value);
  if (purchaseBy !== undefined) emit("updatePurchasedBy", purchaseBy);
  if (purchaseDate !== undefined) emit("updatePurchaseDate", purchaseDate);
  if (receivedDate !== undefined) emit("updateReceivedDate", receivedDate);
};
</script>

<template>
  <UiEditDialogObject
    :items="status"
    attr="status"
    :value="text"
    :export-save="true"
    @export-save="update"
  >
    <template #default="bind">
      <Chip v-bind="bind" :text="text" />
    </template>
  </UiEditDialogObject>
</template>
