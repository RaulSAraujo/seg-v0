<script setup lang="ts">
import type { FetchError } from "ofetch";
import type { Form } from "~/interfaces/ValidateProductsImage";

import RadioButton from "./RadioButton.vue";
import { creation } from "~/services/validate-image.service";

defineOptions({
  name: "ValidateImageNew",
});

const emit = defineEmits(["close"]);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const validate = reactive<Form>({
  name: "",
  status: "",
});

const create = async () => {
  try {
    const res = await creation(validate);

    $toast().success("Novo registro criado com sucesso.");

    emit("close");

    items.value.splice(0, 0, res);
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusMessage}`);
  }
};

const resetProps = () => {
  validate.name = "";
  validate.status = "";
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="420px"
    @after-leave="resetProps"
  >
    <v-card rounded="xl" title="NOVA SOLICITAÇÃO">
      <template #text>
        <v-text-field
          v-model="validate.name"
          clearable
          hide-details
          class="mb-2"
          color="primary"
          density="compact"
          variant="outlined"
          label="CODIGO DE FABRICANTE"
        />

        <div class="d-flex flex-row align-center">
          <span class="mr-3">SELECIONE A PRIORIDADE:</span>

          <RadioButton v-model="validate.status" />
        </div>
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          color="primary"
          variant="flat"
          width="10vw"
          text="SALVAR"
          @click="create"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
