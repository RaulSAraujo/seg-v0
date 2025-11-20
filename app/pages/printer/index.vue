<script setup lang="ts">
import { usePrintersSettings } from "~/composables/printers/usePrintersSettings";
import type { Form } from "~/interfaces/Printers";

useHead({
  titleTemplate: `Impressoras - %s`,
});

definePageMeta({
  path: "/impressoras",
});

const item = ref({} as Form);
const dialog = ref<boolean>(false);

const { data, status } = usePrintersSettings({ lazy: true });

const close = () => {
  dialog.value = false;
  item.value = {} as Form;
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">IMPRESSORAS</span>

    <PrintersFilter @active="dialog = true" />

    <PrintersTable
      v-if="status === 'success' && data"
      :list-printers="data ?? []"
    />

    <PrintersDialog
      v-if="status === 'success' && data"
      v-model="dialog"
      :form="item"
      :list-printers="data ?? []"
      @close="close"
    />
  </div>
</template>
