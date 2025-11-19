<script lang="ts" setup>
const sacStore = useSacStore();
const { paymentType } = storeToRefs(sacStore);

const sacMetricsStore = useSacMetricsStore();
const {
  discountProduct,
  discountProductPercent,
  discountProductPercentComputed,
} = storeToRefs(sacMetricsStore);

watch(
  () => discountProductPercentComputed.value,
  (value) => {
    discountProductPercent.value = value;
  }
);
</script>

<template>
  <div class="d-flex align-center my-2">
    <span class="text-body-1 font-weight-medium text-primary mr-2">
      DESCONTO PRODUTO:
    </span>

    <UiToLocaleString :value="discountProduct" class="mr-5" />

    <div style="width: 130px">
      <UiNumberInput
        v-model="discountProductPercent"
        alt="input-discount-products"
        control-variant="stacked"
        suffix="%"
        :step="0.01"
        :min="paymentType == 'À VISTA' ? 5 : 0"
        :max="100"
        :precision="2"
        hide-details="auto"
      />
    </div>
  </div>
</template>
