<script setup lang="ts">
import Form from "./Form.vue";
import Submit from "./Submit.vue";

import type { Form as FormProps } from "~/interfaces/InputMaterials";

defineOptions({
  name: "InputMaterialsCreation",
});

defineProps<{
  form: FormProps;
}>();

defineEmits(["close"]);
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="260px"
    @after-leave="$emit('close')"
  >
    <v-card rounded="xl" title="NOVO INSUMO">
      <template #text>
        <Form :form="form" />
      </template>

      <template #actions>
        <v-spacer />

        <Submit :form="form" @close="$emit('close')" />

        <v-spacer />
      </template>
    </v-card>
  </v-dialog>
</template>
