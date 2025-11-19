<script lang="ts" setup>
defineProps<{
  pending: number;
}>();

defineEmits(["active"]);
</script>

<template>
  <v-btn
    :text="`PENDENTE: ${pending}`"
    variant="text"
    color="indigo"
    @click="$emit('active', 'ZE')"
  />
</template>
