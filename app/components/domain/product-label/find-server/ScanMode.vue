<script setup lang="ts">
import type { Product, Row } from "~/interfaces/Product";

const { $customFetch } = useNuxtApp();

const scan = ref<string>("");

const loading = ref<boolean>(false);
const enterPress = useState("enter-press", () => false);

const product = useState<Row | null>("input-creation-product", () => null);

watch(
  () => product.value,
  () => {
    if (product.value == null) {
      scan.value = "";
    }
  }
);

const find = async () => {
  if (typeof scan.value == "string" && scan.value.length >= 4) {
    try {
      loading.value = true;

      const res = await $customFetch<Product>(`product`, {
        query: {
          page: 1,
          perPage: 1,
          full: false,
          unique: true,
          name: `${scan.value}`,
        },
      });

      if (res.rows[0]) {
        product.value = res.rows[0];
      }

      enterPress.value = true;
    } catch (error) {
      const err = error as { statusText: string; message: string };

      $toast().error(`${err.statusText ?? err.message}`);
    } finally {
      loading.value = false;
    }
  }
};
</script>

<template>
  <UiTextField
    v-model="scan"
    alt="scan-mode-input"
    label="Digite o código de fabricante"
    :loading="loading"
    @keypress.enter="find"
  />
</template>
