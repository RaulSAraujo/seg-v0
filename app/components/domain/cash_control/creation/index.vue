<script setup lang="ts">
import Submit from "./Submit.vue";
import Form from "./form/index.vue";

import type { Form as IForm } from "~/interfaces/CashControl";

defineOptions({
  name: "CashControlCreation",
});

const dialog = useState<boolean>("active-creation-cash-control", () => false);

const form = reactive<IForm>({
  value: "",
  type: null,
  description: "",
  payment_form: null,
});

const close = () => {
  form.type = null;
  form.description = "";
  form.payment_form = null;
  form.value = "";
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="260px"
    @after-leave="close"
  >
    <v-card rounded="xl" title="NOVO REGISTRO">
      <template #text>
        <Form :form="form" />
      </template>

      <template #actions>
        <v-spacer />

        <Submit :form="form" />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
