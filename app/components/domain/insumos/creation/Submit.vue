<script lang="ts" setup>
import { creationInputMaterials } from "~/services/insumos.service";

import type { Form } from "~/interfaces/InputMaterials";

defineOptions({
  name: "InsumosCreationSubmit",
});

const props = defineProps<{
  form: Form;
}>();

const emit = defineEmits(["close"]);

const loading = ref(false);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const create = async () => {
  try {
    loading.value = true;

    const res = await creationInputMaterials(props.form);

    $toast().success("Novo pedido de insumo criado com sucesso.");

    items.value.splice(0, 0, {
      ...res,
      total_cost: null,
      unit_cost: null,
      supplier: null,
      purchased_by: "",
      purchase_date: null,
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
    :loading="loading"
    @click="create"
  />
</template>
