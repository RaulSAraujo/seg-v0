<script setup lang="ts">
import { creation } from "~/services/apparatus-classification.service";

import type { FetchError } from "ofetch";

defineOptions({
  name: "ApparatusClassificationCreation",
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const name = ref("");
const loading = ref(false);

const create = async () => {
  try {
    loading.value = true;

    const res = await creation(name.value);

    $toast().success("Nova classificação criada.");

    items.value.splice(0, 0, res);
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.message}`);
  } finally {
    loading.value = false;
  }
};

const resetProps = () => {
  name.value = "";
};
</script>

<template>
  <v-dialog width="280px" @after-leave="resetProps">
    <v-card rounded="xl" title="NOVA CLASSIFICAÇÃO">
      <template #text>
        <UiTextField v-model="name" label="NOME DA CLASSIFICAÇÃO" />
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          color="primary"
          text="SALVAR"
          width="8vw"
          variant="flat"
          :loading="loading"
          @click="create"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
