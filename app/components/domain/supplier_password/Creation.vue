<script setup lang="ts">
import { creationSupplierPasswords } from "~/services/supplier-password.service";

import type { FetchError } from "ofetch";
import type { Form } from "~/interfaces/SupplierPasswords";

defineOptions({
  name: "SupplierPasswordCreation",
});

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const dialog = ref(false);
const loading = ref(false);

const create = async (form: Form) => {
  try {
    loading.value = true;

    const res = await creationSupplierPasswords(form);

    $toast().success("Nova senha cadastrada.");

    items.value.splice(0, 0, res);

    items.value.pop();

    totalItems.value += 1;

    dialog.value = false;
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.message}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="260px">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <SupplierPasswordForm
      title="NOVA SENHA"
      :loading="loading"
      @save="create($event)"
    />
  </v-dialog>
</template>
