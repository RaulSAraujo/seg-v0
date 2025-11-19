<script setup lang="ts">
import Form from "../form/index.vue";
import type { Form as FormData } from "~/interfaces/Printers";

defineOptions({
  name: "PrintersDialog",
});

defineProps<{
  form: FormData;
  listPrinters: string[];
}>();

defineEmits(["close"]);
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="280px"
    @after-leave="$emit('close')"
  >
    <Form :form="form" :list-printers="listPrinters" @close="$emit('close')" />
  </v-dialog>
</template>
