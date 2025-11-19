<script lang="ts" setup>
import { updateInputMaterials } from "~/services/insumos.service";

const props = defineProps<{
  id: number;
  totalCost: string | null;
  quantityPurchase: number;
}>();

const emit = defineEmits([
  "updateTotalCost",
  "updateUnitCost",
  "updateQuantityPurchase",
]);

const update = async (value: string) => {
  const res = await updateInputMaterials({
    id: props.id,
    total_cost: value,
    quantity_purchase: props.quantityPurchase,
  });

  if (!res.result[0]) return;

  emit("updateTotalCost", parseFloat(`${res.result[0].total_cost}`).toFixed(2));
  emit("updateUnitCost", parseFloat(`${res.result[0].unit_cost}`).toFixed(2));
  emit("updateQuantityPurchase", props.quantityPurchase);
};
</script>

<template>
  <UiEditDialogCurrency
    :id="id"
    :value="totalCost"
    attr="total_cost"
    :export-save="true"
    @export-save="update"
  />
</template>
