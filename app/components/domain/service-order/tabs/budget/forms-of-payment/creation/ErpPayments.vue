<script lang="ts" setup>
import type { ErpPayments } from "~/interfaces/ServiceOrder";

const { data, status } = await $api<ErpPayments[]>(
  "service-order/service-order-payments/erp-payments",
  {
    key: "erp-payments",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Formas de pagamento"
    :items="data ?? []"
    item-title="payment"
    item-value="erp_payment_id"
  />
</template>
