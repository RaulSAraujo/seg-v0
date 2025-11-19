<script setup lang="ts">
import { putProduct } from "~/services/product-id.service";

const loading = useLoadingIndicator();

const productStore = useProductStore();
const { product, productMeasurementsChanged, productPstatuses } = storeToRefs(productStore);

const currentTime = ref(0);
const snackbar = ref(false);

const removeStatus = () => {
  const ps = productPstatuses.value.map((item) => item.id);

  const index = ps.findIndex((item: number) => item === 3);

  ps.splice(index, 1);

  save(ps);
};

const addStatus = () => {
  const ps = productPstatuses.value!.map((item) => item.id);

  ps.push(3);

  save(ps);
};

const save = async (pstatuses?: number[]) => {
  snackbar.value = false;

  loading.start();

  try {
    await putProduct(
      product.value,
      pstatuses,
      productMeasurementsChanged.value,
    );

    $toast().success("Sucesso em atualizar.");

    productMeasurementsChanged.value = false;
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  }

  loading.finish();
};
</script>

<template>
  <v-fab
    icon="mdi-content-save"
    color="primary"
    class="button"
    style="position: fixed; bottom: 83px; right: 14px"
    @click="productMeasurementsChanged ? (snackbar = true) : save()"
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
    <div class="text-subtitle-1">Dimensões reais do produto ?</div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="addStatus()"> Não </v-btn>

      <v-btn color="white" variant="plain" @click="removeStatus()"> Sim </v-btn>
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
