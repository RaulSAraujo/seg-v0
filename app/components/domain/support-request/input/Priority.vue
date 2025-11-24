<script lang="ts" setup>
const priorityList = ref([
  {
    text: "BAIXA",
    value: 0,
  },
  {
    text: "MÉDIA",
    value: 1,
  },
  {
    text: "ALTA",
    value: 2,
  },
]);
</script>

<template>
  <UiSelect label="Prioridade" :items="priorityList" item-title="text" item-value="value" />
</template>
