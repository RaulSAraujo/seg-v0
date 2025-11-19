<script setup lang="ts">
import type { Product, Row } from "~/interfaces/Product";

const scan = ref<string>("");

const loading = ref<boolean>(false);
const enterPress = useState("enter-press", () => false);

const product = useState<Row | null>("input-stock-transfer", () => null);

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
    loading.value = true;

    try {
      const res = await useNuxtApp().$customFetch<Product>(
        `product?page=1&perPage=1&name=${scan.value}&unique=true&full=false`
      );

      if (res.rows.length == 1) {
        product.value = res.rows[0] ?? null;
      }

      enterPress.value = true;

      loading.value = false;
    } catch (error) {
      loading.value = false;

      const err = error as { statusText: string; message: string };

      $toast().error(`${err.statusText ?? err.message}`);
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
