<script lang="ts" setup>
import { creation } from "~/services/printers.service";

import type { Form } from "~/interfaces/Printers";

defineOptions({
  name: "PrintersSubmit",
});

const props = defineProps<{
  form: Form;
}>();

const emit = defineEmits(["close"]);

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = ref(false);

const create = async () => {
  loading.value = true;

  try {
    const res = await creation(props.form);

    $toast().success("Novo configuração de impressora cadastrada.");

    items.value.splice(0, 0, res);

    items.value.pop();

    totalItems.value += 1;

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
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
    :loading="loading"
    @click="create"
  />
</template>
