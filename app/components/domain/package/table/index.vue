<script lang="ts" setup>
defineOptions({
  name: "PackageTable",
});

defineEmits(["updateItem"]);
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="blue"
        density="comfortable"
        @click="$emit('updateItem', item)"
      />

      <UiDelete :id="item.id" />
    </template>
  </UiTable>
</template>
