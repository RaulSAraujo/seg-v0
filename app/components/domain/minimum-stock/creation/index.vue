<script setup lang="ts">
import Form from "./Form.vue";

defineOptions({
  name: "MinimumStockCreation",
});

defineEmits(["close"]);
</script>

<template>
  <v-dialog width="35vw" @after-leave="$emit('close')">
    <Form @close="$emit('close')" />
  </v-dialog>
</template>
