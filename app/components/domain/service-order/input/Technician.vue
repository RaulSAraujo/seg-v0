<script lang="ts" setup>
import { useErpEmployees } from "../../composables/useErpEmployees";

defineOptions({
  name: "ServiceOrderTechnician",
});

const { data, status } = useErpEmployees({ lazy: true });

const othersStore = useServiceOrderOthersStore();
const { othersData } = storeToRefs(othersStore);
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    v-model="othersData.technician_erp_id"
    label="Tecnico"
    :items="data ?? []"
    item-title="NOME"
    item-value="FUNCIONARIO"
  />
</template>
