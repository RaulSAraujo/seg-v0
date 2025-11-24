<script setup lang="ts">
import Form from "./Form.vue";

import type { Form as FormType } from "~/interfaces/LimitDate";

defineOptions({
  name: "LimitDateCreation",
});

defineEmits(["close"]);

const getInitialForm = () => {
  return {
    warning_days: 0,
    brand: undefined,
  };
};

const form = ref<FormType>(getInitialForm());

const close = () => {
  form.value = getInitialForm();
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="260px"
    @after-leave="close"
  >
    <Form :form="form" @submit="$emit('close')" />
  </v-dialog>
</template>
