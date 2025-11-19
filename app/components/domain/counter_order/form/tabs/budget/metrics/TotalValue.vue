<script lang="ts" setup>
const counterOrderStore = useCounterOrderStore();
const { form } = storeToRefs(counterOrderStore);

const counterOrderProductsStore = useCounterOrderProductsStore();
const { totalValueProducts } = storeToRefs(counterOrderProductsStore);

const totalValue = computed(
  () => totalValueProducts.value - form.value.discount
);
</script>

<template>
  <span class="mr-1">VALOR TOTAL:</span>

  <UiToLocaleString :value="totalValue" />
</template>
