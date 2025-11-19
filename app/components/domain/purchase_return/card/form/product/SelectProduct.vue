<script lang="ts" setup>
import type { PurchaseControlProduct } from "~/interfaces/PurchaseReturn";

const purchaseReturnStore = usePurchaseReturnStore();
const { formProduct, form, products } = storeToRefs(purchaseReturnStore);

const product = ref<PurchaseControlProduct>();

watch(
  () => product.value,
  () => {
    form.value.purchase_control_product_id = product.value?.id ?? null;

    formProduct.value.name = product.value?.name;
    formProduct.value.description = product.value?.description;
  }
);
</script>

<template>
  <UiCombobox
    v-model="product"
    label="Codigo de fabricante"
    :items="products"
    item-title="name"
    item-value="name"
    return-object
  />
</template>
