<script lang="ts" setup>
import { useSacSale } from "~/composables/sac/useSacSale";

const { params } = useRoute();

useHead({
  titleTemplate: `Venda sac #${params.id} - %s`,
});

definePageMeta({
  path: "/vendas-sac/:id",
});

const { data, status } = useSacSale({ lazy: true });

const sacStore = useSacStore();
const sacMetricsStore = useSacMetricsStore();
const sacAddressStore = useSacAddressStore();
const sacCustomerStore = useSacCustomerStore();
const sacProductsStore = useSacProductsStore();
const sacQuoteFreightStore = useSacQuoteFreightStore();

onMounted(() => {
  if (status.value === "success" && data.value) {
    const sac = data.value;

    sacStore.set(sac);
    sacMetricsStore.set(sac);
    sacCustomerStore.set(sac.Customer);
    sacProductsStore.set(sac.SacSaleProducts);
    sacQuoteFreightStore.set(sac.SacSaleShipment);
    sacAddressStore.set(sac.Customer.CustomerAddresses);
  }
});

onBeforeUnmount(() => {
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

    <SacForm :title="`VENDAS SAC #${params.id}`" method-rest="PUT" />
  </div>
</template>
