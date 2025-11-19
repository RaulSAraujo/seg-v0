<script setup lang="ts">
import { creation } from "~/services/apparatus.service";

import type { FetchError } from "ofetch";
import type { Form } from "~/interfaces/Apparatus";
import type { Row as RowClassification } from "~/interfaces/ClassificationApparatus";

defineOptions({
  name: "ApparatusCreation",
});

defineProps<{
  classificationItems: RowClassification[];
}>();

const emit = defineEmits(["close"]);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = ref(false);

const form = reactive<Form>({
  apparatus_name: "",
  classification_apparatus_id: null,
});

async function create() {
  try {
    loading.value = true;

    const res = await creation(form);

    $toast().success("Novo aparelho criado.");

    items.value.splice(0, 0, res);

    emit("close");
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.message}`);
  } finally {
    loading.value = false;
  }
}

function resetProps() {
  form.apparatus_name = "";
  form.classification_apparatus_id = null;
}
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="260px"
    @after-leave="resetProps"
  >
    <v-card rounded="xl" title="NOVO APARELHO">
      <template #text>
        <UiTextField
          v-model="form.apparatus_name"
          label="NOME DO APARELHO"
          class="mb-3"
        />

        <UiSelect
          v-model="form.classification_apparatus_id"
          label="CLASSIFICAÇÃO"
          :items="classificationItems"
          item-title="name"
          item-value="id"
          :multiple="false"
          :clearable="true"
        />
      </template>

      <template #actions>
        <v-spacer />

        <v-btn
          class="mb-2"
          color="primary"
          width="8vw"
          variant="flat"
          text="SALVAR"
          :loading="loading"
          @click="create"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
