<script lang="ts" setup>
import Status from "./Status.vue";
import { updatePurchaseControlProduct } from "~/services/purchase-order.service";

import type {
  Row,
  UpdateSelectedForm,
} from "~/interfaces/PurchaseControlProduct";

defineOptions({
  name: "PurchaseOrderUpdateSelected",
});

const loading = useLoadingIndicator();

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const form = reactive<UpdateSelectedForm>({
  invoice: undefined,
  status: undefined,
  observation_product: undefined,
});

const dialog = ref(false);

const save = async () => {
  try {
    loading.start();

    const rows = selected.value as unknown as Row[];

    Object.entries(form).forEach(([key, value]) => {
      if (typeof value != "string" || value == "") {
        (form as unknown as Record<string, unknown>)[key] = undefined;
      }
    });

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];

      if (!row) continue;

      let receivingAt: Date | null | undefined = undefined;
      if (form.status != undefined) {
        if (form.status == "EM ABERTO") {
          receivingAt = null;
        }

        if (form.status == "EM RECEBIMENTO") {
          receivingAt = new Date();
        }
      }

      const res = await updatePurchaseControlProduct({
        id: row.id,
        ...form,
        receiving_at: receivingAt,
      });

      if (!res.result[0]) continue;

      Object.entries(res.result[0]).forEach(([key, value]) => {
        if (key in row) {
          (row as unknown as Record<string, unknown>)[key] = value;
        }
      });
    }

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

const clear = () => {
  form.invoice = undefined;
  form.status = undefined;
  form.observation_product = undefined;
};
</script>

<template>
  <v-btn
    text="Atualizar selecionados"
    prepend-icon="mdi-note-edit-outline"
    stacked
    class="text-purple"
    variant="plain"
    @click="dialog = true"
  />

  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="260px"
    @after-leave="clear"
  >
    <v-card rounded="xl" title="ATUALIZAR SELECIONADOS">
      <template #text>
        <v-row dense>
          <v-col cols="12">
            <UiTextField v-model="form.invoice" label="Nota fiscal" />
          </v-col>

          <v-col cols="12">
            <Status v-model="form.status" />
          </v-col>

          <v-col cols="12">
            <UiTextField
              v-model="form.observation_product"
              label="Observação"
            />
          </v-col>
        </v-row>
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          class="mb-2"
          color="primary"
          width="8vw"
          variant="flat"
          text="SALVAR"
          @click="save"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
