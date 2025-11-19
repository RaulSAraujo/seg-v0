<script setup lang="ts">
useHead({
  titleTemplate: `Produto compra - %s`,
});

definePageMeta({
  path: "/produto-compra",
});

const activateDialogToEdit = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PRODUTO COMPRA</span>

    <ProductFilter />

    <ProductTable @dblclick="activateDialogToEdit = true" />

    <ProductCostTableMyTableToEdit
      v-if="activateDialogToEdit"
      v-model="activateDialogToEdit"
      @disable="activateDialogToEdit = false"
    />
  </div>
</template>
