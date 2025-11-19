<script lang="ts" setup>
useHead({
  titleTemplate: `Novo pedido balcão - %s`,
});

definePageMeta({
  path: "/pedido-balcao/criar",
});

const dayjs = useDayjs();
const { data: user } = useAuth();

const counterOrderStore = useCounterOrderStore();
const { form } = storeToRefs(counterOrderStore);

const counterOrderClientStore = useCounterOrderClientStore();
const counterOrderAddressStore = useCounterOrderAddressStore();
const counterOrderPaymentsStore = useCounterOrderPaymentsStore();
const counterOrderProductsStore = useCounterOrderProductsStore();

onMounted(() => {
  form.value.seller = user.value!.name;
  form.value.created_at = dayjs().format("DD/MM/YYYY");
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

    <CounterOrderForm title="Novo pedido balcão" />
  </div>
</template>
