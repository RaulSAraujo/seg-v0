<script setup lang="ts">
import Form from "../form/index.vue";

import type { Row } from "~/interfaces/ShipmentOrders";

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
  <v-dialog transition="dialog-top-transition" width="350px">
    <Form
      :title="
        method == 'POST' ? 'NOVO MÉTODO DE ENVIO' : 'ATUALIZAR MÉTODO DE ENVIO'
      "
      :method="method"
      :form="props.item"
      @close="$emit('close')"
    />
  </v-dialog>
</template>
