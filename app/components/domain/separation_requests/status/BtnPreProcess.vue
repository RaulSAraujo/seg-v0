<script lang="ts" setup>
defineProps<{
  preProcess: number;
}>();
</script>

<template>
  <v-btn :text="`PRÉ PEDIDO: ${preProcess}`" variant="text" color="purple" readonly />
</template>
