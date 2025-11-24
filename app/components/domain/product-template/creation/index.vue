<script setup lang="ts">
import Submit from "./Submit.vue";
import Form from "./form/index.vue";

import type { Form as IForm } from "~/interfaces/TemplateConfig";

defineOptions({
  name: "ProductTemplateCreation",
});

defineEmits(["close"]);

const description = ref("");
const form = reactive<IForm>({
  apparatus_id: undefined,
  category_id: undefined,
});

const close = () => {
  description.value = "";
  form.apparatus_id = undefined;
  form.category_id = undefined;
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="50vw"
    @after-leave="close"
  >
    <v-card rounded="xl" title="NOVO TEMPLATE">
      <template #text>
        <Form
          :form="form"
          :description="description"
          @set-description="description = $event"
        />
      </template>

      <template #actions>
        <v-spacer />

        <Submit
          :form="form"
          :description="description"
          @close="$emit('close')"
        />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
