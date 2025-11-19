<script lang="ts" setup>
const props = defineProps<{
  requestReason: number;
  reasons: { id: number; description: string }[]
}>();

const comp = computed(() => props.reasons.find((e) => e.id == props.requestReason));
</script>

<template>
  <span> {{ comp?.description }}</span>
</template>
