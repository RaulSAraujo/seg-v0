<script lang="ts" setup>
defineOptions({
  name: "ApparatusClassificationTable",
});
</script>

<template>
  <UiTable :show-select="true" :multi-sort="true">
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>
  </UiTable>
</template>
