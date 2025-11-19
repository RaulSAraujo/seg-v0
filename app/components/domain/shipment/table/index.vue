<script lang="ts" setup>
defineOptions({
  name: "ShipmentTable",
});

defineEmits(["updateItem"]);
</script>

<template>
  <UiTable multi-sort>
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
