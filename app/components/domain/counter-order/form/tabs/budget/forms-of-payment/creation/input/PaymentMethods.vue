<script lang="ts" setup>
const counterOrderStore = useCounterOrderStore();
const { paymentMethodsList, loadingPaymentMethods } = storeToRefs(counterOrderStore);

onMounted(() => {
  counterOrderStore.fetchPaymentMethods();
});
</script>

<template>
  <UiSelect
    v-if="!loadingPaymentMethods"
    label="Formas de pagamento"
    :items="paymentMethodsList ?? []"
    item-title="name"
    item-value="id"
  />
</template>
