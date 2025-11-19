<script lang="ts" setup>
import type { ErpType } from "~/interfaces/ErpType";

defineEmits(["like"]);

const { data, status } = $api<ErpType[]>("service-order/erp-type", {
  key: "erp-type",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <UiSelect
    v-if="status == 'success' && data"
    label="Tipo de atendimento"
    :items="data"
    item-title="DESCRTIPOOS"
    item-value="TIPOOS"
    :multiple="true"
    :clearable="true"
    @like="$emit('like', $event)"
  />
</template>
