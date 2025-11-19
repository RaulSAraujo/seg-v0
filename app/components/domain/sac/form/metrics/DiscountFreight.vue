<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { discountShipment } = storeToRefs(sacMetricsStore);

const sacquoteFreightStore = useSacQuoteFreightStore();
const { quoteFreight } = storeToRefs(sacquoteFreightStore);

const limitValue = () => {
  if (discountShipment.value == null) {
    discountShipment.value = 0;
  }

  if (
    discountShipment.value > parseFloat(`${quoteFreight.value?.price ?? "0.0"}`)
  ) {
    discountShipment.value = parseFloat(
      `${quoteFreight.value?.price ?? "0.0"}`
    );
  }
};
</script>

<template>
  <div class="d-flex align-center">
    <span class="text-body-1 font-weight-medium text-primary mr-2">
      DESCONTO:
    </span>

    <div class="mr-2" style="width: 120px">
      <UiCurrencyField
        v-model="discountShipment"
        alt="input-discount-freight"
        @update:model-value="limitValue"
      />
    </div>
  </div>
</template>
