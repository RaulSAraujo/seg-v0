<script lang="ts" setup>
import type { PurchaseReturn } from "~/interfaces/PurchaseReturn";

const { params } = useRoute();

useHead({
  titleTemplate: `Devolução de compra #${params.id} - %s`,
});

definePageMeta({
  path: "/devolucao-compra/:id",
});

const { data, status } = $api<PurchaseReturn>(`purchase-return`, {
  key: `purchase-return-${params.id}`,
  query: {
    id: params.id,
  },
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
        DEVOLUÇÃO DE COMPRA #{{ params.id }}
      </span>

      <PurchaseReturnCard
        v-if="status === 'success' && data?.rows && data.rows[0]"
        :id-purchase-return="params.id as string"
        :rows="data?.rows[0]"
      />
    </div>

    <PurchaseReturnFloatingSaveButton
      :id-purchase-return="params.id as string"
    />
  </div>
</template>
