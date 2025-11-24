<script lang="ts" setup>
const counterOrderStore = useCounterOrderProductsStore();
const { totalValueProducts } = storeToRefs(counterOrderStore);
</script>

<template>
  <span>VALOR PRODUTOS:</span>

  <UiToLocaleString :value="totalValueProducts" />
</template>
