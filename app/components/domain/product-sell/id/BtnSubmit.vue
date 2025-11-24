<script setup lang="ts">
import { updateProductSellId } from '~/services/product-sell-id.service';

const loading = useLoadingIndicator();

const productSellStore = useProductSellStore();
const { product } = storeToRefs(productSellStore);

const save = async () => {
  loading.start();

  try {
    await updateProductSellId(product.value);

    $toast().success("Sucesso em atualizar.");
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-fab
    app
    appear
    icon="mdi-content-save"
    color="primary"
    location="bottom end"
    class="button mb-4"
    @click="save()"
  />
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
