<script setup lang="ts">
import { deleteProduct } from "~/services/product-id.service";

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const loading = useLoadingIndicator();

const { back } = useRouter();

const destroy = async () => {
  try {
    loading.start();

    snackbar.value = false;

    await deleteProduct(product.value?.id);

    $toast().success("Produto deletado.");

    back();
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
    icon="mdi-delete"
    color="primary"
    location="bottom end"
    class="button mb-4"
    @click="snackbar = true"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    variant="flat"
    timeout="6000"
    :timer="`${currentTime}`"
    color="primary"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deseja deletar esse produto ?</div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="destroy()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
