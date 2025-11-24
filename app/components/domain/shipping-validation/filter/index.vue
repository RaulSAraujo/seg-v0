<script lang="ts" setup>
import ImportInvoice from "./menu/ImportInvoice.vue";
import UploadFreight from "./menu/upload-freight/index.vue";

defineOptions({
  name: "ShippingValidationFilter",
});
</script>

<template>
  <UiFilter>
    <template #menu>
      <ImportInvoice />

      <UploadFreight />
    </template>
  </UiFilter>
</template>
