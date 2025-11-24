<script lang="ts" setup>
import { useServiceOrderApi } from "../../api/useServiceOrderApi";

defineOptions({
  name: "ServiceOrderInputSupplier",
});

const { data, status } = useServiceOrderApi().fetchAllSuppliers({ lazy: true });

const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: supplier, errorMessage: error } = useField<string | null>(
  "supplier"
);

watch(
  () => apparatusData.value.supplier,
  () => {
    supplier.value = apparatusData.value.supplier;
  }
);
</script>

<template>
  <UiAutoComplete
    v-if="status == 'success'"
    v-model="apparatusData.supplier"
    label="Marca"
    :items="data ?? []"
    item-title="name"
    item-value="name"
    hide-details="auto"
    :error-messages="error"
  />
</template>
