<script lang="ts" setup>
import { creationCashControlApi } from "~/services/cash-control.service";

import type { Form } from "~/interfaces/CashControl";

defineOptions({
  name: "CashControlCreationSubmit",
});

const props = defineProps<{
  form: Form;
}>();

const loading = useLoadingIndicator();

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const create = async () => {
  try {
    loading.start();

    const res = await creationCashControlApi(props.form);

    $toast().success("Novo registro criado com sucesso.");

    items.value.splice(0, 0, {
      ...res,
    });
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
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
