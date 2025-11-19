<script lang="ts" setup>
const sacquoteFreightStore = useSacQuoteFreightStore();
const { quoteFreight } = storeToRefs(sacquoteFreightStore);
</script>

<template>
  <div class="d-flex align-center">
    <span class="text-body-1 font-weight-medium text-primary">FRETE:</span>

    <div class="mx-1" style="width: 120px">
      <UiCurrencyField
        v-model="quoteFreight.price"
        alt="input-quote-freight-price"
      />
    </div>
  </div>
</template>
