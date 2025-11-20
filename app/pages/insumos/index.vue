<script setup lang="ts">
import { createDefaultInsumos } from "~/factories/insumosFactory";
import type { Form } from "~/interfaces/InputMaterials";

useHead({
  titleTemplate: `Insumos - %s`,
});

definePageMeta({
  path: "/insumos",
});

const dialog = ref<boolean>(false);
const form = ref<Form>(createDefaultInsumos());

const resetProps = () => {
  form.value = createDefaultInsumos();

  dialog.value = false;
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">INSUMOS</span>

    <InsumosFilter @active="dialog = true" />

    <InsumosTable />

    <InsumosCreation v-model="dialog" :form="form" @close="resetProps" />
  </div>
</template>
