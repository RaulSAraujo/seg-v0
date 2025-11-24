<script lang="ts" setup>
import { creationLimitDate } from "~/services/limit-date.service";

import type { Form } from "~/interfaces/LimitDate";

defineOptions({
  name: "LimitDateCreationSubmit",
});

const props = defineProps<{
  form: Form;
}>();

const emit = defineEmits(["submit"]);

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = ref(false);

const create = async () => {
  try {
    loading.value = true;

    const res = await creationLimitDate(props.form);

    $toast().success("Nova data limite cadastrada.");

    items.value.splice(0, 0, res);

    if (items.value.length == 10) {
      items.value.pop();
    }

    totalItems.value += 1;

    emit("submit");
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
