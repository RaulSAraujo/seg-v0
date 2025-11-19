<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  items: Row[];
}>();

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const loading = useLoadingIndicator();

const { $customFetch } = useNuxtApp();

const print = async () => {
  snackbar.value = false;

  loading.start();

  const newArray = props.items.map(({ name, receiving_quantity: amount }) => ({
    name,
    amount,
  }));

  try {
    await $customFetch("stock-tag-control", {
      method: "POST",
      body: newArray,
    });

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);

    loading.finish();
  }
};
</script>

<template>
  <v-btn
    prepend-icon="mdi-printer"
    text="IMPRIMIR ETIQUETAS"
    stacked
    class="text-purple"
    @click="snackbar = true"
  />

  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="primary"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Imprimir etiquetas</div>

    <p class="text-caption text-grey-lighten-2">
      Esta ação ira imprimir todas as etiquetas do recebimento, deseja
      prosseguir ?
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="print()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
