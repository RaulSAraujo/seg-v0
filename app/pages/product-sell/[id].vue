<script setup lang="ts">
import { getProductSellById } from "~/services/product-sell-id.service";

const { params } = useRoute();

useHead({
  titleTemplate: `Produto venda #${params.id} - %s`,
});

definePageMeta({
  path: "/produto-venda/:id",
});

const productSellStore = useProductSellStore();

try {
  const res = await getProductSellById(params.id as string);

  productSellStore.setProduct(res);
} catch (error) {
  const err = error as { statusText: string; name: string };

  $toast().error(`${err.statusText ?? err.name}`);
}

onBeforeRouteLeave((to, from, next) => {
  if (
    to.name == "product-sell" ||
    to.name == "product-sell-id"
  ) {
    next();
  } else {
    const tableStore = useTableStore();
    tableStore.clearTableProps();

    const gridStore = useGridStore();
    gridStore.clearGridProps();

    next();
  }
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para produto venda"
        :to="{
          name: 'product-sell',
        }"
      />

      <v-spacer />

      <ProductSellIdBtnGroup />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <NuxtPage :keepalive="true" />
    </v-sheet>

    <ProductSellIdBtnSubmit />
  </div>
</template>
