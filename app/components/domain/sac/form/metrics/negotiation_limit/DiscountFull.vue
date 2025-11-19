<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const {
  discountPaymentPercent,
  discountShipmentPercent,
  discountShipment,
  discountPayment,
  discountProductFloat,
  discountProductPercentFloat,
} = storeToRefs(sacMetricsStore);

const discountTotal = computed(() => {
  return (
    discountProductFloat.value + discountShipment.value + discountPayment.value
  );
});
</script>

<template>
  <div class="d-flex">
    <span>Desc. total:</span>

    <UiToLocaleString class="mx-1" :value="discountTotal" />

    <span>
      {{
        (
          discountProductPercentFloat +
          discountPaymentPercent +
          discountShipmentPercent
        ).toFixed(2)
      }}%
    </span>
  </div>
</template>
