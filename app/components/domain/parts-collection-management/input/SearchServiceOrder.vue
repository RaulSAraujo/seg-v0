<script lang="ts" setup>
import type { ServiceOrder } from "~/interfaces/ServiceOrder";

const emit = defineEmits(["search"]);

const serviceOrderId = ref("");

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const search = async () => {
  loading.start();

  try {
    const res = await $customFetch<ServiceOrder>("service-order", {
      method: "GET",
      query: {
        id: serviceOrderId.value,
      },
    });

    emit("search", res.rows[0]);
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }

  loading.finish();
};
</script>

<template>
  <UiTextField
    v-model="serviceOrderId"
    label="Ordem de serviço"
    append-inner-icon="mdi-send"
    @keyup.enter="search"
    @click:append-inner="search"
  />
</template>
