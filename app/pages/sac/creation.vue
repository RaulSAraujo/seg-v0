<script lang="ts" setup>
useHead({
  titleTemplate: `Nova venda sac - %s`,
});

definePageMeta({
  path: "/vendas-sac/criar",
});

const sacStore = useSacStore();
const sacMetricsStore = useSacMetricsStore();
const sacAddressStore = useSacAddressStore();
const sacCustomerStore = useSacCustomerStore();
const sacProductsStore = useSacProductsStore();
const sacQuoteFreightStore = useSacQuoteFreightStore();

onBeforeMount(() => {
  sacStore.resetProps();
  sacMetricsStore.resetProps();
  sacAddressStore.resetProps();
  sacCustomerStore.resetProps();
  sacProductsStore.resetProps();
  sacQuoteFreightStore.resetProps();
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para sac"
        :to="{
          name: 'sac',
        }"
      />
    </div>

    <SacForm title="NOVA VENDAS SAC" method-rest="POST" />
  </div>
</template>
