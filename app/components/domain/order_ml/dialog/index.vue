<script setup lang="ts">
import Form from "../form/index.vue";

import type { Form as FormMl } from "~/interfaces/OrdersMl";

defineOptions({
  name: "OrderMlDialog",
});

defineEmits(["close"]);

const getInitialForm = (): FormMl => ({
  tracking_code: "",
  description: "",
  finality: "",
  quantity_purchase: 1,
  review_data: null,
  limit_date: null,
  seller: "",
  total_cost: "",
  form_payment: null,
  observation: "",
  account: null,
});

const form = ref<FormMl>(getInitialForm());

const resetForm = () => {
  Object.assign(form.value, getInitialForm());
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600"
    @after-leave="resetForm"
  >
    <Form :form="form" @close="$emit('close')" />
  </v-dialog>
</template>
