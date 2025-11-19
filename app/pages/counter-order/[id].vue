<script lang="ts" setup>
import { useCounterOrderById } from "~/composables/counter_order/useCounterOrderById";

const { params } = useRoute();

useHead({
  titleTemplate: `Pedido balcão #${params.id} - %s`,
});

definePageMeta({
  path: "/pedido-balcao/:id",
});

const loading = useLoadingIndicator();

const counterOrderStore = useCounterOrderStore();
const counterOrderClientStore = useCounterOrderClientStore();
const counterOrderAddressStore = useCounterOrderAddressStore();
const counterOrderPaymentsStore = useCounterOrderPaymentsStore();
const counterOrderProductsStore = useCounterOrderProductsStore();

const { data, status } = useCounterOrderById({ lazy: true });

watch(
  () => status.value,
  () => {
    if (status.value == "success" && data.value) {
      loading.finish();

      counterOrderStore.set(data.value);
      counterOrderClientStore.set(data.value.Client);
      counterOrderAddressStore.set(data.value.Client.ClientsAddresses);
      counterOrderPaymentsStore.set(data.value.CounterOrderPayments);
      counterOrderProductsStore.set(data.value.CounterOrderProducts);
    }
  }
);

onMounted(() => {
  loading.start();

  if (status.value == "success" && data.value) {
    loading.finish();

    counterOrderStore.set(data.value);
    counterOrderClientStore.set(data.value.Client);
    counterOrderAddressStore.set(data.value.Client.ClientsAddresses);
    counterOrderPaymentsStore.set(data.value.CounterOrderPayments);
    counterOrderProductsStore.set(data.value.CounterOrderProducts);
  }
});

onBeforeUnmount(() => {
  counterOrderStore.resetProps();
  counterOrderClientStore.resetProps();
  counterOrderAddressStore.resetProps();
  counterOrderPaymentsStore.resetProps();
  counterOrderProductsStore.resetProps();
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para pedido balcão"
        :to="{
          name: 'counter-order',
        }"
      />
    </div>

    <CounterOrderForm :title="`PEDIDO BALCÃO #${params.id}`" />
  </div>
</template>
