<script setup lang="ts">
useHead({
  titleTemplate: `Etiqueta de produto - %s`,
});

definePageMeta({
  path: "/etiqueta-produto",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">ETIQUETA DE PRODUTO</span>

    <UiFilter :hide-excel="true">
      <template #button-create>
        <v-btn
          class="mr-2"
          text="CRIAR"
          rounded="lg"
          color="primary"
          :to="{
            name: 'product-label-creation',
          }"
        />
      </template>
    </UiFilter>

    <UiTable :show-select="true" :multi-sort="true">
      <template #item.action="{ item }">
        <ProductLabelTemplateBindOrder
          v-if="!item.ecom_order_id"
          :id="item.id"
        />

        <ProductLabelTemplateTagRemove
          v-else
          :id="item.id"
          :ecom-order-id="item.ecom_order_id"
        />

        <UiDelete :id="item.id" />
      </template>

      <template #item.print="{ item }">
        <ProductLabelTemplatePrint :id="item.id" />
      </template>

      <template #item.description="{ item }">
        <UiTooltip :text="item.Product.description" :vw="8" />
      </template>
    </UiTable>
  </div>
</template>
