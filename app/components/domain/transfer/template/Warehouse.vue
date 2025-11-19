<script lang="ts" setup>
const props = defineProps<{
  warehouseId: number;
  warehouses: { id: number; description: string }[];
}>();

const comp = computed(() => props.warehouses.find((e) => e.id == props.warehouseId));
</script>

<template>
  <span> {{ comp?.description }}</span>
</template>
