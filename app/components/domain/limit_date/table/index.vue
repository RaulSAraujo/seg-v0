<script lang="ts" setup>
defineOptions({
    name: "LimitDateTable",
})
</script>

<template>
  <UiTable multi-sort>
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>
  </UiTable>
</template>
