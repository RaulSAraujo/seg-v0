<script setup lang="ts">
import Form from "../form/index.vue";

import type { Row } from "~/interfaces/Package";

defineOptions({
  name: "PackageDialog",
});

const props = defineProps<{
  item: Row;
  method: "POST" | "PUT";
}>();

defineEmits(["close"]);
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="300px">
    <Form
      :title="method == 'POST' ? 'NOVA EMBALAGEM' : 'ALTERAR EMBALAGEM'"
      :method="method"
      :form="props.item"
      @close="$emit('close')"
    />
  </v-dialog>
</template>
