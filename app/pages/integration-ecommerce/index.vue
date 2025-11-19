<script setup lang="ts">
import type { Row } from "~/interfaces/Ecommerce";

useHead({
  titleTemplate: `E-commerces - %s`,
});

definePageMeta({
  path: "/ecommerces",
});

const updateEcom = (item: Row, event: Row) => {
  Object.entries(event).forEach(([key, value]) => {
    if (key in item) {
      (item as unknown as Record<string, unknown>)[key] = value;
    }
  });
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary"> E-COMMERCES </span>

    <UiFilter>
      <template #button-create>
        <EcommerceCreation />
      </template>
    </UiFilter>

    <UiTable>
      <template #item.action="{ item }">
        <EcommerceEdit :item="item" @update="updateEcom(item, $event)" />
      </template>
    </UiTable>
  </div>
</template>
