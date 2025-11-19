<script lang="ts" setup>
useHead({
  titleTemplate: `Nova devolução de compra - %s`,
});

definePageMeta({
  path: "/devolucao-compra/criar",
});

const purchaseReturnStore = usePurchaseReturnStore();

onBeforeMount(() => {
  purchaseReturnStore.clear();
});
</script>

<template>
  <div class="my-5">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="VOLTAR PARA DEVOLUÇÃO DE COMPRA"
        :to="{
          name: 'purchase-return',
        }"
      />
    </div>

    <div class="mx-2">
      <span class="ml-5 text-h5 text-primary font-weight-black">
        NOVA DEVOLUÇÃO DE COMPRA
      </span>

      <PurchaseReturnCard />
    </div>

    <PurchaseReturnFloatingSaveButton />
  </div>
</template>
