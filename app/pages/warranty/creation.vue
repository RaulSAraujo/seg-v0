<script lang="ts" setup>
import { createDefaultWarranty } from "~/factories/warrantyFactory";

import type { RowWithRelationship } from "~/interfaces/Warranty";

useHead({
  titleTemplate: `Nova garantia - %s`,
});

definePageMeta({
  path: "/garantia/criar",
});

const orders = ref<RowWithRelationship>(createDefaultWarranty());
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para garantia"
        :to="{
          name: 'warranty',
        }"
      />
    </div>

    <WarrantyForm
      title="Criar garantia"
      :orders="orders"
      methods-rest="POST"
      @set-orders="orders = $event"
    />
  </div>
</template>
