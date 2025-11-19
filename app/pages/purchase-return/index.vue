<script setup lang="ts">
useHead({
  titleTemplate: `Devolução de compra - %s`,
});

definePageMeta({
  path: "/devolucao-compra",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">DEVOLUÇÃO DE COMPRA</span>

    <UiFilter>
      <template #button-create>
        <v-btn
          class="mr-2"
          text="CRIAR"
          rounded="lg"
          color="primary"
          :to="{
            name: 'purchase-return-creation',
          }"
        />
      </template>
    </UiFilter>

    <UiTable show-select :multi-sort="true">
      <template #item.action="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          color="primary"
          density="comfortable"
          :to="{
            name: 'purchase-return-id',
            params: {
              id: item.id,
            },
          }"
        />

        <UiDelete :id="item.id" />
      </template>

      <template #item.name="{ item }">
        <UiTooltip :text="item.PurchaseControlProduct.name" :vw="5" />
      </template>

      <template #item.description="{ item }">
        <UiTooltip :text="item.PurchaseControlProduct.description" :vw="5" />
      </template>

      <template #item.invoice="{ item }">
        <UiTooltip :text="item.PurchaseControlProduct.invoice" :vw="5" />
      </template>

      <template #item.returning_invoice_value="{ item }">
        <UiToLocaleString :value="item.returning_invoice_value" />
      </template>

      <template #item.created_by="{ item }">
        <UiTooltip :text="item.User.name" :vw="5" />
      </template>
    </UiTable>
  </div>
</template>
