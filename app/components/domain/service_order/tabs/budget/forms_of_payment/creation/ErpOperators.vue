<script lang="ts" setup>
import type { ErpOperators } from "~/interfaces/ErpOperators";

const { data, status } = await $api<ErpOperators[]>(
  "service-order/service-order-payments/erp-operators",
  {
    key: "erp-operators",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Operadora"
    :items="data ?? []"
    item-title="OPERADORA"
    item-value="CODIGO"
    return-object
  />
</template>
