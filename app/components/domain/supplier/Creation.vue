<script setup lang="ts">
import { creation } from "~/services/supplier.service";

import type { Form } from "~/interfaces/Supplier";

defineOptions({
  name: "SupplierCreation",
});

const loading = useLoadingIndicator();

const supplier = reactive<Form>({
  name: "",
  active: true,
  lead_time: 0,
  virtual_quantity: 0,
});

const emit = defineEmits(["close"]);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const create = async () => {
  loading.start();

  try {
    const res = await creation(supplier);

    $toast().success("Novo fornecedor criado.");

    items.value.splice(0, 0, res);

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};

const resetProps = () => {
  supplier.name = "";
  supplier.lead_time = 0;
  supplier.virtual_quantity = 0;
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="260px"
    @after-leave="resetProps"
  >
    <v-card rounded="xl" title="NOVO FORNECEDOR">
      <template #text>
        <UiTextField
          v-model="supplier.name"
          label="NOME DO FORNECEDOR"
          class="mb-2"
        />

        <UiNumberInput
          v-model="supplier.lead_time"
          label="LEAD TIME"
          class="mb-2"
        />

        <UiNumberInput
          v-model="supplier.virtual_quantity"
          label="QUANTIDADE VIRTUAL"
        />
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          color="primary"
          text="SALVAR"
          variant="flat"
          width="8vw"
          @click="create"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
