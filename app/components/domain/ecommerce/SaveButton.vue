<script lang="ts" setup>
import type { Row, Form } from "~/interfaces/Ecommerce";

const props = defineProps<{
  methodRest: "POST" | "PUT";
  form: Form;
  idEcommerce?: number;
}>();

const emit = defineEmits(["close", "update"]);

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const { $customFetch } = useNuxtApp();

const save = async () => {
  loading.start();

  try {
    const newForm = { ...props.form };

    newForm.name = newForm.name!.toLowerCase();
    newForm.url = newForm.url!.toLowerCase();
    newForm.code = newForm.code!.toLowerCase();
    newForm.consumer_key = newForm.consumer_key!.toLowerCase();
    newForm.consumer_secret = newForm.consumer_secret!.toLowerCase();

    const res = await $customFetch<{ result: Row[] }>("ecommerce", {
      method: props.methodRest,
      body: newForm,
    });

    if (props.methodRest == "POST") {
      items.value.splice(0, 0, {
        ...res,
      });
    } else {
      emit("update", res.result[0]);
    }

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};
</script>

<template>
  <v-btn
    color="primary"
    text="SALVAR"
    width="8vw"
    variant="flat"
    @click="save"
  />
</template>
