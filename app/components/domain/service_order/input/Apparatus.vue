<script lang="ts" setup>
import { useServiceOrderApi } from "../../api/useServiceOrderApi";

defineOptions({
  name: "ServiceOrderInputApparatus",
});

const { data, status } = useServiceOrderApi().fetchAllApparatus({ lazy: true });

const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: apparatus, errorMessage: error } = useField<string | null>(
  "apparatus"
);

watch(
  () => apparatusData.value.apparatus,
  () => {
    apparatus.value = apparatusData.value.apparatus;
  }
);
</script>

<template>
  <UiAutoComplete
    v-if="status == 'success'"
    v-model="apparatusData.apparatus"
    label="Aparelho"
    :items="data ?? []"
    item-title="apparatus_name"
    item-value="apparatus_name"
    hide-details="auto"
    :error-messages="error"
  />
</template>
