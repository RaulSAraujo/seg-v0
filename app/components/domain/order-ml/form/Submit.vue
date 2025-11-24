<script lang="ts" setup>
import { creationOrderMl } from "~/services/order-ml.service";

import type { Form } from "~/interfaces/OrdersMl";

defineOptions({
  name: "OrderMlSubmit",
});

const props = defineProps<{
  form: Form;
}>();

const emit = defineEmits(["close"]);

const { transformDateDatabase } = useDateConversion();

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = ref(false);

const create = async () => {
  try {
    loading.value = true;

    const form = transformDateDatabase({ ...props.form });

    const res = await creationOrderMl(form);

    $toast().success("Novo pedido mercado livre criado com sucesso.");

    items.value.splice(0, 0, {
      ...res,
      received_date: null,
    });

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
    @click="create"
  />
</template>
