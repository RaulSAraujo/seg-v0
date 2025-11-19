<script setup lang="ts">
import type { NewItems } from "~/interfaces/PurchaseRequest";

useHead({
  titleTemplate: `Nova solicitação de compra - %s`,
});

definePageMeta({
  path: "/solicitacao-de-compra/criar",
});

const items = ref<NewItems[]>([]);

const reset = () => {
  items.value = [];
};
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para solicitação de compra"
        :to="{
          name: 'purchase-request',
        }"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <v-toolbar
        title="NOVA SOLICITAÇÃO DE COMPRA"
        rounded="t-xl"
        class="mb-5"
      />

      <PurchaseRequestCreationForm @submit="items.push($event)" />

      <PurchaseRequestCreationTable :items="items" />

      <PurchaseRequestCreationSubmit :items="items" @reset="reset" />
    </v-sheet>
  </div>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
