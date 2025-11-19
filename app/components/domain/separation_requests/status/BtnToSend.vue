<script lang="ts" setup>
defineProps<{
  toSend: number;
}>();

defineEmits(["active"]);
</script>

<template>
  <v-btn
    :text="`A ENVIAR: ${toSend}`"
    variant="text"
    color="blue"
    @click="$emit('active', 'ZN')"
  />
</template>
