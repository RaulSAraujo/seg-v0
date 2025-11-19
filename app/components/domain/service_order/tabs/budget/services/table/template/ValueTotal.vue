<script lang="ts" setup>
const props = defineProps<{
  value: string | number;
  quantity: number | string;
}>();

const total = computed(
  () => parseFloat(`${props.value}`) * parseFloat(`${props.quantity}`)
);
</script>

<template>
  <UiToLocaleString :value="total" />
</template>
