<script setup lang="ts">
import { updateProduct } from "~/services/product.service";

const loading = useLoadingIndicator();

const productStore = useProductStore();
const { product, productPstatuses, productMeasurementsChanged } =
  storeToRefs(productStore);

const currentTime = ref(0);
const snackbar = ref(false);

const save = async (action?: "addStatus" | "removeStatus") => {
  snackbar.value = false;

  loading.start();

  // Define os statuses do produto para salvar
  let pstatuses: number[] = [];

  // Adiciona o status verificar medidas do produto
  if (action === "addStatus") {
    pstatuses = productPstatuses.value!.map((item) => item.id);
    pstatuses.push(3);
  }

  // Remove o status verificar medidas do produto
  if (action === "removeStatus") {
    pstatuses = productPstatuses.value.map((item) => item.id);
    const index = pstatuses.findIndex((item: number) => item === 3);
    pstatuses.splice(index, 1);
  }

  // Salva o produto
  const res = await updateProduct(
    product.value,
    pstatuses,
    productMeasurementsChanged.value
  );

  if (res) {
    $toast().success("Produto atualizado com sucesso.");
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
      <v-btn color="white" variant="plain" @click="save('addStatus')">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="save('removeStatus')">
        Sim
      </v-btn>
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
