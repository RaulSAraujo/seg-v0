<script lang="ts" setup>
defineOptions({
  name: "SavedRmaTable",
});
</script>

<template>
  <UiTable :show-select="true" :multi-sort="true">
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>
  </UiTable>
</template>
