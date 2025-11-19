<script lang="ts" setup>
const props = defineProps<{
  value: string;
  quantity: number;
}>();

const total = computed(() => parseFloat(props.value) * props.quantity);
</script>

<template>
  <UiToLocaleString :value="total" />
</template>
