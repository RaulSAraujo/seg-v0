<script lang="ts" setup>
import { createTemplateConfig, createTemplateEcom } from "~/services/product-template.service";

import type { FetchError } from "ofetch";
import type { Form } from "~/interfaces/TemplateConfig";

defineOptions({
  name: "ProductTemplateCreation",
});

const props = defineProps<{
  form: Form;
  description: string;
}>();

const emit = defineEmits(["close"]);

const loading = ref(false);

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const create = async () => {
  try {
    loading.value = true;

    const { id } = await createTemplateEcom(props.description);

    const res = await createTemplateConfig(id, props.form);

    $toast().success("Novo configuração de impressora cadastrada.");

    items.value.pop();
    totalItems.value += 1;
    items.value.splice(0, 0, res);

    emit("close");
  } catch (error) {
    const err = error as FetchError;

    $toast().error(`${err.data.data.error ?? err.statusMessage}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    class="mb-2"
    color="primary"
    width="8vw"
    variant="flat"
    text="SALVAR"
    @click="create"
  />
</template>
